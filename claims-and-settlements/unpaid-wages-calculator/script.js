/* --- START OF FILE script.js --- */

/* ============================================================
   THE ARC REACTOR — US LABOR LAW DATASET (EMBEDDED)
   ============================================================ */

const FEDERAL_DEFAULTS = {
    minWage: 7.25,
    otType: "weekly",
    dailyThreshold: null,
    weeklyThreshold: 40,
    statuteYears: 2,
    waitingPenalty: false,
    protectionLevel: "Federal Base",
    notes: "Applies federal FLSA standards."
};

// UPDATED 2026 MINIMUM WAGE DATA FOR KEY STATES
const STATE_LABOR_DATA = {
    AK: { name: "Alaska", protectionLevel: "High", minWage: 11.73, otType: "daily", dailyThreshold: 8, statuteYears: 2, waitingPenalty: true },
    CA: { name: "California", protectionLevel: "High", minWage: 16.90, otType: "daily", dailyThreshold: 8, statuteYears: 3, waitingPenalty: true, notes: "Daily OT >8h, Double time >12h." },
    CO: { name: "Colorado", protectionLevel: "Moderate", minWage: 14.42, otType: "daily", dailyThreshold: 12, statuteYears: 2, waitingPenalty: true },
    NV: { name: "Nevada", protectionLevel: "Moderate", minWage: 12.00, otType: "daily", dailyThreshold: 8, statuteYears: 2, waitingPenalty: true },
    
    /* NEW YORK 2026 DATA ENGINE */
    NY: { 
        name: "New York", 
        protectionLevel: "High", 
        minWage: 16.00, /* Safe Baseline (Upstate). Logic detects violations. */
        otType: "weekly", 
        statuteYears: 6, /* 6-Year Statute */
        waitingPenalty: false, /* No waiting penalties per NY Labor Law */
        notes: "6-Year Statute. WTPA Paperwork Penalties. Spread of Hours." 
    },

    /* TEXAS 2026 DATA ENGINE */
    TX: {
        name: "Texas",
        protectionLevel: "Federal Base (TWC)",
        minWage: 7.25,
        tippedMin: 2.13,
        otType: "weekly",
        statuteYears: 2, /* FLSA Standard, but TWC is 180 days */
        waitingPenalty: false, /* No daily waiting penalty */
        notes: "180-Day TWC Deadline. 6-Day Final Pay (Fired)."
    },

    OR: { name: "Oregon", protectionLevel: "High", minWage: 14.20, otType: "weekly", statuteYears: 6, waitingPenalty: true },
    WA: { name: "Washington", protectionLevel: "High", minWage: 16.28, otType: "weekly", statuteYears: 3, waitingPenalty: false },
    MA: { name: "Massachusetts", protectionLevel: "High", minWage: 15.00, otType: "weekly", statuteYears: 3, waitingPenalty: true },
    ME: { name: "Maine", protectionLevel: "High", minWage: 14.15, otType: "weekly", statuteYears: 6, waitingPenalty: true },
    KY: { name: "Kentucky", protectionLevel: "Moderate", minWage: 7.25, otType: "weekly", statuteYears: 5, waitingPenalty: false },
    NM: { name: "New Mexico", protectionLevel: "Moderate", minWage: 12.00, otType: "weekly", statuteYears: 3, waitingPenalty: true },
    AL: { name: "Alabama", minWage: 7.25, protectionLevel: "Federal Base" },
    AZ: { name: "Arizona", minWage: 14.35, protectionLevel: "Moderate", waitingPenalty: true },
    AR: { name: "Arkansas", minWage: 11.00, protectionLevel: "Federal Base", waitingPenalty: true },
    CT: { name: "Connecticut", minWage: 15.69, protectionLevel: "High", waitingPenalty: true },
    DE: { name: "Delaware", minWage: 13.25, protectionLevel: "Moderate", waitingPenalty: true },
    DC: { name: "District of Columbia", minWage: 17.00, protectionLevel: "High", statuteYears: 3, waitingPenalty: true },
    
    /* FLORIDA 2026 DATA ENGINE */
    FL: { 
        name: "Florida", 
        minWage: 14.00, 
        tippedMin: 10.98, /* The Double-Floor */
        protectionLevel: "State Constitution", 
        otType: "weekly",
        statuteYears: 5, /* 4 Years + 1 for Willful */
        waitingPenalty: false, /* No penalty per logic */
        notes: "Constitutional Min Wage. 15-day notice required."
    },

    GA: { name: "Georgia", minWage: 7.25, protectionLevel: "Federal Base" },
    HI: { name: "Hawaii", minWage: 14.00, protectionLevel: "Moderate", statuteYears: 6, waitingPenalty: true },
    ID: { name: "Idaho", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    IL: { name: "Illinois", minWage: 14.00, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },
    IN: { name: "Indiana", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    IA: { name: "Iowa", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    KS: { name: "Kansas", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    LA: { name: "Louisiana", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    MD: { name: "Maryland", minWage: 15.00, protectionLevel: "Moderate", statuteYears: 3 },
    MI: { name: "Michigan", minWage: 10.33, protectionLevel: "Moderate", statuteYears: 3 },
    MN: { name: "Minnesota", minWage: 10.85, protectionLevel: "Moderate", weeklyThreshold: 48, waitingPenalty: true },
    MS: { name: "Mississippi", minWage: 7.25, protectionLevel: "Federal Base" },
    MO: { name: "Missouri", minWage: 12.30, protectionLevel: "Moderate", waitingPenalty: true },
    MT: { name: "Montana", minWage: 10.30, protectionLevel: "Federal Base", waitingPenalty: true },
    NE: { name: "Nebraska", minWage: 12.00, protectionLevel: "Federal Base" },
    NH: { name: "New Hampshire", minWage: 7.25, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },
    NJ: { name: "New Jersey", minWage: 15.13, protectionLevel: "High", waitingPenalty: false },
    NC: { name: "North Carolina", minWage: 7.25, protectionLevel: "Federal Base" },
    ND: { name: "North Dakota", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    OH: { name: "Ohio", minWage: 10.45, protectionLevel: "Moderate" },
    OK: { name: "Oklahoma", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    PA: { name: "Pennsylvania", minWage: 7.25, protectionLevel: "Moderate", statuteYears: 3, waitingPenalty: true },
    RI: { name: "Rhode Island", minWage: 14.00, protectionLevel: "High", statuteYears: 3, waitingPenalty: true },
    SC: { name: "South Carolina", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    SD: { name: "South Dakota", minWage: 11.20, protectionLevel: "Federal Base" },
    TN: { name: "Tennessee", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    UT: { name: "Utah", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    VT: { name: "Vermont", minWage: 13.67, protectionLevel: "Moderate", waitingPenalty: true },
    VA: { name: "Virginia", minWage: 12.00, protectionLevel: "Moderate", statuteYears: 3 },
    WV: { name: "West Virginia", minWage: 8.75, protectionLevel: "Federal Base", waitingPenalty: true },
    WI: { name: "Wisconsin", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true },
    WY: { name: "Wyoming", minWage: 7.25, protectionLevel: "Federal Base", waitingPenalty: true }
};

function getStateData(stateCode) {
    const code = stateCode ? stateCode.toUpperCase() : "UNKNOWN";
    const state = STATE_LABOR_DATA[code];
    if (!state) {
        return { ...FEDERAL_DEFAULTS, code: code, name: code || "Unknown" };
    }
    return { ...FEDERAL_DEFAULTS, ...state, code: code };
}

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases =[
    "Unpaid hours are donated hours.",
    "Understand your rights. Reclaim your time.",
    "Know the value of your time.",
    "See what you are truly owed."
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
/* Slider & Input Configuration */
/* ============================ */

const SLIDER_CONFIG = {
    compA: { type: 'cubic', max: 5000 }, 
    hoursA: { type: 'linear', max: 120 }, 
    offClockA: { type: 'linear', max: 120 },
    wagesB: { type: 'cubic', max: 50000 }, 
    rateB: { type: 'cubic', max: 200 }, 
    lateDaysB: { type: 'linear', max: 60 }
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
                else realVal = Math.round(realVal * 10) / 10;
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
/* State Dropdown Population    */
/* ============================ */
function populateStateDropdown() {
    const select = document.getElementById('workLocation');
    if (!select) return;

    const wrapper = select.closest('.custom-dropdown-container');
    const optionsWrapper = wrapper.querySelector('.dropdown-options-wrapper');
    
    optionsWrapper.innerHTML = '';
    select.innerHTML = '';

    const sortedKeys = Object.keys(STATE_LABOR_DATA).sort();

    sortedKeys.forEach(code => {
        const stateName = STATE_LABOR_DATA[code].name;
        const opt = document.createElement('option');
        opt.value = code;
        opt.textContent = stateName;
        if(code === 'CA') opt.selected = true; 
        select.appendChild(opt);

        const div = document.createElement('div');
        div.className = 'dropdown-option';
        if(code === 'CA') {
            div.classList.add('selected');
            div.setAttribute('aria-selected', 'true');
        } else {
            div.setAttribute('aria-selected', 'false');
        }
        div.setAttribute('role', 'option');
        div.setAttribute('data-value', code);
        div.textContent = stateName;
        optionsWrapper.appendChild(div);
    });

    initializeCustomDropdowns();
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        const options = wrapper.querySelectorAll('.dropdown-option');

        trigger.onclick = (e) => {
            e.stopPropagation();
            const isExpanded = menu.classList.contains('active');
            
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) {
                    m.classList.remove('active');
                    if (m.previousElementSibling) m.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });
            
            if (!isExpanded) {
                menu.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                menu.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
            }
        };

        options.forEach(option => {
            option.onclick = (e) => {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                trigger.textContent = option.textContent;
                options.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.setAttribute('aria-selected', 'false');
                });
                option.classList.add('selected');
                option.setAttribute('aria-selected', 'true');
                menu.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
                calculateResults(); 
            };
        });
    });

    document.onclick = (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
                if(menu.previousElementSibling) menu.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });
    };
}

/* ============================ */
/* Custom Calendar Logic 2.0    */
/* (Multi-View: Day/Month/Year) */
/* ============================ */
function initializeCustomCalendars() {
    const dateInputs = document.querySelectorAll('.custom-date-trigger');
    const monthNames =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    dateInputs.forEach(input => {
        // FIX: Ensure default Start Date is 1 Year Ago, and End Date is Today
        if (!input.value) {
            const d = new Date();
            if (input.id === 'date_endB' || input.id === 'date_startA') {
                d.setFullYear(d.getFullYear() - 1);
            }
            input.value = d.toISOString().split('T')[0];
        }
    });

    dateInputs.forEach(input => {
        const wrapper = input.parentElement;
        const calendar = document.createElement('div');
        calendar.className = 'custom-calendar-popup';
        wrapper.appendChild(calendar);

        let viewMode = 'day'; 
        let viewDate = new Date(); 
        
        if(input.value) {
            const parts = input.value.split('-');
            if(parts.length === 3) viewDate = new Date(parts[0], parts[1]-1, parts[2]);
        }

        const render = () => {
            calendar.innerHTML = '';
            
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.padding = '5px 0 10px 0';
            header.style.borderBottom = '1px solid #eee';
            header.style.marginBottom = '5px';

            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&larr;';
            prevBtn.className = 'calendar-nav-btn';
            prevBtn.type = 'button';
            prevBtn.setAttribute('aria-label', 'Previous');
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&rarr;';
            nextBtn.className = 'calendar-nav-btn';
            nextBtn.type = 'button';
            nextBtn.setAttribute('aria-label', 'Next');

            const titleContainer = document.createElement('div');
            titleContainer.className = 'calendar-title-container';
            titleContainer.style.display = 'flex';
            titleContainer.style.gap = '8px';
            titleContainer.style.cursor = 'pointer';
            titleContainer.style.fontWeight = '500';

            if (viewMode === 'day') {
                const monthSpan = document.createElement('span');
                monthSpan.textContent = monthNames[viewDate.getMonth()];
                monthSpan.onclick = (e) => { e.stopPropagation(); viewMode = 'month'; render(); };
                
                const yearSpan = document.createElement('span');
                yearSpan.textContent = viewDate.getFullYear();
                yearSpan.onclick = (e) => { e.stopPropagation(); viewMode = 'year'; render(); };
                
                titleContainer.appendChild(monthSpan);
                titleContainer.appendChild(yearSpan);

                prevBtn.onclick = (e) => { e.stopPropagation(); viewDate.setMonth(viewDate.getMonth() - 1); render(); };
                nextBtn.onclick = (e) => { e.stopPropagation(); viewDate.setMonth(viewDate.getMonth() + 1); render(); };

            } else if (viewMode === 'month') {
                const yearSpan = document.createElement('span');
                yearSpan.textContent = viewDate.getFullYear();
                yearSpan.onclick = (e) => { e.stopPropagation(); viewMode = 'year'; render(); };
                titleContainer.appendChild(yearSpan);

                prevBtn.onclick = (e) => { e.stopPropagation(); viewDate.setFullYear(viewDate.getFullYear() - 1); render(); };
                nextBtn.onclick = (e) => { e.stopPropagation(); viewDate.setFullYear(viewDate.getFullYear() + 1); render(); };

            } else if (viewMode === 'year') {
                const startYear = Math.floor(viewDate.getFullYear() / 20) * 20;
                const endYear = startYear + 19;
                
                const rangeSpan = document.createElement('span');
                rangeSpan.textContent = `${startYear} - ${endYear}`;
                titleContainer.appendChild(rangeSpan);

                prevBtn.onclick = (e) => { e.stopPropagation(); viewDate.setFullYear(viewDate.getFullYear() - 20); render(); };
                nextBtn.onclick = (e) => { e.stopPropagation(); viewDate.setFullYear(viewDate.getFullYear() + 20); render(); };
            }

            header.appendChild(prevBtn);
            header.appendChild(titleContainer);
            header.appendChild(nextBtn);
            calendar.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'calendar-grid-content';
            
            if (viewMode === 'day') {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
                grid.style.textAlign = 'center';
                grid.style.gap = '2px';['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => {
                    const dh = document.createElement('div');
                    dh.style.fontSize = '0.75rem'; dh.style.color = '#595959'; dh.style.padding = '5px 0';
                    dh.textContent = d;
                    grid.appendChild(dh);
                });

                const year = viewDate.getFullYear();
                const month = viewDate.getMonth();
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                for(let i=0; i<firstDay; i++) {
                    grid.appendChild(document.createElement('div'));
                }

                for(let i=1; i<=daysInMonth; i++) {
                    const dayEl = document.createElement('div');
                    dayEl.textContent = i;
                    dayEl.style.padding = '6px 0';
                    dayEl.style.cursor = 'pointer';
                    dayEl.style.borderRadius = '4px';
                    dayEl.style.fontSize = '0.9rem';

                    const val = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
                    if (input.value === val) {
                        dayEl.style.backgroundColor = '#B5855E';
                        dayEl.style.color = '#fff';
                    } else {
                        dayEl.onmouseover = () => dayEl.style.backgroundColor = '#f0f0f0';
                        dayEl.onmouseout = () => dayEl.style.backgroundColor = 'transparent';
                    }

                    dayEl.onclick = (e) => {
                        e.stopPropagation();
                        input.value = val;
                        input.dispatchEvent(new Event('change'));
                        wrapper.classList.remove('active');
                        calendar.classList.remove('active');
                        calculateResults();
                    };
                    grid.appendChild(dayEl);
                }

            } else if (viewMode === 'month') {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                grid.style.gap = '10px';
                grid.style.padding = '10px 0';

                monthNames.forEach((m, index) => {
                    const mEl = document.createElement('div');
                    mEl.textContent = m.substring(0, 3);
                    mEl.style.padding = '10px 0';
                    mEl.style.textAlign = 'center';
                    mEl.style.cursor = 'pointer';
                    mEl.style.borderRadius = '4px';
                    mEl.style.fontSize = '0.95rem';
                    
                    if (index === viewDate.getMonth()) {
                        mEl.style.backgroundColor = '#B5855E';
                        mEl.style.color = '#fff';
                    } else {
                        mEl.style.backgroundColor = '#f9f9f9';
                        mEl.onmouseover = () => mEl.style.backgroundColor = '#e0e0e0';
                        mEl.onmouseout = () => mEl.style.backgroundColor = '#f9f9f9';
                    }

                    mEl.onclick = (e) => {
                        e.stopPropagation();
                        viewDate.setMonth(index);
                        viewMode = 'day';
                        render();
                    };
                    grid.appendChild(mEl);
                });

            } else if (viewMode === 'year') {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                grid.style.gap = '10px';
                grid.style.padding = '10px 0';

                const startYear = Math.floor(viewDate.getFullYear() / 20) * 20;
                
                for (let i = 0; i < 20; i++) {
                    const y = startYear + i;
                    const yEl = document.createElement('div');
                    yEl.textContent = y;
                    yEl.style.padding = '10px 0';
                    yEl.style.textAlign = 'center';
                    yEl.style.cursor = 'pointer';
                    yEl.style.borderRadius = '4px';
                    yEl.style.fontSize = '0.95rem';

                    if (y === viewDate.getFullYear()) {
                        yEl.style.backgroundColor = '#B5855E';
                        yEl.style.color = '#fff';
                    } else {
                        yEl.style.backgroundColor = '#f9f9f9';
                        yEl.onmouseover = () => yEl.style.backgroundColor = '#e0e0e0';
                        yEl.onmouseout = () => yEl.style.backgroundColor = '#f9f9f9';
                    }

                    yEl.onclick = (e) => {
                        e.stopPropagation();
                        viewDate.setFullYear(y);
                        viewMode = 'month';
                        render();
                    };
                    grid.appendChild(yEl);
                }
            }

            calendar.appendChild(grid);
        };

        input.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-calendar-popup.active').forEach(c => {
                if(c !== calendar) c.classList.remove('active');
            });
            
            if(calendar.classList.contains('active')) {
                calendar.classList.remove('active');
                wrapper.classList.remove('active');
            } else {
                if(input.value) {
                    const parts = input.value.split('-');
                    if(parts.length === 3) viewDate = new Date(parts[0], parts[1]-1, parts[2]);
                }
                viewMode = 'day';
                render();
                calendar.classList.add('active');
                wrapper.classList.add('active');
            }
        };
        
        calendar.onclick = (e) => e.stopPropagation();
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-calendar-popup.active').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.custom-date-wrapper.active').forEach(w => w.classList.remove('active'));
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
            if(inputSection) inputSection.classList.remove('hidden');

            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            const resultSection = document.getElementById(`${modeId}-results`);
            if(resultSection) resultSection.classList.remove('hidden');

            const container = document.getElementById('results-display-container');
            if (container) container.scrollTop = 0;
            
            // Recalculate immediately on switch
            calculateResults();
        });
    });
}

