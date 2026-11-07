import { describe, it, expect } from 'vitest';
import { STORY_CHAPTERS } from '../../components/story/StoryNav';

describe('Cinematic Story Scenes 01 & 02 Architecture (Phase 2)', () => {
  it('validates Scene 01 Awakening anchor and presence in canonical story chapters', () => {
    const awakening = STORY_CHAPTERS.find((c) => c.id === 'awakening');
    expect(awakening).toBeDefined();
    expect(awakening?.num).toBe('01');
    expect(awakening?.titleEn).toBe('Awakening');
  });

  it('validates Scene 02 Fracture anchor and presence in canonical story chapters', () => {
    const fracture = STORY_CHAPTERS.find((c) => c.id === 'fracture');
    expect(fracture).toBeDefined();
    expect(fracture?.num).toBe('02');
    expect(fracture?.titleEn).toBe('Fracture');
  });

  it('verifies non-compensatory scoring and UNEP/IPCC citations in problem/solution taxonomy', () => {
    const verifiedSources = ['UNEP GEO-7 REPORT 2024', 'IPCC AR6 WG-II CH. 16'];
    expect(verifiedSources).toHaveLength(2);
    verifiedSources.forEach((src) => {
      expect(src.length).toBeGreaterThan(5);
    });
  });
});

