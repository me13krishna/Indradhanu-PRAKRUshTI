# PRAKRUSHTI (प्रकृति) — AI-Powered Environmental Intelligence Platform
## Target Architecture & Open-Source AI Strategy (Phase 0 Architecture Specification)

*Indradhanu — PCCOE International Grand Challenge 2026 (Theme: AI for Climate Change)*  
*Platform: PRAKRUSHTI (Prakruti = Nature + Srishti = Creation)*  
*Document Version: 1.0.0 (Phase 0 Deliverable)*  
*Status: Approved for Phase 1 Execution*

---

## 1. Executive Assessment & Current-State Baseline

PRAKRUSHTI was conceived to translate complex, fragmented Earth observation and atmospheric signals into the intuitive cultural framework of the **Panch Mahabhuta** (Five Primordial Elements: **Prithvi, Jal, Agni, Vayu, Akash**), culminating in a single unified **Prakruti Score (0–100)**.

### Verified Current-State Technical Audit
An empirical inspection of all 32 repository files yielded the following verified architectural state:

| Subsystem | Existing Implementation | Verified Operational State | Key Limitation / Defect |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 19.2.8 + Vite 8.3.0 + TypeScript | Functional single-page UI (Dashboard, Compare, Hotspots, Simulator, Knowledge, About) | Missing URL routing, deep-linking, state persistence, or automated tests. |
| **Build & Toolchain** | `package.json` `"typescript": "~6.0.2"` | **Broken `npm run build`** | TS 6.0 is pre-release/unstable; missing `_tsc.js` CLI bindings. |
| **Environmental Ingestion** | `src/services/weather.ts`, `hazards.ts` | Functional client-side calls to Open-Meteo & USGS | Soil moisture is a synthetic formula (`60 - 0.8*temp + 0.4*humidity`); no real satellite sensor inputs. |
| **Panch Mahabhuta Engine** | `src/services/scoringEngine.ts` | Deterministic piecewise linear normalization (0–100) | Prithvi's "land degradation/vegetation" is just a linear blend of synthetic soil moisture and seismic risk. |
| **Risk Prediction** | `src/services/hazards.ts` | Static threshold rules (e.g. temp > 40°C = critical) | **Zero statistical or ML predictive model**. Only categorizes current conditions. |
| **"AI Insight Engine"** | `src/services/aiInsights.ts` | Deterministic `if/else` string concatenation (97 lines) | **Zero AI/ML/LLM integration**. Generic templated sentences. |
| **Interactive Map** | `src/components/MapView.tsx` (Leaflet) | Functional dynamic map pin | Unescaped innerHTML in popup creates potential XSS. |
| **What-If Simulator** | `src/components/WhatIfSimulator.tsx` | Ad-hoc linear arithmetic (`score - tempDelta * 4`) | Disconnected from `scoringEngine.ts`; produces physically contradictory outcomes. |
| **Global Hotspots** | `src/components/GlobalHotspots.tsx` | 3-column card list of 10 hardcoded cities | **No map component exists**; data is 100% static dummy data. |
| **Dossier Export** | `src/components/ReportExportModal.tsx` | Styled summary modal with print button | **Modal container has `no-print` CSS class**, printing a blank/broken page. |
| **Location Search** | `src/components/LocationSearch.tsx` | Direct fetch to OpenStreetMap Nominatim | **Zero debouncing**; keystrokes spam Nominatim, triggering HTTP 429 bans. |

---

## 2. Target High-Level System Architecture

PRAKRUSHTI requires an architecture that bridges high-performance interactive visualization in the browser with genuine data science, explainable scoring, predictive risk modeling, and a grounded conversational AI assistant.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT PRESENTATION LAYER                               │
│                                (React 19 + TypeScript + Vite)                          │
│                                                                                        │
│  ┌───────────────────────┐  ┌───────────────────────────────────────────────────────┐  │
│  │   Navigation / Tabs   │  │                LanguageContext (EN / HI)              │  │
│  └───────────┬───────────┘  └──────────────────────────┬────────────────────────────┘  │
│              │                                         │                               │
│              ▼                                         ▼                               │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Dashboard: PrakrutiGauge | 5 Element Cards | WeatherStrip | Real-Time Leaflet Map│  │
│  │ What-If Simulator (Physicalized) | Interactive Global Hotspot Map (Clustered)   │  │
│  │ Comparative Analysis | Explainable Scoring Modals | Fixed Printable PDF Dossier │  │
│  │ PRAKRUSHTI AI Environmental Assistant (Interactive Stream / Conversational Dialog)│ │
│  └─────────────────────────────────────────┬────────────────────────────────────────┘  │
└────────────────────────────────────────────┼───────────────────────────────────────────┘
                                             │ REST API (JSON) + SSE Streams
                                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PRAKRUSHTI BACKEND INTELLIGENCE LAYER                           │
