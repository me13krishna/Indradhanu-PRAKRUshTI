import { describe, it, expect } from 'vitest';
import { transitions, safeTransition, staggerContainer } from '../../lib/motion';

describe('Motion Primitives & Accessibility Safety (Phase 1)', () => {
  it('provides calibrated Apple-grade spring and cubic-bezier transition presets', () => {
    expect(transitions.gentle.type).toBe('spring');
    expect(transitions.snappy.type).toBe('spring');
    expect(transitions.cinematic.duration).toBe(0.9);
    expect(transitions.fadeSlow.duration).toBe(1.2);
  });

  it('safely collapses animation durations when prefers-reduced-motion is true', () => {
    const normal = transitions.cinematic;
    const reduced = safeTransition(normal, true);
    expect(reduced).toEqual({ duration: 0.001 });

    const active = safeTransition(normal, false);
    expect(active).toBe(normal);
  });

  it('generates valid staggered container variants', () => {
    const variants = staggerContainer(0.15, 0.2);
    expect(variants.hidden).toEqual({ opacity: 0 });
    expect(variants.visible).toMatchObject({
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    });
  });
});

