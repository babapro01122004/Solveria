/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "Analyze your budget.",
    "Calculate affordability.",
    "Plan your future home."
];

let currentIndex = 0;
const textElement = document.getElementById('breathing-text');

function cycleText() {
    if (!textElement) return;
    textElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        textElement.textContent = phrases[currentIndex];
        textElement.classList.remove('fade-out');
    }, 1000);
}

setInterval(cycleText, 4000);

/* ============================ */
/* DATA: US States (2025-26)    */
/* ============================ */
const US_STATE_DATA = {
  "AL": { name: "Alabama", taxRate: 0.0041, insFactor: 0.0075, closingFactor: 0.013 },
  "AK": { name: "Alaska", taxRate: 0.0119, insFactor: 0.0045, closingFactor: 0.011 },
  "AZ": { name: "Arizona", taxRate: 0.0062, insFactor: 0.0055, closingFactor: 0.012 },
  "AR": { name: "Arkansas", taxRate: 0.0062, insFactor: 0.0090, closingFactor: 0.015 },
  "CA": { name: "California", taxRate: 0.0076, insFactor: 0.0030, closingFactor: 0.011 },
  "CO": { name: "Colorado", taxRate: 0.0049, insFactor: 0.0065, closingFactor: 0.008 },
  "CT": { name: "Connecticut", taxRate: 0.0214, insFactor: 0.0045, closingFactor: 0.021 },
  "DE": { name: "Delaware", taxRate: 0.0057, insFactor: 0.0035, closingFactor: 0.040 },
  "DC": { name: "District of Columbia", taxRate: 0.0057, insFactor: 0.0035, closingFactor: 0.035 },
  "FL": { name: "Florida", taxRate: 0.0089, insFactor: 0.0135, closingFactor: 0.023 },
  "GA": { name: "Georgia", taxRate: 0.0091, insFactor: 0.0070, closingFactor: 0.015 },
  "HI": { name: "Hawaii", taxRate: 0.0028, insFactor: 0.0020, closingFactor: 0.012 },
  "ID": { name: "Idaho", taxRate: 0.0069, insFactor: 0.0040, closingFactor: 0.011 },
  "IL": { name: "Illinois", taxRate: 0.0227, insFactor: 0.0065, closingFactor: 0.022 },
  "IN": { name: "Indiana", taxRate: 0.0085, insFactor: 0.0075, closingFactor: 0.010 },
  "IA": { name: "Iowa", taxRate: 0.0157, insFactor: 0.0080, closingFactor: 0.012 },
  "KS": { name: "Kansas", taxRate: 0.0141, insFactor: 0.0100, closingFactor: 0.010 },
  "KY": { name: "Kentucky", taxRate: 0.0086, insFactor: 0.0080, closingFactor: 0.013 },
  "LA": { name: "Louisiana", taxRate: 0.0055, insFactor: 0.0140, closingFactor: 0.019 },
  "ME": { name: "Maine", taxRate: 0.0130, insFactor: 0.0040, closingFactor: 0.013 },
  "MD": { name: "Maryland", taxRate: 0.0109, insFactor: 0.0045, closingFactor: 0.035 },
  "MA": { name: "Massachusetts", taxRate: 0.0123, insFactor: 0.0035, closingFactor: 0.014 },
  "MI": { name: "Michigan", taxRate: 0.0154, insFactor: 0.0065, closingFactor: 0.018 },
  "MN": { name: "Minnesota", taxRate: 0.0112, insFactor: 0.0065, closingFactor: 0.015 },
  "MS": { name: "Mississippi", taxRate: 0.0081, insFactor: 0.0095, closingFactor: 0.011 },
  "MO": { name: "Missouri", taxRate: 0.0097, insFactor: 0.0085, closingFactor: 0.009 },
  "MT": { name: "Montana", taxRate: 0.0084, insFactor: 0.0055, closingFactor: 0.010 },
  "NE": { name: "Nebraska", taxRate: 0.0177, insFactor: 0.0105, closingFactor: 0.013 },
  "NV": { name: "Nevada", taxRate: 0.0060, insFactor: 0.0035, closingFactor: 0.014 },
  "NH": { name: "New Hampshire", taxRate: 0.0218, insFactor: 0.0030, closingFactor: 0.020 },
  "NJ": { name: "New Jersey", taxRate: 0.0249, insFactor: 0.0035, closingFactor: 0.022 },
  "NM": { name: "New Mexico", taxRate: 0.0080, insFactor: 0.0045, closingFactor: 0.011 },
  "NY": { name: "New York", taxRate: 0.0172, insFactor: 0.0045, closingFactor: 0.038 },
  "NC": { name: "North Carolina", taxRate: 0.0077, insFactor: 0.0065, closingFactor: 0.012 },
  "ND": { name: "North Dakota", taxRate: 0.0093, insFactor: 0.0075, closingFactor: 0.011 },
  "OH": { name: "Ohio", taxRate: 0.0157, insFactor: 0.0065, closingFactor: 0.016 },
  "OK": { name: "Oklahoma", taxRate: 0.0090, insFactor: 0.0135, closingFactor: 0.014 },
  "OR": { name: "Oregon", taxRate: 0.0097, insFactor: 0.0035, closingFactor: 0.010 },
  "PA": { name: "Pennsylvania", taxRate: 0.0158, insFactor: 0.0045, closingFactor: 0.041 },
  "RI": { name: "Rhode Island", taxRate: 0.0163, insFactor: 0.0045, closingFactor: 0.013 },
  "SC": { name: "South Carolina", taxRate: 0.0057, insFactor: 0.0070, closingFactor: 0.013 },
  "SD": { name: "South Dakota", taxRate: 0.0131, insFactor: 0.0080, closingFactor: 0.010 },
  "TN": { name: "Tennessee", taxRate: 0.0071, insFactor: 0.0070, closingFactor: 0.014 },
  "TX": { name: "Texas", taxRate: 0.0180, insFactor: 0.0135, closingFactor: 0.015 },
  "UT": { name: "Utah", taxRate: 0.0063, insFactor: 0.0035, closingFactor: 0.010 },
  "VT": { name: "Vermont", taxRate: 0.0190, insFactor: 0.0035, closingFactor: 0.021 },
  "VA": { name: "Virginia", taxRate: 0.0082, insFactor: 0.0050, closingFactor: 0.016 },
  "WA": { name: "Washington", taxRate: 0.0094, insFactor: 0.0035, closingFactor: 0.018 },
  "WV": { name: "West Virginia", taxRate: 0.0058, insFactor: 0.0080, closingFactor: 0.021 },
  "WI": { name: "Wisconsin", taxRate: 0.0185, insFactor: 0.0045, closingFactor: 0.012 },
  "WY": { name: "Wyoming", taxRate: 0.0061, insFactor: 0.0045, closingFactor: 0.009 }
};

