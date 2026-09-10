import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, BarChart2, MapPin, Sliders, BookOpen, Info, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onExportReport }) => {
  const { language, setLanguage, t } = useLanguage();
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/90 dark:bg-charcoal/90 border-b border-emerald-900/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="PRAKRUshTI Official Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-md shadow-emerald-900/20 ring-2 ring-emerald-500/40 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/20 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark dark:text-emerald-400 group-hover:text-emerald-600 transition-colors">
                  {t('appName')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-medium">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans hidden sm:block">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Navigation Controls & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/5 dark:bg-white/10 hover:bg-emerald-950/10 dark:hover:bg-white/20 transition text-slate-700 dark:text-slate-200 border border-slate-300/50 dark:border-white/10"
              title="Toggle Language (English / हिंदी)"
            >
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-emerald-950/5 dark:bg-white/10 hover:bg-emerald-950/10 dark:hover:bg-white/20 transition border border-slate-300/50 dark:border-white/10"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Export Dossier Button */}
            <button
              onClick={onExportReport}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-dark hover:bg-brand-light text-white transition shadow-md shadow-emerald-900/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>{t('exportReport')}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs Bar */}
        <div className="flex space-x-1 overflow-x-auto pb-3 pt-1 scrollbar-none border-t border-slate-200/40 dark:border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-brand-dark text-white dark:bg-emerald-600 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-900/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
