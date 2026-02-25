/* ==========================================
   US STATE DATA & FEDERAL TAX ENGINE (2025-2026)
   Source: IRS Rev. Proc. 2024-40, S&P Global, Tax Foundation
   ========================================== */

const FEDERAL_DATA_2025 = {
    standardDeduction: {
        single: 15750,
        married: 31500, // Married Filing Jointly
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
        married: [ // MFJ
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
        socialSecurityCap: 176100
    }
};

const US_STATE_DATA = {
    AL: { name: "Alabama", incomeTax: { topRate: 0.05 }, propertyTax: { effectiveRate: 0.0039 }, insurance: { avgAnnual: 3114 } },
    AK: { name: "Alaska", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0102 }, insurance: { avgAnnual: 1035 } },
    AZ: { name: "Arizona", incomeTax: { topRate: 0.025 }, propertyTax: { effectiveRate: 0.0053 }, insurance: { avgAnnual: 2331 } },
    AR: { name: "Arkansas", incomeTax: { topRate: 0.044 }, propertyTax: { effectiveRate: 0.0064 }, insurance: { avgAnnual: 3287 } },
    CA: { name: "California", incomeTax: { topRate: 0.144 }, propertyTax: { effectiveRate: 0.0071 }, insurance: { avgAnnual: 1641 } },
    CO: { name: "Colorado", incomeTax: { topRate: 0.044 }, propertyTax: { effectiveRate: 0.0052 }, insurance: { avgAnnual: 3412 } },
    CT: { name: "Connecticut", incomeTax: { topRate: 0.0699 }, propertyTax: { effectiveRate: 0.0179 }, insurance: { avgAnnual: 1700 } },
    DE: { name: "Delaware", incomeTax: { topRate: 0.066 }, propertyTax: { effectiveRate: 0.0059 }, insurance: { avgAnnual: 966 } },
    DC: { name: "District of Columbia", incomeTax: { topRate: 0.1075 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1250 } },
    FL: { name: "Florida", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0086 }, insurance: { avgAnnual: 5838 } },
    GA: { name: "Georgia", incomeTax: { topRate: 0.0549 }, propertyTax: { effectiveRate: 0.0091 }, insurance: { avgAnnual: 2041 } },
    HI: { name: "Hawaii", incomeTax: { topRate: 0.11 }, propertyTax: { effectiveRate: 0.0031 }, insurance: { avgAnnual: 1296 } },
    ID: { name: "Idaho", incomeTax: { topRate: 0.058 }, propertyTax: { effectiveRate: 0.0067 }, insurance: { avgAnnual: 1409 } },
    IL: { name: "Illinois", incomeTax: { topRate: 0.0495 }, propertyTax: { effectiveRate: 0.0208 }, insurance: { avgAnnual: 2225 } },
    IN: { name: "Indiana", incomeTax: { topRate: 0.0305 }, propertyTax: { effectiveRate: 0.0083 }, insurance: { avgAnnual: 1666 } },
    IA: { name: "Iowa", incomeTax: { topRate: 0.057 }, propertyTax: { effectiveRate: 0.0152 }, insurance: { avgAnnual: 2446 } },
    KS: { name: "Kansas", incomeTax: { topRate: 0.057 }, propertyTax: { effectiveRate: 0.0134 }, insurance: { avgAnnual: 4444 } },
    KY: { name: "Kentucky", incomeTax: { topRate: 0.04 }, propertyTax: { effectiveRate: 0.0083 }, insurance: { avgAnnual: 3540 } },
    LA: { name: "Louisiana", incomeTax: { topRate: 0.0425 }, propertyTax: { effectiveRate: 0.0056 }, insurance: { avgAnnual: 6274 } },
    ME: { name: "Maine", incomeTax: { topRate: 0.0715 }, propertyTax: { effectiveRate: 0.0124 }, insurance: { avgAnnual: 1219 } },
    MD: { name: "Maryland", incomeTax: { topRate: 0.0575 }, propertyTax: { effectiveRate: 0.0105 }, insurance: { avgAnnual: 1751 } },
    MA: { name: "Massachusetts", incomeTax: { topRate: 0.05 }, propertyTax: { effectiveRate: 0.0114 }, insurance: { avgAnnual: 1733 } },
    MI: { name: "Michigan", incomeTax: { topRate: 0.0425 }, propertyTax: { effectiveRate: 0.0138 }, insurance: { avgAnnual: 2368 } },
    MN: { name: "Minnesota", incomeTax: { topRate: 0.0985 }, propertyTax: { effectiveRate: 0.0111 }, insurance: { avgAnnual: 2852 } },
    MS: { name: "Mississippi", incomeTax: { topRate: 0.047 }, propertyTax: { effectiveRate: 0.0079 }, insurance: { avgAnnual: 3353 } },
    MO: { name: "Missouri", incomeTax: { topRate: 0.048 }, propertyTax: { effectiveRate: 0.0096 }, insurance: { avgAnnual: 2191 } },
    MT: { name: "Montana", incomeTax: { topRate: 0.059 }, propertyTax: { effectiveRate: 0.0074 }, insurance: { avgAnnual: 2801 } },
    NE: { name: "Nebraska", incomeTax: { topRate: 0.0584 }, propertyTax: { effectiveRate: 0.0163 }, insurance: { avgAnnual: 6587 } },
    NV: { name: "Nevada", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0059 }, insurance: { avgAnnual: 1074 } },
    NH: { name: "New Hampshire", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0193 }, insurance: { avgAnnual: 1039 } },
    NJ: { name: "New Jersey", incomeTax: { topRate: 0.1075 }, propertyTax: { effectiveRate: 0.0223 }, insurance: { avgAnnual: 1214 } },
    NM: { name: "New Mexico", incomeTax: { topRate: 0.059 }, propertyTax: { effectiveRate: 0.0073 }, insurance: { avgAnnual: 2179 } },
    NY: { name: "New York", incomeTax: { topRate: 0.109 }, propertyTax: { effectiveRate: 0.0164 }, insurance: { avgAnnual: 1860 } },
    NC: { name: "North Carolina", incomeTax: { topRate: 0.045 }, propertyTax: { effectiveRate: 0.0082 }, insurance: { avgAnnual: 2951 } },
    ND: { name: "North Dakota", incomeTax: { topRate: 0.025 }, propertyTax: { effectiveRate: 0.0098 }, insurance: { avgAnnual: 2776 } },
    OH: { name: "Ohio", incomeTax: { topRate: 0.035 }, propertyTax: { effectiveRate: 0.0159 }, insurance: { avgAnnual: 1364 } },
    OK: { name: "Oklahoma", incomeTax: { topRate: 0.0475 }, propertyTax: { effectiveRate: 0.0089 }, insurance: { avgAnnual: 4695 } },
    OR: { name: "Oregon", incomeTax: { topRate: 0.099 }, propertyTax: { effectiveRate: 0.0093 }, insurance: { avgAnnual: 1091 } },
    PA: { name: "Pennsylvania", incomeTax: { topRate: 0.0307 }, propertyTax: { effectiveRate: 0.0150 }, insurance: { avgAnnual: 1278 } },
    RI: { name: "Rhode Island", incomeTax: { topRate: 0.0599 }, propertyTax: { effectiveRate: 0.0153 }, insurance: { avgAnnual: 2347 } },
    SC: { name: "South Carolina", incomeTax: { topRate: 0.064 }, propertyTax: { effectiveRate: 0.0055 }, insurance: { avgAnnual: 2611 } },
    SD: { name: "South Dakota", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0122 }, insurance: { avgAnnual: 3152 } },
    TN: { name: "Tennessee", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0067 }, insurance: { avgAnnual: 2672 } },
    TX: { name: "Texas", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0163 }, insurance: { avgAnnual: 5045 } },
    UT: { name: "Utah", incomeTax: { topRate: 0.0465 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1283 } },
    VT: { name: "Vermont", incomeTax: { topRate: 0.0875 }, propertyTax: { effectiveRate: 0.0183 }, insurance: { avgAnnual: 827 } },
    VA: { name: "Virginia", incomeTax: { topRate: 0.0575 }, propertyTax: { effectiveRate: 0.0087 }, insurance: { avgAnnual: 1706 } },
    WA: { name: "Washington", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0087 }, insurance: { avgAnnual: 1539 } },
    WV: { name: "West Virginia", incomeTax: { topRate: 0.0512 }, propertyTax: { effectiveRate: 0.0057 }, insurance: { avgAnnual: 1650 } },
    WI: { name: "Wisconsin", incomeTax: { topRate: 0.0765 }, propertyTax: { effectiveRate: 0.0161 }, insurance: { avgAnnual: 1400 } },
    WY: { name: "Wyoming", incomeTax: { topRate: 0.00 }, propertyTax: { effectiveRate: 0.0056 }, insurance: { avgAnnual: 1300 } }
};

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "Focus on liquidity. Optimize the now.",
    "See the full cost — not just the tax.",
    "Understand today. Regret less tomorrow.",
    "Cash flow is king."
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
/* Slider & Input Logic         */
/* ============================ */

