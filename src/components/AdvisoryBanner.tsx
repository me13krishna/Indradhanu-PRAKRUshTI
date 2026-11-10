import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertOctagon, AlertTriangle } from 'lucide-react';
import type { SafetyAdvisoryItem } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';

export const AdvisoryBanner: React.FC<{ advisories?: SafetyAdvisoryItem[] }> = ({ advisories }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  if (!advisories?.length) return null;

  return (
    <AnimatePresence>
      <div className="space-y-2.5" role="alert" aria-label={isHi ? 'सुरक्षा सलाह' : 'Safety advisories'}>
        {advisories.map((a, i) => {
          const critical = a.level === 'critical';
          const color = critical ? '#f87171' : '#fb923c';
          const Icon = critical ? AlertOctagon : AlertTriangle;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 260, damping: 26 }}
              className="relative overflow-hidden flex items-start gap-3.5 p-4 rounded-2xl border"
              style={{ background: `${color}14`, borderColor: `${color}55` }}
            >
              <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: color }} />
              <span className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 animate-pulse" style={{ background: `${color}25`, color }}>
                <Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{a.title}</span>
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: `${color}25`, color }}>
                    {a.level}
                  </span>
                </div>
                <p className="text-[13px] text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">{a.message}</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">{isHi ? 'स्रोत' : 'Source'}: {a.source}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
};
