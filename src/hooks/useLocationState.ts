import { useCallback, useEffect, useRef, useState } from 'react';
import type { LocationData } from '../types/prakrushti';
import { PRESET_LOCATIONS } from '../services/geocoding';

const LAST_KEY = 'prakrushti_last_location';
const RECENT_KEY = 'prakrushti_recent_locations';
const MAX_RECENT = 6;

export const APP_TABS = ['dashboard', 'compare', 'hotspots', 'simulator', 'knowledge', 'about'] as const;
export type AppTab = (typeof APP_TABS)[number];

function isValidLocation(v: unknown): v is LocationData {
  const l = v as LocationData;
  return (
    !!l &&
    typeof l.name === 'string' &&
    typeof l.latitude === 'number' &&
    typeof l.longitude === 'number' &&
    Math.abs(l.latitude) <= 90 &&
    Math.abs(l.longitude) <= 180
  );
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function readLocationFromUrl(search: string): LocationData | null {
  const p = new URLSearchParams(search);
  const lat = parseFloat(p.get('lat') ?? '');
  const lng = parseFloat(p.get('lng') ?? '');
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const loc: LocationData = {
    name: (p.get('place') || `${lat.toFixed(3)}, ${lng.toFixed(3)}`).slice(0, 120),
    latitude: lat,
    longitude: lng,
  };
  return isValidLocation(loc) ? loc : null;
}

export function readTabFromUrl(search: string): AppTab {
  const t = new URLSearchParams(search).get('tab');
  return (APP_TABS as readonly string[]).includes(t ?? '') ? (t as AppTab) : 'dashboard';
}

export function buildShareUrl(loc: LocationData, tab: AppTab): string {
  const url = new URL('/app', window.location.origin);
  url.searchParams.set('lat', loc.latitude.toFixed(4));
  url.searchParams.set('lng', loc.longitude.toFixed(4));
  url.searchParams.set('place', loc.name);
  if (tab !== 'dashboard') url.searchParams.set('tab', tab);
  return url.toString();
}

function sameLocation(a: LocationData, b: LocationData) {
  return Math.abs(a.latitude - b.latitude) < 0.01 && Math.abs(a.longitude - b.longitude) < 0.01;
}

export function useLocationState(route: string = '/app') {
  const [location, setLocationState] = useState<LocationData>(() => {
    if (typeof window === 'undefined') return PRESET_LOCATIONS[0];
    const fromUrl = readLocationFromUrl(window.location.search);
    if (fromUrl) return fromUrl;
    const last = readJson<LocationData>(LAST_KEY);
    return isValidLocation(last) ? last : PRESET_LOCATIONS[0];
  });

  const [recents, setRecents] = useState<LocationData[]>(() => {
    if (typeof window === 'undefined') return [];
    const list = readJson<LocationData[]>(RECENT_KEY);
    return Array.isArray(list) ? list.filter(isValidLocation).slice(0, MAX_RECENT) : [];
  });

  const [tab, setTabState] = useState<AppTab>(() =>
    typeof window === 'undefined' ? 'dashboard' : readTabFromUrl(window.location.search)
  );

  const prevRoute = useRef(route);
  const skipWrite = useRef(false);

  useEffect(() => {
    if (route === '/app' && prevRoute.current !== '/app') {
      const fromUrl = readLocationFromUrl(window.location.search);
      if (fromUrl) setLocationState(fromUrl);
      if (new URLSearchParams(window.location.search).has('tab')) setTabState(readTabFromUrl(window.location.search));
      skipWrite.current = true;
    }
    prevRoute.current = route;
  }, [route]);

  const setLocation = useCallback((loc: LocationData) => {
    setLocationState(loc);
    setRecents((prev) => {
      const next = [loc, ...prev.filter((r) => !sameLocation(r, loc))].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable
      }
      return next;
    });
  }, []);

  const setTab = useCallback((next: AppTab) => {
    setTabState(next);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LAST_KEY, JSON.stringify(location));
    } catch {
      // storage unavailable
    }
    if (typeof window === 'undefined' || route !== '/app') return;
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lat', location.latitude.toFixed(4));
    url.searchParams.set('lng', location.longitude.toFixed(4));
    url.searchParams.set('place', location.name);
    if (tab === 'dashboard') url.searchParams.delete('tab');
    else url.searchParams.set('tab', tab);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }, [location, tab, route]);

  return { location, setLocation, recents, tab, setTab };
}
