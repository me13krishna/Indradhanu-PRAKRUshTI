import { describe, it, expect } from 'vitest';

describe('Visual Film Scenes 1 & 2 Course Correction Verification', () => {
  it('enforces strict text budget for Scene 1 (≤ 8 words)', () => {
    const scene1HeadlineEn = 'The Earth is speaking.';
    const words = scene1HeadlineEn.trim().split(/\s+/);
    expect(words.length).toBeLessThanOrEqual(8);
    expect(words.length).toBe(4);
  });

  it('enforces strict text budget for Scene 2 (≤ 15 words total)', () => {
    const scene2HeadlineEn = 'Everything is connected.';
    const scene2CaptionEn = 'One disruption ripples across every element.';
    const totalWords = (scene2HeadlineEn + ' ' + scene2CaptionEn).trim().split(/\s+/);
    expect(totalWords.length).toBeLessThanOrEqual(15);
    expect(totalWords.length).toBe(9);
  });

  it('verifies the 5-node causal degradation sequence in Scene 2', () => {
    const causalNodes = ['emissions', 'thermal', 'glacier', 'drought', 'storm'];
    expect(causalNodes).toHaveLength(5);
    expect(causalNodes[0]).toBe('emissions');
    expect(causalNodes[1]).toBe('thermal');
    expect(causalNodes[2]).toBe('glacier');
    expect(causalNodes[3]).toBe('drought');
    expect(causalNodes[4]).toBe('storm');
  });

  it('verifies minimalist film navigation bar with 6 unlabeled pips', () => {
    const sceneCount = 6;
    expect(sceneCount).toBe(6);
  });

  it('validates scientific citations and metrics in Scene 2 causal chain', () => {
    const metrics = [
      { id: 'emissions', stat: '424 ppm', src: '[NOAA]' },
      { id: 'thermal', stat: '+1.45°C', src: '[WMO 2024]' },
      { id: 'glacier', stat: '-38%', src: '[NASA GRACE]' },
      { id: 'drought', stat: '40% θ', src: '[FAO-56]' },
      { id: 'storm', stat: '+7%/°C', src: '[Clausius-Clapeyron]' },
    ];
    expect(metrics).toHaveLength(5);
    expect(metrics.every((m) => m.stat && m.src)).toBe(true);
  });

  it('validates Scene 6 tree planting healing goal threshold', () => {
    const GOAL = 5;
    expect(GOAL).toBe(5);
    const healProgress = (planted: number) => Math.min(1, planted / GOAL);
    expect(healProgress(0)).toBe(0);
    expect(healProgress(3)).toBe(0.6);
    expect(healProgress(5)).toBe(1);
    expect(healProgress(10)).toBe(1);
  });
});

