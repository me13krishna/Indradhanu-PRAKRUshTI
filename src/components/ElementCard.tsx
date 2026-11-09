import React from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { ChevronRight, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { ElementalRealisticIcon } from './ElementalRealisticIcon';
import { useLanguage } from '../context/LanguageContext';

interface ElementCardProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClick: () => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({ elementKey, element, onClick }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const isOptimal = element.score >= 70;
  const isModerate = element.score >= 50 && element.score < 70;

  // Status label aligned with the reference image
  const statusLabel = isOptimal
    ? (isHi ? 'इष्टतम संतुलन' : 'Optimal Balance')
    : isModerate
    ? (isHi ? 'मध्यम संतुलन' : 'Moderate Balance')
    : (isHi ? 'पर्यावरणीय तनाव' : 'Severe Stress');

  // Marginal Attribution delta
  const delta = element.marginalAttribution ?? 0;
  const absDelta = Math.abs(delta);
  const ptLabel = absDelta === 1 ? (isHi ? 'अंक' : 'pt') : (isHi ? 'अंक' : 'pts');

  // Elemental top wash gradients for soft ambient aura matching the reference design
  const elementGradients: Record<MahabhutaElementKey, string> = {
    prithvi: 'from-[#C97B4A]/14 via-[#C97B4A]/4 to-transparent dark:from-[#C97B4A]/22 dark:via-transparent',
    jal: 'from-[#1B6B93]/14 via-[#1B6B93]/4 to-transparent dark:from-[#1B6B93]/22 dark:via-transparent',
    agni: 'from-[#D9822B]/14 via-[#D9822B]/4 to-transparent dark:from-[#D9822B]/22 dark:via-transparent',
    vayu: 'from-[#0D9488]/14 via-[#0D9488]/4 to-transparent dark:from-[#0D9488]/22 dark:via-transparent',
    akash: 'from-[#7A6C9E]/14 via-[#7A6C9E]/4 to-transparent dark:from-[#7A6C9E]/22 dark:via-transparent',
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${element.sanskritName} (${element.englishName}) - Score ${element.score} of 100`}
      className="card-paper rounded-3xl p-5 sm:p-5.5 cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 border border-slate-200/80 dark:border-white/10 relative overflow-hidden group select-none flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
    >
      {/* Top subtle elemental color wash */}
      <div
        className={`absolute top-0 left-0 right-0 h-36 bg-gradient-to-b ${elementGradients[elementKey]} pointer-events-none transition-opacity duration-300`}
      />

      {/* Top colored accent rim border */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: element.color }}
      />

      {/* Delicate organic leaf watermark in the top-right corner */}
      <div className="absolute top-1 right-1 w-24 h-24 pointer-events-none opacity-[0.06] dark:opacity-[0.04] overflow-hidden">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-slate-900 dark:text-white">
          <path d="M15,85 Q45,15 85,15 Q85,60 15,85 Z" />
          <path d="M30,70 Q55,35 80,22" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M50,50 Q62,56 72,50" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M40,60 Q50,68 60,63" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* 1. Card Header: Realistic Icon + Sanskrit & English Titles */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <ElementalRealisticIcon elementKey={elementKey} size="md" />
          </div>
          <div className="min-w-0">
            <span className="font-devanagari text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight block leading-tight truncate">
              {element.sanskritName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-sans font-medium block truncate">
              {element.englishName}
            </span>
          </div>
        </div>

        {/* 2. Score & Attribution Delta Block */}
        <div className="text-center my-2">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              {element.score}
            </span>
            <span className="text-xs sm:text-sm text-slate-400 font-mono ml-1 font-semibold">
              / 100
            </span>
          </div>

          {/* Delta Pill */}
          <div className="flex items-center justify-center mt-0.5 text-xs font-bold font-sans">
            {delta > 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <span className="text-[10px]">▲</span>
                <span>+{delta} {ptLabel}</span>
              </span>
            ) : delta < 0 ? (
              <span className="text-rose-600 dark:text-rose-400 flex items-center space-x-1">
                <span className="text-[10px]">▼</span>
                <span>{delta} {ptLabel}</span>
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <span className="text-[10px] font-mono">—</span>
                <span>0 {ptLabel}</span>
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 sm:h-2 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden mt-3">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${element.score}%`,
                backgroundColor: element.color,
                boxShadow: `0 0 8px ${element.color}40`,
              }}
            />
          </div>
        </div>

        {/* 3. Inset Telemetry Parameters Box (3 Rows, clean & highly readable) */}
        <div className="my-2 p-3 sm:p-3.5 rounded-2xl bg-[#F6F8F6] dark:bg-white/[0.05] border border-slate-200/70 dark:border-white/5 space-y-2">
          {element.keyMetrics.map((metric, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs gap-2">
              <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px] sm:text-xs leading-tight">
                {metric.label}
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-[11px] sm:text-xs font-mono text-right flex-shrink-0">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Status Pill Action Button */}
      <div className="relative z-10 mt-2">
        <div
          className={`w-full py-2 px-3.5 rounded-full flex items-center justify-between text-xs font-semibold transition-all duration-200 shadow-sm ${
            isOptimal
              ? 'bg-[#EBF7EE] text-[#1E6B3E] border border-[#C6E6D0] group-hover:bg-[#E1F3E5] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50'
              : isModerate
              ? 'bg-[#FEF7E8] text-[#8C5E0D] border border-[#F6E1B5] group-hover:bg-[#FDF0D5] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50'
              : 'bg-[#FDF0ED] text-[#9A2D1F] border border-[#F7CAC4] group-hover:bg-[#FCE6E1] dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50'
          }`}
        >
          <span className="flex items-center space-x-1.5 truncate">
            {isOptimal ? (
              <CheckCircle2 className="w-4 h-4 text-[#1E6B3E] dark:text-emerald-400 flex-shrink-0" />
            ) : isModerate ? (
              <AlertCircle className="w-4 h-4 text-[#8C5E0D] dark:text-amber-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#9A2D1F] dark:text-rose-400 flex-shrink-0" />
            )}
            <span className="truncate">{statusLabel}</span>
          </span>
          <ChevronRight
            className={`w-4 h-4 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-200 ${
              isOptimal
                ? 'text-[#1E6B3E] dark:text-emerald-400'
                : isModerate
                ? 'text-[#8C5E0D] dark:text-amber-400'
                : 'text-[#9A2D1F] dark:text-rose-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
