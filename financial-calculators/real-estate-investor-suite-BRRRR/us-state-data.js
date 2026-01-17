/**
 * US STATE REAL ESTATE INTELLIGENCE LAYER (2025 HYBRID)
 * ------------------------------------------------------------------
 * Aggregated from: ATTOM, Tax Foundation, III, Eviction Lab.
 *
 * HYBRID DATA DICTIONARY:
 * [Structural]
 * - propertyTaxRate: Effective annual tax % (Crucial for Cashflow).
 * - stateIncomeTaxRate: Top marginal rate % (Crucial for Wealth Strategy).
 * - evictionDays: Avg. days to regain possession (Risk factor).
 * - landlordScore: 1 (Hostile) to 5 (Friendly) composite index.
 *
 * [Market]
 * - insuranceRate: Est. annual landlord insurance % of replacement cost.
 * - vacancyRate: State average vacancy %.
 * - rentGrowth: Projected annual rent growth %.
 *
 * [Friction]
 * - closingCostBuy: Buyer closing costs % of Price.
 * - closingCostSell: Seller closing costs % of Price (excluding transfer tax).
 * - transferTax: Specific State/County transfer tax % (The "Hidden" Cost).
 */

export const US_STATE_DATA = {
  AL: { name: "Alabama", propertyTaxRate: 0.41, stateIncomeTaxRate: 5.0, evictionDays: 25, landlordScore: 5, insuranceRate: 0.55, vacancyRate: 7.5, rentGrowth: 3.0, closingCostBuy: 3.0, closingCostSell: 5.5, transferTax: 0.10 },
  AK: { name: "Alaska", propertyTaxRate: 1.19, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.40, vacancyRate: 8.0, rentGrowth: 2.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  AZ: { name: "Arizona", propertyTaxRate: 0.62, stateIncomeTaxRate: 2.5, evictionDays: 21, landlordScore: 5, insuranceRate: 0.35, vacancyRate: 6.0, rentGrowth: 4.5, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.00 },
  AR: { name: "Arkansas", propertyTaxRate: 0.62, stateIncomeTaxRate: 4.4, evictionDays: 14, landlordScore: 5, insuranceRate: 0.70, vacancyRate: 7.2, rentGrowth: 3.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.33 },
  CA: { name: "California", propertyTaxRate: 0.75, stateIncomeTaxRate: 13.3, evictionDays: 75, landlordScore: 1, insuranceRate: 0.25, vacancyRate: 4.2, rentGrowth: 3.8, closingCostBuy: 2.0, closingCostSell: 5.0, transferTax: 0.11 },
  CO: { name: "Colorado", propertyTaxRate: 0.51, stateIncomeTaxRate: 4.4, evictionDays: 25, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.3, rentGrowth: 4.2, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.01 },
  CT: { name: "Connecticut", propertyTaxRate: 2.15, stateIncomeTaxRate: 6.99, evictionDays: 45, landlordScore: 2, insuranceRate: 0.45, vacancyRate: 6.8, rentGrowth: 2.8, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 0.75 },
  DE: { name: "Delaware", propertyTaxRate: 0.56, stateIncomeTaxRate: 6.6, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 7.0, rentGrowth: 3.0, closingCostBuy: 4.0, closingCostSell: 6.0, transferTax: 4.00 },
  DC: { name: "District of Columbia", propertyTaxRate: 0.85, stateIncomeTaxRate: 10.75, evictionDays: 90, landlordScore: 1, insuranceRate: 0.35, vacancyRate: 5.5, rentGrowth: 3.2, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 1.10 },
  FL: { name: "Florida", propertyTaxRate: 0.86, stateIncomeTaxRate: 0.0, evictionDays: 25, landlordScore: 5, insuranceRate: 1.10, vacancyRate: 5.8, rentGrowth: 4.8, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 0.70 },
  GA: { name: "Georgia", propertyTaxRate: 0.90, stateIncomeTaxRate: 5.49, evictionDays: 25, landlordScore: 5, insuranceRate: 0.50, vacancyRate: 6.5, rentGrowth: 5.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.10 },
  HI: { name: "Hawaii", propertyTaxRate: 0.28, stateIncomeTaxRate: 11.0, evictionDays: 45, landlordScore: 3, insuranceRate: 0.20, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 2.0, closingCostSell: 5.0, transferTax: 0.15 },
  ID: { name: "Idaho", propertyTaxRate: 0.63, stateIncomeTaxRate: 5.8, evictionDays: 20, landlordScore: 5, insuranceRate: 0.30, vacancyRate: 5.2, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  IL: { name: "Illinois", propertyTaxRate: 2.23, stateIncomeTaxRate: 4.95, evictionDays: 90, landlordScore: 2, insuranceRate: 0.50, vacancyRate: 7.0, rentGrowth: 2.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.15 },
  IN: { name: "Indiana", propertyTaxRate: 0.83, stateIncomeTaxRate: 3.15, evictionDays: 30, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.5, rentGrowth: 3.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  IA: { name: "Iowa", propertyTaxRate: 1.57, stateIncomeTaxRate: 5.7, evictionDays: 25, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 2.8, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.16 },
  KS: { name: "Kansas", propertyTaxRate: 1.43, stateIncomeTaxRate: 5.7, evictionDays: 30, landlordScore: 4, insuranceRate: 0.65, vacancyRate: 6.8, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  KY: { name: "Kentucky", propertyTaxRate: 0.85, stateIncomeTaxRate: 4.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.5, rentGrowth: 3.2, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.10 },
  LA: { name: "Louisiana", propertyTaxRate: 0.56, stateIncomeTaxRate: 4.25, evictionDays: 30, landlordScore: 4, insuranceRate: 0.98, vacancyRate: 8.5, rentGrowth: 2.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.00 },
  ME: { name: "Maine", propertyTaxRate: 1.28, stateIncomeTaxRate: 7.15, evictionDays: 30, landlordScore: 3, insuranceRate: 0.38, vacancyRate: 5.5, rentGrowth: 3.8, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.44 },
  MD: { name: "Maryland", propertyTaxRate: 1.07, stateIncomeTaxRate: 5.75, evictionDays: 90, landlordScore: 2, insuranceRate: 0.40, vacancyRate: 5.8, rentGrowth: 3.5, closingCostBuy: 4.5, closingCostSell: 6.5, transferTax: 1.00 },
  MA: { name: "Massachusetts", propertyTaxRate: 1.15, stateIncomeTaxRate: 5.0, evictionDays: 90, landlordScore: 1, insuranceRate: 0.38, vacancyRate: 4.0, rentGrowth: 4.0, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.46 },
  MI: { name: "Michigan", propertyTaxRate: 1.48, stateIncomeTaxRate: 4.25, evictionDays: 45, landlordScore: 3, insuranceRate: 0.42, vacancyRate: 5.5, rentGrowth: 3.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.75 },
  MN: { name: "Minnesota", propertyTaxRate: 1.11, stateIncomeTaxRate: 9.85, evictionDays: 45, landlordScore: 2, insuranceRate: 0.48, vacancyRate: 5.0, rentGrowth: 3.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.33 },
  MS: { name: "Mississippi", propertyTaxRate: 0.79, stateIncomeTaxRate: 4.7, evictionDays: 25, landlordScore: 5, insuranceRate: 0.75, vacancyRate: 8.5, rentGrowth: 2.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  MO: { name: "Missouri", propertyTaxRate: 0.96, stateIncomeTaxRate: 4.8, evictionDays: 21, landlordScore: 4, insuranceRate: 0.55, vacancyRate: 6.5, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 6.0, transferTax: 0.00 },
  MT: { name: "Montana", propertyTaxRate: 0.83, stateIncomeTaxRate: 5.9, evictionDays: 20, landlordScore: 4, insuranceRate: 0.35, vacancyRate: 5.5, rentGrowth: 4.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  NE: { name: "Nebraska", propertyTaxRate: 1.67, stateIncomeTaxRate: 5.84, evictionDays: 30, landlordScore: 4, insuranceRate: 0.58, vacancyRate: 5.8, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.23 },
  NV: { name: "Nevada", propertyTaxRate: 0.55, stateIncomeTaxRate: 0.0, evictionDays: 25, landlordScore: 4, insuranceRate: 0.32, vacancyRate: 6.5, rentGrowth: 4.0, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.51 },
  NH: { name: "New Hampshire", propertyTaxRate: 2.09, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 3, insuranceRate: 0.35, vacancyRate: 3.5, rentGrowth: 4.5, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 1.50 },
  NJ: { name: "New Jersey", propertyTaxRate: 2.47, stateIncomeTaxRate: 10.75, evictionDays: 90, landlordScore: 1, insuranceRate: 0.42, vacancyRate: 6.9, rentGrowth: 3.0, closingCostBuy: 4.0, closingCostSell: 7.0, transferTax: 0.85 },
  NM: { name: "New Mexico", propertyTaxRate: 0.78, stateIncomeTaxRate: 5.9, evictionDays: 30, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 7.0, rentGrowth: 3.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  NY: { name: "New York", propertyTaxRate: 1.73, stateIncomeTaxRate: 10.9, evictionDays: 120, landlordScore: 1, insuranceRate: 0.48, vacancyRate: 5.5, rentGrowth: 3.5, closingCostBuy: 5.0, closingCostSell: 7.5, transferTax: 0.40 },
  NC: { name: "North Carolina", propertyTaxRate: 0.80, stateIncomeTaxRate: 4.5, evictionDays: 30, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 5.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.20 },
  ND: { name: "North Dakota", propertyTaxRate: 0.98, stateIncomeTaxRate: 2.5, evictionDays: 30, landlordScore: 4, insuranceRate: 0.42, vacancyRate: 7.5, rentGrowth: 2.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  OH: { name: "Ohio", propertyTaxRate: 1.53, stateIncomeTaxRate: 3.5, evictionDays: 35, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.2, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.30 },
  OK: { name: "Oklahoma", propertyTaxRate: 0.90, stateIncomeTaxRate: 4.75, evictionDays: 25, landlordScore: 5, insuranceRate: 0.85, vacancyRate: 7.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.08 },
  OR: { name: "Oregon", propertyTaxRate: 0.93, stateIncomeTaxRate: 9.9, evictionDays: 45, landlordScore: 2, insuranceRate: 0.30, vacancyRate: 4.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  PA: { name: "Pennsylvania", propertyTaxRate: 1.53, stateIncomeTaxRate: 3.07, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 6.0, rentGrowth: 3.2, closingCostBuy: 4.5, closingCostSell: 6.5, transferTax: 2.00 },
  RI: { name: "Rhode Island", propertyTaxRate: 1.53, stateIncomeTaxRate: 5.99, evictionDays: 60, landlordScore: 2, insuranceRate: 0.48, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.46 },
  SC: { name: "South Carolina", propertyTaxRate: 0.56, stateIncomeTaxRate: 6.4, evictionDays: 30, landlordScore: 5, insuranceRate: 0.58, vacancyRate: 7.0, rentGrowth: 4.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.37 },
  SD: { name: "South Dakota", propertyTaxRate: 1.24, stateIncomeTaxRate: 0.0, evictionDays: 20, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.10 },
  TN: { name: "Tennessee", propertyTaxRate: 0.66, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 5, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 5.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.37 },
  TX: { name: "Texas", propertyTaxRate: 1.74, stateIncomeTaxRate: 0.0, evictionDays: 21, landlordScore: 5, insuranceRate: 0.75, vacancyRate: 6.2, rentGrowth: 4.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.00 },
  UT: { name: "Utah", propertyTaxRate: 0.58, stateIncomeTaxRate: 4.65, evictionDays: 15, landlordScore: 5, insuranceRate: 0.28, vacancyRate: 4.5, rentGrowth: 4.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  VT: { name: "Vermont", propertyTaxRate: 1.86, stateIncomeTaxRate: 8.75, evictionDays: 90, landlordScore: 2, insuranceRate: 0.38, vacancyRate: 3.8, rentGrowth: 3.0, closingCostBuy: 3.5, closingCostSell: 6.5, transferTax: 1.25 },
  VA: { name: "Virginia", propertyTaxRate: 0.82, stateIncomeTaxRate: 5.75, evictionDays: 45, landlordScore: 3, insuranceRate: 0.38, vacancyRate: 5.5, rentGrowth: 3.8, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.25 },
  WA: { name: "Washington", propertyTaxRate: 0.94, stateIncomeTaxRate: 0.0, evictionDays: 60, landlordScore: 2, insuranceRate: 0.30, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 1.60 },
  WV: { name: "West Virginia", propertyTaxRate: 0.59, stateIncomeTaxRate: 6.5, evictionDays: 30, landlordScore: 5, insuranceRate: 0.42, vacancyRate: 8.0, rentGrowth: 2.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.44 },
  WI: { name: "Wisconsin", propertyTaxRate: 1.73, stateIncomeTaxRate: 7.65, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 5.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.30 },
  WY: { name: "Wyoming", propertyTaxRate: 0.61, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.38, vacancyRate: 7.0, rentGrowth: 2.5, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 }
};

// --- HYBRID INTELLIGENCE HELPERS ---

/**
 * 1. Safe Getter with Dynamic Risk Profile
 * Returns the state data enriched with "Kill Variable" flags (ChatGPT style).
 */
export const getStateData = (stateCode) => {
  const data = US_STATE_DATA[stateCode] || US_STATE_DATA["TX"];
  
  // Dynamic Risk Flag Calculation (The "Hybrid" Brain)
  const riskFlags = {
    insuranceVolatility: data.insuranceRate > 0.9, // FL, LA check
    evictionDrag: data.evictionDays >= 60,         // CA, NY, MA check
    taxBurden: data.propertyTaxRate >= 1.7,        // TX, IL, NJ check
    wealthDrag: data.stateIncomeTaxRate >= 8.0     // CA, NY, HI check
  };

  // Generate Insight Notes dynamically
  let autoNotes = [];
  if (riskFlags.insuranceVolatility) autoNotes.push("Insurance is a primary kill variable.");
  if (riskFlags.evictionDrag) autoNotes.push("Eviction timeline breaks BRRRR repeatability.");
  if (riskFlags.taxBurden && data.rentGrowth < 3) autoNotes.push("High tax drag with low growth = bad ROI.");
  if (!riskFlags.evictionDrag && !riskFlags.taxBurden && data.rentGrowth > 4) autoNotes.push("High velocity growth market.");

  return {
    ...data,
    riskFlags,
    notes: autoNotes.join(" ") || "Balanced market profile."
  };
};

/**
 * 2. Dropdown Generator
 */
export const getStateOptions = () =>
  Object.keys(US_STATE_DATA)
    .sort()
    .map((code) => ({ value: code, label: US_STATE_DATA[code].name }));

/**
 * 3. Annual Operating Drag (Mode A / C)
 * Calculates Holding Costs.
 * Warning: Returns a specific alert if Insurance is > 1% (Florida/Coastal risk).
 */
export const estimateAnnualStateOps = (stateCode, propertyValue) => {
  const s = getStateData(stateCode);
  const annualTax = propertyValue * (s.propertyTaxRate / 100);
  const annualIns = propertyValue * (s.insuranceRate / 100);

  return {
    propertyTax: annualTax,
    insurance: annualIns,
    totalAnnualDrag: annualTax + annualIns,
    monthlyDrag: (annualTax + annualIns) / 12,
    warning: s.riskFlags.insuranceVolatility ? "⚠️ High Insurance Risk Detected" : null
  };
};

/**
 * 4. Transaction Friction (Mode B: Flip / Mode C: BRRRR)
 * Includes Gemini's precise Transfer Tax logic.
 */
export const estimateTransactionCosts = (stateCode, purchasePrice, salePrice) => {
  const s = getStateData(stateCode);
  
  // Buy Side
  const buySideCost = purchasePrice * (s.closingCostBuy / 100);

  // Sell Side (Comm + Title + Govt Transfer Tax)
  const transferTaxAmount = salePrice * (s.transferTax / 100);
  const sellSideCost = (salePrice * (s.closingCostSell / 100)) + transferTaxAmount;

  return {
    buySide: buySideCost,
    sellSide: sellSideCost,
    transferTaxAmount, 
    totalFriction: buySideCost + sellSideCost,
    frictionPercent: ((buySideCost + sellSideCost) / salePrice) * 100
  };
};

/**
 * 5. Market Strategy Signal
 * Determines if market is Appreciation, Cashflow, or Balanced based on data.
 */
export const getMarketStrategyType = (stateCode) => {
  const s = getStateData(stateCode);
  
  if (s.evictionDays > 60) return "APPRECIATION_ONLY (High Risk)";
  if (s.rentGrowth >= 4.5 && s.propertyTaxRate < 1.0) return "GROWTH_FOCUSED";
  if (s.propertyTaxRate >= 1.5 && s.rentGrowth < 3.0) return "CASH_FLOW_FOCUSED";
  
  return "BALANCED";
};