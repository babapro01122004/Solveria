How is this hybrid :

/**

 * US STATE DATA & FEDERAL TAX ENGINE (2025-2026)

 * ------------------------------------------------

 * FILE: us-state-data.js

 * TYPE: Hybrid Dictionary (O(1) Lookup)

 *

 * DATA SOURCES:

 * - Federal Brackets: IRS Revenue Procedure 2024-40 (Tax Year 2025)

 * - Insurance: S&P Global & Bankrate (Jan 2026 Projections)

 * - Property Tax: Tax Foundation & Census Bureau Effective Rates

 *

 * NOTE:

 * - Income Tax 'topRate' is the top marginal rate. Used for conservative

 * "worst-case" cash flow planning.

 * - 'volatility' flag triggers UI nudges for high-variance regions.

 */



// ==========================================

// 1. FEDERAL TAX CONSTANTS (Tax Year 2025)

// ==========================================

export const FEDERAL_DATA_2025 = {

  standardDeduction: {

    single: 15750,

    married: 31500,

    headOfHousehold: 23625

  },

  brackets: {

    single: [

      { max: 11925, rate: 0.10 },

      { max: 48475, rate: 0.12 },

      { max: 103350, rate: 0.22 },

      { max: 197300, rate: 0.24 },

      { max: 250525, rate: 0.32 },

      { max: 626350, rate: 0.35 },

      { max: Infinity, rate: 0.37 }

    ],

    married: [

      { max: 23850, rate: 0.10 },

      { max: 96950, rate: 0.12 },

      { max: 206700, rate: 0.22 },

      { max: 394600, rate: 0.24 },

      { max: 501050, rate: 0.32 },

      { max: 751600, rate: 0.35 },

      { max: Infinity, rate: 0.37 }

    ],

    headOfHousehold: [

      { max: 17000, rate: 0.10 },

      { max: 64850, rate: 0.12 },

      { max: 103350, rate: 0.22 },

      { max: 197300, rate: 0.24 },

      { max: 250500, rate: 0.32 },

      { max: 626350, rate: 0.35 },

      { max: Infinity, rate: 0.37 }

    ]

  },

  fica: {

    socialSecurityRate: 0.062,

    medicareRate: 0.0145,

    socialSecurityCap: 176100 // 2025 Wage Base Limit

  }

};



// ==========================================

// 2. STATE SPECIFIC DATA (Dictionary)

// ==========================================



