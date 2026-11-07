import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, CloudRain, Wind, Mountain, ChevronDown } from 'lucide-react';

interface FilmScene02CauseEffectProps {
  onScrollToNext?: () => void;
}

export const FilmScene02CauseEffect: React.FC<FilmScene02CauseEffectProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const [causalStep, setCausalStep] = useState<number>(2); // 0 to 4
  const isHi = language === 'hi';

  const chainNodes = [
    {
      id: 'emissions',
      num: '01',
      icon: Wind,
      labelEn: 'Emissions',
      labelHi: 'उत्सर्जन',
      color: '#E0A02D',
      desc: 'Smoke & particles rise into atmosphere',
    },
    {
      id: 'thermal',
      num: '02',
      icon: Flame,
      labelEn: 'Heat Rises',
      labelHi: 'तापमान वृद्धि',
      color: '#D9822B',
      desc: 'Radiative greenhouse forcing accelerates',
    },
    {
      id: 'glacier',
      num: '03',
      icon: Mountain,
      labelEn: 'Glaciers Melt',
      labelHi: 'हिमनद पिघलना',
      color: '#6FA8C9',
      desc: 'Cryosphere retreats, water systems alter',
    },
    {
      id: 'drought',
      num: '04',
      icon: Flame,
      labelEn: 'Soil Cracks',
      labelHi: 'मृदा शुष्कता',
      color: '#C97B4A',
      desc: 'Topsoil desiccation & moisture deficits',
    },
    {
      id: 'storm',
      num: '05',
      icon: CloudRain,
      labelEn: 'Flash Storms',
      labelHi: 'अतिवृष्टि',
      color: '#1B6B93',
      desc: 'Atmospheric capacity surges into floods',
    },
  ];

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('scene-3');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="scene-2"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#0C1713] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 2: Why It Happens"
    >
      {/* Morphing Atmospheric Canvas: Dynamic Amber Smog Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${
            causalStep === 0
              ? 'rgba(224, 160, 45, 0.15)'
              : causalStep === 1
              ? 'rgba(217, 130, 43, 0.22)'
              : causalStep === 2
              ? 'rgba(111, 168, 201, 0.18)'
              : causalStep === 3
              ? 'rgba(201, 123, 74, 0.22)'
              : 'rgba(27, 107, 147, 0.25)'
          } 0%, transparent 70%)`,
        }}
      />

      {/* Top Headline: 3 Words Only */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight">
          {isHi ? 'सब कुछ परस्पर जुड़ा है।' : 'Everything is connected.'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-sans mt-2">
          {isHi
            ? 'एक असंतुलन समस्त तत्वों को प्रभावित करता है।'
            : 'One disruption ripples across every element.'}
        </p>
      </div>

      {/* Centerpiece: The Animated Visual Causal Canvas */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6">
        
        {/* Procedural Visual SVG World Morphing by Causal Step */}
        <div className="relative w-full h-64 sm:h-80 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
          
          {/* Layer 1: Smokestacks & Factory Plumes */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Mountains */}
            <path
              d="M0 240L120 180L260 220L410 140L560 200L710 160L800 210V400H0V240Z"
              fill={causalStep >= 2 ? '#2A201A' : '#1A2A22'}
              className="transition-colors duration-700"
            />

            {/* Industrial Factory Silhouette & Rising Smoke Plumes */}
            <g className={`transition-opacity duration-500 ${causalStep >= 0 ? 'opacity-100' : 'opacity-30'}`}>
              <rect x="80" y="220" width="30" height="70" fill="#18181B" />
              <rect x="120" y="200" width="22" height="90" fill="#27272A" />
              <rect x="150" y="235" width="40" height="55" fill="#18181B" />
              {/* Animated Smoke Particles */}
              <circle cx="95" cy="190" r="14" fill="#E0A02D" fillOpacity="0.4" className="animate-pulse" />
              <circle cx="102" cy="160" r="22" fill="#E0A02D" fillOpacity="0.25" />
              <circle cx="131" cy="170" r="18" fill="#E0A02D" fillOpacity="0.35" />
              <circle cx="145" cy="135" r="28" fill="#E0A02D" fillOpacity="0.2" />
            </g>

            {/* River Flow: Shrinks from full azure ribbon to dried bed */}
            <path
              d={
                causalStep >= 3
                  ? 'M380 260 C 400 300, 395 340, 420 400 L 410 400 C 390 340, 395 300, 375 260 Z'
                  : 'M360 250 C 420 300, 380 340, 430 400 L 390 400 C 350 340, 390 300, 340 250 Z'
              }
              fill={causalStep >= 3 ? '#573E30' : '#1B6B93'}
              className="transition-all duration-700"
            />

            {/* Soil Fissures: Appear on Step 3 (Drought) */}
            {causalStep >= 3 && (
              <g stroke="#C97B4A" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                <path d="M520 310L540 330L535 350L555 375" />
                <path d="M540 330L565 335L575 355" />
                <path d="M620 325L635 345L625 365" />
              </g>
            )}

            {/* Storm Clouds: Unleash on Step 4 (Flash Floods) */}
            {causalStep === 4 && (
              <g className="animate-pulse">
                <ellipse cx="680" cy="110" rx="90" ry="40" fill="#1E293B" fillOpacity="0.85" />
                <path d="M640 150L630 190 M670 150L660 190 M700 150L690 190" stroke="#6FA8C9" strokeWidth="2.5" />
              </g>
            )}
          </svg>

          {/* Central Live Indicator: ONE Count-up Number with Sourced Tag */}
          <div className="relative z-10 text-center bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="font-serif font-bold text-4xl sm:text-5xl text-amber-400 tracking-tight">
              {causalStep === 0
                ? '424 ppm'
                : causalStep === 1
                ? '+1.45°C'
                : causalStep === 2
                ? '-38%'
                : causalStep === 3
                ? '40% θ'
                : '3.6B'}
            </div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-slate-400 mt-1 flex items-center justify-center space-x-1.5">
              <span>{chainNodes[causalStep].labelEn}</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">
                {causalStep === 0
                  ? '[NOAA]'
                  : causalStep === 1
                  ? '[WMO 2024]'
                  : causalStep === 2
                  ? '[NASA GRACE]'
                  : causalStep === 3
                  ? '[FAO-56]'
                  : '[IPCC AR6]'}
              </span>
            </div>
          </div>
        </div>

        {/* The 5-Node Interactive Causal Chain at Bottom */}
        <div className="mt-6 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {chainNodes.map((node, idx) => {
            const Icon = node.icon;
            const isCurrent = causalStep === idx;
            const isPassed = causalStep >= idx;

            return (
              <button
                key={node.id}
                onClick={() => setCausalStep(idx)}
                className={`touch-target flex-1 p-2 sm:p-3 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center ${
                  isCurrent
                    ? 'bg-white/15 border-white/40 shadow-lg scale-105 ring-2 ring-emerald-400/30'
                    : isPassed
                    ? 'bg-white/5 border-white/20 text-slate-200'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1.5 transition-colors"
                  style={{
                    backgroundColor: isPassed ? node.color : '#27272A',
                    color: isPassed ? '#FFFFFF' : '#71717A',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] opacity-75">{node.num}</span>
                <span className="font-serif text-xs font-semibold leading-tight whitespace-nowrap">
                  {isHi ? node.labelHi : node.labelEn}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-2 text-white/50">
        <button
          onClick={handleScrollCue}
          className="touch-target p-2 rounded-full hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to next scene"
        >
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        </button>
      </div>
    </section>
  );
};

