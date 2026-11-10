import React from 'react';
import type { ElementScore, MahabhutaElementKey } from '../types/prakrushti';
import { useAnimatedValue } from './ui/primitives';
import { ELEMENT_META, ELEMENT_ORDER } from '../lib/tone';

interface ComparisonRadarProps {
  a: Record<MahabhutaElementKey, ElementScore>;
  b: Record<MahabhutaElementKey, ElementScore>;
  nameA: string;
  nameB: string;
  className?: string;
}

const C = 150;
const RAD = 92;
const A_COLOR = '#34d399';
const B_COLOR = '#818cf8';

function vertex(i: number, scale: number) {
  const ang = ((-90 + i * 72) * Math.PI) / 180;
  return { x: C + RAD * scale * Math.cos(ang), y: C + RAD * scale * Math.sin(ang) };
}

const ring = (scale: number) =>
  ELEMENT_ORDER.map((_, i) => {
    const v = vertex(i, scale);
    return `${v.x},${v.y}`;
  }).join(' ');

export const ComparisonRadar: React.FC<ComparisonRadarProps> = ({ a, b, nameA, nameB, className = '' }) => {
  const grow = useAnimatedValue(1, 1.3);
  const poly = (set: Record<MahabhutaElementKey, ElementScore>) =>
    ELEMENT_ORDER.map((k, i) => {
      const v = vertex(i, (set[k].score / 100) * grow);
      return `${v.x},${v.y}`;
    }).join(' ');

  return (
    <div className={className}>
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible text-slate-900 dark:text-white" role="img" aria-label={`${nameA} versus ${nameB}`}>
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s} points={ring(s)} fill="none" stroke="currentColor" strokeOpacity={s === 1 ? 0.22 : 0.1} />
        ))}
        {ELEMENT_ORDER.map((_, i) => {
          const v = vertex(i, 1);
          return <line key={i} x1={C} y1={C} x2={v.x} y2={v.y} stroke="currentColor" strokeOpacity="0.1" />;
        })}

        <polygon points={poly(b)} fill={B_COLOR} fillOpacity="0.2" stroke={B_COLOR} strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points={poly(a)} fill={A_COLOR} fillOpacity="0.2" stroke={A_COLOR} strokeWidth="2.2" strokeLinejoin="round" />

        {ELEMENT_ORDER.map((k, i) => {
          const lab = vertex(i, 1.28);
          return (
            <text key={k} x={lab.x} y={lab.y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={ELEMENT_META[k].hex} className="font-devanagari">
              {ELEMENT_META[k].sa}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
