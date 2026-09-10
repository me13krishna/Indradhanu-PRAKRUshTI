import React from 'react';
import type { HazardRisk, DetailedRiskItem } from '../types/prakrushti';
import { ShieldAlert, Flame, Waves, FlameKindling, Wind, Activity, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DisasterRisksProps {
  disasterRisk: HazardRisk;
  risks: DetailedRiskItem[];
}

export const DisasterRisks: React.FC<DisasterRisksProps> = ({ disasterRisk, risks }) => {
  const { t } = useLanguage();

  const getBadgeStyle = (level: 'low' | 'moderate' | 'high' | 'critical') => {
    switch (level) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300';
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse';
    }
  };

  const hazards = [
    { label: 'Flood Potential', level: disasterRisk.flood, icon: Waves },
    { label: 'Heatwave Stress', level: disasterRisk.heat, icon: Flame },
    { label: 'Wildfire Hazard', level: disasterRisk.fire, icon: FlameKindling },
    { label: 'Gale / Storm Risk', level: disasterRisk.storm, icon: Wind },
    { label: 'Seismic Signal', level: disasterRisk.seismic, icon: Activity },
  ];

  return (
    <div className="card-paper rounded-3xl p-6 shadow-xl border border-emerald-900/10 dark:border-white/10 my-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <span>{t('disasterRisk')}</span>
        </h3>
        <span className="text-xs text-slate-400 font-mono">Decision-Support Indicators</span>
      </div>

      {/* Hazard Status Chips */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {hazards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${getBadgeStyle(
                item.level
              )}`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}:</span>
              <span className="uppercase font-mono tracking-wider font-extrabold">{item.level}</span>
            </div>
          );
        })}
      </div>

      {/* Detailed Risk Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {risks.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-start space-x-3"
          >
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono">
                  {item.level}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-sans leading-relaxed">
                {item.description}
              </p>
              {item.source && (
                <p className="text-[10px] text-slate-400 font-mono mt-1">Source: {item.source}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
