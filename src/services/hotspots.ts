import type { GlobalHotspotItem, MahabhutaElementKey, PrakrutiAnalysis } from '../types/prakrushti';
import { getPrakrutiAnalysis } from './prakrushtiApi';

export interface BenchmarkCity {
  name: string;
  lat: number;
  lng: number;
  countryCode: string;
}

export const BENCHMARK_CITIES: BenchmarkCity[] = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219, countryCode: 'KE' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, countryCode: 'JP' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, countryCode: 'AU' },
  { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, countryCode: 'GB' },
  { name: 'Pune, India', lat: 18.5204, lng: 73.8567, countryCode: 'IN' },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, countryCode: 'BR' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.006, countryCode: 'US' },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, countryCode: 'EG' },
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.209, countryCode: 'IN' },
  { name: 'Phoenix, USA', lat: 33.4484, lng: -112.074, countryCode: 'US' },
  { name: 'Reykjavik, Iceland', lat: 64.1466, lng: -21.9426, countryCode: 'IS' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, countryCode: 'SG' },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708, countryCode: 'AE' },
  { name: 'Beijing, China', lat: 39.9042, lng: 116.4074, countryCode: 'CN' },
  { name: 'Lagos, Nigeria', lat: 6.5244, lng: 3.3792, countryCode: 'NG' },
  { name: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332, countryCode: 'MX' },
  { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173, countryCode: 'RU' },
  { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437, countryCode: 'US' },
  { name: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456, countryCode: 'ID' },
  { name: 'Cape Town, South Africa', lat: -33.9249, lng: 18.4241, countryCode: 'ZA' },
  { name: 'Lima, Peru', lat: -12.0464, lng: -77.0428, countryCode: 'PE' },
  { name: 'Dhaka, Bangladesh', lat: 23.8103, lng: 90.4125, countryCode: 'BD' },
  { name: 'Oslo, Norway', lat: 59.9139, lng: 10.7522, countryCode: 'NO' },
  { name: 'Wellington, New Zealand', lat: -41.2866, lng: 174.7756, countryCode: 'NZ' },
];

const ELEMENT_LABEL: Record<MahabhutaElementKey, string> = {
  prithvi: 'Prithvi (land)',
  jal: 'Jal (water)',
  agni: 'Agni (heat)',
  vayu: 'Vayu (air)',
  akash: 'Akash (sky)',
};

export function analysisToHotspot(city: BenchmarkCity, a: PrakrutiAnalysis): GlobalHotspotItem {
  const ex = a.explainability;
  let primaryStress = 'Balanced across all five elements';
  if (ex) {
    const driver = ex.primaryStressDriver;
    const weakest = [...(a.elements[driver].subMetrics ?? [])].sort((x, y) => x.score - y.score)[0];
    if (weakest && ex.attributions[driver] < 0) {
      primaryStress = `${ELEMENT_LABEL[driver]}: ${weakest.name} ${weakest.rawDisplay}`;
    }
  }
  return {
    name: city.name,
    lat: city.lat,
    lng: city.lng,
    countryCode: city.countryCode,
    prakrutiScore: a.prakrutiScore,
    primaryStress,
    elementStatus: {
      prithvi: a.elements.prithvi.score,
      jal: a.elements.jal.score,
      agni: a.elements.agni.score,
      vayu: a.elements.vayu.score,
      akash: a.elements.akash.score,
    },
  };
}

export function isLiveAnalysis(a: PrakrutiAnalysis): boolean {
  return a.weather.provenance?.atmosphere?.method !== 'ESTIMATED_PROXY';
}

const CACHE_KEY = 'prakrushti_live_hotspots_v1';
const CACHE_TTL_MS = 20 * 60 * 1000;

interface CachePayload {
  ts: number;
  items: GlobalHotspotItem[];
}

export function readHotspotCache(): CachePayload | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!Array.isArray(parsed.items) || Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeHotspotCache(items: GlobalHotspotItem[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items }));
  } catch {
    // storage unavailable
  }
}

