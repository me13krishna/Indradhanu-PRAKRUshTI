import { describe, it, expect } from 'vitest';
import { generateAIInsights } from '../aiInsights';
import { processAssistantQuery } from '../aiChatEngine';
import { computeElementScores } from '../scoringEngine';
import type { WeatherData, HazardRisk, PrakrutiAnalysis } from '../../types/prakrushti';

describe('AI Insights & Conversational Assistant Engine (Phase 3)', () => {
  const baseWeather: WeatherData = {
    temperatureC: 24,
    feelsLikeC: 24,
    humidityPct: 50,
    precipitationMm: 0,
    windKph: 12,
    aqi: 40,
    pm2_5: 9.5,
    weatherCode: 0,
    description: 'Clear sky',
    uvIndex: 4.0,
    pressureHpa: 1013,
    elevationM: 560,
    soilMoisturePct: 55,
    soilMoistureM3M3: 0.25,
    soilTemperatureC: 22,
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

  const scoring = computeElementScores(baseWeather, baseHazards);

  const mockAnalysis: PrakrutiAnalysis = {
    location: {
      name: 'Pune, Maharashtra, India',
      latitude: 18.5204,
      longitude: 73.8567,
    },
    capturedAt: new Date().toISOString(),
    prakrutiScore: scoring.prakrutiScore,
    overallStatus: scoring.overallStatus,
    elements: scoring.elements,
    weather: baseWeather,
    disasterRisk: baseHazards,
    risks: [],
    safetyAdvisories: scoring.safetyAdvisories,
    explainability: scoring.explainability,
    insights: '',
    recommendations: [],
    forecastDays: [],
    meta: {
      generatedAt: new Date().toISOString(),
      language: 'en',
      dataSources: ['Open-Meteo', 'CAMS', 'USGS'],
    },
  };

  // --------------------------------------------------------------------------
  // 1. GROUNDED AI INSIGHTS GENERATOR TEST
  // --------------------------------------------------------------------------
  describe('generateAIInsights', () => {
    it('produces bilingual diagnostics strictly grounded in real numerical inputs without NaN or undefined', () => {
      const output = generateAIInsights(
        mockAnalysis.location,
        mockAnalysis.prakrutiScore,
        mockAnalysis.elements,
        mockAnalysis.weather,
        mockAnalysis.disasterRisk,
        mockAnalysis.explainability,
        mockAnalysis.safetyAdvisories
      );

      expect(output.insightsEnglish).toBeDefined();
      expect(output.insightsEnglish).toContain('Pune');
      expect(output.insightsEnglish).toContain(`${mockAnalysis.prakrutiScore}/100`);
      expect(output.insightsEnglish).not.toContain('NaN');
      expect(output.insightsEnglish).not.toContain('undefined');

      expect(output.insightsHindi).toBeDefined();
      expect(output.insightsHindi).toContain('Pune');
      expect(output.insightsHindi).toContain(`${mockAnalysis.prakrutiScore}/100`);

      expect(output.recommendationsEnglish.length).toBeGreaterThanOrEqual(4);
      expect(output.recommendationsHindi.length).toBeGreaterThanOrEqual(4);
    });

    it('cites marginal attribution delta and active safety advisory during severe smog events', () => {
      const severeSmogWeather: WeatherData = {
        ...baseWeather,
        aqi: 320,
        pm2_5: 160.0,
      };
      const severeScoring = computeElementScores(severeSmogWeather, baseHazards);

      const output = generateAIInsights(
        mockAnalysis.location,
        severeScoring.prakrutiScore,
        severeScoring.elements,
        severeSmogWeather,
        baseHazards,
        severeScoring.explainability,
        severeScoring.safetyAdvisories
      );

      // Should mention Vayu as primary stress driver
      expect(output.insightsEnglish.toLowerCase()).toContain('vayu');
      // Should mention critical advisory
      expect(output.insightsEnglish).toContain('CRITICAL ADVISORY');
      // English recommendations should recommend N95 masks
      expect(output.recommendationsEnglish.some(r => r.includes('N95'))).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // 2. CONVERSATIONAL ASSISTANT QUERY ENGINE TEST
  // --------------------------------------------------------------------------
  describe('processAssistantQuery', () => {
    it('accurately answers outdoor running queries under clean conditions', () => {
      const response = processAssistantQuery('Is it safe to go for a run right now?', mockAnalysis, 'en');

      expect(response.category).toBe('safety');
      expect(response.verdictBadge?.variant).toBe('good');
      expect(response.text).toContain('optimal for outdoor exercise');
      expect(response.metricsCited?.some(m => m.label.includes('PM2.5'))).toBe(true);
    });

    it('warns user against outdoor exercise when PM2.5 exceeds safe limits', () => {
      const pollutedAnalysis: PrakrutiAnalysis = {
        ...mockAnalysis,
        weather: {
          ...baseWeather,
          aqi: 220,
          pm2_5: 95.0,
        },
      };

      const response = processAssistantQuery('Can I go jogging outside?', pollutedAnalysis, 'en');
      expect(response.category).toBe('safety');
      expect(response.verdictBadge?.variant).toBe('danger');
      expect(response.text.toLowerCase()).toContain('not recommended');
      expect(response.text).toContain('95 µg/m³');
    });

    it('diagnoses primary stress driver and cites finite-difference marginal drag', () => {
      const response = processAssistantQuery('What is the primary factor dragging down the score?', mockAnalysis, 'en');

      expect(response.category).toBe('diagnosis');
      expect(response.metricsCited?.some(m => m.label.includes('Primary Stress'))).toBe(true);
      expect(response.text).toContain('Marginal Factor Impact');
    });

    it('answers water and flood queries citing exact precipitation numbers', () => {
      const rainyAnalysis: PrakrutiAnalysis = {
        ...mockAnalysis,
        weather: {
          ...baseWeather,
          precipitationMm: 28.5,
          humidityPct: 88,
        },
      };

      const response = processAssistantQuery('What are the precipitation and flood risks?', rainyAnalysis, 'en');
      expect(response.category).toBe('hydrology');
      expect(response.text).toContain('28.5 mm/h');
      expect(response.text).toContain('88%');
    });

    it('compares particulate matter against WHO 24-hour guidelines', () => {
      const response = processAssistantQuery('How does this compare against WHO standards?', mockAnalysis, 'en');

      expect(response.category).toBe('standards');
      expect(response.text).toContain('15 µg/m³'); // WHO benchmark
      expect(response.text).toContain('PM2.5');
    });

    it('correctly returns natural Hindi responses when asked in Hindi', () => {
      const response = processAssistantQuery('क्या बाहर दौड़ना सुरक्षित है?', mockAnalysis, 'hi');

      expect(response.category).toBe('safety');
      expect(response.text).toContain('Pune');
      expect(response.text).toContain('व्यायाम');
    });
  });
});
