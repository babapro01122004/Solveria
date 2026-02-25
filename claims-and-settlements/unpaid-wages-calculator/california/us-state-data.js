How is this :

/**

 * ============================================================

 * THE ARC REACTOR — US LABOR LAW DATASET (HYBRID)

 * ============================================================

 * Frontend-only dataset for the Unpaid Wages Calculator.

 *

 * DESIGN PRINCIPLES

 * ------------------------------------------------------------

 * 1. FAIL-SAFE:

 * Missing or partial state data falls back to Federal FLSA.

 *

 * 2. OPINIONATED SIMPLICITY:

 * Complex edge cases are reduced to binary flags

 * (e.g., otType: 'daily' vs 'weekly') to keep math stable.

 *

 * 3. MODE-READY:

 * - Mode A: Overtime engine & confidence indicators

 * - Mode B: Penalty exposure & statute awareness

 *

 * IMPORTANT LIMITS

 * ------------------------------------------------------------

 * - Minimum wages are based on approximate 2024/2025 standards.

 * - No city/county specific rules (e.g., NYC vs NYS).

 * - Designed for ESTIMATES, not legal conclusions.

 *

 * Usage:

 * import { getStateData } from './us-state-data.js';

 * const state = getStateData('CA');

 * ============================================================

 */



/* ============================================================

   FEDERAL BASELINE (FLSA DEFAULTS)

   ============================================================ */



const FEDERAL_DEFAULTS = {

  minWage: 7.25,

  otType: "weekly",          // >40 hours/week

  dailyThreshold: null,      // No daily OT limit

  weeklyThreshold: 40,

  statuteYears: 2,           // Standard lookback (3 for willful)

  waitingPenalty: false,     // FLSA has no specific waiting time penalty

  protectionLevel: "Federal Base",

  notes: "Applies federal FLSA standards."

};



/* ============================================================

   STATE LABOR DATA

   ============================================================ */



