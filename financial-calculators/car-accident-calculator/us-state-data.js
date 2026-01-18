/**
 * HYBRID⁶: US STATE LEGAL DATA ENGINE
 * FINAL PRODUCTION VERSION
 * 
 * AUDIT DATA:
 * - Last Verified: January 2026
 * - Scope: 50 US States + DC
 * - Updates: Includes CA/NC 2025 Liability Increases & FL 2023 Tort Reform.
 * 
 * FIELD DICTIONARY:
 * -----------------
 * state:         Full Name.
 * code:          2-Letter Abbreviation.
 * sol:           Statute of Limitations (Years) for Bodily Injury.
 * fault_mode:    The Mathematical Rule for Liability:
 *                - "Pure":    Recover even if 99% at fault.
 *                - "Mod50":   Recovery barred if 50% or more at fault.
 *                - "Mod51":   Recovery barred if > 50% (51%+) at fault.
 *                - "Contrib": Recovery barred if 1% at fault (Strict).
 *                - "Slight":  Recovery barred if fault is more than "slight" (SD only).
 * min_coverage:  State Minimum Liability Limit (Bodily Injury Per Person).
 * tort_threshold: (Boolean) If true, state has barriers to suing (No-Fault/PIP/Thresholds).
 * cap_pain:      (Number/Null) Dollar limit on Non-Economic Damages.
 * alert:         Human-readable context for the user.
 */

