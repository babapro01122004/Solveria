/* ========================================================================== */
/* PART 1: US STATE DATA (INTEGRATED - NO EXPORTS)                           */
/* ========================================================================== */

const US_STATE_DATA = {
  AL: { name: "Alabama", propertyTaxRate: 0.41, stateIncomeTaxRate: 5.0, evictionDays: 25, landlordScore: 5, insuranceRate: 0.55, vacancyRate: 7.5, rentGrowth: 3.0, closingCostBuy: 3.0, closingCostSell: 5.5, transferTax: 0.10 },
  AK: { name: "Alaska", propertyTaxRate: 1.19, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.40, vacancyRate: 8.0, rentGrowth: 2.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  AZ: { name: "Arizona", propertyTaxRate: 0.62, stateIncomeTaxRate: 2.5, evictionDays: 21, landlordScore: 5, insuranceRate: 0.35, vacancyRate: 6.0, rentGrowth: 4.5, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.00 },
  AR: { name: "Arkansas", propertyTaxRate: 0.62, stateIncomeTaxRate: 4.4, evictionDays: 14, landlordScore: 5, insuranceRate: 0.70, vacancyRate: 7.2, rentGrowth: 3.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.33 },
  CA: { name: "California", propertyTaxRate: 0.75, stateIncomeTaxRate: 13.3, evictionDays: 75, landlordScore: 1, insuranceRate: 0.25, vacancyRate: 4.2, rentGrowth: 3.8, closingCostBuy: 2.0, closingCostSell: 5.0, transferTax: 0.11 },
  CO: { name: "Colorado", propertyTaxRate: 0.51, stateIncomeTaxRate: 4.4, evictionDays: 25, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.3, rentGrowth: 4.2, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.01 },
  CT: { name: "Connecticut", propertyTaxRate: 2.15, stateIncomeTaxRate: 6.99, evictionDays: 45, landlordScore: 2, insuranceRate: 0.45, vacancyRate: 6.8, rentGrowth: 2.8, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 0.75 },
  DE: { name: "Delaware", propertyTaxRate: 0.56, stateIncomeTaxRate: 6.6, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 7.0, rentGrowth: 3.0, closingCostBuy: 4.0, closingCostSell: 6.0, transferTax: 4.00 },
  DC: { name: "District of Columbia", propertyTaxRate: 0.85, stateIncomeTaxRate: 10.75, evictionDays: 90, landlordScore: 1, insuranceRate: 0.35, vacancyRate: 5.5, rentGrowth: 3.2, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 1.10 },
  FL: { name: "Florida", propertyTaxRate: 0.86, stateIncomeTaxRate: 0.0, evictionDays: 25, landlordScore: 5, insuranceRate: 1.10, vacancyRate: 5.8, rentGrowth: 4.8, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 0.70 },
  GA: { name: "Georgia", propertyTaxRate: 0.90, stateIncomeTaxRate: 5.49, evictionDays: 25, landlordScore: 5, insuranceRate: 0.50, vacancyRate: 6.5, rentGrowth: 5.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.10 },
  HI: { name: "Hawaii", propertyTaxRate: 0.28, stateIncomeTaxRate: 11.0, evictionDays: 45, landlordScore: 3, insuranceRate: 0.20, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 2.0, closingCostSell: 5.0, transferTax: 0.15 },
  ID: { name: "Idaho", propertyTaxRate: 0.63, stateIncomeTaxRate: 5.8, evictionDays: 20, landlordScore: 5, insuranceRate: 0.30, vacancyRate: 5.2, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  IL: { name: "Illinois", propertyTaxRate: 2.23, stateIncomeTaxRate: 4.95, evictionDays: 90, landlordScore: 2, insuranceRate: 0.50, vacancyRate: 7.0, rentGrowth: 2.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.15 },
  IN: { name: "Indiana", propertyTaxRate: 0.83, stateIncomeTaxRate: 3.15, evictionDays: 30, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.5, rentGrowth: 3.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  IA: { name: "Iowa", propertyTaxRate: 1.57, stateIncomeTaxRate: 5.7, evictionDays: 25, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 2.8, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.16 },
  KS: { name: "Kansas", propertyTaxRate: 1.43, stateIncomeTaxRate: 5.7, evictionDays: 30, landlordScore: 4, insuranceRate: 0.65, vacancyRate: 6.8, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  KY: { name: "Kentucky", propertyTaxRate: 0.85, stateIncomeTaxRate: 4.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.5, rentGrowth: 3.2, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.10 },
  LA: { name: "Louisiana", propertyTaxRate: 0.56, stateIncomeTaxRate: 4.25, evictionDays: 30, landlordScore: 4, insuranceRate: 0.98, vacancyRate: 8.5, rentGrowth: 2.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.00 },
  ME: { name: "Maine", propertyTaxRate: 1.28, stateIncomeTaxRate: 7.15, evictionDays: 30, landlordScore: 3, insuranceRate: 0.38, vacancyRate: 5.5, rentGrowth: 3.8, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.44 },
  MD: { name: "Maryland", propertyTaxRate: 1.07, stateIncomeTaxRate: 5.75, evictionDays: 90, landlordScore: 2, insuranceRate: 0.40, vacancyRate: 5.8, rentGrowth: 3.5, closingCostBuy: 4.5, closingCostSell: 6.5, transferTax: 1.00 },
  MA: { name: "Massachusetts", propertyTaxRate: 1.15, stateIncomeTaxRate: 5.0, evictionDays: 90, landlordScore: 1, insuranceRate: 0.38, vacancyRate: 4.0, rentGrowth: 4.0, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.46 },
  MI: { name: "Michigan", propertyTaxRate: 1.48, stateIncomeTaxRate: 4.25, evictionDays: 45, landlordScore: 3, insuranceRate: 0.42, vacancyRate: 5.5, rentGrowth: 3.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.75 },
  MN: { name: "Minnesota", propertyTaxRate: 1.11, stateIncomeTaxRate: 9.85, evictionDays: 45, landlordScore: 2, insuranceRate: 0.48, vacancyRate: 5.0, rentGrowth: 3.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.33 },
  MS: { name: "Mississippi", propertyTaxRate: 0.79, stateIncomeTaxRate: 4.7, evictionDays: 25, landlordScore: 5, insuranceRate: 0.75, vacancyRate: 8.5, rentGrowth: 2.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  MO: { name: "Missouri", propertyTaxRate: 0.96, stateIncomeTaxRate: 4.8, evictionDays: 21, landlordScore: 4, insuranceRate: 0.55, vacancyRate: 6.5, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 6.0, transferTax: 0.00 },
  MT: { name: "Montana", propertyTaxRate: 0.83, stateIncomeTaxRate: 5.9, evictionDays: 20, landlordScore: 4, insuranceRate: 0.35, vacancyRate: 5.5, rentGrowth: 4.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  NE: { name: "Nebraska", propertyTaxRate: 1.67, stateIncomeTaxRate: 5.84, evictionDays: 30, landlordScore: 4, insuranceRate: 0.58, vacancyRate: 5.8, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.23 },
  NV: { name: "Nevada", propertyTaxRate: 0.55, stateIncomeTaxRate: 0.0, evictionDays: 25, landlordScore: 4, insuranceRate: 0.32, vacancyRate: 6.5, rentGrowth: 4.0, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 0.51 },
  NH: { name: "New Hampshire", propertyTaxRate: 2.09, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 3, insuranceRate: 0.35, vacancyRate: 3.5, rentGrowth: 4.5, closingCostBuy: 3.5, closingCostSell: 6.0, transferTax: 1.50 },
  NJ: { name: "New Jersey", propertyTaxRate: 2.47, stateIncomeTaxRate: 10.75, evictionDays: 90, landlordScore: 1, insuranceRate: 0.42, vacancyRate: 6.9, rentGrowth: 3.0, closingCostBuy: 4.0, closingCostSell: 7.0, transferTax: 0.85 },
  NM: { name: "New Mexico", propertyTaxRate: 0.78, stateIncomeTaxRate: 5.9, evictionDays: 30, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 7.0, rentGrowth: 3.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  NY: { name: "New York", propertyTaxRate: 1.73, stateIncomeTaxRate: 10.9, evictionDays: 120, landlordScore: 1, insuranceRate: 0.48, vacancyRate: 5.5, rentGrowth: 3.5, closingCostBuy: 5.0, closingCostSell: 7.5, transferTax: 0.40 },
  NC: { name: "North Carolina", propertyTaxRate: 0.80, stateIncomeTaxRate: 4.5, evictionDays: 30, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 5.2, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.20 },
  ND: { name: "North Dakota", propertyTaxRate: 0.98, stateIncomeTaxRate: 2.5, evictionDays: 30, landlordScore: 4, insuranceRate: 0.42, vacancyRate: 7.5, rentGrowth: 2.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  OH: { name: "Ohio", propertyTaxRate: 1.53, stateIncomeTaxRate: 3.5, evictionDays: 35, landlordScore: 4, insuranceRate: 0.45, vacancyRate: 6.2, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.30 },
  OK: { name: "Oklahoma", propertyTaxRate: 0.90, stateIncomeTaxRate: 4.75, evictionDays: 25, landlordScore: 5, insuranceRate: 0.85, vacancyRate: 7.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.08 },
  OR: { name: "Oregon", propertyTaxRate: 0.93, stateIncomeTaxRate: 9.9, evictionDays: 45, landlordScore: 2, insuranceRate: 0.30, vacancyRate: 4.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.00 },
  PA: { name: "Pennsylvania", propertyTaxRate: 1.53, stateIncomeTaxRate: 3.07, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 6.0, rentGrowth: 3.2, closingCostBuy: 4.5, closingCostSell: 6.5, transferTax: 2.00 },
  RI: { name: "Rhode Island", propertyTaxRate: 1.53, stateIncomeTaxRate: 5.99, evictionDays: 60, landlordScore: 2, insuranceRate: 0.48, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.46 },
  SC: { name: "South Carolina", propertyTaxRate: 0.56, stateIncomeTaxRate: 6.4, evictionDays: 30, landlordScore: 5, insuranceRate: 0.58, vacancyRate: 7.0, rentGrowth: 4.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.37 },
  SD: { name: "South Dakota", propertyTaxRate: 1.24, stateIncomeTaxRate: 0.0, evictionDays: 20, landlordScore: 4, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 3.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.10 },
  TN: { name: "Tennessee", propertyTaxRate: 0.66, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 5, insuranceRate: 0.48, vacancyRate: 6.0, rentGrowth: 5.5, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.37 },
  TX: { name: "Texas", propertyTaxRate: 1.74, stateIncomeTaxRate: 0.0, evictionDays: 21, landlordScore: 5, insuranceRate: 0.75, vacancyRate: 6.2, rentGrowth: 4.5, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.00 },
  UT: { name: "Utah", propertyTaxRate: 0.58, stateIncomeTaxRate: 4.65, evictionDays: 15, landlordScore: 5, insuranceRate: 0.28, vacancyRate: 4.5, rentGrowth: 4.0, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 },
  VT: { name: "Vermont", propertyTaxRate: 1.86, stateIncomeTaxRate: 8.75, evictionDays: 90, landlordScore: 2, insuranceRate: 0.38, vacancyRate: 3.8, rentGrowth: 3.0, closingCostBuy: 3.5, closingCostSell: 6.5, transferTax: 1.25 },
  VA: { name: "Virginia", propertyTaxRate: 0.82, stateIncomeTaxRate: 5.75, evictionDays: 45, landlordScore: 3, insuranceRate: 0.38, vacancyRate: 5.5, rentGrowth: 3.8, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.25 },
  WA: { name: "Washington", propertyTaxRate: 0.94, stateIncomeTaxRate: 0.0, evictionDays: 60, landlordScore: 2, insuranceRate: 0.30, vacancyRate: 5.0, rentGrowth: 3.5, closingCostBuy: 2.5, closingCostSell: 5.5, transferTax: 1.60 },
  WV: { name: "West Virginia", propertyTaxRate: 0.59, stateIncomeTaxRate: 6.5, evictionDays: 30, landlordScore: 5, insuranceRate: 0.42, vacancyRate: 8.0, rentGrowth: 2.0, closingCostBuy: 3.0, closingCostSell: 6.0, transferTax: 0.44 },
  WI: { name: "Wisconsin", propertyTaxRate: 1.73, stateIncomeTaxRate: 7.65, evictionDays: 45, landlordScore: 3, insuranceRate: 0.40, vacancyRate: 5.5, rentGrowth: 3.0, closingCostBuy: 2.5, closingCostSell: 6.0, transferTax: 0.30 },
  WY: { name: "Wyoming", propertyTaxRate: 0.61, stateIncomeTaxRate: 0.0, evictionDays: 30, landlordScore: 4, insuranceRate: 0.38, vacancyRate: 7.0, rentGrowth: 2.5, closingCostBuy: 2.0, closingCostSell: 5.5, transferTax: 0.00 }
};

const getStateData = (stateCode) => {
  // Safe accessor to prevent crashes if code is invalid
  const data = US_STATE_DATA[stateCode] || US_STATE_DATA["TX"];
  
  // Logic from the data file, integrated here
  const riskFlags = {
    insuranceVolatility: data.insuranceRate > 0.9,
    evictionDrag: data.evictionDays >= 60,
    taxBurden: data.propertyTaxRate >= 1.7,
    wealthDrag: data.stateIncomeTaxRate >= 8.0
  };
  
  let autoNotes = [];
  if (riskFlags.insuranceVolatility) autoNotes.push("Insurance is a primary kill variable.");
  if (riskFlags.evictionDrag) autoNotes.push("Eviction timeline breaks BRRRR repeatability.");
  if (riskFlags.taxBurden && data.rentGrowth < 3) autoNotes.push("High tax drag with low growth = bad ROI.");
  if (!riskFlags.evictionDrag && !riskFlags.taxBurden && data.rentGrowth > 4) autoNotes.push("High velocity growth market.");
  
  return { ...data, riskFlags, notes: autoNotes.join(" ") || "Balanced market profile." };
};

/* ========================================================================== */
/* PART 2: UI & CALCULATOR ENGINE                                           */
/* ========================================================================== */

/* Breathing Text Logic */
const phrases = [
    "Analyze Deals. Build Wealth.",
    "See the full cost — not just the payment.",
    "Cash flow is queen.",
    "Understand today. Regret less tomorrow."
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

/* Slider Configuration */
const SLIDER_CONFIG = {
    purchasePriceA: { type: 'cubic', max: 5000000 },
    downPaymentA: { type: 'cubic', max: 2000000 },
    rateA: { type: 'linear', max: 12 },
    rentA: { type: 'cubic', max: 30000 },
    opexRatioA: { type: 'linear', max: 100 },
    closingCostsA: { type: 'cubic', max: 50000 },
    propTaxA: { type: 'cubic', max: 40000 },
    insuranceA: { type: 'cubic', max: 10000 },
    hoaA: { type: 'cubic', max: 3000 },
    managementA: { type: 'linear', max: 30 },
    maintenanceA: { type: 'linear', max: 20 },
    capexA: { type: 'linear', max: 20 },
    vacancyA: { type: 'linear', max: 25 },
    rentGrowthA: { type: 'linear', max: 10 },
    appreciationA: { type: 'linear', max: 15 },
    expenseInfA: { type: 'linear', max: 10 },
    taxRateA: { type: 'linear', max: 50 },
    holdYearsA: { type: 'linear', max: 40 },
    sellCostA: { type: 'linear', max: 15 },
    // Mode B
    purchasePriceB: { type: 'cubic', max: 2000000 },
    rehabB: { type: 'cubic', max: 1000000 },
    arvB: { type: 'cubic', max: 3000000 },
    timelineB: { type: 'linear', max: 24 },
    closingCostsB: { type: 'cubic', max: 30000 },
    holdingCostsB: { type: 'cubic', max: 10000 },
    interestRateB: { type: 'linear', max: 20 },
    pointsB: { type: 'linear', max: 10 },
    drawFeesB: { type: 'cubic', max: 10000 },
    contingencyB: { type: 'linear', max: 50 },
    overrunRiskB: { type: 'linear', max: 12 },
    marketSlideB: { type: 'linear', max: 30 },
    taxRateB: { type: 'linear', max: 50 },
    // Mode C
    purchasePriceC: { type: 'cubic', max: 2000000 },
    rehabC: { type: 'cubic', max: 1000000 },
    arvC: { type: 'cubic', max: 3000000 },
    rentC: { type: 'cubic', max: 20000 },
    refiLtvC: { type: 'linear', max: 100 },
    refiRateC: { type: 'linear', max: 15 },
    initialPointsC: { type: 'linear', max: 10 },
    initialInterestC: { type: 'cubic', max: 50000 },
    seasoningC: { type: 'linear', max: 24 },
    appraisalHaircutC: { type: 'linear', max: 30 },
    refiCostsC: { type: 'cubic', max: 20000 },
    vacancyC: { type: 'linear', max: 20 },
    maintenanceC: { type: 'linear', max: 20 },
    capexC: { type: 'linear', max: 20 },
    managementC: { type: 'linear', max: 20 }
};

/* Helpers */
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
                realVal = Math.round(realVal * 1000) / 1000;
            }
            input.value = realVal; 
            updateSliderVisual(e.target);
            calculateAll(key);
        });
        input.addEventListener('input', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            calculateAll(key);
        });
    });
}

function initializeCustomDropdowns() {
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');

        // Toggle menu visibility
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        // Use Event Delegation for options (handles dynamic elements)
        menu.addEventListener('click', (e) => {
            // Find the clicked option div, even if user clicks text inside it
            const option = e.target.closest('.dropdown-option');
            if (option) {
                e.stopPropagation();
                const value = option.getAttribute('data-value');
                trigger.textContent = option.textContent;
                
                // Remove selected class from siblings
                menu.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                menu.classList.remove('active');
                
                // Sync with hidden select
                if(select) {
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    });

    // Attach change listeners to hidden selects
    document.querySelectorAll('select').forEach(sel => {
        sel.addEventListener('change', (e) => calculateAll(e.target.id));
    });
}

/* 
 * NEW FUNCTION: Populates the state dropdown from US_STATE_DATA 
 * Ensures all 50 states are visible in the menu
 */
function populateStateDropdowns() {
    const selector = document.getElementById('stateSelector');
    const customWrapper = document.querySelector('.dropdown-options-wrapper');
    const trigger = document.querySelector('.custom-dropdown-trigger');

    if (!selector || !customWrapper) return;

    // Clear existing content to prevent duplicates
    selector.innerHTML = '';
    customWrapper.innerHTML = '';

    // Sort states alphabetically by name
    const sortedKeys = Object.keys(US_STATE_DATA).sort((a, b) => 
        US_STATE_DATA[a].name.localeCompare(US_STATE_DATA[b].name)
    );

    sortedKeys.forEach(key => {
        const state = US_STATE_DATA[key];
        
        // 1. Create Native Select Option (Hidden but accessible)
        const option = document.createElement('option');
        option.value = key;
        option.textContent = state.name;
        if (key === 'CA') option.selected = true; // Default
        selector.appendChild(option);

        // 2. Create Custom Div Option (Visible UI)
        const div = document.createElement('div');
        div.className = 'dropdown-option';
        if (key === 'CA') div.classList.add('selected');
        div.setAttribute('data-value', key);
        div.textContent = state.name;
        customWrapper.appendChild(div);
    });

    // Reset trigger text to default
    if(trigger) trigger.textContent = US_STATE_DATA['CA'].name;
}

let currentMode = 'mode-a';
function initializeModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('active-mode'));
            card.classList.add('active-mode');
            currentMode = card.getAttribute('data-mode');

            document.querySelectorAll('.mode-inputs').forEach(el => el.classList.add('hidden'));
            const inputSection = document.getElementById(`${currentMode}-inputs`);
            if (inputSection) inputSection.classList.remove('hidden');

            document.querySelectorAll('.mode-results').forEach(el => el.classList.add('hidden'));
            const resultSection = document.getElementById(`${currentMode}-results`);
            if (resultSection) resultSection.classList.remove('hidden');
            calculateAll();
        });
    });
}

