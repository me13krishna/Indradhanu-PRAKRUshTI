import React from 'react';
import { motion } from 'motion/react';
import { Search, RefreshCw, Link2, Check, Leaf, Microscope } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Segmented } from '../ui/primitives';
import type { AppTab } from '../../hooks/useLocationState';

interface AppTopBarProps {
  tab: AppTab;
  locationName: string;
  coords: string;
  loading: boolean;
  capturedAt?: string;
  copied: boolean;
  density: 'zen' | 'technical';
  onDensity: (d: 'zen' | 'technical') => void;
  onOpenPalette: () => void;
  onRefresh: () => void;
  onCopyLink: () => void;
}

const TITLES: Record<AppTab, { en: string; hi: string }> = {
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  compare: { en: 'Compare', hi: 'तुलना' },
  hotspots: { en: 'Global hotspots', hi: 'वैश्विक हॉटस्पॉट' },
  simulator: { en: 'Simulator', hi: 'सिमुलेटर' },
  knowledge: { en: 'Knowledge', hi: 'ज्ञानकोष' },
  about: { en: 'About', hi: 'परिचय' },
};

export const AppTopBar: React.FC<AppTopBarProps> = ({
  tab,
  locationName,
  coords,
  loading,
  capturedAt,
  copied,
  density,
  onDensity,
  onOpenPalette,
  onRefresh,
  onCopyLink,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const time = capturedAt ? new Date(capturedAt) : null;
  const timeLabel = time && !isNaN(time.getTime()) ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div className="sticky top-[57px] md:top-0 z-30 px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-xl bg-paper/70 dark:bg-charcoal/65 border-b border-slate-900/5 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="hidden sm:block min-w-0">
          <div className="eyebrow">{isHi ? 'अभी देख रहे हैं' : 'Now viewing'}</div>
          <div className="font-serif text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {isHi ? TITLES[tab].hi : TITLES[tab].en}
          </div>
        </div>

        <button
          onClick={onOpenPalette}
          className="group flex-1 max-w-xl mx-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_0_4px_rgba(52,211,153,0.10)] transition-all text-left"
          aria-label={isHi ? 'स्थान खोजें' : 'Search places'}
        >
          <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white truncate">
              <span className="live-dot flex-shrink-0" />
              <span className="truncate">{locationName.split(',')[0]}</span>
              <span className="hidden md:inline font-mono text-[11px] font-normal text-slate-500 dark:text-slate-400 truncate">
                {coords}
              </span>
            </span>
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
            {isHi ? 'बदलें' : 'Change'}
          </span>
          <span className="hidden sm:inline kbd text-slate-500 dark:text-slate-400">Ctrl K</span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          {tab === 'dashboard' && (
            <div className="hidden lg:block">
              <Segmented
                layoutId="density"
                value={density}
                onChange={onDensity}
                options={[
                  { value: 'zen', label: isHi ? 'ज़ेन' : 'Zen', icon: <Leaf className="w-3.5 h-3.5" /> },
                  { value: 'technical', label: isHi ? 'तकनीकी' : 'Technical', icon: <Microscope className="w-3.5 h-3.5" /> },
                ]}
              />
            </div>
          )}

          <button
            onClick={onRefresh}
            className="touch-target p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            title={timeLabel ? `${isHi ? 'अंतिम अपडेट' : 'Last updated'} ${timeLabel}` : isHi ? 'ताज़ा करें' : 'Refresh'}
            aria-label={isHi ? 'डेटा ताज़ा करें' : 'Refresh data'}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onCopyLink}
            className="touch-target relative p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            title={isHi ? 'साझा करने योग्य लिंक कॉपी करें' : 'Copy shareable link'}
            aria-label={isHi ? 'लिंक कॉपी करें' : 'Copy link'}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 right-0 whitespace-nowrap rounded-lg bg-slate-900 text-white text-[11px] px-2 py-1 shadow-lg"
              >
                {isHi ? 'लिंक कॉपी हुआ' : 'Link copied'}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
