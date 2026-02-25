/**
 * HYBRID³ — MASTER STATE DATA (2025–2026 CALIBRATED)
 * ------------------------------------------------------------------
 * A factors-based approach to estimating housing costs.
 * 
 * DATA DEFINITIONS:
 * 
 * 1. taxRate (Decimal): 
 *    Effective Real Estate Tax Rate (% of Home Value / Year).
 *    Source: Tax Foundation & Census Bureau effective rate analysis.
 * 
 * 2. insFactor (Decimal): 
 *    Home Insurance Premium (% of Home Value / Year).
 *    *NORMALIZED* into tiers to prevent math breakage on high-value homes:
 *    - Low Risk: ~0.30% (CA, WA)
 *    - Avg Risk: ~0.55% (National Avg)
 *    - High Risk: ~0.90% (Midwest storm belts)
 *    - Crisis Risk: ~1.35% (FL, OK, LA - Climate/Market distortion)
 * 
 * 3. closingFactor (Decimal): 
 *    Estimated Cash to Close + Transfer Taxes (% of Purchase Price).
 *    Standard is ~2-3%. States like DE, NY, PA, MD are higher 
 *    due to specific Transfer/Recordation taxes.
 * ------------------------------------------------------------------
 */

const US_STATE_DATA = {
  "AL": { name: "Alabama", taxRate: 0.0041, insFactor: 0.0075, closingFactor: 0.013 },
  "AK": { name: "Alaska", taxRate: 0.0119, insFactor: 0.0045, closingFactor: 0.011 },
  "AZ": { name: "Arizona", taxRate: 0.0062, insFactor: 0.0055, closingFactor: 0.012 },
  "AR": { name: "Arkansas", taxRate: 0.0062, insFactor: 0.0090, closingFactor: 0.015 },
  "CA": { name: "California", taxRate: 0.0076, insFactor: 0.0030, closingFactor: 0.011 }, // Prop 13 + Low Ins relative to high home values
  "CO": { name: "Colorado", taxRate: 0.0049, insFactor: 0.0065, closingFactor: 0.008 },
  "CT": { name: "Connecticut", taxRate: 0.0214, insFactor: 0.0045, closingFactor: 0.021 },
  "DE": { name: "Delaware", taxRate: 0.0057, insFactor: 0.0035, closingFactor: 0.040 }, // High Transfer Tax state
  "DC": { name: "District of Columbia", taxRate: 0.0057, insFactor: 0.0035, closingFactor: 0.035 }, // High Transfer Tax
  "FL": { name: "Florida", taxRate: 0.0089, insFactor: 0.0135, closingFactor: 0.023 }, // Insurance Crisis Tier
  "GA": { name: "Georgia", taxRate: 0.0091, insFactor: 0.0070, closingFactor: 0.015 },
  "HI": { name: "Hawaii", taxRate: 0.0028, insFactor: 0.0020, closingFactor: 0.012 },
  "ID": { name: "Idaho", taxRate: 0.0069, insFactor: 0.0040, closingFactor: 0.011 },
  "IL": { name: "Illinois", taxRate: 0.0227, insFactor: 0.0065, closingFactor: 0.022 },
  "IN": { name: "Indiana", taxRate: 0.0085, insFactor: 0.0075, closingFactor: 0.010 },
  "IA": { name: "Iowa", taxRate: 0.0157, insFactor: 0.0080, closingFactor: 0.012 },
  "KS": { name: "Kansas", taxRate: 0.0141, insFactor: 0.0100, closingFactor: 0.010 }, // High Wind/Hail
  "KY": { name: "Kentucky", taxRate: 0.0086, insFactor: 0.0080, closingFactor: 0.013 },
  "LA": { name: "Louisiana", taxRate: 0.0055, insFactor: 0.0140, closingFactor: 0.019 }, // Hurricane/Flood Tier
  "ME": { name: "Maine", taxRate: 0.0130, insFactor: 0.0040, closingFactor: 0.013 },
  "MD": { name: "Maryland", taxRate: 0.0109, insFactor: 0.0045, closingFactor: 0.035 }, // Transfer Tax state
  "MA": { name: "Massachusetts", taxRate: 0.0123, insFactor: 0.0035, closingFactor: 0.014 },
  "MI": { name: "Michigan", taxRate: 0.0154, insFactor: 0.0065, closingFactor: 0.018 },
  "MN": { name: "Minnesota", taxRate: 0.0112, insFactor: 0.0065, closingFactor: 0.015 },
  "MS": { name: "Mississippi", taxRate: 0.0081, insFactor: 0.0095, closingFactor: 0.011 },
  "MO": { name: "Missouri", taxRate: 0.0097, insFactor: 0.0085, closingFactor: 0.009 },
  "MT": { name: "Montana", taxRate: 0.0084, insFactor: 0.0055, closingFactor: 0.010 },
  "NE": { name: "Nebraska", taxRate: 0.0177, insFactor: 0.0105, closingFactor: 0.013 }, // Wind/Hail
  "NV": { name: "Nevada", taxRate: 0.0060, insFactor: 0.0035, closingFactor: 0.014 },
  "NH": { name: "New Hampshire", taxRate: 0.0218, insFactor: 0.0030, closingFactor: 0.020 },
  "NJ": { name: "New Jersey", taxRate: 0.0249, insFactor: 0.0035, closingFactor: 0.022 }, // High Tax Tier
  "NM": { name: "New Mexico", taxRate: 0.0080, insFactor: 0.0045, closingFactor: 0.011 },
  "NY": { name: "New York", taxRate: 0.0172, insFactor: 0.0045, closingFactor: 0.038 }, // Mortgage Tax + Transfer Tax
  "NC": { name: "North Carolina", taxRate: 0.0077, insFactor: 0.0065, closingFactor: 0.012 },
  "ND": { name: "North Dakota", taxRate: 0.0093, insFactor: 0.0075, closingFactor: 0.011 },
  "OH": { name: "Ohio", taxRate: 0.0157, insFactor: 0.0065, closingFactor: 0.016 },
  "OK": { name: "Oklahoma", taxRate: 0.0090, insFactor: 0.0135, closingFactor: 0.014 }, // Highest Hail/Wind Risk
  "OR": { name: "Oregon", taxRate: 0.0097, insFactor: 0.0035, closingFactor: 0.010 },
  "PA": { name: "Pennsylvania", taxRate: 0.0158, insFactor: 0.0045, closingFactor: 0.041 }, // High Transfer Tax
  "RI": { name: "Rhode Island", taxRate: 0.0163, insFactor: 0.0045, closingFactor: 0.013 },
  "SC": { name: "South Carolina", taxRate: 0.0057, insFactor: 0.0070, closingFactor: 0.013 },
  "SD": { name: "South Dakota", taxRate: 0.0131, insFactor: 0.0080, closingFactor: 0.010 },
  "TN": { name: "Tennessee", taxRate: 0.0071, insFactor: 0.0070, closingFactor: 0.014 },
  "TX": { name: "Texas", taxRate: 0.0180, insFactor: 0.0135, closingFactor: 0.015 }, // High Tax + High Ins
  "UT": { name: "Utah", taxRate: 0.0063, insFactor: 0.0035, closingFactor: 0.010 },
  "VT": { name: "Vermont", taxRate: 0.0190, insFactor: 0.0035, closingFactor: 0.021 },
  "VA": { name: "Virginia", taxRate: 0.0082, insFactor: 0.0050, closingFactor: 0.016 },
  "WA": { name: "Washington", taxRate: 0.0094, insFactor: 0.0035, closingFactor: 0.018 },
  "WV": { name: "West Virginia", taxRate: 0.0058, insFactor: 0.0080, closingFactor: 0.021 },
  "WI": { name: "Wisconsin", taxRate: 0.0185, insFactor: 0.0045, closingFactor: 0.012 },
  "WY": { name: "Wyoming", taxRate: 0.0061, insFactor: 0.0045, closingFactor: 0.009 },

  // Safety Fallback
  "US_AVG": { name: "National Average", taxRate: 0.011, insFactor: 0.0055, closingFactor: 0.018 }
};

// Universal Export (Node.js or Browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = US_STATE_DATA;
} else if (typeof window !== 'undefined') {
  window.US_STATE_DATA = US_STATE_DATA;
}