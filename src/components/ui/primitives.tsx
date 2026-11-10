import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export function useAnimatedValue(target: number, duration = 1.2, enabled = true): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced || !enabled ? target : 0);
  const fromRef = useRef(reduced || !enabled ? target : 0);

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const controls = animate(fromRef.current, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        fromRef.current = v;
        setValue(v);
      },
    });
    return () => controls.stop();
  }, [target, duration, enabled, reduced]);

  return value;
}

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 0,
  duration = 1.2,
  className,
  suffix = '',
  prefix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const display = useAnimatedValue(value, duration, inView);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 22, className, once = true }) => {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Spotlight: React.FC<SpotlightProps> = ({ children, className = '', onMouseMove, ...rest }) => {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    onMouseMove?.(e);
  };
  return (
    <div {...rest} onMouseMove={handleMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
);

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, subtitle, icon, right, id }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
    <div className="min-w-0">
      {eyebrow && (
        <div className="eyebrow flex items-center gap-2 mb-1.5">
          {icon}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 id={id} className="font-serif text-2xl sm:text-[1.7rem] font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
    {right && <div className="flex-shrink-0">{right}</div>}
  </div>
);

interface SegmentedProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: React.ReactNode }[];
  layoutId: string;
}

export function Segmented<T extends string>({ value, onChange, options, layoutId }: SegmentedProps<T>) {
  return (
    <div
      role="tablist"
      className="relative inline-flex p-1 rounded-xl bg-slate-900/5 dark:bg-white/8 border border-slate-900/5 dark:border-white/10"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative z-10 px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              active ? 'text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/40"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                style={{ zIndex: -1 }}
              />
            )}
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
