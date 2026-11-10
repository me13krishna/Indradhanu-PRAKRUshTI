import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { MahabhutaElementKey } from '../../types/prakrushti';
import { motion } from 'motion/react';
import { ElementalRealisticIcon } from '../ElementalRealisticIcon';
import { ParticleCanvas } from './ParticleCanvas';
import { SceneHint, SceneEyebrow } from './SceneHint';
import { AnimatedNumber } from '../ui/primitives';
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
  const [explored, setExplored] = useState<Set<number>>(new Set([0]));

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
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-30"
        style={{
          background: isUnified
            ? 'radial-gradient(circle at 50% 50%, #52A373 0%, #10241B 70%)'
            : `radial-gradient(circle at 50% 50%, ${current.color} 0%, transparent 65%)`,
        }}
      />

      {/* Header: Max 4 Words + Rule 6a ⓘ Icon */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <SceneEyebrow n="03" label={isHi ? 'पाँच तत्व' : 'The Five Elements'} />
        <div className="inline-flex items-center space-x-2">
          <h2 className="text-fluid-title font-serif font-bold story-title tracking-tight leading-tight">
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
        <div className="story-stage relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden flex items-center justify-center p-6">
          
          <ParticleCanvas
            key={isUnified ? 'unified' : current.id}
            theme={isUnified ? 'ambient' : (current.id as MahabhutaElementKey)}
            density="medium"
            interactive
          />

          {!isUnified ? (
            /* Individual Element Animated World */
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              
              {/* Realistic Animated Photorealistic Elemental Centerpiece */}
              <motion.div
                key={current.id}
                initial={{ scale: 0.55, opacity: 0, rotate: -14 }}
                animate={{ scale: 1.15, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                whileHover={{ scale: 1.3, rotate: 4 }}
                className="relative flex flex-col items-center justify-center my-auto cursor-pointer"
              >
                <ElementalRealisticIcon elementKey={current.id as MahabhutaElementKey} size="2xl" />
              </motion.div>

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
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {elements.map((el, idx) => {
                  const a = ((-90 + idx * 72) * Math.PI) / 180;
                  return (
                    <motion.span
                      key={`orb-${el.id}`}
                      className="absolute left-1/2 top-1/2 -ml-3.5 -mt-3.5 w-7 h-7 rounded-full"
                      style={{ background: el.color, boxShadow: `0 0 28px 6px ${el.color}aa` }}
                      initial={{ x: Math.cos(a) * 190, y: Math.sin(a) * 150, opacity: 1, scale: 1.3 }}
                      animate={{ x: 0, y: 0, opacity: [1, 1, 0], scale: [1.3, 1, 0.3] }}
                      transition={{ duration: 1.15, delay: idx * 0.1, ease: [0.6, 0, 0.25, 1], times: [0, 0.7, 1] }}
                    />
                  );
                })}
                {elements.map((el, idx) => (
                  <motion.div
                    key={el.id}
                    className="absolute rounded-full"
                    style={{ inset: idx * 12 }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 0.95, scale: 1 }}
                    transition={{ delay: 0.9 + idx * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
                  >
                    <div
                      className="w-full h-full rounded-full border-[3px] border-dashed animate-spin"
                      style={{ borderColor: el.color, animationDuration: `${10 + idx * 4}s`, animationDirection: idx % 2 ? 'reverse' : 'normal', boxShadow: `0 0 14px ${el.color}55` }}
                    />
                  </motion.div>
                ))}
                <motion.div
                  className="relative z-10 text-center bg-black/70 backdrop-blur-md w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 14 }}
                >
                  <AnimatedNumber value={74} duration={1.6} className="font-serif font-bold text-3xl sm:text-4xl text-emerald-400" />
                  <span className="font-mono text-[10px] text-slate-300 uppercase tracking-wider mt-0.5">Prakruti</span>
                </motion.div>
              </div>
              <div className="mt-4 font-serif text-lg font-bold text-emerald-300 tracking-tight">
                {isHi ? 'एकीकृत प्रकृति संतुलन' : 'Unified Planetary Balance'}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">{isHi ? 'उदाहरण स्कोर' : 'Illustrative score'}</div>
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
                  setExplored((prev) => new Set(prev).add(idx));
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

        <div className="mt-4 text-center min-h-8">
          <SceneHint
            show={!isUnified}
            text={
              explored.size === 5
                ? isHi ? 'सब देख लिए, अब “तत्वों का संगम” दबाएँ' : 'All five explored. Now press Unite Into One.'
                : isHi ? `हर तत्व को छुएँ (${explored.size}/5)` : `Tap each element (${explored.size}/5).`
            }
          />
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

