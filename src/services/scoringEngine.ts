import type {
  ElementScore,
  WeatherData,
  HazardRisk,
  MahabhutaElementKey,
  SubMetricBreakdown,
  SafetyAdvisoryItem,
  ExplainabilityData,
} from '../types/prakrushti';

// ============================================================================
// CONTINUOUS MATHEMATICAL NORMALIZATION HELPERS (v2.0.0)
// ============================================================================

/**
 * Two-sided trapezoidal piecewise continuous normalization (0 to 100).
 * Below L1 or above U2: returns 0.
 * Between L2 and U1: returns 100 (optimal plateau).
 * Transitions are strictly continuous and linear.
 */
export function normalizeTwoSided(x: number, L1: number, L2: number, U1: number, U2: number): number {
  if (x < L1 || x > U2) return 0;
  if (x >= L2 && x <= U1) return 100;
  if (x < L2) {
    if (L2 === L1) return 100;
    return Math.max(0, Math.min(100, ((x - L1) / (L2 - L1)) * 100));
  } else {
    if (U2 === U1) return 100;
    return Math.max(0, Math.min(100, ((U2 - x) / (U2 - U1)) * 100));
  }
}

/**
 * One-sided upper penalty normalization (0 to 100).
 * Below or at opt: returns 100.
 * Above or at crit: returns 0.
 * Non-linear curvature controlled by gamma (default 1.0 for linear decay).
 */
export function normalizePenalty(x: number, opt: number, crit: number, gamma: number = 1.0): number {
  if (x <= opt) return 100;
  if (x >= crit) return 0;
  const ratio = (x - opt) / (crit - opt);
  return Math.max(0, Math.min(100, 100 * Math.pow(1 - ratio, gamma)));
}

/**
 * One-sided linear benefit normalization (0 to 100).
 */
export function normalizeLinearBenefit(x: number, minVal: number, maxVal: number): number {
  if (x <= minVal) return 0;
  if (x >= maxVal) return 100;
  return Math.max(0, Math.min(100, ((x - minVal) / (maxVal - minVal)) * 100));
}

// ============================================================================
// ELEMENT SUB-ROUTINES (SCIENTIFICALLY VALIDATED)
// ============================================================================

/**
 * Prithvi (Earth) Model:
 * S_soil_m (60%): Topsoil 0-1cm skin moisture (ECMWF IFS NWP, provisional loam proxy)
 * S_soil_t (40%): Topsoil surface temperature (ECMWF IFS NWP)
 * Seismic hazards are isolated into an independent safety advisory layer.
 */
function computePrithvi(weather: WeatherData): { score: number; subMetrics: SubMetricBreakdown[] } {
  const theta = weather.soilMoistureM3M3 != null
    ? weather.soilMoistureM3M3
    : ((weather.soilMoisturePct ?? 45) / 100) * 0.45;

  const tSoil = weather.soilTemperatureC != null ? weather.soilTemperatureC : weather.temperatureC;

  // Provisional agricultural loam topsoil proxy: [0.10, 0.20, 0.35, 0.45] m³/m³
  const sSoilM = Math.round(normalizeTwoSided(theta, 0.10, 0.20, 0.35, 0.45));
  // Biological root-zone / surface biological activity optimum: [0, 15, 25, 38] °C
  const sSoilT = Math.round(normalizeTwoSided(tSoil, 0.0, 15.0, 25.0, 38.0));

  const composite = Math.round(0.60 * sSoilM + 0.40 * sSoilT);
  const score = Math.max(0, Math.min(100, composite));

  const subMetrics: SubMetricBreakdown[] = [
    {
      name: 'Topsoil Skin Moisture Proxy (0-1cm)',
      score: sSoilM,
      weight: 0.60,
      rawDisplay: `${theta.toFixed(3)} m³/m³`,
      benchmark: 'Loam proxy plateau: 0.20–0.35 m³/m³ (Wilting < 0.10, Anoxia > 0.45)',
      citation: 'ECMWF IFS HTESSEL Land Surface Model',
      status: sSoilM >= 70 ? 'good' : sSoilM >= 40 ? 'moderate' : 'poor',
    },
    {
      name: 'Topsoil Surface Temperature',
      score: sSoilT,
      weight: 0.40,
      rawDisplay: `${tSoil.toFixed(1)} °C`,
      benchmark: 'Microbial optimum: 15–25 °C (Thermal stress < 0 °C or > 38 °C)',
      citation: 'ECMWF IFS Land Model Analysis',
      status: sSoilT >= 70 ? 'good' : sSoilT >= 40 ? 'moderate' : 'poor',
    },
  ];

  return { score, subMetrics };
}

