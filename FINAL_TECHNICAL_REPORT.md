# PRAKRUshTI (प्रकृति) — Final Master Technical Report
## AI-Powered Environmental Intelligence & Planetary Resilience Platform
### Built for the Indradhanu — PCCOE International Grand Challenge 2026
**Theme:** AI for Climate Change  
**Team / Repository:** `me13kris / Indradhanu-PRAKRUshTI`  
**Repository URL:** [https://github.com/me13krishna/Indradhanu-PRAKRUshTI](https://github.com/me13krishna/Indradhanu-PRAKRUshTI)  
**Document Version:** 2.0.0 (Final Comprehensive Technical Report)  
**System Status:** PRODUCTION READY (All 5 Development Phases Verified & Committed)

---

## Executive Summary

**PRAKRUshTI (प्रकृति)** is a scientifically grounded, explainable, AI-powered Environmental Intelligence and Planetary Resilience Platform. It interprets real-world atmospheric, hydrological, thermal, and geological conditions through the unifying **Panch Mahabhuta (पंचमहाभूत)** framework:
- **Prithvi (पृथ्वी — Earth)**: Topsoil volumetric water content ($0\text{--}1\text{ cm}$), surface temperature, and land stability.
- **Jal (जल — Water)**: Rainfall infiltration-exceedance proxy, precipitation patterns, and atmospheric moisture equilibrium.
- **Agni (अग्नि — Fire & Heat)**: Continuous NOAA/NWS Rothfusz Heat Index, ambient thermal anomalies, and the Fosberg Fire Weather Index (FFWI).
- **Vayu (वायु — Air)**: Fine particulate pollution ($PM_{2.5}$ / US AQI) and atmospheric boundary layer ventilation dispersion.
- **Akash (आकाश — Space & Atmosphere)**: Altimetrically-reduced barometric pressure (ICAO Standard Atmosphere Doc 7488), cloud cover radiative balance, and solar UV radiation exposure.

Through disciplined engineering across Phases 0 through 5, PRAKRUshTI was transformed from an early prototype with static heuristics into a verified, explainable environmental intelligence system. It features continuous mathematical scoring, non-compensatory generalized composite aggregation ($p=0.5$), finite-difference marginal factor attribution ($\Delta_i$), live multi-source data assimilation (ECMWF IFS, Copernicus CAMS, USGS, Open-Meteo), a physicalized non-linear What-If climate simulator, an interactive Leaflet planetary hotspot map, and a browser-native Conversational RAG Environmental Assistant operating with **zero mandatory API keys, zero cloud subscription fees, and 100% offline fallback resilience**.

---

## 1. Project Background & Competition Alignment

### 1.1 The Challenge: AI for Climate Change
Global environmental monitoring systems suffer from three fundamental bottlenecks:
1. **Data Fragmentation**: Raw weather feeds, chemical dispersion models, satellite estimates, and seismic networks operate in silos without a unified ecological synthesis.
2. **Opacity & Hallucination**: Modern AI implementations often apply generic large language models (LLMs) to generate speculative climate statements without mathematical grounding, creating fabricated metrics and hallucinations.
3. **Inaccessibility**: Decision-makers, farmers, and urban citizens lack accessible, explainable tools to query local climate conditions, evaluate outdoor physical safety, and simulate hypothetical temperature or drought shocks.

### 1.2 The PRAKRUshTI Solution
PRAKRUshTI reconciles ancient ecological philosophy with state-of-the-art computational environmental science:
- **Ancient Philosophy**: *Vasudhaiva Kutumbakam* (The world is one interconnected ecosystem) and the Panch Mahabhuta framework.
- **Modern Computational Rigor**: Continuous normalization curves, Hortonian infiltration excess, NOAA Rothfusz equations, Simard equilibrium fuel moisture, ICAO barometric reduction, and order $p=0.5$ weighted generalized means.
- **Edge-First Architecture**: Runs fully in standard web browsers with instant responsiveness, zero cloud overhead, and full bilingual support (English and Hindi).

---

## 2. Complete Phase Evolution Summary

| Phase | Core Objective | Key Deliverables & Achievements | Status |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Codebase Audit & Target Architecture | Audited all 16 features (F1–F16), identified 12 critical architectural flaws, formulated dual-profile execution strategy ([`PROJECT_AUDIT_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PROJECT_AUDIT_REPORT.md)). | **COMPLETE** |
| **Phase 1** | Baseline Stabilization & Critical Bug Fixes | Fixed unreleased TypeScript dependencies, resolved Leaflet popup XSS, repaired printable PDF dossier modal layout, introduced Vitest test suite ([`PHASE_1_IMPLEMENTATION_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_1_IMPLEMENTATION_REPORT.md)). | **COMPLETE** |
| **Phase 1 Verif** | Provenance & Rate-Limit Corrections | Reclassified 0–1cm soil moisture from `OBSERVED` to `NWP_LAND_SURFACE_MODEL` (ECMWF IFS), implemented shared 1050ms Nominatim request throttle ([`PHASE_1_VERIFICATION_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_1_VERIFICATION_REPORT.md)). | **COMPLETE** |
| **Phase 2A** | Scientific Scoring Methodology Design | Formulated continuous normalizations, NOAA Rothfusz procedures, FFWI equations, ICAO barometric reduction, $p=0.5$ generalized mean, and reconciled all sub-metric weights to 1.00 ([`PHASE_2A_SCORING_DESIGN.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_2A_SCORING_DESIGN.md) v2.0.0). | **COMPLETE** |
| **Phase 2B** | Scoring Engine Implementation & Testing | Implemented v2.0.0 mathematical scoring in `scoringEngine.ts`, physicalized What-If simulator, decoupled seismic hazard into safety advisory layer, verified analytical zero-element bounds ([`PHASE_2B_IMPLEMENTATION_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_2B_IMPLEMENTATION_REPORT.md)). | **COMPLETE** |
| **Phase 3** | AI Insights & Conversational Assistant | Built explainable AI diagnostic generator and browser-native Conversational RAG assistant with semantic intent classification, verdict badges, and metrics cited ([`PHASE_3_IMPLEMENTATION_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_3_IMPLEMENTATION_REPORT.md)). | **COMPLETE** |
| **Phase 4** | Global Hotspots Map & Dual-Search Compare | Replaced dropdown presets in Comparison View with arbitrary global dynamic geocoding search; embedded interactive Leaflet world map in Global Hotspots with color-coded circular markers and camera flight ([`PHASE_4_IMPLEMENTATION_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/PHASE_4_IMPLEMENTATION_REPORT.md)). | **COMPLETE** |
| **Phase 5** | Final End-to-End System Verification | Full multi-suite testing (22/22 tests passing), production bundle optimization (1.09s build, 0 errors), and capstone technical report ([`FINAL_TECHNICAL_REPORT.md`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/FINAL_TECHNICAL_REPORT.md)). | **COMPLETE** |

---

## 3. Mathematical Foundations of the Panch Mahabhuta Engine

### 3.1 Continuous Normalization Functions
All arbitrary discrete step cliffs ($>10$ pt jumps across $1^\circ\text{C}$ or $1\ \mu\text{g/m}^3$) were eliminated and replaced with continuous, piecewise differentiable functions:

1. **Two-Sided Trapezoidal Function** $\text{normalizeTwoSided}(x, L_1, L_2, U_1, U_2)$:
   $$\text{normalizeTwoSided}(x) = \begin{cases}
   0 & x < L_1 \\
   100 \cdot \frac{x - L_1}{L_2 - L_1} & L_1 \le x < L_2 \\
   100 & L_2 \le x \le U_1 \\
   100 \cdot \frac{U_2 - x}{U_2 - U_1} & U_1 < x \le U_2 \\
   0 & x > U_2
   \end{cases}$$

2. **Continuous Upper Penalty Function** $\text{normalizePenalty}(x, \text{opt}, \text{crit}, \gamma)$:
   $$\text{normalizePenalty}(x) = \begin{cases}
   100 & x \le \text{opt} \\
   100 \cdot \left(1 - \frac{x - \text{opt}}{\text{crit} - \text{opt}}\right)^\gamma & \text{opt} < x < \text{crit} \\
   0 & x \ge \text{crit}
   \end{cases}$$

### 3.2 Five Element Formulations

#### 1. Prithvi (Earth & Soil Health)
- **Topsoil Skin Moisture Proxy ($S_{\text{soil\_m}}$, $60\%$)**:
  $$\theta \in [0.10, 0.20, 0.35, 0.45]\text{ m}^3/\text{m}^3$$
  Data source: ECMWF IFS Land Surface Model (HTESSEL $0\text{--}1\text{ cm}$). Calibrated provisional loam proxy: Wilting point $\approx 0.10$, Field capacity $\approx [0.20, 0.35]$, Anoxia saturation $\approx 0.45\text{ m}^3/\text{m}^3$.
- **Topsoil Surface Temperature ($S_{\text{soil\_t}}$, $40\%$)**:
  $$T_{\text{soil}} \in [0.0, 15.0, 25.0, 38.0]^\circ\text{C}$$
- **Decoupled Seismic Safety Layer**: Acute tectonic motion ($\text{PGA} > 0.05g$ or USGS $M \ge 4.5$) triggers an independent critical safety alert, preventing false degradation of topsoil biological fertility.

#### 2. Jal (Water & Hydrological Cycle)
- **Surface Infiltration-Exceedance Proxy ($S_{\text{infil}}$, $60\%$)**:
  $$I_{\text{excess}} = \max\left(0,\, P - f_c \cdot \left(1 - \frac{\theta}{\theta_{\text{sat}}}\right)\right)$$
  where nominal loam hydraulic conductivity $f_c = 15.0\text{ mm/h}$, $\theta_{\text{sat}} = 0.45\text{ m}^3/\text{m}^3$.
  $$S_{\text{infil}} = \text{normalizePenalty}(I_{\text{excess}}, 0.0, 35.0, 1.2)$$
- **Relative Humidity Atmospheric Balance ($S_{\text{rh}}$, $40\%$)**:
  $$RH \in [20.0, 40.0, 70.0, 95.0]\%$$

#### 3. Agni (Heat, Solar & Thermal Balance)
- **NOAA/NWS Continuous Heat Index ($S_{\text{heat}}$, $65\%$)**:
  Full official NWS procedures:
  1. Steadman preliminary check: $HI_{\text{simple}} = 0.5 \cdot (T_F + 61.0 + ((T_F - 68.0) \times 1.2) + (RH \times 0.094))$.
  2. If $HI_{\text{simple}} \ge 80^\circ\text{F}$, compute full 9-term Rothfusz polynomial.
  3. Apply dry adjustment ($RH < 13\%$, $80 \le T_F \le 112$) or humid adjustment ($RH > 85\%$, $80 \le T_F \le 87$).
  4. Piecewise continuous heat-stress decay: $\le 27^\circ\text{C} \implies 100$, $27\text{--}32 \implies [80, 100]$, $32\text{--}41 \implies [40, 80]$, $41\text{--}54 \implies [0, 40]$, $>54^\circ\text{C} \implies 0$.
- **Fosberg Fire Weather Index ($S_{\text{fire}}$, $35\%$)**:
  Simard (1968) equilibrium fuel moisture $m$, fuel damping factor $\lambda(m) = 1 - 2(m/30) + 1.5(m/30)^2 - 0.5(m/30)^3$, and wind factor $\eta(U_{\text{mph}}) = \sqrt{1 + U_{\text{mph}}^2}$.
  $$S_{\text{fire}} = \max(0, \min(100, 100 - \text{FFWI}))$$

#### 4. Vayu (Air Quality & Atmosphere)
- **Chemical Particulate Purity ($S_{\text{chem}}$, $80\%$)**:
  Piecewise decay grounded in WHO air quality guidelines ($PM_{2.5} \le 5 \implies 100$, $>150\ \mu\text{g/m}^3 \implies 0$).
- **Ventilation Dispersion ($S_{\text{vent}}$, $20\%$)**:
  $U \in [2.0, 8.0, 25.0, 60.0]\text{ km/h}$.
- **Non-Linear Pollutant Ceiling Rule**:
  $$S_{\text{Vayu}} = \min(S_{\text{chem}},\, 0.80 \cdot S_{\text{chem}} + 0.20 \cdot S_{\text{vent}})$$
  When $PM_{2.5} > 150\ \mu\text{g/m}^3 \implies S_{\text{chem}} = 0 \implies S_{\text{Vayu}} \equiv 0$ unconditionally. Wind ventilation can never elevate hazardous particulate pollution into safe territory!

#### 5. Akash (Space & Atmospheric Systems)
- **Altimetrically-Reduced Pressure Deviation ($S_{\text{press\_alt}}$, $45\%$)**:
  $$P_{\text{ref}}(H) = 1013.25 \times \left(1 - 2.25577 \times 10^{-5} \cdot H\right)^{5.25588}$$
  $$\Delta P = |P_{\text{obs}} - P_{\text{ref}}(H)|, \quad S_{\text{press\_alt}} = \text{normalizePenalty}(\Delta P, 3.0, 25.0, 1.0)$$
  Eliminates elevation bias for mountain locations (e.g. Leh, Ladakh at 3,500m receives $S_{\text{press}} = 100$ rather than a false 0).
- **Cloud Cover Radiative Balance ($S_{\text{cloud}}$, $30\%$)**:
  $CC \in [10.0, 30.0, 70.0, 95.0]\%$.
- **Solar UV Radiation Hazard ($S_{\text{uv}}$, $25\%$)**:
  $UV \in [2.0, 11.0]$ linear penalty decay.

### 3.3 Composite Score Aggregation: Order $p = 0.5$ Generalized Mean
Unlike arithmetic averaging, which falsely permits a zero score in one element to be compensated by high scores in others, PRAKRUshTI employs a **Weighted Generalized Mean of order $p = 0.5$**:

$$Prakruti = \left(\sum_{i=1}^5 w_i \sqrt{S_i}\right)^2$$

Weights:
$$w_{\text{Prithvi}} = 0.20, \quad w_{\text{Jal}} = 0.20, \quad w_{\text{Agni}} = 0.20, \quad w_{\text{Vayu}} = 0.25, \quad w_{\text{Akash}} = 0.15$$

**Analytical Boundary Verification**:
- All elements $= 100 \implies Prakruti = 100$.
- $Vayu = 0$, others $= 100 \implies (0.75 \times 10)^2 = 56.25 \rightarrow \mathbf{56}$ (Max possible composite score under toxic smog).
- $Prithvi = 0$, others $= 100 \implies (0.80 \times 10)^2 = 64.0 \rightarrow \mathbf{64}$.
- $Akash = 0$, others $= 100 \implies (0.85 \times 10)^2 = 72.25 \rightarrow \mathbf{72}$.
- All elements $= 0 \implies Prakruti = 0$.

### 3.4 Finite-Difference Marginal Factor Attribution
For each element $k \in \{P, J, A, V, Ak\}$:
$$\Delta_k = S_{\text{composite}}(\mathbf{S}) - S_{\text{composite}}(\mathbf{S}_{-k}, \bar{S})$$
where $\bar{S} = \frac{1}{5} \sum_{j=1}^5 S_j$.
- If $\Delta_k \le -5.0$: **Primary Stress Driver** (drags down composite score).
- If $\Delta_k \ge +5.0$: **Resilience Pillar** (buffers composite score).
- Provenance uncertainty aggregation:
  $$\sigma_{\text{composite}} = \sqrt{\sum_{i=1}^5 w_i^2 (1 - C_i)^2}, \quad \text{Confidence} = (1 - \sigma_{\text{composite}}) \times 100 \approx 94\%$$

---

## 4. Complete Feature Inventory & Audit Verification (F1–F16)

| ID | Feature Name | Phase 0 Status | Final Phase 5 Status | Verified Module |
| :--- | :--- | :--- | :--- | :--- |
| **F1** | Composite Prakruti Score (0–100) | Arithmetic mean with linear compensation | Order $p=0.5$ non-compensatory generalized mean | [`scoringEngine.ts`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/services/scoringEngine.ts) |
| **F2** | Five Panch Mahabhuta Element Models | Ghost metrics, discrete cliffs, missing variables | Continuous normalizations, NOAA Rothfusz, FFWI, 100% weight sum | [`scoringEngine.ts`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/services/scoringEngine.ts) |
| **F3** | Real-time Weather & Atmospheric Signals | Basic parameters only | Real ECMWF IFS 0–1cm soil moisture, $PM_{2.5}$, $PM_{10}$, elevation, UV | [`weather.ts`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/services/weather.ts) |
| **F4** | Multi-Hazard & Natural Disaster Assessment | Weather heuristics | Real USGS earthquake query + decoupled seismic safety advisory | [`hazards.ts`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/services/hazards.ts) |
| **F5** | Grounded AI Environmental Insights | Static string template interpolation | Grounded diagnostics citing marginal attribution $\Delta_i$, confidence, and bilingual recommendations | [`aiInsights.ts`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/services/aiInsights.ts) |
| **F6** | Location Comparison View | Hardcoded 5-city dropdown | Dynamic dual-search for any arbitrary global city pair + delta bars + signal table | [`ComparisonView.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/ComparisonView.tsx) |
| **F7** | What-If Ecological Simulator | Hardcoded linear multipliers | Physicalized dynamic re-computation via `computeElementScores()` + 5-element delta grid | [`WhatIfSimulator.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/WhatIfSimulator.tsx) |
| **F8** | Global Environmental Hotspots | Static text cards only, no map | Interactive Leaflet world map with color-coded circular markers, safe popups, and camera flight | [`GlobalHotspots.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/GlobalHotspots.tsx) |
| **F9** | 7-Day Forecast Outlook | Basic mock values | Real Open-Meteo 7-day daily forecast with precipitation probabilities | [`ForecastStrip.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/ForecastStrip.tsx) |
| **F10** | Interactive Leaflet Location Map View | Vulnerable to popup XSS | Remediated with safe DOM elements and score badge | [`MapView.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/MapView.tsx) |
| **F11** | Printable PDF Dossier Export | Modal clipped and unprintable | Custom print media queries, zero clipping, complete printable dossier | [`ReportExportModal.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/ReportExportModal.tsx) |
| **F12** | Conversational Environmental Assistant | Missing from UI (roadmap item) | Interactive browser-native RAG assistant with 6 intent categories, verdict badges, and prompt chips | [`AIAssistantChat.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/AIAssistantChat.tsx) |
| **F13** | Bilingual Language Support | Partial translations | Full dynamic English and Hindi support across all components and AI insights | [`LanguageContext.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/context/LanguageContext.tsx) |
| **F14** | Planetary Knowledge Base | Static text | Detailed philosophical-scientific synthesis of Panch Mahabhuta principles | [`KnowledgeBase.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/KnowledgeBase.tsx) |
| **F15** | About & Competition Info | Basic placeholder | Complete mission statement, architecture diagram, and data provenance disclosures | [`AboutSection.tsx`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/AboutSection.tsx) |
| **F16** | Clean Modern UI/UX Design System | Legacy Tailwind v3 artifacts | Optimized Tailwind v4 oxide/lightningcss build with dark/light mode toggle | [`index.css`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/index.css) |

---

## 5. Automated Test Suite & Quality Verification

PRAKRUshTI includes an automated regression test suite using Vitest verifying all mathematical, geospatial, and conversational invariants:

```
 RUN  v5.1.0 C:/Users/Laxmi Mishra/OneDrive/Desktop/PRAKRUshTI root/PRAKRUshTI

 ✓ src/services/__tests__/scoringEngine.test.ts (10 tests) 17ms
   ✓ calculates optimal / healthy scores under ideal environmental baselines
   ✓ strictly enforces the Pollutant Ceiling Rule: Vayu is 0 when PM2.5 > 150 µg/m³ regardless of high wind ventilation
   ✓ maintains continuous, monotonic transitions without discrete cliff jumps
   ✓ correctly calculates NOAA Rothfusz Heat Index and severely penalizes Agni during humid heatwaves
   ✓ collapses both heat and fire indices during hot, arid, high-wind wildfire conditions
   ✓ correctly uses ICAO Standard Atmosphere to prevent false penalties at high elevations (e.g. Leh, 3500m)
   ✓ strictly verifies the analytical maximum composite scores when an element completely fails (p = 0.5 non-compensatory)
   ✓ decouples episodic seismic hazards from soil health into an independent safety advisory
   ✓ correctly computes finite-difference marginal attributions and provenance confidence
   ✓ ensures all 5 element scores and composite score remain strictly bounded in [0, 100]

 ✓ src/services/__tests__/geocoding.test.ts (4 tests) 98ms
   ✓ rejects invalid latitude and longitude ranges and falls back safely
   ✓ normalizes city queries and handles whitespace
   ✓ caches repeated queries in memory
   ✓ handles coordinate pair strings directly

 ✓ src/services/__tests__/aiChatEngine.test.ts (8 tests) 108ms
   ✓ produces bilingual diagnostics strictly grounded in real numerical inputs without NaN or undefined
   ✓ cites marginal attribution delta and active safety advisory during severe smog events
   ✓ accurately answers outdoor running queries under clean conditions
   ✓ warns user against outdoor exercise when PM2.5 exceeds safe limits
   ✓ diagnoses primary stress driver and cites finite-difference marginal drag
   ✓ answers water and flood queries citing exact precipitation numbers
   ✓ compares particulate matter against WHO 24-hour guidelines
   ✓ correctly returns natural Hindi responses when asked in Hindi

 Test Files  3 passed (3)
      Tests  22 passed (22)
   Duration  624ms
```

### Production Build Health:
```
> prakrushti@0.0.0 lint: tsc --noEmit (0 errors)
> prakrushti@0.0.0 build: tsc -b && vite build (1.09s compilation, zero chunk warnings)
```

---

## 6. Live Demonstration Script for Competition Judges

When demonstrating PRAKRUshTI to the Grand Challenge jury:

1. **Introduction (1 minute)**:
   - Introduce PRAKRUshTI as an explainable planetary environmental intelligence platform.
   - Explain the Panch Mahabhuta framework not as mystical dogma, but as an intuitive human-centric aggregation of Earth, Water, Fire, Air, and Space.
2. **Core Dashboard & Live Scoring (2 minutes)**:
   - Search for **Pune, India** or **New Delhi, India**.
   - Show how live Open-Meteo and Copernicus CAMS data feeds calculate the composite Prakruti Score ($p=0.5$).
   - Click on the **Vayu** or **Agni** card to open [`ElementDetailModal`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/ElementDetailModal.tsx), showing sub-metric weights strictly summing to $1.00$, official benchmarks, and marginal attribution deltas ($\pm \Delta$ pts).
3. **Conversational AI Assistant (2 minutes)**:
   - Scroll to the [`AIAssistantChat`](file:///c:/Users/Laxmi%20Mishra/OneDrive/Desktop/PRAKRUshTI%20root/PRAKRUshTI/src/components/AIAssistantChat.tsx).
   - Click the suggested chip: *"Is it safe for outdoor running right now?"*.
   - Point out that the assistant calculates the verdict from real $PM_{2.5}$, Heat Index, and UV index rather than hallucinating speculative prose.
   - Ask a question in Hindi (*"क्या बाहर दौड़ना सुरक्षित है?"*) to showcase seamless bilingual support.
4. **Physicalized What-If Climate Simulator (2 minutes)**:
   - Navigate to the **What-If Simulator** tab.
   - Increase the Temperature Anomaly slider by $+5^\circ\text{C}$ and AQI by $+100$ pts.
   - Show how the scoring engine dynamically evaluates non-linear heat stress and particulate ceilings, displaying real elemental response deltas.
5. **Geospatial Hotspots & Global Comparison (2 minutes)**:
   - Open the **Global Hotspots** tab. Show the interactive Leaflet planetary map with color-coded markers for resilient vs stressed cities.
   - Open **Comparison Mode**. Search for **"Cairo, Egypt" vs "London, UK"**. Show the side-by-side elemental deltas and real-time indicators table.
6. **Conclusion (1 minute)**:
   - Emphasize zero-dependency client execution (buildable on Netlify/Vercel with zero runtime cost).
   - Highlight the alignment with Indradhanu's mission: scientifically grounded, AI-powered climate action.
