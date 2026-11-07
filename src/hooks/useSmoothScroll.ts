import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseSmoothScrollOptions {
  enabled?: boolean;
}

/**
 * Custom hook to initialize Lenis smooth scrolling for cinematic desktop storytelling,
 * while respecting prefers-reduced-motion and preserving native momentum touch on mobile devices.
 */
export function useSmoothScroll({ enabled = true }: UseSmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled || prefersReducedMotion) {
      return;
    }

    // Detect if primary pointer is touch (mobile phones/tablets)
    const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;

    // Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isTouchOnly, // Keep native touch momentum on phones
      syncTouch: false,          // Never hijack native touch momentum
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, prefersReducedMotion]);

  const scrollTo = useCallback((target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const id = target.startsWith('#') ? target.slice(1) : target;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    }
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
  };
}