/**
 * Jal (Water) Model:
 * S_infil (60%): Precipitation Infiltration-Exceedance Proxy (Hortonian excess proxy)
 * S_rh (40%): Relative Humidity atmospheric balance
 */
function computeJal(weather: WeatherData): { score: number; subMetrics: SubMetricBreakdown[] } {
  const precip = Math.max(0, weather.precipitationMm);
  const theta = weather.soilMoistureM3M3 != null
    ? weather.soilMoistureM3M3
    : ((weather.soilMoisturePct ?? 45) / 100) * 0.45;
  const rh = Math.max(0, Math.min(100, weather.humidityPct));

  // Infiltration capacity proxy (loam proxy: fc = 15.0 mm/h, theta_sat = 0.45 m³/m³)
  const fc = 15.0;
  const saturationRatio = Math.min(1.0, Math.max(0.0, theta / 0.45));
  const effectiveInfilCapacity = fc * (1.0 - saturationRatio);
  const excess = Math.max(0.0, Math.min(100.0, precip - effectiveInfilCapacity));

  const sInfil = Math.round(normalizePenalty(excess, 0.0, 35.0, 1.2));
  const sRh = Math.round(normalizeTwoSided(rh, 20.0, 40.0, 70.0, 95.0));

  const composite = Math.round(0.60 * sInfil + 0.40 * sRh);
  const score = Math.max(0, Math.min(100, composite));

  const subMetrics: SubMetricBreakdown[] = [
    {
      name: 'Precipitation Infiltration-Exceedance Proxy',
      score: sInfil,
      weight: 0.60,
      rawDisplay: `${precip.toFixed(1)} mm/h (Excess: ${excess.toFixed(1)} mm/h)`,
      benchmark: 'Zero excess (<15 mm/h dry soil) = 100; >35 mm/h excess = 0',
      citation: 'Horton (1933) Infiltration Proxy Formulation',
      status: sInfil >= 70 ? 'good' : sInfil >= 40 ? 'moderate' : 'poor',
    },
    {
      name: 'Relative Humidity Atmospheric Balance',
      score: sRh,
      weight: 0.40,
      rawDisplay: `${rh}%`,
      benchmark: 'Comfortable balance: 40–70% (Arid < 20%, Saturated > 95%)',
      citation: 'WMO Atmospheric Moisture Guidelines',
      status: sRh >= 70 ? 'good' : sRh >= 40 ? 'moderate' : 'poor',
    },
  ];

  return { score, subMetrics };
}

/**
 * Agni (Heat & Solar) Model:
 * S_heat (65%): NOAA/NWS Rothfusz Heat Index with Steadman preliminary step and adjustments
 * S_fire (35%): Fosberg Fire Weather Index (FFWI) with Simard (1968) equilibrium moisture
 */
