import React from 'react';
import { Skeleton } from './ui/primitives';
import { useLanguage } from '../context/LanguageContext';

export const DashboardSkeleton: React.FC<{ place: string }> = ({ place }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="card-paper rounded-2xl px-5 py-4 flex items-center gap-4 overflow-hidden">
        <span className="live-dot" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {isHi ? `${place} के लिए लाइव डेटा जुटा रहे हैं…` : `Gathering live data for ${place}…`}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">Open-Meteo · CAMS · USGS</div>
        </div>
        <div className="hidden sm:block w-40 h-1 rounded-full bg-slate-900/10 dark:bg-white/10 progress-sweep" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 card-paper rounded-[2rem] p-8 space-y-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-72" />
          <div className="grid sm:grid-cols-2 gap-6">
            <Skeleton className="aspect-square rounded-full" />
            <Skeleton className="aspect-square rounded-[2rem]" />
          </div>
        </div>
        <Skeleton className="lg:col-span-5 min-h-[360px] rounded-[2rem]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-3xl" />
        ))}
      </div>
    </div>
  );
};
