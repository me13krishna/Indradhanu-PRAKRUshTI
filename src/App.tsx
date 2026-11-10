import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, Cpu, RefreshCw } from 'lucide-react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from './types/prakrushti';
import { getPrakrutiAnalysis } from './services/prakrushtiApi';
import { generateEcologicalActionPlan, type EcologicalActionPlan } from './services/nugenService';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { buildShareUrl, useLocationState, type AppTab } from './hooks/useLocationState';
import { LandingPage } from './components/landing/LandingPage';
import { AppSidebar } from './components/layout/AppSidebar';
import { AppTopBar } from './components/layout/AppTopBar';
import { CommandPalette } from './components/layout/CommandPalette';
import { AssistantDrawer } from './components/layout/AssistantDrawer';
import { GlobalBotanicalBackground } from './components/layout/GlobalBotanicalBackground';
import { DashboardHero } from './components/DashboardHero';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { AdvisoryBanner } from './components/AdvisoryBanner';
import { ElementCard } from './components/ElementCard';
import { WeatherStrip } from './components/WeatherStrip';
import { DisasterRisks } from './components/DisasterRisks';
import { AIInsightPanel } from './components/AIInsightPanel';
import { ForecastStrip } from './components/ForecastStrip';
import { NextSteps } from './components/NextSteps';
import { ElementDetailModal } from './components/ElementDetailModal';
import { ComparisonView } from './components/ComparisonView';
import { GlobalHotspots } from './components/GlobalHotspots';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AboutSection } from './components/AboutSection';
import { ReportExportModal } from './components/ReportExportModal';
import { EcologicalActionPlanModal } from './components/EcologicalActionPlanModal';
import { Reveal, SectionHeader } from './components/ui/primitives';
import { ELEMENT_ORDER } from './lib/tone';

type Density = 'zen' | 'technical';
const DENSITY_KEY = 'prakrushti_density';

function readDensity(): Density {
  try {
    return localStorage.getItem(DENSITY_KEY) === 'technical' ? 'technical' : 'zen';
  } catch {
    return 'zen';
  }
}

