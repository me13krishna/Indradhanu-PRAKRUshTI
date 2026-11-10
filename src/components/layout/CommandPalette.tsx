import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  MapPin,
  Loader2,
  Compass,
  Clock,
  BarChart2,
  Sliders,
  Activity,
  BookOpen,
  Info,
  FileText,
  Zap,
  MessageSquare,
  Link2,
  Globe,
  Sun,
  Moon,
  CornerDownLeft,
  Film,
} from 'lucide-react';
import type { LocationData } from '../../types/prakrushti';
import { PRESET_LOCATIONS, searchLocations } from '../../services/geocoding';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import type { AppTab } from '../../hooks/useLocationState';

export interface PaletteHandlers {
  onSelectLocation: (loc: LocationData) => void;
  onNavigate: (tab: AppTab) => void;
  onExportReport: () => void;
  onActionPlan: () => void;
  onOpenAssistant: () => void;
  onCopyLink: () => void;
  onViewStory: () => void;
}

interface CommandPaletteProps extends PaletteHandlers {
  open: boolean;
  onClose: () => void;
  recents: LocationData[];
}

interface Item {
  id: string;
  group: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  recents,
  onSelectLocation,
  onNavigate,
  onExportReport,
  onActionPlan,
  onOpenAssistant,
  onCopyLink,
  onViewStory,
}) => {
  const { language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const isHi = language === 'hi';

  const [query, setQuery] = useState('');
  const [remote, setRemote] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setRemote([]);
      setActive(0);
      const id = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) {
      setRemote([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const id = setTimeout(async () => {
      try {
        const res = await searchLocations(q, ctrl.signal);
        if (!ctrl.signal.aborted) setRemote(res);
      } catch {
        // aborted or offline: keep previous results
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 380);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [query, open]);

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        onSelectLocation({
          name: `My Location (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => console.warn('Geolocation error:', err)
    );
  };

  const items = useMemo<Item[]>(() => {
    const ic = 'w-4 h-4';
    const place = (loc: LocationData, group: string, icon: React.ReactNode, id: string): Item => ({
      id,
      group,
      label: loc.name.split(',')[0],
      sub: loc.name.split(',').slice(1).join(',').trim() || `${loc.latitude.toFixed(2)}, ${loc.longitude.toFixed(2)}`,
      icon,
      run: () => onSelectLocation(loc),
    });

    const nav: Item[] = [
      { id: 'n-dash', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'डैशबोर्ड' : 'Dashboard', icon: <BarChart2 className={ic} />, keywords: 'console home overview', run: () => onNavigate('dashboard') },
      { id: 'n-comp', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'तुलना' : 'Compare cities', icon: <Sliders className={ic} />, keywords: 'versus', run: () => onNavigate('compare') },
      { id: 'n-hot', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'वैश्विक हॉटस्पॉट' : 'Global hotspots', icon: <MapPin className={ic} />, keywords: 'world map ranking', run: () => onNavigate('hotspots') },
      { id: 'n-sim', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'सिमुलेटर' : 'What-if simulator', icon: <Activity className={ic} />, keywords: 'scenario climate', run: () => onNavigate('simulator') },
      { id: 'n-kb', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'ज्ञानकोष' : 'Knowledge base', icon: <BookOpen className={ic} />, keywords: 'learn philosophy', run: () => onNavigate('knowledge') },
      { id: 'n-about', group: isHi ? 'नेविगेट' : 'Navigate', label: isHi ? 'परिचय' : 'About', icon: <Info className={ic} />, run: () => onNavigate('about') },
    ];

    const acts: Item[] = [
      { id: 'a-ai', group: isHi ? 'कार्य' : 'Actions', label: isHi ? 'AI सहायक से पूछें' : 'Ask the AI assistant', icon: <MessageSquare className={ic} />, keywords: 'chat nugen', run: onOpenAssistant },
      { id: 'a-plan', group: isHi ? 'कार्य' : 'Actions', label: isHi ? 'एक्शन प्लान बनाएं' : 'Generate action plan', icon: <Zap className={ic} />, keywords: 'nugen ecological', run: onActionPlan },
      { id: 'a-rep', group: isHi ? 'कार्य' : 'Actions', label: isHi ? 'रिपोर्ट निर्यात करें' : 'Export dossier', icon: <FileText className={ic} />, keywords: 'pdf print report', run: onExportReport },
      { id: 'a-link', group: isHi ? 'कार्य' : 'Actions', label: isHi ? 'लिंक कॉपी करें' : 'Copy shareable link', icon: <Link2 className={ic} />, keywords: 'share url', run: onCopyLink },
      { id: 'a-lang', group: isHi ? 'कार्य' : 'Actions', label: language === 'en' ? 'Switch to हिन्दी' : 'Switch to English', icon: <Globe className={ic} />, keywords: 'language hindi english', run: () => setLanguage(language === 'en' ? 'hi' : 'en') },
      { id: 'a-theme', group: isHi ? 'कार्य' : 'Actions', label: isDark ? (isHi ? 'लाइट थीम' : 'Light theme') : (isHi ? 'डार्क थीम' : 'Dark theme'), icon: isDark ? <Sun className={ic} /> : <Moon className={ic} />, keywords: 'dark light mode', run: toggleTheme },
      { id: 'a-story', group: isHi ? 'कार्य' : 'Actions', label: isHi ? 'मूल कहानी देखें' : 'Watch the origin story', icon: <Film className={ic} />, keywords: 'landing intro film', run: onViewStory },
    ];

    const gps: Item = {
      id: 'p-gps',
      group: isHi ? 'स्थान' : 'Places',
      label: isHi ? 'मेरा स्थान उपयोग करें' : 'Use my location',
      sub: 'GPS',
      icon: <Compass className={ic} />,
      keywords: 'gps current device',
      run: useMyLocation,
    };

    const q = query.trim().toLowerCase();
    const match = (it: Item) => !q || `${it.label} ${it.sub ?? ''} ${it.keywords ?? ''}`.toLowerCase().includes(q);

    if (!q) {
      return [
        gps,
        ...recents.map((r, i) => place(r, isHi ? 'हाल के' : 'Recent', <Clock className={ic} />, `r-${i}`)),
        ...PRESET_LOCATIONS.map((p, i) => place(p, isHi ? 'लोकप्रिय स्थान' : 'Popular places', <MapPin className={ic} />, `pp-${i}`)),
        ...nav,
        ...acts,
      ];
    }

    const seen = new Set<string>();
    const places: Item[] = [];
    [...PRESET_LOCATIONS, ...remote].forEach((loc, i) => {
      const key = `${loc.latitude.toFixed(2)},${loc.longitude.toFixed(2)}`;
      if (seen.has(key)) return;
      if (i < PRESET_LOCATIONS.length && !loc.name.toLowerCase().includes(q)) return;
      seen.add(key);
      places.push(place(loc, isHi ? 'स्थान' : 'Places', <MapPin className={ic} />, `s-${i}`));
    });
    return [...places, ...(match(gps) ? [gps] : []), ...nav.filter(match), ...acts.filter(match)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, remote, recents, isHi, isDark, language]);

  useEffect(() => setActive(0), [query, remote.length]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (it?: Item) => {
    if (!it) return;
    onClose();
    setTimeout(it.run, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(items[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label={isHi ? 'कमांड पैलेट' : 'Command palette'}
        >
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-white/95 dark:bg-[#0d1a14]/95 border border-slate-200 dark:border-white/10 shadow-2xl shadow-black/50 gradient-border"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-5 border-b border-slate-200/80 dark:border-white/10">
              {loading ? (
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isHi ? 'कोई भी स्थान खोजें या कमांड चलाएं…' : 'Search any place on Earth, or run a command…'}
                className="flex-1 py-4 bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                aria-label={isHi ? 'खोजें' : 'Search'}
              />
              <span className="kbd text-slate-500 dark:text-slate-400">Esc</span>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
              {items.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  {loading
                    ? isHi ? 'खोज रहे हैं…' : 'Searching global place database…'
                    : isHi ? 'कोई परिणाम नहीं। शहर का नाम या निर्देशांक (18.52, 73.85) लिखें।' : 'No matches. Try a city name or coordinates like 18.52, 73.85.'}
                </div>
              )}
              {items.map((it, idx) => {
                const showHeader = it.group !== lastGroup;
                lastGroup = it.group;
                const isActive = idx === active;
                return (
                  <React.Fragment key={it.id}>
                    {showHeader && <div className="eyebrow px-3 pt-3 pb-1.5 !text-[0.62rem] opacity-80">{it.group}</div>}
                    <button
                      data-idx={idx}
                      onMouseMove={() => setActive(idx)}
                      onClick={() => run(it)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                        isActive ? 'bg-emerald-500/12 dark:bg-emerald-400/12' : ''
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                          isActive
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-white/8 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {it.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900 dark:text-white truncate">{it.label}</span>
                        {it.sub && <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{it.sub}</span>}
                      </span>
                      {isActive && <CornerDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-3">
                <span><span className="kbd">↑</span> <span className="kbd">↓</span> {isHi ? 'चुनें' : 'move'}</span>
                <span><span className="kbd">↵</span> {isHi ? 'खोलें' : 'open'}</span>
              </span>
              <span>{isHi ? 'OpenStreetMap द्वारा खोज' : 'Places via OpenStreetMap'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
