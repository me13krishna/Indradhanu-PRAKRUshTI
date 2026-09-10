import React from 'react';
import type { PrakrutiAnalysis } from '../types/prakrushti';
import { X, Printer, CheckCircle2 } from 'lucide-react';

interface ReportExportModalProps {
  analysis: PrakrutiAnalysis;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ analysis, onClose }) => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn no-print">
      <div className="bg-white dark:bg-charcoal w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-white/10 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dossier Header */}
        <div className="flex items-center justify-between border-b pb-6 mb-6 border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif font-extrabold text-2xl text-brand-dark dark:text-emerald-400">
                PRAKRUshTI
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                OFFICIAL DOSSIER
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Environmental Snapshot Report — Compiled {new Date(analysis.capturedAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-dark hover:bg-brand-light text-white transition shadow-lg active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>

        {/* Printable Location Summary Body */}
        <div className="space-y-6">
          
          <div className="flex justify-between items-start bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">
                {analysis.location.name}
              </h2>
              <p className="text-xs font-mono text-slate-500 mt-1">
                Lat: {analysis.location.latitude.toFixed(4)}, Lng: {analysis.location.longitude.toFixed(4)}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block uppercase">Composite Score</span>
              <span className="text-4xl font-serif font-extrabold text-brand-dark dark:text-emerald-400">
                {analysis.prakrutiScore} <span className="text-xs text-slate-400">/ 100</span>
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mt-1">
                {analysis.overallStatus}
              </span>
            </div>
          </div>

          {/* 5 Mahabhuta Element Scores Row */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Panch Mahabhuta Element Ratings
            </h3>
            <div className="grid grid-cols-5 gap-2 text-center">
              {Object.entries(analysis.elements).map(([key, el]) => (
                <div key={key} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block font-devanagari">
                    {el.sanskritName}
                  </span>
                  <span className="text-xl font-serif font-extrabold block my-1" style={{ color: el.color }}>
                    {el.score}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">{el.englishName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              AI Environmental Diagnostic
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              {analysis.insights}
            </p>
          </div>

          {/* Actionable Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Key Actionable Recommendations
            </h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-[10px] text-slate-400 font-mono text-center">
            PRAKRUshTI Dossier • Indradhanu International Grand Challenge 2026 • Verified Open Data Aggregation
          </div>
        </div>
      </div>
    </div>
  );
};
