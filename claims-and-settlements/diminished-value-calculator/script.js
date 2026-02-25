/* ============================ */
/* STATE DATA REPOSITORY        */
/* ============================ */
const US_STATE_DATA = {
  AL: { name: "Alabama", status: "Common Law State. You are entitled to the difference in market value.", tip: "Policy language often excludes first-party claims; focus on third-party liability." },
  AK: { name: "Alaska", status: "Common Law State. Entitled to be made whole.", tip: "Courts generally uphold third-party DV claims with valid evidence." },
  AZ: { name: "Arizona", status: "Common Law State (Ref: Oliver v. Henry).", tip: "Arizona case law supports recovery of value loss in third-party claims." },
  AR: { name: "Arkansas", status: "Common Law State.", tip: "Insurers often demand a trade-in quote as proof. Get one from a major dealer." },
  CA: { name: "California", status: "Consumer Protection State (Jury Instruction 3903J).", tip: "California Jury Instructions explicitly recognize the difference in market value as valid damages." },
  CO: { name: "Colorado", status: "Statutory Protection State.", tip: "Recent legislation requires insurers to disclose that DV coverage is available in third-party claims." },
  CT: { name: "Connecticut", status: "Common Law State.", tip: "Dealer quotes are persuasive here. Case law supports recovery from at-fault drivers." },
  DE: { name: "Delaware", status: "Common Law State.", tip: "First-party claims often barred by 'repair or replace' clauses; pursue the at-fault driver." },
  DC: { name: "District of Columbia", status: "Common Law Jurisdiction.", tip: "Documentation is key. D.C. courts generally recognize DV in tort claims." },
  FL: { name: "Florida", status: "Common Law State (Ref: Siegle v. Progressive).", tip: "Third-party claims are valid. First-party claims are generally excluded unless stated in policy." },
  GA: { name: "Georgia", status: "The '17c' Formula State (Ref: State Farm v. Mabry).", tip: "Insurers use a specific cap here. However, the formula is a floor, not a ceiling. You can still negotiate." },
  HI: { name: "Hawaii", status: "Common Law State.", tip: "Shipping costs complicate value; get local island dealer quotes to prove loss." },
  ID: { name: "Idaho", status: "Common Law State.", tip: "Insurers will aggressively request proof of loss. Provide concrete market examples." },
  IL: { name: "Illinois", status: "Common Law State (Pattern Jury Instructions).", tip: "Jury instructions allow for the difference in value before and after the accident." },
  IN: { name: "Indiana", status: "Common Law State (Ref: Wiese v. QA3 Financial).", tip: "Burden of proof is on you. Compare pre-crash value vs. post-repair trade-in offer." },
  IA: { name: "Iowa", status: "Common Law / Halvan Standard.", tip: "Recovery allowed, provided total damages don't exceed pre-accident vehicle value." },
  KS: { name: "Kansas", status: "Common Law State.", tip: "First-party claims usually excluded by contract; third-party claims are the standard path." },
  KY: { name: "Kentucky", status: "Common Law State.", tip: "Courts generally uphold the right to recover market value loss from at-fault drivers." },
  LA: { name: "Louisiana", status: "Common Law State (Orleans Parish Precedent).", tip: "Use NADA/KBB data + a trade-in quote to substantiate your claim." },
  ME: { name: "Maine", status: "Common Law State.", tip: "Third-party claims are valid. Document your loss with written dealer offers." },
  MD: { name: "Maryland", status: "Common Law State.", tip: "Insurers here often demand an independent appraisal report to validate the number." },
  MA: { name: "Massachusetts", status: "Complex Common Law (Ref: McGilloway).", tip: "Case law opened the door for DV, but standard policies try to exclude it. Pursue the at-fault driver." },
  MI: { name: "Michigan", status: "Restricted No-Fault State.", tip: "Recovery is difficult. You are generally limited to the 'Mini-Tort' provision (capped amount) for vehicle damage." },
  MN: { name: "Minnesota", status: "Common Law State.", tip: "First-party recovery often blocked by 'repair or replace' language. Focus on third-party." },
  MS: { name: "Mississippi", status: "Common Law State.", tip: "You must prove the loss of value with specific market data (ads/quotes)." },
  MO: { name: "Missouri", status: "Common Law State (Ref: Williams v. Farm Bureau).", tip: "Measure of damages is explicitly the difference in fair market value before and after." },
  MT: { name: "Montana", status: "Common Law State.", tip: "Burden of proof lies with the owner. Get a written statement from a dealer." },
  NE: { name: "Nebraska", status: "Common Law State (Ref: Chlopek v. Schmall).", tip: "You are entitled to the difference in value immediately before and after the accident." },
  NV: { name: "Nevada", status: "Common Law State.", tip: "Law requires you to be made whole. Do not accept 'we don't pay DV' as an answer." },
  NH: { name: "New Hampshire", status: "Common Law State.", tip: "Third-party DV claims are allowed. Liable parties owe the damages regardless of insurance status." },
  NJ: { name: "New Jersey", status: "Common Law State.", tip: "Insurers may ask for a 'sold vehicle report,' but a solid trade-in offer is often sufficient evidence." },
  NM: { name: "New Mexico", status: "Common Law State (Ref: Hale v. Basin Motor).", tip: "Damages are calculated as the difference in value before and after the accident." },
  NY: { name: "New York", status: "Common Law State (Ref: Franklin Corp v. Prahler).", tip: "Precedents are older here; a professional appraisal is highly recommended to prove the loss." },
  NC: { name: "North Carolina", status: "Statutory Formula State.", tip: "NC allows First-Party claims but often uses a state-specific calculation. Check if the offer matches the statute." },
  ND: { name: "North Dakota", status: "Common Law State.", tip: "Entitled to be made whole. Third-party claims are valid." },
  OH: { name: "Ohio", status: "Common Law State (Ref: Rakich v. Anthem).", tip: "Generally recognizes DV in third-party tort cases. Proof of loss via appraisal is key." },
  OK: { name: "Oklahoma", status: "Common Law State (Ref: Brennan v. Aston Martin).", tip: "You are entitled to the reduction in market value. Document it clearly." },
  OR: { name: "Oregon", status: "Common Law State (Ref: Gonzales v. Farmers).", tip: "Strong case law supports DV. Entitled to market value difference, even in some first-party cases." },
  PA: { name: "Pennsylvania", status: "Common Law State.", tip: "First-party claims generally excluded (Lobozzo precedent). You must sue the at-fault driver's carrier." },
  RI: { name: "Rhode Island", status: "Common Law State.", tip: "Insurers are tough here, but the law supports third-party recovery with good evidence." },
  SC: { name: "South Carolina", status: "Common Law State.", tip: "SC is NOT a 17c state, though insurers often try to use the Georgia formula. Reject it." },
  SD: { name: "South Dakota", status: "Common Law State.", tip: "Third-party recovery is standard. You must prove the market value drop." },
  TN: { name: "Tennessee", status: "Common Law State (Ref: Black v. State Farm).", tip: "Third-party claims allowed. First-party claims are usually barred by policy definitions." },
  TX: { name: "Texas", status: "Common Law State (Ref: Senters v. State Farm).", tip: "First-party claims generally not allowed. Strong support for third-party liability claims." },
  UT: { name: "Utah", status: "Common Law State (Ref: Mets v. Amco).", tip: "Damages = difference in market value before and after. Get dealer verification." },
  VT: { name: "Vermont", status: "Common Law State.", tip: "Entitled to be made whole. Third-party claims are the primary path." },
  VA: { name: "Virginia", status: "Common Law State (Ref: Average v. VA Farm Bureau).", tip: "You must clearly demonstrate the loss in value with data." },
  WA: { name: "Washington", status: "Pro-Consumer State (Ref: Moeller v. Farmers).", tip: "Case law famously allowed First-Party DV claims. You have strong leverage here." },
  WV: { name: "West Virginia", status: "Common Law State (Ref: Ellis v. King).", tip: "Entitled to difference in market value. Gather trade-in offers." },
  WI: { name: "Wisconsin", status: "Common Law State (Ref: Hellenbrand v. Hilliard).", tip: "Entitled to value difference, even if repairs were done perfectly." },
  WY: { name: "Wyoming", status: "Common Law State.", tip: "Third-party recovery is standard. Prove loss with market data." }
};

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "Recover what your car lost in the accident.",
    "Understand the 17c Formula.",
    "Don't settle for just repairs.",
    "See the real cost of 'accident history'."
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

