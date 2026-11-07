import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, BarChart2, MapPin, Sliders, BookOpen, Info, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onExportReport }) => {
  const { language, setLanguage, t } = useLanguage();
  const { navigate } = useRouter();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };

  const navItems = [
    { id: 'dashboard', label: t('fiveElements'), icon: BarChart2 },
    { id: 'compare', label: t('compareMode'), icon: Sliders },
    { id: 'hotspots', label: t('globalHotspots'), icon: MapPin },
    { id: 'simulator', label: t('whatIfSimulator'), icon: Sliders },
    { id: 'knowledge', label: t('knowledgeBase'), icon: BookOpen },
    { id: 'about', label: t('aboutUs'), icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#10241B]/95 dark:bg-[#0A1812]/95 border-b border-emerald-500/20 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="PRAKRUshTI Official Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-md shadow-emerald-950/40 ring-2 ring-emerald-400/50 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/20 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {t('appName')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-medium">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-xs text-emerald-200/75 font-sans hidden sm:block">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Navigation Controls & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Back to Story / Landing Link */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-all text-white border border-white/15 active:scale-95 shadow-sm"
              title="Return to Story Overview"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">Story</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-all text-white border border-white/15 active:scale-95 shadow-sm"
              title="Toggle Language (English / हिंदी)"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 transition-all border border-white/15 active:scale-95 shadow-sm"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
            </button>

            {/* Export Dossier Button */}
            <button
              onClick={onExportReport}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-950/40 active:scale-95 border border-emerald-400/30"
            >
              <FileText className="w-4 h-4 text-emerald-100" />
              <span>{t('exportReport')}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs Bar */}
        <div className="flex space-x-1.5 overflow-x-auto pb-3 pt-1.5 scrollbar-none border-t border-emerald-500/15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/30 font-bold ring-1 ring-emerald-400/40'
                    : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'text-white scale-110' : 'text-emerald-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
