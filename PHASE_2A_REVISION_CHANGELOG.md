# PRAKRUSHTI (प्रकृति) — Phase 2A Revision Changelog
## Scientific & Mathematical Validation of Scoring Engine Methodology

*Indradhanu — PCCOE International Grand Challenge 2026 (Theme: AI for Climate Change)*  
*Document Version: 1.0.0 (Deliverable Companion to PHASE_2A_SCORING_DESIGN.md)*  
*Status: Complete & Awaiting Approval Before Phase 2 Implementation*

---

## 1. Summary of Changes

This changelog records the specific revisions, mathematical corrections, and scientific adjustments made between the initial Phase 2A design draft and the revised specification (`PHASE_2A_SCORING_DESIGN.md` v2.0.0).

---

## 2. Reconciled Issues & Scientific Justification Table

| Issue | Original Design (v1.0.0) | Revised Design (v2.0.0) | Scientific Justification | Remaining Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **Prithvi Metric Mismatch** | Table listed 3 metrics: Soil Moisture (45%), Soil Temp (25%), Volatility Index (30%). Formula only evaluated Soil Moisture & Temp. | Reconciled to exactly 2 available metrics: Volumetric Moisture ($w_1 = 0.60$) and Surface Soil Temperature ($w_2 = 0.40$). | Open-Meteo current forecast endpoints do not provide historical 30-day topsoil variance without separate archive calls. Weights now sum to 1.00. | Models only the top 1 cm skin layer; does not capture deep root-zone soil hydrology ($10-100\text{ cm}$). |
| **Prithvi Soil Texture Blindness** | Implied universal optimum soil moisture thresholds for all global regions. | Explicitly labeled fixed thresholds ($0.16 - 0.34\ m^3/m^3$) as **provisional medium-loam proxies**. Disclosed pedological limitations. | Available water capacity ($AW$) varies dramatically by texture: sand field capacity is $\sim 15\%$, whereas clay field capacity is $\sim 40\%$. | Without global gridded soil texture maps (e.g. SoilGrids ISRIC), local sandy or heavy clay soils will exhibit minor baseline offsets. |
| **Decoupling Seismic Events** | Seismic risk scores were combined directly into the Prithvi soil index. | Earthquakes are **decoupled from baseline Prithvi health** and placed into an independent **Geophysical Hazard Advisory Layer**. | Earthquakes are episodic tectonic release events, not a continuous measure of soil agricultural or ecological health. | Users must review the advisory chip for tectonic risk rather than seeing it reflected in the soil card score. |
| **Jal Overland Runoff Terminology** | Runoff formula was presented without explicit scientific classification, risking confusion with flood models. | Explicitly labeled as an **Empirical Runoff Warning Proxy ($R_{\text{proxy}}$)**. Defined units ($mm/h$), valid ranges ($0 - 100$), and boundary clipping. | Precipitation totals alone cannot model flooding without catchment topography, storm duration, and river hydraulics. | Cannot predict physical flood stages, inundation depth, or riverbank overtopping. |
| **Agni Heat Index Incomplete Spec** | Partial regression formula without Steadman preliminary step or low/high humidity adjustments. | Implemented **complete official NOAA NWS Heat Index procedure** (Steadman threshold check, full 9-term polynomial, low RH subtraction, high RH addition). | Omitting NOAA conditional adjustments causes errors up to $\pm 3.5^\circ\text{C}$ in dry desert heat and humid monsoon conditions. | Assumes human physiological baseline (shade, light breeze); does not directly model vegetative canopy burn. |
| **Agni Fire Weather FFWI Spec** | Approximated equation without documented equilibrium moisture derivation. | Full implementation of **Fosberg (1978)** with **Simard (1968)** 3-tier equilibrium moisture content ($m$) piecewise functions and unit conversions ($km/h \rightarrow mph$). | Mathematical fidelity to the USDA Forest Service operational fire weather standard. | Evaluates fine dead fuels only; does not incorporate live fuel moisture content or active lightning strikes. |
| **Agni Metric Mismatch** | Table listed "Thermal Anomaly Displacement (20%)", but formula had only Heat Index & Wildfire. | Reconciled to 2 metrics: NOAA Heat Index ($w_1 = 0.65$) and Fosberg Fire Weather ($w_2 = 0.35$). Sum = 1.00. | Thermal anomaly displacement was collinear with the physiological Heat Index. | Historical baseline anomalies require multi-decadal climatology data. |
| **Vayu Averaging Period & PM10 Omission** | Hourly model outputs were directly compared to WHO 24-hour mean guidelines. PM10 was omitted from the formula. | 1. Documented that Open-Meteo provides hourly model analyses, not 24h means.<br>2. Explicitly integrated both $PM_{2.5}$ ($w_1 = 0.55$) and $PM_{10}$ ($w_2 = 0.25$) into chemical baseline. | Hourly peaks reflect transient local air conditions. PM10 represents coarse dust/sand and must be evaluated alongside PM2.5. | Hourly transient air quality spikes (e.g. localized biomass burning) do not equal chronic annual exposure. |
| **Vayu Wind Dilution Fallacy & Ceiling** | Wind speed had 40% weight, allowing hazardous air ($PM_{2.5} = 250$) to score 40+ due to a light breeze. | Enforced **Pollutant Ceiling Rule**: $\text{Vayu} \le S_{\text{chem}} \le S_{\text{pm2.5}}$. Reduced wind weight to 0.20. | High wind advects air downwind but does not destroy pollutants. When $PM_{2.5} > 150$, $\text{Vayu} \equiv 0$, regardless of wind. | Highly localized micro-turbulences in urban street canyons cannot be fully resolved at 10 km grid scale. |
| **Akash Elevation Bias** | Evaluated station barometric pressure against flat sea-level standard ($1013.25\text{ hPa}$), scoring elevated cities 0/100. | Implemented **ICAO Standard Atmosphere altimetric reduction** $P_{\text{ref}}(H)$ based on station elevation. Evaluates anomaly $\Delta P$. | High altitude is natural topography, not a cyclonic collapse. Denver and Nairobi are now evaluated fairly against expected elevation pressure. | Local elevation is derived from geodetic coordinates; micro-topographic valleys may have minor pressure variances. |
| **Akash Cloud Mismatch & Nighttime UV** | 1. Table listed cloud attenuation but formula omitted it.<br>2. Nighttime $UVI = 0$ gave an automatic 100/100. | 1. Deprecated cloud fraction to eliminate collinearity with solar UV.<br>2. Reconciled weights: Pressure ($0.55$), UV ($0.45$).<br>3. Handled nighttime $UVI = 0$ as neutral radiative equilibrium ($85/100$). | Cloud cover fraction alone does not distinguish thin cirrus from storm clouds. Nighttime is normal celestial rotation, not an ecological perfection score. | UV Index measures human erythema, not aquatic or agricultural photosynthetic productivity. |
| **Composite Math Zero-Value Claim** | Claimed every zero-valued element limits the composite score to 56. | **Mathematically proven exact maximums**: $Vayu=0 \rightarrow \mathbf{56}$, $Prithvi/Jal/Agni=0 \rightarrow \mathbf{64}$, $Akash=0 \rightarrow \mathbf{72}$. | Analytical derivation of $(10 \cdot (1 - W_k))^2$. Proof documented for each element weight. | Generalized mean with $p=0.5$ does not drop composite to 0 when one element fails; handled via independent safety overrides. |
| **Critical Safety Hazards** | High single-vector hazards could be partially masked by composite score. | Added **Independent Critical Safety Advisory Layer** (Hazardous AQI, Extreme Heat, Flash Flood, Earthquake alerts trigger unconditionally). | Public health alerts must never be obscured by a composite aggregation score. | Users must heed separate warning banners alongside the composite score. |
| **Explainability Derivative Error** | Attempted to calculate percentage attribution via single partial derivatives ($\frac{\partial P}{\partial E_i} \Delta E_i$). | Replaced with **Exact Marginal Factor Attribution** using finite differences: $\Delta P_i = P(E) - P(E_i = 100)$. | In nonlinear functions with cross-terms ($(\sum W_i \sqrt{E_i})^2$), simple linear derivatives ignore cross-product interactions and fail to sum to $\Delta P$. | Marginal attributions evaluate one-at-a-time counterfactual drops rather than full combinatorial Shapley permutations. |

---

## 3. Verification & Compliance Checklist

- [x] All 5 elements have exact 1-to-1 matching between matrices, formulas, and code representations.
- [x] All element sub-weights sum to exactly 1.00.
- [x] All ghost/unimplemented metrics (Volatility Index, Cloud Attenuation, Thermal Displacement) eliminated.
- [x] Complete NOAA Heat Index algorithm documented with all conditional adjustments.
- [x] Complete Fosberg Fire Weather Index algorithm documented with Simard equilibrium moisture equations.
- [x] Vayu pollutant ceiling mathematically validated.
- [x] Altimetric barometric normalization implemented to eliminate high-altitude topographical penalty.
- [x] Exact analytical maximum composite scores calculated for every zero-valued element.
- [x] Independent Critical Safety Advisory Layer added for public health emergencies.
- [x] Vitest verification test matrix designed for continuous boundaries and extreme weather cases.
- [x] Authoritative primary literature cited with verifiable organizational links.

---

*Phase 2A Revision Changelog is complete. No source code or repository files have been modified. Development is halted awaiting user review and approval.*

