/* =============================================================================
   US LEMON LAW DATA REPOSITORY (HYBRID ENGINE)
   -------------------------------------------------------------------------
   Centralized, frontend-only state logic for the Lemon Law Decision Engine.
   ============================================================================= */

// 1. STATE-SPECIFIC OVERRIDES
const stateLaws = {
  // === TIER 1: HIGH-VOLUME / DISTINCT STATUTES ===
  CA: {
    name: "California",
    days_pattern: 30,
    attempts_pattern: 4,
    safety_pattern: 2,
    offset_divisor: 120000,
    used_coverage_note: null
  },
  FL: {
    name: "Florida",
    days_pattern: 30,
    attempts_pattern: 3,
    safety_pattern: null,
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
    offset_divisor: 100000,
    used_coverage_note: "New York has a separate Used Car Lemon Law (Under 100k miles).",
  },
  NJ: {
    name: "New Jersey",
    days_pattern: 20,
    attempts_pattern: 3,
    safety_pattern: 1,
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

// 2. THE STANDARD MODEL (DEFAULTS)
const defaultStateData = {
  days_pattern: 30,
  attempts_pattern: 4,
  safety_pattern: 2,
  offset_divisor: 100000,
  used_coverage_note: null
};

// 3. CORE LOGIC ENGINE (Internal Functions)

// Merges specific state overrides with the default model.
function getStateRules(stateCode) {
  const specific = stateLaws[stateCode] || { name: "Unknown State" };
  return { ...defaultStateData, ...specific, code: stateCode };
}

// Calculates the Usage Offset (Mode B).
function calculateDeduction(stateCode, price, miles) {
  if (!price || !miles) return 0;
  const rules = getStateRules(stateCode);
  const deduction = (price * miles) / rules.offset_divisor;
  return Math.min(deduction, price);
}

// Determines Case Strength Signal (Mode A).
function getSignalStrength(stateCode, daysOut, attempts, isSafety) {
  const rules = getStateRules(stateCode);

  // --- 1. CHECK GREEN (Strong Signal) ---
  const strongByDays = daysOut >= rules.days_pattern;
  const strongByAttempts = attempts >= rules.attempts_pattern;
  
  const strongBySafety = 
    isSafety && 
    rules.safety_pattern !== null && 
    attempts >= rules.safety_pattern;

  if (strongByDays || strongByAttempts || strongBySafety) {
    return "green";
  }

  // --- 2. CHECK YELLOW (Building Signal) ---
  const yellowByDays = daysOut >= 15;
  const yellowByAttempts = attempts >= 2;

  if (yellowByDays || yellowByAttempts) {
    return "yellow";
  }

  // --- 3. DEFAULT (Low Signal) ---
  return "grey";
}

// Retrieves specific Used Vehicle micro-copy.
function getUsedCarWarning(stateCode) {
  return getStateRules(stateCode).used_coverage_note;
}

// 4. STATE LIST
const US_STATES = [
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

/* ============================ */
/* UI: Breathing Text Logic     */
/* ============================ */
const phrases = [
    "Validate your frustration.",
    "Know where you stand.",
    "Is it a Lemon? Check the signs.",
    "Don't let them stall you."
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
/* UI: Slider & Input Logic     */
/* ============================ */
const SLIDER_CONFIG = {
    // Mode A (Lemon Law)
    daysService: { type: 'linear', max: 45 },
    
    // Mode B (Refund Estimator)
    priceB: { type: 'cubic', max: 150000 },
    milesB: { type: 'cubic', max: 120000 },
    loanB: { type: 'cubic', max: 150000 },
    incidentalsB: { type: 'cubic', max: 5000 }
};

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
    
    let fillColor = '#B5855E';

    // Mode A: Dynamic coloring for Days
    if (slider.id === 'slider_daysService') {
        const inputId = slider.id.replace('slider_', 'input_');
        const realInput = document.getElementById(inputId);
        const realVal = realInput ? parseFloat(realInput.value) : 0;

        // Use the selected state's threshold if possible, or generic
        if (realVal < 15) fillColor = '#95a5a6';
        else if (realVal < 30) fillColor = '#f39c12';
        else fillColor = '#2ecc71';
    }

    slider.style.backgroundImage = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

const cleanNumber = (num) => parseFloat(num) || 0;
const formatCurrency = (num) => '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
            realVal = Math.round(realVal);
            input.value = realVal; 
            updateSliderVisual(e.target);
            calculateAll(); 
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            calculateAll(); 
        });
    });
}

