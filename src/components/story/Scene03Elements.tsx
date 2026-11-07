import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ElementTwoLayerCard, type MahabhutaElementDetail } from './ElementTwoLayerCard';
import { ArrowRight, BookOpen, Cpu, Eye, Sparkles } from 'lucide-react';

interface Scene03ElementsProps {
  onScrollToNext?: () => void;
}

export const MAHABHUTA_ELEMENTS_DATA: MahabhutaElementDetail[] = [
  {
    id: 'prithvi',
    sanskrit: 'Prithvi',
    devanagari: 'पृथ्वी',
    colorHex: '#C97B4A',
    auraClass: 'aura-prithvi',
    tagColor: 'text-[#C97B4A]',
    
    culturalTitleEn: 'Earth — Grounding Sanctuary & Soil Vitality',
    culturalTitleHi: 'पृथ्वी — जीवनदायिनी मृदा एवं भू-संतुलन',
    sanskritVerse: '॥ माता भूमिः पुत्रोऽहं पृथिव्याः ॥',
    verseTranslationEn: '“Earth is my mother; I am her child.” — Atharva Veda 12.1.12',
    verseTranslationHi: '“पृथ्वी मेरी माता है, मैं उसका पुत्र हूँ।” — अथर्ववेद १२.१.१२',
    culturalPhilosophyEn:
      'In Sanatan philosophy, Prithvi represents the pedosphere: the nourishing ground, topsoil biophysics, and structural stability upon which all terrestrial flora and fauna depend.',
    culturalPhilosophyHi:
      'सनातन दर्शन में पृथ्वी केवल एक भौतिक पदार्थ नहीं, बल्कि समस्त जीवन की पोषणकर्ता और आधारशिला है जो मृदा की उर्वरता और भू-स्थिरता को संभालती है।',
    ecologicalDutyEn:
      'Prevent soil erosion, preserve regenerative agriculture, and maintain vegetative cover to avoid land desertification.',
    ecologicalDutyHi:
      'मृदा क्षरण रोकना, प्राकृतिक कृषि अपनाना और भूमि मरुस्थलीकरण रोकने हेतु वनस्पति आच्छादन बनाए रखना।',

    scientificDomainEn: 'Topsoil Moisture & Land Surface Biophysics',
    scientificDomainHi: 'सतही मिट्टी की नमी एवं भूभौतिकीय संतुलन',
    benchmarkSource: 'ECMWF IFS (HTESSEL) & FAO-56',
    primaryEquation: 'S_Prithvi = round(0.60 * S_moisture + 0.40 * S_soil_temp)',
    weightsBreakdown: [
      { labelEn: 'Topsoil Skin Moisture (0-1cm)', labelHi: 'सतही मिट्टी की नमी (०-१ सेमी)', weight: '60%', unit: 'm³/m³' },
      { labelEn: 'Topsoil Temperature (0cm)', labelHi: 'सतही मिट्टी का तापमान (० सेमी)', weight: '40%', unit: '°C' },
    ],
    scientificVariablesEn: [
      'Volumetric Soil Water Content θ (0.10–0.45 m³/m³ bounds)',
      'ECMWF IFS Land Surface Reanalysis HTESSEL',
      'Decoupled USGS Earthquake Hazard Advisory (M ≥ 4.5)',
    ],
    scientificVariablesHi: [
      'आयतनिक मृदा जल सामग्री θ (०.१०–०.४५ m³/m³ सीमाएँ)',
      'ईसीएमडब्ल्यूएफ भूमि सतह मॉडल आंकलन',
      'स्वतंत्र यूएसजीएस भूकंप चेतावनी (M ≥ ४.५)',
    ],
    scientificLimitationsEn:
      '0–1 cm moisture measures topsoil skin layer via satellite/NWP reanalysis, serving as a rapid evaporative flux proxy rather than deep root-zone water capacity.',
    scientificLimitationsHi:
      '०-१ सेमी नमी उपग्रह/पुनर्विश्लेषण का सतही प्रॉक्सी है, यह गहरी जड़ों के जल स्तर का प्रत्यक्ष सेंसर मापन नहीं है।',
  },
  {
    id: 'jal',
    sanskrit: 'Jal',
    devanagari: 'जल',
    colorHex: '#1B6B93',
    auraClass: 'aura-jal',
    tagColor: 'text-[#1B6B93]',

    culturalTitleEn: 'Water — Hydrological Balance & Flow of Vitality',
    culturalTitleHi: 'जल — जलवैज्ञानिक संतुलन एवं जीवन-धारा',
    sanskritVerse: '॥ आपो हि ष्ठा मयोभुवस्ता न ऊर्जे दधातन ॥',
    verseTranslationEn: '“Waters, you are indeed the bountiful sources of life and vigor.” — Rigveda 10.9.1',
    verseTranslationHi: '“हे जल! तुम सुख और जीवन ऊर्जा के परम स्रोत हो।” — ऋग्वेद १०.९.१',
    culturalPhilosophyEn:
      'Jal embodies the hydrosphere: the uninterrupted circulation of rainfall, surface runoff, groundwater recharge, and atmospheric humidity that sustains planetary metabolism.',
    culturalPhilosophyHi:
      'जल सृष्टि का प्रवाहमय आधार है जो वर्षा चक्र, नदियों, भूमिगत जल और वायुमंडलीय आर्द्रता के माध्यम से जैव-विविधता का पोषण करता है।',
    ecologicalDutyEn:
      'Safeguard natural watersheds, harvest rainwater, prevent floodplain encroachment, and combat industrial effluent discharge.',
    ecologicalDutyHi:
      'प्राकृतिक जलग्रहण क्षेत्रों का संरक्षण, वर्षा जल संचयन और जल स्रोतों को प्रदूषण मुक्त रखना।',

    scientificDomainEn: 'Precipitation Infiltration & Hydrological Balance',
    scientificDomainHi: 'वर्षा अवशोषण एवं जलवैज्ञानिक संतुलन',
    benchmarkSource: 'WMO Hydrological Standards & SCS-CN Runoff',
    primaryEquation: 'I_excess = max(0, P - fc*(1 - θ/θsat)),  S_Jal = 0.60 * S_infil + 0.40 * S_rh',
    weightsBreakdown: [
      { labelEn: 'Infiltration-Exceedance Runoff', labelHi: 'सतही जलभराव अपवाह प्रॉक्सी', weight: '60%', unit: 'mm/h excess' },
      { labelEn: 'Relative Humidity Atmospheric Balance', labelHi: 'सापेक्ष आर्द्रता संतुलन', weight: '40%', unit: '% RH' },
    ],
    scientificVariablesEn: [
      'Hourly Precipitation Intensity (mm/h)',
      'Hortonian Saturated Overland Flow exceedance proxy',
      'Relative Humidity Equilibrium (20% to 95% comfort band)',
    ],
    scientificVariablesHi: [
      'प्रति घंटा वर्षा तीव्रता (मिमी/घंटा)',
      'हार्टोनियन सतही अपवाह अधिशेष प्रॉक्सी',
      'सापेक्ष आर्द्रता संतुलन (२०% से ९५%)',
    ],
    scientificLimitationsEn:
      'Runoff potential is modeled via standard loam hydraulic conductivity (fc = 15.0 mm/h), not high-resolution local digital elevation hydro-routing.',
    scientificLimitationsHi:
      'सतही अपवाह की गणना मानक दोमट मिट्टी पारगम्यता पर आधारित है, यह स्थानीय टोपोग्राफिक ड्रेनेज नेटवर्क का पूर्ण 3D सिमुलेशन नहीं है।',
  },
  {
    id: 'agni',
    sanskrit: 'Agni',
    devanagari: 'अग्नि',
    colorHex: '#D9822B',
    auraClass: 'aura-agni',
    tagColor: 'text-[#D9822B]',

    culturalTitleEn: 'Fire & Heat — Thermodynamic Solar Energy Balance',
    culturalTitleHi: 'अग्नि — तापीय संतुलन एवं सौर ऊर्जा नियमन',
    sanskritVerse: '॥ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ॥',
    verseTranslationEn: '“I praise Agni, the radiant flame and metabolic harmonizer of cosmos.” — Rigveda 1.1.1',
    verseTranslationHi: '“मैं अग्नि की स्तुति करता हूँ जो प्रकृति के रूपांतरण और ऊर्जा के साक्षी हैं।” — ऋग्वेद १.१.१',
    culturalPhilosophyEn:
      'Agni governs thermodynamic transformation: solar irradiance driving photosynthesis, diurnal temperature oscillations, and thermal homeostasis across urban and natural environments.',
    culturalPhilosophyHi:
      'अग्नि ब्रह्मांडीय ताप, ऊर्जा और चयापचय का प्रतीक है। सूर्य से मिलने वाली ऊर्जा पौधों में जीवन और ऋतुओं में परिवर्तन का आधार बनती है।',
    ecologicalDutyEn:
      'Mitigate urban heat islands through urban afforestation, preserve vegetative shade canopy, and reduce anthropogenic greenhouse emissions.',
    ecologicalDutyHi:
      'शहरी ताप द्वीपों (हीट आइलैंड्स) को कम करना, हरित आवरण बढ़ाना और अत्यधिक ऊर्जा अपव्यय पर अंकुश लगाना।',

    scientificDomainEn: 'NOAA Heat Index & Fire Weather Vulnerability',
    scientificDomainHi: 'एनओएए हीट इंडेक्स एवं दावानल मौसम जोखिम',
    benchmarkSource: 'NOAA/NWS Rothfusz & USFS Fosberg FWI',
    primaryEquation: 'S_Agni = 0.65 * S_Rothfusz(HI) + 0.35 * S_FFWI(T, RH, Wind)',
    weightsBreakdown: [
      { labelEn: 'Continuous NOAA Rothfusz Heat Index', labelHi: 'एनओएए रॉथफुस्ज़ हीट इंडेक्स', weight: '65%', unit: '°C Apparent' },
      { labelEn: 'Fosberg Fire Weather Index (FFWI)', labelHi: 'फॉसबर्ग दावानल सूचकांक', weight: '35%', unit: '0-100 FFWI' },
    ],
    scientificVariablesEn: [
      '2m Ambient Dry-Bulb Temperature (°C)',
      'Rothfusz 9-Term Polynomial with dry/humid boundary adjustments',
      'Simard (1968) Equilibrium Fuel Moisture & wind spread factor',
    ],
    scientificVariablesHi: [
      '२ मीटर परिवेशी तापमान (°C)',
      'रॉथफुस्ज़ ९-पदों वाला हीट इंडेक्स पॉलीनोमियल',
      'सिमार्ड (१९६८) ईंधन नमी संतुलन एवं पवन प्रसार गुणांक',
    ],
    scientificLimitationsEn:
      'Fosberg FWI measures meteorological fire danger potential, which assumes presence of combustible fuels without accounting for concrete urban surfaces.',
    scientificLimitationsHi:
      'फॉसबर्ग एफडब्ल्यूआई मौसम संबंधी अग्नि जोखिम का मूल्यांकन करता है, यह कंक्रीट निर्मित क्षेत्रों में ईंधन उपलब्धता को अलग से नहीं छांटता।',
  },
  {
    id: 'vayu',
    sanskrit: 'Vayu',
    devanagari: 'वायु',
    colorHex: '#6FA8C9',
    auraClass: 'aura-vayu',
    tagColor: 'text-[#6FA8C9]',

    culturalTitleEn: 'Air — Breath of Life & Atmospheric Purity',
    culturalTitleHi: 'वायु — जीवन-श्वास (प्राण) एवं वायुमंडलीय शुद्धता',
    sanskritVerse: '॥ नमस्ते वायो त्वमेव प्रत्यक्षं ब्रह्मासि ॥',
    verseTranslationEn: '“Salutations to Vayu; you are indeed the perceptible cosmic breath.” — Taittiriya Up. 1.1',
    verseTranslationHi: '“हे वायु! आपको नमन, आप ही प्रत्यक्ष जीवन-ऊर्जा (ब्रह्म) हैं।” — तैत्तिरीयोपनिषद् १.१',
    culturalPhilosophyEn:
      'Vayu is Prana: the invisible, kinetic life-force that oxygenates ecosystems, redistributes moisture globally, and purges pollutants through atmospheric boundary layer ventilation.',
    culturalPhilosophyHi:
      'वायु प्रत्यक्ष प्राण है जो पृथ्वी के हर प्राणी को श्वास प्रदान करती है और पवन के वेग से बादलों और तापमान का संतुलन बनाए रखती है।',
    ecologicalDutyEn:
      'Eliminate industrial particulate emissions, eliminate crop stubble burning, transition to zero-emission mobility, and expand urban green corridors.',
    ecologicalDutyHi:
      'कणिकीय वायु प्रदूषण पर रोक, पराली जलाने से मुक्ति और स्वच्छ ऊर्जा गतिशीलता को प्रोत्साहन।',

    scientificDomainEn: 'Fine Particulates (PM2.5) & Ventilation Capacity',
    scientificDomainHi: 'सूक्ष्म कण प्रदूषण (PM2.5) एवं वेंटिलेशन क्षमता',
    benchmarkSource: 'WHO 2021 Global Air Quality Guidelines',
    primaryEquation: 'S_Vayu = min(S_chem, 0.80 * S_chem + 0.20 * S_vent)  [PM2.5 > 150 ⇒ S_Vayu = 0]',
    weightsBreakdown: [
      { labelEn: 'Fine Particulate Matter (PM2.5 WHO)', labelHi: 'सूक्ष्म कण प्रदूषण PM2.5 (WHO)', weight: '80%', unit: 'μg/m³' },
      { labelEn: 'Ventilation Dispersion (Wind Speed)', labelHi: 'वायुमंडलीय वेंटिलेशन फैलाव', weight: '20%', unit: 'km/h' },
    ],
    scientificVariablesEn: [
      'PM2.5 mass concentration (optimal ≤ 5.0 μg/m³ WHO standard)',
      '10m Wind Speed ventilation dispersion proxy',
      'Non-linear Pollutant Ceiling Rule preventing wind from masking toxic smog',
    ],
    scientificVariablesHi: [
      'PM2.5 द्रव्यमान सांद्रता (सर्वोत्तम ≤ ५.० μg/m³ WHO मानक)',
      '१० मीटर पवन गति वेंटिलेशन प्रॉक्सी',
      'अरेखीय प्रदूषक सीलिंग नियम: जहरीली हवा पवन से छिप नहीं सकती',
    ],
    scientificLimitationsEn:
      'Chemical purity is scored primarily from PM2.5 and US AQI feeds; secondary pollutants (NO2, SO2, O3) are integrated into advisory hazard flags.',
    scientificLimitationsHi:
      'रासायनिक शुद्धता मुख्य रूप से PM2.5 और AQI पर आधारित है; अन्य गैसें (NO2, SO2) स्वतंत्र चेतावनी स्तर पर जांची जाती हैं।',
  },
  {
    id: 'akash',
    sanskrit: 'Akash',
    devanagari: 'आकाश',
    colorHex: '#7A6C9E',
    auraClass: 'aura-akash',
    tagColor: 'text-[#7A6C9E]',

    culturalTitleEn: 'Ether & Space — Celestial Pressure & Atmospheric Envelope',
    culturalTitleHi: 'आकाश — वायुमंडलीय आवरण, सौर विकिरण एवं अनंत अंतरिक्ष',
    sanskritVerse: '॥ खं ब्रह्म — सर्वव्यापिनं सर्वभूतप्रतिष्ठितम् ॥',
    verseTranslationEn: '“The space is universal consciousness holding all creation.” — Brihadaranyaka Up. 5.1',
    verseTranslationHi: '“आकाश वह अनंत स्थान है जिसमें समस्त ब्रह्मांड समाहित है।” — बृहदारण्यकोपनिषद् ५.१',
    culturalPhilosophyEn:
      'Akash is the boundless subtle medium: the atmospheric envelope that shields planetary life from solar UV radiation, regulates barometric equilibrium, and provides space for the other four elements to interact.',
    culturalPhilosophyHi:
      'आकाश वह सूक्ष्म तत्व है जो पृथ्वी को सूर्य की हानिकारक पराबैंगनी किरणों से बचाता है और अन्य चारों तत्वों को कार्य करने का स्थान देता है।',
    ecologicalDutyEn:
      'Protect stratospheric ozone through CFC phaseouts, prevent light and electromagnetic atmospheric clutter, and maintain clear sky visibility.',
    ecologicalDutyHi:
      'ओजोन परत की रक्षा, प्रकाश प्रदूषण पर नियंत्रण और स्वच्छ आकाश की दृश्यता का संरक्षण।',

    scientificDomainEn: 'Altimetric Pressure & Solar Radiative Balance',
    scientificDomainHi: 'बैरोमीटर दबाव संतुलन एवं सौर पराबैंगनी विकिरण',
    benchmarkSource: 'ICAO Doc 7488 & WHO Global Solar UV Index',
    primaryEquation: 'Pref(H) = 1013.25*(1 - 2.25577e-5*H)^5.25588,  S_Akash = 0.45*S_p + 0.30*S_cloud + 0.25*S_uv',
    weightsBreakdown: [
      { labelEn: 'Altimetrically-Reduced Pressure Deviation', labelHi: 'ऊंचाई-समायोजित वायुमंडलीय दबाव', weight: '45%', unit: 'hPa Δ' },
      { labelEn: 'Cloud Cover Radiative Balance', labelHi: 'मेघ आवरण विकिरण संतुलन', weight: '30%', unit: '% CC' },
      { labelEn: 'Solar UV Index Radiation Hazard', labelHi: 'सौर पराबैंगनी सूचकांक (UV)', weight: '25%', unit: 'UV Index' },
    ],
    scientificVariablesEn: [
      'ICAO Standard Atmosphere Doc 7488 barometric elevation reduction',
      'Total Cloud Cover Radiative Albedo (10% to 95% optimal band)',
      'WHO Solar UV Index penalty decay (0 to 11+)',
    ],
    scientificVariablesHi: [
      'आईसीएओ मानक वायुमंडल ऊंचाई बैरोमीटर दबाव कमी सूत्र',
      'कुल मेघ आवरण विकिरण संतुलन (१०% से ९५%)',
      'डब्ल्यूएचओ सौर पराबैंगनी (UV) पेनल्टी वक्र',
    ],
    scientificLimitationsEn:
      'High-altitude locations utilize ICAO barometric reduction to prevent natural elevation from being falsely penalized as an atmospheric anomaly.',
    scientificLimitationsHi:
      'पहाड़ी स्थानों के लिए ऊंचाई-समायोजित फॉर्मूला प्रयोग किया जाता है ताकि प्राकृतिक ऊंचाई को मौसम की खराबी न माना जाए।',
  },
];

