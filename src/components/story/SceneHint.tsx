import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MousePointerClick } from 'lucide-react';

export const SceneEyebrow: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mb-3 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-300/80"
  >
    <span className="text-amber-300/90">{n}</span>
    <span className="h-px w-8 bg-emerald-300/40" />
    <span>{label}</span>
    <span className="text-slate-500">/ 06</span>
  </motion.div>
);

interface SceneHintProps {
  text: string;
  show?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const SceneHint: React.FC<SceneHintProps> = ({ text, show = true, icon, className = '' }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="hint"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-none inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono tracking-wide text-emerald-100/90 ${className}`}
        role="note"
      >
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex text-emerald-300"
        >
          {icon ?? <MousePointerClick className="w-3.5 h-3.5" />}
        </motion.span>
        {text}
      </motion.div>
    )}
  </AnimatePresence>
);
