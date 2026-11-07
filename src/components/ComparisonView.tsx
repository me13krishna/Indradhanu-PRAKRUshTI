import React, { useState, useEffect, useRef } from 'react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from '../types/prakrushti';
import { getPrakrutiAnalysis } from '../services/prakrushtiApi';
import { searchLocations, PRESET_LOCATIONS } from '../services/geocoding';
import { useLanguage } from '../context/LanguageContext';
import { ElementalRealisticIcon } from './ElementalRealisticIcon';
import {
  Sliders,
  ArrowRightLeft,
  Search,
  MapPin,
  Loader2,
  Wind,
  Thermometer,
  CloudRain,
  Compass,
  Droplets,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface ComparisonViewProps {
  initialLocationA: LocationData;
}

interface LocationInputState {
  query: string;
  results: LocationData[];
  loading: boolean;
  isOpen: boolean;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ initialLocationA }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [locationA, setLocationA] = useState<LocationData>(initialLocationA);
  const [locationB, setLocationB] = useState<LocationData>(PRESET_LOCATIONS[1]); // Default Tokyo

  const [dataA, setDataA] = useState<PrakrutiAnalysis | null>(null);
  const [dataB, setDataB] = useState<PrakrutiAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Search state for Location A
  const [searchA, setSearchA] = useState<LocationInputState>({
    query: '',
    results: [],
    loading: false,
    isOpen: false,
  });

  // Search state for Location B
  const [searchB, setSearchB] = useState<LocationInputState>({
    query: '',
    results: [],
    loading: false,
    isOpen: false,
  });

  const debounceRefA = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceRefB = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRefA = useRef<AbortController | null>(null);
  const abortRefB = useRef<AbortController | null>(null);

  const containerRefA = useRef<HTMLDivElement>(null);
  const containerRefB = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRefA.current && !containerRefA.current.contains(e.target as Node)) {
        setSearchA((prev) => ({ ...prev, isOpen: false }));
      }
      if (containerRefB.current && !containerRefB.current.contains(e.target as Node)) {
        setSearchB((prev) => ({ ...prev, isOpen: false }));
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchA((prev) => ({ ...prev, isOpen: false }));
        setSearchB((prev) => ({ ...prev, isOpen: false }));
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (debounceRefA.current) clearTimeout(debounceRefA.current);
      if (debounceRefB.current) clearTimeout(debounceRefB.current);
      if (abortRefA.current) abortRefA.current.abort();
      if (abortRefB.current) abortRefB.current.abort();
    };
  }, []);

  // Fetch live comparison data whenever locationA or locationB changes
  useEffect(() => {
    let cancelled = false;
    async function loadBoth() {
      setLoading(true);
      try {
        const [resA, resB] = await Promise.all([
          getPrakrutiAnalysis(locationA),
          getPrakrutiAnalysis(locationB),
        ]);
        if (!cancelled) {
          setDataA(resA);
          setDataB(resB);
        }
      } catch (e) {
        console.warn('Comparison analysis fetch error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadBoth();
    return () => {
      cancelled = true;
    };
  }, [locationA, locationB]);

  const handleQueryChangeA = (val: string) => {
    setSearchA((prev) => ({ ...prev, query: val }));
    if (debounceRefA.current) clearTimeout(debounceRefA.current);

    if (val.trim().length < 2) {
      setSearchA((prev) => ({ ...prev, results: [], isOpen: false, loading: false }));
      return;
    }

    setSearchA((prev) => ({ ...prev, loading: true, isOpen: true }));
    debounceRefA.current = setTimeout(async () => {
      if (abortRefA.current) abortRefA.current.abort();
      abortRefA.current = new AbortController();
      try {
        const res = await searchLocations(val, abortRefA.current.signal);
        setSearchA((prev) => ({ ...prev, results: res, loading: false }));
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setSearchA((prev) => ({ ...prev, loading: false }));
        }
      }
    }, 350);
  };

  const handleQueryChangeB = (val: string) => {
    setSearchB((prev) => ({ ...prev, query: val }));
    if (debounceRefB.current) clearTimeout(debounceRefB.current);

    if (val.trim().length < 2) {
      setSearchB((prev) => ({ ...prev, results: [], isOpen: false, loading: false }));
      return;
    }

    setSearchB((prev) => ({ ...prev, loading: true, isOpen: true }));
    debounceRefB.current = setTimeout(async () => {
      if (abortRefB.current) abortRefB.current.abort();
      abortRefB.current = new AbortController();
      try {
        const res = await searchLocations(val, abortRefB.current.signal);
        setSearchB((prev) => ({ ...prev, results: res, loading: false }));
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setSearchB((prev) => ({ ...prev, loading: false }));
        }
      }
    }, 350);
  };

  const handleSwapLocations = () => {
    const temp = locationA;
    setLocationA(locationB);
    setLocationB(temp);
  };

  const elementKeys: MahabhutaElementKey[] = ['prithvi', 'jal', 'agni', 'vayu', 'akash'];
  const scoreDiff = dataA && dataB ? dataA.prakrutiScore - dataB.prakrutiScore : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Sliders className="w-3.5 h-3.5" />
          <span>{isHi ? 'तुलनात्मक पारिस्थितिक विश्लेषण' : 'Comparative Ecological Analysis'}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          {isHi ? 'द्वि-स्थान पंचमहाभूत तुलना' : 'Side-by-Side Panch Mahabhuta Comparison'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
          {isHi
            ? 'किन्हीं दो वैश्विक स्थानों के पारिस्थितिक स्वास्थ्य, वायु गुणवत्ता एवं तापीय तनाव का सापेक्ष मूल्यांकन।'
            : 'Benchmark two global locations to evaluate elemental resilience, air quality, and thermal stress deltas.'}
        </p>
      </div>

      {/* Dual Search & Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mb-8">
        
        {/* Swap Button (Desktop Centered) */}
        <button
          onClick={handleSwapLocations}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark hover:bg-brand-light text-white shadow-xl border-2 border-white dark:border-charcoal transition transform hover:scale-110 active:scale-95"
          title="Swap Location A and Location B"
          aria-label="Swap Location A and Location B"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Location A Selector (Emerald / Forest Theme) */}
        <div ref={containerRefA} className="card-paper p-5 rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/30 relative shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{isHi ? 'स्थान अ (आधार)' : 'Location A (Baseline)'}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {locationA.latitude.toFixed(2)}°, {locationA.longitude.toFixed(2)}°
            </span>
          </div>

          {/* Active selection pill */}
          <div className="flex items-center space-x-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 mb-3">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              {locationA.name}
            </span>
          </div>

          {/* Dynamic Search Input */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchA.query}
                onChange={(e) => handleQueryChangeA(e.target.value)}
                onFocus={() => {
                  if (searchA.results.length > 0) {
                    setSearchA((prev) => ({ ...prev, isOpen: true }));
                  }
                }}
                placeholder={isHi ? 'स्थान अ खोजें...' : 'Search any global city for Location A...'}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-white/5 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              {searchA.loading && (
                <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin absolute right-3 top-3" />
              )}
            </div>

            {/* Dropdown Results */}
            {searchA.isOpen && searchA.results.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-52 overflow-y-auto rounded-2xl bg-white dark:bg-charcoal border border-slate-200 dark:border-white/15 shadow-2xl">
                {searchA.results.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLocationA(item);
                      setSearchA((prev) => ({ ...prev, query: '', isOpen: false, results: [] }));
                    }}
                    className="p-3 hover:bg-emerald-50 dark:hover:bg-white/10 cursor-pointer text-xs text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-white/5 last:border-b-0 flex items-center space-x-2"
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {PRESET_LOCATIONS.slice(0, 4).map((p, idx) => (
              <button
                key={idx}
                onClick={() => setLocationA(p)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-slate-100 hover:bg-emerald-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition"
              >
                {p.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Location B Selector (Indigo / Slate Theme) */}
        <div ref={containerRefB} className="card-paper p-5 rounded-3xl border-2 border-indigo-500/30 dark:border-indigo-500/30 relative shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 font-mono uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{isHi ? 'स्थान ब (तुलनात्मक)' : 'Location B (Comparator)'}</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {locationB.latitude.toFixed(2)}°, {locationB.longitude.toFixed(2)}°
            </span>
          </div>

          {/* Active selection pill */}
          <div className="flex items-center space-x-2 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 mb-3">
            <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              {locationB.name}
            </span>
          </div>

          {/* Dynamic Search Input */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchB.query}
                onChange={(e) => handleQueryChangeB(e.target.value)}
                onFocus={() => {
                  if (searchB.results.length > 0) {
                    setSearchB((prev) => ({ ...prev, isOpen: true }));
                  }
                }}
                placeholder={isHi ? 'स्थान ब खोजें...' : 'Search any global city for Location B...'}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-white/5 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              {searchB.loading && (
                <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin absolute right-3 top-3" />
              )}
            </div>

            {/* Dropdown Results */}
            {searchB.isOpen && searchB.results.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-52 overflow-y-auto rounded-2xl bg-white dark:bg-charcoal border border-slate-200 dark:border-white/15 shadow-2xl">
                {searchB.results.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLocationB(item);
                      setSearchB((prev) => ({ ...prev, query: '', isOpen: false, results: [] }));
                    }}
                    className="p-3 hover:bg-indigo-50 dark:hover:bg-white/10 cursor-pointer text-xs text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-white/5 last:border-b-0 flex items-center space-x-2"
                  >
                    <Compass className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {PRESET_LOCATIONS.slice(4, 8).map((p, idx) => (
              <button
                key={idx}
                onClick={() => setLocationB(p)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-slate-100 hover:bg-indigo-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition"
              >
                {p.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading || !dataA || !dataB ? (
        <div className="p-16 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <span className="text-sm font-semibold">
            {isHi ? 'तुलनात्मक मौसमी एवं पंचमहाभूत डेटा संकलित हो रहा है...' : 'Fetching synchronized observations and computing scores...'}
          </span>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Head-to-Head Composite Score Card */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {isHi ? 'प्रकृति सूचकांक अंतर (Net Delta)' : 'Composite Prakruti Score Differential'}
              </span>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                <span>Delta (A − B):</span>
                <span className={scoreDiff > 0 ? 'text-emerald-600 font-extrabold' : scoreDiff < 0 ? 'text-rose-500 font-extrabold' : 'text-slate-500 font-extrabold'}>
                  {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} pts
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              
              {/* Score A Card */}
              <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border-2 border-emerald-500/30 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono uppercase tracking-wider block">
                    {dataA.location.name}
                  </span>
                  <div className="text-5xl font-serif font-extrabold text-emerald-800 dark:text-emerald-300 mt-3">
                    {dataA.prakrutiScore}
                  </div>
                  <span className="text-xs font-mono text-slate-400 block mt-1">/ 100</span>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/30 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {dataA.overallStatus}
                </div>
              </div>

              {/* Score B Card */}
              <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border-2 border-indigo-500/30 text-center flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 font-mono uppercase tracking-wider block">
                    {dataB.location.name}
                  </span>
                  <div className="text-5xl font-serif font-extrabold text-indigo-800 dark:text-indigo-300 mt-3">
                    {dataB.prakrutiScore}
                  </div>
                  <span className="text-xs font-mono text-slate-400 block mt-1">/ 100</span>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-200/50 dark:border-indigo-800/30 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {dataB.overallStatus}
                </div>
              </div>

            </div>
          </div>

          {/* 5 Panch Mahabhuta Side-by-Side Comparison Grid */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{isHi ? 'तत्व-वार अंतर विश्लेषण' : 'Panch Mahabhuta Elemental Differential'}</span>
            </h3>

            <div className="space-y-4">
              {elementKeys.map((key) => {
                const elA = dataA.elements[key];
                const elB = dataB.elements[key];
                const delta = elA.score - elB.score;

                return (
                  <div key={key} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-3">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center space-x-2.5">
                        <ElementalRealisticIcon elementKey={key} size="sm" />
                        <div>
                          <span className="font-devanagari font-bold text-base text-slate-800 dark:text-slate-100 mr-1.5">
                            {elA.sanskritName}
                          </span>
                          <span className="text-xs text-slate-400 font-sans">({elA.englishName})</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 font-mono text-xs">
                        <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">A: {elA.score}</span>
                        <span className="text-slate-300 dark:text-slate-600">vs</span>
                        <span className="text-indigo-700 dark:text-indigo-400 font-extrabold">B: {elB.score}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          delta > 0
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : delta < 0
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                        }`}>
                          {delta > 0 ? `+${delta} in A` : delta < 0 ? `+${Math.abs(delta)} in B` : 'Equal'}
                        </span>
                      </div>
                    </div>

                    {/* Progress bars comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                          <span className="truncate max-w-[150px]">{dataA.location.name.split(',')[0]}</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">{elA.score}/100</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 bg-emerald-600"
                            style={{ width: `${elA.score}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                          <span className="truncate max-w-[150px]">{dataB.location.name.split(',')[0]}</span>
                          <span className="font-bold text-indigo-700 dark:text-indigo-400">{elB.score}/100</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 bg-indigo-600"
                            style={{ width: `${elB.score}%` }}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental Indicators: Desktop Table + Mobile Cards (No Overflow!) */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              {isHi ? 'मुख्य पर्यावरणीय संकेतक तुलना' : 'Core Environmental Indicators Comparison'}
            </h3>

            {/* Desktop Table View (>=md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs font-sans text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3">Indicator</th>
                    <th className="pb-3 text-emerald-700 dark:text-emerald-400">{dataA.location.name.split(',')[0]}</th>
                    <th className="pb-3 text-indigo-700 dark:text-indigo-400">{dataB.location.name.split(',')[0]}</th>
                    <th className="pb-3 text-right">More Favorable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono">
                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                      <span>Temperature</span>
                    </td>
                    <td className="py-3">{dataA.weather.temperatureC}°C</td>
                    <td className="py-3">{dataB.weather.temperatureC}°C</td>
                    <td className="py-3 text-right font-bold text-emerald-600">
                      {Math.abs(dataA.weather.temperatureC - 22) < Math.abs(dataB.weather.temperatureC - 22)
                        ? dataA.location.name.split(',')[0]
                        : dataB.location.name.split(',')[0]}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span>Air Quality (US AQI)</span>
                    </td>
                    <td className="py-3">{dataA.weather.aqi}</td>
                    <td className="py-3">{dataB.weather.aqi}</td>
                    <td className="py-3 text-right font-bold text-emerald-600">
                      {dataA.weather.aqi < dataB.weather.aqi
                        ? dataA.location.name.split(',')[0]
                        : dataB.location.name.split(',')[0]}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                      <span>24h Precipitation</span>
                    </td>
                    <td className="py-3">{dataA.weather.precipitationMm} mm</td>
                    <td className="py-3">{dataB.weather.precipitationMm} mm</td>
                    <td className="py-3 text-right text-slate-400">Observed</td>
                  </tr>

                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>Relative Humidity</span>
                    </td>
                    <td className="py-3">{dataA.weather.humidityPct}%</td>
                    <td className="py-3">{dataB.weather.humidityPct}%</td>
                    <td className="py-3 text-right font-bold text-emerald-600">
                      {Math.abs(dataA.weather.humidityPct - 55) < Math.abs(dataB.weather.humidityPct - 55)
                        ? dataA.location.name.split(',')[0]
                        : dataB.location.name.split(',')[0]}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Solar UV Index</span>
                    </td>
                    <td className="py-3">{dataA.weather.uvIndex ?? 4.5}</td>
                    <td className="py-3">{dataB.weather.uvIndex ?? 4.5}</td>
                    <td className="py-3 text-right font-bold text-emerald-600">
                      {(dataA.weather.uvIndex ?? 4.5) < (dataB.weather.uvIndex ?? 4.5)
                        ? dataA.location.name.split(',')[0]
                        : dataB.location.name.split(',')[0]}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                      <Compass className="w-3.5 h-3.5 text-amber-600" />
                      <span>Topsoil Moisture Proxy (0–1cm)</span>
                    </td>
                    <td className="py-3">
                      {dataA.weather.soilMoistureM3M3 != null ? `${dataA.weather.soilMoistureM3M3} m³/m³` : `${dataA.weather.soilMoisturePct}%`}
                    </td>
                    <td className="py-3">
                      {dataB.weather.soilMoistureM3M3 != null ? `${dataB.weather.soilMoistureM3M3} m³/m³` : `${dataB.weather.soilMoisturePct}%`}
                    </td>
                    <td className="py-3 text-right text-slate-400">ECMWF Reanalysis</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View (<md, e.g. 360px & 390px) */}
            <div className="md:hidden space-y-3">
              {[
                {
                  label: 'Temperature',
                  valA: `${dataA.weather.temperatureC}°C`,
                  valB: `${dataB.weather.temperatureC}°C`,
                  winner: Math.abs(dataA.weather.temperatureC - 22) < Math.abs(dataB.weather.temperatureC - 22) ? 'A' : 'B',
                  icon: Thermometer,
                },
                {
                  label: 'Air Quality (AQI)',
                  valA: `${dataA.weather.aqi}`,
                  valB: `${dataB.weather.aqi}`,
                  winner: dataA.weather.aqi < dataB.weather.aqi ? 'A' : 'B',
                  icon: Wind,
                },
                {
                  label: '24h Precipitation',
                  valA: `${dataA.weather.precipitationMm} mm`,
                  valB: `${dataB.weather.precipitationMm} mm`,
                  winner: 'None',
                  icon: CloudRain,
                },
                {
                  label: 'Relative Humidity',
                  valA: `${dataA.weather.humidityPct}%`,
                  valB: `${dataB.weather.humidityPct}%`,
                  winner: Math.abs(dataA.weather.humidityPct - 55) < Math.abs(dataB.weather.humidityPct - 55) ? 'A' : 'B',
                  icon: Droplets,
                },
                {
                  label: 'UV Index',
                  valA: `${dataA.weather.uvIndex ?? 4.5}`,
                  valB: `${dataB.weather.uvIndex ?? 4.5}`,
                  winner: (dataA.weather.uvIndex ?? 4.5) < (dataB.weather.uvIndex ?? 4.5) ? 'A' : 'B',
                  icon: Sun,
                },
              ].map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                      <div className="flex items-center space-x-1.5">
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span>{ind.label}</span>
                      </div>
                      {ind.winner !== 'None' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                          Favors {ind.winner === 'A' ? dataA.location.name.split(',')[0] : dataB.location.name.split(',')[0]}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/40 text-emerald-900 dark:text-emerald-200">
                        <div className="text-[10px] text-emerald-600 truncate">{dataA.location.name.split(',')[0]}</div>
                        <div className="font-extrabold text-sm">{ind.valA}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/40 text-indigo-900 dark:text-indigo-200">
                        <div className="text-[10px] text-indigo-600 truncate">{dataB.location.name.split(',')[0]}</div>
                        <div className="font-extrabold text-sm">{ind.valB}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
