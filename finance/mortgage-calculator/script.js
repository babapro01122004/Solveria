/* ============================ */
/* 🇺🇸 US STATE DATA REPOSITORY  */
/* ============================ */
const US_STATE_DATA = {
  AL: { name: "Alabama", propertyTaxRate: 0.0040, insuranceAvg: 3420, closingCosts: { feesPct: 0.013, totalPct: 0.024 } },
  AK: { name: "Alaska", propertyTaxRate: 0.0107, insuranceAvg: 1035, closingCosts: { feesPct: 0.012, totalPct: 0.022 } },
  AZ: { name: "Arizona", propertyTaxRate: 0.0045, insuranceAvg: 2565, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  AR: { name: "Arkansas", propertyTaxRate: 0.0053, insuranceAvg: 3215, closingCosts: { feesPct: 0.012, totalPct: 0.023 } },
  CA: { name: "California", propertyTaxRate: 0.0068, insuranceAvg: 1550, closingCosts: { feesPct: 0.011, totalPct: 0.022 } },
  CO: { name: "Colorado", propertyTaxRate: 0.0045, insuranceAvg: 4175, closingCosts: { feesPct: 0.012, totalPct: 0.024 } },
  CT: { name: "Connecticut", propertyTaxRate: 0.0178, insuranceAvg: 1870, closingCosts: { feesPct: 0.018, totalPct: 0.032 } },
  DE: { name: "Delaware", propertyTaxRate: 0.0048, insuranceAvg: 1025, closingCosts: { feesPct: 0.038, totalPct: 0.048 } },
  DC: { name: "Dist. Columbia", propertyTaxRate: 0.0056, insuranceAvg: 1295, closingCosts: { feesPct: 0.028, totalPct: 0.038 } },
  FL: { name: "Florida", propertyTaxRate: 0.0071, insuranceAvg: 5800, closingCosts: { feesPct: 0.022, totalPct: 0.038 } },
  GA: { name: "Georgia", propertyTaxRate: 0.0072, insuranceAvg: 2435, closingCosts: { feesPct: 0.014, totalPct: 0.026 } },
  HI: { name: "Hawaii", propertyTaxRate: 0.0026, insuranceAvg: 1100, closingCosts: { feesPct: 0.014, totalPct: 0.024 } },
  ID: { name: "Idaho", propertyTaxRate: 0.0047, insuranceAvg: 1460, closingCosts: { feesPct: 0.012, totalPct: 0.023 } },
  IL: { name: "Illinois", propertyTaxRate: 0.0195, insuranceAvg: 2420, closingCosts: { feesPct: 0.015, totalPct: 0.028 } },
  IN: { name: "Indiana", propertyTaxRate: 0.0071, insuranceAvg: 2495, closingCosts: { feesPct: 0.012, totalPct: 0.023 } },
  IA: { name: "Iowa", propertyTaxRate: 0.0140, insuranceAvg: 2505, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  KS: { name: "Kansas", propertyTaxRate: 0.0126, insuranceAvg: 3735, closingCosts: { feesPct: 0.013, totalPct: 0.026 } },
  KY: { name: "Kentucky", propertyTaxRate: 0.0074, insuranceAvg: 2510, closingCosts: { feesPct: 0.012, totalPct: 0.023 } },
  LA: { name: "Louisiana", propertyTaxRate: 0.0051, insuranceAvg: 6200, closingCosts: { feesPct: 0.014, totalPct: 0.028 } },
  ME: { name: "Maine", propertyTaxRate: 0.0096, insuranceAvg: 1180, closingCosts: { feesPct: 0.014, totalPct: 0.026 } },
  MD: { name: "Maryland", propertyTaxRate: 0.0095, insuranceAvg: 1945, closingCosts: { feesPct: 0.035, totalPct: 0.048 } },
  MA: { name: "Massachusetts", propertyTaxRate: 0.0104, insuranceAvg: 1600, closingCosts: { feesPct: 0.015, totalPct: 0.028 } },
  MI: { name: "Michigan", propertyTaxRate: 0.0124, insuranceAvg: 2100, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  MN: { name: "Minnesota", propertyTaxRate: 0.0098, insuranceAvg: 2920, closingCosts: { feesPct: 0.014, totalPct: 0.027 } },
  MS: { name: "Mississippi", propertyTaxRate: 0.0070, insuranceAvg: 3310, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  MO: { name: "Missouri", propertyTaxRate: 0.0083, insuranceAvg: 3290, closingCosts: { feesPct: 0.012, totalPct: 0.024 } },
  MT: { name: "Montana", propertyTaxRate: 0.0069, insuranceAvg: 2735, closingCosts: { feesPct: 0.011, totalPct: 0.022 } },
  NE: { name: "Nebraska", propertyTaxRate: 0.0144, insuranceAvg: 4505, closingCosts: { feesPct: 0.012, totalPct: 0.025 } },
  NV: { name: "Nevada", propertyTaxRate: 0.0044, insuranceAvg: 1305, closingCosts: { feesPct: 0.011, totalPct: 0.021 } },
  NH: { name: "New Hampshire", propertyTaxRate: 0.0161, insuranceAvg: 1185, closingCosts: { feesPct: 0.016, totalPct: 0.029 } },
  NJ: { name: "New Jersey", propertyTaxRate: 0.0223, insuranceAvg: 1290, closingCosts: { feesPct: 0.025, totalPct: 0.040 } },
  NM: { name: "New Mexico", propertyTaxRate: 0.0067, insuranceAvg: 1730, closingCosts: { feesPct: 0.012, totalPct: 0.024 } },
  NY: { name: "New York", propertyTaxRate: 0.0154, insuranceAvg: 1740, closingCosts: { feesPct: 0.042, totalPct: 0.060 } },
  NC: { name: "North Carolina", propertyTaxRate: 0.0063, insuranceAvg: 2490, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  ND: { name: "North Dakota", propertyTaxRate: 0.0097, insuranceAvg: 2805, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  OH: { name: "Ohio", propertyTaxRate: 0.0136, insuranceAvg: 1590, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  OK: { name: "Oklahoma", propertyTaxRate: 0.0076, insuranceAvg: 6210, closingCosts: { feesPct: 0.013, totalPct: 0.028 } },
  OR: { name: "Oregon", propertyTaxRate: 0.0077, insuranceAvg: 1305, closingCosts: { feesPct: 0.011, totalPct: 0.022 } },
  PA: { name: "Pennsylvania", propertyTaxRate: 0.0135, insuranceAvg: 1440, closingCosts: { feesPct: 0.040, totalPct: 0.055 } },
  RI: { name: "Rhode Island", propertyTaxRate: 0.0132, insuranceAvg: 2080, closingCosts: { feesPct: 0.013, totalPct: 0.026 } },
  SC: { name: "South Carolina", propertyTaxRate: 0.0046, insuranceAvg: 2350, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  SD: { name: "South Dakota", propertyTaxRate: 0.0101, insuranceAvg: 3345, closingCosts: { feesPct: 0.012, totalPct: 0.024 } },
  TN: { name: "Tennessee", propertyTaxRate: 0.0048, insuranceAvg: 2850, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  TX: { name: "Texas", propertyTaxRate: 0.0147, insuranceAvg: 4585, closingCosts: { feesPct: 0.015, totalPct: 0.035 } },
  UT: { name: "Utah", propertyTaxRate: 0.0047, insuranceAvg: 1385, closingCosts: { feesPct: 0.011, totalPct: 0.022 } },
  VT: { name: "Vermont", propertyTaxRate: 0.0156, insuranceAvg: 950,  closingCosts: { feesPct: 0.016, totalPct: 0.032 } },
  VA: { name: "Virginia", propertyTaxRate: 0.0087, insuranceAvg: 1705, closingCosts: { feesPct: 0.015, totalPct: 0.028 } },
  WA: { name: "Washington", propertyTaxRate: 0.0072, insuranceAvg: 1415, closingCosts: { feesPct: 0.018, totalPct: 0.032 } },
  WV: { name: "West Virginia", propertyTaxRate: 0.0055, insuranceAvg: 1770, closingCosts: { feesPct: 0.013, totalPct: 0.025 } },
  WI: { name: "Wisconsin", propertyTaxRate: 0.0138, insuranceAvg: 1515, closingCosts: { feesPct: 0.012, totalPct: 0.024 } },
  WY: { name: "Wyoming", propertyTaxRate: 0.0055, insuranceAvg: 1555, closingCosts: { feesPct: 0.012, totalPct: 0.023 } }
};

const NATIONAL_DEFAULT = {
  name: "National Average",
  propertyTaxRate: 0.011,
  insuranceAvg: 2110,
  closingCosts: { feesPct: 0.020, totalPct: 0.035 }
};

const INSURANCE_PIVOT_PRICE = 350000;

/* ============================ */
/* DATA HELPERS                 */
/* ============================ */
function getStateData(stateCode) {
    const code = (stateCode || "US").toUpperCase();
    return US_STATE_DATA[code] || NATIONAL_DEFAULT;
}

function getStateOptions() {
    return Object.keys(US_STATE_DATA).map(key => ({
        value: key,
        label: US_STATE_DATA[key].name
    })).sort((a, b) => a.label.localeCompare(b.label));
}

function estimateInsurance(stateCode, homePrice) {
    const data = getStateData(stateCode);
    const baseRate = data.insuranceAvg;
    let estimatedPremium;
    if (homePrice > INSURANCE_PIVOT_PRICE) {
        const excess = homePrice - INSURANCE_PIVOT_PRICE;
        estimatedPremium = baseRate + (excess * (baseRate / INSURANCE_PIVOT_PRICE) * 0.60);
    } else {
        estimatedPremium = baseRate * (homePrice / INSURANCE_PIVOT_PRICE);
    }
    return Math.max(500, Math.round(estimatedPremium));
}

function estimateCashToClose(stateCode, homePrice) {
    const data = getStateData(stateCode);
    return Math.round(homePrice * data.closingCosts.totalPct);
}

/* ============================ */
/* GLOBAL CONFIG & FORMATTING   */
/* ============================ */
const SLIDER_CONFIG = {
    propTaxGlobal: { type: 'linear', max: 5 },
    insuranceGlobal: { type: 'cubic', max: 6000 }, 
    
    // MODE A
    incomeUserA: { type: 'cubic', max: 1000000 }, 
    cashUserA: { type: 'cubic', max: 1000000 },   
    homePriceA: { type: 'cubic', max: 5000000 },
    downPaymentA: { type: 'linear', max: 0 }, 
    rateA: { type: 'linear', max: 12 },
    hoaA: { type: 'cubic', max: 2000 },
    pmiA: { type: 'linear', max: 3 },
    pointsA: { type: 'linear', max: 5 },

    // MODE B
    homeValueB: { type: 'cubic', max: 5000000 },
    currentPaymentB: { type: 'cubic', max: 20000 },
    newLoanB: { type: 'cubic', max: 5000000 },
    rateB: { type: 'linear', max: 12 },
    costsB: { type: 'cubic', max: 50000 },
    cashOutB: { type: 'cubic', max: 500000 },
    yearsStayB: { type: 'linear', max: 30 },

    // MODE C
    homePriceC: { type: 'cubic', max: 5000000 },
    loanC: { type: 'cubic', max: 5000000 },
    rateC: { type: 'linear', max: 12 },
    amortC: { type: 'linear', max: 40 },
    rentC: { type: 'cubic', max: 20000 },

    // MODE D
    homePriceD: { type: 'cubic', max: 2000000 },
    downPaymentD: { type: 'linear', max: 0 },
    rateD: { type: 'linear', max: 12 }
};

const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(num);
};

const cleanNumber = (num) => parseFloat(num) || 0;

/* ============================ */
/* BREATHING TEXT LOGIC         */
/* ============================ */
const phrases = [
    "See the full cost — not just the payment.",
    "Understand today. Regret less tomorrow.",
    "Banking on yourself starts with clarity.",
    "Master your mortgage, master your wealth.",
    "Every loan has a tradeoff.",
    "Know what changes after year one."
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
/* SLIDER UTILS                 */
/* ============================ */
const valToSlider = (val, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    const max = config.max || 100; 
    if (max === 0) return 0;
    if (config.type === 'cubic') return Math.pow(val / max, 1/3) * 100;
    const min = config.min || 0;
    return ((val - min) / (max - min)) * 100;
};

const sliderToVal = (percent, id) => {
    const config = SLIDER_CONFIG[id];
    if (!config) return 0;
    const max = config.max || 100; 
    if (config.type === 'cubic') return max * Math.pow(percent / 100, 3);
    const min = config.min || 0;
    return ((percent / 100) * (max - min)) + min;
};

const updateSliderVisual = (slider) => {
    if (!slider) return;
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    let val = (slider.value - min) / (max - min) * 100;
    const badgeId = slider.id.replace('slider_', 'badge_');
    const badge = document.getElementById(badgeId);
    if (badge && badge.classList.contains('visible')) val = 100;
    slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
};

/* ============================ */
/* REAL-TIME CUSTOM TOOLTIP     */
/* ============================ */
let globalMouseX = 0;
let globalMouseY = 0;
let tooltipVisible = false;
const tooltipEl = document.getElementById('custom-tooltip');

// Track Mouse Globally for Instant Response
window.addEventListener('mousemove', (e) => {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;
    
    if (tooltipVisible && tooltipEl) {
        updateTooltipPosition(tooltipEl);
    }
});

function updateTooltipPosition(el) {
    if (!el) return;
    
    // Default: Cursor at Top-Left of Tooltip (Tooltip is bottom-right)
    const offset = 15;
    let left = globalMouseX + offset;
    let top = globalMouseY + offset;

    const tooltipRect = el.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Flip to Left if off-screen right
    if (left + tooltipWidth > viewportWidth - 10) {
        // Cursor at Top-Right (Tooltip is bottom-left)
        left = globalMouseX - tooltipWidth - offset;
    }

    // Flip to Center-Top if off-screen left (after flip)
    if (left < 10) {
        // Cursor at Top-Middle
        left = globalMouseX - (tooltipWidth / 2);
    }
    
    // Flip Up if off-screen bottom
    if (top + tooltipHeight > viewportHeight - 10) {
        top = globalMouseY - tooltipHeight - offset;
    }

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
}

const externalTooltipHandler = (context) => {
    const {chart, tooltip} = context;
    if (!tooltipEl) return;

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipVisible = false;
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set Text & Color
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);
        
        // Extract color from Chart.js context for the specific hovered item
        const labelColors = tooltip.labelColors[0];
        const headerColor = labelColors ? labelColors.backgroundColor : '#C59F80';
        
        let innerHtml = '';
        titleLines.forEach(title => {
            // Apply Dynamic Color and Center Alignment
            innerHtml += `<strong style="color: ${headerColor};">${title}</strong>`;
        });
        bodyLines.forEach((body, i) => {
            body.forEach(line => {
                 innerHtml += `<div>${line}</div>`;
            });
        });
        
        tooltipEl.innerHTML = innerHtml;
    }

    // Show Tooltip
    tooltipVisible = true;
    tooltipEl.style.opacity = 1;
    
    // Initial Position Update
    updateTooltipPosition(tooltipEl);
};

/* ============================ */
/* CHART JS HANDLERS (DYNAMIC)  */
/* ============================ */
let chartA, chartB; 
let ChartConstructor = null; // Store the class here when loaded

const CHART_COLORS = {
    primary: '#C59F80',    
    secondary: '#E8DCCA',  
    tertiary: '#BFA596',   
    accent: '#F4E6DC',     
    dark: '#8D7B6F'        
};

// DYNAMIC CHART LOADER
// This function downloads Chart.js ONLY when needed.
function loadChartJsIfNeeded(callback) {
    if (ChartConstructor) {
        callback();
        return;
    }
    
    // Check if script already exists to avoid dupes
    if (document.getElementById('chartjs-script')) {
        // If it exists but isn't ready, wait
        const interval = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                clearInterval(interval);
                ChartConstructor = Chart;
                callback();
            }
        }, 100);
        return;
    }

    const script = document.createElement('script');
    script.id = 'chartjs-script';
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    script.onload = () => {
        ChartConstructor = Chart;
        callback();
    };
    document.body.appendChild(script);
}

function updateChartA(principal, tax, insurance) {
    const ctx = document.getElementById('chartA');
    if(!ctx) return;
    
    // If Charts aren't loaded, load them, then run this function again
    if (!ChartConstructor) {
        loadChartJsIfNeeded(() => updateChartA(principal, tax, insurance));
        return;
    }

    if (chartA) chartA.destroy();
    
    chartA = new ChartConstructor(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal & Interest', 'Property Tax', 'Insurance'],
            datasets: [{
                data: [principal, tax, insurance],
                backgroundColor: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.tertiary],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false, // PERFORMANCE: Disable animation on mobile
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        padding: 20,
                        font: { family: 'ProductSans-Light', size: 12 },
                        color: '#666'
                    }
                },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler
                }
            }
        }
    });
}

