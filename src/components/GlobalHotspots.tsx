import React, { useState, useEffect, useRef } from 'react';
import type { GlobalHotspotItem, LocationData } from '../types/prakrushti';
import { MapPin, ShieldAlert, CheckCircle2, Globe, Map as MapIcon, ArrowRight } from 'lucide-react';

interface GlobalHotspotsProps {
  onSelectCity: (loc: LocationData) => void;
}

export const SEEDED_HOTSPOTS: GlobalHotspotItem[] = [
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219, prakrutiScore: 82, primaryStress: 'Balanced Rainfall & Highland Climate', elementStatus: { prithvi: 85, jal: 80, agni: 84, vayu: 82, akash: 79 }, countryCode: 'KE' },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, prakrutiScore: 79, primaryStress: 'Active Tectonic Subduction Zone', elementStatus: { prithvi: 70, jal: 82, agni: 81, vayu: 85, akash: 78 }, countryCode: 'JP' },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093, prakrutiScore: 78, primaryStress: 'Solar UV Index & Bushfire Perimeter', elementStatus: { prithvi: 80, jal: 78, agni: 72, vayu: 84, akash: 76 }, countryCode: 'AU' },
  { name: 'London, United Kingdom', lat: 51.5074, lng: -0.1278, prakrutiScore: 75, primaryStress: 'Cloud Cover Radiative Attenuation', elementStatus: { prithvi: 76, jal: 82, agni: 78, vayu: 72, akash: 68 }, countryCode: 'GB' },
  { name: 'Pune, India', lat: 18.5204, lng: 73.8567, prakrutiScore: 72, primaryStress: 'Urbanizing Boundary Layer & AQI', elementStatus: { prithvi: 75, jal: 70, agni: 73, vayu: 68, akash: 74 }, countryCode: 'IN' },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333, prakrutiScore: 68, primaryStress: 'Hydrological Reservoir Deficit', elementStatus: { prithvi: 65, jal: 62, agni: 70, vayu: 72, akash: 71 }, countryCode: 'BR' },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060, prakrutiScore: 65, primaryStress: 'Urban Heat Island & Coastal Inundation', elementStatus: { prithvi: 68, jal: 66, agni: 62, vayu: 60, akash: 69 }, countryCode: 'US' },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357, prakrutiScore: 42, primaryStress: 'Hyper-Arid Soil Desiccation & Heatwave', elementStatus: { prithvi: 38, jal: 35, agni: 40, vayu: 48, akash: 50 }, countryCode: 'EG' },
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090, prakrutiScore: 36, primaryStress: 'Hazardous Smog Particulate Load (AQI 320+)', elementStatus: { prithvi: 45, jal: 40, agni: 38, vayu: 22, akash: 35 }, countryCode: 'IN' },
  { name: 'Phoenix, Arizona, USA', lat: 33.4484, lng: -112.0740, prakrutiScore: 38, primaryStress: 'Sonoran Desert Thermal Stress (>43°C)', elementStatus: { prithvi: 40, jal: 30, agni: 25, vayu: 52, akash: 44 }, countryCode: 'US' },
];

