import React from 'react';
import { Thermometer, Droplets, CloudRain, Wind, Activity, Sun, Gauge } from 'lucide-react';
import type { WeatherData } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedNumber, Reveal, Spotlight } from './ui/primitives';

interface WeatherStripProps {
  weather: WeatherData;
}

const clamp = (v: number, min: number, max: number) => Math.max(0, Math.min(1, (v - min) / (max - min)));

export const WeatherStrip: React.FC<WeatherStripProps> = ({ weather }) => {
  const { language, t } = useLanguage();
  const isHi = language === 'hi';

  const aqiLabel = weather.aqi <= 50 ? (isHi ? 'अच्छा' : 'Good') : weather.aqi <= 100 ? (isHi ? 'मध्यम' : 'Moderate') : weather.aqi <= 200 ? (isHi ? 'अस्वस्थ' : 'Unhealthy') : isHi ? 'खतरनाक' : 'Hazardous';
  const aqiColor = weather.aqi <= 50 ? '#34d399' : weather.aqi <= 100 ? '#fbbf24' : weather.aqi <= 200 ? '#fb923c' : '#f87171';
  const uv = weather.uvIndex ?? 0;

  const tiles = [
    {
      icon: Thermometer,
      label: t('temperature'),
      value: weather.temperatureC,
      unit: '°C',
      decimals: 0,
      sub: weather.feelsLikeC != null ? `${t('feelsLike')} ${weather.feelsLikeC}°C` : weather.description,
      color: '#fb923c',
      fill: clamp(weather.temperatureC, -10, 48),
    },
    {
      icon: Droplets,
      label: t('humidity'),
      value: weather.humidityPct,
      unit: '%',
      decimals: 0,
      sub: isHi ? 'सापेक्ष आर्द्रता' : 'Relative moisture',
      color: '#38bdf8',
      fill: clamp(weather.humidityPct, 0, 100),
    },
    {
      icon: CloudRain,
      label: t('precipitation'),
      value: weather.precipitationMm,
      unit: ' mm',
      decimals: 1,
      sub: isHi ? 'वर्तमान वर्षा' : 'Current rainfall',
      color: '#22d3ee',
      fill: clamp(weather.precipitationMm, 0, 20),
    },
    {
      icon: Wind,
      label: t('windSpeed'),
      value: weather.windKph,
      unit: ' km/h',
      decimals: 0,
      sub: weather.windGustsKph != null ? `${isHi ? 'झोंके' : 'Gusts'} ${weather.windGustsKph} km/h` : isHi ? 'सतही हवा' : 'Surface wind',
      color: '#5fd0c0',
      fill: clamp(weather.windKph, 0, 70),
    },
    {
      icon: Activity,
      label: t('aqiIndex'),
      value: weather.aqi,
      unit: '',
      decimals: 0,
      sub: aqiLabel,
      color: aqiColor,
      fill: clamp(weather.aqi, 0, 300),
    },
    {
      icon: Sun,
      label: t('uvIndex'),
      value: uv,
      unit: '',
      decimals: 1,
      sub: uv < 3 ? (isHi ? 'कम' : 'Low') : uv < 6 ? (isHi ? 'मध्यम' : 'Moderate') : uv < 8 ? (isHi ? 'उच्च' : 'High') : isHi ? 'अत्यधिक' : 'Very high',
      color: '#fbbf24',
      fill: clamp(uv, 0, 12),
    },
    {
      icon: Gauge,
      label: t('pressure'),
      value: weather.pressureHpa ?? 1013,
      unit: ' hPa',
      decimals: 0,
      sub: isHi ? 'वायुमंडलीय दाब' : 'Atmospheric pressure',
      color: '#a08fd6',
      fill: clamp(weather.pressureHpa ?? 1013, 960, 1050),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
      {tiles.map((tile, i) => {
        const Icon = tile.icon;
        return (
          <Reveal key={tile.label} delay={i * 0.05} y={16}>
            <Spotlight className="card-paper rounded-2xl p-4 h-full overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">{tile.label}</span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: `${tile.color}22`, color: tile.color }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-0.5">
                <AnimatedNumber value={tile.value} decimals={tile.decimals} className="font-serif text-[1.65rem] font-extrabold text-slate-900 dark:text-white tabular-nums leading-none" />
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{tile.unit}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-slate-900/8 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{ width: `${Math.max(4, tile.fill * 100)}%`, background: `linear-gradient(90deg, ${tile.color}88, ${tile.color})` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">{tile.sub}</p>
            </Spotlight>
          </Reveal>
        );
      })}
    </div>
  );
};