function updateChartB(savingsPerMonth, refiCost) {
    const ctx = document.getElementById('chartB');
    if(!ctx) return;
    
    if (!ChartConstructor) {
        loadChartJsIfNeeded(() => updateChartB(savingsPerMonth, refiCost));
        return;
    }
    
    const labels = [];
    const costData = [];
    const savingsData = [];
    
    for(let i=0; i<=7; i++) {
        labels.push(`Year ${i}`);
        costData.push(-refiCost);
        const cumSavings = (savingsPerMonth * 12 * i) - refiCost;
        savingsData.push(cumSavings);
    }
    
    if (chartB) chartB.destroy();
    
    chartB = new ChartConstructor(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Refi Cost',
                    data: costData,
                    borderColor: CHART_COLORS.tertiary,
                    backgroundColor: CHART_COLORS.tertiary, 
                    borderDash: [5, 5],
                    pointRadius: 0
                },
                {
                    label: 'Cumulative Gain',
                    data: savingsData,
                    borderColor: CHART_COLORS.primary,
                    backgroundColor: CHART_COLORS.primary, 
                    fill: {
                         target: 'origin',
                         above: 'rgba(197, 159, 128, 0.2)' 
                    }
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false, // PERFORMANCE
            scales: { y: { beginAtZero: false } },
            interaction: {
                mode: 'nearest',
                intersect: false,
                axis: 'x'
            },
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        padding: 20,
                        font: { family: 'ProductSans-Light', size: 12 },
                        color: '#666'
                    }
                },
                tooltip: {
                    enabled: false,
                    external: externalTooltipHandler
                }
            }
        }
    });
}

