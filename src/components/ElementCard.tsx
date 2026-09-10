import React from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { ChevronRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ElementCardProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClick: () => void;
}

export const ElementCard: React.FC<ElementCardProps> = ({ elementKey, element, onClick }) => {
  const getIcon = () => {
    switch (elementKey) {
      case 'prithvi':
        // Mountain / Earth Symbol
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
        );
      case 'jal':
        // Droplet / Water Wave Symbol
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case 'agni':
        // Flame / Fire Symbol
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
          </svg>
        );
      case 'vayu':
        // Wind Swirl Symbol
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
          </svg>
        );
      case 'akash':
        // Ether / Open Sky Circle Symbol
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
    }
  };

  const isHealthy = element.score >= 70;

  return (
    <div
      onClick={onClick}
      className="card-paper rounded-2xl p-5 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 dark:border-white/10 relative overflow-hidden group"
    >
      {/* Top element accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
        style={{ backgroundColor: element.color }}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ring-2 ring-white/20"
            style={{ backgroundColor: element.color }}
          >
            {getIcon()}
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
          <div className="text-2xl font-serif font-extrabold text-slate-800 dark:text-slate-100">
            {element.score}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
        </div>
      </div>

      {/* Score Progress Bar */}
      <div className="mt-4">
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${element.score}%`, backgroundColor: element.color }}
          />
        </div>
      </div>

      {/* Sub-metrics preview pills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {element.keyMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="px-2.5 py-1 rounded-md text-[11px] bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-600 dark:text-slate-300 font-mono flex items-center justify-between space-x-2"
          >
            <span>{metric.label}:</span>
            <strong className="text-slate-800 dark:text-slate-100 font-semibold">{metric.value}</strong>
          </div>
        ))}
      </div>

      {/* Footer call-to-action */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
        <span className="flex items-center space-x-1">
          {isHealthy ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span>{element.status}</span>
        </span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
