import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SignalStreamCanvasProps {
  phase: number;
}

interface Dot {
  lane: number;
  u: number;
  speed: number;
  noise: boolean;
  color: string;
  jitter: number;
  dead: number;
  fx: number;
  fy: number;
}

const COLORS = ['#C97B4A', '#1B6B93', '#D9822B', '#6FA8C9', '#7A6C9E'];
const LANES = [0.25, 0.4, 0.6, 0.75];
const GATE = 0.36;
const ease = (x: number) => x * x * (3 - 2 * x);

export const SignalStreamCanvas: React.FC<SignalStreamCanvasProps> = ({ phase }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dots: Dot[] = [];
    let raf = 0;
    let W = 0;
    let H = 0;
    let spawn = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const pos = (d: Dot) => {
      const x = W * (0.04 + d.u * 0.46);
      const y0 = H * LANES[d.lane];
      const y = y0 + (H / 2 - y0) * ease(Math.min(1, d.u * 1.15)) + (d.noise ? Math.sin(d.u * 40 + d.jitter) * 9 : 0);
      return { x, y };
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const ph = phaseRef.current;

      spawn += 1;
      if (spawn % 5 === 0 && dots.length < 90) {
        const noise = Math.random() < 0.5;
        dots.push({
          lane: Math.floor(Math.random() * LANES.length),
          u: 0,
          speed: 0.0042 + Math.random() * 0.003,
          noise,
          color: noise ? '#9aa5a0' : COLORS[Math.floor(Math.random() * COLORS.length)],
          jitter: Math.random() * 6,
          dead: 0,
          fx: 0,
          fy: 0,
        });
      }

      const gx = W * (0.04 + GATE * 0.46);
      if (ph >= 1) {
        const g = ctx.createLinearGradient(gx - 24, 0, gx + 24, 0);
        g.addColorStop(0, 'rgba(64,145,108,0)');
        g.addColorStop(0.5, 'rgba(64,145,108,0.35)');
        g.addColorStop(1, 'rgba(64,145,108,0)');
        ctx.fillStyle = g;
        ctx.fillRect(gx - 24, H * 0.12, 48, H * 0.76);
      }
      ctx.strokeStyle = 'rgba(64,145,108,0.5)';
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(gx, H * 0.12);
      ctx.lineTo(gx, H * 0.88);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        if (d.dead > 0) {
          d.dead -= 0.05;
          if (d.dead <= 0) {
            dots.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(d.fx, d.fy, (1 - d.dead) * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(154,165,160,${d.dead})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          continue;
        }
        d.u += d.speed;
        if (d.u >= 1) {
          dots.splice(i, 1);
          continue;
        }
        const p = pos(d);
        if (ph >= 1 && d.noise && d.u >= GATE) {
          d.dead = 1;
          d.fx = p.x;
          d.fy = p.y;
          continue;
        }
        const clean = ph >= 1 && d.u > GATE;
        ctx.beginPath();
        ctx.arc(p.x, p.y, d.noise ? 2.2 : clean ? 3.4 : 2.8, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.noise ? 0.55 : 0.95;
        ctx.shadowColor = d.noise ? 'transparent' : d.color;
        ctx.shadowBlur = d.noise ? 0 : clean ? 6 : 0;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
};