if(textElement) setInterval(cycleText, 4000);

/* ============================ */
/* Slider & Input Logic         */
/* ============================ */
const SLIDER_CONFIG = {
    carValueA: { type: 'cubic', max: 150000 },
    mileageA: { type: 'cubic', max: 200000 },
    capA: { type: 'linear', max: 20 }, 
    preValB: { type: 'cubic', max: 150000 },
    postValB: { type: 'cubic', max: 150000 },
    insuranceOfferB: { type: 'cubic', max: 50000 },
    taxRateB: { type: 'linear', max: 15 }
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
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

const cleanNumber = (num) => parseFloat(num) || 0;

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
                realVal = Math.round(realVal * 10) / 10; 
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
/* State Data Logic (Populate)  */
/* ============================ */
function populateStateData() {
    const select = document.getElementById('stateSelector');
    const wrapper = select ? select.closest('.custom-dropdown-container') : null;
    if (!wrapper) return;

    const menuWrapper = wrapper.querySelector('.dropdown-options-wrapper');
    const trigger = wrapper.querySelector('.custom-dropdown-trigger');
    if (!select || !menuWrapper) return;

    select.innerHTML = '';
    menuWrapper.innerHTML = '';

    Object.keys(US_STATE_DATA).forEach(key => {
        const data = US_STATE_DATA[key];
        
        const option = document.createElement('option');
        option.value = key;
        option.textContent = data.name;
        if (key === 'GA') option.selected = true;
        select.appendChild(option);

        const div = document.createElement('div');
        div.className = 'dropdown-option';
        if (key === 'GA') div.classList.add('selected');
        div.setAttribute('data-value', key);
        div.textContent = data.name;
        menuWrapper.appendChild(div);
    });

    if (trigger) trigger.textContent = US_STATE_DATA['GA'].name;
    updateStateContext('GA');
    
    select.addEventListener('change', (e) => {
        updateStateContext(e.target.value);
    });
}

function updateStateContext(stateCode) {
    const data = US_STATE_DATA[stateCode];
    if (!data) return;
    const wrapper = document.getElementById('stateSelector').closest('.input-wrapper');
    const disclosure = wrapper.querySelector('.disclosure-text');
    if (disclosure) {
        disclosure.innerHTML = `
            <strong style="color:#333;">${data.status}</strong><br>
            <span style="font-size: 1.15em; opacity: 0.8;">${data.tip}</span>
        `;
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
        const getOptions = () => wrapper.querySelectorAll('.dropdown-option');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        menu.addEventListener('click', (e) => {
            const option = e.target.closest('.dropdown-option');
            if (!option) return;
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            
            trigger.textContent = option.textContent;
            getOptions().forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            menu.classList.remove('active');
            
            if(select) {
                select.value = value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
            calculateResults();
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
            const container = document.getElementById('results-display-container');
            if (container) container.scrollTop = 0;
            calculateResults();
        });
    });
}

/* ============================ */
/* Advanced Toggle Logic        */
/* ============================ */
function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    let isAdvanced = false;
    btn.setAdvanced = function(forceTrue) {
        if(forceTrue && !isAdvanced) btn.click();
    };
    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";
        const advancedElements = document.querySelectorAll('.advanced-content');
        advancedElements.forEach(el => {
            if (isAdvanced) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    });
}

