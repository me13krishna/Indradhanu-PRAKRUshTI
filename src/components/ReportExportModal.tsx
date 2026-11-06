import React, { useEffect, useRef } from 'react';
import type { PrakrutiAnalysis } from '../types/prakrushti';
import { X, Printer, CheckCircle2, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ReportExportModalProps {
  analysis: PrakrutiAnalysis;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ analysis, onClose }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  const capturedDate = new Date(analysis.capturedAt);
  const formattedCaptured = !isNaN(capturedDate.getTime())
    ? `${capturedDate.toLocaleDateString()} ${capturedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Recent';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn print-dossier-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-charcoal text-slate-900 dark:text-slate-100 w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-white/10 relative max-h-[90vh] overflow-y-auto print-dossier-card"
      >
        {/* Close Button (Excluded from print) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition no-print"
          aria-label="Close export modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 mb-6 border-slate-200 dark:border-white/10 gap-4">
          <div className="flex items-center space-x-3.5">
            <img
              src="/logo.jpg"
              alt="PRAKRUshTI Official Seal"
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-sm flex-shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span id="dossier-modal-title" className="font-serif font-extrabold text-2xl text-brand-dark dark:text-emerald-400">
                  PRAKRUshTI
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-mono font-bold uppercase tracking-wider">
                  Environmental Dossier
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Panch Mahabhuta Planetary Intelligence Report • Compiled: {formattedCaptured}
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-dark hover:bg-brand-light text-white transition shadow-lg active:scale-95 no-print"
            aria-label="Print or export report to PDF"
          >
            <Printer className="w-4 h-4" />
            <span>{isHi ? 'प्रिंट / पीडीएफ निर्यात' : 'Print / Export PDF'}</span>
          </button>
        </div>

        {/* Printable Body Content */}
        <div className="space-y-6 text-slate-800 dark:text-slate-100">
          
          {/* Location & Composite Score Box */}
          <div className="flex flex-col sm:flex-row justify-between items-start bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-slate-500 font-mono text-xs">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Geographical Target</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                {analysis.location.name}
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                Coordinates: {analysis.location.latitude.toFixed(4)}° N, {analysis.location.longitude.toFixed(4)}° E
                {analysis.weather.elevationM != null && ` • ${analysis.weather.elevationM}m ASL`}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                Composite Prakruti Score
              </span>
              <div className="text-4xl sm:text-5xl font-serif font-extrabold text-brand-dark dark:text-emerald-400 mt-0.5">
                {analysis.prakrutiScore} <span className="text-xs font-mono text-slate-400 font-normal">/ 100</span>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mt-1">
                Status: {analysis.overallStatus}
              </span>
            </div>
          </div>

          {/* 5 Panch Mahabhuta Ratings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Panch Mahabhuta Elemental Breakdown (p=0.5 Generalized Mean)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              {Object.entries(analysis.elements).map(([key, el]) => (
                <div key={key} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block font-devanagari">
                    {el.sanskritName}
                  </span>
                  <span className="text-2xl font-serif font-extrabold block my-1" style={{ color: el.color }}>
                    {el.score}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block uppercase">
                    {el.englishName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Real-Time Environmental Readings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Physical Observations & NWP Telemetry
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[10px]">TEMPERATURE</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {analysis.weather.temperatureC}°C
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Feels: {analysis.weather.feelsLikeC ?? analysis.weather.temperatureC}°C
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[10px]">AIR QUALITY</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  AQI {analysis.weather.aqi}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {analysis.weather.pm2_5 != null ? `PM2.5: ${analysis.weather.pm2_5} µg/m³` : 'Standard Band'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[10px]">PRECIPITATION (24H)</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {analysis.weather.precipitationMm} mm
                </span>
                <span className="text-[10px] text-slate-400 block">
                  RH: {analysis.weather.humidityPct}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <span className="text-slate-400 block text-[10px]">WIND & PRESSURE</span>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {analysis.weather.windKph} km/h
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {analysis.weather.pressureHpa ?? 1013} hPa
                </span>
              </div>
            </div>
          </div>

          {/* Diagnostic Insights */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Environmental Resilience Diagnostic
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              {analysis.insights}
            </p>
          </div>

          {/* Actionable Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
              Actionable Resilience Recommendations
            </h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Provenance & Official Disclaimer */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-500 font-mono leading-relaxed space-y-1">
            <p>
              <strong>Data Provenance:</strong> ECMWF Integrated Forecasting System (IFS via Open-Meteo), Copernicus CAMS Atmospheric Composition, USGS Global Seismographic Network. Topsoil moisture is a 0–1 cm skin reanalysis proxy.
            </p>
            <p>
              <strong>Methodology:</strong> PRAKRUshTI Sub-Additive Generalized Power Mean (p=0.5). Built for Indradhanu 2026 — PCCOE International Grand Challenge.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