function computeAgni(weather: WeatherData): { score: number; subMetrics: SubMetricBreakdown[] } {
  const tC = weather.temperatureC;
  const rh = Math.max(0, Math.min(100, weather.humidityPct));
  const windKph = Math.max(0, weather.windKph);
  const windMph = windKph * 0.621371;

  // 1. NOAA/NWS Rothfusz Heat Index
  const tF = tC * 1.8 + 32.0;
  let hiF = tF;

  if (tF >= 80.0) {
    const hiSimple = 0.5 * (tF + 61.0 + ((tF - 68.0) * 1.2) + (rh * 0.094));
    if (hiSimple >= 80.0) {
      let hiPoly = -42.379 +
        2.04901523 * tF +
        10.14333127 * rh -
        0.22475541 * tF * rh -
        0.00683783 * tF * tF -
        0.05481717 * rh * rh +
        0.00122874 * tF * tF * rh +
        0.00085282 * tF * rh * rh -
        0.00000199 * tF * tF * rh * rh;

      // Adjustments
      if (rh < 13.0 && tF >= 80.0 && tF <= 112.0) {
        const adj = -((13.0 - rh) / 4.0) * Math.sqrt(Math.max(0, (17.0 - Math.abs(tF - 95.0)) / 17.0));
        hiPoly += adj;
      } else if (rh > 85.0 && tF >= 80.0 && tF <= 87.0) {
        const adj = ((rh - 85.0) / 10.0) * ((87.0 - tF) / 5.0);
        hiPoly += adj;
      }
      hiF = hiPoly;
    } else {
      hiF = hiSimple;
    }
  }

  const hiC = (hiF - 32.0) / 1.8;

  // Continuous heat-stress scoring
  let sHeat = 100;
  if (hiC <= 27.0) {
    sHeat = 100;
  } else if (hiC <= 32.0) {
    sHeat = 100 - 20 * ((hiC - 27.0) / (32.0 - 27.0));
  } else if (hiC <= 41.0) {
    sHeat = 80 - 40 * ((hiC - 32.0) / (41.0 - 32.0));
  } else if (hiC <= 54.0) {
    sHeat = 40 - 40 * ((hiC - 41.0) / (54.0 - 41.0));
  } else {
    sHeat = 0;
  }

  // Cold stress adjustment (if freezing/polar temperature)
  if (tC < 15.0) {
    let sCold = 100;
    if (tC <= -10.0) sCold = 0;
    else sCold = 100 * ((tC - (-10.0)) / (15.0 - (-10.0)));
    sHeat = Math.min(sHeat, sCold);
  }
  sHeat = Math.round(Math.max(0, Math.min(100, sHeat)));

  // 2. Fosberg Fire Weather Index (FFWI)
  let m = 10.0;
  if (rh < 10.0) {
    m = 0.03229 + 0.281073 * rh - 0.000578 * rh * tF;
  } else if (rh <= 50.0) {
    m = 2.22749 + 0.160107 * rh - 0.01478 * tF;
  } else {
    m = 21.0606 + 0.005565 * rh * rh - 0.00035 * rh * tF - 0.483199 * rh;
  }
  m = Math.max(1.0, Math.min(30.0, m));

  const mRatio = m / 30.0;
  const lambda = 1.0 - 2.0 * mRatio + 1.5 * Math.pow(mRatio, 2) - 0.5 * Math.pow(mRatio, 3);
  const eta = Math.sqrt(1.0 + Math.pow(windMph, 2));
  const ffwiRaw = (eta * lambda) / 0.3002;
  const ffwi = Math.max(0.0, Math.min(100.0, ffwiRaw));
  const sFire = Math.round(Math.max(0, Math.min(100, 100.0 - ffwi)));

  const composite = Math.round(0.65 * sHeat + 0.35 * sFire);
  const score = Math.max(0, Math.min(100, composite));

  const subMetrics: SubMetricBreakdown[] = [
    {
      name: 'NOAA/NWS Continuous Heat Index Stress',
      score: sHeat,
      weight: 0.65,
      rawDisplay: `${hiC.toFixed(1)} °C (Apparent HI)`,
      benchmark: 'Safe: ≤27 °C, Caution: 27–32 °C, Danger: 32–41 °C, Extreme Danger: >41 °C',
      citation: 'NOAA/NWS Rothfusz & Steadman Heat Index Specification',
      status: sHeat >= 70 ? 'good' : sHeat >= 40 ? 'moderate' : 'poor',
    },
    {
      name: 'Fosberg Fire Weather Index (FFWI)',
      score: sFire,
      weight: 0.35,
      rawDisplay: `FFWI: ${ffwi.toFixed(1)} / 100`,
      benchmark: 'Low: <20 (Score >80), Moderate: 20–40, High: 40–60, Extreme: >70 (Score <30)',
      citation: 'Fosberg (1978) & Simard (1968) Fuel Moisture Formulation',
      status: sFire >= 70 ? 'good' : sFire >= 40 ? 'moderate' : 'poor',
    },
  ];

  return { score, subMetrics };
}