function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    if(!btn) return;
    let isAdvanced = false;

    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";
        document.querySelectorAll('.advanced-content').forEach(el => {
            el.classList.toggle('hidden', !isAdvanced);
        });
        // Trigger recalc to update dynamic summary text
        calculateResults();
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

/* ============================ */
/* THE ARC REACTOR ENGINE       */
/* ============================ */

function getInputs() {
    const locInput = document.getElementById('workLocation');
    if(!locInput) return null;

    return {
        state: locInput.value,
        payType: document.getElementById('payStructureA').value,
        rate: cleanNumber(document.getElementById('input_compA').value),
        hours: cleanNumber(document.getElementById('input_hoursA').value),
        start: document.getElementById('date_startA').value,
        end: document.getElementById('date_endA').value,
        mitigation: document.getElementById('mitigationA').value,
        offClock: cleanNumber(document.getElementById('input_offClockA').value),
        lunch: document.getElementById('lunchA').value === 'yes',
        fluctuating: document.getElementById('fluctuatingA').value === 'yes',
        wagesB: cleanNumber(document.getElementById('input_wagesB').value),
        rateB: cleanNumber(document.getElementById('input_rateB').value), 
        dateB: document.getElementById('date_endB').value,             
        intent: document.getElementById('intentB').value,
        empStatus: document.getElementById('empStatusB').value,
        lateDays: cleanNumber(document.getElementById('input_lateDaysB').value),
        // Mode B Checkbox States
        checkRecords: document.getElementById('check_records').checked,
        checkMisclass: document.getElementById('check_misclass').checked,
        checkDeduct: document.getElementById('check_deduct').checked
    };
}

