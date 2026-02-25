/* ============================ */
/* US STATE DATA ENGINE         */
/* ============================ */
const STATE_DATA = {
    "AL": { name: "Alabama", propertyTaxRate: 0.41, insuranceMonthly: 200, closingCostRate: 2.0, marketVibe: "Low Cost" },
    "AK": { name: "Alaska", propertyTaxRate: 1.19, insuranceMonthly: 110, closingCostRate: 2.0, marketVibe: "Niche" },
    "AZ": { name: "Arizona", propertyTaxRate: 0.62, insuranceMonthly: 195, closingCostRate: 2.0, marketVibe: "Hot" },
    "AR": { name: "Arkansas", propertyTaxRate: 0.61, insuranceMonthly: 260, closingCostRate: 2.0, marketVibe: "Steady" },
    "CA": { name: "California", propertyTaxRate: 0.76, insuranceMonthly: 140, closingCostRate: 3.0, marketVibe: "Aggressive" },
    "CO": { name: "Colorado", propertyTaxRate: 0.49, insuranceMonthly: 285, closingCostRate: 2.0, marketVibe: "Hot" },
    "CT": { name: "Connecticut", propertyTaxRate: 2.16, insuranceMonthly: 145, closingCostRate: 3.0, marketVibe: "Heavy Tax" },
    "DE": { name: "Delaware", propertyTaxRate: 0.56, insuranceMonthly: 80, closingCostRate: 3.5, marketVibe: "Tax Haven" },
    "DC": { name: "District of Columbia", propertyTaxRate: 0.57, insuranceMonthly: 125, closingCostRate: 4.0, marketVibe: "Pricey" },
    "FL": { name: "Florida", propertyTaxRate: 0.86, insuranceMonthly: 486, closingCostRate: 2.5, marketVibe: "Volatile" },
    "GA": { name: "Georgia", propertyTaxRate: 0.90, insuranceMonthly: 170, closingCostRate: 2.5, marketVibe: "Hot" },
    "HI": { name: "Hawaii", propertyTaxRate: 0.28, insuranceMonthly: 110, closingCostRate: 2.0, marketVibe: "Luxury" },
    "ID": { name: "Idaho", propertyTaxRate: 0.63, insuranceMonthly: 120, closingCostRate: 2.0, marketVibe: "Cooling" },
    "IL": { name: "Illinois", propertyTaxRate: 2.23, insuranceMonthly: 185, closingCostRate: 2.5, marketVibe: "Heavy Tax" },
    "IN": { name: "Indiana", propertyTaxRate: 0.81, insuranceMonthly: 140, closingCostRate: 2.0, marketVibe: "Steady" },
    "IA": { name: "Iowa", propertyTaxRate: 1.57, insuranceMonthly: 205, closingCostRate: 2.0, marketVibe: "Steady" },
    "KS": { name: "Kansas", propertyTaxRate: 1.43, insuranceMonthly: 370, closingCostRate: 2.0, marketVibe: "Storm Risk" },
    "KY": { name: "Kentucky", propertyTaxRate: 0.86, insuranceMonthly: 300, closingCostRate: 2.0, marketVibe: "Steady" },
    "LA": { name: "Louisiana", propertyTaxRate: 0.55, insuranceMonthly: 523, closingCostRate: 2.0, marketVibe: "Risk" },
    "ME": { name: "Maine", propertyTaxRate: 1.30, insuranceMonthly: 105, closingCostRate: 2.5, marketVibe: "Seasonal" },
    "MD": { name: "Maryland", propertyTaxRate: 1.09, insuranceMonthly: 145, closingCostRate: 3.5, marketVibe: "Pricey" },
    "MA": { name: "Massachusetts", propertyTaxRate: 1.23, insuranceMonthly: 145, closingCostRate: 2.5, marketVibe: "Aggressive" },
    "MI": { name: "Michigan", propertyTaxRate: 1.54, insuranceMonthly: 200, closingCostRate: 2.0, marketVibe: "Steady" },
    "MN": { name: "Minnesota", propertyTaxRate: 1.12, insuranceMonthly: 240, closingCostRate: 2.5, marketVibe: "Steady" },
    "MS": { name: "Mississippi", propertyTaxRate: 0.80, insuranceMonthly: 280, closingCostRate: 2.0, marketVibe: "Low Cost" },
    "MO": { name: "Missouri", propertyTaxRate: 0.97, insuranceMonthly: 185, closingCostRate: 2.0, marketVibe: "Steady" },
    "MT": { name: "Montana", propertyTaxRate: 0.84, insuranceMonthly: 235, closingCostRate: 2.0, marketVibe: "Booming" },
    "NE": { name: "Nebraska", propertyTaxRate: 1.77, insuranceMonthly: 550, closingCostRate: 2.0, marketVibe: "High Tax" },
    "NV": { name: "Nevada", propertyTaxRate: 0.60, insuranceMonthly: 90, closingCostRate: 2.0, marketVibe: "Investor" },
    "NH": { name: "New Hampshire", propertyTaxRate: 2.18, insuranceMonthly: 90, closingCostRate: 2.5, marketVibe: "Tax Tradeoff" },
    "NJ": { name: "New Jersey", propertyTaxRate: 2.49, insuranceMonthly: 105, closingCostRate: 3.0, marketVibe: "Tax Heavy" },
    "NM": { name: "New Mexico", propertyTaxRate: 0.80, insuranceMonthly: 185, closingCostRate: 2.0, marketVibe: "Steady" },
    "NY": { name: "New York", propertyTaxRate: 1.72, insuranceMonthly: 155, closingCostRate: 4.0, marketVibe: "Complex" },
    "NC": { name: "North Carolina", propertyTaxRate: 0.77, insuranceMonthly: 200, closingCostRate: 2.0, marketVibe: "Hot" },
    "ND": { name: "North Dakota", propertyTaxRate: 0.93, insuranceMonthly: 230, closingCostRate: 2.0, marketVibe: "Energy" },
    "OH": { name: "Ohio", propertyTaxRate: 1.57, insuranceMonthly: 115, closingCostRate: 2.0, marketVibe: "Steady" },
    "OK": { name: "Oklahoma", propertyTaxRate: 0.90, insuranceMonthly: 390, closingCostRate: 2.0, marketVibe: "Storm Risk" },
    "OR": { name: "Oregon", propertyTaxRate: 0.97, insuranceMonthly: 95, closingCostRate: 2.0, marketVibe: "Constrained" },
    "PA": { name: "Pennsylvania", propertyTaxRate: 1.58, insuranceMonthly: 110, closingCostRate: 4.0, marketVibe: "Fee Heavy" },
    "RI": { name: "Rhode Island", propertyTaxRate: 1.63, insuranceMonthly: 200, closingCostRate: 2.5, marketVibe: "Coastal" },
    "SC": { name: "South Carolina", propertyTaxRate: 0.55, insuranceMonthly: 220, closingCostRate: 2.0, marketVibe: "Hot" },
    "SD": { name: "South Dakota", propertyTaxRate: 1.31, insuranceMonthly: 265, closingCostRate: 2.0, marketVibe: "Quiet" },
    "TN": { name: "Tennessee", propertyTaxRate: 0.71, insuranceMonthly: 225, closingCostRate: 2.0, marketVibe: "Booming" },
    "TX": { name: "Texas", propertyTaxRate: 1.80, insuranceMonthly: 340, closingCostRate: 2.0, marketVibe: "High Prop Tax" },
    "UT": { name: "Utah", propertyTaxRate: 0.63, insuranceMonthly: 110, closingCostRate: 2.0, marketVibe: "Expensive" },
    "VT": { name: "Vermont", propertyTaxRate: 1.90, insuranceMonthly: 70, closingCostRate: 2.5, marketVibe: "Rural" },
    "VA": { name: "Virginia", propertyTaxRate: 0.80, insuranceMonthly: 145, closingCostRate: 2.5, marketVibe: "Stable" },
    "WA": { name: "Washington", propertyTaxRate: 0.94, insuranceMonthly: 130, closingCostRate: 3.0, marketVibe: "Tech Heavy" },
    "WV": { name: "West Virginia", propertyTaxRate: 0.58, insuranceMonthly: 90, closingCostRate: 2.0, marketVibe: "Value" },
    "WI": { name: "Wisconsin", propertyTaxRate: 1.85, insuranceMonthly: 110, closingCostRate: 2.0, marketVibe: "Steady" },
    "WY": { name: "Wyoming", propertyTaxRate: 0.61, insuranceMonthly: 110, closingCostRate: 2.0, marketVibe: "Wealth" },
    // National Average Fallback
    "AVG": { name: "National Avg", propertyTaxRate: 1.10, insuranceMonthly: 150, closingCostRate: 2.4, marketVibe: "Average" }
};

