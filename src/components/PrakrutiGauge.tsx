import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrakrutiGaugeProps {
  score: number;
  overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress';
  locationName: string;
}

export const PrakrutiGauge: React.FC<PrakrutiGaugeProps> = ({ score, overallStatus, locationName }) => {
  const { t } = useLanguage();

  // Color mapping based on score
  let strokeColor = '#52A373'; // Healthy Green
  let badgeBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  let Icon = CheckCircle2;

  if (score < 40) {
    strokeColor = '#C4554D'; // Stressed Red
    badgeBg = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    Icon = AlertOctagon;
  } else if (score < 70) {
    strokeColor = '#E0A02D'; // Amber
    badgeBg = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    Icon = AlertTriangle;
  }

  // SVG Gauge calculations
  const radius = 75;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card-paper rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl border border-emerald-900/10 dark:border-white/10">
      
      {/* Decorative subtle background aura */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: strokeColor }}
      />

      <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-400 mb-2">
        <ShieldCheck className="w-4 h-4" />
        <span>{t('prakrutiScore')}</span>
      </div>

      {/* Hero Circular SVG Gauge */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-2 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
          {/* Background circle track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            {score}
          </span>
          <span className="text-xs text-slate-400 font-mono tracking-wider">/ 100</span>
          <span className="text-[11px] font-devanagari text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
            प्रकृति सूचकांक
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`mt-2 inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold border ${badgeBg}`}>
        <Icon className="w-4 h-4" />
        <span>{overallStatus}</span>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 max-w-xs font-sans">
        Unified environmental index for <strong className="text-slate-700 dark:text-slate-200">{locationName.split(',')[0]}</strong> across all five elemental dimensions.
      </p>
    </div>
  );
};