/* ============================ */
/* Copy Button Logic            */
/* ============================ */
function initializeCopyButton() {
    const copyBtn = document.getElementById('btn_copy_a_to_b');
    if(!copyBtn) return;
    copyBtn.addEventListener('click', () => {
        const valA = document.getElementById('input_carValueA').value;
        const inputB = document.getElementById('input_preValB');
        const sliderB = document.getElementById('slider_preValB');
        inputB.value = valA;
        const currentVal = cleanNumber(valA);
        sliderB.value = valToSlider(currentVal, 'preValB');
        updateSliderVisual(sliderB);
        calculateResults();
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

/* ============================ */
/* Calculation Engine           */
/* ============================ */
function calculateResults() {
    const isModeA = document.getElementById('mode-a-inputs') && !document.getElementById('mode-a-inputs').classList.contains('hidden');
    const fmtMoney = (num) => '$' + Math.round(num).toLocaleString();

    // Mode A (17c)
    const valueA = cleanNumber(document.getElementById('input_carValueA').value);
    const mileageA = cleanNumber(document.getElementById('input_mileageA').value);
    const severityStr = document.getElementById('severityA').value || "0.5";
    const damageMultiplier = parseFloat(severityStr);
    const capPercent = cleanNumber(document.getElementById('input_capA').value) / 100;

    let formulaResult = 0;
    const trapElement = document.getElementById('mileage-trap-warning');
    let mileageMultiplier = 1.0;
    if (mileageA >= 100000) mileageMultiplier = 0.0;
    else if (mileageA >= 80000) mileageMultiplier = 0.2;
    else if (mileageA >= 60000) mileageMultiplier = 0.4;
    else if (mileageA >= 40000) mileageMultiplier = 0.6;
    else if (mileageA >= 20000) mileageMultiplier = 0.8;

    if (mileageA >= 100000) {
        if(isModeA && trapElement) trapElement.classList.remove('hidden');
        formulaResult = 0; 
    } else {
        if(isModeA && trapElement) trapElement.classList.add('hidden');
        const baseLoss = valueA * capPercent;
        formulaResult = baseLoss * damageMultiplier * mileageMultiplier;
    }

    // Mode B (Market)
    const preVal = cleanNumber(document.getElementById('input_preValB').value);
    const postVal = cleanNumber(document.getElementById('input_postValB').value);
    const offer = cleanNumber(document.getElementById('input_insuranceOfferB').value);
    const taxRatePercent = cleanNumber(document.getElementById('input_taxRateB').value);
    const taxRate = taxRatePercent / 100;

    const lossRaw = Math.max(0, preVal - postVal);
    const taxLoss = lossRaw * taxRate; 
    const trueMarketLoss = lossRaw + taxLoss;
    const gap = Math.max(0, trueMarketLoss - offer); 

    // UI Updates
    if (isModeA) {
        document.getElementById('res_dvA').textContent = fmtMoney(formulaResult);
        document.getElementById('res_baseLossA').textContent = fmtMoney(valueA * capPercent);
        document.getElementById('res_mileageFactorA').textContent = mileageMultiplier.toFixed(2);
        document.getElementById('res_damageFactorA').textContent = damageMultiplier.toFixed(2);

        let summaryA = "";
        if (mileageA >= 100000) {
            summaryA = `Under the strict interpretation of the 17c formula, vehicles with over <strong>100,000 miles</strong> are assigned a Mileage Multiplier of <span class="text-red text-bold">0.00</span>. This effectively <strong>nullifies</strong> the entire Diminished Value claim regardless of the vehicle's condition or the severity of the damage.`;
        } else if (mileageA < 100000 && damageMultiplier === 1.0) {
            summaryA = `It is critical to observe that this formula applies a <strong>Base Loss Cap</strong> (typically 10% of NADA value) before any damage multipliers are applied. Even though you have indicated <strong>Major Damage</strong> (1.00 factor), the formula restricts the maximum theoretical recovery to that <span class="text-red text-bold">10% ceiling</span>.`;
        } else if (damageMultiplier === 0.50 || damageMultiplier === 0.25) {
            const reductionPct = damageMultiplier === 0.50 ? "50%" : "75%";
            summaryA = `This calculation is heavily influenced by the <strong>Damage Severity Modifier</strong> of <span class="text-yellow text-bold">${damageMultiplier.toFixed(2)}</span>. Classifying the damage as 'Moderate' rather than 'Major' mathematically <span class="text-red text-bold">removes ${reductionPct}</span> of the potential claim value immediately.`;
        } else {
             summaryA = "This result is derived from the standard Georgia 17c formula, applying modifiers for mileage and damage severity against a capped base loss.";
        }
        document.getElementById('res_summaryTextA').innerHTML = summaryA;
    } 
    else {
        document.getElementById('res_trueLossB').textContent = fmtMoney(trueMarketLoss);
        document.getElementById('res_gapB').textContent = fmtMoney(trueMarketLoss - offer);
        document.getElementById('stack_formula').textContent = fmtMoney(formulaResult);
        document.getElementById('stack_market').textContent = fmtMoney(trueMarketLoss);
        document.getElementById('stack_gap').textContent = fmtMoney(trueMarketLoss - offer);

        let offerPct = 0;
        let gapPct = 0;
        if (trueMarketLoss > 0) {
            offerPct = (offer / trueMarketLoss) * 100;
            if (offerPct > 100) offerPct = 100;
            gapPct = 100 - offerPct;
        }

        document.getElementById('bar-offer').style.width = `${offerPct}%`;
        document.getElementById('bar-gap').style.width = `${gapPct}%`;

        const badge = document.getElementById('comp-badge');
        const compContainer = document.getElementById('comparison-engine');
        badge.className = 'comp-badge'; 
        compContainer.classList.remove('status-red', 'status-yellow', 'status-green');

        if (offer >= trueMarketLoss) {
            badge.classList.add('badge-green');
            badge.textContent = "Fair Market Offer";
            compContainer.classList.add('status-green');
        } else if (offer >= formulaResult && formulaResult > 0) { 
            badge.classList.add('badge-yellow');
            badge.textContent = "Formula Offer";
            compContainer.classList.add('status-yellow');
        } else {
            badge.classList.add('badge-red');
            badge.textContent = "Aggressive Lowball";
            compContainer.classList.add('status-red');
        }

        let summaryB = "";
        if (offer >= trueMarketLoss) {
            summaryB = `The current insurance offer <span class="text-green text-bold">meets or exceeds</span> the calculated difference in market value based on the inputs provided.`;
        } else if (formulaResult > 0 && Math.abs(offer - formulaResult) / formulaResult < 0.10 && offer < trueMarketLoss) {
            summaryB = `Analysis indicates the insurance offer closely mirrors the standard 17c Formula result rather than the actual market data. The discrepancy suggests the settlement is based on a <span class="text-yellow text-bold">theoretical cap-based model</span>.`;
        } else if (taxRate > 0 && taxLoss > 0 && Math.abs(gap - taxLoss) / taxLoss < 0.15) {
             summaryB = `The current calculation highlights a <strong>Tax Equity shortfall</strong>. The owner is losing the <span class="text-red text-bold">sales tax equity</span> associated with the lost value.`;
        } else if (trueMarketLoss > 0 && gap > (0.30 * trueMarketLoss)) {
            summaryB = `There is a <strong>significant statistical variance</strong> between the settlement offer and the projected loss in fair market value. The offer covers only a <span class="text-red text-bold">fraction of the realized depreciation</span>.`;
        } else {
            summaryB = `The comparison indicates a gap between the insurance offer and the potential market loss, likely stemming from standardized algorithms versus retail market realities.`;
        }
        document.getElementById('res_summaryTextB').innerHTML = summaryB;
    }
}

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'select' },
        'valA':  { id: 'input_carValueA', type: 'number' },
        'milA':  { id: 'input_mileageA', type: 'number' },
        'sevA':  { id: 'severityA', type: 'select' },
        'capA':  { id: 'input_capA', type: 'number' },
        'preB':  { id: 'input_preValB', type: 'number' },
        'postB': { id: 'input_postValB', type: 'number' },
        'offB':  { id: 'input_insuranceOfferB', type: 'number' },
        'taxB':  { id: 'input_taxRateB', type: 'number' }
    },

    getShareUrl() {
        const params = new URLSearchParams();
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) params.set(key, el.value);
        }
        const activeCard = document.querySelector('.mode-card.active-mode');
        if(activeCard) params.set('mode', activeCard.getAttribute('data-mode'));
        const isAdvanced = !document.querySelector('.advanced-content').classList.contains('hidden');
        params.set('adv', isAdvanced);
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
                    el.value = params.get(key);
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }
        if (params.has('mode')) {
            const modeId = params.get('mode');
            const card = document.querySelector(`.mode-card[data-mode="${modeId}"]`);
            if (card) card.click();
        }
        if (params.has('adv')) {
            const shouldBeAdvanced = params.get('adv') === 'true';
            const toggleBtn = document.getElementById('advanced-toggle');
            if (toggleBtn && typeof toggleBtn.setAdvanced === 'function') toggleBtn.setAdvanced(shouldBeAdvanced);
        }
        calculateResults();
    },

    preparePrintData() {
        // --- 1. Gather all Data (Both Modes) ---
        const clean = (id) => parseFloat(document.getElementById(id).value) || 0;
        const fmt = (n) => '$' + n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        const fmtPct = (n) => n.toFixed(2) + '%';
        const dateStr = new Date().toLocaleDateString();

        // State Context
        const stateSelect = document.getElementById('stateSelector');
        const stateName = stateSelect.options[stateSelect.selectedIndex].text;
        const stateCode = stateSelect.value;
        const stateData = US_STATE_DATA[stateCode] || US_STATE_DATA['GA'];

        // Mode A Data
        const valA = clean('input_carValueA');
        const milA = clean('input_mileageA');
        const capPct = clean('input_capA') / 100;
        const sevSelect = document.getElementById('severityA');
        const sevVal = parseFloat(sevSelect.value);
        const sevText = sevSelect.options[sevSelect.selectedIndex].text;
        
        let milFactor = 1.0;
        if (milA >= 100000) milFactor = 0.0;
        else if (milA >= 80000) milFactor = 0.2;
        else if (milA >= 60000) milFactor = 0.4;
        else if (milA >= 40000) milFactor = 0.6;
        else if (milA >= 20000) milFactor = 0.8;

        const baseLoss = valA * capPct;
        const formulaDV = baseLoss * sevVal * milFactor;

        // Mode A Analyst Note (Extracted from active DOM if available, or generated generic)
        const summaryElemA = document.getElementById('res_summaryTextA');
        const noteA = summaryElemA ? summaryElemA.innerText : "Calculation based on standard formula modifiers.";

        // Mode B Data
        const preVal = clean('input_preValB');
        const postVal = clean('input_postValB');
        const offer = clean('input_insuranceOfferB');
        const taxRate = clean('input_taxRateB') / 100;

        const rawLoss = Math.max(0, preVal - postVal);
        const taxAmt = rawLoss * taxRate;
        const trueLoss = rawLoss + taxAmt;
        const gap = Math.max(0, trueLoss - offer);

        // Mode B Analyst Note (Bug Fix: Explicitly check and fill if empty)
        const defaultNoteB = "The insurance offer closely mirrors the standard 17c Formula result rather than actual market data. The discrepancy suggests the settlement is based on a generalized algorithm, not an assessment of this specific vehicle's actual resale value.";
        let noteB = "";
        const summaryElemB = document.getElementById('res_summaryTextB');
        // Check if text exists and is substantial, otherwise use default
        if (summaryElemB && summaryElemB.innerText.trim().length > 15) {
             noteB = summaryElemB.innerText;
        } else {
             noteB = defaultNoteB;
        }

        // --- 2. Build the Official Document HTML ---
        // Replacing the contents of #print-view-container completely
        const printContainer = document.getElementById('print-view-container');
        
        printContainer.innerHTML = `
            <div class="doc-wrapper">
                <!-- HEADER -->
                <div class="doc-header">
                    <img src="../../img/Logo_Gold.webp" alt="Solveria Logo" class="doc-logo">
                    <div class="doc-title-block">
                        <h1>DIMINISHED VALUE ANALYSIS REPORT</h1>
                        <h2>MARKET VS. FORMULA COMPARISON</h2>
                    </div>
                </div>

                <!-- META INFO -->
                <div class="doc-meta-grid">
                    <div class="meta-row">
                        <span class="meta-label">PREPARED BY:</span>
                        <span class="meta-line">_____________________________ (Vehicle Owner)</span>
                        <span class="meta-label">DATE:</span>
                        <span class="meta-val">${dateStr}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">CLAIM NUMBER:</span>
                        <span class="meta-line">_____________________________</span>
                        <span class="meta-label">VIN:</span>
                        <span class="meta-line">_____________________________</span>
                    </div>
                </div>

                <!-- SECTION I: CONTEXT -->
                <div class="doc-section">
                    <div class="section-title">I. JURISDICTIONAL CONTEXT (${stateName.toUpperCase()})</div>
                    <div class="section-content">
                        <div class="context-box">
                            <p><strong>LEGAL STATUS:</strong> ${stateData.status}</p>
                            <p class="context-tip"><strong>NOTE:</strong> ${stateData.tip}</p>
                        </div>
                    </div>
                </div>

                <!-- SECTION II: INSURER VIEW -->
                <div class="doc-section">
                    <div class="section-title">II. THE INSURER'S ALGORITHM (17C FORMULA ESTIMATE)</div>
                    <div class="section-content">
                        <div class="data-grid">
                            <div class="data-col">
                                <div class="data-row"><span class="lbl">Vehicle Market Value (NADA/KBB)</span><span class="val">${fmt(valA)}</span></div>
                                <div class="data-row"><span class="lbl">Reported Mileage</span><span class="val">${milA.toLocaleString()} mi</span></div>
                                <div class="data-row"><span class="lbl">Damage Severity Modifier</span><span class="val">${sevVal.toFixed(2)} (${sevText})</span></div>
                                <div class="data-row"><span class="lbl">Formula Cap Limit</span><span class="val">${(capPct * 100).toFixed(2)}%</span></div>
                            </div>
                            <div class="data-col">
                                <div class="data-row"><span class="lbl">Mileage Factor Applied</span><span class="val">${milFactor.toFixed(2)}</span></div>
                                <div class="data-row"><span class="lbl">Base Loss Cap</span><span class="val">${fmt(baseLoss)}</span></div>
                                <div class="data-row highlight"><span class="lbl bold">ESTIMATED 17C PAYOUT</span><span class="val bold">${fmt(formulaDV)}</span></div>
                            </div>
                        </div>
                        <div class="analyst-note">
                            <strong>ANALYST NOTE:</strong> ${noteA}
                        </div>
                    </div>
                </div>

                <!-- SECTION III: MARKET VIEW -->
                <div class="doc-section">
                    <div class="section-title">III. THE MARKET REALITY (EMPIRICAL DATA)</div>
                    <div class="section-content">
                        <div class="data-grid">
                            <div class="data-col">
                                <div class="data-row"><span class="lbl">Pre-Accident Vehicle Value</span><span class="val">${fmt(preVal)}</span></div>
                                <div class="data-row"><span class="lbl">Post-Repair Trade-In Offer</span><span class="val">${fmt(postVal)}</span></div>
                                <div class="data-row"><span class="lbl">Current Insurance Offer</span><span class="val">${fmt(offer)}</span></div>
                                <div class="data-row"><span class="lbl">Applicable Sales Tax Rate</span><span class="val">${(taxRate * 100).toFixed(2)}%</span></div>
                            </div>
                            <div class="data-col">
                                <div class="data-row"><span class="lbl">Raw Market Loss</span><span class="val">${fmt(rawLoss)}</span></div>
                                <div class="data-row"><span class="lbl">Sales Tax Equity Loss</span><span class="val">${fmt(taxAmt)}</span></div>
                                <div class="data-row highlight"><span class="lbl bold">TRUE MARKET LOSS</span><span class="val bold">${fmt(trueLoss)}</span></div>
                            </div>
                        </div>
                        <div class="analyst-note">
                            <strong>ANALYST NOTE:</strong> ${noteB}
                        </div>
                    </div>
                </div>

                <!-- SECTION IV: SUMMARY -->
                <div class="doc-section summary-box">
                    <div class="section-title">IV. DISCREPANCY SUMMARY</div>
                    <div class="section-content">
                        <div class="summary-grid">
                            <div class="sum-row"><span class="lbl">INSURANCE FORMULA ASSESSMENT</span><span class="val">${fmt(formulaDV)}</span></div>
                            <div class="sum-row"><span class="lbl">ACTUAL MARKET ASSESSMENT</span><span class="val">${fmt(trueLoss)}</span></div>
                            <div class="sum-row final"><span class="lbl">TOTAL UNCOMPENSATED LOSS (THE GAP)</span><span class="val bad">${fmt(gap)}</span></div>
                        </div>
                    </div>
                </div>

                <!-- FOOTER -->
                <div class="doc-footer">
                    <div class="signature-line">
                        <div class="sig-block">
                            <span class="sig-rule">___________________________________________________</span>
                            <span class="sig-label">SIGNATURE OF CLAIMANT / OWNER</span>
                        </div>
                        <div class="sig-block">
                            <span class="sig-rule">__________________________</span>
                            <span class="sig-label">DATE</span>
                        </div>
                    </div>
                    
                    <!-- DISCLAIMER -->
                    <div class="legal-disclaimer">
                        <strong>LEGAL & METHODOLOGY DISCLAIMER:</strong> This Diminished Value Analysis Report is generated automatically for informational and negotiation purposes only. The figures presented are estimates derived from standard industry algorithms (including the 17c formula) and static jurisdictional data models, rather than live market API feeds or a certified physical vehicle inspection. This document does not constitute legal advice, a binding financial guarantee, or a certified professional appraisal. Users are encouraged to verify trade-in values with local dealerships. Claimants assume all responsibility for how this data is utilized in settlement negotiations.
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

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    populateStateData();
    initializeCustomDropdowns();
    initializeModes();
    initializeAdvancedToggle();
    initializeTooltips();
    initializeCopyButton();
    calculateResults();
    ToolFeatures.init();
});