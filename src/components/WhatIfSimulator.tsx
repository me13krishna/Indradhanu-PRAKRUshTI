import React, { useState } from 'react';
import type { PrakrutiAnalysis, WeatherData, HazardRisk } from '../types/prakrushti';
import { Sparkles, Thermometer, CloudRain, Wind, RefreshCw, AlertTriangle } from 'lucide-react';
import { computeElementScores } from '../services/scoringEngine';

interface WhatIfSimulatorProps {
  analysis: PrakrutiAnalysis;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ analysis }) => {

  const [tempDelta, setTempDelta] = useState<number>(0); // -5 to +8 °C
  const [precipDelta, setPrecipDelta] = useState<number>(0); // -80% to +100%
  const [aqiDelta, setAqiDelta] = useState<number>(0); // -30 to +150 AQI

  // Calculate simulated parameters
  const simTemp = analysis.weather.temperatureC + tempDelta;
  const basePrecip = analysis.weather.precipitationMm;
  const simPrecip = Math.max(0, basePrecip > 0 
    ? basePrecip * (1 + precipDelta / 100) 
    : (precipDelta > 0 ? (precipDelta / 10) : 0));
  const simAqi = Math.max(0, Math.min(500, analysis.weather.aqi + aqiDelta));

  // Construct synthetic weather object grounded in physical response
  const currentTheta = analysis.weather.soilMoistureM3M3 ?? ((analysis.weather.soilMoisturePct ?? 45) / 100 * 0.45);
  const simulatedTheta = Math.max(0.02, Math.min(0.45, Number((currentTheta + (precipDelta / 100) * 0.05 - (tempDelta * 0.005)).toFixed(3))));

  const simWeather: WeatherData = {
    ...analysis.weather,
    temperatureC: simTemp,
    precipitationMm: Number(simPrecip.toFixed(1)),
    aqi: simAqi,
    pm2_5: undefined, // allow EPA inversion from simulated AQI
    soilTemperatureC: (analysis.weather.soilTemperatureC ?? analysis.weather.temperatureC) + tempDelta,
    soilMoistureM3M3: simulatedTheta,
    soilMoisturePct: Math.round((simulatedTheta / 0.45) * 100),
    soilMoistureProvenance: 'USER_SIMULATED',
  };

  const simHazards: HazardRisk = {
    ...analysis.disasterRisk,
    heat: simTemp >= 40 ? 'critical' : simTemp >= 34 ? 'high' : simTemp >= 29 ? 'moderate' : 'low',
    flood: simPrecip >= 50 ? 'critical' : simPrecip >= 20 ? 'high' : simPrecip >= 5 ? 'moderate' : 'low',
    fire: simTemp > 30 && analysis.weather.humidityPct < 30 ? 'critical' : analysis.disasterRisk.fire,
  };

  // Re-run the scientific scoring engine
  const simResult = computeElementScores(simWeather, simHazards);
  const simPrakruti = simResult.prakrutiScore;
  const scoreDiff = simPrakruti - analysis.prakrutiScore;

  const handleReset = () => {
    setTempDelta(0);
    setPrecipDelta(0);
    setAqiDelta(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Climate Scenario Playground</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          What-If Ecological Simulator
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Simulate hypothetical climate change parameters (+°C heat, drought, pollution surges) for{' '}
          <strong className="text-slate-700 dark:text-slate-200">{analysis.location.name.split(',')[0]}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Slider 1: Temperature Delta */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span>Temp Anomaly</span>
            </span>
            <span className="text-xs font-mono font-extrabold text-amber-600">
              {tempDelta > 0 ? `+${tempDelta}` : tempDelta}°C
            </span>
          </div>
          <input
            type="range"
            min="-5"
            max="8"
            step="1"
            value={tempDelta}
            onChange={(e) => setTempDelta(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>-5°C (Cooler)</span>
            <span>Simulated: {simTemp}°C</span>
            <span>+8°C (Extreme)</span>
          </div>
        </div>

        {/* Slider 2: Precipitation Change */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
              <CloudRain className="w-4 h-4 text-blue-500" />
              <span>Rainfall Change</span>
            </span>
            <span className="text-xs font-mono font-extrabold text-blue-600">
              {precipDelta > 0 ? `+${precipDelta}` : precipDelta}%
            </span>
          </div>
          <input
            type="range"
            min="-80"
            max="100"
            step="10"
            value={precipDelta}
            onChange={(e) => setPrecipDelta(parseInt(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>-80% (Drought)</span>
            <span>Simulated: {simPrecip.toFixed(1)}mm</span>
            <span>+100% (Torrential)</span>
          </div>
        </div>

        {/* Slider 3: AQI Surge */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
              <Wind className="w-4 h-4 text-sky-500" />
              <span>AQI Pollution Delta</span>
            </span>
            <span className="text-xs font-mono font-extrabold text-sky-600">
              {aqiDelta > 0 ? `+${aqiDelta}` : aqiDelta} pts
            </span>
          </div>
          <input
            type="range"
            min="-30"
            max="150"
            step="10"
            value={aqiDelta}
            onChange={(e) => setAqiDelta(parseInt(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>-30 (Cleaner)</span>
            <span>Simulated: {simAqi} AQI</span>
            <span>+150 (Smog)</span>
          </div>
        </div>
      </div>

      {/* Simulator Result Comparison Box */}
      <div className="card-paper rounded-3xl p-6 shadow-2xl border border-emerald-900/10 dark:border-white/10 text-center relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Simulated Prakruti Impact
          </span>
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold font-mono"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 my-4">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Baseline Score</span>
            <span className="text-4xl font-serif font-extrabold text-slate-800 dark:text-slate-100">
              {analysis.prakrutiScore}
            </span>
          </div>

          <div className="text-2xl font-serif text-slate-300">→</div>

          <div>
            <span className="text-xs text-slate-400 font-mono block">Simulated Score</span>
            <span
              className={`text-4xl font-serif font-extrabold ${
                scoreDiff < 0 ? 'text-rose-500' : scoreDiff > 0 ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {simPrakruti}
            </span>
          </div>
        </div>

        {scoreDiff !== 0 && (
          <div
            className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold border mt-2 ${
              scoreDiff < 0
                ? 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>
              Net Shift: {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} points under this scenario.
            </span>
          </div>
        )}

        {/* 5-Element Simulated Response Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-white/5">
          {(['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const).map((key) => {
            const el = simResult.elements[key];
            const baseEl = analysis.elements[key];
            const diff = el.score - baseEl.score;
            return (
              <div key={key} className="p-2 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center">
                <span className="text-[11px] font-devanagari font-bold text-slate-700 dark:text-slate-200 block truncate">
                  {el.sanskritName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {el.englishName}
                </span>
                <div className="text-base sm:text-lg font-serif font-extrabold mt-1" style={{ color: el.color }}>
                  {el.score}
                </div>
                <div className={`text-[10px] font-mono font-bold ${diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                  {diff > 0 ? `+${diff}` : diff === 0 ? '0' : diff}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
