import { describe, it, expect } from 'vitest';
import { STORY_CHAPTERS } from '../../components/story/StoryNav';

describe('Story Navigation & Chapter Anchors (Phase 1)', () => {
  it('defines all 6 canonical narrative chapters with numbers and dual-language titles', () => {
    expect(STORY_CHAPTERS).toHaveLength(6);
    expect(STORY_CHAPTERS.map((c) => c.id)).toEqual([
      'awakening',
      'fracture',
      'elements',
      'engine',
      'explore',
      'vision',
    ]);
  });

  it('verifies sequential chapter numbering from 01 to 06', () => {
    const nums = STORY_CHAPTERS.map((c) => c.num);
    expect(nums).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('ensures every chapter has non-empty English and Hindi titles', () => {
    STORY_CHAPTERS.forEach((chapter) => {
      expect(chapter.titleEn.trim().length).toBeGreaterThan(0);
      expect(chapter.titleHi.trim().length).toBeGreaterThan(0);
    });
  });
});

