import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import {
  Globe2,
  Sliders,
  MapPin,
  Bot,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface FilmScene05LiveWorldProps {
  onScrollToNext?: () => void;
}

export const FilmScene05LiveWorld: React.FC<FilmScene05LiveWorldProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [selectedBiome, setSelectedBiome] = useState<number>(0);
  const isHi = language === 'hi';

  const biomes = [
    {
      name: 'Pune',
      nameHi: 'पुणे',
      region: 'Tropical',
      score: 68,
      status: 'Moderate',
      statusHi: 'मध्यम',
      color: '#E0A02D',
      rings: [72, 64, 60, 58, 86],
    },
    {
      name: 'Tokyo',
      nameHi: 'टोक्यो',
      region: 'Coastal',
      score: 78,
      status: 'Healthy',
      statusHi: 'स्वस्थ',
      color: '#52A373',
      rings: [76, 82, 74, 72, 88],
    },
    {
      name: 'Reykjavik',
      nameHi: 'रेकजाविक',
      region: 'Subpolar',
      score: 92,
      status: 'Pristine',
      statusHi: 'उत्कृष्ट',
      color: '#52A373',
      rings: [88, 94, 86, 98, 92],
    },
  ];

  const current = biomes[selectedBiome];

  const tiles = [
    {
      id: 'map',
      titleEn: 'Map',
      titleHi: 'मानचित्र',
      icon: MapPin,
      color: '#1B6B93',
      route: '/app',
    },
    {
      id: 'simulator',
      titleEn: 'What-If',
      titleHi: 'सिमुलेटर',
      icon: Sliders,
      color: '#D9822B',
      route: '/app',
    },
    {
      id: 'compare',
      titleEn: 'Compare',
      titleHi: 'तुलना',
      icon: Globe2,
      color: '#40916C',
      route: '/app',
    },
    {
      id: 'assistant',
      titleEn: 'Assistant',
      titleHi: 'सहायक',
      icon: Bot,
      color: '#7A6C9E',
      route: '/app',
    },
  ];

  const handleTileClick = (route: string) => {
    navigate(route);
  };

  const handleScrollCue = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('scene-6');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="scene-5"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#07130F] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 5: Your World, Live"
    >
      {/* Dynamic Biome Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.color} 0%, transparent 65%)`,
        }}
      />

      {/* Headline: Max 5 Words + Caption: Max 7 Words */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <h2 className="text-fluid-title font-serif font-bold text-white tracking-tight leading-tight">
          {isHi ? 'अपनी धरती पर परखें।' : 'Try it on your world.'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-sans mt-2">
          {isHi
            ? 'सजीव संतुलन देखने के लिए किसी भी क्षेत्र को चुनें।'
            : 'Tap any biome to see live balance.'}
        </p>
      </div>

      {/* Center Interactive Stage: Live Biome Pod + 4 Deep-Link Feature Tiles */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: The Interactive Biome Telemetry Pod */}
        <div className="lg:col-span-7 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-between min-h-[340px]">
          
          {/* Biome Selector Pills */}
          <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-full border border-white/10">
            {biomes.map((b, idx) => {
              const isSelected = selectedBiome === idx;
              return (
                <button
                  key={b.name}
                  onClick={() => setSelectedBiome(idx)}
                  className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md scale-105'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isHi ? b.nameHi : b.name}
                </button>
              );
            })}
          </div>

          {/* Central Live 5-Ring Dial Animation */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-4">
            
            {/* The 5 Concentric Rings Animating to Biome Values */}
            {current.rings.map((val, idx) => {
              const colors = ['#C97B4A', '#1B6B93', '#D9822B', '#6FA8C9', '#7A6C9E'];
              return (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-full border-2 transition-all duration-700"
                  style={{
                    borderColor: colors[idx],
                    padding: `${idx * 8}px`,
                    opacity: 0.85,
                    transform: `scale(${0.75 + (val / 100) * 0.25})`,
                  }}
                />
              );
            })}

            {/* Central Score Node */}
            <div className="relative z-10 text-center bg-black/80 backdrop-blur-md w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-xl">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-emerald-400">
                {current.score}
              </span>
              <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest mt-0.5">
                {isHi ? current.statusHi : current.status}
              </span>
            </div>
          </div>

          {/* Biome Region Badge */}
          <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{current.name} · {current.region} Biome</span>
          </div>
        </div>

        {/* Right: 4 Deep-Link Animated Feature Tiles */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => handleTileClick(t.route)}
                className="group touch-target cursor-pointer p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-400/40 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${t.color}25`, color: t.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-white">
                    {isHi ? t.titleHi : t.titleEn}
                  </div>
                  <div className="mt-2 flex items-center text-[10px] font-mono text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Open Module</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center justify-center pb-2 text-white/50">
        <button
          onClick={handleScrollCue}
          className="touch-target p-2 rounded-full hover:text-white transition-colors animate-bounce"
          aria-label="Scroll to next scene"
        >
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        </button>
      </div>
    </section>
  );
};