// Fallback Income Tax Estimates
const ESTIMATED_INCOME_TAX = {
    'AK': 0, 'FL': 0, 'NV': 0, 'SD': 0, 'TN': 0, 'TX': 0, 'WA': 0, 'WY': 0, 'NH': 0,
    'CA': 0.09, 'NY': 0.065, 'NJ': 0.06, 'HI': 0.075, 'OR': 0.08, 'MN': 0.07, 'DC': 0.06,
    'default': 0.045
};

/* ============================ */
/* Slider & Input Logic         */
/* ============================ */

const SLIDER_CONFIG = {
    annualIncome: { type: 'cubic', max: 500000 },
    monthlyDebt: { type: 'cubic', max: 5000 },
    cashSaved: { type: 'cubic', max: 200000 },
    homePrice: { type: 'cubic', max: 2000000 },
    downPayment: { type: 'cubic', max: 500000 },
    interestRate: { type: 'linear', min: 0, max: 15 },
    mustHaves: { type: 'cubic', max: 10000 },
    funMoney: { type: 'cubic', max: 5000 },
    maintenance: { type: 'cubic', max: 2000 }
};

// Helper: Convert Value to Slider Percentage
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return Math.pow(val / config.max, 1/3) * 100;
    const min = config.min || 0;
    return ((val - min) / (config.max - min)) * 100;
};

