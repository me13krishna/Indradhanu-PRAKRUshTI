import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AIInsightPanelProps {
  insightsEnglish: string;
  insightsHindi?: string;
  recommendationsEnglish: string[];
  recommendationsHindi?: string[];
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  insightsEnglish,
  insightsHindi,
  recommendationsEnglish,
  recommendationsHindi,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const currentInsight = language === 'hi' && insightsHindi ? insightsHindi : insightsEnglish;
  const currentRecs = language === 'hi' && recommendationsHindi ? recommendationsHindi : recommendationsEnglish;

  return (
    <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/10 dark:border-white/10 my-6 relative overflow-hidden">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>{t('aiInsights')}</span>
            </h3>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded in Real Metrics (No invented numbers)</span>
            </span>
          </div>
        </div>

        {/* Hindi / English Toggle for AI text */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 transition"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}</span>
        </button>
      </div>

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
