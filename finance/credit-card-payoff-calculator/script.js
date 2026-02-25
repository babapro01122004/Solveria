/* ==========================================================================
   DATA SECTION
   ========================================================================== */

/* 1. REGIONAL COMPARISON DATA */
const US_STATE_DEBT = [
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

const getAvgDebtByState = (code) => {
    if (!code) return 6730;
    const state = US_STATE_DEBT.find(s => s.code.toLowerCase() === code.toLowerCase());
    return state ? state.avgDebt : 6730; 
};

/* 2. CALCULATOR CONSTANTS */
const CALCULATOR_CONSTANTS = {
    AVG_TAX_REFUND: 3138,
    MIN_PAYMENT_FLOOR: 35.00, 
    MIN_PAYMENT_BAL_PERCENT: 0.01, 
    FEASIBILITY_COMFORTABLE: 0.05, 
    FEASIBILITY_AGGRESSIVE: 0.10,  
    FEASIBILITY_IMPOSSIBLE: 0.50   
};

/* 3. INTEREST EQUIVALENT TRANSLATOR */
const STUPID_TAX_TIERS = [
    { max: 50, label: "A casual dining meal" },
    { max: 200, label: "Premium footwear" },
    { max: 800, label: "A domestic round-trip flight" },
    { max: 1500, label: "A flagship smartphone" },
    { max: 2000, label: "A high-performance laptop" },
    { max: 4000, label: "A reliable pre-owned vehicle" },
    { max: 8000, label: "International travel" },
    { max: 999999, label: "A residential down payment" }
];

const getStupidTaxLabel = (interestAmount) => {
    const tier = STUPID_TAX_TIERS.find(t => interestAmount <= t.max);
    return tier ? tier.label : "A substantial asset";
};


/* ==========================================================================
   APP LOGIC START
   ========================================================================== */

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "Eliminate your debt — secure your future.",
    "Repay it today, invest in yourself tomorrow.",
    "Interest is the cost of delayed repayment.",
    "Financial solvency is just a calculation away."
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

if(textElement) {
    setInterval(cycleText, 4000);
}

/* ============================ */
/* Slider & Input Logic         */
/* ============================ */

// 1. Slider Configuration
const SLIDER_CONFIG = {
    // Mode 1: The Budgeter
    balance1: { type: 'cubic', max: 50000 },
    rate1: { type: 'linear', max: 35 },
    payment1: { type: 'cubic', max: 5000 },
    limit1: { type: 'cubic', max: 100000 },
    introApr1: { type: 'linear', max: 35 },
    introDur1: { type: 'linear', max: 24 },
    postApr1: { type: 'linear', max: 35 },
    fee1: { type: 'cubic', max: 1000 },

    // Mode 2: The Goal Setter
    balance2: { type: 'cubic', max: 50000 },
    rate2: { type: 'linear', max: 35 },
    // Date input excluded
    lump2: { type: 'cubic', max: 20000 },
    btFee2: { type: 'linear', max: 10 },
    promo2: { type: 'linear', max: 24 }
};

// 2. Helpers
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return Math.pow(val / config.max, 1/3) * 100;
    const min = config.min || 0;
    return ((val - min) / (config.max - min)) * 100;
};

const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    if (config.type === 'cubic') return config.max * Math.pow(percent / 100, 3);
    const min = config.min || 0;
    return ((percent / 100) * (config.max - min)) + min;
};

const updateSliderVisual = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = (slider.value - min) / (max - min) * 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

const cleanNumber = (num) => parseFloat(num) || 0;

// Initialize Sliders
function initializeSliders() {
    Object.keys(SLIDER_CONFIG).forEach(key => {
        const input = document.getElementById(`input_${key}`);
        const slider = document.getElementById(`slider_${key}`);

        if (!slider) return;
        if (!input) return;

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
                realVal = Math.round(realVal * 100) / 100;
            }
            
            input.value = realVal; 
            updateSliderVisual(e.target);
            triggerActiveCalculation();
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            triggerActiveCalculation();
        });
    });
}

