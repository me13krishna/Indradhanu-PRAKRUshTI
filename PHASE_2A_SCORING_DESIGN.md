# PRAKRUSHTI (प्रकृति) — Phase 2A: Scientific Scoring Methodology Design
## Panch Mahabhuta Intelligence & Explainable Environmental Scoring Engine

*Indradhanu — PCCOE International Grand Challenge 2026 (Theme: AI for Climate Change)*  
*Document Version: 1.0.0 (Phase 2A Design Deliverable)*  
*Status: Design Specification — Pending Approval Prior to Implementation*

---

## 1. Core Philosophy & Interpretive Framing

### Vasudhaiva Kutumbakam & The Panch Mahabhuta Lens
PRAKRUSHTI (*Prakruti* = Nature + *Srishti* = Creation) bridges ancient ecological philosophy with modern Earth observation science. 

> **Important Scientific Disclaimer & Epistemological Stance**:  
> The **Panch Mahabhuta** (Prithvi, Jal, Agni, Vayu, Akash) serves strictly as an **interpretive, pedagogical, and holistic framing model**. It is **not** a scientific claim that nature is composed of five irreducible physical substances, nor that ancient Sanatan cosmological texts provide literal empirical equations for modern atmospheric physics.  
> 
> Instead, PRAKRUSHTI uses this five-element cultural taxonomy as an **intuitive synthesis layer** that aggregates multifaceted, high-dimensional Earth observation variables (thermodynamics, hydrology, atmospheric chemistry, soil physics) into human-comprehensible balance indices. Every mathematical transformation, threshold, and citation is grounded in verifiable modern environmental science (WMO, WHO, FAO, NOAA, USGS, ECMWF).

---

## 2. Audit of Existing Scoring Engine (`src/services/scoringEngine.ts`)

### 2.1 Existing Implementation Architecture
The current scoring engine evaluates five elements using a simple piecewise linear normalization helper and an unweighted arithmetic mean:

$$\text{PrakrutiScore} = \text{round}\left(\frac{\text{Prithvi} + \text{Jal} + \text{Agni} + \text{Vayu} + \text{Akash}}{5}\right)$$

### 2.2 Deficiencies, Inconsistencies & Unsound Assumptions Identified

| Element | Existing Formula / Logic | Critical Flaws & Scientific Inconsistencies |
| :--- | :--- | :--- |
| **Prithvi** | $S_{\text{soil}} = \text{norm}(\%,\ 35, 65, 10, 90)$<br>$S_{\text{deg}} = 0.6 S_{\text{soil}} + 0.4 S_{\text{seismic}}$<br>$\text{Prithvi} = 0.4 S_{\text{soil}} + 0.3 S_{\text{seismic}} + 0.3 S_{\text{deg}}$ | 1. **Mathematical Redundancy**: $S_{\text{deg}}$ is just a linear combination of soil and seismic, making $\text{Prithvi} = 0.58 S_{\text{soil}} + 0.42 S_{\text{seismic}}$. It claims to measure "vegetation & land degradation", but contains zero vegetation data.<br>2. **Soil Moisture Saturation**: Uses a fixed percentage ($35\% - 65\%$) without recognizing that volumetric water content $\theta$ ($m^3/m^3$) has different field capacities across soil textures.<br>3. **Seismic Conflation**: Earthquakes are tectonic, episodic geophysical hazards, not a continuous baseline state of land health. Mapping an earthquake 480 km away directly into surface soil health distorts the land metric. |
| **Jal** | $S_{\text{precip}} = \begin{cases} 20 & P > 80 \\ 60 & P > 30 \\ 90 & P > 0 \\ 75 & P = 0 \end{cases}$<br>$\text{Jal} = 0.35 S_{\text{precip}} + 0.35 S_{\text{flood}} + 0.30 S_{\text{hum}}$ | 1. **Discontinuous Step Functions**: Instantaneous cliff-drops at 30 mm and 80 mm create erratic score jumps.<br>2. **Rainfall Totals vs Flood Dynamics**: Rainfall total alone does not cause flooding; flood risk depends on antecedent soil saturation and rainfall intensity.<br>3. **Arbitrary Zero-Rainfall Score**: Completely dry weather gets 75/100, regardless of whether the region is in a 6-month drought. |
| **Agni** | $S_{\text{temp}} = \text{norm}(T,\ 18, 28, 5, 45)$<br>$\text{Agni} = 0.40 S_{\text{temp}} + 0.30 S_{\text{heat}} + 0.30 S_{\text{fire}}$ | 1. **Dry-Bulb Temperature Only**: Fails to calculate the physiological Heat Index (apparent temperature combining relative humidity). 32°C at 90% humidity is lethal, but scored moderately.<br>2. **Double Counting**: Heat risk hazard is derived from temperature in `hazards.ts`, then combined with temperature again in `scoringEngine.ts`.<br>3. **Fixed Universal Temperature Optimum**: 18°C–28°C is optimal for human comfort, but sub-polar and equatorial ecosystems operate under different seasonal thermal baselines. |
| **Vayu** | $S_{\text{aqi}} = \text{norm}(\text{AQI},\ 0, 50, 0, 300)$<br>$\text{Vayu} = 0.60 S_{\text{aqi}} + 0.40 S_{\text{wind}}$ | 1. **Over-reliance on US AQI Scale**: Conflates US AQI (which is a breakpoint index) with linear concentration metrics.<br>2. **Excessive Wind Weighting (40%)**: When AQI is 350 (hazardous, toxic air), gentle 12 km/h wind receives 100/100, preventing Vayu from dropping below 40/100! Toxic air is thus masked as "moderate balance". |
| **Akash** | $S_{\text{uv}} = \text{norm}(\text{UV},\ 0, 5, 0, 12)$<br>$S_{\text{press}} = \text{norm}(P,\ 1008, 1018, 970, 1040)$<br>$\text{Akash} = 0.50 S_{\text{uv}} + 0.50 S_{\text{press}}$ | 1. **Nighttime UV Distortion**: At night, UV is 0, giving $S_{\text{uv}} = 100$ automatically, artificially inflating Akash score.<br>2. **Uncalibrated Pressure Elevation**: Standard sea-level pressure is 1013.25 hPa. Cities at high altitude (e.g. Nairobi at 1795m has ~820 hPa) receive $S_{\text{press}} = 0$ due to elevation alone, misinterpreting natural topography as an atmospheric crisis! |

