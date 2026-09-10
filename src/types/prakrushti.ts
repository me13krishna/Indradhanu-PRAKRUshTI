export type MahabhutaElementKey = 'prithvi' | 'jal' | 'agni' | 'vayu' | 'akash';

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  countryCode?: string | null;
  timezone?: string | null;
}

export interface MetricItem {
  label: string;
  value: string | number;
  unit?: string | null;
  status?: 'good' | 'moderate' | 'poor' | 'critical';
  thresholdText?: string;
}

export interface ElementScore {
  score: number; // 0-100
  status: string; // e.g. "Optimal", "Balanced", "Under Stress", "Severe Stress"
  sanskritName: string;
  englishName: string;
  meaning: string;
  represents: string;
  summary: string;
  color: string; // Hex color code
  keyMetrics: MetricItem[];
}

export interface WeatherData {
  temperatureC: number;
  feelsLikeC: number | null;
  humidityPct: number;
  precipitationMm: number;
  windKph: number;
  aqi: number; // 0 - 500
  weatherCode: number;
  description: string;
  uvIndex?: number;
  pressureHpa?: number;
  soilMoisturePct?: number;
}

export interface HazardRisk {
  flood: 'low' | 'moderate' | 'high' | 'critical';
  heat: 'low' | 'moderate' | 'high' | 'critical';
  fire: 'low' | 'moderate' | 'high' | 'critical';
  storm: 'low' | 'moderate' | 'high' | 'critical';
  seismic: 'low' | 'moderate' | 'high' | 'critical';
}

export interface DetailedRiskItem {
  type: 'flood' | 'heatwave' | 'wildfire' | 'storm' | 'seismic' | 'air';
  level: 'Low' | 'Moderate' | 'High' | 'Critical';
  title: string;
  description: string;
  source?: string;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  precipProb?: number | null;
  weatherCode?: number;
  note?: string | null;
}

export interface PrakrutiAnalysis {
  location: LocationData;
  capturedAt: string;
  prakrutiScore: number; // 0-100 overall composite
  overallStatus: 'Healthy / Optimal' | 'Balanced' | 'Under Stress' | 'Critical Stress';
  elements: {
    prithvi: ElementScore;
    jal: ElementScore;
    agni: ElementScore;
    vayu: ElementScore;
    akash: ElementScore;
  };
  weather: WeatherData;
  disasterRisk: HazardRisk;
  risks: DetailedRiskItem[];
  insights: string;
  insightsHindi?: string;
  recommendations: string[];
  recommendationsHindi?: string[];
  forecastDays: ForecastDay[];
  meta: {
    generatedAt: string;
    language: 'en' | 'hi';
    dataSources: string[];
    cacheHit?: boolean;
  };
}

export interface GlobalHotspotItem {
  name: string;
  lat: number;
  lng: number;
  prakrutiScore: number;
  primaryStress: string;
  elementStatus: Record<MahabhutaElementKey, number>;
  countryCode: string;
}
