import { describe, it, expect } from 'vitest';
import { computeElementScores } from '../scoringEngine';
import type { WeatherData, HazardRisk } from '../../types/prakrushti';

describe('Panch Mahabhuta Scoring Engine', () => {
  const baseWeather: WeatherData = {
    temperatureC: 22,
    feelsLikeC: 22,
    humidityPct: 55,
    precipitationMm: 2.0,
    windKph: 12,
    aqi: 35,
    weatherCode: 0,
    description: 'Clear sky',
    uvIndex: 4,
    pressureHpa: 1013,
    soilMoisturePct: 50,
    soilMoistureM3M3: 0.25,
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

  it('calculates optimal / healthy scores under ideal environmental baselines', () => {
    const result = computeElementScores(baseWeather, baseHazards);
    
    expect(result.prakrutiScore).toBeGreaterThanOrEqual(75);
    expect(result.overallStatus).toBe('Healthy / Optimal');
    expect(result.elements.prithvi.score).toBeGreaterThanOrEqual(70);
    expect(result.elements.jal.score).toBeGreaterThanOrEqual(70);
    expect(result.elements.agni.score).toBeGreaterThanOrEqual(70);
    expect(result.elements.vayu.score).toBeGreaterThanOrEqual(75);
    expect(result.elements.akash.score).toBeGreaterThanOrEqual(75);
  });

  it('penalizes Agni score under extreme heatwave conditions', () => {
    const heatwaveWeather = { ...baseWeather, temperatureC: 44 };
    const heatwaveHazards: HazardRisk = { ...baseHazards, heat: 'critical', fire: 'high' };
    
    const result = computeElementScores(heatwaveWeather, heatwaveHazards);
    expect(result.elements.agni.score).toBeLessThan(45);
    expect(result.prakrutiScore).toBeLessThan(computeElementScores(baseWeather, baseHazards).prakrutiScore);
  });

  it('penalizes Vayu score under severe AQI pollution', () => {
    const pollutedWeather = { ...baseWeather, aqi: 350 };
    const result = computeElementScores(pollutedWeather, baseHazards);
    
    // With aqiScore = 0 (weight 60%) and windScore = 100 (weight 40%), vayu drops to 40
    expect(result.elements.vayu.score).toBeLessThanOrEqual(40);
  });

  it('ensures all 5 element scores remain strictly bounded in [0, 100]', () => {
    const extremeWeather: WeatherData = {
      ...baseWeather,
      temperatureC: 55,
      precipitationMm: 180,
      aqi: 500,
      humidityPct: 100,
      windKph: 120,
      pressureHpa: 930,
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