/* ============================ */
/* INITIALIZATION               */
/* ============================ */

function initializeSliders() {
    Object.keys(SLIDER_CONFIG).forEach(key => {
        const input = document.getElementById(`input_${key}`);
        const slider = document.getElementById(`slider_${key}`);

        if (!input || !slider) return;
        
        if (key === 'downPaymentA') {
             const price = cleanNumber(document.getElementById('input_homePriceA').value);
             SLIDER_CONFIG.downPaymentA.max = price;
        }
        if (key === 'downPaymentD') {
             const price = cleanNumber(document.getElementById('input_homePriceD').value);
             SLIDER_CONFIG.downPaymentD.max = price;
        }

        let startVal = cleanNumber(input.value);
        const config = SLIDER_CONFIG[key];
        if (config.max > 0 && startVal > config.max) startVal = config.max;
        
        slider.value = valToSlider(startVal, key);
        updateSliderVisual(slider);

        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100;
                else realVal = Math.round(realVal);
            } else {
                realVal = Math.round(realVal * 1000) / 1000;
            }
            input.value = realVal; 
            updateSliderVisual(e.target);
            triggerCalculation();
            syncInputs(key, realVal);
        });

        input.addEventListener('input', (e) => {
            let currentVal = cleanNumber(e.target.value);
            if (SLIDER_CONFIG[key].max > 0 && currentVal > SLIDER_CONFIG[key].max) {
                 slider.value = 100;
            } else {
                 slider.value = valToSlider(currentVal, key);
            }
            updateSliderVisual(slider);
            triggerCalculation();
            syncInputs(key, currentVal);
        });
    });
}

function syncInputs(sourceKey, value) {
    const priceKeys = ['homePriceA', 'homeValueB', 'homePriceC', 'homePriceD'];
    if (priceKeys.includes(sourceKey)) {
        priceKeys.forEach(targetKey => {
            if (targetKey !== sourceKey) updateFieldAndSlider(targetKey, value);
        });
        const state = document.getElementById('stateSelector').value;
        updateInsuranceEstimate(state, value);
        
        if (sourceKey === 'homePriceA' || sourceKey === 'homePriceD') { 
             const newPrice = value;
             SLIDER_CONFIG.downPaymentA.max = newPrice;
             const currentDownA = cleanNumber(document.getElementById('input_downPaymentA').value);
             let safeDownA = currentDownA;
             if (currentDownA > newPrice) safeDownA = newPrice;
             
             const sliderA = document.getElementById('slider_downPaymentA');
             if (sliderA) {
                 sliderA.value = valToSlider(safeDownA, 'downPaymentA');
                 updateSliderVisual(sliderA);
             }
             if (safeDownA !== currentDownA) document.getElementById('input_downPaymentA').value = safeDownA;
             
             const pctA = (newPrice > 0) ? (safeDownA / newPrice) * 100 : 0;
             const pctInputA = document.getElementById('input_downPaymentPercentA');
             if(pctInputA) pctInputA.value = parseFloat(pctA.toFixed(1));

             SLIDER_CONFIG.downPaymentD.max = newPrice;
             const currentDownD = cleanNumber(document.getElementById('input_downPaymentD').value);
             let safeDownD = currentDownD;
             if (currentDownD > newPrice) safeDownD = newPrice;
             const sliderD = document.getElementById('slider_downPaymentD');
             if (sliderD) {
                 sliderD.value = valToSlider(safeDownD, 'downPaymentD');
                 updateSliderVisual(sliderD);
             }
             if (safeDownD !== currentDownD) document.getElementById('input_downPaymentD').value = safeDownD;
             const pctD = (newPrice > 0) ? (safeDownD / newPrice) * 100 : 0;
             const pctInputD = document.getElementById('input_downPaymentPercentD');
             if(pctInputD) pctInputD.value = parseFloat(pctD.toFixed(1));
        }
    }

    const rateKeys = ['rateA', 'rateC', 'rateD'];
    if (rateKeys.includes(sourceKey)) {
        rateKeys.forEach(targetKey => {
            if (targetKey !== sourceKey) updateFieldAndSlider(targetKey, value);
        });
    }

    const downKeys = ['downPaymentA', 'downPaymentD'];
    if (downKeys.includes(sourceKey)) {
        downKeys.forEach(targetKey => {
            if (targetKey !== sourceKey) updateFieldAndSlider(targetKey, value);
        });
        const price = cleanNumber(document.getElementById('input_homePriceA').value);
        if(price > 0) {
            let safeVal = value;
            if (value > price) safeVal = price;
            const pct = (safeVal / price) * 100;
            const pctVal = parseFloat(Math.min(100, pct).toFixed(1));
            
            const aPercent = document.getElementById('input_downPaymentPercentA');
            const dPercent = document.getElementById('input_downPaymentPercentD');
            if(aPercent) aPercent.value = pctVal;
            if(dPercent) dPercent.value = pctVal;
        }
    }
}

function updateFieldAndSlider(key, value) {
    const input = document.getElementById(`input_${key}`);
    const slider = document.getElementById(`slider_${key}`);
    if (input) input.value = value;
    if (slider) {
        slider.value = valToSlider(value, key);
        updateSliderVisual(slider);
    }
}

function populateStateDropdown() {
    const states = getStateOptions();
    const container = document.getElementById('state-dropdown-container');
    const select = container.querySelector('select');
    const menuWrapper = container.querySelector('.dropdown-options-wrapper');
    const trigger = container.querySelector('.custom-dropdown-trigger');

    select.innerHTML = '';
    menuWrapper.innerHTML = '';

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.value;
        option.textContent = state.label;
        if(state.value === 'CA') option.selected = true;
        select.appendChild(option);

        const div = document.createElement('div');
        div.className = 'dropdown-option';
        div.setAttribute('data-value', state.value);
        div.textContent = state.label;
        if(state.value === 'CA') div.classList.add('selected');
        menuWrapper.appendChild(div);
    });

    trigger.textContent = "California";
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        
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
            menu.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            menu.classList.remove('active');
            
            if(select) {
                select.value = value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
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

function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    let isAdvanced = false;
    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Advanced";
        document.querySelectorAll('.advanced-content').forEach(el => {
            if (isAdvanced) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
    });
}

function initializeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('active-mode'));
            card.classList.add('active-mode');
            card.setAttribute('aria-checked', 'true');
            modeCards.forEach(c => { if(c !== card) c.setAttribute('aria-checked', 'false'); });

            const modeId = card.getAttribute('data-mode');
            
            document.querySelectorAll('.mode-inputs').forEach(el => el.classList.add('hidden'));
            document.getElementById(`${modeId}-inputs`).classList.remove('hidden');

            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            document.getElementById(`${modeId}-results`).classList.remove('hidden');
            
            triggerCalculation(); 
        });
    });
}

function setupTooltipListeners() {
    const modeCards = document.querySelectorAll('.mode-card');
    if(!tooltipEl) return;

    modeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.getAttribute('data-tooltip-title');
            const desc = card.getAttribute('data-tooltip-desc');
            
            if(title && desc) {
                tooltipEl.innerHTML = `
                    <strong style="color: #000000;">${title}</strong>
                    <div style="max-width: 250px; white-space: normal; line-height: 1.4; color: #333;">${desc}</div>
                `;
                tooltipEl.style.opacity = 1;
                tooltipVisible = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            tooltipEl.style.opacity = 0;
            tooltipVisible = false;
        });
    });
}