// 1. Slider Configuration
const SLIDER_CONFIG = {
    // Global
    propTaxGlobal: { type: 'linear', max: 5 },
    insuranceGlobal: { type: 'cubic', max: 10000 },

    // Mode A: Cash Flow Optimizer
    grossSalaryA: { type: 'cubic', max: 500000 },
    netPayA: { type: 'cubic', max: 20000 },
    preTaxA: { type: 'cubic', max: 5000 },
    dependentsA: { type: 'linear', max: 10 },
    bufferA: { type: 'cubic', max: 2000 },
    
    currentBillA: { type: 'cubic', max: 10000 },
    newLoanA: { type: 'cubic', max: 2000000 },
    newRateA: { type: 'linear', max: 15 },
    newTermA: { type: 'linear', max: 40 },
    closingCostsA: { type: 'cubic', max: 20000 },

    // Mode B: Wealth & Velocity
    loanBalanceB: { type: 'cubic', max: 2000000 },
    rateB: { type: 'linear', max: 15 },
    remainingTermB: { type: 'linear', max: 40 },
    
    boostB: { type: 'cubic', max: 5000 },
    lumpSumB: { type: 'cubic', max: 100000 },
    oppCostB: { type: 'linear', max: 15 },
    
    newRateB: { type: 'linear', max: 15 },
    newTermB: { type: 'linear', max: 40 },
    closingCostsB: { type: 'cubic', max: 20000 }
};

// 2. Helper: Convert Value to Slider Percentage
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return Math.pow(val / config.max, 1/3) * 100;
    // Linear
    const min = config.min || 0;
    return ((val - min) / (config.max - min)) * 100;
};

// 3. Helper: Convert Slider Percentage to Value
const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return config.max * Math.pow(percent / 100, 3);
    // Linear
    const min = config.min || 0;
    return ((percent / 100) * (config.max - min)) + min;
};

// 4. Helper: Update Visual Gradient
const updateSliderVisual = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = (slider.value - min) / (max - min) * 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

// 5. Helper: Format Output (basic rounding for input fields)
const cleanNumber = (num) => parseFloat(num) || 0;