// Helper: Convert Slider Percentage to Value
const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return config.max * Math.pow(percent / 100, 3);
    const min = config.min || 0;
    return ((percent / 100) * (config.max - min)) + min;
};

// Helper: Visual Gradient
const updateSliderVisual = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = (slider.value - min) / (max - min) * 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

// Helper: Format Output
const cleanNumber = (num) => parseFloat(num) || 0;
const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};
const formatCurrencyPlain = (num) => {
    // Returns format like 1,234.00 without $ for print logic precision if needed, or with $
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
};

// ---------------------------
// THE CALCULATION ENGINE
// ---------------------------
function calculateResults() {
    const annualIncome = cleanNumber(document.getElementById('input_annualIncome').value);
    const monthlyDebt = cleanNumber(document.getElementById('input_monthlyDebt').value);
    const cashSaved = cleanNumber(document.getElementById('input_cashSaved').value);
    
    const stateSelector = document.getElementById('stateSelector');
    const stateVal = stateSelector ? stateSelector.value : 'CA';
    const isHighCost = document.getElementById('highCostToggle').checked;
    
    const homePrice = cleanNumber(document.getElementById('input_homePrice').value);
    const downPayment = cleanNumber(document.getElementById('input_downPayment').value);
    const interestRate = cleanNumber(document.getElementById('input_interestRate').value);
    
    const mustHaves = cleanNumber(document.getElementById('input_mustHaves').value);
    const funMoney = cleanNumber(document.getElementById('input_funMoney').value);
    const maintenance = cleanNumber(document.getElementById('input_maintenance').value);

    const stateData = US_STATE_DATA[stateVal] || US_STATE_DATA['CA'];
    
    const propTaxRate = stateData.taxRate;
    const closingCostsRate = stateData.closingFactor;
    
    let insuranceRate = stateData.insFactor; 
    let hoaFee = 0;

    if(isHighCost) {
        hoaFee = 350; 
        insuranceRate = insuranceRate * 1.2;
    }

    const stateIncomeTax = ESTIMATED_INCOME_TAX[stateVal] !== undefined 
                           ? ESTIMATED_INCOME_TAX[stateVal] 
                           : ESTIMATED_INCOME_TAX['default'];

    const baseTaxLoad = 0.22; 
    const totalTaxLoad = baseTaxLoad + stateIncomeTax;
    const monthlyGross = annualIncome / 12;
    const monthlyNet = monthlyGross * (1 - totalTaxLoad);

    const loanAmount = homePrice - downPayment;
    let monthlyPI = 0;
    if (loanAmount > 0) {
        const monthlyRate = (interestRate / 100) / 12;
        const numberOfPayments = 360; 
        if (monthlyRate === 0) {
            monthlyPI = loanAmount / numberOfPayments;
        } else {
            monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
    }

    const monthlyPropTax = (homePrice * propTaxRate) / 12;
    const monthlyInsurance = (homePrice * insuranceRate) / 12;
    
    let monthlyPMI = 0;
    if (downPayment < (homePrice * 0.20)) {
        monthlyPMI = (loanAmount * 0.0058) / 12;
    }

    const totalObligation = monthlyPI + monthlyPropTax + monthlyInsurance + hoaFee + monthlyPMI + maintenance;
    const trueLeftover = monthlyNet - (totalObligation + monthlyDebt + mustHaves + funMoney);

    const estimatedClosingCosts = homePrice * closingCostsRate;
    const cashRemainingAfterClose = cashSaved - downPayment - estimatedClosingCosts;
    
    let runwayMonths = 0;
    const bareBonesBudget = totalObligation + monthlyDebt + mustHaves;

    if (cashRemainingAfterClose > 0 && bareBonesBudget > 0) {
        runwayMonths = cashRemainingAfterClose / bareBonesBudget;
    }

    const survivalText = document.getElementById('survivalText');
    
    if (cashRemainingAfterClose < 0) {
        survivalText.textContent = "Not enough cash to close.";
        survivalText.className = "alert-value text-red";
    } else {
        survivalText.textContent = `You have ${runwayMonths.toFixed(1)} months of runway.`;
        if (runwayMonths < 3) {
            survivalText.className = "alert-value text-red";
        } else {
            survivalText.className = "alert-value text-green";
        }
    }

    const cashNeeded = downPayment + estimatedClosingCosts;
    const cashGap = cashNeeded - cashSaved;
    const cashGapText = document.getElementById('cashGapText');

    if (cashGap > 0) {
        cashGapText.textContent = `You need ${formatCurrency(cashGap)} more to close.`;
        cashGapText.className = "alert-value text-red";
    } else {
        cashGapText.textContent = `You have a ${formatCurrency(Math.abs(cashGap))} cash surplus.`;
        cashGapText.className = "alert-value text-green";
    }

    document.getElementById('monthlyObligation').textContent = formatCurrency(totalObligation);
    const leftoverEl = document.getElementById('monthlyLeftover');
    leftoverEl.textContent = formatCurrency(trueLeftover);

    if (trueLeftover >= 0) {
        leftoverEl.className = "output-value hero text-green";
    } else {
        leftoverEl.className = "output-value hero text-red";
    }
    
    generateVerdict(cashGap, trueLeftover, runwayMonths);
}

function generateVerdict(cashGap, monthlyLeftover, runwayMonths) {
    const verdictEl = document.getElementById('dynamicVerdict');
    let msg = "";
    const red = (t) => `<span class="text-red" style="font-weight:600;">${t}</span>`;
    const green = (t) => `<span class="text-green" style="font-weight:600;">${t}</span>`;

    if (cashGap > 0 && monthlyLeftover < 0) {
        msg = `This scenario presents a ${red("critical barrier")} to entry. Not only is there a ${red("shortage of upfront cash")} to close, but the projected monthly costs also ${red("exceed your income")}. Proceeding now would create immediate financial distress; focusing on debt reduction or a lower price point is essential.`;
    } 
    else if (cashGap > 0 && monthlyLeftover >= 0) {
        msg = `Your monthly income is robust enough to handle the mortgage payments, but you face a ${red("liquidity hurdle")}: there isn't enough cash saved to cover the down payment and closing costs. You would need to delay the purchase to accumulate more savings or explore down-payment assistance programs to bridge this ${red("cash gap")}.`;
    } 
    else if (cashGap <= 0 && monthlyLeftover < 0) {
        msg = `You have the capital to secure the home, but the monthly running costs ${red("exceed your disposable income")}. This would force you to subsidize the mortgage from your savings every single month—a strategy that is ${red("mathematically unsustainable")} and will eventually deplete your financial reserves.`;
    } 
    else if (cashGap <= 0 && monthlyLeftover >= 0 && runwayMonths < 3) {
        msg = `You can technically afford to buy this home and pay the monthly bills, but the closing costs would drain your liquidity to a ${red("dangerous level")}. With less than ${red("3 months")} of emergency runway remaining, a single unexpected repair or income interruption could force you into high-interest debt.`;
    } 
    else {
        msg = `This is a ${green("financially sound")} scenario. You have ample cash to close without stress, and your income supports the monthly payments with a ${green("healthy surplus")}. This balance allows you to enjoy the home while maintaining a strong safety net for future goals.`;
    }

    verdictEl.innerHTML = msg;
}

// ---------------------------
// INITIALIZATION
// ---------------------------
function initializeStateSelector() {
    const selector = document.getElementById('stateSelector');
    const container = document.getElementById('dropdownOptionsContainer');
    const trigger = document.getElementById('dropdownTrigger');
    
    if (!selector || !container || !trigger) return;

    selector.innerHTML = '';
    container.innerHTML = '';

    const sortedKeys = Object.keys(US_STATE_DATA).sort((a, b) => 
        US_STATE_DATA[a].name.localeCompare(US_STATE_DATA[b].name)
    );

    sortedKeys.forEach(code => {
        const stateName = US_STATE_DATA[code].name;
        const option = document.createElement('option');
        option.value = code;
        option.textContent = stateName;
        selector.appendChild(option);

        const div = document.createElement('div');
        div.className = 'dropdown-option';
        div.setAttribute('data-value', code);
        div.textContent = stateName;
        
        if (code === 'CA') {
            div.classList.add('selected');
            option.selected = true;
            trigger.textContent = stateName;
        }

        container.appendChild(div);
    });
}

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
                if(key === 'interestRate') realVal = Math.round(realVal * 10) / 10;
                else realVal = Math.round(realVal); 
            }
            input.value = realVal; 
            updateSliderVisual(e.target);
            if(key === 'homePrice') updateMaintenanceBuffer(realVal);
            calculateResults();
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            if(key === 'homePrice') updateMaintenanceBuffer(currentVal);
            calculateResults();
        });
    });
}

