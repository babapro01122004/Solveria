/* ==========================================
   MOTORCYCLE INCIDENT TOOL — ENGINE DATA
   ========================================== */

/* 1. ENUM DEFINITIONS */
const FAULT_RULES = {
  PURE: "pure", MOD_51: "mod_51", MOD_50: "mod_50", CONTRIB: "contrib", SLIGHT: "slight"
};

const HELMET_LAWS = { UNIVERSAL: "universal", AGE: "age", NONE: "none" };
const LANE_RULES = { LEGAL: "legal", FILTERING: "filtering", ILLEGAL: "illegal" };

/* 2. THE MASTER DATASET (50 States + DC) */
const STATE_DATA = {
  AL: { name: "Alabama", sol: 2, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  AK: { name: "Alaska", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100] },
  AZ: { name: "Arizona", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50] },
  AR: { name: "Arkansas", sol: 3, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  CA: { name: "California", sol: 2, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.LEGAL, insurance: [15, 30] },
  CO: { name: "Colorado", sol: 3, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50] },
  CT: { name: "Connecticut", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  DE: { name: "Delaware", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  DC: { name: "District of Columbia", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  FL: { name: "Florida", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [10, 20] },
  GA: { name: "Georgia", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  HI: { name: "Hawaii", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [20, 40] },
  ID: { name: "Idaho", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  IL: { name: "Illinois", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  IN: { name: "Indiana", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  IA: { name: "Iowa", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [20, 40] },
  KS: { name: "Kansas", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  KY: { name: "Kentucky", sol: 1, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  LA: { name: "Louisiana", sol: 1, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [15, 30] },
  ME: { name: "Maine", sol: 6, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100] },
  MD: { name: "Maryland", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [30, 60] },
  MA: { name: "Massachusetts", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [20, 40] },
  MI: { name: "Michigan", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [50, 100] },
  MN: { name: "Minnesota", sol: 6, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [30, 60] },
  MS: { name: "Mississippi", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  MO: { name: "Missouri", sol: 5, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  MT: { name: "Montana", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [25, 50] },
  NE: { name: "Nebraska", sol: 4, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  NV: { name: "Nevada", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  NH: { name: "New Hampshire", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.NONE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  NJ: { name: "New Jersey", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [15, 30] },
  NM: { name: "New Mexico", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  NY: { name: "New York", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  NC: { name: "North Carolina", sol: 3, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [50, 100] },
  ND: { name: "North Dakota", sol: 6, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  OH: { name: "Ohio", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  OK: { name: "Oklahoma", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  OR: { name: "Oregon", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  PA: { name: "Pennsylvania", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [15, 30] },
  RI: { name: "Rhode Island", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  SC: { name: "South Carolina", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  SD: { name: "South Dakota", sol: 3, fault: FAULT_RULES.SLIGHT, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  TN: { name: "Tennessee", sol: 1, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  TX: { name: "Texas", sol: 2, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [30, 60] },
  UT: { name: "Utah", sol: 4, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.AGE, split: LANE_RULES.FILTERING, insurance: [30, 65] },
  VT: { name: "Vermont", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  VA: { name: "Virginia", sol: 2, fault: FAULT_RULES.CONTRIB, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [50, 100] },
  WA: { name: "Washington", sol: 3, fault: FAULT_RULES.PURE, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  WV: { name: "West Virginia", sol: 2, fault: FAULT_RULES.MOD_50, helmet: HELMET_LAWS.UNIVERSAL, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  WI: { name: "Wisconsin", sol: 3, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] },
  WY: { name: "Wyoming", sol: 4, fault: FAULT_RULES.MOD_51, helmet: HELMET_LAWS.AGE, split: LANE_RULES.ILLEGAL, insurance: [25, 50] }
};

/* ============================ */
/* Branding Logic               */
/* ============================ */
const phrases = ["Know your rights.", "Don't settle for less.", "Understanding liability.", "Protect your future."];
let currentIndex = 0;
const textElement = document.getElementById('breathing-text');
function cycleText() {
    if(!textElement) return;
    textElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        textElement.textContent = phrases[currentIndex];
        textElement.classList.remove('fade-out');
    }, 1000);
}
setInterval(cycleText, 4000);

/* ============================ */
/* Progressive Flow Logic       */
/* ============================ */
function nextStep(stepNum) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`step-${stepNum}`);
    if (target) {
        target.classList.add('active');
        document.getElementById('step-number').textContent = stepNum;
    }
    if (window.innerWidth < 990) {
        const container = document.querySelector('.calculator-container');
        if(container) container.scrollIntoView({behavior: 'smooth'});
    }
}
function prevStep(stepNum) { nextStep(stepNum); }

/* ============================ */
/* Input Handling Logic         */
/* ============================ */
function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        const options = wrapper.querySelectorAll('.dropdown-option');

        if (select) {
            const currentVal = select.value;
            let matchingOption = null;
            options.forEach(opt => { if (opt.getAttribute('data-value') === currentVal) matchingOption = opt; });
            if (matchingOption) {
                trigger.textContent = matchingOption.textContent;
                options.forEach(o => o.classList.remove('selected'));
                matchingOption.classList.add('selected');
            }
        }
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => { if (m !== menu) m.classList.remove('active'); });
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
                if(select) { select.value = value; select.dispatchEvent(new Event('input', { bubbles: true })); }
            });
        });
    });
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => { if (!menu.parentElement.contains(e.target)) menu.classList.remove('active'); });
    });
}

function initializeSelectionButtons() {
    const groups = document.querySelectorAll('.button-group');
    groups.forEach(group => {
        const buttons = group.querySelectorAll('.select-btn');
        const hiddenInput = group.nextElementSibling; 
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                if(hiddenInput && hiddenInput.tagName === 'INPUT') {
                    hiddenInput.value = btn.getAttribute('data-value');
                    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });
    });

    const typeGroup = document.getElementById('group_type');
    const typeInput = document.getElementById('input_type');
    if(typeGroup) {
        const cards = typeGroup.querySelectorAll('.icon-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                typeInput.value = card.getAttribute('data-value');
                typeInput.dispatchEvent(new Event('input', { bubbles: true }));
            });
        });
    }

    const checkboxGroup = document.getElementById('group_injuries');
    if(checkboxGroup){
        const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
        const hiddenInj = document.getElementById('input_injuries');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const val = Array.from(checkboxes).filter(c => c.checked).map(c => c.value).join(',');
                if(hiddenInj) {
                    hiddenInj.value = val;
                    hiddenInj.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });
    }
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
    const hiddenInput = document.getElementById('input_date');
    const prevBtn = document.getElementById('prev-year-btn');
    const nextBtn = document.getElementById('next-year-btn');
    const yearDisplay = document.getElementById('year-display');
    const monthsGrid = document.getElementById('months-grid');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let currentYear = new Date().getFullYear();
    let selectedYear = currentYear;

    function renderMonths() {
        monthsGrid.innerHTML = '';
        monthNames.forEach((m, index) => {
            const div = document.createElement('div');
            div.className = 'picker-month-item';
            div.textContent = m.substring(0, 3);
            const currentVal = hiddenInput.value; 
            if(currentVal) {
                const [y, mon] = currentVal.split('-');
                if(parseInt(y) === currentYear && parseInt(mon) === index + 1) div.classList.add('selected');
            }
            div.addEventListener('click', (e) => { e.stopPropagation(); selectDate(currentYear, index); });
            monthsGrid.appendChild(div);
        });
    }

    function selectDate(year, monthIndex) {
        selectedYear = year;
        const yStr = year;
        const mStr = (monthIndex + 1).toString().padStart(2, '0');
        hiddenInput.value = `${yStr}-${mStr}`;
        hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        display.textContent = `${monthNames[monthIndex]} ${year}`;
        popup.classList.remove('active');
        trigger.classList.remove('active-state'); 
        renderMonths();
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.toggle('active');
        trigger.classList.toggle('active-state'); 
        if(popup.classList.contains('active')) renderMonths();
    });

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); currentYear--; yearDisplay.textContent = currentYear; renderMonths(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); currentYear++; yearDisplay.textContent = currentYear; renderMonths(); });
    document.addEventListener('click', (e) => {
        if(!wrapper.contains(e.target)) { popup.classList.remove('active'); trigger.classList.remove('active-state'); }
    });
    yearDisplay.textContent = currentYear;
}

