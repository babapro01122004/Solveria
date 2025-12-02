document.addEventListener('DOMContentLoaded', () => {

    // --- Optimization: Global Formatter ---
    const USD_FORMATTER = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const PMI_RATE = 0.005; 

    // --- Chart Global Variables ---
    let monthlyCostChart;
    let chartJsLoaded = false;
    let chartsInitialized = false;
    let latestResults = null;

    // --- 1. Lazy Load Chart.js (Optimized Init) ---
    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!chartJsLoaded) {
                    chartJsLoaded = true;
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = () => {
                        // FIX: Wrap init in rAF to prevent Reflow during scroll
                        requestAnimationFrame(() => {
                            initializeCharts();
                            if (latestResults) updateCharts(latestResults);
                        });
                    };
                    document.body.appendChild(script);
                } else if (!chartsInitialized) {
                    requestAnimationFrame(() => {
                        initializeCharts();
                        if (latestResults) updateCharts(latestResults);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '200px' });

    const chartContainer = document.getElementById('charts-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }

    // --- 2. Initialize Charts ---
    let tooltipRequest = null;
    
    const initializeCharts = () => {
        if (typeof Chart === 'undefined') return;
        chartsInitialized = true;

        const tooltipEl = document.getElementById('chartTooltip');
        if (tooltipEl && tooltipEl.parentElement.tagName !== 'BODY') {
            document.body.appendChild(tooltipEl);
            tooltipEl.style.zIndex = '1000'; 
            tooltipEl.style.top = '0'; 
            tooltipEl.style.left = '0';
            tooltipEl.style.willChange = 'transform, opacity';
        }

        const ctx = document.getElementById('monthlyCostChart')?.getContext('2d');
        if (!ctx) return;

        if (monthlyCostChart) monthlyCostChart.destroy();

        monthlyCostChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal & Interest', 'Property Tax', 'Insurance', 'HOA', 'PMI'],
                datasets: [{
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: ['#B5855E', '#E5D1B8', '#DED5C8', '#F5F1EA', '#8B6343'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, 
                aspectRatio: 1, 
                cutout: '65%', 
                animation: { duration: 400 },
                plugins: {
                    legend: { display: false }, 
                    tooltip: { enabled: false } 
                },
                onHover: (event, chartElement) => {
                    const target = event.native.target;
                    if(target) target.style.cursor = chartElement.length ? 'pointer' : 'default';
                }
            }
        });

        const canvas = monthlyCostChart.canvas;
        canvas.addEventListener('mousemove', (e) => customTooltipHandler(e, monthlyCostChart), {passive: true});
        canvas.addEventListener('mouseout', () => {
            const tooltipEl = document.getElementById('chartTooltip');
            if (tooltipEl) tooltipEl.style.opacity = 0;
        });
    };

    // --- 3. Custom Tooltip Handler (Fix Reflow) ---
    const customTooltipHandler = (event, chart) => {
        const tooltipEl = document.getElementById('chartTooltip');
        if (!tooltipEl) return;

        const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

        if (elements.length === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        const data = chart.data;
        const index = elements[0].index;
        const dataset = data.datasets[0];
        const label = data.labels[index];
        const value = dataset.data[index];
        const color = dataset.backgroundColor[index];

        const newHtml = `
            <div class="tooltip-title">${label}</div>
            <div class="tooltip-body-item">
                <div style="display: flex; align-items: center;">
                    <span class="tooltip-color-box" style="background-color: ${color}"></span>
                    <span>Cost:</span>
                </div>
                <span style="font-weight:500;">${formatCurrency(value)}</span>
            </div>
        `;

        if (tooltipEl.innerHTML !== newHtml) {
             tooltipEl.innerHTML = newHtml;
        }

        tooltipEl.style.opacity = 1;

        if (tooltipRequest) cancelAnimationFrame(tooltipRequest);

        tooltipRequest = requestAnimationFrame(() => {
            // Measure NOW (deferred) to avoid reflow
            const tooltipWidth = tooltipEl.offsetWidth;
            const tooltipHeight = tooltipEl.offsetHeight;
            
            const { clientX, clientY } = event; 
            const margin = 15;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            
            let finalX = clientX + margin;
            let finalY = clientY + margin;

            if (finalY + tooltipHeight > winHeight) {
                finalY = clientY - tooltipHeight - margin;
            }
            if (finalX + tooltipWidth > winWidth) {
                 finalX = clientX - tooltipWidth - margin;
            }

            tooltipEl.style.position = 'fixed';
            tooltipEl.style.transform = `translate(${finalX}px, ${finalY}px)`;
        });
    };

    // --- 4. Update Charts Function ---
    const updateCharts = (results) => {
        if (!chartsInitialized || !monthlyCostChart) return;

        const data = [
            results.mortgagePI, 
            results.propTaxMonthly, 
            results.insuranceMonthly, 
            results.hoaMonthly, 
            results.finalPMIMonthly
        ];

        monthlyCostChart.data.datasets[0].data = data;
        monthlyCostChart.update();
        
        updateCustomLegend(monthlyCostChart, results);
        updateBreakdownMenu(results);
    };

    const updateCustomLegend = (chart, results) => {
        const legendContainer = document.getElementById('chartLegend');
        if (!legendContainer) return;
        
        legendContainer.innerHTML = '';
        const data = chart.data.datasets[0].data;
        const labels = chart.data.labels;
        const colors = chart.data.datasets[0].backgroundColor;

        const valuesMap = {
            'Principal & Interest': results.mortgagePI,
            'Property Tax': results.propTaxMonthly,
            'Insurance': results.insuranceMonthly,
            'HOA': results.hoaMonthly,
            'PMI': results.finalPMIMonthly
        };

        labels.forEach((label, index) => {
            if (data[index] > 0) {
                const color = colors[index];
                const value = valuesMap[label];
                
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.innerHTML = `
                    <div class="legend-color-box" style="background-color: ${color}"></div>
                    <span>${label}</span>
                    <span class="legend-value-print">: ${formatCurrency(value)}</span>
                `;
                legendContainer.appendChild(legendItem);
            }
        });
    };
    
    // --- Update Breakdown List Menu ---
    const updateBreakdownMenu = (results) => {
        const listContainer = document.getElementById('breakdownList');
        if (!listContainer || !monthlyCostChart) return;

        listContainer.innerHTML = ''; 

        const chartData = monthlyCostChart.data;
        const labels = chartData.labels;
        const values = chartData.datasets[0].data;
        const colors = chartData.datasets[0].backgroundColor;
        
        const total = values.reduce((acc, curr) => acc + curr, 0);

        labels.forEach((label, index) => {
            const val = values[index];
            if (val > 0) {
                const percentage = total > 0 ? ((val / total) * 100).toFixed(1) + '%' : '0%';
                
                const row = document.createElement('div');
                row.className = 'breakdown-row';
                row.innerHTML = `
                    <div class="breakdown-label">
                        <div class="color-dot" style="background-color: ${colors[index]}"></div>
                        <span>${label}</span>
                    </div>
                    <div class="breakdown-values">
                        <span class="cost-val">${formatCurrency(val)}</span>
                        <span class="share-val">${percentage}</span>
                    </div>
                `;
                listContainer.appendChild(row);
            }
        });
    };

    // --- Input & Output Elements ---
    const allInputs = {
        annualIncome: document.getElementById('annualIncome'),
        monthlyDebt: document.getElementById('monthlyDebt'),
        maxFrontEndDTI: document.getElementById('maxFrontEndDTI'),
        maxBackEndDTI: document.getElementById('maxBackEndDTI'),
        downPayment: document.getElementById('downPayment'),
        loanTerm: document.getElementById('loanTerm'),
        interestRate: document.getElementById('interestRate'),
        closingCosts: document.getElementById('closingCosts'),
        propertyTax: document.getElementById('propertyTax'),
        insurance: document.getElementById('insurance'),
        hoaFee: document.getElementById('hoaFee'),
        maintenance: document.getElementById('maintenance')
    };

    const resultElements = {
        homePrice: document.getElementById('resultHomePrice'),
        monthlyPayment: document.getElementById('resultMonthlyPayment'),
        loanAmount: document.getElementById('resultLoanAmount'),
        totalClosing: document.getElementById('resultTotalClosing'),
        summaryText: document.getElementById('resultSummaryText'),
        outDownPayment: document.getElementById('outDownPayment'),
        outClosingCosts: document.getElementById('outClosingCosts'),
        outClosingCostsLabel: document.querySelector('#one-time-costs .result-item:nth-child(2) .label'),
        outTotalAtClosing: document.getElementById('outTotalAtClosing'),
        outLoanAmount: document.getElementById('outLoanAmount'),
        outFrontDTI: document.getElementById('outFrontDTI'),
        outBackDTI: document.getElementById('outBackDTI'),
        outPropertyTaxAnnually: document.getElementById('outPropertyTaxAnnually'),
        outInsuranceAnnually: document.getElementById('outInsuranceAnnually'),
        outHOAAnnually: document.getElementById('outHOAAnnually'),
        outMaintenanceAnnually: document.getElementById('outMaintenanceAnnually'),
        outMaintenanceAnnuallyLabel: document.querySelector('#annual-costs .result-item:nth-child(4) .label'),
        outMortgagePI: document.getElementById('outMortgagePI'),
        outPMIMonthly: document.getElementById('outPMIMonthly'),
        outPropertyTaxMonthly: document.getElementById('outPropertyTaxMonthly'),
        outInsuranceMonthly: document.getElementById('outInsuranceMonthly'),
        outHOAMonthly: document.getElementById('outHOAMonthly'),
        outMaintenanceMonthly: document.getElementById('outMaintenanceMonthly'),
        outMaintenanceMonthlyLabel: document.querySelector('#monthly-costs .result-item:nth-child(6) .label'),
        outTotalMonthly: document.getElementById('outTotalMonthly')
    };

    // --- Utility Functions ---
    const formatCurrency = (value) => {
        if (isNaN(value)) return '$0.00';
        return USD_FORMATTER.format(value);
    };

    const cleanNumber = (str) => {
        if (!str) return 0;
        const cleaned = String(str).replace(/,/g, '').trim();
        const floatVal = parseFloat(cleaned);
        return (isNaN(floatVal) || floatVal < 0) ? 0 : floatVal;
    };

    // --- Strict Input Formatting ---
    const formatInput = (input) => {
        let value = input.value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        const isPercentage = ['maxFrontEndDTI', 'maxBackEndDTI', 'interestRate', 'closingCosts', 'propertyTax', 'insurance', 'maintenance'].includes(input.id);
        const isYear = input.id === 'loanTerm';

        if (isPercentage || isYear) {
            if (parseFloat(value) > 100) value = '100';
        } else {
            let intPart = parts[0];
            if (intPart.length > 10) {
                intPart = intPart.substring(0, 10);
                value = parts.length > 1 ? intPart + '.' + parts[1] : intPart;
            }
        }

        if (value === '') {
            input.value = '';
            return;
        }

        let [integerPart, decimalPart] = value.split('.');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (value.includes('.')) {
            if (decimalPart.length > 2) decimalPart = decimalPart.substring(0, 2);
            input.value = `${integerPart}.${decimalPart}`;
        } else {
            input.value = integerPart;
        }
    };
    
    // --- Slider Sync Logic with Power Curve ---
    const SLIDER_CONFIG = {
        annualIncome: { type: 'cubic', max: 10000000 },
        monthlyDebt: { type: 'cubic', max: 50000 },
        maxFrontEndDTI: { type: 'linear', max: 60, min: 10 },
        maxBackEndDTI: { type: 'linear', max: 60, min: 10 },
        downPayment: { type: 'cubic', max: 5000000 },
        loanTerm: { type: 'linear', max: 40, min: 5 },
        interestRate: { type: 'linear', max: 15 },
        closingCosts: { type: 'linear', max: 10 },
        propertyTax: { type: 'linear', max: 5 },
        insurance: { type: 'linear', max: 5 },
        hoaFee: { type: 'cubic', max: 5000 },
        maintenance: { type: 'linear', max: 5 }
    };

    // Convert Real Value to Slider Percent (0-100)
    const valToSlider = (val, id) => {
        const config = SLIDER_CONFIG[id];
        if (!config) return 0;
        
        if (config.type === 'cubic') {
            // Cubic: slider% = 100 * (val / max)^(1/3)
            return Math.pow(val / config.max, 1/3) * 100;
        } else {
            // Linear
            const min = config.min || 0;
            return ((val - min) / (config.max - min)) * 100;
        }
    };

    // Convert Slider Percent to Real Value
    const sliderToVal = (percent, id) => {
        const config = SLIDER_CONFIG[id];
        if (!config) return 0;

        if (config.type === 'cubic') {
            // Cubic: val = max * (percent / 100)^3
            return config.max * Math.pow(percent / 100, 3);
        } else {
            // Linear
            const min = config.min || 0;
            return ((percent / 100) * (config.max - min)) + min;
        }
    };

    const updateSliderVisual = (slider) => {
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        // IMPORTANT: Use backgroundImage to prevent overriding CSS background-size
        slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
    };

    // --- Initialize Sliders ---
    Object.keys(allInputs).forEach(key => {
        const input = allInputs[key];
        const slider = document.getElementById(`slider_${key}`);
        if (!input || !slider) return;

        // Init logic moved to Deep Linking section to handle overwrite

        // 2. Slider -> Input Sync
        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            
            // Rounding logic for cleaner numbers
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100; // Round to nearest 100 for big numbers
                else realVal = Math.round(realVal);
            } else {
                // Keep decimals for percentages
                realVal = Math.round(realVal * 100) / 100; 
                // Special integer handling for Term
                if (key === 'loanTerm') realVal = Math.round(realVal);
            }

            input.value = realVal; 
            formatInput(input); // Add commas
            updateSliderVisual(e.target);
            debouncedCalculate(); // Trigger calc
        });

        // 3. Input -> Slider Sync
        input.addEventListener('input', (e) => {
            formatInput(e.target); // Standard format
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            debouncedCalculate();
        });
        
        // Also sync on blur to catch any edge cases
        input.addEventListener('blur', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
        });

        // --- Toggle Active Class on Interaction ---
        const addActive = () => slider.classList.add('active-slider');
        const removeActive = () => slider.classList.remove('active-slider');
        input.addEventListener('focus', addActive);
        input.addEventListener('blur', removeActive);
        slider.addEventListener('touchstart', addActive, { passive: true });
        slider.addEventListener('touchend', removeActive);
        slider.addEventListener('touchcancel', removeActive);
        slider.addEventListener('mousedown', addActive);
        slider.addEventListener('mouseup', removeActive);
    });

    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const calculatePAndI = (principal, annualRate, termYears) => {
        if (principal <= 0) return 0;
        if (annualRate <= 0) return principal / (termYears * 12);
        
        const monthlyRate = annualRate / 100 / 12;
        const numPayments = termYears * 12;
        if (numPayments <= 0) return 0;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    // --- Core Calculation ---
    const calculateAndDisplay = () => {
        const annualIncome = cleanNumber(allInputs.annualIncome.value);
        const monthlyDebt = cleanNumber(allInputs.monthlyDebt.value);
        const maxFrontEndDTI = cleanNumber(allInputs.maxFrontEndDTI.value);
        const maxBackEndDTI = cleanNumber(allInputs.maxBackEndDTI.value);
        const downPayment = cleanNumber(allInputs.downPayment.value);
        const loanTerm = cleanNumber(allInputs.loanTerm.value);
        const interestRate = cleanNumber(allInputs.interestRate.value);
        const closingCostsPercent = cleanNumber(allInputs.closingCosts.value);
        const propTaxPercent = cleanNumber(allInputs.propertyTax.value);
        const insurancePercent = cleanNumber(allInputs.insurance.value);
        const hoaMonthly = cleanNumber(allInputs.hoaFee.value);
        const maintenancePercent = cleanNumber(allInputs.maintenance.value);

        const monthlyIncome = annualIncome / 12;
        if (monthlyIncome === 0) {
            updateDOM(null);
            return;
        }
        
        const maxFrontEndPayment = monthlyIncome * (maxFrontEndDTI / 100);
        const maxBackEndPayment = monthlyIncome * (maxBackEndDTI / 100);
        const availableForHousing = maxBackEndPayment - monthlyDebt;
        const totalAffordableMonthlyPayment = Math.max(0, Math.min(maxFrontEndPayment, availableForHousing));

        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;
        let mortgageFactor; 
        if (interestRate <= 0 || numPayments <= 0) {
            mortgageFactor = (numPayments > 0) ? (1 / numPayments) : 0;
        } else {
            mortgageFactor = (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        }

        const taxInsMaintFactor = (propTaxPercent / 100 / 12) + (insurancePercent / 100 / 12) + (maintenancePercent / 100 / 12);
        
        // Pass 1: No PMI
        let homePrice = 0;
        const numeratorNoPMI = totalAffordableMonthlyPayment - hoaMonthly + (downPayment * mortgageFactor);
        const denominatorNoPMI = mortgageFactor + taxInsMaintFactor;

        if (denominatorNoPMI > 0) {
            homePrice = numeratorNoPMI / denominatorNoPMI;
        }
        if (homePrice < downPayment) homePrice = downPayment;

        // Pass 2: PMI Check
        let finalPMIMonthly = 0;
        let requiresPMI = false;
        
        if (homePrice > downPayment) {
            const loanAmountTemp = homePrice - downPayment;
            const ltv = (loanAmountTemp / homePrice) * 100;

            if (ltv > 80) {
                const pmiMonthlyFactor = PMI_RATE / 12;
                const numeratorWithPMI = totalAffordableMonthlyPayment - hoaMonthly + (downPayment * (mortgageFactor + pmiMonthlyFactor));
                const denominatorWithPMI = mortgageFactor + taxInsMaintFactor + pmiMonthlyFactor;
                
                let homePriceWithPMI = 0;
                if (denominatorWithPMI > 0) {
                    homePriceWithPMI = numeratorWithPMI / denominatorWithPMI;
                }
                
                const newLTV = ((homePriceWithPMI - downPayment) / homePriceWithPMI) * 100;
                if (newLTV <= 80) {
                    const priceAt80LTV = downPayment / 0.20;
                    const costAt80LTV = ((priceAt80LTV - downPayment) * mortgageFactor) + (priceAt80LTV * taxInsMaintFactor) + hoaMonthly;
                    if (costAt80LTV <= totalAffordableMonthlyPayment) {
                         homePrice = priceAt80LTV;
                         requiresPMI = false;
                    } else {
                        homePrice = homePriceWithPMI;
                        requiresPMI = true;
                    }
                } else {
                    homePrice = homePriceWithPMI;
                    requiresPMI = true;
                }
            }
        }

        if (homePrice < downPayment) homePrice = downPayment;
        
        const loanAmount = Math.max(0, homePrice - downPayment);
        if (requiresPMI && loanAmount > 0) {
            finalPMIMonthly = loanAmount * (PMI_RATE / 12);
        }

        const closingCostsValue = homePrice * (closingCostsPercent / 100);
        const totalAtClosing = downPayment + closingCostsValue;
        
        const mortgagePI = calculatePAndI(loanAmount, interestRate, loanTerm);
        const propTaxMonthly = homePrice * (propTaxPercent / 100 / 12);
        const insuranceMonthly = homePrice * (insurancePercent / 100 / 12);
        const maintenanceMonthly = homePrice * (maintenancePercent / 100 / 12);
        
        const totalMonthlyCost = mortgagePI + propTaxMonthly + insuranceMonthly + hoaMonthly + maintenanceMonthly + finalPMIMonthly;
        const propTaxAnnual = propTaxMonthly * 12;
        const insuranceAnnual = insuranceMonthly * 12;
        const maintenanceAnnual = maintenanceMonthly * 12;
        const hoaAnnual = hoaMonthly * 12;
        
        const frontDTI = (totalMonthlyCost / monthlyIncome) * 100;
        const backDTI = ((totalMonthlyCost + monthlyDebt) / monthlyIncome) * 100;
        
        const results = {
            homePrice, totalMonthlyCost, loanAmount, totalAtClosing,
            downPayment, closingCostsValue, closingCostsPercent,
            frontDTI, backDTI, mortgagePI, 
            propTaxAnnual, insuranceAnnual, hoaAnnual, maintenanceAnnual, maintenancePercent,
            propTaxMonthly, insuranceMonthly, hoaMonthly, maintenanceMonthly, finalPMIMonthly
        };

        latestResults = results; 

        updateDOM(results);
        if (chartsInitialized) {
            updateCharts(results);
        }
    };

    const updateDOM = (results) => {
        if (!results) {
            Object.values(resultElements).forEach(el => {
                if (el) {
                    if (el.id.includes('DTI')) el.textContent = '--';
                    else if (el.tagName === 'P') el.textContent = 'Enter your details to see a summary.';
                    else if (el.tagName === 'SPAN') el.textContent = '$0.00';
                }
            });
            return;
        }

        resultElements.homePrice.textContent = formatCurrency(results.homePrice);
        resultElements.monthlyPayment.textContent = formatCurrency(results.totalMonthlyCost);
        resultElements.loanAmount.textContent = formatCurrency(results.loanAmount);
        resultElements.totalClosing.textContent = formatCurrency(results.totalAtClosing);
        resultElements.summaryText.innerHTML = `Based on your numbers, you can afford a home priced around <span class="summary-highlight">${formatCurrency(results.homePrice)}</span> with a total monthly payment of <span class="summary-highlight">${formatCurrency(results.totalMonthlyCost)}</span>.`;

        resultElements.outDownPayment.textContent = formatCurrency(results.downPayment);
        resultElements.outClosingCosts.textContent = formatCurrency(results.closingCostsValue);
        resultElements.outClosingCostsLabel.textContent = `Closing Costs (Est. ${results.closingCostsPercent}%)`;
        resultElements.outTotalAtClosing.textContent = formatCurrency(results.totalAtClosing);
        
        resultElements.outLoanAmount.textContent = formatCurrency(results.loanAmount);
        resultElements.outFrontDTI.textContent = `${results.frontDTI.toFixed(1)}%`;
        resultElements.outBackDTI.textContent = `${results.backDTI.toFixed(1)}%`;

        resultElements.outPropertyTaxAnnually.textContent = formatCurrency(results.propTaxAnnual);
        resultElements.outInsuranceAnnually.textContent = formatCurrency(results.insuranceAnnual);
        resultElements.outHOAAnnually.textContent = formatCurrency(results.hoaAnnual);
        resultElements.outMaintenanceAnnually.textContent = formatCurrency(results.maintenanceAnnual);
        resultElements.outMaintenanceAnnuallyLabel.textContent = `Maintenance (Est. ${results.maintenancePercent}%)`;
        
        resultElements.outMortgagePI.textContent = formatCurrency(results.mortgagePI);
        resultElements.outPMIMonthly.textContent = formatCurrency(results.finalPMIMonthly);
        resultElements.outPropertyTaxMonthly.textContent = formatCurrency(results.propTaxMonthly);
        resultElements.outInsuranceMonthly.textContent = formatCurrency(results.insuranceMonthly);
        resultElements.outHOAMonthly.textContent = formatCurrency(results.hoaMonthly);
        resultElements.outMaintenanceMonthly.textContent = formatCurrency(results.maintenanceMonthly);
        resultElements.outMaintenanceMonthlyLabel.textContent = `Maintenance (Est. ${results.maintenancePercent}%)`;
        resultElements.outTotalMonthly.textContent = formatCurrency(results.totalMonthlyCost);
    };

    const debouncedCalculate = debounce(calculateAndDisplay, 50);

    window.addEventListener('resize', debounce(() => {
        // Chart.js handles resize
    }, 250));

    // --- DEEP LINKING: Check URL params on load ---
    const params = new URLSearchParams(window.location.search);
    if (params.has('inc')) {
        // Short keys: inc, debt, fdti, bdti, down, term, rate, clos, tax, ins, hoa, maint
        if(params.has('inc')) allInputs.annualIncome.value = params.get('inc');
        if(params.has('debt')) allInputs.monthlyDebt.value = params.get('debt');
        if(params.has('fdti')) allInputs.maxFrontEndDTI.value = params.get('fdti');
        if(params.has('bdti')) allInputs.maxBackEndDTI.value = params.get('bdti');
        if(params.has('down')) allInputs.downPayment.value = params.get('down');
        if(params.has('term')) allInputs.loanTerm.value = params.get('term');
        if(params.has('rate')) allInputs.interestRate.value = params.get('rate');
        if(params.has('clos')) allInputs.closingCosts.value = params.get('clos');
        if(params.has('tax')) allInputs.propertyTax.value = params.get('tax');
        if(params.has('ins')) allInputs.insurance.value = params.get('ins');
        if(params.has('hoa')) allInputs.hoaFee.value = params.get('hoa');
        if(params.has('maint')) allInputs.maintenance.value = params.get('maint');
    }

    // --- Initialize Inputs & Sliders (Handles Default or Deep Link values) ---
    Object.keys(allInputs).forEach(key => {
        const input = allInputs[key];
        const slider = document.getElementById(`slider_${key}`);
        if(input && slider) {
            formatInput(input);
            slider.value = valToSlider(cleanNumber(input.value), key);
            updateSliderVisual(slider);
        }
    });
    
    setTimeout(calculateAndDisplay, 0);

    // --- Reset Button Logic ---
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            Object.keys(allInputs).forEach(key => {
                const input = allInputs[key];
                if (input) {
                    input.value = input.defaultValue; 
                    formatInput(input);
                    const slider = document.getElementById(`slider_${key}`);
                    if (slider) {
                        slider.value = valToSlider(cleanNumber(input.value), key);
                        updateSliderVisual(slider);
                    }
                }
            });
            // Clear URL params on reset for clean state
            window.history.replaceState({}, document.title, window.location.pathname);
            calculateAndDisplay();
        });
    }

    // --- SMART SHARE LOGIC ---
    const shareBtn = document.getElementById('shareBtn');
    const shareMenu = document.getElementById('shareMenu');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const emailShareBtn = document.getElementById('emailShareBtn');

    const generateDeepLink = () => {
        const p = new URLSearchParams();
        p.set('inc', cleanNumber(allInputs.annualIncome.value));
        p.set('debt', cleanNumber(allInputs.monthlyDebt.value));
        p.set('fdti', cleanNumber(allInputs.maxFrontEndDTI.value));
        p.set('bdti', cleanNumber(allInputs.maxBackEndDTI.value));
        p.set('down', cleanNumber(allInputs.downPayment.value));
        p.set('term', cleanNumber(allInputs.loanTerm.value));
        p.set('rate', cleanNumber(allInputs.interestRate.value));
        p.set('clos', cleanNumber(allInputs.closingCosts.value));
        p.set('tax', cleanNumber(allInputs.propertyTax.value));
        p.set('ins', cleanNumber(allInputs.insurance.value));
        p.set('hoa', cleanNumber(allInputs.hoaFee.value));
        p.set('maint', cleanNumber(allInputs.maintenance.value));
        return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
    };

    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.stopPropagation(); // Stop bubbling
            const shareUrl = generateDeepLink();
            const shareTitle = 'My Home Affordability Analysis';
            const shareText = `I checked my home buying power on Solveria. Check out the numbers: ${shareUrl}`;

            // 1. Mobile / OS Level Share
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl
                    });
                } catch (err) {
                    console.log('Share canceled or failed', err);
                }
            } else {
                // 2. Desktop Fallback (Custom Menu)
                if (shareMenu) {
                    shareMenu.classList.toggle('active');
                }
            }
        });
    }

    // Desktop Menu Actions
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', (e) => {
            const url = generateDeepLink();
            navigator.clipboard.writeText(url).then(() => {
                const originalText = copyLinkBtn.textContent;
                copyLinkBtn.textContent = 'Copied!';
                setTimeout(() => copyLinkBtn.textContent = originalText, 2000);
            });
        });
    }

    if (emailShareBtn) {
        emailShareBtn.addEventListener('click', () => {
            const url = generateDeepLink();
            const subject = "Home Affordability Estimate";
            const body = `I calculated my home buying budget. Here is the breakdown:\n\n${url}`;
            window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (shareMenu && shareMenu.classList.contains('active')) {
            if (!shareMenu.contains(e.target) && e.target !== shareBtn) {
                shareMenu.classList.remove('active');
            }
        }
        
        // Also close the main Options menu
        const optionsMenu = document.getElementById('optionsMenu');
        const optionsOverlay = document.getElementById('optionsOverlay');
        const moreOptionsBtn = document.getElementById('moreOptionsBtn');
        if (optionsMenu && optionsMenu.classList.contains('active')) {
            if (!optionsMenu.contains(e.target) && e.target !== moreOptionsBtn) {
                optionsMenu.classList.remove('active');
                optionsOverlay.classList.remove('active');
            }
        }
    });

    const taglines = [
        "Find your place in the world.",
        "Clarity for your biggest purchase.",
        "Your path to homeownership."
    ];
    let taglineIndex = 0;
    const taglineElement = document.getElementById('looping-text');

    function cycleTaglines() {
        if (!taglineElement) return;
        taglineElement.textContent = taglines[taglineIndex];
        taglineElement.classList.add('fade-in-out');
        taglineIndex = (taglineIndex + 1) % taglines.length;
    }
    
    if (taglineElement) {
        taglineElement.addEventListener('animationend', () => {
            taglineElement.classList.remove('fade-in-out');
            setTimeout(cycleTaglines, 50); 
        });
        cycleTaglines();
    }

    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const optionsMenu = document.getElementById('optionsMenu');
    const optionsOverlay = document.getElementById('optionsOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    function toggleMenu() {
        optionsMenu.classList.toggle('active');
        optionsOverlay.classList.toggle('active');
    }

    function closeMenu() {
        optionsMenu.classList.remove('active');
        optionsOverlay.classList.remove('active');
    }

    if(moreOptionsBtn) moreOptionsBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(optionsOverlay) optionsOverlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && optionsMenu && optionsMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    const printDateEl = document.getElementById('printDate');
    if (printDateEl) {
        const now = new Date();
        printDateEl.textContent = now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
});