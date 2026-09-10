import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  appName: { en: 'PRAKRUshTI', hi: 'प्रकृति' },
  tagline: { 
    en: 'One Earth. One ecosystem. One shared responsibility.', 
    hi: 'एक पृथ्वी। एक पारिस्थितिकी तंत्र। एक साझा जिम्मेदारी।' 
  },
  subtitle: {
    en: 'AI Environmental Health Platform powered by Panch Mahabhuta Framework',
    hi: 'पंचमहाभूत ढाँचे पर आधारित एआई पर्यावरणीय स्वास्थ्य मंच'
  },
  searchPlaceholder: {
    en: 'Search any location on Earth (e.g., Tokyo, Nairobi, Pune, London, São Paulo)...',
    hi: 'पृथ्वी पर किसी भी स्थान को खोजें (जैसे: पुणे, टोक्यो, नैरोबी, लंदन)...'
  },
  prakrutiScore: { en: 'Prakruti Score', hi: 'प्रकृति स्कोर' },
  overallStatus: { en: 'Overall State', hi: 'समग्र स्थिति' },
  fiveElements: { en: 'Panch Mahabhuta Analysis', hi: 'पंचमहाभूत विश्लेषण' },
  weatherOverview: { en: 'Live Weather & Atmospheric Conditions', hi: 'लाइव मौसम एवं वायुमंडलीय स्थिति' },
  disasterRisk: { en: 'Natural Hazard & Stress Indicators', hi: 'प्राकृतिक आपदा एवं तनाव संकेतक' },
  aiInsights: { en: 'AI Environmental Insights', hi: 'एआई पर्यावरणीय विश्लेषण' },
  recommendations: { en: 'Actionable Recommendations', hi: 'कार्रवाई योग्य अनुशंसाएँ' },
  forecastTitle: { en: '7-Day Climate & Hazard Outlook', hi: '7-दिवसीय जलवायु और जोखिम पूर्वानुमान' },
  compareMode: { en: 'Compare Cities', hi: 'शहरों की तुलना करें' },
  globalHotspots: { en: 'Global Hotspots Map', hi: 'वैश्विक हॉटस्पॉट मानचित्र' },
  whatIfSimulator: { en: 'Climate What-If Simulator', hi: 'जलवायु क्या-अगर सिमुलेटर' },
  knowledgeBase: { en: 'Knowledge & Philosophy', hi: 'ज्ञान एवं दर्शन' },
  aboutUs: { en: 'About PRAKRUshTI', hi: 'प्रकृति के बारे में' },
  exportReport: { en: 'Export Dossier', hi: 'रिपोर्ट डाउनलोड करें' },
  prithvi: { en: 'Prithvi (Earth)', hi: 'पृथ्वी (भूमि)' },
  jal: { en: 'Jal (Water)', hi: 'जल (पानी)' },
  agni: { en: 'Agni (Fire)', hi: 'अग्नि (ऊर्जा)' },
  vayu: { en: 'Vayu (Air)', hi: 'वायु (हवा)' },
  akash: { en: 'Akash (Space)', hi: 'आकाश (अंतरिक्ष)' },
  temperature: { en: 'Temperature', hi: 'तापमान' },
  feelsLike: { en: 'Feels Like', hi: 'महसूस हो रहा है' },
  humidity: { en: 'Humidity', hi: 'आर्द्रता' },
  precipitation: { en: 'Precipitation', hi: 'वर्षा' },
  windSpeed: { en: 'Wind Speed', hi: 'पवन की गति' },
  aqiIndex: { en: 'Air Quality (AQI)', hi: 'वायु गुणवत्ता (AQI)' },
  uvIndex: { en: 'UV Index', hi: 'यूवी इंडेक्स' },
  pressure: { en: 'Atmospheric Pressure', hi: 'वायुमंडलीय दबाव' },
  soilMoisture: { en: 'Soil Moisture', hi: 'मृदा नमी' },
  healthyScore: { en: 'Healthy / Optimal', hi: 'उत्कृष्ट / स्वस्थ' },
  balancedScore: { en: 'Balanced', hi: 'संतुलित' },
  stressedScore: { en: 'Under Stress', hi: 'तनावग्रस्त' },
  criticalScore: { en: 'Critical Hazard', hi: 'अत्यधिक गंभीर' },
  viewDetails: { en: 'View Detailed Breakdown', hi: 'विस्तृत विवरण देखें' },
  close: { en: 'Close', hi: 'बंद करें' },
  printPDF: { en: 'Print / Save PDF Report', hi: 'प्रिंट / पीडीएफ रिपोर्ट सहेजें' },
  disclaimerText: {
    en: 'PRAKRUshTI scoring is an educational synthesis — a cultural and conceptual lens — not a peer-reviewed scientific index. Disaster-risk indicators are decision-support only.',
    hi: 'प्रकृति स्कोरिंग एक सांस्कृतिक एवं अवधारणात्मक ढाँचा है। यह आधिकारिक सरकारी चेतावनी प्रणाली (जैसे NDMA, NOAA) का स्थान नहीं लेता है।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
