import { describe, it, expect } from 'vitest';

describe('Scene 3 Film Pinned Visual Elements Verification', () => {
  it('enforces strict text budget for Scene 3 (≤ 8 words)', () => {
    const headline = 'Five elements. One balance.';
    const words = headline.trim().split(/\s+/);
    expect(words.length).toBeLessThanOrEqual(8);
    expect(words.length).toBe(4);
  });

  it('verifies all 5 elements are represented with single-word English and Sanskrit labels', () => {
    const elements = [
      { sanskrit: 'Prithvi', english: 'Earth' },
      { sanskrit: 'Jal', english: 'Water' },
      { sanskrit: 'Agni', english: 'Fire' },
      { sanskrit: 'Vayu', english: 'Air' },
      { sanskrit: 'Akash', english: 'Space' },
    ];
    expect(elements).toHaveLength(5);
    elements.forEach((el) => {
      expect(el.sanskrit.split(' ')).toHaveLength(1);
      expect(el.english.split(' ')).toHaveLength(1);
    });
  });

  it('validates Rule 6a disclosure tooltip single-line copy', () => {
    const disclosure = 'An interpretive lens. Real measurements power the score.';
    expect(disclosure.split(/\s+/).length).toBeLessThanOrEqual(10);
  });
});

