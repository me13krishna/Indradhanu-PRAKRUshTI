import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Cpu, GitMerge, ShieldCheck, Zap } from 'lucide-react';

interface Scene04EngineProps {
  onScrollToNext?: () => void;
}

export const Scene04Engine: React.FC<Scene04EngineProps> = ({ onScrollToNext }) => {
  const { language } = useLanguage();
  const [activePipelineStage, setActivePipelineStage] = useState<number>(2);
  const isHi = language === 'hi';

  const pipelineStages = [
    {
      num: '01',
      titleEn: 'Multi-Source Assimilation',
      titleHi: 'बहु-स्रोत डेटा अवशोषण',
      badge: 'Zero API Keys',
      descEn:
        'Raw telemetry streamed from ECMWF IFS Land Surface, Open-Meteo Atmospheric feeds, Copernicus CAMS, and USGS Earthquake Hazards.',
      descHi:
        'ईसीएमडब्ल्यूएफ भूमि सतह, ओपन-मेटियो वायुमंडलीय डेटा, कॉपरनिकस और यूएसजीएस भूकंपीय नेटवर्क से सीधा लाइव डेटा प्रवाह।',
      metric: '4 Open Public Feeds · 15min TTL Cache',
    },
    {
      num: '02',
      titleEn: 'Continuous Piecewise Normalization',
      titleHi: 'निरंतर अरेखीय सामान्यीकरण',
      badge: 'C¹ Continuity',
      descEn:
        'Replaces artificial step-cliffs with continuous trigonometric and penalty decay curves. Includes NOAA Rothfusz Heat Index and WHO PM2.5 decay.',
      descHi:
        'अचानक आने वाले स्कोर बदलावों को हटाकर निरंतर त्रिकोणमितीय और पेनल्टी वक्रों द्वारा ०-१०० स्कोरिंग।',
      metric: 'WHO · WMO · NOAA · ICAO Benchmarked',
    },
    {
      num: '03',
      titleEn: 'Order p=0.5 Generalized Mean',
      titleHi: 'ऑर्डर p=०.५ सामान्यीकृत माध्य',
      badge: 'Non-Compensatory',
      descEn:
        'Ecosystems cannot compensate toxic air with pleasant sunshine. Order p=0.5 severely penalizes single-element crises, preventing dangerous averaging.',
      descHi:
        'प्रकृति में जहरीली हवा अच्छे तापमान से छिप नहीं सकती। यह गैर-प्रतिपूरक गणितीय मॉडल किसी भी एक तत्व के संकट को उजागर करता है।',
      metric: 'Formula: Prakruti = (Σ wᵢ · √Sᵢ)²',
    },
    {
      num: '04',
      titleEn: 'Finite-Difference Attribution (Δᵢ)',
      titleHi: 'सीमांत कारक उत्तरदायित्व (Δᵢ)',
      badge: 'Explainable AI',
      descEn:
        'Mathematically decomposes the composite score to identify which exact element acts as the Primary Stress Driver (Δᵢ ≤ -5) versus Resilience Pillar (Δᵢ ≥ +5).',
      descHi:
        'गणितीय रूप से समग्र स्कोर को विभाजित करके यह बताता है कि कौन सा तत्व मुख्य तनाव पैदा कर रहा है और कौन सा संतुलन संभाल रहा है।',
      metric: 'Exact Directional Attribution',
    },
  ];

  const handleNextClick = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const el = document.getElementById('explore');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="engine"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-paper dark:bg-charcoal text-slate-800 dark:text-slate-100 transition-colors duration-300"
      aria-label="Chapter 04: The Planetary Intelligence Engine"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-mono mb-4">
            <span className="font-bold">04</span>
            <span>•</span>
            <span>{isHi ? 'बुद्धिमत्ता प्रणाली एवं गणित' : 'The Intelligence Architecture'}</span>
          </div>

          <h2 className="text-fluid-title font-serif font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {isHi ? (
              <>
                पारदर्शी गणित, <br className="hidden sm:inline" />
                <span className="text-teal-600 dark:text-teal-400">शून्य ब्लैक-बॉक्स अनुमान।</span>
              </>
            ) : (
              <>
                Deterministic Mathematics. <br className="hidden sm:inline" />
                <span className="text-teal-600 dark:text-teal-400">Zero Black-Box Opacity.</span>
              </>
            )}
          </h2>

          <p className="text-fluid-sub text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-balance">
            {isHi
              ? 'प्रकृति में कोई भी पर्यावरणीय तनाव दूसरे सुखद कारक से छिप नहीं सकता। जानिए कैसे हमारा ५-चरणीय कम्प्यूटेशनल पाइपलाइन जटिल उपग्रह सिग्नलों को एक विश्वसनीय स्कोर में बदलता है।'
              : 'Ecosystems obey strict thermodynamic and biological constraints. Discover the 5-stage computational pipeline that transforms raw multi-source telemetry into an explainable, non-compensatory planetary health index.'}
          </p>
        </div>

        {/* 4-Stage Interactive Pipeline Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {pipelineStages.map((stage, idx) => {
            const isSelected = activePipelineStage === idx;
            return (
              <button
                key={stage.num}
                onClick={() => setActivePipelineStage(idx)}
                className={`touch-target p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xl scale-105 border-transparent ring-2 ring-teal-400/30'
                    : 'bg-white dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs opacity-75 font-bold">STAGE {stage.num}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-teal-700 dark:text-teal-400'
                      }`}
                    >
                      {stage.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base leading-snug mb-1">
                    {isHi ? stage.titleHi : stage.titleEn}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 text-[11px] font-mono opacity-80">
                  {stage.metric}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span>ACTIVE STAGE INSPECTION: STAGE {pipelineStages[activePipelineStage].num}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                {isHi ? pipelineStages[activePipelineStage].titleHi : pipelineStages[activePipelineStage].titleEn}
              </h3>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>{pipelineStages[activePipelineStage].metric}</span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Description & Scientific Logic */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                {isHi ? pipelineStages[activePipelineStage].descHi : pipelineStages[activePipelineStage].descEn}
              </p>

              {activePipelineStage === 2 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                  <strong className="font-semibold block flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Why Order p=0.5? The Ecological Non-Compensation Proof:</span>
                  </strong>
                  <p>
                    Suppose Vayu (Air) drops to <strong>0 / 100</strong> due to toxic particulate smog, while the other 4 elements score <strong>100 / 100</strong>.
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
                    <li>Linear Arithmetic Mean: (0 + 100 + 100 + 100 + 100) / 5 = <strong>80 / 100</strong> (Falsely indicates safe, healthy conditions!)</li>
                    <li>Order p=0.5 Generalized Mean: (0.20√100 + 0.20√100 + 0.20√100 + 0.25√0 + 0.15√100)² = (0.75 × 10)² = <strong>56 / 100</strong> (Strictly caps composite score under toxic air!)</li>
                  </ul>
                </div>
              )}

              {activePipelineStage === 3 && (
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-200 space-y-2 font-mono">
                  <strong className="font-semibold block flex items-center space-x-1.5">
                    <GitMerge className="w-4 h-4 text-teal-600" />
                    <span>Factor Attribution Delta (Δᵢ) Thresholds:</span>
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                      <strong>Δᵢ ≤ -5.0: Primary Stress Driver</strong>
                      <p className="mt-0.5">Identifies the acute limiting factor dragging down composite resilience.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      <strong>Δᵢ ≥ +5.0: Resilience Pillar</strong>
                      <p className="mt-0.5">Identifies the stabilizing ecological dimension buffering the ecosystem.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Formula Code Display */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-emerald-400 shadow-xl overflow-x-auto">
              <div className="text-slate-400 text-[10px] pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
                <span>scoring_architecture.ts</span>
                <span className="text-teal-400">Deterministic TS</span>
              </div>
              <pre className="text-[11px] leading-relaxed text-slate-300">
{activePipelineStage === 0
  ? `// Stage 01: Multi-Source Assimilation
const [weather, air, seismic] = await Promise.all([
  fetchOpenMeteoWeather(lat, lon), // 2m Temp, RH, Precip, Soil Moisture
  fetchOpenMeteoAirQuality(lat, lon), // PM2.5, PM10, AQI
  fetchUSGSEarthquakes(lat, lon, 500) // M >= 4.0 Decoupled Advisory
]);`
  : activePipelineStage === 1
  ? `// Stage 02: Continuous Normalization
function normalizeTwoSided(x, L1, L2, U1, U2) {
  if (x <= L1 || x >= U2) return 0;
  if (x >= L2 && x <= U1) return 100;
  // C1 smooth trigonometric cosine easing
  return 100 * (1 + Math.cos(Math.PI * ...)) / 2;
}`
  : activePipelineStage === 2
  ? `// Stage 03: Order p=0.5 Generalized Mean
const sumWeightedSqrt =
  0.20 * Math.sqrt(scores.prithvi) +
  0.20 * Math.sqrt(scores.jal) +
  0.20 * Math.sqrt(scores.agni) +
  0.25 * Math.sqrt(scores.vayu) +
  0.15 * Math.sqrt(scores.akash);

const composite = Math.round(Math.pow(sumWeightedSqrt, 2));`
  : `// Stage 04: Marginal Factor Attribution (Δi)
for (const key of elementKeys) {
  const counterfactual = computeScoreWithMean(scores, key, mean);
  const delta = baselineComposite - counterfactual;
  attribution[key] = {
    delta: Math.round(delta * 10) / 10,
    role: delta <= -5.0 ? 'STRESS_DRIVER' : delta >= 5.0 ? 'PILLAR' : 'NEUTRAL'
  };
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Transition Link to Scene 05 */}
        <div className="text-center">
          <button
            onClick={handleNextClick}
            className="touch-target inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            <span>{isHi ? 'अध्याय ५: लाइव प्लेटफ़ॉर्म का अनुभव करें' : 'Explore Chapter 05: The Living System'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