// Initialize Sliders
function initializeSliders() {
    Object.keys(SLIDER_CONFIG).forEach(key => {
        const input = document.getElementById(`input_${key}`);
        const slider = document.getElementById(`slider_${key}`);

        if (!input || !slider) return;

        // Initialize visual state based on HTML default value
        const startVal = cleanNumber(input.value);
        slider.value = valToSlider(startVal, key);
        updateSliderVisual(slider);

        // Slider -> Text Input
        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            
            // Rounding logic
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100; 
                else realVal = Math.round(realVal);
            } else {
                realVal = Math.round(realVal * 1000) / 1000; 
            }
            
            input.value = realVal; 
            updateSliderVisual(e.target);
            updateCalculations(); 
            
            // HIDE AUTO BADGE ON INTERACTION
            const badgeId = `badge_${key}`;
            const badge = document.getElementById(badgeId);
            if(badge) badge.classList.add('hidden');
        });

        // Text Input -> Slider
        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            updateCalculations();
            
            // HIDE AUTO BADGE ON INTERACTION
            const badgeId = `badge_${key}`;
            const badge = document.getElementById(badgeId);
            if(badge) badge.classList.add('hidden');
        });
    });
}

/* ============================ */
/* Custom Dropdown Logic        */
/* ============================ */
function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        const options = wrapper.querySelectorAll('.dropdown-option');

        // Toggle Menu Visibility
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other open menus first
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        // Option Selection Logic
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                
                // Update UI
                trigger.textContent = option.textContent;
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                menu.classList.remove('active');
                
                // Update Hidden Select & Trigger Change Event
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });

        // Listen for change on the hidden select to trigger calculation
        if(select) {
            select.addEventListener('change', () => {
                // If it's the state selector, update global data
                if(select.id === 'stateSelector') {
                    updateGlobalStateData(select.value);
                }
                updateCalculations();
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    });
}

/* ============================ */
/* Checkbox Logic               */
/* ============================ */
function initializeCheckbox() {
    const checkbox = document.getElementById('input_itemizeGlobal');
    if(checkbox) {
        checkbox.addEventListener('change', () => {
             updateCalculations();
        });
    }
}

/* ============================ */
/* State Data Engine Logic      */
/* ============================ */
function updateGlobalStateData(stateCode) {
    const data = US_STATE_DATA[stateCode] || US_STATE_DATA['CA'];
    
    // Auto-fill Global Sliders
    // 1. Property Tax
    const propTaxInput = document.getElementById('input_propTaxGlobal');
    const propTaxSlider = document.getElementById('slider_propTaxGlobal');
    const propTaxBadge = document.getElementById('badge_propTaxGlobal');
    
    if(propTaxInput && propTaxSlider) {
        // Convert rate 0.0071 to 0.71%
        const ratePct = (data.propertyTax.effectiveRate * 100).toFixed(2);
        propTaxInput.value = ratePct;
        propTaxSlider.value = valToSlider(ratePct, 'propTaxGlobal');
        updateSliderVisual(propTaxSlider);
        
        // Show Auto Badge
        if(propTaxBadge) propTaxBadge.classList.remove('hidden');
    }

    // 2. Insurance
    const insInput = document.getElementById('input_insuranceGlobal');
    const insSlider = document.getElementById('slider_insuranceGlobal');
    const insBadge = document.getElementById('badge_insuranceGlobal');
    
    if(insInput && insSlider) {
        insInput.value = data.insurance.avgAnnual;
        insSlider.value = valToSlider(data.insurance.avgAnnual, 'insuranceGlobal');
        updateSliderVisual(insSlider);
        
        // Show Auto Badge
        if(insBadge) insBadge.classList.remove('hidden');
    }
}

/* ============================ */
/* Calculation Engine (ARC Reactor) */
/* ============================ */

// Global storage for print view
let currentCalcData = {
    gross: 0,
    fedTax: 0,
    stateTax: 0,
    ficaTax: 0,
    totalTax: 0,
    netPay: 0,
    cashFreed: 0,
    annualVar: 0,
    timeReclaimed: 0,
    intSaved: 0,
    payoffDateOld: '',
    payoffDateNew: ''
};

// Global flag for tutorial
let isTutorialUnlocked = false;

// Helper: Format Currency
const fmtMoney = (num) => {
    return '$' + Math.floor(num).toLocaleString();
};

// Helper: Calculate Federal Tax (Progressive)
function getFederalTaxLiability(taxableIncome, statusKey) {
    // Map dropdown values to data keys
    // Single -> single, MFJ -> married, HOH -> headOfHousehold
    let key = 'single';
    if(statusKey === 'MFJ') key = 'married';
    if(statusKey === 'HOH') key = 'headOfHousehold';

    const brackets = FEDERAL_DATA_2025.brackets[key];
    let tax = 0;
    let previousMax = 0;

    for (const bracket of brackets) {
        if (taxableIncome > previousMax) {
            const cap = bracket.max === Infinity ? taxableIncome : bracket.max;
            const taxableAmount = Math.min(taxableIncome, cap) - previousMax;
            if(taxableAmount > 0) {
                tax += taxableAmount * bracket.rate;
            }
            previousMax = bracket.max;
        } else {
            break;
        }
    }
    return tax;
}

