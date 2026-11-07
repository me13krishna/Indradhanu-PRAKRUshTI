import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, BarChart2, Globe, MapPin, Sliders, Sparkles } from 'lucide-react';

export const Scene06Vision: React.FC = () => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const isHi = language === 'hi';

  const modules = [
    {
      titleEn: 'Panch Mahabhuta Console',
      titleHi: 'पंचमहाभूत डैशबोर्ड',
      icon: BarChart2,
      descEn: 'Inspect 0–100 composite balance, live telemetry strips, and explainable AI insights.',
      descHi: '०-१०० समग्र स्कोर, सजीव मौसम स्ट्रिप और व्याख्यात्मक AI रिपोर्ट देखें।',
    },
    {
      titleEn: 'Dual-Location Compare',
      titleHi: 'तुलनात्मक विश्लेषण',
      icon: Sliders,
      descEn: 'Compare two global cities side-by-side across all five elemental dimensions.',
      descHi: 'विश्व के किन्हीं भी दो शहरों की पर्यावरणीय स्थिति की साथ-साथ तुलना करें।',
    },
    {
      titleEn: 'Global Planetary Hotspots',
      titleHi: 'वैश्विक हॉटस्पॉट मानचित्र',
      icon: MapPin,
      descEn: 'Interactive world map tracking the healthiest and most stressed ecological biomes.',
      descHi: 'इंटरएक्टिव विश्व मानचित्र पर सर्वाधिक स्वस्थ और संकटग्रस्त बायोम देखें।',
    },
    {
      titleEn: 'Climate What-If Simulator',
      titleHi: 'जलवायु सिमुलेटर',
      icon: Globe,
      descEn: 'Simulate hypothetical +°C heatwaves, severe droughts, and particulate pollution surges.',
      descHi: 'काल्पनिक तापमान वृद्धि, सूखा और प्रदूषण के प्रभावों का त्वरित सिमुलेशन।',
    },
  ];

  return (
    <section
      id="vision"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300"
      aria-label="Chapter 06: Vision and Planetary Stewardship"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono mb-4">
            <span className="font-bold">06</span>
            <span>•</span>
            <span>{isHi ? 'दृष्टिकोण एवं संकल्प' : 'Vision & Planetary Stewardship'}</span>
          </div>

          <h2 className="text-fluid-title font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {isHi ? (
              <>
                अवलोकन से क्रियान्वयन तक, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                  वसुधैव कुटुम्बकम् का संकल्प।
                </span>
              </>
            ) : (
              <>
                From Telemetry to Stewardship. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                  One Earth. One Shared Equilibrium.
                </span>
              </>
            )}
          </h2>

          <p className="text-fluid-sub text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-balance">
            {isHi
              ? 'प्रकृति केवल एक सॉफ्टवेयर नहीं—यह पृथ्वी के साथ हमारे संबंध को पुनर्परिभाषित करने का एक विनम्र प्रयास है। प्राचीन ज्ञान और आधुनिक विज्ञान का यह मिलन हमें सचेत और जिम्मेदार बनाता है।'
              : 'PRAKRUSHTI is more than climate software. It is a philosophy that reconnects humanity with the fundamental elements that sustain all terrestrial life.'}
          </p>
        </div>

        {/* 4 Interactive Feature Launchers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.titleEn}
                onClick={() => navigate('/app')}
                className="group touch-target cursor-pointer p-6 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white mb-2">
                    {isHi ? mod.titleHi : mod.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {isHi ? mod.descHi : mod.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{isHi ? 'एक्सप्लोर करें' : 'Launch Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sacred Pledge & Vasudhaiva Kutumbakam Climax Callout */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#10241B] to-[#0A1812] text-white p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vasudhaiva Kutumbakam — The World is One Family</span>
            </div>

            <h3 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight">
              {isHi
                ? 'पृथ्वी का स्वास्थ्य हम सभी का साझा दायित्व है।'
                : 'Planetary Equilibrium Begins with Transparent Consciousness.'}
            </h3>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans text-balance">
              {isHi
                ? 'चाहे आप एक शोधकर्ता हों, नगर योजनाकार हों, किसान हों या जागरूक नागरिक—PRAKRUSHTI आपके हाथ में पारदर्शी और वैज्ञानिक निर्णय लेने की शक्ति देता है।'
                : 'Whether you are an urban policymaker, climate researcher, or conscious global citizen, PRAKRUSHTI empowers you with verified, deterministic environmental intelligence for any location on Earth.'}
            </p>

            {/* Main Conversion CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/app')}
                className="w-full sm:w-auto touch-target px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>{isHi ? 'प्रकृति कंसोल में प्रवेश करें' : 'Enter PRAKRUSHTI Console Now'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
