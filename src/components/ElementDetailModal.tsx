import React from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ElementDetailModalProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClose: () => void;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({ elementKey, element, onClose }) => {
  const { t } = useLanguage();

  const getSubMetricBreakdown = () => {
    switch (elementKey) {
      case 'prithvi':
        return [
          { name: 'Soil Moisture Saturation Proxy', weight: '40%', standard: 'FAO Soil Water Index (10-90%)', citation: 'Food and Agriculture Organization (FAO)' },
          { name: 'Seismic Tectonic Stability', weight: '30%', standard: 'USGS Moment Magnitude Standard', citation: 'United States Geological Survey' },
          { name: 'Land Degradation & Vegetation', weight: '30%', standard: 'MODIS Normalized Vegetation Index', citation: 'NASA EOS Data and Information System' },
        ];
      case 'jal':
        return [
          { name: 'Precipitation Balance', weight: '35%', standard: 'WMO Precipitation Intensity Bands', citation: 'World Meteorological Organization' },
          { name: 'Flood Risk Mitigation', weight: '35%', standard: 'Global Flood Awareness System (GloFAS)', citation: 'European Centre for Medium-Range Weather Forecasts' },
          { name: 'Hydrological Moisture Index', weight: '30%', standard: 'Palmer Drought Severity Proxy', citation: 'NOAA National Centers for Environmental Information' },
        ];
      case 'agni':
        return [
          { name: 'Ambient Thermal Anomaly', weight: '40%', standard: 'WMO Heat Index Standard (18-28°C ideal)', citation: 'World Health Organization (WHO)' },
          { name: 'Heatwave Hazard Mitigation', weight: '30%', standard: 'Global Thermal Stress Classification', citation: 'Climate Prediction Center' },
          { name: 'Wildfire Risk Index', weight: '30%', standard: 'NASA FIRMS Thermal Anomaly Feed', citation: 'NASA Earth Observing System' },
        ];
      case 'vayu':
        return [
          { name: 'Air Quality Index (AQI / PM2.5)', weight: '60%', standard: 'WHO Global Air Quality Guidelines (0-50 AQI)', citation: 'World Health Organization Guidelines 2021' },
          { name: 'Wind Dispersion Stability', weight: '40%', standard: 'Beaufort Wind Scale (5-25 km/h optimal)', citation: 'National Weather Service' },
        ];
      case 'akash':
        return [
          { name: 'UV / Solar Radiation Exposure', weight: '50%', standard: 'WHO Global Solar UV Index (1-11+)', citation: 'World Health Organization' },
          { name: 'Barometric Pressure Balance', weight: '50%', standard: 'Standard Atmosphere (1013.25 hPa)', citation: 'International Civil Aviation Organization' },
        ];
    }
  };

  const breakdowns = getSubMetricBreakdown();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="card-paper w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/20 dark:border-white/20 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl font-serif font-bold shadow-lg"
            style={{ backgroundColor: element.color }}
          >
            {element.sanskritName[0]}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-devanagari text-2xl font-bold text-slate-800 dark:text-slate-100">
                {element.sanskritName} ({element.englishName})
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                Score: {element.score}/100
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">{element.meaning}</p>
          </div>
        </div>

        {/* Element Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 mb-6">
          <p className="text-sm text-slate-700 dark:text-slate-200 font-sans leading-relaxed">
            {element.summary}
          </p>
        </div>

        {/* Sub-Metrics & Formulas Breakdown */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3 flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Sub-Metric Normalization & Domain Thresholds</span>
        </h4>

        <div className="space-y-3 mb-6">
          {breakdowns.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex flex-col justify-between space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.name}</span>
                <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                  Weight: {item.weight}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Standard: {item.standard}
              </p>
              <p className="text-[11px] text-slate-400 font-mono flex items-center space-x-1 mt-1">
                <ExternalLink className="w-3 h-3 text-emerald-600" />
                <span>Citation: {item.citation}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Key Realtime Signals */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
          Measured Realtime Signals
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {element.keyMetrics.map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
              <span className="text-[11px] text-slate-400 block font-mono">{m.label}</span>
              <span className="text-base font-serif font-extrabold text-slate-800 dark:text-slate-100 mt-1 block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-dark hover:bg-brand-light text-white transition shadow-md"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
