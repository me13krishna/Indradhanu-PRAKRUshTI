import React, { useState } from 'react';
import type { PrakrutiAnalysis, WeatherData, HazardRisk } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Thermometer, CloudRain, Wind, RefreshCw, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { computeElementScores } from '../services/scoringEngine';

interface WhatIfSimulatorProps {
  analysis: PrakrutiAnalysis;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ analysis }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

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

  // Re-run the actual scientific scoring engine (completely preserved)
  const simResult = computeElementScores(simWeather, simHazards);
  const simPrakruti = simResult.prakrutiScore;
  const scoreDiff = simPrakruti - analysis.prakrutiScore;

  const handleReset = () => {
    setTempDelta(0);
    setPrecipDelta(0);
    setAqiDelta(0);
  };

  const elementKeys = ['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHi ? 'काल्पनिक जलवायु परिदृश्य मॉडलिंग' : 'Counterfactual Scenario Modeling'}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          {isHi ? 'काल्पनिक "क्या होगा अगर" पारिस्थितिक सिम्युलेटर' : 'What-If Ecological Resilience Simulator'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
          {isHi
            ? `${analysis.location.name.split(',')[0]} के वास्तविक आधारभूत आंकड़ों पर तापमान, वर्षा एवं प्रदूषण में परिवर्तन का प्रभाव देखें।`
            : `Simulate hypothetical climate stress parameters for ${analysis.location.name.split(',')[0]} using identical scoring formulas.`}
        </p>
      </div>

      {/* Explicit Non-Forecast Disclosure Banner */}
      <div className="mb-8 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-4 sm:p-5 flex items-start space-x-3 text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm font-sans leading-relaxed">
          <span className="font-bold font-mono uppercase tracking-wider block text-amber-800 dark:text-amber-300 mb-0.5">
            {isHi ? 'वैज्ञानिक प्रकटीकरण: काल्पनिक परिदृश्य (पूर्वानुमान नहीं)' : 'Scientific Disclosure: Hypothetical Simulation (Not a Forecast)'}
          </span>
          {isHi
            ? 'यह सिम्युलेटर वास्तविक अवलोकनों या मौसम पूर्वानुमान को नहीं बदलता। यह केवल यह प्रदर्शित करता है कि यदि तापमान, वर्षा या प्रदूषण में कृत्रिम बदलाव आए, तो पंचमहाभूत p=0.5 सूत्र के अनुसार पारिस्थितिक संतुलन पर क्या असर पड़ेगा।'
            : 'This simulator runs deterministic what-if parameter shifts through the exact computeElementScores() engine. Results represent hypothetical sensitivity modeling, not meteorological forecasts or observed conditions.'}
        </div>
      </div>

      {/* Head-to-Head Comparison: Actual Baseline vs Simulated Scenario */}
      <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              {isHi ? 'आधारभूत बनाम काल्पनिक स्कोर' : 'Baseline vs. Simulated Score Comparison'}
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100">
              {analysis.location.name}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              scoreDiff > 0
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : scoreDiff < 0
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
            }`}>
              {isHi ? 'कुल प्रभाव:' : 'Net Impact:'} {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} pts
            </div>

            {(tempDelta !== 0 || precipDelta !== 0 || aqiDelta !== 0) && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isHi ? 'रीसेट करें' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 2-Column Score Readout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          
          {/* Baseline Score Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">
                {isHi ? 'वास्तविक आधारभूत स्थिति' : 'Actual Baseline'}
              </span>
              <div className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-800 dark:text-slate-100 mt-2">
                {analysis.prakrutiScore}
              </div>
              <span className="text-xs font-mono text-slate-400 block mt-0.5">/ 100</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-600 dark:text-slate-400 font-mono">
              Temp: {analysis.weather.temperatureC}°C • Precip: {analysis.weather.precipitationMm}mm • AQI: {analysis.weather.aqi}
            </div>
          </div>

          {/* Simulated Score Card */}
          <div className={`p-5 rounded-2xl border-2 text-center flex flex-col justify-between ${
            scoreDiff < 0
              ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500/40 text-rose-900 dark:text-rose-200'
              : scoreDiff > 0
              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
              : 'bg-slate-50 dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-100'
          }`}>
            <div>
              <span className="text-xs font-bold font-mono uppercase tracking-wider block opacity-80">
                {isHi ? 'काल्पनिक परिदृश्य परिणाम' : 'Simulated Scenario Outcome'}
              </span>
              <div className="text-4xl sm:text-5xl font-serif font-extrabold mt-2">
                {simPrakruti}
              </div>
              <span className="text-xs font-mono opacity-60 block mt-0.5">/ 100</span>
            </div>
            <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-xs font-mono opacity-80">
              Sim Temp: {simTemp}°C • Sim Precip: {simPrecip.toFixed(1)}mm • Sim AQI: {simAqi}
            </div>
          </div>

        </div>
      </div>

      {/* 3 Intuitive Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Slider 1: Temperature Anomaly */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <span>{isHi ? 'तापमान विसंगति' : 'Temperature Shift'}</span>
              </span>
              <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400">
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
              aria-label="Adjust temperature anomaly"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
            <span>-5°C (Cooling)</span>
            <span className="font-bold text-slate-600 dark:text-slate-300">{simTemp}°C</span>
            <span>+8°C (Extreme)</span>
          </div>
        </div>

        {/* Slider 2: Precipitation Change */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                <CloudRain className="w-4 h-4 text-blue-500" />
                <span>{isHi ? 'वर्षा विचलन' : 'Precipitation Delta'}</span>
              </span>
              <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">
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
              aria-label="Adjust precipitation change percentage"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
            <span>-80% (Drought)</span>
            <span className="font-bold text-slate-600 dark:text-slate-300">{simPrecip.toFixed(1)} mm</span>
            <span>+100% (Deluge)</span>
          </div>
        </div>

        {/* Slider 3: AQI Smog Delta */}
        <div className="card-paper p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                <Wind className="w-4 h-4 text-emerald-500" />
                <span>{isHi ? 'वायु प्रदूषण बदलाव' : 'AQI Pollution Shift'}</span>
              </span>
              <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                {aqiDelta > 0 ? `+${aqiDelta}` : aqiDelta} AQI
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="150"
              step="10"
              value={aqiDelta}
              onChange={(e) => setAqiDelta(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
              aria-label="Adjust AQI delta"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
            <span>-30 (Cleaner)</span>
            <span className="font-bold text-slate-600 dark:text-slate-300">AQI {simAqi}</span>
            <span>+150 (Smog Surge)</span>
          </div>
        </div>

      </div>

      {/* 5 Panch Mahabhuta Sensitivity Impacts */}
      <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
        <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{isHi ? 'पंचमहाभूत तत्वों पर संवेदनशीलता प्रभाव' : 'Simulated Panch Mahabhuta Sensitivity Impacts'}</span>
        </h3>

        <div className="space-y-4">
          {elementKeys.map((key) => {
            const baseScore = analysis.elements[key].score;
            const simScore = simResult.elements[key].score;
            const delta = simScore - baseScore;

            return (
              <div key={key} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-devanagari font-bold text-sm text-slate-800 dark:text-slate-100">
                      {analysis.elements[key].sanskritName}
                    </span>
                    <span className="text-slate-400">({analysis.elements[key].englishName})</span>
                  </div>

                  <div className="flex items-center space-x-3 font-mono">
                    <span className="text-slate-500">Base: {baseScore}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-100">Sim: {simScore}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      delta > 0
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : delta < 0
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                    }`}>
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  </div>
                </div>

                {/* Simulated vs baseline bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${simScore}%`,
                      backgroundColor: analysis.elements[key].color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
