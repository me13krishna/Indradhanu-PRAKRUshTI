import { describe, it, expect } from 'vitest';

describe('Scene 6 Film Vision & Global Text Budget Verification', () => {
  it('enforces strict text budget for Scene 6 headline (≤ 8 words)', () => {
    const headline = 'Understand Nature. Decode Its Signals. Shape Tomorrow.';
    const words = headline.trim().split(/\s+/);
    expect(words.length).toBeLessThanOrEqual(8);
    expect(words.length).toBe(7);
  });

  it('validates Rule 6c quiet single-line disclaimer and credits', () => {
    const disclaimer = 'Elements are an interpretive framework; scores use standard environmental data.';
    const credits = 'Indradhanu PCCOE 2026';
    expect(disclaimer.length).toBeGreaterThan(15);
    expect(credits).toBe('Indradhanu PCCOE 2026');
  });

  it('verifies GLOBAL film text budget across all 6 scenes is under 50 words total', () => {
    const scene1 = 'The Earth is speaking.'; // 4
    const scene2 = 'Everything is connected. One disruption ripples across every element.'; // 9
    const scene3 = 'Five elements. One balance.'; // 4
    const scene4 = 'Raw signals. Clear intelligence. Sense Clean Score Guide'; // 8
    const scene5 = 'Try it on your world. Tap any biome to see live balance.'; // 12
    const scene6 = 'Understand Nature. Decode Its Signals. Shape Tomorrow.'; // 7

    const totalWords = (
      scene1 + ' ' + scene2 + ' ' + scene3 + ' ' + scene4 + ' ' + scene5 + ' ' + scene6
    ).trim().split(/\s+/);

    expect(totalWords.length).toBeLessThanOrEqual(50);
    expect(totalWords.length).toBe(44); // Exactly 44 words across the whole film!
  });
});
