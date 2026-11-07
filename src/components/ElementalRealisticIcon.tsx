import React from 'react';
import type { MahabhutaElementKey } from '../types/prakrushti';
import { RealisticEarthGlobe } from './RealisticEarthGlobe';

interface ElementalRealisticIconProps {
  elementKey: MahabhutaElementKey;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  sm: {
    container: 'w-9 h-9',
    svg: 36,
  },
  md: {
    container: 'w-11 h-11',
    svg: 44,
  },
  lg: {
    container: 'w-14 h-14',
    svg: 56,
  },
  xl: {
    container: 'w-20 h-20',
    svg: 80,
  },
  '2xl': {
    container: 'w-28 h-28',
    svg: 112,
  },
};

export const ElementalRealisticIcon: React.FC<ElementalRealisticIconProps> = ({
  elementKey,
  size = 'md',
  className = '',
  animate = true,
}) => {
  const { container, svg } = sizeMap[size];

  switch (elementKey) {
    case 'prithvi':
      return (
        <RealisticEarthGlobe
          size={svg}
          animate={animate}
          className={className}
        />
      );

    case 'jal':
      return (
        <div
          className={`relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 select-none ${container} ${className}`}
          style={{
            boxShadow:
              '0 0 20px rgba(14, 165, 233, 0.45), 0 0 35px rgba(2, 132, 199, 0.25), inset 0 0 10px rgba(3, 105, 161, 0.8)',
          }}
          title="Jal — Realistic Liquid Water Droplet & Wave Surge"
        >
          {/* Liquid Glass Border Rim */}
          <div className="absolute inset-0 rounded-full border border-cyan-300/60 pointer-events-none z-30" />

          <svg
            width={svg}
            height={svg}
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            <defs>
              {/* Deep Water Radial Gradient */}
              <radialGradient id="jalDeepWater" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="30%" stopColor="#0284C7" />
                <stop offset="70%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#082F49" />
              </radialGradient>

              {/* Water Caustics Shimmer */}
              <linearGradient id="jalWaveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="jalWaveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
              </linearGradient>

              {/* Glass Specular Shine */}
              <linearGradient id="jalGlassShine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base Water Orb */}
            <circle cx="50" cy="50" r="48" fill="url(#jalDeepWater)" />

            {/* Expanding Concentric Ripple Rings */}
            {animate && (
              <g style={{ transformOrigin: '50px 50px' }}>
                <circle
                  cx="50"
                  cy="50"
                  r="24"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2"
                  className="animate-jal-ripple"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="none"
                  stroke="rgba(125, 211, 252, 0.35)"
                  strokeWidth="1.5"
                  className="animate-jal-ripple"
                  style={{ animationDelay: '1.2s' }}
                />
              </g>
            )}

            {/* Primary Fluid Wave Surge */}
            <g className={animate ? 'animate-jal-wave' : ''}>
              <path
                d="M4,55 Q24,42 48,53 T96,52 L96,96 L4,96 Z"
                fill="url(#jalWaveGradient1)"
              />
              {/* Secondary Deeper Liquid Surge */}
              <path
                d="M4,62 Q28,52 52,61 T96,60 L96,96 L4,96 Z"
                fill="url(#jalWaveGradient2)"
                opacity="0.85"
              />
              {/* Foam Crest Highlight */}
              <path
                d="M4,55 Q24,42 48,53 T96,52"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            {/* Rising Aeration Micro-Bubbles */}
            {animate && (
              <g>
                <circle
                  cx="36"
                  cy="68"
                  r="3"
                  fill="#ffffff"
                  className="animate-jal-bubble"
                />
                <circle
                  cx="58"
                  cy="74"
                  r="2.2"
                  fill="#E0F2FE"
                  className="animate-jal-bubble"
                  style={{ animationDelay: '0.9s' }}
                />
                <circle
                  cx="48"
                  cy="80"
                  r="1.8"
                  fill="#ffffff"
                  className="animate-jal-bubble"
                  style={{ animationDelay: '1.7s' }}
                />
              </g>
            )}

            {/* Liquid Meniscus Highlight / Top Glass Dome */}
            <path
              d="M18,22 Q50,6 82,22 Q50,14 18,22 Z"
              fill="url(#jalGlassShine)"
            />
            {/* Primary Specular Light Glint */}
            <ellipse
              cx="32"
              cy="24"
              rx="12"
              ry="6"
              fill="#ffffff"
              opacity="0.75"
              transform="rotate(-25 32 24)"
            />
          </svg>
        </div>
      );

    case 'agni':
      return (
        <div
          className={`relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 select-none ${container} ${className}`}
          style={{
            boxShadow:
              '0 0 22px rgba(249, 115, 22, 0.55), 0 0 40px rgba(239, 68, 68, 0.35), inset 0 0 12px rgba(154, 52, 18, 0.9)',
          }}
          title="Agni — Realistic Roaring Solar Thermal Flame & Embers"
        >
          {/* Radiant Thermal Corona Rim */}
          <div className="absolute inset-0 rounded-full border border-amber-300/50 pointer-events-none z-30 animate-pulse-slow" />

          <svg
            width={svg}
            height={svg}
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            <defs>
              {/* Deep Fire Hearth Gradient */}
              <radialGradient id="agniHearth" cx="50%" cy="75%" r="75%">
                <stop offset="0%" stopColor="#7C2D12" />
                <stop offset="45%" stopColor="#450A0A" />
                <stop offset="85%" stopColor="#1C0505" />
                <stop offset="100%" stopColor="#090101" />
              </radialGradient>

              {/* Roaring Outer Flame */}
              <linearGradient id="agniOuterFlame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="40%" stopColor="#EA580C" />
                <stop offset="75%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              {/* Golden Middle Thermal Tongue */}
              <linearGradient id="agniMidFlame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="45%" stopColor="#F59E0B" />
                <stop offset="85%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>

              {/* Incandescent White-Hot Inner Core */}
              <linearGradient id="agniWhiteCore" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              {/* Glowing Ember Filter */}
              <filter id="emberGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Base Dark Thermal Crucible */}
            <circle cx="50" cy="50" r="48" fill="url(#agniHearth)" />

            {/* Ambient Heat Radiation Glow */}
            <circle
              cx="50"
              cy="58"
              r="34"
              fill="rgba(249, 115, 22, 0.4)"
              filter="blur(6px)"
              className="animate-pulse-slow"
            />

            {/* Outer Dancing Flame Body */}
            <g
              className={animate ? 'animate-agni-flame' : ''}
              style={{ transformOrigin: '50px 85px' }}
            >
              <path
                d="M50,14 Q66,32 68,52 Q70,72 50,86 Q30,72 32,52 Q34,32 50,14 Z"
                fill="url(#agniOuterFlame)"
                opacity="0.95"
              />
              {/* Secondary Flame Tongue (Left) */}
              <path
                d="M44,28 Q30,42 34,64 Q42,56 46,44 Z"
                fill="#F97316"
                opacity="0.85"
              />
              {/* Secondary Flame Tongue (Right) */}
              <path
                d="M56,26 Q70,40 66,62 Q58,54 54,42 Z"
                fill="#FB923C"
                opacity="0.85"
              />
            </g>

            {/* Middle Bright Thermal Flame */}
            <g
              className={animate ? 'animate-agni-flame' : ''}
              style={{
                transformOrigin: '50px 85px',
                animationDelay: '0.25s',
              }}
            >
              <path
                d="M50,26 Q60,40 60,58 Q60,76 50,84 Q40,76 40,58 Q40,40 50,26 Z"
                fill="url(#agniMidFlame)"
              />
            </g>

            {/* Incandescent White-Hot Core with Blue Combustion Base */}
            <g
              className={animate ? 'animate-agni-core' : ''}
              style={{ transformOrigin: '50px 82px' }}
            >
              <path
                d="M50,42 Q56,54 55,68 Q54,82 50,84 Q46,82 45,68 Q44,54 50,42 Z"
                fill="url(#agniWhiteCore)"
              />
              {/* Blue Base of Fire (Highest Temperature) */}
              <ellipse cx="50" cy="80" rx="9" ry="4" fill="#3B82F6" opacity="0.8" />
            </g>

            {/* Rising Sparks and Embers */}
            {animate && (
              <g filter="url(#emberGlow)">
                <circle
                  cx="44"
                  cy="32"
                  r="2.2"
                  fill="#FDE047"
                  className="animate-agni-ember"
                />
                <circle
                  cx="56"
                  cy="24"
                  r="1.8"
                  fill="#F97316"
                  className="animate-agni-ember"
                  style={{ animationDelay: '0.7s' }}
                />
                <circle
                  cx="50"
                  cy="16"
                  r="1.5"
                  fill="#FFFFFF"
                  className="animate-agni-ember"
                  style={{ animationDelay: '1.3s' }}
                />
                <circle
                  cx="38"
                  cy="46"
                  r="1.2"
                  fill="#FEF08A"
                  className="animate-agni-ember"
                  style={{ animationDelay: '0.4s' }}
                />
              </g>
            )}
          </svg>
        </div>
      );

    case 'vayu':
      return (
        <div
          className={`relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 select-none ${container} ${className}`}
          style={{
            boxShadow:
              '0 0 20px rgba(56, 189, 248, 0.45), 0 0 35px rgba(148, 163, 184, 0.3), inset 0 0 10px rgba(15, 23, 42, 0.75)',
          }}
          title="Vayu — Realistic Atmospheric Swirling Cyclone & Wind Gale"
        >
          {/* Aero Boundary Rim */}
          <div className="absolute inset-0 rounded-full border border-sky-300/50 pointer-events-none z-30" />

          <svg
            width={svg}
            height={svg}
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            <defs>
              {/* Tropospheric Atmosphere Base */}
              <radialGradient id="vayuSkyBase" cx="45%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="45%" stopColor="#0369A1" />
                <stop offset="80%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>

              {/* Dynamic Streamline Gradient */}
              <linearGradient id="vayuWindStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="30%" stopColor="#BAE6FD" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>

              {/* Aerodynamic Silver Flow */}
              <linearGradient id="vayuSilverFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0F9FF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Base Sky Sphere */}
            <circle cx="50" cy="50" r="48" fill="url(#vayuSkyBase)" />

            {/* Central Rotating Atmospheric Cyclone Vortex */}
            <g
              className={animate ? 'animate-vayu-vortex' : ''}
              style={{ transformOrigin: '50px 50px' }}
            >
              {/* Cyclone Spiral Arm 1 */}
              <path
                d="M50,50 Q65,30 84,38 Q78,54 62,56 Q52,57 50,50 Z"
                fill="url(#vayuSilverFlow)"
                opacity="0.8"
              />
              {/* Cyclone Spiral Arm 2 */}
              <path
                d="M50,50 Q35,70 16,62 Q22,46 38,44 Q48,43 50,50 Z"
                fill="url(#vayuSilverFlow)"
                opacity="0.8"
              />
              {/* Eye of the Storm (Low Pressure Calm Center) */}
              <circle cx="50" cy="50" r="6" fill="#0284C7" />
              <circle cx="50" cy="50" r="3" fill="#BAE6FD" opacity="0.9" />
            </g>

            {/* Rapid Horizontal Gale Wind Streams */}
            <g className={animate ? 'animate-vayu-wind' : ''}>
              <path
                d="M8,32 Q32,24 64,30 T94,26"
                fill="none"
                stroke="url(#vayuWindStreamGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M4,52 Q28,42 56,52 T96,48"
                fill="none"
                stroke="url(#vayuWindStreamGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ animationDelay: '0.4s' }}
              />
              <path
                d="M12,70 Q40,64 68,72 T92,68"
                fill="none"
                stroke="url(#vayuWindStreamGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                style={{ animationDelay: '0.8s' }}
              />
            </g>

            {/* Flowing Air Mist Droplets & Streaks */}
            <g opacity="0.75">
              <ellipse cx="28" cy="46" rx="5" ry="1.5" fill="#FFFFFF" opacity="0.8" />
              <ellipse cx="72" cy="58" rx="6" ry="1.8" fill="#E0F2FE" opacity="0.85" />
              <ellipse cx="60" cy="28" rx="4" ry="1.2" fill="#BAE6FD" opacity="0.9" />
            </g>

            {/* Specular Aerodynamic Surface Reflection */}
            <ellipse
              cx="36"
              cy="22"
              rx="18"
              ry="7"
              fill="rgba(255, 255, 255, 0.45)"
              filter="blur(2px)"
              transform="rotate(-20 36 22)"
            />
          </svg>
        </div>
      );

    case 'akash':
      return (
        <div
          className={`relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 select-none ${container} ${className}`}
          style={{
            boxShadow:
              '0 0 22px rgba(168, 85, 247, 0.5), 0 0 40px rgba(99, 102, 241, 0.35), inset 0 0 12px rgba(46, 16, 101, 0.9)',
          }}
          title="Akash — Realistic Cosmic Celestial Void, Rings & Nebula"
        >
          {/* Celestial Ether Corona Rim */}
          <div className="absolute inset-0 rounded-full border border-purple-400/50 pointer-events-none z-30 animate-pulse-slow" />

          <svg
            width={svg}
            height={svg}
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            <defs>
              {/* Deep Cosmic Void Gradient */}
              <radialGradient id="akashSpaceVoid" cx="45%" cy="35%" r="75%">
                <stop offset="0%" stopColor="#3B0764" />
                <stop offset="35%" stopColor="#1E1B4B" />
                <stop offset="70%" stopColor="#090514" />
                <stop offset="100%" stopColor="#020005" />
              </radialGradient>

              {/* Glowing Nebula Dust Gradient */}
              <radialGradient id="akashNebulaGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#818CF8" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#4C1D95" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Saturn Celestial Ring Gradient */}
              <linearGradient id="akashRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#A855F7" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#6366F1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
              </linearGradient>

              {/* Star Glow Filter */}
              <filter id="starTwinkle" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Deep Cosmic Space Orb */}
            <circle cx="50" cy="50" r="48" fill="url(#akashSpaceVoid)" />

            {/* Central Luminous Galactic Core / Nebula Pulse */}
            <circle
              cx="50"
              cy="50"
              r="26"
              fill="url(#akashNebulaGrad)"
              className={animate ? 'animate-akash-nebula' : ''}
              style={{ transformOrigin: '50px 50px' }}
            />

            {/* Celestial Planetary Orbiting Rings (Saturn Angle) */}
            <g
              className={animate ? 'animate-akash-ring' : ''}
              style={{ transformOrigin: '50px 50px' }}
            >
              <ellipse
                cx="50"
                cy="50"
                rx="44"
                ry="14"
                fill="none"
                stroke="url(#akashRingGrad)"
                strokeWidth="3"
                transform="rotate(-25 50 50)"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="38"
                ry="10"
                fill="none"
                stroke="rgba(243, 232, 255, 0.6)"
                strokeWidth="1.2"
                transform="rotate(-25 50 50)"
              />
            </g>

            {/* Twinkling Cosmic Stars & Pulsars */}
            <g filter="url(#starTwinkle)">
              {/* Star 1 (Top Right) */}
              <circle
                cx="74"
                cy="26"
                r="2.4"
                fill="#FFFFFF"
                className={animate ? 'animate-akash-star' : ''}
              />
              {/* Star 2 (Bottom Left) */}
              <circle
                cx="26"
                cy="72"
                r="2"
                fill="#F3E8FF"
                className={animate ? 'animate-akash-star' : ''}
                style={{ animationDelay: '0.8s' }}
              />
              {/* Star 3 (Top Left) */}
              <circle
                cx="28"
                cy="32"
                r="1.6"
                fill="#E0E7FF"
                className={animate ? 'animate-akash-star' : ''}
                style={{ animationDelay: '1.4s' }}
              />
              {/* Star 4 (Bottom Right) */}
              <circle
                cx="72"
                cy="74"
                r="1.4"
                fill="#DDD6FE"
                className={animate ? 'animate-akash-star' : ''}
                style={{ animationDelay: '0.5s' }}
              />
            </g>

            {/* Supernova 4-Point Star Burst in Galactic Core */}
            <g
              className={animate ? 'animate-akash-star' : ''}
              style={{ transformOrigin: '50px 50px', animationDelay: '0.3s' }}
            >
              <path
                d="M50,42 L52,48 L58,50 L52,52 L50,58 L48,52 L42,50 L48,48 Z"
                fill="#FFFFFF"
              />
              <circle cx="50" cy="50" r="3.5" fill="#FDF4FF" />
            </g>

            {/* Specular Galactic Dome Highlight */}
            <ellipse
              cx="32"
              cy="24"
              rx="14"
              ry="7"
              fill="rgba(255, 255, 255, 0.35)"
              filter="blur(2px)"
              transform="rotate(-25 32 24)"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
