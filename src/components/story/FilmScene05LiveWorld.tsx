import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { getPrakrutiAnalysis } from '../../services/prakrushtiApi';
import { scoreTone } from '../../lib/tone';
import type { LocationData } from '../../types/prakrushti';
import { SceneHint, SceneEyebrow } from './SceneHint';
import { Globe2, Sliders, MapPin, Bot, ChevronDown, Compass, Loader2, ArrowRight, Radio } from 'lucide-react';

interface FilmScene05LiveWorldProps {
  onScrollToNext?: () => void;
}

interface Reading {
  score: number;
  rings: number[];
  live: boolean;
}

interface Biome {
  key: string;
  name: string;
  nameHi: string;
  region: string;
  loc: LocationData;
  sample: Reading;
}

const BIOMES: Biome[] = [
  { key: 'pune', name: 'Pune', nameHi: 'पुणे', region: 'Tropical', loc: { name: 'Pune, India', latitude: 18.5204, longitude: 73.8567 }, sample: { score: 68, rings: [72, 64, 60, 58, 86], live: false } },
  { key: 'tokyo', name: 'Tokyo', nameHi: 'टोक्यो', region: 'Coastal', loc: { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503 }, sample: { score: 78, rings: [76, 82, 74, 72, 88], live: false } },
  { key: 'reykjavik', name: 'Reykjavik', nameHi: 'रेकजाविक', region: 'Subpolar', loc: { name: 'Reykjavik, Iceland', latitude: 64.1466, longitude: -21.9426 }, sample: { score: 92, rings: [88, 94, 86, 98, 92], live: false } },
];

const RING_COLORS = ['#C97B4A', '#1B6B93', '#D9822B', '#6FA8C9', '#7A6C9E'];

async function readLive(loc: LocationData): Promise<Reading | null> {
  try {
    const a = await getPrakrutiAnalysis(loc);
    if (a.weather.provenance?.atmosphere?.method === 'ESTIMATED_PROXY') return null;
    const e = a.elements;
    return { score: a.prakrutiScore, rings: [e.prithvi.score, e.jal.score, e.agni.score, e.vayu.score, e.akash.score], live: true };
  } catch {
    return null;
  }
}

