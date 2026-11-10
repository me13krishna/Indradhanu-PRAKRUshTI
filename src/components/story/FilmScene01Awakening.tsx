import React, { useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProceduralLandscape } from './ProceduralLandscape';
import { ParticleCanvas } from './ParticleCanvas';
import { SceneHint } from './SceneHint';
import { useScenePointer } from './useScenePointer';
import { ChevronDown } from 'lucide-react';

interface FilmScene01AwakeningProps {
  onScrollToNext?: () => void;
}

export const FilmScene01Awakening: React.FC<FilmScene01AwakeningProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const sectionRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const [pulses, setPulses] = useState(0);

  useScenePointer(parallaxRef);

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      document.getElementById('scene-2')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const words = isHi
    ? ['धरती', 'कुछ', 'कह', 'रही', 'है।']
    : ['The', 'Earth', 'is', 'speaking.'];

  return (
    <section
      ref={sectionRef}
      id="scene-1"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 overflow-hidden select-none"
      aria-label="Scene 1: The Awakening"
    >
      <div ref={parallaxRef} className="absolute inset-0">
        <ProceduralLandscape pulseKey={pulses} />
      </div>
      <ParticleCanvas density="medium" theme="ambient" interactive onPulse={() => setPulses((n) => n + 1)} />

      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/15 to-black/60 pointer-events-none" />

      <div className="h-4" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto">
        <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl mb-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
          {words.map((word, idx) => (
            <span
              key={idx}
              className="inline-block animate-fadeIn cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:text-emerald-200 hover:[text-shadow:0_0_28px_rgba(110,231,183,0.7)]"
              style={{ animationDelay: `${idx * 160}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <div
          className="inline-block relative text-xs sm:text-sm font-mono tracking-widest uppercase text-amber-200/90 py-1.5 px-4 rounded-full bg-white/5 border border-amber-400/30 backdrop-blur-md shadow-xl animate-fadeIn"
          style={{ animationDelay: '800ms' }}
        >
          <span className="relative z-10">PRAKRUshTI · 2026</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent animate-pulse" />
        </div>

        <div className="mt-6 min-h-8">
          <SceneHint
            show={pulses === 0}
            text={isHi ? 'कर्सर हिलाएँ, पृथ्वी को जगाने के लिए टैप करें' : 'Move your cursor. Tap to wake the Earth.'}
          />
          {pulses > 0 && (
            <p key={pulses} className="text-xs sm:text-sm font-mono text-emerald-200/80 animate-fadeIn">
              {isHi ? `${pulses} तरंग भेजी, धरती सुन रही है` : `${pulses} pulse${pulses === 1 ? '' : 's'} sent. The Earth is listening.`}
            </p>
          )}
        </div>
      </div>

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