function calculateResults() {
    const inputs = getInputs();
    if (!inputs) return; 

    // --- DATE VALIDATION LOGIC ---
    if (inputs.start && inputs.end) {
        const dStart = new Date(inputs.start);
        const dEnd = new Date(inputs.end);
        
        if (!isNaN(dStart) && !isNaN(dEnd)) {
            if (dEnd < dStart) {
                inputs.end = inputs.start; 
            }
        }
    }

    const stateData = getStateData(inputs.state);

    // Date Range Calculation
    let weeks = 1; 
    if (inputs.start && inputs.end) {
        const start = new Date(inputs.start);
        const end = new Date(inputs.end);
        if(!isNaN(start) && !isNaN(end)) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
            weeks = diffDays / 7;
        }
    }

    // --- NEW MATH ENGINE: "EARNED VS PAID" RECONCILIATION ---
    // Total Weekly Hours (Including recorded hours + entirely hidden hours)
    let hiddenHours = (inputs.offClock / 60 * 5) + (inputs.lunch ? 2.5 : 0);
    let totalWeeklyHours = inputs.hours + hiddenHours;

    // Apportion actual hours worked into Straight, OT, DT based on legal constraints
    let actualStraight = 0;
    let actualOT = 0;
    let actualDT = 0;

    if (stateData.otType === 'daily') {
        const dailyHrs = totalWeeklyHours / 5;
        const dThresh = stateData.dailyThreshold || 8;
        
        let dStraight = Math.min(dailyHrs, dThresh);
        let dOt = Math.max(0, dailyHrs - dThresh);
        let dDt = 0;

        // California Double Time Rule
        if (inputs.state === 'CA' && dailyHrs > 12) {
            dDt = dailyHrs - 12;
            dOt = 4; // Max daily OT before DT is 4 hours (12 - 8)
        }

        actualStraight = dStraight * 5;
        actualOT = dOt * 5;
        actualDT = dDt * 5;

        // FLSA Weekly Base Check: Straight time can NEVER exceed 40 hours per week legally
        if (actualStraight > 40) {
            actualOT += (actualStraight - 40);
            actualStraight = 40;
        }
    } else {
        const wThresh = stateData.weeklyThreshold || 40;
        actualStraight = Math.min(totalWeeklyHours, wThresh);
        actualOT = Math.max(0, totalWeeklyHours - wThresh);
        actualDT = 0;
    }

    let earnedWages = 0;
    let paidWages = 0;
    let regularRate = 0;

    if (inputs.payType === 'hourly') {
        regularRate = inputs.rate;
        
        // 1. Calculate Legally Earned Wages (Based on ALL actual hours)
        earnedWages = (actualStraight * regularRate) + (actualOT * regularRate * 1.5) + (actualDT * regularRate * 2.0);

        // 2. Calculate Employer's Actual Pay (Based ONLY on recorded hours & mitigation input)
        const recStraight = Math.min(inputs.hours, 40);
        const recOT = Math.max(0, inputs.hours - 40); 

        if (inputs.mitigation === 'none') {
            // Employer paid ZERO for any overtime. Paid straight time for recorded base hours only.
            paidWages = recStraight * inputs.rate;
        } else if (inputs.mitigation === 'straight') {
            // Employer paid straight time (1.0x) for ALL recorded hours, but robbed the 0.5x premium
            paidWages = inputs.hours * inputs.rate;
        } else if (inputs.mitigation === 'partial') {
            // Employer tried to pay OT, but miscalculated it (assumes paid 1.25x instead of 1.5x for recorded OT)
            paidWages = (recStraight * inputs.rate) + (recOT * inputs.rate * 1.25);
        }

    } else {
        // Condition: SALARY MISCLASSIFICATION
        if (stateData.protectionLevel === 'High') {
            // High protection states (e.g. CA) strictly void FWW methods for misclassified workers. 
            // The weekly salary only compensates for the first 40 hours.
            regularRate = inputs.rate / 40;
            earnedWages = inputs.rate + (actualOT * regularRate * 1.5) + (actualDT * regularRate * 2.0);
        } else {
            // Federal FLSA standard Fluctuating Workweek (FWW) assumption for misclassified salaries.
            // The salary legally covered ALL straight time and the straight portion of OT.
            regularRate = totalWeeklyHours > 0 ? (inputs.rate / totalWeeklyHours) : 0;
            // Only the 0.5x half-time premium (or 1.0x for DT) is owed.
            earnedWages = inputs.rate + (actualOT * regularRate * 0.5) + (actualDT * regularRate * 1.0);
        }
        // The employer paid exactly the flat salary
        paidWages = inputs.rate;
    }

    // 3. Final Reconciliation: Theft is simply what was legally earned minus what was paid
    let weeklyTheft = Math.max(0, earnedWages - paidWages);
    
    const totalBaseDebt = weeklyTheft * weeks;
    // Donated hours are all hours worked beyond straight time
    const donatedHoursTotal = (actualOT + actualDT) * weeks;

    // Real Hourly Rate Calculation (Based on actual pay vs actual physical hours)
    const realHourlyRate = totalWeeklyHours > 0 ? (paidWages / totalWeeklyHours) : 0;

    // --- SUB-MINIMUM WAGE CHECK ---
    const stateMin = stateData.minWage || 7.25;
    // Mode A Check
    const isSubMinWageA = (inputs.payType === 'hourly' && inputs.rate < stateMin);
    // Mode B Check (Always treats rateB as the hourly base for penalty calc)
    const isSubMinWageB = (inputs.rateB < stateMin);

    let federalDamages = 0;
    let statePenalty = 0;

    if (inputs.intent === 'willful') {
        federalDamages = inputs.wagesB; 
    }

    // WAIT PENALTY LOGIC: Check state data flag
    if (stateData.waitingPenalty && inputs.empStatus === 'terminated') {
        const dailyRate = inputs.rateB * 8; 
        const penaltyDays = Math.min(inputs.lateDays, 30);
        statePenalty = dailyRate * penaltyDays;
    } else {
        statePenalty = 0; // Explicitly 0 for FL/NY/TX or other states without penalty
    }

    const totalClaimB = inputs.wagesB + federalDamages + statePenalty;

    let yearsPassed = 0;
    if (inputs.dateB) {
        const violationDate = new Date(inputs.dateB);
        if(!isNaN(violationDate)) {
            const today = new Date();
            const diffTime = Math.abs(today - violationDate);
            yearsPassed = diffTime / (1000 * 60 * 60 * 24 * 365);
        }
    }

    updateUI({
        totalBaseDebt,
        donatedHoursTotal,
        regularRate,
        realRate: realHourlyRate,
        weeklyHours: totalWeeklyHours,
        protection: stateData.protectionLevel,
        federalDamages,
        statePenalty,
        totalClaimB,
        yearsPassed,
        state: inputs.state,
        fluctuating: inputs.fluctuating,
        isSubMinWage: isSubMinWageA,
        isSubMinWageB: isSubMinWageB,
        inputs: inputs, // Pass full inputs for advanced checks
        // Mode B Checklist States
        checkRecords: inputs.checkRecords,
        checkMisclass: inputs.checkMisclass,
        checkDeduct: inputs.checkDeduct
    });
}

