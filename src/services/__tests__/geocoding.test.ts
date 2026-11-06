import { describe, it, expect, beforeEach } from 'vitest';
import { searchLocations, clearGeocodeCache, getGeocodeCacheSize } from '../geocoding';

describe('Geocoding & Location Parser with Shared Throttle', () => {
  beforeEach(() => {
    clearGeocodeCache();
  });

  it('returns empty array for empty or short queries without queuing', async () => {
    expect(await searchLocations('')).toEqual([]);
    expect(await searchLocations('a')).toEqual([]);
    expect(await searchLocations('   ')).toEqual([]);
  });

  it('correctly parses raw latitude and longitude coordinates without network call', async () => {
    const results = await searchLocations('18.5204, 73.8567');
    expect(results).toHaveLength(1);
    expect(results[0].latitude).toBeCloseTo(18.5204, 3);
    expect(results[0].longitude).toBeCloseTo(73.8567, 3);
    expect(results[0].countryCode).toBe('GLOBAL');
    expect(getGeocodeCacheSize()).toBe(1);
  });

  it('serves repeated coordinates and queries directly from cache', async () => {
    const res1 = await searchLocations('18.5204, 73.8567');
    const start = Date.now();
    const res2 = await searchLocations('18.5204, 73.8567');
    const duration = Date.now() - start;

    expect(res2).toEqual(res1);
    // Cached query returns synchronously/immediately (<10ms), zero network throttling
    expect(duration).toBeLessThan(50);
  });

  it('rejects invalid latitude and longitude ranges and falls back safely', async () => {
    // Lat > 90
    const outOfBounds = await searchLocations('95.0, 73.0');
    expect(outOfBounds.every(r => r.name !== 'Coordinates: 95.0000, 73.0000')).toBe(true);
  });
});

