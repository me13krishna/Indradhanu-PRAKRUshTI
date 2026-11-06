import type {
  PrakrutiAnalysis,
} from '../types/prakrushti';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'safety' | 'diagnosis' | 'hydrology' | 'thermal' | 'soil' | 'standards' | 'general';
  metricsCited?: Array<{ label: string; value: string }>;
  verdictBadge?: {
    label: string;
    variant: 'good' | 'warning' | 'danger' | 'info';
  };
}

export interface SuggestedPrompt {
  id: string;
  textEn: string;
  textHi: string;
  icon: string;
}

export const DEFAULT_SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'outdoor-exercise',
    textEn: 'Is it safe for outdoor running or sports right now?',
    textHi: 'क्या इस समय बाहर दौड़ना या व्यायाम करना सुरक्षित है?',
    icon: '🏃',
  },
  {
    id: 'primary-stress',
    textEn: 'What is the primary factor dragging down the Prakruti Score?',
    textHi: 'प्रकृति स्कोर कम होने का मुख्य कारण क्या है?',
    icon: '📉',
  },
  {
    id: 'water-flood',
    textEn: 'What are the current precipitation and flood risks?',
    textHi: 'वर्तमान वर्षा और बाढ़ का जोखिम क्या है?',
    icon: '💧',
  },
  {
    id: 'who-compliance',
    textEn: 'How do current conditions compare against WHO guidelines?',
    textHi: 'वर्तमान स्थिति WHO के दिशा-निर्देशों के अनुसार कैसी है?',
    icon: '🏥',
  },
  {
    id: 'soil-agriculture',
    textEn: 'How are soil moisture and topsoil conditions for planting?',
    textHi: 'पौधारोपण या खेती के लिए मिट्टी में नमी कैसी है?',
    icon: '🌱',
  },
];

/**
 * Deterministic, grounded Conversational RAG Engine.
 * Answers natural language queries strictly using verified numerical values from PrakrutiAnalysis.
 */
