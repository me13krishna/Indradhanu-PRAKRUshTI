import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchWeatherData } from '../weather';

const okJson = (body: unknown) => ({ ok: true, status: 200, json: async () => body }) as Response;
const failing = (status: number) => ({ ok: false, status, json: async () => ({ error: true, reason: 'limit' }) }) as Response;

afterEach(() => vi.unstubAllGlobals());

const WEATHER_BODY = {
  elevation: 561,
  current: { temperature_2m: 31.4, relative_humidity_2m: 40, precipitation: 0, weather_code: 1, surface_pressure: 950, wind_speed_10m: 9 },
  daily: { time: ['2026-01-01'], temperature_2m_max: [32], temperature_2m_min: [20], precipitation_probability_max: [5], weather_code: [1] },
};

describe('Weather data integrity', () => {
  it('uses real values and live provenance when both feeds respond', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => (url.includes('air-quality') ? okJson({ current: { us_aqi: 88, pm2_5: 30, uv_index: 6 } }) : okJson(WEATHER_BODY))));
    const { weather } = await fetchWeatherData(18.5, 73.8);
    expect(weather.temperatureC).toBe(31);
    expect(weather.aqi).toBe(88);
    expect(weather.provenance.atmosphere.method).toBe('NWP_ATMOSPHERIC_ANALYSIS');
    expect(weather.provenance.airQuality.method).toBe('ATMOSPHERIC_DISPERSION_MODEL');
  });

  it('flags the offline baseline when the weather API is rate limited instead of passing defaults off as live', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => failing(429)));
    const { weather } = await fetchWeatherData(18.5, 73.8);
    expect(weather.provenance.atmosphere.method).toBe('ESTIMATED_PROXY');
  });

  it('flags the offline baseline when the weather API returns an error body with HTTP 200', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => okJson({ error: true, reason: 'bad request' })));
    const { weather } = await fetchWeatherData(18.5, 73.8);
    expect(weather.provenance.atmosphere.method).toBe('ESTIMATED_PROXY');
  });

  it('keeps live weather but marks air quality as estimated when only the AQ feed fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async (url: string) => (url.includes('air-quality') ? failing(500) : okJson(WEATHER_BODY))));
    const { weather } = await fetchWeatherData(18.5, 73.8);
    expect(weather.temperatureC).toBe(31);
    expect(weather.provenance.atmosphere.method).toBe('NWP_ATMOSPHERIC_ANALYSIS');
    expect(weather.provenance.airQuality.method).toBe('ESTIMATED_PROXY');
  });
});
