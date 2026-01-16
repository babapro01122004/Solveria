/**
 * 🇺🇸 US STATE MORTGAGE DATA REPOSITORY (HYBRID "TRUTH" EDITION)
 * =============================================================
 * VERSION: 2026.01-VERIFIED
 * UPDATED: Jan 8, 2026
 * SOURCES: Bankrate 2026 Forecast, NerdWallet (Jan '26), Tax Foundation, LodeStar Closing Data.
 *
 * 🧠 LOGIC & UNITS:
 * 1. propertyTaxRate: Effective rate as DECIMAL (e.g., 0.015 = 1.5%).
 * - Source: Attom Data & Rocket Mortgage 2025 Effective Rates.
 * 2. insuranceAvg: Annual premium based on ~$350k replacement cost.
 * - ⚠️ CRITICAL: OK, NE, and KS are now HIGHER than FL in many risk models (Wind/Hail).
 * - FL/LA/TX data uses "Crisis Pricing" (Coastal/Risk weighted).
 * 3. closingCosts:
 * - feesPct: Lender + Title + Recording + Transfer Taxes (Fixed portion).
 * - totalPct: Safe "Cash to Close" buffer (Includes Escrows/Prepaids).
 * 4. refiAvgCost: Average total cost for Refinance (LodeStar 2025 Data).
 */

// ⚙️ CONSTANTS
const INSURANCE_PIVOT_PRICE = 350000; // The home price that insuranceAvg is based on

