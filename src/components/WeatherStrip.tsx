import React from 'react';
import type { WeatherData } from '../types/prakrushti';
import { Thermometer, Droplets, CloudRain, Wind, Activity, Sun, Gauge } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WeatherStripProps {
  weather: WeatherData;
}

export const WeatherStrip: React.FC<WeatherStripProps> = ({ weather }) => {
  const { t } = useLanguage();

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300';
    if (aqi <= 100) return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300';
  };

  const metrics = [
    {
      icon: Thermometer,
      label: t('temperature'),
      value: `${weather.temperatureC}°C`,
      sub: weather.feelsLikeC != null ? `${t('feelsLike')} ${weather.feelsLikeC}°C` : 'Normal',
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      icon: Droplets,
      label: t('humidity'),
      value: `${weather.humidityPct}%`,
      sub: 'Relative Moisture',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: CloudRain,
      label: t('precipitation'),
      value: `${weather.precipitationMm} mm`,
      sub: 'Current Rainfall',
      color: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      icon: Wind,
      label: t('windSpeed'),
      value: `${weather.windKph} km/h`,
      sub: 'Surface Dispersion',
      color: 'text-sky-600 dark:text-sky-400',
    },
    {
      icon: Activity,
      label: t('aqiIndex'),
      value: `${weather.aqi}`,
      sub: weather.aqi <= 50 ? 'Good' : weather.aqi <= 100 ? 'Moderate' : 'Unhealthy',
      color: 'text-emerald-600 dark:text-emerald-400',
      badgeStyle: getAqiColor(weather.aqi),
    },
    {
      icon: Sun,
      label: t('uvIndex'),
      value: `${weather.uvIndex ?? 4.5}`,
      sub: 'Solar Radiation',
      color: 'text-orange-500 dark:text-orange-400',
    },
    {
      icon: Gauge,
      label: t('pressure'),
      value: `${weather.pressureHpa ?? 1013} hPa`,
      sub: 'Atmospheric Pressure',
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="card-paper rounded-3xl p-6 shadow-xl border border-emerald-900/10 dark:border-white/10 my-6">
      <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
        <Thermometer className="w-5 h-5 text-emerald-600" />
        <span>{t('weatherOverview')}</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400 font-sans">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="mt-2">
                <span className="text-xl font-serif font-extrabold text-slate-800 dark:text-slate-100">
                  {item.value}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
