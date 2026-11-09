import React from 'react';
import type { PrakrutiAnalysis } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Clock, Database, MessageSquare, FileText, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

interface DashboardContextBarProps {
  analysis: PrakrutiAnalysis;
  onJumpToAssistant: () => void;
  onExportReport: () => void;
  onGenerateActionPlan?: () => void;
}

export const DashboardContextBar: React.FC<DashboardContextBarProps> = ({
  analysis,
  onJumpToAssistant,
  onExportReport,
  onGenerateActionPlan,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const isFallback =
    analysis.weather.provenance?.temperature?.method === 'ESTIMATED_PROXY' ||
    analysis.meta.dataSources.some((s) => s.toLowerCase().includes('fallback'));

  // Parse and format source observation / capture timestamp
  const captureDate = new Date(analysis.capturedAt);
  const formattedTime = !isNaN(captureDate.getTime())
    ? captureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Recent';
  const formattedDate = !isNaN(captureDate.getTime())
    ? captureDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  const lat = analysis.location.latitude.toFixed(3);
  const lng = analysis.location.longitude.toFixed(3);

  return (
    <div className="card-paper rounded-2xl p-3 sm:p-4 shadow-sm border border-emerald-900/10 dark:border-white/10 mb-6 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Location & Coordinates */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/5 dark:bg-white/10 text-slate-800 dark:text-slate-100 font-sans font-bold text-xs sm:text-sm shadow-sm border border-emerald-900/10 dark:border-white/5">
            <span className="relative flex h-2 w-2 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{analysis.location.name}</span>
          </div>

          <div className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
            {lat}° N, {lng}° E
            {analysis.weather.elevationM != null && ` • ${analysis.weather.elevationM}m ASL`}
          </div>

          {/* Model Fidelity / Data Status Badge */}
          {isFallback ? (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[11px] font-mono">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>{isHi ? 'ऑफ़लाइन फॉलबैक डेटा' : 'Offline Baseline Fallback'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[11px] font-mono">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{isHi ? 'मॉडल विश्लेषण (NWP Reanalysis)' : 'Model Output (ECMWF IFS via Open-Meteo)'}</span>
            </span>
          )}
        </div>

        {/* Right: Actual Source Timestamp & Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/50 dark:border-white/5 text-xs">
          
          {/* Authentic Timestamp Indicator */}
          <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400" title="Assessment computation timestamp">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {isHi ? 'संश्लेषण समय:' : 'Captured:'} {formattedDate} {formattedTime}
            </span>
          </div>

          {/* Provenance Micro-Tag */}
          <div className="hidden sm:flex items-center space-x-1 font-mono text-[11px] text-slate-400" title="Open-Meteo API delivering ECMWF IFS/GFS models">
            <Database className="w-3 h-3 text-slate-400" />
            <span>NWP + CAMS + USGS</span>
          </div>

          {/* Action: Nugen Domain-Aligned Ecological Action Plan */}
          {onGenerateActionPlan && (
            <button
              onClick={onGenerateActionPlan}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold transition shadow-sm text-xs cursor-pointer"
              title="Generate Nugen Domain-Aligned Ecological Action Plan"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>{isHi ? '⚡ नूजेन एक्शन प्लान' : '⚡ Nugen Action Plan'}</span>
            </button>
          )}

          {/* Action: Quick Jump to Assistant */}
          <button
            onClick={onJumpToAssistant}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-950/5 hover:bg-emerald-950/10 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-medium transition text-xs"
            title="Jump to Environmental Assistant"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isHi ? 'सहायक से पूछें' : 'Ask Assistant'}</span>
          </button>

          {/* Action: Export Report */}
          <button
            onClick={onExportReport}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-brand-dark hover:bg-brand-light text-white font-medium transition shadow-sm text-xs"
            title="Export Assessment Dossier"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isHi ? 'रिपोर्ट' : 'Report'}</span>
          </button>

        </div>

      </div>
    </div>
  );
};

