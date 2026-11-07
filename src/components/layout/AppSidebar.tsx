import React, { useState } from 'react';
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
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../hooks/useTheme';

export interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportReport: () => void;
  currentLocationName?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  onExportReport,
  currentLocationName,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { navigate } = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isHi = language === 'hi';

  const navItems = [
    { id: 'dashboard', labelEn: 'Console', labelHi: 'पंचमहाभूत', icon: BarChart2 },
    { id: 'compare', labelEn: 'Compare', labelHi: 'तुलना', icon: Sliders },
    { id: 'hotspots', labelEn: 'Hotspots', labelHi: 'हॉटस्पॉट', icon: MapPin },
    { id: 'simulator', labelEn: 'Simulator', labelHi: 'सिमुलेटर', icon: Activity },
    { id: 'knowledge', labelEn: 'Knowledge', labelHi: 'ज्ञानकोष', icon: BookOpen },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय', icon: Info },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP & TABLET SIDEBAR (LEFT RAIL)
          Hidden on mobile (< 768px), Icon-rail on md (768-1023px), Full rail on lg+
      ───────────────────────────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col justify-between w-20 lg:w-64 bg-[#10241B] dark:bg-[#07130E] border-r border-emerald-500/20 text-slate-200 transition-all duration-300 z-40 fixed top-0 bottom-0 left-0"
        aria-label="Platform Sidebar Navigation"
      >
        {/* Top: Logo & System Identity */}
        <div>
          <div
            onClick={() => handleTabClick('dashboard')}
            className="p-4 lg:p-5 flex items-center space-x-3 cursor-pointer group border-b border-emerald-500/15"
          >
            <div className="relative flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="PRAKRUshTI"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-400/40 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#10241B]" />
            </div>

            <div className="hidden lg:block overflow-hidden">
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  PRAKRUshTI
                </span>
                <span className="font-devanagari text-xs text-emerald-300/80 font-bold">
                  (प्रकृति)
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/70 font-mono tracking-tight truncate">
                Environmental Intelligence
              </p>
            </div>
          </div>

          {/* Location Telemetry Pill (Desktop only) */}
          {currentLocationName && (
            <div className="hidden lg:block mx-3 my-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="text-[10px] font-mono text-emerald-300/80 uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Live Feed Active</span>
              </div>
              <div className="font-semibold text-white truncate mt-0.5" title={currentLocationName}>
                {currentLocationName.split(',')[0]}
              </div>
            </div>
          )}

          {/* Navigation Items List */}
          <nav className="p-2 lg:p-3 space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full touch-target px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/50 font-bold'
                      : 'text-emerald-100/75 hover:text-white hover:bg-white/10'
                  }`}
                  title={isHi ? item.labelHi : item.labelEn}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isActive ? 'text-white scale-110' : 'text-emerald-300/90 group-hover:scale-105'
                    }`}
                  />
                  <span className="ml-3 hidden lg:inline tracking-wide">
                    {isHi ? item.labelHi : item.labelEn}
                  </span>

                  {/* Active Pip on Tablet Rail */}
                  {isActive && (
                    <span className="lg:hidden absolute right-1.5 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Controls */}
        <div className="p-3 border-t border-emerald-500/15 space-y-2">
          
          {/* Export Report Action */}
          <button
            onClick={onExportReport}
            className="w-full touch-target px-3 py-2 rounded-xl text-xs font-medium text-emerald-200 hover:text-white hover:bg-white/10 flex items-center justify-center lg:justify-start transition-colors"
            title={t('exportReport')}
          >
            <FileText className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span className="ml-3 hidden lg:inline">{t('exportReport')}</span>
          </button>

          {/* Return to Cinematic Story */}
          <button
            onClick={() => navigate('/?story=1')}
            className="w-full touch-target px-3 py-2 rounded-xl text-xs font-medium text-emerald-200 hover:text-white hover:bg-white/10 flex items-center justify-center lg:justify-start transition-colors"
            title="View Origin Story Experience"
          >
            <Compass className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span className="ml-3 hidden lg:inline">{isHi ? 'मूल कहानी देखें' : 'View Origin Story'}</span>
          </button>

          {/* Language & Theme Controls Row */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="touch-target p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-1.5 text-xs font-mono"
              title="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden lg:inline uppercase font-bold">{language === 'en' ? 'HI' : 'EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="touch-target p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE TOP BAR (< 768px)
      ───────────────────────────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 bg-[#10241B]/95 dark:bg-[#07130E]/95 backdrop-blur-md border-b border-emerald-500/20 px-4 py-2.5 flex items-center justify-between text-white">
        <div
          onClick={() => handleTabClick('dashboard')}
          className="flex items-center space-x-2.5 cursor-pointer touch-target"
        >
          <img
            src="/logo.jpg"
            alt="PRAKRUshTI"
            className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-400/40"
          />
          <div>
            <span className="font-serif font-bold text-base text-white">PRAKRUshTI</span>
            <span className="font-devanagari text-[10px] text-emerald-300 font-bold ml-1">(प्रकृति)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10 text-xs font-mono font-bold"
          >
            {language === 'en' ? 'HI' : 'EN'}
          </button>

          {/* Theme Switcher */}
          <button onClick={toggleTheme} className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10">
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-1.5 rounded-lg text-emerald-200 hover:bg-white/10"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE BOTTOM TAB BAR (< 768px)
          Fixed bottom bar with large touch targets (>= 44px)
      ───────────────────────────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#10241B]/95 dark:bg-[#07130E]/95 backdrop-blur-xl border-t border-emerald-500/20 px-2 py-1 flex items-center justify-around shadow-2xl"
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`touch-target flex-1 py-1.5 flex flex-col items-center justify-center text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
              <span>{isHi ? item.labelHi : item.labelEn}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="touch-target flex-1 py-1.5 flex flex-col items-center justify-center text-[10px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Menu className="w-5 h-5 mb-0.5 text-slate-400" />
          <span>{isHi ? 'अधिक' : 'More'}</span>
        </button>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE SLIDE-OVER DRAWER (< 768px)
      ───────────────────────────────────────────────────────────── */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85%] bg-[#10241B] text-slate-200 p-6 flex flex-col justify-between shadow-2xl border-l border-emerald-500/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="font-serif font-bold text-lg text-white">Menu & Tools</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full touch-target px-4 py-3 rounded-xl text-sm font-semibold flex items-center space-x-3 transition-colors ${
                        isActive
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-emerald-400" />
                      <span>{isHi ? item.labelHi : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  onExportReport();
                  setMobileDrawerOpen(false);
                }}
                className="w-full touch-target px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>{t('exportReport')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/?story=1');
                  setMobileDrawerOpen(false);
                }}
                className="w-full touch-target px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>{isHi ? 'मूल कहानी देखें' : 'View Origin Story'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

