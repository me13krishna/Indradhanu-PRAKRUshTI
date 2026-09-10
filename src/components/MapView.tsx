import React, { useEffect, useRef } from 'react';
import type { LocationData } from '../types/prakrushti';

interface MapViewProps {
  location: LocationData;
  prakrutiScore: number;
}

export const MapView: React.FC<MapViewProps> = ({ location, prakrutiScore }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically import Leaflet to avoid SSR/window issues
    import('leaflet').then((L) => {
      if (!leafletMap.current) {
        leafletMap.current = L.map(mapRef.current!, {
          center: [location.latitude, location.longitude],
          zoom: 10,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(leafletMap.current);
      } else {
        leafletMap.current.setView([location.latitude, location.longitude], 10);
      }

      if (markerRef.current) {
        leafletMap.current.removeLayer(markerRef.current);
      }

      // Custom icon popup
      const popupContent = `
        <div style="font-family: 'Inter', sans-serif; text-align: center; padding: 4px;">
          <h4 style="font-weight: 700; margin: 0; color: #1B4332; font-size: 14px;">${location.name.split(',')[0]}</h4>
          <div style="background: #1B4332; color: #ffffff; padding: 4px 8px; border-radius: 12px; font-weight: bold; margin-top: 6px; font-size: 12px;">
            Prakruti Score: ${prakrutiScore}/100
          </div>
        </div>
      `;

      markerRef.current = L.marker([location.latitude, location.longitude])
        .addTo(leafletMap.current)
        .bindPopup(popupContent)
        .openPopup();
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [location.latitude, location.longitude, location.name, prakrutiScore]);

  return (
    <div className="card-paper rounded-3xl p-4 shadow-xl border border-emerald-900/10 dark:border-white/10 my-6">
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
          Interactive Geospatial Location Pin
        </span>
        <span className="text-xs text-slate-400 font-mono">
          Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
        </span>
      </div>
      <div ref={mapRef} className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-inner" />
    </div>
  );
};