export const US_STATE_DATA = {
  AL: { name: "Alabama",        propertyTaxRate: 0.0040, insuranceAvg: 3420, closingCosts: { feesPct: 0.013, totalPct: 0.024 }, refiAvgCost: 8296, notes: ["Low tax, but insurance rising (Storms)."] },
  AK: { name: "Alaska",         propertyTaxRate: 0.0107, insuranceAvg: 1035, closingCosts: { feesPct: 0.012, totalPct: 0.022 }, refiAvgCost: 8810, notes: [] },
  AZ: { name: "Arizona",        propertyTaxRate: 0.0045, insuranceAvg: 2565, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 7395, notes: [] },
  AR: { name: "Arkansas",       propertyTaxRate: 0.0053, insuranceAvg: 3215, closingCosts: { feesPct: 0.012, totalPct: 0.023 }, refiAvgCost: 8085, notes: [] },
  CA: { name: "California",     propertyTaxRate: 0.0068, insuranceAvg: 1550, closingCosts: { feesPct: 0.011, totalPct: 0.022 }, refiAvgCost: 8155, notes: ["Prop 13 caps tax. Fire risk limits insurance availability."] },
  CO: { name: "Colorado",       propertyTaxRate: 0.0045, insuranceAvg: 4175, closingCosts: { feesPct: 0.012, totalPct: 0.024 }, refiAvgCost: 8333, notes: ["⚠️ High Hail/Fire risk driving premiums up."] },
  CT: { name: "Connecticut",    propertyTaxRate: 0.0178, insuranceAvg: 1870, closingCosts: { feesPct: 0.018, totalPct: 0.032 }, refiAvgCost: 9107, notes: ["High effective property tax."] },
  DE: { name: "Delaware",       propertyTaxRate: 0.0048, insuranceAvg: 1025, closingCosts: { feesPct: 0.038, totalPct: 0.048 }, refiAvgCost: 9002, notes: ["⚠️ 4% Transfer Tax (highest in US)."] },
  DC: { name: "Dist. Columbia", propertyTaxRate: 0.0056, insuranceAvg: 1295, closingCosts: { feesPct: 0.028, totalPct: 0.038 }, refiAvgCost: 10873, notes: ["High recordation/transfer fees."] },
  FL: { name: "Florida",        propertyTaxRate: 0.0071, insuranceAvg: 5800, closingCosts: { feesPct: 0.022, totalPct: 0.038 }, refiAvgCost: 10451, notes: ["⚠️ INSURANCE CRISIS: Inland cheaper, Coastal doubles."] },
  GA: { name: "Georgia",        propertyTaxRate: 0.0072, insuranceAvg: 2435, closingCosts: { feesPct: 0.014, totalPct: 0.026 }, refiAvgCost: 9028, notes: [] },
  HI: { name: "Hawaii",         propertyTaxRate: 0.0026, insuranceAvg: 1100, closingCosts: { feesPct: 0.014, totalPct: 0.024 }, refiAvgCost: 10180, notes: ["Lowest tax rate, highest home values."] },
  ID: { name: "Idaho",          propertyTaxRate: 0.0047, insuranceAvg: 1460, closingCosts: { feesPct: 0.012, totalPct: 0.023 }, refiAvgCost: 7970, notes: [] },
  IL: { name: "Illinois",       propertyTaxRate: 0.0195, insuranceAvg: 2420, closingCosts: { feesPct: 0.015, totalPct: 0.028 }, refiAvgCost: 8549, notes: ["⚠️ 2nd Highest Property Tax in US."] },
  IN: { name: "Indiana",        propertyTaxRate: 0.0071, insuranceAvg: 2495, closingCosts: { feesPct: 0.012, totalPct: 0.023 }, refiAvgCost: 7550, notes: [] },
  IA: { name: "Iowa",           propertyTaxRate: 0.0140, insuranceAvg: 2505, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8002, notes: [] },
  KS: { name: "Kansas",         propertyTaxRate: 0.0126, insuranceAvg: 3735, closingCosts: { feesPct: 0.013, totalPct: 0.026 }, refiAvgCost: 8465, notes: ["⚠️ High Hail Risk."] },
  KY: { name: "Kentucky",       propertyTaxRate: 0.0074, insuranceAvg: 2510, closingCosts: { feesPct: 0.012, totalPct: 0.023 }, refiAvgCost: 7830, notes: [] },
  LA: { name: "Louisiana",      propertyTaxRate: 0.0051, insuranceAvg: 6200, closingCosts: { feesPct: 0.014, totalPct: 0.028 }, refiAvgCost: 8665, notes: ["⚠️ Insurance Crisis (Hurricane Risk)."] },
  ME: { name: "Maine",          propertyTaxRate: 0.0096, insuranceAvg: 1180, closingCosts: { feesPct: 0.014, totalPct: 0.026 }, refiAvgCost: 8791, notes: [] },
  MD: { name: "Maryland",       propertyTaxRate: 0.0095, insuranceAvg: 1945, closingCosts: { feesPct: 0.035, totalPct: 0.048 }, refiAvgCost: 9295, notes: ["⚠️ Recordation taxes drive high closing costs."] },
  MA: { name: "Massachusetts",  propertyTaxRate: 0.0104, insuranceAvg: 1600, closingCosts: { feesPct: 0.015, totalPct: 0.028 }, refiAvgCost: 9258, notes: [] },
  MI: { name: "Michigan",       propertyTaxRate: 0.0124, insuranceAvg: 2100, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 7458, notes: [] },
  MN: { name: "Minnesota",      propertyTaxRate: 0.0098, insuranceAvg: 2920, closingCosts: { feesPct: 0.014, totalPct: 0.027 }, refiAvgCost: 8678, notes: [] },
  MS: { name: "Mississippi",    propertyTaxRate: 0.0070, insuranceAvg: 3310, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8404, notes: [] },
  MO: { name: "Missouri",       propertyTaxRate: 0.0083, insuranceAvg: 3290, closingCosts: { feesPct: 0.012, totalPct: 0.024 }, refiAvgCost: 8100, notes: [] },
  MT: { name: "Montana",        propertyTaxRate: 0.0069, insuranceAvg: 2735, closingCosts: { feesPct: 0.011, totalPct: 0.022 }, refiAvgCost: 9446, notes: [] },
  NE: { name: "Nebraska",       propertyTaxRate: 0.0144, insuranceAvg: 4505, closingCosts: { feesPct: 0.012, totalPct: 0.025 }, refiAvgCost: 8341, notes: ["⚠️ Among highest insurance premiums (Wind/Hail)."] },
  NV: { name: "Nevada",         propertyTaxRate: 0.0044, insuranceAvg: 1305, closingCosts: { feesPct: 0.011, totalPct: 0.021 }, refiAvgCost: 6633, notes: ["Lowest avg refinance cost in US."] },
  NH: { name: "New Hampshire",  propertyTaxRate: 0.0161, insuranceAvg: 1185, closingCosts: { feesPct: 0.016, totalPct: 0.029 }, refiAvgCost: 9986, notes: ["High property tax, low insurance."] },
  NJ: { name: "New Jersey",     propertyTaxRate: 0.0223, insuranceAvg: 1290, closingCosts: { feesPct: 0.025, totalPct: 0.040 }, refiAvgCost: 9104, notes: ["⚠️ #1 Highest Property Tax Rate."] },
  NM: { name: "New Mexico",     propertyTaxRate: 0.0067, insuranceAvg: 1730, closingCosts: { feesPct: 0.012, totalPct: 0.024 }, refiAvgCost: 8288, notes: [] },
  NY: { name: "New York",       propertyTaxRate: 0.0154, insuranceAvg: 1740, closingCosts: { feesPct: 0.042, totalPct: 0.060 }, refiAvgCost: 12462, notes: ["⚠️ Mortgage Recording Tax drives fees up."] },
  NC: { name: "North Carolina", propertyTaxRate: 0.0063, insuranceAvg: 2490, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8274, notes: [] },
  ND: { name: "North Dakota",   propertyTaxRate: 0.0097, insuranceAvg: 2805, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8552, notes: [] },
  OH: { name: "Ohio",           propertyTaxRate: 0.0136, insuranceAvg: 1590, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8461, notes: [] },
  OK: { name: "Oklahoma",       propertyTaxRate: 0.0076, insuranceAvg: 6210, closingCosts: { feesPct: 0.013, totalPct: 0.028 }, refiAvgCost: 9740, notes: ["⚠️ Among highest insurance premiums (Tornado Alley)."] },
  OR: { name: "Oregon",         propertyTaxRate: 0.0077, insuranceAvg: 1305, closingCosts: { feesPct: 0.011, totalPct: 0.022 }, refiAvgCost: 8465, notes: [] },
  PA: { name: "Pennsylvania",   propertyTaxRate: 0.0135, insuranceAvg: 1440, closingCosts: { feesPct: 0.040, totalPct: 0.055 }, refiAvgCost: 9079, notes: ["⚠️ High Transfer Tax (Philly hiked July '25)."] },
  RI: { name: "Rhode Island",   propertyTaxRate: 0.0132, insuranceAvg: 2080, closingCosts: { feesPct: 0.013, totalPct: 0.026 }, refiAvgCost: 9027, notes: [] },
  SC: { name: "South Carolina", propertyTaxRate: 0.0046, insuranceAvg: 2350, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 8005, notes: [] },
  SD: { name: "South Dakota",   propertyTaxRate: 0.0101, insuranceAvg: 3345, closingCosts: { feesPct: 0.012, totalPct: 0.024 }, refiAvgCost: 9125, notes: [] },
  TN: { name: "Tennessee",      propertyTaxRate: 0.0048, insuranceAvg: 2850, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 9163, notes: [] },
  TX: { name: "Texas",          propertyTaxRate: 0.0147, insuranceAvg: 4585, closingCosts: { feesPct: 0.015, totalPct: 0.035 }, refiAvgCost: 10462, notes: ["Tax relief dropped rate, but Insurance is high."] },
  UT: { name: "Utah",           propertyTaxRate: 0.0047, insuranceAvg: 1385, closingCosts: { feesPct: 0.011, totalPct: 0.022 }, refiAvgCost: 8292, notes: [] },
  VT: { name: "Vermont",        propertyTaxRate: 0.0156, insuranceAvg: 950,  closingCosts: { feesPct: 0.016, totalPct: 0.032 }, refiAvgCost: 8504, notes: ["Lowest Insurance Avg."] },
  VA: { name: "Virginia",       propertyTaxRate: 0.0087, insuranceAvg: 1705, closingCosts: { feesPct: 0.015, totalPct: 0.028 }, refiAvgCost: 8875, notes: [] },
  WA: { name: "Washington",     propertyTaxRate: 0.0072, insuranceAvg: 1415, closingCosts: { feesPct: 0.018, totalPct: 0.032 }, refiAvgCost: 8922, notes: ["REET (Graduated Transfer Tax) applies."] },
  WV: { name: "West Virginia",  propertyTaxRate: 0.0055, insuranceAvg: 1770, closingCosts: { feesPct: 0.013, totalPct: 0.025 }, refiAvgCost: 7419, notes: [] },
  WI: { name: "Wisconsin",      propertyTaxRate: 0.0138, insuranceAvg: 1515, closingCosts: { feesPct: 0.012, totalPct: 0.024 }, refiAvgCost: 8648, notes: [] },
  WY: { name: "Wyoming",        propertyTaxRate: 0.0055, insuranceAvg: 1555, closingCosts: { feesPct: 0.012, totalPct: 0.023 }, refiAvgCost: 8879, notes: [] }
};

