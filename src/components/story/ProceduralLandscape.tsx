import React from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ProceduralLandscapeProps {
  scrollY?: number;
  className?: string;
}

export const ProceduralLandscape: React.FC<ProceduralLandscapeProps> = ({
  className = '',
}) => {
  const isReduced = usePrefersReducedMotion();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic Sky Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A14] via-[#10291E] to-[#1A382B] dark:from-[#060D0A] dark:via-[#091510] dark:to-[#0D1F18] transition-colors duration-700" />

      {/* Atmospheric Solar / Lunar Celestial Orb */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-b from-amber-200/20 via-emerald-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-amber-100/30 via-emerald-200/15 to-transparent blur-xl pointer-events-none" />

      {/* Multi-layered Procedural SVG Mountain Ridges */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[65%] sm:h-[75%] object-cover preserve-3d"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Far Mountain Gradient */}
          <linearGradient id="farRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A5340" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#132B20" stopOpacity="0.8" />
          </linearGradient>

          {/* Mid Mountain Gradient */}
          <linearGradient id="midRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F4333" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0E2319" stopOpacity="0.95" />
          </linearGradient>

          {/* Foreground Foothills Gradient */}
          <linearGradient id="foreRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#143325" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#081810" stopOpacity="1" />
          </linearGradient>

          {/* Atmospheric Mist Gradient */}
          <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#40916C" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10241B" stopOpacity="0" />
          </linearGradient>

          {/* River / Hydrological Ribbon Gradient */}
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B6B93" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6FA8C9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1B6B93" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Layer 1: Far Alpine Ridges */}
        <path
          d="M0 280L90 230L210 270L340 180L480 250L600 190L740 260L890 170L1030 240L1170 195L1310 265L1440 210V600H0V280Z"
          fill="url(#farRidgeGrad)"
          className={!isReduced ? 'transition-transform duration-1000' : ''}
        />

        {/* Far Valley Mist */}
        <rect x="0" y="240" width="1440" height="120" fill="url(#mistGrad)" />

        {/* Layer 2: Mid-tier Forest Ridges */}
        <path
          d="M0 350L130 300L270 360L420 285L560 340L690 295L840 370L980 305L1120 365L1280 310L1440 375V600H0V350Z"
          fill="url(#midRidgeGrad)"
        />

        {/* Layer 3: Hydrological River Flowing Across the Valley */}
        <path
          d="M720 370 C 740 420, 680 460, 710 510 C 730 550, 790 570, 810 600 L 730 600 C 700 570, 660 540, 650 500 C 640 450, 690 410, 700 370 Z"
          fill="url(#riverGrad)"
          className="opacity-70"
        />

        {/* Layer 4: Foreground Organic Slopes */}
        <path
          d="M0 450L180 405L360 470L540 415L750 490L960 420L1180 480L1440 430V600H0V450Z"
          fill="url(#foreRidgeGrad)"
        />

        {/* Gentle Ambient Base Vignette */}
        <rect x="0" y="480" width="1440" height="120" fill="url(#mistGrad)" opacity="0.4" />
      </svg>

      {/* Subtle Bottom Ground Fade into following scene */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-paper dark:from-charcoal via-paper/60 dark:via-charcoal/60 to-transparent" />
    </div>
  );
};