function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    if (!btn) return;
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

function initializeStateSelector() {
    const stateSelect = document.getElementById('stateSelector');
    if(!stateSelect) return;
    stateSelect.addEventListener('change', () => {
        const stateCode = stateSelect.value;
        const stateData = getStateData(stateCode);
        
        // Mode A Updates
        const priceA = cleanNumber(document.getElementById('input_purchasePriceA').value);
        if (priceA > 0) {
            const estTax = Math.round(priceA * (stateData.propertyTaxRate / 100));
            const estIns = Math.round(priceA * (stateData.insuranceRate / 100));
            updateInputAndSlider('propTaxA', estTax);
            updateInputAndSlider('insuranceA', estIns);
        }
        
        // Triggers calculation for current mode
        calculateAll('stateSelector');
    });
}

function updateInputAndSlider(key, value) {
    const input = document.getElementById(`input_${key}`);
    const slider = document.getElementById(`slider_${key}`);
    if(input && slider) {
        input.value = value; 
        slider.value = valToSlider(value, key);
        updateSliderVisual(slider);
    }
}

/* ========================================================================== */
/* CALCULATION ENGINE                                                       */
/* ========================================================================== */

const formatMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const formatPct = (num) => `${num.toFixed(1)}%`;

function calculateAll(triggerKey) {
    if (currentMode === 'mode-a') calculateModeA(triggerKey);
    if (currentMode === 'mode-b') calculateModeB(triggerKey);
    if (currentMode === 'mode-c') calculateModeC(triggerKey);
}