function updateMaintenanceBuffer(homePrice) {
    const maintInput = document.getElementById('input_maintenance');
    const maintSlider = document.getElementById('slider_maintenance');
    if(maintInput && maintSlider) {
        const monthlyMaint = Math.round((homePrice * 0.01) / 12);
        maintInput.value = monthlyMaint;
        maintSlider.value = valToSlider(monthlyMaint, 'maintenance');
        updateSliderVisual(maintSlider);
    }
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        if(!trigger || !menu) return;

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        wrapper.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-option')) {
                e.stopPropagation();
                const option = e.target;
                const value = option.getAttribute('data-value');
                trigger.textContent = option.textContent;
                wrapper.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                menu.classList.remove('active');
                if(select) {
                    select.value = value;
                    calculateResults();
                }
            }
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

function initializeVisualFeedback() {
    const highCostToggle = document.getElementById('highCostToggle');
    const highCostLabel = document.getElementById('highCostLabel');
    if(highCostToggle && highCostLabel) {
        highCostToggle.addEventListener('change', () => {
            highCostLabel.textContent = highCostToggle.checked ? "Yes" : "No";
            calculateResults();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeStateSelector();
    initializeSliders();
    initializeCustomDropdowns();
    initializeVisualFeedback();
    calculateResults();
    ToolFeatures.init();
});

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,

    PERSIST_MAP: {
        'inc': { id: 'input_annualIncome', type: 'number' },
        'debt': { id: 'input_monthlyDebt', type: 'number' },
        'cash': { id: 'input_cashSaved', type: 'number' },
        'state': { id: 'stateSelector', type: 'text' },
        'cost': { id: 'highCostToggle', type: 'checkbox' },
        'price': { id: 'input_homePrice', type: 'number' },
        'dp': { id: 'input_downPayment', type: 'number' },
        'rate': { id: 'input_interestRate', type: 'number' },
        'must': { id: 'input_mustHaves', type: 'number' },
        'fun': { id: 'input_funMoney', type: 'number' },
        'maint': { id: 'input_maintenance', type: 'number' }
    },

    getShareUrl() {
        const params = new URLSearchParams();
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) {
                if (config.type === 'checkbox') {
                    params.set(key, el.checked ? '1' : '0');
                } else {
                    params.set(key, el.value);
                }
            }
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
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    const val = params.get(key);
                    if (config.type === 'checkbox') {
                        el.checked = val === '1';
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    } else {
                        el.value = val;
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        if (config.id === 'stateSelector') {
                            const option = document.querySelector(`.dropdown-option[data-value="${val}"]`);
                            const trigger = document.getElementById('dropdownTrigger');
                            if (option && trigger) {
                                trigger.textContent = option.textContent;
                                document.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                                option.classList.add('selected');
                            }
                        }
                    }
                }
            }
        }
        calculateResults();
    },

    /* =================================================================
       3. OFFICIAL PRINT REPORT GENERATION (Strict Formatting)
       ================================================================= */
    preparePrintData() {
        const printContainer = document.getElementById('print-content-injection');
        
        // 1. Gather Raw Data
        const getVal = (id) => cleanNumber(document.getElementById(id).value);
        
        const annualIncome = getVal('input_annualIncome');
        const monthlyDebt = getVal('input_monthlyDebt');
        const cashSaved = getVal('input_cashSaved');
        const mustHaves = getVal('input_mustHaves');
        const funMoney = getVal('input_funMoney');
        const maintenance = getVal('input_maintenance');
        const homePrice = getVal('input_homePrice');
        const downPayment = getVal('input_downPayment');
        const rate = document.getElementById('input_interestRate').value;
        const isHighCost = document.getElementById('highCostToggle').checked ? "Yes" : "No";
        
        // State Name Logic
        const stateCode = document.getElementById('stateSelector').value;
        const stateName = US_STATE_DATA[stateCode] ? US_STATE_DATA[stateCode].name : "Unknown Jurisdiction";

        // Calculated Strings
        const totalObStr = document.getElementById('monthlyObligation').textContent;
        const leftoverStr = document.getElementById('monthlyLeftover').textContent;
        const leftoverVal = cleanNumber(leftoverStr.replace(/[^0-9.-]+/g,""));
        
        // Survival Check Logic
        const survivalTextRaw = document.getElementById('survivalText').textContent; 
        const runwayMatch = survivalTextRaw.match(/([0-9.]+) months/);
        const runwayStr = runwayMatch ? `${runwayMatch[1]} Months of Runway` : (survivalTextRaw.includes("Not enough") ? "Critical: 0 Months" : "0 Months");

        // Cash Gap Logic
        const cashGapTextRaw = document.getElementById('cashGapText').textContent;
        let cashResultStr = "";
        if(cashGapTextRaw.includes("need")) {
             cashResultStr = "-" + cashGapTextRaw.replace("You need ", "").replace(" more to close.", "") + " (Deficit)";
        } else {
             cashResultStr = "+" + cashGapTextRaw.replace("You have a ", "").replace(" cash surplus.", "") + " Surplus";
        }

        // Determination String
        let determinationStr = "";
        let determinationVal = leftoverStr;
        if(leftoverVal < 0) {
            determinationStr = "MATHEMATICALLY UNSUSTAINABLE";
        } else {
            determinationStr = "FINANCIALLY SUSTAINABLE";
            determinationVal = "+" + leftoverStr;
        }

        // Date
        const today = new Date().toLocaleDateString('en-US');
        
        // 2. Build HTML (COMPACT & LOGO FIX)
        const html = `
            <!-- HEADER BLOCK -->
            <div class="print-header-container">
                <div class="print-logo-row">
                    <img src="../../img/Logo_Gold.webp" class="print-doc-logo" alt="Logo">
                    <div class="print-title-block">
                        <h1>OFFICIAL RISK & SOLVENCY ASSESSMENT</h1>
                        <h2>FINANCIAL IMPACT VS. ASSET CAPABILITY</h2>
                    </div>
                </div>
            </div>

            <!-- METADATA BLOCK -->
            <div class="print-metadata-grid">
                <div class="meta-col">
                    <div class="meta-row"><span class="meta-label">PREPARED BY:</span><span class="meta-line large">____________________</span></div>
                </div>
                <div class="meta-col right">
                    <div class="meta-row"><span class="meta-label">DATE:</span><span class="meta-val">${today}</span></div>
                    <div class="meta-row"><span class="meta-label">JURISDICTION:</span><span class="meta-val uppercase">${stateName.toUpperCase()}</span></div>
                </div>
            </div>

            <!-- I. JURISDICTION -->
            <div class="print-section compact">
                <h3 class="print-sec-title">I. CONTEXT (${stateName.toUpperCase()})</h3>
                <div class="print-content-block">
                    <div class="data-pair"><span class="p-label">Basis:</span><span class="p-val">State Property Tax & Net Income.</span></div>
                </div>
            </div>

            <!-- II. APPLICANT FINANCIAL PROFILE -->
            <div class="print-section compact">
                <h3 class="print-sec-title">II. FINANCIAL PROFILE</h3>
                <div class="print-content-block">
                    <div class="print-2col-grid">
                        <div class="col">
                            <div class="data-pair spaced"><span class="p-label">Gross Income</span><span class="p-val">$${formatCurrencyPlain(annualIncome)}</span></div>
                            <div class="data-pair spaced"><span class="p-label">Liquid Cash</span><span class="p-val">$${formatCurrencyPlain(cashSaved)}</span></div>
                        </div>
                        <div class="col">
                            <div class="data-pair spaced"><span class="p-label">Monthly Debt</span><span class="p-val">$${formatCurrencyPlain(monthlyDebt)}</span></div>
                            <div class="data-pair spaced"><span class="p-label">Maintenance (1%)</span><span class="p-val">$${formatCurrencyPlain(maintenance)}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- III. PROPERTY & FINANCING -->
            <div class="print-section compact">
                <h3 class="print-sec-title">III. PROPERTY TERMS</h3>
                <div class="print-content-block">
                    <div class="print-2col-grid">
                        <div class="col">
                            <div class="data-pair spaced"><span class="p-label">Home Price</span><span class="p-val">$${formatCurrencyPlain(homePrice)}</span></div>
                            <div class="data-pair spaced"><span class="p-label">Down Payment</span><span class="p-val">$${formatCurrencyPlain(downPayment)}</span></div>
                        </div>
                        <div class="col">
                            <div class="data-pair spaced"><span class="p-label">Interest Rate</span><span class="p-val">${rate}%</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IV. DISCREPANCY & SOLVENCY -->
            <div class="print-section compact">
                <h3 class="print-sec-title">IV. SOLVENCY SUMMARY</h3>
                <div class="print-content-block">
                    <div class="summary-row">
                        <span class="sum-label">THE "REAL" MONTHLY BILL</span>
                        <span class="sum-val">${totalObStr}</span>
                    </div>
                    <div class="summary-row">
                        <span class="sum-label">TRUE MONTHLY LEFTOVER</span>
                        <span class="sum-val">${leftoverStr}</span>
                    </div>
                    
                    <div class="determination-box">
                        <div class="det-row">
                            <span class="det-label">DETERMINATION: ${determinationStr}</span>
                            <span class="det-val">${determinationVal}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- V. RISK -->
            <div class="print-section compact">
                <h3 class="print-sec-title">V. RISK ASSESSMENT</h3>
                <div class="print-content-block">
                    <div class="summary-row"><span class="sum-label">RUNWAY (JOB LOSS)</span><span class="sum-val">${runwayStr}</span></div>
                    <div class="summary-row"><span class="sum-label">CASH TO CLOSE GAP</span><span class="sum-val">${cashResultStr}</span></div>
                </div>
            </div>

            <!-- SIGNATURE BLOCK -->
            <div class="signature-section">
                <div class="sig-block">
                    <div class="sig-line">_________________________</div>
                    <div class="sig-label">APPLICANT</div>
                </div>
                <div class="sig-block">
                    <div class="sig-line">_________________________</div>
                    <div class="sig-label">DATE</div>
                </div>
            </div>
            
            <!-- DISCLAIMER -->
            <div class="print-disclaimer">
                LEGAL & METHODOLOGY DISCLAIMER: This Official Homeownership Risk & Solvency Assessment is generated automatically for informational and risk assessment purposes only. The figures presented are estimates derived from standard industry algorithms. This document does not constitute legal advice, a binding financial guarantee, or a certified professional appraisal. Users assume all responsibility for how this data is utilized in financial planning.
            </div>
        `;

        printContainer.innerHTML = html; 
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
            if (timeLeft > 0) {
                proceedBtn.textContent = `Proceed (${timeLeft})`;
            } else {
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