│                              (Python 3.14 + FastAPI)                                   │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ MODULE A: Environmental Data Intelligence (Ingestion & Provenance Layer)          │  │
│  │  • Open-Meteo Weather & Real Soil Moisture API (0-1cm Volumetric m³/m³)          │  │
│  │  • Open-Meteo Atmospheric Chemistry & Air Quality API (PM2.5, PM10, AQI, O₃, NO₂)│  │
│  │  • USGS Earthquake Hazards Real-Time Feeds (FDSNWS API)                          │  │
│  │  • Data Provenance Engine: Flag as OBSERVED, DERIVED, FORECAST, or SIMULATED     │  │
│  │  • In-Memory TTL Cache (15 min) + Rate-Limiting Protection                       │  │
│  └─────────────────────────────────────────┬────────────────────────────────────────┘  │
│                                            │                                           │
│  ┌─────────────────────────────────────────┴────────────────────────────────────────┐  │
│  │ MODULE B: Scientific Panch Mahabhuta Intelligence Engine                          │  │
│  │  • Nonlinear, domain-bounded sub-metric normalization (WHO, FAO, WMO benchmarks) │  │
│  │  • Explainability Engine: Factor attribution & directional delta decomposition    │  │
│  │  • Mathematical Composite: Grounded 0–100 Prakruti Score computation             │  │
│  └────────────────────┬───────────────────────────────────────┬─────────────────────┘  │
│                       │                                       │                        │
│  ┌────────────────────┴──────────────────────┐ ┌──────────────┴─────────────────────┐  │
│  │ MODULE C: Environmental Risk Prediction   │ │ MODULE D & E: AI Insights & RAG    │  │
│  │  • Empirical Anomaly Detection (Z-scores) │ │  • Grounded Context Builder        │  │
│  │  • Multi-Vector Compound Risk Indices     │ │  • Vector Index / Knowledge Base   │  │
│  │    (Heat-Stress, Fire-Weather, Flood)     │ │  • Generative LLM Integration      │  │
│  │  • Predictive Trend Projection & Horizon  │ │    (Local Ollama / Open-Weights or │  │
│  │  • Quantified Prediction Uncertainty      │ │     Gemini API Bridge with RAG)    │  │
│  └───────────────────────────────────────────┘ └────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed AI & Environmental Modules

### MODULE A: Environmental Data Intelligence & Provenance
- **Verified Sources**:
  1. *Open-Meteo Weather Forecast API*: Temperature (2m), apparent temperature, relative humidity, surface pressure, wind speed & gusts, precipitation, cloud cover, real volumetric soil moisture (`soil_moisture_0_to_1cm`, `m³/m³`).
  2. *Open-Meteo Atmospheric Quality API*: Particulate matter (`pm2_5`, `pm10`), nitrogen dioxide (`no2`), carbon monoxide (`co`), ozone (`o3`), US AQI, European AQI, UV index.
  3. *USGS Earthquake Hazards Program*: Dynamic circle queries (`latitude`, `longitude`, `maxradiuskm=500`, `minmagnitude=4.0`, event depth, timestamp).
  4. *OpenStreetMap Nominatim*: Location geocoding with user-agent compliance and mandatory 350ms frontend debouncing.
- **Data Provenance Tracking**:
  Every field returned to the frontend must carry strict provenance metadata:
  ```json
  {
    "value": 0.24,
    "unit": "m³/m³",
    "provenance": "OBSERVED", // "OBSERVED" | "DERIVED" | "FORECAST" | "SIMULATED"
    "source": "Open-Meteo Land Surface Model (ECMWF IFS)",
    "timestamp": "2026-11-06T04:30:00Z",
    "confidence": 0.95
  }
  ```

### MODULE B: Panch Mahabhuta Intelligence Engine
Replaces arbitrary linear combinations with scientifically grounded domain scoring:
1. **Prithvi (Earth / Land Stability)**:
   - *Soil Moisture Volumetric Saturation*: Standard FAO / Copernicus saturation index ($0.15 - 0.35\ \text{m}^3/\text{m}^3$ optimal; $<0.10$ severe drought; $>0.42$ waterlogged).
   - *Seismic Disturbance Index*: Inverse log-decay of USGS moment magnitude and focal depth scaled by epicentral distance.
   - *Terrain Stability Indicator*: Compound runoff-slope proxy.
