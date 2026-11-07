import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, ArrowRight, CheckCircle2, Database, Eye, Layers, Sparkles } from 'lucide-react';

interface Scene02FractureProps {
  onScrollToNext?: () => void;
}

export const Scene02Fracture: React.FC<Scene02FractureProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');
  const isHi = language === 'hi';

  const handleNextClick = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('elements');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="fracture"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300"
      aria-label="Chapter 02: The Invisible Fracture"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono mb-4">
            <span className="font-bold">02</span>
            <span>•</span>
            <span>{isHi ? 'पर्यावरणीय डेटा का संकट' : 'The Planetary Diagnostic Dilemma'}</span>
          </div>

          <h2 className="text-fluid-title font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            {isHi ? (
              <>
                अथाह डेटा, <br className="hidden sm:inline" />
                <span className="text-amber-600 dark:text-amber-400">परंतु समझ का अभाव।</span>
              </>
            ) : (
              <>
                Petabytes of Earth Data. <br className="hidden sm:inline" />
                <span className="text-amber-600 dark:text-amber-400">Zero Unified Clarity.</span>
              </>
            )}
          </h2>

          <p className="text-fluid-sub text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-balance">
            {isHi
              ? 'पृथ्वी के पास अब हजारों उपग्रह और लाखों सेंसर हैं, लेकिन वे सब अपनी अलग-अलग भाषा में बोलते हैं। एक आम नागरिक या नीति-निर्माता के लिए यह डेटा समझना असंभव हो जाता है।'
              : 'Humanity captures more atmospheric, hydrological, and seismic observations than at any point in history. Yet this telemetry remains trapped in isolated scientific silos, inaccessible to the citizens and cities who need it most.'}
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-white/5 border border-slate-300/60 dark:border-white/10">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'problem'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isHi ? 'डेटा की बिखरी दुनिया (समस्या)' : 'The Fragmented Reality'}</span>
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeTab === 'solution'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isHi ? 'प्रकृति का एकीकृत समाधान' : 'The PRAKRUSHTI Synthesis'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: The Problem (Fragmented Silos) */}
        {activeTab === 'problem' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            
            {/* Visual: Chaotic Raw JSON Telemetry */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl relative overflow-hidden font-mono text-xs text-emerald-400">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2">raw_telemetry_stream.json</span>
                </div>
                <span className="text-rose-400 flex items-center space-x-1">
                  <Database className="w-3 h-3" />
                  <span>Siloed Feeds</span>
                </span>
              </div>

              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`{
  "ecmwf_h_tessel": { "soil_moisture_0_to_1cm": 0.114, "unit": "m³/m³", "status": "severe_drought" },
  "copernicus_cams": { "pm2_5": 92.4, "pm10": 168.2, "who_exceedance": "18.4x" },
  "noaa_rothfusz": { "dry_temp_c": 38.6, "rel_humidity": 76, "calculated_hi": 52.8 },
  "usfs_fosberg": { "ffwi": 44.8, "fuel_moisture_eq": 4.2 },
  "icao_doc_7488": { "obs_press_hpa": 918.4, "altimetric_bias": "unreduced" }
}`}
              </pre>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400/90 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>What does this mean for a teacher, farmer, or urban resident? Nothing actionable.</span>
              </div>
            </div>

            {/* Explanation & The 3 Flaws */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{isHi ? '१. डेटा का बिखराव' : '1. Data Fragmentation'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'मिट्टी की नमी कृषि सर्वरों पर, वायु प्रदूषण स्वास्थ्य एजेंसियों पर और तापमान मौसम विज्ञान साइटों पर अलग-अलग रहता है।'
                    : 'Soil moisture, particulate matter, and heat stress exist on entirely isolated platforms with zero unified contextualization.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{isHi ? '२. ब्लैक-बॉक्स AI का खतरा' : '2. Black-Box Hallucinations'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'कई आधुनिक ऐप्स अनियंत्रित LLM का उपयोग करते हैं जो मनगढ़ंत संख्याएं और भ्रामक भविष्यवाणियां उत्पन्न करते हैं।'
                    : 'Unregulated LLMs invent statistics and hallucinate risk predictions without mathematical grounding.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{isHi ? '३. अवास्तविक औसत' : '3. Compensatory Arithmetic Errors'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'सरल अंकगणितीय औसत विषाक्त वायु (०/१००) को सुहावने तापमान से छिपा देता है। प्रकृति ऐसे काम नहीं करती।'
                    : 'Simple averages mask toxic air by averaging it with pleasant warmth. Ecosystems do not compensate lethal air with sunshine.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: The Solution (The PRAKRUSHTI Synthesis) */}
        {activeTab === 'solution' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            
            {/* Visual: The 5 Mahabhuta Balance Card */}
            <div className="lg:col-span-7 rounded-2xl glass-panel p-6 shadow-2xl relative border border-emerald-500/30">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PRAKRUSHTI_COMPOSITE_INDEX</span>
                </span>
                <span className="layer-scientific text-xs text-slate-500">Order p=0.5 Generalized Mean</span>
              </div>

              {/* 5 Element Bars Preview */}
              <div className="space-y-3">
                {[
                  { name: 'Prithvi (Earth / Topsoil)', score: 74, color: 'bg-[#C97B4A]' },
                  { name: 'Jal (Water / Hydrology)', score: 62, color: 'bg-[#1B6B93]' },
                  { name: 'Agni (Heat / Rothfusz Index)', score: 58, color: 'bg-[#D9822B]' },
                  { name: 'Vayu (Air / PM2.5 Purity)', score: 38, color: 'bg-[#6FA8C9]' },
                  { name: 'Akash (Atmospheric Stability)', score: 81, color: 'bg-[#7A6C9E]' },
                ].map((el) => (
                  <div key={el.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{el.name}</span>
                      <span className="font-mono font-bold">{el.score}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${el.color}`} style={{ width: `${el.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500">Composite Prakruti Score:</span>
                <span className="text-lg font-serif font-bold text-emerald-600 dark:text-emerald-400">61 / 100 (Moderate Balance)</span>
              </div>
            </div>

            {/* Explanation & The 3 Breakthroughs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span>{isHi ? '१. पंचमहाभूत संश्लेषण' : '1. Panch Mahabhuta Synthesis'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'प्राचीन समग्र पारिस्थितिकी और आधुनिक उपग्रह मेट्रिक्स का वैज्ञानिक मिलन।'
                    : 'Aggregates multi-dimensional satellite observations into five intuitive ecological pillars.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{isHi ? '२. शून्य-प्रतिपूरक गणित' : '2. Non-Compensatory Mathematics'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'भारित सामान्यीकृत माध्य (Order p=0.5) यह सुनिश्चित करता है कि गंभीर वायु प्रदूषण छिप न सके।'
                    : 'Order p=0.5 generalized mean penalizes acute stress in any single element, ensuring severe smog cannot hide.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-emerald-500" />
                  <span>{isHi ? '३. १००% पारदर्शी प्रमाण' : '3. Provenance & Attribution'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'प्रत्येक स्कोर का स्रोत और सीमांत योगदान (Δi) स्पष्ट रूप से दृश्यमान है।'
                    : 'Every sub-metric has explicit data provenance (ECMWF, USGS, WMO) and directional delta attribution.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Verified Scientific Citations Bar */}
        <div className="mt-14 pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
              [UNEP GEO-7 REPORT 2024]
            </span>
            <p className="italic">
              &quot;Environmental decision-making is severely constrained by non-standardized sensor vocabularies and fragmented telemetry architectures.&quot;
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
            <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold block mb-1">
              [IPCC AR6 WG-II CH. 16]
            </span>
            <p className="italic">
              &quot;Compound climate risks cannot be evaluated via single-variable metrics. Integrated, non-compensatory hazard frameworks are urgently required.&quot;
            </p>
          </div>
        </div>

        {/* Scene 02 to Scene 03 Transition Link */}
        <div className="mt-12 text-center">
          <button
            onClick={handleNextClick}
            className="touch-target inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <span>{isHi ? 'अध्याय ३: पंचमहाभूत का अन्वेषण करें' : 'Explore Chapter 03: The Five Elements'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

