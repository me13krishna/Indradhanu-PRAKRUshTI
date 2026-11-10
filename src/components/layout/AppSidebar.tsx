import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BarChart2,
  Sliders,
  MapPin,
  Activity,
  BookOpen,
  Info,
  FileText,
  Globe,
  Sun,
  Moon,
  Compass,
  Menu,
  X,
  Sparkles,
  Search,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../hooks/useTheme';

export interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportReport: () => void;
  onOpenAssistant: () => void;
  onOpenPalette: () => void;
  currentLocationName?: string;
}

const NAV = [
  { id: 'dashboard', en: 'Dashboard', hi: 'डैशबोर्ड', icon: BarChart2 },
  { id: 'compare', en: 'Compare', hi: 'तुलना', icon: Sliders },
  { id: 'hotspots', en: 'Hotspots', hi: 'हॉटस्पॉट', icon: MapPin },
  { id: 'simulator', en: 'Simulator', hi: 'सिमुलेटर', icon: Activity },
  { id: 'knowledge', en: 'Knowledge', hi: 'ज्ञानकोष', icon: BookOpen },
  { id: 'about', en: 'About', hi: 'परिचय', icon: Info },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  onExportReport,
  onOpenAssistant,
  onOpenPalette,
  currentLocationName,
}) => {
  const { language, setLanguage } = useLanguage();
  const { navigate } = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [drawer, setDrawer] = useState(false);
  const isHi = language === 'hi';

  const go = (id: string) => {
    setActiveTab(id);
    setDrawer(false);
  };

  const railBtn =
    'w-full touch-target px-3 py-2.5 rounded-xl text-[13px] font-medium flex items-center transition-colors text-emerald-50/70 hover:text-white hover:bg-white/8';

  return (
    <>
      {/* Desktop / tablet rail */}
      <aside
        className="hidden md:flex flex-col justify-between w-20 lg:w-64 fixed top-0 bottom-0 left-0 z-40 bg-[#08130E]/85 backdrop-blur-2xl border-r border-white/[0.07] text-slate-200 overflow-hidden"
        aria-label="Platform navigation"
      >
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <button
            onClick={() => go('dashboard')}
            className="w-full p-4 lg:p-5 flex items-center gap-3 group text-left"
            aria-label="PRAKRUshTI home"
          >
            <span className="relative flex-shrink-0">
              <img
                src="/logo.jpg"
                alt=""
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-300/40 group-hover:ring-emerald-300/80 group-hover:scale-105 transition"
              />
              <span className="absolute -bottom-0.5 -right-0.5 live-dot ring-2 ring-[#08130E] !w-2.5 !h-2.5" />
            </span>
            <span className="hidden lg:block min-w-0">
              <span className="flex items-baseline gap-1.5">
                <span className="font-serif text-[1.15rem] font-bold text-white tracking-tight">PRAKRUshTI</span>
                <span className="font-devanagari text-[11px] text-emerald-300/90 font-bold">प्रकृति</span>
              </span>
              <span className="block text-[10px] font-mono text-emerald-200/60 tracking-wider uppercase">
                {isHi ? 'पर्यावरण बुद्धिमत्ता' : 'Environmental AI'}
              </span>
            </span>
          </button>

          <div className="px-3 lg:px-4">
            <button
              onClick={onOpenPalette}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-slate-300 text-[13px] transition-colors"
              title={isHi ? 'खोजें (Ctrl K)' : 'Search (Ctrl K)'}
            >
              <Search className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span className="hidden lg:inline flex-1 text-left truncate">
                {currentLocationName ? currentLocationName.split(',')[0] : isHi ? 'स्थान खोजें' : 'Search places'}
              </span>
              <span className="hidden lg:inline kbd text-slate-400">Ctrl K</span>
            </button>
          </div>

          <div className="eyebrow !text-emerald-200/50 px-5 pt-6 pb-2 hidden lg:block">{isHi ? 'अन्वेषण' : 'Explore'}</div>
          <nav className="px-2 lg:px-3 mt-3 lg:mt-0 space-y-1" aria-label="Main navigation">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`${railBtn} relative ${active ? '!text-white' : ''}`}
                  title={isHi ? item.hi : item.en}
                  aria-current={active ? 'page' : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/30 to-emerald-500/5 border border-emerald-300/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="sidebar-bar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-emerald-300"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icon className={`relative w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-emerald-300' : ''}`} />
                  <span className="relative ml-3 hidden lg:inline">{isHi ? item.hi : item.en}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="relative z-10 p-3 lg:p-4 space-y-2">
          <button
            onClick={onOpenAssistant}
            className="group w-full touch-target relative overflow-hidden rounded-2xl px-3 py-3 flex items-center gap-3 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
          >
            <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.22)_50%,transparent_70%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Sparkles className="relative w-5 h-5 flex-shrink-0" />
            <span className="relative hidden lg:block text-left leading-tight">
              <span className="block text-sm font-bold">{isHi ? 'AI से पूछें' : 'Ask the AI'}</span>
              <span className="block text-[10px] text-emerald-50/80 font-mono">
                {isHi ? 'आपके डेटा पर आधारित' : 'Grounded in live data'}
              </span>
            </span>
          </button>

          <button onClick={onExportReport} className={railBtn} title={isHi ? 'रिपोर्ट' : 'Export dossier'}>
            <FileText className="w-[18px] h-[18px] flex-shrink-0 text-emerald-300/90" />
            <span className="ml-3 hidden lg:inline">{isHi ? 'रिपोर्ट निर्यात' : 'Export dossier'}</span>
          </button>
          <button onClick={() => navigate('/?story=1')} className={railBtn} title="Origin story">
            <Compass className="w-[18px] h-[18px] flex-shrink-0 text-emerald-300/90" />
            <span className="ml-3 hidden lg:inline">{isHi ? 'मूल कहानी' : 'Origin story'}</span>
          </button>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between lg:justify-start lg:gap-2 flex-col lg:flex-row gap-1">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="touch-target px-2.5 py-2 rounded-lg text-emerald-100/80 hover:text-white hover:bg-white/8 flex items-center gap-1.5 text-xs font-mono"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden lg:inline font-bold">{language === 'en' ? 'EN → हिं' : 'हिं → EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="touch-target p-2 rounded-lg text-emerald-100/80 hover:text-white hover:bg-white/8 lg:ml-auto"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#08130E]/90 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-white">
        <button onClick={() => go('dashboard')} className="flex items-center gap-2.5 touch-target">
          <img src="/logo.jpg" alt="" className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-300/40" />
          <span className="font-serif font-bold text-base">PRAKRUshTI</span>
        </button>
        <div className="flex items-center gap-1">
          <button onClick={onOpenPalette} className="touch-target p-2 rounded-lg text-emerald-100 hover:bg-white/10" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setDrawer(true)} className="touch-target p-2 rounded-lg text-emerald-100 hover:bg-white/10" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile bottom bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08130E]/92 backdrop-blur-2xl border-t border-white/10 px-1 pb-[env(safe-area-inset-bottom)] flex items-stretch justify-around"
        aria-label="Mobile navigation"
      >
        {NAV.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`touch-target relative flex-1 py-2 flex flex-col items-center justify-center text-[10px] font-medium ${
                active ? 'text-emerald-300' : 'text-slate-400'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute top-0 h-[2px] w-8 rounded-full bg-emerald-300"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{isHi ? item.hi : item.en}</span>
            </button>
          );
        })}
        <button
          onClick={onOpenAssistant}
          className="touch-target flex-1 py-2 flex flex-col items-center justify-center text-[10px] font-semibold text-emerald-300"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span>AI</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDrawer(false)} />
            <motion.div
              className="relative w-72 max-w-[85%] bg-[#0a1812] text-slate-200 p-5 flex flex-col justify-between border-l border-white/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span className="font-serif font-bold text-lg text-white">{isHi ? 'मेनू' : 'Menu'}</span>
                  <button onClick={() => setDrawer(false)} className="p-1 text-slate-400 hover:text-white" aria-label="Close menu">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-1.5">
                  {NAV.map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => go(item.id)}
                        className={`w-full touch-target px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                          active ? 'bg-emerald-500/20 text-white border border-emerald-300/30' : 'text-slate-300 hover:bg-white/8'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-emerald-300" />
                        {isHi ? item.hi : item.en}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2 pt-5 border-t border-white/10">
                <button
                  onClick={() => {
                    onExportReport();
                    setDrawer(false);
                  }}
                  className="w-full touch-target px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  {isHi ? 'रिपोर्ट निर्यात' : 'Export dossier'}
                </button>
                <button
                  onClick={() => {
                    navigate('/?story=1');
                    setDrawer(false);
                  }}
                  className="w-full touch-target px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  {isHi ? 'मूल कहानी' : 'Origin story'}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="flex-1 touch-target px-3 py-2 rounded-xl bg-white/8 text-xs font-mono font-bold"
                  >
                    {language === 'en' ? 'हिन्दी' : 'English'}
                  </button>
                  <button onClick={toggleTheme} className="flex-1 touch-target px-3 py-2 rounded-xl bg-white/8 flex items-center justify-center" aria-label="Toggle theme">
                    {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