---

## 3. Mathematical Normalization Framework

To prevent step-function discontinuities, PRAKRUSHTI Phase 2 replaces crude piecewise linear functions with **continuous, bounded sigmoidal and double-sigmoid penalty functions**.

### 3.1 Bounded Continuous Transformation Functions

#### Type 1: Optimal Range with Symmetrical / Asymmetrical Degradation (Two-Sided Sigmoid)
For variables where an optimal middle band exists (e.g., soil moisture, temperature, relative humidity, atmospheric pressure), deviations both above and below the band incur continuous penalties:

$$S(x; L_1, L_2, U_1, U_2) = \begin{cases}
0, & x \le L_1 \\
100 \cdot \left[1 + \cos\left(\pi \frac{x - L_2}{L_1 - L_2}\right)\right] / 2, & L_1 < x < L_2 \\
100, & L_2 \le x \le U_1 \\
100 \cdot \left[1 + \cos\left(\pi \frac{x - U_1}{U_2 - U_1}\right)\right] / 2, & U_1 < x < U_2 \\
0, & x \ge U_2
\end{cases}$$

This cosine-eased transition ensures $C^1$ continuity (smooth first derivative), eliminating abrupt score jumps when an indicator fluctuates near a boundary.

#### Type 2: One-Sided Monotonic Penalty Function (Lower is Better)
For pollutants, UV radiation, and hazard vectors where zero or low values represent pristine conditions:

$$S_{\text{penalty}}(x; x_{\text{threshold}}, x_{\text{critical}}) = \begin{cases}
100, & x \le x_{\text{threshold}} \\
100 \cdot \left(\frac{x_{\text{critical}} - x}{x_{\text{critical}} - x_{\text{threshold}}}\right)^\gamma, & x_{\text{threshold}} < x < x_{\text{critical}} \\
0, & x \ge x_{\text{critical}}
\end{cases}$$

Where $\gamma \in [1.2, 1.8]$ applies non-linear convexity reflecting biological and ecological stress acceleration.

---

