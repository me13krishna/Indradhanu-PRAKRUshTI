import type { LocationData } from '../types/prakrushti';

export const PRESET_LOCATIONS: LocationData[] = [
  { name: 'Pune, India', latitude: 18.5204, longitude: 73.8567, countryCode: 'IN', timezone: 'Asia/Kolkata' },
  { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503, countryCode: 'JP', timezone: 'Asia/Tokyo' },
  { name: 'Nairobi, Kenya', latitude: -1.2921, longitude: 36.8219, countryCode: 'KE', timezone: 'Africa/Nairobi' },
  { name: 'São Paulo, Brazil', latitude: -23.5505, longitude: -46.6333, countryCode: 'BR', timezone: 'America/Sao_Paulo' },
  { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278, countryCode: 'GB', timezone: 'Europe/London' },
  { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060, countryCode: 'US', timezone: 'America/New_York' },
  { name: 'Cairo, Egypt', latitude: 30.0444, longitude: 31.2357, countryCode: 'EG', timezone: 'Africa/Cairo' },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093, countryCode: 'AU', timezone: 'Australia/Sydney' },
];

// In-memory query cache to eliminate duplicate network calls
const geocodeCache = new Map<string, LocationData[]>();

// Shared rate-limiter: enforces Nominatim Public Usage Policy (max 1 req/sec = 1000ms minimum interval)
let lastNetworkDispatchTime = 0;
let throttleChain: Promise<void> = Promise.resolve();

/**
 * Enforces a strictly serialized minimum delay of 1050ms between network calls to Nominatim.
 */
async function scheduleNominatimRequest(signal?: AbortSignal): Promise<void> {
  const currentWait = throttleChain.then(async () => {
    if (signal?.aborted) return;
    const now = Date.now();
    const elapsed = now - lastNetworkDispatchTime;
    const minIntervalMs = 1050; // Strict compliance: >1000ms minimum interval

    if (elapsed < minIntervalMs) {
      const waitTime = minIntervalMs - elapsed;
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, waitTime);
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new DOMException('Aborted during rate-limit queue', 'AbortError'));
          }, { once: true });
        }
      });
    }

    if (signal?.aborted) {
      throw new DOMException('Aborted before network dispatch', 'AbortError');
    }

    lastNetworkDispatchTime = Date.now();
  });

  // Chain next request after current completes or catches error
  throttleChain = currentWait.catch(() => {});
  return currentWait;
}

export function getGeocodeCacheSize(): number {
  return geocodeCache.size;
}

export function clearGeocodeCache(): void {
  geocodeCache.clear();
}

export async function searchLocations(query: string, signal?: AbortSignal): Promise<LocationData[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  // Check in-memory cache first (Zero network call, 0 delay)
  const cacheKey = cleanQuery.toLowerCase();
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  // Check if query is latitude, longitude coordinates
  const latLngMatch = cleanQuery.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (latLngMatch) {
    const lat = parseFloat(latLngMatch[1]);
    const lng = parseFloat(latLngMatch[3]);
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      const coordResult: LocationData[] = [{
        name: `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        latitude: lat,
        longitude: lng,
        countryCode: 'GLOBAL',
      }];
      geocodeCache.set(cacheKey, coordResult);
      return coordResult;
    }
  }

  try {
    // Wait for shared throttle queue before initiating network fetch
    await scheduleNominatimRequest(signal);

    if (signal?.aborted) {
      return [];
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PRAKRUshTI-Climate-Intelligence/1.0 (Academic Environmental Platform; contact: indradhanu-challenge)'
      },
      signal,
    });

    if (!response.ok) throw new Error(`Geocoding request failed: ${response.status}`);

    const data = await response.json();
    const results: LocationData[] = data.map((item: any) => ({
      name: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      countryCode: item.address?.country_code?.toUpperCase() || null,
    }));

    geocodeCache.set(cacheKey, results);
    return results;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      return [];
    }
    console.warn('Geocoding fallback activated:', error);
    // Fallback to searching preset locations
    return PRESET_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(cleanQuery.toLowerCase())
    );
  }
}
