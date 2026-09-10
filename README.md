# PRAKRUshTI (प्रकृति) — AI Environmental Health Platform

> **"One Earth. One ecosystem. One shared responsibility."**  
> *Built for Indradhanu — PCCOE International Grand Challenge 2026 (Theme: AI for Climate Change)*

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/new)
[![Netlify Deployment](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)](https://app.netlify.com/start)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Framework: React + Vite + TypeScript](https://img.shields.io/badge/Framework-React%20%2B%20Vite%20%2B%20TS-61DAFB?logo=react)](https://vitejs.dev/)

---

## Overview

**PRAKRUshTI** (*Prakruti* = Nature + *Srishti* = Creation) is a global, software-only AI platform that reads the environmental health of any location on Earth through the ancient lens of the **Panch Mahabhuta** (the five great elements: **Prithvi, Jal, Agni, Vayu, Akash**), layered on live climate, weather, air quality, and natural-hazard data.

For any searched location or coordinate, PRAKRUshTI fetches live environmental feeds, normalizes raw metrics into 0–100 elemental balance scores, and computes one unified composite **Prakruti Score**. A grounded AI engine then provides plain-language diagnostics and actionable recommendations in both **English and Hindi**.

---

## Key Features

- 🌍 **Global Location Search & Leaflet Map (`F1`)**: Search any city or lat/long worldwide with OpenStreetMap Nominatim geocoding and click-to-pin interactive map visualizer.
- 🎯 **Panch Mahabhuta Dashboard (`F2`, `F3`, `F4`)**:
  - Central **Prakruti Score Gauge** (0–100 composite index).
  - 5 Element Cards (**Prithvi, Jal, Agni, Vayu, Akash**) with status labels, custom SVG icons, and sub-metric previews.
  - Live Weather Strip (Temperature, Humidity, Precipitation, Wind Speed, AQI index, UV, Atmospheric Pressure).
  - Natural Hazard & Seismic Alert Chips (Flood, Heatwave, Wildfire, Storm, USGS Earthquakes).
- 🤖 **Grounded AI Insight Engine (`F5`)**: 3–5 sentence natural language diagnostic summary and 4 data-tailored actionable recommendations in both English and Hindi.
- 📊 **Element-wise Breakdown Modal (`F7`)**: Deep-dive modal showing sub-metric weights, piecewise linear formulas, and domain citations (WHO, WMO, FAO, USGS).
- 📅 **7-Day Climate Forecast (`F8`)**: Mini forecast timeline with projected temperature trends and rainfall probabilities.
- ⚖️ **Dual-Location Comparison Mode (`F9`)**: Split-screen side-by-side comparison between two global cities with element score diffs and Prakruti delta indicators.
- 🌐 **Global Hotspot Map (`F10`)**: World overview highlighting Top 5 Healthiest vs. Top 5 Under Stress global regions.
- 🌐 **Bilingual Support (`F11`)**: Instant toggle between English and Hindi for full UI and AI insights.
- 🖨️ **Shareable Location Dossier (`F12`)**: Print-ready PDF dossier generator for analyzed locations.
- 🧪 **Climate What-If Simulator (`F15`)**: Interactive sliders (+°C temp anomaly, drought, AQI surge) showing real-time impact on Prakruti Score.
- 📚 **Knowledge & Philosophy Section (`F6`, `F16`)**: Editorial long-form context mapping ancient Sanatan ecological principles to modern satellite metrics.

---

## Panch Mahabhuta Framework Mapping

| Element | Sanskrit | Represents | Primary Data Signals | Color |
| :--- | :--- | :--- | :--- | :--- |
| **Prithvi** | पृथ्वी | Earth & Land Stability | Soil moisture proxy (40%), Seismic stability (30%), Vegetation health (30%) | `#C97B4A` |
| **Jal** | जल | Water & Hydrological Balance | Precipitation volume (35%), Flood risk rating (35%), Humidity index (30%) | `#1B6B93` |
| **Agni** | अग्नि | Heat & Solar Radiation | Ambient temp anomaly (40%), Heatwave exposure (30%), Wildfire risk (30%) | `#D9822B` |
| **Vayu** | वायु | Air Quality & Motion | Air Quality Index AQI (60%), Wind speed dispersion (40%) | `#6FA8C9` |
| **Akash** | आकाश | Ether & Atmospheric Pressure | Solar UV Index (50%), Barometric pressure balance (50%) | `#7A6C9E` |

---

## Live Data Sources (Zero API Keys Required)

PRAKRUshTI operates entirely on free, open-access public APIs:
- **Weather & Climate**: [Open-Meteo Weather API](https://open-meteo.com/)
- **Air Quality**: [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) / WAQI
- **Geocoding & Maps**: [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) & [Leaflet.js](https://leafletjs.com/)
- **Seismic Signals**: [USGS Earthquake Hazards API](https://earthquake.usgs.gov/)

---

## Quick Start / Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/me13krishna/Indradhanu-PRAKRUshTI.git
cd Indradhanu-PRAKRUshTI

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## Production Build & Deployment

### Build for Production
```bash
npm run build
```
This compiles a static, optimized production bundle into the `dist/` directory.

### Deploying to Vercel (Zero-Config)
1. Push your repository to GitHub.
2. Import repository into [Vercel](https://vercel.com/new).
3. Vercel automatically detects Vite + React (`npm run build`, `dist` folder).
4. Click **Deploy**!

### Deploying to Netlify
1. Import repository into [Netlify](https://app.netlify.com/start).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.
3. Click **Deploy site**!

---

## License & Competition Transparency Disclaimer

- **Spirit**: *Vasudhaiva Kutumbakam* — The world is one family.
- **Framing**: The Mahabhuta scoring model is a transparent educational synthesis — a cultural and conceptual lens — not a peer-reviewed scientific index. Disaster-risk indicators are decision-support only.
- **License**: [MIT License](LICENSE)
