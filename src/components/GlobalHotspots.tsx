import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, RefreshCw, Radio, WifiOff, Trophy, ShieldAlert, Globe2, MapPin } from 'lucide-react';
import type { GlobalHotspotItem, LocationData } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { scoreTone, ELEMENT_META, ELEMENT_ORDER } from '../lib/tone';
import { Segmented, SectionHeader, AnimatedNumber, EASE } from './ui/primitives';
import { OFFLINE_BASELINE_HOTSPOTS, BENCHMARK_CITIES, fetchLiveHotspots, readHotspotCache } from '../services/hotspots';

interface GlobalHotspotsProps {
  onSelectCity: (loc: LocationData) => void;
}

type Filter = 'all' | 'healthiest' | 'stressed';
type Status = 'loading' | 'live' | 'offline';

const MIN_LIVE_CITIES = 6;

export const GlobalHotspots: React.FC<GlobalHotspotsProps> = ({ onSelectCity }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const cached = useMemo(() => readHotspotCache(), []);
  const [items, setItems] = useState<GlobalHotspotItem[]>(cached?.items ?? []);
  const [status, setStatus] = useState<Status>(cached ? 'live' : 'loading');
  const [progress, setProgress] = useState({ done: cached ? BENCHMARK_CITIES.length : 0, total: BENCHMARK_CITIES.length });
  const [updatedAt, setUpdatedAt] = useState<number | null>(cached?.ts ?? null);
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const abortRef = useRef<AbortController | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setStatus('loading');
    setItems([]);
    setProgress({ done: 0, total: BENCHMARK_CITIES.length });
    const live = await fetchLiveHotspots({
      signal: ctrl.signal,
      onItem: (item) => {
        if (ctrl.signal.aborted) return;
        setItems((prev) => (prev.some((p) => p.name === item.name) ? prev : [...prev, item]));
      },
      onProgress: (done, total) => {
        if (!ctrl.signal.aborted) setProgress({ done, total });
      },
    });
    if (ctrl.signal.aborted) return;
    if (live.length >= MIN_LIVE_CITIES) {
      setItems(live);
      setStatus('live');
      setUpdatedAt(Date.now());
    } else {
      setItems(OFFLINE_BASELINE_HOTSPOTS);
      setStatus('offline');
    }
  }, []);

  useEffect(() => {
    if (!cached) load();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = useMemo(() => [...items].sort((a, b) => b.prakrutiScore - a.prakrutiScore), [items]);
  const list = useMemo(() => {
    if (filter === 'healthiest') return sorted.slice(0, 5);
    if (filter === 'stressed') return sorted.slice(-5).reverse();
    return sorted;
  }, [sorted, filter]);
  const selected = useMemo(() => items.find((i) => i.name === selectedName) ?? null, [items, selectedName]);
  const avg = items.length ? items.reduce((s, i) => s + i.prakrutiScore, 0) / items.length : 0;

  useEffect(() => {
    let cancelled = false;
    import('leaflet').then((L) => {
      if (cancelled || !hostRef.current || mapRef.current) return;
      leafletRef.current = L;
      const map = L.map(hostRef.current, { center: [22, 12], zoom: 2, minZoom: 2, maxZoom: 9, worldCopyJump: true, zoomControl: false, scrollWheelZoom: false });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      map.on('focus', () => map.scrollWheelZoom.enable());
      map.on('blur', () => map.scrollWheelZoom.disable());
      mapRef.current = map;
      setMapReady(true);
      setTimeout(() => map.invalidateSize(), 80);
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    if (!mapReady || !L || !layerRef.current) return;
    layerRef.current.clearLayers();
    markersRef.current.clear();
    list.forEach((item) => {
      const tone = scoreTone(item.prakrutiScore);
      const isSel = item.name === selectedName;
      const marker = L.circleMarker([item.lat, item.lng], {
        radius: isSel ? 13 : item.prakrutiScore < 45 ? 10 : 8,
        fillColor: tone.hex,
        color: isSel ? '#ffffff' : 'rgba(255,255,255,0.7)',
        weight: isSel ? 3 : 2,
        fillOpacity: 0.9,
      });
      marker.bindTooltip(`${item.name.split(',')[0]} · ${item.prakrutiScore}`, { direction: 'top', offset: [0, -6] });
      marker.on('click', () => selectItem(item, false));
      layerRef.current.addLayer(marker);
      markersRef.current.set(item.name, marker);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, mapReady, selectedName]);

  const selectItem = (item: GlobalHotspotItem, fly = true) => {
    setSelectedName(item.name);
    if (fly && mapRef.current) mapRef.current.flyTo([item.lat, item.lng], 4, { duration: 1.1 });
  };

  const analyse = (item: GlobalHotspotItem) =>
    onSelectCity({ name: item.name, latitude: item.lat, longitude: item.lng, countryCode: item.countryCode });

  const pct = Math.round((progress.done / Math.max(1, progress.total)) * 100);
  const updated = updatedAt ? new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        eyebrow={isHi ? 'वैश्विक रैंकिंग' : 'Global ranking'}
        title={isHi ? 'दुनिया के शहर, लाइव डेटा पर' : 'The world, scored live'}
        subtitle={
          isHi
            ? 'हर शहर को उसी पंचमहाभूत इंजन से अभी के उपग्रह और मॉडल डेटा पर आँका जाता है।'
            : 'Every city is scored right now by the same Panch Mahabhuta engine you see on the dashboard, from live Open-Meteo, CAMS and USGS data.'
        }
        right={
          <button
            onClick={load}
            disabled={status === 'loading'}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/70 dark:bg-white/[0.06] border border-slate-900/10 dark:border-white/10 hover:border-emerald-500/50 disabled:opacity-60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-600 dark:text-emerald-300 ${status === 'loading' ? 'animate-spin' : ''}`} />
            {isHi ? 'ताज़ा करें' : 'Refresh'}
          </button>
        }
      />

      <div
        className={`mb-5 rounded-2xl border px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2 ${
          status === 'offline' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/[0.07] border-emerald-500/20'
        }`}
        role="status"
      >
        <span className={`flex items-center gap-2 text-sm font-semibold ${status === 'offline' ? 'text-amber-600 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
          {status === 'offline' ? <WifiOff className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
          {status === 'loading' &&
            (isHi ? `लाइव डेटा जुट रहा है… ${progress.done}/${progress.total}` : `Scoring cities live… ${progress.done}/${progress.total}`)}
          {status === 'live' &&
            (isHi ? `${items.length} शहर लाइव स्कोर हुए` : `${items.length} cities scored live`)}
          {status === 'offline' &&
            (isHi ? 'लाइव फ़ीड उपलब्ध नहीं: संदर्भ आधार डेटा दिखा रहे हैं' : 'Live feeds unreachable: showing curated reference baseline')}
        </span>
        {status === 'loading' && (
          <div className="flex-1 min-w-[120px] h-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
          </div>
        )}
        {status !== 'loading' && updated && status === 'live' && (
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {isHi ? 'अपडेट' : 'Updated'} {updated}
          </span>
        )}
        {status === 'offline' && (
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {isHi ? 'ये क्यूरेटेड मान हैं, लाइव माप नहीं। पुनः प्रयास करें।' : 'These are curated values, not live measurements. Retry when online.'}
          </span>
        )}
        {items.length > 0 && (
          <span className="ml-auto text-xs font-mono text-slate-500 dark:text-slate-400">
            {isHi ? 'वैश्विक औसत' : 'Global average'}{' '}
            <AnimatedNumber value={avg} decimals={1} className="font-bold text-slate-900 dark:text-white" />
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 card-paper rounded-[2rem] overflow-hidden relative min-h-[420px] lg:min-h-[640px]">
          <div ref={hostRef} className="absolute inset-0" tabIndex={0} aria-label="Global hotspot map" />
          <div className="absolute top-4 left-4 z-[500] pointer-events-none px-3 py-2 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center gap-3 text-[11px] text-slate-200">
            {[
              { c: '#34d399', t: isHi ? 'स्वस्थ ≥70' : 'Healthy ≥70' },
              { c: '#fbbf24', t: isHi ? 'निगरानी 45–69' : 'Watch 45–69' },
              { c: '#f87171', t: isHi ? 'तनाव <45' : 'Stressed <45' },
            ].map((l) => (
              <span key={l.t} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.c }} />
                {l.t}
              </span>
            ))}
          </div>
          {status === 'loading' && items.length === 0 && (
            <div className="absolute inset-0 z-[400] flex items-center justify-center pointer-events-none">
              <div className="px-4 py-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-slate-100 text-sm flex items-center gap-2">
                <Globe2 className="w-4 h-4 animate-pulse text-emerald-300" />
                {isHi ? 'पहले शहर आ रहे हैं…' : 'First cities arriving…'}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <Segmented<Filter>
            layoutId="hotspot-filter"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: isHi ? 'सभी' : 'All' },
              { value: 'healthiest', label: isHi ? 'शीर्ष 5' : 'Top 5', icon: <Trophy className="w-3.5 h-3.5" /> },
              { value: 'stressed', label: isHi ? 'सबसे तनावग्रस्त' : 'Most stressed', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
            ]}
          />

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="card-paper gradient-border rounded-3xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="eyebrow">{isHi ? 'चयनित' : 'Selected'}</div>
                    <div className="font-serif text-xl font-bold text-slate-900 dark:text-white truncate">{selected.name}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selected.primaryStress}</p>
                  </div>
                  <span className="display-number text-4xl" style={{ color: scoreTone(selected.prakrutiScore).hex }}>
                    {selected.prakrutiScore}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {ELEMENT_ORDER.map((k) => (
                    <div key={k} className="text-center">
                      <div className="h-14 rounded-lg bg-slate-900/8 dark:bg-white/8 relative overflow-hidden">
                        <motion.div
                          className="absolute bottom-0 inset-x-0 rounded-lg"
                          style={{ background: ELEMENT_META[k].hex }}
                          initial={{ height: 0 }}
                          animate={{ height: `${selected.elementStatus[k]}%` }}
                          transition={{ duration: 0.8, ease: EASE }}
                        />
                      </div>
                      <div className="font-devanagari text-xs font-bold mt-1" style={{ color: ELEMENT_META[k].hex }}>
                        {ELEMENT_META[k].sa}
                      </div>
                      <div className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{selected.elementStatus[k]}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => analyse(selected)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  {isHi ? 'डैशबोर्ड में पूरा विश्लेषण' : 'Open full analysis'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="card-paper rounded-3xl p-2 flex-1 overflow-y-auto max-h-[460px]" data-lenis-prevent>
            {list.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-500">{isHi ? 'डेटा की प्रतीक्षा…' : 'Waiting for the first results…'}</div>
            )}
            <AnimatePresence initial={false}>
              {list.map((item) => {
                const tone = scoreTone(item.prakrutiScore);
                const rank = sorted.findIndex((s) => s.name === item.name) + 1;
                const active = item.name === selectedName;
                return (
                  <motion.button
                    layout
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    onClick={() => selectItem(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-colors ${
                      active ? 'bg-emerald-500/12 ring-1 ring-emerald-500/40' : 'hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="w-6 text-center font-mono text-xs text-slate-400">{rank}</span>
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: tone.hex }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900 dark:text-white truncate">{item.name}</span>
                      <span className="mt-1.5 block h-1.5 rounded-full bg-slate-900/8 dark:bg-white/10 overflow-hidden">
                        <motion.span
                          className="block h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${tone.hex}88, ${tone.hex})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.prakrutiScore}%` }}
                          transition={{ duration: 0.9, ease: EASE }}
                        />
                      </span>
                    </span>
                    <span className="font-serif text-lg font-extrabold tabular-nums w-9 text-right" style={{ color: tone.hex }}>
                      {item.prakrutiScore}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
