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

export async function searchLocations(query: string): Promise<LocationData[]> {
  if (!query || query.trim().length < 2) return [];

  // Check if query is latitude, longitude
  const latLngMatch = query.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (latLngMatch) {
    const lat = parseFloat(latLngMatch[1]);
    const lng = parseFloat(latLngMatch[3]);
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return [{
        name: `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        latitude: lat,
        longitude: lng,
        countryCode: 'GLOBAL',
      }];
    }
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PRAKRUshTI-Climate-App/1.0'
      }
    });

    if (!response.ok) throw new Error('Geocoding API request failed');

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      countryCode: item.address?.country_code?.toUpperCase() || null,
    }));
  } catch (error) {
    console.warn('Geocoding fallback activated:', error);
    // Fallback to searching preset locations
    return PRESET_LOCATIONS.filter(loc => 
      loc.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
