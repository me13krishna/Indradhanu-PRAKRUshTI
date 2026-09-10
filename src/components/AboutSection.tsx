import React from 'react';
import { ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn font-sans">
      
      {/* Hero Header */}
      <div className="card-paper rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-900/10 dark:border-white/10 mb-8 relative overflow-hidden text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-dark to-emerald-800 flex items-center justify-center text-white font-serif font-extrabold text-3xl mx-auto mb-4 shadow-xl">
          प्र
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          PRAKRUshTI
        </h1>
        <p className="text-sm font-devanagari text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
          Prakruti (प्रकृति, Nature) + Srishti (सृष्टि, Creation)
        </p>
        <p className="text-base font-serif italic text-slate-600 dark:text-slate-300 mt-4 max-w-xl mx-auto">
          "One Earth. One ecosystem. One shared responsibility."
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
            Indradhanu PCCOE Grand Challenge 2026
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300">
            Theme: AI for Climate Change
          </span>
        </div>
      </div>

      {/* Core Philosophy Section */}
      <div className="space-y-6">
        <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
          <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <span>Vision & Mission</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            PRAKRUshTI turns fragmented environmental data into a single, intuitive answer to the question no existing tool answers well: <strong>"How healthy is this place — right now?"</strong>
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mt-3">
            Environmental information today is scattered across weather apps, AQI trackers, disaster-alert feeds, and climate research portals. Each is data-rich but insight-poor. PRAKRUshTI serves as the missing interpretation layer — translating complex earth observation feeds into the universal 5-element Panch Mahabhuta framework.
          </p>
        </div>

        {/* Competition & Guiding Principles */}
        <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10">
          <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Guiding Principles</span>
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>One Earth:</strong> Built for the entire planet. Accepts any lat/long or place name worldwide.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Software-Only & Scalable:</strong> Pure software, zero hardware/IoT sensor dependency, lightweight public API data pipeline.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Grounded AI:</strong> AI engine only interprets supplied real numbers and never invents invented metrics.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Vasudhaiva Kutumbakam:</strong> Embodies the ancient ethos — "The world is one family".</span>
            </li>
          </ul>
        </div>

        {/* Transparency Disclaimer */}
        <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/40">
          <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-sm mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Honest Framing & Transparency Disclaimer</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed font-sans">
            {t('disclaimerText')}
          </p>
        </div>
      </div>
    </div>
  );
};