// Special Trigger that checks which mode is active
function triggerActiveCalculation() {
    if (document.querySelector('.mode-card[data-mode="mode-a"]').classList.contains('active-mode')) {
        calculateMode1();
    } else if (document.querySelector('.mode-card[data-mode="mode-b"]').classList.contains('active-mode')) {
        calculateMode2();
    }
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

        // FORCE SYNC ON LOAD
        // Ensure visual trigger matches the hidden select value (handles soft reloads)
        if(select && trigger) {
             const currentVal = select.value;
             const matchingOption = wrapper.querySelector(`.dropdown-option[data-value="${currentVal}"]`);
             if(matchingOption) {
                 trigger.textContent = matchingOption.textContent;
                 options.forEach(opt => opt.classList.remove('selected'));
                 matchingOption.classList.add('selected');
             }
        }

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
                    triggerActiveCalculation();
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

/* ============================ */
/* Custom Date Picker Logic     */
/* ============================ */
function initializeCustomDatePicker() {
    const wrapper = document.getElementById('custom-date-wrapper');
    if (!wrapper) return;

    const trigger = document.getElementById('date-trigger');
    const popup = document.getElementById('date-picker-popup');
    const display = document.getElementById('date-text');
    const hiddenInput = document.getElementById('input_date2');
    
    // Calendar Elements
    const prevBtn = document.getElementById('prev-year-btn');
    const nextBtn = document.getElementById('next-year-btn');
    const yearDisplay = document.getElementById('year-display');
    const monthsGrid = document.getElementById('months-grid');

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let currentYear = new Date().getFullYear() + 1; // Start 1 year ahead
    let selectedYear = currentYear;
    let selectedMonth = 0; // January

    // Render Grid
    function renderMonths() {
        monthsGrid.innerHTML = '';
        monthNames.forEach((m, index) => {
            const div = document.createElement('div');
            div.className = 'picker-month-item';
            div.textContent = m.substring(0, 3);
            
            // Check selection state
            const currentVal = hiddenInput.value; // YYYY-MM
            if(currentVal) {
                const [y, mon] = currentVal.split('-');
                if(parseInt(y) === currentYear && parseInt(mon) === index + 1) {
                    div.classList.add('selected');
                }
            }

            div.addEventListener('click', (e) => {
                e.stopPropagation();
                selectDate(currentYear, index);
            });
            monthsGrid.appendChild(div);
        });
    }

    function selectDate(year, monthIndex) {
        selectedYear = year;
        selectedMonth = monthIndex;
        
        // Format YYYY-MM for hidden input
        const yStr = year;
        const mStr = (monthIndex + 1).toString().padStart(2, '0');
        hiddenInput.value = `${yStr}-${mStr}`;
        
        // Update display text
        display.textContent = `${monthNames[monthIndex]} ${year}`;
        
        // Close popup
        popup.classList.remove('active');
        trigger.classList.remove('active-state'); 
        
        // Trigger calc
        triggerActiveCalculation();
        
        // Re-render to show selection
        renderMonths();
    }

    // Toggle
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.toggle('active');
        trigger.classList.toggle('active-state'); 
        if(popup.classList.contains('active')) {
            renderMonths();
        }
    });

    // Year Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentYear--;
        yearDisplay.textContent = currentYear;
        renderMonths();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentYear++;
        yearDisplay.textContent = currentYear;
        renderMonths();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if(!wrapper.contains(e.target)) {
            popup.classList.remove('active');
            trigger.classList.remove('active-state');
        }
    });

    // Initial Set (Default 1 year out)
    const now = new Date();
    const future = new Date(now.getFullYear() + 1, now.getMonth());
    selectDate(future.getFullYear(), future.getMonth());
    yearDisplay.textContent = future.getFullYear();
    currentYear = future.getFullYear();
}

/* ============================ */
/* Mode Switching Logic         */
/* ============================ */
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

            const universalVisuals = document.getElementById('universal-results-visuals');
            const globalResults = document.getElementById('global-results');
            
            if (modeId === 'mode-a') {
                universalVisuals.classList.remove('hidden');
                globalResults.classList.remove('hidden');
                calculateMode1();
            } else if (modeId === 'mode-b') {
                universalVisuals.classList.remove('hidden');
                globalResults.classList.remove('hidden');
                calculateMode2();
            } else {
                universalVisuals.classList.add('hidden');
                globalResults.classList.add('hidden');
            }
        });
    });
}

/* ============================ */
/* Advanced Toggle Logic        */
/* ============================ */
function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    if(!btn) return;
    
    let isAdvanced = false;

    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";
        document.querySelectorAll('.advanced-content').forEach(el => {
            if (isAdvanced) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
        
        // Update URL to reflect advanced state if sharing
        if (typeof ToolFeatures !== 'undefined') {
            // Optional: could trigger a state save here if needed
        }
    });
}