/* ============================ */
/* LOGIC ENGINE & CALCULATION   */
/* ============================ */
function calculateAndShow() {
    
    // 0. STRICT VALIDATION with Friendly Names
    const fieldMap = {
        'input_date': 'Date',
        'input_police': 'Police Report',
        'input_type': 'Accident Type', 
        'input_ticket': 'Ticket Status',
        'input_injuries': 'Injuries',
        'input_helmet': 'Helmet Status', 
        'input_alcohol': 'Alcohol',
        'input_um': 'UM Coverage'
    };

    let missingFields = [];
    
    for (const [id, name] of Object.entries(fieldMap)) {
        const el = document.getElementById(id);
        if (!el || !el.value) {
            missingFields.push(name);
        }
    }

    if (missingFields.length > 0) {
        // Show Error State
        const resultDiv = document.getElementById('dashboard-results');
        const placeholder = document.getElementById('dashboard-placeholder');
        const placeholderText = document.getElementById('placeholder-text');
        
        resultDiv.classList.add('results-blurred');
        placeholder.classList.add('error-state'); // Apply Red Block Style
        placeholder.style.display = 'block';
        
        // Update Text
        placeholderText.textContent = "Please provide: " + missingFields.join(", ");
        placeholderText.style.color = "#ffffff"; // Force white text
        
        return; // STOP EXECUTION
    }

    // If Valid, Proceed -> Reset UI
    const resultDiv = document.getElementById('dashboard-results');
    const placeholder = document.getElementById('dashboard-placeholder');
    const placeholderText = document.getElementById('placeholder-text');
    
    resultDiv.classList.remove('results-blurred');
    placeholder.classList.remove('error-state'); // Remove Red Style
    placeholder.style.display = 'none'; // Hide overlay
    placeholderText.style.color = "#888"; // Reset color for next time (optional)

    const stateInput = document.getElementById('input_state');
    const stateCode = stateInput ? stateInput.value : "CA"; 
    const rules = STATE_DATA[stateCode] || STATE_DATA["CA"];

    const dateVal = document.getElementById('input_date').value; 
    const police = document.getElementById('input_police').value;
    const accType = document.getElementById('input_type').value;
    const action = document.getElementById('input_action').value;
    const ticket = document.getElementById('input_ticket').value;
    const medical = document.getElementById('input_medical').value;
    const work = document.getElementById('input_work').value;
    const bike = document.getElementById('input_bike').value;
    const driver = document.getElementById('input_driver').value;
    const helmet = document.getElementById('input_helmet').value;
    const alcohol = document.getElementById('input_alcohol').value;

    const alertBox1 = document.getElementById('alert-container-1');
    const alertMsg1 = document.getElementById('alert-msg-1');
    const alertBox2 = document.getElementById('alert-container-2');
    const alertMsg2 = document.getElementById('alert-msg-2');
    
    alertBox1.classList.add('hidden');
    alertBox2.classList.add('hidden');
    let warnings = [];

    // LIABILITY SCORE
    let score = 50; 
    if (accType === 'rear_end' || accType === 'left_turn' || accType === 'door') score += 30;
    else if (accType === 'lane_change') score += 10;
    else if (accType === 'solo') score -= 30;

    if (ticket === 'yes') score += 20;
    if (police === 'yes') score += 10;
    if (alcohol === 'yes') score -= 50; 

    if (rules.fault === FAULT_RULES.CONTRIB) {
        if (accType === 'lane_change' || accType === 'solo' || police === 'no' || action === 'splitting') {
            score -= 25; 
            warnings.push(`${rules.name} follows strict "Contributory Negligence". If you are even 1% at fault, you may be barred from recovery.`);
        }
    }

    if (action === 'splitting') {
        if (rules.split === LANE_RULES.ILLEGAL) {
            score -= 20;
            warnings.push(`Lane splitting is ILLEGAL in ${rules.name}. Insurance will likely argue you were negligent.`);
        } else if (rules.split === LANE_RULES.FILTERING) {
             warnings.push(`${rules.name} allows filtering only under specific conditions (usually stopped traffic). Ensure you were compliant.`);
        }
    }

    if (helmet === 'no' && rules.helmet === HELMET_LAWS.UNIVERSAL) {
        score -= 10;
        warnings.push(`Failure to wear a helmet in ${rules.name} (Universal Law) can significantly reduce your compensation for head/neck injuries.`);
    }

    let liabilityStatus = 'Contested';
    if (score >= 80) liabilityStatus = 'Strong';
    else if (score <= 40) liabilityStatus = 'Weak';
    updateTrafficLight('res_liability', liabilityStatus.toLowerCase());

    // SEVERITY SCORE
    const injuries = Array.from(document.querySelectorAll('#group_injuries input:checked')).map(cb => cb.value);
    const hasMajorInjury = injuries.includes('fracture') || injuries.includes('head');
    let severityStatus = "tier2";
    let severityLabel = "Standard";
    if (medical === 'hospital' || driver === 'commercial' || work === 'lost_job' || hasMajorInjury) { severityStatus = 'tier1'; severityLabel = "High Value"; }
    else if (medical === 'none' || (medical === 'urgent' && bike === 'minor')) { severityStatus = 'tier3'; severityLabel = "Low Impact"; }
    updateSeverityLight(severityStatus);

    if (severityStatus === 'tier1' && rules.insurance[0] <= 15) {
        warnings.push(`${rules.name} has low minimum insurance limits ($${rules.insurance[0]}k). If the other driver has minimum coverage, it may not cover your medical bills.`);
    }

    // URGENCY
    const solYears = rules.sol;
    let daysRemaining = 365 * solYears;
    let totalDays = 365 * solYears;
    if (dateVal) {
        const accidentDate = new Date(dateVal + "-01");
        const today = new Date();
        const diffTime = (accidentDate.getTime() + (solYears * 365 * 24 * 60 * 60 * 1000)) - today.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }
    const pct = Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100));
    const bar = document.getElementById('res_time_bar');
    bar.style.width = `${pct}%`;
    bar.className = 'progress-bar-fill'; 
    if (daysRemaining < 90) bar.classList.add('red');
    else if (daysRemaining < 365) bar.classList.add('yellow');
    else bar.classList.add('green');
    
    let timeText = "";
    if (daysRemaining < 0) {
        timeText = "Statute Expired";
        warnings.push(`CRITICAL: The Statute of Limitations in ${rules.name} is ${solYears} years. It appears to have expired.`);
    } else if (daysRemaining < 90) {
        timeText = "CRITICAL (< 90 Days)";
        warnings.push(`URGENT: You have less than 90 days to file in ${rules.name}.`);
    } else {
        const months = Math.floor(daysRemaining/30);
        timeText = `${months} Months Remaining`;
    }
    document.getElementById('res_time_text').textContent = timeText;

    // EVIDENCE
    const docEl = document.getElementById('res_docs');
    if (police === 'yes' && (medical === 'hospital' || medical === 'er')) {
        docEl.textContent = "Strong";
        docEl.style.color = "#2ecc71";
    } else if (police === 'no' || medical === 'none') {
        docEl.textContent = "Needs Work";
        docEl.style.color = "#e67e22";
    } else {
        docEl.textContent = "Standard";
        docEl.style.color = "#333";
    }

    if (medical === 'none') warnings.unshift("Gap Warning: Insurance adjusters use delays in care to deny claims. See a doctor immediately.");
    if (warnings.length > 0) {
        alertMsg1.textContent = warnings[0]; alertBox1.classList.remove('hidden');
        if (warnings.length > 1) { alertMsg2.textContent = warnings[1]; alertBox2.classList.remove('hidden'); }
    }
}

