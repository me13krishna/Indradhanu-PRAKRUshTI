import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProceduralLandscape } from './ProceduralLandscape';
import { ParticleCanvas } from './ParticleCanvas';
import { ChevronDown } from 'lucide-react';

interface FilmScene01AwakeningProps {
  onScrollToNext?: () => void;
}

export const FilmScene01Awakening: React.FC<FilmScene01AwakeningProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('scene-2');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const words = isHi
    ? ['धरती', 'कुछ', 'कह', 'रही', 'है।']
    : ['The', 'Earth', 'is', 'speaking.'];

  return (
    <section
      id="scene-1"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 overflow-hidden select-none"
      aria-label="Scene 1: The Awakening"
    >
      {/* Living Dawn Landscape & Drifting Firefly Particles */}
      <ProceduralLandscape />
      <ParticleCanvas density="medium" theme="ambient" />

      {/* Atmospheric Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/15 to-black/60 pointer-events-none" />

      {/* Empty Top Balance Spacer */}
      <div className="h-4" />

      {/* Center Cinematic Typography Reveal */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto">
        
        {/* Word-by-Word Floating Headline */}
        <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl mb-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
          {words.map((word, idx) => (
            <span
              key={idx}
              className="inline-block animate-fadeIn"
              style={{ animationDelay: `${idx * 160}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Brand Resolution with Gold Light Sweep */}
        <div
          className="inline-block relative text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-200/90 py-1.5 px-4 rounded-full bg-white/5 border border-amber-400/30 backdrop-blur-md shadow-xl animate-fadeIn"
          style={{ animationDelay: '800ms' }}
        >
          <span className="relative z-10">PRAKRUshTI · 2026</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom Animated Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-4 text-white/60">
        <button
          onClick={handleScrollCue}
          className="touch-target p-2 rounded-full hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to next scene"
        >
          <ChevronDown className="w-6 h-6 text-emerald-400" />
        </button>
      </div>
    </section>
  );
};