const MainAppContent: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const { location, setLocation, recents, tab, setTab } = useLocationState(currentRoute);
  const [analysis, setAnalysis] = useState<PrakrutiAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [density, setDensityState] = useState<Density>(readDensity);

  const [selectedElementKey, setSelectedElementKey] = useState<MahabhutaElementKey | null>(null);
  const [showReportExport, setShowReportExport] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [actionPlan, setActionPlan] = useState<EcologicalActionPlan | null>(null);
  const [showActionPlanModal, setShowActionPlanModal] = useState(false);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const requestId = useRef(0);

  const setDensity = (d: Density) => {
    setDensityState(d);
    try {
      localStorage.setItem(DENSITY_KEY, d);
    } catch {
      // storage unavailable
    }
  };

  const loadAnalysis = useCallback(async (loc: LocationData) => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    try {
      const data = await getPrakrutiAnalysis(loc);
      if (id === requestId.current) setAnalysis(data);
    } catch (e) {
      console.error('Failed to compute Panch Mahabhuta analysis:', e);
      if (id === requestId.current) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      }
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentRoute !== '/app') return;
    loadAnalysis(location);
  }, [location, currentRoute, loadAnalysis]);

  useEffect(() => {
    if (currentRoute !== '/app') return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentRoute]);

  const handleSelectLocation = useCallback(
    (loc: LocationData) => {
      setLocation(loc);
      setTab('dashboard');
    },
    [setLocation, setTab]
  );

  const handleGenerateActionPlan = async () => {
    if (!analysis) return;
    setShowActionPlanModal(true);
    setGeneratingPlan(true);
    try {
      setActionPlan(await generateEcologicalActionPlan(analysis, language));
    } catch (e) {
      console.error('Failed to generate action plan:', e);
    } finally {
      setGeneratingPlan(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(location, tab));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.warn('Clipboard unavailable:', e);
    }
  };

  if (currentRoute === '/') {
    return <LandingPage />;
  }

  const city = location.name.split(',')[0];
  const printing = showReportExport ? 'no-print' : '';

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors md:pl-20 lg:pl-64 pb-20 md:pb-0">
      <GlobalBotanicalBackground variant="app" />

      <div className={printing}>
        <AppSidebar
          activeTab={tab}
          setActiveTab={(t) => setTab(t as AppTab)}
          onExportReport={() => setShowReportExport(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
          onOpenPalette={() => setPaletteOpen(true)}
          currentLocationName={location.name}
        />
      </div>

      <main className={`relative z-10 flex-1 ${printing}`}>
        <AppTopBar
          tab={tab}
          locationName={location.name}
          coords={`${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`}
          loading={loading}
          capturedAt={analysis?.capturedAt}
          copied={copied}
          density={density}
          onDensity={setDensity}
          onOpenPalette={() => setPaletteOpen(true)}
          onRefresh={() => loadAnalysis(location)}
          onCopyLink={handleCopyLink}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'dashboard' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
                {error && !loading ? (
                  <div className="card-paper rounded-3xl p-10 text-center max-w-xl mx-auto">
                    <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {isHi ? 'डेटा लोड नहीं हो सका' : "Couldn't load live data"}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                      {isHi ? 'नेटवर्क जाँचें और फिर कोशिश करें।' : 'Check your connection, then try again.'}
                    </p>
                    <button
                      onClick={() => loadAnalysis(location)}
                      className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      {isHi ? 'फिर कोशिश करें' : 'Try again'}
                    </button>
                  </div>
                ) : !analysis || (loading && analysis.location.name !== location.name) ? (
                  <DashboardSkeleton place={city} />
                ) : (
                  <div className={`space-y-12 transition-opacity duration-300 ${loading ? 'opacity-60' : ''}`}>
                    <AdvisoryBanner advisories={analysis.safetyAdvisories} />

                    <DashboardHero
                      analysis={analysis}
                      onSelectElement={setSelectedElementKey}
                      onActionPlan={handleGenerateActionPlan}
                      onAskAI={() => setAssistantOpen(true)}
                      onExport={() => setShowReportExport(true)}
                      onCompare={() => setTab('compare')}
                      onPickLocation={handleSelectLocation}
                    />

                    <section aria-labelledby="sec-elements">
                      <SectionHeader
                        id="sec-elements"
                        eyebrow={isHi ? 'पंचमहाभूत' : 'Panch Mahabhuta'}
                        title={isHi ? 'पाँच तत्वों का संतुलन' : 'The five elements, one place'}
                        subtitle={
                          isHi
                            ? 'किसी भी कार्ड पर क्लिक करें और देखें कि स्कोर किन मापों से बना है।'
                            : 'Tap any element to see exactly which measurements shaped its score.'
                        }
                      />
                      {density === 'technical' && (
                        <Reveal className="mb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs border border-emerald-500/25">
                            <span className="flex items-center gap-2">
                              <Cpu className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              Prakruti = (Σ wᵢ · √Sᵢ)²  ·  p = 0.5 generalized mean
                            </span>
                            <span className="text-slate-400">Δᵢ = S(S) − S(S₋ᵢ, S̄)</span>
                          </div>
                        </Reveal>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {ELEMENT_ORDER.map((key, i) => (
                          <ElementCard
                            key={key}
                            elementKey={key}
                            element={analysis.elements[key]}
                            density={density}
                            index={i}
                            onClick={() => setSelectedElementKey(key)}
                          />
                        ))}
                      </div>
                    </section>

                    <section aria-labelledby="sec-conditions">
                      <SectionHeader
                        id="sec-conditions"
                        eyebrow={isHi ? 'लाइव' : 'Live conditions'}
                        title={isHi ? 'अभी की स्थिति' : 'What the air and sky are doing right now'}
                        subtitle={isHi ? 'WMO और CAMS मानकों पर आधारित सतही अवलोकन।' : 'Surface observations calibrated against WMO and CAMS standards.'}
                      />
                      <WeatherStrip weather={analysis.weather} />
                    </section>

                    <section aria-labelledby="sec-insights" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      <div className="lg:col-span-7">
                        <AIInsightPanel
                          insightsEnglish={analysis.insights}
                          insightsHindi={analysis.insightsHindi}
                          recommendationsEnglish={analysis.recommendations}
                          recommendationsHindi={analysis.recommendationsHindi}
                          explainability={analysis.explainability}
                          showEvidence={density === 'technical'}
                          onOpenAssistant={() => setAssistantOpen(true)}
                        />
                      </div>
                      <div className="lg:col-span-5">
                        <DisasterRisks disasterRisk={analysis.disasterRisk} risks={analysis.risks} />
                      </div>
                    </section>

                    <section aria-labelledby="sec-forecast">
                      <SectionHeader
                        id="sec-forecast"
                        eyebrow={isHi ? 'आगे का रास्ता' : 'Outlook'}
                        title={isHi ? 'अगले 7 दिन' : 'The next seven days'}
                        subtitle={isHi ? 'दैनिक तापमान सीमा और वर्षा की संभावना।' : 'Daily temperature range and chance of rain.'}
                      />
                      <ForecastStrip forecastDays={analysis.forecastDays} />
                    </section>

                    <section aria-labelledby="sec-next">
                      <SectionHeader
                        id="sec-next"
                        eyebrow={isHi ? 'आगे' : 'Keep exploring'}
                        title={isHi ? 'अब क्या करें?' : 'Where to next?'}
                      />
                      <NextSteps city={city} onGo={setTab} />
                    </section>
                  </div>
                )}
              </div>
            )}

            {tab === 'compare' && <ComparisonView initialLocationA={location} />}
            {tab === 'hotspots' && <GlobalHotspots onSelectCity={handleSelectLocation} />}
            {tab === 'simulator' && analysis && <WhatIfSimulator analysis={analysis} />}
            {tab === 'simulator' && !analysis && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <DashboardSkeleton place={city} />
              </div>
            )}
            {tab === 'knowledge' && <KnowledgeBase />}
            {tab === 'about' && <AboutSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className={`relative z-10 border-t border-slate-900/5 dark:border-white/[0.06] py-6 px-4 text-xs ${printing}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-900 dark:text-white">PRAKRUshTI</span>
            <span>{isHi ? '— इंद्रधनु PCCOE इंटरनेशनल ग्रैंड चैलेंज 2026 के लिए' : '— Built for Indradhanu PCCOE International Grand Challenge 2026'}</span>
          </div>
          <p className="font-mono text-[11px] text-emerald-700/80 dark:text-emerald-300/80">Vasudhaiva Kutumbakam</p>
        </div>
      </footer>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        recents={recents}
        onSelectLocation={handleSelectLocation}
        onNavigate={setTab}
        onExportReport={() => setShowReportExport(true)}
        onActionPlan={handleGenerateActionPlan}
        onOpenAssistant={() => setAssistantOpen(true)}
        onCopyLink={handleCopyLink}
        onViewStory={() => navigate('/?story=1')}
      />

      <AssistantDrawer open={assistantOpen} onClose={() => setAssistantOpen(false)} analysis={analysis} />

      {selectedElementKey && analysis && (
        <ElementDetailModal
          elementKey={selectedElementKey}
          element={analysis.elements[selectedElementKey]}
          onClose={() => setSelectedElementKey(null)}
        />
      )}

      {showReportExport && analysis && <ReportExportModal analysis={analysis} onClose={() => setShowReportExport(false)} />}

      {showActionPlanModal && (
        <EcologicalActionPlanModal
          plan={actionPlan}
          loading={generatingPlan}
          onClose={() => setShowActionPlanModal(false)}
          onRegenerate={handleGenerateActionPlan}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <RouterProvider>
        <MainAppContent />
      </RouterProvider>
    </LanguageProvider>
  );
};

export default App;
