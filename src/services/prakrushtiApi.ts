import type { LocationData, PrakrutiAnalysis } from '../types/prakrushti';
import { fetchWeatherData } from './weather';
import { fetchHazardData } from './hazards';
import { computeElementScores } from './scoringEngine';
import { generateAIInsights } from './aiInsights';

export async function getPrakrutiAnalysis(location: LocationData): Promise<PrakrutiAnalysis> {
  const { latitude, longitude } = location;

  // 1. Fetch live weather & air quality
  const { weather, forecastDays } = await fetchWeatherData(latitude, longitude);

  // 2. Fetch disaster & hazard metrics
  const { disasterRisk, risks } = await fetchHazardData(latitude, longitude, weather);

  // 3. Compute Panch Mahabhuta scores & composite Prakruti Score
  const { elements, prakrutiScore, overallStatus } = computeElementScores(weather, disasterRisk);

  // 4. Generate AI Insights grounded in numbers
  const { insightsEnglish, insightsHindi, recommendationsEnglish, recommendationsHindi } = generateAIInsights(
    location,
    prakrutiScore,
    elements,
    weather,
    disasterRisk
  );

  return {
    location,
    capturedAt: new Date().toISOString(),
    prakrutiScore,
    overallStatus,
    elements,
    weather,
    disasterRisk,
    risks,
    insights: insightsEnglish,
    insightsHindi: insightsHindi,
    recommendations: recommendationsEnglish,
    recommendationsHindi: recommendationsHindi,
    forecastDays,
    meta: {
      generatedAt: new Date().toISOString(),
      language: 'en',
      dataSources: ['Open-Meteo Weather API', 'WAQI Air Quality API', 'USGS Earthquake API', 'Panch Mahabhuta Engine v1.0'],
      cacheHit: false,
    },
  };
}
