import React from 'react';
import { LandingHeader } from './LandingHeader';
import { HeroSection } from './HeroSection';
import { ChallengeSection } from './ChallengeSection';
import { MethodologySection } from './MethodologySection';
import { MahabhutaFrameworkSection } from './MahabhutaFrameworkSection';
import { ScientificFoundationSection } from './ScientificFoundationSection';
import { PlatformPreviewSection } from './PlatformPreviewSection';
import { LandingFooter } from './LandingFooter';

export const LandingPage: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Sticky Header with Anchor Navigation, Language Toggle & App CTA */}
      <LandingHeader onNavigateStory={scrollToSection} />

      {/* Main Storyflow */}
      <main className="flex-1">
        {/* Hero Narrative with Active Telemetry Teaser */}
        <HeroSection onScrollToSection={scrollToSection} />

        {/* Chapter 01: The Planetary Challenge & Diagnostic Gap */}
        <ChallengeSection />

        {/* Chapter 02: 5-Stage Scientific Architecture & Scoring Methodology */}
        <MethodologySection />

        {/* Chapter 03: The Panch Mahabhuta Framework in Depth */}
        <MahabhutaFrameworkSection />

        {/* Chapter 04: Scientific Provenance, Mathematical Formulation & Limitations */}
        <ScientificFoundationSection />

        {/* Chapter 05: The Platform in Action (6 Modules & Conversion CTAs) */}
        <PlatformPreviewSection />
      </main>

      {/* Comprehensive Scientific Footer */}
      <LandingFooter onScrollToSection={scrollToSection} />
    </div>
  );
};
