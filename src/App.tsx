import React, { useState, useEffect } from 'react';
import type { LocationData, PrakrutiAnalysis, MahabhutaElementKey } from './types/prakrushti';
import { PRESET_LOCATIONS } from './services/geocoding';
import { getPrakrutiAnalysis } from './services/prakrushtiApi';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { LocationSearch } from './components/LocationSearch';
import { PrakrutiGauge } from './components/PrakrutiGauge';
import { ElementCard } from './components/ElementCard';
import { WeatherStrip } from './components/WeatherStrip';
import { DisasterRisks } from './components/DisasterRisks';
import { AIInsightPanel } from './components/AIInsightPanel';
import { ForecastStrip } from './components/ForecastStrip';
import { MapView } from './components/MapView';
import { ElementDetailModal } from './components/ElementDetailModal';
import { ComparisonView } from './components/ComparisonView';
import { GlobalHotspots } from './components/GlobalHotspots';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AboutSection } from './components/AboutSection';
import { ReportExportModal } from './components/ReportExportModal';
import { Loader2, Globe } from 'lucide-react';

const MainAppContent: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentLocation, setCurrentLocation] = useState<LocationData>(PRESET_LOCATIONS[0]); // Default Pune
  const [analysis, setAnalysis] = useState<PrakrutiAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedElementKey, setSelectedElementKey] = useState<MahabhutaElementKey | null>(null);
  const [showReportExport, setShowReportExport] = useState<boolean>(false);

  const loadAnalysis = async (loc: LocationData) => {
    setLoading(true);
    try {
      const data = await getPrakrutiAnalysis(loc);
      setAnalysis(data);
    } catch (e) {
      console.error('Failed to compute Panch Mahabhuta analysis:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis(currentLocation);
  }, [currentLocation]);

  const handleSelectLocation = (loc: LocationData) => {
    setCurrentLocation(loc);
    setActiveTab('dashboard');
  };

  const elementKeys: MahabhutaElementKey[] = ['prithvi', 'jal', 'agni', 'vayu', 'akash'];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportReport={() => setShowReportExport(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-16">
        
        {/* Global Live Location Ticker Bar */}
        <div className="bg-brand-dark/5 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/5 py-2 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Currently analyzing live data feeds for:</span>
            <strong className="text-slate-800 dark:text-slate-100">{currentLocation.name}</strong>
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
                  Fetching live climate, AQI & disaster data for {currentLocation.name.split(',')[0]}...
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Hero Section: Prakruti Gauge + Map Thumbnail */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  <div className="lg:col-span-1 flex">
                    <div className="w-full flex">
                      <PrakrutiGauge
                        score={analysis.prakrutiScore}
                        overallStatus={analysis.overallStatus}
                        locationName={analysis.location.name}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <MapView
                      location={analysis.location}
                      prakrutiScore={analysis.prakrutiScore}
                    />
                  </div>
                </div>

                {/* 5 Panch Mahabhuta Element Cards Row */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                      Panch Mahabhuta Elemental Framework
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">Tap any element card to view breakdown</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {elementKeys.map((key) => (
                      <ElementCard
                        key={key}
                        elementKey={key}
                        element={analysis.elements[key]}
                        onClick={() => setSelectedElementKey(key)}
                      />
                    ))}
                  </div>
                </div>

                {/* Weather Strip Metrics */}
                <WeatherStrip weather={analysis.weather} />

                {/* AI Insights & Actionable Recommendations */}
                <AIInsightPanel
                  insightsEnglish={analysis.insights}
                  insightsHindi={analysis.insightsHindi}
                  recommendationsEnglish={analysis.recommendations}
                  recommendationsHindi={analysis.recommendationsHindi}
                />

                {/* Disaster Hazard Risk Overview */}
                <DisasterRisks
                  disasterRisk={analysis.disasterRisk}
                  risks={analysis.risks}
                />

                {/* 7-Day Forecast */}
                <ForecastStrip forecastDays={analysis.forecastDays} />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Comparison Mode */}
        {activeTab === 'compare' && (
          <ComparisonView initialLocationA={currentLocation} />
        )}

        {/* Tab 3: Global Hotspots Map */}
        {activeTab === 'hotspots' && (
          <GlobalHotspots onSelectCity={handleSelectLocation} />
        )}

        {/* Tab 4: What-If Simulator */}
        {activeTab === 'simulator' && analysis && (
          <WhatIfSimulator analysis={analysis} />
        )}

        {/* Tab 5: Knowledge Encyclopedia */}
        {activeTab === 'knowledge' && (
          <KnowledgeBase />
        )}

        {/* Tab 6: About & Philosophy Section */}
        {activeTab === 'about' && (
          <AboutSection />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-paper border-t border-slate-200/60 dark:bg-charcoal dark:border-white/10 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-serif font-bold text-slate-800 dark:text-slate-200">PRAKRUshTI</span>
            <span>— Built for Indradhanu PCCOE International Grand Challenge 2026</span>
          </div>
          <p className="font-mono text-[11px]">
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
      <MainAppContent />
    </LanguageProvider>
  );
};

export default App;