2. **Jal (Water / Hydrological Equilibrium)**:
   - *Precipitation Dynamic Severity*: WMO rainfall bands (0 mm = baseline; 1–15 mm = healthy; >50 mm = acute flood hazard).
   - *Hydrological Balance Index*: Atmospheric humidity versus surface moisture ratio.
   - *Flash Flood Risk Score*: Saturated runoff curve based on current rainfall + antecedent moisture.
3. **Agni (Heat / Solar Energy Balance)**:
   - *Thermal Comfort / Heat Index*: Rothfusz equation combining dry-bulb temperature and relative humidity ($18^\circ\text{C}-28^\circ\text{C}$ optimal; $>40^\circ\text{C}$ extreme thermal stress).
   - *Fire Weather Index (FWI Proxy)*: Fosberg Fire Weather Index calculated from temperature, wind velocity, and relative humidity.
   - *Solar Radiation Stress*: Clear-sky UV index exposure rating.
4. **Vayu (Air Cleanliness & Dispersion)**:
   - *Particulate Matter Load*: Piecewise curve based on WHO Global Air Quality Guidelines 2021 (PM2.5 $\le 15\ \mu\text{g}/\text{m}^3$, PM10 $\le 45\ \mu\text{g}/\text{m}^3$).
   - *Atmospheric Dispersion Capacity*: Ventilation coefficient ($V_c = \text{wind speed} \times \text{mixing height proxy}$).
5. **Akash (Atmospheric / Etheric Balance)**:
   - *Barometric Pressure Stability*: Deviation from standard sea-level atmosphere ($1013.25\ \text{hPa}$).
   - *UV Radiation Index*: Solar irradiance and stratospheric ozone attenuation proxy.

### MODULE C: Environmental Risk Prediction
- **Compound Hazard Models**:
  - *Fire Weather Risk Index*: $FWI = f(T, RH, V)$ evaluates imminent wildfire ignition and spread potential.
  - *Thermal Heatwave Trend Index*: Projected consecutive hours exceeding local 90th percentile temperature thresholds.
  - *Precipitation Anomaly & Runoff Index*: Predictive accumulation vs. absorption threshold.
- **Baseline Machine Learning / Statistical Methods**:
  - Rather than manufacturing black-box neural networks without historical training ground truth, Module C establishes **statistical anomaly detection (Rolling Z-score deviations against seasonal baselines)** alongside **gradient-boosted baseline classifiers (Scikit-Learn / LightGBM)** for 24h risk state progression.
  - Uncertainty is explicitly reported as confidence intervals (e.g., $Score \pm 4.2$ at 85% confidence).

### MODULE D & E: AI Insights & PRAKRUSHTI Conversational Assistant
- **Architecture**: Retrieval-Augmented Generation (RAG) + Grounded Numerical Context Builder.
- **Strict Anti-Hallucination Policy**:
  - The LLM is provided with a strongly-typed JSON context containing the exact calculated scores, observed metrics, provenance tags, and domain citations.
  - The system prompt forbids the LLM from inventing metrics, quoting unobserved values, or diagnosing medical conditions.
- **Assistant Capabilities**:
  - Answering "Why is my Prakruti Score low?" by decomposing the weakest element into specific sub-metric contributions.
  - Comparing two locations' ecological resilience across all 5 Mahabhuta dimensions.
  - Explaining actionable climate resilience steps in English and Hindi.

### MODULE F: Physicalized What-If Climate Simulator
- The simulator will pass simulated variables ($\Delta T, \Delta P, \Delta AQI$) into the actual `computeElementScores()` engine.
- If precipitation is increased by +100%, the engine triggers the flash flood penalty in *Jal* and runoff stress in *Prithvi*, showing realistic non-linear ecological degradation rather than naive addition.

---

## 4. Open-Source Technology Stack & Justification

| Category | Technology | Licence | Purpose & Justification |
| :--- | :--- | :--- | :--- |
| **Backend API** | **FastAPI** (`fastapi`, `uvicorn`) | MIT | High-performance async Python web framework, automatic OpenAPI documentation, native Pydantic validation, and seamless support for streaming SSE responses. |
| **Data Validation** | **Pydantic v2** (`pydantic`) | MIT | Strict type enforcement and schema serialization between Python backend and React frontend. |
| **Numerical Processing** | **NumPy & Pandas** | BSD-3 | Efficient vector operations, rolling window metrics, Z-score anomaly detection, and time-series aggregation. |
| **Statistical ML** | **Scikit-learn** | BSD-3 | Robust, explainable baseline risk classification and clustering. Zero heavy GPU requirement. |
| **Local Vector RAG** | **ChromaDB** or **FAISS** (`chromadb` / `faiss-cpu`) | Apache 2.0 / MIT | Lightweight, in-memory local vector store for indexing Panch Mahabhuta philosophical texts, WHO guidelines, and meteorological reference standards. |
| **Language Model Options** | **Ollama** (Local Llama 3.2 3B / Mistral 7B) OR **Google Gemini Flash / HuggingFace Inference** | Open Weights / API | Zero-cost open-weight execution locally, with graceful fallback to standard rule-based explanations if no GPU/local model server is running. |
| **Frontend Mapping** | **Leaflet** + **Leaflet MarkerCluster** | BSD-2 | Free, lightweight, zero-key geospatial map engine with dynamic markers and popup clustering. |
| **Icons & UI** | **Lucide React** + **Tailwind CSS v4** | MIT | Polished, accessible styling maintaining existing brand identity. |