// -----------------------------------------------------------
// MENTOR LOGIC HELPER FUNCTION
// -----------------------------------------------------------
function updateMentorSummary(mode, metrics) {
    const el = document.getElementById(`mentor-summary-${mode}`);
    if (!el) return;

    let title = "", body = "";

    if (mode === 'A') {
        const cf = metrics.cashFlow;
        const coc = metrics.coc;
        if (cf < 0) {
            title = "🛑 Asset or Liability?";
            body = "You are effectively subsidizing your tenant's lifestyle. Even if the property appreciates, the monthly negative cash flow will drain your reserves and hurt your Debt-to-Income ratio for future loans. <strong>Unless you can drop the purchase price by at least 15%, walk away.</strong>";
        } else if (cf < 200) {
            title = "⚠️ Walking on Thin Ice.";
            body = "You are technically profitable, but one broken water heater or a two-month vacancy will wipe out your entire year's profit. You are betting 100% on appreciation, not cash flow. <strong>This deal requires a heavy cash reserve fund to be safe.</strong>";
        } else {
            title = "🚀 The Cash Flow Machine.";
            body = "This asset pays for itself and puts money in your pocket every month. The rent covers the mortgage, expenses, and vacancy buffers with room to spare. <strong>Verify your expense assumptions (especially taxes), then get this under contract.</strong>";
        }
    } else if (mode === 'B') {
        const profit = metrics.netProfit;
        const margin = metrics.margin;
        if (profit < 0) {
            title = "☠️ Financial Suicide Warning.";
            body = "After closing costs, holding fees, and realtor commissions, you are paying for the privilege of working. You will lose money on this deal. <strong>The only way to save this is to slash the acquisition price or cut the rehab scope dramatically.</strong>";
        } else if (profit < 20000 || margin < 10) {
            title = "😓 Working for Minimum Wage.";
            body = "You might make a small profit, but is it worth the stress and risk? If the market dips 5% or the timeline slips by two months, you break even. <strong>Experienced flippers usually demand a 15%+ margin to cover the 'unknowns' found behind the walls.</strong>";
        } else {
            title = "💰 Green Light Special.";
            body = "This deal has a wide margin of safety. Even if the renovation goes over budget or the house sits on the market for an extra month, you still walk away with a profit. <strong>Double-check your ARV comps, secure your hard money, and start swinging hammers.</strong>";
        }
    } else if (mode === 'C') {
        const left = metrics.cashLeft;
        const minAppr = metrics.minAppraisal;
        const arv = metrics.arv;
        if (left > 25000) {
            title = "🪤 Velocity Killer.";
            body = "The bank won't give you enough cash back to pay off your initial investment. You are leaving significant capital trapped in the deal, which prevents you from buying the next property. <strong>This isn't a BRRRR; it's just a rental with a renovation project attached.</strong>";
        } else if (left <= 0) {
            title = "🦄 The Holy Grail (Infinite Return).";
            body = "You are pulling out 100% (or more) of your initial investment. You effectively own this cash-flowing asset for $0. Since you have no money left in the deal, your ROI is mathematically infinite. <strong>Rinse and repeat this exact model immediately.</strong>";
        } else {
            // Check for Appraisal Gap (if refi loan isn't enough to cover hard money, usually implies cash left > 0 but we want to warn about appraisal specifically if it's tight)
            // But here "Appraisal Danger Zone" logic:
            if (minAppr > arv) {
                 title = "📉 Appraisal Danger Zone.";
                 body = "The math works on paper, but the Appraisal is the boss. If the appraiser doesn't agree with your ARV, you will have to bring cash to the closing table to pay off your hard money lender. <strong>Do you have the liquidity to cover a short appraisal?</strong>";
            } else {
                 title = "✅ Respectable BRRRR.";
                 body = "You are leaving a little skin in the game, but the remaining ROI is likely high. It's a solid base hit that builds your portfolio without over-leveraging. <strong>Proceed with confidence.</strong>";
            }
        }
    }

    el.innerHTML = `<strong>${title}</strong>${body}`;
}

