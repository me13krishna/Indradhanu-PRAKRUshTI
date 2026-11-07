import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Globe } from 'lucide-react';

interface FilmNavProps {
  activeSceneIndex: number;
  onSelectScene?: (index: number) => void;
}

export const FilmNav: React.FC<FilmNavProps> = ({
  activeSceneIndex,
  onSelectScene,
}) => {
  const { navigate } = useRouter();
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sceneIds = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-6'];

  const handleDotClick = (idx: number) => {
    if (onSelectScene) {
      onSelectScene(idx);
    } else {
      const el = document.getElementById(sceneIds[idx]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 px-4 sm:px-8 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 px-4 sm:px-8 bg-gradient-to-b from-black/70 via-black/30 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: PRAKRUSHTI Brand Logo & Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2.5 cursor-pointer group select-none touch-target"
          role="button"
          tabIndex={0}
          aria-label="PRAKRUshTI - Scroll to top"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="PRAKRUshTI"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-1 ring-emerald-400/40 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-black animate-pulse" />
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              PRAKRUshTI
            </span>
            <span className="font-devanagari text-xs text-emerald-300/80 font-bold hidden sm:inline">
              (प्रकृति)
            </span>
          </div>
        </div>

        {/* Center: 6 Unlabeled Progress Pips (Film Timeline) */}
        <nav
          aria-label="Scene progress"
          className="flex items-center space-x-2 sm:space-x-3 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-inner"
        >
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Jump to scene ${idx + 1}`}
                aria-current={isActive ? 'step' : undefined}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-5 sm:w-6 h-1.5 bg-emerald-400 shadow-sm shadow-emerald-400/50 scale-110'
                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            );
          })}
        </nav>

        {/* Right: Language Switcher & Instant SKIP → Action */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Toggle (EN / HI) */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="touch-target px-2.5 py-1.5 rounded-full text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 transition-all text-xs font-mono font-bold flex items-center space-x-1 border border-white/10"
            title="Toggle language"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{language === 'en' ? 'HI' : 'EN'}</span>
          </button>

          {/* Primary Action: Immediate Skip to Platform */}
          <button
            onClick={() => navigate('/app')}
            className="touch-target group inline-flex items-center space-x-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Skip to platform"
          >
            <span>{language === 'hi' ? 'छोड़ें' : 'SKIP'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
};

