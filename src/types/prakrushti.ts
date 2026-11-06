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

export type DataProvenanceMethod = 
  | 'NWP_LAND_SURFACE_MODEL'      // Numerical Weather Prediction Land Surface Model (e.g. ECMWF IFS 0-1cm)
  | 'NWP_ATMOSPHERIC_ANALYSIS'    // NWP Surface Gridded Analysis (e.g. Open-Meteo 2m temperature/pressure)
  | 'ATMOSPHERIC_DISPERSION_MODEL'// Chemical Transport Model (e.g. CAMS / Copernicus PM2.5 / AQI)
  | 'IN_SITU_SEISMIC_NETWORK'     // USGS Global Seismographic Network physical instruments
  | 'STATISTICAL_FORECAST'        // Multi-day deterministic forecast outlook
  | 'ESTIMATED_PROXY'             // Missing cell/ocean fallback estimate
  | 'USER_SIMULATED';             // Hypothetical What-If scenario parameter shift

export interface DataProvenanceItem {
  source: string;
  method: DataProvenanceMethod;
  confidence: number; // 0.0 - 1.0
  notes?: string;
  limitations?: string;
}

export interface WeatherData {
  temperatureC: number;
  feelsLikeC: number | null;
  humidityPct: number;
  precipitationMm: number;
  windKph: number;
  windGustsKph?: number;
  cloudCoverPct?: number;
  aqi: number; // 0 - 500
  weatherCode: number;
  description: string;
  uvIndex?: number;
  pressureHpa?: number;
  soilMoisturePct?: number; // 0 - 100% saturation index
  soilMoistureM3M3?: number; // Real volumetric m³/m³ (0.00 - 0.50)
  soilMoistureProvenance: DataProvenanceMethod;
  soilTemperatureC?: number;
  provenance: Record<string, DataProvenanceItem>;
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
