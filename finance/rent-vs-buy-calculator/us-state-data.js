// us-state-data.js
// DATA SOURCE: Hybrid 2025/2026 estimates (Aggregated from Gemini, Bankrate, Tax Foundation).
// PURPOSE: "Smart Defaults" for Rent vs. Buy Calculators.
// IMPORTANT: These defaults are intentionally conservative and directional. 
// They are designed to inform decisions, not replace actual loan estimates.

export const STATE_DATA = {
  "AL": { name: "Alabama", propertyTaxRate: 0.0041, insuranceMonthly: 200, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Low Cost", insuranceRisk: "Medium", notes: "Property taxes are among the lowest in the US." },
  "AK": { name: "Alaska", propertyTaxRate: 0.0119, insuranceMonthly: 110, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "Niche", insuranceRisk: "Low", notes: "No state income tax, but costs are higher due to logistics." },
  "AZ": { name: "Arizona", propertyTaxRate: 0.0062, insuranceMonthly: 195, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Hot", insuranceRisk: "Medium", notes: "Property taxes low, but prices have surged recently." },
  "AR": { name: "Arkansas", propertyTaxRate: 0.0061, insuranceMonthly: 260, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "High", notes: "Insurance rates rising due to severe storm risks." },
  "CA": { name: "California", propertyTaxRate: 0.0076, insuranceMonthly: 140, closingCostRate: 0.03, hasStateIncomeTax: true, marketVibe: "Aggressive", insuranceRisk: "High", notes: "Low tax RATE, but high PRICE. Warning: Transfer taxes can be huge." },
  "CO": { name: "Colorado", propertyTaxRate: 0.0049, insuranceMonthly: 285, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Hot", insuranceRisk: "High", notes: "Insurance premiums spiking due to wildfire/hail risk." },
  "CT": { name: "Connecticut", propertyTaxRate: 0.0216, insuranceMonthly: 145, closingCostRate: 0.03, hasStateIncomeTax: true, marketVibe: "Heavy Tax", insuranceRisk: "Low", notes: "Property taxes are very high here." },
  "DE": { name: "Delaware", propertyTaxRate: 0.0056, insuranceMonthly: 80, closingCostRate: 0.035, hasStateIncomeTax: true, marketVibe: "Tax Haven", insuranceRisk: "Low", notes: "High transfer taxes (3-4%) at closing, but low property tax." },
  "DC": { name: "District of Columbia", propertyTaxRate: 0.0057, insuranceMonthly: 125, closingCostRate: 0.04, hasStateIncomeTax: true, marketVibe: "Pricey", insuranceRisk: "Low", notes: "Closing costs are very high due to Recordation/Transfer taxes." },
  "FL": { name: "Florida", propertyTaxRate: 0.0086, insuranceMonthly: 486, closingCostRate: 0.025, hasStateIncomeTax: false, marketVibe: "Volatile", insuranceRisk: "Extreme", notes: "INSURANCE ALERT: Premiums are 3-4x national average." },
  "GA": { name: "Georgia", propertyTaxRate: 0.0090, insuranceMonthly: 170, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Hot", insuranceRisk: "Medium", notes: "Property assessments rising fast in metro Atlanta." },
  "HI": { name: "Hawaii", propertyTaxRate: 0.0028, insuranceMonthly: 110, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Luxury", insuranceRisk: "Low", notes: "Lowest property tax rate in US, but highest home prices." },
  "ID": { name: "Idaho", propertyTaxRate: 0.0063, insuranceMonthly: 120, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Cooling", insuranceRisk: "Low", notes: "Market cooling after massive 2020-2022 run up." },
  "IL": { name: "Illinois", propertyTaxRate: 0.0223, insuranceMonthly: 185, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Heavy Tax", insuranceRisk: "Medium", notes: "2nd highest property taxes in the nation." },
  "IN": { name: "Indiana", propertyTaxRate: 0.0081, insuranceMonthly: 140, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Low", notes: "Very stable market; affordable entry." },
  "IA": { name: "Iowa", propertyTaxRate: 0.0157, insuranceMonthly: 205, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Medium", notes: "Property taxes are relatively high for the region." },
  "KS": { name: "Kansas", propertyTaxRate: 0.0143, insuranceMonthly: 370, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Storm Risk", insuranceRisk: "Extreme", notes: "Insurance is high due to wind/hail risk." },
  "KY": { name: "Kentucky", propertyTaxRate: 0.0086, insuranceMonthly: 300, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "High", notes: "Moderate costs across the board." },
  "LA": { name: "Louisiana", propertyTaxRate: 0.0055, insuranceMonthly: 523, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Risk", insuranceRisk: "Extreme", notes: "INSURANCE ALERT: Highest premiums in US due to hurricane risk." },
  "ME": { name: "Maine", propertyTaxRate: 0.0130, insuranceMonthly: 105, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Seasonal", insuranceRisk: "Low", notes: "High demand for vacation homes affecting prices." },
  "MD": { name: "Maryland", propertyTaxRate: 0.0109, insuranceMonthly: 145, closingCostRate: 0.035, hasStateIncomeTax: true, marketVibe: "Pricey", insuranceRisk: "Low", notes: "Closing costs high due to transfer/recordation taxes." },
  "MA": { name: "Massachusetts", propertyTaxRate: 0.0123, insuranceMonthly: 145, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Aggressive", insuranceRisk: "Low", notes: "Inventory is extremely tight; prices high." },
  "MI": { name: "Michigan", propertyTaxRate: 0.0154, insuranceMonthly: 200, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Low", notes: "Property taxes are on the higher side." },
  "MN": { name: "Minnesota", propertyTaxRate: 0.0112, insuranceMonthly: 240, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Medium", notes: "Solid appreciation; moderate taxes." },
  "MS": { name: "Mississippi", propertyTaxRate: 0.0080, insuranceMonthly: 280, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Low Cost", insuranceRisk: "High", notes: "Low entry price, but insurance is rising." },
  "MO": { name: "Missouri", propertyTaxRate: 0.0097, insuranceMonthly: 185, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Medium", notes: "Very affordable average home price." },
  "MT": { name: "Montana", propertyTaxRate: 0.0084, insuranceMonthly: 235, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Booming", insuranceRisk: "Medium", notes: "Prices have surged due to out-of-state buyers." },
  "NE": { name: "Nebraska", propertyTaxRate: 0.0177, insuranceMonthly: 550, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "High Tax", insuranceRisk: "Extreme", notes: "High property tax + High insurance (Hail risk)." },
  "NV": { name: "Nevada", propertyTaxRate: 0.0060, insuranceMonthly: 90, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "Investor", insuranceRisk: "Low", notes: "No state income tax; popular with investors." },
  "NH": { name: "New Hampshire", propertyTaxRate: 0.0218, insuranceMonthly: 90, closingCostRate: 0.025, hasStateIncomeTax: false, marketVibe: "Tax Tradeoff", insuranceRisk: "Low", notes: "No income tax, but 3rd highest property tax in US." },
  "NJ": { name: "New Jersey", propertyTaxRate: 0.0249, insuranceMonthly: 105, closingCostRate: 0.03, hasStateIncomeTax: true, marketVibe: "Tax Heavy", insuranceRisk: "Low", notes: "#1 Highest property tax rate in America." },
  "NM": { name: "New Mexico", propertyTaxRate: 0.0080, insuranceMonthly: 185, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Medium", notes: "Property taxes are low; market is stable." },
  "NY": { name: "New York", propertyTaxRate: 0.0172, insuranceMonthly: 155, closingCostRate: 0.04, hasStateIncomeTax: true, marketVibe: "Complex", insuranceRisk: "Low", notes: "CLOSING COST ALERT: Mortgage tax + Mansion tax = Expensive closing." },
  "NC": { name: "North Carolina", propertyTaxRate: 0.0077, insuranceMonthly: 200, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Hot", insuranceRisk: "Medium", notes: "Balanced market, but Raleigh/Charlotte are pricey." },
  "ND": { name: "North Dakota", propertyTaxRate: 0.0093, insuranceMonthly: 230, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Energy", insuranceRisk: "Medium", notes: "Market fluctuates with oil prices." },
  "OH": { name: "Ohio", propertyTaxRate: 0.0157, insuranceMonthly: 115, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Low", notes: "Affordable, but property taxes are above average." },
  "OK": { name: "Oklahoma", propertyTaxRate: 0.0090, insuranceMonthly: 390, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Storm Risk", insuranceRisk: "Extreme", notes: "Insurance very high due to tornado alley risks." },
  "OR": { name: "Oregon", propertyTaxRate: 0.0097, insuranceMonthly: 95, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Constrained", insuranceRisk: "Low", notes: "Urban growth boundaries keep prices high." },
  "PA": { name: "Pennsylvania", propertyTaxRate: 0.0158, insuranceMonthly: 110, closingCostRate: 0.04, hasStateIncomeTax: true, marketVibe: "Fee Heavy", insuranceRisk: "Low", notes: "High transfer taxes in Philly/Pittsburgh areas." },
  "RI": { name: "Rhode Island", propertyTaxRate: 0.0163, insuranceMonthly: 200, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Coastal", insuranceRisk: "Medium", notes: "Older housing stock = higher maintenance likely." },
  "SC": { name: "South Carolina", propertyTaxRate: 0.0055, insuranceMonthly: 220, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Hot", insuranceRisk: "Medium", notes: "Very low property tax, but insurance is rising coastal." },
  "SD": { name: "South Dakota", propertyTaxRate: 0.0131, insuranceMonthly: 265, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "Quiet", insuranceRisk: "Medium", notes: "No state income tax." },
  "TN": { name: "Tennessee", propertyTaxRate: 0.0071, insuranceMonthly: 225, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "Booming", insuranceRisk: "Medium", notes: "No state income tax + Low property tax = High Demand." },
  "TX": { name: "Texas", propertyTaxRate: 0.0180, insuranceMonthly: 340, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "High Prop Tax", insuranceRisk: "High", notes: "No income tax, but Property Tax is ~1.8% (Very High)." },
  "UT": { name: "Utah", propertyTaxRate: 0.0063, insuranceMonthly: 110, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Expensive", insuranceRisk: "Low", notes: "Low taxes, but home prices have doubled in 5 years." },
  "VT": { name: "Vermont", propertyTaxRate: 0.0190, insuranceMonthly: 70, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Rural", insuranceRisk: "Low", notes: "High property taxes." },
  "VA": { name: "Virginia", propertyTaxRate: 0.0080, insuranceMonthly: 145, closingCostRate: 0.025, hasStateIncomeTax: true, marketVibe: "Stable", insuranceRisk: "Low", notes: "NOVA area is very expensive; rural VA is cheap." },
  "WA": { name: "Washington", propertyTaxRate: 0.0094, insuranceMonthly: 130, closingCostRate: 0.03, hasStateIncomeTax: false, marketVibe: "Tech Heavy", insuranceRisk: "Low", notes: "No income tax. High Transfer taxes on selling." },
  "WV": { name: "West Virginia", propertyTaxRate: 0.0058, insuranceMonthly: 90, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Value", insuranceRisk: "Low", notes: "Lowest home prices in the country." },
  "WI": { name: "Wisconsin", propertyTaxRate: 0.0185, insuranceMonthly: 110, closingCostRate: 0.02, hasStateIncomeTax: true, marketVibe: "Steady", insuranceRisk: "Low", notes: "Property taxes are high." },
  "WY": { name: "Wyoming", propertyTaxRate: 0.0061, insuranceMonthly: 110, closingCostRate: 0.02, hasStateIncomeTax: false, marketVibe: "Wealth", insuranceRisk: "Low", notes: "Tax haven. No income tax, very low property tax." }
};

/**
 * HELPER: getStateDefaults
 * Returns normalized numbers + qualitative flags for the UI.
 * Handles "Hybrid" logic for all 4 Modes.
 * * @param {string} stateCode - The 2-letter code (e.g. "TX")
 * @param {number} homePrice - The target home price (to calculate estimates)
 */
export function getStateDefaults(stateCode, homePrice = 400000) {
  // CONTRACT: marketVibe is QUALITATIVE ONLY. 
  // Do NOT use marketVibe for math or conditional logic. 
  // Intended for labels, tooltips, and framing copy only.

  // Default to National Average (US) if state not found
  const state = STATE_DATA[stateCode] || {
    name: "National Avg",
    propertyTaxRate: 0.011, 
    insuranceMonthly: 150, 
    closingCostRate: 0.024, 
    hasStateIncomeTax: true,
    marketVibe: "Average",
    insuranceRisk: "Medium",
    notes: "Using National Averages."
  };

  return {
    // Identity
    name: state.name,
    
    // Numeric Outputs (Math-ready)
    monthlyPropertyTax: Math.round((homePrice * state.propertyTaxRate) / 12),
    monthlyInsurance: state.insuranceMonthly,
    estimatedClosingCosts: Math.round(homePrice * state.closingCostRate),
    
    // Display Constants (For UI Placeholders)
    taxRateDisplay: (state.propertyTaxRate * 100).toFixed(2), // e.g. "1.80"
    
    // Logic Flags (For Toggles/Warnings)
    hasStateIncomeTax: state.hasStateIncomeTax, // RENAMED: Used in Mode 4 (Tax Benefit Reality)
    
    // UI "Vibe" Data
    marketVibe: state.marketVibe,       // Qualitative only
    insuranceRisk: state.insuranceRisk, // e.g. "Extreme" (Triggers Red Badge)
    marketNote: state.notes             // e.g. "INSURANCE ALERT..."
  };
}