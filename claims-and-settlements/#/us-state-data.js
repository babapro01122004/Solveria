/**
 * us-state-data.js
 * California State Wage & Hour Baseline Data (Updated for 2026)
 * * Sources: CA Dept. of Industrial Relations (DIR), CA Labor Code 
 * (Sections 203, 510, 226, 1194.2, 515.5), and 2026 published guidance.
 * * Designed for frontend calculators. Local city/county minimum wage overrides 
 * should be handled dynamically via ZIP code matching on the frontend.
 */

export const STATE_DATA = {
    ca: {
        stateCode: "CA",
        stateName: "California",
        yearEffective: 2026,

        // ---------- Minimum Wage & Salary Thresholds ----------
        minimumWage: {
            statewideHourly: 16.90,       // Effective Jan 1, 2026 (applies to all employer sizes)
            fastFoodHourly: 20.00,        // AB 1228 / AB 610 baseline for covered fast food chains
            currency: "USD",
            statutoryReference: "Labor Code § 1182.12"
        },
        
        exemptThresholds: {
            // CA Law: Exempt administrative/executive/professional salary must be >= 2x state minimum wage (full-time)
            standardAnnual: 70304.00,     // (16.90 * 2) * 2080 hours
            standardMonthly: 5858.67,     // 70304 / 12
            standardWeekly: 1352.00,      // 70304 / 52
            
            // Specialized Exemptions (Labor Code § 515.5)
            computerSoftwareAnnual: 122573.13, // Effective Jan 1, 2026
            statutoryReference: "Labor Code § 515"
        },

        // ---------- Overtime & Double Time Rules ----------
        overtimeRules: {
            daily: {
                overtimeTriggerHours: 8.0,    // 1.5x multiplier applies after this
                doubleTimeTriggerHours: 12.0  // 2.0x multiplier applies after this
            },
            weekly: {
                overtimeTriggerHours: 40.0    // 1.5x multiplier applies after this
            },
            seventhConsecutiveDay: {
                firstEightHoursMultiplier: 1.5,
                overEightHoursMultiplier: 2.0
            },
            notes: "Daily overtime applies in addition to weekly overtime. Bonuses must be factored into the regular rate of pay.",
            statutoryReference: "Labor Code § 510"
        },

        // ---------- Meal & Rest Breaks ----------
        mealAndRest: {
            mealPeriod: {
                firstTriggerHours: 5.0,       // >5 hours worked requires a 30-minute unpaid meal
                secondTriggerHours: 10.0,     // >10 hours requires a second 30-minute meal
                requiredDurationMinutes: 30
            },
            restPeriod: {
                triggerPerHours: 4.0,         // 10-minute paid rest per 4-hour block or major fraction thereof
                requiredDurationMinutes: 10
            },
            premiums: {
                missedMealPenaltyHours: 1.0,  // 1 hour of regular pay per day a meal break is missed/non-compliant
                missedRestPenaltyHours: 1.0,  // 1 hour of regular pay per day a rest break is missed/non-compliant
                maxDailyPenaltyHours: 2.0     // Capped at 2 hours total per day (1 for meal, 1 for rest)
            },
            notes: "On-duty meal periods, automatic deductions, or requirements to remain on premises may invalidate a break.",
            statutoryReference: "Labor Code § 226.7; § 512"
        },

        // ---------- Statutory Penalties & Damages ----------
        penalties: {
            waitingTime: {
                enabled: true,
                maxDays: 30,                  // Penalty = daily wage * days late, up to 30 calendar days
                statutoryReference: "Labor Code § 203"
            },
            wageStatement: {
                initialViolation: 50.00,      // For the first pay period with a violation
                subsequentViolation: 100.00,  // For each subsequent pay period
                maximumAggregate: 4000.00,    // Total cap per employee
                statutoryReference: "Labor Code § 226"
            },
            splitShift: {
                premiumHours: 1.0,            // 1 hour at state minimum wage if gap between shifts > 1 hour and unpaid
                statutoryReference: "IWC Wage Orders"
            },
            liquidatedDamages: {
                multiplier: 2.0,              // Allows double recovery for wages paid below minimum wage
                statutoryReference: "Labor Code § 1194.2"
            }
        },

        // ---------- Statute of Limitations (Filing Windows) ----------
        deadlines: {
            unpaidWagesYears: 3,              // Base statute for unpaid wages/overtime (often extended to 4 via UCL)
            statutoryPenaltiesYears: 1,       // Pay stub violations, waiting time penalties
            breachOfWrittenContractYears: 4,  
            breachOfOralContractYears: 2,
            notes: "Missing a deadline permanently bars recovery. Attorney review highly recommended."
        },

        // ---------- PAGA / Class Action Indicators ----------
        pagaRiskFlags: {
            employerSizeThreshold: 26,        // Triggers higher scrutiny for systemic violations
            triggers: [
                "Automatic meal deductions",
                "Altered time records",
                "Multiple pay statement violations",
                "Systemic misclassification (Exempt vs. Non-Exempt)"
            ]
        },

        // ---------- UI / Frontend State Configuration ----------
        uiFlags: {
            allowCityZipOverrides: true,          // Enable ZIP input to pull local minimum wages
            enableBonusAdjustedRegularRate: true, // Auto-recalculate OT rate if bonuses exist
            showLiquidatedDamagesWarning: true 
        }
    }
};

/**
 * CORE CALCULATOR HELPERS
 * Pure functions to be utilized by the frontend state manager.
 */

// Converts salary, day rate, or piece rate to an effective hourly base.
export const calculateEffectiveHourlyRate = (payType, amount, hoursWorked = 40) => {
    switch(payType.toLowerCase()) {
        case 'hourly':
            return amount;
        case 'salary':
            return amount / 52 / hoursWorked;
        case 'day rate':
            return amount / (hoursWorked / 5); // Assuming 5 working days
        default:
            return amount;
    }
};

// CA Law strictly requires non-discretionary bonuses to increase the overtime multiplier.
export const calculateBonusAdjustedRegularRate = (baseRate, bonusAmount, hoursWorkedInBonusPeriod) => {
    if (!bonusAmount || bonusAmount <= 0) return baseRate;
    const bonusHourlyEquivalent = bonusAmount / hoursWorkedInBonusPeriod;
    return baseRate + bonusHourlyEquivalent;
};

// Calculates Final Paycheck Waiting Time Penalties (capped at 30 days).
export const calculateWaitingTimePenalty = (dailyWage, daysLate) => {
    if (daysLate <= 0) return 0;
    const applicableDays = Math.min(daysLate, STATE_DATA.ca.penalties.waitingTime.maxDays);
    return dailyWage * applicableDays;
};