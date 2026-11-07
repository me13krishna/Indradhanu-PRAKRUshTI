import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from './types/prakrushti';
import { PRESET_LOCATIONS } from './services/geocoding';
import { getPrakrutiAnalysis } from './services/prakrushtiApi';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { LandingPage } from './components/landing/LandingPage';
import { AppSidebar } from './components/layout/AppSidebar';
import { LocationSearch } from './components/LocationSearch';
import { DashboardContextBar } from './components/DashboardContextBar';
import { PrakrutiGauge } from './components/PrakrutiGauge';
import { ElementCard } from './components/ElementCard';
import { WeatherStrip } from './components/WeatherStrip';
import { DisasterRisks } from './components/DisasterRisks';
import { AIInsightPanel } from './components/AIInsightPanel';
import { AIAssistantChat } from './components/AIAssistantChat';
import { ForecastStrip } from './components/ForecastStrip';
import { MapView } from './components/MapView';
import { ElementDetailModal } from './components/ElementDetailModal';
import { ComparisonView } from './components/ComparisonView';
import { GlobalHotspots } from './components/GlobalHotspots';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AboutSection } from './components/AboutSection';
import { ReportExportModal } from './components/ReportExportModal';
import { Loader2, Globe, ShieldCheck, Activity, Calendar, Bot, Cpu } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentRoute } = useRouter();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  // Persistent application state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentLocation, setCurrentLocation] = useState<LocationData>(PRESET_LOCATIONS[0]); // Default Pune
  const [analysis, setAnalysis] = useState<PrakrutiAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [densityMode, setDensityMode] = useState<'zen' | 'technical'>('technical');

  const [selectedElementKey, setSelectedElementKey] = useState<MahabhutaElementKey | null>(null);
  const [showReportExport, setShowReportExport] = useState<boolean>(false);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const loadAnalysis = useCallback(async (loc: LocationData) => {
    setLoading(true);
    try {
      const data = await getPrakrutiAnalysis(loc);
      setAnalysis(data);
    } catch (e) {
      console.error('Failed to compute Panch Mahabhuta analysis:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalysis(currentLocation);
  }, [currentLocation, loadAnalysis]);

  const handleSelectLocation = (loc: LocationData) => {
    setCurrentLocation(loc);
    setActiveTab('dashboard');
  };

  const handleJumpToAssistant = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const elementKeys: MahabhutaElementKey[] = ['prithvi', 'jal', 'agni', 'vayu', 'akash'];

  // Route 1: Story-led Landing Page (at /)
  if (currentRoute === '/') {
    return <LandingPage />;
  }

  // Route 2: Working Environmental Intelligence Platform (at /app)
  return (
    <div className="min-h-screen flex flex-col font-sans bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors md:pl-20 lg:pl-64 pb-20 md:pb-12">
      
      {/* App Shell Sidebar (Desktop Left Rail / Mobile Bottom Bar) */}
      <div className={showReportExport ? 'no-print' : ''}>
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onExportReport={() => setShowReportExport(true)}
          currentLocationName={currentLocation.name}
        />
      </div>

      {/* Main Content Viewport */}
      <main className={`flex-1 ${showReportExport ? 'no-print' : ''}`}>
        
        {/* Global Location & Telemetry Status Bar */}
        <div className="bg-brand-dark/5 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/5 py-2 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-mono">
            <div className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isHi ? 'टेलीमेट्री:' : 'Telemetry for:'}</span>
              <strong className="text-slate-800 dark:text-slate-100">{currentLocation.name}</strong>
            </div>

            {/* Density Mode Switcher (Visible in Dashboard) */}
            {activeTab === 'dashboard' && (
              <div className="hidden sm:flex items-center space-x-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-white/10 text-[11px]">
                <button
                  onClick={() => setDensityMode('zen')}
                  className={`px-2.5 py-0.5 rounded-lg font-semibold transition-all ${
                    densityMode === 'zen'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Simplified high-level overview"
                >
                  🌿 {isHi ? 'ज़ेन मोड' : 'Zen'}
                </button>
                <button
                  onClick={() => setDensityMode('technical')}
                  className={`px-2.5 py-0.5 rounded-lg font-semibold transition-all ${
                    densityMode === 'technical'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                  title="Dense scientific telemetry and equations"
                >
                  🔬 {isHi ? 'तकनीकी' : 'Technical'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab 1: Panch Mahabhuta Core Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 animate-fadeIn">
            
            {/* Search Bar */}
            <LocationSearch
              currentLocation={currentLocation}
              onSelectLocation={handleSelectLocation}
            />

            {loading || !analysis ? (
              <div className="p-20 text-center text-slate-500 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                <span className="text-sm font-semibold">
                  {isHi
                    ? `${currentLocation.name.split(',')[0]} के लिए पर्यावरणीय टेलीमेट्री लोड हो रही है...`
                    : `Fetching multi-source telemetry for ${currentLocation.name.split(',')[0]}...`}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ingesting ECMWF IFS, Copernicus CAMS & USGS GSN
                </span>
              </div>
            ) : (
              <div className="space-y-8 mt-4">
                
                {/* 0. Context Bar: Location chip, real source timestamp, model fidelity & report button */}
                <DashboardContextBar
                  analysis={analysis}
                  onJumpToAssistant={handleJumpToAssistant}
                  onExportReport={() => setShowReportExport(true)}
                />

                {/* Technical Mode Analytical Formula Banner */}
                {densityMode === 'technical' && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-emerald-500/30 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Order p=0.5 Generalized Mean: Prakruti = (Σ wᵢ · √Sᵢ)²</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Attribution: Δᵢ = S(S) - S(S₋ᵢ, S̄)
                    </span>
                  </div>
                )}

                {/* Section 1 & 2: Primary Overview Row (Prakruti Score Gauge + Map) */}
                <section aria-labelledby="section-overview-title">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* 1. Overall Prakruti Assessment Gauge */}
                    <div className="lg:col-span-5 xl:col-span-4 flex">
                      <div className="w-full flex">
                        <PrakrutiGauge
                          score={analysis.prakrutiScore}
                          overallStatus={analysis.overallStatus}
                          locationName={analysis.location.name}
                        />
                      </div>
                    </div>

                    {/* 2. Geographic Map & Location Pin */}
                    <div className="lg:col-span-7 xl:col-span-8 flex">
                      <div className="w-full flex">
                        <MapView
                          location={analysis.location}
                          prakrutiScore={analysis.prakrutiScore}
                        />
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section 3: 5 Mahabhuta Elemental Cards */}
                <section aria-labelledby="section-elements-title">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                    <div>
                      <h3 id="section-elements-title" className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>{isHi ? 'पंचमहाभूत संतुलन निदान' : 'Panch Mahabhuta Elemental Diagnostic'}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                        {isHi
                          ? 'उप-योगात्मक p=0.5 सूत्र द्वारा विश्लेषित। विस्तृत माप और प्रॉक्सी देखने हेतु किसी भी कार्ड पर क्लिक करें।'
                          : 'Sub-additive p=0.5 assessment. Click any element card to inspect sub-metrics, weights, and model proxies.'}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      {isHi ? 'विवरण हेतु क्लिक करें' : 'Tap card for drilldown'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {elementKeys.map((key) => (
                      <ElementCard
                        key={key}
                        elementKey={key}
                        element={analysis.elements[key]}
                        onClick={() => setSelectedElementKey(key)}
                      />
                    ))}
                  </div>
                </section>

                {/* Section 4: Current Environmental Conditions & Model Telemetry */}
                <section aria-labelledby="section-conditions-title">
                  <div className="mb-2">
                    <h3 id="section-conditions-title" className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{isHi ? 'वर्तमान पर्यावरणीय अवलोकन एवं मॉडल टेलीमेट्री' : 'Current Environmental Conditions & Model Telemetry'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      {isHi
                        ? 'विश्व मौसम विज्ञान संगठन (WMO) एवं कॉपरनिकस CAMS वायुमंडलीय मानक'
                        : 'Surface observations & numerical predictions calibrated against WMO & CAMS standards'}
                    </p>
                  </div>

                  <WeatherStrip weather={analysis.weather} />
                </section>

                {/* Section 5: AI Diagnostic Insights & Compound Hazards */}
                <section aria-labelledby="section-risks-title">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Assessment Explanation & Explainability Attribution */}
                    <div className="lg:col-span-7 flex">
                      <div className="w-full flex">
                        <AIInsightPanel
                          insightsEnglish={analysis.insights}
                          insightsHindi={analysis.insightsHindi}
                          recommendationsEnglish={analysis.recommendations}
                          recommendationsHindi={analysis.recommendationsHindi}
                          explainability={analysis.explainability}
                          onOpenAssistant={handleJumpToAssistant}
                        />
                      </div>
                    </div>

                    {/* Disaster Risks Matrix */}
                    <div className="lg:col-span-5 flex">
                      <div className="w-full flex">
                        <DisasterRisks
                          disasterRisk={analysis.disasterRisk}
                          risks={analysis.risks}
                        />
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section 6: 7-Day Forecast */}
                <section aria-labelledby="section-forecast-title">
                  <div className="mb-2">
                    <h3 id="section-forecast-title" className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{isHi ? '७-दिवसीय पर्यावरणीय प्रक्षेपवक्र पूर्वानुमान' : '7-Day Environmental Trajectory Forecast'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      {isHi ? 'दैनिक तापीय सीमा एवं वर्षा संभावना' : 'Daily temperature thresholds and precipitation probabilities'}
                    </p>
                  </div>

                  <ForecastStrip forecastDays={analysis.forecastDays} />
                </section>

                {/* Section 7: Contextual AI Assistant */}
                <section aria-labelledby="section-assistant-title" ref={chatSectionRef}>
                  <div className="mb-2">
                    <h3 id="section-assistant-title" className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{isHi ? 'संदर्भगत पर्यावरणीय बुद्धिमत्ता सहायक' : 'Contextual Environmental Intelligence Assistant'}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                      {isHi
                        ? 'सत्यापित टेलीमेट्री एवं भौतिक सूत्रों पर आधारित नियम-संचालित विशेषज्ञ प्रणाली'
                        : 'Deterministic rule-based expert query resolution grounded in verified telemetry'}
                    </p>
                  </div>

                  <AIAssistantChat analysis={analysis} />
                </section>

              </div>
            )}
          </div>
        )}

        {/* Tab 2: Comparison Mode */}
        {activeTab === 'compare' && (
          <div className="animate-fadeIn">
            <ComparisonView initialLocationA={currentLocation} />
          </div>
        )}

        {/* Tab 3: Global Hotspots Map */}
        {activeTab === 'hotspots' && (
          <div className="animate-fadeIn">
            <GlobalHotspots onSelectCity={handleSelectLocation} />
          </div>
        )}

        {/* Tab 4: What-If Simulator */}
        {activeTab === 'simulator' && analysis && (
          <div className="animate-fadeIn">
            <WhatIfSimulator analysis={analysis} />
          </div>
        )}

        {/* Tab 5: Knowledge Encyclopedia */}
        {activeTab === 'knowledge' && (
          <div className="animate-fadeIn">
            <KnowledgeBase />
          </div>
        )}

        {/* Tab 6: About & Philosophy Section */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Deep Forest Green Anchor Footer */}
      <footer className={`bg-[#10241B] border-t border-emerald-500/20 text-emerald-100/80 py-6 px-4 text-center text-xs font-sans mt-12 ${showReportExport ? 'no-print' : ''}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-white">PRAKRUshTI</span>
            <span className="text-emerald-200/70">— Built for Indradhanu PCCOE International Grand Challenge 2026</span>
          </div>
          <p className="font-mono text-[11px] text-emerald-300/80">
            Vasudhaiva Kutumbakam — The world is one family
          </p>
        </div>
      </footer>

      {/* Modal 1: Element Detailed Breakdown Modal */}
      {selectedElementKey && analysis && (
        <ElementDetailModal
          elementKey={selectedElementKey}
          element={analysis.elements[selectedElementKey]}
          onClose={() => setSelectedElementKey(null)}
        />
      )}

      {/* Modal 2: Printable PDF Dossier Modal */}
      {showReportExport && analysis && (
        <ReportExportModal
          analysis={analysis}
          onClose={() => setShowReportExport(false)}
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
