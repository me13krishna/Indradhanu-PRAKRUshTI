import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Compass, ShieldCheck, Activity, Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSection }) => {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const isHi = language === 'hi';

  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Subtle organic background gradient accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Narrative & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Scientific & Elemental Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/5 dark:bg-emerald-400/10 border border-emerald-900/15 dark:border-emerald-400/20 text-emerald-900 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono font-semibold tracking-wide uppercase">
                {isHi ? 'पंचमहाभूत पर्यावरणीय बुद्धिमत्ता मंच' : 'Panch Mahabhuta Environmental Intelligence'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {isHi ? (
                <>
                  प्राचीन <span className="text-emerald-700 dark:text-emerald-400 italic">पंचमहाभूत</span> दर्शन और आधुनिक जलवायु विज्ञान का संगम।
                </>
              ) : (
                <>
                  Where Ancient Elemental Wisdom Meets <span className="text-emerald-700 dark:text-emerald-400 italic">Modern Climate Science</span>.
                </>
              )}
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              {isHi
                ? 'PRAKRUshTI पृथ्वी, जल, अग्नि, वायु और आकाश के वैज्ञानिक मापदंडों का पारदर्शी विश्लेषण कर ग्रह के पारिस्थितिक स्वास्थ्य का प्रामाणिक मूल्यांकन प्रस्तुत करता है।'
                : 'PRAKRUshTI synthesizes real planetary observations across Earth, Water, Fire, Air, and Space into transparent, mathematically sound ecological resilience intelligence.'}
            </p>

            {/* Provenance Micro-Disclosure */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="inline-flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ECMWF IFS / CAMS via Open-Meteo</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>USGS GSN Seismic Telemetry</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>p=0.5 Sub-Additive Scoring</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/app')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-brand-dark hover:bg-brand-light text-white shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                <span>{isHi ? 'लाइव प्लेटफ़ॉर्म खोलें' : 'Launch Live Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onScrollToSection('challenge')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-charcoal-card hover:bg-emerald-50/50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/15 shadow-sm transition-all"
              >
                <span>{isHi ? 'वैज्ञानिक रूपरेखा समझें' : 'Explore Framework'}</span>
              </button>
            </div>

            {/* Skip Direct Link */}
            <div className="pt-1">
              <button
                onClick={() => navigate('/app')}
                className="text-xs font-mono text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 underline underline-offset-4 transition"
              >
                {isHi ? 'प्रस्तुति छोड़ें और सीधे इंटरफ़ेस पर जाएँ →' : 'Skip narrative and proceed straight to app →'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Telemetry Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white dark:bg-charcoal-card p-6 shadow-xl border border-slate-200/80 dark:border-white/10 space-y-5">
              
              {/* Card Header: Live Sample Indicator */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                      {isHi ? 'सक्रिय पर्यावरणीय विश्लेषण' : 'Active Ecological Telemetry'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isHi ? 'नई दिल्ली (28.61° N, 77.20° E)' : 'New Delhi, India (28.61° N, 77.20° E)'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
                    68<span className="text-xs font-mono text-slate-400">/100</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                    {isHi ? 'प्रकृति सूचकांक' : 'Prakruti Score'}
                  </span>
                </div>
              </div>

              {/* 5 Elemental Mini-Bars */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>{isHi ? 'पंचमहाभूत संतुलन' : 'Five Elements Balance'}</span>
                  <span className="text-[11px] font-mono text-slate-500">p=0.5 Sub-Additive Mean</span>
                </div>

                {/* Prithvi */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>{isHi ? 'पृथ्वी (Earth)' : 'Prithvi (Earth)'}</span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400">62/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '62%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>Skin Moisture Proxy: 0.18 m³/m³</span>
                    <span>Seismic Risk: Stable (M0)</span>
                  </div>
                </div>

                {/* Jal */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>{isHi ? 'जल (Water)' : 'Jal (Water)'}</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-400">74/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '74%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>24h Precip: 0.0 mm</span>
                    <span>Humidity: 48%</span>
                  </div>
                </div>

                {/* Agni */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>{isHi ? 'अग्नि (Fire/Thermal)' : 'Agni (Fire)'}</span>
                    <span className="font-semibold text-orange-700 dark:text-orange-400">70/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-orange-600 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>Temp: 28.4°C</span>
                    <span>NOAA Heat Index: 29.1°C</span>
                  </div>
                </div>

                {/* Vayu */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>{isHi ? 'वायु (Air)' : 'Vayu (Air)'}</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">45/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>PM2.5: 82 µg/m³ (WHO capped)</span>
                    <span>AQI Stress: Elevated</span>
                  </div>
                </div>

                {/* Akash */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
                    <span>{isHi ? 'आकाश (Space/Atmosphere)' : 'Akash (Space)'}</span>
                    <span className="font-semibold text-purple-700 dark:text-purple-400">82/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '82%' }} />
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>UV Index: 5.2 (Moderate)</span>
                    <span>Pressure: 1012 hPa</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Transparent Attribution */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-mono">Governed by p=0.5 penalization</span>
                <button
                  onClick={() => navigate('/app')}
                  className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center space-x-1"
                >
                  <span>{isHi ? 'विश्लेषण देखें' : 'View in App'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="pt-12 text-center hidden md:block">
          <button
            onClick={() => onScrollToSection('challenge')}
            className="inline-flex flex-col items-center text-xs font-mono text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
          >
            <span>{isHi ? 'नीचे स्क्रॉल करें' : 'Scroll to explore the science'}</span>
            <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
