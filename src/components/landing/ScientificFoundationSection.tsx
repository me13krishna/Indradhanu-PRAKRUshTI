import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Database, Binary, AlertOctagon, HelpCircle } from 'lucide-react';

export const ScientificFoundationSection: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <section id="foundation" className="py-20 bg-white dark:bg-charcoal scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isHi ? 'अध्याय ०४ · वैज्ञानिक प्रामाणिकता एवं सीमाएं' : 'Chapter 04 · Provenance & Disclosures'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {isHi
              ? 'बिना किसी ब्लैक-बॉक्स के: पूर्ण पारदर्शी स्रोत एवं स्पष्ट सीमाएं'
              : 'Zero Black Boxes: Traceable Provenance & Explicit Scientific Boundaries'}
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'सच्चा जलवायु विज्ञान पारदर्शिता की मांग करता है। PRAKRUshTI केवल वही दावे करता है जिन्हें गणितीय सूत्रों और सत्यापित डेटा स्रोतों से सिद्ध किया जा सकता है।'
              : 'Genuine planetary intelligence requires total honesty. PRAKRUshTI discloses its exact telemetry lineage, mathematical formulas, and computational boundaries without hype or exaggerated claims.'}
          </p>
        </div>

        {/* 3 Pillars of Transparency */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Telemetry Provenance */}
          <div className="rounded-2xl bg-paper dark:bg-charcoal-card p-7 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                  {isHi ? 'डेटा स्रोत एवं वंशावली' : 'Data Lineage & Telemetry Sources'}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi
                  ? 'हम डेटा मनगढ़ंत नहीं बनाते। सभी मौसमी एवं वायुमंडलीय इनपुट खुले, प्रतिष्ठित वैज्ञानिक मंचों से प्राप्त किए जाते हैं:'
                  : 'All physical observations and atmospheric parameters are ingested from verified international scientific repositories:'}
              </p>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>ECMWF IFS & GFS:</strong> Ingested via Open-Meteo API for 2m temperature, humidity, rainfall, wind, pressure.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Copernicus CAMS:</strong> Atmospheric chemical reanalysis for PM2.5, PM10, ozone, and toxic gases.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <span><strong>USGS GSN:</strong> Global Seismographic Network real-time seismic event queries within 500 km radius.</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-mono text-slate-500">
              {isHi ? 'प्रत्यक्ष प्रेक्षण बनाम मॉडल सिमुलेशन का स्पष्ट अंतर' : 'Direct observation vs model reanalysis clearly flagged'}
            </div>
          </div>

          {/* Pillar 2: Sub-Additive Mathematics */}
          <div className="rounded-2xl bg-paper dark:bg-charcoal-card p-7 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                  <Binary className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                  {isHi ? 'p=0.5 उप-योगात्मक गणित' : 'Why the p=0.5 Power Mean?'}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi
                  ? 'पारंपरिक अंकगणितीय औसत (p=1.0) पर्यावरण की दृष्टि से अमान्य है, क्योंकि यह एक तत्व के विनाश को दूसरे के संतुलन से छुपाने की अनुमति देता है।'
                  : 'An arithmetic mean (p=1.0) suffers from compensatory bias: a sunny mild day (Agni=90) would mask lethal toxic smog (Vayu=10).'}
              </p>

              <div className="bg-slate-100 dark:bg-charcoal p-3 rounded-xl font-mono text-[11px] text-slate-800 dark:text-slate-200 space-y-1">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold">Ecological Sensitivity Rule:</div>
                <div>p = 1.0 (Arithmetic): Mean = 50 (Misleading)</div>
                <div>p = 0.5 (PRAKRUshTI): Mean = 38 (Penalized)</div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi
                  ? 'p=0.5 सूत्र पारिस्थितिक संकट की स्थिति में स्कोर को भारी दंड देता है, जिससे नीति-निर्माताओं को वास्तविक आपातकाल की चेतावनी मिलती है।'
                  : 'By enforcing p=0.5 sub-additivity, our composite score reflects the biological reality that an organism or ecosystem cannot survive without clean air or water, regardless of other conditions.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              {isHi ? 'गैर-रेखीय पारिस्थितिक संवेदनशीलता' : 'Non-linear penalty for degraded elements'}
            </div>
          </div>

          {/* Pillar 3: Explicit Scientific Boundaries */}
          <div className="rounded-2xl bg-paper dark:bg-charcoal-card p-7 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                  {isHi ? 'स्पष्ट सीमाएं एवं प्रकटीकरण' : 'Boundaries & Explicit Disclosures'}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {isHi
                  ? 'हम अपनी सीमाओं के बारे में पूरी तरह पारदर्शी हैं:'
                  : 'We maintain clear, conservative boundaries on what PRAKRUshTI is and is not:'}
              </p>

              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Not a Generative LLM:</strong> Our environmental assistant is a deterministic, rule-based expert system grounded in physical thresholds.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Soil Moisture is a Proxy:</strong> 0–1 cm skin moisture is a reanalysis proxy, not a direct deep root-zone sensor probe.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Global Hotspots Demonstration:</strong> Preset benchmark hotspots are historical reference scenarios, not live satellite sensors.</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 text-[11px] font-mono text-slate-500">
              {isHi ? 'सख्त वैज्ञानिक सत्यनिष्ठा' : 'Strict adherence to verifiable scientific claims'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
