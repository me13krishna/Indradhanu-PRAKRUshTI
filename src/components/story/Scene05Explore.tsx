import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, Globe, Activity, ExternalLink } from 'lucide-react';

interface BenchmarkLocation {
  name: string;
  nameHi: string;
  country: string;
  biome: string;
  compositeScore: number;
  status: 'Healthy' | 'Moderate' | 'Stressed';
  statusHi: string;
  elements: {
    prithvi: number;
    jal: number;
    agni: number;
    vayu: number;
    akash: number;
  };
  attribution: {
    driver: string;
    driverDelta: number;
    pillar: string;
    pillarDelta: number;
  };
  weatherSummary: {
    temp: string;
    humidity: string;
    aqi: string;
    wind: string;
  };
}

const BENCHMARK_LOCATIONS: BenchmarkLocation[] = [
  {
    name: 'Pune, Maharashtra',
    nameHi: 'पुणे, महाराष्ट्र',
    country: 'India',
    biome: 'Deccan Tropical Plateau',
    compositeScore: 68,
    status: 'Moderate',
    statusHi: 'मध्यम संतुलन',
    elements: {
      prithvi: 72,
      jal: 64,
      agni: 60,
      vayu: 58,
      akash: 86,
    },
    attribution: {
      driver: 'Vayu (Particulates & Inversion)',
      driverDelta: -4.8,
      pillar: 'Akash (Atmospheric Stability)',
      pillarDelta: +5.2,
    },
    weatherSummary: {
      temp: '27.4°C',
      humidity: '48%',
      aqi: '78 AQI',
      wind: '14 km/h',
    },
  },
  {
    name: 'Tokyo, Kanto',
    nameHi: 'टोक्यो, कांतो',
    country: 'Japan',
    biome: 'Coastal Pacific Megacity',
    compositeScore: 78,
    status: 'Healthy',
    statusHi: 'उत्कृष्ट संतुलन',
    elements: {
      prithvi: 76,
      jal: 82,
      agni: 74,
      vayu: 72,
      akash: 88,
    },
    attribution: {
      driver: 'Agni (Urban Heat Island)',
      driverDelta: -3.2,
      pillar: 'Akash (Maritime Clean Air)',
      pillarDelta: +6.1,
    },
    weatherSummary: {
      temp: '16.2°C',
      humidity: '56%',
      aqi: '32 AQI',
      wind: '18 km/h',
    },
  },
  {
    name: 'Reykjavik, Capital Region',
    nameHi: 'रेकजाविक',
    country: 'Iceland',
    biome: 'Subpolar Maritime Baseline',
    compositeScore: 92,
    status: 'Healthy',
    statusHi: 'अति-स्वस्थ संतुलन',
    elements: {
      prithvi: 88,
      jal: 94,
      agni: 86,
      vayu: 98,
      akash: 92,
    },
    attribution: {
      driver: 'Agni (Subpolar Cold Anomaly)',
      driverDelta: -2.1,
      pillar: 'Vayu (Pristine Arctic Air)',
      pillarDelta: +7.4,
    },
    weatherSummary: {
      temp: '4.8°C',
      humidity: '74%',
      aqi: '12 AQI',
      wind: '24 km/h',
    },
  },
];

interface Scene05ExploreProps {
  onScrollToNext?: () => void;
}

