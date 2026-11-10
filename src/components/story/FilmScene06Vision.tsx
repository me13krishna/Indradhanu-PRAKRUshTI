import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { SceneHint } from './SceneHint';
import { ArrowRight, Sparkles, Sprout } from 'lucide-react';

const GOAL = 7;

interface Tree {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
}

export const FilmScene06Vision: React.FC = () => {
  const { language } = useLanguage();
  const { navigate, skipPreference, setSkipPreference } = useRouter();
  const reduced = usePrefersReducedMotion();
  const isHi = language === 'hi';

  const [trees, setTrees] = useState<Tree[]>([]);
  const heal = reduced ? 1 : Math.min(1, trees.length / GOAL);
  const healed = heal >= 1;

  const plant = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || trees.length >= GOAL + 5) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = Math.max(64, ((e.clientY - rect.top) / rect.height) * 100);
    setTrees((t) => [...t, { id: Date.now() + t.length, x, y, size: 34 + Math.random() * 22, hue: 128 + Math.random() * 28 }]);
  };

  return (
    <section
      id="scene-6"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#0B1A14] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 6: The Vision"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#183325] via-[#214A36] to-[#0A1811] pointer-events-none" />

      <div
        className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-b from-amber-300/25 via-emerald-400/15 to-transparent blur-3xl pointer-events-none transition-[opacity,transform] duration-1000"
        style={{ opacity: 0.25 + heal * 0.75, transform: `translateX(-50%) scale(${0.7 + heal * 0.4})` }}
      />

      <svg className="absolute bottom-0 left-0 w-full h-[65%] object-cover pointer-events-none" viewBox="0 0 1440 500" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="healedFarRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1B4332" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="healedMidRidge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#40916C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1B4332" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="healedFullRiver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FA3CC" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1B6B93" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d="M0 240L140 190L310 240L480 160L650 220L820 170L990 230L1160 180L1310 235L1440 200V500H0V240Z" fill="url(#healedFarRidge)" />
        <path d="M0 310L160 260L340 320L520 255L710 310L890 260L1080 325L1260 270L1440 330V500H0V310Z" fill="url(#healedMidRidge)" />
        <path
          d="M680 320 C 730 380, 660 420, 710 500 L 780 500 C 740 430, 810 390, 740 320 Z"
          fill="url(#healedFullRiver)"
          style={{ opacity: 0.25 + heal * 0.75, transition: 'opacity 1s' }}
        />
        <g stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" style={{ opacity: heal > 0.55 ? 0.85 : 0, transition: 'opacity 1.2s' }} className="animate-pulse">
          <path d="M420 110 Q 428 102, 436 110 Q 444 102, 452 110" />
          <path d="M455 125 Q 461 119, 467 125 Q 473 119, 479 125" />
          <path d="M480 95 Q 487 88, 494 95 Q 501 88, 508 95" />
        </g>
      </svg>

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-gradient-to-b from-[#3a3028]/70 via-[#2a2620]/50 to-[#17130f]/60"
        style={{ opacity: 1 - heal }}
      />

      <div
        onPointerDown={plant}
        className={`absolute bottom-0 inset-x-0 h-[42%] z-[5] ${healed ? 'cursor-default' : 'cursor-pointer'}`}
        role="button"
        aria-label={isHi ? 'भूमि पर पेड़ लगाएँ' : 'Plant a tree on the land'}
      >
        {trees.map((t) => (
          <motion.span
            key={t.id}
            className="absolute pointer-events-none origin-bottom block"
            style={{ left: `${t.x}%`, top: `${t.y}%`, width: t.size, height: t.size * 1.3, marginLeft: -t.size / 2, marginTop: -t.size * 1.3 }}
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 170, damping: 11 }}
          >
            <svg viewBox="0 0 40 52" className="w-full h-full overflow-visible">
              <rect x="18" y="30" width="4" height="22" rx="2" fill="#5b3f2a" />
              <circle cx="20" cy="22" r="15" fill={`hsl(${t.hue} 55% 38%)`} />
              <circle cx="13" cy="26" r="9" fill={`hsl(${t.hue} 60% 46%)`} />
              <circle cx="27" cy="18" r="8" fill={`hsl(${t.hue + 6} 62% 52%)`} />
            </svg>
            <motion.span
              className="absolute inset-0 rounded-full border border-emerald-200/60"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 1.1 }}
            />
          </motion.span>
        ))}
      </div>

      <div className="h-4" />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-6 pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vasudhaiva Kutumbakam</span>
        </div>

        <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6 text-balance drop-shadow-xl">
          {isHi ? 'प्रकृति को समझें। इसके संकेतों को पहचानें। भविष्य संवारें।' : 'Understand Nature. Decode Its Signals. Shape Tomorrow.'}
        </h2>

        {!reduced && (
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-100/90 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {healed
                  ? isHi ? 'भूमि स्वस्थ हो गई। अब आपकी बारी।' : 'The land has healed. Now it is your turn.'
                  : isHi ? `${Math.min(trees.length, GOAL)}/${GOAL} पेड़ · ${Math.round(heal * 100)}% उपचार` : `${Math.min(trees.length, GOAL)}/${GOAL} trees · ${Math.round(heal * 100)}% healed`}
              </span>
            </div>
            <div className="w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-700" style={{ width: `${heal * 100}%` }} />
            </div>
            <SceneHint show={trees.length === 0} text={isHi ? 'भूमि पर टैप करें, पेड़ लगाएँ और उसे ठीक करें' : 'Tap the land to plant trees and heal it.'} icon={<Sprout className="w-3.5 h-3.5" />} />
          </div>
        )}

        <div className="flex flex-col items-center justify-center space-y-4 pointer-events-auto">
          <button
            onClick={() => navigate('/app')}
            className={`touch-target group px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-slate-950 font-bold text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3 ${healed ? 'ring-4 ring-amber-200/50 animate-pulse' : ''}`}
            aria-label="Enter PRAKRUshTI Platform"
          >
            <span>{isHi ? 'प्रकृति में प्रवेश करें' : 'ENTER PRAKRUSHTI'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <label className="inline-flex items-center space-x-2 text-xs font-mono text-slate-300/80 cursor-pointer select-none pt-2">
            <input
              type="checkbox"
              checked={skipPreference}
              onChange={(e) => setSkipPreference(e.target.checked)}
              className="h-3.5 w-3.5 rounded text-emerald-500 focus:ring-emerald-400 border-white/20 bg-white/10"
            />
            <span>{isHi ? 'अगली बार सीधे ऐप खोलें' : 'Skip intro next time'}</span>
          </label>
        </div>
      </div>

      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400/80 gap-2">
        <span>
          {isHi
            ? 'तत्व एक व्याख्यात्मक ढाँचा हैं; स्कोर मानक पर्यावरणीय डेटा पर आधारित हैं।'
            : 'Elements are an interpretive framework; scores use standard environmental data.'}
        </span>
        <span className="text-emerald-400/90 font-semibold">Indradhanu PCCOE 2026</span>
      </footer>
    </section>
  );
};
