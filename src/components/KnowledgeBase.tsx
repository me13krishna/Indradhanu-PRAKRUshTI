import React from 'react';
import { BookOpen, Sparkles, Feather } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {

  const knowledgeCards = [
    {
      sanskrit: 'पृथ्वी (Prithvi - Earth)',
      color: '#C97B4A',
      ancientWisdom: 'In Sanatan philosophy, Prithvi represents firmness, stability, and soil fertility. It holds the nourishment for all living creation (Bhoomi Stuthi).',
      modernScience: 'Quantified via satellite soil moisture proxies (FAO Soil Water Index), land degradation metrics, and USGS tectonic seismic stability monitoring.',
    },
    {
      sanskrit: 'जल (Jal - Water)',
      color: '#1B6B93',
      ancientWisdom: 'Jal is the life-giver (Aapah) symbolizing fluidity, purification, and rainfall cycles described in ancient Vedic hydrological hymns.',
      modernScience: 'Measured through Open-Meteo precipitation volume (mm), relative humidity, GloFAS flood risk forecasts, and Palmer drought severity indices.',
    },
    {
      sanskrit: 'अग्नि (Agni - Fire & Energy)',
      color: '#D9822B',
      ancientWisdom: 'Agni is the transformative cosmic spark, thermal energy, and solar warmth that drives metabolism and agricultural growth cycles.',
      modernScience: 'Monitored via ambient dry-bulb temperature (°C), thermal heatwave exposure thresholds, and NASA FIRMS active fire detection signals.',
    },
    {
      sanskrit: 'वायु (Vayu - Air & Atmosphere)',
      color: '#6FA8C9',
      ancientWisdom: 'Vayu represents Prana (vital life breath) circulating life across ecosystems, symbolizing atmospheric motion and purity.',
      modernScience: 'Tracked via real-time Air Quality Index (AQI), PM2.5 / PM10 particulate density, and wind vector velocity (km/h) for atmospheric dispersion.',
    },
    {
      sanskrit: 'आकाश (Akash - Ether & Space)',
      color: '#7A6C9E',
      ancientWisdom: 'Akash is the boundless continuum — the subtle ether that holds space for all sound, solar radiation, and sky balance.',
      modernScience: 'Evaluated through barometric surface pressure (hPa), cloud cover fraction, UV solar radiation index, and broader climate anomaly patterns.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge & Philosophical Spine</span>
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-slate-800 dark:text-slate-100">
          Bridging Ancient Ecological Wisdom with Modern Climate Science
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-sans">
          Discover how each Panch Mahabhuta element maps ancient Sanatan ecological principles directly to measurable satellite metrics.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-4">
        {knowledgeCards.map((card, idx) => (
          <div
            key={idx}
            className="card-paper p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 relative overflow-hidden shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-md"
                style={{ backgroundColor: card.color }}
              >
                {card.sanskrit[0]}
              </div>
              <h3 className="font-devanagari text-xl font-bold text-slate-800 dark:text-slate-100">
                {card.sanskrit}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Ancient Wisdom */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-serif flex items-center space-x-1.5 mb-2">
                  <Feather className="w-3.5 h-3.5" />
                  <span>Ancient Ecological Philosophy</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {card.ancientWisdom}
                </p>
              </div>

              {/* Modern Science */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono flex items-center space-x-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Modern Earth Observation Data</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {card.modernScience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