/**
 * Vayu (Air) Model:
 * S_chem (80%): Chemical Pollutant Score (PM2.5 / EPA AQI)
 * S_vent (20%): Atmospheric Ventilation Dispersion Score
 * Strictly capped by Pollutant Ceiling Rule: Vayu = min(S_chem, 0.80 * S_chem + 0.20 * S_vent).
 * When S_chem = 0, Vayu = 0 unconditionally.
 */
function computeVayu(weather: WeatherData): { score: number; subMetrics: SubMetricBreakdown[] } {
  let pm25 = weather.pm2_5;
  const aqi = Math.max(0, weather.aqi);
  const windKph = Math.max(0, weather.windKph);

  // If PM2.5 is not directly available, invert from US AQI using standard EPA breakpoints
  if (pm25 == null || isNaN(pm25)) {
    if (aqi <= 50) pm25 = (aqi / 50.0) * 12.0;
    else if (aqi <= 100) pm25 = 12.1 + ((aqi - 51) / 49.0) * (35.4 - 12.1);
    else if (aqi <= 150) pm25 = 35.5 + ((aqi - 101) / 49.0) * (55.4 - 35.5);
    else if (aqi <= 200) pm25 = 55.5 + ((aqi - 151) / 49.0) * (150.4 - 55.5);
    else if (aqi <= 300) pm25 = 150.5 + ((aqi - 201) / 99.0) * (250.4 - 150.5);
    else pm25 = 250.5 + ((aqi - 301) / 199.0) * (500.4 - 250.5);
  }

  // Piecewise Chemical Pollutant Scoring S_chem
  let sChem = 100;
  if (pm25 <= 5.0) {
    sChem = 100;
  } else if (pm25 <= 15.0) {
    sChem = 100 - 15 * ((pm25 - 5.0) / (15.0 - 5.0));
  } else if (pm25 <= 35.0) {
    sChem = 85 - 25 * ((pm25 - 15.0) / (35.0 - 15.0));
  } else if (pm25 <= 75.0) {
    sChem = 60 - 35 * ((pm25 - 35.0) / (75.0 - 35.0));
  } else if (pm25 <= 150.0) {
    sChem = 25 - 25 * ((pm25 - 75.0) / (150.0 - 75.0));
  } else {
    sChem = 0;
  }
  sChem = Math.round(Math.max(0, Math.min(100, sChem)));

  // Ventilation score S_vent
  const sVent = Math.round(normalizeTwoSided(windKph, 2.0, 8.0, 25.0, 60.0));

  // Pollutant Ceiling Rule
  const nominalComposite = 0.80 * sChem + 0.20 * sVent;
  const score = Math.max(0, Math.min(100, Math.round(Math.min(sChem, nominalComposite))));

  const subMetrics: SubMetricBreakdown[] = [
    {
      name: 'Chemical Particulate Purity (PM2.5 / AQI)',
      score: sChem,
      weight: 0.80,
      rawDisplay: `${pm25.toFixed(1)} µg/m³ (AQI: ${aqi})`,
      benchmark: 'Target: ≤5 µg/m³, WHO Interim-1: ≤35 µg/m³, Hazardous: >150 µg/m³',
      citation: 'WHO Global Air Quality Guidelines & US EPA AQI Standard',
      status: sChem >= 70 ? 'good' : sChem >= 40 ? 'moderate' : 'critical',
    },
    {
      name: 'Ventilation & Stagnation Dispersion Index',
      score: sVent,
      weight: 0.20,
      rawDisplay: `${windKph} km/h`,
      benchmark: 'Optimum dispersion: 8–25 km/h (Stagnation < 2 km/h, Gale > 60 km/h)',
      citation: 'Atmospheric Boundary Layer Dispersion Index',
      status: sVent >= 70 ? 'good' : sVent >= 40 ? 'moderate' : 'poor',
    },
  ];

  return { score, subMetrics };
}

/**
 * Akash (Space & Atmosphere) Model:
 * S_press_alt (45%): Altimetrically-reduced barometric pressure (ICAO Standard Atmosphere)
 * S_cloud (30%): Cloud cover radiative balance
 * S_uv (25%): Solar UV radiation exposure
 */