/* --- MODE A: Rental Analysis --- */
function calculateModeA(triggerKey) {
    const price = cleanNumber(document.getElementById('input_purchasePriceA').value);
    const downPayment = cleanNumber(document.getElementById('input_downPaymentA').value);
    const rate = cleanNumber(document.getElementById('input_rateA').value);
    const termVal = document.getElementById('termA').value;
    const rent = cleanNumber(document.getElementById('input_rentA').value);
    
    let propTax = cleanNumber(document.getElementById('input_propTaxA').value);
    let insurance = cleanNumber(document.getElementById('input_insuranceA').value);
    const hoa = cleanNumber(document.getElementById('input_hoaA').value);
    const vacancyRate = cleanNumber(document.getElementById('input_vacancyA').value);
    const mgmtRate = cleanNumber(document.getElementById('input_managementA').value);
    const maintRate = cleanNumber(document.getElementById('input_maintenanceA').value);
    const capexRate = cleanNumber(document.getElementById('input_capexA').value);
    
    const loanAmount = price - downPayment;
    let monthlyPI = 0;
    if (termVal === 'IO') {
        monthlyPI = (loanAmount * (rate / 100)) / 12;
    } else {
        const r = rate / 100 / 12;
        const n = parseInt(termVal) * 12;
        if (r > 0 && n > 0) {
            monthlyPI = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        } else {
            monthlyPI = loanAmount / (n || 1);
        }
    }

    let totalMonthlyExpenses = 0;
    const vacancyCost = rent * (vacancyRate / 100);
    const mgmtCost = rent * (mgmtRate / 100);
    const maintCost = rent * (maintRate / 100);
    const capexCost = rent * (capexRate / 100);
    const taxMonthly = propTax / 12;
    const insMonthly = insurance / 12;
    const detailedExpenses = taxMonthly + insMonthly + hoa + vacancyCost + mgmtCost + maintCost + capexCost;

    if (triggerKey === 'opexRatioA') {
        const userRatio = cleanNumber(document.getElementById('input_opexRatioA').value);
        totalMonthlyExpenses = rent * (userRatio / 100);
    } else {
        totalMonthlyExpenses = detailedExpenses;
        const impliedRatio = rent > 0 ? (detailedExpenses / rent) * 100 : 0;
        updateInputAndSlider('opexRatioA', Math.round(impliedRatio * 10) / 10);
    }
    
    const noi = rent - totalMonthlyExpenses;
    const cashFlow = noi - monthlyPI;
    const annualCashFlow = cashFlow * 12;
    const closingCosts = cleanNumber(document.getElementById('input_closingCostsA').value);
    const cashToClose = downPayment + closingCosts;
    const coc = cashToClose > 0 ? (annualCashFlow / cashToClose) * 100 : 0;
    const dcr = monthlyPI > 0 ? noi / monthlyPI : 99;

    const appreciationRate = cleanNumber(document.getElementById('input_appreciationA').value) / 100;
    const futureValue = price * Math.pow(1 + appreciationRate, 10);
    const equityGain = futureValue - price; 
    const wealth = equityGain + (annualCashFlow * 10);

    setText('res_netMonthlyA', formatMoney.format(cashFlow));
    setText('res_annualCFA', formatMoney.format(annualCashFlow));
    setText('res_cocA', formatPct(coc));
    setText('res_dcrA', dcr.toFixed(2));
    setText('res_wealthA', formatMoney.format(wealth));
    setClass('res_netMonthlyA', cashFlow > 0 ? 'good' : 'bad');
    setClass('res_cocA', coc > 8 ? 'good' : (coc > 4 ? 'warn' : 'bad'));

    let verdict = "Bad";
    let verdictClass = "bad";
    if (cashFlow > 100 && coc > 5) { verdict = "Borderline"; verdictClass = "warn"; }
    if (cashFlow > 300 && coc > 9) { verdict = "Great"; verdictClass = "good"; }
    if (cashFlow < 0) { verdict = "Negative"; verdictClass = "bad"; }
    
    const vEl = document.getElementById('res_verdictA');
    if(vEl) {
        vEl.textContent = verdict;
        vEl.className = `result-value ${verdictClass}`;
    }

    // UPDATE MENTOR SUMMARY
    updateMentorSummary('A', { cashFlow, coc });

    runStressTestModeA(cashFlow, rent, totalMonthlyExpenses, monthlyPI);
}

function runStressTestModeA(baseCF, baseRent, baseExp, debt) {
    const optRent = baseRent * 1.05;
    const optCF = (optRent - baseExp - debt) + (baseRent * 0.02); 
    const bearRent = baseRent * 0.90;
    const bearShock = (baseRent * 0.05) + (baseRent * 0.05);
    const bearCF = (bearRent - baseExp - debt) - bearShock;

    setText('st_opt_val', formatMoney.format(optCF));
    setText('st_base_val', formatMoney.format(baseCF));
    setText('st_bear_val', formatMoney.format(bearCF));

    const stBadge = document.getElementById('st_verdict');
    const stAction = document.getElementById('st_action');
    const stKill = document.getElementById('st_kill_var');

    if (bearCF > 0) {
        stBadge.textContent = "Ironclad";
        stBadge.style.backgroundColor = "#2ecc71";
        stAction.textContent = "Deal survives a 10% rent drop. Safe buy.";
        stKill.textContent = "None";
    } else if (baseCF > 0) {
        stBadge.textContent = "Moderate Risk";
        stBadge.style.backgroundColor = "#f1c40f";
        stAction.textContent = "Cash flows now, but fails in a downturn.";
        stKill.textContent = "Vacancy / Rent Drop";
    } else {
        stBadge.textContent = "Toxic Asset";
        stBadge.style.backgroundColor = "#e74c3c";
        stAction.textContent = "Negative cash flow today. Do not buy.";
        stKill.textContent = "Price / Rates";
    }
}