const US_STATE_DATA = [
  {
    state: "Alabama",
    code: "AL",
    sol: 2,
    fault_mode: "Contrib",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "⚠️ Strict Rule: Alabama is a Contributory Negligence state. If you are even 1% at fault, recovery is usually barred."
  },
  {
    state: "Alaska",
    code: "AK",
    sol: 2,
    fault_mode: "Pure",
    min_coverage: 50000,
    tort_threshold: false,
    cap_pain: 400000,
    alert: "Note: Non-economic damages are generally capped at $400,000 (or based on life expectancy)."
  },
  {
    state: "Arizona",
    code: "AZ",
    sol: 2,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Arkansas",
    code: "AR",
    sol: 3,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false, 
    cap_pain: null,
    alert: "Note: You cannot recover if you are 50% or more at fault."
  },
  {
    state: "California",
    code: "CA",
    sol: 2,
    fault_mode: "Pure",
    min_coverage: 30000, 
    tort_threshold: false,
    cap_pain: null,
    alert: "ℹ️ 2025 Law: Minimum liability limits have increased to $30,000."
  },
  {
    state: "Colorado",
    code: "CO",
    sol: 3,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 642000,
    alert: "⚠️ Cap Alert: Pain & Suffering damages are strictly limited by state inflation tables."
  },
  {
    state: "Connecticut",
    code: "CT",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Delaware",
    code: "DE",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: true, 
    cap_pain: null,
    alert: null
  },
  {
    state: "District of Columbia",
    code: "DC",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "⚠️ Strict Rule: 1% fault may bar recovery (exceptions exist for cyclists/pedestrians)."
  },
  {
    state: "Florida",
    code: "FL",
    sol: 2, 
    fault_mode: "Mod51", 
    min_coverage: 10000,
    tort_threshold: true,
    cap_pain: null,
    alert: "⚠️ Recent Law Change: Statute of Limitations is now only 2 years (previously 4)."
  },
  {
    state: "Georgia",
    code: "GA",
    sol: 2,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Warning: Recovery is barred if you are 50% or more at fault."
  },
  {
    state: "Hawaii",
    code: "HI",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 20000,
    tort_threshold: true,
    cap_pain: 375000,
    alert: "⚠️ Cap Alert: Pain & Suffering is hard-capped at $375,000."
  },
  {
    state: "Idaho",
    code: "ID",
    sol: 2,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 430000,
    alert: "Note: Non-economic damages are capped (adjusted annually for inflation)."
  },
  {
    state: "Illinois",
    code: "IL",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Indiana",
    code: "IN",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Iowa",
    code: "IA",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 20000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Kansas",
    code: "KS",
    sol: 2,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: 350000,
    alert: "⚠️ Cap Alert: Non-economic damages limited to $350,000."
  },
  {
    state: "Kentucky",
    code: "KY",
    sol: 1,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "⏰ URGENT: Kentucky has a strict 1-year Statute of Limitations. Act fast."
  },
  {
    state: "Louisiana",
    code: "LA",
    sol: 1,
    fault_mode: "Pure",
    min_coverage: 15000,
    tort_threshold: false,
    cap_pain: null,
    alert: "⏰ URGENT: Louisiana has a strict 1-year Statute of Limitations."
  },
  {
    state: "Maine",
    code: "ME",
    sol: 6,
    fault_mode: "Mod50",
    min_coverage: 50000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Maryland",
    code: "MD",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 30000,
    tort_threshold: false,
    cap_pain: 935000, 
    alert: "⚠️ Strict Rule: Contributory negligence applies. 1% fault bars recovery."
  },
  {
    state: "Massachusetts",
    code: "MA",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 20000,
    tort_threshold: true,
    cap_pain: null,
    alert: null
  },
  {
    state: "Michigan",
    code: "MI",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 50000,
    tort_threshold: true,
    cap_pain: null,
    alert: "ℹ️ No-Fault Rule: You generally cannot sue for pain & suffering unless injury meets the 'Serious Impairment' threshold."
  },
  {
    state: "Minnesota",
    code: "MN",
    sol: 6,
    fault_mode: "Mod51",
    min_coverage: 30000,
    tort_threshold: true,
    cap_pain: null,
    alert: null
  },
  {
    state: "Mississippi",
    code: "MS",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 1000000,
    alert: "Note: Non-economic damages are capped at $1,000,000."
  },
  {
    state: "Missouri",
    code: "MO",
    sol: 5,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Montana",
    code: "MT",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Nebraska",
    code: "NE",
    sol: 4,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Nevada",
    code: "NV",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "New Hampshire",
    code: "NH",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "New Jersey",
    code: "NJ",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "ℹ️ Policy Check: If you have a 'Basic' policy, your right to sue is severely limited."
  },
  {
    state: "New Mexico",
    code: "NM",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "New York",
    code: "NY",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "ℹ️ Threshold Rule: Must meet 'Serious Injury' standard (NYS Ins. Law § 5102) to sue for Pain & Suffering."
  },
  {
    state: "North Carolina",
    code: "NC",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 50000, 
    tort_threshold: false,
    cap_pain: null,
    alert: "⚠️ Strict Rule: Contributory negligence. 1% fault bars recovery. (New 2025 limits apply)."
  },
  {
    state: "North Dakota",
    code: "ND",
    sol: 6,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: null
  },
  {
    state: "Ohio",
    code: "OH",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 250000, 
    alert: "⚠️ Cap Alert: Damages limited to $250k or 3x economic loss (whichever is greater, up to $350k)."
  },
  {
    state: "Oklahoma",
    code: "OK",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 350000,
    alert: "Note: Non-economic damages capped at $350,000."
  },
  {
    state: "Oregon",
    code: "OR",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: null
  },
  {
    state: "Pennsylvania",
    code: "PA",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 15000,
    tort_threshold: true,
    cap_pain: null,
    alert: "ℹ️ Tort Option: 'Limited Tort' selection may block pain & suffering claims."
  },
  {
    state: "Rhode Island",
    code: "RI",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "South Carolina",
    code: "SC",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "South Dakota",
    code: "SD",
    sol: 3,
    fault_mode: "Slight", 
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "⚠️ Unique Law: Recovery only allowed if your fault is 'Slight' compared to the other driver."
  },
  {
    state: "Tennessee",
    code: "TN",
    sol: 1,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 750000,
    alert: "⏰ URGENT: 1-Year Statute of Limitations. Damages capped at $750k."
  },
  {
    state: "Texas",
    code: "TX",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 30000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Note: Recovery barred if you are more than 50% at fault."
  },
  {
    state: "Utah",
    code: "UT",
    sol: 4,
    fault_mode: "Mod50",
    min_coverage: 30000,
    tort_threshold: true,
    cap_pain: null,
    alert: null
  },
  {
    state: "Vermont",
    code: "VT",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Virginia",
    code: "VA",
    sol: 2,
    fault_mode: "Contrib",
    min_coverage: 30000,
    tort_threshold: false,
    cap_pain: null,
    alert: "⚠️ Strict Rule: Contributory negligence. 1% fault generally bars recovery."
  },
  {
    state: "Washington",
    code: "WA",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "West Virginia",
    code: "WV",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Wisconsin",
    code: "WI",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  },
  {
    state: "Wyoming",
    code: "WY",
    sol: 4,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: null
  }
];

// METADATA ATTACHMENT
// This allows your UI to verify the data integrity.
US_STATE_DATA.meta = {
  last_verified: "2026-01",
  source_tier: "State Statute / Dept of Insurance / Legislative Updates (2025)",
  version: "Hybrid 6.0"
};

// Universal Module Definition for Browser or Node
if (typeof module !== "undefined") {
  module.exports = US_STATE_DATA;
} else {
  window.US_STATE_DATA = US_STATE_DATA;
}