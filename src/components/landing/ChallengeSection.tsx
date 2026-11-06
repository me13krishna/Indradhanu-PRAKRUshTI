import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Layers, Network, Scale, EyeOff, AlertTriangle } from 'lucide-react';

export const ChallengeSection: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const challenges = [
    {
      icon: Network,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40',
      tagEn: 'Systemic Interconnectedness',
      tagHi: 'पारिस्थितिक अंतर्संबंध',
      titleEn: 'Isolated Metrics Mask Cascading Ecological Strain',
      titleHi: 'अलग-थलग मापदंड व्यापक संकट को छिपाते हैं',
      descEn:
        'A single heatwave evaporates topsoil moisture, starves root zones, increases wildfire susceptibility, and traps stagnant particulate matter. Conventional dashboards monitor these as unrelated numbers, missing the compound ecological degradation.',
      descHi:
        'अत्यधिक तापमान मिट्टी की नमी सोख लेता है, वनस्पति को कमजोर करता है, दावानल का खतरा बढ़ाता है और प्रदूषकों को वायु में फंसा देता है। पारंपरिक डैशबोर्ड इन्हें अलग-अलग आंकड़ों के रूप में देखते हैं, जिससे वास्तविक संयुक्त संकट छिप जाता है।',
    },
    {
      icon: Layers,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40',
      tagEn: 'Data Fragmentation',
      tagHi: 'डेटा विखंडन',
      titleEn: 'Observation Silos Prevent Planetary Synthesis',
      titleHi: 'विभाजित डेटा स्रोत समग्र विश्लेषण में बाधक हैं',
      descEn:
        'Surface weather stations, atmospheric reanalysis models (ECMWF IFS), chemical dispersion telemetry (CAMS), and seismic networks (USGS) operate in technological silos. Without a unified physical synthesis, holistic risk assessment is impossible.',
      descHi:
        'सतही मौसम केंद्र, वायुमंडलीय पुनर्विश्लेषण मॉडल, रासायनिक प्रदूषण टेलीमेट्री और भूकंपीय नेटवर्क अलग-अलग संचालित होते हैं। एक एकीकृत वैज्ञानिक ढांचे के बिना समग्र जोखिम मूल्यांकन असंभव है।',
    },
    {
      icon: Scale,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40',
      tagEn: 'Contextual Interpretation',
      tagHi: 'संदर्भगत व्याख्या की कमी',
      titleEn: 'Raw Readings Deceive Without Compound Modeling',
      titleHi: 'बिना संयुक्त मॉडलिंग के सीधे आंकड़े भ्रमित करते हैं',
      descEn:
        'An ambient dry-bulb temperature of 35°C is manageable at 20% relative humidity, but lethal at 80% (producing a heat index >48°C). Raw measurements without biophysical and compound modeling give a false sense of ecological safety.',
      descHi:
        '३५°C तापमान २०% आर्द्रता में सहनीय हो सकता है, परंतु ८०% आर्द्रता में यह घातक हीट इंडेक्स (>४८°C) बन जाता है। बिना संयुक्त मॉडलिंग के एकल माप पर्यावरण की वास्तविक स्थिति पर गलत सुरक्षा का भ्रम पैदा करते हैं।',
    },
    {
      icon: EyeOff,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800/40',
      tagEn: 'Explainability Crisis',
      tagHi: 'पारदर्शिता का संकट',
      titleEn: 'Black-Box AI Models Lack Scientific Auditability',
      titleHi: 'ब्लैक-बॉक्स एआई में वैज्ञानिक जवाबदेही का अभाव',
      descEn:
        'Opaque machine learning models spit out climate indices without verifiable mathematical steps. Policymakers and resilience planners cannot stake human lives on unverifiable weights. Environmental scoring must be mathematically transparent and reproducible.',
      descHi:
        'पारंपरिक मशीन लर्निंग मॉडल बिना स्पष्ट गणना के परिणाम दे देते हैं। वैज्ञानिक और नीति-निर्माता अस्पष्ट सूत्रों पर विश्वास नहीं कर सकते। पर्यावरणीय स्कोरिंग को पारदर्शी, गणितीय रूप से सत्यापित और हर कदम पर जांचने योग्य होना चाहिए।',
    },
  ];

  return (
    <section id="challenge" className="py-20 bg-slate-50/70 dark:bg-charcoal/50 border-t border-b border-slate-200/80 dark:border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isHi ? 'अध्याय ०१ · पर्यावरणीय निदान का संकट' : 'Chapter 01 · The Diagnostic Gap'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isHi
              ? 'विखंडित पर्यावरणीय आंकड़े हमें समग्र संकट से क्यों अनभिज्ञ रखते हैं?'
              : 'Why Fragmented Environmental Data Fails Planetary Resilience'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'पारंपरिक जलवायु डैशबोर्ड केवल अलग-अलग संवेदकों के आंकड़े दिखाते हैं। प्रकृति एक अविभाज्य जीवंत प्रणाली है जहां एक तत्व का क्षरण अन्य सभी को प्रभावित करता है।'
              : 'Traditional climate dashboards present isolated telemetry from separate instruments. But planetary ecosystems operate as an interconnected living whole where distress in one domain cascades into all others.'}
          </p>
        </div>

        {/* 4 Challenges Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {challenges.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-charcoal-card p-7 shadow-sm hover:shadow-md transition-shadow border border-slate-200/80 dark:border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${c.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                      {isHi ? c.tagHi : c.tagEn}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {isHi ? c.titleHi : c.titleEn}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isHi ? c.descHi : c.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesis Callout Banner */}
        <div className="mt-12 rounded-2xl bg-emerald-950 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-800/40">
          <div className="relative z-10 max-w-4xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              {isHi ? 'प्रकृति का समाधान' : 'The PRAKRUshTI Resolution'}
            </span>
            <p className="text-base sm:text-lg text-emerald-100 font-sans leading-relaxed">
              {isHi
                ? 'PRAKRUshTI इस विखंडन को समाप्त करता है। यह वास्तविक पृथ्वी विज्ञान डेटा को पंचमहाभूत (पृथ्वी, जल, अग्नि, वायु, आकाश) के सार्वभौमिक ढांचे में व्यवस्थित करता है और गैर-रेखीय उप-योगात्मक गणित (p=0.5 Generalized Mean) से पूर्ण पारदर्शी विश्लेषण प्रदान करता है।'
                : 'PRAKRUshTI bridges this gap by mapping multi-source Earth telemetry to the Panch Mahabhuta framework, applying rigorous non-linear compound formulas (NOAA Heat Index, Fosberg FWI proxy, EPA/CAMS air quality) and synthesizing them through sub-additive mathematics where catastrophic degradation in any single element cannot be masked by others.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