/* --- MODE B: Fix & Flip --- */
function calculateModeB(triggerKey) {
    const price = cleanNumber(document.getElementById('input_purchasePriceB').value);
    const rehab = cleanNumber(document.getElementById('input_rehabB').value);
    const arv = cleanNumber(document.getElementById('input_arvB').value);
    const timeline = cleanNumber(document.getElementById('input_timelineB').value);
    const buyCosts = cleanNumber(document.getElementById('input_closingCostsB').value);
    const holdCostsMo = cleanNumber(document.getElementById('input_holdingCostsB').value);
    const taxRate = cleanNumber(document.getElementById('input_taxRateB').value);
    const interestRate = cleanNumber(document.getElementById('input_interestRateB').value);
    const points = cleanNumber(document.getElementById('input_pointsB').value);
    const drawFees = cleanNumber(document.getElementById('input_drawFeesB').value);
    const contingency = cleanNumber(document.getElementById('input_contingencyB').value);
    const overrunRisk = cleanNumber(document.getElementById('input_overrunRiskB').value);
    const marketSlide = cleanNumber(document.getElementById('input_marketSlideB').value);
    
    const stateCode = document.getElementById('stateSelector').value;
    const sData = getStateData(stateCode);
    const sellCostPct = sData.closingCostSell || 6.0;

    const totalRehab = rehab * (1 + (contingency/100));
    const loanBasis = price + totalRehab; 
    const totalPoints = loanBasis * (points/100);
    const monthlyInterest = (loanBasis * (interestRate/100)) / 12;
    const totalInterest = monthlyInterest * timeline;
    const totalHold = holdCostsMo * timeline;
    const sellingCosts = arv * (sellCostPct/100);
    const totalSoftCosts = buyCosts + totalInterest + totalPoints + drawFees + totalHold + sellingCosts;
    const totalCostBasis = price + totalRehab + totalSoftCosts;
    const grossProfit = arv - totalCostBasis;
    const capitalGainsTax = grossProfit > 0 ? grossProfit * (taxRate/100) : 0;
    const netProfit = grossProfit - capitalGainsTax;
    const profitMargin = arv > 0 ? (netProfit / arv) * 100 : 0;
    const roi = totalCostBasis > 0 ? (netProfit / totalCostBasis) * 100 : 0;
    
    let annualizedRoi = 0;
    if (roi > 0 && timeline > 0) {
        annualizedRoi = (Math.pow(1 + (roi/100), 12/timeline) - 1) * 100;
    }
    const dailyBurn = (holdCostsMo + monthlyInterest) / 30;
    const mao = (arv * 0.70) - totalRehab;
    const ruleVerdict = price <= mao ? "Pass" : "Fail";

    setText('res_netProfitB', formatMoney.format(netProfit));
    setText('res_marginB', formatPct(profitMargin));
    setText('res_rule70B', ruleVerdict);
    setText('res_maoB', formatMoney.format(mao));
    setText('res_annRoiB', formatPct(annualizedRoi));
    setText('res_costDelayB', `-$${Math.round(dailyBurn)}/day`);
    // NEW: Set Break Even Price
    setText('res_breakEvenB', formatMoney.format(totalCostBasis));

    setClass('res_netProfitB', netProfit > 0 ? 'good' : 'bad');
    setClass('res_costDelayB', 'bad'); 

    // UPDATE MENTOR SUMMARY
    updateMentorSummary('B', { netProfit, margin: profitMargin });

    runStressTestModeB(netProfit, arv, totalRehab, price, buyCosts, points, drawFees, sellingCosts, holdCostsMo, monthlyInterest, timeline, overrunRisk, marketSlide, sData.closingCostSell);
}

function runStressTestModeB(baseProfit, arv, rehab, price, buyCosts, points, drawFees, baseSellCosts, holdCostsMo, monthlyInterest, baseTimeline, overrunMonths, slidePct, sellCostPct) {
    const optArv = arv * 1.05;
    const optRehab = rehab * 0.95;
    const optSell = optArv * (sellCostPct/100);
    const optSoft = buyCosts + points + drawFees + (holdCostsMo * baseTimeline) + (monthlyInterest * baseTimeline) + optSell;
    const optProfit = optArv - (price + optRehab + optSoft);

    const bearArv = arv * (1 - (slidePct/100));
    const bearTimeline = baseTimeline + overrunMonths;
    const bearHold = holdCostsMo * bearTimeline;
    const bearInterest = monthlyInterest * bearTimeline;
    const bearSell = bearArv * (sellCostPct/100);
    const bearSoft = buyCosts + points + drawFees + bearHold + bearInterest + bearSell;
    const bearProfit = bearArv - (price + rehab + bearSoft);

    setText('st_opt_val', formatMoney.format(optProfit));
    setText('st_base_val', formatMoney.format(baseProfit));
    setText('st_bear_val', formatMoney.format(bearProfit));

    const stBadge = document.getElementById('st_verdict');
    const stAction = document.getElementById('st_action');
    const stKill = document.getElementById('st_kill_var');

    if (bearProfit > 0) {
        stBadge.textContent = "Ironclad";
        stBadge.style.backgroundColor = "#2ecc71";
        stAction.textContent = "Profit remains even with overrun & market dip.";
        stKill.textContent = "None";
    } else if (baseProfit > 0) {
        stBadge.textContent = "Moderate Risk";
        stBadge.style.backgroundColor = "#f1c40f";
        stAction.textContent = "Profitable now, but fails in a downturn.";
        stKill.textContent = "Market / Timeline";
    } else {
        stBadge.textContent = "Toxic Deal";
        stBadge.style.backgroundColor = "#e74c3c";
        stAction.textContent = "Projected loss. Negotiate price down.";
        stKill.textContent = "Price / Rehab";
    }
}

