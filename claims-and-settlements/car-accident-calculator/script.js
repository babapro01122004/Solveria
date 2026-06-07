/* ========================================= */
/* DATA ENGINE: US STATE LEGAL RULES (2026)  */
/* ========================================= */
const US_STATE_DATA = [
  {
    state: "Alabama",
    code: "AL",
    sol: 2,
    fault_mode: "Contrib",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Strict Rule: Alabama is a Contributory Negligence state. If you are even 1% at fault, recovery is usually barred."
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
    alert: "Standard comparative negligence rules apply."
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
    alert: "Standard Pure Comparative Fault rules apply. Minimum liability limits are $30,000."
  },
  {
    state: "Colorado",
    code: "CO",
    sol: 3,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 642000,
    alert: "Cap Alert: Pain & Suffering damages are strictly limited by state inflation tables."
  },
  {
    state: "Connecticut",
    code: "CT",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Delaware",
    code: "DE",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: true, 
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "District of Columbia",
    code: "DC",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Strict Rule: 1% fault may bar recovery (exceptions exist for cyclists/pedestrians)."
  },
  {
    state: "Florida",
    code: "FL",
    sol: 2, 
    fault_mode: "Mod51", 
    min_coverage: 10000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Recent Law Change: Statute of Limitations is now only 2 years (previously 4)."
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
    alert: "Cap Alert: Pain & Suffering is hard-capped at $375,000."
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
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Indiana",
    code: "IN",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Iowa",
    code: "IA",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 20000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Kansas",
    code: "KS",
    sol: 2,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: 350000,
    alert: "Cap Alert: Non-economic damages limited to $350,000."
  },
  {
    state: "Kentucky",
    code: "KY",
    sol: 1,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "URGENT: Kentucky has a strict 1-year Statute of Limitations. Act fast."
  },
  {
    state: "Louisiana",
    code: "LA",
    sol: 1,
    fault_mode: "Pure",
    min_coverage: 15000,
    tort_threshold: false,
    cap_pain: null,
    alert: "URGENT: Louisiana has a strict 1-year Statute of Limitations."
  },
  {
    state: "Maine",
    code: "ME",
    sol: 6,
    fault_mode: "Mod50",
    min_coverage: 50000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Maryland",
    code: "MD",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 30000,
    tort_threshold: false,
    cap_pain: 935000, 
    alert: "Strict Rule: Contributory negligence applies. 1% fault bars recovery."
  },
  {
    state: "Massachusetts",
    code: "MA",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 20000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Michigan",
    code: "MI",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 50000,
    tort_threshold: true,
    cap_pain: null,
    alert: "No-Fault Rule: You generally cannot sue for pain & suffering unless injury meets the 'Serious Impairment' threshold."
  },
  {
    state: "Minnesota",
    code: "MN",
    sol: 6,
    fault_mode: "Mod51",
    min_coverage: 30000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
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
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Montana",
    code: "MT",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Nebraska",
    code: "NE",
    sol: 4,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Nevada",
    code: "NV",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "New Hampshire",
    code: "NH",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "New Jersey",
    code: "NJ",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Policy Check: If you have a 'Basic' policy, your right to sue is severely limited."
  },
  {
    state: "New Mexico",
    code: "NM",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "New York",
    code: "NY",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Threshold Rule: Must meet 'Serious Injury' standard (NYS Ins. Law § 5102) to sue for Pain & Suffering."
  },
  {
    state: "North Carolina",
    code: "NC",
    sol: 3,
    fault_mode: "Contrib",
    min_coverage: 50000, 
    tort_threshold: false,
    cap_pain: null,
    alert: "Strict Rule: Contributory negligence. 1% fault bars recovery. (New 2025 limits apply)."
  },
  {
    state: "North Dakota",
    code: "ND",
    sol: 6,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Ohio",
    code: "OH",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 250000, 
    alert: "Cap Alert: Damages limited to $250k or 3x economic loss (whichever is greater, up to $350k)."
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
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Pennsylvania",
    code: "PA",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 15000,
    tort_threshold: true,
    cap_pain: null,
    alert: "Tort Option: 'Limited Tort' selection may block pain & suffering claims."
  },
  {
    state: "Rhode Island",
    code: "RI",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "South Carolina",
    code: "SC",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "South Dakota",
    code: "SD",
    sol: 3,
    fault_mode: "Slight", 
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Unique Law: Recovery only allowed if your fault is 'Slight' compared to the other driver."
  },
  {
    state: "Tennessee",
    code: "TN",
    sol: 1,
    fault_mode: "Mod50",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: 750000,
    alert: "URGENT: 1-Year Statute of Limitations. Damages capped at $750k."
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
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Vermont",
    code: "VT",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Virginia",
    code: "VA",
    sol: 2,
    fault_mode: "Contrib",
    min_coverage: 30000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Strict Rule: Contributory negligence. 1% fault generally bars recovery."
  },
  {
    state: "Washington",
    code: "WA",
    sol: 3,
    fault_mode: "Pure",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "West Virginia",
    code: "WV",
    sol: 2,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Wisconsin",
    code: "WI",
    sol: 3,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  },
  {
    state: "Wyoming",
    code: "WY",
    sol: 4,
    fault_mode: "Mod51",
    min_coverage: 25000,
    tort_threshold: false,
    cap_pain: null,
    alert: "Standard comparative negligence rules apply."
  }
];

