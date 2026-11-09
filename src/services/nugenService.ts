import type { PrakrutiAnalysis } from '../types/prakrushti';
import { processAssistantQuery, type ChatMessage } from './aiChatEngine';

export interface NugenConfig {
  apiKey: string;
  modelId: string;
  baseUrl: string;
}

const STORAGE_KEY_API_KEY = 'prakrushti_nugen_api_key';
const STORAGE_KEY_MODEL_ID = 'prakrushti_nugen_model_id';

/**
 * Retrieves the active Nugen configuration from environment variables or localStorage.
 */
export function getNugenConfig(): NugenConfig {
  const envKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NUGEN_API_KEY) || '';
  const envModel = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NUGEN_MODEL_ID) || 'prakrushti-eco-v1';
  const envBaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NUGEN_BASE_URL) || 'https://api.nugen.in/v1';

  let localKey = '';
  let localModel = '';
  if (typeof localStorage !== 'undefined') {
    localKey = localStorage.getItem(STORAGE_KEY_API_KEY) || '';
    localModel = localStorage.getItem(STORAGE_KEY_MODEL_ID) || '';
  }

  return {
    apiKey: localKey || envKey,
    modelId: localModel || envModel,
    baseUrl: envBaseUrl.replace(/\/+$/, ''),
  };
}

/**
 * Saves dynamic Nugen credentials into localStorage for live demo testing.
 */
export function saveNugenCredentials(apiKey: string, modelId?: string): void {
  if (typeof localStorage === 'undefined') return;
  if (apiKey) {
    localStorage.setItem(STORAGE_KEY_API_KEY, apiKey.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  }
  if (modelId) {
    localStorage.setItem(STORAGE_KEY_MODEL_ID, modelId.trim());
  }
}

/**
 * Clears saved Nugen credentials.
 */
export function clearNugenCredentials(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_API_KEY);
  localStorage.removeItem(STORAGE_KEY_MODEL_ID);
}

/**
 * Builds the structured domain context for the Nugen Domain-Aligned Model.
 */
export function buildNugenSystemPrompt(analysis: PrakrutiAnalysis, language: 'en' | 'hi'): string {
  const cityName = analysis.location.name;
  const weather = analysis.weather;
  const elements = analysis.elements;
  const explain = analysis.explainability;

  return `You are the PRAKRUSHTI Ecological Intelligence Assistant, a domain-aligned model specialized in environmental diagnostics and Vedic Panch Mahabhuta sustainability science.
Current Location: ${cityName}
Composite Prakruti Score: ${analysis.prakrutiScore}/100
Panch Mahabhuta Elements:
- Prithvi (Soil/Land): ${elements.prithvi.score}/100 (${elements.prithvi.status})
- Jal (Water/Precipitation): ${elements.jal.score}/100 (${elements.jal.status})
- Agni (Thermal/Heat): ${elements.agni.score}/100 (${elements.agni.status})
- Vayu (Air Quality): ${elements.vayu.score}/100 (${elements.vayu.status})
- Akash (Space/Atmosphere/UV): ${elements.akash.score}/100 (${elements.akash.status})

Observed Real-Time Metrics:
- Air Quality Index (AQI): ${weather.aqi}
- PM2.5: ${weather.pm2_5 ?? 'N/A'} µg/m³
- Temperature: ${weather.temperatureC}°C (Feels like: ${weather.feelsLikeC ?? weather.temperatureC}°C)
- Humidity: ${weather.humidityPct}%
- Precipitation: ${weather.precipitationMm} mm
- UV Index: ${weather.uvIndex ?? 4.0}
- Primary Stress Driver: ${explain?.primaryStressDriver ?? 'None'}
- Primary Resilience Pillar: ${explain?.primaryResiliencePillar ?? 'None'}

Response Guidelines:
1. Tone: Authoritative, scientifically grounded, respectful of nature, actionable.
2. Language: Reply in ${language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
3. Reference real measurements from the provided context.
4. Give concise public health & ecological action recommendations.`;
}

/**
 * Performs inference against the Nugen Domain-Aligned Model with automatic fail-safe fallback.
 */
export async function queryNugenAssistant(
  query: string,
  analysis: PrakrutiAnalysis,
  language: 'en' | 'hi' = 'en'
): Promise<ChatMessage> {
  const config = getNugenConfig();

  // If no Nugen API key is available, use our grounded deterministic RAG engine immediately
  if (!config.apiKey) {
    return processAssistantQuery(query, analysis, language);
  }

  const systemPrompt = buildNugenSystemPrompt(analysis, language);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second circuit breaker

    // Call Nugen inference endpoint (standard OpenAI-compatible chat completions)
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.modelId,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Nugen AI] API returned status ${response.status}. Falling back to internal engine.`);
      const fallback = processAssistantQuery(query, analysis, language);
      return {
        ...fallback,
        verdictBadge: {
          label: language === 'hi' ? 'स्थानीय सत्यापन (Nugen बैकअप)' : 'Local Engine (Nugen Fallback)',
          variant: 'info',
        },
      };
    }

    const data = await response.json();
    const replyText = data?.choices?.[0]?.message?.content?.trim();

    if (!replyText) {
      throw new Error('Empty response from Nugen inference');
    }

    return {
      id: `nugen-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'diagnosis',
      verdictBadge: {
        label: `⚡ Nugen Aligned (${config.modelId})`,
        variant: 'good',
      },
      metricsCited: [
        { label: 'Prakruti Score', value: `${analysis.prakrutiScore}/100` },
        { label: 'Air AQI', value: `${analysis.weather.aqi}` },
        { label: 'Temp', value: `${analysis.weather.temperatureC}°C` },
      ],
    };
  } catch (err) {
    console.warn('[Nugen AI] Inference error or timeout:', err);
    // Graceful fallback: Never crash the UI or leave the judge waiting
    const fallback = processAssistantQuery(query, analysis, language);
    return {
      ...fallback,
      verdictBadge: {
        label: language === 'hi' ? 'स्थानीय डेटा बैकअप' : 'Internal Engine (Fallback)',
        variant: 'info',
      },
    };
  }
}
