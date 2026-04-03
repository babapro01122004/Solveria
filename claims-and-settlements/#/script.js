/* ============================ */
/* US STATE DATA (CALIFORNIA)   */
/* ============================ */
const STATE_DATA = {
    ca: {
        stateCode: "CA",
        stateName: "California",
        yearEffective: 2026,
        minimumWage: {
            statewideHourly: 16.90,
            fastFoodHourly: 20.00,
        },
        overtimeRules: {
            daily: { overtimeTriggerHours: 8.0, doubleTimeTriggerHours: 12.0 },
            weekly: { overtimeTriggerHours: 40.0 },
            seventhConsecutiveDay: { firstEightHoursMultiplier: 1.5, overEightHoursMultiplier: 2.0 }
        },
        mealAndRest: {
            mealPeriod: { firstTriggerHours: 5.0, secondTriggerHours: 10.0, requiredDurationMinutes: 30 },
            restPeriod: { triggerPerHours: 4.0, requiredDurationMinutes: 10 },
            premiums: { missedMealPenaltyHours: 1.0, missedRestPenaltyHours: 1.0, maxDailyPenaltyHours: 2.0 }
        },
        penalties: {
            waitingTime: { enabled: true, maxDays: 30 },
            wageStatement: { initialViolation: 50.00, subsequentViolation: 100.00, maximumAggregate: 4000.00 },
            splitShift: { premiumHours: 1.0 },
            liquidatedDamages: { multiplier: 2.0 }
        },
        deadlines: {
            unpaidWagesYears: 3,
            statutoryPenaltiesYears: 1,
            breachOfWrittenContractYears: 4,  
            breachOfOralContractYears: 2
        }
    }
};

/* ============================ */
/* Global Variables             */
/* ============================ */
window.previousValues = {};
window.isInitialLoad = true;
window.changedElementsThisPass = [];
window.scrollDebounce = null;
window.highlightDebounce = null;

/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases =[
    "Calculate exactly what you are owed.",
    "Every minute off-the-clock counts.",
    "Don't leave your earned wages behind.",
    "Understand your final paycheck rights."
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
/* Scroll Breathing Text        */
/* ============================ */
const scrollPhrases =[
    `"Scroll down to reveal your breakdown."`,
    `<img src="../../img/Logo_Golden.webp" alt="Solveria Logo" class="scroll-logo"> Powered by&nbsp;<span class="scroll-brand">Solveria.</span>`
];

let scrollTextIndex = 0;
const scrollContentElement = document.getElementById('scroll-breathing-content');

function cycleScrollText() {
    if (!scrollContentElement) return;
    scrollContentElement.classList.add('fade-out');
    setTimeout(() => {
        scrollTextIndex = (scrollTextIndex + 1) % scrollPhrases.length;
        scrollContentElement.innerHTML = scrollPhrases[scrollTextIndex];
        scrollContentElement.classList.remove('fade-out');
    }, 1000);
}

setInterval(cycleScrollText, 4000);

/* ============================ */
/* Slider & Input Logic         */
/* ============================ */

const SLIDER_CONFIG = {
    // Global
    basePay: { type: 'linear', max: 250 },
    shiftsPerWeek: { type: 'linear', max: 7 },
    hoursPerShift: { type: 'linear', max: 24 },
    bonuses: { type: 'cubic', max: 100000 },
    
    // Section 1
    hoursWorkedWk: { type: 'linear', max: 112 },
    hoursPaidWk: { type: 'linear', max: 112 },
    unpaidMinsShift: { type: 'linear', max: 120 },
    expenses: { type: 'cubic', max: 5000 },
    splitShiftGap: { type: 'linear', max: 12 },

    // Section 2
    daysOver8: { type: 'linear', max: 7 },
    hoursOver40: { type: 'linear', max: 60 },
    daysOver12: { type: 'linear', max: 7 },

    // Section 3
    daysMissedMeal: { type: 'linear', max: 7 },
    daysMissedRest: { type: 'linear', max: 7 },

    // Section 4
    inaccurateStubs: { type: 'linear', max: 52 },

    // Section 5
    unpaidPTO: { type: 'linear', max: 300 },

    // Section 6
    latePaychecks: { type: 'linear', max: 52 },
    delayedAmount: { type: 'cubic', max: 50000 }
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
    if (!slider || slider.classList.contains('disabled-slider')) return;
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
                realVal = Math.round(realVal * 100) / 100; 
            }
            
            input.value = realVal; 
            updateSliderVisual(e.target);
            // Engine trigger
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });

        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
        });
    });
}

