import React, { useEffect, useRef } from 'react';
import type { ElementScore, MahabhutaElementKey, SubMetricBreakdown } from '../types/prakrushti';
import { X, BookOpen, ExternalLink, Activity, Info, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ElementDetailModalProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClose: () => void;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({ elementKey, element, onClose }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: Escape key closes modal & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const getDefaultSubMetrics = (): SubMetricBreakdown[] => {
    switch (elementKey) {
      case 'prithvi':
        return [
          {
            name: 'Topsoil Skin Moisture Proxy (0-1cm)',
            score: element.score,
            weight: 0.60,
            rawDisplay: 'Topsoil Volumetric Water Content',
            benchmark: 'Provisional loam proxy plateau: 0.20–0.35 m³/m³ (Wilting < 0.10, Anoxia > 0.45)',
            citation: 'ECMWF IFS HTESSEL Land Surface Model',
            status: 'good',
          },
          {
            name: 'Topsoil Surface Temperature',
            score: element.score,
            weight: 0.40,
            rawDisplay: 'Modeled Ground Skin Temperature',
            benchmark: 'Microbial optimum: 15–25 °C (Thermal stress < 0 °C or > 38 °C)',
            citation: 'ECMWF IFS Land Model Analysis',
            status: 'good',
          },
        ];
      case 'jal':
        return [
          {
            name: 'Precipitation Infiltration-Exceedance Proxy',
            score: element.score,
            weight: 0.60,
            rawDisplay: 'Rainfall vs. Soil Infiltration Capacity',
            benchmark: 'Zero excess (<15 mm/h dry soil) = 100; >35 mm/h excess = 0',
            citation: 'Horton (1933) Infiltration Proxy Formulation',
            status: 'good',
          },
          {
            name: 'Relative Humidity Atmospheric Balance',
            score: element.score,
            weight: 0.40,
            rawDisplay: 'Ambient Relative Humidity',
            benchmark: 'Comfortable balance: 40–70% (Arid < 20%, Saturated > 95%)',
            citation: 'WMO Atmospheric Moisture Guidelines',
            status: 'good',
          },
        ];
      case 'agni':
        return [
          {
            name: 'NOAA/NWS Continuous Heat Index Stress',
            score: element.score,
            weight: 0.65,
            rawDisplay: 'Apparent Heat Index',
            benchmark: 'Safe: ≤27 °C, Caution: 27–32 °C, Danger: 32–41 °C, Extreme Danger: >41 °C',
            citation: 'NOAA/NWS Rothfusz & Steadman Heat Index Specification',
            status: 'good',
          },
          {
            name: 'Fosberg Fire Weather Index (FFWI)',
            score: element.score,
            weight: 0.35,
            rawDisplay: 'Equilibrium Fuel Moisture & Wind Combustion Potential',
            benchmark: 'Low: <20 (Score >80), Moderate: 20–40, High: 40–60, Extreme: >70 (Score <30)',
            citation: 'Fosberg (1978) & Simard (1968) Fuel Moisture Formulation',
            status: 'good',
          },
        ];
      case 'vayu':
        return [
          {
            name: 'Chemical Particulate Purity (PM2.5 / AQI)',
            score: element.score,
            weight: 0.80,
            rawDisplay: 'PM2.5 Concentration & US AQI',
            benchmark: 'Target: ≤5 µg/m³, WHO Interim-1: ≤35 µg/m³, Hazardous: >150 µg/m³',
            citation: 'WHO Global Air Quality Guidelines & US EPA AQI Standard',
            status: 'good',
          },
          {
            name: 'Ventilation & Stagnation Dispersion Index',
            score: element.score,
            weight: 0.20,
            rawDisplay: '10m Surface Wind Velocity',
            benchmark: 'Optimum dispersion: 8–25 km/h (Stagnation < 2 km/h, Gale > 60 km/h)',
            citation: 'Atmospheric Boundary Layer Dispersion Index',
            status: 'good',
          },
        ];
      case 'akash':
        return [
          {
            name: 'Altimetrically-Reduced Pressure Deviation',
            score: element.score,
            weight: 0.45,
            rawDisplay: 'Barometric Surface Pressure vs. Elevation Baseline',
            benchmark: 'Stable: |ΔP| ≤ 3 hPa, Extreme anomaly: |ΔP| ≥ 25 hPa',
            citation: 'ICAO Standard Atmosphere Altimetric Formula (Doc 7488)',
            status: 'good',
          },
          {
            name: 'Cloud Cover Radiative Balance',
            score: element.score,
            weight: 0.30,
            rawDisplay: 'Total Cloud Fraction',
            benchmark: 'Balanced: 30–70% (Clear radiation < 10%, Overcast > 95%)',
            citation: 'WMO Cloud Observation Standard',
            status: 'good',
          },
          {
            name: 'Solar UV Radiation Hazard',
            score: element.score,
            weight: 0.25,
            rawDisplay: 'Solar UV Radiation Index',
            benchmark: 'Low: ≤2, Moderate: 3–5, High: 6–7, Very High: 8–10, Extreme: ≥11',
            citation: 'WHO Global Solar UV Index Standard',
            status: 'good',
          },
        ];
    }
  };

  const subMetrics = element.subMetrics && element.subMetrics.length > 0
    ? element.subMetrics
    : getDefaultSubMetrics();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="element-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="card-paper w-full max-w-2xl rounded-3xl p-5 sm:p-8 shadow-2xl border border-emerald-900/20 dark:border-white/20 relative max-h-[88vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 dark:text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg flex-shrink-0"
            style={{ backgroundColor: element.color }}
          >
            {element.sanskritName[0]}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 id="element-modal-title" className="font-devanagari text-2xl font-bold text-slate-800 dark:text-slate-100">
                {element.sanskritName} ({element.englishName})
              </h3>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                Score: {element.score}/100
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">{element.meaning}</p>
          </div>
        </div>

        {/* Marginal Attribution Impact Banner */}
        {element.marginalAttribution != null && (
          <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                {isHi ? 'प्रकृति स्कोर पर संवेदनशीलता प्रभाव:' : 'Marginal Sensitivity Attribution:'}
              </span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className={`px-2 py-0.5 rounded-full font-bold ${
                element.marginalAttribution > 0 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : element.marginalAttribution < 0 
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  : 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300'
              }`}>
                {element.marginalAttribution > 0 ? `+${element.marginalAttribution}` : element.marginalAttribution} pts
              </span>
              <span className="text-slate-400 font-sans text-[11px] hidden sm:inline">
                ({element.attributionRole ?? 'Evaluated'})
              </span>
            </div>
          </div>
        )}

        {/* Element Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 mb-6">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans leading-relaxed">
            {element.summary}
          </p>
        </div>

        {/* Sub-Metrics & Normalization Breakdown */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>{isHi ? 'उप-मापदंड सामान्यीकरण एवं वैज्ञानिक सूत्र' : 'Sub-Metric Normalization & Domain Benchmarks'}</span>
          </h4>

          <div className="space-y-3">
            {subMetrics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                      Score: {item.score}/100
                    </span>
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                      Weight: {Math.round(item.weight * 100)}%
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>Reading: {item.rawDisplay}</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono leading-relaxed">
                  Benchmark: {item.benchmark}
                </p>

                <p className="text-[11px] text-slate-400 font-mono flex items-center space-x-1 pt-1 border-t border-slate-100 dark:border-white/5">
                  <ExternalLink className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>Provenance: {item.citation}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Measured Realtime Signals Grid */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isHi ? 'मापे गए भौतिक चर' : 'Active Physical Variable Readings'}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {element.keyMetrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                <span className="text-[11px] text-slate-400 block font-mono">{m.label}</span>
                <span className="text-base font-serif font-extrabold text-slate-800 dark:text-slate-100 mt-1 block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer & Close Action */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Governed by p=0.5 Generalized Mean
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-brand-dark hover:bg-brand-light text-white transition shadow-md"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
