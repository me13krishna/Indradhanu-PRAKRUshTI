import type { Transition, Variants } from 'motion/react';

/**
 * Standard spring and cubic-bezier transition presets
 * tuned for an Apple-grade, physical environmental feel.
 */
export const transitions = {
  gentle: {
    type: 'spring',
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  } satisfies Transition,
  snappy: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
    mass: 0.6,
  } satisfies Transition,
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
    mass: 0.5,
  } satisfies Transition,
  cinematic: {
    duration: 0.9,
    ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out
  } satisfies Transition,
  fadeSlow: {
    duration: 1.2,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
};

/**
 * Common motion variants for scene transitions
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.cinematic,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.gentle,
  },
};

/**
 * Reduces or disables transitions when prefers-reduced-motion is requested.
 */
export function safeTransition(transition: Transition, isReducedMotion: boolean): Transition {
  if (isReducedMotion) {
    return { duration: 0.001 };
  }
  return transition;
}
