import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { Gauge, MapPin, Sliders, SplitSquareVertical, MessageSquare, AlertTriangle, ArrowRight, Check } from 'lucide-react';

export const PlatformPreviewSection: React.FC = () => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [activeModule, setActiveModule] = useState<number>(0);

  const modules = [
    {
      id: 'score-breakdown',
      icon: Gauge,
      titleEn: 'Composite Prakruti Gauge & Five Elements',
      titleHi: 'प्रकृति स्कोर गेज एवं पंचमहाभूत विश्लेषण',
      subtitleEn: 'Systemic Health Synthesis with Sensitivity Attribution',
      subtitleHi: 'संवेदनशीलता विश्लेषण सहित समग्र स्वास्थ्य संश्लेषण',
      descEn:
        'Visualizes the composite planetary resilience score (0–100) alongside individual element meters. Features mathematical sensitivity attribution to instantly identify which physical parameter is driving environmental stress.',
      descHi:
        'समग्र पारिस्थितिक लचीलापन स्कोर (०–१००) और व्यक्तिगत तत्व मीटर का सजीव दृश्य। संवेदनशील विश्लेषण द्वारा तुरंत पहचानता है कि कौन सा भौतिक चर तनाव पैदा कर रहा है।',
      featuresEn: [
        'p=0.5 sub-additive generalized power mean',
        'Five color-coded element meters with drilldown details',
        'Automated attribution penalty breakdown',
        'Historical 7-day trend forecasts',
      ],
      featuresHi: [
        'p=0.5 उप-योगात्मक जनरलाइज्ड घात माध्य',
        'विस्तृत विवरण सहित पांच रंग-कोडित तत्व मीटर',
        'स्वचालित कारण विश्लेषण एवं पेनाल्टी विभाजन',
        '७-दिवसीय ऐतिहासिक एवं पूर्वानुमान रुझान',
      ],
    },
    {
      id: 'interactive-map',
      icon: MapPin,
      titleEn: 'Geospatial Leaflet Mapping & Seismic Hazards',
      titleHi: 'भू-स्थानिक मैपिंग एवं भूकंपीय खतरे',
      subtitleEn: 'Multi-Layered Earth Telemetry Overlays',
      subtitleHi: 'बहु-स्तरीय पृथ्वी टेलीमेट्री ओवरले',
      descEn:
        'Explore physical parameters in space. Switch between OpenStreetMap terrain, satellite imagery, and elemental heatmaps. Dynamically renders 500 km seismic radius events from USGS telemetry with magnitude and depth classification.',
      descHi:
        'भू-स्थानिक रूप से भौतिक चरों का अन्वेषण करें। ओपनस्ट्रीटमैप भूभाग, उपग्रह दृश्य और तत्व हीटमैप के बीच स्विच करें। ५०० किमी में यूएसजीएस टेलीमेट्री से भूकंपीय हलचल दिखाता है।',
      featuresEn: [
        'Five elemental map overlay layers (heat, air, moisture)',
        'USGS real-time seismic event markers with magnitude scaling',
        'Interactive pin-drop coordinate geocoding',
        'Zero external token dependencies',
      ],
      featuresHi: [
        'पांच तत्व आधारित मानचित्र ओवरले परतें',
        'तीव्रता स्केलिंग सहित यूएसजीएस वास्तविक समय भूकंपीय मार्कर',
        'इंटरैक्टिव पिन-ड्रॉप निर्देशांक जियोकोडिंग',
        'बिना किसी बाहरी टोकन निर्भरता के पूर्ण सुरक्षित',
      ],
    },
    {
      id: 'simulator',
      icon: Sliders,
      titleEn: 'Counterfactual "What-If" Climate Simulator',
      titleHi: 'काल्पनिक "क्या होगा अगर" जलवायु सिम्युलेटर',
      subtitleEn: 'Proactive Ecological Scenario Modeling',
      subtitleHi: 'पारिस्थितिक परिदृश्य मॉडलिंग',
      descEn:
        'Run deterministic ecological scenarios without altering live baseline telemetry. Adjust temperature deltas, rainfall shifts, particulate emissions, and tree canopy coverage to observe real-time score impacts and tipping points.',
      descHi:
        'वास्तविक डेटा को बदले बिना पारिस्थितिक परिदृश्यों का अनुकरण करें। तापमान परिवर्तन, वर्षा में बदलाव, धूल कण उत्सर्जन और वृक्षारोपण बढ़ाकर स्कोर पर पड़ने वाले प्रभाव देखें।',
      featuresEn: [
        'Dynamic sliders for temperature, precipitation, PM2.5, canopy',
        'Real-time recalculation through identical scoring formulas',
        'Clear delta-score indicators (+/- points gained or lost)',
        'Resilience threshold breach warnings',
      ],
      featuresHi: [
        'तापमान, वर्षा, PM2.5 और हरित आवरण हेतु गतिशील स्लाइडर',
        'समान वैज्ञानिक सूत्रों द्वारा वास्तविक समय में पुनर्गणना',
        'स्पष्ट स्कोर अंतर संकेतक (+/- अंक लाभ या हानि)',
        'पारिस्थितिक सीमा उल्लंघन चेतावनी',
      ],
    },
    {
      id: 'comparison',
      icon: SplitSquareVertical,
      titleEn: 'Cross-Bioclimatic Comparative Analysis',
      titleHi: 'क्षेत्रीय जैव-जलवायु तुलनात्मक विश्लेषण',
      subtitleEn: 'Side-by-Side Elemental Resilience Benchmarking',
      subtitleHi: 'पारिस्थितिक लचीलापन की आमने-सामने तुलना',
      descEn:
        'Benchmark two distinct geographical regions simultaneously. Compare how contrasting ecosystems—such as arid desert zones, coastal deltas, and temperate forests—respond to differing elemental pressures.',
      descHi:
        'दो अलग-अलग भौगोलिक क्षेत्रों की एक साथ तुलना करें। देखें कि मरुस्थलीय क्षेत्र, तटीय डेल्टा और वन क्षेत्र विभिन्न तत्वों के दबाव पर कैसे प्रतिक्रिया करते हैं।',
      featuresEn: [
        'Synchronized dual-location score comparison',
        'Elemental delta radar chart',
        'Preset global bioclimatic reference archetypes',
        'Instant multi-parameter variance report',
      ],
      featuresHi: [
        'दो स्थानों की समकालिक स्कोर तुलना',
        'तत्व अंतर रडार चार्ट',
        'वैश्विक जैव-जलवायु संदर्भ प्रारूप',
        'त्वरित बहु-मापदंड भिन्नता रिपोर्ट',
      ],
    },
    {
      id: 'assistant',
      icon: MessageSquare,
      titleEn: 'Deterministic Scientific Assistant (No Black Box)',
      titleHi: 'नियम-आधारित वैज्ञानिक सहायक (पूर्ण पारदर्शी)',
      subtitleEn: 'Rule-Based Environmental Query Resolution',
      subtitleHi: 'पारदर्शी पर्यावरणीय प्रश्नों के सटीक उत्तर',
      descEn:
        'A deterministic expert system built on scientific thresholds and the Panch Mahabhuta taxonomy. Provides transparent, verifiable explanations of environmental data in both English and Hindi without hallucinations.',
      descHi:
        'वैज्ञानिक मानकों और पंचमहाभूत रूपरेखा पर निर्मित एक नियम-आधारित विशेषज्ञ प्रणाली। बिना किसी भ्रामक उत्तर के अंग्रेजी और हिंदी दोनों में पारदर्शी व्याख्या प्रदान करता है।',
      featuresEn: [
        'Fully grounded in active telemetry and physical laws',
        'Bilingual query resolution (English & हिंदी)',
        'Explains exact calculations and thresholds behind scores',
        'Zero API hallucination risk',
      ],
      featuresHi: [
        'सक्रिय टेलीमेट्री और भौतिक नियमों पर पूर्णतः आधारित',
        'द्विभाषी समाधान (अंग्रेजी एवं हिंदी)',
        'स्कोर के पीछे की सटीक गणना और सीमाओं की व्याख्या',
        'बिना किसी अनिश्चित या भ्रामक परिणाम के',
      ],
    },
    {
      id: 'hotspots',
      icon: AlertTriangle,
      titleEn: 'Curated Benchmark Global Hotspots',
      titleHi: 'चयनित वैश्विक बेंचमार्क हॉटस्पॉट',
      subtitleEn: 'Historical Ecological Reference Scenarios (Demo Data)',
      subtitleHi: 'ऐतिहासिक पारिस्थितिक संदर्भ परिदृश्य (डेमो डेटा)',
      descEn:
        'Examine historical and benchmark ecological distress zones: the Aral Sea desiccation, Amazon basin deforestation, and severe urban smog episodes. Transparently labeled as curated demonstration data for education.',
      descHi:
        'ऐतिहासिक पारिस्थितिक संकटग्रस्त क्षेत्रों का अध्ययन: अराल सागर का सूखना, अमेज़ॅन के वनों की कटाई और गंभीर शहरी धुंध। शिक्षा हेतु स्पष्ट रूप से डेमो डेटा के रूप में चिह्नित।',
      featuresEn: [
        'Curated benchmark scenarios for critical biomes',
        'Explicit disclosure as educational demonstration dataset',
        'Elemental stress archetype profiling',
        'Instant one-click loading into analysis pipeline',
      ],
      featuresHi: [
        'महत्वपूर्ण बायोम हेतु संकलित संदर्भ परिदृश्य',
        'शैक्षणिक डेमो डेटासेट के रूप में स्पष्ट प्रकटीकरण',
        'तत्व तनाव प्रोफाइलिंग',
        'विश्लेषण पाइपलाइन में एक-क्लिक से लोड करने की सुविधा',
      ],
    },
  ];

  const current = modules[activeModule];
  const CurrentIcon = current.icon;

  return (
    <section id="preview" className="py-20 bg-paper dark:bg-charcoal/90 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>{isHi ? 'अध्याय ०५ · कार्यशील प्लेटफ़ॉर्म' : 'Chapter 05 · The Working Platform'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isHi
              ? 'पारिस्थितिक लचीलेपन हेतु संपूर्ण बुद्धिमत्ता मंच'
              : 'Six Integrated Modules for Planetary Resilience'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'PRAKRUshTI कोई स्थैतिक अवधारणा नहीं है। यह एक पूर्णतः कार्यशील विश्लेषणात्मक सूट है। नीचे दिए गए छह मुख्य मॉड्यूल लाइव एप्लिकेशन में उपलब्ध हैं।'
              : 'PRAKRUshTI is not a theoretical concept. It is a live, working intelligence suite with six interconnected operational modules ready for immediate deployment.'}
          </p>
        </div>

        {/* Module Selector Tabs */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            const isSelected = activeModule === idx;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(idx)}
                className={`p-3 sm:p-4 rounded-xl text-left transition-all border flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'bg-brand-dark text-white border-brand-dark shadow-md shadow-emerald-900/20'
                    : 'bg-white dark:bg-charcoal-card text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-white/5 border-slate-200/80 dark:border-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-xs font-serif font-bold line-clamp-2">
                  {isHi ? m.titleHi : m.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Module Showcase Card */}
        <div className="mt-8 rounded-3xl bg-white dark:bg-charcoal-card border border-slate-200/80 dark:border-white/10 shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Module Overview & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                  <CurrentIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    {isHi ? current.titleHi : current.titleEn}
                  </h3>
                  <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    {isHi ? current.subtitleHi : current.subtitleEn}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi ? current.descHi : current.descEn}
              </p>

              {/* Feature Bullets */}
              <div className="space-y-2.5 pt-2">
                {(isHi ? current.featuresHi : current.featuresEn).map((f, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-200 font-sans">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Direct Link to App */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/app')}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-brand-dark hover:bg-brand-light text-white shadow-md shadow-emerald-900/20 flex items-center space-x-2 transition-all active:scale-95"
                >
                  <span>{isHi ? 'लाइव ऐप में यह मॉड्यूल खोलें' : 'Open This Module in Live App'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Realistic UI Visual Preview Box */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 border border-white/10 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 pl-2">PRAKRUshTI :: Live App</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase">Active Telemetry Coordinates</div>
                  <div className="text-emerald-400 font-bold mt-0.5">28.6139° N, 77.2090° E (New Delhi)</div>
                  <div className="text-[11px] text-slate-300 mt-1">Provenance: Open-Meteo ECMWF IFS Engine</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Composite Prakruti Score</div>
                    <div className="text-2xl font-serif font-bold text-white mt-0.5">68 / 100</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Moderate Stress
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Prithvi (Soil Skin 0-1cm):</span>
                    <span className="text-amber-400 font-bold">62/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jal (Precipitation):</span>
                    <span className="text-blue-400 font-bold">74/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Agni (Heat Index):</span>
                    <span className="text-orange-400 font-bold">70/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vayu (PM2.5 Capped):</span>
                    <span className="text-red-400 font-bold">45/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Akash (UV & Pressure):</span>
                    <span className="text-purple-400 font-bold">82/100</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-center text-slate-400 font-mono">
                Click any section to interact directly on the live dashboard.
              </div>
            </div>

          </div>
        </div>

        {/* Global Conversion Call-to-Action Bar */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {isHi ? 'ग्रह के स्वास्थ्य का प्रत्यक्ष मूल्यांकन शुरू करें' : 'Ready to Experience Live Environmental Intelligence?'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-sans">
            {isHi
              ? 'बिना किसी पंजीकरण के, विश्व के किसी भी स्थान का सटीक पंचमहाभूत स्कोर तुरंत देखें।'
              : 'Explore the full operational dashboard with real planetary observations, interactive maps, and what-if simulations.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/app')}
              className="px-8 py-4 rounded-xl font-bold text-sm bg-brand-dark hover:bg-brand-light text-white shadow-xl shadow-emerald-900/30 inline-flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>{isHi ? 'लाइव प्लेटफ़ॉर्म खोलें' : 'Enter PRAKRUshTI Platform'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
