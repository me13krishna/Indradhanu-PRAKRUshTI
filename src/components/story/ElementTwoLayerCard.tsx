import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, BookOpen, Cpu, Sparkles, Scale, Info } from 'lucide-react';

export interface MahabhutaElementDetail {
  id: 'prithvi' | 'jal' | 'agni' | 'vayu' | 'akash';
  sanskrit: string;
  devanagari: string;
  colorHex: string;
  auraClass: string;
  tagColor: string;
  
  // Cultural Lens
  culturalTitleEn: string;
  culturalTitleHi: string;
  sanskritVerse: string;
  verseTranslationEn: string;
  verseTranslationHi: string;
  culturalPhilosophyEn: string;
  culturalPhilosophyHi: string;
  ecologicalDutyEn: string;
  ecologicalDutyHi: string;

  // Scientific Signals
  scientificDomainEn: string;
  scientificDomainHi: string;
  benchmarkSource: string;
  primaryEquation: string;
  weightsBreakdown: { labelEn: string; labelHi: string; weight: string; unit: string }[];
  scientificVariablesEn: string[];
  scientificVariablesHi: string[];
  scientificLimitationsEn: string;
  scientificLimitationsHi: string;
}

interface ElementTwoLayerCardProps {
  element: MahabhutaElementDetail;
  activeLayer: 'cultural' | 'scientific' | 'both';
}

export const ElementTwoLayerCard: React.FC<ElementTwoLayerCardProps> = ({
  element,
  activeLayer,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const showCultural = activeLayer === 'cultural' || activeLayer === 'both';
  const showScientific = activeLayer === 'scientific' || activeLayer === 'both';

  return (
    <div className={`relative rounded-3xl p-6 sm:p-8 glass-panel border border-slate-200/80 dark:border-white/10 shadow-2xl transition-all duration-300 ${element.auraClass} overflow-hidden`}>
      
      {/* Element Header Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center space-x-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-xl text-white shadow-lg"
            style={{ backgroundColor: element.colorHex }}
          >
            {element.sanskrit.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {element.sanskrit}
              </h3>
              <span className="font-devanagari text-lg font-bold text-slate-500 dark:text-slate-400">
                ({element.devanagari})
              </span>
            </div>
            <p className="text-xs font-mono tracking-tight text-slate-500 dark:text-slate-400">
              {isHi ? element.scientificDomainHi : element.scientificDomainEn}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-slate-600 dark:text-slate-300">{element.benchmarkSource}</span>
        </div>
      </div>

      {/* Main Content Grid: Two Layers Side-by-Side or Stacked */}
      <div className={`pt-6 grid gap-6 ${activeLayer === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* LAYER 1: THE CULTURAL LENS */}
        {showCultural && (
          <div className="p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col justify-between space-y-5 animate-fadeIn">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 mb-3">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="uppercase tracking-wider">
                  {isHi ? 'सांस्कृतिक एवं दार्शनिक दृष्टिकोण' : 'Cultural & Philosophical Lens'}
                </span>
              </div>

              {/* Sanskrit Shloka Verse */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 mb-4">
                <p className="font-serif italic font-medium text-amber-900 dark:text-amber-200 text-sm leading-relaxed">
                  {element.sanskritVerse}
                </p>
                <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1 font-sans">
                  {isHi ? element.verseTranslationHi : element.verseTranslationEn}
                </p>
              </div>

              {/* Core Philosophical Meaning */}
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isHi ? element.culturalTitleHi : element.culturalTitleEn}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {isHi ? element.culturalPhilosophyHi : element.culturalPhilosophyEn}
              </p>
            </div>

            {/* Ecological Duty (Dharma) */}
            <div className="pt-4 border-t border-amber-500/20 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-amber-700 dark:text-amber-400 font-semibold block mb-1 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isHi ? 'मानव कर्तव्य एवं पारिस्थितिक दायित्व:' : 'Ecological Stewardship Mandate:'}</span>
              </strong>
              <span>{isHi ? element.ecologicalDutyHi : element.ecologicalDutyEn}</span>
            </div>
          </div>
        )}

        {/* LAYER 2: THE SCIENTIFIC SIGNALS */}
        {showScientific && (
          <div className="p-6 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-5 animate-fadeIn">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span className="uppercase tracking-wider">
                  {isHi ? 'वैज्ञानिक संकेत एवं गणितीय आधार' : 'Scientific Signals & Telemetry'}
                </span>
              </div>

              {/* Primary Formula Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs leading-relaxed overflow-x-auto mb-4">
                <div className="text-[10px] text-slate-400 mb-1 flex items-center space-x-1">
                  <Scale className="w-3 h-3" />
                  <span>Mathematical Normalization Function:</span>
                </div>
                <code>{element.primaryEquation}</code>
              </div>

              {/* Sub-Metric Weights Breakdown */}
              <h4 className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                {isHi ? 'उप-संकेतक भार एवं इकाइयाँ:' : 'Sub-Metric Weights & Physical Units:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {element.weightsBreakdown.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white dark:bg-charcoal/80 border border-slate-200 dark:border-white/10 text-xs"
                  >
                    <div className="flex items-center justify-between font-mono font-semibold">
                      <span className="text-slate-800 dark:text-slate-200">{isHi ? w.labelHi : w.labelEn}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{w.weight}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{w.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Provenance & Boundary Disclosure */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-700 dark:text-slate-300 font-semibold block mb-1 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5 text-teal-500" />
                <span>{isHi ? 'सीमाएं एवं मॉडल प्रकटीकरण:' : 'Scientific Limitations & Provenance Disclosure:'}</span>
              </strong>
              <span>{isHi ? element.scientificLimitationsHi : element.scientificLimitationsEn}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

