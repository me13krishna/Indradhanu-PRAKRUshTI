import { describe, it, expect, vi } from 'vitest';
import type { PrakrutiAnalysis } from '../../types/prakrushti';
import { analysisToHotspot, fetchLiveHotspots, isLiveAnalysis, BENCHMARK_CITIES } from '../hotspots';

function fakeAnalysis(score: number, method: 'NWP_ATMOSPHERIC_ANALYSIS' | 'ESTIMATED_PROXY' = 'NWP_ATMOSPHERIC_ANALYSIS'): PrakrutiAnalysis {
  const el = (s: number) => ({
    score: s,
    subMetrics: [
      { name: 'Strong signal', score: 90, rawDisplay: 'ok' },
      { name: 'Weak signal', score: 20, rawDisplay: '312 ug' },
    ],
  });
  return {
    prakrutiScore: score,
    weather: { provenance: { atmosphere: { method } } },
    elements: { prithvi: el(70), jal: el(80), agni: el(90), vayu: el(40), akash: el(60) },
    explainability: {
      primaryStressDriver: 'vayu',
      primaryResiliencePillar: 'agni',
      attributions: { prithvi: 0, jal: 1, agni: 3, vayu: -4, akash: 0 },
      confidenceScore: 90,
    },
  } as unknown as PrakrutiAnalysis;
}

describe('Live hotspots', () => {
  it('maps an analysis to a hotspot with the weakest sub-metric of the main stress driver', () => {
    const item = analysisToHotspot(BENCHMARK_CITIES[0], fakeAnalysis(61));
    expect(item.prakrutiScore).toBe(61);
    expect(item.elementStatus.vayu).toBe(40);
    expect(item.primaryStress).toContain('Vayu');
    expect(item.primaryStress).toContain('Weak signal');
  });

  it('reports balance when no element drags the score down', () => {
    const a = fakeAnalysis(88);
    a.explainability!.attributions.vayu = 0;
    expect(analysisToHotspot(BENCHMARK_CITIES[0], a).primaryStress).toMatch(/balanced/i);
  });

  it('treats estimated-proxy data as not live', () => {
    expect(isLiveAnalysis(fakeAnalysis(50, 'ESTIMATED_PROXY'))).toBe(false);
    expect(isLiveAnalysis(fakeAnalysis(50))).toBe(true);
  });

  it('keeps only live results and survives per-city failures', async () => {
    let call = 0;
    const analyse = vi.fn(async () => {
      call += 1;
      if (call % 5 === 0) throw new Error('network down');
      if (call % 7 === 0) return fakeAnalysis(10, 'ESTIMATED_PROXY');
      return fakeAnalysis(60 + (call % 30));
    });
    const progress: number[] = [];
    const items = await fetchLiveHotspots({ analyse, onProgress: (d) => progress.push(d), concurrency: 3 });

    expect(analyse).toHaveBeenCalledTimes(BENCHMARK_CITIES.length);
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThan(BENCHMARK_CITIES.length);
    expect(items.every((i) => i.prakrutiScore >= 60)).toBe(true);
    expect(progress[progress.length - 1]).toBe(BENCHMARK_CITIES.length);
  });

  it('stops dispatching new cities once aborted', async () => {
    const ctrl = new AbortController();
    const analyse = vi.fn(async () => {
      ctrl.abort();
      return fakeAnalysis(70);
    });
    await fetchLiveHotspots({ analyse, signal: ctrl.signal, concurrency: 1 });
    expect(analyse.mock.calls.length).toBeLessThan(BENCHMARK_CITIES.length);
  });
});