/* --- MODE C: BRRRR Strategy --- */
function calculateModeC(triggerKey) {
    // 1. Gather Inputs
    const price = cleanNumber(document.getElementById('input_purchasePriceC').value);
    const rehab = cleanNumber(document.getElementById('input_rehabC').value);
    const arv = cleanNumber(document.getElementById('input_arvC').value);
    const rent = cleanNumber(document.getElementById('input_rentC').value);
    const refiLtv = cleanNumber(document.getElementById('input_refiLtvC').value);
    const refiRate = cleanNumber(document.getElementById('input_refiRateC').value);
    
    // Advanced
    const initPoints = cleanNumber(document.getElementById('input_initialPointsC').value);
    const initInterestCarry = cleanNumber(document.getElementById('input_initialInterestC').value); // $ Amount
    const seasoning = cleanNumber(document.getElementById('input_seasoningC').value); // Months
    const appraisalHaircut = cleanNumber(document.getElementById('input_appraisalHaircutC').value); // %
    const refiCosts = cleanNumber(document.getElementById('input_refiCostsC').value);
    
    const vacancyRate = cleanNumber(document.getElementById('input_vacancyC').value);
    const maintRate = cleanNumber(document.getElementById('input_maintenanceC').value);
    const capexRate = cleanNumber(document.getElementById('input_capexC').value);
    const mgmtRate = cleanNumber(document.getElementById('input_managementC').value);

    // State Data for Estimating Hold Costs (Tax/Ins)
    const stateCode = document.getElementById('stateSelector').value;
    const sData = getStateData(stateCode);
    const buyClosingPct = sData.closingCostBuy || 3.0;
    
    // 2. Phase 1: Total Cost to Own (All-In)
    const buyClosingCosts = price * (buyClosingPct/100);
    const loanPointsCost = (price + rehab) * (initPoints/100); // Assuming loan on Price+Rehab
    
    // Holding Costs during Seasoning (Taxes + Insurance + Hard Money Interest)
    // Estimate Annual Tax/Ins based on Price
    const annualTax = price * (sData.propertyTaxRate / 100);
    const annualIns = price * (sData.insuranceRate / 100);
    const holdTaxIns = ((annualTax + annualIns) / 12) * seasoning;
    
    // Total Project Cost
    const totalAllIn = price + rehab + buyClosingCosts + loanPointsCost + initInterestCarry + holdTaxIns;

    // 3. Phase 2: Refinance
    const refiLoanAmount = arv * (refiLtv/100);
    // Cash Returned = Refi Loan - Refi Costs - Payoff (We assume Payoff = Total All In for simplicity of "Cash Left" calc)
    // Actually, "Cash Left in Deal" = Total All In - (Refi Loan - Refi Costs)
    const netRefiProceeds = refiLoanAmount - refiCosts;
    const cashLeftInDeal = totalAllIn - netRefiProceeds;
    const cashPulledOut = netRefiProceeds - totalAllIn; // Inverse of cash left, but usually means surplus

    // 4. Phase 3: Long Term Cash Flow
    const vacancyCost = rent * (vacancyRate/100);
    const maintCost = rent * (maintRate/100);
    const capexCost = rent * (capexRate/100);
    const mgmtCost = rent * (mgmtRate/100);
    
    // New Mortgage P&I
    const r = refiRate / 100 / 12;
    const n = 360; // 30 Years
    let newMortgagePI = 0;
    if (r > 0) newMortgagePI = refiLoanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    else newMortgagePI = refiLoanAmount / n;

    // Recalculate Tax/Ins based on NEW Value (ARV) for long term? 
    // Usually taxes reassess. Let's use ARV for long term tax/ins estimates.
    const longTermTax = (arv * (sData.propertyTaxRate / 100)) / 12;
    const longTermIns = (arv * (sData.insuranceRate / 100)) / 12;

    const totalExpenses = vacancyCost + maintCost + capexCost + mgmtCost + longTermTax + longTermIns + newMortgagePI;
    const monthlyCashFlow = rent - totalExpenses;

    // 5. Metrics
    const isInfinite = cashLeftInDeal <= 0;
    const trappedEquityPct = (1 - (refiLtv/100)) * 100; // Roughly 25% if 75% LTV
    // Capital Velocity: (Net Refi Proceeds / Total All In) * 100
    const capVelocity = (netRefiProceeds / totalAllIn) * 100; 

    // Break Even Appraisal: What ARV makes Cash Left = 0?
    // 0 = TotalAllIn - ((ARV * LTV) - RefiCosts)
    // TotalAllIn + RefiCosts = ARV * LTV
    // ARV = (TotalAllIn + RefiCosts) / LTV
    const minAppraisal = (totalAllIn + refiCosts) / (refiLtv/100);

    // Scaling Power Text
    let scalingText = "Low (Trapped Capital)";
    if (capVelocity >= 100) scalingText = "High (Redeploy in 6mo)";
    else if (capVelocity >= 80) scalingText = "Moderate (Some trap)";

    // 6. Update UI
    setText('res_cashPulledC', cashPulledOut > 0 ? formatMoney.format(cashPulledOut) : "$0");
    setText('res_cashLeftC', cashLeftInDeal > 0 ? formatMoney.format(cashLeftInDeal) : "$0");
    setText('res_infiniteC', isInfinite ? "YES" : "NO");
    setText('res_cashFlowC', formatMoney.format(monthlyCashFlow) + "/mo");
    
    setText('res_mortgageC', formatMoney.format(newMortgagePI));
    setText('res_capVelocityC', formatPct(capVelocity) + " Recaptured");
    setText('res_trappedEquityC', formatPct(trappedEquityPct));
    setText('res_minAppraisalC', formatMoney.format(minAppraisal));
    setText('res_scalingC', scalingText);

    // Coloring
    setClass('res_cashPulledC', cashPulledOut > 0 ? 'good' : 'warn');
    setClass('res_infiniteC', isInfinite ? 'good' : 'bad');
    setClass('res_cashFlowC', monthlyCashFlow > 100 ? 'good' : 'bad');

    // UPDATE MENTOR SUMMARY
    updateMentorSummary('C', { cashLeft: cashLeftInDeal, minAppraisal, arv });

    // 7. Stress Test Mode C
    runStressTestModeC(monthlyCashFlow, cashLeftInDeal, appraisalHaircut, totalAllIn, arv, refiLtv, refiCosts, rent, totalExpenses, newMortgagePI);
}

function runStressTestModeC(baseCF, baseCashLeft, haircutPct, totalAllIn, arv, ltv, refiCosts, rent, totalExp, debt) {
    // Scenario 1: Optimistic (Appraisal comes in 5% higher, Rent +5%)
    const optArv = arv * 1.05;
    const optLoan = optArv * (ltv/100);
    const optProceeds = optLoan - refiCosts;
    const optCashLeft = totalAllIn - optProceeds; // Should be lower/negative
    
    // Scenario 2: Base (Current Inputs)
    
    // Scenario 3: Bear (Appraisal Haircut & Rent Drop)
    const bearArv = arv * (1 - (haircutPct/100));
    const bearLoan = bearArv * (ltv/100);
    const bearProceeds = bearLoan - refiCosts;
    const bearCashLeft = totalAllIn - bearProceeds; // How much cash trapped?
    
    // Bear Cash Flow? (Assume rent drops 5% too)
    const bearRent = rent * 0.95;
    // Note: Debt service might change if loan amount drops, but usually you qualify for less loan. 
    // Let's assume loan drops with ARV.
    const bearDebt = debt * (1 - (haircutPct/100)); 
    const bearExp = (totalExp - debt) + bearDebt;
    const bearCF = bearRent - bearExp;

    // FIX: Added newlines (\n) to force "Left:" onto its own line
    setText('st_opt_val', `Left:\n${formatMoney.format(optCashLeft)}`);
    setText('st_base_val', `Left:\n${formatMoney.format(baseCashLeft)}`);
    setText('st_bear_val', `Left:\n${formatMoney.format(bearCashLeft)}`);

    const stBadge = document.getElementById('st_verdict');
    const stAction = document.getElementById('st_action');
    const stKill = document.getElementById('st_kill_var');

    if (bearCashLeft <= 0) {
        stBadge.textContent = "Perfect BRRRR";
        stBadge.style.backgroundColor = "#2ecc71";
        stAction.textContent = "You get all money back even with a low appraisal.";
        stKill.textContent = "None";
    } else if (bearCF > 0 && bearCashLeft < 20000) {
        stBadge.textContent = "Decent Deal";
        stBadge.style.backgroundColor = "#f1c40f";
        stAction.textContent = "Some cash trapped, but cash flows cover it.";
        stKill.textContent = "Appraisal Gap";
    } else {
        stBadge.textContent = "Trap Warning";
        stBadge.style.backgroundColor = "#e74c3c";
        stAction.textContent = "High risk of trapped capital. Refi fails.";
        stKill.textContent = "Appraisal / ARV";
    }
}

function setText(id, val) {
    const el = document.getElementById(id);
    if(el) el.textContent = val;
}
function setClass(id, cls) {
    const el = document.getElementById(id);
    if(el) {
        el.classList.remove('good', 'bad', 'warn');
        el.classList.add(cls);
    }
}

// ----------------------------------------
// NEW: FAQ ACCORDION LOGIC
// ----------------------------------------
function initializeFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle 'active' class on button for rotation/color
            btn.classList.toggle('active');
            
            // Toggle the panel
            const panel = btn.nextElementSibling;
            
            if (panel.style.maxHeight) {
                // Collapse
                panel.style.maxHeight = null;
            } else {
                // Expand
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}

