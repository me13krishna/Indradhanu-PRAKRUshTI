import React from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ElementalRealisticIcon } from './ElementalRealisticIcon';

interface ElementCardProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClick: () => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({ elementKey, element, onClick }) => {
  const isHealthy = element.score >= 70;

  return (
    <div
      onClick={onClick}
      className="card-paper rounded-2xl p-5 cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 border border-slate-200/80 dark:border-white/10 relative overflow-hidden group select-none"
    >
      {/* Background elemental ambient glow */}
      <div
        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: element.color }}
      />

      {/* Top element accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: element.color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <ElementalRealisticIcon elementKey={elementKey} size="md" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-devanagari text-base font-bold text-slate-800 dark:text-slate-100">
                {element.sanskritName}
              </span>
              <span className="text-xs text-slate-400 font-sans font-medium">({element.englishName})</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans line-clamp-1">{element.meaning}</p>
          </div>
        </div>

        {/* Score indicator */}
        <div className="text-right">
          <div className="text-2xl font-serif font-extrabold text-slate-800 dark:text-slate-100 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
            {element.score}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
          {element.marginalAttribution != null && (
            <div className={`text-[10px] font-mono font-bold mt-0.5 ${
              element.marginalAttribution > 0 ? 'text-emerald-600 dark:text-emerald-400' : element.marginalAttribution < 0 ? 'text-rose-500 dark:text-rose-400' : 'text-slate-400'
            }`}>
              {element.marginalAttribution > 0 ? `+${element.marginalAttribution}` : element.marginalAttribution} pts
            </div>
          )}
        </div>
      </div>

      {/* Score Progress Bar */}
      <div className="mt-4 relative z-10">
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${element.score}%`,
              backgroundColor: element.color,
              boxShadow: `0 0 10px ${element.color}66`,
            }}
          />
        </div>
      </div>

      {/* Sub-metrics preview pills */}
      <div className="mt-4 flex flex-wrap gap-1.5 relative z-10">
        {element.keyMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="px-2.5 py-1 rounded-md text-[11px] bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-300 font-mono flex items-center justify-between space-x-2 transition-colors group-hover:border-emerald-500/20"
          >
            <span>{metric.label}:</span>
            <strong className="text-slate-800 dark:text-slate-100 font-semibold">{metric.value}</strong>
          </div>
        ))}
      </div>

      {/* Footer call-to-action */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors relative z-10">
        <span className="flex items-center space-x-1">
          {isHealthy ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:scale-110" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:scale-110" />
          )}
          <span>{element.status}</span>
        </span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
      </div>
    </div>
  );
};