## 4. Detailed Specification of the Five Element Models

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       PANCH MAHABHUTA SCORING MATRIX                                   │
├─────────────┬─────────────────────────────────────┬──────────────────────────┬────────────────────────┤
│ Element     │ Sub-Metric Inputs                   │ Primary Benchmark Source │ Weight in Element      │
├─────────────┼─────────────────────────────────────┼──────────────────────────┼────────────────────────┤
│ **Prithvi** │ Volumetric Soil Moisture (0–1cm)    │ FAO / USDA Soil Physics  │ 45%                    │
│             │ Soil Temperature (0cm) Thermal Flux │ ECMWF IFS Land Surface   │ 25%                    │
│             │ Soil-Moisture Volatility Index      │ Antecedent Water Budget  │ 30%                    │
├─────────────┼─────────────────────────────────────┼──────────────────────────┼────────────────────────┤
│ **Jal**     │ Compound Precipitation Severity     │ WMO Rainfall Intensity   │ 40%                    │
│             │ Hydrological Runoff Potential       │ Saturated Overland Flow  │ 35%                    │
│             │ Atmospheric Moisture Equilibrium    │ Vapor Pressure Deficit   │ 25%                    │
├─────────────┼─────────────────────────────────────┼──────────────────────────┼────────────────────────┤
│ **Agni**    │ Physiological Heat Index (HI)       │ NOAA / NWS Rothfusz Eq.  │ 45%                    │
│             │ Fosberg Fire Weather Index (FFWI)   │ USDA Forest Service      │ 35%                    │
│             │ Thermal Anomaly Displacement        │ Diurnal Range Variance   │ 20%                    │
├─────────────┼─────────────────────────────────────┼──────────────────────────┼────────────────────────┤
│ **Vayu**    │ Fine Particulate Matter (PM2.5)     │ WHO 2021 Global Standard │ 50%                    │
│             │ Coarse Particulate Matter (PM10)    │ WHO 2021 Standard        │ 25%                    │
│             │ Atmospheric Ventilation Coefficient │ Wind Speed × Mixing Cap  │ 25%                    │
├─────────────┼─────────────────────────────────────┼──────────────────────────┼────────────────────────┤
│ **Akash**   │ Barometric Anomaly (Altimetric Ref) │ ICAO Standard Atmosphere │ 40%                    │
│             │ Solar Radiative Load (Day/Night)    │ WHO Global Solar UV      │ 35%                    │
│             │ Cloud Radiative Attenuation Fraction│ WMO Cloud Cover Bands    │ 25%                    │
└─────────────┴─────────────────────────────────────┴──────────────────────────┴────────────────────────┘
```

---

### 4.1 PRITHVI (पृथ्वी) — Land Surface & Soil Biophysics

#### A. Environmental Variables Used
1. **Volumetric Soil Water Content ($\theta$)**: Open-Meteo `soil_moisture_0_to_1cm` ($m^3/m^3$).
2. **Topsoil Temperature ($T_{\text{soil}}$)**: Open-Meteo `soil_temperature_0cm` (°C).
3. **Moisture-Temperature Equilibrium ($MTE$)**: Ratio of surface moisture to evaporative thermal demand.

#### B. Scientific Basis & References
- **FAO Drainage and Irrigation Paper 56 (Allen et al., 1998)**: Defines Available Soil Water ($AW$). For mineral soils, permanent wilting point ($\theta_{\text{pwp}}$) typically ranges between $0.08 - 0.12\ m^3/m^3$; field capacity ($\theta_{\text{fc}}$) ranges between $0.22 - 0.34\ m^3/m^3$; saturation occurs at $>0.42\ m^3/m^3$.
- **USDA Natural Resources Conservation Service (NRCS)**: Soil biological activity peaks between 15°C and 25°C. Soil temperatures $>38^\circ\text{C}$ inhibit microbial respiration and accelerate desiccation.

#### C. Mathematical Formulation
1. **Soil Moisture Saturation Index ($S_{\theta}$)**:
   - Optimal band: $[0.18, 0.32]\ m^3/m^3$
   - Severe water deficit: $< 0.08\ m^3/m^3$
   - Anoxic waterlogging: $> 0.44\ m^3/m^3$
   $$S_{\theta}(\theta) = S(\theta;\ 0.08,\ 0.18,\ 0.32,\ 0.44)$$
2. **Soil Thermal Health Index ($S_{T\text{soil}}$)**:
   - Optimal biological range: $[12^\circ\text{C}, 26^\circ\text{C}]$
   - Thermal stress thresholds: Frost $<0^\circ\text{C}$, Excessive heat $>38^\circ\text{C}$
   $$S_{T\text{soil}}(T_{\text{soil}}) = S(T_{\text{soil}};\ 0,\ 12,\ 26,\ 38)$$
3. **Composite Prithvi Score**:
   $$\text{Prithvi} = \text{round}\left(0.55 \cdot S_{\theta} + 0.45 \cdot S_{T\text{soil}}\right)$$

#### D. Geophysical Hazard Decoupling
> **Decision on Earthquakes**: Earthquakes are **isolated tectonic shock events**, not a continuous property of soil health. Therefore, seismic events are **decoupled from the baseline Prithvi score** and reported in a dedicated **Geophysical Hazard Advisory Layer**. This ensures that an earthquake does not artificially indicate that local agricultural soil has degraded.

---

### 4.2 JAL (जल) — Hydrological Balance & Runoff Severity

#### A. Environmental Variables Used
1. **Current Rainfall Rate ($P_{\text{current}}$)**: Open-Meteo `precipitation` (mm/h).
2. **Antecedent Soil Moisture Saturation ($\theta$)**: Used to compute effective infiltration capacity.
3. **Atmospheric Relative Humidity ($RH$)**: Open-Meteo `relative_humidity_2m` (%).

#### B. Scientific Basis & References
- **World Meteorological Organization (WMO-No. 554)**: Standard precipitation intensity classification:
  - Trace: $<0.5\text{ mm/h}$
  - Moderate: $2.5 - 7.6\text{ mm/h}$
  - Heavy: $7.6 - 50\text{ mm/h}$
  - Torrential (Flash flood triggering): $>50\text{ mm/h}$
- **USDA Soil Conservation Service (SCS-CN Hydrology)**: Runoff occurs when precipitation rate exceeds soil infiltration capacity, which is an inverse function of antecedent moisture.

#### C. Mathematical Formulation
1. **Precipitation Regime Balance ($S_{\text{precip}}$)**:
   - Light to moderate rainfall ($0.5 - 6.0\text{ mm/h}$) maintains freshwater cycling ($100/100$).
   - Sustained zero rainfall is scored at $70/100$ (normal in dry seasons), degrading to $30/100$ when compound drought indicators are present.
   - Violent rain ($>50\text{ mm/h}$) drops to $10/100$.
2. **Flash Runoff Risk Index ($R_{\text{flood}}$)**:
   $$R_{\text{flood}} = P_{\text{current}} \cdot \left(0.5 + 0.5 \cdot \frac{\theta}{0.40}\right)$$
   $$S_{\text{runoff}} = \max\left(0,\ 100 - 2.5 \cdot R_{\text{flood}}\right)$$
3. **Humidity Equilibrium ($S_{\text{rh}}$)**:
   - Optimal atmospheric moisture: $[40\%, 70\%]$
   - Arid desiccation: $<15\%$
   - Saturated mold risk: $>95\%$
   $$S_{\text{rh}}(RH) = S(RH;\ 15,\ 40,\ 70,\ 95)$$
4. **Composite Jal Score**:
   $$\text{Jal} = \text{round}\left(0.40 \cdot S_{\text{precip}} + 0.35 \cdot S_{\text{runoff}} + 0.25 \cdot S_{\text{rh}}\right)$$

---

### 4.3 AGNI (अग्नि) — Thermal Energy, Solar Flux & Fire Weather

#### A. Environmental Variables Used
1. **Dry-Bulb Temperature ($T$)**: Open-Meteo `temperature_2m` (°C).
2. **Relative Humidity ($RH$)**: Open-Meteo `relative_humidity_2m` (%).
3. **Wind Speed ($V$)**: Open-Meteo `wind_speed_10m` (km/h).
4. **Physiological Heat Index ($HI$)**: Calculated via the NOAA NWS Rothfusz polynomial.
5. **Fosberg Fire Weather Index ($FFWI$)**: Computed compound metric.

#### B. Scientific Basis & References
- **NOAA National Weather Service (NWS) Heat Index**: The Rothfusz empirical multivariate model evaluates perceived thermal comfort and heat-exhaustion hazard by factoring in evaporative cooling resistance from relative humidity.
- **Fosberg (1978) Fire Weather Index**: Integrates equilibrium moisture content ($\eta$), temperature, and wind speed into an operational wildfire spread potential index ($0 - 100$).

#### C. Mathematical Formulation
1. **NOAA Rothfusz Heat Index Calculation**:
   For $T \ge 27^\circ\text{C}$:
   $$\begin{aligned}
   HI = &-42.379 + 2.04901523 T_F + 10.14333127 RH - 0.22475541 T_F RH \\
        &- 0.00683783 T_F^2 - 0.05481717 RH^2 + 0.00122874 T_F^2 RH \\
        &+ 0.00085282 T_F RH^2 - 0.00000199 T_F^2 RH^2
   \end{aligned}$$
   *(where $T_F = T \cdot 9/5 + 32$)*. For $T < 27^\circ\text{C}$, $HI = T$.
2. **Thermal Stress Index ($S_{\text{heat}}$)**:
   - Optimal thermal equilibrium: $18^\circ\text{C} \le HI \le 27^\circ\text{C}$ (100/100)
   - Caution ($HI = 32^\circ\text{C}$): 70/100
   - Extreme Caution ($HI = 38^\circ\text{C}$): 40/100
   - Danger ($HI \ge 41^\circ\text{C}$): $<20/100$
   - Critical Extreme Danger ($HI \ge 46^\circ\text{C}$): 0/100
3. **Wildfire Weather Stability ($S_{\text{fire}}$)**:
   Evaluated using the Fosberg Fire Weather proxy equation:
   $$\text{FFWI} = \frac{\sqrt{1 + V_{\text{mph}}^2}}{0.30059} \cdot \left[1 - 2\left(\frac{m}{30}\right) + 1.5\left(\frac{m}{30}\right)^2 - 0.5\left(\frac{m}{30}\right)^3\right]$$
   *(where $m$ is equilibrium moisture content derived from $T$ and $RH$)*.
   $$S_{\text{fire}} = \max\left(0,\ 100 - 1.5 \cdot \text{FFWI}\right)$$
4. **Composite Agni Score**:
   $$\text{Agni} = \text{round}\left(0.60 \cdot S_{\text{heat}} + 0.40 \cdot S_{\text{fire}}\right)$$

---

### 4.4 VAYU (वायु) — Atmospheric Cleanliness & Dispersion

#### A. Environmental Variables Used
1. **Fine Particulate Matter ($PM_{2.5}$)**: Open-Meteo Air Quality `pm2_5` ($\mu\text{g}/m^3$).
2. **Coarse Particulate Matter ($PM_{10}$)**: Open-Meteo Air Quality `pm10` ($\mu\text{g}/m^3$).
3. **Wind Speed ($V$)**: Open-Meteo `wind_speed_10m` (km/h).

#### B. Scientific Basis & References
- **WHO Global Air Quality Guidelines (2021 update)**:
  - $PM_{2.5}$ interim target 1: $35\ \mu\text{g}/m^3$; Interim target 4: $10\ \mu\text{g}/m^3$; Guideline level: $5\ \mu\text{g}/m^3$ (annual) / $15\ \mu\text{g}/m^3$ (24-hour mean).
  - $PM_{10}$ 24-hour guideline: $45\ \mu\text{g}/m^3$.
- **Atmospheric Dispersion Physics**: Wind speed below $3\text{ km/h}$ creates stagnation/trapping of pollutants in urban boundary layers; wind speed between $8 - 25\text{ km/h}$ provides optimal non-destructive ventilation; wind speed $>65\text{ km/h}$ creates gale structural hazards.

#### C. Mathematical Formulation & Decoupling from Wind
> **Critical Correction**: In the existing engine, gentle wind was given 40% weight, allowing toxic air (PM2.5 = 250) to score 40+. In Phase 2, **pollutant concentration acts as an upper ceiling (veto constraint)** on Vayu:

1. **Particulate Health Index ($S_{\text{pm}}$)**:
   $$S_{\text{pm2.5}} = \begin{cases}
   100, & PM_{2.5} \le 5 \\
   100 - 30 \left(\frac{PM_{2.5} - 5}{15 - 5}\right), & 5 < PM_{2.5} \le 15 \\
   70 - 30 \left(\frac{PM_{2.5} - 15}{35 - 15}\right), & 15 < PM_{2.5} \le 35 \\
   40 - 25 \left(\frac{PM_{2.5} - 35}{75 - 35}\right), & 35 < PM_{2.5} \le 75 \\
   15 - 15 \left(\frac{PM_{2.5} - 75}{150 - 75}\right), & 75 < PM_{2.5} \le 150 \\
   0, & PM_{2.5} > 150
   \end{cases}$$
2. **Ventilation Quality Index ($S_{\text{vent}}$)**:
   - Stagnation ($V < 3\text{ km/h}$): 50/100
   - Optimal dispersion ($8 - 25\text{ km/h}$): 100/100
   - Gale wind ($V \ge 60\text{ km/h}$): Drops to 20/100
3. **Ceiling Rule & Composite Vayu Score**:
   $$\text{Vayu} = \text{round}\left(\min\left(S_{\text{pm2.5}},\ 0.75 \cdot S_{\text{pm2.5}} + 0.25 \cdot S_{\text{vent}}\right)\right)$$
   *This ensures ventilation can only marginally assist or penalize; it can never elevate hazardous air into an acceptable score.*

---

### 4.5 AKASH (आकाश) — Atmospheric Pressure & Solar Radiative Load

#### A. Environmental Variables Used
1. **Barometric Surface Pressure ($P_{\text{surf}}$)**: Open-Meteo `surface_pressure` (hPa).
2. **Solar UV Index ($UVI$)**: Open-Meteo Air Quality `uv_index`.
3. **Location Elevation ($H_{\text{alt}}$)**: Computed from hypsometric standard reference.

#### B. Scientific Basis & References
- **ICAO Standard Atmosphere Model (Doc 7488/3)**: Sea-level standard is $1013.25\text{ hPa}$. Natural barometric pressure decreases exponentially with altitude:
  $$P_0(H) = 1013.25 \cdot \left(1 - 2.25577 \times 10^{-5} \cdot H\right)^{5.25588}$$
  Judging pressure deviations against $1013.25\text{ hPa}$ without altimetric reduction erroneously penalizes every elevated city on Earth.
- **WHO Global Solar UV Index**: Exposure above $UVI = 8$ causes severe erythema in $<20$ minutes. However, $UVI = 0$ at night is a natural celestial state, not an indicator of "100/100 environmental perfection".

#### C. Mathematical Formulation
1. **Altimetric Normalized Barometric Stability ($S_{\text{press}}$)**:
   Compute the local expected barometric baseline $P_{\text{expected}}(H)$. Evaluate deviation:
   $$\Delta P = |P_{\text{surf}} - P_{\text{expected}}|$$
   - Stable atmospheric pressure ($\Delta P \le 4\text{ hPa}$): 100/100
   - Barometric depression ($\Delta P \ge 25\text{ hPa}$, e.g. severe cyclonic vortex): Drops to 10/100
   $$S_{\text{press}} = \max\left(0,\ 100 - 3.6 \cdot \Delta P\right)$$
2. **Solar Radiation Burden ($S_{\text{uv}}$)**:
   - Evaluated only during daylight hours ($UVI > 0$):
     $$S_{\text{uv}} = \begin{cases}
     100, & UVI \le 2 \\
     100 - 20 (UVI - 2), & 2 < UVI \le 5 \\
     40 - 15 (UVI - 5), & 5 < UVI \le 8 \\
     max(0, 20 - 5 (UVI - 8)), & UVI > 8
     \end{cases}$$
   - **Nighttime Handling**: If $UVI = 0$ due to solar zenith angle at night, $S_{\text{uv}}$ is assigned neutral weighting ($85/100$ baseline) or omitted from dynamic daytime penalty.
3. **Composite Akash Score**:
   $$\text{Akash} = \text{round}\left(0.55 \cdot S_{\text{press}} + 0.45 \cdot S_{\text{uv}}\right)$$

---

## 5. Composite Prakruti Score Methodology

### 5.1 Definition & Interpretation Scale
The composite **Prakruti Score** ($P \in [0, 100]$) quantifies the **systemic ecological equilibrium** of a specific location at a given timestamp:

| Score Band | Classification | Systemic Interpretation | Color Code |
| :---: | :--- | :--- | :---: |
| **80 – 100** | **Optimal / High Balance** | All five elemental dimensions operate within healthy scientific baselines. Minimal anthropogenic or thermodynamic stress. | `#52A373` (Emerald) |
| **60 – 79** | **Moderate Equilibrium** | General ecosystem stability maintained, with mild stress localized to 1 or 2 sub-metrics (e.g. moderate seasonal ozone or dry soil). | `#E0A02D` (Amber) |
| **40 – 59** | **Under Environmental Stress** | Significant imbalance detected. Vulnerabilities concentrated in respiratory air quality, thermal strain, or hydrological deficit. | `#D9822B` (Orange) |
| **0 – 39** | **Critical Ecological Hazard** | Compounding multi-vector stress (e.g. hazardous PM2.5 + extreme heatwave + drought). Decision-support advisory triggered. | `#C4554D` (Crimson) |

