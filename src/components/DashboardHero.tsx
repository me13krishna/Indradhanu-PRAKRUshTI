import React from 'react';
import { motion } from 'motion/react';
import { Zap, MessageSquare, FileText, GitCompareArrows, TrendingDown, TrendingUp, ShieldCheck, Radio, WifiOff } from 'lucide-react';
import type { MahabhutaElementKey, PrakrutiAnalysis, LocationData } from '../types/prakrushti';
import { PrakrutiGauge } from './PrakrutiGauge';
import { ElementRadar } from './ElementRadar';
import { MapView } from './MapView';
import { useLanguage } from '../context/LanguageContext';
import { ELEMENT_META } from '../lib/tone';
import { EASE } from './ui/primitives';

interface DashboardHeroProps {
  analysis: PrakrutiAnalysis;
  onSelectElement: (key: MahabhutaElementKey) => void;
  onActionPlan: () => void;
  onAskAI: () => void;
  onExport: () => void;
  onCompare: () => void;
  onPickLocation: (loc: LocationData) => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  analysis,
  onSelectElement,
  onActionPlan,
  onAskAI,
  onExport,
  onCompare,
  onPickLocation,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [city, ...rest] = analysis.location.name.split(',');
  const region = rest.join(',').trim();
  const ex = analysis.explainability;

  const isFallback = analysis.weather.provenance?.atmosphere?.method === 'ESTIMATED_PROXY';
  const airEstimated = !isFallback && analysis.weather.provenance?.airQuality?.method === 'ESTIMATED_PROXY';

  const captured = new Date(analysis.capturedAt);
  const time = !isNaN(captured.getTime()) ? captured.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  const driver = ex ? ELEMENT_META[ex.primaryStressDriver] : null;
  const pillar = ex ? ELEMENT_META[ex.primaryResiliencePillar] : null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5" aria-label="Overview">
      <motion.div
        className="lg:col-span-7 card-paper gradient-border noise rounded-[2rem] p-6 sm:p-8 overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              isFallback || airEstimated
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
            }`}
          >
            {isFallback || airEstimated ? <WifiOff className="w-3 h-3" /> : <Radio className="w-3 h-3" />}
            {isFallback
              ? isHi ? 'ऑफ़लाइन आधार डेटा, लाइव नहीं' : 'Offline baseline, not live data'
              : airEstimated
              ? isHi ? 'लाइव मौसम, अनुमानित वायु गुणवत्ता' : 'Live weather, estimated air quality'
              : isHi ? 'लाइव उपग्रह एवं मॉडल डेटा' : 'Live satellite & model data'}
          </span>
          {time && (
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {isHi ? 'अपडेट' : 'Updated'} {time}
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight light-text-gradient leading-[1.05]">{city}</h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 font-mono">
          {region && <span>{region} · </span>}
          {analysis.location.latitude.toFixed(2)}°, {analysis.location.longitude.toFixed(2)}°
          {analysis.weather.elevationM != null && <span> · {analysis.weather.elevationM} m</span>}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <PrakrutiGauge score={analysis.prakrutiScore} overallStatus={analysis.overallStatus} className="w-full max-w-[300px] mx-auto aspect-square" />
          <ElementRadar elements={analysis.elements} onSelect={onSelectElement} className="w-full max-w-[320px] mx-auto aspect-square text-slate-900 dark:text-white" />
        </div>

        {ex && driver && pillar && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => onSelectElement(ex.primaryStressDriver)}
              className="text-left p-3 rounded-2xl bg-rose-500/[0.07] border border-rose-500/20 hover:border-rose-500/50 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-300">
                <TrendingDown className="w-3.5 h-3.5" />
                {isHi ? 'मुख्य तनाव कारक' : 'Biggest drag'}
              </div>
              <div className="mt-1 font-serif text-lg font-bold text-slate-900 dark:text-white">
                <span className="font-devanagari">{driver.sa}</span> <span className="text-sm font-sans text-slate-500">{ex.attributions[ex.primaryStressDriver]} pts</span>
              </div>
            </button>
            <button
              onClick={() => onSelectElement(ex.primaryResiliencePillar)}
              className="text-left p-3 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
                <TrendingUp className="w-3.5 h-3.5" />
                {isHi ? 'सबसे मज़बूत स्तंभ' : 'Strongest pillar'}
              </div>
              <div className="mt-1 font-serif text-lg font-bold text-slate-900 dark:text-white">
                <span className="font-devanagari">{pillar.sa}</span> <span className="text-sm font-sans text-slate-500">+{ex.attributions[ex.primaryResiliencePillar]} pts</span>
              </div>
            </button>
            <div className="p-3 rounded-2xl bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isHi ? 'विश्वास स्तर' : 'Data confidence'}
              </div>
              <div className="mt-1 font-serif text-lg font-bold text-slate-900 dark:text-white">{ex.confidenceScore}%</div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button
            onClick={onActionPlan}
            className="group relative overflow-hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 shadow-lg shadow-amber-900/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all"
          >
            <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Zap className="relative w-4 h-4 fill-slate-950" />
            <span className="relative">{isHi ? 'एक्शन प्लान बनाएं' : 'Generate action plan'}</span>
          </button>
          <button
            onClick={onAskAI}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 hover:-translate-y-0.5 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            {isHi ? 'AI से पूछें' : 'Ask AI'}
          </button>
          <button
            onClick={onCompare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/70 dark:bg-white/[0.06] border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:border-emerald-500/50 transition-colors"
          >
            <GitCompareArrows className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            {isHi ? 'दूसरे शहर से तुलना' : 'Compare with…'}
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/70 dark:bg-white/[0.06] border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:border-emerald-500/50 transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
            {isHi ? 'रिपोर्ट' : 'Report'}
          </button>
        </div>
      </motion.div>

      <motion.div
        className="lg:col-span-5 min-h-[420px] lg:min-h-0 relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
      >
        <MapView
          className="absolute inset-0"
          location={analysis.location}
          prakrutiScore={analysis.prakrutiScore}
          weather={analysis.weather}
          onPickLocation={onPickLocation}
        />
      </motion.div>
    </section>
  );
};
