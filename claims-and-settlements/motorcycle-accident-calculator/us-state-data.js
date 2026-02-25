How is this :
/**
 * MOTORCYCLE INCIDENT TOOL — HYBRID STATE ENGINE (2025.2)
 * -------------------------------------------------------
 * A comprehensive legal dataset for frontend logic.
 * * UPDATES INCLUDED:
 * - MN Lane Filtering (Effective July 2025)
 * - FL Statute of Limitations (Reduced to 2 Years)
 * - VA/NC Insurance Limit Increases
 * - CO Lane Filtering Rules
 *
 * ⚠️ DISCLAIMER: For estimation purposes only. Not legal advice.
 */

/* ==========================================
   1. ENUM DEFINITIONS (The "Rules")
   ========================================== */

export const FAULT_RULES = {
  PURE: "pure",         // Plaintiff recovers even if 99% at fault (CA, NY, FL)
  MOD_51: "mod_51",     // Barred if fault is > 50% (TX, IL)
  MOD_50: "mod_50",     // Barred if fault is >= 50% (CO, GA)
  CONTRIB: "contrib",   // Barred if fault is >= 1% (AL, NC, VA, MD, DC)
  SLIGHT: "slight"      // Barred if fault is more than "slight" (SD only)
};

export const HELMET_LAWS = {
  UNIVERSAL: "universal", // All riders must wear
  AGE: "age",             // Required for specific ages (usually <18 or <21)
  NONE: "none"            // No law for adults (IL, IA, NH)
};

export const LANE_RULES = {
  LEGAL: "legal",       // Fully legal (CA)
  FILTERING: "filtering", // Legal in stopped/slow traffic (AZ, UT, MT, CO, MN)
  ILLEGAL: "illegal"    // Ticketable offense
};

/* ==========================================
   2. THE MASTER DATASET (50 States + DC)
   ========================================== */