### 5.2 Composite Aggregation Model: Geometric-Harmonic Hybrid
A simple arithmetic mean suffers from the **compensation flaw**: an area with deadly air ($Vayu = 0$) and perfect land/water ($100, 100$) scores $80/100$ ("Optimal"). This is scientifically unacceptable.

To enforce non-compensability where a catastrophic failure in one life-critical element pulls down the composite score, PRAKRUSHTI implements a **Weighted Generalized Mean ($p = 0.5$)**:

$$\text{PrakrutiScore} = \left(\sum_{i=1}^{5} w_i \cdot E_i^{0.5}\right)^2$$

Where $\sum w_i = 1$ (base weights: $w_{\text{Prithvi}} = 0.20, w_{\text{Jal}} = 0.20, w_{\text{Agni}} = 0.20, w_{\text{Vayu}} = 0.25, w_{\text{Akash}} = 0.15$).

*Mathematical Property*: If any life-critical element drops to 0, the maximum possible composite score is bounded at $56$, immediately preventing an erroneous "Optimal" classification.

---

## 6. Missing-Data & Confidence Methodology

### 6.1 Data Availability Matrix & Confidence Metric
Every environmental reading carries a known sensor/model coverage factor:

$$C_{\text{total}} = \sum_{j=1}^{N} \omega_j \cdot c_j$$

