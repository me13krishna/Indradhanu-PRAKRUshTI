import React, { useState } from 'react';
import type { EcologicalActionPlan } from '../services/nugenService';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck,
  Share2,
  CheckCircle2,
} from 'lucide-react';

interface EcologicalActionPlanModalProps {
  plan: EcologicalActionPlan | null;
  loading: boolean;
  onClose: () => void;
  onRegenerate?: () => void;
}

export const EcologicalActionPlanModal: React.FC<EcologicalActionPlanModalProps> = ({
  plan,
  loading,
  onClose,
  onRegenerate,
}) => {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [copied, setCopied] = useState<boolean>(false);

  if (!plan && !loading) return null;

  const handleCopy = () => {
    if (!plan) return;
    const text = `🌿 PRAKRUSHTI ECOLOGICAL ACTION DIRECTIVE (${plan.locationName})\n` +
      `Composite Prakruti Score: ${plan.prakrutiScore}/100 ➔ Projected: ${plan.projectedPrakrutiScore}/100\n` +
      `Weakest Pillar: ${plan.weakestElement.name} (${plan.weakestElement.score}/100)\n\n` +
      `Summary: ${plan.executiveSummary}\n\n` +
      plan.directives.map((d) => `[${d.timeWindow}] ${d.title}\n${d.description}`).join('\n\n') +
      `\n\nImpact: ${plan.avoidedLossMetric}\nPowered by Nugen Domain-Aligned AI`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriorityBadge = (priority: 'critical' | 'high' | 'moderate') => {
    switch (priority) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="card-paper rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-500/30 relative p-5 sm:p-8 scrollbar-thin">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/10 transition z-10"
          title="Close Directive"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center animate-pulse">
                <Zap className="w-7 h-7 fill-amber-500" />
              </div>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
              {isHi ? 'नूजेन पारिस्थितिक एक्शन प्लान तैयार हो रहा है...' : 'Synthesizing Nugen Ecological Action Plan...'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md font-sans">
              {isHi
                ? 'पंचमहाभूत तत्वों, वास्तविक सेंसर डेटा एवं स्थानीय स्वास्थ्य मानकों का गहन विश्लेषण जारी है...'
                : 'Fusing real-time Panch Mahabhuta telemetry into domain-aligned public health and civic directives...'}
            </p>
          </div>
        ) : plan ? (
          <>
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                {plan.isNugenLive ? `Nugen Model Live (${plan.modelId})` : 'Grounded AI Directive'}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{plan.generatedAt}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-1">
              {plan.locationName} Ecological Prescription
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mb-5">
              {isHi
                ? 'प्रकृति एवं पंचमहाभूत संतुलन के लिए 3-स्तरीय क्रियान्वयन रणनीति'
                : '3-Tier Action Directive: Immediate Containment ➔ Civic Interventions ➔ Ecological Healing'}
            </p>

            {/* Score Delta Projection Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-teal-950/15 to-amber-950/20 border border-emerald-500/20 mb-6">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Current Score
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  {plan.prakrutiScore}<span className="text-xs text-slate-400">/100</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Projected Score
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center">
                  {plan.projectedPrakrutiScore}
                  <TrendingUp className="w-4 h-4 ml-1 text-emerald-500 inline" />
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Weakest Element
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400">
                  {plan.weakestElement.name} ({plan.weakestElement.score}/100)
                </span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 mb-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Executive Diagnostic
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                {plan.executiveSummary}
              </p>
            </div>

            {/* 3-Tier Directives List */}
            <div className="space-y-4 mb-6">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Prescribed Interventions (Timeline)
              </span>

              {plan.directives.map((dir, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{dir.icon}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {dir.timeWindow}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        • {dir.sector}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getPriorityBadge(
                        dir.priority
                      )}`}
                    >
                      {dir.priority}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    {dir.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {dir.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Avoided Loss Impact */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2.5 mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>
                <strong>{isHi ? 'प्रत्याशित प्रभाव: ' : 'Quantifiable ROI: '}</strong>
                {plan.avoidedLossMetric}
              </span>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center space-x-2">
                {onRegenerate && (
                  <button
                    onClick={onRegenerate}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition border border-slate-200 dark:border-white/10"
                  >
                    {isHi ? 'पुनः विश्लेषण' : 'Regenerate'}
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition border border-emerald-300/40 flex items-center space-x-1.5"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isHi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{isHi ? 'निर्देश कॉपी करें' : 'Share Directive'}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-dark hover:bg-brand-light text-white transition shadow-md"
              >
                {isHi ? 'बंद करें' : 'Done'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

