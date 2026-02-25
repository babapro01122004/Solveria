I'm shipping with this one :

/**

 * US LEMON LAW DATA REPOSITORY (HYBRID ENGINE)

 * -------------------------------------------------------------------------

 * PURPOSE:

 * Centralized, frontend-only state logic for the Lemon Law Decision Engine.

 *

 * DESIGN PRINCIPLES:

 * - Signal-based guidance (Patterns vs. Verdicts)

 * - Conservative defaults (Manage expectations)

 * - Deterministic math (No backend dependency)

 *

 * DISCLAIMER:

 * This data reflects commonly cited Lemon Law patterns and mileage formulas.

 * It is for estimation and educational purposes only and DOES NOT constitute legal advice.

 *

 * MATH KEY (Usage Offset):

 * Formula: (Vehicle Price * Miles at First Repair) / offset_divisor

 *

 * Divisor Patterns:

 * - 120,000 → Longer life expectancy states (e.g., CA, TX, FL) = Lower deduction

 * - 100,000 → Standard expectancy (Default) = Higher, conservative deduction

 */



// =============================================================================

// 1. STATE-SPECIFIC OVERRIDES

// =============================================================================



const stateLaws = {

  // === TIER 1: HIGH-VOLUME / DISTINCT STATUTES ===



  CA: {

    name: "California",

    days_pattern: 30,        // Statutory strong signal

    attempts_pattern: 4,     // Statutory strong signal

    safety_pattern: 2,       // Accelerated safety threshold

    offset_divisor: 120000,  // Consumer-friendly deduction curve

    used_coverage_note: null // CA often covers used cars under mfg warranty

  },



  FL: {

    name: "Florida",

    days_pattern: 30,        // Safe "Strong" signal (Technically 15+notice)

    attempts_pattern: 3,

    safety_pattern: null,    // FL treats all substantial defects seriously

    offset_divisor: 120000,

    used_coverage_note: "Heads up: Florida Lemon Law generally applies to NEW vehicles only.",

  },



  TX: {

    name: "Texas",

    days_pattern: 30,

    attempts_pattern: 4,

    safety_pattern: 2,

    offset_divisor: 120000,

    used_coverage_note: "Heads up: Texas Lemon Law generally applies to NEW vehicles only.",

  },



  NY: {

    name: "New York",

    days_pattern: 30,

    attempts_pattern: 4,

    safety_pattern: null,

    offset_divisor: 100000,  // Standard deduction curve

    used_coverage_note: "New York has a separate Used Car Lemon Law (Under 100k miles).",

  },



  NJ: {

    name: "New Jersey",

    days_pattern: 20,        // Consumer friendly (20 days)

    attempts_pattern: 3,

    safety_pattern: 1,       // Extremely consumer friendly for safety

    offset_divisor: 100000,

    used_coverage_note: null,

  },



  WA: {

    name: "Washington",

    days_pattern: 30,

    attempts_pattern: 4,

    safety_pattern: 2,

    offset_divisor: 120000,

    used_coverage_note: "Washington Lemon Law generally applies to NEW vehicles only.",

  },



  // === TIER 2: SPECIFIC OVERRIDES ===



  AZ: { name: "Arizona", used_coverage_note: "Used cars may be covered only for a short period (15 days/500 miles)." },

  CT: { name: "Connecticut", offset_divisor: 100000 },

  GA: { name: "Georgia", attempts_pattern: 3, used_coverage_note: "Georgia Lemon Law generally applies to NEW vehicles only." },

  IL: { name: "Illinois", used_coverage_note: "Illinois Lemon Law generally applies to NEW vehicles only." },

  MA: { name: "Massachusetts", days_pattern: 15, attempts_pattern: 3, offset_divisor: 100000 },

  NC: { name: "North Carolina", days_pattern: 20 },

  OH: { name: "Ohio", attempts_pattern: 3 },

  PA: { name: "Pennsylvania", attempts_pattern: 3, used_coverage_note: "PA Lemon Law generally applies to NEW vehicles only." },

  VA: { name: "Virginia", attempts_pattern: 3 },

};



// =============================================================================

// 2. THE STANDARD MODEL (DEFAULTS)

// =============================================================================

// Logic: "Safe" averages based on Uniform Commercial Code (UCC) patterns.



const defaultStateData = {

  days_pattern: 30,        // Standard "Loss of Use" threshold

  attempts_pattern: 4,     // Standard "Reasonable Number of Attempts"

  safety_pattern: 2,       // Common safety threshold

  offset_divisor: 100000,  // Uses 100k to estimate a HIGHER deduction (Managing expectations)

  used_coverage_note: null // Silence unless explicitly known

};



// =============================================================================

// 3. CORE LOGIC ENGINE

// =============================================================================



/**

 * Merges specific state overrides with the default model.

 */

