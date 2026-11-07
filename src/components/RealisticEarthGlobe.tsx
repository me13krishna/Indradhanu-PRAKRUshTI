import React from 'react';

interface RealisticEarthGlobeProps {
  size: number;
  animate?: boolean;
  className?: string;
}

export const RealisticEarthGlobe: React.FC<RealisticEarthGlobeProps> = ({
  size,
  animate = true,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow:
          '0 0 16px rgba(56, 189, 248, 0.45), 0 0 30px rgba(34, 197, 94, 0.25), inset 0 0 10px rgba(0, 0, 0, 0.75)',
      }}
      title="Prithvi — 3D Rotating Planet Earth"
    >
      {/* 3D Rotating Earth Sphere (Seamless horizontal rotation) */}
      <img
        src={animate ? '/earth-rotating.gif' : '/earth-realistic.jpg'}
        alt="Prithvi — 3D Rotating Planet Earth"
        className="w-full h-full object-cover scale-[1.28] rounded-full pointer-events-none"
        style={{
          filter: 'contrast(1.1) brightness(1.05)',
        }}
        loading="eager"
      />

      {/* Atmospheric Luminous Blue Ozone Ring Overlay (Spherical horizon glow) */}
      <div className="absolute inset-0 rounded-full border border-sky-400/50 pointer-events-none z-20 shadow-[inset_0_0_10px_rgba(56,189,248,0.55)]" />

      {/* 3D Glass Specular Flare Crescent on Top-Left */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none z-30"
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.05) 35%, transparent 65%)',
        }}
      />
    </div>
  );
};
