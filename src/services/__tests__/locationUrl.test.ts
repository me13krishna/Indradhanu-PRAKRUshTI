import { describe, it, expect } from 'vitest';
import { readLocationFromUrl, readTabFromUrl } from '../../hooks/useLocationState';
import { scoreTone, hazardTone } from '../../lib/tone';

describe('Shareable location URLs', () => {
  it('parses a valid location with place name', () => {
    const loc = readLocationFromUrl('?lat=18.5204&lng=73.8567&place=Pune%2C+India');
    expect(loc).toEqual({ name: 'Pune, India', latitude: 18.5204, longitude: 73.8567 });
  });

  it('falls back to coordinates as the name', () => {
    expect(readLocationFromUrl('?lat=10&lng=20')?.name).toBe('10.000, 20.000');
  });

  it('rejects missing, non-numeric and out-of-range coordinates', () => {
    expect(readLocationFromUrl('')).toBeNull();
    expect(readLocationFromUrl('?lat=abc&lng=3')).toBeNull();
    expect(readLocationFromUrl('?lat=95&lng=10')).toBeNull();
    expect(readLocationFromUrl('?lat=10&lng=181')).toBeNull();
  });

  it('truncates absurdly long place names', () => {
    const long = 'x'.repeat(500);
    expect(readLocationFromUrl(`?lat=1&lng=2&place=${long}`)!.name.length).toBe(120);
  });

  it('reads known tabs and defaults to dashboard otherwise', () => {
    expect(readTabFromUrl('?tab=hotspots')).toBe('hotspots');
    expect(readTabFromUrl('?tab=nope')).toBe('dashboard');
    expect(readTabFromUrl('')).toBe('dashboard');
  });
});

describe('Score tones', () => {
  it('buckets scores at 70 and 45', () => {
    expect(scoreTone(70).level).toBe('healthy');
    expect(scoreTone(69).level).toBe('moderate');
    expect(scoreTone(45).level).toBe('moderate');
    expect(scoreTone(44).level).toBe('stressed');
  });

  it('orders hazard severity', () => {
    expect(hazardTone('low').value).toBeLessThan(hazardTone('moderate').value);
    expect(hazardTone('high').value).toBeLessThan(hazardTone('critical').value);
  });
});
