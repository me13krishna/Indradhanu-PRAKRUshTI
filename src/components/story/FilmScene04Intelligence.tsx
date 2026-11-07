import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Filter,
  Layers,
  Compass,
} from 'lucide-react';

interface FilmScene04IntelligenceProps {
  onScrollToNext?: () => void;
}

export const FilmScene04Intelligence: React.FC<FilmScene04IntelligenceProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const [pipelinePhase, setPipelinePhase] = useState<number>(2); // 0: Sense, 1: Clean, 2: Score, 3: Guide
  const isHi = language === 'hi';

  const phases = [
    { num: '01', wordEn: 'Sense', wordHi: 'संवेदन', icon: Layers },
    { num: '02', wordEn: 'Clean', wordHi: 'शोधन', icon: Filter },
    { num: '03', wordEn: 'Score', wordHi: 'मूल्यांकन', icon: Sparkles },
    { num: '04', wordEn: 'Guide', wordHi: 'मार्गदर्शन', icon: Compass },
  ];

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('scene-5');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="scene-4"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#050C09] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 4: The Intelligence Engine"
    >
      {/* Background Refined Tech Grid & Ambient Cyan/Teal Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Headline: Max 4 Words + Caption: 4 Words */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight">
          {isHi ? 'सटीक संकेत। स्पष्ट बुद्धिमत्ता।' : 'Raw signals. Clear intelligence.'}
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-400/90 mt-2">
          {isHi ? 'संवेदन · शोधन · मूल्यांकन · मार्गदर्शन' : 'Sense · Clean · Score · Guide'}
        </p>
      </div>

      {/* Centerpiece: The Transparent Glass Core & Particle Stream Stage */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto py-6">
        
        {/* Transparent Core Chamber */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl bg-black/50 border border-teal-500/20 backdrop-blur-2xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
          
          {/* Animated Ambient Light Trails & Signal Streams */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Raw Incoming Signal Streams (Left to Center) */}
            <g strokeWidth="2" strokeDasharray="6 8" className="animate-pulse">
              <path d="M40 80 C 140 80, 200 130, 300 150" stroke="#1B6B93" strokeOpacity="0.7" />
              <path d="M40 120 C 150 120, 200 140, 300 150" stroke="#D9822B" strokeOpacity="0.7" />
              <path d="M40 180 C 150 180, 200 160, 300 150" stroke="#6FA8C9" strokeOpacity="0.7" />
              <path d="M40 220 C 140 220, 200 170, 300 150" stroke="#C97B4A" strokeOpacity="0.7" />
            </g>

            {/* Glowing Visual Filter Gate (Vertical Luminescent Line) */}
            <line x1="200" y1="40" x2="200" y2="260" stroke="#40916C" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.5" />
            <circle cx="200" cy="150" r="18" fill="#40916C" fillOpacity="0.15" />

            {/* Forward-Looking Temporal Ripples (Center to Right) */}
            <circle cx="300" cy="150" r="60" stroke="#40916C" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" style={{ animationDuration: '4s' }} />
            <circle cx="300" cy="150" r="90" stroke="#40916C" strokeWidth="0.75" strokeOpacity="0.2" className="animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
          </svg>

          {/* The See-Through Transparent Glass Core (Conveys "No Black Box") */}
          <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-slate-900/40 border border-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center specular-border">
            
            {/* Specular Highlight Arc */}
            <div className="absolute top-2 left-6 right-6 h-6 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

            {/* Visible Five Colored Elemental Rings Spinning Inside the Glass Sphere */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              {[
                { color: '#C97B4A', size: 'inset-0', dur: '10s' },
                { color: '#1B6B93', size: 'inset-1.5', dur: '14s' },
                { color: '#D9822B', size: 'inset-3', dur: '18s' },
                { color: '#6FA8C9', size: 'inset-4.5', dur: '22s' },
                { color: '#7A6C9E', size: 'inset-6', dur: '26s' },
              ].map((ring, idx) => (
                <div
                  key={idx}
                  className={`absolute ${ring.size} rounded-full border-2 border-dashed animate-spin`}
                  style={{
                    borderColor: ring.color,
                    animationDuration: ring.dur,
                    opacity: pipelinePhase >= 1 ? 0.9 : 0.3,
                  }}
                />
              ))}

              {/* Core Output: Calm Numerical Score or Guided Shield */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                {pipelinePhase === 3 ? (
                  <div className="flex flex-col items-center animate-fadeIn">
                    <ShieldCheck className="w-10 h-10 text-emerald-400 drop-shadow-md" />
                    <span className="font-mono text-[9px] text-emerald-300 uppercase tracking-widest mt-1">
                      Safe
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-emerald-300 drop-shadow-md">
                      {pipelinePhase >= 2 ? '74' : '...'}
                    </span>
                    <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest">
                      Index
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Temporal Forecast Pulse Badge (Right) */}
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 bg-black/60 px-3 py-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              Forecast
            </span>
            <span className="font-serif font-bold text-base text-white">
              +7 Days
            </span>
          </div>
        </div>

        {/* 4 Interactive Process Steps (Sense · Clean · Score · Guide) */}
        <div className="mt-6 flex items-center justify-between gap-1.5 sm:gap-3">
          {phases.map((p, idx) => {
            const Icon = p.icon;
            const isCurrent = pipelinePhase === idx;
            const isPassed = pipelinePhase >= idx;

            return (
              <button
                key={p.num}
                onClick={() => setPipelinePhase(idx)}
                className={`touch-target flex-1 p-2 sm:p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-xl scale-105 border-transparent ring-2 ring-emerald-400/30'
                    : isPassed
                    ? 'bg-white/10 border-white/20 text-slate-200'
                    : 'bg-white/5 border-white/5 text-slate-500 opacity-60'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isPassed ? 'text-emerald-300' : 'text-slate-500'}`} />
                <span className="font-serif text-xs font-bold leading-tight">
                  {isHi ? p.wordHi : p.wordEn}
                </span>
                <span className="font-mono text-[9px] opacity-75 mt-0.5">{p.num}</span>
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