Where:
- $c_j = 1.0$ if the variable is directly retrieved from primary model analysis.
- $c_j = 0.6$ if derived via fallback approximation (e.g., oceanic soil proxy).
- $c_j = 0.0$ if completely unavailable.

### 6.2 Display Rule for Confidence
PRAKRUSHTI will **never display an artificially precise score** when underlying feeds are missing:
- If $C_{\text{total}} \ge 85\%$: Score displayed with **High Confidence** badge.
- If $60\% \le C_{\text{total}} < 85\%$: Score displayed with **Moderate Confidence** and explicit data gap indicators.
- If $C_{\text{total}} < 60\%$: Score is accompanied by an **Incomplete Environmental Telemetry Warning**, detailing which feeds failed.

---

## 7. Explainability & Factor Attribution Engine

To provide clear, traceable answers to user questions, the engine outputs a **Structured Attribution Record**:

### 7.1 Mathematical Attribution Output Schema
```ts
export interface ScoreExplanation {
  compositeScore: number;
  confidenceScore: number; // 0.0 - 1.0
  governingElement: MahabhutaElementKey; // The element exerting the highest downward drag
  strongestElement: MahabhutaElementKey;
  subMetricDeltas: {
    metric: string;
    rawInput: number | string;
    unit: string;
    benchmarkStandard: string;
    penaltyPoints: number; // Points deducted from perfect 100
    narrativeExplanation: string;
  }[];
  scientificCitations: string[];
}
```