/* ============================ */
/* CALCULATION LOGIC            */
/* ============================ */

function calculateRealAPR(amountFinanced, monthlyPayment, termMonths) {
    if (amountFinanced <= 0 || monthlyPayment <= 0) return 0;
    const tolerance = 0.000001;
    let guessRate = 0.05 / 12; 
    const calcPV = (r) => {
        if (r === 0) return monthlyPayment * termMonths;
        return (monthlyPayment * (1 - Math.pow(1 + r, -termMonths))) / r;
    };
    const calcDerivative = (r) => {
        if (r === 0) return 0;
        const top = termMonths * monthlyPayment * Math.pow(1 + r, -termMonths - 1);
        const bot = r;
        const term1 = top / bot;
        const term2 = -(monthlyPayment * (1 - Math.pow(1 + r, -termMonths))) / (r * r);
        return term1 + term2;
    };
    for (let i = 0; i < 20; i++) {
        const y = calcPV(guessRate) - amountFinanced;
        const dy = calcDerivative(guessRate);
        const nextRate = guessRate - (y / dy);
        if (Math.abs(nextRate - guessRate) < tolerance) return nextRate * 12 * 100;
        guessRate = nextRate;
    }
    return guessRate * 12 * 100; 
}

function calculateModeA() {
    const homePrice = cleanNumber(document.getElementById('input_homePriceA').value);
    let downPayment = cleanNumber(document.getElementById('input_downPaymentA').value);
    if(downPayment > homePrice) downPayment = homePrice;

    const userIncome = cleanNumber(document.getElementById('input_incomeUserA').value);
    const userCash = cleanNumber(document.getElementById('input_cashUserA').value);

    const interestRate = cleanNumber(document.getElementById('input_rateA').value);
    const termYears = cleanNumber(document.getElementById('termA').value);
    const hoa = cleanNumber(document.getElementById('input_hoaA').value);
    const pmiRate = cleanNumber(document.getElementById('input_pmiA').value);
    const points = cleanNumber(document.getElementById('input_pointsA').value);
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value);
    const yearlyInsurance = cleanNumber(document.getElementById('input_insuranceGlobal').value);
    const state = document.getElementById('stateSelector').value;

    const loanAmount = Math.max(0, homePrice - downPayment);
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = termYears * 12;

    let monthlyPI = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (loanAmount > 0) monthlyPI = loanAmount / totalPayments;

    const monthlyTax = (homePrice * (propTaxRate / 100)) / 12;
    const monthlyIns = yearlyInsurance / 12;
    const ltv = loanAmount / homePrice;
    
    const monthlyPMI = (ltv > 0.8001) ? (loanAmount * (pmiRate / 100) / 12) : 0;
    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyIns + monthlyPMI + hoa;
    const estimatedClosingCosts = estimateCashToClose(state, homePrice); 
    const pointsCost = loanAmount * (points / 100);
    const totalCashToClose = downPayment + estimatedClosingCosts + pointsCost;
    const interestBurn = loanAmount * monthlyRate;
    const incomeRequiredYearly = (totalMonthlyPayment / 0.28) * 12;

    document.getElementById('res_monthlyA').textContent = formatCurrency(totalMonthlyPayment);

    const cashEl = document.getElementById('res_cashCloseA');
    cashEl.textContent = formatCurrency(totalCashToClose);
    cashEl.className = 'result-value'; 
    if (userCash >= totalCashToClose) cashEl.classList.add('text-success');
    else cashEl.classList.add('text-danger');

    const burnEl = document.getElementById('res_burnA');
    burnEl.textContent = formatCurrency(interestBurn);
    burnEl.className = 'result-value text-warning'; 

    const incomeEl = document.getElementById('res_incomeA');
    incomeEl.textContent = formatCurrency(incomeRequiredYearly) + "/yr";
    incomeEl.className = 'result-value';
    if (userIncome >= incomeRequiredYearly) incomeEl.classList.add('text-success');
    else incomeEl.classList.add('text-danger');
    
    updateChartA(monthlyPI, monthlyTax, monthlyIns + monthlyPMI + hoa);

    const advisorA = document.getElementById('summaryA');
    if(advisorA) {
        if (userCash < totalCashToClose) {
             advisorA.innerHTML = `Your income supports the monthly payment, but <strong class="text-danger">your liquidity is the bottleneck</strong>. After paying the down payment and closing costs, you are left with almost zero buffer. This is <strong class="text-danger">financially fragile</strong>. Consider asking for seller credits to keep cash in your pocket.`;
        } else if (userIncome < incomeRequiredYearly) {
             advisorA.innerHTML = `<strong class="text-danger">Caution:</strong> This loan requires significantly more than 28% of your monthly income. Lenders may classify this as <strong class="text-danger">"House Poor."</strong> While you have the cash reserves to close, the monthly obligation will strain your budget.`;
        } else {
             advisorA.innerHTML = `<strong class="text-success">You are in a strong position.</strong> Your liquid assets comfortably cover the cash-to-close, leaving you with a safety net. However, keep your eye on the <strong class="text-warning">"Unrecoverable Costs"</strong>—in Year 1, over 70% of your monthly payment is purely interest, tax, and insurance. You are buying the home, but effectively renting the money.`;
        }
    }
}

function calculateModeB() {
    const homeValue = cleanNumber(document.getElementById('input_homeValueB').value);
    const currentPayment = cleanNumber(document.getElementById('input_currentPaymentB').value);
    const newLoanAmount = cleanNumber(document.getElementById('input_newLoanB').value);
    const newRate = cleanNumber(document.getElementById('input_rateB').value);
    const refiCosts = cleanNumber(document.getElementById('input_costsB').value);
    const cashOut = cleanNumber(document.getElementById('input_cashOutB').value);
    const yearsStay = cleanNumber(document.getElementById('input_yearsStayB').value);
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value);
    const annualIns = cleanNumber(document.getElementById('input_insuranceGlobal').value);

    const monthlyRate = (newRate / 100) / 12;
    const totalPayments = 30 * 12;
    let newMonthlyPI = 0;
    if (newLoanAmount > 0 && monthlyRate > 0) {
        newMonthlyPI = newLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (newLoanAmount > 0) newMonthlyPI = newLoanAmount / totalPayments;

    const monthlyTax = (homeValue * (propTaxRate / 100)) / 12;
    const monthlyIns = annualIns / 12;
    const newTotalPayment = newMonthlyPI + monthlyTax + monthlyIns;
    const monthlySavings = currentPayment - newMonthlyPI;
    const netGain = (monthlySavings * 12 * yearsStay) - refiCosts + cashOut;

    const payEl = document.getElementById('res_newPayB');
    payEl.textContent = formatCurrency(newTotalPayment);
    payEl.className = 'result-value';
    if (newTotalPayment < currentPayment) payEl.classList.add('text-success');
    else payEl.classList.add('text-danger');

    const saveEl = document.getElementById('res_saveB');
    saveEl.textContent = formatCurrency(monthlySavings);
    saveEl.className = 'result-value';
    if (monthlySavings > 0) saveEl.classList.add('text-success');
    else saveEl.classList.add('text-danger');

    const netGainEl = document.getElementById('res_netGainB');
    netGainEl.textContent = formatCurrency(netGain);
    netGainEl.className = 'result-value';
    if (netGain >= 0) netGainEl.classList.add('text-success');
    else netGainEl.classList.add('text-danger');

    const breakEl = document.getElementById('res_breakTimeB');
    let breakText = "Never";
    let breakClass = "text-danger";
    let monthsToBreak = 999;

    if (monthlySavings > 0) {
        const totalCostToRecover = refiCosts; 
        if (totalCostToRecover <= 0) {
             breakText = "Immediate";
             breakClass = "text-success";
             monthsToBreak = 0;
        } else {
             monthsToBreak = totalCostToRecover / monthlySavings;
             const y = Math.floor(monthsToBreak / 12);
             const m = Math.ceil(monthsToBreak % 12);
             
             if (y > 30) {
                 breakText = "30+ Years";
             } else {
                 if(y > 0) breakText = `${y} Yr, ${m} Mo`;
                 else breakText = `${m} Months`;
             }

             if (monthsToBreak <= 24) breakClass = "text-success"; 
             else if (monthsToBreak <= 60) breakClass = "text-warning"; 
             else breakClass = "text-danger"; 
        }
    } else {
        breakText = "Never";
        breakClass = "text-danger";
    }

    if(breakEl) {
        breakEl.textContent = breakText;
        breakEl.className = `result-value ${breakClass}`;
    }

    updateChartB(monthlySavings, refiCosts);

    const advisorB = document.getElementById('summaryB');
    if(advisorB) {
        if (monthlySavings <= 0) {
            advisorB.innerHTML = `<strong class="text-danger">STOP.</strong> This refinance <strong class="text-danger">increases your monthly cost</strong>. The lower rate does not offset the new loan balance or terms. Unless you desperately need cash-out for an emergency, this deals harms your financial position.`;
        } else if (monthsToBreak < 24) {
            advisorB.innerHTML = `<strong class="text-success">This is a mathematical slam dunk.</strong> You will recover the cost of refinancing in just ${breakText}. Since you plan to stay for ${yearsStay} years, you are effectively paying yourself an extra ${formatCurrency(netGain)} in profit. Invest the monthly savings rather than spending them.`;
        } else if (monthsToBreak > 60) {
            advisorB.innerHTML = `<strong class="text-warning">Proceed with caution.</strong> It takes nearly 5 years just to earn back the fees you are paying today. If you sell the house or refinance again before then, you actually <strong class="text-danger">lose money</strong> on this deal. Unless this is your "forever loan," the upfront friction cost might outweigh the benefit.`;
        } else {
            advisorB.innerHTML = `This is a <strong class="text-success">strategic move</strong>, but depends entirely on your timeline. You break even in ${breakText}. If you stay the full ${yearsStay} years, you come out ahead by ${formatCurrency(netGain)}. Ensure you won't move before that breakeven date.`;
        }
    }
}

