import React from 'react';
import { ArrowRight, GitCompareArrows, Globe2, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Reveal, Spotlight } from './ui/primitives';
import type { AppTab } from '../hooks/useLocationState';

export const NextSteps: React.FC<{ city: string; onGo: (tab: AppTab) => void }> = ({ city, onGo }) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const steps: { tab: AppTab; icon: React.ReactNode; title: string; body: string; color: string }[] = [
    {
      tab: 'compare',
      icon: <GitCompareArrows className="w-5 h-5" />,
      title: isHi ? `${city} की तुलना करें` : `Compare ${city}`,
      body: isHi ? 'किसी दूसरे शहर के साथ पांचों तत्वों की आमने-सामने तुलना देखें।' : 'See all five elements side by side against any other city on Earth.',
      color: '#38bdf8',
    },
    {
      tab: 'simulator',
      icon: <SlidersHorizontal className="w-5 h-5" />,
      title: isHi ? 'क्या-अगर चलाएं' : 'Run a what-if',
      body: isHi ? 'तापमान, सूखा या AQI बढ़ाकर देखें कि स्कोर कैसे बदलता है।' : 'Push temperature, drought or AQI and watch the score respond live.',
      color: '#f59e3b',
    },
    {
      tab: 'hotspots',
      icon: <Globe2 className="w-5 h-5" />,
      title: isHi ? 'दुनिया का हाल देखें' : 'Explore the world',
      body: isHi ? 'लाइव डेटा पर सबसे स्वस्थ और सबसे तनावग्रस्त क्षेत्र देखें।' : 'See the healthiest and most stressed regions ranked on live data.',
      color: '#34d399',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((s, i) => (
        <Reveal key={s.tab} delay={i * 0.08}>
          <Spotlight
            onClick={() => onGo(s.tab)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onGo(s.tab)}
            className="card-paper group rounded-3xl p-6 cursor-pointer h-full overflow-hidden"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-110 group-hover:-rotate-6" style={{ background: `${s.color}22`, color: s.color }}>
              {s.icon}
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.body}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              {isHi ? 'खोलें' : 'Open'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Spotlight>
        </Reveal>
      ))}
    </div>
  );
};