/* ============================ */
/* SHARED CALCULATIONS          */
/* ============================ */

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

function formatDate(monthsFromNow) {
    if (!isFinite(monthsFromNow)) return "Never";
    const date = new Date();
    date.setMonth(date.getMonth() + monthsFromNow);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

/* ============================ */
/* ENGINE: MODE 1 (Budgeter)    */
/* ============================ */

function runPayoffSimulation(balance, rate, payment, introApr = 0, introDur = 0, postApr = 0, limit = 0) {
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;
    let milestoneMonth = -1;

    // Early exit
    let firstMonthInterest = currentBalance * (rate / 100 / 12);
    if (payment <= firstMonthInterest && balance > 0) {
        return { months: Infinity, interest: Infinity, milestone: -1 };
    }

    while (currentBalance > 0 && months < 1200) { 
        months++;
        let activeRate = (months <= introDur) ? introApr : (postApr || rate);
        let monthlyRate = activeRate / 100 / 12;
        
        let interest = currentBalance * monthlyRate;
        totalInterest += interest;
        
        let principal = payment - interest;
        currentBalance -= principal;

        if (limit > 0 && milestoneMonth === -1) {
            if (currentBalance < (limit * 0.3)) milestoneMonth = months;
        }
    }
    return { months, interest: totalInterest, milestone: milestoneMonth };
}

// Special simulation for Minimum Payments (Dynamic) based on Data File Formula
function runMinPaymentSimulation(startBalance, rate) {
    let balance = startBalance;
    let months = 0;
    
    // Safety break
    while(balance > 0 && months < 1200) {
        months++;
        let monthlyRate = rate / 100 / 12;
        let interest = balance * monthlyRate;
        
        // Formula: Max(Floor, (Balance * 1%) + MonthlyInterest)
        let minPayCalc = (balance * CALCULATOR_CONSTANTS.MIN_PAYMENT_BAL_PERCENT) + interest;
        let payment = Math.max(CALCULATOR_CONSTANTS.MIN_PAYMENT_FLOOR, minPayCalc);
        
        if(payment < interest) payment = interest + 1; // Prevent eternal loop if formula fails

        balance = balance + interest - payment;
    }
    return { months: (months >= 1200 ? Infinity : months) };
}

function calculateMode1() {
    const balance = cleanNumber(document.getElementById('input_balance1').value);
    const rate = cleanNumber(document.getElementById('input_rate1').value);
    let payment = cleanNumber(document.getElementById('input_payment1').value);
    const freq = document.getElementById('freq1').value;
    const limit = cleanNumber(document.getElementById('input_limit1').value);
    const introApr = cleanNumber(document.getElementById('input_introApr1').value);
    const introDur = cleanNumber(document.getElementById('input_introDur1').value);
    const postApr = cleanNumber(document.getElementById('input_postApr1').value);
    const fee = cleanNumber(document.getElementById('input_fee1').value); // Annual Fee
    const spendingStatus = document.getElementById('spendingStatus').value;
    
    // State Debt Data Update
    const stateCode = document.getElementById('stateSelector').value;
    document.getElementById('res_stateDebt').textContent = formatCurrency(getAvgDebtByState(stateCode));

    if (freq === 'biweekly') payment = payment * (13 / 12); 

    const warningBanner = document.getElementById('spending-warning');
    if (spendingStatus === 'spending') warningBanner.classList.remove('hidden');
    else warningBanner.classList.add('hidden');

    const hasIntro = introDur > 0;
    const userSim = runPayoffSimulation(
        balance, rate, payment, 
        hasIntro ? introApr : rate, introDur, hasIntro ? postApr : rate, limit
    );

    // Dynamic Minimum Payment Simulation using Federal Data Constants
    const minSim = runMinPaymentSimulation(balance, rate);

    // Outputs
    const outDate = document.getElementById('res_freedomDate1');
    const outInterest = document.getElementById('res_totalInterest1');
    const outSaved = document.getElementById('res_timeSaved1');
    const outMilestone = document.getElementById('res_milestone1');
    const outStupid = document.getElementById('res_stupidTax');
    const outUserTime = document.getElementById('res_userTimeline');
    const outMinTime = document.getElementById('res_minTimeline');
    const dynamicSummary = document.getElementById('dynamic-summary');

    if (userSim.months === Infinity) {
        outDate.textContent = "Never";
        outDate.style.color = "#e74c3c";
        outInterest.textContent = "Infinite";
        outSaved.textContent = "0 Months";
        outMilestone.textContent = "--";
        outStupid.textContent = "Total Balance";
        updateTrafficLight('red', true);

        // Dynamic Summary: Trap (HTML)
        dynamicSummary.innerHTML = `Your current payment <span class="summary-highlight-bad">scarcely covers the accruing interest</span>, meaning you are effectively maintaining the principal balance; at this pace, you will remain in debt for over <span class="summary-highlight-bad">20 years</span> while paying significantly more than you originally borrowed.`;

    } else {
        outDate.textContent = formatDate(userSim.months);
        outDate.style.color = "#333";
        
        // Add Annual Fees to the Total Cost Logic
        const totalFees = fee * Math.ceil(userSim.months / 12);
        const totalCost = userSim.interest + totalFees;

        outInterest.textContent = formatCurrency(totalCost);
        
        const saved = Math.max(0, minSim.months - userSim.months);
        outSaved.textContent = (minSim.months === Infinity) ? "Avoided Debt Trap" : `${saved} Months saved`;
        
        outMilestone.textContent = (userSim.milestone > 0) ? formatDate(userSim.milestone) : "Already There";
        
        // Use Imported Stupid Tax Label
        outStupid.textContent = getStupidTaxLabel(totalCost);
        
        outUserTime.textContent = `${userSim.months} Mo`;
        outMinTime.textContent = (minSim.months === Infinity) ? "∞" : `${minSim.months} Mo`;

        if (userSim.months > 120) {
            updateTrafficLight('red', false);
             // Dynamic Summary: Long Term (HTML)
            dynamicSummary.innerHTML = `By committing to this monthly payment, you are on track to be completely debt-free by <span class="summary-highlight-neutral">${formatDate(userSim.months)}</span>, though the lender will still accrue an estimated <span class="summary-highlight-bad">${formatCurrency(totalCost)}</span> in interest charges along the way.`;
        }
        else if (userSim.months > 36) {
             updateTrafficLight('yellow', false);
             // Dynamic Summary: Standard (HTML)
             dynamicSummary.innerHTML = `By committing to this monthly payment, you are on track to be completely debt-free by <span class="summary-highlight-good">${formatDate(userSim.months)}</span>, though the lender will still accrue an estimated <span class="summary-highlight-neutral">${formatCurrency(totalCost)}</span> in interest charges along the way.`;
        }
        else {
             updateTrafficLight('green', false);
             // Dynamic Summary: Aggressive (HTML)
             dynamicSummary.innerHTML = `You are servicing this debt aggressively, which allows you to eliminate the entire balance in just <span class="summary-highlight-good">${userSim.months} months</span> and <span class="summary-highlight-good">realize significant savings</span> that would have otherwise gone to interest.`;
        }
    }
}

function updateTrafficLight(color, blinking) {
    const r = document.getElementById('light-red');
    const y = document.getElementById('light-yellow');
    const g = document.getElementById('light-green');
    const t = document.getElementById('light-text');

    r.className = 'light red'; y.className = 'light yellow'; g.className = 'light green';

    if (color === 'red') {
        r.classList.add(blinking ? 'blinking' : 'active');
        t.textContent = blinking ? "Critical" : "Extended";
        t.className = "status-text bad";
    } else if (color === 'yellow') {
        y.classList.add('active');
        t.textContent = "Moderate";
        t.className = "status-text ok";
    } else {
        g.classList.add('active');
        t.textContent = "Optimal";
        t.className = "status-text good";
    }
}

/* ============================ */
/* ENGINE: MODE 2 (Goal Setter) */
/* ============================ */

function calculateMode2() {
    // Inputs
    const balance = cleanNumber(document.getElementById('input_balance2').value);
    const rate = cleanNumber(document.getElementById('input_rate2').value);
    
    // READ FROM HIDDEN INPUT (Custom Date Picker Logic)
    let targetDateVal = document.getElementById('input_date2').value;

    // Advanced Inputs
    const lumpSum = cleanNumber(document.getElementById('input_lump2').value);
    const lumpMonthIndex = parseInt(document.getElementById('lumpMonth2').value) || 0; // 0-11
    const btFee = cleanNumber(document.getElementById('input_btFee2').value);
    const promo = cleanNumber(document.getElementById('input_promo2').value);

    // State Debt Data Update
    const stateCode = document.getElementById('stateSelector').value;
    document.getElementById('res_stateDebt').textContent = formatCurrency(getAvgDebtByState(stateCode));

    const dynamicSummary = document.getElementById('dynamic-summary');

    // Calculate Target Months
    const now = new Date();
    
    // Safety check - though initializeCustomDatePicker sets this on load
    if(!targetDateVal) {
        let future = new Date();
        future.setFullYear(now.getFullYear() + 1);
        targetDateVal = future.toISOString().slice(0, 7);
        // Note: Visual update handled by initializer
    }

    const target = new Date(targetDateVal + "-01"); // Force 1st of month
    // Calc difference in months
    let monthsDiff = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    if (monthsDiff < 1) monthsDiff = 1;

    // Solver: Binary Search to find Payment
    let currentMonthIndex = now.getMonth(); // 0-11
    let relLumpMonth = -1;
    if (lumpSum > 0) {
        if (lumpMonthIndex >= currentMonthIndex) {
            relLumpMonth = (lumpMonthIndex - currentMonthIndex) + 1; 
        } else {
            relLumpMonth = (12 - currentMonthIndex + lumpMonthIndex) + 1;
        }
    }

    // Binary Search
    let minP = 0;
    let maxP = balance * 2; 
    let requiredPayment = 0;
    let iterations = 0;
    let finalInterest = 0;

    let solveBalance = balance; 
    
    while (iterations < 20) {
        let midP = (minP + maxP) / 2;
        let sim = simulateFixedTerm(solveBalance, rate, midP, monthsDiff, lumpSum, relLumpMonth);
        
        if (sim.remBalance > 0.1) { 
            minP = midP;
        } else if (sim.remBalance < -0.1) { 
            maxP = midP;
        } else {
            requiredPayment = midP;
            finalInterest = sim.totalInterest;
            break;
        }
        requiredPayment = midP;
        finalInterest = sim.totalInterest;
        iterations++;
    }

    // Update Outputs
    document.getElementById('res_reqPayment2').textContent = formatCurrency(requiredPayment);
    const dailyCost = requiredPayment / 30;
    document.getElementById('res_dailyCost2').textContent = formatCurrency(dailyCost);

    // Feasibility Gauge using Data File Constants
    const gauge = document.getElementById('gauge-bar');
    const feasText = document.getElementById('res_feasibility2');
    const ratio = (requiredPayment / balance);

    gauge.className = 'feasibility-gauge'; // reset
    
    if (ratio > CALCULATOR_CONSTANTS.FEASIBILITY_IMPOSSIBLE) { // > 50%
        feasText.textContent = "Unfeasible";
        feasText.style.color = "#e74c3c";
        gauge.classList.add('bad-bg');

        // Dynamic Summary: Impossible (HTML)
        dynamicSummary.innerHTML = `Based on your current balance, the timeline you have selected is <span class="summary-highlight-bad">mathematically unfeasible</span> to achieve without a significant lump sum payment, as the required monthly payments would exceed your total debt.`;
    
    } else if (ratio > CALCULATOR_CONSTANTS.FEASIBILITY_AGGRESSIVE) { // > 10%
        feasText.textContent = "Accelerated";
        feasText.style.color = "#e67e22";
        gauge.classList.add('warn-bg');

        // Dynamic Summary: Aggressive (HTML)
        dynamicSummary.innerHTML = `Reaching your target date requires a steep monthly commitment of <span class="summary-highlight-neutral">${formatCurrency(requiredPayment)}</span>; this is an <span class="summary-highlight-bad">accelerated strategy</span> that demands strict budgeting but saves you the most money in the long run.`;
    
    } else {
        feasText.textContent = "Sustainable";
        feasText.style.color = "#2ecc71";
        gauge.classList.add('good-bg');

        // Dynamic Summary: Standard (HTML)
        dynamicSummary.innerHTML = `To achieve your goal of financial solvency by <span class="summary-highlight-good">${target.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>, you must commit to a monthly payment of roughly <span class="summary-highlight-neutral">${formatCurrency(requiredPayment)}</span> starting today, which breaks down to a daily cost of about <span class="summary-highlight-neutral">${formatCurrency(dailyCost)}</span>.`;
    }

    // Transfer Verdict
    const verdictEl = document.getElementById('res_verdict2');
    if (btFee > 0 || promo > 0) {
        const standardCost = finalInterest;
        
        const feeCost = balance * (btFee / 100);
        let btBalance = balance + feeCost;
        let btInterest = 0;
        let tempBal = btBalance;
        
        for(let i=1; i<=monthsDiff; i++) {
            let r = (i <= promo) ? 0 : (rate / 100 / 12);
            let int = tempBal * r;
            btInterest += int;
            let prin = requiredPayment - int;
            tempBal -= prin;
            if (relLumpMonth === i) tempBal -= lumpSum;
        }
        
        const btTotalCost = feeCost + btInterest;

        if (btTotalCost < standardCost) {
            verdictEl.textContent = "Favorable";
            verdictEl.className = "result-value good";
        } else {
            verdictEl.textContent = "Costly";
            verdictEl.className = "result-value bad";
        }
    } else {
        verdictEl.textContent = "N/A";
        verdictEl.className = "result-value";
    }

    // Update Universal Visuals for Mode 2
    document.getElementById('res_stupidTax').textContent = getStupidTaxLabel(finalInterest);
    document.getElementById('res_userTimeline').textContent = `${monthsDiff} Mo`;
    
    // Min timeline using Data File Logic
    const minSim = runMinPaymentSimulation(balance, rate);
    document.getElementById('res_minTimeline').textContent = (minSim.months === Infinity) ? "∞" : `${minSim.months} Mo`;
}

function simulateFixedTerm(startBal, rate, payment, months, lumpSum, lumpMonth) {
    let bal = startBal;
    let totInt = 0;
    for (let i = 1; i <= months; i++) {
        if (bal <= 0) break;
        let int = bal * (rate / 100 / 12);
        totInt += int;
        bal = bal + int - payment;
        if (lumpMonth === i) bal -= lumpSum;
    }
    return { remBalance: bal, totalInterest: totInt };
}

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize UI Elements first
    initializeSliders();
    initializeCustomDropdowns();
    initializeCustomDatePicker(); 
    initializeModes();
    initializeAdvancedToggle();
    
    // 2. Initialize Tool Features (Restores state from URL)
    ToolFeatures.init();
    
    // 3. FORCE CALCULATION NOW (Fixes Garbage Values)
    // We call this *after* restoreState so we calculate based on the restored (or default) values
    // and immediately overwrite the HTML placeholders.
    triggerActiveCalculation();
    
    // Listeners
    const stateSelector = document.getElementById('stateSelector');
    if(stateSelector) {
        stateSelector.addEventListener('change', triggerActiveCalculation);
    }
    document.querySelector('.left-section').addEventListener('input', triggerActiveCalculation);
});

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,

    /* 1. CONFIGURATION */
    PERSIST_MAP: {
        // Global
        'state': { id: 'stateSelector', type: 'select' },
        'status': { id: 'spendingStatus', type: 'select' },
        // Mode 1
        'bal1': { id: 'input_balance1', type: 'number' },
        'rate1': { id: 'input_rate1', type: 'number' },
        'pay1': { id: 'input_payment1', type: 'number' },
        'freq1': { id: 'freq1', type: 'select' },
        'lim1': { id: 'input_limit1', type: 'number' },
        'iApr1': { id: 'input_introApr1', type: 'number' },
        'iDur1': { id: 'input_introDur1', type: 'number' },
        'pApr1': { id: 'input_postApr1', type: 'number' },
        'fee1': { id: 'input_fee1', type: 'number' },
        // Mode 2
        'bal2': { id: 'input_balance2', type: 'number' },
        'rate2': { id: 'input_rate2', type: 'number' },
        'date2': { id: 'input_date2', type: 'text' },
        'lump2': { id: 'input_lump2', type: 'number' },
        'lM2': { id: 'lumpMonth2', type: 'select' },
        'bt2': { id: 'input_btFee2', type: 'number' },
        'pro2': { id: 'input_promo2', type: 'number' }
    },

    /* 2. SHARE LOGIC (Universal) */
    getShareUrl() {
        const params = new URLSearchParams();
        // 1. Map Inputs
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) params.set(key, el.value);
        }
        
        // 2. Map Active Mode
        const modeA = document.querySelector('.mode-card[data-mode="mode-a"]');
        if (modeA && modeA.classList.contains('active-mode')) {
            params.set('mode', 'a');
        } else {
            params.set('mode', 'b');
        }
        
        // 3. Map Advanced Toggle State (Check visibility of advanced content)
        const advContent = document.querySelector('.advanced-content');
        if (advContent && !advContent.classList.contains('hidden')) {
            params.set('adv', '1');
        } else {
            params.set('adv', '0');
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
        
        // 1. Restore Inputs
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    el.value = params.get(key);
                    // Trigger input event to update sliders
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    // Trigger change event for selects
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }
        
        // 2. Restore Mode
        if (params.has('mode')) {
            const mode = params.get('mode');
            const targetCard = document.querySelector(`.mode-card[data-mode="mode-${mode}"]`);
            if (targetCard) targetCard.click();
        }

        // 3. Restore Advanced Toggle
        if (params.has('adv')) {
            const shouldBeAdvanced = params.get('adv') === '1';
            const btn = document.getElementById('advanced-toggle');
            // Check current state by text content or hidden class
            const isCurrentlyAdvanced = btn.textContent.includes("Basic");
            
            if (shouldBeAdvanced && !isCurrentlyAdvanced) {
                btn.click();
            } else if (!shouldBeAdvanced && isCurrentlyAdvanced) {
                btn.click();
            }
        }
    },

    /* 3. PRINT GENERATION - REDESIGNED FOR "DIMINISHED VALUE REPORT" LOOK */
    preparePrintData() {
        const printContainer = document.getElementById('print-content-injection');
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
        
        // 1. FORCE CALCULATION OF BOTH MODES TO POPULATE DATA
        calculateMode1();
        calculateMode2(); 

        // 2. GATHER DATA FROM DOM
        const stateName = document.querySelector('.custom-dropdown-trigger').textContent;
        const statusVal = document.getElementById('spendingStatus').value === 'frozen' ? 'Balance Frozen' : 'Active Spending';
        const benchmark = document.getElementById('res_stateDebt').textContent;

        // MODE A DATA
        const bal1 = document.getElementById('input_balance1').value;
        const rate1 = document.getElementById('input_rate1').value;
        const pay1 = document.getElementById('input_payment1').value;
        const date1 = document.getElementById('res_freedomDate1').textContent;
        const interest1 = document.getElementById('res_totalInterest1').textContent; // Total Cost in current logic
        const saved1 = document.getElementById('res_timeSaved1').textContent;
        const mile1 = document.getElementById('res_milestone1').textContent;
        const lightText1 = document.getElementById('light-text').textContent; // Assessment
        // Recalculate cost for stupid tax logic specifically
        const stupidTax1 = getStupidTaxLabel(cleanNumber(interest1.replace(/[^0-9.]/g, '')));

        // MODE B DATA
        const date2 = document.getElementById('date-text').textContent;
        const reqPay2 = document.getElementById('res_reqPayment2').textContent;
        const daily2 = document.getElementById('res_dailyCost2').textContent;
        const feas2 = document.getElementById('res_feasibility2').textContent;
        const verdict2 = document.getElementById('res_verdict2').textContent;
        
        // Dynamic Analyst Notes Construction
        const noteA = `Servicing this debt aggressively allows you to eliminate the entire balance by ${date1} and realize significant savings. The purchasing power lost to interest charges is equivalent to ${stupidTax1.toLowerCase()}.`;
        const noteB = `To achieve financial solvency by ${date2}, you must commit to a monthly payment of roughly ${reqPay2} starting today.`;

        // 3. CONSTRUCT HTML
        const html = `
            <div class="print-report-container">
                <!-- HEADER -->
                <div class="report-header">
                    <img src="../../img/Logo_Golden.webp" class="print-logo-img" alt="Logo">
                    <div class="header-text">
                        <h1>American Government Bank<br>Credit Card Payoff Analysis Report</h1>
                        <!-- INLINE STYLE REMOVED, HANDLED IN CSS NOW (BLACK) -->
                        <h2>Fixed Payment vs. Target Date Comparison</h2>
                    </div>
                </div>

                <!-- META ROW -->
                <div class="meta-row">
                    <div class="meta-col">
                        <div class="meta-item"><strong>PREPARED BY:</strong> <span>(Vehicle Owner)</span></div>
                        <div class="meta-item"><strong>DATE:</strong> <span>${dateStr}</span></div>
                    </div>
                    <div class="meta-col">
                        <div class="meta-item"><strong>CLAIM NUMBER:</strong> <span>SOLV-${now.getFullYear()}-REF</span></div>
                        <div class="meta-item"><strong>STATE:</strong> <span>${stateName}</span></div>
                    </div>
                </div>

                <!-- I. GLOBAL CONTEXT -->
                <div class="report-section">
                    <div class="section-heading">I. GLOBAL ACCOUNT CONTEXT</div>
                    <div class="data-grid">
                        <div class="data-row"><span class="d-label">ACCOUNT STATUS:</span> <span class="d-value">${statusVal}</span></div>
                        <div class="data-row"><span class="d-label">CURRENT BALANCE:</span> <span class="d-value">$${formatCurrency(bal1).replace('$','')}</span></div>
                        <div class="data-row"><span class="d-label">INTEREST RATE:</span> <span class="d-value">${rate1}% APR</span></div>
                        <div class="data-row"><span class="d-label">REGIONAL BENCHMARK:</span> <span class="d-value">${benchmark} (Avg Debt)</span></div>
                    </div>
                    <div class="note-disclaimer">NOTE: Account status '${statusVal}' impacts payoff timeline accuracy.</div>
                </div>

                <!-- II. STRATEGY A -->
                <div class="report-section">
                    <div class="section-heading">II. PAYMENT STRATEGY A: FIXED PAYMENT PLAN</div>
                    <div class="data-grid">
                        <!-- Col 1 -->
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <div class="data-row"><span class="d-label">Monthly Contribution</span> <span class="d-value">$${formatCurrency(pay1).replace('$','')}</span></div>
                            <div class="data-row"><span class="d-label">Projected Payoff Date</span> <span class="d-value">${date1}</span></div>
                            <div class="data-row"><span class="d-label">Time Savings</span> <span class="d-value">${saved1}</span></div>
                        </div>
                        <!-- Col 2 -->
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <div class="data-row"><span class="d-label">Utilization Milestone (&lt;30%)</span> <span class="d-value">${mile1}</span></div>
                            <div class="data-row"><span class="d-label">Repayment Assessment</span> <span class="d-value" style="text-transform:uppercase;">${lightText1}</span></div>
                            <div class="data-row total-cost-row"><span class="d-label">TOTAL COST (INTEREST + FEES)</span> <span class="d-value">${interest1}</span></div>
                        </div>
                    </div>
                    <div class="analyst-note">
                        <strong>ANALYST NOTE:</strong> ${noteA}
                    </div>
                </div>

                <!-- III. STRATEGY B -->
                <div class="report-section">
                    <div class="section-heading">III. PAYMENT STRATEGY B: TARGET DATE PLAN</div>
                    <div class="data-grid">
                        <!-- Col 1 -->
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <div class="data-row"><span class="d-label">Desired Payoff Date</span> <span class="d-value">${date2}</span></div>
                            <div class="data-row"><span class="d-label">Required Monthly Payment</span> <span class="d-value">${reqPay2}</span></div>
                        </div>
                        <!-- Col 2 -->
                        <div style="display:flex; flex-direction:column; gap:8px;">
                            <div class="data-row"><span class="d-label">Daily Cost</span> <span class="d-value">${daily2}</span></div>
                            <div class="data-row"><span class="d-label">Feasibility</span> <span class="d-value">${feas2}</span></div>
                            <div class="data-row"><span class="d-label">Transfer Analysis</span> <span class="d-value">${verdict2}</span></div>
                        </div>
                    </div>
                    <div class="analyst-note">
                        <strong>ANALYST NOTE:</strong> ${noteB}
                    </div>
                </div>
                
                <hr style="border:none; border-top: 2px solid #000; margin-top: 50px; margin-bottom: 0;">
                <hr style="border:none; border-top: 2px solid #000; margin-top: 4px; margin-bottom: 40px;">

                <!-- SIGNATURES -->
                <div class="signature-area">
                    <div class="sig-block">SIGNATURE OF ACCOUNT HOLDER</div>
                    <div class="sig-block">DATE</div>
                </div>

                <!-- FOOTER -->
                <div class="footer-legal">
                    LEGAL & METHODOLOGY DISCLAIMER: This Payoff Analysis Report is generated automatically for informational and strategic planning purposes only. The figures presented are estimates derived from standard amortization algorithms based on the provided inputs.
                </div>
            </div>
        `;

        printContainer.innerHTML = html; 
    },

    /* 4. TUTORIAL & MODAL LOGIC (Universal) */
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