export function getStateRules(stateCode) {

  const specific = stateLaws[stateCode] || { name: "Unknown State" };

  return { ...defaultStateData, ...specific, code: stateCode };

}



/**

 * Calculates the Usage Offset (Mode B).

 * Formula: (Price * Miles) / Divisor

 * Includes safety caps for empty inputs and max value.

 */

export function calculateDeduction(stateCode, price, miles) {

  // Guard clause against empty inputs

  if (!price || !miles) return 0;



  const rules = getStateRules(stateCode);



  // The Math

  const deduction = (price * miles) / rules.offset_divisor;



  // Safety Cap: Deduction can never exceed the vehicle price

  return Math.min(deduction, price);

}



/**

 * Determines Case Strength Signal (Mode A).

 *

 * HYBRID LOGIC:

 * - Green  → Strong pattern alignment (matches State Law).

 * - Yellow → Watch Zone (Universal: 2+ attempts OR 15+ days).

 * - Grey   → Low signal.

 */

export function getSignalStrength(stateCode, daysOut, attempts, isSafety) {

  const rules = getStateRules(stateCode);



  // --- 1. CHECK GREEN (Strong Signal) ---

  const strongByDays = daysOut >= rules.days_pattern;

  const strongByAttempts = attempts >= rules.attempts_pattern;

  

  // Safety check: Ensure state HAS a specific safety pattern before applying it

  const strongBySafety = 

    isSafety && 

    rules.safety_pattern !== null && 

    attempts >= rules.safety_pattern;



  if (strongByDays || strongByAttempts || strongBySafety) {

    return "green";

  }



  // --- 2. CHECK YELLOW (Building Signal) ---

  // Note: Yellow is intentionally universal to validate user frustration

  // before they hit the strict statutory limits.

  const yellowByDays = daysOut >= 15;

  const yellowByAttempts = attempts >= 2;



  if (yellowByDays || yellowByAttempts) {

    return "yellow";

  }



  // --- 3. DEFAULT (Low Signal) ---

  return "grey";

}



/**

 * Retrieves specific Used Vehicle micro-copy (if applicable).

 */

export function getUsedCarWarning(stateCode) {

  return getStateRules(stateCode).used_coverage_note;

}



// =============================================================================

// 4. STATE LIST EXPORT

// =============================================================================



export const US_STATES = [

  { code: 'AL', name: 'Alabama' },

  { code: 'AK', name: 'Alaska' },

  { code: 'AZ', name: 'Arizona' },

  { code: 'AR', name: 'Arkansas' },

  { code: 'CA', name: 'California' },

  { code: 'CO', name: 'Colorado' },

  { code: 'CT', name: 'Connecticut' },

  { code: 'DE', name: 'Delaware' },

  { code: 'DC', name: 'District Of Columbia' },

  { code: 'FL', name: 'Florida' },

  { code: 'GA', name: 'Georgia' },

  { code: 'HI', name: 'Hawaii' },

  { code: 'ID', name: 'Idaho' },

  { code: 'IL', name: 'Illinois' },

  { code: 'IN', name: 'Indiana' },

  { code: 'IA', name: 'Iowa' },

  { code: 'KS', name: 'Kansas' },

  { code: 'KY', name: 'Kentucky' },

  { code: 'LA', name: 'Louisiana' },

  { code: 'ME', name: 'Maine' },

  { code: 'MD', name: 'Maryland' },

  { code: 'MA', name: 'Massachusetts' },

  { code: 'MI', name: 'Michigan' },

  { code: 'MN', name: 'Minnesota' },

  { code: 'MS', name: 'Mississippi' },

  { code: 'MO', name: 'Missouri' },

  { code: 'MT', name: 'Montana' },

  { code: 'NE', name: 'Nebraska' },

  { code: 'NV', name: 'Nevada' },

  { code: 'NH', name: 'New Hampshire' },

  { code: 'NJ', name: 'New Jersey' },

  { code: 'NM', name: 'New Mexico' },

  { code: 'NY', name: 'New York' },

  { code: 'NC', name: 'North Carolina' },

  { code: 'ND', name: 'North Dakota' },

  { code: 'OH', name: 'Ohio' },

  { code: 'OK', name: 'Oklahoma' },

  { code: 'OR', name: 'Oregon' },

  { code: 'PA', name: 'Pennsylvania' },

  { code: 'RI', name: 'Rhode Island' },

  { code: 'SC', name: 'South Carolina' },

  { code: 'SD', name: 'South Dakota' },

  { code: 'TN', name: 'Tennessee' },

  { code: 'TX', name: 'Texas' },

  { code: 'UT', name: 'Utah' },

  { code: 'VT', name: 'Vermont' },

  { code: 'VA', name: 'Virginia' },

  { code: 'WA', name: 'Washington' },

  { code: 'WV', name: 'West Virginia' },

  { code: 'WI', name: 'Wisconsin' },

  { code: 'WY', name: 'Wyoming' },

];