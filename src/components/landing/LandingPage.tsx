import React, { useState, useEffect } from 'react';
import { FilmNav } from '../story/FilmNav';
import { FilmScene01Awakening } from '../story/FilmScene01Awakening';
import { FilmScene02CauseEffect } from '../story/FilmScene02CauseEffect';
import { FilmScene03Elements } from '../story/FilmScene03Elements';
import { FilmScene04Intelligence } from '../story/FilmScene04Intelligence';
import { FilmScene05LiveWorld } from '../story/FilmScene05LiveWorld';
import { FilmScene06Vision } from '../story/FilmScene06Vision';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const LandingPage: React.FC = () => {
  const { scrollTo } = useSmoothScroll({ enabled: true });
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  const sceneIds = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5', 'scene-6'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSceneIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = (index: number) => {
    const id = sceneIds[index];
    scrollTo(id);
  };

  return (
    <div className="min-h-screen bg-[#060D0A] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Minimalist Film Navigation Chrome (Logo + 6 Dots + SKIP) */}
      <FilmNav
        activeSceneIndex={activeSceneIndex}
        onSelectScene={handleSelectScene}
      />

      {/* Main Continuous Visual Film Journey (Scenes 1 to 6) */}
      <main className="flex-1">
        {/* Scene 1: The Awakening (Dawn, Wonder, 4 Words) */}
        <FilmScene01Awakening onScrollToNext={() => handleSelectScene(1)} />

        {/* Scene 2: Why It Happens (Cause ➔ Effect Chain, 9 Words) */}
        <FilmScene02CauseEffect onScrollToNext={() => handleSelectScene(2)} />

        {/* Scene 3: The Five Elements (Visual Identity, 4 Words) */}
        <FilmScene03Elements onScrollToNext={() => handleSelectScene(3)} />

        {/* Scene 4: The Intelligence (Glass Core & Signal Filter, 8 Words) */}
        <FilmScene04Intelligence onScrollToNext={() => handleSelectScene(4)} />

        {/* Scene 5: Your World, Live (Interactive Biome Pod & 4 Deep-Link Tiles, 12 Words) */}
        <FilmScene05LiveWorld onScrollToNext={() => handleSelectScene(5)} />

        {/* Scene 6: The Vision (Healed Landscape, Hope, ENTER PRAKRUSHTI Button, 7 Words) */}
        <FilmScene06Vision />
      </main>
    </div>
  );
};
