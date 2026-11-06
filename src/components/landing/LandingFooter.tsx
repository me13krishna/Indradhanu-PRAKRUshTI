import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUp, Heart } from 'lucide-react';

interface LandingFooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onScrollToSection }) => {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid: Brand, Philosophy, Quick Links, Competition Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                alt="PRAKRUshTI Official Logo"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/40"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  PRAKRUshTI
                </span>
                <span className="font-devanagari text-xs font-bold text-emerald-400 ml-2">
                  (प्रकृति)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-sm">
              {isHi
                ? 'पंचमहाभूत के शाश्वत संतुलन और आधुनिक जलवायु विज्ञान के समन्वय द्वारा ग्रह के पारिस्थितिक स्वास्थ्य का पारदर्शी मूल्यांकन।'
                : 'Panch Mahabhuta Environmental Intelligence & Planetary Resilience Platform synthesizing global telemetry into transparent, auditable indicators.'}
            </p>

            <div className="pt-2 text-xs font-devanagari text-emerald-400 font-bold tracking-wide">
              ॥ वसुधैव कुटुम्बकम् ॥ <span className="font-sans text-slate-400 font-normal">· The World is One Family</span>
            </div>
          </div>

          {/* Story Navigation Anchors (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              {isHi ? 'नेविगेशन' : 'Story Chapters'}
            </h4>
            <ul className="space-y-2 text-xs font-sans text-slate-300">
              <li>
                <button
                  onClick={() => onScrollToSection('challenge')}
                  className="hover:text-emerald-400 transition"
                >
                  {isHi ? '१. पर्यावरणीय चुनौती' : '1. The Diagnostic Gap'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('methodology')}
                  className="hover:text-emerald-400 transition"
                >
                  {isHi ? '२. कार्यप्रणाली व सूत्र' : '2. 5-Step Methodology'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('framework')}
                  className="hover:text-emerald-400 transition"
                >
                  {isHi ? '३. पंचमहाभूत रूपरेखा' : '3. Five Elements Framework'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('foundation')}
                  className="hover:text-emerald-400 transition"
                >
                  {isHi ? '४. वैज्ञानिक प्रामाणिकता' : '4. Scientific Foundation'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('preview')}
                  className="hover:text-emerald-400 transition"
                >
                  {isHi ? '५. प्लेटफ़ॉर्म मॉड्यूल' : '5. Platform Preview'}
                </button>
              </li>
            </ul>
          </div>

          {/* Event Attribution & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              {isHi ? 'प्रतिस्पर्धा एवं शोध' : 'Grand Challenge Attribution'}
            </h4>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-emerald-300">
                Indradhanu 2026 — PCCOE International Grand Challenge
              </div>
              <div className="text-[11px] text-slate-300">
                Theme: <span className="italic">AI for Climate Change & Planetary Resilience</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => navigate('/app')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
              >
                {isHi ? 'लाइव प्लेटफ़ॉर्म' : 'Live Platform'}
              </button>

              <a
                href="https://github.com/me13krishna/Indradhanu-PRAKRUshTI"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center space-x-1.5 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                title="Scroll to top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Provenance Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="text-center md:text-left leading-relaxed max-w-2xl text-[11px]">
            {isHi
              ? 'अस्वीकरण: PRAKRUshTI एक वैज्ञानिक निर्णय-सहायक प्रणाली है। ईसीएमडब्ल्यूएफ (ओपन-मेटियो), कॉपरनिकस और यूएसजीएस के आंकड़ों पर आधारित। शोध एवं पर्यावरणीय लचीलेपन की शिक्षा हेतु।'
              : 'Disclaimer: PRAKRUshTI is an open scientific decision-support system. Integrates ECMWF IFS via Open-Meteo, Copernicus CAMS, and USGS GSN under a deterministic sub-additive framework. Built for climate research and planetary resilience education.'}
          </p>

          <div className="flex items-center space-x-1 text-[11px] flex-shrink-0">
            <span>Engineered with care for our Planet</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