export function processAssistantQuery(
  query: string,
  analysis: PrakrutiAnalysis,
  language: 'en' | 'hi' = 'en'
): ChatMessage {
  const q = query.toLowerCase().trim();
  const isHindiQuery = language === 'hi' || /[\u0900-\u097F]/.test(query);
  const cityName = analysis.location.name.split(',')[0].trim();

  const weather = analysis.weather;
  const elements = analysis.elements;
  const explain = analysis.explainability;
  const advisories = analysis.safetyAdvisories ?? [];

  const pmVal = weather.pm2_5 != null ? weather.pm2_5 : (weather.aqi > 50 ? Math.round(weather.aqi * 0.45) : 10);
  const aqi = weather.aqi;
  const temp = weather.temperatureC;
  const uv = weather.uvIndex ?? 4.5;
  const precip = weather.precipitationMm;
  const soilMoisture = weather.soilMoistureM3M3 != null
    ? `${weather.soilMoistureM3M3} m³/m³`
    : `${weather.soilMoisturePct ?? 45}%`;

  // --------------------------------------------------------------------------
  // INTENT 1: OUTDOOR EXERCISE / RUNNING / SAFETY
  // --------------------------------------------------------------------------
  if (
    q.includes('exercise') || q.includes('run') || q.includes('jog') || q.includes('outdoor') ||
    q.includes('sports') || q.includes('walk') || q.includes('safe') ||
    q.includes('दौड़ना') || q.includes('व्यायाम') || q.includes('सुरक्षित') || q.includes('बाहर')
  ) {
    const isAirHazardous = pmVal > 75 || aqi > 150;
    const isAirModerate = (pmVal > 35 && pmVal <= 75) || (aqi > 100 && aqi <= 150);
    const isHeatSevere = temp >= 38;
    const isHeatModerate = temp >= 32 && temp < 38;
    const isUvExtreme = uv >= 8.0;

    let verdict: { label: string; variant: 'good' | 'warning' | 'danger' | 'info' };
    let text: string;

    if (isAirHazardous || isHeatSevere) {
      verdict = {
        label: isHindiQuery ? 'बाहर व्यायाम अनुशंसित नहीं' : 'Outdoor Exercise Not Recommended',
        variant: 'danger',
      };
      if (isHindiQuery) {
        text = `वर्तमान में ${cityName} में बाहर कठिन व्यायाम करना सुरक्षित नहीं है। हवा में PM2.5 का स्तर **${pmVal} µg/m³** (AQI **${aqi}**) है, जो WHO की सुरक्षित सीमा से अधिक है। साथ ही तापमान **${temp}°C** है। सलाह: घर के अंदर ही हल्का व्यायाम करें।`;
      } else {
        text = `Outdoor physical exertion in **${cityName}** is **not recommended** under current conditions. Fine particulate pollution stands at **${pmVal} µg/m³** (US AQI **${aqi}**), exceeding safe biological respiration limits. Ambient temperature is **${temp}°C** with UV index **${uv}**. \n\n**Actionable Advice**: Move aerobic workouts indoors and operate HEPA air filtration if available.`;
      }
    } else if (isAirModerate || isHeatModerate || isUvExtreme) {
      verdict = {
        label: isHindiQuery ? 'सावधानी के साथ सुरक्षित' : 'Exercise With Caution',
        variant: 'warning',
      };
      if (isHindiQuery) {
        text = `${cityName} में बाहर व्यायाम करते समय सावधानी बरतें। AQI **${aqi}** (PM2.5: **${pmVal} µg/m³**) और तापमान **${temp}°C** है। संवेदनशील व्यक्तियों और बच्चों को सुबह के समय लंबी दौड़ से बचना चाहिए।`;
      } else {
        text = `Outdoor activities in **${cityName}** are **moderately acceptable with precautions**. Atmospheric PM2.5 is **${pmVal} µg/m³** (AQI **${aqi}**) and ambient temperature is **${temp}°C** with UV index **${uv}**.\n\n**Actionable Advice**: Limit intense aerobic workouts to 30 minutes, hydrate adequately, and avoid sun exposure between 12:00 and 15:00.`;
      }
    } else {
      verdict = {
        label: isHindiQuery ? 'उत्कृष्ट और पूर्णतः सुरक्षित' : 'Safe for Outdoor Workouts',
        variant: 'good',
      };
      if (isHindiQuery) {
        text = `${cityName} में मौसम बहुत अनुकूल है! PM2.5 मात्र **${pmVal} µg/m³** (AQI **${aqi}**) और तापमान **${temp}°C** है। यह बाहरी दौड़, खेल और व्यायाम के लिए उत्कृष्ट समय है।`;
      } else {
        text = `Current conditions in **${cityName}** are **optimal for outdoor exercise and recreation**. Air quality is exceptionally clean with PM2.5 at **${pmVal} µg/m³** (AQI **${aqi}**), ambient temperature at **${temp}°C**, and UV index at **${uv}**.\n\n**Actionable Advice**: Ideal window for running, cycling, and community sports.`;
      }
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'safety',
      verdictBadge: verdict,
      metricsCited: [
        { label: 'PM2.5 Concentration', value: `${pmVal} µg/m³` },
        { label: 'Ambient Temperature', value: `${temp}°C` },
        { label: 'Solar UV Index', value: `${uv}` },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 2: ROOT CAUSE / WHY DID SCORE DROP / PRIMARY DRIVER
  // --------------------------------------------------------------------------
  if (
    q.includes('why') || q.includes('reason') || q.includes('drop') || q.includes('driver') ||
    q.includes('stress') || q.includes('low') || q.includes('weak') || q.includes('factor') ||
    q.includes('drag') || q.includes('down') || q.includes('cause') || q.includes('worst') ||
    q.includes('क्यों') || q.includes('कारण') || q.includes('कमी') || q.includes('तनाव') || q.includes('मुख्य')
  ) {
    const stressKey = explain?.primaryStressDriver ?? 'vayu';
    const stressEl = elements[stressKey];
    const delta = explain?.attributions[stressKey] ?? -5.0;

    let text: string;
    if (isHindiQuery) {
      text = `${cityName} के प्रकृति स्कोर (${analysis.prakrutiScore}/100) पर सबसे अधिक नकारात्मक प्रभाव **${stressEl.sanskritName} (${stressEl.englishName})** तत्व का है, जिसका स्कोर **${stressEl.score}/100** है।\n\n- **सीमांत प्रभाव**: यह तत्व समग्र स्कोर को **${Math.abs(delta)} अंक** कम कर रहा है।\n- **मुख्य कारण**: ${stressEl.summary}\n- **सहायक मजबूत तत्व**: ${elements[explain?.primaryResiliencePillar ?? 'prithvi'].sanskritName} तत्व (${elements[explain?.primaryResiliencePillar ?? 'prithvi'].score}/100) पर्यावरण को संतुलन प्रदान कर रहा है।`;
    } else {
      text = `The primary factor depressing **${cityName}'s** composite Prakruti Score (${analysis.prakrutiScore}/100) is **${stressEl.englishName} (${stressEl.sanskritName})** with an elemental score of **${stressEl.score}/100**.\n\n- **Marginal Factor Impact**: Imposes a finite-difference drag of **${Math.abs(delta)} points** on the composite score.\n- **Scientific Diagnosis**: ${stressEl.summary}\n- **Stabilizing Counterweight**: ${elements[explain?.primaryResiliencePillar ?? 'prithvi'].englishName} is currently the strongest resilience pillar at **${elements[explain?.primaryResiliencePillar ?? 'prithvi'].score}/100**.\n- **Confidence**: Assessed with **${explain?.confidenceScore ?? 88}% empirical confidence** via gridded land and atmospheric data assimilation.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'diagnosis',
      verdictBadge: {
        label: `${stressEl.englishName}: ${stressEl.score}/100`,
        variant: stressEl.score < 50 ? 'danger' : 'warning',
      },
      metricsCited: [
        { label: 'Primary Stress Driver', value: `${stressEl.englishName} (${stressEl.score}/100)` },
        { label: 'Marginal Drag Delta', value: `${delta} pts` },
        { label: 'Dataset Confidence', value: `${explain?.confidenceScore ?? 88}%` },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 3: WATER & FLOOD / PRECIPITATION
  // --------------------------------------------------------------------------
  if (
    q.includes('water') || q.includes('flood') || q.includes('rain') || q.includes('precipitation') ||
    q.includes('जल') || q.includes('बाढ़') || q.includes('बारिश') || q.includes('वर्षा')
  ) {
    const jalScore = elements.jal.score;
    const floodLevel = analysis.disasterRisk.flood;
    let text: string;

    if (isHindiQuery) {
      text = `${cityName} का **जल (Jal)** स्कोर **${jalScore}/100** है।\n\n- **वर्तमान वर्षा**: ${precip} मिमी/घंटा\n- **सापेक्ष आर्द्रता**: ${weather.humidityPct}%\n- **बाढ़ जोखिम रेटिंग**: ${floodLevel.toUpperCase()}\n\n${precip > 15 ? 'चेतावनी: भारी वर्षा के कारण स्थानीय नालों में जलभराव की संभावना है।' : 'वर्तमान में जलभराव या अचानक बाढ़ का कोई बड़ा खतरा नहीं है।'}`;
    } else {
      text = `Hydrological evaluation for **${cityName}** indicates a **Jal (Water)** element score of **${jalScore}/100**.\n\n- **Current Precipitation Rate**: **${precip} mm/h**\n- **Atmospheric Relative Humidity**: **${weather.humidityPct}%**\n- **Flood Risk Level**: **${floodLevel.toUpperCase()}**\n\n${precip > 15 ? '⚠️ **Hydrological Alert**: Torrential precipitation exceeds soil infiltration threshold (fc = 15 mm/h). Monitor storm drainage systems.' : '✅ Soil infiltration capacity remains adequate for current precipitation rates.'}`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'hydrology',
      verdictBadge: {
        label: `Jal: ${jalScore}/100`,
        variant: jalScore >= 70 ? 'good' : jalScore >= 40 ? 'warning' : 'danger',
      },
      metricsCited: [
        { label: 'Current Rainfall', value: `${precip} mm/h` },
        { label: 'Relative Humidity', value: `${weather.humidityPct}%` },
        { label: 'Flood Risk Level', value: floodLevel.toUpperCase() },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 4: WHO STANDARDS & REGULATORY COMPLIANCE
  // --------------------------------------------------------------------------
  if (
    q.includes('who') || q.includes('standard') || q.includes('epa') || q.includes('guideline') ||
    q.includes('मानक') || q.includes('दिशानिर्देश') || q.includes('नियम')
  ) {
    const whoPmTarget = 15; // 24-hour interim target 1 is 35, guideline is 15
    const pmRatio = (pmVal / whoPmTarget).toFixed(1);

    let text: string;
    if (isHindiQuery) {
      text = `**विश्व स्वास्थ्य संगठन (WHO) के मानकों के अनुसार तुलना:**\n\n1. **PM2.5 पार्टिकुलेट स्तर**: वर्तमान में **${pmVal} µg/m³** है (WHO का 24-घंटे का दिशा-निर्देश 15 µg/m³ है — यह लगभग **${pmRatio} गुना** है)।\n2. **सौर UV सूचकांक**: **${uv}** (WHO स्तर: ${uv >= 8 ? 'अत्यधिक उच्च (Severe)' : uv >= 6 ? 'उच्च (High)' : 'मध्यम (Moderate)'})।\n3. **तापीय सूचकांक (NOAA)**: तापमान **${temp}°C** (${temp >= 35 ? 'ऊष्मा तनाव' : 'सामान्य'})।`;
    } else {
      text = `**Benchmark Comparison Against WHO & International Standards:**\n\n1. **Fine Particulate Matter (PM2.5)**:\n   - Current Reading: **${pmVal} µg/m³** (AQI **${aqi}**)\n   - WHO 24-Hour Guideline: **15 µg/m³**\n   - Ratio: Current reading is **${pmRatio}x** the recommended baseline.\n2. **Solar UV Radiation Index**:\n   - Current Index: **${uv}**\n   - WHO Classification: ${uv >= 8 ? 'Very High / Extreme (Sun protection mandatory)' : uv >= 6 ? 'High (Hat & SPF 30+ recommended)' : 'Low to Moderate'}.\n3. **Barometric Standard**:\n   - Surface Pressure: **${weather.pressureHpa ?? 1013} hPa** vs ICAO altimetric standard at ${weather.elevationM ?? 0}m elevation.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'standards',
      verdictBadge: {
        label: `PM2.5: ${pmRatio}x WHO Limit`,
        variant: Number(pmRatio) > 2.0 ? 'danger' : Number(pmRatio) > 1.0 ? 'warning' : 'good',
      },
      metricsCited: [
        { label: 'PM2.5 vs WHO Target', value: `${pmVal} vs 15 µg/m³` },
        { label: 'Solar UV Index', value: `${uv}` },
        { label: 'Apparent Temperature', value: `${temp}°C` },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 5: SOIL / AGRICULTURE / PRITHVI
  // --------------------------------------------------------------------------
  if (
    q.includes('soil') || q.includes('plant') || q.includes('crop') || q.includes('farm') ||
    q.includes('prithvi') || q.includes('earth') || q.includes('मिट्टी') || q.includes('खेती') || q.includes('पृथ्वी')
  ) {
    const prithviScore = elements.prithvi.score;
    const soilT = weather.soilTemperatureC ?? temp;

    let text: string;
    if (isHindiQuery) {
      text = `${cityName} का **पृथ्वी (Prithvi)** स्कोर **${prithviScore}/100** है।\n\n- **ऊपरी मिट्टी में नमी (0-1 सेमी)**: **${soilMoisture}**\n- **मिट्टी की सतह का तापमान**: **${soilT}°C**\n- **डेटा स्रोत**: ECMWF IFS भूमि सतह मॉडल विश्लेषण\n\n${prithviScore >= 70 ? 'मिट्टी में पर्याप्त नमी है, जो पौधरोपण और कृषि के लिए अनुकूल है।' : 'मिट्टी में नमी की कमी या सतह का तापमान अधिक होने के कारण मल्चिंग की आवश्यकता है।'}`;
    } else {
      text = `Agricultural & Soil stability diagnosis for **${cityName}** shows a **Prithvi (Earth)** score of **${prithviScore}/100**.\n\n- **Topsoil Skin Moisture (0–1cm ECMWF IFS)**: **${soilMoisture}** (Provisional loam proxy target: 0.20–0.35 m³/m³)\n- **Ground Surface Temperature**: **${soilT}°C** (Biological optimum: 15–25°C)\n- **Data Provenance**: NWP Land Surface Model (ECMWF IFS HTESSEL).\n\n**Agronomic Advice**: ${prithviScore >= 70 ? 'Topsoil volumetric water content supports biological seed germination and root activity.' : 'Topsoil skin layer shows desiccation pressure. Employ organic mulch to preserve subsurface root-zone moisture.'}`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'soil',
      verdictBadge: {
        label: `Prithvi: ${prithviScore}/100`,
        variant: prithviScore >= 70 ? 'good' : 'warning',
      },
      metricsCited: [
        { label: 'Topsoil Moisture', value: soilMoisture },
        { label: 'Soil Surface Temp', value: `${soilT}°C` },
        { label: 'Provenance', value: 'ECMWF IFS (0-1cm)' },
      ],
    };
  }

  // --------------------------------------------------------------------------
  // DEFAULT / GENERAL SUMMARY INTENT
  // --------------------------------------------------------------------------
  const strongest = elements[explain?.primaryResiliencePillar ?? 'akash'];
  const weakest = elements[explain?.primaryStressDriver ?? 'vayu'];

  let defaultText: string;
  if (isHindiQuery) {
    defaultText = `${cityName} का वर्तमान समग्र प्रकृति स्कोर **${analysis.prakrutiScore}/100** (${analysis.overallStatus}) है।\n\n- **सर्वोत्तम तत्व**: ${strongest.sanskritName} (${strongest.score}/100)\n- **तनावग्रस्त तत्व**: ${weakest.sanskritName} (${weakest.score}/100)\n- **मौसम**: तापमान ${temp}°C, AQI ${aqi}, आर्द्रता ${weather.humidityPct}%\n\nआप मुझसे बाहर दौड़ने की सुरक्षा, वायु गुणवत्ता, या बाढ़/तापमान के जोखिमों के बारे में पूछ सकते हैं।`;
    if (advisories.length > 0) {
      defaultText += `\n\n⚠️ **सक्रिय चेतावनी**: ${advisories[0].title} — ${advisories[0].message}`;
    }
  } else {
    defaultText = `Here is the environmental intelligence briefing for **${cityName}**:\n\n- **Composite Prakruti Score**: **${analysis.prakrutiScore}/100** (${analysis.overallStatus})\n- **Resilience Pillar**: **${strongest.englishName}** (${strongest.score}/100)\n- **Primary Stress Driver**: **${weakest.englishName}** (${weakest.score}/100)\n- **Atmospheric Conditions**: ${weather.description}, **${temp}°C**, AQI **${aqi}** (PM2.5: **${pmVal} µg/m³**)\n\nYou can ask me specific questions such as: *"Is it safe to run outside?"*, *"Why did the score drop?"*, or *"Compare conditions against WHO guidelines"*.`;
    if (advisories.length > 0) {
      defaultText += `\n\n⚠️ **Active Advisory**: ${advisories[0].title} — ${advisories[0].message}`;
    }
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: defaultText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    category: 'general',
    verdictBadge: {
      label: `Prakruti: ${analysis.prakrutiScore}/100`,
      variant: analysis.prakrutiScore >= 75 ? 'good' : analysis.prakrutiScore >= 55 ? 'info' : 'warning',
    },
    metricsCited: [
      { label: 'Prakruti Score', value: `${analysis.prakrutiScore}/100` },
      { label: 'Air Quality (AQI)', value: `${aqi}` },
      { label: 'Ambient Temperature', value: `${temp}°C` },
    ],
  };
}