function computeAkash(weather: WeatherData): { score: number; subMetrics: SubMetricBreakdown[] } {
  const elevM = Math.max(-500, Math.min(9000, weather.elevationM ?? 0));
  const pObs = weather.pressureHpa ?? 1013;
  const cloudCover = Math.max(0, Math.min(100, weather.cloudCoverPct ?? 30));
  const uv = Math.max(0, weather.uvIndex ?? 4.5);

  // ICAO Standard Atmosphere elevation-adjusted reference pressure:
  // P_ref(H) = 1013.25 * (1 - 2.25577e-5 * H)^5.25588
  const baseTerm = Math.max(0.01, 1.0 - 2.25577e-5 * elevM);
  const pRef = 1013.25 * Math.pow(baseTerm, 5.25588);
  const deltaP = Math.abs(pObs - pRef);

  const sPress = Math.round(normalizePenalty(deltaP, 3.0, 25.0, 1.0));
  const sCloud = Math.round(normalizeTwoSided(cloudCover, 10.0, 30.0, 70.0, 95.0));
  const sUv = Math.round(normalizePenalty(uv, 2.0, 11.0, 1.0));

  const composite = Math.round(0.45 * sPress + 0.30 * sCloud + 0.25 * sUv);
  const score = Math.max(0, Math.min(100, composite));

  const subMetrics: SubMetricBreakdown[] = [
    {
      name: 'Altimetrically-Reduced Pressure Deviation',
      score: sPress,
      weight: 0.45,
      rawDisplay: `${pObs} hPa (Ref: ${pRef.toFixed(1)} hPa @ ${elevM}m, Δ=${deltaP.toFixed(1)} hPa)`,
      benchmark: 'Stable: |ΔP| ≤ 3 hPa, Extreme anomaly: |ΔP| ≥ 25 hPa',
      citation: 'ICAO Standard Atmosphere Altimetric Formula (Doc 7488)',
      status: sPress >= 70 ? 'good' : sPress >= 40 ? 'moderate' : 'poor',
    },
    {
      name: 'Cloud Cover Radiative Balance',
      score: sCloud,
      weight: 0.30,
      rawDisplay: `${cloudCover}%`,
      benchmark: 'Balanced: 30–70% (Clear radiation < 10%, Overcast > 95%)',
      citation: 'WMO Cloud Observation Standard',
      status: sCloud >= 70 ? 'good' : sCloud >= 40 ? 'moderate' : 'poor',
    },
    {
      name: 'Solar UV Radiation Hazard',
      score: sUv,
      weight: 0.25,
      rawDisplay: `UV Index ${uv.toFixed(1)}`,
      benchmark: 'Low: ≤2, Moderate: 3–5, High: 6–7, Very High: 8–10, Extreme: ≥11',
      citation: 'WHO Global Solar UV Index Standard',
      status: sUv >= 70 ? 'good' : sUv >= 40 ? 'moderate' : 'poor',
    },
  ];

  return { score, subMetrics };
}

// ============================================================================
// COMPOSITE PRAKRUTI SCORE (ORDER p = 0.5 GENERALIZED MEAN)
// ============================================================================

const ELEMENT_WEIGHTS: Record<MahabhutaElementKey, number> = {
  prithvi: 0.20,
  jal: 0.20,
  agni: 0.20,
  vayu: 0.25,
  akash: 0.15,
};

/**
 * Weighted generalized mean of order p = 0.5:
 * Prakruti = ( sum( w_i * sqrt(S_i) ) )^2
 */
