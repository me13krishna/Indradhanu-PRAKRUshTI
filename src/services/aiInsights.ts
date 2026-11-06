import type {
  LocationData,
  WeatherData,
  HazardRisk,
  ElementScore,
  MahabhutaElementKey,
  ExplainabilityData,
  SafetyAdvisoryItem,
} from '../types/prakrushti';

export interface AIInsightOutput {
  insightsEnglish: string;
  insightsHindi: string;
  recommendationsEnglish: string[];
  recommendationsHindi: string[];
}

export function generateAIInsights(
  location: LocationData,
  prakrutiScore: number,
  elements: Record<MahabhutaElementKey, ElementScore>,
  weather: WeatherData,
  hazardRisk: HazardRisk,
  explainability?: ExplainabilityData,
  safetyAdvisories?: SafetyAdvisoryItem[]
): AIInsightOutput {
  const cityName = location.name.split(',')[0].trim();

  // Find lowest and highest scoring elements
  const elementEntries = Object.entries(elements) as [MahabhutaElementKey, ElementScore][];
  elementEntries.sort((a, b) => a[1].score - b[1].score);
  const weakest = elementEntries[0][1];
  const strongest = elementEntries[elementEntries.length - 1][1];

  const primaryStressKey = explainability?.primaryStressDriver;
  const primaryStressElement = primaryStressKey ? elements[primaryStressKey] : weakest;
  const stressDelta = primaryStressKey && explainability ? explainability.attributions[primaryStressKey] : undefined;

  const primaryResilienceKey = explainability?.primaryResiliencePillar;
  const primaryResilienceElement = primaryResilienceKey ? elements[primaryResilienceKey] : strongest;
  const resilienceDelta = primaryResilienceKey && explainability ? explainability.attributions[primaryResilienceKey] : undefined;

  // --------------------------------------------------------------------------
  // ENGLISH DIAGNOSTIC SYNTHESIS (GROUNDED & EXPLAINABLE)
  // --------------------------------------------------------------------------
  let summaryEn = `${cityName} holds a composite Prakruti Score of ${prakrutiScore}/100, reflecting `;

  if (prakrutiScore >= 75) {
    summaryEn += `a high state of environmental equilibrium across the Panch Mahabhuta framework. `;
  } else if (prakrutiScore >= 55) {
    summaryEn += `a moderate environmental balance with identifiable sub-system stresses. `;
  } else if (prakrutiScore >= 35) {
    summaryEn += `significant environmental stress requiring targeted conservation and public health measures. `;
  } else {
    summaryEn += `critical environmental degradation with acute risk factors across core biological and atmospheric elements. `;
  }

  // Explain primary stress driver and attribution
  if (primaryStressElement.score < 70) {
    summaryEn += `The primary environmental stress driver is ${primaryStressElement.englishName} (${primaryStressElement.sanskritName}) at ${primaryStressElement.score}/100`;
    if (stressDelta != null && stressDelta < 0) {
      summaryEn += `, which depresses the overall composite score by ${Math.abs(stressDelta)} points through marginal factor drag. `;
    } else {
      summaryEn += `. `;
    }

    if (primaryStressKey === 'vayu') {
      const pmVal = weather.pm2_5 != null ? `${weather.pm2_5} µg/m³` : `AQI ${weather.aqi}`;
      summaryEn += `Atmospheric particulate load (${pmVal}) activates the non-linear pollutant ceiling, limiting respiratory safety. `;
    } else if (primaryStressKey === 'agni') {
      summaryEn += `Thermal stress indicators (ambient ${weather.temperatureC}°C, relative humidity ${weather.humidityPct}%) increase apparent heat index stress and wildfire fuel combustion potential. `;
    } else if (primaryStressKey === 'jal') {
      summaryEn += `Precipitation levels (${weather.precipitationMm} mm/h) or relative humidity imbalances challenge local soil infiltration capacity. `;
    } else if (primaryStressKey === 'prithvi') {
      const moistureVal = weather.soilMoistureM3M3 != null ? `${weather.soilMoistureM3M3} m³/m³` : `${weather.soilMoisturePct}%`;
      summaryEn += `Topsoil moisture (${moistureVal}) or surface ground temperatures indicate surface desiccation or land pressure. `;
    } else if (primaryStressKey === 'akash') {
      summaryEn += `Barometric anomalies relative to elevation or elevated solar UV index (${weather.uvIndex ?? 4.5}) indicate upper atmospheric perturbation. `;
    }
  }

  // Highlight stabilizing resilience pillar
  if (primaryResilienceElement.score >= 65) {
    summaryEn += `Conversely, ${primaryResilienceElement.englishName} (${primaryResilienceElement.sanskritName}) acts as the main ecological buffer at ${primaryResilienceElement.score}/100`;
    if (resilienceDelta != null && resilienceDelta > 0) {
      summaryEn += `, providing +${resilienceDelta} points of resilience support. `;
    } else {
      summaryEn += `. `;
    }
  }

  // Add safety advisory callouts
  if (safetyAdvisories && safetyAdvisories.length > 0) {
    const criticalAdv = safetyAdvisories.find(a => a.level === 'critical');
    if (criticalAdv) {
      summaryEn += `CRITICAL ADVISORY: ${criticalAdv.title} — ${criticalAdv.message} `;
    }
  }

  if (explainability) {
    summaryEn += `Dataset evaluation exhibits ${explainability.confidenceScore}% empirical confidence based on ECMWF IFS, Copernicus CAMS, and USGS observational feeds.`;
  }

  // --------------------------------------------------------------------------
  // HINDI DIAGNOSTIC SYNTHESIS (BILINGUAL INTEGRITY)
  // --------------------------------------------------------------------------
  let summaryHi = `${cityName} का समग्र प्रकृति स्कोर ${prakrutiScore}/100 है, जो पंचमहाभूत प्रणाली के अंतर्गत `;

  if (prakrutiScore >= 75) {
    summaryHi += `एक उत्कृष्ट और संतुलित पारिस्थितिक स्थिति को दर्शाता है। `;
  } else if (prakrutiScore >= 55) {
    summaryHi += `मध्यम पर्यावरणीय संतुलन को दर्शाता है, जिसमें कुछ तत्वों पर विशिष्ट दबाव है। `;
  } else if (prakrutiScore >= 35) {
    summaryHi += `पर्यावरणीय तनाव की स्थिति को प्रदर्शित करता है, जिसके लिए सक्रिय प्रबंधन आवश्यक है। `;
  } else {
    summaryHi += `गंभीर पर्यावरणीय क्षरण और उच्च जोखिम की स्थिति को दर्शाता है। `;
  }

  if (primaryStressElement.score < 70) {
    summaryHi += `वर्तमान में मुख्य पर्यावरणीय दबाव ${primaryStressElement.sanskritName} (${primaryStressElement.englishName}) तत्व पर केंद्रित है (${primaryStressElement.score}/100)`;
    if (stressDelta != null && stressDelta < 0) {
      summaryHi += `, जो समग्र स्कोर को ${Math.abs(stressDelta)} अंक तक नीचे खींच रहा है। `;
    } else {
      summaryHi += `। `;
    }

    if (primaryStressKey === 'vayu') {
      summaryHi += `हवा में पार्टिकुलेट मैटर (AQI ${weather.aqi}) के कारण श्वसन सुरक्षा प्रभावित हो रही है। `;
    } else if (primaryStressKey === 'agni') {
      summaryHi += `उच्च तापमान (${weather.temperatureC}°C) और तापीय सूचकांक स्थानीय पर्यावरण पर ताप-तनाव उत्पन्न कर रहे हैं। `;
    } else if (primaryStressKey === 'jal') {
      summaryHi += `वर्षा की तीव्रता (${weather.precipitationMm} मिमी/घंटा) या आर्द्रता के असंतुलन से जल-संसाधनों पर प्रभाव पड़ रहा है। `;
    } else if (primaryStressKey === 'prithvi') {
      summaryHi += `ऊपरी मिट्टी में नमी की कमी या सतह का तापमान भूमि-स्थिरता को प्रभावित कर रहा है। `;
    }
  }

  if (primaryResilienceElement.score >= 65) {
    summaryHi += `इसके विपरीत, ${primaryResilienceElement.sanskritName} तत्व (${primaryResilienceElement.score}/100) पर्यावरण को स्थिरता और संतुलन प्रदान कर रहा है। `;
  }

  if (safetyAdvisories && safetyAdvisories.length > 0) {
    const criticalAdv = safetyAdvisories.find(a => a.level === 'critical');
    if (criticalAdv) {
      summaryHi += `महत्वपूर्ण चेतावनी: ${criticalAdv.title} — ${criticalAdv.message} `;
    }
  }

  summaryHi += `यह विश्लेषण वास्तविक संख्यात्मक डेटा (ECMWF, CAMS, USGS) पर आधारित है।`;

  // --------------------------------------------------------------------------
  // CATEGORIZED ACTIONABLE RECOMMENDATIONS GROUNDED IN REAL METRICS
  // --------------------------------------------------------------------------
  const recsEn: string[] = [];
  const recsHi: string[] = [];

  // 1. Air / Vayu Recommendation
  if (weather.aqi > 150 || (weather.pm2_5 != null && weather.pm2_5 > 55)) {
    recsEn.push(`Air Quality Intervention: Ambient PM2.5 (${weather.pm2_5 ?? weather.aqi} µg/m³) exceeds safe biological limits. Wear certified N95 respirators outdoors and operate HEPA indoor air filtration.`);
    recsHi.push(`वायु सुरक्षा हस्तक्षेप: PM2.5 का स्तर (${weather.pm2_5 ?? weather.aqi} µg/m³) स्वास्थ्य सीमाओं से अधिक है। बाहर निकलते समय N95 मास्क पहनें और इनडोर एयर प्यूरीफायर का प्रयोग करें।`);
  } else if (weather.aqi > 80) {
    recsEn.push(`Air Quality Awareness: Moderate particulate load (AQI ${weather.aqi}). Sensitive groups should reduce strenuous outdoor endurance workouts during peak morning hours.`);
    recsHi.push(`वायु गुणवत्ता सतर्कता: हवा में मध्यम स्तर का प्रदूषण (AQI ${weather.aqi}) है। संवेदनशील व्यक्ति सुबह के समय भारी व्यायाम से बचें।`);
  } else {
    recsEn.push(`Atmospheric Preservation: Particulate concentrations remain favorable (AQI ${weather.aqi}). Protect local green cover and maintain urban tree buffers to preserve clean airflow.`);
    recsHi.push(`वायु संरक्षण: हवा की गुणवत्ता उत्तम है (AQI ${weather.aqi})। इस स्वच्छ स्थिति को बनाए रखने के लिए स्थानीय हरित क्षेत्रों का संरक्षण करें।`);
  }

  // 2. Heat / Agni Recommendation
  if (weather.temperatureC >= 36 || hazardRisk.heat === 'critical' || hazardRisk.heat === 'high') {
    recsEn.push(`Thermal Stress Mitigation: High heat index (${weather.temperatureC}°C). Implement scheduled work-rest cycles for outdoor laborers, activate public hydration stations, and avoid sun exposure between 12:00–16:00.`);
    recsHi.push(`ताप-तनाव प्रबंधन: अत्यधिक तापमान (${weather.temperatureC}°C) के कारण दोपहर 12 से 4 बजे के बीच सीधी धूप से बचें और पर्याप्त मात्रा में तरल पदार्थों का सेवन करें।`);
  } else if (hazardRisk.fire === 'high' || hazardRisk.fire === 'critical') {
    recsEn.push(`Wildfire & Fuel Hazard: Fosberg Fire Weather Index elevated due to dry air (${weather.humidityPct}% RH) and wind. Enforce burn bans and monitor dry brush perimeters.`);
    recsHi.push(`अग्नि जोखिम सतर्कता: शुष्क हवा (${weather.humidityPct}%) और तेज हवाओं के कारण आग लगने का खतरा अधिक है। खुले में आग जलाने से बचें।`);
  } else {
    recsEn.push(`Thermal Efficiency: Ambient temperature (${weather.temperatureC}°C) provides balanced conditions. Optimize solar energy capture and natural passive building ventilation.`);
    recsHi.push(`तापीय अनुकूलन: वर्तमान तापमान (${weather.temperatureC}°C) अनुकूल है। सौर ऊर्जा उपयोग और प्राकृतिक वेंटिलेशन के लिए यह आदर्श समय है।`);
  }

  // 3. Water / Jal Recommendation
  if (weather.precipitationMm > 15 || hazardRisk.flood !== 'low') {
    recsEn.push(`Hydrological Defense: Torrential precipitation (${weather.precipitationMm} mm/h) exceeds topsoil infiltration capacity. Clear storm drains, secure culverts, and monitor low-lying flood-prone roads.`);
    recsHi.push(`जलभराव एवं बाढ़ सुरक्षा: भारी वर्षा (${weather.precipitationMm} मिमी/घंटा) से जलभराव का खतरा है। नालों की सफाई सुनिश्चित करें और निचले इलाकों में सतर्क रहें।`);
  } else if (weather.humidityPct < 30) {
    recsEn.push(`Moisture Conservation: Low atmospheric humidity (${weather.humidityPct}%). Adopt drip irrigation and targeted soil mulching to conserve moisture in municipal parks and farmlands.`);
    recsHi.push(`नमी संरक्षण: कम वायुमंडलीय आर्द्रता (${weather.humidityPct}%) को देखते हुए ड्रिप सिंचाई और मल्चिंग के माध्यम से मिट्टी की नमी को सुरक्षित रखें।`);
  } else {
    recsEn.push(`Water Balance: Precipitation and humidity (${weather.humidityPct}%) are balanced. Maintain sustainable rainwater harvesting recharge pits for ground aquifers.`);
    recsHi.push(`जल संतुलन: वर्षा और आर्द्रता का स्तर संतुलित है। भूजल स्तर बढ़ाने के लिए वर्षा जल संचयन प्रणालियों को सक्रिय रखें।`);
  }

  // 4. Land & Seismic / Prithvi Recommendation
  if (hazardRisk.seismic === 'critical' || hazardRisk.seismic === 'high') {
    recsEn.push(`Tectonic Precaution: Active regional seismic signal recorded. Verify structural emergency exits and inspect foundation stability for critical civil structures.`);
    recsHi.push(`भूगर्भीय सतर्कता: क्षेत्रीय भूकंपीय गतिविधि के संकेत मिले हैं। आपातकालीन निकास मार्गों को खुला रखें और संवेदनशील ढांचों की जांच करें।`);
  } else {
    const soilMoistureDisplay = weather.soilMoistureM3M3 != null ? `${weather.soilMoistureM3M3} m³/m³` : `${weather.soilMoisturePct}%`;
    recsEn.push(`Soil Health Stewardship: Topsoil volumetric moisture stands at ${soilMoistureDisplay}. Promote organic compost incorporation and cover cropping to resist soil compaction and wind erosion.`);
    recsHi.push(`मृदा स्वास्थ्य संवर्धन: ऊपरी मिट्टी में नमी ${soilMoistureDisplay} है। जैविक खाद और आच्छादन फसलों का उपयोग कर मिट्टी के कटाव को रोकें।`);
  }

  return {
    insightsEnglish: summaryEn,
    insightsHindi: summaryHi,
    recommendationsEnglish: recsEn,
    recommendationsHindi: recsHi,
  };
}
