import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe2, Droplets, Flame, Wind, Sun, Info, CheckCircle } from 'lucide-react';

export const MahabhutaFrameworkSection: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [activeElement, setActiveElement] = useState<number>(0);

  const elements = [
    {
      id: 'prithvi',
      sanskrit: 'Prithvi',
      devanagari: 'पृथ्वी',
      domainEn: 'Earth & Ground Stability',
      domainHi: 'पृथ्वी एवं भू-स्थिरता',
      icon: Globe2,
      color: 'amber',
      accentBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20',
      tagColor: 'text-amber-700 dark:text-amber-400',
      summaryEn:
        'Governs pedosphere integrity, surface moisture retention, vegetation greenness proxy, and tectonic equilibrium.',
      summaryHi:
        'मृदा स्वास्थ्य, सतही नमी संरक्षण, वनस्पति हरियाली प्रॉक्सी और टेक्टोनिक स्थिरता का प्रतिनिधित्व करता है।',
      variablesEn: [
        'Topsoil skin moisture (0–1 cm proxy, m³/m³)',
        'Soil surface temperature (°C)',
        'Vegetation greenness index proxy',
        'Independent USGS seismic hazard monitoring',
      ],
      variablesHi: [
        'ऊपरी मिट्टी की नमी (०-१ सेमी प्रॉक्सी, m³/m³)',
        'सतही मिट्टी का तापमान (°C)',
        'वनस्पति सूचकांक प्रॉक्सी',
        'स्वतंत्र यूएसजीएस भूकंपीय निगरानी',
      ],
      methodologyEn:
        'Evaluates soil moisture against dry desiccated (<0.10) and waterlogged (>0.45) extremes. Seismic activity within 500 km is reported as an independent geophysical hazard and decoupled from the Prithvi soil vitality score.',
      methodologyHi:
        'अत्यधिक शुष्क (<०.१०) और अत्यधिक जलमग्न (>०.४५) स्थितियों के सापेक्ष मिट्टी की नमी का मूल्यांकन। ५०० किमी में भूकंपीय गतिविधि को स्वतंत्र भूभौतिकीय खतरे के रूप में दिखाया जाता है।',
      proxyDisclosureEn:
        'Scientific Disclosure: 0–1 cm skin moisture is an ECMWF IFS model reanalysis estimate, not a direct deep root-zone sensor probe.',
      proxyDisclosureHi:
        'वैज्ञानिक प्रकटीकरण: ०-१ सेमी मिट्टी की नमी ईसीएमडब्ल्यूएफ मॉडल का अनुमान है, प्रत्यक्ष रूट-ज़ोन सेंसर माप नहीं।',
    },
    {
      id: 'jal',
      sanskrit: 'Jal',
      devanagari: 'जल',
      domainEn: 'Water & Hydrological Balance',
      domainHi: 'जल एवं जलवैज्ञानिक संतुलन',
      icon: Droplets,
      color: 'blue',
      accentBg: 'bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-500/20',
      tagColor: 'text-blue-700 dark:text-blue-400',
      summaryEn:
        'Tracks the hydrosphere: rainfall accumulation, precipitation intensity, relative humidity, and surface runoff risks.',
      summaryHi:
        'जलमंडल की स्थिति: वर्षा की मात्रा, वर्षा की तीव्रता, सापेक्ष आर्द्रता और सतही जलभराव जोखिम।',
      variablesEn: [
        '24-hour precipitation accumulation (mm)',
        'Surface relative humidity (%)',
        'Hydrological runoff proxy index',
        'Precipitation duration & intensity curves',
      ],
      variablesHi: [
        '२४ घंटे की कुल वर्षा (मिमी)',
        'सतही सापेक्ष आर्द्रता (%)',
        'जलवैज्ञानिक अपवाह (रन-ऑफ) प्रॉक्सी',
        'वर्षा की अवधि एवं तीव्रता वक्र',
      ],
      methodologyEn:
        'Optimal Jal vitality balances adequate moisture without excessive runoff or desiccating drought. Rainfall accumulation is normalized non-linearly to penalize both acute flash flood thresholds (>50 mm/24h) and extreme drought (<5 mm/month).',
      methodologyHi:
        'संतुलित जल जीवन में पर्याप्त आर्द्रता होती है, बिना अत्यधिक जलभराव या सूखे के। वर्षा संचय का गैर-रेखीय सामान्यीकरण बाढ़ (>५० मिमी/२४ घंटे) और सूखे दोनों को दंडित करता है।',
      proxyDisclosureEn:
        'Scientific Disclosure: Surface runoff is computed via a simplified empirical proxy, not an unvalidated full hydrodynamic catchment model.',
      proxyDisclosureHi:
        'वैज्ञानिक प्रकटीकरण: सतही अपवाह एक सरलीकृत प्रॉक्सी द्वारा आकलित है, पूर्ण कैचमेंट हाइड्रोडायनामिक मॉडल नहीं।',
    },
    {
      id: 'agni',
      sanskrit: 'Agni',
      devanagari: 'अग्नि',
      domainEn: 'Thermal Stress & Energy Balance',
      domainHi: 'तापीय तनाव एवं ऊर्जा संतुलन',
      icon: Flame,
      color: 'orange',
      accentBg: 'bg-orange-500/10 text-orange-800 dark:text-orange-300 border-orange-500/20',
      tagColor: 'text-orange-700 dark:text-orange-400',
      summaryEn:
        'Monitors thermodynamic energy: ambient temperature, NOAA Heat Index, and wildfire weather vulnerability.',
      summaryHi:
        'थर्मोडायनामिक ऊर्जा का अवलोकन: परिवेशी तापमान, एनओएए हीट इंडेक्स और दावानल (जंगल की आग) का खतरा।',
      variablesEn: [
        '2m ambient dry-bulb temperature (°C)',
        'NOAA/NWS Rothfusz compound Heat Index (°C)',
        'Fosberg Fire Weather Index (FWI) proxy',
        'Direct downwelling solar flux (W/m²)',
      ],
      variablesHi: [
        '२ मीटर परिवेशी तापमान (°C)',
        'एनओएए रोथफस संयुक्त हीट इंडेक्स (°C)',
        'फॉसबर्ग फायर वेदर इंडेक्स प्रॉक्सी',
        'प्रत्यक्ष सौर विकिरण प्रवाह (W/m²)',
      ],
      methodologyEn:
        'Combines ambient dry-bulb temperature with relative humidity using the full 9-term NOAA Rothfusz regression equation. Incorporates wind speed and equilibrium moisture to evaluate Fosberg wildfire danger.',
      methodologyHi:
        'तापमान और आर्द्रता को एनओएए रोथफस समीकरण से जोड़कर वास्तविक शारीरिक तापीय तनाव की गणना करता है। हवा की गति और नमी को मिलाकर दावानल जोखिम आंका जाता है।',
      proxyDisclosureEn:
        'Scientific Disclosure: Differentiates human physiological heat stress (Heat Index) from ecological wildfire risk (Fosberg proxy).',
      proxyDisclosureHi:
        'वैज्ञानिक प्रकटीकरण: मानव तापीय तनाव (हीट इंडेक्स) और पारिस्थितिक दावानल जोखिम को अलग-अलग श्रेणी में रखता है।',
    },
    {
      id: 'vayu',
      sanskrit: 'Vayu',
      devanagari: 'वायु',
      domainEn: 'Air Quality & Atmospheric Dynamics',
      domainHi: 'वायु गुणवत्ता एवं वायुमंडलीय गतिशीलता',
      icon: Wind,
      color: 'emerald',
      accentBg: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20',
      tagColor: 'text-emerald-700 dark:text-emerald-400',
      summaryEn:
        'Evaluates tropospheric composition: particulate pollution, toxic gases, surface winds, and gust dynamics.',
      summaryHi:
        'क्षोभमंडल की स्थिति: महीन धूल कण (PM2.5, PM10), विषाक्त गैसें, सतही हवा की गति और झोंके।',
      variablesEn: [
        'PM2.5 and PM10 particulate concentrations (µg/m³)',
        'European Air Quality Index (AQI) banding',
        'Gaseous pollutants: O3, NO2, SO2, CO (µg/m³)',
        '10m surface wind speed and peak gust velocity (km/h)',
      ],
      variablesHi: [
        'PM2.5 एवं PM10 महीन धूल कण (µg/m³)',
        'यूरोपीय वायु गुणवत्ता सूचकांक (AQI)',
        'गैसीय प्रदूषक: ओजोन, NO2, SO2, CO (µg/m³)',
        '१० मीटर हवा की गति एवं झोंकों का वेग (किमी/घंटा)',
      ],
      methodologyEn:
        'Uses continuous piece-wise scoring aligned with WHO guideline thresholds. Enforces a non-linear Pollutant Ceiling Rule: if PM2.5 exceeds 150 µg/m³, the Vayu score is hard-capped to reflect hazardous toxicity regardless of light winds.',
      methodologyHi:
        'डब्ल्यूएचओ मानकों के अनुरूप गणना। गैर-रेखीय प्रदूषक सीलिंग नियम: यदि PM2.5 १५० µg/m³ से अधिक है, तो वायु स्कोर अधिकतम ३० अंकों तक सीमित कर दिया जाता है।',
      proxyDisclosureEn:
        'Scientific Disclosure: Wind dispersion is scored cautiously; high winds disperse local stagnation but do not eliminate regional particulate exposure.',
      proxyDisclosureHi:
        'वैज्ञानिक प्रकटीकरण: तेज हवाएं स्थानीय प्रदूषण तो हटा सकती हैं, पर क्षेत्रीय स्तर पर कणों के कुल प्रभाव को समाप्त नहीं करतीं।',
    },
    {
      id: 'akash',
      sanskrit: 'Akash',
      devanagari: 'आकाश',
      domainEn: 'Atmospheric Boundary & Solar Radiation',
      domainHi: 'वायुमंडलीय सीमा एवं सौर विकिरण',
      icon: Sun,
      color: 'purple',
      accentBg: 'bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/20',
      tagColor: 'text-purple-700 dark:text-purple-400',
      summaryEn:
        'Measures the upper atmosphere and stratospheric interface: UV radiation index, barometric stability, and cloud cover.',
      summaryHi:
        'ऊपरी वायुमंडल व समताप मंडल: पराबैंगनी (यूवी) सूचकांक, बैरोमीटर दबाव स्थिरता और बादलों का आवरण।',
      variablesEn: [
        'Downwelling solar UV Index (0–12+ scale)',
        'Mean sea-level barometric pressure (hPa)',
        'Barometric pressure tendency / gradient (hPa/3h)',
        'Total atmospheric cloud cover percentage (%)',
      ],
      variablesHi: [
        'सौर पराबैंगनी (यूवी) सूचकांक (०–१२+)',
        'समुद्र तल का वायुमंडलीय दबाव (hPa)',
        'बैरोमीटर दबाव प्रवणता / रुझान (hPa/3h)',
        'कुल बादलों का आवरण प्रतिशत (%)',
      ],
      methodologyEn:
        'Assesses UV radiation using WHO exposure damage tiers. Evaluates barometric pressure deviation from local baseline (1013.25 hPa) to identify severe cyclonic depression (<995 hPa) or intense anti-cyclonic stagnation.',
      methodologyHi:
        'डब्ल्यूएचओ मानकों के आधार पर यूवी विकिरण का आकलन। चक्रवाती अवदाब (<९९५ hPa) या तीव्र वायुमंडलीय ठहराव की पहचान हेतु मानक दबाव (१०१३.२५ hPa) से विचलन की गणना।',
      proxyDisclosureEn:
        'Scientific Disclosure: UV index measures clear-sky and cloud-adjusted erythemal radiation; barometric deviations indicate synoptic-scale disturbance.',
      proxyDisclosureHi:
        'वैज्ञानिक प्रकटीकरण: यूवी सूचकांक जैविक त्वचा-हानि विकिरण मापता है; बैरोमीटर दबाव बड़े चक्रवाती परिवर्तनों का संकेत देता है।',
    },
  ];

  const current = elements[activeElement];
  const CurrentIcon = current.icon;

  return (
    <section id="framework" className="py-20 bg-slate-50/70 dark:bg-charcoal/50 border-t border-b border-slate-200/80 dark:border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>{isHi ? 'अध्याय ०३ · पंचमहाभूत वैज्ञानिक रूपरेखा' : 'Chapter 03 · The Five Elements Framework'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isHi
              ? 'पांच शास्त्रीय तत्वों का आधुनिक पृथ्वी विज्ञान में अनुवाद'
              : 'Translating Five Classical Elements into Rigorous Earth Science'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'पंचमहाभूत केवल दार्शनिक विचार नहीं है, अपितु एक व्यापक पारिस्थितिक वर्गीकरण प्रणाली है। प्रत्येक तत्व वास्तविक वैज्ञानिक चरों, सेंसर रीडिंग्स और गैर-रेखीय स्कोरिंग से संचालित होता है।'
              : 'The Panch Mahabhuta serves as PRAKRUshTI’s diagnostic architecture. Each element is mapped directly to verifiable physical variables, peer-reviewed indices, and strict scientific disclosures.'}
          </p>
        </div>

        {/* 5 Element Navigation Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {elements.map((el, idx) => {
            const Icon = el.icon;
            const isSelected = activeElement === idx;
            return (
              <button
                key={el.id}
                onClick={() => setActiveElement(idx)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-brand-dark text-white shadow-lg shadow-emerald-900/25 scale-105'
                    : 'bg-white dark:bg-charcoal-card text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/30'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
                <span>{el.sanskrit}</span>
                <span className="text-xs opacity-80 hidden md:inline">({el.devanagari})</span>
              </button>
            );
          })}
        </div>

        {/* Active Element Deep-Dive Card */}
        <div key={activeElement} className="mt-8 rounded-3xl bg-white dark:bg-charcoal-card border border-slate-200/80 dark:border-white/10 shadow-xl p-6 sm:p-10 transition-all animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Element Identity & Scope */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl border ${current.accentBg}`}>
                  <CurrentIcon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                      {current.sanskrit}
                    </h3>
                    <span className="font-devanagari text-base font-bold text-slate-500">
                      ({current.devanagari})
                    </span>
                  </div>
                  <div className={`text-xs font-mono font-bold uppercase tracking-wider ${current.tagColor}`}>
                    {isHi ? current.domainHi : current.domainEn}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi ? current.summaryHi : current.summaryEn}
              </p>

              {/* Variables List */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {isHi ? 'मापे जाने वाले भौतिक चर' : 'Core Physical Variables'}
                </div>
                <div className="space-y-2">
                  {(isHi ? current.variablesHi : current.variablesEn).map((v, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Scoring Method & Scientific Disclosure */}
            <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-slate-100 lg:dark:border-white/5 lg:pl-8">
              
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {isHi ? 'गणना एवं सामान्यीकरण विधि' : 'Normalization & Scoring Formulation'}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {isHi ? current.methodologyHi : current.methodologyEn}
                </p>
              </div>

              {/* Transparent Scientific Proxy Box */}
              <div className="rounded-xl bg-slate-50 dark:bg-charcoal/80 p-4 border border-slate-200/80 dark:border-white/10 flex items-start space-x-3">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  <span className="font-bold text-slate-800 dark:text-slate-100 block mb-0.5">
                    {isHi ? 'पारदर्शी वैज्ञानिक प्रकटीकरण' : 'Transparent Model Disclosure'}
                  </span>
                  {isHi ? current.proxyDisclosureHi : current.proxyDisclosureEn}
                </div>
              </div>

              {/* Scale Interpretation Banner */}
              <div className="p-4 rounded-xl bg-emerald-950/5 dark:bg-white/5 border border-emerald-900/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {isHi ? 'स्केल व्याख्या: ० से १००' : 'Scale: 0 to 100 Health Index'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isHi ? 'उच्च स्कोर = अनुकूल पारिस्थितिक संतुलन' : 'Higher Score = Optimal Ecological Balance & Low Hazard'}
                  </div>
                </div>
                <div className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-600 text-white">
                  Weight: 20%
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