function updateUI(data) {
    const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const modeAResults = document.getElementById('mode-a-results');
    const modeBResults = document.getElementById('mode-b-results');
    
    const isAdvanced = !document.querySelector('.advanced-content').classList.contains('hidden');

    // --- STATE FOMO UNDER WORK LOCATION INPUT ---
    const workLocInput = document.getElementById('workLocation');
    if (workLocInput) {
        const locWrapper = workLocInput.closest('.input-wrapper');
        if (locWrapper) {
            let stateFomo = document.getElementById('global-state-fomo');
            if (!stateFomo) {
                stateFomo = document.createElement('div');
                stateFomo.id = 'global-state-fomo';
                locWrapper.appendChild(stateFomo);
            }
            
            let fomoHTML = '';
            if (data.state === 'CA') {
                fomoHTML += `<div style="margin-top: 15px; padding: 15px; background-color: #BF360C; box-shadow: 0 4px 15px rgba(191, 54, 12, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.85rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif;"><strong>California Overtime Note:</strong> This tool currently estimates weekly overtime. Because California also requires daily overtime (for shifts over 8 hours), you might be owed additional compensation. A professional review can help calculate your exact daily overtime.</div>`;
            } 
            else if (data.state === 'FL') {
                fomoHTML += `<div style="margin-top: 15px; padding: 15px; background-color: #BF360C; box-shadow: 0 4px 15px rgba(191, 54, 12, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.85rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif;"><strong>Florida Claim Requirement:</strong> Before pursuing a minimum wage claim in Florida, the law asks that you provide your employer with a 15-day written notice. A professional can help draft this notice properly. <br><br><strong>Note:</strong> Florida uses the standard 40-hour federal workweek for overtime.</div>`;
                fomoHTML += `<div style="margin-top: 10px; padding: 15px; background-color: #880E4F; box-shadow: 0 4px 15px rgba(136, 14, 79, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.85rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif;"><strong>Local County Ordinances:</strong> If you worked in Miami-Dade or Pinellas counties, local rules might entitle you to up to three times your missing wages. These local processes can sometimes be faster than state-level claims. A legal professional can help check if your location qualifies.</div>`;
            }
            else if (data.state === 'NY') {
                fomoHTML += `<div style="margin-top: 15px; padding: 15px; background-color: #BF360C; box-shadow: 0 4px 15px rgba(191, 54, 12, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.85rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif;"><strong>New York 'Spread of Hours' Rule:</strong> If your workday spanned more than 10 hours from start to finish (including breaks), New York law generally requires your employer to pay an extra hour of minimum wage for that day. A legal professional can help you add this to your calculation.</div>`;
            }
            else if (data.state !== 'TX') {
                fomoHTML += `<div style="margin-top: 15px; padding: 15px; background-color: #BF360C; box-shadow: 0 4px 15px rgba(191, 54, 12, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.85rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif;"><strong>Federal FLSA Baseline & State Adjustments:</strong> This estimate is built using standard federal FLSA regulations. However, your specific state may have stronger labor laws—such as daily overtime rules, missed meal break compensations, or unique statutory penalties. Because of these additional protections, your actual missing pay could be significantly higher than the federal baseline shown here. A professional review can apply your exact state codes to uncover your full compensation.</div>`;
            }
            
            stateFomo.innerHTML = fomoHTML;
        }
    }

    // --- DYNAMIC MASTER SUMMARY GENERATION ---
    const red = (txt) => `<span style="color:#C0392B; font-weight:600;">${txt}</span>`;
    const yellow = (txt) => `<span style="color:#D35400; font-weight:600;">${txt}</span>`;
    const green = (txt) => `<span style="color:#1E8449; font-weight:600;">${txt}</span>`;
    const bold = (txt) => `<strong>${txt}</strong>`;

    // UPDATED: Increased the font-size of "(Combined Overtime & Penalty Analysis)" from 0.9rem to 1.05rem.
    let summaryHTML = `<h3 class="result-sub-heading" style="margin-top:0; margin-bottom: 15px; font-size: 1.5rem; text-transform: none; letter-spacing: 0;">Your Complete Estimate <span style="font-size: 1.05rem; color: #7a7a7a; font-weight: 300;">(Combined Overtime & Penalty Analysis)</span></h3><p style="font-size: 1.05rem; line-height: 1.6; color: #444; font-family: 'ProductSans-Light', sans-serif; margin: 10px 5px 30px 5px; padding: 25px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 35px -5px rgba(0,0,0,0.1); border: none; box-sizing: border-box; position: relative;">`;

    let advText = "";
    
    if (data.state === 'CA') {
        if (isAdvanced) advText = ` Because of your uncounted hours, your actual earnings effectively dropped to ${yellow(fmt(data.realRate))}. Furthermore, based on your termination date, California guidelines suggest you may be owed an additional ${red(fmt(data.statePenalty))} for late final pay. You are currently ${yellow(data.yearsPassed.toFixed(1))} years into your standard 3-year window to file a claim.`;
        
        summaryHTML += `Based on your inputs, you worked an average of ${bold(data.weeklyHours.toFixed(1))} hours a week in California, resulting in about ${red(data.donatedHoursTotal.toFixed(1) + ' hrs')} of uncompensated time. Your estimated missing pay for standard overtime is around ${red(fmt(data.totalBaseDebt))}.${advText} However, when factoring in California’s strict protections and potential federal damages, your total estimated recovery could be up to ${green(fmt(data.totalClaimB))}. <br><br><em style="font-size:0.9rem; color:#777;">Please note this only calculates weekly overtime; California also requires daily overtime, meaning your actual estimate could be higher.</em>`;
    } 
    else if (data.state === 'NY') {
        let nyExtra = data.checkRecords ? ` Furthermore, you noted missing paperwork, which can carry statutory penalties of up to $10,000 in NY.` : ``;
        if (isAdvanced) advText = ` These unpaid hours effectively dropped your true hourly pay to ${yellow(fmt(data.realRate))}. Based on the dates provided, you are currently ${yellow(data.yearsPassed.toFixed(1))} years into New York's generous 6-year window to recover missing compensation.${nyExtra}`;
        
        summaryHTML += `Based on your inputs, you worked an average of ${bold(data.weeklyHours.toFixed(1))} hours a week in New York, leaving about ${red(data.donatedHoursTotal.toFixed(1) + ' hrs')} of uncompensated time. Your estimated base missing pay is around ${red(fmt(data.totalBaseDebt))}.${advText} Because New York law generally allows workers to claim 'double damages' (liquidated damages), your total estimated recovery could reach ${green(fmt(data.totalClaimB))}. <br><br><em style="font-size:0.9rem; color:#777;">This is an estimate, not a guarantee. Connect with a professional to verify your exact eligibility under New York law.</em>`;
    }
    else if (data.state === 'TX') {
        if (isAdvanced) advText = ` Your uncompensated time effectively dropped your actual pay to ${yellow(fmt(data.realRate))}. <strong style="color:#e67e22;">Urgent Timeline Note:</strong> While federal claims allow 2 to 3 years, Texas state-level claims through the TWC have a strict 180-day deadline. Furthermore, under Texas Payday Law, your final check was due within 6 days of your departure, which may trigger additional compliance reviews.`;
        
        summaryHTML += `Based on your inputs, you worked an average of ${bold(data.weeklyHours.toFixed(1))} hours a week in Texas, resulting in about ${red(data.donatedHoursTotal.toFixed(1) + ' hrs')} of uncompensated time. While Texas follows federal overtime rules, your estimated missing pay is still around ${red(fmt(data.totalBaseDebt))}.${advText} Factoring in potential federal protections, your total estimated recovery could reach up to ${green(fmt(data.totalClaimB))}. <br><br><em style="font-size:0.9rem; color:#777;">Texas operates under federal wage guidelines but has strict local deadlines, so a professional review is highly recommended.</em>`;
    }
    else if (data.state === 'FL') {
        if (isAdvanced) advText = ` Because of your uncounted time, your true hourly earnings dropped to ${yellow(fmt(data.realRate))}. Based on the dates provided, you are ${yellow(data.yearsPassed.toFixed(1))} years into Florida’s 4-to-5 year constitutional window to recover missing funds.`;
        
        summaryHTML += `Based on your inputs, you worked an average of ${bold(data.weeklyHours.toFixed(1))} hours a week in Florida, resulting in about ${red(data.donatedHoursTotal.toFixed(1) + ' hrs')} of uncompensated time. Your estimated missing pay is around ${red(fmt(data.totalBaseDebt))}.${advText} Florida’s constitution offers strong wage protections, meaning your total potential recovery could be up to ${green(fmt(data.totalClaimB))}. <br><br><em style="font-size:0.9rem; color:#777;">Florida requires a specific 15-day legal notice before taking action, so it is highly recommended to have a professional verify your estimate.</em>`;
    }
    else {
        if (isAdvanced) advText = ` These unpaid hours effectively dropped your true hourly pay to ${yellow(fmt(data.realRate))}. Based on your timeline, you are ${yellow(data.yearsPassed.toFixed(1))} years into the standard 2-to-3 year federal window to claim missing compensation.`;
        
        summaryHTML += `Based on your inputs, you worked an average of ${bold(data.weeklyHours.toFixed(1))} hours a week, resulting in about ${red(data.donatedHoursTotal.toFixed(1) + ' hrs')} of uncompensated time. Under standard federal guidelines, your estimated missing pay is around ${red(fmt(data.totalBaseDebt))}.${advText} If specific federal protections apply to your situation, your total potential recovery could reach up to ${green(fmt(data.totalClaimB))}. <br><br><em style="font-size:0.9rem; color:#777;">Your specific state may offer even more protections than the federal baseline, so consider having a professional verify your exact eligibility.</em>`;
    }
    
    // Add the Action Button perfectly styled inside the bottom-left of the card
    summaryHTML += `<br><br><a href="../../contact-us/" class="legal-action-btn">Explore Your Legal Options</a>`;
    summaryHTML += `</p>`;

    let summaryBox = document.getElementById('dynamic-master-summary');
    if (!summaryBox) {
        summaryBox = document.createElement('div');
        summaryBox.id = 'dynamic-master-summary';
        const displayContainer = document.getElementById('results-display-container');
        if (displayContainer) {
            displayContainer.insertBefore(summaryBox, displayContainer.firstChild);
        }
    }
    if (summaryBox) {
        summaryBox.innerHTML = summaryHTML;
    }

    // --- CONDITION SPECIFIC ALERTS UNDER SUMMARY ---
    let alertStack = document.getElementById('global-alert-stack');
    if (!alertStack) {
        alertStack = document.createElement('div');
        alertStack.id = 'global-alert-stack';
        alertStack.style.cssText = 'display: flex; flex-direction: column; gap: 15px; margin: 0 5px 30px 5px;';
        const displayContainer = document.getElementById('results-display-container');
        if (displayContainer && summaryBox) {
            if (summaryBox.nextSibling) {
                displayContainer.insertBefore(alertStack, summaryBox.nextSibling);
            } else {
                displayContainer.appendChild(alertStack);
            }
        }
    }

    if (alertStack) {
        alertStack.innerHTML = ''; // Clear previous alerts
        
        const addAlert = (html, bgColor, shadowColor) => {
            const div = document.createElement('div');
            div.style.cssText = `padding: 20px; background-color: ${bgColor}; box-shadow: 0 4px 15px ${shadowColor}; border-radius: 8px; color: #ffffff; font-size: 0.95rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; font-weight: 500;`;
            div.innerHTML = html;
            alertStack.appendChild(div);
        };

        // 1. NY Liquidated Damages
        if (data.state === 'NY' && data.totalBaseDebt > 0) {
            addAlert("<strong>New York Damages Provision:</strong> Under New York Labor Law, workers with unpaid wage claims are often entitled to 'liquidated damages,' which can double the amount owed to you. Your total compensation may be twice the base amount shown here.", "#34495e", "rgba(52, 73, 94, 0.4)");
        }
        
        // 2. FLSA Complex Claim / Fluctuating
        if (data.state === 'TX' && data.inputs.payType === 'salary' && data.weeklyHours > 40) {
            addAlert("<strong>Day-Rate & Salary Overtime:</strong> Under federal law, paying a flat daily rate or salary without a 1.5x overtime premium for hours over 40 is generally non-compliant. Workers in Texas oilfields and construction frequently have substantial uncounted overtime due to this pay structure. A legal professional can help review your case.", "#C62828", "rgba(198, 40, 40, 0.4)");
        } else if (data.fluctuating) {
            addAlert("<strong>Multiple Pay Rates:</strong> Because you worked at different pay rates, federal guidelines require a 'weighted average' to find your exact overtime rate. This tool offers a baseline estimate using your main rate, but a custom calculation is needed to be completely accurate. A professional can help review your blended rate.", "#C62828", "rgba(198, 40, 40, 0.4)");
        }

        // 3. Sub-Minimum Wage
        const isFlTippedTrap = (data.state === 'FL' && data.inputs.rate < 14.00 && data.inputs.rate >= 10.98);
        if (data.isSubMinWage || data.isSubMinWageB) {
             if (data.state === 'FL') {
                addAlert("<strong>Florida Minimum Wage Note:</strong> The hourly rate entered is below Florida's Constitutional minimum wage of $14.00/hr. You may be entitled to recover the difference, along with potential matching damages. A Florida employment professional can review your total compensation accurately.", "#B71C1C", "rgba(183, 28, 28, 0.5)");
            } else {
                addAlert("<strong>Minimum Wage Adjustment:</strong> The hourly rate entered is currently below your state's minimum wage. This means your calculation should likely include compensation for both the minimum wage difference and your overtime hours. An employment advocate can help combine these figures for a complete estimate.", "#B71C1C", "rgba(183, 28, 28, 0.5)");
            }
        } else if (isFlTippedTrap) {
            addAlert("<strong>Tipped Employee Guidelines:</strong> Your rate indicates a tipped wage. Please note that if a manager or owner participates in your tip pool, the business may be required to pay the full $14.00/hr standard minimum wage for all hours worked, rather than the tipped rate. A legal professional can help review your working relationship.", "#D84315", "rgba(216, 67, 21, 0.5)");
        }

        // 4. Texas Final Pay Timing
        if (data.state === 'TX' && data.inputs.empStatus === 'terminated' && data.inputs.lateDays > 6) {
            addAlert("<strong>Texas Final Pay Timing:</strong> Under the Texas Payday Law, an employee who is let go should generally receive their final paycheck within 6 calendar days. Since this time has passed, you may be entitled to additional compensation. An employment advocate can help review your next steps.", "#C62828", "rgba(198, 40, 40, 0.4)");
        }

        // 5. Records
        if (data.checkRecords) {
            if (data.state === 'NY') {
                addAlert("<strong>New York Recordkeeping Guidelines:</strong> Under the NY Wage Theft Prevention Act, missing paystubs or a lack of a written wage notice at hire can entitle you to up to $10,000 in statutory damages ($5,000 for each). A New York employment professional can help you add this to your claim.", "#BF360C", "rgba(191, 54, 12, 0.4)");
            } else {
                addAlert("<strong>Recordkeeping Allowances:</strong> If your time records were missing or inaccurate, several state labor codes provide up to $4,000.00 in additional statutory compensation. This calculator focuses on hourly wages and doesn't include these paperwork-related amounts. A specialist can check your eligibility.", "#BF360C", "rgba(191, 54, 12, 0.4)");
            }
        }

        // 6. Misclassification
        if (data.checkMisclass) {
            addAlert("<strong>Contractor Status Review:</strong> Being incorrectly classified as an independent contractor (1099) instead of a W-2 employee can shift employer tax burdens onto you. If misclassified, you may be eligible to recover those taxes and receive state compliance compensations. A legal expert can help review your working relationship.", "#B71C1C", "rgba(183, 28, 28, 0.4)");
        }

        // 7. Deductions
        if (data.checkDeduct) {
            addAlert("<strong>Paycheck Deductions:</strong> Standard business expenses, uniform costs, or register shortages generally cannot be deducted from your paycheck. You have the right to request a full reimbursement for these costs. A legal professional can help determine how to include these expenses in your overall estimate.", "#880E4F", "rgba(136, 14, 79, 0.4)");
        }
    }

    // --- Mode A Results Mapping ---
    const protectionEl = document.querySelector('.result-value.good');
    if(protectionEl) protectionEl.textContent = data.protection; 

    const baseDebtEl = document.getElementById('res_baseDebtA');
    if(baseDebtEl) baseDebtEl.textContent = fmt(data.totalBaseDebt);

    const donatedEl = document.getElementById('res_donatedHoursA');
    if(donatedEl) donatedEl.textContent = data.donatedHoursTotal.toFixed(1) + " hrs";

    const realRateEl = document.getElementById('res_realRateA');
    if(realRateEl) realRateEl.textContent = fmt(data.realRate);
    
    // THEFT THERMOMETER
    const thermoFill = document.querySelector('.theft-fill');
    if (thermoFill) {
        const pct = Math.max(0, Math.min(100, (data.weeklyHours - 40) * 2.5));
        thermoFill.style.width = `${pct}%`;
        if (pct < 30) {
            thermoFill.style.backgroundColor = '#2ecc71'; 
            thermoFill.style.boxShadow = '0 10px 20px -2px rgba(46, 204, 113, 0.7)';
        } else if (pct < 70) {
            thermoFill.style.backgroundColor = '#f1c40f'; 
            thermoFill.style.boxShadow = '0 10px 20px -2px rgba(241, 196, 15, 0.7)';
        } else {
            thermoFill.style.backgroundColor = '#e74c3c'; 
            thermoFill.style.boxShadow = '0 10px 20px -2px rgba(231, 76, 60, 0.7)';
        }
    }

    // Mode B Standard Results
    const penEl = document.getElementById('res_penaltyB');
    if(penEl) penEl.textContent = fmt(data.statePenalty);

    const totalEl = document.getElementById('res_totalClaimB');
    if(totalEl) totalEl.textContent = fmt(data.totalClaimB);

    // Stacked Bar Graph
    const total = data.totalClaimB || 1; 
    const wBInput = document.getElementById('input_wagesB');
    const wB = wBInput ? cleanNumber(wBInput.value) : 0;
    
    const pBase = (wB / total) * 100;
    const pFed = (data.federalDamages / total) * 100;
    const pState = (data.statePenalty / total) * 100;

    const sbBlue = document.querySelector('.sb-segment.blue');
    const sbRed = document.querySelector('.sb-segment.red');
    const sbYellow = document.querySelector('.sb-segment.yellow');
    
    if(sbBlue) sbBlue.style.width = `${pBase}%`;
    if(sbRed) sbRed.style.width = `${pFed}%`;
    if(sbYellow) sbYellow.style.width = `${pState}%`;

    // --- DYNAMIC CORNER ROUNDING FOR STACKED BAR ---
    if(sbBlue) sbBlue.style.borderRadius = ''; 
    if(sbRed) sbRed.style.borderRadius = '';

    if (pState > 0) {
        // Yellow is visible. No change needed.
    } else if (pFed > 0) {
        if(sbRed) sbRed.style.borderRadius = "0 6px 6px 0";
    } else {
        if(sbBlue) sbBlue.style.borderRadius = "6px";
    }

    // Urgency Meter Marker
    const marker = document.getElementById('timeline_markerB');
    if(marker) {
        const urgencyContainer = marker.parentElement.parentElement;
        const zoneGreen = urgencyContainer.querySelector('.timeline-zone.green');
        const zoneYellow = urgencyContainer.querySelector('.timeline-zone.yellow');
        const zoneRed = urgencyContainer.querySelector('.timeline-zone.red');
        const legendItems = urgencyContainer.querySelectorAll('.legend-item');
        const captionEl = urgencyContainer.querySelector('.disclosure-text');
        
        const oldFlMsg = document.getElementById('fl-expire-msg');
        if(oldFlMsg) oldFlMsg.style.display = 'none';

        let maxYears = 3;
        let flexG = 66, flexY = 17, flexR = 17;
        let limitGreen = 66, limitYellow = 83;
        let labelEnd = "3 Yrs+";
        let labelMid = "2 Yrs";
        let captionHTML = "Time Limits: Federal limits to claim missing pay are typically 2 years (up to 3 years for specific cases).";
        
        const state = data.state;

        if(zoneGreen) zoneGreen.style.borderRadius = '';

        if (state === 'NY') {
            maxYears = 6;
            flexG = 100; flexY = 0; flexR = 0;
            limitGreen = 100; limitYellow = 100;
            labelEnd = "6 Yrs";
            labelMid = "3 Yrs";
            captionHTML = "Time Limits: New York allows you to recover missing compensation going back up to 6 full years.";
            if(zoneGreen) zoneGreen.style.borderRadius = '5px';
        }
        else if (state === 'FL') {
            maxYears = 5;
            flexG = 80; flexY = 0; flexR = 20;
            limitGreen = 80; limitYellow = 80;
            labelEnd = "5 Yrs";
            labelMid = "4 Yrs";
            captionHTML = "Time Limits: The Florida Constitution allows you to recover missing compensation going back 4 to 5 years.";
        }
        else if (state === 'TX') {
            maxYears = 3;
            flexG = 15; flexY = 55; flexR = 30;
            limitGreen = 15; limitYellow = 70;
            labelEnd = "3 Yrs+";
            labelMid = "180 Days";
            captionHTML = "<strong>Texas Timing Note:</strong> Texas provides a 180-day window to file a fast-track state claim, while federal limits are generally 2 to 3 years.";
        }
        else if (state === 'CA') {
            maxYears = 4;
            flexG = 75; flexY = 0; flexR = 25;
            limitGreen = 75; limitYellow = 75;
            labelEnd = "4 Yrs";
            labelMid = "3 Yrs";
            captionHTML = "Time Limits: California's window to claim missing pay is typically 3 years (up to 4 for written contracts).";
        }

        if(zoneGreen) zoneGreen.style.flex = flexG;
        if(zoneYellow) zoneYellow.style.flex = flexY;
        if(zoneRed) zoneRed.style.flex = flexR;

        if(legendItems.length >= 3) {
            legendItems[0].textContent = "0 Yrs";
            legendItems[1].textContent = labelMid;
            legendItems[2].textContent = labelEnd;
        }

        if(captionEl) {
            captionEl.innerHTML = captionHTML;
            captionEl.style.color = (state === 'TX') ? '#C62828' : '#595959';
        }

        let pct = (data.yearsPassed / maxYears) * 100;
        pct = Math.max(0, Math.min(100, pct));
        marker.style.left = `${pct}%`;

        let mColor = '#2ecc71'; 
        let mLabel = "Safe";
        
        if(pct > limitYellow) {
            mColor = '#e74c3c'; 
            mLabel = "Expired";
        } else if(pct > limitGreen) {
            mColor = '#f1c40f'; 
            mLabel = "Risk";
            if(state === 'TX') mLabel = "Fed Only";
        }

        marker.style.backgroundColor = mColor;
        marker.setAttribute('data-label', mLabel);
    }
    
    if (typeof window.updateScrollIndicator === 'function') {
        // Allow the browser to paint before recalculating manual indicator
        requestAnimationFrame(() => window.updateScrollIndicator());
    }
}