### 7.2 Answering "Why did the score change?"
When comparing two timestamps ($t_1, t_2$) or two locations ($A, B$):
$$\Delta \text{Prakruti} = \sum_{i=1}^{5} \frac{\partial P}{\partial E_i} \cdot \Delta E_i$$
The explainability engine sorts $\Delta E_i$ to rank-order exact contributors (e.g., *"72% of the 14-point score drop was driven by a 45 µg/m³ surge in PM2.5, which reduced Vayu by 36 points"*).

---

## 8. Concrete Numerical Calculation Examples

### Example 1: Clear Post-Rain Pune Morning (Balanced Equilibrium)
- **Inputs**:
  - $T = 23^\circ\text{C}$, $RH = 60\%$, $P_{\text{current}} = 1.2\text{ mm/h}$, $V = 11\text{ km/h}$
  - $\theta = 0.26\ m^3/m^3$ (ECMWF IFS), $T_{\text{soil}} = 21^\circ\text{C}$
  - $PM_{2.5} = 12\ \mu\text{g}/m^3$, $PM_{10} = 28\ \mu\text{g}/m^3$
  - $P_{\text{surf}} = 952\text{ hPa}$ (Pune elevation ~560m, expected standard $950\text{ hPa}$, $\Delta P = 2\text{ hPa}$), $UVI = 4.2$
