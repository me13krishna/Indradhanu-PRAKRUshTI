import React from 'react';
import { StoryNav } from '../story/StoryNav';
import { Scene01Awakening } from '../story/Scene01Awakening';
import { Scene02Fracture } from '../story/Scene02Fracture';
import { MethodologySection } from './MethodologySection';
import { MahabhutaFrameworkSection } from './MahabhutaFrameworkSection';
import { ScientificFoundationSection } from './ScientificFoundationSection';
import { PlatformPreviewSection } from './PlatformPreviewSection';
import { LandingFooter } from './LandingFooter';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export const LandingPage: React.FC = () => {
  const { scrollTo } = useSmoothScroll({ enabled: true });

  const scrollToSection = (sectionId: string) => {
    // Canonical mapping bridging Phase 2 new narrative IDs to existing sections
    const idMap: Record<string, string> = {
      awakening: 'awakening',
      fracture: 'fracture',
      elements: 'elements',
      framework: 'elements',
      engine: 'engine',
      methodology: 'engine',
      foundation: 'foundation',
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

      {/* Main Storyflow */}
      <main className="flex-1">
        {/* Chapter 01: The Awakening (Procedural Landscape & Ambient Telemetry) */}
        <Scene01Awakening onScrollToNext={() => scrollToSection('fracture')} />

        {/* Chapter 02: The Invisible Fracture (The Diagnostic Dilemma & Verified Citations) */}
        <Scene02Fracture onScrollToNext={() => scrollToSection('elements')} />

        {/* Chapter 03: The Panch Mahabhuta Framework (5-Element Deep Dive) */}
        <div id="elements">
          <MahabhutaFrameworkSection />
        </div>

        {/* Chapter 04: The Planetary Intelligence Engine & Scoring Foundation */}
        <div id="engine">
          <MethodologySection />
          <ScientificFoundationSection />
        </div>

        {/* Chapter 05: Explore the Living System (Platform In Action) */}
        <div id="explore">
          <PlatformPreviewSection />
        </div>
      </main>

      {/* Chapter 06: Stewardship & Global Vision (Footer) */}
      <div id="vision">
        <LandingFooter onScrollToSection={scrollToSection} />
      </div>
    </div>
  );
};
