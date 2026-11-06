import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Database, CheckCircle2, GitMerge, Cpu, BarChart3, ArrowRight } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const steps = [
    {
      step: '01',
      icon: Database,
      titleEn: 'Multi-Source Telemetry Ingestion',
      titleHi: 'बहु-स्रोत टेलीमेट्री अंतर्ग्रहण',
      sourceEn: 'ECMWF IFS · Open-Meteo · USGS GSN · Copernicus CAMS',
      sourceHi: 'ईसीएमडब्ल्यूएफ · ओपन-मेटियो · यूएसजीएस · कॉपरनिकस',
      descEn:
        'Live ingestion of real-world physical observations: 2m temperature, relative humidity, 24h precipitation, 10m wind & gusts, solar flux, UV index, mean sea level pressure, surface skin soil moisture (0–1 cm proxy), gaseous & particulate pollutants, and tectonic events within 500 km.',
      descHi:
        'वास्तविक भौतिक आंकड़ों का प्रत्यक्ष अंतर्ग्रहण: २ मीटर तापमान, सापेक्ष आर्द्रता, २४ घंटे की वर्षा, हवा की गति व झोंके, सौर विकिरण, यूवी सूचकांक, समुद्र तल दबाव, ऊपरी मिट्टी की नमी (०-१ सेमी प्रॉक्सी), वायु प्रदूषक और ५०० किमी के दायरे में भूकंपीय हलचल।',
    },
    {
      step: '02',
      icon: CheckCircle2,
      titleEn: 'Quality Control & Range Validation',
      titleHi: 'डेटा सत्यापन एवं भौतिक सीमा जांच',
      sourceEn: 'Deterministic Boundary Checks & Fallbacks',
      sourceHi: 'भौतिक सीमा सत्यापन एवं बैकअप प्रणाली',
      descEn:
        'Every telemetry feed is verified against thermodynamic and physical boundaries (e.g. relative humidity clamped between 0–100%, pressure anomaly bounded). Missing fields trigger transparent fallback flags without fabricating observations.',
      descHi:
        'प्रत्येक टेलीमेट्री फीड की भौतिक व थर्मोडायनामिक सीमाओं के तहत जांच की जाती है (जैसे आर्द्रता ०–१००% के बीच, दबाव सीमा)। डेटा अनुपलब्ध होने पर बिना मनगढ़ंत आंकड़े गढ़े पारदर्शी रूप से बैकअप फ्लैग सक्रिय होता है।',
    },
    {
      step: '03',
      icon: GitMerge,
      titleEn: 'Panch Mahabhuta Framework Mapping',
      titleHi: 'पंचमहाभूत वैज्ञानिक मानचित्रण',
      sourceEn: 'Prithvi · Jal · Agni · Vayu · Akash',
      sourceHi: 'पृथ्वी · जल · अग्नि · वायु · आकाश',
      descEn:
        'Observed parameters are categorized into the five foundational elements: Prithvi (soil & ground stability), Jal (hydrological balance), Agni (thermal stress & fire weather), Vayu (air quality & wind dynamics), and Akash (atmospheric pressure & solar UV flux).',
      descHi:
        'भौतिक मापदंडों को पांच आधारभूत तत्वों में वर्गीकृत किया जाता है: पृथ्वी (मिट्टी की नमी व भू-स्थिरता), जल (जल संतुलन), अग्नि (तापीय तनाव व दावानल मौसम), वायु (वायु गुणवत्ता व गतिशीलता), और आकाश (वायुमंडलीय दबाव व सौर विकिरण)।',
    },
    {
      step: '04',
      icon: Cpu,
      titleEn: 'Non-Linear Compound Formulations',
      titleHi: 'गैर-रेखीय संयुक्त सूत्र एवं मॉडलिंग',
      sourceEn: 'Rothfusz Heat Index · Fosberg FWI Proxy · EPA AQI Ceilings',
      sourceHi: 'रोथफस हीट इंडेक्स · फॉसबर्ग एफडब्ल्यूआई · एक्यूआई सीमाएं',
      descEn:
        'Physical metrics are transformed into 0–100 vitality scores using peer-reviewed compound formulations. Severe single-pollutant spikes (PM2.5 > 150 µg/m³) activate mathematical ceiling caps to prevent misleadingly positive scores.',
      descHi:
        'भौतिक मापों को वैज्ञानिक संयुक्त सूत्रों द्वारा ०–१०० के स्वास्थ्य सूचकांक में बदला जाता है। अत्यधिक प्रदूषक स्तर (PM2.5 > १५० µg/m³) होने पर स्कोरिंग सीलिंग सक्रिय हो जाती है ताकि गंभीर संकट छिप न सके।',
    },
    {
      step: '05',
      icon: BarChart3,
      titleEn: 'Sub-Additive Synthesis & Explainability',
      titleHi: 'उप-योगात्मक संश्लेषण एवं व्याख्यात्मक रिपोर्ट',
      sourceEn: 'p = 0.5 Generalized Mean · Deterministic Attribution',
      sourceHi: 'p = 0.5 जनरलाइज्ड माध्य · स्पष्ट कारण विश्लेषण',
      descEn:
        'Elemental scores are synthesized using the p=0.5 power mean: any critically collapsed element drastically penalizes the total Prakruti Score. Deterministic rule-based explainability attributes exact points lost to specific environmental drivers.',
      descHi:
        'तत्व स्कोर को p=0.5 पावर माध्य से संयोजित किया जाता है: यदि कोई एक तत्व गंभीर रूप से संकटग्रस्त है, तो वह कुल प्रकृति स्कोर को तीव्रता से घटाता है। स्पष्ट नियम-आधारित प्रणाली बताती है कि किस तत्व के कारण कितने अंक घटे।',
    },
  ];

  return (
    <section id="methodology" className="py-20 bg-white dark:bg-charcoal scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>{isHi ? 'अध्याय ०२ · प्रणाली संरचना एवं कार्यप्रणाली' : 'Chapter 02 · Methodology & Pipeline'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isHi
              ? 'कच्चे उपग्रह एवं मौसमी आंकड़ों से पारदर्शी पारिस्थितिक निर्णय तक'
              : 'From Raw Planetary Observations to Auditable Decision Support'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'PRAKRUshTI का ५-चरणीय कम्प्यूटेशनल ढांचा हर पर्यावरणीय चर को भौतिक सत्यापन, संयुक्त मॉडलिंग और पारदर्शी उप-योगात्मक गणित के माध्यम से संसाधित करता है।'
              : 'Our 5-stage computational pipeline processes each physical variable through boundary validation, peer-reviewed compound formulas, and transparent sub-additive mathematics.'}
          </p>
        </div>

        {/* 5-Step Vertical / Horizontal Flow */}
        <div className="mt-16 space-y-4 sm:space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-paper dark:bg-charcoal-card p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Step Number & Icon */}
                  <div className="lg:col-span-4 flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center font-mono font-bold text-base shadow-md">
                      {s.step}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          {isHi ? `चरण ${s.step}` : `Phase ${s.step}`}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {isHi ? s.titleHi : s.titleEn}
                      </h3>
                      <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {isHi ? s.sourceHi : s.sourceEn}
                      </div>
                    </div>
                  </div>

                  {/* Step Description */}
                  <div className="lg:col-span-8 flex items-center">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {isHi ? s.descHi : s.descEn}
                    </p>
                  </div>

                </div>

                {/* Arrow connector between steps (except last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-3.5 left-10 z-10">
                    <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-charcoal border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mathematical Equation Spotlight Box */}
        <div className="mt-12 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-emerald-500/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                {isHi ? 'गणितीय सूत्र: उप-योगात्मक घात माध्य' : 'Mathematical Formulation: Generalized Power Mean'}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {isHi ? 'प्रकृति सूचकांक (p = 0.5)' : 'The Prakruti Score Equation (p = 0.5)'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {isHi
                  ? 'साधारण अंकगणितीय औसत किसी एक तत्व के गंभीर संकट को अन्य तत्वों के अच्छे अंकों के पीछे छिपा देता है। p=0.5 का उपयोग यह सुनिश्चित करता है कि यदि वायु या जल अत्यंत प्रदूषित या विषैला है, तो कुल स्कोर भारी रूप से गिरेगा।'
                  : 'An arithmetic mean permits a high score in one element to compensate for total collapse in another. By utilizing the p=0.5 sub-additive generalized mean, severe degradation in any single element (e.g. hazardous air quality) penalizes the composite score heavily, eliminating false optimism.'}
              </p>
            </div>

            <div className="lg:col-span-5 bg-black/40 rounded-xl p-5 border border-white/10 text-center font-mono">
              <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Equation</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-300 py-2 overflow-x-auto">
                S<sub>prakruti</sub> = ( ∑ w<sub>i</sub> · S<sub>i</sub><sup>0.5</sup> )<sup>2</sup>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                w<sub>i</sub> = 0.20 each · ∑ w<sub>i</sub> = 1.0 · S<sub>i</sub> ∈ [0, 100]
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