- **Calculations**:
  - **Prithvi**: $S_{\theta} = 100$, $S_{T\text{soil}} = 100 \rightarrow \mathbf{100}$
  - **Jal**: $S_{\text{precip}} = 100$, $S_{\text{runoff}} = 96$, $S_{\text{rh}} = 100 \rightarrow \mathbf{98}$
  - **Agni**: $HI = 23^\circ\text{C} \rightarrow S_{\text{heat}} = 100$; $S_{\text{fire}} = 98 \rightarrow \mathbf{99}$
  - **Vayu**: $PM_{2.5} = 12 \rightarrow S_{\text{pm2.5}} = 79$; $S_{\text{vent}} = 100 \rightarrow \mathbf{79}$
  - **Akash**: $\Delta P = 2 \rightarrow S_{\text{press}} = 93$; $UVI = 4.2 \rightarrow S_{\text{uv}} = 56 \rightarrow \mathbf{76}$
- **Composite Prakruti Score**:
  $$P = \left(0.20\sqrt{100} + 0.20\sqrt{98} + 0.20\sqrt{99} + 0.25\sqrt{79} + 0.15\sqrt{76}\right)^2 = \mathbf{90} / 100\ \text{(Optimal)}$$

### Example 2: Severe Delhi Winter Smog Inversion (Hazardous Degradation)
- **Inputs**:
  - $T = 14^\circ\text{C}$, $RH = 85\%$, $P_{\text{current}} = 0\text{ mm/h}$, $V = 2\text{ km/h}$ (Severe atmospheric stagnation)
  - $\theta = 0.19\ m^3/m^3$, $T_{\text{soil}} = 13^\circ\text{C}$
  - $PM_{2.5} = 280\ \mu\text{g}/m^3$ (Hazardous), $PM_{10} = 420\ \mu\text{g}/m^3$
  - $P_{\text{surf}} = 992\text{ hPa}$ (Elevation ~215m, expected $989\text{ hPa}$, $\Delta P = 3\text{ hPa}$), $UVI = 1.8$