export const GlobalHotspots: React.FC<GlobalHotspotsProps> = ({ onSelectCity }) => {
  const [filter, setFilter] = useState<'all' | 'healthiest' | 'stressed'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<GlobalHotspotItem | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);
  const markersGroup = useRef<any>(null);

  const sorted = [...SEEDED_HOTSPOTS].sort((a, b) => b.prakrutiScore - a.prakrutiScore);
  const healthiest = sorted.slice(0, 5);
  const stressed = sorted.slice(-5).reverse();
  const displayedList = filter === 'healthiest' ? healthiest : filter === 'stressed' ? stressed : sorted;

  // Initialize and update Leaflet World Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    import('leaflet').then((L) => {
      if (!leafletInstance.current) {
        leafletInstance.current = L.map(mapContainerRef.current!, {
          center: [20, 10],
          zoom: 2,
          minZoom: 1.5,
          maxZoom: 10,
          zoomControl: true,
          worldCopyJump: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(leafletInstance.current);

        markersGroup.current = L.layerGroup().addTo(leafletInstance.current);
      }

      // Clear existing markers and rebuild based on displayedList
      if (markersGroup.current) {
        markersGroup.current.clearLayers();

        displayedList.forEach((item) => {
          const isHealthy = item.prakrutiScore >= 75;
          const isStressed = item.prakrutiScore < 50;
          const markerColor = isHealthy ? '#059669' : isStressed ? '#E11D48' : '#D97706';

          const circleMarker = L.circleMarker([item.lat, item.lng], {
            radius: isStressed ? 10 : 8,
            fillColor: markerColor,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85,
          });

          // Safe DOM Popup Element (Zero XSS)
          const popupContainer = document.createElement('div');
          popupContainer.style.fontFamily = "'Inter', sans-serif";
          popupContainer.style.minWidth = '180px';
          popupContainer.style.padding = '4px';

          const titleEl = document.createElement('h4');
          titleEl.style.fontWeight = '700';
          titleEl.style.fontSize = '14px';
          titleEl.style.margin = '0 0 4px 0';
          titleEl.style.color = '#1E293B';
          titleEl.textContent = item.name;
          popupContainer.appendChild(titleEl);

          const badgeEl = document.createElement('div');
          badgeEl.style.display = 'inline-block';
          badgeEl.style.padding = '2px 8px';
          badgeEl.style.borderRadius = '12px';
          badgeEl.style.fontSize = '11px';
          badgeEl.style.fontWeight = 'bold';
          badgeEl.style.color = '#ffffff';
          badgeEl.style.background = markerColor;
          badgeEl.style.marginBottom = '6px';
          badgeEl.textContent = `Prakruti: ${item.prakrutiScore}/100`;
          popupContainer.appendChild(badgeEl);

          const stressDesc = document.createElement('p');
          stressDesc.style.fontSize = '11px';
          stressDesc.style.color = '#64748B';
          stressDesc.style.margin = '0 0 8px 0';
          stressDesc.textContent = item.primaryStress;
          popupContainer.appendChild(stressDesc);

          const actionBtn = document.createElement('button');
          actionBtn.style.width = '100%';
          actionBtn.style.padding = '6px 10px';
          actionBtn.style.borderRadius = '8px';
          actionBtn.style.background = '#1B4332';
          actionBtn.style.color = '#ffffff';
          actionBtn.style.border = 'none';
          actionBtn.style.fontSize = '11px';
          actionBtn.style.fontWeight = '600';
          actionBtn.style.cursor = 'pointer';
          actionBtn.textContent = '📊 Open in Dashboard';
          actionBtn.onclick = () => {
            onSelectCity({
              name: item.name,
              latitude: item.lat,
              longitude: item.lng,
              countryCode: item.countryCode,
            });
          };
          popupContainer.appendChild(actionBtn);

          circleMarker.bindPopup(popupContainer);
          circleMarker.on('click', () => {
            setSelectedHotspot(item);
          });

          markersGroup.current.addLayer(circleMarker);
        });
      }
    });

    return () => {
      // Map instance is preserved across filter changes
    };
  }, [displayedList, onSelectCity]);

  // Clean up leaflet on component unmount
  useEffect(() => {
    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  const handleCardClick = (item: GlobalHotspotItem) => {
    setSelectedHotspot(item);
    if (leafletInstance.current) {
      leafletInstance.current.flyTo([item.lat, item.lng], 6, {
        duration: 1.2,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Planetary Intelligence</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          World Climate Stress & Ecological Hotspot Map
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Interactive geospatial tracking of planetary resilience and climate vulnerability hotspots across all 5 elements.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
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
          <span>Top 5 Resilient Regions</span>
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
          <span>Top 5 Under Acute Stress</span>
        </button>
      </div>

      {/* Interactive Global Leaflet Map Container */}
      <div className="card-paper rounded-3xl p-4 shadow-2xl border border-emerald-900/15 dark:border-white/10 mb-8 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-2">
            <MapIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Interactive Leaflet World Hotspot Map
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any circular marker to view details or launch full dashboard
          </span>
        </div>

        <div
          ref={mapContainerRef}
          className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden z-10 shadow-inner"
        />

        {/* Map Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-slate-600 dark:text-slate-300">Resilient (Score ≥ 75)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-300">Moderate Equilibrium (55–74)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-600" />
            <span className="text-slate-600 dark:text-slate-300">Under Stress (Score &lt; 50)</span>
          </div>
        </div>
      </div>

      {/* Hotspots Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedList.map((item, idx) => {
          const isStressed = item.prakrutiScore < 50;
          const isSelected = selectedHotspot?.name === item.name;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(item)}
              className={`card-paper p-5 rounded-2xl border cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                  : 'border-slate-200/80 dark:border-white/10'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all group-hover:h-2"
                style={{ backgroundColor: isStressed ? '#E11D48' : item.prakrutiScore >= 75 ? '#059669' : '#D97706' }}
              />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-serif text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {item.lat.toFixed(2)}°, {item.lng.toFixed(2)}° • {item.countryCode}
                  </p>
                </div>

                <div className="text-right">
                  <div
                    className="text-2xl font-serif font-extrabold"
                    style={{ color: isStressed ? '#E11D48' : item.prakrutiScore >= 75 ? '#059669' : '#D97706' }}
                  >
                    {item.prakrutiScore}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
                </div>
              </div>

              {/* Stress / Vulnerability Callout */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-0.5">
                  Primary Climate Stress:
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1">
                  {isStressed ? (
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  )}
                  <span className="truncate">{item.primaryStress}</span>
                </span>
              </div>

              {/* 5 Elemental Mini Bar Breakdowns */}
              <div className="grid grid-cols-5 gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-white/5 text-center">
                {(['prithvi', 'jal', 'agni', 'vayu', 'akash'] as const).map((elem) => (
                  <div key={elem} className="p-1 rounded bg-slate-100/60 dark:bg-white/5">
                    <span className="text-[9px] font-mono uppercase text-slate-400 block">
                      {elem.slice(0, 3)}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200">
                      {item.elementStatus[elem]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline flex items-center space-x-1">
                  <span>Pan to marker</span>
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCity({
                      name: item.name,
                      latitude: item.lat,
                      longitude: item.lng,
                      countryCode: item.countryCode,
                    });
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-dark hover:bg-brand-light text-white transition flex items-center space-x-1 shadow-sm"
                >
                  <span>Analyze</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
