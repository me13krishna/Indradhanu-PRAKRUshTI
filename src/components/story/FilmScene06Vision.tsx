import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FilmScene06Vision: React.FC = () => {
  const { language } = useLanguage();
  const { navigate, skipPreference, setSkipPreference } = useRouter();
  const isHi = language === 'hi';

  const handleEnterPlatform = () => {
    navigate('/app');
  };

  return (
    <section
      id="scene-6"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#0B1A14] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 6: The Vision"
    >
      {/* Golden Hour Healed Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#183325] via-[#214A36] to-[#0A1811] pointer-events-none" />

      {/* Radiant Golden Celestial Sun */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full bg-gradient-to-b from-amber-300/25 via-emerald-400/15 to-transparent blur-3xl pointer-events-none" />

      {/* Healed Procedural SVG Landscape (Golden Hour, Full River, Birds) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[65%] object-cover pointer-events-none"
        viewBox="0 0 1440 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
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

        {/* Alpine Ridges */}
        <path
          d="M0 240L140 190L310 240L480 160L650 220L820 170L990 230L1160 180L1310 235L1440 200V500H0V240Z"
          fill="url(#healedFarRidge)"
        />

        {/* Mid-tier Lush Forest Ridge */}
        <path
          d="M0 310L160 260L340 320L520 255L710 310L890 260L1080 325L1260 270L1440 330V500H0V310Z"
          fill="url(#healedMidRidge)"
        />

        {/* Full, Flowing Healed River Ribbon */}
        <path
          d="M680 320 C 730 380, 660 420, 710 500 L 780 500 C 740 430, 810 390, 740 320 Z"
          fill="url(#healedFullRiver)"
        />

        {/* Birds Silhouettes Drifting Through Sky */}
        <g stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.75" className="animate-pulse">
          <path d="M420 110 Q 428 102, 436 110 Q 444 102, 452 110" />
          <path d="M455 125 Q 461 119, 467 125 Q 473 119, 479 125" />
          <path d="M480 95 Q 487 88, 494 95 Q 501 88, 508 95" />
        </g>
      </svg>

      {/* Empty Top Balance Spacer */}
      <div className="h-4" />

      {/* Center Stage: The Hope Climax */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-6">
        
        {/* Subtle Decorative Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vasudhaiva Kutumbakam</span>
        </div>

        {/* Headline Large Serif: Fraunces (7 words) */}
        <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-8 text-balance drop-shadow-xl">
          {isHi
            ? 'प्रकृति को समझें। इसके संकेतों को पहचानें। भविष्य संवारें।'
            : 'Understand Nature. Decode Its Signals. Shape Tomorrow.'}
        </h2>

        {/* Single Primary High-Conversion Button */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onClick={handleEnterPlatform}
            className="touch-target group px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-slate-950 font-bold text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3"
            aria-label="Enter PRAKRUshTI Platform"
          >
            <span>{isHi ? 'प्रकृति में प्रवेश करें' : 'ENTER PRAKRUSHTI'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Rule 8: Remembered Preference Checkbox on the Final Scene ONLY */}
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

      {/* Bottom Quiet Single-Line Footer & Credits (Rule 6c) */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400/80 gap-2">
        <span>
          {isHi
            ? 'तत्व एक व्याख्यात्मक ढाँचा हैं; स्कोर मानक पर्यावरणीय डेटा पर आधारित हैं।'
            : 'Elements are an interpretive framework; scores use standard environmental data.'}
        </span>
        <span className="text-emerald-400/90 font-semibold">
          Indradhanu PCCOE 2026
        </span>
      </footer>
    </section>
  );
};