const STATE_LABOR_DATA = {



  /* ----------------------------------------------------------

     TIER 1 — DAILY OVERTIME STATES

     (Must activate Daily OT Engine)

     ---------------------------------------------------------- */



  AK: {

    name: "Alaska",

    protectionLevel: "High",

    minWage: 11.73,

    otType: "daily",

    dailyThreshold: 8,

    statuteYears: 2,

    waitingPenalty: true,

    notes: "OT required after 8 hours/day or 40 hours/week."

  },



  CA: {

    name: "California",

    protectionLevel: "High",

    minWage: 16.00,

    otType: "daily",

    dailyThreshold: 8,

    statuteYears: 3,

    waitingPenalty: true,

    notes: "Daily OT >8h, Double time >12h. Strong waiting penalties."

  },



  CO: {

    name: "Colorado",

    protectionLevel: "Moderate",

    minWage: 14.42,

    otType: "daily",

    dailyThreshold: 12,

    statuteYears: 2, // Can vary, but 2-3 is standard

    waitingPenalty: true,

    notes: "Daily OT triggers after 12 hours, not 8."

  },



  NV: {

    name: "Nevada",

    protectionLevel: "Moderate",

    minWage: 12.00,

    otType: "daily",

    dailyThreshold: 8,

    statuteYears: 2,

    waitingPenalty: true,

    notes: "Daily OT applies if earning less than 1.5x min wage."

  },



  /* ----------------------------------------------------------

     TIER 2 — HIGH STATUTE / STRONG ENFORCEMENT

     (Weekly OT, but high recovery leverage)

     ---------------------------------------------------------- */



  NY: {

    name: "New York",

    protectionLevel: "High",

    minWage: 15.00,

    otType: "weekly",

    statuteYears: 6,

    waitingPenalty: false,

    notes: "6-year lookback is a major advantage for workers."

  },



  OR: {

    name: "Oregon",

    protectionLevel: "High",

    minWage: 14.20,

    otType: "weekly",

    statuteYears: 6,

    waitingPenalty: true,

    notes: "Strong final paycheck penalties (up to 30 days wages)."

  },



  WA: {

    name: "Washington",

    protectionLevel: "High",

    minWage: 16.28,

    otType: "weekly",

    statuteYears: 3,

    waitingPenalty: false,

    notes: "One of the highest state minimum wages."

  },



  MA: {

    name: "Massachusetts",

    protectionLevel: "High",

    minWage: 15.00,

    otType: "weekly",

    statuteYears: 3,

    waitingPenalty: true,

    notes: "Treble (3x) damages available for violations."

  },



  ME: { name: "Maine", protectionLevel: "High", minWage: 14.15, otType: "weekly", statuteYears: 6, waitingPenalty: true },

  KY: { name: "Kentucky", protectionLevel: "Moderate", minWage: 7.25, otType: "weekly", statuteYears: 5, waitingPenalty: false },

  NM: { name: "New Mexico", protectionLevel: "Moderate", minWage: 12.00, otType: "weekly", statuteYears: 3, waitingPenalty: true },



  /* ----------------------------------------------------------

     TIER 3 — FEDERAL / STANDARD STATES

     (Weekly OT > 40, 2-3 Year Statute)

     ---------------------------------------------------------- */



  AL: { name: "Alabama", minWage: 7.25, protectionLevel: "Federal Base" },

  AZ: { name: "Arizona", minWage: 14.35, protectionLevel: "Moderate", waitingPenalty: true },

  AR: { name: "Arkansas", minWage: 11.00, protectionLevel: "Federal Base", waitingPenalty: true },

  CT: { name: "Connecticut", minWage: 15.69, protectionLevel: "High", waitingPenalty: true },

  DE: { name: "Delaware", minWage: 13.25, protectionLevel: "Moderate", waitingPenalty: true },

  DC: { name: "District of Columbia", minWage: 17.00, protectionLevel: "High", statuteYears: 3, waitingPenalty: true },

  FL: { name: "Florida", minWage: 13.00, protectionLevel: "Federal Base" },

  GA: { name: "Georgia", minWage: 7.25, protectionLevel: "Federal Base" },

  HI: { name: "Hawaii", minWage: 14.00, protectionLevel: "Moderate", statuteYears: 6, waitingPenalty: true },

  ID: { name: "Idaho", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  IL: { name: "Illinois", minWage: 14.00, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },

  IN: { name: "Indiana", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  IA: { name: "Iowa", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  KS: { name: "Kansas", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  LA: { name: "Louisiana", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  MD: { name: "Maryland", minWage: 15.00, protectionLevel: "Moderate", statuteYears: 3 },

  MI: { name: "Michigan", minWage: 10.33, protectionLevel: "Moderate", statuteYears: 3 },

  MN: { name: "Minnesota", minWage: 10.85, protectionLevel: "Moderate", weeklyThreshold: 48, waitingPenalty: true, notes: "OT starts at 48h for some state laws." },

  MS: { name: "Mississippi", minWage: 7.25, protectionLevel: "Federal Base" },

  MO: { name: "Missouri", minWage: 12.30, protectionLevel: "Moderate", waitingPenalty: true },

  MT: { name: "Montana", minWage: 10.30, protectionLevel: "Federal Base", waitingPenalty: true },

  NE: { name: "Nebraska", minWage: 12.00, protectionLevel: "Federal Base" },

  NH: { name: "New Hampshire", minWage: 7.25, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },

  NJ: { name: "New Jersey", minWage: 15.13, protectionLevel: "High", waitingPenalty: false },

  NC: { name: "North Carolina", minWage: 7.25, protectionLevel: "Federal Base" },

  ND: { name: "North Dakota", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  OH: { name: "Ohio", minWage: 10.45, protectionLevel: "Moderate" },

  OK: { name: "Oklahoma", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  PA: { name: "Pennsylvania", minWage: 7.25, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },

  RI: { name: "Rhode Island", minWage: 14.00, protectionLevel: "High", statuteYears: 3, waitingPenalty: true },

  SC: { name: "South Carolina", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  SD: { name: "South Dakota", minWage: 11.20, protectionLevel: "Federal Base" },

  TN: { name: "Tennessee", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  TX: { name: "Texas", minWage: 7.25, protectionLevel: "Federal Base" },

  UT: { name: "Utah", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  VT: { name: "Vermont", minWage: 13.67, protectionLevel: "Moderate", waitingPenalty: true },

  VA: { name: "Virginia", minWage: 12.00, protectionLevel: "Moderate", statuteYears: 3 },

  WV: { name: "West Virginia", minWage: 8.75, protectionLevel: "Federal Base", waitingPenalty: true },

  WI: { name: "Wisconsin", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },

  WY: { name: "Wyoming", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true }

};



/* ============================================================

   HELPER — SAFE STATE LOOKUP

   ============================================================ */



/**

 * Returns a valid State Object merging Federal defaults.

 * @param {string} stateCode - Two letter code (e.g. 'CA', 'NY')

 * @returns {Object} Full state configuration object

 */

export function getStateData(stateCode) {

  // 1. Normalize Input

  const code = stateCode ? stateCode.toUpperCase() : "UNKNOWN";

  

  // 2. Lookup State

  const state = STATE_LABOR_DATA[code];



  // 3. Fallback logic: If state doesn't exist, return defaults + name

  if (!state) {

    return {

      ...FEDERAL_DEFAULTS,

      code: code,

      name: code || "Unknown State"

    };

  }



  // 4. Merge logic: Overlay state specifics on top of federal defaults

  // This ensures properties like 'waitingPenalty' exist even if the state object didn't strictly define them.

  return {

    ...FEDERAL_DEFAULTS,

    ...state,

    code: code

  };

}



export default STATE_LABOR_DATA;