/* ============================ */
/* Auto-Inject System Dates     */
/* ============================ */
function initializeDefaultDates() {
    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1); 
    
    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const todayStr = formatDate(today);
    const lastYearStr = formatDate(lastYear);

    const dateFields = [
        { id: 'input_startDate', val: lastYearStr },
        { id: 'input_endDate', val: todayStr },
        { id: 'input_finalPayDate', val: todayStr },
        { id: 'input_clearedDate', val: todayStr },
        { id: 'input_earliestDate', val: lastYearStr }
    ];

    dateFields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el && !el.value) {
            el.value = field.val;
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}

/* ============================ */
/* Custom Date Picker Logic     */
/* ============================ */
function initializeCustomCalendars() {
    document.querySelectorAll('.custom-date-wrapper').forEach(wrapper => {
        const input = wrapper.querySelector('.custom-date-trigger');
        const inputGroup = wrapper.closest('.input-group');
        if(!input) return;

        const popup = document.createElement('div');
        popup.className = 'custom-calendar-popup';

        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button type="button" class="calendar-nav-btn prev-btn">&lt;</button>
            <span class="calendar-month-year" title="Click to change month or year"></span>
            <button type="button" class="calendar-nav-btn next-btn">&gt;</button>
        `;
        popup.appendChild(header);

        const weekdays = document.createElement('div');
        weekdays.className = 'calendar-weekdays';['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => {
            const span = document.createElement('span');
            span.textContent = d;
            weekdays.appendChild(span);
        });
        popup.appendChild(weekdays);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid-content';
        popup.appendChild(grid);

        wrapper.appendChild(popup);

        let currentDate = new Date();
        let currentView = 'days'; 
        let yearRangeStart = currentDate.getFullYear();

        function render() {
            const monthYearLabel = header.querySelector('.calendar-month-year');
            grid.innerHTML = ''; 
            grid.className = 'calendar-grid-content view-' + currentView;

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Set up a clean 'now' comparison to prevent future date selection
            const now = new Date();
            now.setHours(23, 59, 59, 999);

            if (currentView === 'days') {
                weekdays.style.display = 'grid';
                const monthNames =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                monthYearLabel.textContent = `${monthNames[month]} ${year}`;

                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                for(let i = 0; i < firstDay; i++) {
                    grid.appendChild(document.createElement('div'));
                }

                for(let i = 1; i <= daysInMonth; i++) {
                    const dayEl = document.createElement('div');
                    dayEl.textContent = i;
                    dayEl.className = 'calendar-day';

                    const dateString = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
                    const cellDate = new Date(year, month, i);

                    if (input.value === dateString) {
                        dayEl.classList.add('selected');
                    }

                    // Check if future date to disable it
                    if (cellDate > now) {
                        dayEl.classList.add('disabled');
                        grid.appendChild(dayEl);
                        continue; 
                    }

                    dayEl.onclick = (e) => {
                        e.stopPropagation();
                        input.value = dateString;
                        input.dispatchEvent(new Event('change', { bubbles: true })); 
                        popup.classList.remove('active');
                        if (inputGroup) inputGroup.classList.remove('date-active');
                    };
                    grid.appendChild(dayEl);
                }
            } else if (currentView === 'months') {
                weekdays.style.display = 'none';
                monthYearLabel.textContent = `${year}`;
                
                const shortMonthNames =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                shortMonthNames.forEach((mName, index) => {
                    const monthEl = document.createElement('div');
                    monthEl.textContent = mName;
                    monthEl.className = 'calendar-month';
                    if (index === month) monthEl.classList.add('selected');

                    monthEl.onclick = (e) => {
                        e.stopPropagation();
                        currentDate.setMonth(index);
                        currentView = 'days';
                        render();
                    };
                    grid.appendChild(monthEl);
                });
            } else if (currentView === 'years') {
                weekdays.style.display = 'none';
                const startYear = Math.floor(yearRangeStart / 10) * 10 - 1; 
                monthYearLabel.textContent = `${startYear + 1} - ${startYear + 10}`;

                for (let i = 0; i < 12; i++) {
                    const y = startYear + i;
                    const yearEl = document.createElement('div');
                    yearEl.textContent = y;
                    yearEl.className = 'calendar-year';
                    if (y === year) yearEl.classList.add('selected');

                    yearEl.onclick = (e) => {
                        e.stopPropagation();
                        currentDate.setFullYear(y);
                        currentView = 'months';
                        render();
                    };
                    grid.appendChild(yearEl);
                }
            }
        }

        input.addEventListener('click', (e) => {
            if(input.disabled) return;
            e.stopPropagation();
            
            document.querySelectorAll('.custom-calendar-popup.active').forEach(p => {
                if(p !== popup) {
                    p.classList.remove('active');
                    const otherGrp = p.closest('.input-group');
                    if (otherGrp) otherGrp.classList.remove('date-active');
                }
            });
            
            if (inputGroup) inputGroup.classList.add('date-active');

            if(input.value) {
                const parsed = new Date(input.value + 'T00:00:00');
                if(!isNaN(parsed)) currentDate = parsed;
            }
            
            currentView = 'days';
            yearRangeStart = currentDate.getFullYear();
            render();
            popup.classList.add('active');
        });

        header.querySelector('.calendar-month-year').addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentView === 'days') {
                currentView = 'months';
            } else if (currentView === 'months') {
                currentView = 'years';
                yearRangeStart = currentDate.getFullYear();
            }
            render();
        });

        popup.querySelector('.prev-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentView === 'days') currentDate.setMonth(currentDate.getMonth() - 1);
            else if (currentView === 'months') currentDate.setFullYear(currentDate.getFullYear() - 1);
            else if (currentView === 'years') yearRangeStart -= 10;
            render();
        });
        
        popup.querySelector('.next-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentView === 'days') currentDate.setMonth(currentDate.getMonth() + 1);
            else if (currentView === 'months') currentDate.setFullYear(currentDate.getFullYear() + 1);
            else if (currentView === 'years') yearRangeStart += 10;
            render();
        });
        
        popup.addEventListener('click', (e) => e.stopPropagation());
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-calendar-popup.active').forEach(p => {
            p.classList.remove('active');
            const grp = p.closest('.input-group');
            if (grp) grp.classList.remove('date-active');
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

        if(!trigger || !menu) return;

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

/* ============================ */
/* Independent Section Toggle   */
/* ============================ */
function initializeSectionToggles() {
    const toggles = document.querySelectorAll('.section-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); 
            const parentId = toggle.getAttribute('data-section-id'); 
            const parent = document.getElementById(parentId);
            
            if (!parent) return;

            const content = parent.querySelector('.advanced-content');
            
            if (content) {
                const isHidden = content.classList.contains('hidden');
                
                if (isHidden) {
                    content.classList.remove('hidden');
                    toggle.textContent = "Switch to Basic";
                } else {
                    content.classList.add('hidden');
                    toggle.textContent = "Switch to Advanced";
                }

                const resultsId = parentId.replace('-inputs', '-results');
                const resultsBlock = document.getElementById(resultsId);
                
                if (resultsBlock) {
                    const resultsAdvanced = resultsBlock.querySelector('.advanced-content');
                    if (resultsAdvanced) {
                        if (isHidden) {
                            resultsAdvanced.classList.remove('hidden');
                        } else {
                            resultsAdvanced.classList.add('hidden');
                        }
                    }
                }
            }
        });
    });
}

/* ============================ */
/* Dynamic State Logic          */
/* ============================ */
function initializeDynamicStates() {
    // 1. Employment Status Logic
    const empStatus = document.getElementById('empStatus');
    const wrapperEndDate = document.getElementById('wrapper_endDate');
    const section5Inputs = document.getElementById('section-5-inputs');
    const section5Results = document.getElementById('section-5-results');

    const updateStatusUI = () => {
        if (!empStatus) return;
        if (empStatus.value === 'active') {
            if(wrapperEndDate) wrapperEndDate.classList.add('hidden');
            if(section5Inputs) section5Inputs.classList.add('hidden');
            if(section5Results) section5Results.classList.add('hidden');
        } else {
            if(wrapperEndDate) wrapperEndDate.classList.remove('hidden');
            if(section5Inputs) section5Inputs.classList.remove('hidden');
            if(section5Results) section5Results.classList.remove('hidden');
        }
    };
    
    if (empStatus) {
        empStatus.addEventListener('change', updateStatusUI);
        updateStatusUI(); 
    }

    // 2. Multiple Pay Rates
    const multiRates = document.getElementById('multiRates');
    const multiRateContainer = document.getElementById('multi-rate-container');

    const updateMultiRateUI = () => {
        if (!multiRates || !multiRateContainer) return;
        if (multiRates.value === 'yes') {
            multiRateContainer.classList.remove('hidden');
        } else {
            multiRateContainer.classList.add('hidden');
        }
    };

    if (multiRates) {
        multiRates.addEventListener('change', updateMultiRateUI);
        updateMultiRateUI();
    }

    // 3. Not Received Yet Checkbox
    const chkNotReceived = document.getElementById('chk_notReceived');
    const inputFinalPayDate = document.getElementById('input_finalPayDate');
    
    if (chkNotReceived && inputFinalPayDate) {
        chkNotReceived.addEventListener('change', (e) => {
            inputFinalPayDate.disabled = e.target.checked;
            if(e.target.checked) {
                inputFinalPayDate.value = '';
                inputFinalPayDate.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    // 4. Split Shifts Gap
    const splitShift = document.getElementById('splitShift');
    const wrapperSplitGap = document.getElementById('wrapper_splitGap');
    
    if (splitShift && wrapperSplitGap) {
        const updateSplitUI = () => {
            if (splitShift.value === 'yes') {
                wrapperSplitGap.style.opacity = '1';
                wrapperSplitGap.style.pointerEvents = 'auto';
            } else {
                wrapperSplitGap.style.opacity = '0.3';
                wrapperSplitGap.style.pointerEvents = 'none';
            }
        };
        splitShift.addEventListener('change', updateSplitUI);
        updateSplitUI();
    }
}

/* ============================ */
/* Scroll Indicator Logic       */
/* ============================ */
function initializeScrollIndicator() {
    const resultsContainer = document.getElementById('results-display-container');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (resultsContainer && scrollIndicator) {
        resultsContainer.addEventListener('scroll', () => {
            if (resultsContainer.scrollTop > 20) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}


/* ============================ */
/* CALCULATOR ENGINE CORE       */
/* ============================ */

function formatCurrency(num) {
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Master Formatting & Output Steady Highlight UI Injection
function setAndHighlight(id, rawValue, displayStr, colorClass) {
    const el = document.getElementById(id);
    if(!el) return;

    // We strictly convert the display text to a String to prevent number/text type false positives
    const safeDisplayStr = String(displayStr);
    let hasChanged = false;
    
    if (window.previousValues[id] !== safeDisplayStr) {
        hasChanged = true;
        window.previousValues[id] = safeDisplayStr;
    }

    el.textContent = safeDisplayStr;
    
    // Safely remove specifically only the color classes, preserving the highlight-active class
    // This stops the highlight from stuttering or erasing itself mid-drag
    el.classList.remove('good', 'warn', 'bad'); 
    if (colorClass) el.classList.add(colorClass);

    // Apply steady highlight only to the values actually visibly modifying currently
    if (hasChanged && !window.isInitialLoad) {
        el.classList.add('highlight-active');
        window.changedElementsThisPass.push(el);
    }
}

function updateCalculations() {
    // Reset our highlight scroll tracker per calculation pass
    window.changedElementsThisPass = [];
    
    // ---- Color Code Evaluators ----
    const colorMoney = val => val >= 500 ? 'bad' : (val > 0 ? 'warn' : 'good');
    const colorDays = val => val >= 10 ? 'bad' : (val > 0 ? 'warn' : 'good');
    const colorSafeBad = isBad => isBad ? 'bad' : 'good';

    // ---- 1. Get Core Inputs ----
    const empStatus = document.getElementById('empStatus')?.value || 'active';
    const payType = document.getElementById('payType')?.value || 'hourly';
    
    // Dates & Duration
    const rawStartDate = document.getElementById('input_startDate')?.value;
    const rawEndDate = document.getElementById('input_endDate')?.value;
    const startDate = rawStartDate ? new Date(rawStartDate + 'T00:00:00') : null;
    let endDate = rawEndDate ? new Date(rawEndDate + 'T00:00:00') : new Date(); 
    if (empStatus === 'active') endDate = new Date(); 
    
    let weeksWorked = 1; 
    if (startDate && endDate && endDate > startDate) {
        weeksWorked = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7);
    }
    weeksWorked = Math.max(0, Math.min(weeksWorked, 208)); 
    if (weeksWorked === 0) weeksWorked = 1; 
    
    // Wages
    const rawBasePay = parseFloat(document.getElementById('input_basePay')?.value) || 0;
    const shiftsPerWeek = parseFloat(document.getElementById('input_shiftsPerWeek')?.value) || 0;
    const hoursPerShift = parseFloat(document.getElementById('input_hoursPerShift')?.value) || 0;
    
    let effRate = rawBasePay;
    if (payType === 'salary') {
        if (rawBasePay > 15000) effRate = rawBasePay / 52 / ((shiftsPerWeek || 5) * (hoursPerShift || 8));
        else effRate = rawBasePay / ((shiftsPerWeek || 5) * (hoursPerShift || 8));
    } else if (payType === 'day') {
        effRate = rawBasePay / (hoursPerShift || 8);
    } else if (payType === 'piece' || payType === 'commission' || payType === 'mixed') {
        effRate = rawBasePay / ((shiftsPerWeek || 5) * (hoursPerShift || 8)); 
    }

    if (!isFinite(effRate) || effRate < 0) effRate = 0; 

    const stateMinWage = STATE_DATA.ca.minimumWage.statewideHourly; 
    const shortfallPerHr = Math.max(0, stateMinWage - effRate);

    // ---- SECTION 1: Regular Wages ----
    const hoursWorkedWk = parseFloat(document.getElementById('input_hoursWorkedWk')?.value) || 0;
    const hoursPaidWk = parseFloat(document.getElementById('input_hoursPaidWk')?.value) || 0;
    
    const unpaidStraightWk = Math.max(0, hoursWorkedWk - hoursPaidWk);
    const unpaidStraightTotal = unpaidStraightWk * effRate * weeksWorked;
    const minShortfallTotal = shortfallPerHr * hoursWorkedWk * weeksWorked;
    
    const unpaidMinsShift = parseFloat(document.getElementById('input_unpaidMinsShift')?.value) || 0;
    const otcTotal = (unpaidMinsShift / 60) * shiftsPerWeek * effRate * weeksWorked;
    
    const splitShift = document.getElementById('splitShift')?.value === 'yes';
    const splitShiftGap = parseFloat(document.getElementById('input_splitShiftGap')?.value) || 0;
    const splitPremTotal = (splitShift && splitShiftGap >= 1) ? (STATE_DATA.ca.penalties.splitShift.premiumHours * stateMinWage * shiftsPerWeek * weeksWorked) : 0;
    
    const expenses = parseFloat(document.getElementById('input_expenses')?.value) || 0;
    const liquidated = minShortfallTotal > 0 ? (minShortfallTotal * STATE_DATA.ca.penalties.liquidatedDamages.multiplier) : 0;

    // Inject & highlight outputs for Sec 1
    setAndHighlight('res_unpaidStraight', unpaidStraightTotal, formatCurrency(unpaidStraightTotal), colorMoney(unpaidStraightTotal));
    setAndHighlight('res_effRate', effRate, formatCurrency(effRate), 'good');
    setAndHighlight('res_minShortfall', minShortfallTotal, formatCurrency(minShortfallTotal), colorMoney(minShortfallTotal));
    setAndHighlight('res_otcTotal', otcTotal, formatCurrency(otcTotal), colorMoney(otcTotal));
    setAndHighlight('res_splitPrem', splitPremTotal, formatCurrency(splitPremTotal), colorMoney(splitPremTotal));
    setAndHighlight('res_expTotal', expenses, formatCurrency(expenses), colorMoney(expenses));
    setAndHighlight('res_liquidated', liquidated, formatCurrency(liquidated), colorMoney(liquidated));

    // ---- SECTION 2: Overtime ----
    const daysOver8 = parseFloat(document.getElementById('input_daysOver8')?.value) || 0;
    const hoursOver40 = parseFloat(document.getElementById('input_hoursOver40')?.value) || 0;
    const daysOver12 = parseFloat(document.getElementById('input_daysOver12')?.value) || 0;
    const sevenDays = document.getElementById('sevenDays')?.value === 'yes';
    const bonusRate = document.getElementById('bonusRate')?.value === 'yes';
    const altWorkweek = document.getElementById('altWorkweek')?.value === 'yes';
    
    const bonuses = parseFloat(document.getElementById('input_bonuses')?.value) || 0;
    let adjRate = effRate;
    if (bonusRate && bonuses > 0) {
        const bonusPeriod = document.getElementById('bonusPeriod')?.value || 'annual';
        let bonusWk = 0;
        if (bonusPeriod === 'annual') bonusWk = bonuses / 52;
        if (bonusPeriod === 'monthly') bonusWk = bonuses / 4.33;
        if (bonusPeriod === 'weekly') bonusWk = bonuses;
        adjRate += (bonusWk / (hoursWorkedWk || 40)) || 0;
    }

    const otRate = adjRate * 1.5;
    const dtRate = adjRate * 2.0;

    // Fixed OT Pyramiding logic so Double Time hours are properly subtracted from standard OT hours
    let shiftOT = hoursPerShift > 8 ? hoursPerShift - 8 : 1; 
    if (hoursPerShift > 12) shiftOT = 4; // Capped at 4 because DT picks up anything past 12 hrs
    
    let dailyOTHrsWk = daysOver8 * shiftOT;
    if (altWorkweek) dailyOTHrsWk = 0; 
    
    const weeklyOTHrsWk = hoursOver40;
    const dailyOTTotal = dailyOTHrsWk * otRate * weeksWorked;
    const weeklyOTTotal = weeklyOTHrsWk * otRate * weeksWorked;
    const totalOT = Math.max(dailyOTTotal, weeklyOTTotal); 

    let shiftDT = hoursPerShift > 12 ? hoursPerShift - 12 : 1;
    let dtHrsWk = daysOver12 * shiftDT;
    const dtTotal = dtHrsWk * dtRate * weeksWorked;
    
    const seventhPrem = sevenDays ? (8 * otRate * weeksWorked) : 0;
    const adjOTTotal = totalOT + dtTotal + seventhPrem;

    // Inject & highlight outputs for Sec 2
    setAndHighlight('res_weeklyOT', weeklyOTTotal, formatCurrency(weeklyOTTotal), colorMoney(weeklyOTTotal));
    setAndHighlight('res_dailyOT', dailyOTTotal, formatCurrency(dailyOTTotal), colorMoney(dailyOTTotal));
    setAndHighlight('res_totalOT', totalOT, formatCurrency(totalOT), colorMoney(totalOT));
    setAndHighlight('res_dtOwed', dtTotal, formatCurrency(dtTotal), colorMoney(dtTotal));
    setAndHighlight('res_7thPrem', seventhPrem, formatCurrency(seventhPrem), colorMoney(seventhPrem));
    setAndHighlight('res_adjRate', adjRate, formatCurrency(adjRate), 'good');
    setAndHighlight('res_adjTotal', adjOTTotal, formatCurrency(adjOTTotal), colorMoney(adjOTTotal));

    // ---- SECTION 3: Meal & Rest Penalties ----
    const daysMissedMeal = parseFloat(document.getElementById('input_daysMissedMeal')?.value) || 0;
    const daysMissedRest = parseFloat(document.getElementById('input_daysMissedRest')?.value) || 0;
    const shiftOver10 = document.getElementById('shiftOver10')?.value === 'yes';
    const onPremises = document.getElementById('onPremises')?.value === 'yes';
    const autoDeduct = document.getElementById('autoDeduct')?.value === 'yes';
    const breaksShort = document.getElementById('breaksShort')?.value === 'yes';
    const carryRadio = document.getElementById('carryRadio')?.value === 'yes';

    const mealPremTotal = daysMissedMeal * STATE_DATA.ca.mealAndRest.premiums.missedMealPenaltyHours * effRate * weeksWorked;
    const restPremTotal = daysMissedRest * STATE_DATA.ca.mealAndRest.premiums.missedRestPenaltyHours * effRate * weeksWorked;
    const combinedBreak = mealPremTotal + restPremTotal;
    
    // Fixed: Second meal adds to display of violations, but max statutory penalty stays capped at 2 premiums max per day (1 Meal + 1 Rest)
    const secondMeal = shiftOver10 ? (daysMissedMeal * STATE_DATA.ca.mealAndRest.premiums.missedMealPenaltyHours * effRate * weeksWorked) : 0;
    const maxDailyBreak = combinedBreak; // Correct CA Statutory maximum exposure framework
    
    const isHighRisk = (onPremises || autoDeduct || breaksShort || carryRadio);
    const onDutyFlagStr = isHighRisk ? "High Risk" : "Safe";

    // Inject & highlight outputs for Sec 3
    setAndHighlight('res_mealPrem', mealPremTotal, formatCurrency(mealPremTotal), colorMoney(mealPremTotal));
    setAndHighlight('res_restPrem', restPremTotal, formatCurrency(restPremTotal), colorMoney(restPremTotal));
    setAndHighlight('res_combinedBreak', combinedBreak, formatCurrency(combinedBreak), colorMoney(combinedBreak));
    setAndHighlight('res_secondMeal', secondMeal, formatCurrency(secondMeal), colorMoney(secondMeal));
    setAndHighlight('res_maxDailyBreak', maxDailyBreak, formatCurrency(maxDailyBreak), colorMoney(maxDailyBreak));
    setAndHighlight('res_onDutyFlag', onDutyFlagStr, String(onDutyFlagStr), colorSafeBad(isHighRisk));

    // ---- SECTION 4: Stub Violations ----
    const inaccurateStubs = parseFloat(document.getElementById('input_inaccurateStubs')?.value) || 0;
    let stubPenalty = 0;
    if (inaccurateStubs > 0) {
        stubPenalty = STATE_DATA.ca.penalties.wageStatement.initialViolation + 
                     ((inaccurateStubs - 1) * STATE_DATA.ca.penalties.wageStatement.subsequentViolation);
        stubPenalty = Math.min(stubPenalty, STATE_DATA.ca.penalties.wageStatement.maximumAggregate);
    }
    
    let isNonCompliant = false;
    for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`chk_stub${i}`)?.checked) isNonCompliant = true;
    }
    const isBadStub = isNonCompliant || inaccurateStubs > 0;
    const stubFlagStr = isBadStub ? "Non-Compliant" : "Compliant";

    // Inject & highlight outputs for Sec 4
    setAndHighlight('res_stubPenalty', stubPenalty, formatCurrency(stubPenalty), colorMoney(stubPenalty));
    setAndHighlight('res_stubFlag', stubFlagStr, String(stubFlagStr), colorSafeBad(isBadStub));

    // ---- SECTION 5: Waiting Time Penalties (Final Paycheck) ----
    let daysLate = 0;
    let waitingPenalty = 0;
    let ptoOwed = 0;
    const unpaidPTO = parseFloat(document.getElementById('input_unpaidPTO')?.value) || 0;
    const conditionalRelease = document.getElementById('conditionalRelease')?.value === 'yes';
    const partialFinal = document.getElementById('partialFinal')?.value === 'yes';

    if (empStatus !== 'active') {
        const notReceived = document.getElementById('chk_notReceived')?.checked;
        const rawFinalDate = document.getElementById('input_finalPayDate')?.value;
        const rawClearedDate = document.getElementById('input_clearedDate')?.value;
        const finalDate = rawFinalDate ? new Date(rawFinalDate + 'T00:00:00') : null;
        const clearedDate = rawClearedDate ? new Date(rawClearedDate + 'T00:00:00') : null;
        
        let compareDate = finalDate;
        if (clearedDate) compareDate = clearedDate; 
        if (notReceived) compareDate = new Date(); 
        
        let dueDate = new Date(endDate);
        if (empStatus === 'quit0') {
            dueDate.setDate(dueDate.getDate() + 3); 
        } 
        
        if (endDate && compareDate && compareDate > dueDate) {
            daysLate = Math.floor((compareDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        }
        
        const cappedDays = Math.min(Math.max(0, daysLate), STATE_DATA.ca.penalties.waitingTime.maxDays);
        waitingPenalty = cappedDays * (effRate * (hoursPerShift || 8));
        ptoOwed = unpaidPTO * effRate;
    }
    
    const isConditional = (conditionalRelease || partialFinal);
    const conditionalStr = isConditional ? "Yes" : "No";

    // Inject & highlight outputs for Sec 5
    setAndHighlight('res_daysLate', daysLate, String(daysLate), colorDays(daysLate));
    setAndHighlight('res_waitingPenalty', waitingPenalty, formatCurrency(waitingPenalty), colorMoney(waitingPenalty));
    setAndHighlight('res_ptoOwed', ptoOwed, formatCurrency(ptoOwed), colorMoney(ptoOwed));
    setAndHighlight('res_updatedWaiting', waitingPenalty + ptoOwed, formatCurrency(waitingPenalty + ptoOwed), colorMoney(waitingPenalty + ptoOwed));
    setAndHighlight('res_conditionalFlag', conditionalStr, String(conditionalStr), colorSafeBad(isConditional));

    // ---- SECTION 6: Late Paychecks ----
    const latePaychecks = parseFloat(document.getElementById('input_latePaychecks')?.value) || 0;
    const delayedAmount = parseFloat(document.getElementById('input_delayedAmount')?.value) || 0;
    const repeatViolation = document.getElementById('repeatViolation')?.value === 'repeat';
    const willfulDelay = document.getElementById('willfulDelay')?.value === 'yes';
    
    let lateStatPenalty = 0;
    let lateAddlPenalty = 0;
    
    if (latePaychecks > 0) {
        if (repeatViolation || willfulDelay) {
            lateStatPenalty = latePaychecks * 200;
            lateAddlPenalty = delayedAmount * 0.25;
        } else {
            lateStatPenalty = 100 + ((latePaychecks - 1) * 200);
        }
    }

    // Inject & highlight outputs for Sec 6
    setAndHighlight('res_lateStatPenalty', lateStatPenalty, formatCurrency(lateStatPenalty), colorMoney(lateStatPenalty));
    setAndHighlight('res_lateAddlPenalty', lateAddlPenalty, formatCurrency(lateAddlPenalty), colorMoney(lateAddlPenalty));

    // ---- SECTION 7: Timelines & Statutes ----
    const rawEarliestDate = document.getElementById('input_earliestDate')?.value;
    const claimType = document.getElementById('claimType')?.value || 'unpaid';
    const violationOngoing = document.getElementById('violationOngoing')?.value === 'yes';
    
    let deadlineStr = "N/A";
    let daysRem = 0;
    let riskClass = "good";
    let riskText = "Low";
    let stackedInd = "None";
    
    if (rawEarliestDate || violationOngoing) {
        let earliestDate = rawEarliestDate ? new Date(rawEarliestDate + 'T00:00:00') : new Date();
        if (violationOngoing) earliestDate = new Date(); 

        let yearsToAdd = STATE_DATA.ca.deadlines.unpaidWagesYears; 
        if (claimType === 'penalties') yearsToAdd = STATE_DATA.ca.deadlines.statutoryPenaltiesYears; 
        if (claimType === 'breach') yearsToAdd = STATE_DATA.ca.deadlines.breachOfWrittenContractYears;
        
        const deadlineDate = new Date(earliestDate);
        deadlineDate.setFullYear(deadlineDate.getFullYear() + yearsToAdd);
        
        deadlineStr = deadlineDate.toLocaleDateString('en-US');
        
        const today = new Date();
        const remDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        daysRem = remDays > 0 ? remDays : 0;
        
        if (violationOngoing) {
            riskText = "Safe (Ongoing)";
            riskClass = "good";
        } else if (remDays <= 0) {
            riskText = "Statute Expired";
            riskClass = "bad";
        } else if (remDays < 90) {
            riskText = "Critical";
            riskClass = "bad";
        } else if (remDays < 180) {
            riskText = "Moderate";
            riskClass = "warn";
        } else {
            riskText = "Safe";
            riskClass = "good";
        }
        
        if (claimType === 'unpaid' && stubPenalty > 0) {
            stackedInd = "Wages + Penalties";
        }
    }

    // Inject & highlight outputs for Sec 7
    setAndHighlight('res_deadlineDate', deadlineStr, String(deadlineStr), riskClass); 
    setAndHighlight('res_daysRemaining', daysRem, violationOngoing ? "N/A" : String(daysRem), riskClass);
    setAndHighlight('res_riskScore', riskText, String(riskText), riskClass);
    setAndHighlight('res_stackedInd', stackedInd, String(stackedInd), colorSafeBad(stackedInd !== "None"));

    // ---- FOMO TRIGGER LOGIC ----
    const fomoSec1 = (hoursWorkedWk > hoursPaidWk) || (unpaidMinsShift > 0) || (expenses > 0) || (effRate > 0 && effRate < stateMinWage);
    const fomoSec2 = (daysOver12 > 0 || hoursPerShift > 12) || (bonuses > 0) || (sevenDays);
    const fomoSec3 = autoDeduct || onPremises || carryRadio || shiftOver10;
    const chkStub1 = document.getElementById('chk_stub1')?.checked;
    const chkStub3 = document.getElementById('chk_stub3')?.checked;
    const fomoSec4 = (inaccurateStubs >= 2) || chkStub1 || chkStub3;
    const fomoSec5 = (daysLate > 0) || (unpaidPTO > 0) || (conditionalRelease);
    const fomoSec6 = repeatViolation || willfulDelay;

    let totalViolatedSections = 0;
    if(fomoSec1) totalViolatedSections++;
    if(fomoSec2) totalViolatedSections++;
    if(fomoSec3) totalViolatedSections++;
    if(fomoSec4) totalViolatedSections++;
    if(fomoSec5 && empStatus !== 'active') totalViolatedSections++;
    if(fomoSec6) totalViolatedSections++;

    const fomoSec7 = (daysRem > 0 && daysRem < 90) || (totalViolatedSections >= 3);

    const totalRecovery = unpaidStraightTotal + minShortfallTotal + otcTotal + splitPremTotal + liquidated + adjOTTotal + combinedBreak + secondMeal + stubPenalty + waitingPenalty + ptoOwed + lateStatPenalty + lateAddlPenalty;
    const timeRecords = document.getElementById('timeRecords')?.value;
    const classification = document.getElementById('classification')?.value;
    const claimsOTorBreaks = (adjOTTotal > 0 || combinedBreak > 0);

    const fomoGlobalLvl2 = (effRate > 0 && effRate < stateMinWage) || 
                           (timeRecords === 'altered') || 
                           (classification === 'exempt' && claimsOTorBreaks) || 
                           (totalRecovery > 5000) || 
                           (totalViolatedSections >= 3);
                           
    const fomoGlobalLvl1 = (totalViolatedSections >= 2) && !fomoGlobalLvl2; // Layer 1 yields to Layer 2

    const toggleFomo = (id, condition) => {
        const el = document.getElementById(id);
        if(el) {
            if(condition) el.classList.remove('hidden');
            else el.classList.add('hidden');
        }
    };

    toggleFomo('fomo-global-1', fomoGlobalLvl1);
    toggleFomo('fomo-global-2', fomoGlobalLvl2);
    toggleFomo('fomo-section-1', fomoSec1);
    toggleFomo('fomo-section-2', fomoSec2);
    toggleFomo('fomo-section-3', fomoSec3);
    toggleFomo('fomo-section-4', fomoSec4);
    toggleFomo('fomo-section-5', fomoSec5 && empStatus !== 'active');
    toggleFomo('fomo-section-6', fomoSec6);
    toggleFomo('fomo-section-7', fomoSec7);

    // Clear highlights gracefully once user stops interacting (Steady State Clear)
    clearTimeout(window.highlightDebounce);
    window.highlightDebounce = setTimeout(() => {
        document.querySelectorAll('.highlight-active').forEach(el => {
            el.classList.remove('highlight-active');
        });
    }, 1200);

    // Pass complete
    window.isInitialLoad = false;
}

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultDates(); 
    initializeSliders();
    initializeCustomCalendars();
    initializeCustomDropdowns();
    initializeSectionToggles();
    initializeDynamicStates();
    initializeScrollIndicator();

    // Attach master calculation listener to the whole container to catch everything instantly
    const container = document.querySelector('.calculator-container');
    if (container) {
        container.addEventListener('input', updateCalculations);
        container.addEventListener('change', updateCalculations);
    }

    // Force initial calculation on load
    updateCalculations();
});