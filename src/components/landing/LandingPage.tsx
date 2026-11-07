import React from 'react';
import { StoryNav } from '../story/StoryNav';
import { Scene01Awakening } from '../story/Scene01Awakening';
import { Scene02Fracture } from '../story/Scene02Fracture';
import { Scene03Elements } from '../story/Scene03Elements';
import { Scene04Engine } from '../story/Scene04Engine';
import { Scene05Explore } from '../story/Scene05Explore';
import { Scene06Vision } from '../story/Scene06Vision';
import { StoryFooter } from '../story/StoryFooter';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const LandingPage: React.FC = () => {
  const { scrollTo } = useSmoothScroll({ enabled: true });

  const scrollToSection = (sectionId: string) => {
    // Canonical mapping bridging narrative IDs and legacy anchors
    const idMap: Record<string, string> = {
      awakening: 'awakening',
      fracture: 'fracture',
      challenge: 'fracture',
      elements: 'elements',
      framework: 'elements',
      engine: 'engine',
      methodology: 'engine',
      foundation: 'engine',
      explore: 'explore',
      preview: 'explore',
      vision: 'vision',
    };

    const targetId = idMap[sectionId] || sectionId;
    scrollTo(targetId);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Persistent Cinematic Story Header Navigation */}
      <StoryNav onScrollToChapter={scrollToSection} />

      {/* Main 6-Chapter Cinematic Storyflow */}
      <main className="flex-1">
        {/* Chapter 01: The Awakening (Earth Equilibrium & Living Telemetry) */}
        <Scene01Awakening onScrollToNext={() => scrollToSection('fracture')} />

        {/* Chapter 02: The Invisible Fracture (The Diagnostic Dilemma & Verified Citations) */}
        <Scene02Fracture onScrollToNext={() => scrollToSection('elements')} />

        {/* Chapter 03: The Panch Mahabhuta Framework (5-Element Hero Showcase) */}
        <Scene03Elements onScrollToNext={() => scrollToSection('engine')} />

        {/* Chapter 04: The Planetary Intelligence Engine & Mathematical Foundation */}
        <Scene04Engine onScrollToNext={() => scrollToSection('explore')} />

        {/* Chapter 05: Explore the Living System (Interactive Biome Telemetry) */}
        <Scene05Explore onScrollToNext={() => scrollToSection('vision')} />

        {/* Chapter 06: Vision & Planetary Stewardship (Vasudhaiva Kutumbakam) */}
        <Scene06Vision />
      </main>

      {/* Streamlined Competition & Academic Footer */}
      <StoryFooter onScrollToTop={() => scrollToSection('awakening')} />
    </div>
  );
};