const APPRECIATION_RATES = {
    "low": 0.02,
    "med": 0.04,
    "high": 0.06
};

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "See the full cost — not just the payment.",
    "Understand today. Regret less tomorrow.",
    "Every loan has a tradeoff.",
    "Know what changes after year one."
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
/* Slider & Input Configuration */
/* ============================ */
const SLIDER_CONFIG = {
    // Global
    propTaxGlobal: { type: 'linear', max: 5 },
    insuranceGlobal: { type: 'cubic', max: 10000 },

    // Mode A: Rent vs Buy
    incomeA: { type: 'cubic', max: 50000 },
    currentRentA: { type: 'cubic', max: 15000 },
    homePriceA: { type: 'cubic', max: 5000000 },
    downPaymentA: { type: 'cubic', max: 2000000 },
    debtA: { type: 'cubic', max: 10000 },
    utilA: { type: 'cubic', max: 3000 },
    rateA: { type: 'linear', max: 12 },

    // Mode B: Tenure Horizon
    homePriceB: { type: 'cubic', max: 5000000 },
    tenureB: { type: 'linear', min: 1, max: 30 }, // Min:1 ensures proper mapping
    frictionB: { type: 'linear', max: 15 },

    // Mode C: Opportunity Cost
    downPaymentC: { type: 'cubic', max: 2000000 },
    yearsC: { type: 'linear', max: 40 },
    savingsC: { type: 'cubic', max: 10000 },

    // Mode D: Closing Readiness
    cashHandD: { type: 'cubic', max: 500000 },
    homePriceD: { type: 'cubic', max: 5000000 },
    downPaymentD: { type: 'cubic', max: 2000000 },
    bufferD: { type: 'linear', max: 24 },
    repairD: { type: 'cubic', max: 50000 }
};

/* ============================ */
/* Core Utility Functions       */
/* ============================ */
const cleanNumber = (num) => parseFloat(num) || 0;

const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

// --- Slider Helpers ---
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return Math.pow(val / config.max, 1/3) * 100;
    // Linear
    const min = config.min || 0;
    return ((val - min) / (config.max - min)) * 100;
};

const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return config.max * Math.pow(percent / 100, 3);
    // Linear
    const min = config.min || 0;
    return ((percent / 100) * (config.max - min)) + min;
};

