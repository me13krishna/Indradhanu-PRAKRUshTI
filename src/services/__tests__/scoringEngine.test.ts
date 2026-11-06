import { describe, it, expect } from 'vitest';
import {
  computeElementScores,
  calculateCompositePrakrutiScore,
  normalizeTwoSided,
  normalizePenalty,
  normalizeLinearBenefit,
} from '../scoringEngine';
import type { WeatherData, HazardRisk } from '../../types/prakrushti';

describe('Panch Mahabhuta Scientific Scoring Engine (v2.0.0)', () => {
  const baseWeather: WeatherData = {
    temperatureC: 22,
    feelsLikeC: 22,
    humidityPct: 55,
    precipitationMm: 2.0,
    windKph: 12,
    aqi: 25,
    pm2_5: 6.0,
    weatherCode: 0,
    description: 'Clear sky',
    uvIndex: 3.5,
    pressureHpa: 1013,
    elevationM: 50,
    soilMoisturePct: 60,
    soilMoistureM3M3: 0.28,
    soilTemperatureC: 20,
    soilMoistureProvenance: 'NWP_LAND_SURFACE_MODEL',
    provenance: {},
  };

  const baseHazards: HazardRisk = {
    flood: 'low',
    heat: 'low',
    fire: 'low',
    storm: 'low',
    seismic: 'low',
  };

  // --------------------------------------------------------------------------
  // 1. IDEAL BASELINE TEST
  // --------------------------------------------------------------------------
  it('calculates optimal / healthy scores under ideal environmental baselines', () => {
    const result = computeElementScores(baseWeather, baseHazards);

    expect(result.prakrutiScore).toBeGreaterThanOrEqual(75);
    expect(result.overallStatus).toBe('Healthy / Optimal');
    expect(result.elements.prithvi.score).toBeGreaterThanOrEqual(75);
    expect(result.elements.jal.score).toBeGreaterThanOrEqual(75);
    expect(result.elements.agni.score).toBeGreaterThanOrEqual(75);
    expect(result.elements.vayu.score).toBeGreaterThanOrEqual(75);
    expect(result.elements.akash.score).toBeGreaterThanOrEqual(75);

    // Verify sub-metrics structure
    expect(result.elements.prithvi.subMetrics).toHaveLength(2);
    expect(result.elements.jal.subMetrics).toHaveLength(2);
    expect(result.elements.agni.subMetrics).toHaveLength(2);
    expect(result.elements.vayu.subMetrics).toHaveLength(2);
    expect(result.elements.akash.subMetrics).toHaveLength(3);
  });

  // --------------------------------------------------------------------------
  // 2. VAYU POLLUTANT CEILING RULE TEST
  // --------------------------------------------------------------------------
  it('strictly enforces the Pollutant Ceiling Rule: Vayu is 0 when PM2.5 > 150 µg/m³ regardless of high wind ventilation', () => {
    // Severe particulate pollution paired with optimal wind ventilation (15 km/h)
    const severeSmogWeather: WeatherData = {
      ...baseWeather,
      aqi: 350,
      pm2_5: 180.0,
      windKph: 15, // Optimal dispersion speed!
    };

    const result = computeElementScores(severeSmogWeather, baseHazards);

    // S_chem = 0. Under the ceiling rule: min(S_chem, 0.8 * S_chem + 0.2 * S_vent) = min(0, 20) = 0.
    expect(result.elements.vayu.score).toBe(0);
    // Vayu attribution should be strongly negative (primary stress driver)
    expect(result.elements.vayu.marginalAttribution).toBeLessThan(0);
    expect(result.explainability.primaryStressDriver).toBe('vayu');
  });

  // --------------------------------------------------------------------------
  // 3. CONTINUOUS BOUNDARIES TEST (NO DISCONTINUOUS STEP CLIFFS)
  // --------------------------------------------------------------------------
  it('maintains continuous, monotonic transitions without discrete cliff jumps', () => {
    // Check normalizeTwoSided continuity
    for (let x = 0; x <= 50; x += 0.5) {
      const s1 = normalizeTwoSided(x, 10, 20, 30, 40);
      const s2 = normalizeTwoSided(x + 0.5, 10, 20, 30, 40);
      expect(Math.abs(s2 - s1)).toBeLessThanOrEqual(5.5);
    }

    // Verify normalizePenalty and normalizeLinearBenefit behavior
    expect(normalizePenalty(0, 0, 30)).toBe(100);
    expect(normalizePenalty(30, 0, 30)).toBe(0);
    expect(normalizePenalty(15, 0, 30)).toBe(50);

    expect(normalizeLinearBenefit(0, 0, 100)).toBe(0);
    expect(normalizeLinearBenefit(100, 0, 100)).toBe(100);
    expect(normalizeLinearBenefit(50, 0, 100)).toBe(50);

    // Check PM2.5 sweep across boundary thresholds (5, 15, 35, 75, 150)
    let prevScore = 100;
    for (let pm = 0; pm <= 160; pm += 5) {
      const w: WeatherData = { ...baseWeather, pm2_5: pm, aqi: Math.round(pm * 2) };
      const res = computeElementScores(w, baseHazards);
      expect(res.elements.vayu.score).toBeLessThanOrEqual(prevScore); // Monotonic
      expect(prevScore - res.elements.vayu.score).toBeLessThanOrEqual(15); // Continuous
      prevScore = res.elements.vayu.score;
    }
  });

  // --------------------------------------------------------------------------
  // 4. NOAA ROTHFUSZ HEAT INDEX & THERMAL PENALTY TEST
  // --------------------------------------------------------------------------
  it('correctly calculates NOAA Rothfusz Heat Index and severely penalizes Agni during humid heatwaves', () => {
    // 40°C with 60% relative humidity produces apparent HI > 54°C (extreme danger)
    const dangerousHeatWeather: WeatherData = {
      ...baseWeather,
      temperatureC: 40,
      humidityPct: 60,
    };
    const heatHazards: HazardRisk = { ...baseHazards, heat: 'critical', fire: 'high' };

    const result = computeElementScores(dangerousHeatWeather, heatHazards);
    // Continuous Heat Index sub-metric must collapse to 0
    expect(result.elements.agni.subMetrics?.[0].score).toBe(0);
    expect(result.elements.agni.score).toBeLessThanOrEqual(35);
    expect(result.prakrutiScore).toBeLessThan(computeElementScores(baseWeather, baseHazards).prakrutiScore);
  });

  it('collapses both heat and fire indices during hot, arid, high-wind wildfire conditions', () => {
    const fireWeather: WeatherData = {
      ...baseWeather,
      temperatureC: 42,
      humidityPct: 12,
      windKph: 38,
    };
    const fireHazards: HazardRisk = { ...baseHazards, heat: 'critical', fire: 'critical' };
    const result = computeElementScores(fireWeather, fireHazards);
    // Agni shows compound thermal and fire stress (S_fire elevated to FFWI ~61, S_heat ~47)
    expect(result.elements.agni.score).toBeLessThanOrEqual(45);
    expect(result.elements.agni.status).toBe('Under Environmental Stress');
  });

  // --------------------------------------------------------------------------
  // 5. ALTIMETRIC PRESSURE NORMALIZATION FOR HIGH-ALTITUDE TERRAINS
  // --------------------------------------------------------------------------
  it('correctly uses ICAO Standard Atmosphere to prevent false penalties at high elevations (e.g. Leh, 3500m)', () => {
    // Leh, Ladakh: ~3500m elevation. Standard atmospheric pressure is ~658 hPa.
    const mountainWeather: WeatherData = {
      ...baseWeather,
      elevationM: 3500,
      pressureHpa: 658, // Perfectly normal for 3500m!
    };

    const result = computeElementScores(mountainWeather, baseHazards);
    // With ICAO altimetric reduction, pressure deviation is ~0 hPa, so pressure score is 100
    const pressMetric = result.elements.akash.subMetrics?.find(m => m.name.includes('Pressure'));
    expect(pressMetric).toBeDefined();
    expect(pressMetric?.score).toBe(100);
    expect(result.elements.akash.score).toBeGreaterThanOrEqual(75);
  });

  // --------------------------------------------------------------------------
  // 6. ZERO-ELEMENT ANALYTICAL MAXIMUM BOUNDS TEST (ORDER p = 0.5)
  // --------------------------------------------------------------------------
  it('strictly verifies the analytical maximum composite scores when an element completely fails (p = 0.5 non-compensatory)', () => {
    // Case A: All elements = 100
    const allPerfect = { prithvi: 100, jal: 100, agni: 100, vayu: 100, akash: 100 };
    expect(calculateCompositePrakrutiScore(allPerfect)).toBe(100);

    // Case B: Vayu = 0, others = 100.
    // Inner = 0.20*10 + 0.20*10 + 0.20*10 + 0.25*0 + 0.15*10 = 2 + 2 + 2 + 0 + 1.5 = 7.5.
    // 7.5^2 = 56.25 -> rounds to 56.
    const zeroVayu = { prithvi: 100, jal: 100, agni: 100, vayu: 0, akash: 100 };
    expect(calculateCompositePrakrutiScore(zeroVayu)).toBe(56);

    // Case C: Prithvi = 0, others = 100.
    // Inner = 0.20*0 + 0.20*10 + 0.20*10 + 0.25*10 + 0.15*10 = 0 + 2 + 2 + 2.5 + 1.5 = 8.0.
    // 8.0^2 = 64.0 -> 64.
    const zeroPrithvi = { prithvi: 0, jal: 100, agni: 100, vayu: 100, akash: 100 };
    expect(calculateCompositePrakrutiScore(zeroPrithvi)).toBe(64);

    // Case D: Akash = 0, others = 100.
    // Inner = 0.20*10 + 0.20*10 + 0.20*10 + 0.25*10 + 0.15*0 = 2 + 2 + 2 + 2.5 + 0 = 8.5.
    // 8.5^2 = 72.25 -> rounds to 72.
    const zeroAkash = { prithvi: 100, jal: 100, agni: 100, vayu: 100, akash: 0 };
    expect(calculateCompositePrakrutiScore(zeroAkash)).toBe(72);

    // Case E: All elements = 0
    const allZero = { prithvi: 0, jal: 0, agni: 0, vayu: 0, akash: 0 };
    expect(calculateCompositePrakrutiScore(allZero)).toBe(0);
  });

  // --------------------------------------------------------------------------
  // 7. DECOUPLED SEISMIC ADVISORY TEST
  // --------------------------------------------------------------------------
  it('decouples episodic seismic hazards from soil health into an independent safety advisory', () => {
    const earthquakeHazards: HazardRisk = { ...baseHazards, seismic: 'critical' };
    const result = computeElementScores(baseWeather, earthquakeHazards);

    // Prithvi soil health remains optimal because moisture & temperature are fine
    expect(result.elements.prithvi.score).toBeGreaterThanOrEqual(75);

    // But safety advisory is triggered!
    expect(result.safetyAdvisories.some(a => a.type === 'seismic' && a.level === 'critical')).toBe(true);
  });

  // --------------------------------------------------------------------------
  // 8. EXPLAINABILITY & MARGINAL ATTRIBUTION TEST
  // --------------------------------------------------------------------------
  it('correctly computes finite-difference marginal attributions and provenance confidence', () => {
    const pollutedWeather: WeatherData = { ...baseWeather, pm2_5: 120.0, aqi: 240 };
    const result = computeElementScores(pollutedWeather, baseHazards);

    expect(result.explainability).toBeDefined();
    expect(result.explainability.primaryStressDriver).toBe('vayu');
    expect(result.explainability.attributions.vayu).toBeLessThan(0);
    expect(result.explainability.confidenceScore).toBeGreaterThanOrEqual(80);
  });

  // --------------------------------------------------------------------------
  // 9. STRICT BOUNDS UNDER CATASTROPHIC COMPOUND CONDITIONS
  // --------------------------------------------------------------------------
  it('ensures all 5 element scores and composite score remain strictly bounded in [0, 100]', () => {
    const extremeWeather: WeatherData = {
      ...baseWeather,
      temperatureC: 55,
      precipitationMm: 180,
      pm2_5: 450,
      aqi: 500,
      humidityPct: 100,
      windKph: 120,
      pressureHpa: 930,
      soilMoistureM3M3: 0.50,
      soilTemperatureC: 45,
    };
    const extremeHazards: HazardRisk = {
      flood: 'critical',
      heat: 'critical',
      fire: 'critical',
      storm: 'critical',
      seismic: 'critical',
    };

    const result = computeElementScores(extremeWeather, extremeHazards);
    for (const key of ['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const) {
      expect(result.elements[key].score).toBeGreaterThanOrEqual(0);
      expect(result.elements[key].score).toBeLessThanOrEqual(100);
    }
    expect(result.prakrutiScore).toBeGreaterThanOrEqual(0);
    expect(result.prakrutiScore).toBeLessThanOrEqual(100);
    expect(result.prakrutiScore).toBeLessThan(35);
    expect(result.overallStatus).toBe('Critical Stress');
  });
});