/* ============================ */
/* UI: Dynamic Dropdown Logic   */
/* ============================ */

// Populate the State Dropdown from the US_STATES Engine Data
function populateStateDropdown() {
    const select = document.getElementById('stateSelector');
    const menuWrapper = document.getElementById('stateOptionsWrapper');
    const trigger = document.getElementById('stateTrigger');
    
    if (!select || !menuWrapper) return;

    // Clear existing
    select.innerHTML = '';
    menuWrapper.innerHTML = '';

    // Populate
    US_STATES.forEach(state => {
        // 1. Hidden Select Option
        const opt = document.createElement('option');
        opt.value = state.code;
        opt.textContent = state.name;
        if(state.code === 'CA') opt.selected = true; // Default
        select.appendChild(opt);

        // 2. Custom Menu Option
        const div = document.createElement('div');
        div.className = 'dropdown-option';
        if(state.code === 'CA') div.classList.add('selected');
        div.setAttribute('data-value', state.code);
        div.textContent = state.name;
        menuWrapper.appendChild(div);
    });

    // Set Default Trigger Text
    if(trigger) trigger.textContent = "California";
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        
        // Toggle
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        // Delegation for dynamically added options
        menu.addEventListener('click', (e) => {
            const option = e.target.closest('.dropdown-option');
            if(!option) return;
            
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            
            trigger.textContent = option.textContent;
            
            // Visual selection
            menu.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            menu.classList.remove('active');
            
            if(select) {
                select.value = value;
                // Dispatch change to trigger calculations
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // Check warnings and calc
            checkStateWarning();
            calculateAll();
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
/* UI: Button Group Logic       */
/* ============================ */
function initializeButtonGroups() {
    const groups = document.querySelectorAll('.button-group');

    groups.forEach(group => {
        const buttons = group.querySelectorAll('.select-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                checkStateWarning();
                calculateAll();
            });
        });
    });
}

function getGroupValue(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return null;
    const selected = group.querySelector('.select-btn.selected');
    return selected ? selected.getAttribute('data-value') : null;
}

/* ============================ */
/* Logic: State Warnings        */
/* ============================ */
function checkStateWarning() {
    const stateSelect = document.getElementById('stateSelector');
    const state = stateSelect ? stateSelect.value : 'CA';
    const vehicleStatus = getGroupValue('bg_vehicleStatus');
    const warningEl = document.getElementById('state-warning');

    if (!warningEl) return;

    // Use Engine Logic to get the warning text
    const warningText = getUsedCarWarning(state);

    if (warningText && vehicleStatus === 'Used') {
        warningEl.textContent = warningText;
        warningEl.classList.remove('hidden');
    } else {
        warningEl.classList.add('hidden');
    }
}

/* ============================ */
/* Logic: Main Calculator       */
/* ============================ */
function calculateAll() {
    // Determine State
    const stateSelect = document.getElementById('stateSelector');
    const stateCode = stateSelect ? stateSelect.value : 'CA';

    calculateLemonSignal(stateCode);
    calculateRefundEstimator(stateCode);
}

/* MODE A: Signal Logic */
function calculateLemonSignal(stateCode) {
    const days = parseFloat(document.getElementById('input_daysService').value) || 0;
    const repairAttemptsVal = getGroupValue('bg_repairAttempts');
    const defectType = getGroupValue('bg_defectType');

    let attempts = 0;
    if (repairAttemptsVal === '4+') attempts = 4;
    else attempts = parseInt(repairAttemptsVal) || 0;

    const isSafety = (defectType === 'Safety');

    // ENGINE CALL: Get Signal Strength based on State Rules
    const signal = getSignalStrength(stateCode, days, attempts, isSafety);

    updateSignalUI(signal);
}

function updateSignalUI(signal) {
    const banner = document.getElementById('lemon-signal-banner');
    if(!banner) return;

    const head = document.getElementById('signal-head');
    const msg = document.getElementById('signal-msg');
    const action = document.getElementById('signal-action');

    banner.className = 'signal-card';

    if (signal === 'green') {
        banner.classList.add('green');
        head.textContent = "Strong Case Signal";
        msg.textContent = "Your vehicle has exceeded common statutory patterns for downtime or repeat repairs. If this were my car, I wouldn't stop here.";
        action.textContent = "Pattern suggests this is worth pursuing.";
    } else if (signal === 'yellow') {
        banner.classList.add('yellow');
        head.textContent = "You Are Getting Close";
        msg.textContent = "You are in a 'Watch Zone.' In states like yours, one more repair attempt or a few more days in the shop often strengthens the case significantly.";
        action.textContent = "The next repair visit is critical.";
    } else {
        banner.classList.add('grey');
        head.textContent = "Outside Typical Patterns";
        msg.textContent = "Based on these inputs, this does not yet align with common Lemon Law scenarios. However, federal warranty laws may still apply.";
        action.textContent = "Keep documenting all repairs.";
    }
}

/* MODE B: Refund Logic */
function calculateRefundEstimator(stateCode) {
    // Inputs
    const price = cleanNumber(document.getElementById('input_priceB').value);
    const miles = cleanNumber(document.getElementById('input_milesB').value);
    const loan = cleanNumber(document.getElementById('input_loanB').value);
    const incidentals = cleanNumber(document.getElementById('input_incidentalsB').value);

    // ENGINE CALL: Calculate Deduction based on State Formula
    const deduction = calculateDeduction(stateCode, price, miles);
    
    const baseRefund = price + incidentals;
    const totalRecovery = baseRefund - deduction;

    // Display updates
    const elRecovery = document.getElementById('res_totalRecoveryB');
    const elDedText = document.getElementById('res_deductionTextB');
    
    // Format for Display (Round whole numbers for UI)
    const displayRecovery = Math.round(totalRecovery).toLocaleString('en-US');
    const displayDeduction = Math.round(deduction).toLocaleString('en-US');

    if(elRecovery) elRecovery.textContent = '$' + displayRecovery;
    if(elDedText) elDedText.textContent = `Includes an estimated deduction of ~$${displayDeduction} for the usage offset.`;

    // 1. Update Bar Chart
    const barRefund = document.getElementById('bar-refund');
    const barDeduction = document.getElementById('bar-deduction');
    
    if (barRefund && barDeduction) {
        const totalValue = price + incidentals;
        let dedPct = 0;
        if(totalValue > 0) {
            dedPct = (deduction / totalValue) * 100;
        }
        const netPct = 100 - dedPct;

        barRefund.style.width = `${netPct}%`;
        barDeduction.style.width = `${dedPct}%`;
    }

    // 2. Who Gets What Split
    const splitContainer = document.getElementById('split-results-B');
    if (splitContainer) {
        if (loan > 0) {
            splitContainer.style.display = 'block'; 
            
            let toBank = 0;
            let toUser = 0;

            if (totalRecovery >= loan) {
                toBank = loan;
                toUser = totalRecovery - loan;
            } else {
                toBank = totalRecovery; 
                toUser = 0;
            }
            
            // Rounding for UI
            document.getElementById('res_bankPayB').textContent = '$' + Math.round(toBank).toLocaleString('en-US');
            document.getElementById('res_userCashB').textContent = '$' + Math.round(toUser).toLocaleString('en-US');
        } else {
            splitContainer.style.display = 'none';
        }
    }
}

/* ============================ */
/* UI: Mode Switching Logic     */
/* ============================ */
function initializeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    const advancedBtn = document.getElementById('advanced-toggle');
    
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('active-mode'));
            card.classList.add('active-mode');

            const modeId = card.getAttribute('data-mode');
            
            if (advancedBtn) {
                if (modeId === 'mode-b') {
                    advancedBtn.classList.remove('hidden');
                } else {
                    advancedBtn.classList.add('hidden');
                    resetAdvancedToggle(false);
                }
            }

            document.querySelectorAll('.mode-inputs').forEach(el => el.classList.add('hidden'));
            const inputSection = document.getElementById(`${modeId}-inputs`);
            if (inputSection) inputSection.classList.remove('hidden');

            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            const resultSection = document.getElementById(`${modeId}-results`);
            if (resultSection) resultSection.classList.remove('hidden');

            const container = document.getElementById('results-display-container');
            if (container) container.scrollTop = 0;
        });
    });
}

