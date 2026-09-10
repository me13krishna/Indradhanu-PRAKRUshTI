import type { ElementScore, WeatherData, HazardRisk, MahabhutaElementKey } from '../types/prakrushti';

// Domain-appropriate piecewise linear normalization helper (0 - 100)
function normalize(val: number, minBest: number, maxBest: number, minWorst: number, maxWorst: number): number {
  if (val >= minBest && val <= maxBest) return 100;
  if (val <= minWorst || val >= maxWorst) return 0;
  
  if (val < minBest) {
    return Math.round(((val - minWorst) / (minBest - minWorst)) * 100);
  } else {
    return Math.round(((maxWorst - val) / (maxWorst - maxBest)) * 100);
  }
}

// Convert risk string level to a numeric stability score (0-100)
function riskToScore(level: 'low' | 'moderate' | 'high' | 'critical'): number {
  switch (level) {
    case 'low': return 95;
    case 'moderate': return 70;
    case 'high': return 40;
    case 'critical': return 15;
  }
}

export function computeElementScores(weather: WeatherData, hazardRisk: HazardRisk): {
  elements: Record<MahabhutaElementKey, ElementScore>;
  prakrutiScore: number;
  overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress';
} {
  // 1. PRITHVI (Earth): Land use, soil moisture, seismic stability
  const soilScore = normalize(weather.soilMoisturePct ?? 45, 35, 65, 10, 90);
  const seismicScore = riskToScore(hazardRisk.seismic);
  const landDegradationScore = Math.round((soilScore * 0.6) + (seismicScore * 0.4));
  
  const prithviScoreVal = Math.round((soilScore * 0.4) + (seismicScore * 0.3) + (landDegradationScore * 0.3));
  const prithvi: ElementScore = {
    score: Math.min(100, Math.max(0, prithviScoreVal)),
    status: getElementStatusLabel(prithviScoreVal),
    sanskritName: 'पृथ्वी',
    englishName: 'Prithvi',
    meaning: 'Earth & Land Stability',
    represents: 'Land, soil, vegetation health, geological stability',
    summary: prithviScoreVal >= 70 
      ? 'Land systems exhibit stable soil moisture and minimal seismic or degradation stress.'
      : 'Soil moisture imbalances or regional terrain stress detected on land systems.',
    color: '#C97B4A',
    keyMetrics: [
      { label: 'Soil Moisture Proxy', value: `${weather.soilMoisturePct ?? 45}%`, status: soilScore >= 60 ? 'good' : 'moderate' },
      { label: 'Seismic Risk Level', value: hazardRisk.seismic.toUpperCase(), status: hazardRisk.seismic === 'low' ? 'good' : 'poor' },
      { label: 'Land Stability Index', value: `${prithviScoreVal}/100`, status: prithviScoreVal >= 70 ? 'good' : 'moderate' },
    ]
  };

  // 2. JAL (Water): Hydrological balance, precipitation, flood & drought indices
  const precipScore = weather.precipitationMm > 80 ? 20 : weather.precipitationMm > 30 ? 60 : weather.precipitationMm > 0 ? 90 : 75;
  const floodScore = riskToScore(hazardRisk.flood);
  const humidityScore = normalize(weather.humidityPct, 40, 70, 15, 95);

  const jalScoreVal = Math.round((precipScore * 0.35) + (floodScore * 0.35) + (humidityScore * 0.30));
  const jal: ElementScore = {
    score: Math.min(100, Math.max(0, jalScoreVal)),
    status: getElementStatusLabel(jalScoreVal),
    sanskritName: 'जल',
    englishName: 'Jal',
    meaning: 'Water & Hydrological Cycle',
    represents: 'Rainfall balance, moisture, flood/drought stability',
    summary: jalScoreVal >= 70
      ? 'Balanced precipitation and healthy atmospheric humidity support local water cycles.'
      : 'Hydrological stress present due to precipitation extremes or drought conditions.',
    color: '#1B6B93',
    keyMetrics: [
      { label: 'Current Rainfall', value: `${weather.precipitationMm} mm`, status: precipScore >= 70 ? 'good' : 'moderate' },
      { label: 'Relative Humidity', value: `${weather.humidityPct}%`, status: humidityScore >= 70 ? 'good' : 'moderate' },
      { label: 'Flood Risk Rating', value: hazardRisk.flood.toUpperCase(), status: hazardRisk.flood === 'low' ? 'good' : 'poor' },
    ]
  };

  // 3. AGNI (Fire): Thermal energy, temperature anomaly, heatwave & wildfire risk
  const tempScore = normalize(weather.temperatureC, 18, 28, 5, 45); // Ideal temp 18-28°C
  const heatwaveScore = riskToScore(hazardRisk.heat);
  const wildfireScore = riskToScore(hazardRisk.fire);

  const agniScoreVal = Math.round((tempScore * 0.40) + (heatwaveScore * 0.30) + (wildfireScore * 0.30));
  const agni: ElementScore = {
    score: Math.min(100, Math.max(0, agniScoreVal)),
    status: getElementStatusLabel(agniScoreVal),
    sanskritName: 'अग्नि',
    englishName: 'Agni',
    meaning: 'Heat, Solar & Thermal Balance',
    represents: 'Ambient temperature, heatwave exposure, thermal anomalies',
    summary: agniScoreVal >= 70
      ? 'Moderate ambient thermal conditions with low heatwave or wildfire pressure.'
      : 'Thermal energy strain indicated by high heat index or wildfire hazard potential.',
    color: '#D9822B',
    keyMetrics: [
      { label: 'Ambient Temperature', value: `${weather.temperatureC}°C`, status: tempScore >= 70 ? 'good' : 'moderate' },
      { label: 'Heatwave Hazard', value: hazardRisk.heat.toUpperCase(), status: hazardRisk.heat === 'low' ? 'good' : 'poor' },
      { label: 'Wildfire Hazard', value: hazardRisk.fire.toUpperCase(), status: hazardRisk.fire === 'low' ? 'good' : 'poor' },
    ]
  };

  // 4. VAYU (Air): Atmospheric cleanliness, PM2.5/PM10 AQI, wind dynamics
  const aqiScore = normalize(weather.aqi, 0, 50, 0, 300); // 0-50 AQI is 100 best
  const windScore = normalize(weather.windKph, 5, 25, 0, 75); // 5-25 km/h is balanced

  const vayuScoreVal = Math.round((aqiScore * 0.60) + (windScore * 0.40));
  const vayu: ElementScore = {
    score: Math.min(100, Math.max(0, vayuScoreVal)),
    status: getElementStatusLabel(vayuScoreVal),
    sanskritName: 'वायु',
    englishName: 'Vayu',
    meaning: 'Air Quality & Atmosphere',
    represents: 'Cleanliness of air (AQI, PM2.5), wind flow and dispersion',
    summary: vayuScoreVal >= 70
      ? 'Clean atmospheric air with minimal particulate pollution and gentle airflow.'
      : 'Degraded air quality index or extreme wind shear creating atmospheric stress.',
    color: '#6FA8C9',
    keyMetrics: [
      { label: 'Air Quality Index (AQI)', value: `${weather.aqi}`, status: aqiScore >= 70 ? 'good' : aqiScore >= 40 ? 'moderate' : 'poor' },
      { label: 'Wind Velocity', value: `${weather.windKph} km/h`, status: windScore >= 70 ? 'good' : 'moderate' },
      { label: 'Cleanliness Grade', value: weather.aqi <= 50 ? 'Good' : weather.aqi <= 100 ? 'Moderate' : 'Unhealthy', status: aqiScore >= 70 ? 'good' : 'poor' },
    ]
  };

  // 5. AKASH (Space / Atmosphere): Overall sky & pressure systems, UV radiation, climate anomalies
  const uvScore = normalize(weather.uvIndex ?? 5, 0, 5, 0, 12);
  const pressureScore = normalize(weather.pressureHpa ?? 1013, 1008, 1018, 970, 1040);

  const akashScoreVal = Math.round((uvScore * 0.50) + (pressureScore * 0.50));
  const akash: ElementScore = {
    score: Math.min(100, Math.max(0, akashScoreVal)),
    status: getElementStatusLabel(akashScoreVal),
    sanskritName: 'आकाश',
    englishName: 'Akash',
    meaning: 'Space, Sky & Atmospheric Pressure',
    represents: 'Upper atmospheric balance, barometric pressure, solar radiation',
    summary: akashScoreVal >= 70
      ? 'Stable solar radiation exposure and barometric pressure balance.'
      : 'Fluctuating barometric pressure or intense UV radiation exposure detected.',
    color: '#7A6C9E',
    keyMetrics: [
      { label: 'UV Index Rating', value: `${weather.uvIndex ?? 4.5}`, status: uvScore >= 70 ? 'good' : 'moderate' },
      { label: 'Barometric Pressure', value: `${weather.pressureHpa ?? 1013} hPa`, status: pressureScore >= 70 ? 'good' : 'moderate' },
      { label: 'Sky Condition', value: weather.description, status: 'good' },
    ]
  };

  // Compute composite Prakruti Score (simple equal weighting average of 5 elements)
  const prakrutiScore = Math.round((prithvi.score + jal.score + agni.score + vayu.score + akash.score) / 5);

  let overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress' = 'Balanced';
  if (prakrutiScore >= 75) overallStatus = 'Healthy / Optimal';
  else if (prakrutiScore >= 55) overallStatus = 'Balanced';
  else if (prakrutiScore >= 35) overallStatus = 'Under Stress';
  else overallStatus = 'Critical Stress';

  return {
    elements: { prithvi, jal, agni, vayu, akash },
    prakrutiScore,
    overallStatus,
  };
}

function getElementStatusLabel(score: number): string {
  if (score >= 75) return 'Optimal / High Balance';
  if (score >= 55) return 'Moderate Balance';
  if (score >= 35) return 'Under Environmental Stress';
  return 'Severe Stress / Critical';
}
