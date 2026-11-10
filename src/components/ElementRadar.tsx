import React, { useState } from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { useAnimatedValue } from './ui/primitives';
import { ELEMENT_META, ELEMENT_ORDER } from '../lib/tone';
import { useLanguage } from '../context/LanguageContext';

interface ElementRadarProps {
  elements: Record<MahabhutaElementKey, ElementScore>;
  onSelect: (key: MahabhutaElementKey) => void;
  className?: string;
}

const C = 150;
const RAD = 92;

function vertex(i: number, scale: number) {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { x: C + RAD * scale * Math.cos(a), y: C + RAD * scale * Math.sin(a) };
}

const poly = (scale: number) =>
  ELEMENT_ORDER.map((_, i) => {
    const v = vertex(i, scale);
    return `${v.x},${v.y}`;
  }).join(' ');

export const ElementRadar: React.FC<ElementRadarProps> = ({ elements, onSelect, className = '' }) => {
  const { language } = useLanguage();
  const [hover, setHover] = useState<MahabhutaElementKey | null>(null);
  const grow = useAnimatedValue(1, 1.4);

  const dataPoints = ELEMENT_ORDER.map((k, i) => {
    const v = vertex(i, (elements[k].score / 100) * grow);
    return `${v.x},${v.y}`;
  }).join(' ');

  return (
    <div className={className}>
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible" role="group" aria-label="Panch Mahabhuta balance radar">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s} points={poly(s)} fill="none" stroke="currentColor" strokeOpacity={s === 1 ? 0.22 : 0.1} strokeWidth="1" />
        ))}
        {ELEMENT_ORDER.map((_, i) => {
          const v = vertex(i, 1);
          return <line key={i} x1={C} y1={C} x2={v.x} y2={v.y} stroke="currentColor" strokeOpacity="0.1" />;
        })}

        <polygon points={dataPoints} fill="url(#radarFill)" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />

        {ELEMENT_ORDER.map((k, i) => {
          const meta = ELEMENT_META[k];
          const pt = vertex(i, (elements[k].score / 100) * grow);
          const lab = vertex(i, 1.3);
          const active = hover === k;
          return (
            <g
              key={k}
              className="cursor-pointer"
              onMouseEnter={() => setHover(k)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(k)}
              tabIndex={0}
              role="button"
              aria-label={`${meta.en} ${elements[k].score}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(k)}
            >
              <circle cx={pt.x} cy={pt.y} r={active ? 9 : 6} fill={meta.hex} stroke="#fff" strokeWidth="2" style={{ transition: 'r .2s' }} />
              {active && <circle cx={pt.x} cy={pt.y} r="15" fill={meta.hex} opacity="0.22" />}
              <text x={lab.x} y={lab.y - 3} textAnchor="middle" className="font-devanagari" fontSize="15" fontWeight="700" fill={meta.hex}>
                {meta.sa}
              </text>
              <text x={lab.x} y={lab.y + 13} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" opacity={active ? 1 : 0.7} className="font-mono">
                {language === 'hi' ? '' : `${meta.en} `}
                {elements[k].score}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