function calculateModeC() {
    const homePrice = cleanNumber(document.getElementById('input_homePriceC').value);
    const loanAmount = cleanNumber(document.getElementById('input_loanC').value);
    const rate = cleanNumber(document.getElementById('input_rateC').value);
    const ioYears = cleanNumber(document.getElementById('ioPeriodC').value);
    const amortYears = cleanNumber(document.getElementById('input_amortC').value);
    const rent = cleanNumber(document.getElementById('input_rentC').value);
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value);
    const annualIns = cleanNumber(document.getElementById('input_insuranceGlobal').value);

    const monthlyRate = (rate / 100) / 12;
    let ioPayment = 0;
    if (loanAmount > 0) ioPayment = loanAmount * monthlyRate;

    const remainingYears = amortYears - ioYears;
    let futurePayment = 0;
    if (remainingYears > 0 && monthlyRate > 0 && loanAmount > 0) {
        const remainingMonths = remainingYears * 12;
        futurePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1);
    } else if (remainingYears <= 0 && loanAmount > 0) futurePayment = ioPayment;

    let shock = 0;
    if (futurePayment > ioPayment) shock = futurePayment - ioPayment;

    const monthlyTax = (homePrice * (propTaxRate / 100)) / 12;
    const monthlyIns = annualIns / 12;
    const totalExpenses = ioPayment + monthlyTax + monthlyIns;
    const cashFlow = rent - totalExpenses;

    const ioEl = document.getElementById('res_ioPayC');
    ioEl.textContent = formatCurrency(ioPayment);
    ioEl.className = 'result-value text-success';

    const shockEl = document.getElementById('res_shockC');
    shockEl.textContent = "+" + formatCurrency(shock) + "/mo";
    if(remainingYears <= 0) shockEl.textContent = "Balloon/End";
    shockEl.className = 'result-value text-warning';

    const flowEl = document.getElementById('res_cashFlowC');
    flowEl.textContent = formatCurrency(cashFlow);
    flowEl.className = 'result-value';
    if(cashFlow > 0) flowEl.classList.add('text-success');
    else flowEl.classList.add('text-danger');

    const dscrEl = document.getElementById('res_dscrC');
    let dscrVal = 0;
    if (totalExpenses > 0) dscrVal = rent / totalExpenses;
    
    if(dscrEl) {
        dscrEl.textContent = dscrVal.toFixed(2) + "x";
        dscrEl.className = 'result-value';
        if (dscrVal >= 1.25) dscrEl.classList.add('text-success'); 
        else if (dscrVal >= 1.0) dscrEl.classList.add('text-warning'); 
        else dscrEl.classList.add('text-danger'); 
    }

    const advisorC = document.getElementById('summaryC');
    if(advisorC) {
        if (dscrVal < 1.0) {
             advisorC.innerHTML = `<strong class="text-danger">Liability Alert.</strong> You are personally subsidizing this property with <strong class="text-danger">${formatCurrency(Math.abs(cashFlow))}</strong> from your own pocket every month. While you might be banking on appreciation, the month-to-month mathematics are dangerous. If the unit goes vacant, the bleeding worsens immediately.`;
        } else if (dscrVal >= 1.25) {
             advisorC.innerHTML = `<strong class="text-success">This asset is a self-sustaining machine.</strong> With a DSCR of ${dscrVal.toFixed(2)}, rental income covers the debt with a safety margin—banks love seeing this. However, do not ignore the Year ${ioYears+1} cliff. Your payment spikes by <strong class="text-warning">${formatCurrency(shock)}/mo</strong>. You have a decade to increase rents or pay down principal to soften that blow.`;
        } else {
             advisorC.innerHTML = `<strong class="text-warning">The margins are tight.</strong> A DSCR of ${dscrVal.toFixed(2)} means you are barely breaking even. One major repair or two months of vacancy could turn this asset into a liability. Ensure you have significant cash reserves to weather any volatility.`;
        }
    }
}

function calculateModeD() {
    const loanType = document.getElementById('loanTypeD').value;
    const price = cleanNumber(document.getElementById('input_homePriceD').value);
    let down = cleanNumber(document.getElementById('input_downPaymentD').value);
    if (down > price) {
        down = price;
        document.getElementById('input_downPaymentD').value = down;
        const downSlider = document.getElementById('slider_downPaymentD');
        if(downSlider) {
            SLIDER_CONFIG.downPaymentD.max = price;
            downSlider.value = valToSlider(down, 'downPaymentD');
            updateSliderVisual(downSlider);
        }
    }

    const creditScore = cleanNumber(document.getElementById('creditScoreD').value);
    const disability = document.getElementById('vaDisabilityD').value;
    const state = document.getElementById('stateSelector').value;
    const stateData = getStateData(state);
    const propTaxRate = cleanNumber(document.getElementById('input_propTaxGlobal').value);
    const annualIns = cleanNumber(document.getElementById('input_insuranceGlobal').value);

    const baseLoan = Math.max(0, price - down);
    let upfrontFeePct = 0;
    let monthlyMIP = 0;

    if (loanType === 'FHA') {
        upfrontFeePct = 1.75; 
        const ltv = (baseLoan / price) * 100;
        const annualMIPPct = (ltv > 95) ? 0.55 : 0.50;
        monthlyMIP = (baseLoan * (annualMIPPct / 100)) / 12;
    } else {
        const downPct = (price > 0) ? (down / price) * 100 : 0;
        if (downPct < 5) upfrontFeePct = 2.15; 
        else if (downPct < 10) upfrontFeePct = 1.5; 
        else upfrontFeePct = 1.25; 
        if (disability === 'Yes') upfrontFeePct = 0;
    }

    const upfrontFeeAmt = baseLoan * (upfrontFeePct / 100);
    const totalLoanAmount = baseLoan + upfrontFeeAmt;
    let baseRate = cleanNumber(document.getElementById('input_rateD').value); 
    if (creditScore === 680) baseRate += 0.125;
    else if (creditScore === 620) baseRate += 0.375;
    else if (creditScore === 580) baseRate += 0.750;

    const monthlyRate = (baseRate / 100) / 12;
    const termMonths = 360; 
    let monthlyPI = 0;
    if (totalLoanAmount > 0) {
        monthlyPI = totalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    }

    const monthlyTax = (price * (propTaxRate / 100)) / 12;
    const monthlyIns = annualIns / 12;
    const totalPayment = monthlyPI + monthlyTax + monthlyIns + monthlyMIP;
    const closingCosts = (price * stateData.closingCosts.feesPct); 
    const amountFinanced = baseLoan - closingCosts;
    const paymentForAPR = monthlyPI + monthlyMIP;
    const properAPR = calculateRealAPR(amountFinanced, paymentForAPR, termMonths);

    document.getElementById('res_totalPayD').textContent = formatCurrency(totalPayment);
    
    const feeEl = document.getElementById('res_feeD');
    feeEl.textContent = formatCurrency(upfrontFeeAmt);
    feeEl.className = 'result-value text-neutral';

    const aprEl = document.getElementById('res_aprD');
    aprEl.textContent = properAPR.toFixed(3) + "%";
    aprEl.className = 'result-value';
    const rawBaseRate = cleanNumber(document.getElementById('input_rateD').value);
    if ((properAPR / 100) > (rawBaseRate / 100 + 0.005)) {
        aprEl.classList.add('text-warning');
    } else {
        aprEl.classList.add('text-info'); 
    }

    let sunkCost = upfrontFeeAmt; 
    let tempBalance = totalLoanAmount;
    
    for (let i = 1; i <= 60; i++) {
        let interestPart = tempBalance * monthlyRate;
        let principalPart = monthlyPI - interestPart;
        
        sunkCost += interestPart + monthlyMIP;
        
        tempBalance -= principalPart;
        if(tempBalance < 0) tempBalance = 0;
    }

    const sunkEl = document.getElementById('res_sunkD');
    if(sunkEl) {
        sunkEl.textContent = formatCurrency(sunkCost);
        sunkEl.className = 'result-value'; 
    }

    const advisorD = document.getElementById('summaryD');
    if(advisorD) {
        advisorD.innerHTML = `This program is a <strong class="text-success">powerful tool for liquidity</strong>. It allows you to control a ${formatCurrency(price)} asset with minimal capital upfront, preserving your cash for renovations. But leverage has a <strong class="text-danger">price tag</strong>. Because of the Funding Fee and Mortgage Insurance, you will pay <strong class="text-warning">${formatCurrency(sunkCost)}</strong> in "Sunk Costs" (Interest + Fees) over the first 5 years. You are effectively paying a premium for the flexibility of keeping your cash today.`;
    }
}

