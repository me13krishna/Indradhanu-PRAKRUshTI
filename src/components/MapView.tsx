import React, { useEffect, useRef, useState } from 'react';
import { Loader2, MousePointerClick } from 'lucide-react';
import type { LocationData, WeatherData } from '../types/prakrushti';
import { reverseGeocode } from '../services/geocoding';
import { useLanguage } from '../context/LanguageContext';
import { scoreTone } from '../lib/tone';

interface MapViewProps {
  location: LocationData;
  prakrutiScore: number;
  weather?: WeatherData;
  onPickLocation?: (loc: LocationData) => void;
  className?: string;
}

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const MapView: React.FC<MapViewProps> = ({ location, prakrutiScore, weather, onPickLocation, className = '' }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const tone = scoreTone(prakrutiScore);

  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const tileRef = useRef<any>(null);
  const pickRef = useRef(onPickLocation);
  const [picking, setPicking] = useState(false);
  const [ready, setReady] = useState(false);

  pickRef.current = onPickLocation;

  useEffect(() => {
    let cancelled = false;
    let abort: AbortController | null = null;

    import('leaflet').then((L) => {
      if (cancelled || !hostRef.current || mapRef.current) return;
      leafletRef.current = L;
      const map = L.map(hostRef.current, {
        center: [location.latitude, location.longitude],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapRef.current = map;
      setReady(true);

      map.on('focus', () => map.scrollWheelZoom.enable());
      map.on('blur', () => map.scrollWheelZoom.disable());

      map.on('click', async (e: any) => {
        if (!pickRef.current) return;
        abort?.abort();
        abort = new AbortController();
        setPicking(true);
        const loc = await reverseGeocode(e.latlng.lat, e.latlng.lng, abort.signal);
        if (!abort.signal.aborted) {
          setPicking(false);
          pickRef.current?.(loc);
        }
      });
      setTimeout(() => map.invalidateSize(), 60);
    });

    return () => {
      cancelled = true;
      abort?.abort();
      mapRef.current?.remove();
      mapRef.current = null;
      tileRef.current = null;
      markerRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!ready || !L || !map) return;
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map);
    tileRef.current.bringToBack();
  }, [ready]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!ready || !L || !map) return;
    map.flyTo([location.latitude, location.longitude], Math.max(map.getZoom(), 8), { duration: 1.1 });

    const el = document.createElement('div');
    el.className = 'prakruti-pin';
    el.style.setProperty('--pin', tone.hex);
    const ring = document.createElement('span');
    ring.className = 'ring';
    const core = document.createElement('span');
    core.className = 'core';
    el.append(ring, core);

    if (markerRef.current) map.removeLayer(markerRef.current);
    markerRef.current = L.marker([location.latitude, location.longitude], {
      icon: L.divIcon({ html: el, className: '', iconSize: [22, 22], iconAnchor: [11, 11] }),
      keyboard: false,
    }).addTo(map);
  }, [ready, location.latitude, location.longitude, tone.hex]);

  return (
    <div className={`card-paper rounded-[2rem] overflow-hidden p-0 ${className}`}>
      <div ref={hostRef} className="absolute inset-0" tabIndex={0} aria-label="Interactive map" />

      <div className="absolute top-4 left-4 z-[500] pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white">
          <div className="eyebrow !text-emerald-300/90 !text-[0.58rem]">{isHi ? 'भू-स्थानिक' : 'Geospatial'}</div>
          <div className="font-mono text-[11px] text-slate-200">
            {location.latitude.toFixed(3)}°, {location.longitude.toFixed(3)}°
          </div>
        </div>
      </div>

      {onPickLocation && (
        <div className="absolute top-4 right-4 z-[500] pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-[11px] text-slate-200 flex items-center gap-1.5">
            {picking ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-300" />
            ) : (
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-300" />
            )}
            {picking ? (isHi ? 'स्थान खोज रहे हैं…' : 'Locating…') : isHi ? 'विश्लेषण के लिए मानचित्र पर क्लिक करें' : 'Click map to analyse any point'}
          </div>
        </div>
      )}

      {weather && (
        <div className="absolute bottom-4 left-4 right-16 z-[500] pointer-events-none flex flex-wrap gap-2">
          {[
            { k: isHi ? 'तापमान' : 'Temp', v: `${weather.temperatureC}°C` },
            { k: 'AQI', v: `${weather.aqi}` },
            { k: isHi ? 'हवा' : 'Wind', v: `${weather.windKph} km/h` },
          ].map((chip) => (
            <div key={chip.k} className="px-3 py-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mr-1.5">{chip.k}</span>
              <span className="font-mono text-sm font-bold">{chip.v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
