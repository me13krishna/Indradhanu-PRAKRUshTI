import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Compass } from 'lucide-react';
import type { LocationData } from '../types/prakrushti';
import { searchLocations, PRESET_LOCATIONS } from '../services/geocoding';
import { useLanguage } from '../context/LanguageContext';

interface LocationSearchProps {
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ currentLocation, onSelectLocation }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);
    try {
      const res = await searchLocations(val);
      setResults(res);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (loc: LocationData) => {
    onSelectLocation(loc);
    setQuery('');
    setIsOpen(false);
  };

  const handleUseCurrentGeo = () => {
    if ('geolocation' in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onSelectLocation({
            name: `My Location (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.warn('Geolocation error:', err);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-4">
      <div className="relative" ref={dropdownRef}>
        
        {/* Search input field */}
        <div className="relative flex items-center shadow-xl shadow-brand-dark/5 rounded-2xl overflow-hidden border border-emerald-900/20 dark:border-white/10 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg">
          <div className="pl-4 text-emerald-700 dark:text-emerald-400">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder={t('searchPlaceholder')}
            className="w-full py-4 pl-3 pr-24 text-sm sm:text-base font-sans bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />

          <button
            onClick={handleUseCurrentGeo}
            className="absolute right-3 flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition border border-emerald-200 dark:border-emerald-800/40"
            title="Use Device Geolocation"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GPS</span>
          </button>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50 max-h-72 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Searching global location databases...</span>
              </div>
            ) : results.length > 0 ? (
              results.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-white/5 transition flex items-start space-x-3 border-b last:border-0 border-slate-100 dark:border-white/5"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-400 font-mono">
                      Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching location found. Try typing city name or coordinates (e.g. 18.52, 73.85).
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Location Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 px-1 text-xs text-slate-500">
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] mr-1">
          Popular:
        </span>
        {PRESET_LOCATIONS.map((preset, idx) => {
          const isSelected = currentLocation.name.includes(preset.name.split(',')[0]);
          return (
            <button
              key={idx}
              onClick={() => onSelectLocation(preset)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-brand-dark text-white dark:bg-emerald-600 font-semibold shadow-sm'
                  : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
            >
              {preset.name.split(',')[0]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