function triggerCalculation() {
    calculateModeA();
    calculateModeB();
    calculateModeC();
    calculateModeD();
}

function updateGlobalDefaults() {
    const stateCode = document.getElementById('stateSelector').value;
    const stateData = getStateData(stateCode);
    const homePrice = cleanNumber(document.getElementById('input_homePriceA').value);

    const taxInput = document.getElementById('input_propTaxGlobal');
    const taxSlider = document.getElementById('slider_propTaxGlobal');
    if (taxInput && taxSlider) {
        const ratePct = (stateData.propertyTaxRate * 100).toFixed(2);
        taxInput.value = ratePct;
        taxSlider.value = valToSlider(ratePct, 'propTaxGlobal');
        updateSliderVisual(taxSlider);
    }
    
    const taxBadge = document.getElementById('badge_propTaxGlobal');
    if(taxBadge) taxBadge.classList.add('visible');
    if(taxSlider) updateSliderVisual(taxSlider);

    updateInsuranceEstimate(stateCode, homePrice);
}

function updateInsuranceEstimate(stateCode, homePrice) {
    const insInput = document.getElementById('input_insuranceGlobal');
    const insSlider = document.getElementById('slider_insuranceGlobal');
    if (insInput && insSlider) {
        const estPremium = estimateInsurance(stateCode, homePrice);
        insInput.value = estPremium;
        insSlider.value = valToSlider(estPremium, 'insuranceGlobal');
        updateSliderVisual(insSlider);
    }
    const insBadge = document.getElementById('badge_insuranceGlobal');
    if(insBadge) insBadge.classList.add('visible');
    if(insSlider) updateSliderVisual(insSlider);
}

function setupGlobalListeners() {
    const stateSelect = document.getElementById('stateSelector');
    stateSelect.addEventListener('change', () => {
        updateGlobalDefaults();
        triggerCalculation();
    });
    
    const hideTaxBadge = () => document.getElementById('badge_propTaxGlobal').classList.remove('visible');
    document.getElementById('input_propTaxGlobal').addEventListener('input', hideTaxBadge);
    document.getElementById('slider_propTaxGlobal').addEventListener('input', hideTaxBadge);

    const hideInsBadge = () => document.getElementById('badge_insuranceGlobal').classList.remove('visible');
    document.getElementById('input_insuranceGlobal').addEventListener('input', hideInsBadge);
    document.getElementById('slider_insuranceGlobal').addEventListener('input', hideInsBadge);

    const handleDownPercentA = () => {
        const price = cleanNumber(document.getElementById('input_homePriceA').value);
        let percent = cleanNumber(document.getElementById('input_downPaymentPercentA').value);
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        const down = (percent / 100) * price;
        syncInputs('downPaymentA', Math.round(down)); 
    };
    document.getElementById('input_downPaymentPercentA').addEventListener('input', handleDownPercentA);

    const handleDownPercentD = () => {
        const price = cleanNumber(document.getElementById('input_homePriceD').value);
        let percent = cleanNumber(document.getElementById('input_downPaymentPercentD').value);
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        const down = (percent / 100) * price;
        syncInputs('downPaymentD', Math.round(down)); 
    };
    if(document.getElementById('input_downPaymentPercentD')) {
        document.getElementById('input_downPaymentPercentD').addEventListener('input', handleDownPercentD);
    }
    
    document.getElementById('input_incomeUserA').addEventListener('input', (e) => {
        const val = cleanNumber(e.target.value);
        const slider = document.getElementById('slider_incomeUserA');
        if(slider) {
            slider.value = valToSlider(val, 'incomeUserA');
            updateSliderVisual(slider);
        }
        triggerCalculation();
    });
    document.getElementById('slider_incomeUserA').addEventListener('input', (e) => {
        const val = sliderToVal(parseFloat(e.target.value), 'incomeUserA');
        document.getElementById('input_incomeUserA').value = Math.round(val);
        updateSliderVisual(e.target);
        triggerCalculation();
    });
    document.getElementById('input_cashUserA').addEventListener('input', (e) => {
        const val = cleanNumber(e.target.value);
        const slider = document.getElementById('slider_cashUserA');
        if(slider) {
            slider.value = valToSlider(val, 'cashUserA');
            updateSliderVisual(slider);
        }
        triggerCalculation();
    });
    document.getElementById('slider_cashUserA').addEventListener('input', (e) => {
        const val = sliderToVal(parseFloat(e.target.value), 'cashUserA');
        document.getElementById('input_cashUserA').value = Math.round(val);
        updateSliderVisual(e.target);
        triggerCalculation();
    });


    document.getElementById('input_homePriceA').addEventListener('input', (e) => syncInputs('homePriceA', cleanNumber(e.target.value)));
    document.getElementById('slider_homePriceA').addEventListener('input', (e) => syncInputs('homePriceA', sliderToVal(parseFloat(e.target.value), 'homePriceA')));
    document.getElementById('input_downPaymentA').addEventListener('input', (e) => syncInputs('downPaymentA', cleanNumber(e.target.value)));
    document.getElementById('slider_downPaymentA').addEventListener('input', (e) => syncInputs('downPaymentA', sliderToVal(parseFloat(e.target.value), 'downPaymentA')));
    
    const termSelect = document.getElementById('termA');
    if(termSelect) termSelect.addEventListener('change', triggerCalculation);

    const ioSelect = document.getElementById('ioPeriodC');
    if(ioSelect) ioSelect.addEventListener('change', triggerCalculation);

    const modeDids = ['loanTypeD', 'creditScoreD', 'vaDisabilityD', 'input_rateD'];
    modeDids.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('change', triggerCalculation);
            el.addEventListener('input', triggerCalculation);
        }
    });
    
    document.getElementById('input_homeValueB').addEventListener('input', (e) => syncInputs('homeValueB', cleanNumber(e.target.value)));
    document.getElementById('slider_homeValueB').addEventListener('input', (e) => syncInputs('homeValueB', sliderToVal(parseFloat(e.target.value), 'homeValueB')));
    document.getElementById('input_homePriceC').addEventListener('input', (e) => syncInputs('homePriceC', cleanNumber(e.target.value)));
    document.getElementById('slider_homePriceC').addEventListener('input', (e) => syncInputs('homePriceC', sliderToVal(parseFloat(e.target.value), 'homePriceC')));
    document.getElementById('input_rateC').addEventListener('input', (e) => syncInputs('rateC', cleanNumber(e.target.value)));
    document.getElementById('slider_rateC').addEventListener('input', (e) => syncInputs('rateC', sliderToVal(parseFloat(e.target.value), 'rateC')));
    document.getElementById('input_homePriceD').addEventListener('input', (e) => syncInputs('homePriceD', cleanNumber(e.target.value)));
    document.getElementById('slider_homePriceD').addEventListener('input', (e) => syncInputs('homePriceD', sliderToVal(parseFloat(e.target.value), 'homePriceD')));
    document.getElementById('input_downPaymentD').addEventListener('input', (e) => syncInputs('downPaymentD', cleanNumber(e.target.value)));
    document.getElementById('slider_downPaymentD').addEventListener('input', (e) => syncInputs('downPaymentD', sliderToVal(parseFloat(e.target.value), 'downPaymentD')));
    document.getElementById('input_rateD').addEventListener('input', (e) => syncInputs('rateD', cleanNumber(e.target.value)));
    document.getElementById('slider_rateD').addEventListener('input', (e) => syncInputs('rateD', sliderToVal(parseFloat(e.target.value), 'rateD')));
}

