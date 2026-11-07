import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ParticleCanvasProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  theme?: 'ambient' | 'prithvi' | 'jal' | 'agni' | 'vayu' | 'akash';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className = '',
  density = 'medium',
  theme = 'ambient',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isReducedMotion) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Detect hardware limits
    const isMobile = window.innerWidth < 768;
    const concurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;

    const baseCountMap = {
      low: isMobile ? 10 : 20,
      medium: isMobile ? 18 : 36,
      high: isMobile ? 28 : concurrency >= 8 ? 55 : 40,
    };

    let particleCount = baseCountMap[density];

    // Color palettes tuned for environmental themes
    const colorMap: Record<string, [number, number, number]> = {
      ambient: [82, 163, 115], // Emerald green #52A373
      prithvi: [201, 123, 74], // Warm terracotta #C97B4A
      jal: [27, 107, 147],     // Hydrological azure #1B6B93
      agni: [217, 130, 43],    // Solar amber #D9822B
      vayu: [111, 168, 201],   // Atmospheric cyan #6FA8C9
      akash: [122, 108, 158],  // Ether violet #7A6C9E
    };
    const [r, g, b] = colorMap[theme] || colorMap.ambient;

    const particles: Particle[] = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Clamp DPR to max 2 for battery conservation
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-seed particles inside viewport
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1.2 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.15 - Math.random() * 0.3, // Gentle upward atmospheric drift
          alpha: Math.random() * 0.4,
          maxAlpha: 0.25 + Math.random() * 0.35,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Frame-rate monitoring to auto-throttle on low-tier mobile devices
    let lastTime = performance.now();
    let frameCount = 0;
    let dropFrameCount = 0;

    const render = (time: number) => {
      if (!isVisible) {
        return;
      }

      const dt = time - lastTime;
      lastTime = time;
      frameCount++;

      // If average frame time exceeds 26ms (< 38fps), drop particle count by 25%
      if (dt > 26) {
        dropFrameCount++;
        if (dropFrameCount > 6 && particles.length > 10) {
          particles.splice(0, Math.floor(particles.length * 0.25));
          dropFrameCount = 0;
        }
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentAlpha = p.maxAlpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        // Draw soft particle with radial gradient
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, currentAlpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause loop when scrolled off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting && document.visibilityState === 'visible';
        if (isVisible) {
          lastTime = performance.now();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause loop when browser tab is hidden
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        lastTime = performance.now();
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
    };
  }, [density, theme, isReducedMotion]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