export const STATE_DATA = {
  AL: { name: "Alabama", sol: 2, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "Strict Contributory Negligence." },
  AK: { name: "Alaska", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100], notes: "High insurance minimums." },
  AZ: { name: "Arizona", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50], notes: "Filtering legal if stopped & traffic < 45mph." },
  AR: { name: "Arkansas", sol: 3, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  CA: { name: "California", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.LEGAL, insurance: [15, 30], notes: "Lane splitting fully legal." },
  CO: { name: "Colorado", sol: 3, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50], notes: "Filtering legal in stopped traffic." },
  CT: { name: "Connecticut", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  DE: { name: "Delaware", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  DC: { name: "District of Columbia", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "Strict Contributory Negligence." },
  FL: { name: "Florida", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [10, 20], notes: "SOL reduced to 2 years (Tort Reform)." },
  GA: { name: "Georgia", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  HI: { name: "Hawaii", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [20, 40], notes: "" },
  ID: { name: "Idaho", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  IL: { name: "Illinois", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "No helmet law for adults." },
  IN: { name: "Indiana", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  IA: { name: "Iowa", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [20, 40], notes: "No helmet law for adults." },
  KS: { name: "Kansas", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  KY: { name: "Kentucky", sol: 1, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "URGENT: 1-Year Filing Deadline." },
  LA: { name: "Louisiana", sol: 1, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [15, 30], notes: "URGENT: 1-Year Filing Deadline." },
  ME: { name: "Maine", sol: 6, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100], notes: "Generous 6-year filing window." },
  MD: { name: "Maryland", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [30, 60], notes: "Strict Contributory Negligence." },
  MA: { name: "Massachusetts", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [20, 40], notes: "" },
  MI: { name: "Michigan", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100], notes: "Complex No-Fault (PIP) rules." },
  MN: { name: "Minnesota", sol: 6, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [30, 60], notes: "Lane filtering LEGAL as of July 2025." },
  MS: { name: "Mississippi", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  MO: { name: "Missouri", sol: 5, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  MT: { name: "Montana", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50], notes: "Lane filtering is legal." },
  NE: { name: "Nebraska", sol: 4, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  NV: { name: "Nevada", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  NH: { name: "New Hampshire", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "No helmet law for adults." },
  NJ: { name: "New Jersey", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [15, 30], notes: "" },
  NM: { name: "New Mexico", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  NY: { name: "New York", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "Universal helmet law." },
  NC: { name: "North Carolina", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [50, 100], notes: "Limits raised to 50/100. Strict Contrib." },
  ND: { name: "North Dakota", sol: 6, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  OH: { name: "Ohio", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  OK: { name: "Oklahoma", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  OR: { name: "Oregon", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  PA: { name: "Pennsylvania", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [15, 30], notes: "" },
  RI: { name: "Rhode Island", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  SC: { name: "South Carolina", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  SD: { name: "South Dakota", sol: 3, fault: FAULT_RULES.SLIGHT, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "Unique 'Slight vs Gross' negligence rule." },
  TN: { name: "Tennessee", sol: 1, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "URGENT: 1-Year Filing Deadline." },
  TX: { name: "Texas", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [30, 60], notes: "" },
  UT: { name: "Utah", sol: 4, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [30, 65], notes: "Lane filtering legal." },
  VT: { name: "Vermont", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  VA: { name: "Virginia", sol: 2, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [50, 100], notes: "Strict Contrib. Limits raised to 50/100." },
  WA: { name: "Washington", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  WV: { name: "West Virginia", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  WI: { name: "Wisconsin", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" },
  WY: { name: "Wyoming", sol: 4, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50], notes: "" }
};

/* ==========================================
   3. RISK GROUPS & HELPERS (The "Brain")
   ========================================== */

/**
 * States where 1% user fault can destroy the entire case.
 */
const CONTRIBUTORY_STATES = ["AL", "DC", "MD", "NC", "VA"];

/**
 * States with a 1-year filing deadline (Urgent Red Flag).
 */
const CRITICAL_SOL_STATES = ["KY", "LA", "TN"];

/**
 * Helper to get days remaining.
 * @param {string} accidentDate - YYYY-MM-DD
 * @param {number} solYears - Statute of Limitations in years
 */
export function calculateDeadline(accidentDate, solYears) {
  const accDate = new Date(accidentDate);
  const deadline = new Date(accDate);
  deadline.setFullYear(deadline.getFullYear() + solYears);
  
  const today = new Date();
  const diffTime = Math.abs(deadline - today);
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return {
    deadlineDate: deadline.toLocaleDateString(),
    daysRemaining: deadline < today ? 0 : daysRemaining,
    isExpired: deadline < today
  };
}

/**
 * Generates HTML-ready warnings based on State + User Input.
 */
export const WARNING_GENERATOR = {
  
  // Trigger if User Fault > 0 and state is Contrib
  checkContrib: (stateCode) => {
    if (CONTRIBUTORY_STATES.includes(stateCode)) {
      return `⚠️ <b>High Defense Risk:</b> ${STATE_DATA[stateCode].name} follows strict "Contributory Negligence" rules. If insurance finds you even 1% at fault, they can deny your entire claim.`;
    }
    return null;
  },

  // Trigger if Days Remaining < 365 and State is Short SOL
  checkDeadline: (stateCode) => {
    if (CRITICAL_SOL_STATES.includes(stateCode)) {
      return `🚨 <b>Urgent Deadline:</b> ${STATE_DATA[stateCode].name} has a strict 1-year statute of limitations. You must act immediately.`;
    }
    return null;
  },

  // Trigger if User split lanes and state is illegal
  checkSplitting: (stateCode, userDidSplit) => {
    if (userDidSplit && STATE_DATA[stateCode].split === LANE_RULES.ILLEGAL) {
      return `⚠️ <b>Violation Risk:</b> Lane splitting is illegal in ${STATE_DATA[stateCode].name}. Insurance may argue you were negligent per se.`;
    }
    if (userDidSplit && STATE_DATA[stateCode].split === LANE_RULES.FILTERING) {
      return `ℹ️ <b>Note:</b> ${STATE_DATA[stateCode].name} allows filtering only under specific conditions (usually stopped traffic). Ensure you were within limits.`;
    }
    return null;
  }
};