function initializeGlobalListeners() {
    const selects = document.querySelectorAll('select');
    selects.forEach(s => s.addEventListener('change', calculateResults));
    
    // --- UPDATED DATE LISTENER FOR VALIDATION SWAP ---
    const dateStart = document.getElementById('date_startA');
    const dateEnd = document.getElementById('date_endA');

    if (dateStart && dateEnd) {
        const validateDates = (changedInput) => {
            if (dateStart.value && dateEnd.value) {
                const start = new Date(dateStart.value);
                const end = new Date(dateEnd.value);
                if (end < start) {
                    if (changedInput === 'start') {
                        dateEnd.value = dateStart.value; 
                    } else {
                        dateStart.value = dateEnd.value; 
                    }
                }
            }
            calculateResults();
        };

        dateStart.addEventListener('change', () => validateDates('start'));
        dateEnd.addEventListener('change', () => validateDates('end'));
    }

    const dateEndB = document.getElementById('date_endB');
    if (dateEndB) dateEndB.addEventListener('change', calculateResults);
    
    const checks = document.querySelectorAll('input[type="checkbox"]');
    checks.forEach(c => c.addEventListener('change', calculateResults));

    const payStructureSelect = document.getElementById('payStructureA');
    const compLabel = document.getElementById('label_compA');
    if (payStructureSelect && compLabel) {
        payStructureSelect.addEventListener('change', (e) => {
            if (e.target.value === 'salary') {
                compLabel.textContent = "Weekly Salary ($)";
            } else {
                compLabel.textContent = "Hourly Rate ($)";
            }
            calculateResults();
        });
    }
}