export const Scene05Explore: React.FC<Scene05ExploreProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [selectedLocationIdx, setSelectedLocationIdx] = useState<number>(0);
  const isHi = language === 'hi';

  const loc = BENCHMARK_LOCATIONS[selectedLocationIdx];

  const handleNextClick = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('vision');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="explore"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300"
      aria-label="Chapter 05: Explore the Living System"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-mono mb-4">
            <span className="font-bold">05</span>
            <span>•</span>
            <span>{isHi ? 'लाइव प्रणाली का अवलोकन' : 'The Living System in Action'}</span>
          </div>

          <h2 className="text-fluid-title font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {isHi ? (
              <>
                वास्तविक बायोम, <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400">सजीव वातावरणीय टेलीमेट्री।</span>
              </>
            ) : (
              <>
                Real Biomes. <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400">Live Ecological Diagnostics.</span>
              </>
            )}
          </h2>

          <p className="text-fluid-sub text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-balance">
            {isHi
              ? 'देखें कि कैसे हमारा मॉडल उष्णकटिबंधीय, तटीय और उप-ध्रुवीय जलवायु के लिए वास्तविक समय में पंचमहाभूत संतुलन और सीमांत कारक उत्तरदायित्व (Δi) की गणना करता है।'
              : 'Witness how PRAKRUSHTI dynamically evaluates diverse climatic regions, computing composite scores and decomposing primary stress drivers in real time.'}
          </p>
        </div>

        {/* 3 Benchmark Biome Location Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {BENCHMARK_LOCATIONS.map((b, idx) => {
            const isSelected = selectedLocationIdx === idx;
            return (
              <button
                key={b.name}
                onClick={() => setSelectedLocationIdx(idx)}
                className={`touch-target p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xl scale-105 border-transparent ring-2 ring-blue-400/30'
                    : 'bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-mono opacity-75">{b.country}</div>
                  <div className="font-serif font-bold text-base">{isHi ? b.nameHi : b.name}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{b.biome}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xl font-bold">{b.compositeScore}</div>
                  <div className="text-[10px] font-mono uppercase">{isHi ? b.statusHi : b.status}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Biome Telemetry Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-2xl mb-12">
          
          {/* Card Header: Location Name & Score Gauge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>BENCHMARK BIOREGION TELEMETRY</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {isHi ? loc.nameHi : loc.name}
              </h3>
              <p className="text-xs font-sans text-slate-500">{loc.biome} · {loc.country}</p>
            </div>

            {/* Composite Score Pill */}
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Prakruti Score</span>
                <span className="font-serif font-bold text-3xl text-emerald-600 dark:text-emerald-400">
                  {loc.compositeScore}
                </span>
                <span className="text-xs text-slate-500"> / 100</span>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {isHi ? loc.statusHi : loc.status}
              </span>
            </div>
          </div>

          {/* 5 Elemental Balance Bars */}
          <div className="py-6 border-b border-slate-200 dark:border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isHi ? 'पंचमहाभूत संतुलन स्कोर:' : 'Panch Mahabhuta Health Scores:'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { name: 'Prithvi', score: loc.elements.prithvi, color: 'bg-[#C97B4A]' },
                { name: 'Jal', score: loc.elements.jal, color: 'bg-[#1B6B93]' },
                { name: 'Agni', score: loc.elements.agni, color: 'bg-[#D9822B]' },
                { name: 'Vayu', score: loc.elements.vayu, color: 'bg-[#6FA8C9]' },
                { name: 'Akash', score: loc.elements.akash, color: 'bg-[#7A6C9E]' },
              ].map((el) => (
                <div key={el.name} className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{el.name}</span>
                    <span className="font-bold">{el.score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${el.color}`} style={{ width: `${el.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attribution & Weather Telemetry Row */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Factor Attribution Badges */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-slate-500 block">
                {isHi ? 'सीमांत कारक उत्तरदायित्व (Δi):' : 'Marginal Factor Attribution (Δi):'}
              </span>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-rose-600 font-bold uppercase block">Primary Stress Driver</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{loc.attribution.driver}</span>
                </div>
                <span className="font-mono font-bold text-rose-600">{loc.attribution.driverDelta} pts</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase block">Resilience Pillar</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{loc.attribution.pillar}</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">+{loc.attribution.pillarDelta} pts</span>
              </div>
            </div>

            {/* Live Weather Metrics Mini Strip */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-slate-500 block">
                {isHi ? 'सतही मौसम टेलीमेट्री:' : 'Surface Weather Telemetry:'}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block">Temperature</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{loc.weatherSummary.temp}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block">Humidity</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{loc.weatherSummary.humidity}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block">Air Quality</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{loc.weatherSummary.aqi}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center">
                  <span className="text-[10px] font-mono text-slate-500 block">Wind Velocity</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">{loc.weatherSummary.wind}</span>
                </div>
              </div>

              {/* Direct Launch Button */}
              <button
                onClick={() => navigate('/app')}
                className="w-full touch-target mt-3 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{isHi ? 'संपूर्ण विश्लेषण कंसोल खोलें' : 'Open Full Analytical Console for Any Global Coordinate'}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Transition Link to Scene 06 */}
        <div className="text-center">
          <button
            onClick={handleNextClick}
            className="touch-target inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <span>{isHi ? 'अध्याय ६: संकल्प एवं विज़न' : 'Proceed to Chapter 06: Vision & Stewardship'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
