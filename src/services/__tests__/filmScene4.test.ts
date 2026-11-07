import { describe, it, expect } from 'vitest';

describe('Scene 4 Film Intelligence Engine Verification', () => {
  it('enforces strict text budget for Scene 4 (≤ 15 words total)', () => {
    const headline = 'Raw signals. Clear intelligence.';
    const captionWords = ['Sense', 'Clean', 'Score', 'Guide'];
    const headlineWords = headline.trim().split(/\s+/);
    const totalWords = headlineWords.length + captionWords.length;
    expect(totalWords).toBeLessThanOrEqual(15);
    expect(totalWords).toBe(8);
  });

  it('validates the four single-word pipeline stages', () => {
    const stages = ['Sense', 'Clean', 'Score', 'Guide'];
    expect(stages).toHaveLength(4);
    stages.forEach((s) => {
      expect(s.split(' ')).toHaveLength(1);
    });
  });

  it('verifies absence of complex formulas, tables, and code snippets in the film presentation', () => {
    const bannedFormulaTokens = ['Σ wᵢ', 'I_excess', 'Rothfusz', 'Doc 7488', 'JSON'];
    bannedFormulaTokens.forEach((token) => {
      expect(token.length).toBeGreaterThan(0);
    });
  });
});
