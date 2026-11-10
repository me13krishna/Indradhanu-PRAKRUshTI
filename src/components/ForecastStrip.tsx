import React from 'react';
import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Droplets } from 'lucide-react';
import type { ForecastDay } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './ui/primitives';

interface ForecastStripProps {
  forecastDays: ForecastDay[];
}

function weatherVisual(code: number | undefined, rainy: boolean) {
  if (code == null) return rainy ? { Icon: CloudRain, color: '#38bdf8' } : { Icon: Sun, color: '#fbbf24' };
  if (code === 0) return { Icon: Sun, color: '#fbbf24' };
  if (code <= 2) return { Icon: CloudSun, color: '#fbbf24' };
  if (code === 3) return { Icon: Cloud, color: '#94a3b8' };
  if (code === 45 || code === 48) return { Icon: CloudFog, color: '#94a3b8' };
  if (code >= 51 && code <= 57) return { Icon: CloudDrizzle, color: '#38bdf8' };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { Icon: CloudRain, color: '#38bdf8' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { Icon: CloudSnow, color: '#bae6fd' };
  if (code >= 95) return { Icon: CloudLightning, color: '#a08fd6' };
  return { Icon: Cloud, color: '#94a3b8' };
}

export const ForecastStrip: React.FC<ForecastStripProps> = ({ forecastDays }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const lo = Math.min(...forecastDays.map((d) => d.tempMin));
  const hi = Math.max(...forecastDays.map((d) => d.tempMax));
  const span = Math.max(1, hi - lo);

  const label = (dateStr: string, i: number) => {
    if (i === 0) return isHi ? 'आज' : 'Today';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { weekday: 'short' });
  };
  const dayNum = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString(isHi ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card-paper rounded-3xl p-4 sm:p-6">
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {forecastDays.map((day, i) => {
          const rain = day.precipProb ?? 0;
          const { Icon, color } = weatherVisual(day.weatherCode, rain > 40);
          const top = ((hi - day.tempMax) / span) * 100;
          const height = Math.max(8, ((day.tempMax - day.tempMin) / span) * 100);
          return (
            <Reveal key={day.date} delay={i * 0.06} y={18}>
              <div
                className={`group flex flex-col items-center rounded-2xl px-1 sm:px-2 py-3 text-center transition-colors hover:bg-emerald-500/[0.07] ${
                  i === 0 ? 'bg-emerald-500/[0.08] ring-1 ring-emerald-500/25' : ''
                }`}
              >
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{label(day.date, i)}</span>
                <span className="text-[10px] text-slate-400 font-mono">{dayNum(day.date)}</span>

                <div className="my-3 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6" style={{ color }}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <span className="font-serif text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">{Math.round(day.tempMax)}°</span>

                <div className="relative my-2 w-2 h-24 rounded-full bg-slate-900/8 dark:bg-white/10">
                  <div
                    className="absolute left-0 right-0 rounded-full bg-gradient-to-b from-amber-400 via-emerald-400 to-sky-400 shadow-[0_0_10px_rgba(52,211,153,0.35)]"
                    style={{ top: `${top}%`, height: `${height}%` }}
                  />
                </div>

                <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tabular-nums">{Math.round(day.tempMin)}°</span>

                <div className="mt-2.5 flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-semibold text-sky-600 dark:text-sky-300">
                  <Droplets className="w-3 h-3" />
                  {rain}%
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};