// Helper: Monthly P&I
function calculateMortgagePI(principal, annualRate, years) {
    if (principal <= 0 || years <= 0) return 0;
    if (annualRate <= 0) return principal / (years * 12);
    
    const r = annualRate / 100 / 12;
    const n = years * 12;
    return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Helper: Total Interest Paid
function calculateTotalInterest(principal, annualRate, years, monthlyExtra = 0) {
    if (principal <= 0) return 0;
    let balance = principal;
    const r = annualRate / 100 / 12;
    const regularPayment = calculateMortgagePI(principal, annualRate, years);
    let totalPaid = 0;
    let months = 0;

    while(balance > 0 && months < years * 12) {
        let interest = balance * r;
        let principalPayment = (regularPayment + monthlyExtra) - interest;
        
        if (principalPayment > balance) {
            principalPayment = balance;
            totalPaid += (balance + interest); // Pay off remainder
            balance = 0;
        } else {
            balance -= principalPayment;
            totalPaid += (regularPayment + monthlyExtra);
        }
        months++;
    }
    
    // If balance remains after term (rare with loop guard), add it
    return Math.max(0, totalPaid - principal);
}

// Helper: Time to Payoff
function calculatePayoffMonths(principal, annualRate, years, monthlyExtra = 0) {
    if (principal <= 0) return 0;
    const r = annualRate / 100 / 12;
    const regularPayment = calculateMortgagePI(principal, annualRate, years);
    const totalPayment = regularPayment + monthlyExtra;
    
    if (totalPayment <= principal * r) return years * 12; // Never pays off if < interest

    // N = -log(1 - (r * P) / A) / log(1 + r)
    const numerator = -Math.log(1 - (r * principal) / totalPayment);
    const denominator = Math.log(1 + r);
    return Math.ceil(numerator / denominator);
}

// MAIN CALCULATION FUNCTION
function updateCalculations() {
    // 1. Gather Global Inputs
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = US_STATE_DATA[stateCode] || US_STATE_DATA['CA'];
    const doItemize = document.getElementById('input_itemizeGlobal').checked;
    
    // 2. Mode A: Cash Flow Optimizer
    // --- Scenario Fix Withholding ---
    const grossSalary = cleanNumber(document.getElementById('input_grossSalaryA').value);
    const filingStatus = document.getElementById('filingStatusA').value; // Single, MFJ, HOH
    const payFreq = document.getElementById('payFreqA').value; 
    const userInputNet = cleanNumber(document.getElementById('input_netPayA').value);
    const preTaxContrib = cleanNumber(document.getElementById('input_preTaxA').value); // Monthly
    
    // Determine Freq Multiplier
    let payPeriods = 26; // Bi-weekly default
    if(payFreq === 'Monthly') payPeriods = 12;
    if(payFreq === 'Semi-monthly') payPeriods = 24;
    if(payFreq === 'Weekly') payPeriods = 52;

    // Calc Taxable Income
    let taxableIncome = grossSalary - (preTaxContrib * 12);
    
    // Deductions
    let standardDed = FEDERAL_DATA_2025.standardDeduction.single;
    if(filingStatus === 'MFJ') standardDed = FEDERAL_DATA_2025.standardDeduction.married;
    if(filingStatus === 'HOH') standardDed = FEDERAL_DATA_2025.standardDeduction.headOfHousehold;
    
    // Tax Logic
    let federalTax = 0;
    let stateTax = 0;

    if(doItemize) {
        // Simple Itemized Logic: State Tax + Prop Tax Estimate (Capped at 10k SALT)
        const estPropTax = 4000; // placeholder average
        const estStateTax = taxableIncome * stateData.incomeTax.topRate;
        const saltDed = Math.min(10000, estPropTax + estStateTax);
        taxableIncome -= Math.max(standardDed, saltDed); // Take larger
    } else {
        taxableIncome -= standardDed;
    }
    
    taxableIncome = Math.max(0, taxableIncome);

    // Calculate Taxes
    federalTax = getFederalTaxLiability(taxableIncome, filingStatus);
    stateTax = taxableIncome * stateData.incomeTax.topRate; // Using top rate for conservative estimate
    
    // FICA
    const ssTax = Math.min(grossSalary, FEDERAL_DATA_2025.fica.socialSecurityCap) * FEDERAL_DATA_2025.fica.socialSecurityRate;
    const medTax = grossSalary * FEDERAL_DATA_2025.fica.medicareRate;
    const totalFica = ssTax + medTax;

    const totalAnnualTax = federalTax + stateTax + totalFica;
    const calculatedAnnualNet = grossSalary - (preTaxContrib * 12) - totalAnnualTax;
    const calculatedPerPaycheck = calculatedAnnualNet / payPeriods;
    
    // Cash Freed Up
    let cashFreedUp = calculatedPerPaycheck - userInputNet;
    
    // --- Scenario Lower Bills ---
    const currentBill = cleanNumber(document.getElementById('input_currentBillA').value);
    const newLoanAmtA = cleanNumber(document.getElementById('input_newLoanA').value);
    const newRateA = cleanNumber(document.getElementById('input_newRateA').value);
    const newTermA = cleanNumber(document.getElementById('input_newTermA').value);
    
    const newMonthlyBill = calculateMortgagePI(newLoanAmtA, newRateA, newTermA);
    const billSavings = Math.max(0, currentBill - newMonthlyBill);

    // Determine which scenario is active for display
    const isScenarioFixActive = !document.getElementById('scenario-fix-container').classList.contains('hidden');
    const finalMonthlySavings = isScenarioFixActive ? (cashFreedUp * (payPeriods/12)) : billSavings;

    // UPDATE MODE A UI
    const elCashFreed = document.getElementById('res_cashFreedA');
    const elTraffic = document.getElementById('res_trafficLightA');
    const elLifestyle = document.getElementById('res_lifestyleA');

    if(elCashFreed) elCashFreed.textContent = fmtMoney(Math.max(0, finalMonthlySavings));
    
    if(elTraffic) {
        // Reset classes first
        elTraffic.className = "result-value";
        
        if(finalMonthlySavings > 100) {
            elTraffic.textContent = "Significant Boost";
            elTraffic.classList.add("status-text-green");
        } else if (finalMonthlySavings > 20) {
            elTraffic.textContent = "Lifestyle Upgrade";
            elTraffic.classList.add("status-text-yellow");
        } else {
            elTraffic.textContent = "Already Efficient";
            elTraffic.classList.add("status-text-gray");
        }
    }

    if(elLifestyle) {
        const gasPrice = 50; // approx tank
        const tanks = Math.floor(finalMonthlySavings / gasPrice);
        if(tanks > 0) elLifestyle.textContent = `Approx. ${tanks} Tanks of Gas`;
        else elLifestyle.textContent = "Less than 1 Tank of Gas";
    }

    // 3. Mode B: Wealth & Velocity
    // --- Scenario Pay Debt ---
    const loanBalB = cleanNumber(document.getElementById('input_loanBalanceB').value);
    const rateB = cleanNumber(document.getElementById('input_rateB').value);
    const remTermB = cleanNumber(document.getElementById('input_remainingTermB').value);
    const boostB = cleanNumber(document.getElementById('input_boostB').value);
    const lumpSumB = cleanNumber(document.getElementById('input_lumpSumB').value);

    // Original Path
    const payoffMonthsOld = remTermB * 12;
    const totalIntOld = calculateTotalInterest(loanBalB, rateB, remTermB, 0);
    const totalCostOld = loanBalB + totalIntOld;

    // Optimized Path (Boost + Lump Sum)
    const effectivePrincipal = Math.max(0, loanBalB - lumpSumB);
    const payoffMonthsNew = calculatePayoffMonths(effectivePrincipal, rateB, remTermB, boostB);
    const totalIntNew = calculateTotalInterest(effectivePrincipal, rateB, remTermB, boostB);
    const totalCostNew = effectivePrincipal + totalIntNew + lumpSumB;

    const monthsSaved = Math.max(0, payoffMonthsOld - payoffMonthsNew);
    const interestSaved = Math.max(0, totalIntOld - totalIntNew);
    
    // --- Scenario Refinance ---
    const newRateB = cleanNumber(document.getElementById('input_newRateB').value);
    const newTermB = cleanNumber(document.getElementById('input_newTermB').value);
    const closingCostsB = cleanNumber(document.getElementById('input_closingCostsB').value);
    
    // Refi Path
    const refiPrincipal = loanBalB + closingCostsB; // Roll in costs
    const totalIntRefi = calculateTotalInterest(refiPrincipal, newRateB, newTermB, 0);
    const totalCostRefi = refiPrincipal + totalIntRefi;
    
    // Determine which strategy is active
    const isScenarioPayActive = !document.getElementById('scenario-pay-container').classList.contains('hidden');

    // Display Logic
    const elTime = document.getElementById('res_timeReclaimedB');
    const elIntSaved = document.getElementById('res_interestSavedB');
    const elPayoffDate = document.getElementById('res_payoffDateB');

    // Nudge Logic for Opportunity Cost
    const safeRate = cleanNumber(document.getElementById('input_oppCostB').value);
    const nudgeOpp = document.getElementById('nudge-opp-cost');
    if(nudgeOpp) {
        if(rateB > safeRate + 1) {
            nudgeOpp.textContent = "Guaranteed Return — Pay the debt";
            nudgeOpp.className = "nudge-pill green";
        } else if (rateB < safeRate - 1) {
            nudgeOpp.textContent = "Cheap Debt — Consider investing";
            nudgeOpp.className = "nudge-pill red"; 
        } else {
            nudgeOpp.textContent = "Balanced Decision";
            nudgeOpp.className = "nudge-pill yellow";
        }
    }

    // Nudge Logic for Refi Reset
    const nudgeRefi = document.getElementById('nudge-reset-clock');
    if(nudgeRefi) {
        if(newTermB > remTermB) {
            nudgeRefi.classList.remove('hidden');
            nudgeRefi.textContent = `Warning: Extending debt by ${(newTermB - remTermB).toFixed(0)} years.`;
            nudgeRefi.className = "nudge-pill red";
        } else {
            nudgeRefi.classList.add('hidden');
        }
    }

    // Date Calc
    const today = new Date();
    const futureOld = new Date(today.getFullYear(), today.getMonth() + payoffMonthsOld, 1);
    const futureNew = new Date(today.getFullYear(), today.getMonth() + (isScenarioPayActive ? payoffMonthsNew : (newTermB * 12)), 1);
    
    const dateStrOld = futureOld.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const dateStrNew = futureNew.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Store data for Print
    currentCalcData = {
        gross: grossSalary,
        fedTax: federalTax,
        stateTax: stateTax,
        ficaTax: totalFica,
        totalTax: totalAnnualTax,
        netPay: calculatedAnnualNet,
        cashFreed: finalMonthlySavings,
        annualVar: finalMonthlySavings * 12,
        timeReclaimed: (monthsSaved / 12).toFixed(1) + " Years",
        intSaved: interestSaved,
        payoffDateOld: dateStrOld,
        payoffDateNew: dateStrNew
    };

    if(elTime) {
        if(isScenarioPayActive) {
            // Round off logic
            const yearsSaved = Math.floor(monthsSaved / 12);
            const mosSaved = Math.round(monthsSaved % 12); // Round to integer
            elTime.textContent = `${yearsSaved} Years, ${mosSaved} Mos`;
        } else {
            // In Refi, time might be negative (extended)
            const diff = (remTermB * 12) - (newTermB * 12);
            if(diff >= 0) elTime.textContent = `${(diff/12).toFixed(1)} Years sooner`;
            else elTime.textContent = `${Math.abs(diff/12).toFixed(1)} Years later`;
        }
    }

    if(elIntSaved) {
        if(isScenarioPayActive) elIntSaved.textContent = fmtMoney(interestSaved);
        else elIntSaved.textContent = fmtMoney(Math.max(0, totalIntOld - totalIntRefi));
    }

    if(elPayoffDate) elPayoffDate.textContent = `${dateStrNew} (vs ${dateStrOld})`;

    // Visual Piles Update
    const pileGray = document.querySelector('.pile-gray');
    const pileSolid = document.querySelector('.pile-solid');
    
    if(pileGray && pileSolid) {
        const costA = totalCostOld;
        const costB = isScenarioPayActive ? totalCostNew : totalCostRefi;
        
        // Normalize heights (Max 100%)
        const maxVal = Math.max(costA, costB) * 1.1; // 10% buffer
        const hA = Math.min(100, (costA / maxVal) * 100);
        const hB = Math.min(100, (costB / maxVal) * 100);
        
        pileGray.style.height = `${hA}%`;
        pileSolid.style.height = `${hB}%`;
    }
}

/* ============================ */
/* Mode Switching Logic         */
/* ============================ */
function initializeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all
            modeCards.forEach(c => c.classList.remove('active-mode'));
            // Add active class to clicked
            card.classList.add('active-mode');

            const modeId = card.getAttribute('data-mode'); // e.g., 'mode-a'

            // Hide all input sections
            document.querySelectorAll('.mode-inputs').forEach(el => el.classList.add('hidden'));
            // Show selected input section
            const inputSection = document.getElementById(`${modeId}-inputs`);
            if (inputSection) inputSection.classList.remove('hidden');

            // Hide all result sections
            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            // Show selected result section
            const resultSection = document.getElementById(`${modeId}-results`);
            if (resultSection) resultSection.classList.remove('hidden');

            // --- SCROLL RESET ---
            const container = document.getElementById('results-display-container');
            if (container) container.scrollTop = 0;
            
            updateCalculations(); // Recalculate on switch
        });
    });
}

