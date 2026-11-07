import React from 'react';
import { BookOpen, Sparkles, Feather, Globe2, Droplets, Flame, Wind, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { MahabhutaElementKey } from '../types/prakrushti';
import { ElementalRealisticIcon } from './ElementalRealisticIcon';

export const KnowledgeBase: React.FC = () => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const knowledgeCards: Array<{
    elementKey: MahabhutaElementKey;
    sanskrit: string;
    english: string;
    icon: any;
    color: string;
    accentBg: string;
    ancientWisdomEn: string;
    ancientWisdomHi: string;
    modernScienceEn: string;
    modernScienceHi: string;
    variablesEn: string[];
    variablesHi: string[];
  }> = [
    {
      elementKey: 'prithvi',
      sanskrit: 'पृथ्वी',
      english: 'Prithvi (Earth & Pedosphere)',
      icon: Globe2,
      color: '#C97B4A',
      accentBg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30',
      ancientWisdomEn:
        'In Vedic ontology (Bhoomi Sukta, Atharva Veda 12.1), Prithvi embodies firmness, stability, organic soil nourishment, and pedospheric balance sustaining all terrestrial life.',
      ancientWisdomHi:
        'वैदिक दर्शन (भूमि सूक्त, अथर्ववेद १२.१) में पृथ्वी स्थिरता, जीवन-पोषण, मृदा उर्वरता और समस्त चर-अचर को आधार प्रदान करने वाली मातृशक्ति का प्रतीक है।',
      modernScienceEn:
        'Quantified via 0–1 cm topsoil volumetric moisture reanalysis proxies (ECMWF IFS Land Model HTESSEL), surface ground temperature, vegetation health indices, and decoupled USGS seismic telemetry within 500 km.',
      modernScienceHi:
        'ईसीएमडब्ल्यूएफ ०-१ सेमी सतही मृदा नमी प्रॉक्सी (HTESSEL मॉडल), सतही तापमान, वनस्पति सूचकांक और ५०० किमी के दायरे में यूएसजीएस भूकंपीय निगरानी द्वारा मापा जाता है।',
      variablesEn: ['Topsoil skin moisture (m³/m³)', 'Ground skin temperature (°C)', 'USGS Seismic risk (decoupled)'],
      variablesHi: ['सतही मृदा नमी (m³/m³)', 'भू-सतह तापमान (°C)', 'यूएसजीएस भूकंपीय जोखिम'],
    },
    {
      elementKey: 'jal',
      sanskrit: 'जल',
      english: 'Jal (Water & Hydrosphere)',
      icon: Droplets,
      color: '#1B6B93',
      accentBg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/30',
      ancientWisdomEn:
        'Jal (Aapah) represents life-generating fluidity, purification, and the natural cyclical precipitation dynamics celebrated across ancient hydrological hymns (Rig Veda 7.49).',
      ancientWisdomHi:
        'ऋग्वेद (७.४९) में आपः (जल) को जीवनदायिनी शक्ति, पवित्रता और जल चक्र के संतुलन के रूप में नमन किया गया है जो वर्षा और नदियों का नियमन करता है।',
      modernScienceEn:
        'Measured through 24-hour precipitation accumulation (mm), surface relative humidity (%), precipitation rate curves, and Horton-based runoff infiltration-exceedance proxies.',
      modernScienceHi:
        '२४ घंटे की कुल वर्षा (मिमी), सापेक्ष आर्द्रता (%), वर्षा तीव्रता एवं हॉरटन अपवाह-अंतःस्यंदन प्रॉक्सी द्वारा विश्लेषित।',
      variablesEn: ['24h precipitation (mm)', 'Relative humidity (%)', 'Runoff infiltration proxy'],
      variablesHi: ['२४ घंटे की वर्षा (मिमी)', 'सापेक्ष आर्द्रता (%)', 'सतही अपवाह प्रॉक्सी'],
    },
    {
      elementKey: 'agni',
      sanskrit: 'अग्नि',
      english: 'Agni (Thermal Energy & Radiation)',
      icon: Flame,
      color: '#D9822B',
      accentBg: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200/50 dark:border-orange-800/30',
      ancientWisdomEn:
        'Agni represents thermodynamic transformation, metabolic combustion, and solar illumination that drives vegetative ripening and energetic equilibrium across ecosystems.',
      ancientWisdomHi:
        'अग्नि रूपांतरण, जैविक चयापचय और तापीय संतुलन का प्रतीक है, जो सौर ऊर्जा के रूप में फसलों के पकने और जीवन के चक्र को संचालित करता है।',
      modernScienceEn:
        'Calculated via NOAA/NWS Rothfusz 9-term polynomial Heat Index (°C), ambient 2m dry-bulb temperature, equilibrium fuel moisture, and Fosberg Fire Weather Index (FFWI) proxies.',
      modernScienceHi:
        'एनओएए रोथफस संयुक्त हीट इंडेक्स (°C), २ मीटर परिवेशी तापमान और फॉसबर्ग फायर वेदर इंडेक्स (FFWI) दावानल प्रॉक्सी द्वारा मूल्यांकित।',
      variablesEn: ['NOAA Rothfusz Heat Index (°C)', '2m Ambient Temperature (°C)', 'Fosberg Fire Weather Index proxy'],
      variablesHi: ['एनओएए हीट इंडेक्स (°C)', '२ मीटर तापमान (°C)', 'फॉसबर्ग दावानल इंडेक्स प्रॉक्सी'],
    },
    {
      elementKey: 'vayu',
      sanskrit: 'वायु',
      english: 'Vayu (Atmosphere & Gas Dynamics)',
      icon: Wind,
      color: '#0D9488',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30',
      ancientWisdomEn:
        'Vayu is Prana (the vital respiration of the planet), symbolizing kinetic atmospheric circulation, boundary layer motion, and life-supporting gaseous balance.',
      ancientWisdomHi:
        'वायु प्राण (पृथ्वी का श्वसन) है, जो वायुमंडलीय परिसंचरण, हवा की गति और समस्त जीवों के लिए जीवनदायिनी शुद्ध वायु का प्रतिनिधित्व करता है।',
      modernScienceEn:
        'Monitored via European Air Quality Index (AQI), Copernicus CAMS PM2.5 and PM10 chemical dispersion, toxic gaseous pollutants (O3, NO2, SO2, CO), and 10m surface wind dispersion vectors.',
      modernScienceHi:
        'कॉपरनिकस CAMS PM2.5 एवं PM10 महीन धूल कण, गैसीय प्रदूषक (ओजोन, NO2, SO2) और १० मीटर सतही हवा के वेग द्वारा आकलित।',
      variablesEn: ['PM2.5 & PM10 concentrations (µg/m³)', 'US/European AQI standard', '10m Surface wind speed (km/h)'],
      variablesHi: ['PM2.5 एवं PM10 कण (µg/m³)', 'वायु गुणवत्ता सूचकांक (AQI)', 'हवा की गति एवं झोंके (किमी/घंटा)'],
    },
    {
      elementKey: 'akash',
      sanskrit: 'आकाश',
      english: 'Akash (Upper Atmosphere & Space)',
      icon: Sun,
      color: '#7A6C9E',
      accentBg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200/50 dark:border-purple-800/30',
      ancientWisdomEn:
        'Akash is the boundless subtle continuum that provides space for atmospheric pressure gradients, celestial solar radiation transmission, and cosmic harmony.',
      ancientWisdomHi:
        'आकाश अनंत आकाशगंगा एवं समताप मंडल का आधार है, जो वायुमंडलीय दबाव, पराबैंगनी सौर विकिरण और प्रकाश के प्रसार को स्थान देता है।',
      modernScienceEn:
        'Evaluated through altimetrically-reduced barometric surface pressure (hPa), synoptic pressure deviation gradients, WHO erythemal solar UV index tiers, and total cloud cover attenuation.',
      modernScienceHi:
        'मानक समुद्र तल दबाव (hPa) से विचलन, डब्ल्यूएचओ सौर पराबैंगनी (यूवी) सूचकांक और कुल बादलों के आवरण प्रतिशत द्वारा मापा जाता है।',
      variablesEn: ['Solar UV Radiation Index (0–12+)', 'Barometric surface pressure (hPa)', 'Total cloud fraction (%)'],
      variablesHi: ['सौर यूवी सूचकांक (०–१२+)', 'वायुमंडलीय दबाव (hPa)', 'बादल आवरण प्रतिशत (%)'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn font-sans">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isHi ? 'ज्ञानकोश एवं दार्शनिक मेरुदंड' : 'Knowledge & Philosophical Spine'}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          {isHi
            ? 'प्राचीन पारिस्थितिक दर्शन एवं आधुनिक उपग्रह विज्ञान का समन्वय'
            : 'Bridging Ancient Wisdom with Earth Observation Science'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
          {isHi
            ? 'पंचमहाभूत के दार्शनिक सिद्धांतों और आधुनिक मौसमी विज्ञान के प्रत्यक्ष संवेदकों के बीच का वैज्ञानिक मानचित्रण।'
            : 'How each Panch Mahabhuta element maps foundational Vedic concepts directly to verifiable meteorological parameters.'}
        </p>
      </div>

      {/* 5 Elemental Cards */}
      <div className="space-y-6">
        {knowledgeCards.map((card, idx) => {
          return (
            <div
              key={idx}
              className="card-paper p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 relative overflow-hidden shadow-lg"
            >
              {/* Card Title */}
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
                  <ElementalRealisticIcon elementKey={card.elementKey} size="lg" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-devanagari text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {card.sanskrit}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                      • {card.english}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {isHi ? 'तत्व वजन: २०% • p=0.5 उप-योगात्मक सूत्र' : 'Elemental Weight: 20% • p=0.5 Sub-Additive Formulation'}
                  </div>
                </div>
              </div>

              {/* 2 Columns: Philosophy vs Science */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Ancient Ecological Philosophy */}
                <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-serif flex items-center space-x-1.5 mb-2">
                      <Feather className="w-4 h-4" />
                      <span>{isHi ? 'प्राचीन पारिस्थितिक दर्शन' : 'Ancient Ecological Philosophy'}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {isHi ? card.ancientWisdomHi : card.ancientWisdomEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/40 text-[10px] font-mono text-amber-700 dark:text-amber-400">
                    {isHi ? 'दार्शनिक रूपरेखा एवं सांस्कृतिक चेतना' : 'Philosophical Interpretive Framework'}
                  </div>
                </div>

                {/* 2. Modern Earth Observation Science */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono flex items-center space-x-1.5 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{isHi ? 'आधुनिक पृथ्वी प्रेक्षण एवं भौतिक माप' : 'Modern Earth Observation Telemetry'}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {isHi ? card.modernScienceHi : card.modernScienceEn}
                    </p>
                  </div>

                  {/* Concrete Variables */}
                  <div className="mt-4 pt-3 border-t border-emerald-200/40 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      {isHi ? 'मापे जाने वाले भौतिक चर:' : 'Implemented Variables:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isHi ? card.variablesHi : card.variablesEn).map((v, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