/* ============================ */
/* Slider & Input Config        */
/* ============================ */

const SLIDER_CONFIG = {
    medicalBills: { type: 'cubic', max: 200000 },
    lostWages: { type: 'cubic', max: 100000 },
    propDamage: { type: 'cubic', max: 50000 },
    faultShare: { type: 'linear', max: 100 }
};

// Formatting Helper
const formatMoney = (num) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
};

const cleanNumber = (num) => parseFloat(num) || 0;

/* ============================ */
/* Core Calculation Engine      */
/* ============================ */
function calculateResults() {
    // 1. Get Inputs
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = US_STATE_DATA.find(s => s.code === stateCode) || US_STATE_DATA[0];

    const medical = cleanNumber(document.getElementById('input_medicalBills').value);
    const wages = cleanNumber(document.getElementById('input_lostWages').value);
    const propDamage = cleanNumber(document.getElementById('input_propDamage').value);
    const userFault = cleanNumber(document.getElementById('input_faultShare').value);
    
    const isInsurancePaid = document.getElementById('insurancePaidToggle').checked;
    const isAttorney = document.getElementById('attorneyToggle').checked;
    
    // 2. Determine Multiplier (Pain & Suffering)
    let multiplier = 1.5; // Base for Soft Tissue
    const severity = document.querySelector('input[name="severity"]:checked')?.value || 'soft';
    
    if (severity === 'fracture') multiplier = 3.0;
    if (severity === 'surgery') multiplier = 5.0;

    // Add Life Impacts
    const impacts = document.querySelectorAll('input[name="impact"]:checked');
    multiplier += (impacts.length * 0.3);

    // 3. Calculate Damages
    let painAndSuffering = medical * multiplier;
    
    // Apply State Cap on Pain & Suffering if exists
    if (stateData.cap_pain !== null && painAndSuffering > stateData.cap_pain) {
        painAndSuffering = stateData.cap_pain;
    }

    const economicDamages = medical + wages + propDamage;
    let grossSettlement = economicDamages + painAndSuffering;

    // 4. Apply Fault Rules (The "Cage")
    let recoveryAllowed = true;

    if (stateData.fault_mode === 'Pure') {
        grossSettlement = grossSettlement * (1 - (userFault / 100));
    } else if (stateData.fault_mode === 'Mod50') {
        if (userFault >= 50) {
            grossSettlement = 0;
            recoveryAllowed = false;
        } else {
            grossSettlement = grossSettlement * (1 - (userFault / 100));
        }
    } else if (stateData.fault_mode === 'Mod51') {
        if (userFault > 50) {
            grossSettlement = 0;
            recoveryAllowed = false;
        } else {
            grossSettlement = grossSettlement * (1 - (userFault / 100));
        }
    } else if (stateData.fault_mode === 'Contrib') {
        if (userFault > 0) {
            grossSettlement = 0;
            recoveryAllowed = false;
        }
    } else if (stateData.fault_mode === 'Slight') {
        if (userFault > 15) { 
            grossSettlement = 0;
            recoveryAllowed = false;
        } else {
            grossSettlement = grossSettlement * (1 - (userFault / 100));
        }
    }

    // 5. Policy Limits Check
    const driverInsVal = document.getElementById('driverInsurance').value;
    let policyLimit = Infinity;
    
    if (driverInsVal === 'state_min') policyLimit = stateData.min_coverage;
    else if (driverInsVal === '25k') policyLimit = 25000;
    else if (driverInsVal === '50k') policyLimit = 50000;
    else if (driverInsVal === '100k') policyLimit = 100000;
    if (driverInsVal === 'unknown') policyLimit = stateData.min_coverage;

    let isCapped = false;
    let actualGross = grossSettlement;

    if (grossSettlement > policyLimit) {
        actualGross = policyLimit;
        isCapped = true;
    }

    // 6. Waterfall Calculation
    let attorneyFee = 0;
    if (isAttorney) {
        attorneyFee = actualGross * 0.3333;
    }

    let medicalLien = 0;
    if (isInsurancePaid) {
        medicalLien = medical; 
        if (medicalLien > (actualGross - attorneyFee)) {
            medicalLien = Math.max(0, actualGross - attorneyFee);
        }
    }

    let netRecovery = actualGross - attorneyFee - medicalLien - propDamage;
    if (netRecovery < 0) netRecovery = 0;

    // 7. Check Statute of Limitations (SOL)
    const dateInput = document.getElementById('accidentDateHidden').value;
    let isExpired = false;
    let monthsRemaining = 99;

    if (dateInput) {
        const accDate = new Date(dateInput);
        const today = new Date();
        const diffTime = Math.abs(today - accDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const yearsPassed = diffDays / 365.25;
        
        if (yearsPassed > stateData.sol) {
            isExpired = true;
            actualGross = 0;
            netRecovery = 0;
            attorneyFee = 0;
            medicalLien = 0;
        }

        const limitDate = new Date(accDate);
        limitDate.setFullYear(accDate.getFullYear() + stateData.sol);
        const timeToLimit = limitDate - today;
        monthsRemaining = Math.ceil(timeToLimit / (1000 * 60 * 60 * 24 * 30)); 
    }

    // ======================
    // UPDATE UI
    // ======================
    const grossEl = document.getElementById('grossValue');
    const warningEl = document.getElementById('policyLimitWarning');
    
    if (!recoveryAllowed) {
        grossEl.textContent = "$0 (Barred by Fault)";
        grossEl.style.color = "#c62828";
        warningEl.classList.add('hidden');
    } else if (isExpired) {
        grossEl.textContent = "$0 (SOL Expired)";
        grossEl.style.color = "#c62828";
        warningEl.classList.add('hidden');
    } else {
        const displayVal = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(actualGross);
        
        grossEl.textContent = displayVal;
        grossEl.style.color = "#333";
        if (isCapped) {
            warningEl.classList.remove('hidden');
        } else {
            warningEl.classList.add('hidden');
        }
    }

    // UPDATE BARS (Both shadow and visual layers simultaneously)
    const barsAttorney = document.querySelectorAll('.bar-segment.attorney');
    const barsLiens = document.querySelectorAll('.bar-segment.liens');
    const barsNet = document.querySelectorAll('.bar-segment.net');

    if (actualGross > 0) {
        const pctAttorney = (attorneyFee / actualGross) * 100;
        const pctLiens = (medicalLien / actualGross) * 100;
        const pctNet = 100 - pctAttorney - pctLiens;

        barsAttorney.forEach(b => b.style.width = pctAttorney + '%');
        barsLiens.forEach(b => b.style.width = pctLiens + '%');
        barsNet.forEach(b => b.style.width = pctNet + '%');
        
        document.querySelector('.visual-layer .bar-segment.attorney').innerHTML = pctAttorney > 5 ? `<span>$${Math.round(attorneyFee/1000)}k</span>` : '';
        document.querySelector('.visual-layer .bar-segment.liens').innerHTML = pctLiens > 5 ? `<span>$${Math.round(medicalLien/1000)}k</span>` : '';
        document.querySelector('.visual-layer .bar-segment.net').innerHTML = pctNet > 5 ? `<span>$${Math.round((netRecovery + propDamage)/1000)}k</span>` : '';
        
    } else {
        barsAttorney.forEach(b => b.style.width = '0%');
        barsLiens.forEach(b => b.style.width = '0%');
        barsNet.forEach(b => b.style.width = '0%');
        
        document.querySelector('.visual-layer .bar-segment.attorney').innerHTML = ''; 
        document.querySelector('.visual-layer .bar-segment.liens').innerHTML = ''; 
        document.querySelector('.visual-layer .bar-segment.net').innerHTML = '';
    }

    // UPDATE VERDICT
    const verdictIcon = document.querySelector('.verdict-icon');
    const verdictText = document.querySelector('.verdict-text');

    if (!recoveryAllowed) {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#E84C3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
        verdictText.innerHTML = `<strong>Recovery Barred:</strong> Under ${stateData.state} law, your level of fault (${userFault}%) prevents you from recovering damages.`;
    } else if (isExpired) {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#E84C3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14M7 2v3.8c0 .9.4 1.8 1 2.5l3.2 3.7M7 22v-3.8c0-.9.4-1.8 1-2.5l3.2-3.7M17 2v3.8c0 .9-.4 1.8-1 2.5l-3.2 3.7M17 22v-3.8c0-.9-.4-1.8-1-2.5l-3.2-3.7"/></svg>`;
        verdictText.innerHTML = `<strong>Case Expired:</strong> The ${stateData.sol}-year Statute of Limitations for ${stateData.state} has passed.`;
    } else if (monthsRemaining < 6 && monthsRemaining > 0) {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#EFC50E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3L2 6M19 3l3 3"/></svg>`;
        verdictText.innerHTML = `<strong>URGENT:</strong> You have less than ${monthsRemaining} months to file before the Statute of Limitations expires in ${stateData.state}. Do not delay.`;
    } else if (netRecovery < 5000) {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#2DCC70" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg>`;
        verdictText.innerHTML = "<strong>Small Claim:</strong> This case may be suitable for direct negotiation. Hiring a lawyer might cost more than the value they add for this amount.";
    } else if (netRecovery > 25000) {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#B5855E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M3 7h18"/><path d="M6 7l-3 7c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L6 7z"/><path d="M18 7l-3 7c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5L18 7z"/><path d="M9 21h6"/></svg>`;
        verdictText.innerHTML = "<strong>Significant Injury:</strong> Insurance adjusters will try to minimize this claim. Professional legal representation is highly recommended to protect this value.";
    } else {
        verdictIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#7a7a7a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
        verdictText.innerHTML = "<strong>Moderate Claim:</strong> Ensure you have all medical records organized. Evaluate if an attorney's fee (33%) leaves you with enough net recovery.";
    }
}

/* ============================ */
/* Slider Helper Functions      */
/* ============================ */
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return Math.pow(val / config.max, 1/3) * 100;
    return ((val - config.min || 0) / (config.max - (config.min || 0))) * 100;
};