function resetAdvancedToggle(state) {
    const btn = document.getElementById('advanced-toggle');
    if (!btn) return;
    if (state === undefined) return;

    const isAdvanced = state;
    btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";
    document.querySelectorAll('.advanced-content').forEach(el => {
        if (!el.id.includes('split-results')) {
            el.classList.toggle('hidden', !isAdvanced);
        }
    });
}

function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    if (!btn) return;

    // Use a custom attribute to track state easily
    btn.setAttribute('data-active', 'false');

    btn.addEventListener('click', () => {
        const isAdvanced = btn.getAttribute('data-active') === 'true';
        const newState = !isAdvanced;
        
        btn.setAttribute('data-active', newState);
        btn.textContent = newState ? "Switch to Basic" : "Switch to Advanced";
        
        const activeMode = document.querySelector('.mode-card.active-mode').getAttribute('data-mode');
        const inputContainer = document.getElementById(`${activeMode}-inputs`);
        
        if (inputContainer) {
            const advancedInputs = inputContainer.querySelectorAll('.advanced-content');
            advancedInputs.forEach(el => el.classList.toggle('hidden', !newState));
        }
    });
}

/* ============================ */
/* UI: Tooltips                 */
/* ============================ */
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

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,

    /* 1. CONFIGURATION */
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'select' },
        'status': { id: 'bg_vehicleStatus', type: 'group' },
        'time': { id: 'bg_timePurchase', type: 'group' },
        'att': { id: 'bg_repairAttempts', type: 'group' },
        'def': { id: 'bg_defectType', type: 'group' },
        'days': { id: 'input_daysService', type: 'number' },
        'price': { id: 'input_priceB', type: 'number' },
        'miles': { id: 'input_milesB', type: 'number' },
        'loan': { id: 'input_loanB', type: 'number' },
        'inc': { id: 'input_incidentalsB', type: 'number' }
    },

    /* 2. SHARE LOGIC */
    getShareUrl() {
        const params = new URLSearchParams();
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            let val = '';
            if (config.type === 'group') {
                val = getGroupValue(config.id);
            } else {
                const el = document.getElementById(config.id);
                if (el) val = el.value;
            }
            if (val) params.set(key, val);
        }
        
        // Persist Active Mode
        const activeCard = document.querySelector('.mode-card.active-mode');
        if (activeCard) params.set('mode', activeCard.getAttribute('data-mode'));

        // Persist Advanced Toggle
        const advBtn = document.getElementById('advanced-toggle');
        if(advBtn) params.set('adv', advBtn.getAttribute('data-active'));

        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    },

    async handleShare() {
        const shareUrl = this.getShareUrl();
        const shareData = { title: document.title, text: 'Lemon Law Assessment', url: shareUrl };
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
        
        // Restore Inputs
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const val = params.get(key);
                if (config.type === 'group') {
                    // Manually click the button in group
                    const group = document.getElementById(config.id);
                    if (group) {
                        const btn = group.querySelector(`.select-btn[data-value="${val}"]`);
                        if (btn) btn.click();
                    }
                } else {
                    const el = document.getElementById(config.id);
                    if (el) {
                        el.value = val;
                        // Fire event so listeners pick it up (including visual sliders)
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
            }
        }

        // Restore Mode
        if (params.has('mode')) {
            const modeId = params.get('mode');
            const modeCard = document.querySelector(`.mode-card[data-mode="${modeId}"]`);
            if (modeCard) modeCard.click();
        }
        
        // Restore Advanced State
        if (params.has('adv')) {
            const isAdv = params.get('adv') === 'true';
            const btn = document.getElementById('advanced-toggle');
            if (btn && isAdv) {
                // Force click to trigger UI changes if it was off
                if (btn.getAttribute('data-active') !== 'true') btn.click();
            }
        }
        
        // Trigger specific Custom Dropdown UI Update for State
        if (params.has('state')) {
            const code = params.get('state');
            const trigger = document.getElementById('stateTrigger');
            const option = document.querySelector(`.dropdown-option[data-value="${code}"]`);
            if (trigger && option) {
                trigger.textContent = option.textContent;
                document.querySelectorAll('.dropdown-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            }
        }

        // Force Final Calculation immediately to prevent garbage display
        calculateAll();
    },

    /* 3. PRINT GENERATION - REPORT STYLE */
    preparePrintData() {
        const printContainer = document.getElementById('print-content-injection');
        const currentDate = new Date().toLocaleDateString();

        // --- GATHER ALL INPUTS ---
        const stateName = document.getElementById('stateTrigger').textContent;
        const stateCode = document.getElementById('stateSelector').value;
        
        // Mode A Data
        const status = getGroupValue('bg_vehicleStatus') || "N/A";
        const time = getGroupValue('bg_timePurchase') || "N/A";
        const attempts = getGroupValue('bg_repairAttempts') || "0";
        const days = document.getElementById('input_daysService').value || "0";
        const defect = getGroupValue('bg_defectType') || "General";
        
        // Mode B Data
        const price = cleanNumber(document.getElementById('input_priceB').value);
        const miles = cleanNumber(document.getElementById('input_milesB').value);
        const loan = cleanNumber(document.getElementById('input_loanB').value);
        const inc = cleanNumber(document.getElementById('input_incidentalsB').value);
        
        // --- CALCULATIONS FOR PRINT ---
        
        // 1. Signal Logic
        const attemptsNum = (attempts === '4+') ? 4 : parseInt(attempts);
        const isSafety = (defect === 'Safety');
        const signal = getSignalStrength(stateCode, parseFloat(days), attemptsNum, isSafety);
        
        let signalText = "BELOW THRESHOLD";
        let signalNote = "Does not yet align with common Lemon Law scenarios. However, federal warranty laws may still apply.";
        
        if (signal === 'green') {
            signalText = "STRONG CASE SIGNAL";
            signalNote = "The vehicle exceeds common statutory patterns for downtime or repeat repairs. If this were my car, I wouldn't stop here. Pattern suggests this is worth pursuing.";
        } else if (signal === 'yellow') {
            signalText = "WATCH ZONE";
            signalNote = "The vehicle is currently in a 'Watch Zone.' Older vehicles face higher scrutiny. In this jurisdiction, one more repair attempt or a few more cumulative days out of service often strengthens the case significantly. THE NEXT REPAIR VISIT IS CRITICAL.";
        }

        // 2. Math Logic
        const rules = getStateRules(stateCode);
        const deduction = calculateDeduction(stateCode, price, miles);
        const subtotal = price + inc;
        const totalRecovery = subtotal - deduction;
        
        let bankPay = 0;
        let userCash = 0;
        if (totalRecovery >= loan) {
            bankPay = loan;
            userCash = totalRecovery - loan;
        } else {
            bankPay = totalRecovery;
            userCash = 0;
        }

        // --- GENERATE HTML ---
        // UPDATE: Changed img src to Logo_Golden.webp to use cached version from main page
        const html = `
            <!-- HEADER -->
            <div class="report-header-wrapper">
                <img src="../../img/Logo_Golden.webp" class="print-logo" alt="Logo">
                <div class="print-report-title-block">
                    <div class="print-report-title">Lemon Law Claim Analysis Report</div>
                    <div class="print-report-subtitle">Statutory Qualification and Financial Estimation</div>
                    <div style="font-size:0.75rem; margin-top:5px; font-weight:300;">Generated on: ${currentDate}</div>
                </div>
            </div>

            <!-- SECTION I -->
            <div class="report-section">
                <div class="report-section-title">I. JURISDICTIONAL CONTEXT (${stateName.toUpperCase()})</div>
                <div class="report-row">
                    <span class="report-label">LEGAL STATUS: State-Specific Lemon Law Presumption Applies.</span>
                </div>
                <div class="analyst-note">
                    <span class="note-label">NOTE:</span>
                    Lemon laws vary by state. The calculations and qualification thresholds below reflect the specific statutory patterns and mileage offset formulas for the selected jurisdiction.
                </div>
            </div>

            <!-- SECTION II -->
            <div class="report-section">
                <div class="report-section-title">II. STATUTORY THRESHOLD ANALYSIS (CASE STRENGTH)</div>
                <div class="report-grid">
                    <div class="report-col">
                        <div class="report-row"><span class="report-label">Vehicle Status:</span><span class="report-val">${status}</span></div>
                        <div class="report-row"><span class="report-label">Time Since Purchase:</span><span class="report-val">${time}</span></div>
                        <div class="report-row"><span class="report-label">Days Out of Service:</span><span class="report-val">${days}</span></div>
                    </div>
                    <div class="report-col">
                         <div class="report-row"><span class="report-label">Defect Type:</span><span class="report-val">${defect}</span></div>
                         <div class="report-row"><span class="report-label">Repair Attempts:</span><span class="report-val">${attempts}</span></div>
                         <div class="report-row"><span class="report-label">Current Qual Status:</span><span class="report-val" style="color: ${signal === 'grey' ? '#000' : (signal === 'yellow' ? '#f39c12' : '#27ae60')}">${signalText}</span></div>
                    </div>
                </div>
                <div class="analyst-note">
                    <span class="note-label">ANALYST NOTE:</span>
                    ${signalNote}
                </div>
            </div>

            <!-- SECTION III -->
            <div class="report-section">
                <div class="report-section-title">III. FINANCIAL RECOVERY ESTIMATION (REFUND ESTIMATOR)</div>
                <div class="report-grid">
                    <div class="report-col">
                         <div style="font-weight:600; margin-bottom:5px; border-bottom:1px dotted #ccc; font-size:0.8rem;">BASE FINANCIAL INPUTS</div>
                         <div class="report-row"><span class="report-label">Vehicle Purchase Price:</span><span class="report-val">${formatCurrency(price)}</span></div>
                         <div class="report-row"><span class="report-label">Incidental Costs:</span><span class="report-val">${formatCurrency(inc)}</span></div>
                         <div class="report-row"><span class="report-label">Current Loan Payoff:</span><span class="report-val">${formatCurrency(loan)}</span></div>
                    </div>
                    <div class="report-col">
                         <div style="font-weight:600; margin-bottom:5px; border-bottom:1px dotted #ccc; font-size:0.8rem;">ESTIMATED DEDUCTIONS & COSTS</div>
                         <div class="report-row"><span class="report-label">Usage Offset Mileage:</span><span class="report-val">${miles.toLocaleString()} mi</span></div>
                         <div class="report-row"><span class="report-label">Est. Mileage Deduction:</span><span class="report-val">-${formatCurrency(deduction)}</span></div>
                    </div>
                </div>
                
                <div class="grand-total-box" style="justify-content: flex-end; margin-top: 15px; border:none; padding:0;">
                    <span>ESTIMATED TOTAL RECOVERY: &nbsp;&nbsp; ${formatCurrency(totalRecovery)}</span>
                </div>

                <div class="analyst-note">
                    <span class="note-label">ANALYST NOTE:</span>
                    The Estimated Total Recovery includes the total cash price on the contract (excluding interest) plus incidental costs (towing, rentals, repair costs paid), minus the statutory usage offset. Driving more before the issue is formally reported reduces the final value.
                </div>
            </div>

            <!-- SECTION IV -->
            <div class="report-section">
                <div class="report-section-title">IV. DISBURSEMENT SUMMARY (WHO GETS WHAT)</div>
                <div class="report-row" style="border-bottom: 1px dotted #ccc; padding-bottom:5px; margin-bottom:5px;">
                    <span class="report-label">LIENHOLDER PAYOFF (TO THE BANK) ................................</span>
                    <span class="report-val">${formatCurrency(bankPay)}</span>
                </div>
                <div class="report-row">
                    <span class="report-label">CLAIMANT DISBURSEMENT (CASH TO YOU) ............................</span>
                    <span class="report-val">${formatCurrency(userCash)}</span>
                </div>
                
                <div class="grand-total-box">
                    <span>TOTAL ESTIMATED SETTLEMENT VALUE</span>
                    <span>${formatCurrency(totalRecovery)}</span>
                </div>
            </div>

            <div class="report-legal">
                LEGAL & METHODOLOGY DISCLAIMER: This Lemon Law Analysis Report is generated automatically for informational and negotiation purposes only. The figures presented are estimates derived from standard industry formulas, specific state guidelines, and user-provided inputs. This document does not constitute legal advice, a binding financial guarantee, or a formal legal demand. Users are encouraged to verify trade-in values, loan payoff amounts, and repair documentation. Claimants assume all responsibility for how this data is utilized in settlement negotiations or legal proceedings.
            </div>
        `;

        printContainer.innerHTML = html;
    },

    /* 4. TUTORIAL & MODAL LOGIC */
    
    // NEW: Robust Print Trigger to Handle Image Loading
    executePrintWhenReady() {
        const logo = document.querySelector('.print-logo');
        if (logo && !logo.complete) {
            // Image found but not loaded? Wait for it.
            logo.onload = () => { window.print(); };
            logo.onerror = () => { window.print(); }; // Fallback
        } else {
            // Image already loaded (cached) or not found, print immediately
            window.print();
        }
    },

    closeTutorialModal() {
        document.getElementById('pdf-tutorial-overlay').classList.remove('active');
    },

    handleTutorialProceed() {
        this.closeTutorialModal();
        this.executePrintWhenReady(); // Updated to use safe printer
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
            this.executePrintWhenReady(); // Updated to use safe printer
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
    populateStateDropdown(); // Must be first
    initializeSliders();
    initializeCustomDropdowns();
    initializeButtonGroups();
    initializeModes();
    initializeAdvancedToggle();
    initializeTooltips();
    
    // Defer initial Calculation to ToolFeatures.init() to ensure it happens AFTER state restoration
    // ToolFeatures.init() calls restoreState(), which ends with calculateAll()
    ToolFeatures.init();
});