- **Calculations**:
  - **Prithvi**: $S_{\theta} = 100$, $S_{T\text{soil}} = 100 \rightarrow \mathbf{100}$
  - **Jal**: $S_{\text{precip}} = 70$, $S_{\text{runoff}} = 100$, $S_{\text{rh}} = 82 \rightarrow \mathbf{84}$
  - **Agni**: $HI = 14^\circ\text{C} \rightarrow S_{\text{heat}} = 88$; $S_{\text{fire}} = 100 \rightarrow \mathbf{93}$
  - **Vayu**: $PM_{2.5} = 280 \rightarrow S_{\text{pm2.5}} = 0$; Stagnation $V=2 \rightarrow S_{\text{vent}} = 50$; Ceiling applies $\rightarrow \mathbf{0}$
  - **Akash**: $\Delta P = 3 \rightarrow S_{\text{press}} = 89$; $UVI = 1.8 \rightarrow S_{\text{uv}} = 100 \rightarrow \mathbf{94}$
- **Composite Prakruti Score**:
  $$P = \left(0.20\sqrt{100} + 0.20\sqrt{84} + 0.20\sqrt{93} + 0.25\sqrt{0} + 0.15\sqrt{94}\right)^2 = \mathbf{51} / 100\ \text{(Under Stress)}$$
  *(Notice how the non-compensatory generalized mean dragged the composite score down from what would have been an arithmetic 74 to 51, correctly highlighting life-threatening respiratory danger).*

---

## 9. Implementation Roadmap & Technical Deliverables

### Technical Architecture Principles
- **100% Deterministic TypeScript**: Implemented directly in `src/services/scoringEngine.ts`.
- **Zero Heavy ML Runtime Required**: Eliminates external server dependency for mathematical calculations.
- **Pure Functions**: `computePrakrutiScore(telemetry: NormalizedTelemetry): PrakrutiScoringResult` will be pure, stateless, and covered by a comprehensive Vitest test matrix.

### Verification Matrix for Implementation
1. Unit tests covering 20 edge-case climate profiles (Equatorial, Arctic, Desert, Monsoon, High-Altitude, Smog Inversion).
2. Continuity tests confirming zero step-function score jumps across infinitesimal input deltas.
3. Ceiling enforcement tests confirming $Vayu = 0$ when $PM_{2.5} > 150\ \mu\text{g}/m^3$.

---

## 10. Summary of Unresolved Assumptions & Future Satellite Expansions

1. **Vegetation Health / NDVI**: True satellite NDVI (MODIS / Sentinel-2) requires multi-spectral infrared bands unavailable in Open-Meteo's weather endpoints. Until a authenticated raster API is added, vegetation health is classified as an **estimated soil-moisture proxy**, not direct satellite reflectance.
2. **Soil Texture Heterogeneity**: Global default field capacity ($0.32\ m^3/m^3$) and wilting point ($0.10\ m^3/m^3$) are based on medium loam soils. Future expansions can incorporate ISRIC World Soil Information rasters for hyper-localized pedological boundaries.

---

*Phase 2A design specification is complete. In accordance with master instructions, no source code changes have been made. Development is paused awaiting user review and approval.*