const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return config.max * Math.pow(percent / 100, 3);
    return ((percent / 100) * (config.max - (config.min || 0))) + (config.min || 0);
};

const updateSliderVisual = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = (slider.value - min) / (max - min) * 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

function initializeSliders() {
    Object.keys(SLIDER_CONFIG).forEach(key => {
        const input = document.getElementById(`input_${key}`);
        const slider = document.getElementById(`slider_${key}`);

        if (!input || !slider) return;

        const startVal = cleanNumber(input.value);
        slider.value = valToSlider(startVal, key);
        updateSliderVisual(slider);

        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100;
                else realVal = Math.round(realVal);
            } else {
                realVal = Math.round(realVal);
            }
            
            input.value = realVal; 
            updateSliderVisual(e.target);
            calculateResults(); 
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            calculateResults();
        });
    });
}

/* ============================ */
/* State Dropdown Populator     */
/* ============================ */
function populateStateDropdowns() {
    const stateSelect = document.getElementById('stateSelector');
    const stateWrapper = document.querySelector('#stateDropdownWrapper .dropdown-options-wrapper');
    const stateTrigger = document.querySelector('#stateDropdownWrapper .custom-dropdown-trigger');

    if (!stateSelect || !stateWrapper) return;

    stateSelect.innerHTML = '';
    stateWrapper.innerHTML = '';

    US_STATE_DATA.forEach(data => {
        const opt = document.createElement('option');
        opt.value = data.code;
        opt.textContent = data.state;
        if(data.code === 'CA') opt.selected = true;
        stateSelect.appendChild(opt);

        const divOpt = document.createElement('div');
        divOpt.className = 'dropdown-option';
        if(data.code === 'CA') divOpt.classList.add('selected');
        divOpt.setAttribute('data-value', data.code);
        divOpt.textContent = data.state;
        stateWrapper.appendChild(divOpt);
    });

    if(stateTrigger) stateTrigger.textContent = "California";
}

