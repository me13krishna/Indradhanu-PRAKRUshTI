import React, { useState } from 'react';
import type { GlobalHotspotItem, LocationData } from '../types/prakrushti';
import { MapPin, ShieldAlert, CheckCircle2, Globe } from 'lucide-react';

interface GlobalHotspotsProps {
  onSelectCity: (loc: LocationData) => void;
}

export const SEEDED_HOTSPOTS: GlobalHotspotItem[] = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219, prakrutiScore: 82, primaryStress: 'Balanced Rainfall', elementStatus: { prithvi: 85, jal: 80, agni: 84, vayu: 82, akash: 79 }, countryCode: 'KE' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, prakrutiScore: 79, primaryStress: 'Seismic Warning Radius', elementStatus: { prithvi: 70, jal: 82, agni: 81, vayu: 85, akash: 78 }, countryCode: 'JP' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, prakrutiScore: 78, primaryStress: 'Moderate UV Index', elementStatus: { prithvi: 80, jal: 78, agni: 72, vayu: 84, akash: 76 }, countryCode: 'AU' },
  { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, prakrutiScore: 75, primaryStress: 'Overcast Atmospheric Cover', elementStatus: { prithvi: 76, jal: 82, agni: 78, vayu: 72, akash: 68 }, countryCode: 'GB' },
  { name: 'Pune, India', lat: 18.5204, lng: 73.8567, prakrutiScore: 72, primaryStress: 'Moderate Urban AQI', elementStatus: { prithvi: 75, jal: 70, agni: 73, vayu: 68, akash: 74 }, countryCode: 'IN' },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, prakrutiScore: 68, primaryStress: 'Hydrological Moisture Deficit', elementStatus: { prithvi: 65, jal: 62, agni: 70, vayu: 72, akash: 71 }, countryCode: 'BR' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060, prakrutiScore: 65, primaryStress: 'Urban Heat Island & AQI', elementStatus: { prithvi: 68, jal: 66, agni: 62, vayu: 60, akash: 69 }, countryCode: 'US' },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, prakrutiScore: 42, primaryStress: 'Severe Thermal Stress & Low Soil Moisture', elementStatus: { prithvi: 38, jal: 35, agni: 40, vayu: 48, akash: 50 }, countryCode: 'EG' },
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090, prakrutiScore: 36, primaryStress: 'Hazardous Particulate Air Load (AQI 320+)', elementStatus: { prithvi: 45, jal: 40, agni: 38, vayu: 22, akash: 35 }, countryCode: 'IN' },
  { name: 'Phoenix, Arizona, USA', lat: 33.4484, lng: -112.0740, prakrutiScore: 38, primaryStress: 'Extreme Heatwave Threshold (43°C)', elementStatus: { prithvi: 40, jal: 30, agni: 25, vayu: 52, akash: 44 }, countryCode: 'US' },
];

export const GlobalHotspots: React.FC<GlobalHotspotsProps> = ({ onSelectCity }) => {
  const [filter, setFilter] = useState<'all' | 'healthiest' | 'stressed'>('all');

  const sorted = [...SEEDED_HOTSPOTS].sort((a, b) => b.prakrutiScore - a.prakrutiScore);

  const healthiest = sorted.slice(0, 5);
  const stressed = sorted.slice(-5).reverse();

  const displayedList = filter === 'healthiest' ? healthiest : filter === 'stressed' ? stressed : sorted;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Overview Dashboard</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          World Climate Stress & Ecological Hotspot Map
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Real-time global environmental health tracking reinforcing the "One Earth, One Ecosystem" mission.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            filter === 'all'
              ? 'bg-brand-dark text-white shadow-md'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
          }`}
        >
          All Monitored Cities ({SEEDED_HOTSPOTS.length})
        </button>
        <button
          onClick={() => setFilter('healthiest')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
            filter === 'healthiest'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Top 5 Healthiest Regions</span>
        </button>
        <button
          onClick={() => setFilter('stressed')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
            filter === 'stressed'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Top 5 Under Stress</span>
        </button>
      </div>

      {/* Hotspots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedList.map((item, idx) => {
          const isStressed = item.prakrutiScore < 50;
          return (
            <div
              key={idx}
              onClick={() =>
                onSelectCity({
                  name: item.name,
                  latitude: item.lat,
                  longitude: item.lng,
                  countryCode: item.countryCode,
                })
              }
              className="card-paper p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                    Lat: {item.lat.toFixed(2)}, Lng: {item.lng.toFixed(2)}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-xl text-sm font-serif font-extrabold shadow-sm ${
                      isStressed
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                    }`}
                  >
                    {item.prakrutiScore}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Prakruti</span>
                </div>
              </div>

              {/* Primary Stress Vector */}
              <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[11px] text-slate-400 font-mono block">Primary Vector:</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-sans block mt-0.5">
                  {item.primaryStress}
                </span>
              </div>

              {/* 5 Element Mini Progress Bar Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-prithvi" />
                  <span>Earth: {item.elementStatus.prithvi}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-jal" />
                  <span>Water: {item.elementStatus.jal}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-vayu" />
                  <span>Air: {item.elementStatus.vayu}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