function initializeFAQ() {
    const toggles = document.querySelectorAll('.faq-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const content = toggle.nextElementSibling;
            if (toggle.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
}

function initializeScrollIndicator() {
    const container = document.getElementById('results-display-container');
    const indicator = document.getElementById('scroll-indicator');
    
    if (!container || !indicator) return;

    // Create an invisible anchor at the bottom of the container
    const anchor = document.createElement('div');
    anchor.id = "scroll-bottom-anchor";
    anchor.style.height = "1px";
    anchor.style.width = "100%";
    anchor.style.flexShrink = "0";
    container.appendChild(anchor);

    // PERFORMANCE FIX: Intersection Observer handles scrolling WITHOUT Reflows
    const observer = new IntersectionObserver((entries) => {
        if (window.innerWidth <= 990) {
            indicator.style.opacity = '0';
            return;
        }
        if (entries[0].isIntersecting) {
            indicator.style.opacity = '0'; // Bottom reached
        } else {
            // Check if scrollable at all
            if (container.scrollHeight > container.clientHeight + 10) {
                indicator.style.opacity = '1';
            }
        }
    }, {
        root: container,
        threshold: 0
    });

    observer.observe(anchor);

    // Manual update function strictly for resize events and UI changes
    window.updateScrollIndicator = () => {
        if (window.innerWidth <= 990) {
            indicator.style.opacity = '0';
            return;
        }
        if (container.scrollHeight <= container.clientHeight + 10) {
            indicator.style.opacity = '0';
        } else {
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 15) {
                indicator.style.opacity = '0';
            } else {
                indicator.style.opacity = '1';
            }
        }
    };

    window.addEventListener('resize', () => {
        requestAnimationFrame(window.updateScrollIndicator);
    });
}

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,

    /* 1. CONFIGURATION (All Inputs from All Modes) */
    PERSIST_MAP: {
        // Global
        'loc': { id: 'workLocation', type: 'select' },
        'size': { id: 'employerSize', type: 'select' },

        // Mode A (Overtime)
        'pay': { id: 'payStructureA', type: 'select' },
        'rateA': { id: 'input_compA', type: 'number' },
        'hoursA': { id: 'input_hoursA', type: 'number' },
        'startA': { id: 'date_startA', type: 'text' },
        'endA': { id: 'date_endA', type: 'text' },
        'mit': { id: 'mitigationA', type: 'select' },
        'off': { id: 'input_offClockA', type: 'number' },
        'lunch': { id: 'lunchA', type: 'select' },
        'fluct': { id: 'fluctuatingA', type: 'select' },

        // Mode B (Penalty)
        'wagesB': { id: 'input_wagesB', type: 'number' },
        'rateB': { id: 'input_rateB', type: 'number' },
        'intent': { id: 'intentB', type: 'select' },
        'dateB': { id: 'date_endB', type: 'text' },
        'status': { id: 'empStatusB', type: 'select' },
        'late': { id: 'input_lateDaysB', type: 'number' },
        
        // Mode B Advanced Checkboxes
        'chk_rec': { id: 'check_records', type: 'checkbox' },
        'chk_mis': { id: 'check_misclass', type: 'checkbox' },
        'chk_ded': { id: 'check_deduct', type: 'checkbox' }
    },

    /* 2. SHARE LOGIC (Universal) */
    getShareUrl() {
        const params = new URLSearchParams();
        
        // Inputs
        for (const[key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) {
                if (config.type === 'checkbox') {
                    params.set(key, el.checked);
                } else {
                    params.set(key, el.value);
                }
            }
        }
        
        // Mode State
        const activeCard = document.querySelector('.mode-card.active-mode');
        if (activeCard) params.set('mode', activeCard.getAttribute('data-mode'));

        // Advanced State - Check if content is visible
        const advContent = document.querySelector('.advanced-content');
        if (advContent) {
            params.set('adv', !advContent.classList.contains('hidden'));
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

    syncVisuals(el, type) {
        // Sync Custom Dropdowns
        if (type === 'select') {
            const wrapper = el.closest('.custom-dropdown-container');
            if (wrapper) {
                const trigger = wrapper.querySelector('.custom-dropdown-trigger');
                const selectedOption = el.options[el.selectedIndex];
                if (trigger && selectedOption) {
                    trigger.textContent = selectedOption.text;
                    // Also update visual list selection
                    const options = wrapper.querySelectorAll('.dropdown-option');
                    options.forEach(opt => {
                        if (opt.getAttribute('data-value') === el.value) {
                            opt.classList.add('selected');
                            opt.setAttribute('aria-selected', 'true');
                        } else {
                            opt.classList.remove('selected');
                            opt.setAttribute('aria-selected', 'false');
                        }
                    });
                }
            }
        }

        // Sync Sliders
        if (type === 'number') {
            const inputId = el.id;
            const key = inputId.replace('input_', '');
            const slider = document.getElementById(`slider_${key}`);
            if (slider) {
                // Manually trigger the logic that updates slider visual
                const currentVal = cleanNumber(el.value);
                slider.value = valToSlider(currentVal, key);
                updateSliderVisual(slider);
            }
        }
    },

    restoreState() {
        const params = new URLSearchParams(window.location.search);

        // 1. Restore Inputs
        for (const[key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    const val = params.get(key);
                    
                    if (config.type === 'checkbox') {
                        el.checked = (val === 'true');
                    } else {
                        el.value = val;
                        // Sync Visuals immediately
                        this.syncVisuals(el, config.type);
                    }
                }
            }
        }

        // 2. Restore Mode
        if (params.has('mode')) {
            const mode = params.get('mode');
            const card = document.querySelector(`.mode-card[data-mode="${mode}"]`);
            if (card) {
                // Small delay to ensure listeners are ready
                setTimeout(() => card.click(), 50);
            }
        }

        // 3. Restore Advanced View
        if (params.has('adv')) {
            const wantAdvanced = params.get('adv') === 'true';
            const content = document.querySelector('.advanced-content');
            const isCurrentlyHidden = content.classList.contains('hidden');
            
            if (wantAdvanced && isCurrentlyHidden) {
                const btn = document.getElementById('advanced-toggle');
                if (btn) btn.click();
            }
        }
    },

    init() {
        this.restoreState();
        const btnShare = document.getElementById('btn-share');
        if (btnShare) btnShare.addEventListener('click', () => this.handleShare());
    }
};

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Components in STRICT order
    populateStateDropdown(); 
    initializeCustomCalendars(); // MUST load dates before anything else to avoid 1-day bugs
    initializeSliders();        
    initializeModes();
    initializeAdvancedToggle();
    initializeTooltips();
    initializeGlobalListeners();
    initializeFAQ();
    initializeScrollIndicator();
    
    // 2. Restore User State from URL (Share Feature)
    ToolFeatures.init();

    // 3. STRICT Synchronous Calculation to Fix Startup Garbage Values
    calculateResults();
    
    // 4. Failsafe Frame Check for Custom Visuals Sync
    requestAnimationFrame(() => {
        calculateResults();
    });
});