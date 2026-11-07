import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { ArrowRight, Moon, Sun, Globe, Compass, BookOpen } from 'lucide-react';

export interface StoryChapter {
  id: string;
  num: string;
  titleEn: string;
  titleHi: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: 'awakening', num: '01', titleEn: 'Awakening', titleHi: 'जागृति' },
  { id: 'fracture', num: '02', titleEn: 'Fracture', titleHi: 'संकट' },
  { id: 'elements', num: '03', titleEn: 'Elements', titleHi: 'पंचमहाभूत' },
  { id: 'engine', num: '04', titleEn: 'Intelligence', titleHi: 'प्रणाली' },
  { id: 'explore', num: '05', titleEn: 'Explore', titleHi: 'अनुभव' },
  { id: 'vision', num: '06', titleEn: 'Vision', titleHi: 'संकल्प' },
];

interface StoryNavProps {
  onScrollToChapter?: (chapterId: string) => void;
}

export const StoryNav: React.FC<StoryNavProps> = ({ onScrollToChapter }) => {
  const { navigate, skipPreference, setSkipPreference } = useRouter();
  const { language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState<string>('awakening');
  const [showSkipPopover, setShowSkipPopover] = useState(false);

  const isHi = language === 'hi';

  // Track scroll position, active chapter, and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = winHeight > 0 ? Math.min(100, Math.max(0, (scrollY / winHeight) * 100)) : 0;
      setScrollProgress(progress);

      // Determine active chapter by checking element positions
      for (let i = STORY_CHAPTERS.length - 1; i >= 0; i--) {
        const chapter = STORY_CHAPTERS[i];
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveChapterId(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterClick = (id: string) => {
    if (onScrollToChapter) {
      onScrollToChapter(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleEnterPlatform = () => {
    navigate('/app');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-2 px-3 sm:px-6'
          : 'py-4 px-4 sm:px-8 bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        }`}
    >
      <div
        className={`mx-auto transition-all duration-300 relative ${isScrolled
            ? 'max-w-5xl glass-pill rounded-full px-4 py-2 specular-border shadow-2xl'
            : 'max-w-7xl flex items-center justify-between'
          }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Brand & Logo */}
          <div
            onClick={() => handleChapterClick('awakening')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none touch-target"
            role="button"
            tabIndex={0}
            aria-label="PRAKRUshTI - Scroll to top"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleChapterClick('awakening');
              }
            }}
          >
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="PRAKRUshTI"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover ring-1 ring-emerald-500/30 group-hover:ring-emerald-400 group-hover:scale-105 transition-all shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-charcoal animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  PRAKRUshTI
                </span>
                <span className="font-devanagari text-[10px] font-semibold text-emerald-700 dark:text-emerald-300/90 hidden sm:inline">
                  (प्रकृति)
                </span>
              </div>
              {!isScrolled && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-tight hidden md:block">
                  {isHi ? 'पर्यावरणीय बुद्धिमत्ता मंच' : 'Planetary Environmental Intelligence'}
                </p>
              )}
            </div>
          </div>

          {/* Center: Story Chapter Timeline (Desktop & Tablet) */}
          <nav
            aria-label="Story Chapters"
            className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-900/5 dark:bg-white/5 rounded-full px-2 py-1 border border-slate-200/50 dark:border-white/10"
          >
            <button
              onClick={() => handleChapterClick('awakening')}
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <BookOpen className="w-3 h-3" />
              <span>{isHi ? 'प्रारंभ' : 'Story'}</span>
            </button>

            <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>

            {STORY_CHAPTERS.map((chap) => {
              const isActive = activeChapterId === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleChapterClick(chap.id)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-full transition-all duration-200 flex items-center space-x-1.5 ${isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-bold scale-105'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10'
                    }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="text-[10px] opacity-75">{chap.num}</span>
                  <span className="font-sans hidden lg:inline">{isHi ? chap.titleHi : chap.titleEn}</span>
                </button>
              );
            })}

            <span className="text-slate-300 dark:text-slate-600 text-xs">|</span>

            <button
              onClick={() => handleChapterClick('explore')}
              className="text-xs font-semibold px-2.5 py-1 rounded-full text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <Compass className="w-3 h-3" />
              <span>{isHi ? 'अवलोकन' : 'Explore'}</span>
            </button>
          </nav>

          {/* Right Action Controls: Lang, Theme, Skip Preferences & Enter Platform */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="touch-target p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
              aria-label="Toggle language"
            >
              <div className="flex items-center space-x-1 text-xs font-semibold">
                <Globe className="w-4 h-4" />
                <span className="uppercase text-[11px] font-mono">{language === 'en' ? 'HI' : 'EN'}</span>
              </div>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="touch-target p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Skip story preference popover trigger (desktop) */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setShowSkipPopover(!showSkipPopover)}
                className={`text-[11px] font-mono px-2 py-1 rounded-lg border transition-colors ${skipPreference
                    ? 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                    : 'border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                title="Configure intro playback preference"
              >
                {skipPreference ? '✓ Skip: ON' : 'Skip: OFF'}
              </button>

              {showSkipPopover && (
                <div className="absolute right-0 mt-2 w-64 p-3 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-white/10 text-left z-50">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="skipStoryCheck"
                      checked={skipPreference}
                      onChange={(e) => setSkipPreference(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                    />
                    <label htmlFor="skipStoryCheck" className="text-xs text-slate-700 dark:text-slate-200 cursor-pointer">
                      <strong>{isHi ? 'अगली बार सीधे ऐप खोलें' : 'Skip story directly to platform next time'}</strong>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {isHi
                          ? 'आप हमेशा नेवबार से पुनः कहानी देख सकते हैं।'
                          : 'You can always replay the story anytime via the nav.'}
                      </p>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button: Enter Platform / Skip */}
            <button
              onClick={handleEnterPlatform}
              className="touch-target group relative inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-700/20 hover:shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Enter PRAKRUshTI Platform"
            >
              <span>{isHi ? 'प्लेटफ़ॉर्म खोलें' : 'Enter App'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Thin Glowing Scroll Progress Bar */}
        <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-slate-200/30 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-150 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </header>
  );
};
