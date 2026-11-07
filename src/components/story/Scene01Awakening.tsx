import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ProceduralLandscape } from './ProceduralLandscape';
import { ParticleCanvas } from './ParticleCanvas';
import { ArrowDown, ArrowRight, ShieldCheck, Activity, Satellite } from 'lucide-react';

interface Scene01AwakeningProps {
  onScrollToNext?: () => void;
}

export const Scene01Awakening: React.FC<Scene01AwakeningProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const isHi = language === 'hi';

  const handleNextClick = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('fracture');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="awakening"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Chapter 01: The Awakening"
    >
      {/* Background Procedural SVG Mountain Ridge & Ambient Living Particles */}
      <ProceduralLandscape />
      <ParticleCanvas density="medium" theme="ambient" />

      {/* Atmospheric Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Top Telemetry & Provenance Badge */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-4 sm:pt-8 text-center animate-fadeIn">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-black/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Satellite className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-[11px] font-mono tracking-tight text-emerald-200">
            {isHi
              ? 'सजीव टेलीमेट्री: ECMWF IFS • Open-Meteo • USGS'
              : 'Global Multi-Source Telemetry Assimilation • ECMWF · Open-Meteo · USGS'}
          </span>
        </div>
      </div>

      {/* Hero Narrative Core */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto py-6 sm:py-10">
        
        {/* Cultural Lens: Sacred Ecological Foundation */}
        <div className="mb-4">
          <p className="layer-cultural text-amber-300/90 text-sm sm:text-base md:text-lg italic font-medium tracking-wide">
            {isHi ? '॥ वसुधैव कुटुम्बकम् — प्रकृति और सृष्टि का शाश्वत संतुलन ॥' : 'Vasudhaiva Kutumbakam — One Earth. One Living Equilibrium.'}
          </p>
        </div>

        {/* Cinematic Headline with Fluid Clamp */}
        <h1 className="text-fluid-hero font-serif font-bold text-white tracking-tight leading-[1.08] drop-shadow-md mb-6">
          {isHi ? (
            <>
              पृथ्वी का संपूर्ण स्वास्थ्य, <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                एक एकीकृत वैज्ञानिक दृष्टि में।
              </span>
            </>
          ) : (
            <>
              Planetary Health, <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Synthesized in Real-Time.
              </span>
            </>
          )}
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-fluid-sub text-slate-200/90 max-w-3xl mx-auto font-sans leading-relaxed mb-8 sm:mb-10 text-balance">
          {isHi
            ? 'लाखों अलग-थलग उपग्रह सेंसरों, वायु गुणवत्ता स्टेशनों और भूभौतिकीय डेटा को पंचमहाभूत (पृथ्वी, जल, अग्नि, वायु, आकाश) के माध्यम से एक पारदर्शी समग्र सूचकांक में समझना।'
            : 'Translating millions of fragmented satellite sensors, hydrological forecasts, and atmospheric observations into an intuitive, explainable composite index grounded in the five primordial elements.'}
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={handleNextClick}
            className="w-full sm:w-auto touch-target px-6 py-3.5 rounded-full glass-pill hover:bg-white/20 dark:hover:bg-white/10 text-white font-semibold text-sm border border-white/20 shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 group"
          >
            <span>{isHi ? 'यात्रा आरंभ करें' : 'Discover the Story'}</span>
            <ArrowDown className="w-4 h-4 text-emerald-300 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto touch-target px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 group"
          >
            <span>{isHi ? 'सीधे कंसोल खोलें' : 'Open Live Platform'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Verification Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300/80 gap-3">
        <div className="flex items-center space-x-2 layer-scientific">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{isHi ? 'शून्य ब्लैक-बॉक्स: १००% व्याख्यात्मक' : 'Zero Black-Box: 100% Deterministic & Explainable'}</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-300/70">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>WHO & WMO Benchmarked</span>
          </div>
          <span>•</span>
          <span>Zero API Keys Required</span>
        </div>
      </div>
    </section>
  );
};