const updateSliderVisual = (slider) => {
    if (!slider) return;
    if (slider.id === 'slider_tenureB') return; // Custom gradient handled in CSS
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = (slider.value - min) / (max - min) * 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

// Update Input/Slider Pair
function setInputValue(key, val) {
    const input = document.getElementById(`input_${key}`);
    const slider = document.getElementById(`slider_${key}`);
    if(input) input.value = val;
    if(slider) {
        slider.value = valToSlider(val, key);
        updateSliderVisual(slider);
    }
}

/* ============================ */
/* ENGINE 1: Smart Defaults     */
/* ============================ */
function initializeStateDefaults() {
    const stateSelector = document.getElementById('stateSelector');
    if (!stateSelector) return;

    // Listen for custom event from dropdown or standard change
    stateSelector.addEventListener('change', (e) => {
        const stateCode = e.target.value;
        const data = STATE_DATA[stateCode] || STATE_DATA["AVG"];

        // Update Global Property Tax
        setInputValue('propTaxGlobal', data.propertyTaxRate);

        // Update Global Insurance (Annual)
        setInputValue('insuranceGlobal', data.insuranceMonthly * 12);

        // Update Selling Friction in Mode B 
        setInputValue('frictionB', 6 + data.closingCostRate);

        // Trigger Main Calculation
        calculateAll();
    });
}

/* ============================ */
/* ENGINE 2: Calculation Logic  */
/* ============================ */

function calculateAll() {
    calculateModeA();
    calculateModeB();
    calculateModeC();
    calculateModeD(); // Added Mode D Engine
}

/**
 * MODE A: RENT VS. BUY
 */
function calculateModeA() {
    // 1. Gather Inputs
    const income = cleanNumber(document.getElementById('input_incomeA').value);
    const rent = cleanNumber(document.getElementById('input_currentRentA').value);
    const homePrice = cleanNumber(document.getElementById('input_homePriceA').value);
    const downPayment = cleanNumber(document.getElementById('input_downPaymentA').value);
    const debts = cleanNumber(document.getElementById('input_debtA').value);
    const utilsGap = cleanNumber(document.getElementById('input_utilA').value);
    const rate = cleanNumber(document.getElementById('input_rateA').value);
    
    // Global Inputs
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value) / 100;
    const insuranceAnnual = cleanNumber(document.getElementById('input_insuranceGlobal').value);

    // 2. Mortgage Math
    const loanAmount = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const termMonths = 360; // 30 Years default

    let monthlyPI = 0;
    if (monthlyRate > 0) {
        monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else {
        monthlyPI = loanAmount / termMonths;
    }

    // 3. Components
    const monthlyTax = (homePrice * propTaxRate) / 12;
    const monthlyIns = insuranceAnnual / 12;
    const totalHousingOutflow = monthlyPI + monthlyTax + monthlyIns + utilsGap;
    
    // 4. "Burn Rate" Calculation (Unrecoverable Costs)
    const monthlyInterest = loanAmount * monthlyRate;
    const buyBurnDollars = monthlyInterest + monthlyTax + monthlyIns + utilsGap;
    const rentBurnDollars = rent;

    // 5. Outputs & UI Updates
    const buyBurnPercent = (buyBurnDollars / totalHousingOutflow) * 100;
    const resBuyBurn = document.getElementById('res_buyBurnA');
    if(resBuyBurn) {
        resBuyBurn.textContent = Math.round(buyBurnPercent) + "%";
        resBuyBurn.className = "result-value";
        if(buyBurnPercent > 70) resBuyBurn.classList.add('bad');
        else if(buyBurnPercent > 40) resBuyBurn.classList.add('warn');
        else resBuyBurn.classList.add('good');
    }

    const diff = buyBurnDollars - rentBurnDollars;
    const resDiff = document.getElementById('res_diffA');
    if(resDiff) {
        resDiff.textContent = Math.round(diff).toLocaleString();
    }

    const resOutflow = document.getElementById('res_totalOutflowA');
    if(resOutflow) resOutflow.textContent = formatCurrency(totalHousingOutflow);

    const totalMonthlyDebt = totalHousingOutflow + debts;
    const dti = (totalMonthlyDebt / income) * 100;
    
    const resVerdict = document.getElementById('res_verdictA');
    const resVerdictText = document.getElementById('res_verdictTextA');
    
    if(resVerdict && resVerdictText) {
        resVerdict.className = "result-value"; // Reset
        
        // UPDATED: Using innerHTML to apply bold class to DTI
        if (dti <= 28) {
            resVerdict.textContent = "Safe Zone";
            resVerdict.classList.add('green'); 
            resVerdictText.innerHTML = `DTI is <span class="dynamic-number">${Math.round(dti)}%</span>. Housing fits comfortably. You aren't changing your lifestyle to buy this.`;
        } else if (dti <= 36) {
            resVerdict.textContent = "Tight";
            resVerdict.classList.add('yellow'); 
            resVerdictText.innerHTML = `DTI is <span class="dynamic-number">${Math.round(dti)}%</span>. Budgeting Required. You are trading flexibility for stability.`;
        } else {
            resVerdict.textContent = "House Poor";
            resVerdict.classList.add('red'); 
            resVerdictText.innerHTML = `DTI is <span class="dynamic-number">${Math.round(dti)}%</span>. Premium Zone. Banks might approve you, but your lifestyle will suffer.`;
        }
    }
}

/**
 * MODE B: TENURE HORIZON
 */
function calculateModeB() {
    // 1. Inputs
    const homePrice = cleanNumber(document.getElementById('input_homePriceB').value);
    const tenureYears = cleanNumber(document.getElementById('input_tenureB').value);
    const frictionPct = cleanNumber(document.getElementById('input_frictionB').value);
    const optimism = document.getElementById('optimismB').value; 

    const downPaymentA = cleanNumber(document.getElementById('input_downPaymentA').value);
    const downPayment = downPaymentA; 
    
    const rate = cleanNumber(document.getElementById('input_rateA').value);
    
    // Buying Closing Costs from Smart Defaults
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = STATE_DATA[stateCode] || STATE_DATA["AVG"];
    const buyingClosingCosts = homePrice * (stateData.closingCostRate / 100);

    const annualAppreciation = APPRECIATION_RATES[optimism] || 0.04;

    // 2. Projections
    const months = tenureYears * 12;
    const futureValue = homePrice * Math.pow(1 + annualAppreciation, tenureYears);
    const sellingCosts = futureValue * (frictionPct / 100);

    // Loan Paydown
    const loanAmount = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    let loanBalance = loanAmount;
    
    if (monthlyRate > 0) {
        const termMonths = 360;
        const compounded = Math.pow(1 + monthlyRate, termMonths);
        const paidCompounded = Math.pow(1 + monthlyRate, months);
        loanBalance = loanAmount * (compounded - paidCompounded) / (compounded - 1);
    } else {
        loanBalance = loanAmount - ((loanAmount / 360) * months);
    }
    if(loanBalance < 0) loanBalance = 0;

    // 3. Equity & Proceeds
    const grossEquity = futureValue - loanBalance;
    const netProceeds = grossEquity - sellingCosts;
    
    // 4. Freedom Penalty
    const totalTransactionFriction = buyingClosingCosts + sellingCosts;
    const monthlyPenalty = totalTransactionFriction / months;

    // 5. Equity Realization
    let equityRecoveryPct = 0;
    if (netProceeds > 0) {
        equityRecoveryPct = (netProceeds / downPayment) * 100;
    }
    let barWidth = equityRecoveryPct;
    if (barWidth > 100) barWidth = 100;
    if (barWidth < 0) barWidth = 0;

    // 6. UI Updates
    const resPenalty = document.getElementById('res_penaltyB');
    if(resPenalty) resPenalty.textContent = formatCurrency(monthlyPenalty) + "/mo";

    const resTargetYear = document.getElementById('res_targetYearB');
    if(resTargetYear) resTargetYear.textContent = tenureYears;

    const resEquityBar = document.getElementById('res_equityBarB');
    if(resEquityBar) {
        resEquityBar.style.width = `${barWidth}%`;
        
        // UPDATED: Tighter Shadow for Equity Bar (Close Distance)
        if(barWidth < 100) {
            resEquityBar.style.backgroundColor = "#e74c3c"; 
            resEquityBar.style.boxShadow = "0 6px 15px -5px rgba(231, 76, 60, 1)";
        } else {
            resEquityBar.style.backgroundColor = "#2ecc71"; 
            resEquityBar.style.boxShadow = "0 6px 15px -5px rgba(46, 204, 113, 1)";
        }
    }

    const resEquityText = document.getElementById('res_equityTextB');
    if(resEquityText) {
        const trappedPct = Math.round(100 - barWidth);
        resEquityText.textContent = `${trappedPct}%`;
    }

    // UPDATED: Timeline Marker Logic for Tenure Slider
    const tenureMarker = document.getElementById('tenureMarker');
    if(tenureMarker) {
        // Calculate Percentage (0-100) based on 1-30 years
        // (val - min) / (max - min) * 100
        let pct = ((tenureYears - 1) / (30 - 1)) * 100;
        pct = Math.max(0, Math.min(100, pct));
        tenureMarker.style.left = `${pct}%`;

        // Color & Label Logic
        let labelText = "Short Term";
        if (tenureYears <= 3) {
            tenureMarker.style.backgroundColor = '#e74c3c'; // Red
            labelText = "Short Term";
        } else if (tenureYears <= 5) {
            tenureMarker.style.backgroundColor = '#f1c40f'; // Yellow
            labelText = "Medium Term";
        } else {
            tenureMarker.style.backgroundColor = '#2ecc71'; // Green
            labelText = "Long Term";
        }
        tenureMarker.setAttribute('data-label', labelText);
    }

    let breakevenYear = "> 30";
    for(let y = 1; y <= 30; y++) {
        const tempFV = homePrice * Math.pow(1 + annualAppreciation, y);
        const tempSellCost = tempFV * (frictionPct / 100);
        let tempBalance = loanAmount;
        if (monthlyRate > 0) {
             const tempMonths = y * 12;
             const term = 360;
             const cmp = Math.pow(1 + monthlyRate, term);
             const pd = Math.pow(1 + monthlyRate, tempMonths);
             tempBalance = loanAmount * (cmp - pd) / (cmp - 1);
        }
        if ((tempFV - tempBalance - tempSellCost) >= downPayment) {
            breakevenYear = `Year ${y}`;
            break;
        }
    }
    const resBreakeven = document.getElementById('res_breakevenB');
    if(resBreakeven) resBreakeven.textContent = breakevenYear;
}

/**
 * MODE C: OPPORTUNITY COST
 * Calculates Wealth in Home Equity vs. Stock Portfolio.
 */
function calculateModeC() {
    // 1. Inputs
    const years = cleanNumber(document.getElementById('input_yearsC').value);
    const downPayment = cleanNumber(document.getElementById('input_downPaymentC').value);
    const monthlySavings = cleanNumber(document.getElementById('input_savingsC').value);
    const discipline = document.getElementById('disciplineC').value; // 'invest' or 'spend'
    const leverage = document.getElementById('leverageC').value; // 'on' or 'off' (Visual/Risk)

    // Data from Mode A for Property Context
    const homePrice = cleanNumber(document.getElementById('input_homePriceA').value);
    const rate = cleanNumber(document.getElementById('input_rateA').value);
    // Use Mode B optimism for consistency, or default to 4%
    const optimism = document.getElementById('optimismB').value; 
    const annualAppreciation = APPRECIATION_RATES[optimism] || 0.04;

    // 2. BUCKET A: Buying (Home Equity Wealth)
    // Formula: Future Home Value - Remaining Mortgage Balance
    // Note: We are calculating "Wealth", usually this implies Net Equity.
    const months = years * 12;
    const futureHomeValue = homePrice * Math.pow(1 + annualAppreciation, years);
    
    // Loan Balance Calculation
    const loanAmount = homePrice - downPayment; // Assuming downPaymentC matches purchase down payment, or loosely coupled
    const monthlyRate = rate / 100 / 12;
    let loanBalance = loanAmount;
    if (monthlyRate > 0) {
        const termMonths = 360;
        const cmp = Math.pow(1 + monthlyRate, termMonths);
        const pd = Math.pow(1 + monthlyRate, months);
        loanBalance = loanAmount * (cmp - pd) / (cmp - 1);
    } else {
        loanBalance = loanAmount - ((loanAmount / 360) * months);
    }
    if(loanBalance < 0) loanBalance = 0;
    
    const equityWealth = futureHomeValue - loanBalance;

    // 3. BUCKET B: Renting (Portfolio Wealth)
    // Initial Investment (Down Payment) + Monthly Savings (Rent vs Buy Delta)
    // Assumption: 7% annual return on investments (Stock Market avg)
    const annualReturn = 0.07; 
    const monthlyReturn = annualReturn / 12;

    // FV of Initial Down Payment
    const fvInitial = downPayment * Math.pow(1 + annualReturn, years);

    // FV of Monthly Savings
    let fvMonthly = 0;
    if (discipline === 'invest') {
        // Future Value of Annuity Formula
        if (monthlyReturn > 0) {
            fvMonthly = monthlySavings * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
        } else {
            fvMonthly = monthlySavings * months;
        }
    }
    // If discipline is 'spend', fvMonthly remains 0.

    const portfolioWealth = fvInitial + fvMonthly;

    // 4. UI Updates
    const resEquity = document.getElementById('res_equityC');
    if(resEquity) resEquity.textContent = formatCurrency(equityWealth);

    const resPortfolio = document.getElementById('res_portfolioC');
    if(resPortfolio) resPortfolio.textContent = formatCurrency(portfolioWealth);

    // 5. Visualization (Buckets)
    // Scale bars relative to the larger value
    const maxValue = Math.max(equityWealth, portfolioWealth);
    // Prevent div by zero
    const scale = maxValue > 0 ? maxValue : 1;

    const equityBar = document.querySelector('.bucket-fill-equity');
    const portfolioBar = document.querySelector('.bucket-fill-portfolio');
    
    if(equityBar) equityBar.style.width = `${(equityWealth / scale) * 100}%`;
    if(portfolioBar) portfolioBar.style.width = `${(portfolioWealth / scale) * 100}%`;

    // 6. Verdict
    const verdictTitle = document.getElementById('res_verdictTitleC');
    const verdictText = document.getElementById('res_verdictTextC');

    if(verdictTitle && verdictText) {
        // UPDATED: Using innerHTML for bold numbers
        // UPDATED: Removed Emojis as requested
        if (portfolioWealth > equityWealth) {
            verdictTitle.textContent = "Renting Wins"; // Emoji removed
            verdictTitle.className = "result-label good"; // Greenish
            if (discipline === 'invest') {
                verdictText.innerHTML = `Renting makes you <span class="dynamic-number">${formatCurrency(portfolioWealth - equityWealth)}</span> richer because you diligently invested the savings. Compound interest did the heavy lifting.`;
            } else {
                verdictText.textContent = "Renting wins mathematically, but verify your spending habits."; 
            }
        } else {
            verdictTitle.textContent = "Buying Wins"; // Emoji removed
            verdictTitle.className = "result-label"; // Neutral or distinct color?
            
            if (discipline === 'spend') {
                verdictText.textContent = "Buying wins by default because it acts as a forced savings account. If you rent, you likely spend the difference.";
            } else {
                verdictText.innerHTML = `Buying builds <span class="dynamic-number">${formatCurrency(equityWealth - portfolioWealth)}</span> more wealth, likely due to appreciation and leverage outweighing stock market returns.`;
            }
        }
    }
}

/**
 * MODE D: CLOSING READINESS
 * Calculates total cash required to close AND survive.
 */
function calculateModeD() {
    // 1. Inputs
    const cashHand = cleanNumber(document.getElementById('input_cashHandD').value);
    const homePrice = cleanNumber(document.getElementById('input_homePriceD').value);
    const downPayment = cleanNumber(document.getElementById('input_downPaymentD').value);
    const bufferMonths = cleanNumber(document.getElementById('input_bufferD').value);
    const repairFund = cleanNumber(document.getElementById('input_repairD').value);

    // Global / Shared Inputs
    const rate = cleanNumber(document.getElementById('input_rateA').value); // Use Mode A rate
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value) / 100;
    const insuranceAnnual = cleanNumber(document.getElementById('input_insuranceGlobal').value);
    
    // State Specific Closing Cost Rate
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = STATE_DATA[stateCode] || STATE_DATA["AVG"];
    const closingCostRate = stateData.closingCostRate / 100;

    // 2. Costs Calculation
    const closingCosts = homePrice * closingCostRate;
    
    // Monthly Housing Cost for Buffer Calculation
    // We calculate the *future* monthly obligation to determine the buffer size
    const loanAmount = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const termMonths = 360;
    
    let monthlyPI = 0;
    if (monthlyRate > 0) {
        monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else {
        monthlyPI = loanAmount / termMonths;
    }
    
    const monthlyTax = (homePrice * propTaxRate) / 12;
    const monthlyIns = insuranceAnnual / 12;
    const monthlyTotal = monthlyPI + monthlyTax + monthlyIns;

    const bufferAmount = monthlyTotal * bufferMonths;

    // 3. Totals
    // Cash needed to leave the closing table AND feel safe
    // = Down Payment + Closing Costs + Repair Fund + Buffer
    const totalCashNeeded = downPayment + closingCosts + repairFund + bufferAmount;
    const cashToCloseOnly = downPayment + closingCosts;

    // 4. Delta (Surplus or Deficit)
    const surplus = cashHand - totalCashNeeded;

    // 5. UI Updates
    const resTotalCash = document.getElementById('res_totalCashD');
    if (resTotalCash) resTotalCash.textContent = formatCurrency(totalCashNeeded);

    const resBuffer = document.getElementById('res_bufferIncludedD');
    if (resBuffer) resBuffer.textContent = formatCurrency(bufferAmount) + ` (${bufferMonths} mo)`;

    const resStatus = document.getElementById('res_statusD');
    const resStatusText = document.getElementById('res_statusTextD');

    if (resStatus && resStatusText) {
        resStatus.className = "result-value"; // Reset class list

        if (surplus >= 0) {
            resStatus.textContent = `Surplus of ${formatCurrency(surplus)}`;
            resStatus.classList.add('good');
            // UPDATED: Using innerHTML for bold numbers
            resStatusText.innerHTML = `You are fully funded. You can pay the <span class="dynamic-number">${formatCurrency(cashToCloseOnly)}</span> to close, fund your repairs, and still have <span class="dynamic-number">${bufferMonths} months</span> of expenses in the bank.`;
        } else {
            // Check if they have enough just to close, but not the buffer/repairs
            const gap = Math.abs(surplus);
            
            if (cashHand >= cashToCloseOnly) {
                // Can close, but risky
                resStatus.textContent = `Risky (Short by ${formatCurrency(gap)})`;
                resStatus.classList.add('yellow');
                resStatusText.innerHTML = `You have enough cash to close (<span class="dynamic-number">${formatCurrency(cashToCloseOnly)}</span>), but you are eating into your safety net. You won't have the full <span class="dynamic-number">${bufferMonths}-month</span> buffer or repair fund left over.`;
            } else {
                // Cannot close
                resStatus.textContent = `Deficit of ${formatCurrency(gap)}`;
                resStatus.classList.add('bad');
                resStatusText.innerHTML = `You cannot afford this home yet. You are short <span class="dynamic-number">${formatCurrency(cashToCloseOnly - cashHand)}</span> just to close the deal, ignoring repairs and buffers.`;
            }
        }
    }
}

/* ============================ */
/* Initialization & Listeners   */
/* ============================ */
function initializeSliders() {
    Object.keys(SLIDER_CONFIG).forEach(key => {
        const input = document.getElementById(`input_${key}`);
        const slider = document.getElementById(`slider_${key}`);

        if (!input || !slider) return;

        // Init values
        const startVal = cleanNumber(input.value);
        slider.value = valToSlider(startVal, key);
        updateSliderVisual(slider);

        // Event: Slider Input
        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            
            // Smart Rounding
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100;
                else realVal = Math.round(realVal);
            } else {
                realVal = Math.round(realVal * 1000) / 1000;
            }
            
            input.value = realVal; 
            updateSliderVisual(e.target);
            calculateAll(); // Recalculate on change
        });

        // Event: Text Input
        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            calculateAll(); // Recalculate on change
        });
    });
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        const options = wrapper.querySelectorAll('.dropdown-option');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                trigger.textContent = option.textContent;
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                menu.classList.remove('active');
                
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
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
    });
}

function initializeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('active-mode'));
            card.classList.add('active-mode');

            const modeId = card.getAttribute('data-mode');

            document.querySelectorAll('.mode-inputs').forEach(el => el.classList.add('hidden'));
            const inputSection = document.getElementById(`${modeId}-inputs`);
            if (inputSection) inputSection.classList.remove('hidden');

            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            const resultSection = document.getElementById(`${modeId}-results`);
            if (resultSection) resultSection.classList.remove('hidden');

            const container = document.getElementById('results-display-container');
            if (container) container.scrollTop = 0;
            
            // Recalculate when switching modes to ensure visuals are fresh
            calculateAll();
        });
    });
}

function initializeTooltips() {
    const tooltip = document.getElementById('cursor-tooltip');
    const modeCards = document.querySelectorAll('.mode-card');
    if (!tooltip) return;

    modeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            tooltip.innerHTML = `<span class="tooltip-title">${title}</span><span class="tooltip-desc">${desc}</span>`;
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

// Global Listener for simple dropdowns (inflation, etc) to trigger calc
function initializeGlobalListeners() {
    const selects = document.querySelectorAll('select');
    selects.forEach(sel => {
        sel.addEventListener('change', calculateAll);
    });
}


/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,

    /* 1. CONFIGURATION */
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'select' },
        'ptax': { id: 'input_propTaxGlobal', type: 'number' },
        'ins': { id: 'input_insuranceGlobal', type: 'number' },
        
        // Mode A
        'inc': { id: 'input_incomeA', type: 'number' },
        'rent': { id: 'input_currentRentA', type: 'number' },
        'hpA': { id: 'input_homePriceA', type: 'number' },
        'dpA': { id: 'input_downPaymentA', type: 'number' },
        'debt': { id: 'input_debtA', type: 'number' },
        'util': { id: 'input_utilA', type: 'number' },
        'inf': { id: 'inflationA', type: 'select' },
        'rate': { id: 'input_rateA', type: 'number' },
        
        // Mode B
        'hpB': { id: 'input_homePriceB', type: 'number' },
        'ten': { id: 'input_tenureB', type: 'number' },
        'fric': { id: 'input_frictionB', type: 'number' },
        'opt': { id: 'optimismB', type: 'select' },
        
        // Mode C
        'dpC': { id: 'input_downPaymentC', type: 'number' },
        'yrs': { id: 'input_yearsC', type: 'number' },
        'sav': { id: 'input_savingsC', type: 'number' },
        'disc': { id: 'disciplineC', type: 'select' },
        'lev': { id: 'leverageC', type: 'select' },
        
        // Mode D
        'cash': { id: 'input_cashHandD', type: 'number' },
        'hpD': { id: 'input_homePriceD', type: 'number' },
        'dpD': { id: 'input_downPaymentD', type: 'number' },
        'buf': { id: 'input_bufferD', type: 'number' },
        'rep': { id: 'input_repairD', type: 'number' }
    },

    /* 2. SHARE LOGIC (Universal) */
    getShareUrl() {
        const params = new URLSearchParams();
        // Also capture active mode
        const activeBtn = document.querySelector('.mode-card.active-mode');
        if (activeBtn) params.set('mode', activeBtn.getAttribute('data-mode'));

        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) params.set(key, el.value);
        }
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    },

    async handleShare() {
        const shareUrl = this.getShareUrl();
        const shareData = { title: document.title, text: 'Solveria Calculation', url: shareUrl };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) {}
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                const btn = document.getElementById('btn-share');
                const orig = btn.textContent;
                btn.textContent = "Copied!";
                setTimeout(() => btn.textContent = orig, 2000);
            } catch (err) { alert("Could not copy link."); }
        }
    },

    restoreState() {
        const params = new URLSearchParams(window.location.search);
        
        // Restore Active Mode
        if (params.has('mode')) {
            const modeId = params.get('mode');
            const btn = document.querySelector(`.mode-card[data-mode="${modeId}"]`);
            if(btn) btn.click();
        }

        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    el.value = params.get(key);
                    // Dispatch events so sliders and dropdowns update
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    // Special logic to sync custom visual dropdowns
                    if (el.tagName === 'SELECT') {
                        const trigger = el.nextElementSibling; // button.custom-dropdown-trigger
                        if (trigger && el.selectedIndex >= 0) {
                             trigger.textContent = el.options[el.selectedIndex].text;
                             // Update options selection class
                             const menu = el.parentElement.querySelector('.custom-dropdown-menu');
                             if(menu) {
                                 const opts = menu.querySelectorAll('.dropdown-option');
                                 opts.forEach(opt => opt.classList.remove('selected'));
                                 const selectedOpt = menu.querySelector(`.dropdown-option[data-value="${el.value}"]`);
                                 if(selectedOpt) selectedOpt.classList.add('selected');
                             }
                        }
                    }
                }
            }
        }
    },

    /* 3. PRINT GENERATION & LOGO SAFETY FIX */
    triggerPrintSafe() {
        // Safe print trigger that waits for the logo to be rendered
        const printContainer = document.getElementById('print-view-container');
        const logoImg = printContainer.querySelector('.print-logo-box img');
        
        const performPrint = () => {
            window.print();
        };

        if (logoImg && !logoImg.complete) {
            // Image found but not loaded? Wait for it.
            logoImg.onload = performPrint;
            logoImg.onerror = performPrint; // Print anyway on error
        } else {
            // Image ready or missing? Print immediately (with slight delay for rendering engine)
            setTimeout(performPrint, 100);
        }
    },

    preparePrintData() {
        const printContainer = document.getElementById('print-view-container');
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        const fileNum = "REF-" + Math.floor(1000 + Math.random() * 9000);

        // Helper: Get Value safely
        const val = (id) => {
            const el = document.getElementById(id);
            if (!el) return "";
            if (el.tagName === 'SELECT') return el.options[el.selectedIndex].text;
            const v = parseFloat(el.value);
            return isNaN(v) ? el.value : (v > 100 ? formatCurrency(v) : v);
        };
        const txt = (id) => { const el = document.getElementById(id); return el ? el.textContent : ''; };

        // Helper: Create HTML Row
        const row = (lbl, v) => `<div class="print-data-row"><span class="print-data-label">${lbl}</span><span class="print-data-value">${v}</span></div>`;

        // Logic extraction for Analyst Notes
        const verdictText = txt('res_verdictTextA').replace('DTI is', 'The calculated DTI is');
        
        let finalVerdict = "BUYING WINS";
        const equityC = parseFloat(document.getElementById('res_equityC').textContent.replace(/[^0-9.]/g, ''));
        const portC = parseFloat(document.getElementById('res_portfolioC').textContent.replace(/[^0-9.]/g, ''));
        if (portC > equityC) finalVerdict = "RENTING WINS";

        // Grab source from the hidden preload image to ensure cache hit
        const preloadImg = document.getElementById('preload-print-logo');
        // FIX: Updated fallback to match the working footer logo (Golden vs Gold)
        const logoSrc = preloadImg ? preloadImg.src : '../../img/Logo_Golden.webp';

        const html = `
        <div class="print-header-top-border">
            <div class="print-logo-box">
                <!-- FIX: Removed crossorigin attribute which can break local/relative image loading -->
                <img src="${logoSrc}" alt="Logo">
            </div>
            <div class="print-title-box">
                <div class="print-doc-title">REAL ESTATE ACQUISITION VS. TENANCY EVALUATION</div>
                <div class="print-doc-subtitle">FINANCIAL READINESS & OPPORTUNITY COST ANALYSIS</div>
            </div>
        </div>

        <div class="print-header-bottom-border"></div>

        <div class="print-meta-row">
            <div class="meta-group"><span>PREPARED BY:</span><span class="meta-val">____________________</span></div>
            <div class="meta-group"><span>DATE:</span><span class="meta-val">${dateStr}</span></div>
            <div class="meta-group"><span>FILE NUMBER:</span><span class="meta-val">${fileNum}</span></div>
        </div>

        <!-- SECTION I -->
        <div class="print-section-header">I. JURISDICTIONAL CONTEXT & TARGET ASSET PROJECTIONS</div>
        <div class="print-grid-2col">
            ${row("Target Asset Price (Appraised)", val('input_homePriceA'))}
            ${row("Location (State)", val('stateSelector'))}
            ${row("Upfront Equity (Down Payment)", val('input_downPaymentA'))}
            ${row("Property Tax Levy", val('input_propTaxGlobal') + "%")}
            ${row("Annual Percentage Rate (APR)", val('input_rateA') + "%")}
            ${row("Hazard Insurance", formatCurrency(cleanNumber(document.getElementById('input_insuranceGlobal').value)))}
            ${row("Anticipated Tenure Horizon", val('input_tenureB') + " Years")}
            ${row("Inflation Mindset", val('inflationA'))}
        </div>

        <!-- SECTION II -->
        <div class="print-section-header">II. MONTHLY LIQUIDITY & DEBT-TO-INCOME (DTI) ASSESSMENT</div>
        <div class="print-grid-2col">
            ${row("Gross Monthly Income", val('input_incomeA'))}
            ${row("Current Rent Obligation", val('input_currentRentA'))}
            ${row("Subsistence Debt (\"Ramen\")", val('input_debtA'))}
            ${row("Unlisted Outflows", val('input_utilA'))}
        </div>
        <div class="print-total-row">
            <span>TOTAL PROJECTED MONTHLY OUTFLOW</span>
            <span>${txt('res_totalOutflowA')}</span>
        </div>
        <div class="print-verdict-row">
            <span>DTI & LIFESTYLE VERDICT:</span>
            <span class="print-verdict-val">${txt('res_verdictA')}</span>
        </div>
        <div class="print-note">
            <strong>ANALYST NOTE:</strong>
            ${verdictText}
        </div>

        <!-- SECTION III -->
        <div class="print-section-header">III. CAPITAL INEFFICIENCY (THE "BURN RATE" METRICS)</div>
        <div class="print-grid-2col">
            ${row("Tenancy \"Burn\" (Unrecoverable)", "100.00%")}
            ${row("Acquisition \"Burn\"", txt('res_buyBurnA'))}
        </div>
        <div class="print-note">
            <strong>ANALYST NOTE:</strong>
            Buying locks in unrecoverable costs (Interest, Tax, Insurance, HOA) compared to renting. The remaining outflow is captured as equity.
        </div>

        <!-- SECTION IV -->
        <div class="print-section-header">IV. SETTLEMENT READINESS & FUNDING STATUS</div>
        <div class="print-grid-2col">
            ${row("Liquid Reserves (Cash on Hand)", val('input_cashHandD'))}
            ${row("Total Cash to Close", formatCurrency(cleanNumber(document.getElementById('input_downPaymentD').value) + (cleanNumber(document.getElementById('input_homePriceD').value) * (STATE_DATA[document.getElementById('stateSelector').value]?.closingCostRate || 2.4)/100)))}
            ${row("Emergency Buffer Included", txt('res_bufferIncludedD').split(' ')[0])}
            ${row("Immediate Repairs", val('input_repairD'))}
        </div>
        <div class="print-verdict-row">
            <span>OFFICIAL FUNDING STATUS VERDICT</span>
            <span class="print-verdict-val">${txt('res_statusD')}</span>
        </div>

        <!-- SECTION V -->
        <div class="print-section-header">V. BEHAVIORAL WEALTH PROJECTIONS (THE "TWO BUCKETS")</div>
        <div class="print-grid-2col">
            ${row("Investment Discipline", val('disciplineC'))}
            ${row("Leverage Awareness", val('leverageC'))}
            ${row("Early Disposition Penalty", txt('res_penaltyB'))}
            ${row("Projected Breakeven", txt('res_breakevenB'))}
        </div>
        <div class="print-grid-2col" style="margin-top: 10px;">
            ${row("BUCKET A: Illiquid Asset Valuation (Home Equity)", txt('res_equityC'))}
            ${row("BUCKET B: Liquid Securities Valuation (Portfolio)", txt('res_portfolioC'))}
        </div>

        <div class="print-final-verdict-box">
            <span>FINAL BEHAVIORAL VERDICT</span>
            <span>${finalVerdict}</span>
        </div>

        <div class="print-signature-area">
            <div class="sig-line">SIGNATURE OF APPLICANT / BUYER</div>
            <div class="sig-line">DATE</div>
        </div>

        <div class="print-footer-legal">
            LEGAL & METHODOLOGY DISCLAIMER: This Real Estate Acquisition vs. Tenancy Evaluation is generated automatically for informational and comparative purposes only. The figures presented are estimates derived from standard amortization algorithms and static tax/insurance data models. This document does not constitute financial advice, a mortgage pre-approval, or a binding guarantee.
        </div>
        `;

        printContainer.innerHTML = html;
    },

    /* 4. TUTORIAL & MODAL LOGIC */
    closeTutorialModal() {
        document.getElementById('pdf-tutorial-overlay').classList.remove('active');
    },

    handleTutorialProceed() {
        this.closeTutorialModal();
        this.triggerPrintSafe();
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
        this.restoreState();
        const btnShare = document.getElementById('btn-share');
        if (btnShare) btnShare.addEventListener('click', () => this.handleShare());

        const btnPrint = document.getElementById('btn-print');
        if (btnPrint) btnPrint.addEventListener('click', () => {
            this.preparePrintData();
            this.triggerPrintSafe();
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
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    initializeCustomDropdowns();
    initializeStateDefaults(); // Engine 1
    initializeModes();
    initializeTooltips();
    initializeGlobalListeners();
    
    // Initial Calc
    calculateAll();
    
    // Initialize PDF/Print/Share
    ToolFeatures.init();
});