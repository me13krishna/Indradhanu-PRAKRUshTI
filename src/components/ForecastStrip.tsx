import React from 'react';
import type { ForecastDay } from '../types/prakrushti';
import { Calendar, Sun, CloudRain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ForecastStripProps {
  forecastDays: ForecastDay[];
}

export const ForecastStrip: React.FC<ForecastStripProps> = ({ forecastDays }) => {
  const { t } = useLanguage();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="card-paper rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-900/10 dark:border-white/10">
      <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-emerald-600" />
        <span>{t('forecastTitle')}</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecastDays.map((day, idx) => {
          const hasRain = day.precipProb != null && day.precipProb > 30;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex flex-col justify-between items-center text-center hover:scale-[1.03] hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 group cursor-default"
            >
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-sans">
                {formatDate(day.date)}
              </span>

              <div className="my-3 p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-115 shadow-sm">
                {hasRain ? <CloudRain className="w-6 h-6 text-blue-500" /> : <Sun className="w-6 h-6 text-amber-500" />}
              </div>

              <div>
                <div className="flex items-center space-x-1.5 text-sm font-serif font-bold">
                  <span className="text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{day.tempMax}°</span>
                  <span className="text-slate-400 text-xs">{day.tempMin}°</span>
                </div>
                {day.precipProb != null && (
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono mt-1 block font-medium">
                    {day.precipProb}% rain
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
