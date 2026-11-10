import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Flame, Waves, FlameKindling, Wind, Activity, Info } from 'lucide-react';
import type { HazardRisk, DetailedRiskItem } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { hazardTone } from '../lib/tone';
import { EASE } from './ui/primitives';

interface DisasterRisksProps {
  disasterRisk: HazardRisk;
  risks: DetailedRiskItem[];
}

export const DisasterRisks: React.FC<DisasterRisksProps> = ({ disasterRisk, risks }) => {
  const { language, t } = useLanguage();
  const isHi = language === 'hi';

  const hazards = [
    { label: isHi ? 'बाढ़' : 'Flood', level: disasterRisk.flood, icon: Waves },
    { label: isHi ? 'लू / ताप' : 'Heatwave', level: disasterRisk.heat, icon: Flame },
    { label: isHi ? 'वनाग्नि' : 'Wildfire', level: disasterRisk.fire, icon: FlameKindling },
    { label: isHi ? 'तूफ़ान' : 'Storm', level: disasterRisk.storm, icon: Wind },
    { label: isHi ? 'भूकंप' : 'Seismic', level: disasterRisk.seismic, icon: Activity },
  ];

  const order = ['low', 'moderate', 'high', 'critical'] as const;
  const worst = hazards.reduce<(typeof order)[number]>(
    (acc, h) => (order.indexOf(h.level) > order.indexOf(acc) ? h.level : acc),
    'low'
  );
  const overall = hazardTone(worst);

  return (
    <div className="card-paper rounded-3xl p-6 sm:p-7 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <div className="eyebrow !text-amber-600 dark:!text-amber-300 flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            {isHi ? 'निर्णय सहायता' : 'Decision support'}
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{t('disasterRisk')}</h3>
        </div>
      </div>

      <div
        className="mb-6 flex items-center gap-4 p-4 rounded-2xl border"
        style={{ background: `${overall.hex}12`, borderColor: `${overall.hex}40` }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0" style={{ background: `${overall.hex}25`, color: overall.hex }}>
          <ShieldAlert className="w-6 h-6" />
        </span>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isHi ? 'समग्र जोखिम' : 'Overall hazard level'}
          </div>
          <div className="font-serif text-2xl font-extrabold uppercase" style={{ color: overall.hex }}>
            {worst}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {hazards.map((h, i) => {
          const tone = hazardTone(h.level);
          const Icon = h.icon;
          return (
            <div key={h.label} className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0" style={{ background: `${tone.hex}22`, color: tone.hex }}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="w-20 text-sm font-semibold text-slate-700 dark:text-slate-200 flex-shrink-0">{h.label}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-900/8 dark:bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${tone.hex}77, ${tone.hex})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tone.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                />
              </div>
              <span className="w-[4.5rem] text-right text-[11px] font-mono font-bold uppercase tracking-wider flex-shrink-0" style={{ color: tone.hex }}>
                {h.level}
              </span>
            </div>
          );
        })}
      </div>

      {risks.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-900/8 dark:border-white/10 space-y-3 flex-1">
          {risks.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300">
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/6 dark:bg-white/10 font-mono text-slate-500 dark:text-slate-300">{item.level}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                {item.source && <p className="text-[10px] text-slate-400 font-mono mt-1">{isHi ? 'स्रोत' : 'Source'}: {item.source}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