/* ============================ */
/* Strategy Toggle (Mode A & B) */
/* ============================ */
function initializeStrategyToggle() {
    const btns = document.querySelectorAll('.strategy-btn');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.strategy-toggle-container');
            if(!container) return;

            container.querySelectorAll('.strategy-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            const modeInputs = btn.closest('.mode-inputs');
            if(modeInputs) {
                modeInputs.querySelectorAll('.scenario-container').forEach(scen => {
                    if(scen.id === `${targetId}-container`) {
                        scen.classList.remove('hidden');
                        scen.classList.add('active');
                    } else {
                        scen.classList.add('hidden');
                        scen.classList.remove('active');
                    }
                });
            }
            updateCalculations(); // Recalculate on toggle
        });
    });
}

/* ============================ */
/* Advanced Toggle Logic        */
/* ============================ */
function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    let isAdvanced = false;

    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";

        const advancedElements = document.querySelectorAll('.advanced-content');
        advancedElements.forEach(el => {
            if (isAdvanced) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    });
}

/* ============================ */
/* Cursor Tooltip Logic         */
/* ============================ */
function initializeTooltips() {
    const tooltip = document.getElementById('cursor-tooltip');
    const modeCards = document.querySelectorAll('.mode-card');

    if (!tooltip) return;

    modeCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            
            tooltip.innerHTML = `
                <span class="tooltip-title">${title}</span>
                <span class="tooltip-desc">${desc}</span>
            `;
            
            tooltip.classList.add('active');
        });

        card.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.clientX}px`;
            tooltip.style.top = `${e.clientY}px`;
        });

        card.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

/* ============================ */
/* PRINT & PDF Logic            */
/* ============================ */
function preparePrintView() {
    // A. Populate Global/Meta Data
    const stateName = document.querySelector('#stateSelector option:checked').text;
    const filingStatus = document.getElementById('filingStatusA').value;
    document.getElementById('print-date').textContent = new Date().toLocaleDateString();
    document.getElementById('print-state-meta').textContent = stateName;
    document.getElementById('print-status-meta').textContent = filingStatus;
    document.getElementById('print-state-full').textContent = stateName;

    // B. Populate Section II (Cash Flow)
    // Gather Inputs
    const gross = parseFloat(document.getElementById('input_grossSalaryA').value) || 0;
    const payFreq = document.getElementById('payFreqA').value;
    const pretax = parseFloat(document.getElementById('input_preTaxA').value) || 0;
    const currentNet = parseFloat(document.getElementById('input_netPayA').value) || 0;
    const dedType = document.getElementById('deductionA').value;
    const buffer = parseFloat(document.getElementById('input_bufferA').value) || 0;
    
    // Fill Grid
    document.getElementById('print-gross').textContent = fmtMoney(gross);
    document.getElementById('print-payFreq').textContent = payFreq;
    document.getElementById('print-pretax').textContent = fmtMoney(pretax);
    document.getElementById('print-net-current').textContent = fmtMoney(currentNet);
    document.getElementById('print-deduction-type').textContent = dedType;
    document.getElementById('print-buffer').textContent = fmtMoney(buffer);

    // Results & Note
    const cashFreed = currentCalcData.cashFreed;
    document.getElementById('print-cash-freed').textContent = fmtMoney(Math.max(0, cashFreed));
    
    // Status Text Map
    let statusText = "Already Efficient";
    if(cashFreed > 100) statusText = "Significant Boost";
    else if(cashFreed > 20) statusText = "Lifestyle Upgrade";
    document.getElementById('print-status-text').textContent = statusText;

    // Lifestyle Map
    const tanks = Math.floor(cashFreed / 50);
    const lifeText = tanks > 0 ? `Approx. ${tanks} Tanks of Gas` : "< 1 Tank of Gas / mo";
    document.getElementById('print-lifestyle').textContent = lifeText;

    // Dynamic Analyst Note 1
    const note1 = cashFreed > 20 
        ? "Optimization strategy applied: Fix Withholding. The analysis suggests significant liquidity is trapped in over-withholding. The monthly buffer acts as a safety margin."
        : "Current withholding levels appear efficient relative to tax liability. Minimal monthly liquidity is available for recapture via W-4 adjustments.";
    document.getElementById('print-analyst-note-1').textContent = note1;


    // C. Populate Section III (Liability)
    const loanBal = parseFloat(document.getElementById('input_loanBalanceB').value) || 0;
    const rateCur = parseFloat(document.getElementById('input_rateB').value) || 0;
    const termCur = parseFloat(document.getElementById('input_remainingTermB').value) || 0;
    // Get Global Prop Tax / Ins logic from inputs or state defaults
    // Since inputs might be hidden if not advanced, we grab values
    const propTaxRate = parseFloat(document.getElementById('input_propTaxGlobal').value) || 1.2;
    const insAnnual = parseFloat(document.getElementById('input_insuranceGlobal').value) || 1200;
    
    // Calculate estimated annual prop tax amount
    const propTaxAmount = (loanBal * (propTaxRate/100)); // Rough est based on loan ~ value
    const baseHolding = propTaxAmount + insAnnual;

    document.getElementById('print-loan-balance').textContent = fmtMoney(loanBal);
    document.getElementById('print-prop-tax').textContent = fmtMoney(propTaxAmount);
    document.getElementById('print-rate-current').textContent = rateCur.toFixed(2) + "%";
    document.getElementById('print-insurance').textContent = fmtMoney(insAnnual);
    document.getElementById('print-term-current').textContent = termCur + " Years";
    document.getElementById('print-holding-cost').textContent = fmtMoney(baseHolding);

    // Detect Active Strategy for Label
    const isPayActive = !document.getElementById('scenario-pay-container').classList.contains('hidden');
    document.getElementById('print-strategy-name').textContent = isPayActive 
        ? "Pay Debt Faster (Acceleration)" 
        : "Refinance Structure (Restructuring)";


    // D. Populate Section IV (Strategy)
    const boost = parseFloat(document.getElementById('input_boostB').value) || 0;
    const lump = parseFloat(document.getElementById('input_lumpSumB').value) || 0;
    const bench = parseFloat(document.getElementById('input_oppCostB').value) || 5.0;
    
    document.getElementById('print-boost').textContent = fmtMoney(boost);
    document.getElementById('print-lump').textContent = fmtMoney(lump);
    document.getElementById('print-benchmark').textContent = bench.toFixed(2) + "%";

    // Opp Cost Text
    let oppText = "Balanced Decision";
    if(rateCur > bench + 1) oppText = "Guaranteed Return — Pay the debt";
    else if(rateCur < bench - 1) oppText = "Cheap Debt — Consider investing";
    document.getElementById('print-opp-cost-text').textContent = oppText;

    // Dynamic Analyst Note 2
    let note2 = "";
    if(isPayActive) {
        if(boost > 0 || lump > 0) {
            note2 = `Applying a $${boost} monthly boost (plus any lump sum) toward principal accelerates equity buildup. Given the ${rateCur}% APR versus a ${bench}% benchmark, debt paydown offers a guaranteed return.`;
        } else {
            note2 = "No additional principal contributions modeled. The amortization trajectory remains standard.";
        }
    } else {
        note2 = "Refinance strategy selected. Analysis focuses on interest rate reduction or term modification rather than principal acceleration.";
    }
    document.getElementById('print-analyst-note-2').textContent = note2;


    // E. Populate Section V (Summary)
    document.getElementById('print-date-old').textContent = currentCalcData.payoffDateOld;
    document.getElementById('print-date-new').textContent = currentCalcData.payoffDateNew;
    
    // Time Reclaimed Logic (Handle Refi negative time)
    const elTime = document.getElementById('res_timeReclaimedB'); 
    // We grab text content from the live calculator result because it handles formatting nicely
    if(elTime) document.getElementById('print-time-saved').textContent = elTime.textContent;

    // F. Total Savings
    const saved = document.getElementById('res_interestSavedB').textContent; // Grab formatted from calc
    document.getElementById('print-total-saved').textContent = saved;
}

function closeTutorialModal() {
    const modal = document.getElementById('pdf-tutorial-overlay');
    if(modal) {
        modal.classList.remove('active');
    }
}

function handleTutorialProceed() {
    closeTutorialModal();
    window.print();
}

function startPrintSequence() {
    const modal = document.getElementById('pdf-tutorial-overlay');
    const proceedBtn = document.getElementById('btn-proceed');
    
    // Check if already unlocked
    if (isTutorialUnlocked) {
        preparePrintView();
        modal.classList.add('active');
        proceedBtn.disabled = false;
        proceedBtn.textContent = "Proceed";
        return;
    }

    let timeLeft = 3;
    
    // Prepare Data
    preparePrintView();

    // Show Modal
    modal.classList.add('active');
    
    // Reset Button State
    proceedBtn.disabled = true;
    proceedBtn.textContent = `Proceed (${timeLeft})`;
    
    const timer = setInterval(() => {
        timeLeft--;
        
        if (timeLeft > 0) {
             proceedBtn.textContent = `Proceed (${timeLeft})`;
        } else {
            clearInterval(timer);
            proceedBtn.textContent = "Proceed";
            proceedBtn.disabled = false; // Enable interaction
            isTutorialUnlocked = true; // MARK UNLOCKED
        }
    }, 1000);
}

function initializePrintButtons() {
    const btnPDF = document.getElementById('btn-save-pdf');
    const btnPrint = document.getElementById('btn-print');
    const btnProceed = document.getElementById('btn-proceed');
    const modal = document.getElementById('pdf-tutorial-overlay');
    
    // Trigger Tutorial
    if(btnPDF) {
        btnPDF.addEventListener('click', startPrintSequence);
    }
    
    // Direct Print
    if(btnPrint) {
        btnPrint.addEventListener('click', () => {
            preparePrintView();
            window.print();
        });
    }
    
    // Proceed Button in Tutorial
    if(btnProceed) {
        btnProceed.addEventListener('click', handleTutorialProceed);
    }

    // Keyboard & Click-Outside Handling for Modal
    if(modal) {
        // Click Outside (on overlay background)
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeTutorialModal();
            }
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if(!modal.classList.contains('active')) return;

            if(e.key === "Escape" || e.key === " ") {
                e.preventDefault(); // Prevent scroll on space
                closeTutorialModal();
            }
            
            if(e.key === "Enter") {
                // Only proceed if button is enabled (timer finished)
                if(btnProceed && !btnProceed.disabled) {
                    handleTutorialProceed();
                }
            }
        });
    }
}

/* ============================ */
/* NEW: SHARE & STATE LOGIC     */
/* ============================ */

// Define Inputs to Persist
const PERSIST_MAP = {
    // Global
    'st': { id: 'stateSelector', type: 'select' },
    'itm': { id: 'input_itemizeGlobal', type: 'checkbox' },
    'pt': { id: 'input_propTaxGlobal', type: 'number' },
    'ins': { id: 'input_insuranceGlobal', type: 'number' },
    
    // Mode A
    'fs': { id: 'filingStatusA', type: 'select' },
    'pf': { id: 'payFreqA', type: 'select' },
    'gs': { id: 'input_grossSalaryA', type: 'number' },
    'np': { id: 'input_netPayA', type: 'number' },
    'ptx': { id: 'input_preTaxA', type: 'number' },
    'dep': { id: 'input_dependentsA', type: 'number' },
    'ded': { id: 'deductionA', type: 'select' },
    'buf': { id: 'input_bufferA', type: 'number' },
    'cb': { id: 'input_currentBillA', type: 'number' },
    'nl': { id: 'input_newLoanA', type: 'number' },
    'nr': { id: 'input_newRateA', type: 'number' },
    'nt': { id: 'input_newTermA', type: 'number' },
    'ccA': { id: 'input_closingCostsA', type: 'number' },

    // Mode B
    'lb': { id: 'input_loanBalanceB', type: 'number' },
    'rb': { id: 'input_rateB', type: 'number' },
    'rt': { id: 'input_remainingTermB', type: 'number' },
    'bst': { id: 'input_boostB', type: 'number' },
    'ls': { id: 'input_lumpSumB', type: 'number' },
    'oc': { id: 'input_oppCostB', type: 'number' },
    'nrB': { id: 'input_newRateB', type: 'number' },
    'ntB': { id: 'input_newTermB', type: 'number' },
    'ccB': { id: 'input_closingCostsB', type: 'number' }
};

function getShareUrl() {
    const params = new URLSearchParams();

    // 1. Inputs
    for (const [key, config] of Object.entries(PERSIST_MAP)) {
        const el = document.getElementById(config.id);
        if(!el) continue;
        if(config.type === 'checkbox') {
            if(el.checked) params.set(key, '1');
        } else {
            params.set(key, el.value);
        }
    }

    // 2. Active Mode
    const activeModeBtn = document.querySelector('.mode-card.active-mode');
    if(activeModeBtn) {
        params.set('m', activeModeBtn.getAttribute('data-mode'));
    }

    // 3. Strategies
    // Find active strategy for container A
    const stratA = document.querySelector('#mode-a-inputs .strategy-btn.active');
    if(stratA) params.set('sa', stratA.getAttribute('data-target'));

    const stratB = document.querySelector('#mode-b-inputs .strategy-btn.active');
    if(stratB) params.set('sb', stratB.getAttribute('data-target'));

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

async function handleShare() {
    const shareUrl = getShareUrl();
    const shareData = {
        title: 'Fiscal Efficiency & Liquidity Analysis',
        text: 'Fiscal Efficiency & Liquidity Analysis. Powered by Solveria.',
        url: shareUrl
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            // User cancelled or error
            console.log('Share cancelled');
        }
    } else {
        // Fallback: Copy to Clipboard
        try {
            await navigator.clipboard.writeText(shareUrl);
            const btn = document.getElementById('btn-share');
            const originalText = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        } catch (err) {
            alert("Could not copy link.");
        }
    }
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!params.toString()) return;

    // 1. Restore Inputs
    for (const [key, config] of Object.entries(PERSIST_MAP)) {
        const val = params.get(key);
        if (val === null) continue;

        const el = document.getElementById(config.id);
        if(!el) continue;

        if (config.type === 'checkbox') {
            el.checked = (val === '1');
        } else if (config.type === 'select') {
            // Update Select
            el.value = val;
            // Update Custom Dropdown UI
            const wrapper = el.closest('.custom-dropdown-container');
            if(wrapper) {
                const trigger = wrapper.querySelector('.custom-dropdown-trigger');
                const option = wrapper.querySelector(`.dropdown-option[data-value="${val}"]`);
                if(trigger && option) {
                    trigger.textContent = option.textContent;
                    wrapper.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
                    option.classList.add('selected');
                }
            }
        } else {
            // Number Inputs
            el.value = val;
            // Update Sliders logic
            // Check if there is a slider associated
            const sliderId = config.id.replace('input_', 'slider_');
            const slider = document.getElementById(sliderId);
            if(slider) {
                // Find slider key from input ID (e.g., input_grossSalaryA -> grossSalaryA)
                const sliderKey = config.id.replace('input_', '');
                slider.value = valToSlider(parseFloat(val), sliderKey);
                updateSliderVisual(slider);
            }
        }
    }

    // 2. Restore Mode
    const mode = params.get('m');
    if(mode) {
        const targetCard = document.querySelector(`.mode-card[data-mode="${mode}"]`);
        if(targetCard) targetCard.click();
    }

    // 3. Restore Strategies
    const sa = params.get('sa');
    if(sa) {
        const btn = document.querySelector(`#mode-a-inputs .strategy-btn[data-target="${sa}"]`);
        if(btn) btn.click();
    }
    const sb = params.get('sb');
    if(sb) {
        const btn = document.querySelector(`#mode-b-inputs .strategy-btn[data-target="${sb}"]`);
        if(btn) btn.click();
    }
    
    // Trigger Global Update
    if(params.get('st')) {
        updateGlobalStateData(params.get('st'));
    }
}

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    initializeCustomDropdowns();
    initializeModes();
    initializeStrategyToggle(); 
    initializeAdvancedToggle();
    initializeTooltips();
    initializeCheckbox();
    initializePrintButtons();
    
    // NEW: Load State & Bind Share
    loadFromUrl();
    const btnShare = document.getElementById('btn-share');
    if(btnShare) {
        btnShare.addEventListener('click', handleShare);
    }
    
    // Initial Calc
    updateCalculations();
});