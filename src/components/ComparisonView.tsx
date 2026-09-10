import React, { useState, useEffect } from 'react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from '../types/prakrushti';
import { getPrakrutiAnalysis } from '../services/prakrushtiApi';
import { PRESET_LOCATIONS } from '../services/geocoding';
import { Sliders, ArrowRightLeft, TrendingUp, TrendingDown, Minus, Loader2 } from 'lucide-react';

interface ComparisonViewProps {
  initialLocationA: LocationData;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ initialLocationA }) => {

  const [locationA, setLocationA] = useState<LocationData>(initialLocationA);
  const [locationB, setLocationB] = useState<LocationData>(PRESET_LOCATIONS[1]); // Default Tokyo

  const [dataA, setDataA] = useState<PrakrutiAnalysis | null>(null);
  const [dataB, setDataB] = useState<PrakrutiAnalysis | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadBoth() {
      setLoading(true);
      try {
        const [resA, resB] = await Promise.all([
          getPrakrutiAnalysis(locationA),
          getPrakrutiAnalysis(locationB),
        ]);
        setDataA(resA);
        setDataB(resB);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }
    loadBoth();
  }, [locationA, locationB]);

  const elementKeys: MahabhutaElementKey[] = ['prithvi', 'jal', 'agni', 'vayu', 'akash'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>Comparative Ecological Analysis</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          Side-by-Side Panch Mahabhuta Comparison
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Compare environmental health scores and elemental balances between two locations globally.
        </p>
      </div>

      {/* Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
        {/* Location A Selector */}
        <div className="card-paper p-4 rounded-2xl border border-slate-200 dark:border-white/10">
          <label className="text-xs font-bold text-slate-400 font-mono uppercase block mb-2">Location A</label>
          <select
            value={locationA.name}
            onChange={(e) => {
              const found = PRESET_LOCATIONS.find(l => l.name === e.target.value);
              if (found) setLocationA(found);
            }}
            className="w-full p-3 rounded-xl bg-white dark:bg-surface-dark text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 text-sm font-semibold focus:outline-none"
          >
            {PRESET_LOCATIONS.map((loc, idx) => (
              <option key={idx} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>

        {/* Location B Selector */}
        <div className="card-paper p-4 rounded-2xl border border-slate-200 dark:border-white/10">
          <label className="text-xs font-bold text-slate-400 font-mono uppercase block mb-2">Location B</label>
          <select
            value={locationB.name}
            onChange={(e) => {
              const found = PRESET_LOCATIONS.find(l => l.name === e.target.value);
              if (found) setLocationB(found);
            }}
            className="w-full p-3 rounded-xl bg-white dark:bg-surface-dark text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 text-sm font-semibold focus:outline-none"
          >
            {PRESET_LOCATIONS.map((loc, idx) => (
              <option key={idx} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading || !dataA || !dataB ? (
        <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <span className="text-sm font-medium">Computing synchronized location metrics...</span>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Composite Score Delta Banner */}
          <div className="card-paper rounded-3xl p-6 shadow-xl border border-emerald-900/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Score A */}
            <div className="text-center md:text-left flex-1">
              <span className="text-xs text-slate-400 font-mono">{dataA.location.name}</span>
              <div className="text-4xl font-serif font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                {dataA.prakrutiScore} <span className="text-xs text-slate-400 font-sans font-normal">/ 100</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mt-1">
                {dataA.overallStatus}
              </span>
            </div>

            {/* Delta Indicator */}
            <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <ArrowRightLeft className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-xs text-slate-400 font-mono">Prakruti Delta</span>
              {(() => {
                const diff = dataA.prakrutiScore - dataB.prakrutiScore;
                if (diff > 0) {
                  return (
                    <span className="text-sm font-extrabold text-emerald-600 flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{diff} pts</span>
                    </span>
                  );
                } else if (diff < 0) {
                  return (
                    <span className="text-sm font-extrabold text-rose-500 flex items-center space-x-1 mt-1">
                      <TrendingDown className="w-4 h-4" />
                      <span>{diff} pts</span>
                    </span>
                  );
                } else {
                  return (
                    <span className="text-sm font-extrabold text-slate-500 flex items-center space-x-1 mt-1">
                      <Minus className="w-4 h-4" />
                      <span>0 pts (Equal)</span>
                    </span>
                  );
                }
              })()}
            </div>

            {/* Score B */}
            <div className="text-center md:text-right flex-1">
              <span className="text-xs text-slate-400 font-mono">{dataB.location.name}</span>
              <div className="text-4xl font-serif font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                {dataB.prakrutiScore} <span className="text-xs text-slate-400 font-sans font-normal">/ 100</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mt-1">
                {dataB.overallStatus}
              </span>
            </div>
          </div>

          {/* Element Rows Comparison */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Element-by-Element Delta Breakdown
            </h3>

            {elementKeys.map((key) => {
              const elA = dataA.elements[key];
              const elB = dataB.elements[key];
              const scoreDiff = elA.score - elB.score;

              return (
                <div
                  key={key}
                  className="card-paper p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3 w-48">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm"
                      style={{ backgroundColor: elA.color }}
                    >
                      {elA.sanskritName[0]}
                    </div>
                    <div>
                      <span className="font-devanagari font-bold text-slate-800 dark:text-slate-100 block">
                        {elA.sanskritName} ({elA.englishName})
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{elA.meaning}</span>
                    </div>
                  </div>

                  {/* Progress comparisons */}
                  <div className="flex-1 w-full grid grid-cols-2 gap-4 items-center">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1">
                        <span>{dataA.location.name.split(',')[0]}</span>
                        <strong className="text-slate-800 dark:text-slate-100">{elA.score}</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${elA.score}%`, backgroundColor: elA.color }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300 mb-1">
                        <span>{dataB.location.name.split(',')[0]}</span>
                        <strong className="text-slate-800 dark:text-slate-100">{elB.score}</strong>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${elB.score}%`, backgroundColor: elB.color }} />
                      </div>
                    </div>
                  </div>

                  {/* Delta tag */}
                  <div className="w-24 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                        scoreDiff > 0
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : scoreDiff < 0
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                      }`}
                    >
                      {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