export function calculateCompositePrakrutiScore(scores: Record<MahabhutaElementKey, number>): number {
  let inner = 0;
  for (const key of ['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const) {
    const s = Math.max(0, Math.min(100, scores[key]));
    inner += ELEMENT_WEIGHTS[key] * Math.sqrt(s);
  }
  return Math.round(Math.max(0, Math.min(100, Math.pow(inner, 2))));
}

// ============================================================================
// EXPLAINABILITY & FINITE-DIFFERENCE MARGINAL ATTRIBUTION
// ============================================================================

export function computeExplainability(
  scores: Record<MahabhutaElementKey, number>,
  weather: WeatherData
): ExplainabilityData {
  const compositeScore = calculateCompositePrakrutiScore(scores);

  // Mean score across elements:
  const meanScore = (scores.prithvi + scores.jal + scores.agni + scores.vayu + scores.akash) / 5.0;

  const attributions: Record<MahabhutaElementKey, number> = {
    prithvi: 0,
    jal: 0,
    agni: 0,
    vayu: 0,
    akash: 0,
  };

  let minDelta = Infinity;
  let maxDelta = -Infinity;
  let primaryStressDriver: MahabhutaElementKey = 'vayu';
  let primaryResiliencePillar: MahabhutaElementKey = 'akash';

  for (const key of ['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const) {
    // Replace element k with meanScore
    const counterfactualScores = { ...scores, [key]: meanScore };
    const counterfactualComposite = calculateCompositePrakrutiScore(counterfactualScores);
    const delta = Number((compositeScore - counterfactualComposite).toFixed(1));
    attributions[key] = delta;

    if (delta < minDelta) {
      minDelta = delta;
      primaryStressDriver = key;
    }
    if (delta > maxDelta) {
      maxDelta = delta;
      primaryResiliencePillar = key;
    }
  }

  // Aggregated uncertainty from data provenance
  // sigma_i = 1 - confidence_i
  const confPrithvi = weather.soilMoistureProvenance === 'NWP_LAND_SURFACE_MODEL' ? 0.88 : 0.55;
  const confMap: Record<MahabhutaElementKey, number> = {
    prithvi: confPrithvi,
    jal: 0.90,
    agni: 0.92,
    vayu: weather.pm2_5 != null ? 0.90 : 0.82,
    akash: 0.90,
  };

  let sumWeightedVariance = 0;
  for (const key of ['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const) {
    const sigma = 1.0 - confMap[key];
    sumWeightedVariance += Math.pow(ELEMENT_WEIGHTS[key] * sigma, 2);
  }
  const sigmaComposite = Math.sqrt(sumWeightedVariance);
  const confidenceScore = Math.round(Math.max(50, Math.min(99, (1.0 - sigmaComposite) * 100)));

  return {
    attributions,
    confidenceScore,
    primaryStressDriver,
    primaryResiliencePillar,
  };
}

// ============================================================================
// MAIN EXPORTED FUNCTION
// ============================================================================

export function computeElementScores(weather: WeatherData, hazardRisk: HazardRisk): {
  elements: Record<MahabhutaElementKey, ElementScore>;
  prakrutiScore: number;
  overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress';
  safetyAdvisories: SafetyAdvisoryItem[];
  explainability: ExplainabilityData;
} {
  const prithviRes = computePrithvi(weather);
  const jalRes = computeJal(weather);
  const agniRes = computeAgni(weather);
  const vayuRes = computeVayu(weather);
  const akashRes = computeAkash(weather);

  const rawScores: Record<MahabhutaElementKey, number> = {
    prithvi: prithviRes.score,
    jal: jalRes.score,
    agni: agniRes.score,
    vayu: vayuRes.score,
    akash: akashRes.score,
  };

  const prakrutiScore = calculateCompositePrakrutiScore(rawScores);
  const explainability = computeExplainability(rawScores, weather);

  // Safety advisories: decoupled acute hazards
  const safetyAdvisories: SafetyAdvisoryItem[] = [];

  // Seismic safety alert (independent of continuous soil moisture/temperature health)
  if (hazardRisk.seismic === 'critical' || hazardRisk.seismic === 'high') {
    safetyAdvisories.push({
      id: 'adv-seismic',
      type: 'seismic',
      level: hazardRisk.seismic,
      title: 'Active Tectonic Activity Detected',
      message: 'Significant seismic tremors detected within regional proximity. Ground stability precautions in effect.',
      source: 'USGS Global Seismographic Network',
    });
  }

  // Extreme heat alert
  if (hazardRisk.heat === 'critical') {
    safetyAdvisories.push({
      id: 'adv-heat',
      type: 'heatwave',
      level: 'critical',
      title: 'Severe Heatwave Hazard',
      message: 'Extreme thermal index exceeds physical safety thresholds. Minimize outdoor exposure.',
      source: 'NOAA Heat Stress Advisory',
    });
  }

  // Extreme wildfire alert
  if (hazardRisk.fire === 'critical') {
    safetyAdvisories.push({
      id: 'adv-fire',
      type: 'wildfire',
      level: 'critical',
      title: 'Critical Fire Weather Danger',
      message: 'Fosberg Fire Weather Index indicates severe combustion spread vulnerability.',
      source: 'Simard-Fosberg Fire Weather Assessment',
    });
  }

  // Extreme smog alert
  if (vayuRes.score === 0 || weather.aqi >= 300) {
    safetyAdvisories.push({
      id: 'adv-air',
      type: 'air',
      level: 'critical',
      title: 'Hazardous Atmospheric Pollution',
      message: 'Particulate matter exceeds emergency biological ceilings. Use high-grade N95 filtration outdoors.',
      source: 'WHO Particulate Matter Hazard Alert',
    });
  }

  const getAttributionRole = (delta: number) => {
    if (delta <= -5.0) return 'Primary Stress Driver' as const;
    if (delta < 0.0) return 'Secondary Stress Contributor' as const;
    if (delta >= 5.0) return 'Resilience Pillar' as const;
    return 'Neutral' as const;
  };

  const prithvi: ElementScore = {
    score: prithviRes.score,
    status: getElementStatusLabel(prithviRes.score),
    sanskritName: 'पृथ्वी',
    englishName: 'Prithvi',
    meaning: 'Earth & Land Stability',
    represents: 'Topsoil moisture, thermal condition, biological activity',
    summary: prithviRes.score >= 70
      ? 'Topsoil exhibits favorable volumetric water content and balanced surface temperature.'
      : 'Topsoil moisture depletion, surface desiccation, or thermal stress detected.',
    color: '#C97B4A',
    keyMetrics: [
      {
        label: weather.soilMoistureProvenance === 'NWP_LAND_SURFACE_MODEL' ? 'Topsoil Skin Moisture' : 'Soil Moisture Proxy',
        value: weather.soilMoistureM3M3 != null ? `${weather.soilMoistureM3M3} m³/m³` : `${weather.soilMoisturePct ?? 45}%`,
        status: prithviRes.subMetrics[0].status,
      },
      {
        label: 'Soil Surface Temp',
        value: `${(weather.soilTemperatureC ?? weather.temperatureC).toFixed(1)} °C`,
        status: prithviRes.subMetrics[1].status,
      },
      {
        label: 'Tectonic Context',
        value: hazardRisk.seismic.toUpperCase(),
        status: hazardRisk.seismic === 'low' ? 'good' : 'poor',
      },
    ],
    subMetrics: prithviRes.subMetrics,
    marginalAttribution: explainability.attributions.prithvi,
    attributionRole: getAttributionRole(explainability.attributions.prithvi),
  };

  const jal: ElementScore = {
    score: jalRes.score,
    status: getElementStatusLabel(jalRes.score),
    sanskritName: 'जल',
    englishName: 'Jal',
    meaning: 'Water & Hydrological Cycle',
    represents: 'Rainfall infiltration proxy, atmospheric humidity equilibrium',
    summary: jalRes.score >= 70
      ? 'Precipitation remains within absorption capacity with balanced ambient humidity.'
      : 'Hydrological stress present due to precipitation infiltration exceedance or severe humidity deviation.',
    color: '#1B6B93',
    keyMetrics: [
      { label: 'Current Rainfall', value: `${weather.precipitationMm} mm/h`, status: jalRes.subMetrics[0].status },
      { label: 'Relative Humidity', value: `${weather.humidityPct}%`, status: jalRes.subMetrics[1].status },
      { label: 'Flood Risk Level', value: hazardRisk.flood.toUpperCase(), status: hazardRisk.flood === 'low' ? 'good' : 'poor' },
    ],
    subMetrics: jalRes.subMetrics,
    marginalAttribution: explainability.attributions.jal,
    attributionRole: getAttributionRole(explainability.attributions.jal),
  };

  const agni: ElementScore = {
    score: agniRes.score,
    status: getElementStatusLabel(agniRes.score),
    sanskritName: 'अग्नि',
    englishName: 'Agni',
    meaning: 'Heat, Solar & Thermal Balance',
    represents: 'Rothfusz heat stress index, Fosberg fire weather vulnerability',
    summary: agniRes.score >= 70
      ? 'Thermal conditions and fuel moisture levels remain within balanced, low-hazard thresholds.'
      : 'Elevated thermal stress, apparent heat index anomaly, or high fire weather index detected.',
    color: '#D9822B',
    keyMetrics: [
      { label: 'Ambient Temperature', value: `${weather.temperatureC}°C`, status: agniRes.subMetrics[0].status },
      { label: 'Heat Index Stress', value: agniRes.subMetrics[0].score >= 70 ? 'Safe' : 'Elevated', status: agniRes.subMetrics[0].status },
      { label: 'Fire Weather Index', value: hazardRisk.fire.toUpperCase(), status: hazardRisk.fire === 'low' ? 'good' : 'poor' },
    ],
    subMetrics: agniRes.subMetrics,
    marginalAttribution: explainability.attributions.agni,
    attributionRole: getAttributionRole(explainability.attributions.agni),
  };

  const vayu: ElementScore = {
    score: vayuRes.score,
    status: getElementStatusLabel(vayuRes.score),
    sanskritName: 'वायु',
    englishName: 'Vayu',
    meaning: 'Air Quality & Atmosphere',
    represents: 'Chemical particulate purity (PM2.5), ventilation dispersion dynamics',
    summary: vayuRes.score >= 70
      ? 'Clean atmospheric air with low particulate matter concentrations and supportive ventilation.'
      : 'Particulate air pollution (PM2.5/AQI) exceeds safe biological limits.',
    color: '#6FA8C9',
    keyMetrics: [
      { label: 'Air Quality Index', value: `${weather.aqi}`, status: vayuRes.subMetrics[0].status },
      { label: 'PM2.5 Estimate', value: weather.pm2_5 != null ? `${weather.pm2_5} µg/m³` : `${vayuRes.subMetrics[0].rawDisplay}`, status: vayuRes.subMetrics[0].status },
      { label: 'Wind Dispersion', value: `${weather.windKph} km/h`, status: vayuRes.subMetrics[1].status },
    ],
    subMetrics: vayuRes.subMetrics,
    marginalAttribution: explainability.attributions.vayu,
    attributionRole: getAttributionRole(explainability.attributions.vayu),
  };

  const akash: ElementScore = {
    score: akashRes.score,
    status: getElementStatusLabel(akashRes.score),
    sanskritName: 'आकाश',
    englishName: 'Akash',
    meaning: 'Space, Sky & Atmospheric Pressure',
    represents: 'Altimetrically-reduced pressure balance, cloud radiative cover, UV radiation',
    summary: akashRes.score >= 70
      ? 'Atmospheric barometric pressure aligns with elevation standard; solar UV exposure is moderate.'
      : 'Barometric anomaly detected relative to terrain elevation, or extreme solar UV exposure present.',
    color: '#7A6C9E',
    keyMetrics: [
      { label: 'Barometric Pressure', value: `${weather.pressureHpa ?? 1013} hPa`, status: akashRes.subMetrics[0].status },
      { label: 'UV Index Exposure', value: `${weather.uvIndex ?? 4.5}`, status: akashRes.subMetrics[2].status },
      { label: 'Cloud Cover', value: `${weather.cloudCoverPct ?? 30}%`, status: akashRes.subMetrics[1].status },
    ],
    subMetrics: akashRes.subMetrics,
    marginalAttribution: explainability.attributions.akash,
    attributionRole: getAttributionRole(explainability.attributions.akash),
  };

  let overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress' = 'Balanced';
  if (prakrutiScore >= 75) overallStatus = 'Healthy / Optimal';
  else if (prakrutiScore >= 55) overallStatus = 'Balanced';
  else if (prakrutiScore >= 35) overallStatus = 'Under Stress';
  else overallStatus = 'Critical Stress';

  return {
    elements: { prithvi, jal, agni, vayu, akash },
    prakrutiScore,
    overallStatus,
    safetyAdvisories,
    explainability,
  };
}

function getElementStatusLabel(score: number): string {
  if (score >= 75) return 'Optimal / High Balance';
  if (score >= 55) return 'Moderate Balance';
  if (score >= 35) return 'Under Environmental Stress';
  return 'Severe Stress / Critical';
}
