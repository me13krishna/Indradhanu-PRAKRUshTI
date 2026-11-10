import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import type { PrakrutiAnalysis } from '../../types/prakrushti';
import { AIAssistantChat } from '../AIAssistantChat';
import { useLanguage } from '../../context/LanguageContext';

interface AssistantDrawerProps {
  open: boolean;
  onClose: () => void;
  analysis: PrakrutiAnalysis | null;
}

export const AssistantDrawer: React.FC<AssistantDrawerProps> = ({ open, onClose, analysis }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end no-print"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={isHi ? 'AI सहायक' : 'AI assistant'}
        >
          <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            className="relative h-full w-full sm:w-[34rem] bg-white/95 dark:bg-[#0b1812]/96 backdrop-blur-2xl border-l border-slate-200 dark:border-white/10 shadow-2xl shadow-black/50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 eyebrow">
                <Sparkles className="w-4 h-4" />
                <span>{isHi ? 'AI सहायक' : 'AI assistant'}</span>
              </div>
              <button
                onClick={onClose}
                className="touch-target p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label={isHi ? 'बंद करें' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              {analysis ? (
                <AIAssistantChat analysis={analysis} variant="drawer" />
              ) : (
                <div className="p-8 text-sm text-slate-500">{isHi ? 'डेटा लोड हो रहा है…' : 'Waiting for live data…'}</div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
