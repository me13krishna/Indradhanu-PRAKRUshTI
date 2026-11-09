import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getNugenConfig,
  saveNugenCredentials,
  clearNugenCredentials,
  buildNugenSystemPrompt,
  queryNugenAssistant,
} from '../nugenService';
import type { PrakrutiAnalysis } from '../../types/prakrushti';

// Safe mock for localStorage in Node/Vitest environment
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: storageMock,
  writable: true,
});

const mockAnalysis: PrakrutiAnalysis = {
  location: {
    name: 'Pune, Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567,
    elevationM: 560,
  },
  prakrutiScore: 68,
  confidenceScore: 0.95,
  dominantElement: 'jal',
  ecologicalState: 'Moderate Equilibrium',
  elements: {
    prithvi: { key: 'prithvi', englishName: 'Earth', sanskritName: 'Prithvi', score: 72, status: 'Resilient' },
    jal: { key: 'jal', englishName: 'Water', sanskritName: 'Jal', score: 65, status: 'Vulnerable' },
    agni: { key: 'agni', englishName: 'Fire/Thermal', sanskritName: 'Agni', score: 58, status: 'Stressed' },
    vayu: { key: 'vayu', englishName: 'Air', sanskritName: 'Vayu', score: 48, status: 'Degraded' },
    akash: { key: 'akash', englishName: 'Space/Atmosphere', sanskritName: 'Akash', score: 80, status: 'Resilient' },
  },
  weather: {
    temperatureC: 29.5,
    feelsLikeC: 31.0,
    humidityPct: 62,
    aqi: 135,
    pm2_5: 58,
    precipitationMm: 2.4,
    uvIndex: 6.2,
    windSpeedKmh: 14,
    windDirectionDeg: 240,
    atmosphericPressureHpa: 1012,
  },
  explainability: {
    primaryStressDriver: 'vayu',
    primaryResiliencePillar: 'akash',
    attributions: { vayu: -14, akash: +8 },
  },
} as unknown as PrakrutiAnalysis;

describe('Nugen Intelligence Domain-Aligned Model Service', () => {
  beforeEach(() => {
    storageMock.clear();
    clearNugenCredentials();
    vi.restoreAllMocks();
  });

  it('manages dynamic credentials safely in localStorage without hardcoding', () => {
    saveNugenCredentials('test_nug_key_123', 'prakrushti-custom-v2');
    const config = getNugenConfig();
    expect(config.apiKey).toBe('test_nug_key_123');
    expect(config.modelId).toBe('prakrushti-custom-v2');

    clearNugenCredentials();
    const cleared = getNugenConfig();
    expect(cleared.apiKey).toBe('');
  });

  it('constructs a comprehensive domain context including all 5 Panch Mahabhuta elements', () => {
    const promptEn = buildNugenSystemPrompt(mockAnalysis, 'en');
    expect(promptEn).toContain('Pune, Maharashtra');
    expect(promptEn).toContain('Composite Prakruti Score: 68/100');
    expect(promptEn).toContain('Prithvi (Soil/Land): 72/100');
    expect(promptEn).toContain('Jal (Water/Precipitation): 65/100');
    expect(promptEn).toContain('Agni (Thermal/Heat): 58/100');
    expect(promptEn).toContain('Vayu (Air Quality): 48/100');
    expect(promptEn).toContain('Akash (Space/Atmosphere/UV): 80/100');
    expect(promptEn).toContain('Primary Stress Driver: vayu');
  });

  it('falls back seamlessly to internal grounded engine when no API key is set', async () => {
    clearNugenCredentials();
    const result = await queryNugenAssistant('Is it safe for outdoor exercise?', mockAnalysis, 'en');
    expect(result.sender).toBe('assistant');
    expect(result.text.length).toBeGreaterThan(10);
    expect(result.metricsCited).toBeDefined();
  });

  it('executes live inference through Nugen when key is present', async () => {
    saveNugenCredentials('valid_key', 'prakrushti-eco-v1');

    // Mock fetch for Nugen API response
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: 'Based on Nugen domain alignment, Vayu is degraded (AQI 135, PM2.5 58). Exercise indoors.',
            },
          },
        ],
      }),
    });
    globalThis.fetch = mockFetch;

    const result = await queryNugenAssistant('What should we do about air quality?', mockAnalysis, 'en');
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.text).toContain('Based on Nugen domain alignment');
    expect(result.verdictBadge?.label).toContain('Nugen Aligned');
  });

  it('gracefully degrades to local engine if Nugen API returns an HTTP error', async () => {
    saveNugenCredentials('expired_key', 'prakrushti-eco-v1');

    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    });
    globalThis.fetch = mockFetch;

    const result = await queryNugenAssistant('Is it safe for outdoor sports?', mockAnalysis, 'en');
    expect(result.sender).toBe('assistant');
    expect(result.text.length).toBeGreaterThan(10);
    expect(result.verdictBadge?.label).toContain('Nugen');
  });
});
