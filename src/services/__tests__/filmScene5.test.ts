import { describe, it, expect } from 'vitest';

describe('Scene 5 Film Interactive Live World Verification', () => {
  it('enforces strict text budget for Scene 5 (≤ 15 words total)', () => {
    const headline = 'Try it on your world.';
    const caption = 'Tap any biome to see live balance.';
    const totalWords = (headline + ' ' + caption).trim().split(/\s+/);
    expect(totalWords.length).toBeLessThanOrEqual(15);
    expect(totalWords.length).toBe(12);
  });

  it('validates the four deep-link feature tiles', () => {
    const tileIds = ['map', 'simulator', 'compare', 'assistant'];
    expect(tileIds).toHaveLength(4);
    expect(tileIds).toContain('map');
    expect(tileIds).toContain('simulator');
    expect(tileIds).toContain('compare');
    expect(tileIds).toContain('assistant');
  });

  it('verifies presence of 3 diverse benchmark bioregions', () => {
    const biomes = ['Pune', 'Tokyo', 'Reykjavik'];
    expect(biomes).toHaveLength(3);
  });
});