/* ============================ */
/* Custom Dropdown Logic        */
/* ============================ */
function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        if(wrapper.id === 'datePickerContainer') return;

        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        const options = wrapper.querySelectorAll('.dropdown-option');

        if(!trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            document.querySelectorAll('.custom-calendar-popup.active').forEach(m => {
                m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                trigger.textContent = option.textContent;
                
                wrapper.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                menu.classList.remove('active');
                
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    calculateResults(); 
                }
            });
        });
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
        const cal = document.getElementById('customCalendar');
        const trig = document.getElementById('dateTrigger');
        if(cal && cal.classList.contains('active') && !cal.contains(e.target) && e.target !== trig) {
            cal.classList.remove('active');
        }
    });
}

/* ============================ */
/* Custom Date Picker Logic     */
/* ============================ */
function initializeCustomDatePicker() {
    const trigger = document.getElementById('dateTrigger');
    const popup = document.getElementById('customCalendar');
    const hiddenInput = document.getElementById('accidentDateHidden');
    const monthLabel = document.getElementById('currentMonthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const grid = document.querySelector('.calendar-grid');

    if(!trigger || !popup) return;

    let displayDate = new Date();

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        popup.classList.toggle('active');
        renderCalendar(displayDate);
    });

    function renderCalendar(date) {
        grid.innerHTML = `
            <div class="calendar-day-name">Su</div>
            <div class="calendar-day-name">Mo</div>
            <div class="calendar-day-name">Tu</div>
            <div class="calendar-day-name">We</div>
            <div class="calendar-day-name">Th</div>
            <div class="calendar-day-name">Fr</div>
            <div class="calendar-day-name">Sa</div>
        `;

        const year = date.getFullYear();
        const month = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthLabel.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for(let i=0; i<firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }

        for(let i=1; i<=daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = i;
            
            if(hiddenInput.value) {
                const sel = new Date(hiddenInput.value);
                const checkDate = new Date(year, month, i);
                if(sel.toDateString() === checkDate.toDateString()) {
                    dayEl.classList.add('selected');
                }
            }

            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedDate = new Date(year, month, i);
                const yyyy = selectedDate.getFullYear();
                const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const dd = String(selectedDate.getDate()).padStart(2, '0');
                hiddenInput.value = `${yyyy}-${mm}-${dd}`;

                const readable = selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                trigger.textContent = readable;

                popup.classList.remove('active');
                calculateResults(); 
            });

            grid.appendChild(dayEl);
        }
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        displayDate.setMonth(displayDate.getMonth() - 1);
        renderCalendar(displayDate);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        displayDate.setMonth(displayDate.getMonth() + 1);
        renderCalendar(displayDate);
    });
}

