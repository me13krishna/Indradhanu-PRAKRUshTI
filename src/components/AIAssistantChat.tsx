import React, { useState, useRef, useEffect } from 'react';
import type { PrakrutiAnalysis } from '../types/prakrushti';
import {
  Send,
  Bot,
  User,
  Trash2,
  ShieldCheck,
  HelpCircle,
  Activity,
  ArrowRight,
  Zap,
  Settings2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  DEFAULT_SUGGESTED_PROMPTS,
  type ChatMessage,
  type SuggestedPrompt,
} from '../services/aiChatEngine';
import {
  queryNugenAssistant,
  getNugenConfig,
  saveNugenCredentials,
  clearNugenCredentials,
} from '../services/nugenService';

interface AIAssistantChatProps {
  analysis: PrakrutiAnalysis;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ analysis }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showNugenModal, setShowNugenModal] = useState<boolean>(false);
  const [nugenConfig, setNugenConfig] = useState(getNugenConfig());
  const [inputKey, setInputKey] = useState<string>('');
  const [inputModel, setInputModel] = useState<string>('prakrushti-eco-v1');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cityName = analysis.location.name.split(',')[0].trim();

  // Refresh config from storage
  useEffect(() => {
    const cfg = getNugenConfig();
    setNugenConfig(cfg);
    setInputKey(cfg.apiKey || '');
    setInputModel(cfg.modelId || 'prakrushti-eco-v1');
  }, []);

  // Initialize or reset chat whenever location changes
  useEffect(() => {
    const welcomeText = language === 'hi'
      ? `नमस्ते! मैं आपका **प्रकृति (PRAKRUshTI) AI पर्यावरण सहायक** हूँ। मैं **${cityName}** के वास्तविक वायु गुणवत्ता, तापीय सूचकांक, वर्षा और पंचमहाभूत तत्वों के आधार पर सटीक निर्णय-सहायता प्रदान करता हूँ। मुझसे कुछ भी पूछें या नीचे दिए गए प्रश्नों में से चुनें!`
      : `Hello! I am your **PRAKRUshTI AI Environmental Assistant**. I provide grounded intelligence for **${cityName}** using real-time atmospheric, hydrological, thermal, and land data. Ask me anything or click a suggested question below!`;

    const initialMessage: ChatMessage = {
      id: `welcome-${analysis.location.name}`,
      sender: 'assistant',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'general',
      verdictBadge: {
        label: nugenConfig.apiKey
          ? `⚡ Nugen Aligned (${nugenConfig.modelId})`
          : (language === 'hi' ? 'वास्तविक डेटा से प्रमाणित' : 'Grounded in Real Metrics'),
        variant: 'good',
      },
      metricsCited: [
        { label: 'Composite Score', value: `${analysis.prakrutiScore}/100` },
        { label: 'Air Quality (AQI)', value: `${analysis.weather.aqi}` },
        { label: 'Temperature', value: `${analysis.weather.temperatureC}°C` },
      ],
    };

    setMessages([initialMessage]);
  }, [analysis.location.name, language, nugenConfig.apiKey, nugenConfig.modelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Execute inference via Nugen Domain-Aligned Model (with automatic internal RAG fallback)
      const response = await queryNugenAssistant(query, analysis, language);
      setMessages((prev) => [...prev, response]);
    } catch {
      // Fallback safeguard
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: language === 'hi'
          ? `${cityName} का प्रकृति सूचकांक ${analysis.prakrutiScore}/100 है। वायु गुणवत्ता सूचकांक (AQI) ${analysis.weather.aqi} पर है।`
          : `${cityName} composite Prakruti Score is ${analysis.prakrutiScore}/100 with current AQI at ${analysis.weather.aqi}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'safety',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveNugenConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveNugenCredentials(inputKey, inputModel);
    const updated = getNugenConfig();
    setNugenConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowNugenModal(false);
    }, 1200);
  };

  const handleClearNugen = () => {
    clearNugenCredentials();
    const updated = getNugenConfig();
    setNugenConfig(updated);
    setInputKey('');
    setInputModel('prakrushti-eco-v1');
  };

  const handlePromptClick = (prompt: SuggestedPrompt) => {
    const text = language === 'hi' ? prompt.textHi : prompt.textEn;
    handleSendMessage(text);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  const getBadgeStyle = (variant?: 'good' | 'warning' | 'danger' | 'info') => {
    switch (variant) {
      case 'good':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'danger':
        return 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/20';
    }
  };

  return (
    <div id="assistant-section" className="card-paper rounded-3xl p-5 sm:p-8 shadow-2xl border border-emerald-900/15 dark:border-white/10 relative overflow-hidden">
      
      {/* Decorative subtle ambient background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/60 dark:border-white/10 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-xl font-extrabold text-slate-800 dark:text-slate-100">
                {language === 'hi' ? 'प्रकृति AI पर्यावरण सलाहकार' : 'PRAKRUshTI AI Environmental Assistant'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/50">
                RAG Live
              </span>
              {nugenConfig.apiKey ? (
                <button
                  onClick={() => setShowNugenModal(true)}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 hover:bg-amber-500/20 transition cursor-pointer"
                  title="Click to view Nugen Domain-Aligned Model configuration"
                >
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Nugen Aligned: {nugenConfig.modelId}</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowNugenModal(true)}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-white/10 flex items-center gap-1 hover:border-emerald-500/40 transition cursor-pointer"
                  title="Configure Nugen Model for Indradhanu 2026"
                >
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Connect Nugen AI</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {language === 'hi'
                  ? `${cityName} के वास्तविक वैज्ञानिक आंकड़ों पर आधारित संवादात्मक मार्गदर्शन`
                  : `Evidence-based conversational query answering grounded in live ${cityName} sensors`}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNugenModal(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition border border-slate-200/60 dark:border-white/10"
            title="Configure Nugen Model"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nugen Config</span>
          </button>

          {/* Clear chat button */}
          {messages.length > 1 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition border border-slate-200/60 dark:border-white/10"
              title="Reset conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'चैट रीसेट' : 'Clear'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="mb-6">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2.5 flex items-center space-x-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'hi' ? 'त्वरित प्रश्न चुनें' : 'Suggested Queries'}</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => handlePromptClick(prompt)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-50/70 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/40 transition flex items-center space-x-1.5 shadow-sm active:scale-95 text-left"
            >
              <span>{prompt.icon}</span>
              <span>{language === 'hi' ? prompt.textHi : prompt.textEn}</span>
              <ArrowRight className="w-3 h-3 text-emerald-600/70" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 sm:pr-2 mb-6 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 animate-fadeIn ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm mt-1 ${
                msg.sender === 'user'
                  ? 'bg-slate-700 dark:bg-slate-600'
                  : 'bg-gradient-to-br from-emerald-600 to-teal-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Content */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm border ${
                msg.sender === 'user'
                  ? 'bg-brand-dark text-white border-brand-dark rounded-tr-none'
                  : 'bg-white dark:bg-white/5 text-slate-800 dark:text-slate-100 border-slate-200/70 dark:border-white/10 rounded-tl-none'
              }`}
            >
              {/* Verdict badge for assistant responses */}
              {msg.verdictBadge && (
                <div className="mb-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getBadgeStyle(
                      msg.verdictBadge.variant
                    )}`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>{msg.verdictBadge.label}</span>
                  </span>
                </div>
              )}

              {/* Message text with newline support */}
              <div
                className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                  msg.sender === 'user' ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {msg.text.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Cited Real-time Metrics Pill Strip */}
              {msg.metricsCited && msg.metricsCited.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1.5">
                  {msg.metricsCited.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
                    >
                      <span>{item.label}: </span>
                      <strong className="text-slate-700 dark:text-slate-200">{item.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              <span className="text-[10px] font-mono text-slate-400 block text-right mt-1.5">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Typing animation */}
        {isTyping && (
          <div className="flex items-center space-x-3 animate-fadeIn">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-white/5 border border-slate-200/70 dark:border-white/10 rounded-2xl rounded-tl-none p-3.5 shadow-sm">
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.15s]" />
                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-bounce [animation-delay:0.3s]" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {language === 'hi' ? 'प्रकृति विश्लेषण जारी है...' : 'Evaluating Panch Mahabhuta data...'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center space-x-2 pt-3 border-t border-slate-200/60 dark:border-white/10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder={
            language === 'hi'
              ? `${cityName} के पर्यावरण या सुरक्षा के बारे में पूछें (उदा. 'क्या बाहर दौड़ना सुरक्षित है?')...`
              : `Ask about ${cityName}'s climate or outdoor safety (e.g. 'Is it safe to run outside?')...`
          }
          className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim()}
          className="px-5 py-3 rounded-2xl bg-brand-dark hover:bg-brand-light text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Nugen Domain-Aligned Model Config Modal (PCCOE Indradhanu 2026) */}
      {showNugenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="card-paper rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-500/30 relative">
            <button
              onClick={() => setShowNugenModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/10 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  Nugen Intelligence Model Setup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PCCOE Indradhanu 2026 Hackathon AI Integration
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Connect your team&apos;s <strong>Domain-Aligned Model</strong> from the Nugen platform to run real inference and qualify for the Nugen-sponsored hackathon category prizes.
            </p>

            <form onSubmit={handleSaveNugenConfig} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Nugen API Key
                </label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste your key (e.g. nug_live_...)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-300 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                  Keys are stored safely in local browser storage and never published.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Domain-Aligned Model ID
                </label>
                <input
                  type="text"
                  value={inputModel}
                  onChange={(e) => setInputModel(e.target.value)}
                  placeholder="prakrushti-eco-v1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/30 border border-slate-300 dark:border-white/10 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              {saveSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configuration saved! Inference will use Nugen model.</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {nugenConfig.apiKey ? (
                  <button
                    type="button"
                    onClick={handleClearNugen}
                    className="text-xs text-rose-500 hover:text-rose-400 underline font-mono"
                  >
                    Disconnect Nugen
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Fallback: Grounded Internal Engine
                  </span>
                )}

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowNugenModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-md flex items-center space-x-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Save &amp; Activate</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