function updateTrafficLight(elementId, status) {
    const container = document.getElementById(elementId);
    const lights = container.querySelectorAll('.light');
    const text = container.querySelector('.score-text');
    lights.forEach(l => l.classList.remove('active'));
    if (status === 'strong') { lights[2].classList.add('active'); text.textContent = "Strong"; text.style.color = "#2ecc71"; }
    else if (status === 'contested' || status === 'weak') { // Catch weak as middle or red? Usually weak is red.
         if (status === 'weak') { lights[0].classList.add('active'); text.textContent = "Weak"; text.style.color = "#e74c3c"; }
         else { lights[1].classList.add('active'); text.textContent = "Contested"; text.style.color = "#f1c40f"; }
    } else {
        // Fallback
        lights[1].classList.add('active'); text.textContent = "Contested"; text.style.color = "#f1c40f";
    }
}

function updateSeverityLight(status) {
    const container = document.getElementById('res_severity');
    const lights = container.querySelectorAll('.light');
    const text = container.querySelector('.score-text');
    lights.forEach(l => l.classList.remove('active'));
    if (status === 'tier1') { lights[2].classList.add('active'); text.textContent = "High Value"; text.style.color = "#2ecc71"; }
    else if (status === 'tier2') { lights[1].classList.add('active'); text.textContent = "Standard"; text.style.color = "#f1c40f"; }
    else { lights[0].classList.add('active'); text.textContent = "Low Impact"; text.style.color = "#e74c3c"; }
}

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,
    PERSIST_MAP: {
        'state': { id: 'input_state', type: 'select' },
        'date': { id: 'input_date', type: 'text' },
        'police': { id: 'input_police', type: 'text' },
        'type': { id: 'input_type', type: 'text' },
        'action': { id: 'input_action', type: 'select' },
        'ticket': { id: 'input_ticket', type: 'text' },
        'med': { id: 'input_medical', type: 'select' },
        'inj': { id: 'input_injuries', type: 'text' }, 
        'work': { id: 'input_work', type: 'select' },
        'bike': { id: 'input_bike', type: 'select' },
        'helmet': { id: 'input_helmet', type: 'text' },
        'alc': { id: 'input_alcohol', type: 'text' },
        'driver': { id: 'input_driver', type: 'select' },
        'um': { id: 'input_um', type: 'text' }
    },
    getShareUrl() {
        const params = new URLSearchParams();
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) params.set(key, el.value);
        }
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    },
    async handleShare() {
        const shareUrl = this.getShareUrl();
        const shareData = { title: document.title, text: 'Solveria Calculation', url: shareUrl };
        if (navigator.share) { try { await navigator.share(shareData); } catch (err) {} }
        else {
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
        let hasParams = false;
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                hasParams = true;
                const el = document.getElementById(config.id);
                if (el) {
                    el.value = params.get(key);
                    if (key === 'police' || key === 'ticket' || key === 'helmet' || key === 'alc' || key === 'um') {
                         const group = el.parentElement;
                         const btn = group.querySelector(`button[data-value="${el.value}"]`);
                         if(btn) { group.querySelectorAll('.select-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); }
                    }
                    if (key === 'type') {
                        const group = document.getElementById('group_type');
                        if(group) {
                            const btn = group.querySelector(`button[data-value="${el.value}"]`);
                            if(btn) { group.querySelectorAll('.icon-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected'); }
                        }
                    }
                    if (key === 'inj') {
                        const vals = el.value.split(',');
                        vals.forEach(v => {
                            const cb = document.querySelector(`#group_injuries input[value="${v}"]`);
                            if(cb) { cb.checked = true; cb.parentElement.classList.add('selected'); }
                        });
                    }
                }
            }
        }
        if (hasParams) {
             setTimeout(() => { calculateAndShow(); document.getElementById('dashboard-results').scrollIntoView(); }, 500);
        }
    },
    preparePrintData() {
        // --- HELPER FUNCTIONS ---
        const getVal = (id) => { const el = document.getElementById(id); return el ? el.value : '--'; };
        const getTxt = (id) => {
             const el = document.getElementById(id);
             if(!el) return '--';
             // For state, map code to name
             if(id === 'input_state') return STATE_DATA[el.value] ? STATE_DATA[el.value].name : el.value;
             // For custom dropdowns
             const wrapper = el.parentElement;
             const trigger = wrapper.querySelector('.custom-dropdown-trigger');
             if(trigger) return trigger.textContent;
             return el.value;
        };
        const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '--';
        const getMapVal = (val, map) => map[val] || capitalize(val);

        // --- GATHER DATA ---
        const stateCode = getVal('input_state');
        const stateName = STATE_DATA[stateCode] ? STATE_DATA[stateCode].name : stateCode;
        const stateRule = STATE_DATA[stateCode] || STATE_DATA['CA'];
        const dateRaw = getVal('input_date');
        const dateObj = new Date();
        const printDate = `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
        const caseId = `MC-${Math.floor(1000 + Math.random() * 9000)}-${stateCode}`;

        // Dynamic Calculations
        const solYears = stateRule.sol;
        let timeRemainingTxt = "";
        if (dateRaw) {
             const accidentDate = new Date(dateRaw + "-01");
             const diffTime = (accidentDate.getTime() + (solYears * 365 * 24 * 60 * 60 * 1000)) - dateObj.getTime();
             const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
             if(days < 0) timeRemainingTxt = "EXPIRED";
             else {
                 const m = Math.floor(days/30);
                 timeRemainingTxt = `${m} Months Remaining`;
             }
        } else { timeRemainingTxt = "--"; }

        // Fields
        const accTypeRaw = getVal('input_type');
        const accTypeMap = { 'rear_end': 'Rear-ended', 'left_turn': 'Left Turn', 'lane_change': 'Lane Change', 'door': 'Door Prize', 'solo': 'Solo', 'other': 'Other' };
        const accType = getMapVal(accTypeRaw, accTypeMap);
        
        const policeRaw = getVal('input_police');
        const police = capitalize(policeRaw);
        
        const actionRaw = getVal('input_action');
        const actionMap = { 'straight': 'Riding Straight', 'splitting': 'Lane Splitting', 'turning': 'Turning/Merging' };
        const action = getMapVal(actionRaw, actionMap);

        const ticketRaw = getVal('input_ticket'); // yes, no, unsure
        const ticket = ticketRaw === 'unsure' ? 'Unknown' : capitalize(ticketRaw);

        const medRaw = getVal('input_medical');
        const medMap = { 'hospital': 'Ambulance / Surgery', 'er': 'ER Visit', 'urgent': 'Urgent Care', 'none': 'No Treatment' };
        const med = getMapVal(medRaw, medMap);

        const workRaw = getVal('input_work');
        const workMap = { 'lost_job': 'Lost Job', 'missed': 'Missed Work', 'none': 'None' };
        const work = getMapVal(workRaw, workMap);

        const injRaw = getVal('input_injuries');
        const inj = injRaw ? injRaw.split(',').map(s => capitalize(s)).join(', ') : 'None Reported';

        const bikeRaw = getVal('input_bike');
        const bike = bikeRaw === 'totaled' ? 'Totaled' : 'Repairable';

        const helmetRaw = getVal('input_helmet'); // yes, no
        const helmet = capitalize(helmetRaw);

        const alcoholRaw = getVal('input_alcohol'); // yes, no, prefer_not
        const alcohol = alcoholRaw === 'yes' ? 'Yes' : 'No';

        const driverRaw = getVal('input_driver');
        const driverMap = { 'insured': 'Insured (Personal)', 'commercial': 'Commercial', 'uninsured': 'Uninsured', 'unknown': 'Unknown' };
        const driver = getMapVal(driverRaw, driverMap);

        const umRaw = getVal('input_um'); // yes, no, check
        const um = umRaw === 'check' ? 'Need to Check' : capitalize(umRaw);

        // Scorecards
        const liabilityTxt = document.querySelector('#res_liability .score-text').textContent.toUpperCase();
        const severityTxt = document.querySelector('#res_severity .score-text').textContent.toUpperCase();
        const docTxt = document.getElementById('res_docs').textContent.toUpperCase();

        // --- ANALYST NOTES LOGIC ---
        // 1. Jurisdiction
        const noteJurisdiction = `Time is actively ticking. ${stateName} enforces a strict statute of limitations of ${solYears} years for personal injury claims. Evidence preservation is critical during this window.`;

        // 2. Collision
        let noteCollision = `The core liability baseline is established by the '${accType}' nature of the crash. `;
        if (accTypeRaw === 'rear_end') noteCollision += "Rear-end collisions traditionally place the burden of fault on the trailing vehicle. ";
        else if (accTypeRaw === 'left_turn') noteCollision += "Left-turn accidents often presume fault on the turning vehicle unless speed or signal violations are proven. ";
        
        if (ticketRaw === 'yes') noteCollision += "The citation issued to the adverse driver significantly strengthens the liability argument.";
        else if (ticketRaw === 'no' || ticketRaw === 'unsure') noteCollision += "However, because it is currently unknown if the adverse driver was officially cited, independent liability verification (via the police report) is required to strengthen the claim.";

        // 3. Severity
        let noteSeverity = `This case registers as ${severityTxt}. `;
        if (medRaw === 'hospital' || bikeRaw === 'totaled' || workRaw === 'lost_job') {
            noteSeverity += "The combination of significant medical intervention, catastrophic property damage (totaled vehicle), and documented loss of earning capacity significantly elevates the baseline calculation for both economic and non-economic damages.";
        } else {
             noteSeverity += "While damages are present, the absence of immediate hospitalization or major vehicle loss suggests a focus on soft-tissue injury valuation.";
        }

        // 4. Compliance
        let noteCompliance = "";
        const limit = stateRule.insurance[0];
        if (helmetRaw === 'no' && stateRule.helmet === 'universal') {
            noteCompliance += `CRITICAL: Failure to wear a helmet in ${stateName} (a Universal Law state) can significantly reduce compensation specifically for reported head/neck injuries under comparative negligence rules. `;
        }
        noteCompliance += `${stateName} has minimum insurance limits of $${limit}k. If the at-fault driver carries minimum coverage, it may be insufficient for medical bills, making First-Party Uninsured/Underinsured Motorist (UM) coverage crucial to verify.`;

        // --- BUILD HTML (VERTICAL STACK LAYOUT) ---
        // Updated: Removed border-bottom from header block
        const html = `
            <div class="print-header-block" style="display:flex; align-items:center; justify-content:flex-start; text-align:left; margin-bottom:20px;">
                <img src="../../img/Logo_Golden.webp" class="print-logo" alt="Logo" style="height:60px; margin-right:20px;">
                <div class="print-header-text">
                    <h1 class="print-main-title">Motorcycle Collision Preliminary Assessment Report</h1>
                    <p class="print-sub-title">Factual Summary & Liability Comparison</p>
                </div>
            </div>

            <div class="print-meta-row" style="display:flex; justify-content:space-between; border-bottom:1px solid #000; padding-bottom:5px; margin-bottom:25px; font-size:0.9rem;">
                <div><span class="meta-label">Claimant:</span> Rider/Plaintiff</div>
                <div><span class="meta-label">Date:</span> ${printDate}</div>
                <div><span class="meta-label">Case ID:</span> ${caseId}</div>
                <div><span class="meta-label">Jurisdiction:</span> ${stateName}</div>
            </div>

            <div class="print-stack-container">
                <!-- SECTION I -->
                <div class="print-section-wrapper">
                    <div class="print-section-header">I. COLLISION DYNAMICS & LIABILITY</div>
                    <div class="print-data-compact">
                        <div class="data-item"><span class="data-label">Classification:</span><span class="data-val">${accType}</span></div>
                        <div class="data-item"><span class="data-label">Police Report:</span><span class="data-val">${police}</span></div>
                        <div class="data-item"><span class="data-label">Rider Action:</span><span class="data-val">${action}</span></div>
                        <div class="data-item"><span class="data-label">Driver Cited:</span><span class="data-val">${ticket}</span></div>
                    </div>
                    <div class="analyst-note"><span class="note-prefix">NOTE:</span> ${noteCollision}</div>
                </div>

                <!-- SECTION II -->
                <div class="print-section-wrapper">
                    <div class="print-section-header">II. DAMAGE & SEVERITY ASSESSMENT</div>
                    <div class="print-data-compact">
                        <div class="data-item"><span class="data-label">Medical:</span><span class="data-val">${med}</span></div>
                        <div class="data-item"><span class="data-label">Work Impact:</span><span class="data-val">${work}</span></div>
                        <div class="data-item"><span class="data-label">Injuries:</span><span class="data-val">${inj}</span></div>
                        <div class="data-item"><span class="data-label">Vehicle:</span><span class="data-val">${bike}</span></div>
                    </div>
                    <div class="analyst-note"><span class="note-prefix">NOTE:</span> ${noteSeverity}</div>
                </div>

                <!-- SECTION III -->
                <div class="print-section-wrapper">
                    <div class="print-section-header">III. JURISDICTIONAL CONTEXT</div>
                    <div class="data-item"><span class="data-label">Statute Limit:</span><span class="data-val">${timeRemainingTxt}</span></div>
                    <div class="analyst-note"><span class="note-prefix">NOTE:</span> ${noteJurisdiction}</div>
                </div>

                <!-- SECTION IV -->
                <div class="print-section-wrapper">
                    <div class="print-section-header">IV. COMPLIANCE PROFILE</div>
                    <div class="print-data-compact">
                        <div class="data-item"><span class="data-label">Helmet:</span><span class="data-val">${helmet}</span></div>
                        <div class="data-item"><span class="data-label">Driver Ins.:</span><span class="data-val">${driver}</span></div>
                        <div class="data-item"><span class="data-label">Alcohol:</span><span class="data-val">${alcohol}</span></div>
                        <div class="data-item"><span class="data-label">UM Coverage:</span><span class="data-val">${um}</span></div>
                    </div>
                    <div class="analyst-note"><span class="note-prefix">CRITICAL:</span> ${noteCompliance}</div>
                </div>

                <!-- SCORECARD -->
                <div class="print-section-wrapper">
                    <div class="print-section-header">V. SCORECARD</div>
                    <div class="scorecard-box">
                        <div class="score-row-print"><span class="score-label-print">Liability:</span><span class="score-val-print">${liabilityTxt}</span></div>
                        <div class="score-row-print"><span class="score-label-print">Severity:</span><span class="score-val-print">${severityTxt}</span></div>
                        <div class="score-row-print"><span class="score-label-print">Docs:</span><span class="score-val-print">${docTxt}</span></div>
                    </div>
                </div>
            </div>

            <div class="action-box">
                ACTION REQUIRED: SECURE POLICE REPORT & VERIFY UM LIMITS
            </div>

            <div class="print-signatures">
                <div class="sig-line">Signature of Claimant / Rider</div>
                <div class="sig-line" style="flex:0.5; margin-left:50px;">Date</div>
            </div>

            <div class="print-disclaimer">
                LEGAL & METHODOLOGY DISCLAIMER: This Preliminary Assessment Report is generated automatically for informational and organizational purposes only. The liability strengths and severity values presented are estimates derived from standard industry scenarios and static jurisdictional data models. This document does not constitute legal advice, a binding financial guarantee, or professional counsel. Users are strongly encouraged to verify all limits and claims with a licensed personal injury attorney in their jurisdiction. Claimants assume all responsibility for how this data is utilized.
            </div>
        `;

        document.getElementById('print-content-injection').innerHTML = html;
    },
    closeTutorialModal() { document.getElementById('pdf-tutorial-overlay').classList.remove('active'); },
    handleTutorialProceed() { this.closeTutorialModal(); window.print(); },
    startPrintSequence() {
        const modal = document.getElementById('pdf-tutorial-overlay');
        const proceedBtn = document.getElementById('btn-proceed');
        if (this.isTutorialUnlocked) { this.preparePrintData(); modal.classList.add('active'); proceedBtn.disabled = false; proceedBtn.textContent = "Proceed"; return; }
        let timeLeft = 3;
        this.preparePrintData();
        modal.classList.add('active');
        proceedBtn.disabled = true;
        proceedBtn.textContent = `Proceed (${timeLeft})`;
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) proceedBtn.textContent = `Proceed (${timeLeft})`;
            else { clearInterval(timer); proceedBtn.textContent = "Proceed"; proceedBtn.disabled = false; this.isTutorialUnlocked = true; }
        }, 1000);
    },
    init() {
        this.restoreState();
        const btnShare = document.getElementById('btn-share');
        if (btnShare) btnShare.addEventListener('click', () => this.handleShare());
        const btnPrint = document.getElementById('btn-print');
        if (btnPrint) btnPrint.addEventListener('click', () => { this.preparePrintData(); window.print(); });
        const btnPDF = document.getElementById('btn-save-pdf');
        if (btnPDF) btnPDF.addEventListener('click', () => this.startPrintSequence());
        const btnProceed = document.getElementById('btn-proceed');
        if (btnProceed) btnProceed.addEventListener('click', () => this.handleTutorialProceed());
        const modal = document.getElementById('pdf-tutorial-overlay');
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) this.closeTutorialModal(); });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeCustomDropdowns();
    initializeSelectionButtons();
    initializeCustomDatePicker();
    ToolFeatures.init();
});