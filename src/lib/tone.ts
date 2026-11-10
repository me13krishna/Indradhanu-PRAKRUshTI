import type { MahabhutaElementKey } from '../types/prakrushti';

export interface Tone {
  hex: string;
  soft: string;
  labelEn: string;
  labelHi: string;
  level: 'healthy' | 'moderate' | 'stressed';
}

export function scoreTone(score: number): Tone {
  if (score >= 70) {
    return { hex: '#34d399', soft: 'rgba(52,211,153,0.16)', labelEn: 'Healthy', labelHi: 'स्वस्थ', level: 'healthy' };
  }
  if (score >= 45) {
    return { hex: '#fbbf24', soft: 'rgba(251,191,36,0.16)', labelEn: 'Watch', labelHi: 'निगरानी', level: 'moderate' };
  }
  return { hex: '#f87171', soft: 'rgba(248,113,113,0.16)', labelEn: 'Stressed', labelHi: 'तनावग्रस्त', level: 'stressed' };
}

export const ELEMENT_ORDER: MahabhutaElementKey[] = ['prithvi', 'jal', 'agni', 'vayu', 'akash'];

export const ELEMENT_META: Record<MahabhutaElementKey, { hex: string; sa: string; en: string; hi: string }> = {
  prithvi: { hex: '#e08a55', sa: 'पृथ्वी', en: 'Prithvi', hi: 'पृथ्वी' },
  jal: { hex: '#38a3d1', sa: 'जल', en: 'Jal', hi: 'जल' },
  agni: { hex: '#f59e3b', sa: 'अग्नि', en: 'Agni', hi: 'अग्नि' },
  vayu: { hex: '#5fd0c0', sa: 'वायु', en: 'Vayu', hi: 'वायु' },
  akash: { hex: '#a08fd6', sa: 'आकाश', en: 'Akash', hi: 'आकाश' },
};

export function hazardTone(level: 'low' | 'moderate' | 'high' | 'critical') {
  switch (level) {
    case 'low':
      return { hex: '#34d399', value: 18 };
    case 'moderate':
      return { hex: '#fbbf24', value: 48 };
    case 'high':
      return { hex: '#fb923c', value: 74 };
    case 'critical':
      return { hex: '#f87171', value: 96 };
  }
}
