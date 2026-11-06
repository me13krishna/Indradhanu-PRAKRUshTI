import React from 'react';
import { ShieldCheck, Heart, Award, CheckCircle2, Database, Binary, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language, t } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn font-sans space-y-8">
      
      {/* Hero Header Banner with Official Artwork */}
      <div className="card-paper rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-900/10 dark:border-white/10 relative overflow-hidden text-center flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src="/logo.jpg"
            alt="PRAKRUshTI Official Artwork"
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl object-cover shadow-2xl ring-4 ring-emerald-600/30 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10 dark:ring-white/20 pointer-events-none" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          PRAKRUshTI
        </h1>
        <p className="text-sm font-devanagari text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
          {isHi ? 'प्रकृति (प्रकृति, Nature) + सृष्टि (सृष्टि, Creation)' : 'Prakruti (प्रकृति, Nature) + Srishti (सृष्टि, Creation)'}
        </p>
        <p className="text-base sm:text-lg font-serif italic text-slate-600 dark:text-slate-300 mt-4 max-w-xl mx-auto">
          "One Earth. One ecosystem. One shared responsibility."
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            Indradhanu 2026 — PCCOE International Grand Challenge
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            Theme: AI for Climate Change & Planetary Resilience
          </span>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <Heart className="w-6 h-6 text-rose-500" />
          <span>{isHi ? 'दृष्टिकोण एवं उद्देश्य' : 'Vision & Mission'}</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {isHi
            ? 'PRAKRUshTI बिखरे हुए पर्यावरणीय आंकड़ों को एक पारदर्शी, समझने योग्य उत्तर में बदलता है: "इस स्थान का पारिस्थितिक स्वास्थ्य अभी कैसा है?"'
            : 'PRAKRUshTI synthesizes fragmented Earth observations into a single transparent answer: "How healthy is this ecosystem right now?"'}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          {isHi
            ? 'आज पर्यावरणीय जानकारी मौसम ऐप्स, एक्यूआई ट्रैकर और आपदा चेतावनी फीड्स में बंटी हुई है। PRAKRUshTI पंचमहाभूत के पांच शास्त्रीय तत्वों के माध्यम से वैज्ञानिक चरों का एक समग्र, व्याख्यात्मक और गणितीय रूप से सत्यापित विश्लेषण प्रदान करता है।'
            : 'Environmental data is scattered across numerical weather models, chemical dispersion trackers, and seismic feeds. PRAKRUshTI provides the interpretation layer, organizing verified telemetry under the Panch Mahabhuta taxonomy with sub-additive mathematical rigor.'}
        </p>
      </div>

      {/* Architectural Pillars & Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Data Lineage & Provenance */}
        <div className="card-paper rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-white/10 space-y-3">
          <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>{isHi ? 'डेटा स्रोत एवं प्रामाणिकता' : 'Data Lineage & Telemetry Feeds'}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isHi
              ? 'सभी मौसमी एवं वायुमंडलीय इनपुट खुले वैज्ञानिक मंचों से प्राप्त किए जाते हैं:'
              : 'All telemetry is ingested via open, verified international scientific repositories:'}
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>ECMWF IFS & GFS:</strong> Ingested via Open-Meteo API for surface temperature, humidity, rainfall, wind.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Copernicus CAMS:</strong> Atmospheric chemistry for PM2.5, PM10, ozone, and toxic gases.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>USGS GSN:</strong> Global Seismographic Network for tectonic events within 500 km.</span>
            </li>
          </ul>
        </div>

        {/* Mathematical Methodology */}
        <div className="card-paper rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-white/10 space-y-3">
          <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Binary className="w-5 h-5 text-emerald-600" />
            <span>{isHi ? 'p=0.5 उप-योगात्मक गणित' : 'p=0.5 Sub-Additive Scoring'}</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isHi
              ? 'साधारण अंकगणितीय औसत किसी एक तत्व के विनाश को दूसरे के अच्छे अंकों से छिपा देता है। हमारा p=0.5 पावर माध्य यह सुनिश्चित करता है कि यदि वायु या जल गंभीर संकट में है, तो कुल स्कोर भारी रूप से गिरेगा।'
              : 'A simple arithmetic average allows high scores in one domain to mask catastrophic failure in another. PRAKRUshTI employs the p=0.5 generalized power mean, ensuring acute toxicity or desiccation heavily penalizes composite planetary health.'}
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            S<sub>prakruti</sub> = ( ∑ 0.20 · S<sub>i</sub><sup>0.5</sup> )<sup>2</sup>
          </div>
        </div>

      </div>

      {/* Guiding Principles */}
      <div className="card-paper rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-white/10 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <Award className="w-6 h-6 text-amber-500" />
          <span>{isHi ? 'मार्गदर्शक सिद्धांत' : 'Core Principles & Limitations'}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>One Earth Global Scope</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Accepts any latitude/longitude coordinate pair or named location worldwide via geocoding.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Deterministic Expert Assistant</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Not a generative black-box LLM. Operates as a deterministic rule-based expert system grounded in physical thresholds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Soil Moisture is a Proxy</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              0–1 cm topsoil moisture is a skin reanalysis estimate, not an in-situ agricultural root-zone probe.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Vasudhaiva Kutumbakam</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              "The Earth is one family." Dedicated to open science and global climate resilience education.
            </p>
          </div>
        </div>
      </div>

      {/* Honest Framing & Scientific Disclaimer */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 space-y-2">
        <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>{isHi ? 'ईमानदार वैज्ञानिक प्रकटीकरण एवं अस्वीकरण' : 'Scientific Transparency & Scope Disclaimer'}</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed font-sans">
          {t('disclaimerText')}
        </p>
      </div>

    </div>
  );
};
