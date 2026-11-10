import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { SceneHint, SceneEyebrow } from './SceneHint';
import { Flame, CloudRain, Wind, Mountain, ChevronDown, Play, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface FilmScene02CauseEffectProps {
  onScrollToNext?: () => void;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (c1: [number, number, number], c2: [number, number, number], t: number) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))}, ${Math.round(lerp(c1[1], c2[1], t))}, ${Math.round(lerp(c1[2], c2[2], t))})`;

const STEP_SIZE = 20;

export const FilmScene02CauseEffect: React.FC<FilmScene02CauseEffectProps> = ({
  onScrollToNext,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const reduced = usePrefersReducedMotion();

  const [level, setLevel] = useState<number>(reduced ? 45 : 0);
  const [mode, setMode] = useState<'idle' | 'play' | 'heal'>('idle');
  const [touched, setTouched] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.45 });
  const autoStarted = useRef(false);

  const step = Math.min(4, Math.floor(level / STEP_SIZE));
  const t = level / 100;

  const chainNodes = [
    {
      id: 'emissions',
      num: '01',
      icon: Wind,
      labelEn: 'Emissions',
      labelHi: 'उत्सर्जन',
      color: '#E0A02D',
      descEn: 'Smoke and CO₂ rise faster than nature can absorb.',
      descHi: 'धुआँ और CO₂ प्रकृति के सोखने से तेज़ बढ़ते हैं।',
      stat: '424 ppm',
      src: '[NOAA]',
    },
    {
      id: 'thermal',
      num: '02',
      icon: Flame,
      labelEn: 'Heat Rises',
      labelHi: 'तापमान वृद्धि',
      color: '#D9822B',
      descEn: 'Trapped heat warms air, land and oceans.',
      descHi: 'फँसी हुई गर्मी हवा, ज़मीन और समुद्र को गरम करती है।',
      stat: '+1.45°C',
      src: '[WMO 2024]',
    },
    {
      id: 'glacier',
      num: '03',
      icon: Mountain,
      labelEn: 'Glaciers Melt',
      labelHi: 'हिमनद पिघलना',
      color: '#6FA8C9',
      descEn: 'Ice retreats and river flows start to change.',
      descHi: 'बर्फ़ सिकुड़ती है और नदियों का बहाव बदलने लगता है।',
      stat: '-38%',
      src: '[NASA GRACE]',
    },
    {
      id: 'drought',
      num: '04',
      icon: Flame,
      labelEn: 'Soil Cracks',
      labelHi: 'मृदा शुष्कता',
      color: '#C97B4A',
      descEn: 'Topsoil dries, crops and trees struggle.',
      descHi: 'ऊपरी मिट्टी सूखती है, फसल और पेड़ जूझते हैं।',
      stat: '40% θ',
      src: '[FAO-56]',
    },
    {
      id: 'storm',
      num: '05',
      icon: CloudRain,
      labelEn: 'Flash Storms',
      labelHi: 'अतिवृष्टि',
      color: '#3B9AD9',
      descEn: 'A hotter atmosphere holds more water and dumps it at once.',
      descHi: 'गरम वायुमंडल ज़्यादा पानी रोकता है और अचानक बरसाता है।',
      stat: '3.6B',
      src: '[IPCC AR6]',
    },
  ];

  const node = chainNodes[step];

  const stop = useCallback(() => setMode('idle'), []);

  useEffect(() => {
    if (mode === 'idle') return;
    let raf = 0;
    let last = performance.now();
    const speed = mode === 'play' ? 100 / 15 : -100 / 3.2;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      let done = false;
      setLevel((prev) => {
        const next = prev + speed * dt;
        if (next >= 100) {
          done = true;
          return 100;
        }
        if (next <= 0) {
          done = true;
          return 0;
        }
        return next;
      });
      if (done) setMode('idle');
      else raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  useEffect(() => {
    if (reduced || !inView || autoStarted.current || touched) return;
    autoStarted.current = true;
    const id = setTimeout(() => setMode('play'), 900);
    return () => clearTimeout(id);
  }, [inView, reduced, touched]);

  const interact = () => {
    setTouched(true);
    stop();
  };

  const handleScrollCue = () => {
    if (onScrollToNext) onScrollToNext();
    else document.getElementById('scene-3')?.scrollIntoView({ behavior: 'smooth' });
  };

  const skyTop = mix([14, 38, 52], [62, 28, 14], clamp01(t * 1.2));
  const skyBottom = mix([20, 52, 44], [96, 52, 26], clamp01(t * 1.1));
  const capScale = 1 - clamp01((level - 25) / 45);
  const riverW = lerp(30, 3, clamp01((level - 30) / 45));
  const riverColor = mix([27, 107, 147], [110, 78, 52], clamp01((level - 40) / 30));
  const crackCount = Math.floor(clamp01((level - 48) / 38) * 6.99);
  const stormT = clamp01((level - 72) / 20);
  const treeColor = mix([64, 145, 108], [112, 84, 56], clamp01((level - 35) / 40));
  const smoke = 0.45 + t * 0.9;

  const cracks = [
    'M470 306L490 324L484 342L506 360',
    'M490 324L516 328L530 348',
    'M548 312L566 334L556 354',
    'M520 346L540 356L538 372',
    'M596 318L612 338L602 360',
    'M440 330L458 344L450 364',
  ];
  const trees = [610, 645, 680, 715, 750];
  const rain = [560, 600, 640, 680, 720, 760, 620, 700];

  return (
    <section
      ref={sectionRef}
      id="scene-2"
      className="relative min-h-screen-dynamic w-full flex flex-col justify-between py-20 px-4 sm:px-8 bg-[#0C1713] text-white overflow-hidden select-none transition-colors duration-700"
      aria-label="Scene 2: Why It Happens"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${mix([82, 163, 115], [217, 110, 43], clamp01(t * 1.3))
            .replace('rgb', 'rgba')
            .replace(')', `, ${0.12 + t * 0.14})`)} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center pt-2">
        <SceneEyebrow n="02" label={isHi ? 'कारण और प्रभाव' : 'Cause & Effect'} />
        <h2 className="text-fluid-title font-serif font-bold story-title tracking-tight leading-tight">
          {isHi ? 'सब कुछ परस्पर जुड़ा है।' : 'Everything is connected.'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 font-sans mt-2">
          {isHi ? 'एक असंतुलन समस्त तत्वों को प्रभावित करता है।' : 'One disruption ripples across every element.'}
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-6">
        <div className="story-stage relative w-full h-72 sm:h-[26rem] rounded-3xl overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${skyTop}, ${skyBottom})` }} />

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 240L120 180L260 220L410 140L560 200L710 160L800 210V400H0V240Z"
              fill={mix([30, 52, 42], [42, 32, 26], clamp01((level - 30) / 50))}
            />

            <g transform={`translate(410 140) scale(${capScale}) translate(-410 -140)`} opacity={capScale}>
              <path d="M410 140L372 182L392 176L410 192L428 176L452 186Z" fill="#E8F3F8" />
            </g>
            <g transform={`translate(710 160) scale(${capScale}) translate(-710 -160)`} opacity={capScale}>
              <path d="M710 160L684 190L700 186L712 198L726 188L742 194Z" fill="#E8F3F8" />
            </g>

            <path
              d="M0 292L140 270L300 296L470 266L640 292L800 270V400H0V292Z"
              fill={mix([22, 60, 44], [58, 40, 28], clamp01((level - 30) / 50))}
            />

            <path
              d="M410 192C 400 250, 445 300, 402 400"
              stroke={riverColor}
              strokeWidth={riverW}
              strokeLinecap="round"
              opacity={0.55 + (1 - clamp01((level - 60) / 40)) * 0.4}
            />

            <g>
              <rect x="80" y="300" width="30" height="70" fill="#18181B" />
              <rect x="120" y="280" width="22" height="90" fill="#27272A" />
              <rect x="150" y="315" width="40" height="55" fill="#18181B" />
              {[0, 1, 2, 3].map((i) => (
                <circle
                  key={i}
                  cx={98 + i * 14}
                  cy={270 - i * 6}
                  r={(10 + i * 5) * smoke}
                  fill="#E0A02D"
                  fillOpacity={0.15 + t * 0.35}
                  style={reduced ? undefined : { animation: `smokeRise ${3.2 + i * 0.7}s ease-in-out ${i * 0.5}s infinite` }}
                />
              ))}
            </g>

            {trees.map((x, i) => (
              <g key={x} opacity={1 - clamp01((level - 70) / 60) * 0.5}>
                <rect x={x - 2} y={350 - i * 3} width="4" height="22" fill="#4A3426" />
                <circle cx={x} cy={344 - i * 3} r={12 - clamp01((level - 40) / 50) * 5} fill={treeColor} />
              </g>
            ))}

            <g stroke="#C97B4A" strokeWidth="2" strokeLinecap="round">
              {cracks.map((d, i) => (
                <path key={i} d={d} opacity={i < crackCount ? 0.85 : 0} style={{ transition: 'opacity 0.5s' }} />
              ))}
            </g>

            <g opacity={stormT}>
              <ellipse cx="660" cy="86" rx="110" ry="42" fill="#1E293B" fillOpacity="0.9" />
              <ellipse cx="600" cy="100" rx="70" ry="30" fill="#273449" fillOpacity="0.9" />
              {rain.map((x, i) => (
                <line
                  key={x}
                  x1={x - 20}
                  y1={130}
                  x2={x - 28}
                  y2={170}
                  stroke="#6FA8C9"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  style={reduced ? undefined : { animation: `rainFall 0.9s linear ${i * 0.11}s infinite` }}
                />
              ))}
            </g>
          </svg>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 20% 80%, rgba(224,160,45,${t * 0.35}), transparent 60%)` }}
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[min(92%,26rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-center bg-black/65 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-2xl"
              >
                <div className="font-serif font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: node.color }}>
                  {node.stat}
                </div>
                <div className="font-mono text-[10px] tracking-wider uppercase text-slate-300 mt-0.5 flex items-center justify-center gap-1.5">
                  <span>{isHi ? node.labelHi : node.labelEn}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{node.src}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-200/90 mt-1.5 leading-snug">{isHi ? node.descHi : node.descEn}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <label htmlFor="disruption-dial" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-300" />
              {isHi ? 'असंतुलन का स्तर' : 'Level of disruption'}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTouched(true);
                  setLevel((l) => (l >= 99 ? 0 : l));
                  setMode('play');
                }}
                className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                <Play className="w-3.5 h-3.5 text-amber-300" />
                {isHi ? 'चलाएँ' : 'Play'}
              </button>
              <button
                onClick={() => {
                  setTouched(true);
                  setMode('heal');
                }}
                className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {isHi ? 'ठीक करें' : 'Heal'}
              </button>
            </div>
          </div>

          <input
            id="disruption-dial"
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={level}
            onChange={(e) => {
              interact();
              setLevel(parseFloat(e.target.value));
            }}
            onPointerDown={interact}
            className="dial-range w-full"
            aria-valuetext={isHi ? chainNodes[step].labelHi : chainNodes[step].labelEn}
          />

          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-slate-400">
            <span>{isHi ? 'संतुलित' : 'Balanced'}</span>
            <span>{isHi ? 'टूटने की कगार' : 'Breaking point'}</span>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-1">
            {chainNodes.map((n, idx) => {
              const Icon = n.icon;
              const on = step >= idx;
              const cur = step === idx;
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    interact();
                    setLevel(idx * STEP_SIZE + STEP_SIZE / 2);
                  }}
                  className="touch-target flex flex-col items-center gap-1 py-1"
                  aria-label={isHi ? n.labelHi : n.labelEn}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: on ? n.color : '#27272A', color: on ? '#fff' : '#71717A', transform: cur ? 'scale(1.2)' : 'scale(1)', boxShadow: cur ? `0 0 16px ${n.color}` : 'none' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className={`text-[10px] font-mono leading-tight text-center ${cur ? 'text-white' : 'text-slate-500'}`}>
                    {isHi ? n.labelHi : n.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 text-center min-h-8">
          <SceneHint
            show={!touched && mode === 'idle' && level < 1}
            text={isHi ? 'डायल खींचें, देखें सब कैसे जुड़ा है' : 'Drag the dial. Watch everything connect.'}
          />
        </div>
      </div>

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
