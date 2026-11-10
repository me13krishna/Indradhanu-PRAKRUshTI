import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Languages, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ExplainabilityData } from '../types/prakrushti';
import { EASE } from './ui/primitives';

interface AIInsightPanelProps {
  insightsEnglish: string;
  insightsHindi?: string;
  recommendationsEnglish: string[];
  recommendationsHindi?: string[];
  explainability?: ExplainabilityData;
  onOpenAssistant?: () => void;
  showEvidence?: boolean;
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  insightsEnglish,
  insightsHindi,
  recommendationsEnglish,
  recommendationsHindi,
  explainability,
  onOpenAssistant,
  showEvidence = true,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const isHi = language === 'hi';

  const insight = isHi && insightsHindi ? insightsHindi : insightsEnglish;
  const recs = isHi && recommendationsHindi ? recommendationsHindi : recommendationsEnglish;

  return (
    <div className="card-paper gradient-border rounded-3xl p-6 sm:p-7 h-full flex flex-col relative overflow-hidden">
      <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-wrap items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-900/30">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white leading-tight">{t('aiInsights')}</h3>
            {showEvidence && explainability && (
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                {explainability.confidenceScore}% {isHi ? 'विश्वास' : 'confidence'} · ECMWF · CAMS · USGS
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(isHi ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/5 dark:bg-white/8 text-slate-700 dark:text-slate-200 hover:bg-emerald-500/15 transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            {isHi ? 'Read in English' : 'हिंदी में पढ़ें'}
          </button>
          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {isHi ? 'AI से पूछें' : 'Ask AI'}
            </button>
          )}
        </div>
      </div>

      <motion.p
        key={language}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`relative text-[15px] sm:text-base leading-[1.75] text-slate-700 dark:text-slate-200 ${isHi ? 'font-devanagari' : ''}`}
      >
        {insight}
      </motion.p>

      <div className="relative mt-6">
        <h4 className="eyebrow mb-3">{t('recommendations')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recs.map((rec, idx) => (
            <motion.div
              key={`${language}-${idx}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: EASE }}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/15 hover:border-emerald-500/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-300" />
              <p className={`text-[13px] leading-relaxed text-slate-700 dark:text-slate-200 ${isHi ? 'font-devanagari' : ''}`}>{rec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
