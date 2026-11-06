import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Landing Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/90 dark:bg-charcoal/90 border-b border-emerald-900/10 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo.jpg"
              alt="PRAKRUshTI Official Logo"
              className="w-11 h-11 rounded-xl object-cover shadow-md ring-2 ring-emerald-500/40"
            />
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark dark:text-emerald-400">
                PRAKRUshTI
              </span>
              <span className="text-[10px] font-devanagari text-slate-500 dark:text-slate-400 ml-2">
                (प्रकृति)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/5 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-300/50 dark:border-white/10"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            <button
              onClick={() => navigate('/app')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-dark hover:bg-brand-light text-white shadow-md flex items-center space-x-1.5 transition active:scale-95"
            >
              <span>{language === 'hi' ? 'प्लेटफ़ॉर्म पर जाएँ' : 'Enter Platform'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Intro Section (Scaffold for Phase 2) */}
      <main className="max-w-5xl mx-auto px-4 py-24 text-center my-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PANCH MAHABHUTA · ENVIRONMENTAL INTELLIGENCE</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-6">
          Understand the environment. <br className="hidden sm:inline" />
          <span className="text-brand-dark dark:text-emerald-400">See the bigger picture.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed mb-10">
          PRAKRUshTI brings environmental information together through a structured, data-driven framework to help interpret the conditions shaping our natural world.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold bg-brand-dark hover:bg-brand-light text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center space-x-2 transition active:scale-95"
          >
            <span>Explore PRAKRUshTI</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-white/80 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition"
          >
            Skip to platform
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 dark:border-white/10 py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <p>Vasudhaiva Kutumbakam — Built for Indradhanu PCCOE International Grand Challenge 2026</p>
      </footer>
    </div>
  );
};
