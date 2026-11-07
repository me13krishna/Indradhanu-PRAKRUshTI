import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Info,
  Droplets,
  Flame,
  Wind,
  Globe2,
  Sun,
  Activity,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface FilmScene03ElementsProps {
  onScrollToNext?: () => void;
}

export const FilmScene03Elements: React.FC<FilmScene03ElementsProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);
  const [showInfoTooltip, setShowInfoTooltip] = useState<boolean>(false);
  const [isUnified, setIsUnified] = useState<boolean>(false);

  const isHi = language === 'hi';

  const elements = [
    {
      id: 'prithvi',
      sanskrit: 'Prithvi',
      english: 'Earth',
      devanagari: 'पृथ्वी',
      color: '#C97B4A',
      secondaryColor: '#E8A376',
      icon: Globe2,
      signals: [
        { icon: Layers, label: 'Soil moisture proxy' },
        { icon: Activity, label: 'Seismic stability' },
      ],
    },
    {
      id: 'jal',
      sanskrit: 'Jal',
      english: 'Water',
      devanagari: 'जल',
      color: '#1B6B93',
      secondaryColor: '#4FA3CC',
      icon: Droplets,
      signals: [
        { icon: Droplets, label: 'Infiltration balance' },
        { icon: Sparkles, label: 'Atmospheric humidity' },
      ],
    },
    {
      id: 'agni',
      sanskrit: 'Agni',
      english: 'Fire',
      devanagari: 'अग्नि',
      color: '#D9822B',
      secondaryColor: '#F5AB61',
      icon: Flame,
      signals: [
        { icon: Flame, label: 'Thermal heat index' },
        { icon: Sun, label: 'Solar irradiance' },
      ],
    },
    {
      id: 'vayu',
      sanskrit: 'Vayu',
      english: 'Air',
      devanagari: 'वायु',
      color: '#6FA8C9',
      secondaryColor: '#A8D3EB',
      icon: Wind,
      signals: [
        { icon: Wind, label: 'Fine PM2.5 dispersion' },
        { icon: Activity, label: 'Ventilation velocity' },
      ],
    },
    {
      id: 'akash',
      sanskrit: 'Akash',
      english: 'Space',
      devanagari: 'आकाश',
      color: '#7A6C9E',
      secondaryColor: '#AE9FD1',
      icon: Sun,
      signals: [
        { icon: Sun, label: 'Solar UV radiation' },
        { icon: Layers, label: 'Barometric pressure' },
      ],
    },
  ];

  const current = elements[activeElementIndex];

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('scene-4');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="scene-3"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#08120E] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 3: The Five Elements"
    >
      {/* Dynamic Elemental Background Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-30 blur-3xl"
        style={{
          background: isUnified
            ? 'radial-gradient(circle at 50% 50%, #52A373 0%, #10241B 70%)'
            : `radial-gradient(circle at 50% 50%, ${current.color} 0%, transparent 65%)`,
        }}
      />

      {/* Header: Max 4 Words + Rule 6a ⓘ Icon */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <div className="inline-flex items-center space-x-2">
          <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight">
            {isHi ? 'पाँच तत्व। एक संतुलन।' : 'Five elements. One balance.'}
          </h2>

          {/* Rule 6a Tiny ⓘ Info Button */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowInfoTooltip(!showInfoTooltip)}
              className="touch-target p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Scientific disclosure"
            >
              <Info className="w-4 h-4 text-emerald-400" />
            </button>

            {showInfoTooltip && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 p-3 rounded-2xl bg-slate-950/95 border border-white/20 shadow-2xl text-center text-xs font-sans text-slate-200 z-50 animate-fadeIn">
                <p>
                  {isHi
                    ? 'एक व्याख्यात्मक दृष्टिकोण। वास्तविक माप स्कोर को शक्ति प्रदान करते हैं।'
                    : 'An interpretive lens. Real measurements power the score.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center Animated Stage: Pinned Element Canvas OR Unified Prakruti Ring */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto py-6">
        
        {/* The Animated Canvas Stage */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
          
          {!isUnified ? (
            /* Individual Element Animated World */
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              
              {/* Procedural Visual Animation Canvas */}
              <svg
                className="w-48 h-48 sm:w-60 sm:h-60"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Breathing Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke={current.color}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="animate-spin"
                  style={{ animationDuration: '30s' }}
                />

                {/* Inner Glow Sphere */}
                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  fill={current.color}
                  fillOpacity="0.15"
                />

                {/* Prithvi: Growing Roots & Seismic Ripple */}
                {current.id === 'prithvi' && (
                  <g stroke={current.color} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M100 65 L100 135" />
                    <path d="M100 95 L80 120" />
                    <path d="M100 105 L120 125" />
                    <path d="M80 120 L70 135" />
                    <path d="M120 125 L130 140" />
                    <circle cx="100" cy="100" r="45" stroke={current.secondaryColor} strokeWidth="1" strokeDasharray="3 3" className="animate-ping" style={{ animationDuration: '3s' }} />
                  </g>
                )}

                {/* Jal: Fluid Waves & Water-Cycle Loop */}
                {current.id === 'jal' && (
                  <g fill="none" stroke={current.color} strokeWidth="3" strokeLinecap="round">
                    <path d="M60 90 Q 80 80, 100 90 T 140 90" className="animate-pulse" />
                    <path d="M50 110 Q 75 100, 100 110 T 150 110" />
                    <path d="M65 130 Q 85 120, 100 130 T 135 130" />
                    <circle cx="100" cy="65" r="4" fill={current.secondaryColor} />
                    <circle cx="85" cy="55" r="3" fill={current.secondaryColor} />
                    <circle cx="115" cy="55" r="3" fill={current.secondaryColor} />
                  </g>
                )}

                {/* Agni: Radiant Thermal Embers & Sunbeams */}
                {current.id === 'agni' && (
                  <g fill={current.color}>
                    <path d="M100 45 C 80 75, 70 105, 80 130 C 90 145, 110 145, 120 130 C 130 105, 120 75, 100 45 Z" fillOpacity="0.8" />
                    <path d="M100 75 C 90 95, 85 110, 92 125 C 96 132, 104 132, 108 125 C 115 110, 110 95, 100 75 Z" fill="#FFE58F" />
                    <circle cx="80" cy="65" r="2.5" fill="#FFE58F" className="animate-ping" />
                    <circle cx="120" cy="75" r="2.5" fill="#FFE58F" className="animate-ping" style={{ animationDelay: '1s' }} />
                  </g>
                )}

                {/* Vayu: Streamlines & Particulate Dispersion */}
                {current.id === 'vayu' && (
                  <g stroke={current.color} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M55 80 C 80 80, 100 70, 125 70 C 140 70, 150 80, 140 90 C 130 95, 120 90, 125 80" />
                    <path d="M45 105 C 75 105, 105 115, 135 115 C 150 115, 160 105, 150 95 C 140 90, 130 95, 135 105" />
                    <circle cx="65" cy="95" r="2" fill={current.secondaryColor} />
                    <circle cx="95" cy="90" r="1.5" fill={current.secondaryColor} />
                    <circle cx="115" cy="110" r="2" fill={current.secondaryColor} />
                  </g>
                )}

                {/* Akash: Starfield & UV Stratospheric Arc */}
                {current.id === 'akash' && (
                  <g fill="none">
                    <path d="M50 130 A 70 70 0 0 1 150 130" stroke={current.color} strokeWidth="3" />
                    <path d="M65 140 A 50 50 0 0 1 135 140" stroke={current.secondaryColor} strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="100" cy="85" r="10" fill="#FFE58F" />
                    <circle cx="65" cy="70" r="1.5" fill="#FFFFFF" />
                    <circle cx="135" cy="65" r="2" fill="#FFFFFF" />
                    <circle cx="145" cy="95" r="1.5" fill="#FFFFFF" />
                    <circle cx="55" cy="100" r="2" fill="#FFFFFF" />
                  </g>
                )}
              </svg>

              {/* Element Label: Sanskrit + English only, NO descriptions */}
              <div className="mt-3 text-center">
                <div className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  {current.sanskrit} · {current.english}
                </div>
                <div className="font-devanagari text-sm font-semibold opacity-75 mt-0.5">
                  ({current.devanagari})
                </div>
              </div>

              {/* Pulsing Live Signals Cluster */}
              <div className="mt-4 flex items-center space-x-3">
                {current.signals.map((sig, sIdx) => {
                  const SigIcon = sig.icon;
                  return (
                    <div
                      key={sIdx}
                      className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      <SigIcon className="w-3.5 h-3.5" style={{ color: current.color }} />
                      <span className="text-[11px]">{sig.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            /* The Converged Prakruti Gauge Ring */
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-fadeIn">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                
                {/* 5 Concentric & Spiraling Rings */}
                {elements.map((el, idx) => (
                  <div
                    key={el.id}
                    className="absolute inset-0 rounded-full border-2 animate-spin"
                    style={{
                      borderColor: el.color,
                      padding: `${idx * 10}px`,
                      animationDuration: `${12 + idx * 4}s`,
                      opacity: 0.85,
                    }}
                  />
                ))}

                {/* Central Score Display */}
                <div className="relative z-10 text-center bg-black/70 backdrop-blur-md w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-2xl">
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-emerald-400">
                    74
                  </span>
                  <span className="font-mono text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">
                    Prakruti
                  </span>
                </div>
              </div>

              <div className="mt-4 font-serif text-lg font-bold text-emerald-300 tracking-tight">
                {isHi ? 'एकीकृत प्रकृति संतुलन' : 'Unified Planetary Balance'}
              </div>
            </div>
          )}

        </div>

        {/* 5-Element Dial Selector + Spiral Convergence Toggle */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {elements.map((el, idx) => {
            const isSelected = !isUnified && activeElementIndex === idx;
            const Icon = el.icon;

            return (
              <button
                key={el.id}
                onClick={() => {
                  setIsUnified(false);
                  setActiveElementIndex(idx);
                }}
                className={`touch-target px-3.5 py-2 rounded-2xl border text-xs font-semibold flex items-center space-x-2 transition-all duration-200 ${
                  isSelected
                    ? 'text-white shadow-lg scale-105 border-transparent ring-2 ring-white/30'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                style={isSelected ? { backgroundColor: el.color } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{el.sanskrit}</span>
              </button>
            );
          })}

          {/* Unite Elements Convergence Button */}
          <button
            onClick={() => setIsUnified(!isUnified)}
            className={`touch-target px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 ${
              isUnified
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUnified ? (isHi ? 'अलग तत्व देखें' : 'Inspect Elements') : (isHi ? 'तत्वों का संगम' : 'Unite Into One')}</span>
          </button>
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