/**
 * 🛠️ UTILITIES
 * =============================================================
 */

const NATIONAL_DEFAULT = {
  name: "National Average",
  propertyTaxRate: 0.011,       // 1.1%
  insuranceAvg: 2110,   // NerdWallet 2026 Avg
  closingCosts: { 
    feesPct: 0.020,     // 2% Fees
    totalPct: 0.035     // 3.5% Cash to Close
  },
  refiAvgCost: 8500,
  notes: ["Fallback national averages used."]
};

export const getStateData = (stateCode) => {
  const code = (stateCode || "US").toUpperCase();
  return US_STATE_DATA[code] || NATIONAL_DEFAULT;
};

// Returns sorted array for Dropdowns
export const getStateOptions = () => {
  return Object.keys(US_STATE_DATA).map(key => ({
    value: key,
    label: US_STATE_DATA[key].name
  })).sort((a, b) => a.label.localeCompare(b.label));
};

// 🧮 LOGIC HELPERS

/**
 * Scales insurance based on home price, but dampens the curve.
 * Logic: Insurance doesn't double just because land value doubles.
 * We use a "Base + Rate" approach for more realism on high-value homes.
 */
export function estimateInsurance(stateCode, homePrice) {
  const data = getStateData(stateCode);
  const baseRate = data.insuranceAvg;
  
  // Pivot point: The average assumes a ~$350k home
  // If price is higher, we only scale by 60% of the difference (Land value doesn't burn)
  // If price is lower, we scale linearly down to a floor.
  let estimatedPremium;
  
  if (homePrice > INSURANCE_PIVOT_PRICE) {
    const excess = homePrice - INSURANCE_PIVOT_PRICE;
    estimatedPremium = baseRate + (excess * (baseRate / INSURANCE_PIVOT_PRICE) * 0.60);
  } else {
    estimatedPremium = baseRate * (homePrice / INSURANCE_PIVOT_PRICE);
  }

  // Hard floor: $500/yr min
  return Math.max(500, Math.round(estimatedPremium));
}

/**
 * Estimates strictly Lender/Title/Gov fees (Good for APR calc)
 */
export function estimateFees(stateCode, homePrice) {
  const data = getStateData(stateCode);
  return Math.round(homePrice * data.closingCosts.feesPct);
}

/**
 * Estimates total Cash to Close (Fees + Prepaids) - Conservative
 */
export function estimateCashToClose(stateCode, homePrice) {
  const data = getStateData(stateCode);
  return Math.round(homePrice * data.closingCosts.totalPct);
}