/* ============================ */
/* Visual Feedback & Listeners  */
/* ============================ */

// Global Function for UpdateSeverity with Dual-Layer Shadow Support
function updateSeverity() {
    const radios = document.querySelectorAll('input[name="severity"]');
    const checkboxes = document.querySelectorAll('input[name="impact"]');
    
    // Both visible bar and shadow bar
    const bar = document.getElementById('severityBar');
    const shadowBar = document.getElementById('severityBarShadow');

    let score = 0;
    radios.forEach(r => {
        if(r.checked) {
            if(r.value === 'soft') score += 25;
            if(r.value === 'fracture') score += 50;
            if(r.value === 'surgery') score += 75;
        }
    });
    checkboxes.forEach(c => {
        if(c.checked) score += 5;
    });

    if(score > 100) score = 100;
    
    if(bar && shadowBar) {
        // Vibrant new colors
        let color = '#2DCC70'; // Green
        
        if (score <= 35) color = '#2DCC70';
        else if (score <= 70) color = '#EFC50E'; // Yellow
        else color = '#E84C3D'; // Red

        // Update Visual Layer
        bar.style.width = score + '%';
        bar.style.backgroundColor = color;
        
        // Update Shadow Layer
        shadowBar.style.width = score + '%';
        shadowBar.style.backgroundColor = color;
    }
    
    calculateResults();
}

function initializeVisualFeedback() {
    const insToggle = document.getElementById('insurancePaidToggle');
    const insLabel = document.getElementById('insurancePaidLabel');
    insToggle.addEventListener('change', () => {
        insLabel.textContent = insToggle.checked ? "Yes" : "No";
        calculateResults();
    });

    const attToggle = document.getElementById('attorneyToggle');
    const attLabel = document.getElementById('attorneyLabel');
    attToggle.addEventListener('change', () => {
        attLabel.textContent = attToggle.checked ? "Yes" : "No";
        calculateResults();
    });

    const radios = document.querySelectorAll('input[name="severity"]');
    const checkboxes = document.querySelectorAll('input[name="impact"]');

    radios.forEach(r => r.addEventListener('change', updateSeverity));
    checkboxes.forEach(c => c.addEventListener('change', updateSeverity));
}

