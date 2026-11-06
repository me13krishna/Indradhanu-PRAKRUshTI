import React, { useState, useEffect, useRef } from 'react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from '../types/prakrushti';
import { getPrakrutiAnalysis } from '../services/prakrushtiApi';
import { searchLocations, PRESET_LOCATIONS } from '../services/geocoding';
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

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRefA.current && !containerRefA.current.contains(e.target as Node)) {
        setSearchA((prev) => ({ ...prev, isOpen: false }));
      }
      if (containerRefB.current && !containerRefB.current.contains(e.target as Node)) {
        setSearchB((prev) => ({ ...prev, isOpen: false }));
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
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
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>Comparative Ecological Analysis</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          Side-by-Side Panch Mahabhuta Comparison
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Search and compare any two global cities to evaluate elemental resilience, air quality, and thermal stress deltas.
        </p>
      </div>

      {/* Dual Search & Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative mb-8">
        
        {/* Swap Button (Desktop Centered) */}
        <button
          onClick={handleSwapLocations}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-brand-dark hover:bg-brand-light text-white shadow-xl border-2 border-white dark:border-charcoal transition transform hover:scale-110 active:scale-95"
          title="Swap Location A and Location B"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Location A Selector */}
        <div ref={containerRefA} className="card-paper p-5 rounded-3xl border border-slate-200 dark:border-white/10 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono uppercase tracking-wider">
              Location A (Benchmark)
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
                placeholder="Search any global city for Location A..."
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
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition"
              >
                {p.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Location B Selector */}
        <div ref={containerRefB} className="card-paper p-5 rounded-3xl border border-slate-200 dark:border-white/10 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 font-mono uppercase tracking-wider">
              Location B (Comparator)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {locationB.latitude.toFixed(2)}°, {locationB.longitude.toFixed(2)}°
            </span>
          </div>

          {/* Active selection pill */}
          <div className="flex items-center space-x-2 p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 mb-3">
            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
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
                placeholder="Search any global city for Location B..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-white/5 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              {searchB.loading && (
                <Loader2 className="w-3.5 h-3.5 text-teal-600 animate-spin absolute right-3 top-3" />
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
                    className="p-3 hover:bg-teal-50 dark:hover:bg-white/10 cursor-pointer text-xs text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-white/5 last:border-b-0 flex items-center space-x-2"
                  >
                    <Compass className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
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
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition"
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
            Fetching synchronized live observations and computing Panch Mahabhuta scores...
          </span>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Head-to-Head Prakruti Score Banner */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/10 dark:border-white/10">
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Composite Score Differential
              </span>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                <span>Net Delta:</span>
                <span className={scoreDiff > 0 ? 'text-emerald-600' : scoreDiff < 0 ? 'text-rose-500' : 'text-slate-500'}>
                  {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} points
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* Score A Card */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 text-center">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono block">
                  {dataA.location.name.split(',')[0]}
                </span>
                <div className="text-5xl font-serif font-extrabold text-emerald-800 dark:text-emerald-300 mt-2">
                  {dataA.prakrutiScore}
                </div>
                <span className="text-xs font-mono text-slate-400 block mt-1">/ 100</span>
                <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {dataA.overallStatus}
                </div>
              </div>

              {/* Score B Card */}
              <div className="p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-800/30 text-center">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 font-mono block">
                  {dataB.location.name.split(',')[0]}
                </span>
                <div className="text-5xl font-serif font-extrabold text-teal-800 dark:text-teal-300 mt-2">
                  {dataB.prakrutiScore}
                </div>
                <span className="text-xs font-mono text-slate-400 block mt-1">/ 100</span>
                <div className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {dataB.overallStatus}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Panch Mahabhuta Side-by-Side Comparison Grid */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Panch Mahabhuta Elemental Differential
            </h3>

            <div className="space-y-5">
              {elementKeys.map((key) => {
                const elA = dataA.elements[key];
                const elB = dataB.elements[key];
                const delta = elA.score - elB.score;

                return (
                  <div key={key} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-devanagari font-bold text-sm text-slate-800 dark:text-slate-100">
                          {elA.sanskritName}
                        </span>
                        <span className="text-xs text-slate-400 font-sans">({elA.englishName})</span>
                      </div>
                      <div className="font-mono text-xs font-bold">
                        <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{elA.score}</span>
                        <span className="text-slate-300 dark:text-slate-600 mx-2">vs</span>
                        <span className="text-teal-700 dark:text-teal-400 font-extrabold">{elB.score}</span>
                        <span className={`ml-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          delta > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                          delta < 0 ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' :
                          'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                        }`}>
                          {delta > 0 ? `+${delta} A` : delta < 0 ? `+${Math.abs(delta)} B` : 'Tie'}
                        </span>
                      </div>
                    </div>

                    {/* Progress bars comparison */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>{dataA.location.name.split(',')[0]}</span>
                          <span>{elA.score}/100</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${elA.score}%`, backgroundColor: elA.color }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>{dataB.location.name.split(',')[0]}</span>
                          <span>{elB.score}/100</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${elB.score}%`, backgroundColor: elB.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Environmental Signal Comparison Table */}
          <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10 overflow-x-auto">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              Live Environmental Indicators Comparison
            </h3>

            <table className="w-full text-xs font-sans text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="pb-3">Indicator</th>
                  <th className="pb-3 text-emerald-700 dark:text-emerald-400">{dataA.location.name.split(',')[0]}</th>
                  <th className="pb-3 text-teal-700 dark:text-teal-400">{dataB.location.name.split(',')[0]}</th>
                  <th className="pb-3 text-right">Favorable</th>
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
                    <span>Rainfall Rate</span>
                  </td>
                  <td className="py-3">{dataA.weather.precipitationMm} mm/h</td>
                  <td className="py-3">{dataB.weather.precipitationMm} mm/h</td>
                  <td className="py-3 text-right text-slate-400">Measured</td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 font-sans">Relative Humidity</td>
                  <td className="py-3">{dataA.weather.humidityPct}%</td>
                  <td className="py-3">{dataB.weather.humidityPct}%</td>
                  <td className="py-3 text-right font-bold text-emerald-600">
                    {Math.abs(dataA.weather.humidityPct - 55) < Math.abs(dataB.weather.humidityPct - 55)
                      ? dataA.location.name.split(',')[0]
                      : dataB.location.name.split(',')[0]}
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 font-sans">Solar UV Index</td>
                  <td className="py-3">{dataA.weather.uvIndex ?? 4.5}</td>
                  <td className="py-3">{dataB.weather.uvIndex ?? 4.5}</td>
                  <td className="py-3 text-right font-bold text-emerald-600">
                    {(dataA.weather.uvIndex ?? 4.5) < (dataB.weather.uvIndex ?? 4.5)
                      ? dataA.location.name.split(',')[0]
                      : dataB.location.name.split(',')[0]}
                  </td>
                </tr>

                <tr>
                  <td className="py-3 font-semibold text-slate-700 dark:text-slate-200 font-sans">Topsoil Water Proxy</td>
                  <td className="py-3">
                    {dataA.weather.soilMoistureM3M3 != null ? `${dataA.weather.soilMoistureM3M3} m³/m³` : `${dataA.weather.soilMoisturePct}%`}
                  </td>
                  <td className="py-3">
                    {dataB.weather.soilMoistureM3M3 != null ? `${dataB.weather.soilMoistureM3M3} m³/m³` : `${dataB.weather.soilMoisturePct}%`}
                  </td>
                  <td className="py-3 text-right text-slate-400">Topsoil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
