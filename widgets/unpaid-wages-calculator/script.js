/* --- START OF FILE widgets/script.js --- */

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
const phrases = [
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
        if(code === 'CA') div.classList.add('selected');
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
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        };

        options.forEach(option => {
            option.onclick = (e) => {
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
                calculateResults(); 
            };
        });
    });

    document.onclick = (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
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
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    dateInputs.forEach(input => {
        if (!input.value) {
            if (input.id === 'date_endB') {
                const d = new Date();
                d.setFullYear(d.getFullYear() - 1);
                input.value = d.toISOString().split('T')[0];
            } else {
                input.value = new Date().toISOString().split('T')[0];
            }
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
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&rarr;';
            nextBtn.className = 'calendar-nav-btn';

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
                grid.style.gap = '2px';

                ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => {
                    const dh = document.createElement('div');
                    dh.style.fontSize = '0.75rem'; dh.style.color = '#999'; dh.style.padding = '5px 0';
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

    // Total Weekly Hours (Including hidden hours)
    let totalWeeklyHours = inputs.hours + (inputs.offClock / 60 * 5);
    if (inputs.lunch) totalWeeklyHours += 2.5; 

    // Calculate OT/DT Hours
    let otHours = 0;
    let doubleTimeHours = 0;

    if (stateData.otType === 'daily') {
        const dailyAvg = totalWeeklyHours / 5;
        const dailyThreshold = stateData.dailyThreshold || 8;
        
        if (dailyAvg > dailyThreshold) {
            let dailyOt = dailyAvg - dailyThreshold;
            if (inputs.state === 'CA' && dailyAvg > 12) {
                const dailyDouble = dailyAvg - 12;
                dailyOt = 4; 
                doubleTimeHours += (dailyDouble * 5);
            }
            otHours += (dailyOt * 5);
        }
        
        const straightTime = (Math.min(dailyAvg, dailyThreshold) * 5);
        if (straightTime > 40) {
             otHours += (straightTime - 40);
        }

    } else {
        const threshold = stateData.weeklyThreshold || 40;
        if (totalWeeklyHours > threshold) {
            otHours = totalWeeklyHours - threshold;
        }
    }

    // --- MATH ENGINE UPDATE ---
    let regularRate = 0;
    let otMultiplier = 1.5;
    let dtMultiplier = 2.0;

    if (inputs.payType === 'hourly') {
        // Condition 1: HOURLY
        regularRate = inputs.rate;
        
        if (inputs.mitigation === 'straight') {
            otMultiplier = 0.5;
            dtMultiplier = 1.0;
        } else if (inputs.mitigation === 'partial') {
            otMultiplier = 0.75; 
        }
        // If mitigation is 'none', multipliers remain 1.5 and 2.0
    } else {
        // Condition 2: SALARY
        // Regular Rate = Weekly Salary / Total Hours Worked
        // If total hours is 0, avoid division by zero
        regularRate = (totalWeeklyHours > 0) ? (inputs.rate / totalWeeklyHours) : 0;
        
        // Overtime Premium = Regular Rate * 0.5 (Half-Time)
        // Since salary covers straight time for all hours, we only owe the premium.
        otMultiplier = 0.5;
        
        // For Double Time (e.g. CA > 12h), the salary covered 1.0x, so we owe 1.0x to reach 2.0x total.
        dtMultiplier = 1.0;
    }

    // Calculate Weekly Theft (Unpaid Wages)
    let weeklyTheft = (otHours * regularRate * otMultiplier) + (doubleTimeHours * regularRate * dtMultiplier);
    
    // Add "Hidden Hours" at Regular Rate ONLY IF it's Hourly and they are under 40 hours.
    // If Salaried, the salary covers these hours implicitly until they hit overtime.
    if (inputs.payType === 'hourly' && totalWeeklyHours <= 40) {
        const hiddenHours = (inputs.offClock / 60 * 5) + (inputs.lunch ? 2.5 : 0);
        weeklyTheft += (hiddenHours * regularRate);
    }

    const totalBaseDebt = weeklyTheft * weeks;
    const donatedHoursTotal = (otHours + doubleTimeHours) * weeks;

    // Real Hourly Rate Calculation
    let actualWeeklyPay = 0;
    if (inputs.payType === 'salary') {
        actualWeeklyPay = inputs.rate; // Fixed Salary
    } else {
        // Hourly approximation
        actualWeeklyPay = (Math.min(totalWeeklyHours, 40) * inputs.rate); 
    }
    const realHourlyRate = totalWeeklyHours > 0 ? (actualWeeklyPay / totalWeeklyHours) : 0;

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
    
    // Mode A Results
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

    // --- UNIVERSAL FOMO BLOCKS (Triggered by State Selection) ---
    // Helper function to create/update State Specific Alerts in BOTH modes
    const updateStateFOMO = (container, idSuffix) => {
        if (!container) return;
        
        // 1. AMBER BOX (CA/FL/NY Main Warnings)
        let alertBox = document.getElementById(`state-fomo-${idSuffix}`);
        if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.id = `state-fomo-${idSuffix}`;
            alertBox.style.cssText = `margin-top: 30px; padding: 20px; background-color: #F57F17; box-shadow: 0 4px 15px rgba(245, 127, 23, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none;`;
            
            const advContent = container.querySelector('.advanced-content');
            if(advContent) container.insertBefore(alertBox, advContent);
            else container.appendChild(alertBox);
        }

        let amberVisible = false;
        if (data.state === 'CA') {
            alertBox.innerHTML = "<strong>NOTE:</strong> This estimate only calculates weekly overtime. California also enforces daily overtime rules. If you worked more than 8 hours in a single day, your actual unpaid wages could be significantly higher. <br><br>Get a free professional review to calculate the exact daily overtime you are legally owed. <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
            alertBox.style.display = 'block';
            amberVisible = true;
        } 
        else if (data.state === 'FL') {
            alertBox.innerHTML = "<strong>[WARNING] FLORIDA NOTICE REQUIRED:</strong> You are legally barred from filing a minimum wage lawsuit until you provide a 15-day written notice. Our partners can draft this legal notice to ensure your claim isn't dismissed. <br><br><strong>Note:</strong> Florida does not enforce daily overtime; estimates are based on the 40-hour federal workweek. <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            alertBox.style.display = 'block';
            amberVisible = true;
        }
        else if (data.state === 'NY') {
            alertBox.innerHTML = "<strong>[WARNING] NEW YORK 'SPREAD OF HOURS' ALERT:</strong> Did your shifts ever span more than 10 hours from start to finish (even with a long break)? NY law requires employers to pay an extra hour of minimum wage for those days. <br><br>Connect with a lawyer to uncover these hidden wages! <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
            alertBox.style.display = 'block';
            amberVisible = true;
        }
        else {
            alertBox.style.display = 'none';
        }

        // 2. MIAMI/PINELLAS BOX (FL Only)
        let countyBox = document.getElementById(`county-fomo-${idSuffix}`);
        if (!countyBox) {
            countyBox = document.createElement('div');
            countyBox.id = `county-fomo-${idSuffix}`;
            countyBox.style.cssText = `margin-top: 20px; padding: 20px; background-color: #880E4F; box-shadow: 0 4px 15px rgba(136, 14, 79, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none;`;
            // Insert after amber box
            if (alertBox.nextSibling) container.insertBefore(countyBox, alertBox.nextSibling);
            else container.appendChild(countyBox);
        }

        if (data.state === 'FL') {
            countyBox.innerHTML = "<strong>[INFO] COUNTY WAGE THEFT:</strong> Residents in Miami-Dade and Pinellas may be entitled to 3x (triple) back wages under local ordinances. These local laws often provide faster recovery than a state lawsuit. <br><br>Check if your workplace location qualifies for triple damages. <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            countyBox.style.display = 'block';
        } else {
            countyBox.style.display = 'none';
        }
    };

    // EXECUTE FOR BOTH MODES
    updateStateFOMO(modeAResults, 'a');
    updateStateFOMO(modeBResults, 'b');

    // --- OTHER MODE A DYNAMIC ALERTS (Condition Specific) --- //
    // 1b. NEW YORK LIQUIDATED DAMAGES ALERT (Mode A)
    let nyLiqAlert = document.getElementById('ny-liq-alert');
    if (!nyLiqAlert && modeAResults) {
        nyLiqAlert = document.createElement('div');
        nyLiqAlert.id = 'ny-liq-alert';
        nyLiqAlert.style.cssText = `margin-top: 20px; padding: 20px; background-color: #34495e; box-shadow: 0 4px 15px rgba(52, 73, 94, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none;`;
        
        // Find reference node (after State FOMO A)
        const refNode = document.getElementById('state-fomo-a');
        if (refNode && refNode.nextSibling) modeAResults.insertBefore(nyLiqAlert, refNode.nextSibling);
        else {
             const advContent = modeAResults.querySelector('.advanced-content');
             if(advContent) modeAResults.insertBefore(nyLiqAlert, advContent);
        }
    }

    if (nyLiqAlert) {
        if (data.state === 'NY' && data.totalBaseDebt > 0) {
            nyLiqAlert.innerHTML = "<strong>[INFO] 100% LIQUIDATED DAMAGES:</strong> New York Labor Law strictly entitles workers to DOUBLE their unpaid wages as liquidated damages. Your actual legal claim is likely 2x the base amount shown below!";
            nyLiqAlert.style.display = 'block';
        } else {
            nyLiqAlert.style.display = 'none';
        }
    }

    // 2. FLSA COMPLEX CLAIM DISCLAIMER
    let flsaDisclaimer = document.getElementById('dynamic-flsa-disclaimer');
    if (!flsaDisclaimer && modeAResults) {
        flsaDisclaimer = document.createElement('div');
        flsaDisclaimer.id = 'dynamic-flsa-disclaimer';
        flsaDisclaimer.style.cssText = `margin-top: 20px; padding: 20px; background-color: #C62828; box-shadow: 0 4px 15px rgba(198, 40, 40, 0.4); border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none;`;
        
        // Insert after NY Liq or State FOMO
        const refNode = nyLiqAlert || document.getElementById('state-fomo-a');
        if (refNode && refNode.nextSibling) modeAResults.insertBefore(flsaDisclaimer, refNode.nextSibling);
        else {
             const advContent = modeAResults.querySelector('.advanced-content');
             if(advContent) modeAResults.insertBefore(flsaDisclaimer, advContent);
             else modeAResults.appendChild(flsaDisclaimer);
        }
    }

    if (flsaDisclaimer) {
        // TEXAS Edge Case C: Oilfield / Day Rate Trap
        if (data.state === 'TX' && data.inputs.payType === 'salary' && data.weeklyHours > 40) {
            flsaDisclaimer.innerHTML = "<strong>[WARNING] ILLEGAL DAY-RATE DETECTED:</strong> Paying a flat daily rate or salary without 1.5x overtime for hours over 40 is illegal under federal law. Texas oilfield and construction workers are regularly owed tens of thousands in back pay for this exact violation. <br><br>Review your case for free! <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            flsaDisclaimer.style.display = 'block';
        }
        else if (data.fluctuating) {
            flsaDisclaimer.innerHTML = "<strong>COMPLEX FEDERAL CLAIM DETECTED:</strong> Because you worked at multiple pay rates, the Fair Labor Standards Act (FLSA) requires a strict 'weighted average' to calculate your exact overtime. This tool provides a baseline estimate using your primary rate, but your actual unpaid wages require a custom legal calculation. Contact our legal network immediately to calculate your exact blended-rate damages!";
            flsaDisclaimer.style.display = 'block';
        } else {
            flsaDisclaimer.style.display = 'none';
        }
    }

    // 3. SUB-MINIMUM WAGE ALERT (MODE A)
    let minWageDisclaimer = document.getElementById('dynamic-minwage-disclaimer');
    if (!minWageDisclaimer && modeAResults) {
        minWageDisclaimer = document.createElement('div');
        minWageDisclaimer.id = 'dynamic-minwage-disclaimer';
        minWageDisclaimer.style.cssText = `margin-top: 20px; padding: 20px; background-color: #B71C1C; box-shadow: 0 4px 15px rgba(183, 28, 28, 0.5); border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none; font-weight: 500;`;

        const refNode = flsaDisclaimer || nyLiqAlert || document.getElementById('state-fomo-a');
        if (refNode && refNode.nextSibling) modeAResults.insertBefore(minWageDisclaimer, refNode.nextSibling);
        else {
             const advContent = modeAResults.querySelector('.advanced-content');
             if(advContent) modeAResults.insertBefore(minWageDisclaimer, advContent);
             else modeAResults.appendChild(minWageDisclaimer);
        }
    }

    if (minWageDisclaimer) {
        const isFlTippedTrap = (data.state === 'FL' && data.inputs.rate < 14.00 && data.inputs.rate >= 10.98);

        if (data.isSubMinWage) {
             if (data.state === 'FL') {
                minWageDisclaimer.innerHTML = "<strong>[CRITICAL] SEVERE WAGE THEFT:</strong> Your rate is below the Florida Constitutional minimum wage of $14.00/hr! You are legally entitled to recover your stolen wages PLUS 100% liquidated double damages. <br><br>Have a Florida attorney review your total combined damages immediately! <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            } else {
                minWageDisclaimer.innerHTML = "<strong>SEVERE WAGE THEFT DETECTED:</strong> The hourly rate you entered is below the legal state minimum wage! This means you are legally owed massive damages for BOTH minimum wage violations AND overtime violations. This calculator only estimates your overtime using the rate you provided, meaning your actual legal claim is significantly higher. <br><br>Have an employment advocate review your numbers to uncover your total combined compensation. <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
            }
            minWageDisclaimer.style.display = 'block';
        } 
        else if (isFlTippedTrap) {
            minWageDisclaimer.innerHTML = "<strong>[WARNING] TIP CREDIT ALERT:</strong> Your rate suggests your employer is taking a tip credit. If a manager or owner participates in a tip pool, the employer loses the credit and must pay the full $14.00 for every hour worked. <br><br><strong>Note:</strong> If your employer took a cut of your tips, they may owe you the full $14.00/hr, not just the tipped rate. <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            minWageDisclaimer.style.backgroundColor = '#D84315'; 
            minWageDisclaimer.style.display = 'block';
        }
        else {
            minWageDisclaimer.style.display = 'none';
        }
    }

    // --- OTHER MODE B DYNAMIC ALERTS (Condition Specific) --- //
    
    const createAlertBlock = (id, color, shadowColor) => {
        const div = document.createElement('div');
        div.id = id;
        div.style.cssText = `margin-top: 20px; padding: 20px; background-color: ${color}; box-shadow: 0 4px 15px ${shadowColor}; border-radius: 8px; color: #ffffff; font-size: 0.9rem; line-height: 1.5; font-family: 'ProductSans-Light', sans-serif; display: none;`;
        return div;
    };

    const bAdvContent = modeBResults ? modeBResults.querySelector('.advanced-content') : null;

    // TEXAS EDGE CASE B: 6-Day Firing Rule
    let txPayAlert = document.getElementById('alert-tx-pay');
    if (!txPayAlert && modeBResults && bAdvContent) {
        txPayAlert = createAlertBlock('alert-tx-pay', '#C62828', 'rgba(198, 40, 40, 0.4)'); 
        modeBResults.insertBefore(txPayAlert, bAdvContent);
    }
    if (txPayAlert) {
        if (data.state === 'TX' && data.inputs.empStatus === 'terminated' && data.inputs.lateDays > 6) {
             txPayAlert.innerHTML = "<strong>[CRITICAL] TEXAS PAYDAY LAW VIOLATION:</strong> Because you were fired, Texas law dictates your final check was legally due within 6 calendar days. Your employer is actively violating state law. <br><br>Have an employment advocate review this immediately to demand your pay plus liquidated damages! <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
             txPayAlert.style.display = 'block';
        } else {
             txPayAlert.style.display = 'none';
        }
    }

    // Alert 1: Records
    let recAlert = document.getElementById('alert-records');
    if (!recAlert && modeBResults && bAdvContent) {
        recAlert = createAlertBlock('alert-records', '#E65100', 'rgba(230, 81, 0, 0.4)'); 
        modeBResults.insertBefore(recAlert, bAdvContent);
    }
    if (recAlert) {
        if (data.checkRecords) {
            if (data.state === 'NY') {
                recAlert.innerHTML = "<strong>[CRITICAL] $10,000 PAPERWORK PENALTY DETECTED:</strong> Under the NY Wage Theft Prevention Act, employers can be fined up to $5,000 for missing paystubs and another $5,000 for failing to provide a written wage notice at hire. <br><br>Contact a NY employment attorney to claim these statutory damages! <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            } else {
                recAlert.innerHTML = "<strong>HIDDEN PENALTIES DETECTED:</strong> Because your time records were missing or altered, you may be owed up to $4,000.00 in additional statutory penalties under State Labor Codes. This calculator does not include these pay-period penalties. <br><br>Connect with a specialist to see if you qualify to claim these specific state record penalties. <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            }
            recAlert.style.display = 'block';
        } else {
            recAlert.style.display = 'none';
        }
    }

    // Alert 2: Misclassification
    let misAlert = document.getElementById('alert-misclass');
    if (!misAlert && modeBResults && bAdvContent) {
        misAlert = createAlertBlock('alert-misclass', '#B71C1C', 'rgba(183, 28, 28, 0.4)');
        modeBResults.insertBefore(misAlert, bAdvContent);
    }
    if (misAlert) {
        if (data.checkMisclass) {
            misAlert.innerHTML = "<strong>SEVERE MISCLASSIFICATION:</strong> Misclassifying an employee as an independent contractor is illegal tax fraud. You may be entitled to massive state penalties (up to $25,000 in some states) and full reimbursement of the employer taxes you were forced to pay. <br><br>Speak confidentially with a legal expert to explore your options for penalty and tax recovery. <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
            misAlert.style.display = 'block';
        } else {
            misAlert.style.display = 'none';
        }
    }

    // Alert 3: Deductions
    let dedAlert = document.getElementById('alert-deduct');
    if (!dedAlert && modeBResults && bAdvContent) {
        dedAlert = createAlertBlock('alert-deduct', '#880E4F', 'rgba(136, 14, 79, 0.4)');
        modeBResults.insertBefore(dedAlert, bAdvContent);
    }
    if (dedAlert) {
        if (data.checkDeduct) {
            dedAlert.innerHTML = "<strong>ILLEGAL WAGE DEDUCTIONS:</strong> Employers cannot legally deduct standard business expenses, uniform costs, or till shortages from your paycheck. You are legally entitled to a 100% reimbursement of these stolen wages. <br><br>Find out how to legally demand a full reimbursement for these stolen expenses on top of your current estimate. <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            dedAlert.style.display = 'block';
        } else {
            dedAlert.style.display = 'none';
        }
    }

    // 3b. SUB-MINIMUM WAGE ALERT (MODE B)
    let minWageDisclaimerB = document.getElementById('dynamic-minwage-disclaimer-b');
    if (!minWageDisclaimerB && modeBResults && bAdvContent) {
        minWageDisclaimerB = createAlertBlock('dynamic-minwage-disclaimer-b', '#B71C1C', 'rgba(183, 28, 28, 0.5)'); 
        minWageDisclaimerB.style.fontWeight = '500';
        modeBResults.insertBefore(minWageDisclaimerB, bAdvContent);
    }

    if (minWageDisclaimerB) {
        if (data.isSubMinWageB) {
             if (data.state === 'FL') {
                minWageDisclaimerB.innerHTML = "<strong>[CRITICAL] SEVERE WAGE THEFT:</strong> Your rate is below the Florida Constitutional minimum wage of $14.00/hr! You are legally entitled to recover your stolen wages PLUS 100% liquidated double damages. <br><br>Have a Florida attorney review your total combined damages immediately! <br><a href='../../contact-us/' class='alert-cta-btn'>Explore Your Legal Options</a>";
            } else {
                minWageDisclaimerB.innerHTML = "<strong>SEVERE WAGE THEFT DETECTED:</strong> The hourly rate you entered is below the legal state minimum wage! This means you are legally owed massive damages for BOTH minimum wage violations AND overtime violations. This calculator only estimates your overtime using the rate you provided, meaning your actual legal claim is significantly higher. <br><br>Have an employment advocate review your numbers to uncover your total combined compensation. <br><a href='../../contact-us/' class='alert-cta-btn'>Verify Your Estimate with a Professional</a>";
            }
            minWageDisclaimerB.style.display = 'block';
        } else {
            minWageDisclaimerB.style.display = 'none';
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
    // Reset to CSS defaults (Blue: Round Left, Red: Square, Yellow: Round Right)
    if(sbBlue) sbBlue.style.borderRadius = ''; 
    if(sbRed) sbRed.style.borderRadius = '';

    if (pState > 0) {
        // Yellow is visible (End). Red is Middle (Square). Blue is Start (Left Round).
        // Standard CSS classes handle this perfectly.
    } else if (pFed > 0) {
        // Yellow Hidden. Red is End.
        // Red needs Right Radius. Blue stays square right.
        if(sbRed) sbRed.style.borderRadius = "0 6px 6px 0";
    } else {
        // Yellow Hidden, Red Hidden. Blue is End (and Start).
        // Blue needs Right Radius (keeping Left Radius).
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
        
        // Hide previous dynamic warnings if they exist in this container
        const oldFlMsg = document.getElementById('fl-expire-msg');
        if(oldFlMsg) oldFlMsg.style.display = 'none';

        let maxYears = 3;
        let flexG = 66, flexY = 17, flexR = 17;
        let limitGreen = 66, limitYellow = 83;
        let labelEnd = "3 Yrs+";
        let labelMid = "2 Yrs";
        let captionHTML = "Claims expire. Federal limit is typically 2 years (3 for willful).";
        
        const state = data.state;

        // Reset Green Radius (Default from CSS is 5px 0 0 5px)
        if(zoneGreen) zoneGreen.style.borderRadius = '';

        if (state === 'NY') {
            // New York (The 6-Year Giant)
            maxYears = 6;
            flexG = 100; flexY = 0; flexR = 0;
            limitGreen = 100; limitYellow = 100;
            labelEnd = "6 Yrs";
            labelMid = "3 Yrs";
            captionHTML = "Claims expire. New York allows you to recover stolen wages going back 6 full years.";
            
            // NY Special: Green is 100% so it needs rounded right corners
            if(zoneGreen) zoneGreen.style.borderRadius = '5px';
        }
        else if (state === 'FL') {
            // Florida (The Constitutional Extension)
            maxYears = 5;
            flexG = 80; flexY = 0; flexR = 20;
            limitGreen = 80; limitYellow = 80;
            labelEnd = "5 Yrs";
            labelMid = "4 Yrs";
            captionHTML = "Claims expire. The Florida Constitution allows you to recover stolen wages going back 4 to 5 years.";
        }
        else if (state === 'TX') {
            // Texas (The 180-Day Trap)
            maxYears = 3;
            flexG = 15; flexY = 55; flexR = 30;
            limitGreen = 15; limitYellow = 70;
            labelEnd = "3 Yrs+";
            labelMid = "180 Days";
            captionHTML = "<strong>[WARNING] URGENT DEADLINE:</strong> Texas law gives you only 180 days to file a fast-track TWC claim. Federal limits are 2-3 years.";
        }
        else if (state === 'CA') {
            // California (The Standard Baseline)
            maxYears = 4;
            flexG = 75; flexY = 0; flexR = 25;
            limitGreen = 75; limitYellow = 75;
            labelEnd = "4 Yrs";
            labelMid = "3 Yrs";
            captionHTML = "Claims expire. California limit is typically 3 years (up to 4 for written contracts).";
        }

        // Apply Flex
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
            captionEl.style.color = (state === 'TX') ? '#C62828' : '#999';
        }

        // Marker Position
        let pct = (data.yearsPassed / maxYears) * 100;
        pct = Math.max(0, Math.min(100, pct));
        marker.style.left = `${pct}%`;

        // Color & Label
        let mColor = '#2ecc71'; // Green
        let mLabel = "Safe";
        
        if(pct > limitYellow) {
            mColor = '#e74c3c'; // Red
            mLabel = "Expired";
        } else if(pct > limitGreen) {
            mColor = '#f1c40f'; // Yellow
            mLabel = "Risk";
            if(state === 'TX') mLabel = "Fed Only";
        }

        marker.style.backgroundColor = mColor;
        marker.setAttribute('data-label', mLabel);
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
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
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
                        } else {
                            opt.classList.remove('selected');
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
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
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
    initializeSliders();        // Loads HTML values into Sliders
    initializeCustomCalendars(); // Loads default dates into inputs
    initializeModes();
    initializeAdvancedToggle();
    initializeTooltips();
    initializeGlobalListeners();
    initializeFAQ();
    
    // 2. Restore User State from URL (Share Feature)
    ToolFeatures.init();

    // 3. FORCE calculation immediately after restoration to fix "Garbage Output"
    // We dispatch events to ensure all logic hooks fire
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    calculateResults();
});


/* ============================================================
   THE POISON PILL: Anti-Tamper Shield (Added for Widget)
   ============================================================ */
setInterval(function() {
    const watermark = document.getElementById('solveria-watermark');
    
    // Check if deleted or hidden
    if (!watermark) {
        killWidget();
        return;
    }
    
    const style = window.getComputedStyle(watermark);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
        killWidget();
        return;
    }
    
    // Check if the iframe was chopped to hide the bottom
    const rect = watermark.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        killWidget();
    }
    
}, 2000);

function killWidget() {
    document.body.innerHTML = `
    <div style="padding: 30px 20px; text-align: center; font-family: sans-serif; background: #fdf7f7; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h3 style="color: #d9534f; margin-bottom: 10px;">⚠️ Widget Disabled</h3>
        <p style="color: #333; margin-bottom: 20px;">The "Powered by Solveria" attribution was removed or obscured. This violates the terms of use for this free tool.</p>
        <a href="https://solveria.org" target="_blank" style="padding: 10px 20px; background: #1a1a1a; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Get the official widget</a>
    </div>`;
}