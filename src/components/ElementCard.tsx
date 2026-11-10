import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { ElementalRealisticIcon } from './ElementalRealisticIcon';
import { useLanguage } from '../context/LanguageContext';
import { Spotlight, useAnimatedValue, EASE } from './ui/primitives';
import { scoreTone } from '../lib/tone';

interface ElementCardProps {
  elementKey: MahabhutaElementKey;
  element: ElementScore;
  onClick: () => void;
  density?: 'zen' | 'technical';
  index?: number;
}

const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;

export const ElementCard: React.FC<ElementCardProps> = ({ elementKey, element, onClick, density = 'technical', index = 0 }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const tone = scoreTone(element.score);
  const shown = useAnimatedValue(element.score, 1.3);
  const delta = element.marginalAttribution ?? 0;
  const metrics = density === 'zen' ? element.keyMetrics.slice(0, 1) : element.keyMetrics.slice(0, 3);

  const status = isHi ? tone.labelHi : tone.labelEn;
  const DeltaIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const deltaColor = delta > 0 ? 'text-emerald-500' : delta < 0 ? 'text-rose-500' : 'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Spotlight
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${element.sanskritName} (${element.englishName}) - ${element.score} of 100`}
        className="card-paper group rounded-3xl p-5 h-full cursor-pointer overflow-hidden flex flex-col"
      >
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none opacity-70 dark:opacity-100 transition-opacity"
          style={{ background: `radial-gradient(90% 100% at 50% 0%, ${element.color}33, transparent 70%)` }}
        />
        <div className="absolute inset-x-6 top-0 h-[2px] rounded-b-full" style={{ background: `linear-gradient(90deg, transparent, ${element.color}, transparent)` }} />

        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <ElementalRealisticIcon elementKey={elementKey} size="md" />
            </div>
            <div className="min-w-0">
              <div className="font-devanagari text-2xl font-bold leading-tight text-slate-900 dark:text-white truncate">
                {element.sanskritName}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{element.englishName}</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
        </div>

        <div className="mt-5 flex items-center gap-3.5">
          <div className="relative w-[68px] h-[68px] flex-shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
              <circle cx="32" cy="32" r={RING_R} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r={RING_R}
                fill="none"
                stroke={element.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C - (shown / 100) * RING_C}
                style={{ filter: `drop-shadow(0 0 5px ${element.color}88)` }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-serif text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {Math.round(shown)}
            </span>
          </div>
          <div className="min-w-0">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap"
              style={{ color: tone.hex, background: tone.soft, borderColor: `${tone.hex}55` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.hex }} />
              {status}
            </span>
            <div className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${deltaColor}`}>
              <DeltaIcon className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">
                {delta > 0 ? '+' : ''}
                {delta} {isHi ? 'अंक' : 'pts'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 flex-1">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 leading-tight">{m.label}</span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-900/5 dark:border-white/10 text-[11px] font-semibold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
          {isHi ? 'पूरा विश्लेषण देखें →' : 'View full breakdown →'}
        </div>
      </Spotlight>
    </motion.div>
  );
};