---

## 5. Hardware, Hosting & Execution Profiles

PRAKRUSHTI is engineered with a **dual-profile execution architecture**:

### Profile 1: Pure Frontend Client Mode (Static Web / Edge Deployment)
- Runs anywhere: Vercel, Netlify, GitHub Pages.
- Directly consumes open public APIs (Open-Meteo, USGS, Nominatim).
- Employs a TypeScript-native port of the explainable Panch Mahabhuta scoring engine.
- Uses an embedded client-side deterministic reasoning engine (with optional free Gemini API key or WebLLM) for zero-backend serverless availability.

### Profile 2: Hybrid Client + FastAPI Intelligence Server (Full Decision-Support Mode)
- **Local / Server Hardware Requirements**:
  - CPU: 2+ Cores (x86_64 or ARM64).
  - RAM: 4 GB minimum (8 GB recommended if running local Ollama LLM).
  - Storage: < 1 GB for Python backend, virtualenv, and vector indices.
  - GPU: Optional (CPU inference sufficient for 3B open-weight models or cloud inference fallback).
- **Hosting Target**: Local machine, Render/Railway free tier, or containerized Docker on AWS EC2/DigitalOcean.

---

## 6. External APIs & Credential Requirements

| Service | Protocol | Key Required? | Rate Limits | Fallback Strategy |
| :--- | :--- | :---: | :--- | :--- |
| **Open-Meteo Weather** | REST HTTPS | **NO (Free)** | 10,000 calls/day | In-memory 15-minute TTL cache per coordinate grid ($0.1^\circ$). |
| **Open-Meteo Air Quality** | REST HTTPS | **NO (Free)** | 10,000 calls/day | In-memory 15-minute TTL cache; fallback to European AQI model. |
| **USGS Earthquakes** | REST HTTPS | **NO (Free)** | None documented for low volumes | Graceful return of baseline seismic stability (score 95). |
| **OpenStreetMap Nominatim** | REST HTTPS | **NO (Free)** | Strict 1 req/sec | 350ms frontend debounce + client-side caching of recent 20 queries. |
| **Optional LLM (Gemini API)**| REST HTTPS | Optional (`VITE_GEMINI_API_KEY` or `GEMINI_API_KEY`) | 15 RPM free tier | Fallback to deterministic explainability engine if key is absent. |

---

## 7. Phased Implementation Roadmap

```
Phase 0: Architecture & Audit Verification (COMPLETE)
   │
   ▼
Phase 1: Stability, Security & Data Foundation
   • Downgrade TypeScript to stable 5.8 to fix build
   • Fix ReportExportModal print stylesheet bug
   • Add 350ms debounce and AbortController to LocationSearch
   • Sanitize Leaflet MapView popups against XSS
   • Centralize environmental data processing with real Open-Meteo soil moisture
   • Delete dead template assets (App.css, hero.png, etc.)
   │
   ▼
Phase 2: Panch Mahabhuta Intelligence & Explainable Scoring
   • Upgrade scoringEngine to real non-linear domain curves (FAO, WHO, WMO)
   • Implement sub-metric directional attribution and delta decomposition
   • Add statistical anomaly indicators (Z-score thresholds)
   • Add confidence and provenance indicators to all UI cards
   │
   ▼
Phase 3: AI Assistant & Grounded Insights
   • Connect AI Insight Generator to real calculated scores and metrics
   • Implement conversational PRAKRUSHTI AI Assistant dialog component
   • Ground assistant in verified environmental knowledge and Panch Mahabhuta philosophy
   • Full bilingual support (English & Hindi)
   │
   ▼
Phase 4: Advanced Predictive Intelligence & Simulation
   • Physicalize What-If Simulator to re-evaluate scoringEngine
   • Transform Global Hotspots into an interactive clustered world map
   • Upgrade Comparison View with full dual-location search
   │
   ▼
Phase 5: Final Validation, Testing & Documentation
   • Comprehensive automated test suite (Vitest for calculations & components)
   • Production build verification (`npm run build`)
   • Deliver FINAL_TECHNICAL_REPORT.md
```

