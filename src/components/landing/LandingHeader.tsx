import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Globe, Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  onNavigateStory: (anchorId: string) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onNavigateStory }) => {
  const { navigate } = useRouter();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'challenge', labelEn: 'The Challenge', labelHi: 'पर्यावरणीय चुनौती' },
    { id: 'methodology', labelEn: 'Our Approach', labelHi: 'कार्यप्रणाली' },
    { id: 'framework', labelEn: 'Five Elements', labelHi: 'पंचमहाभूत' },
    { id: 'foundation', labelEn: 'Scientific Foundation', labelHi: 'वैज्ञानिक आधार' },
    { id: 'preview', labelEn: 'Platform Preview', labelHi: 'प्लेटफ़ॉर्म झलक' },
  ];

  const handleAnchorClick = (id: string) => {
    onNavigateStory(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/95 dark:bg-charcoal/95 border-b border-emerald-900/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="PRAKRUshTI Official Logo"
              className="w-11 h-11 rounded-xl object-cover shadow-md shadow-emerald-900/20 ring-2 ring-emerald-500/40 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/20 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark dark:text-emerald-400 group-hover:text-emerald-600 transition-colors">
                PRAKRUshTI
              </span>
              <span className="font-devanagari text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
                (प्रकृति)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans hidden md:block">
              {language === 'hi'
                ? 'पंचमहाभूत पर्यावरणीय बुद्धिमत्ता मंच'
                : 'Panch Mahabhuta Environmental Intelligence'}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleAnchorClick(link.id)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              {language === 'hi' ? link.labelHi : link.labelEn}
            </button>
          ))}
        </nav>

        {/* Desktop Utility Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/5 dark:bg-white/10 hover:bg-emerald-950/10 dark:hover:bg-white/20 transition text-slate-700 dark:text-slate-200 border border-slate-300/50 dark:border-white/10"
            title="Toggle Language (English / हिंदी)"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Skip to platform link */}
          <button
            onClick={() => navigate('/app')}
            className="text-xs font-mono font-medium text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 transition px-2 py-1"
          >
            {language === 'hi' ? 'सीधे प्लेटफ़ॉर्म' : 'Skip to platform'}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/app')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-dark hover:bg-brand-light text-white shadow-md shadow-emerald-900/20 flex items-center space-x-1.5 transition active:scale-95"
          >
            <span>{language === 'hi' ? 'प्लेटफ़ॉर्म खोलें' : 'Explore Platform'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => navigate('/app')}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-dark text-white flex items-center space-x-1"
          >
            <span>{language === 'hi' ? 'ऐप' : 'App'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-emerald-950/5 dark:bg-white/10 text-slate-700 dark:text-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-white/10 bg-paper dark:bg-charcoal px-4 py-4 space-y-3 animate-fadeIn">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleAnchorClick(link.id)}
                className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                {language === 'hi' ? link.labelHi : link.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-white/10 text-slate-700 dark:text-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'हिंदी में पढ़ें' : 'Read in English'}</span>
            </button>

            <button
              onClick={() => navigate('/app')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-dark text-white flex items-center space-x-1.5 shadow-md"
            >
              <span>{language === 'hi' ? 'प्लेटफ़ॉर्म पर जाएँ' : 'Enter Platform'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