export interface LiveHotspotOptions {
  signal?: AbortSignal;
  concurrency?: number;
  onItem?: (item: GlobalHotspotItem) => void;
  onProgress?: (done: number, total: number) => void;
  analyse?: (c: BenchmarkCity) => Promise<PrakrutiAnalysis>;
}

export async function fetchLiveHotspots(opts: LiveHotspotOptions = {}): Promise<GlobalHotspotItem[]> {
  const { signal, concurrency = 4, onItem, onProgress } = opts;
  const analyse =
    opts.analyse ??
    ((c: BenchmarkCity) =>
      getPrakrutiAnalysis({ name: c.name, latitude: c.lat, longitude: c.lng, countryCode: c.countryCode }));

  const queue = [...BENCHMARK_CITIES];
  const results: GlobalHotspotItem[] = [];
  let finished = 0;

  const worker = async () => {
    while (queue.length && !signal?.aborted) {
      const city = queue.shift()!;
      try {
        const analysis = await analyse(city);
        if (isLiveAnalysis(analysis)) {
          const item = analysisToHotspot(city, analysis);
          results.push(item);
          onItem?.(item);
        }
      } catch (e) {
        console.warn(`Hotspot analysis failed for ${city.name}:`, e);
      }
      finished += 1;
      onProgress?.(finished, BENCHMARK_CITIES.length);
    }
  };

  await Promise.all(Array.from({ length: concurrency }, worker));
  if (!signal?.aborted && results.length > 0) writeHotspotCache(results);
  return results;
}

// Curated reference values, shown only when no live feed can be reached.
export const OFFLINE_BASELINE_HOTSPOTS: GlobalHotspotItem[] = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219, prakrutiScore: 82, primaryStress: 'Balanced Rainfall & Highland Climate', elementStatus: { prithvi: 85, jal: 80, agni: 84, vayu: 82, akash: 79 }, countryCode: 'KE' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, prakrutiScore: 79, primaryStress: 'Active Tectonic Subduction Zone', elementStatus: { prithvi: 70, jal: 82, agni: 81, vayu: 85, akash: 78 }, countryCode: 'JP' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, prakrutiScore: 78, primaryStress: 'Solar UV Index & Bushfire Perimeter', elementStatus: { prithvi: 80, jal: 78, agni: 72, vayu: 84, akash: 76 }, countryCode: 'AU' },
  { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, prakrutiScore: 75, primaryStress: 'Cloud Cover Radiative Attenuation', elementStatus: { prithvi: 76, jal: 82, agni: 78, vayu: 72, akash: 68 }, countryCode: 'GB' },
  { name: 'Pune, India', lat: 18.5204, lng: 73.8567, prakrutiScore: 72, primaryStress: 'Urbanizing Boundary Layer & AQI', elementStatus: { prithvi: 75, jal: 70, agni: 73, vayu: 68, akash: 74 }, countryCode: 'IN' },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, prakrutiScore: 68, primaryStress: 'Hydrological Reservoir Deficit', elementStatus: { prithvi: 65, jal: 62, agni: 70, vayu: 72, akash: 71 }, countryCode: 'BR' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060, prakrutiScore: 65, primaryStress: 'Urban Heat Island & Coastal Inundation', elementStatus: { prithvi: 68, jal: 66, agni: 62, vayu: 60, akash: 69 }, countryCode: 'US' },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, prakrutiScore: 42, primaryStress: 'Hyper-Arid Soil Desiccation & Heatwave', elementStatus: { prithvi: 38, jal: 35, agni: 40, vayu: 48, akash: 50 }, countryCode: 'EG' },
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090, prakrutiScore: 36, primaryStress: 'Hazardous Smog Particulate Load (AQI 320+)', elementStatus: { prithvi: 45, jal: 40, agni: 38, vayu: 22, akash: 35 }, countryCode: 'IN' },
  { name: 'Phoenix, Arizona, USA', lat: 33.4484, lng: -112.0740, prakrutiScore: 38, primaryStress: 'Sonoran Desert Thermal Stress (>43°C)', elementStatus: { prithvi: 40, jal: 30, agni: 25, vayu: 52, akash: 44 }, countryCode: 'US' },
];
