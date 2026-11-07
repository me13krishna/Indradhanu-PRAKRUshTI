import React, { useState, useEffect, useRef } from 'react';
import type { GlobalHotspotItem, LocationData } from '../types/prakrushti';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, ShieldAlert, CheckCircle2, Globe, Map as MapIcon, ArrowRight, AlertTriangle } from 'lucide-react';

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
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [filter, setFilter] = useState<'all' | 'healthiest' | 'stressed'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<GlobalHotspotItem | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);
  const markersMap = useRef<Map<string, any>>(new Map());
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
        markersMap.current.clear();

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
          actionBtn.textContent = isHi ? '📊 मुख्य डैशबोर्ड पर खोलें' : '📊 Open in Live Dashboard';
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
          markersMap.current.set(item.name, circleMarker);
        });
      }
    });

    return () => {
      // Preserved across filter changes
    };
  }, [displayedList, isHi, onSelectCity]);

  // Clean up leaflet on component unmount
  useEffect(() => {
    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, []);

  // Synchronized card click: fly to location and open popup
  const handleCardClick = (item: GlobalHotspotItem) => {
    setSelectedHotspot(item);
    if (leafletInstance.current) {
      leafletInstance.current.flyTo([item.lat, item.lng], 5, {
        duration: 1.2,
      });
      const marker = markersMap.current.get(item.name);
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Globe className="w-3.5 h-3.5" />
          <span>{isHi ? 'वैश्विक जैव-जलवायु संदर्भ' : 'Global Bioclimatic Benchmarks'}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          {isHi ? 'वैश्विक जलवायु तनाव एवं हॉटस्पॉट मानचित्र' : 'Global Climate Stress & Ecological Hotspots'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans max-w-2xl mx-auto">
          {isHi
            ? 'विभिन्न बायोम एवं पारिस्थितिक क्षेत्रों में पंचमहाभूत संतुलन का तुलनात्मक संदर्भ परिदृश्य।'
            : 'Comparative benchmark scenarios examining planetary resilience across distinct bioclimatic zones.'}
        </p>
      </div>

      {/* Prominent Scientific Demonstration Disclosure Banner */}
      <div className="mb-8 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-4 sm:p-5 flex items-start space-x-3 text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm font-sans leading-relaxed">
          <span className="font-bold font-mono uppercase tracking-wider block text-amber-800 dark:text-amber-300 mb-0.5">
            {isHi ? 'वैज्ञानिक प्रकटीकरण: शैक्षणिक संदर्भ डेटासेट (डेमो)' : 'Scientific Disclosure: Curated Demonstration Dataset'}
          </span>
          {isHi
            ? 'यह खंड ऐतिहासिक एवं बायोम-विशिष्ट पारिस्थितिक संकटों (जैसे अराल सागर, सहारा रेगिस्तान, शहरी धुंध) को दर्शाने हेतु संकलित संदर्भ परिदृश्य प्रदर्शित करता है। यह वास्तविक समय के उपग्रह संवेदक नहीं हैं। किसी भी शहर पर क्लिक करके उसका वास्तविक लाइव ईसीएमडब्ल्यूएफ विश्लेषण खोला जा सकता है।'
            : 'These seeded scenarios are curated educational archetypes representing acute ecological stress profiles (hyper-arid soil, extreme smog, tectonic faulting). They illustrate the Panch Mahabhuta scoring engine on reference environments and are not presented as live global monitoring feeds.'}
        </div>
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
          {isHi ? `सभी संदर्भ शहर (${SEEDED_HOTSPOTS.length})` : `All Benchmark Cities (${SEEDED_HOTSPOTS.length})`}
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
          <span>{isHi ? 'उच्चतम लचीलापन (शीर्ष ५)' : 'Top 5 Resilient Biomes'}</span>
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
          <span>{isHi ? 'तीव्र पारिस्थितिक तनाव (शीर्ष ५)' : 'Top 5 Under Stress'}</span>
        </button>
      </div>

      {/* Interactive Global Leaflet Map Container (Visual Centerpiece) */}
      <div className="card-paper rounded-3xl p-4 sm:p-5 shadow-2xl border border-emerald-900/15 dark:border-white/10 mb-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2 mb-3 border-b border-slate-100 dark:border-white/5 gap-1">
          <div className="flex items-center space-x-2">
            <MapIcon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700 dark:text-slate-200">
              {isHi ? 'इंटरैक्टिव वैश्विक हॉटस्पॉट मानचित्र' : 'Interactive Geospatial Hotspot Map'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {isHi ? 'विवरण देखने हेतु किसी भी मार्कर पर क्लिक करें' : 'Click markers or cards to inspect and synchronize'}
          </span>
        </div>

        <div
          ref={mapContainerRef}
          className="w-full h-80 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden z-10 shadow-inner"
        />

        {/* Map Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-slate-600 dark:text-slate-300">Resilient (≥ 75)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-300">Equilibrium (55–74)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-600" />
            <span className="text-slate-600 dark:text-slate-300">Stressed (&lt; 50)</span>
          </div>
        </div>
      </div>

      {/* Synchronized Hotspots Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedList.map((item, idx) => {
          const isStressed = item.prakrutiScore < 50;
          const isSelected = selectedHotspot?.name === item.name;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(item)}
              className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer border select-none ${
                isSelected
                  ? 'ring-2 ring-emerald-500 shadow-xl bg-emerald-50/40 dark:bg-white/10 border-emerald-500 scale-[1.01]'
                  : 'card-paper hover:shadow-xl hover:-translate-y-1 border-slate-200/70 dark:border-white/10 active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className={`w-4 h-4 ${isStressed ? 'text-rose-500' : 'text-emerald-600'}`} />
                  <span className="font-serif font-bold text-sm text-slate-800 dark:text-slate-100">
                    {item.name}
                  </span>
                </div>
                <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded-full ${
                  item.prakrutiScore >= 75
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : item.prakrutiScore < 50
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  {item.prakrutiScore}/100
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mb-3 min-h-[32px] line-clamp-2">
                {item.primaryStress}
              </p>

              {/* Elemental Micro-Gauges */}
              <div className="grid grid-cols-5 gap-1 pt-2 border-t border-slate-100 dark:border-white/5 text-center font-mono text-[10px]">
                <div>
                  <span className="text-slate-400 block text-[9px]">EARTH</span>
                  <span className="font-bold text-amber-600">{item.elementStatus.prithvi}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">WATER</span>
                  <span className="font-bold text-blue-600">{item.elementStatus.jal}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">FIRE</span>
                  <span className="font-bold text-orange-600">{item.elementStatus.agni}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">AIR</span>
                  <span className="font-bold text-emerald-600">{item.elementStatus.vayu}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">SPACE</span>
                  <span className="font-bold text-purple-600">{item.elementStatus.akash}</span>
                </div>
              </div>

              {/* Action Button: Open in Live Dashboard */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.lat.toFixed(1)}°, {item.lng.toFixed(1)}°
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
                  className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>{isHi ? 'लाइव विश्लेषण खोलें' : 'Analyze Live'}</span>
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
