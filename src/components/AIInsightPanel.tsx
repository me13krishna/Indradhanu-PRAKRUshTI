import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Languages, Activity, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ExplainabilityData } from '../types/prakrushti';

interface AIInsightPanelProps {
  insightsEnglish: string;
  insightsHindi?: string;
  recommendationsEnglish: string[];
  recommendationsHindi?: string[];
  explainability?: ExplainabilityData;
  onOpenAssistant?: () => void;
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  insightsEnglish,
  insightsHindi,
  recommendationsEnglish,
  recommendationsHindi,
  explainability,
  onOpenAssistant,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const currentInsight = language === 'hi' && insightsHindi ? insightsHindi : insightsEnglish;
  const currentRecs = language === 'hi' && recommendationsHindi ? recommendationsHindi : recommendationsEnglish;

  return (
    <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/10 dark:border-white/10 relative overflow-hidden h-full flex flex-col justify-between">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100">
                {t('aiInsights')}
              </h3>
              {explainability && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/50">
                  {explainability.confidenceScore}% Confidence
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded in Real Metrics (ECMWF IFS, CAMS & USGS)</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-dark hover:bg-brand-light text-white transition shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'AI से पूछें' : 'Ask AI'}</span>
            </button>
          )}

          {/* Hindi / English Toggle for AI text */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 transition"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}</span>
          </button>
        </div>
      </div>

      {/* Explainability Tags Strip */}
      {explainability && (
        <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-slate-400">Primary Stress Driver:</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 uppercase">
              {explainability.primaryStressDriver} ({explainability.attributions[explainability.primaryStressDriver]} pts)
            </span>
          </div>

          <span className="text-slate-300 dark:text-white/20 hidden sm:inline">•</span>

          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-400">Resilience Pillar:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              {explainability.primaryResiliencePillar} (+{explainability.attributions[explainability.primaryResiliencePillar]} pts)
            </span>
          </div>
        </div>
      )}

      {/* AI Plain Language Diagnostic Paragraph */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 mb-6">
        <p className={`text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans ${language === 'hi' ? 'font-devanagari' : ''}`}>
          {currentInsight}
        </p>
      </div>

      {/* Actionable Recommendations List */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
          {t('recommendations')}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentRecs.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/20 flex items-start space-x-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <p className={`text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans leading-relaxed ${language === 'hi' ? 'font-devanagari' : ''}`}>
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