/* ==========================================
   UNIVERSAL PRINT & PDF ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,
    
    // Updated map for simple inputs
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'select' },
        'driver': { id: 'driverInsurance', type: 'select' },
        'date': { id: 'accidentDateHidden', type: 'date' },
        'med': { id: 'input_medicalBills', type: 'number' },
        'wage': { id: 'input_lostWages', type: 'number' },
        'prop': { id: 'input_propDamage', type: 'number' },
        'fault': { id: 'input_faultShare', type: 'number' },
        'insPaid': { id: 'insurancePaidToggle', type: 'checkbox' },
        'attorney': { id: 'attorneyToggle', type: 'checkbox' }
    },

    restoreState() {
        const params = new URLSearchParams(window.location.search);
        if([...params].length === 0) return; // No params, do nothing

        // 1. Simple Inputs
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    if (config.type === 'checkbox') el.checked = (params.get(key) === 'true');
                    else el.value = params.get(key);
                    
                    // Special visual updates
                    if(key === 'state') {
                        // Update visual text for custom dropdown
                        const opt = document.querySelector(`.dropdown-option[data-value="${el.value}"]`);
                        if(opt) {
                            const wrapper = document.getElementById('stateDropdownWrapper');
                            const trig = wrapper.querySelector('.custom-dropdown-trigger');
                            if(trig) trig.textContent = opt.textContent;
                            wrapper.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
                            opt.classList.add('selected');
                        }
                    }
                    if(key === 'date') {
                        // Update date trigger text
                        const trig = document.getElementById('dateTrigger');
                        if(trig && el.value) {
                            const d = new Date(el.value);
                            // Adjust for timezone offset for display only
                            const userTimezoneOffset = d.getTimezoneOffset() * 60000;
                            const adjustedDate = new Date(d.getTime() + userTimezoneOffset);
                            trig.textContent = adjustedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                        }
                    }
                    if(key === 'driver') {
                         const opt = document.querySelector(`#driverInsurance option[value="${el.value}"]`);
                         if(opt) {
                             const wrapper = el.parentElement;
                             const trig = wrapper.querySelector('.custom-dropdown-trigger');
                             if(trig) trig.textContent = opt.textContent;
                         }
                    }
                }
            }
        }

        // 2. Radio (Severity)
        if(params.has('sev')) {
            const val = params.get('sev');
            const radio = document.querySelector(`input[name="severity"][value="${val}"]`);
            if(radio) radio.checked = true;
        }

        // 3. Checkboxes (Impacts)
        if(params.has('imp')) {
            // Clear all first
            document.querySelectorAll('input[name="impact"]').forEach(c => c.checked = false);
            const vals = params.get('imp').split(',');
            vals.forEach(v => {
                const chk = document.querySelector(`input[name="impact"][value="${v}"]`);
                if(chk) chk.checked = true;
            });
        }
        
        // Trigger generic updates
        initializeSliders(); // Re-init sliders to match new values
        
        // Visual Toggles Text update
        const insToggle = document.getElementById('insurancePaidToggle');
        if(insToggle) document.getElementById('insurancePaidLabel').textContent = insToggle.checked ? "Yes" : "No";
        const attToggle = document.getElementById('attorneyToggle');
        if(attToggle) document.getElementById('attorneyLabel').textContent = attToggle.checked ? "Yes" : "No";

        calculateResults();
    },
    
    setDefaultDate() {
        const hiddenInput = document.getElementById('accidentDateHidden');
        const trigger = document.getElementById('dateTrigger');
        if(hiddenInput && !hiddenInput.value) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            hiddenInput.value = `${yyyy}-${mm}-${dd}`;
            
            if(trigger) {
                trigger.textContent = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            }
        }
    },

    preparePrintData() {
        // --- 1. Gather all Data from DOM ---
        const clean = (id) => parseFloat(document.getElementById(id).value) || 0;
        const fmt = (n) => '$' + n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        const dateStr = new Date().toLocaleDateString();

        // State Context
        const stateSelect = document.getElementById('stateSelector');
        const stateName = stateSelect.options[stateSelect.selectedIndex].text;
        const stateCode = stateSelect.value;
        const stateData = US_STATE_DATA.find(s => s.code === stateCode) || US_STATE_DATA[0];

        // Economics
        const medical = clean('input_medicalBills');
        const wages = clean('input_lostWages');
        const prop = clean('input_propDamage');
        const fault = clean('input_faultShare');
        const insPaid = document.getElementById('insurancePaidToggle').checked;
        const isAttorney = document.getElementById('attorneyToggle').checked;

        // Logic check for severity to display text
        const severity = document.querySelector('input[name="severity"]:checked')?.value || 'soft';
        let sevText = "Soft Tissue";
        if (severity === 'fracture') sevText = "Fracture/Major";
        if (severity === 'surgery') sevText = "Surgical Intervention";

        // Impacts for display
        const impactArr = [];
        document.querySelectorAll('input[name="impact"]:checked').forEach(c => impactArr.push(c.parentElement.textContent.trim()));
        const impactStr = impactArr.length > 0 ? impactArr.length + " Factors" : "None";

        // Re-calculate Logic for Print consistency
        let multiplier = 1.5;
        if (severity === 'fracture') multiplier = 3.0;
        if (severity === 'surgery') multiplier = 5.0;
        multiplier += (impactArr.length * 0.3);
        
        let painCalc = medical * multiplier;
        if (stateData.cap_pain !== null && painCalc > stateData.cap_pain) painCalc = stateData.cap_pain;

        const totalEcon = medical + wages + prop;
        let gross = totalEcon + painCalc;
        
        // Fault
        let recoveryBarred = false;
        let faultReduct = 0;
        let finalGross = gross;
        
        if (stateData.fault_mode === 'Contrib' && fault > 0) recoveryBarred = true;
        if (stateData.fault_mode === 'Mod50' && fault >= 50) recoveryBarred = true;
        if (stateData.fault_mode === 'Mod51' && fault > 50) recoveryBarred = true;

        if(recoveryBarred) {
            finalGross = 0;
        } else {
            // Apply Fault
            finalGross = gross * (1 - (fault/100));
        }

        // Distribution
        const attFee = isAttorney ? (finalGross * 0.3333) : 0;
        const liens = insPaid ? Math.min(medical, finalGross - attFee) : 0;
        const net = Math.max(0, finalGross - attFee - liens - prop); // Prop usually goes to repairs

        // --- 2. Build the Official Document HTML ---
        const printContainer = document.getElementById('print-view-container');
        
        printContainer.innerHTML = `
            <div class="doc-wrapper">
                
                <!-- HEADER BLOCK -->
                <div class="doc-header-block">
                    <div class="header-content-row">
                        <img src="../../img/Logo_Golden.webp" alt="Solveria Logo" class="doc-logo">
                        <div class="doc-title-stack">
                            <h1>PERSONAL INJURY CLAIM VALUATION REPORT</h1>
                            <h2>PRELIMINARY DISBURSEMENT & LIABILITY ANALYSIS</h2>
                        </div>
                    </div>
                </div>

                <!-- META GRID -->
                <div class="doc-meta-grid">
                    <div class="meta-col">
                        <div class="meta-row"><span class="meta-lbl">PREPARED BY:</span><span class="meta-val">______________________</span></div>
                        <div class="meta-row"><span class="meta-lbl">CLAIMANT:</span><span class="meta-val">______________________</span></div>
                    </div>
                    <div class="meta-col">
                        <div class="meta-row"><span class="meta-lbl">DATE:</span><span class="meta-val">${dateStr}</span></div>
                        <div class="meta-row"><span class="meta-lbl">INCIDENT ID:</span><span class="meta-val">______________________</span></div>
                    </div>
                </div>

                <!-- SECTION I -->
                <div class="doc-section">
                    <div class="section-title">I. JURISDICTIONAL CONTEXT (${stateName.toUpperCase()})</div>
                    <div class="section-content">
                        <p class="context-text"><strong>LEGAL STATUS:</strong> ${stateData.alert || "Standard Comparative Fault Rules Apply."}</p>
                        <p class="context-text"><strong>NOTE:</strong> Your location determines fault rules and liability caps. If unknown, we assume State Minimum for safety.</p>
                    </div>
                </div>

                <!-- SECTION II -->
                <div class="doc-section">
                    <div class="section-title">II. SCHEDULE OF ECONOMIC DAMAGES (SPECIALS)</div>
                    <div class="section-content with-sidebar">
                        
                        <div class="data-table-grid">
                            <div class="dt-row">
                                <span class="dt-lbl">Medical Bills Incurred</span>
                                <span class="dt-val">${fmt(medical)}</span>
                                <span class="dt-lbl">Insurance Paid (Liens)</span>
                                <span class="dt-val">${insPaid ? 'Yes' : 'No'}</span>
                            </div>
                            <div class="dt-row">
                                <span class="dt-lbl">Lost Wages / Earning Capacity</span>
                                <span class="dt-val">${fmt(wages)}</span>
                                <span class="dt-lbl">Property Damage</span>
                                <span class="dt-val">${fmt(prop)}</span>
                            </div>
                            <div class="dt-row total-row">
                                <span class="dt-lbl">TOTAL ECONOMIC DAMAGES</span>
                                <span class="dt-val">${fmt(totalEcon)}</span>
                            </div>
                        </div>

                        <div class="analyst-note">
                            <strong>ANALYST NOTE:</strong> Ensure full billed amounts are recorded, not just co-pays. Repair costs represent the fair market value of the vehicle if totaled.
                        </div>

                    </div>
                </div>

                <!-- SECTION III -->
                <div class="doc-section">
                    <div class="section-title">III. INJURY & NON-ECONOMIC ASSESSMENT (GENERALS)</div>
                    <div class="section-content with-sidebar">
                        
                        <div class="data-table-grid">
                            <div class="dt-row">
                                <span class="dt-lbl">Injury Severity Classification</span>
                                <span class="dt-val">${sevText}</span>
                                <span class="dt-lbl">Claimant Fault Percentage</span>
                                <span class="dt-val">${fault}%</span>
                            </div>
                            <div class="dt-row">
                                <span class="dt-lbl">Life Impact Multipliers Applied</span>
                                <span class="dt-val">${impactStr}</span>
                                <span class="dt-lbl">Legal Representation Assumed</span>
                                <span class="dt-val">${isAttorney ? 'Yes' : 'No'}</span>
                            </div>
                            <div class="dt-row">
                                <span class="dt-lbl">Pain & Suffering Modifier</span>
                                <span class="dt-val">${multiplier.toFixed(1)}x</span>
                                <span class="dt-lbl">Standard Contingency Fee</span>
                                <span class="dt-val">33.3%</span>
                            </div>
                        </div>

                        <div class="analyst-note">
                            <strong>ANALYST NOTE:</strong> Objective medical evidence (like MRI/X-Ray) significantly increases value. The intensity score adjusts the multiplier for Pain & Suffering damages.
                        </div>

                    </div>
                </div>

                <!-- SECTION IV -->
                <div class="doc-section">
                    <div class="section-title">IV. ESTIMATED SETTLEMENT & DISBURSEMENT SUMMARY</div>
                    <div class="section-content with-sidebar">
                        
                        <div class="summary-list">
                            <div class="sum-item top">
                                <span class="sum-lbl">GROSS ESTIMATED CASE VALUE</span>
                                <span class="sum-val">${fmt(finalGross)}</span>
                            </div>
                            <div class="sum-item">
                                <span class="sum-lbl">Attorney Contingency Fee Deduction (33.3%)</span>
                                <span class="sum-val">-${fmt(attFee)}</span>
                            </div>
                            <div class="sum-item">
                                <span class="sum-lbl">Medical / Subrogation Lien Deductions</span>
                                <span class="sum-val">-${fmt(liens)}</span>
                            </div>
                            
                            <div class="sum-divider">========================================================================================</div>
                            <div class="sum-item final">
                                <span class="sum-lbl">ESTIMATED NET RECOVERY TO CLAIMANT</span>
                                <span class="sum-val">${fmt(net)}</span>
                            </div>
                            <div class="sum-divider">========================================================================================</div>
                        </div>

                        <div class="analyst-note">
                            <strong>ANALYST NOTE:</strong> Moderate Claim. Ensure you have all medical records organized. Evaluate if an attorney's fee (33.3%) leaves you with enough net recovery.
                        </div>

                    </div>
                </div>

                <!-- FOOTER -->
                <div class="doc-footer">
                    <div class="sig-row">
                        <div class="sig-block">
                            <span class="sig-line">________________________________________</span>
                            <span class="sig-txt">SIGNATURE OF CLAIMANT</span>
                        </div>
                        <div class="sig-block">
                            <span class="sig-line">________________________</span>
                            <span class="sig-txt">DATE</span>
                        </div>
                    </div>

                    <div class="doc-disclaimer">
                        LEGAL & METHODOLOGY DISCLAIMER: This Claim Valuation Report is generated automatically for informational and negotiation purposes only. The figures presented are algorithmic estimates based on user-provided inputs and standard insurance adjustment multipliers. This document does not constitute legal advice, a binding financial guarantee, or a certified medical/actuarial appraisal. Users are encouraged to verify liability caps and subrogation laws in their specific jurisdiction. Claimants assume all responsibility for how this data is utilized in settlement negotiations.
                    </div>
                </div>

            </div>
        `;
    },

    closeTutorialModal() {
        document.getElementById('pdf-tutorial-overlay').classList.remove('active');
    },

    handleTutorialProceed() {
        this.closeTutorialModal();
        window.print();
    },

    startPrintSequence() {
        const modal = document.getElementById('pdf-tutorial-overlay');
        const proceedBtn = document.getElementById('btn-proceed');
        if (this.isTutorialUnlocked) {
            this.preparePrintData();
            modal.classList.add('active');
            proceedBtn.disabled = false;
            proceedBtn.textContent = "Proceed";
            return;
        }
        let timeLeft = 3;
        this.preparePrintData();
        modal.classList.add('active');
        proceedBtn.disabled = true;
        proceedBtn.textContent = `Proceed (${timeLeft})`;
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) proceedBtn.textContent = `Proceed (${timeLeft})`;
            else {
                clearInterval(timer);
                proceedBtn.textContent = "Proceed";
                proceedBtn.disabled = false;
                this.isTutorialUnlocked = true;
            }
        }, 1000);
    },

    init() {
        this.setDefaultDate(); // Set default date on load
        this.restoreState();   // Restore inputs from URL if present
        
        const btnPrint = document.getElementById('btn-print');
        if (btnPrint) btnPrint.addEventListener('click', () => {
            this.preparePrintData();
            window.print();
        });
        
        const btnPDF = document.getElementById('btn-save-pdf');
        if (btnPDF) btnPDF.addEventListener('click', () => this.startPrintSequence());
        
        const btnProceed = document.getElementById('btn-proceed');
        if (btnProceed) btnProceed.addEventListener('click', () => this.handleTutorialProceed());
        
        const modal = document.getElementById('pdf-tutorial-overlay');
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) this.closeTutorialModal(); });
    }
};

/* ============================ */
/* Main Initialization          */
/* ============================ */
function initApp() {
    populateStateDropdowns();   
    initializeSliders();
    initializeCustomDropdowns(); 
    initializeCustomDatePicker();
    initializeVisualFeedback();
    ToolFeatures.init(); 
    
    // Initial Calc & Visual Update (Fix for "Garbage" Inputs)
    updateSeverity();
    calculateResults();
    initScrollReveal();
}

/* ============================ */
/* Scroll Reveal Initialization */
/* ============================ */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Ensures init runs properly whether natively loaded or injected via JS
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}