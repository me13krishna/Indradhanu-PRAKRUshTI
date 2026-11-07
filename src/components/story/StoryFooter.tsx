import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../context/RouterContext';
import { ArrowUp, Award, ExternalLink, ShieldAlert, Code2 } from 'lucide-react';

interface StoryFooterProps {
  onScrollToTop?: () => void;
}

export const StoryFooter: React.FC<StoryFooterProps> = ({ onScrollToTop }) => {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const isHi = language === 'hi';

  const handleScrollTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Tier: Competition Credentials & Brand Identity */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="PRAKRUshTI Official Logo"
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-500/30"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-bold text-white tracking-tight">PRAKRUshTI</span>
                <span className="font-devanagari text-xs text-emerald-400 font-semibold">(प्रकृति)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                {isHi ? 'पंचमहाभूत पर्यावरणीय बुद्धिमत्ता मंच' : 'Planetary Environmental Intelligence & Resilience Platform'}
              </p>
            </div>
          </div>

          {/* Competition Badge */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3 text-xs">
            <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-white font-semibold block">Indradhanu — PCCOE International Grand Challenge 2026</span>
              <span className="text-[11px] text-slate-500 font-mono">Theme: AI for Climate Change · vasudhaiva kutumbakam</span>
            </div>
          </div>
        </div>

        {/* Middle Tier: Live Data Provenance & Scientific Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Data Provenance Partners */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
              {isHi ? 'सजीव डेटा स्रोत (शून्य एपीआई कुंजी)' : 'Live Public Telemetry Sources (Zero API Keys)'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-300 block">Open-Meteo</strong>
                <span className="text-slate-500">Weather & Air Quality</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-300 block">ECMWF IFS</strong>
                <span className="text-slate-500">HTESSEL Land Surface</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-300 block">USGS Geophysics</strong>
                <span className="text-slate-500">FDSNWS Earthquake Feed</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-300 block">OpenStreetMap</strong>
                <span className="text-slate-500">Nominatim Geocoding</span>
              </div>
            </div>
          </div>

          {/* Epistemological & Scientific Disclaimer */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHi ? 'वैज्ञानिक प्रकटीकरण एवं अस्वीकरण' : 'Scientific Transparency & Disclaimer'}</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {isHi
                ? 'पंचमहाभूत स्कोरिंग मॉडल एक पारदर्शी, शैक्षणिक और व्याख्यात्मक संश्लेषण है। यह शास्त्रीय तत्वों को आधुनिक भौतिकी के रूप में प्रस्तुत करने का दावा नहीं करता, बल्कि उच्च-आयामी उपग्रह डेटा को मानवीय समझ के अनुकूल बनाने का एक अभिनव माध्यम है।'
                : 'The Panch Mahabhuta framework serves strictly as an interpretive educational synthesis and decision-support tool. It is not an empirical claim that classical elements are literal irreducible substances, but an intuitive lens translating high-dimensional Earth observations into actionable ecological metrics.'}
            </p>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Actions & Links */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-4">
            <span>© 2026 PRAKRUshTI Team · MIT License</span>
            <a
              href="https://github.com/me13krishna/Indradhanu-PRAKRUshTI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center space-x-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/app')}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center space-x-1"
            >
              <span>{isHi ? 'कंसोल खोलें' : 'Enter Console'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={handleScrollTop}
              className="touch-target p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors flex items-center space-x-1"
              aria-label="Scroll to top of page"
            >
              <span>{isHi ? 'शीर्ष पर जाएं' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