export const US_STATE_DATA = {

  AL: { name: "Alabama", incomeTax: { topRate: 0.05 }, propertyTax: { effectiveRate: 0.0039 }, insurance: { avgAnnual: 3114, volatility: "medium" }, notes: "Coastal risk factor included" },

  AK: { name: "Alaska", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0102 }, insurance: { avgAnnual: 1035, volatility: "low" }, notes: "High property tax offsets oil revenue dips" },

  AZ: { name: "Arizona", incomeTax: { topRate: 0.025 }, propertyTax: { effectiveRate: 0.0053 }, insurance: { avgAnnual: 2331, volatility: "medium" }, notes: "Insurance rising due to wildfire risk" },

  AR: { name: "Arkansas", incomeTax: { topRate: 0.044 }, propertyTax: { effectiveRate: 0.0064 }, insurance: { avgAnnual: 3287, volatility: "medium" }, notes: "High frequency of storm claims" },

  CA: { name: "California", incomeTax: { topRate: 0.144 }, propertyTax: { effectiveRate: 0.0071 }, insurance: { avgAnnual: 1641, volatility: "high" }, notes: "Prop 13 limits tax; Insurance difficult to secure" },

  CO: { name: "Colorado", incomeTax: { topRate: 0.044 }, propertyTax: { effectiveRate: 0.0052 }, insurance: { avgAnnual: 3412, volatility: "high" }, notes: "Insurance high due to hail/fire risk" },

  CT: { name: "Connecticut", incomeTax: { topRate: 0.0699 }, propertyTax: { effectiveRate: 0.0179 }, insurance: { avgAnnual: 1700, volatility: "low" }, notes: "Consistently high property tax region" },

  DE: { name: "Delaware", incomeTax: { topRate: 0.066 }, propertyTax: { effectiveRate: 0.0059 }, insurance: { avgAnnual: 966, volatility: "low" }, notes: "Low property tax is a primary draw" },

  DC: { name: "District of Columbia", incomeTax: { topRate: 0.1075 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1250, volatility: "low" }, notes: "Urban density affects rates" },

  FL: { name: "Florida", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0086 }, insurance: { avgAnnual: 5838, volatility: "extreme" }, notes: "Insurance crisis; rates extremely volatile" },

  GA: { name: "Georgia", incomeTax: { topRate: 0.0549 }, propertyTax: { effectiveRate: 0.0091 }, insurance: { avgAnnual: 2041, volatility: "medium" }, notes: "Moderate rates across board" },

  HI: { name: "Hawaii", incomeTax: { topRate: 0.11 }, propertyTax: { effectiveRate: 0.0031 }, insurance: { avgAnnual: 1296, volatility: "low" }, notes: "Lowest property tax rate, high home values" },

  ID: { name: "Idaho", incomeTax: { topRate: 0.058 }, propertyTax: { effectiveRate: 0.0067 }, insurance: { avgAnnual: 1409, volatility: "medium" }, notes: "Rapidly growing assessment values" },

  IL: { name: "Illinois", incomeTax: { topRate: 0.0495 }, propertyTax: { effectiveRate: 0.0208 }, insurance: { avgAnnual: 2225, volatility: "low" }, notes: "2nd highest property tax in nation" },

  IN: { name: "Indiana", incomeTax: { topRate: 0.0305 }, propertyTax: { effectiveRate: 0.0083 }, insurance: { avgAnnual: 1666, volatility: "low" }, notes: "Capped property taxes" },

  IA: { name: "Iowa", incomeTax: { topRate: 0.057 }, propertyTax: { effectiveRate: 0.0152 }, insurance: { avgAnnual: 2446, volatility: "medium" }, notes: "High property tax relative to home value" },

  KS: { name: "Kansas", incomeTax: { topRate: 0.057 }, propertyTax: { effectiveRate: 0.0134 }, insurance: { avgAnnual: 4444, volatility: "high" }, notes: "Tornado alley risk drives insurance" },

  KY: { name: "Kentucky", incomeTax: { topRate: 0.04 }, propertyTax: { effectiveRate: 0.0083 }, insurance: { avgAnnual: 3540, volatility: "medium" }, notes: "Insurance high due to recent flood data" },

  LA: { name: "Louisiana", incomeTax: { topRate: 0.0425 }, propertyTax: { effectiveRate: 0.0056 }, insurance: { avgAnnual: 6274, volatility: "extreme" }, notes: "Highest insurance costs in nation (Hurricane risk)" },

  ME: { name: "Maine", incomeTax: { topRate: 0.0715 }, propertyTax: { effectiveRate: 0.0124 }, insurance: { avgAnnual: 1219, volatility: "medium" }, notes: "Coastal properties see higher insurance" },

  MD: { name: "Maryland", incomeTax: { topRate: 0.0575 }, propertyTax: { effectiveRate: 0.0105 }, insurance: { avgAnnual: 1751, volatility: "low" }, notes: "High local income taxes common" },

  MA: { name: "Massachusetts", incomeTax: { topRate: 0.05 }, propertyTax: { effectiveRate: 0.0114 }, insurance: { avgAnnual: 1733, volatility: "low" }, notes: "Sur-tax on earners >$1M" },

  MI: { name: "Michigan", incomeTax: { topRate: 0.0425 }, propertyTax: { effectiveRate: 0.0138 }, insurance: { avgAnnual: 2368, volatility: "medium" }, notes: "Auto insurance also high here" },

  MN: { name: "Minnesota", incomeTax: { topRate: 0.0985 }, propertyTax: { effectiveRate: 0.0111 }, insurance: { avgAnnual: 2852, volatility: "low" }, notes: "High tax state generally" },

  MS: { name: "Mississippi", incomeTax: { topRate: 0.047 }, propertyTax: { effectiveRate: 0.0079 }, insurance: { avgAnnual: 3353, volatility: "high" }, notes: "High insurance due to wind risk" },

  MO: { name: "Missouri", incomeTax: { topRate: 0.048 }, propertyTax: { effectiveRate: 0.0096 }, insurance: { avgAnnual: 2191, volatility: "medium" }, notes: "Average rates" },

  MT: { name: "Montana", incomeTax: { topRate: 0.059 }, propertyTax: { effectiveRate: 0.0074 }, insurance: { avgAnnual: 2801, volatility: "medium" }, notes: "Property taxes rising with influx of buyers" },

  NE: { name: "Nebraska", incomeTax: { topRate: 0.0584 }, propertyTax: { effectiveRate: 0.0163 }, insurance: { avgAnnual: 6587, volatility: "high" }, notes: "Hail damage drives massive insurance premiums" },

  NV: { name: "Nevada", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0059 }, insurance: { avgAnnual: 1074, volatility: "low" }, notes: "Gaming revenue subsidizes tax base" },

  NH: { name: "New Hampshire", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0193 }, insurance: { avgAnnual: 1039, volatility: "low" }, notes: "3rd highest property tax, but no income tax" },

  NJ: { name: "New Jersey", incomeTax: { topRate: 0.1075 }, propertyTax: { effectiveRate: 0.0223 }, insurance: { avgAnnual: 1214, volatility: "low" }, notes: "Highest Property Tax in USA" },

  NM: { name: "New Mexico", incomeTax: { topRate: 0.059 }, propertyTax: { effectiveRate: 0.0073 }, insurance: { avgAnnual: 2179, volatility: "medium" }, notes: "Wildfire risk increasing rates" },

  NY: { name: "New York", incomeTax: { topRate: 0.109 }, propertyTax: { effectiveRate: 0.0164 }, insurance: { avgAnnual: 1860, volatility: "low" }, notes: "Upstate vs City variance is massive" },

  NC: { name: "North Carolina", incomeTax: { topRate: 0.045 }, propertyTax: { effectiveRate: 0.0082 }, insurance: { avgAnnual: 2951, volatility: "medium" }, notes: "Coastal zones pay significantly more" },

  ND: { name: "North Dakota", incomeTax: { topRate: 0.025 }, propertyTax: { effectiveRate: 0.0098 }, insurance: { avgAnnual: 2776, volatility: "low" }, notes: "Oil revenue helps keep taxes lower" },

  OH: { name: "Ohio", incomeTax: { topRate: 0.035 }, propertyTax: { effectiveRate: 0.0159 }, insurance: { avgAnnual: 1364, volatility: "low" }, notes: "Affordable housing/insurance market" },

  OK: { name: "Oklahoma", incomeTax: { topRate: 0.0475 }, propertyTax: { effectiveRate: 0.0089 }, insurance: { avgAnnual: 4695, volatility: "high" }, notes: "Weather risk drives high insurance" },

  OR: { name: "Oregon", incomeTax: { topRate: 0.099 }, propertyTax: { effectiveRate: 0.0093 }, insurance: { avgAnnual: 1091, volatility: "low" }, notes: "High income tax, no sales tax" },

  PA: { name: "Pennsylvania", incomeTax: { topRate: 0.0307 }, propertyTax: { effectiveRate: 0.0150 }, insurance: { avgAnnual: 1278, volatility: "low" }, notes: "School district taxes vary wildy" },

  RI: { name: "Rhode Island", incomeTax: { topRate: 0.0599 }, propertyTax: { effectiveRate: 0.0153 }, insurance: { avgAnnual: 2347, volatility: "medium" }, notes: "Coastal density affects insurance" },

  SC: { name: "South Carolina", incomeTax: { topRate: 0.064 }, propertyTax: { effectiveRate: 0.0055 }, insurance: { avgAnnual: 2611, volatility: "medium" }, notes: "Low property tax for primary residents" },

  SD: { name: "South Dakota", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0122 }, insurance: { avgAnnual: 3152, volatility: "medium" }, notes: "Weather claims drive insurance up" },

  TN: { name: "Tennessee", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0067 }, insurance: { avgAnnual: 2672, volatility: "low" }, notes: "Low tax burden overall" },

  TX: { name: "Texas", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0163 }, insurance: { avgAnnual: 5045, volatility: "extreme" }, notes: "High property tax offsets no income tax" },

  UT: { name: "Utah", incomeTax: { topRate: 0.0465 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1283, volatility: "low" }, notes: "Fast growing home values" },

  VT: { name: "Vermont", incomeTax: { topRate: 0.0875 }, propertyTax: { effectiveRate: 0.0183 }, insurance: { avgAnnual: 827, volatility: "low" }, notes: "Very low insurance risk" },

  VA: { name: "Virginia", incomeTax: { topRate: 0.0575 }, propertyTax: { effectiveRate: 0.0087 }, insurance: { avgAnnual: 1706, volatility: "low" }, notes: "Car tax is distinct from property tax" },

  WA: { name: "Washington", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0087 }, insurance: { avgAnnual: 1539, volatility: "low" }, notes: "High sales tax state" },

  WV: { name: "West Virginia", incomeTax: { topRate: 0.0512 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1650, volatility: "low" }, notes: "Low cost of living baseline" },

  WI: { name: "Wisconsin", incomeTax: { topRate: 0.0765 }, propertyTax: { effectiveRate: 0.0161 }, insurance: { avgAnnual: 1400, volatility: "low" }, notes: "High property taxes" },

  WY: { name: "Wyoming", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0056 }, insurance: { avgAnnual: 1300, volatility: "low" }, notes: "Mineral wealth offsets taxes" }

};



// ==========================================

// 3. LOGIC ENGINES

// ==========================================



// Helper: Calculate Federal Income Tax (Progressive)

export function getFederalTax(taxableIncome, filingStatus) {

  let tax = 0;

  // Map UI status to Data Key

  const statusKey = filingStatus === 'joint' ? 'married' : filingStatus === 'head' ? 'headOfHousehold' : 'single';

  const brackets = FEDERAL_DATA_2025.brackets[statusKey];

  

  let previousMax = 0;

  

  for (const bracket of brackets) {

    if (taxableIncome > previousMax) {

      const taxableAmount = Math.min(taxableIncome, bracket.max) - previousMax;

      tax += taxableAmount * bracket.rate;

      previousMax = bracket.max;

    } else {

      break;

    }

  }

  return tax;

}



// Helper: Get specific state object by Code

export function getStateDefaults(code) {

  return US_STATE_DATA[code] || US_STATE_DATA["CA"]; // Default Fallback to CA if undefined

}