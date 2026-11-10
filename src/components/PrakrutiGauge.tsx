import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAnimatedValue } from './ui/primitives';
import { scoreTone } from '../lib/tone';

interface PrakrutiGaugeProps {
  score: number;
  overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress';
  className?: string;
}

const CX = 130;
const CY = 130;
const R = 104;
const START = 135;
const SWEEP = 270;

function polar(angleDeg: number, radius = R) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function arcPath(sweepDeg: number) {
  const s = polar(START);
  const e = polar(START + sweepDeg);
  return `M ${s.x} ${s.y} A ${R} ${R} 0 ${sweepDeg > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
}

export const PrakrutiGauge: React.FC<PrakrutiGaugeProps> = ({ score, overallStatus, className = '' }) => {
  const { t, language } = useLanguage();
  const statusHi: Record<PrakrutiGaugeProps['overallStatus'], string> = {
    'Healthy / Optimal': 'स्वस्थ / इष्टतम',
    Balanced: 'संतुलित',
    'Under Stress': 'तनावग्रस्त',
    'Critical Stress': 'गंभीर तनाव',
  };
  const tone = scoreTone(score);
  const p = useAnimatedValue(score, 1.6);
  const sweep = (Math.max(0, Math.min(100, p)) / 100) * SWEEP;
  const knob = polar(START + sweep);
  const ticks = Array.from({ length: 55 }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 260 260" className="w-full h-full" role="img" aria-label={`${t('prakrutiScore')} ${score} / 100`}>
        <defs>
          <linearGradient id="gaugeStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={tone.hex} stopOpacity="0.55" />
            <stop offset="100%" stopColor={tone.hex} />
          </linearGradient>
          <filter id="gaugeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ticks.map((i) => {
          const angle = START + (i / (ticks.length - 1)) * SWEEP;
          const lit = (i / (ticks.length - 1)) * 100 <= p;
          const a = polar(angle, R - 16);
          const b = polar(angle, R - (i % 6 === 0 ? 26 : 22));
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={lit ? tone.hex : 'currentColor'}
              strokeOpacity={lit ? 0.9 : 0.14}
              strokeWidth={i % 6 === 0 ? 2 : 1.2}
              strokeLinecap="round"
            />
          );
        })}

        <path d={arcPath(SWEEP)} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="14" strokeLinecap="round" />
        {sweep > 0.6 && (
          <path
            d={arcPath(sweep)}
            fill="none"
            stroke="url(#gaugeStroke)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#gaugeGlow)"
          />
        )}
        <circle cx={knob.x} cy={knob.y} r="9" fill="#fff" stroke={tone.hex} strokeWidth="4" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none pb-2">
        <span className="display-number text-[4.2rem] sm:text-[4.8rem] text-slate-900 dark:text-white">{Math.round(p)}</span>
        <span className="font-mono text-xs text-slate-400 mt-0.5">/ 100 · {t('prakrutiScore')}</span>
      </div>
      <div className="absolute inset-x-0 bottom-[5%] flex justify-center pointer-events-none">
        <span
          className="px-3.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-sm"
          style={{ color: tone.hex, background: tone.soft, borderColor: `${tone.hex}55` }}
        >
          {language === 'hi' ? statusHi[overallStatus] : overallStatus}
        </span>
      </div>
    </div>
  );
};