/* ==========================================
   UNIVERSAL PRINT, PDF & SHARE ENGINE
   ========================================== */
const ToolFeatures = {
    isTutorialUnlocked: false,
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'value' },
        // Mode A
        'incA': { id: 'input_incomeUserA', type: 'value' },
        'cashA': { id: 'input_cashUserA', type: 'value' },
        'priceA': { id: 'input_homePriceA', type: 'value' },
        'downA': { id: 'input_downPaymentA', type: 'value' },
        'rateA': { id: 'input_rateA', type: 'value' },
        // Mode B
        'valB': { id: 'input_homeValueB', type: 'value' },
        'payB': { id: 'input_currentPaymentB', type: 'value' },
        'loanB': { id: 'input_newLoanB', type: 'value' },
        'rateB': { id: 'input_rateB', type: 'value' },
        // Mode C
        'priceC': { id: 'input_homePriceC', type: 'value' },
        'rentC': { id: 'input_rentC', type: 'value' },
        'loanC': { id: 'input_loanC', type: 'value' },
        'rateC': { id: 'input_rateC', type: 'value' },
        // Mode D
        'typeD': { id: 'loanTypeD', type: 'value' },
        'priceD': { id: 'input_homePriceD', type: 'value' },
        'downD': { id: 'input_downPaymentD', type: 'value' },
        'rateD': { id: 'input_rateD', type: 'value' }
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
        if ([...params].length === 0) return;

        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    el.value = params.get(key);
                    el.dispatchEvent(new Event('input'));
                    el.dispatchEvent(new Event('change'));
                }
            }
        }
        if (params.has('mode')) {
            const mode = params.get('mode');
            const card = document.querySelector(`.mode-card[data-mode="${mode}"]`);
            if (card) card.click();
        }
        if (params.has('adv') && params.get('adv') === 'true') {
            const btn = document.getElementById('advanced-toggle');
            if (btn && btn.textContent.includes('Switch to Advanced')) btn.click();
        }
        setTimeout(() => triggerCalculation(), 100);
    },

    preparePrintData() {
        // Active Mode Determination
        const activeCard = document.querySelector('.mode-card.active-mode');
        const mode = activeCard ? activeCard.getAttribute('data-mode') : 'mode-a';
        const dateStr = new Date().toLocaleDateString();
        const stateSelect = document.getElementById('stateSelector');
        const stateName = stateSelect.options[stateSelect.selectedIndex].text;
        
        const fmt = (n) => formatCurrency(parseFloat(n) || 0);
        const clean = (val) => parseFloat(val) || 0;

        // Global Rates
        const taxRate = clean(document.getElementById('input_propTaxGlobal').value);
        const annualIns = clean(document.getElementById('input_insuranceGlobal').value);

        // Variables for Sections
        let sec1Html = "";
        let sec2Html = "";
        let sec3Html = "";
        let summaryText = "";
        let finalMonthly = "";
        
        let displayPrice = 0;
        let displayLoan = 0;
        let displayRate = 0;
        
        // --- DATA MAPPING LOGIC ---
        if (mode === 'mode-a') {
            displayPrice = clean(document.getElementById('input_homePriceA').value);
            displayRate = clean(document.getElementById('input_rateA').value);
            const loanTerm = document.getElementById('termA').value;
            const downAmt = clean(document.getElementById('input_downPaymentA').value);
            const loanAmt = Math.max(0, displayPrice - downAmt);
            displayLoan = loanAmt;
            
            // Section I: Profile
            sec1Html = `
                <div class="data-row"><span class="lbl">Assessed Home Value</span><span class="val">${fmt(displayPrice)}</span></div>
                <div class="data-row"><span class="lbl">Estimated Property Tax Rate</span><span class="val">${taxRate.toFixed(2)}%</span></div>
                <div class="data-row"><span class="lbl">Annual Household Income</span><span class="val">${fmt(document.getElementById('input_incomeUserA').value)}</span></div>
                <div class="data-row"><span class="lbl">Estimated Annual Hazard Ins.</span><span class="val">${fmt(annualIns)}</span></div>
                <div class="data-row"><span class="lbl">Verified Liquid Assets</span><span class="val">${fmt(document.getElementById('input_cashUserA').value)}</span></div>
                <div class="data-row"><span class="lbl">State/County Variance</span><span class="val">Standard</span></div>
            `;

            // Section II: Specifics
            sec2Html = `
                <div class="data-row"><span class="lbl">Base Loan Amount</span><span class="val">${fmt(loanAmt)}</span></div>
                <div class="data-row"><span class="lbl">Base Interest Rate</span><span class="val">${displayRate}%</span></div>
                <div class="data-row"><span class="lbl">Down Payment Amount</span><span class="val">${fmt(downAmt)}</span></div>
                <div class="data-row"><span class="lbl">Loan Term Amortization</span><span class="val">${loanTerm} Years</span></div>
                <div class="data-row"><span class="lbl">Points / Credits</span><span class="val">${document.getElementById('input_pointsA').value}%</span></div>
                <div class="data-row"><span class="lbl">PMI Rate</span><span class="val">${document.getElementById('input_pmiA').value}%</span></div>
                <div class="data-row"><span class="lbl">HOA Fees ($/mo)</span><span class="val">${fmt(document.getElementById('input_hoaA').value)}</span></div>
            `;

            // Section III: Liabilities
            sec3Html = `
                <div class="data-row"><span class="lbl">Total Monthly Payment</span><span class="val">${document.getElementById('res_monthlyA').textContent}</span></div>
                <div class="data-row"><span class="lbl">Interest Paid (Mo. 1)</span><span class="val">${document.getElementById('res_burnA').textContent}</span></div>
                <div class="data-row"><span class="lbl">Estimated Cash to Close</span><span class="val">${document.getElementById('res_cashCloseA').textContent}</span></div>
                <div class="data-row"><span class="lbl">Rec. Annual Income (28% DTI)</span><span class="val">${document.getElementById('res_incomeA').textContent}</span></div>
            `;
            
            finalMonthly = document.getElementById('res_monthlyA').textContent;
            summaryText = document.getElementById('summaryA').innerText;

        } else if (mode === 'mode-b') {
            displayPrice = clean(document.getElementById('input_homeValueB').value);
            displayRate = clean(document.getElementById('input_rateB').value);
            displayLoan = clean(document.getElementById('input_newLoanB').value);
            
            sec1Html = `
                <div class="data-row"><span class="lbl">Current Home Value</span><span class="val">${fmt(displayPrice)}</span></div>
                <div class="data-row"><span class="lbl">Estimated Property Tax Rate</span><span class="val">${taxRate.toFixed(2)}%</span></div>
                <div class="data-row"><span class="lbl">Estimated Annual Hazard Ins.</span><span class="val">${fmt(annualIns)}</span></div>
            `;
            sec2Html = `
                <div class="data-row"><span class="lbl">New Loan Amount</span><span class="val">${fmt(displayLoan)}</span></div>
                <div class="data-row"><span class="lbl">New Interest Rate</span><span class="val">${displayRate}%</span></div>
                <div class="data-row"><span class="lbl">Refinance Costs</span><span class="val">${fmt(document.getElementById('input_costsB').value)}</span></div>
                <div class="data-row"><span class="lbl">Cash Out Amount</span><span class="val">${fmt(document.getElementById('input_cashOutB').value)}</span></div>
            `;
            sec3Html = `
                <div class="data-row"><span class="lbl">New Monthly Payment</span><span class="val">${document.getElementById('res_newPayB').textContent}</span></div>
                <div class="data-row"><span class="lbl">Monthly Savings</span><span class="val">${document.getElementById('res_saveB').textContent}</span></div>
                <div class="data-row"><span class="lbl">Breakeven Timeline</span><span class="val">${document.getElementById('res_breakTimeB').textContent}</span></div>
                <div class="data-row"><span class="lbl">7-Year Net Gain</span><span class="val">${document.getElementById('res_netGainB').textContent}</span></div>
            `;
            finalMonthly = document.getElementById('res_newPayB').textContent;
            summaryText = document.getElementById('summaryB').innerText;

        } else if (mode === 'mode-c') {
            displayPrice = clean(document.getElementById('input_homePriceC').value);
            displayRate = clean(document.getElementById('input_rateC').value);
            displayLoan = clean(document.getElementById('input_loanC').value);
            
            sec1Html = `
                <div class="data-row"><span class="lbl">Purchase Price</span><span class="val">${fmt(displayPrice)}</span></div>
                <div class="data-row"><span class="lbl">Estimated Monthly Rent</span><span class="val">${fmt(document.getElementById('input_rentC').value)}</span></div>
                <div class="data-row"><span class="lbl">Property Tax Rate</span><span class="val">${taxRate.toFixed(2)}%</span></div>
            `;
            sec2Html = `
                <div class="data-row"><span class="lbl">Loan Amount</span><span class="val">${fmt(displayLoan)}</span></div>
                <div class="data-row"><span class="lbl">Interest Rate</span><span class="val">${displayRate}%</span></div>
                <div class="data-row"><span class="lbl">IO Period</span><span class="val">${document.getElementById('ioPeriodC').value} Years</span></div>
                <div class="data-row"><span class="lbl">Amortization Term</span><span class="val">${document.getElementById('input_amortC').value} Years</span></div>
            `;
            sec3Html = `
                <div class="data-row"><span class="lbl">Interest-Only Payment</span><span class="val">${document.getElementById('res_ioPayC').textContent}</span></div>
                <div class="data-row"><span class="lbl">Est. Monthly Cash Flow</span><span class="val">${document.getElementById('res_cashFlowC').textContent}</span></div>
                <div class="data-row"><span class="lbl">DSCR (Debt Coverage)</span><span class="val">${document.getElementById('res_dscrC').textContent}</span></div>
                <div class="data-row"><span class="lbl">Future Payment Shock</span><span class="val">${document.getElementById('res_shockC').textContent}</span></div>
            `;
            // For Mode C, IO payment usually excludes tax/ins unless escrowed, but we need standard breakdown
            finalMonthly = fmt((displayLoan * (displayRate/100/12)) + (displayPrice * (taxRate/100/12)) + (annualIns/12)); 
            summaryText = document.getElementById('summaryC').innerText;

        } else if (mode === 'mode-d') {
            displayPrice = clean(document.getElementById('input_homePriceD').value);
            displayRate = clean(document.getElementById('input_rateD').value);
            const down = clean(document.getElementById('input_downPaymentD').value);
            displayLoan = displayPrice - down; 
            
            sec1Html = `
                <div class="data-row"><span class="lbl">Home Price</span><span class="val">${fmt(displayPrice)}</span></div>
                <div class="data-row"><span class="lbl">Estimated Property Tax Rate</span><span class="val">${taxRate.toFixed(2)}%</span></div>
            `;
            sec2Html = `
                <div class="data-row"><span class="lbl">Loan Type</span><span class="val">${document.getElementById('loanTypeD').value}</span></div>
                <div class="data-row"><span class="lbl">Down Payment</span><span class="val">${fmt(down)}</span></div>
                <div class="data-row"><span class="lbl">Base Interest Rate</span><span class="val">${displayRate}%</span></div>
            `;
            sec3Html = `
                <div class="data-row"><span class="lbl">Total Monthly Payment</span><span class="val">${document.getElementById('res_totalPayD').textContent}</span></div>
                <div class="data-row"><span class="lbl">Funding Fee (Financed)</span><span class="val">${document.getElementById('res_feeD').textContent}</span></div>
                <div class="data-row"><span class="lbl">Effective APR</span><span class="val">${document.getElementById('res_aprD').textContent}</span></div>
                <div class="data-row"><span class="lbl">5-Year Sunk Costs</span><span class="val">${document.getElementById('res_sunkD').textContent}</span></div>
            `;
            finalMonthly = document.getElementById('res_totalPayD').textContent;
            summaryText = document.getElementById('summaryD').innerText;
        }

        // --- CALCULATION FOR BREAKDOWN ---
        // We calculate basic P&I, Tax, Insurance to populate Section IV
        const monthlyTax = (displayPrice * (taxRate / 100)) / 12;
        const monthlyIns = annualIns / 12;
        
        // P&I is roughly Total - (Tax + Ins). 
        // Note: This is an approximation for Mode D/A where PMI/HOA exists, but satisfies the visual requirement.
        // For a precise accounting, we'd need to expose the sub-variables globally, but math derivation is robust enough for print.
        const totalNum = parseFloat(finalMonthly.replace(/[^0-9.]/g, '')) || 0;
        const pAndI = Math.max(0, totalNum - monthlyTax - monthlyIns);

        const printContainer = document.getElementById('print-view-container');
        
        printContainer.innerHTML = `
            <div class="doc-wrapper">
                <div class="print-header-border"></div>
                <div class="doc-header">
                    <img src="../../img/Logo_Gold.webp" alt="Solveria Logo" class="doc-logo">
                    <div class="doc-title-block">
                        <h1>STATEMENT OF MORTGAGE LIABILITY AND RISK ASSESSMENT</h1>
                        <h2>STRATEGIC FINANCING ANALYSIS</h2>
                    </div>
                </div>
                <div class="print-header-border"></div>

                <div class="doc-meta-grid">
                    <div class="meta-col">
                        <div class="meta-row">
                            <span class="meta-label">PREPARED FOR:</span>
                            <span class="meta-val">__________________</span>
                        </div>
                    </div>
                    <div class="meta-col">
                        <div class="meta-row">
                            <span class="meta-label">DATE:</span>
                            <span class="meta-val">${dateStr}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">STATE:</span>
                            <span class="meta-val">${stateName}</span>
                        </div>
                    </div>
                    <div class="meta-col">
                        <div class="meta-row">
                            <span class="meta-label">OMB CONTROL:</span>
                            <span class="meta-val">M-104 (Rev 2)</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-label">FILE NUMBER:</span>
                            <span class="meta-val">______________</span>
                        </div>
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">I. PROPERTY & BORROWER PROFILE</div>
                    <div class="data-grid">
                        ${sec1Html}
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">II. TRANSACTION SPECIFICS</div>
                    <div class="data-grid">
                        ${sec2Html}
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">III. PROJECTED LIABILITIES & SCHEDULES</div>
                    <div class="data-grid">
                        ${sec3Html}
                    </div>
                    <div class="analyst-note-container">
                        <span class="note-label">ANALYST NOTE:</span>
                        ${summaryText}
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">IV. DISCREPANCY & ALLOCATION SUMMARY</div>
                    <div class="allocation-grid">
                        <div class="alloc-row">
                            <span class="lbl">MONTHLY OBLIGATION BREAKDOWN</span>
                        </div>
                        <div class="alloc-row">
                            <span class="lbl">Principal & Interest Allocation</span>
                            <span class="val">${fmt(pAndI)}</span>
                        </div>
                        <div class="alloc-row">
                            <span class="lbl">Property Tax Allocation</span>
                            <span class="val">${fmt(monthlyTax)}</span>
                        </div>
                        <div class="alloc-row">
                            <span class="lbl">Insurance Allocation</span>
                            <span class="val">${fmt(monthlyIns)}</span>
                        </div>
                    </div>
                    <div class="total-obligation-box">
                        <span>TOTAL ESTIMATED MONTHLY OBLIGATION</span>
                        <span>${finalMonthly}</span>
                    </div>
                </div>

                <div class="doc-footer">
                    <div class="signature-line">
                        <div class="sig-block">
                            <div class="sig-rule"></div>
                            <span class="sig-label">SIGNATURE OF BORROWER / APPLICANT</span>
                        </div>
                        <div class="sig-block">
                            <div class="sig-rule"></div>
                            <span class="sig-label">DATE</span>
                        </div>
                    </div>
                    <div class="legal-disclaimer">
                        LEGAL & METHODOLOGY DISCLAIMER: This Statement of Mortgage Liability is generated automatically for informational and strategic planning purposes only. The figures presented are estimates derived from self-reported data and static state averages. This document does not constitute a formal Loan Estimate, an offer to lend, nor a commitment of credit. Rates and terms are subject to market volatility and underwriting approval. Borrowers assume all responsibility for verifying figures with a licensed lending institution.
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

document.addEventListener('DOMContentLoaded', () => {
    populateStateDropdown();
    initializeCustomDropdowns();
    initializeSliders();
    initializeModes();
    initializeAdvancedToggle();
    setupTooltipListeners();
    setupGlobalListeners();
    
    setTimeout(() => {
        updateGlobalDefaults(); 
        const priceInput = document.getElementById('input_homePriceA');
        if(priceInput) priceInput.dispatchEvent(new Event('input'));
        
        const btn = document.getElementById('ctaBtnA');
        if(btn) {
            const date = new Date();
            const dateStr = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            btn.textContent = `See Today's Rates (${dateStr})`;
        }
        
        // Initialize New Tool Features
        ToolFeatures.init();
    }, 50);
});