export const FilmScene05LiveWorld: React.FC<FilmScene05LiveWorldProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const isHi = language === 'hi';

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [selected, setSelected] = useState<string>('pune');
  const [readings, setReadings] = useState<Record<string, Reading | 'loading'>>({});
  const [me, setMe] = useState<{ loc: LocationData } | null>(null);
  const [geoBusy, setGeoBusy] = useState(false);
  const [geoError, setGeoError] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    BIOMES.forEach(async (b) => {
      setReadings((r) => ({ ...r, [b.key]: 'loading' }));
      const live = await readLive(b.loc);
      setReadings((r) => ({ ...r, [b.key]: live ?? b.sample }));
    });
  }, [inView]);

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return setGeoError(true);
    setGeoBusy(true);
    setGeoError(false);
    setInteracted(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc: LocationData = {
          name: `My Location (${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)})`,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setMe({ loc });
        setSelected('me');
        setReadings((r) => ({ ...r, me: 'loading' }));
        const live = await readLive(loc);
        if (live) {
          setReadings((r) => ({ ...r, me: live }));
        } else {
          setMe(null);
          setSelected('pune');
          setGeoError(true);
        }
        setGeoBusy(false);
      },
      () => {
        setGeoBusy(false);
        setGeoError(true);
      },
      { timeout: 8000 }
    );
  };

  const pills = [...BIOMES.map((b) => ({ key: b.key, label: isHi ? b.nameHi : b.name })), ...(me ? [{ key: 'me', label: isHi ? 'आप' : 'You' }] : [])];
  const biome = BIOMES.find((b) => b.key === selected);
  const reading = readings[selected];
  const ready = reading && reading !== 'loading' ? reading : null;
  const tone = scoreTone(ready?.score ?? 0);
  const placeName = selected === 'me' ? (isHi ? 'आपका स्थान' : 'Your location') : biome?.name ?? '';
  const targetLoc = selected === 'me' ? me?.loc : biome?.loc;

  const openDashboard = (loc?: LocationData) => {
    if (!loc) return;
    const q = new URLSearchParams({ lat: loc.latitude.toFixed(4), lng: loc.longitude.toFixed(4), place: loc.name });
    navigate(`/app?${q.toString()}`);
  };

  const tiles = [
    { id: 'map', t: 'Map', hi: 'मानचित्र', icon: MapPin, color: '#1B6B93', to: '/app?tab=hotspots' },
    { id: 'simulator', t: 'What-If', hi: 'सिमुलेटर', icon: Sliders, color: '#D9822B', to: '/app?tab=simulator' },
    { id: 'compare', t: 'Compare', hi: 'तुलना', icon: Globe2, color: '#40916C', to: '/app?tab=compare' },
    { id: 'assistant', t: 'Assistant', hi: 'सहायक', icon: Bot, color: '#7A6C9E', to: '/app' },
  ];

  const handleScrollCue = () => (onScrollToNext ? onScrollToNext() : document.getElementById('scene-6')?.scrollIntoView({ behavior: 'smooth' }));

  return (
    <section
      ref={sectionRef}
      id="scene-5"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#07130F] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 5: Your World, Live"
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-25"
        style={{ background: `radial-gradient(circle at 50% 50%, ${ready ? tone.hex : '#52A373'} 0%, transparent 65%)` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <SceneEyebrow n="05" label={isHi ? 'आपकी धरती' : 'Your World, Live'} />
        <h2 className="text-fluid-title font-serif font-bold story-title tracking-tight leading-tight">
          {isHi ? 'अपनी धरती पर परखें।' : 'Try it on your world.'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-sans mt-2">
          {isHi ? 'ये आँकड़े अभी के असली उपग्रह और मॉडल डेटा से हैं।' : 'These numbers are computed right now from real satellite and model data.'}
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6 flex flex-col gap-5">
        <div className="story-stage rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[380px]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/10">
              {pills.map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    setInteracted(true);
                    setSelected(p.key);
                  }}
                  className={`touch-target px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selected === p.key ? 'bg-emerald-500 text-slate-950 font-bold shadow-md scale-105' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              onClick={useMyLocation}
              disabled={geoBusy}
              className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-amber-400/15 border border-amber-300/40 text-amber-200 hover:bg-amber-400/25 disabled:opacity-60 transition-colors"
            >
              {geoBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Compass className="w-3.5 h-3.5" />}
              {isHi ? 'मेरा स्थान' : 'Use my location'}
            </button>
          </div>

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-4">
            {RING_COLORS.map((color, idx) => {
              const val = ready?.rings[idx] ?? 0;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 rounded-full border-2 transition-all duration-[1100ms] ease-out"
                  style={{ borderColor: color, padding: `${idx * 8}px`, opacity: ready ? 0.9 : 0.25, transform: `scale(${0.55 + (val / 100) * 0.45}) rotate(${ready ? 0 : -90}deg)` }}
                />
              );
            })}
            <div className="relative z-10 text-center bg-black/80 backdrop-blur-md w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center border border-white/20 shadow-xl">
              {ready ? (
                <>
                  <span className="font-serif font-bold text-3xl sm:text-4xl" style={{ color: tone.hex }}>{ready.score}</span>
                  <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest mt-0.5">{isHi ? tone.labelHi : tone.labelEn}</span>
                </>
              ) : (
                <Loader2 className="w-6 h-6 text-emerald-300 animate-spin" />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-3">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              {ready?.live ? (
                <><Radio className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-300">LIVE</span></>
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-500" />
              )}
              <span>
                {placeName}
                {biome ? ` · ${biome.region}` : ''}
                {ready && !ready.live ? (isHi ? ' · नमूना' : ' · sample') : ''}
              </span>
            </div>
            <button
              onClick={() => openDashboard(targetLoc)}
              disabled={!ready}
              className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 transition-all hover:scale-105"
            >
              {isHi ? 'पूरा विश्लेषण खोलें' : 'Open full analysis'}
              <ArrowRight className="w-4 h-4" />
            </button>
            {geoError && (
              <p className="text-[11px] text-amber-300/90">{isHi ? 'स्थान नहीं मिला। अनुमति जाँचें।' : 'Could not get your location. Check browser permission.'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(t.to)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(t.to)}
                className="group touch-target cursor-pointer p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform" style={{ backgroundColor: `${t.color}25`, color: t.color }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm sm:text-base text-white">{isHi ? t.hi : t.t}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 text-center min-h-8">
        <SceneHint show={!interacted} text={isHi ? 'शहर बदलें या “मेरा स्थान” आज़माएँ' : 'Switch city, or try your own location.'} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center pb-2 text-white/50">
        <button onClick={handleScrollCue} className="touch-target p-2 rounded-full hover:text-white transition-colors animate-bounce" aria-label="Scroll to next scene">
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        </button>
      </div>
    </section>
  );
};
