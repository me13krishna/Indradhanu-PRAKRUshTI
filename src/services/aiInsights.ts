import type { LocationData, WeatherData, HazardRisk, ElementScore, MahabhutaElementKey } from '../types/prakrushti';

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
  hazardRisk: HazardRisk
): AIInsightOutput {
  const cityName = location.name.split(',')[0];
  
  // Find lowest scoring element to highlight specific vulnerability
  const elementEntries = Object.entries(elements) as [MahabhutaElementKey, ElementScore][];
  elementEntries.sort((a, b) => a[1].score - b[1].score);
  const weakestElement = elementEntries[0][1];
  const strongestElement = elementEntries[elementEntries.length - 1][1];

  // Formulate English Summary
  let summaryEn = `${cityName} currently holds a composite Prakruti Score of ${prakrutiScore}/100, reflecting a `;
  if (prakrutiScore >= 75) {
    summaryEn += `healthy ecological balance across the five Mahabhuta elements. Ambient conditions show clear atmospheric quality (AQI ${weather.aqi}) and manageable thermal levels (${weather.temperatureC}°C). `;
  } else if (prakrutiScore >= 55) {
    summaryEn += `moderate environmental equilibrium. While ${strongestElement.englishName} maintains stability (${strongestElement.score}/100), ${weakestElement.englishName} experiences mild environmental pressure (${weakestElement.score}/100). `;
  } else {
    summaryEn += `heightened state of environmental stress. Substantial pressure is concentrated on ${weakestElement.englishName} (${weakestElement.score}/100) and atmospheric air metrics (AQI ${weather.aqi}). `;
  }

  if (hazardRisk.heat === 'high' || hazardRisk.heat === 'critical') {
    summaryEn += `Elevated ambient heat (${weather.temperatureC}°C) places thermal stress on local ecosystems. Decision-support indicators suggest monitoring heat exposure during peak daylight hours.`;
  } else if (hazardRisk.flood === 'high' || hazardRisk.flood === 'critical') {
    summaryEn += `Substantial rainfall (${weather.precipitationMm} mm) elevates hydrological flood risk. Surface runoff management and drainage oversight are recommended.`;
  } else if (weather.aqi > 150) {
    summaryEn += `Atmospheric particulate load (AQI ${weather.aqi}) requires air quality awareness for vulnerable populations.`;
  } else {
    summaryEn += `Overall weather parameters remain within stable seasonal bounds with low disaster hazard ratings across flood, wildfire, and seismic signals.`;
  }

  // Formulate Hindi Summary
  let summaryHi = `${cityName} का वर्तमान प्रकृति स्कोर ${prakrutiScore}/100 है, जो पंचमहाभूत तत्वों के बीच `;
  if (prakrutiScore >= 75) {
    summaryHi += `एक स्वस्थ एवं उत्कृष्ट पारिस्थितिक संतुलन को दर्शाता है। हवा की गुणवत्ता (AQI ${weather.aqi}) और तापमान (${weather.temperatureC}°C) अनुकूल स्थिति में हैं। `;
  } else if (prakrutiScore >= 55) {
    summaryHi += `मध्यम पर्यावरणीय संतुलन को दर्शाता है। जहाँ ${strongestElement.sanskritName} तत्व (${strongestElement.score}/100) मजबूत स्थिति में है, वहीं ${weakestElement.sanskritName} तत्व (${weakestElement.score}/100) पर थोड़ा दबाव देखा जा रहा है। `;
  } else {
    summaryHi += `पर्यावरणीय तनाव की स्थिति को प्रदर्शित करता है। विशेष रूप से ${weakestElement.sanskritName} तत्व (${weakestElement.score}/100) एवं वायु गुणवत्ता (AQI ${weather.aqi}) पर ध्यान देने की आवश्यकता है। `;
  }
  summaryHi += `यह विश्लेषण वास्तविक आंकड़ों पर आधारित निर्णय-सहायता जानकारी प्रदान करता है।`;

  // Actionable recommendations grounded in data
  const recsEn: string[] = [];
  const recsHi: string[] = [];

  // Rec 1: Water / Jal
  if (weather.precipitationMm > 20 || hazardRisk.flood !== 'low') {
    recsEn.push('Hydrological Management: Ensure local drainage pathways and rainwater retention basins are cleared of debris to accommodate surface runoff.');
    recsHi.push('जल प्रबंधन: जलभराव और बाढ़ की आशंका से निपटने के लिए स्थानीय जल निकासी व्यवस्था को दुरुस्त रखें।');
  } else {
    recsEn.push('Water Conservation: Practice rainwater capture and efficient moisture usage as precipitation levels remain modest.');
    recsHi.push('जल संरक्षण: वर्षा जल संचयन और पानी के नियंत्रित उपयोग को प्राथमिकता दें।');
  }

  // Rec 2: Air / Vayu
  if (weather.aqi > 100) {
    recsEn.push(`Air Quality Safeguard: AQI index stands at ${weather.aqi}. Limit intensive outdoor physical exertion during early morning peak smog hours.`);
    recsHi.push(`वायु सुरक्षा: AQI सूचकांक ${weather.aqi} है। सुबह के समय खुले में अत्यधिक कठिन व्यायाम से बचें।`);
  } else {
    recsEn.push('Atmospheric Health: Air quality is favorable. Support local urban forestry initiatives to maintain low PM2.5 levels.');
    recsHi.push('वायु स्वच्छता: हवा की गुणवत्ता उत्तम है। शहरी हरित क्षेत्रों को बढ़ावा देकर इस स्थिति को बनाए रखें।');
  }

  // Rec 3: Heat / Agni
  if (weather.temperatureC >= 32 || hazardRisk.heat !== 'low') {
    recsEn.push(`Heat Adaptation: Ambient temperature reached ${weather.temperatureC}°C. Increase shade canopy coverage and maintain adequate hydration.`);
    recsHi.push(`तापमान प्रबंधन: तापमान ${weather.temperatureC}°C पहुँच गया है। पर्याप्त मात्रा में जल का सेवन करें और छायादार स्थानों का उपयोग करें।`);
  } else {
    recsEn.push('Thermal Balance: Thermal radiation is moderate. Ideal window for solar energy production and outdoor community activities.');
    recsHi.push('तापीय संतुलन: तापमान सुहावना है। सौर ऊर्जा उत्पादन और बाहरी गतिविधियों के लिए अनुकूल समय है।');
  }

  // Rec 4: Prithvi / Soil
  recsEn.push('Land & Soil Preservation: Promote organic mulching and soil cover to retain moisture and prevent land degradation.');
  recsHi.push('भूमि एवं मृदा संरक्षण: भूमि की उर्वरता और नमी बनाए रखने के लिए प्राकृतिक मल्चिंग और वृक्षारोपण अपनाएं।');

  return {
    insightsEnglish: summaryEn,
    insightsHindi: summaryHi,
    recommendationsEnglish: recsEn,
    recommendationsHindi: recsHi,
  };
}