export const Scene03Elements: React.FC<Scene03ElementsProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<'cultural' | 'scientific' | 'both'>('both');

  const isHi = language === 'hi';
  const currentElement = MAHABHUTA_ELEMENTS_DATA[selectedElementIndex];

  const handleNextClick = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('engine');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="elements"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300"
      aria-label="Chapter 03: The Panch Mahabhuta Framework"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-4">
            <span className="font-bold">03</span>
            <span>•</span>
            <span>{isHi ? 'पंचमहाभूत ढाँचा' : 'The Five Primordial Elements'}</span>
          </div>

          <h2 className="text-fluid-title font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {isHi ? (
              <>
                प्राचीन पारिस्थितिक दर्शन, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#C97B4A] via-[#1B6B93] to-[#7A6C9E] bg-clip-text text-transparent">
                  आधुनिक उपग्रह विज्ञान का संगम।
                </span>
              </>
            ) : (
              <>
                Ancient Ecological Wisdom. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#C97B4A] via-[#1B6B93] to-[#7A6C9E] bg-clip-text text-transparent">
                  Modern Satellite Telemetry.
                </span>
              </>
            )}
          </h2>

          <p className="text-fluid-sub text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-balance">
            {isHi
              ? 'पंचमहाभूत को हमने एक पारदर्शी व्याख्यात्मक ढाँचे के रूप में विकसित किया है—यह कोई ब्लैक-बॉक्स नहीं, बल्कि उपग्रह संकेतों का सुगम और वैज्ञानिक वर्गीकरण है।'
              : 'The Panch Mahabhuta serves as a human-centric interpretive framework. Explore each element through its philosophical cultural lens alongside its rigorous mathematical equations and scientific provenance.'}
          </p>
        </div>

        {/* Two-Layer Perspective Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
          
          {/* Dual Perspective Toggle Buttons */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/60 dark:bg-white/5 border border-slate-300/60 dark:border-white/10">
            <button
              onClick={() => setActiveLayer('cultural')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeLayer === 'cultural'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHi ? 'सांस्कृतिक दृष्टिकोण' : 'Cultural Lens'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('scientific')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeLayer === 'scientific'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{isHi ? 'वैज्ञानिक संकेत' : 'Scientific Signals'}</span>
            </button>

            <button
              onClick={() => setActiveLayer('both')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                activeLayer === 'both'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isHi ? 'दोनों परिप्रेक्ष्य (Dual)' : 'Dual View'}</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500 flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Select an element below to inspect telemetry:</span>
          </div>
        </div>

        {/* 5 Element Interactive Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {MAHABHUTA_ELEMENTS_DATA.map((elem, idx) => {
            const isSelected = selectedElementIndex === idx;
            return (
              <button
                key={elem.id}
                onClick={() => setSelectedElementIndex(idx)}
                className={`touch-target p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-transparent text-white shadow-xl scale-105 ring-2 ring-white/20'
                    : 'bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
                }`}
                style={isSelected ? { backgroundColor: elem.colorHex } : {}}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[11px] opacity-75">0{idx + 1}</span>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: isSelected ? '#FFFFFF' : elem.colorHex }}
                  />
                </div>
                <div className="mt-2">
                  <div className="font-serif font-bold text-base sm:text-lg leading-tight">
                    {elem.sanskrit}
                  </div>
                  <div className="font-devanagari text-xs opacity-80">
                    {elem.devanagari}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* The Selected Element Card Showcase */}
        <ElementTwoLayerCard element={currentElement} activeLayer={activeLayer} />

        {/* Chapter 03 to Chapter 04 Transition Action */}
        <div className="mt-14 text-center">
          <button
            onClick={handleNextClick}
            className="touch-target inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <span>{isHi ? 'अध्याय ४: बुद्धिमत्ता इंजन देखें' : 'Proceed to Chapter 04: The Intelligence Engine'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
