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

/* ============================ */
/* Breeding Text Logic          */
/* ============================ */
const phrases = [
    "Assess the real value.",
    "Understand the settlement.",
    "Calculate your potential claim."
];

let currentIndex = 0;
const textElement = document.getElementById('breathing-text');

function cycleText() {
    textElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        textElement.textContent = phrases[currentIndex];
        textElement.classList.remove('fade-out');
    }, 1000);
}

setInterval(cycleText, 4000);

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
        maximumFractionDigits: 0
    }).format(num);
};

const cleanNumber = (num) => parseFloat(num) || 0;

/* ============================ */
/* Core Calculation Engine      */
/* ============================ */
function calculateResults() {
    // 1. Get Inputs
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = US_STATE_DATA.find(s => s.code === stateCode) || US_STATE_DATA[0]; // Default to first if not found

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
    multiplier += (impacts.length * 0.3); // Add 0.3 per impact

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
        // Pure Comparative: Reduce by fault %
        grossSettlement = grossSettlement * (1 - (userFault / 100));
    } else if (stateData.fault_mode === 'Mod50') {
        // Barred if 50% or more
        if (userFault >= 50) {
            grossSettlement = 0;
            recoveryAllowed = false;
        } else {
            grossSettlement = grossSettlement * (1 - (userFault / 100));
        }
    } else if (stateData.fault_mode === 'Mod51') {
        // Barred if > 50% (51%+)
        if (userFault > 50) {
            grossSettlement = 0;
            recoveryAllowed = false;
        } else {
            grossSettlement = grossSettlement * (1 - (userFault / 100));
        }
    } else if (stateData.fault_mode === 'Contrib') {
        // Strict: Barred if 1% or more
        if (userFault > 0) {
            grossSettlement = 0;
            recoveryAllowed = false;
        }
    } else if (stateData.fault_mode === 'Slight') {
        // South Dakota Rule: Rough approximation
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
    // 'unknown' assumes state_min for safety in logic below
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

    // Liens: If insurance paid, you likely owe them back. 
    // Simplified: Assume Lien is equal to medical bills amount (often negotiated, but conservative est).
    let medicalLien = 0;
    if (isInsurancePaid) {
        medicalLien = medical; 
        // Logic check: Lien cannot exceed remaining amount
        if (medicalLien > (actualGross - attorneyFee)) {
            medicalLien = Math.max(0, actualGross - attorneyFee);
        }
    }

    // Property damage usually goes to repair shop, not pocket.
    // Net Pocket = Gross - Attorney - Lien - PropDamage
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

        // Calculate months remaining
        const limitDate = new Date(accDate);
        limitDate.setFullYear(accDate.getFullYear() + stateData.sol);
        const timeToLimit = limitDate - today;
        monthsRemaining = Math.ceil(timeToLimit / (1000 * 60 * 60 * 24 * 30)); 
    }

    // ======================
    // UPDATE UI
    // ======================

    // A. Gross Headline
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
        grossEl.textContent = formatMoney(actualGross);
        grossEl.style.color = "#333";
        if (isCapped) {
            warningEl.classList.remove('hidden');
        } else {
            warningEl.classList.add('hidden');
        }
    }

    // B. Waterfall Chart
    const barAttorney = document.querySelector('.bar-segment.attorney');
    const barLiens = document.querySelector('.bar-segment.liens');
    const barNet = document.querySelector('.bar-segment.net');

    if (actualGross > 0) {
        const pctAttorney = (attorneyFee / actualGross) * 100;
        const pctLiens = (medicalLien / actualGross) * 100;
        // Remaining is Net + Prop Damage (visually combined for simplicity or separate?)
        // Let's visualize Net + Prop as the user's portion, or just Net?
        // Prompt says "YOUR ESTIMATED NET RECOVERY". Let's assume Net.
        const pctNet = 100 - pctAttorney - pctLiens;

        barAttorney.style.width = pctAttorney + '%';
        barLiens.style.width = pctLiens + '%';
        barNet.style.width = pctNet + '%';
        
        barAttorney.innerHTML = pctAttorney > 5 ? `<span>$${Math.round(attorneyFee/1000)}k</span>` : '';
        barLiens.innerHTML = pctLiens > 5 ? `<span>$${Math.round(medicalLien/1000)}k</span>` : '';
        barNet.innerHTML = pctNet > 5 ? `<span>$${Math.round((netRecovery + propDamage)/1000)}k</span>` : '';
        
    } else {
        barAttorney.style.width = '0%';
        barLiens.style.width = '0%';
        barNet.style.width = '0%';
        barAttorney.innerHTML = ''; barLiens.innerHTML = ''; barNet.innerHTML = '';
    }

    // C. Verdict Card
    const verdictIcon = document.querySelector('.verdict-icon');
    const verdictText = document.querySelector('.verdict-text');

    if (!recoveryAllowed) {
        verdictIcon.textContent = "🛑";
        verdictText.innerHTML = `<strong>Recovery Barred:</strong> Under ${stateData.state} law, your level of fault (${userFault}%) prevents you from recovering damages.`;
    } else if (isExpired) {
        verdictIcon.textContent = "⌛";
        verdictText.innerHTML = `<strong>Case Expired:</strong> The ${stateData.sol}-year Statute of Limitations for ${stateData.state} has passed.`;
    } else if (monthsRemaining < 6 && monthsRemaining > 0) {
        verdictIcon.textContent = "⏰";
        verdictText.innerHTML = `<strong>URGENT:</strong> You have less than ${monthsRemaining} months to file before the Statute of Limitations expires in ${stateData.state}. Do not delay.`;
    } else if (netRecovery < 5000) {
        verdictIcon.textContent = "🤝";
        verdictText.innerHTML = "<strong>Small Claim:</strong> This case may be suitable for direct negotiation. Hiring a lawyer might cost more than the value they add for this amount.";
    } else if (netRecovery > 25000) {
        verdictIcon.textContent = "⚖️";
        verdictText.innerHTML = "<strong>Significant Injury:</strong> Insurance adjusters will try to minimize this claim. Professional legal representation is highly recommended to protect this value.";
    } else {
        verdictIcon.textContent = "📝";
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

        // Init
        const startVal = cleanNumber(input.value);
        slider.value = valToSlider(startVal, key);
        updateSliderVisual(slider);

        // Events
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
            calculateResults(); // Trigger calc
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            calculateResults(); // Trigger calc
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

    // Clear existing
    stateSelect.innerHTML = '';
    stateWrapper.innerHTML = '';

    // Loop through Data
    US_STATE_DATA.forEach(data => {
        // Create Select Option
        const opt = document.createElement('option');
        opt.value = data.code;
        opt.textContent = data.state;
        if(data.code === 'CA') opt.selected = true; // Default
        stateSelect.appendChild(opt);

        // Create Div Option
        const divOpt = document.createElement('div');
        divOpt.className = 'dropdown-option';
        if(data.code === 'CA') divOpt.classList.add('selected');
        divOpt.setAttribute('data-value', data.code);
        divOpt.textContent = data.state;
        stateWrapper.appendChild(divOpt);
    });

    // Set Default Trigger Text
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
        // NOTE: We select options here dynamically so it picks up the populated ones
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
                
                // Remove selected from siblings
                wrapper.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                menu.classList.remove('active');
                
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    calculateResults(); // Trigger calc on change
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
                // Fix timezone offset issue for comparison
                const selDate = sel.getDate(); // UTC day might differ, but local input uses yyyy-mm-dd
                // Simple string check is safer or UTC date
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
                calculateResults(); // Trigger Calc
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
function initializeVisualFeedback() {
    // Toggles
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

    // Severity Bar Logic
    const radios = document.querySelectorAll('input[name="severity"]');
    const checkboxes = document.querySelectorAll('input[name="impact"]');
    const bar = document.getElementById('severityBar');

    function updateSeverity() {
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
        
        if(bar) {
            bar.style.width = score + '%';
            if (score <= 35) bar.style.backgroundColor = '#66bb6a';
            else if (score <= 70) bar.style.backgroundColor = '#ffa726';
            else bar.style.backgroundColor = '#ef5350';
        }
        calculateResults();
    }

    radios.forEach(r => r.addEventListener('change', updateSeverity));
    checkboxes.forEach(c => c.addEventListener('change', updateSeverity));
}

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    populateStateDropdowns();   // Inject States First
    initializeSliders();
    initializeCustomDropdowns(); // Attach Listeners to injected states
    initializeCustomDatePicker();
    initializeVisualFeedback();
    
    // Initial Calc
    calculateResults();
});