// ==========================================
// UNIVERSAL PRINT, PDF & SHARE ENGINE
// ==========================================
const ToolFeatures = {
    isTutorialUnlocked: false,

    getShareUrl() {
        const params = new URLSearchParams();
        // Grab values from Slider Config as a source of truth for inputs
        for (const key of Object.keys(SLIDER_CONFIG)) {
            const el = document.getElementById('input_' + key);
            if (el) params.set(key, el.value);
        }
        // Grab state
        const stateSel = document.getElementById('stateSelector');
        if (stateSel) params.set('state', stateSel.value);
        
        // Grab active mode
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
        // Basic URL Param restore logic (Simplified)
        const params = new URLSearchParams(window.location.search);
        if (params.has('mode')) {
            const mode = params.get('mode');
            const card = document.querySelector(`.mode-card[data-mode="${mode}"]`);
            if (card) card.click();
        }
        // State
        if (params.has('state')) {
            const sel = document.getElementById('stateSelector');
            if (sel) { sel.value = params.get('state'); sel.dispatchEvent(new Event('change')); }
        }
        // Inputs
        for (const key of Object.keys(SLIDER_CONFIG)) {
            if (params.has(key)) {
                const el = document.getElementById('input_' + key);
                const val = params.get(key);
                if (el) {
                    el.value = val;
                    const slider = document.getElementById('slider_' + key);
                    if(slider) {
                        slider.value = valToSlider(parseFloat(val), key);
                        updateSliderVisual(slider);
                    }
                }
            }
        }
        calculateAll();
    },

    preparePrintData() {
        // --- 1. Gather Context ---
        const clean = (id) => parseFloat(document.getElementById(id)?.value) || 0;
        const txt = (id) => document.getElementById(id)?.textContent || "";
        const fmt = (n) => '$' + n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        const dateStr = new Date().toLocaleDateString();

        // State Context
        const stateSelect = document.getElementById('stateSelector');
        const stateName = stateSelect.options[stateSelect.selectedIndex].text;
        
        let title = "STRATEGIC ASSET ANALYSIS REPORT";
        let subTitle = "";
        let section1Title = "";
        let section1HTML = "";
        let section2Title = "";
        let section2HTML = "";
        let section3Title = "FINANCIAL PERFORMANCE SUMMARY";
        let section3HTML = "";
        let summaryHTML = "";
        let note = "";

        if (currentMode === 'mode-a') {
            subTitle = "LONG-TERM BUY & HOLD EVALUATION";
            section1Title = `ACQUISITION PARAMETERS (${stateName.toUpperCase()})`;
            
            const price = clean('input_purchasePriceA');
            const down = clean('input_downPaymentA');
            const rate = clean('input_rateA');
            
            const rent = clean('input_rentA');
            const exp = clean('input_opexRatioA');
            
            section1HTML = `
                <div class="data-row"><span class="lbl">Purchase Price</span><span class="val">${fmt(price)}</span></div>
                <div class="data-row"><span class="lbl">Down Payment</span><span class="val">${fmt(down)}</span></div>
                <div class="data-row"><span class="lbl">Interest Rate</span><span class="val">${rate}%</span></div>
                <div class="data-row"><span class="lbl">Loan Term</span><span class="val">30 Years</span></div>
            `;

            section2Title = "OPERATIONAL CASH FLOW PROJECTIONS";
            section2HTML = `
                <div class="data-row"><span class="lbl">Gross Monthly Rent</span><span class="val">${fmt(rent)}</span></div>
                <div class="data-row"><span class="lbl">Operating Expense Ratio</span><span class="val">${exp}%</span></div>
                <div class="data-row"><span class="lbl">Total Monthly Expenses</span><span class="val">${fmt(rent * (exp/100))}</span></div>
                <div class="data-row"><span class="lbl">Net Operating Income (NOI)</span><span class="val">${fmt(rent - (rent * (exp/100)))}</span></div>
            `;

            section3HTML = `
                <div class="data-row"><span class="lbl">Net Monthly Cash Flow</span><span class="val">${txt('res_netMonthlyA')}</span></div>
                <div class="data-row"><span class="lbl">Cash-on-Cash Return</span><span class="val">${txt('res_cocA')}</span></div>
                <div class="data-row"><span class="lbl">10-Year Wealth Projection</span><span class="val">${txt('res_wealthA')}</span></div>
            `;
            
            summaryHTML = `<div class="sum-row final"><span class="lbl">INVESTMENT VERDICT</span><span class="val">${txt('res_verdictA')}</span></div>`;
            note = document.getElementById('mentor-summary-A').innerText;
        } 
        else if (currentMode === 'mode-b') {
            subTitle = "FIX & FLIP PROFITABILITY ANALYSIS";
            section1Title = `PROJECT SCOPE & COSTS (${stateName.toUpperCase()})`;
            
            const price = clean('input_purchasePriceB');
            const rehab = clean('input_rehabB');
            const arv = clean('input_arvB');
            const timeline = clean('input_timelineB');

            section1HTML = `
                <div class="data-row"><span class="lbl">Purchase Price</span><span class="val">${fmt(price)}</span></div>
                <div class="data-row"><span class="lbl">Rehab Budget</span><span class="val">${fmt(rehab)}</span></div>
                <div class="data-row"><span class="lbl">Projected ARV</span><span class="val">${fmt(arv)}</span></div>
                <div class="data-row"><span class="lbl">Timeline</span><span class="val">${timeline} Months</span></div>
            `;

            section2Title = "COST OF CAPITAL & HOLDING";
            const pts = clean('input_pointsB');
            const rate = clean('input_interestRateB');
            const hold = clean('input_holdingCostsB');
            const close = clean('input_closingCostsB');

            section2HTML = `
                <div class="data-row"><span class="lbl">Loan Points</span><span class="val">${pts}%</span></div>
                <div class="data-row"><span class="lbl">Interest Rate</span><span class="val">${rate}%</span></div>
                <div class="data-row"><span class="lbl">Monthly Holding Costs</span><span class="val">${fmt(hold)}</span></div>
                <div class="data-row"><span class="lbl">Buying Closing Costs</span><span class="val">${fmt(close)}</span></div>
            `;

            section3HTML = `
                <div class="data-row"><span class="lbl">Net Profit</span><span class="val">${txt('res_netProfitB')}</span></div>
                <div class="data-row"><span class="lbl">Profit Margin</span><span class="val">${txt('res_marginB')}</span></div>
                <div class="data-row"><span class="lbl">Annualized ROI</span><span class="val">${txt('res_annRoiB')}</span></div>
                <div class="data-row"><span class="lbl">Max Allowable Offer (MAO)</span><span class="val">${txt('res_maoB')}</span></div>
            `;
            summaryHTML = `<div class="sum-row final"><span class="lbl">70% RULE CHECK</span><span class="val">${txt('res_rule70B')}</span></div>`;
            note = document.getElementById('mentor-summary-B').innerText;
        }
        else if (currentMode === 'mode-c') {
            subTitle = "BUY, REHAB, RENT, REFINANCE, REPEAT (BRRRR) EVALUATION";
            section1Title = `ACQUISITION & REHABILITATION PHASE (${stateName.toUpperCase()})`;
            
            const price = clean('input_purchasePriceC');
            const rehab = clean('input_rehabC');
            const arv = clean('input_arvC');
            const pts = clean('input_initialPointsC');
            const carry = clean('input_initialInterestC');
            const season = clean('input_seasoningC');

            section1HTML = `
                <div class="data-row"><span class="lbl">Purchase Price (Distressed)</span><span class="val">${fmt(price)}</span></div>
                <div class="data-row"><span class="lbl">Rehab Budget</span><span class="val">${fmt(rehab)}</span></div>
                <div class="data-row"><span class="lbl">Initial Points (${pts}%)</span><span class="val">${fmt((price+rehab)*(pts/100))}</span></div>
                <div class="data-row"><span class="lbl">Initial Interest Carry</span><span class="val">${fmt(carry)}</span></div>
                <div class="data-row"><span class="lbl">Projected ARV (New Value)</span><span class="val">${fmt(arv)}</span></div>
                <div class="data-row"><span class="lbl">Seasoning Period Required</span><span class="val">${season} Months</span></div>
            `;

            section2Title = "LONG-TERM REFINANCE & OPERATIONS PROJECTIONS";
            const ltv = clean('input_refiLtvC');
            const rRate = clean('input_refiRateC');
            const rCost = clean('input_refiCostsC');
            const rent = clean('input_rentC');
            const haircut = clean('input_appraisalHaircutC');
            // Estimate Exp Ratio
            const vac = clean('input_vacancyC');
            const maint = clean('input_maintenanceC');
            const cap = clean('input_capexC');
            const mgmt = clean('input_managementC');
            const totalExpRatio = vac + maint + cap + mgmt;

            section2HTML = `
                <div class="data-row"><span class="lbl">Refinance LTV Target</span><span class="val">${ltv}%</span></div>
                <div class="data-row"><span class="lbl">Refinance Interest Rate</span><span class="val">${rRate}%</span></div>
                <div class="data-row"><span class="lbl">Refinance Closing Costs</span><span class="val">${fmt(rCost)}</span></div>
                <div class="data-row"><span class="lbl">Post-Rehab Gross Rent</span><span class="val">${fmt(rent)}</span></div>
                <div class="data-row"><span class="lbl">Post-Refi Mortgage Obligation</span><span class="val">${txt('res_mortgageC')}</span></div>
                <div class="data-row"><span class="lbl">Appraisal Haircut Risk</span><span class="val">${haircut}%</span></div>
                <div class="data-row"><span class="lbl">Total Operating Expenses (Vacancy, Maintenance, CapEx, Management)</span><span class="val">${totalExpRatio}%</span></div>
            `;

            section3Title = "CAPITAL VELOCITY & TARGET METRICS";
            section3HTML = `
                <div class="data-row"><span class="lbl">Capital Velocity Recaptured</span><span class="val">${txt('res_capVelocityC')}</span></div>
                <div class="data-row"><span class="lbl">Infinite Return Achieved</span><span class="val">${txt('res_infiniteC')}</span></div>
                <div class="data-row"><span class="lbl">Scaling Power</span><span class="val">${txt('res_scalingC')}</span></div>
                <div class="data-row"><span class="lbl">Minimum Appraisal Required</span><span class="val">${txt('res_minAppraisalC')}</span></div>
            `;

            summaryHTML = `
                <div class="sum-row"><span class="lbl">CASH PULLED OUT AT REFINANCE</span><span class="val">${txt('res_cashPulledC')}</span></div>
                <div class="sum-row"><span class="lbl">TRAPPED EQUITY (CASH LEFT IN DEAL)</span><span class="val">${txt('res_cashLeftC')}</span></div>
                <div class="sum-row final"><span class="lbl">POST-REFI MONTHLY CASH FLOW</span><span class="val">${txt('res_cashFlowC')}</span></div>
            `;
            note = document.getElementById('mentor-summary-C').innerText;
        }

        // --- 2. Build the Official Document HTML ---
        const printContainer = document.getElementById('print-view-container');
        
        printContainer.innerHTML = `
            <div class="doc-wrapper">
                <div class="doc-header">
                    <img src="../../img/Logo_Gold.webp" alt="Solveria Logo" class="doc-logo">
                    <div class="doc-title-block">
                        <h1>${title}</h1>
                        <h2>${subTitle}</h2>
                    </div>
                </div>

                <div class="doc-meta-grid">
                    <div class="meta-row">
                        <div class="meta-group">
                            <span class="meta-label">PREPARED BY:</span>
                            <div class="meta-line"></div>
                        </div>
                        <div class="meta-group">
                            <span class="meta-label">DATE:</span>
                            <span class="meta-val" style="border-bottom: 1px solid #000; padding: 0 10px;">${dateStr}</span>
                        </div>
                    </div>
                    <div class="meta-row">
                        <div class="meta-group">
                            <span class="meta-label">PROPERTY ID:</span>
                            <div class="meta-line"></div>
                        </div>
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">I. ${section1Title}</div>
                    <div class="section-content">
                        <div class="context-box">
                            <p><strong>LEGAL/MARKET STATUS:</strong> Distressed Asset Acquisition. Subject to Appraisal Verification.</p>
                            <p><strong>NOTE:</strong> Inputs are based on current market assumptions and estimated contractor bids.</p>
                        </div>
                        <div class="data-grid-2col">
                            ${section1HTML}
                        </div>
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">II. ${section2Title}</div>
                    <div class="section-content">
                         <div class="data-grid-2col">
                            ${section2HTML}
                        </div>
                        <div class="analyst-note-block">
                            | <strong>ANALYST NOTE:</strong> ${note}
                        </div>
                    </div>
                </div>

                <div class="doc-section">
                    <div class="section-title">III. ${section3Title}</div>
                    <div class="section-content">
                        <div class="data-grid-2col">
                            ${section3HTML}
                        </div>
                    </div>
                </div>

                <div class="doc-section summary-box">
                    <div class="section-title">IV. DEAL DISCREPANCY & CASH FLOW SUMMARY</div>
                    <div class="section-content">
                        <div class="summary-grid">
                            ${summaryHTML}
                        </div>
                    </div>
                </div>

                <div class="doc-footer">
                    <div class="signature-line">
                        <div class="sig-block">
                            <span class="sig-rule"></span>
                            <span class="sig-label">SIGNATURE OF INVESTOR / ANALYST</span>
                        </div>
                        <div class="sig-block" style="width: 25%;">
                            <span class="sig-rule"></span>
                            <span class="sig-label">DATE</span>
                        </div>
                    </div>
                    
                    <div class="legal-disclaimer">
                        <strong>LEGAL & METHODOLOGY DISCLAIMER:</strong> This Strategic Asset Analysis Report is generated automatically for informational and underwriting estimation purposes only. The figures presented are estimates derived from user-inputted algorithms and static jurisdictional data models, rather than certified physical property appraisals. This document does not constitute legal advice, a binding financial guarantee, or a certified professional appraisal. Investors assume all responsibility for how this data is utilized.
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
        
        // Event Listeners for the actions
        const btnShare = document.getElementById('btn-share');
        if (btnShare) btnShare.addEventListener('click', () => this.handleShare());
        
        const btnPrint = document.getElementById('btn-print');
        if (btnPrint) btnPrint.addEventListener('click', () => {
            this.preparePrintData();
            // Wait 500ms for the logo to paint before opening dialog
            setTimeout(() => window.print(), 500);
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
    // 1. POPULATE DATA
    populateStateDropdowns();
    
    // 2. INITIALIZE LISTENERS
    initializeSliders();
    initializeCustomDropdowns();
    initializeModes();
    initializeAdvancedToggle();
    initializeStateSelector();
    
    // 3. INITIALIZE FAQ (NEW)
    initializeFAQ();
    
    // 4. FIRST RUN
    setTimeout(() => calculateAll(null), 500);

    // --- TOOLTIP LOGIC ---
    initializeTooltips();

    // --- NEW: INIT TOOL FEATURES (PDF, PRINT, SHARE) ---
    ToolFeatures.init();
});

function initializeTooltips() {
    const tooltip = document.getElementById('global-tooltip');
    const titleEl = document.getElementById('tooltip-title');
    const textEl = document.getElementById('tooltip-text');
    const cards = document.querySelectorAll('.mode-card');

    if (!tooltip || !cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.getAttribute('data-tooltip-title');
            const text = card.getAttribute('data-tooltip-text');
            if (title && text) {
                titleEl.textContent = title;
                textEl.textContent = text;
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });

        card.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });

        card.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const tipW = tooltip.offsetWidth;
            const winW = window.innerWidth;
            let finalLeft = x + 15; 
            let finalTop = y + 15;
            if (finalLeft + tipW > winW - 20) {
                finalLeft = x - tipW - 15;
            }
            if (finalLeft < 10) {
                finalLeft = (winW / 2) - (tipW / 2);
                finalTop = y + 25; 
            }
            tooltip.style.left = `${finalLeft}px`;
            tooltip.style.top = `${finalTop}px`;
        });
    });
}