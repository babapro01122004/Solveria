/**
 * US STATE DATA & CALCULATOR CONSTANTS
 * ====================================
 * 
 * This file contains all static data required for the "American Utility" Payoff Calculator.
 * 
 * SOURCES:
 * - Debt Data: Aggregated from Experian & TransUnion Q3 2024/2025 Reports.
 * - Tax Refund: IRS Filing Season Statistics (2024 Tax Year).
 * - Min Payment: Standard Federal Reserve "Safe Harbor" guidelines for major issuers.
 */

/* ==========================================================================
   1. SOCIAL ANCHORING DATA (The "Neighborly Check")
   Used to display: "Average [State] Debt: $X,XXX"
   ========================================================================== */
export const US_STATE_DEBT = [
    { name: "Alabama", code: "AL", avgDebt: 5878 },
    { name: "Alaska", code: "AK", avgDebt: 8077 }, 
    { name: "Arizona", code: "AZ", avgDebt: 6800 },
    { name: "Arkansas", code: "AR", avgDebt: 5826 },
    { name: "California", code: "CA", avgDebt: 6736 },
    { name: "Colorado", code: "CO", avgDebt: 6900 },
    { name: "Connecticut", code: "CT", avgDebt: 7568 },
    { name: "Delaware", code: "DE", avgDebt: 6600 },
    { name: "District of Columbia", code: "DC", avgDebt: 7684 },
    { name: "Florida", code: "FL", avgDebt: 7861 },
    { name: "Georgia", code: "GA", avgDebt: 7100 },
    { name: "Hawaii", code: "HI", avgDebt: 7330 },
    { name: "Idaho", code: "ID", avgDebt: 6100 },
    { name: "Illinois", code: "IL", avgDebt: 6400 },
    { name: "Indiana", code: "IN", avgDebt: 5900 },
    { name: "Iowa", code: "IA", avgDebt: 5300 },
    { name: "Kansas", code: "KS", avgDebt: 5329 },
    { name: "Kentucky", code: "KY", avgDebt: 5600 },
    { name: "Louisiana", code: "LA", avgDebt: 5399 },
    { name: "Maine", code: "ME", avgDebt: 5900 },
    { name: "Maryland", code: "MD", avgDebt: 7500 },
    { name: "Massachusetts", code: "MA", avgDebt: 6900 },
    { name: "Michigan", code: "MI", avgDebt: 6000 },
    { name: "Minnesota", code: "MN", avgDebt: 6200 },
    { name: "Mississippi", code: "MS", avgDebt: 4887 },
    { name: "Missouri", code: "MO", avgDebt: 5553 },
    { name: "Montana", code: "MT", avgDebt: 6100 },
    { name: "Nebraska", code: "NE", avgDebt: 5800 },
    { name: "Nevada", code: "NV", avgDebt: 6710 },
    { name: "New Hampshire", code: "NH", avgDebt: 6400 },
    { name: "New Jersey", code: "NJ", avgDebt: 7568 },
    { name: "New Mexico", code: "NM", avgDebt: 6543 },
    { name: "New York", code: "NY", avgDebt: 7100 },
    { name: "North Carolina", code: "NC", avgDebt: 6300 },
    { name: "North Dakota", code: "ND", avgDebt: 5700 },
    { name: "Ohio", code: "OH", avgDebt: 5900 },
    { name: "Oklahoma", code: "OK", avgDebt: 5800 },
    { name: "Oregon", code: "OR", avgDebt: 6200 },
    { name: "Pennsylvania", code: "PA", avgDebt: 6300 },
    { name: "Rhode Island", code: "RI", avgDebt: 6400 },
    { name: "South Carolina", code: "SC", avgDebt: 6200 },
    { name: "South Dakota", code: "SD", avgDebt: 5900 },
    { name: "Tennessee", code: "TN", avgDebt: 6100 },
    { name: "Texas", code: "TX", avgDebt: 6620 },
    { name: "Utah", code: "UT", avgDebt: 6500 },
    { name: "Vermont", code: "VT", avgDebt: 5800 },
    { name: "Virginia", code: "VA", avgDebt: 6647 },
    { name: "Washington", code: "WA", avgDebt: 6800 },
    { name: "West Virginia", code: "WV", avgDebt: 5336 },
    { name: "Wisconsin", code: "WI", avgDebt: 5206 },
    { name: "Wyoming", code: "WY", avgDebt: 6100 }
];

/**
 * Helper: Get Debt by State Code (Case Insensitive)
 * Returns National Average ($6,730) if code not found.
 */
export const getAvgDebtByState = (code) => {
    if (!code) return 6730;
    const state = US_STATE_DEBT.find(s => s.code.toLowerCase() === code.toLowerCase());
    return state ? state.avgDebt : 6730; 
};


/* ==========================================================================
   2. CALCULATOR CONSTANTS & LOGIC HELPERS
   Used for: Min Payment math, Tax Refund defaults, and warnings.
   ========================================================================== */
export const CALCULATOR_CONSTANTS = {
    // IRS Data 2024: Average refund was ~$3,138.
    AVG_TAX_REFUND: 3138,

    // Standard Federal Min Payment Rule (Major Banks like Chase/Citi/Amex).
    // Formula: Max(Floor, (Balance * 1%) + MonthlyInterest)
    MIN_PAYMENT_FLOOR: 35.00, 
    MIN_PAYMENT_BAL_PERCENT: 0.01, 

    // Thresholds for the "Feasibility Gauge" (Mode 2)
    // Values represent % of Total Balance required as Monthly Payment.
    FEASIBILITY_COMFORTABLE: 0.05, // 5% (Aggressive but doable)
    FEASIBILITY_AGGRESSIVE: 0.10,  // 10% (Very hard)
    FEASIBILITY_IMPOSSIBLE: 0.50   // 50% (Likely impossible for avg user)
};


/* ==========================================================================
   3. "STUPID TAX" TRANSLATOR (Visual Mapping)
   Used to convert "Total Interest Paid" into tangible pain.
   ========================================================================== */
export const STUPID_TAX_TIERS = [
    { max: 50, label: "A fast food dinner for two" },
    { max: 200, label: "A fresh pair of Nike Air Force 1s" },
    { max: 800, label: "A round-trip domestic flight" },
    { max: 1500, label: "A new iPhone Pro" },
    { max: 2000, label: "A new MacBook Air" },
    { max: 4000, label: "A decent used Honda Civic" },
    { max: 8000, label: "A luxury trip to Europe" },
    { max: 999999, label: "A down payment on a house" } // Catch-all
];

/**
 * Helper: Get Label for Interest Amount
 */
export const getStupidTaxLabel = (interestAmount) => {
    const tier = STUPID_TAX_TIERS.find(t => interestAmount <= t.max);
    return tier ? tier.label : "A small fortune";
};