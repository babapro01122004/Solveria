document.addEventListener('DOMContentLoaded', () => {

    /* --- MARKET DATA (Update Weekly/Monthly) ---
       Last Updated: Dec 2, 2025
       Source: FRED / Mortgage News Daily
    */
    const BASE_RATES = {
        conventional: 6.8,
        fha: 6.2,
        va: 6.2
    };

    const CREDIT_ADJUSTMENTS = {
        excellent: 0,    // 760+
        good: 0.25,      // 700-759
        fair: 0.5        // 640-699
    };

    // --- Optimization: Global Formatter ---
    const USD_FORMATTER = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

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
                labels: ['Principal & Interest', 'Property Tax', 'Insurance', 'HOA', 'PMI / MIP'],
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

   // --- 3. Custom Tooltip Handler (Optimized) ---
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

        // Only write to DOM if content changed (Reduces layout thrashing)
        if (tooltipEl.innerHTML !== newHtml) {
             tooltipEl.innerHTML = newHtml;
        }

        // Use requestAnimationFrame to separate the "Read" from the "Write"
        if (tooltipRequest) cancelAnimationFrame(tooltipRequest);

        tooltipRequest = requestAnimationFrame(() => {
            // Make visible first so dimensions are calculable, but keep in separate frame
            tooltipEl.style.opacity = 1;
            
            const tooltipWidth = tooltipEl.offsetWidth;
            const tooltipHeight = tooltipEl.offsetHeight;
            const { clientX, clientY } = event; 
            const margin = 15;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            let finalX = clientX + margin;
            let finalY = clientY + margin;

            if (finalY + tooltipHeight > winHeight) finalY = clientY - tooltipHeight - margin;
            if (finalX + tooltipWidth > winWidth) finalX = clientX - tooltipWidth - margin;

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
            'PMI / MIP': results.finalPMIMonthly
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

    // --- Input Elements ---
    const allInputs = {
        loanType: document.getElementById('loanType'),
        creditScore: document.getElementById('creditScore'),
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

    const formatInput = (input) => {
        let value = input.value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
        
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
    
    // --- Slider Configuration ---
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
        const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${val}%, #e0e0e0 ${val}%, #e0e0e0 100%)`;
    };

    const updateSliderAndInput = (key, value) => {
        const input = allInputs[key];
        const slider = document.getElementById(`slider_${key}`);
        if(input && slider) {
            input.value = value;
            formatInput(input);
            slider.value = valToSlider(value, key);
            updateSliderVisual(slider);
        }
    };

    // --- LOAN SCENARIO LOGIC ---
    const updateScenarioDefaults = () => {
        const loanType = allInputs.loanType.value;
        const creditScore = allInputs.creditScore.value;

        // 1. Set Interest Rate
        const baseRate = BASE_RATES[loanType];
        const adj = CREDIT_ADJUSTMENTS[creditScore];
        const finalRate = (baseRate + adj).toFixed(3);
        updateSliderAndInput('interestRate', finalRate);

        // 2. Set DTI Defaults & Down Payment (Only if Loan Type changed)
        // Note: We don't overwrite if user manually changed them, 
        // but for simplicity here we reset to standard guidelines on type change.
        if (loanType === 'fha') {
            updateSliderAndInput('maxFrontEndDTI', 31);
            updateSliderAndInput('maxBackEndDTI', 43);
            // Don't force down payment overwrite to avoid user frustration, 
            // but ensure validation later.
        } else if (loanType === 'va') {
            updateSliderAndInput('maxFrontEndDTI', 41); // VA uses residual income, but 41 back is standard
            updateSliderAndInput('maxBackEndDTI', 41);
        } else {
            // Conventional
            updateSliderAndInput('maxFrontEndDTI', 28);
            updateSliderAndInput('maxBackEndDTI', 36);
        }
        
        calculateAndDisplay();
    };

    // --- Event Listeners for New Inputs ---
    if(allInputs.loanType) allInputs.loanType.addEventListener('change', updateScenarioDefaults);
    if(allInputs.creditScore) allInputs.creditScore.addEventListener('change', updateScenarioDefaults);

    // --- Slider & Input Sync ---
    Object.keys(allInputs).forEach(key => {
        const input = allInputs[key];
        if(input.tagName === 'SELECT') return; // Skip dropdowns

        const slider = document.getElementById(`slider_${key}`);
        if (!input || !slider) return;

        slider.addEventListener('input', (e) => {
            const pct = parseFloat(e.target.value);
            let realVal = sliderToVal(pct, key);
            if (SLIDER_CONFIG[key].type === 'cubic') {
                if (realVal > 1000) realVal = Math.round(realVal / 100) * 100;
                else realVal = Math.round(realVal);
            } else {
                realVal = Math.round(realVal * 100) / 100; 
                if (key === 'loanTerm') realVal = Math.round(realVal);
            }
            input.value = realVal; 
            formatInput(input); 
            updateSliderVisual(e.target);
            debouncedCalculate(); 
        });

        input.addEventListener('input', (e) => {
            formatInput(e.target);
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
            debouncedCalculate();
        });
        
        input.addEventListener('blur', (e) => {
            const currentVal = cleanNumber(e.target.value);
            slider.value = valToSlider(currentVal, key);
            updateSliderVisual(slider);
        });

        const addActive = () => slider.classList.add('active-slider');
        const removeActive = () => slider.classList.remove('active-slider');
        input.addEventListener('focus', addActive);
        input.addEventListener('blur', removeActive);
        slider.addEventListener('touchstart', addActive, { passive: true });
        slider.addEventListener('touchend', removeActive);
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
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    // --- THE ITERATIVE SOLVER (The "Smart Engine") ---
    const calculateMaximumHomePrice = (
        maxMonthlyPayment, downPayment, interestRate, loanTerm, 
        taxRate, insuranceRate, hoaFee, maintRate, loanType
    ) => {
        let low = downPayment;
        let high = 10000000; // $10M cap
        let price = downPayment;
        let attempts = 0;

        while (attempts < 30) { // Binary search for price
            price = (low + high) / 2;
            
            // Calculate Costs for this Price
            const baseLoanAmount = Math.max(0, price - downPayment);
            
            // --- LOAN TYPE SPECIFIC LOGIC ---
            let totalLoanAmount = baseLoanAmount;
            let upfrontFee = 0;
            let monthlyMIP = 0;

            if (loanType === 'fha') {
                upfrontFee = baseLoanAmount * 0.0175; // 1.75% UFMIP
                totalLoanAmount = baseLoanAmount + upfrontFee;
                monthlyMIP = (baseLoanAmount * 0.0055) / 12; // 0.55% Annual MIP
            } else if (loanType === 'va') {
                upfrontFee = baseLoanAmount * 0.0215; // 2.15% Funding Fee (Avg)
                totalLoanAmount = baseLoanAmount + upfrontFee;
                monthlyMIP = 0; // No monthly PMI for VA
            } else {
                // Conventional
                if ((baseLoanAmount / price) > 0.80) {
                    monthlyMIP = (baseLoanAmount * 0.005) / 12; // ~0.5% PMI
                }
            }

            const mortgagePI = calculatePAndI(totalLoanAmount, interestRate, loanTerm);
            const propTax = (price * (taxRate / 100)) / 12;
            const insurance = (price * (insuranceRate / 100)) / 12;
            const maint = (price * (maintRate / 100)) / 12;
            
            const totalMonthly = mortgagePI + propTax + insurance + hoaFee + monthlyMIP + maint;

            if (Math.abs(totalMonthly - maxMonthlyPayment) < 5) {
                break; // Close enough
            } else if (totalMonthly > maxMonthlyPayment) {
                high = price;
            } else {
                low = price;
            }
            attempts++;
        }
        return price;
    };

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
        const loanType = allInputs.loanType.value;

        const monthlyIncome = annualIncome / 12;
        if (monthlyIncome === 0) { updateDOM(null); return; }
        
        const maxFrontEndPayment = monthlyIncome * (maxFrontEndDTI / 100);
        const maxBackEndPayment = monthlyIncome * (maxBackEndDTI / 100);
        const availableForHousing = maxBackEndPayment - monthlyDebt;
        
        // The max payment user can afford PITI+HOA+Maint+MIP
        const totalAffordableMonthlyPayment = Math.max(0, Math.min(maxFrontEndPayment, availableForHousing));

        // Solve for Price
        const homePrice = calculateMaximumHomePrice(
            totalAffordableMonthlyPayment, downPayment, interestRate, loanTerm,
            propTaxPercent, insurancePercent, hoaMonthly, maintenancePercent, loanType
        );

        if (homePrice < downPayment) {
            updateDOM(null); // Can't afford anything above downpayment
            return;
        }

        // Re-calculate details for the found price to display breakdown
        const baseLoanAmount = Math.max(0, homePrice - downPayment);
        let totalLoanAmount = baseLoanAmount;
        let finalPMIMonthly = 0;

        if (loanType === 'fha') {
            totalLoanAmount = baseLoanAmount * 1.0175;
            finalPMIMonthly = (baseLoanAmount * 0.0055) / 12;
        } else if (loanType === 'va') {
            totalLoanAmount = baseLoanAmount * 1.0215;
            finalPMIMonthly = 0;
        } else {
            // Conventional
            if ((baseLoanAmount / homePrice) > 0.80) {
                finalPMIMonthly = (baseLoanAmount * 0.005) / 12; 
            }
        }

        const mortgagePI = calculatePAndI(totalLoanAmount, interestRate, loanTerm);
        const propTaxMonthly = (homePrice * (propTaxPercent / 100)) / 12;
        const insuranceMonthly = (homePrice * (insurancePercent / 100)) / 12;
        const maintenanceMonthly = (homePrice * (maintenancePercent / 100)) / 12;
        
        const totalMonthlyCost = mortgagePI + propTaxMonthly + insuranceMonthly + hoaMonthly + maintenanceMonthly + finalPMIMonthly;
        
        const closingCostsValue = homePrice * (closingCostsPercent / 100);
        const totalAtClosing = downPayment + closingCostsValue;

        const results = {
            homePrice, totalMonthlyCost, loanAmount: totalLoanAmount, totalAtClosing,
            downPayment, closingCostsValue, closingCostsPercent,
            frontDTI: (totalMonthlyCost / monthlyIncome) * 100,
            backDTI: ((totalMonthlyCost + monthlyDebt) / monthlyIncome) * 100,
            mortgagePI, 
            propTaxAnnual: propTaxMonthly * 12, 
            insuranceAnnual: insuranceMonthly * 12, 
            hoaAnnual: hoaMonthly * 12, 
            maintenanceAnnual: maintenanceMonthly * 12, 
            maintenancePercent,
            propTaxMonthly, insuranceMonthly, hoaMonthly, maintenanceMonthly, finalPMIMonthly
        };

        latestResults = results; 
        updateDOM(results);
        if (chartsInitialized) updateCharts(results);
    };

    const updateDOM = (results) => {
        if (!results) {
            // ... (Empty state logic same as before)
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
        
        resultElements.outMortgagePI.textContent = formatCurrency(results.mortgagePI);
        resultElements.outPMIMonthly.textContent = formatCurrency(results.finalPMIMonthly);
        resultElements.outPropertyTaxMonthly.textContent = formatCurrency(results.propTaxMonthly);
        resultElements.outInsuranceMonthly.textContent = formatCurrency(results.insuranceMonthly);
        resultElements.outHOAMonthly.textContent = formatCurrency(results.hoaMonthly);
        resultElements.outMaintenanceMonthly.textContent = formatCurrency(results.maintenanceMonthly);
        resultElements.outTotalMonthly.textContent = formatCurrency(results.totalMonthlyCost);
    };

    const debouncedCalculate = debounce(calculateAndDisplay, 50);
    window.addEventListener('resize', debounce(() => {}, 250));

    // --- DEEP LINKING ---
    const params = new URLSearchParams(window.location.search);
    if (params.has('inc')) {
        // ... (Existing deep link logic, add 'type' and 'score' if needed later)
    }

    // --- Initialize ---
    Object.keys(allInputs).forEach(key => {
        const input = allInputs[key];
        const slider = document.getElementById(`slider_${key}`);
        if(input && slider) {
            formatInput(input);
            slider.value = valToSlider(cleanNumber(input.value), key);
            updateSliderVisual(slider);
        }
    });
    
    // Initial Calc
    updateScenarioDefaults();

    // --- CUSTOM DROPDOWN LOGIC (NEW) ---
    function initializeCustomDropdowns() {
        const wrappers = document.querySelectorAll('.custom-dropdown-container');
        
        wrappers.forEach(wrapper => {
            const select = wrapper.querySelector('select');
            const trigger = wrapper.querySelector('.custom-dropdown-trigger');
            const menu = wrapper.querySelector('.custom-dropdown-menu');
            const options = wrapper.querySelectorAll('.dropdown-option');

            // Open/Close Trigger
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close others first
                document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                    if (m !== menu) m.classList.remove('active');
                });
                menu.classList.toggle('active');
            });

            // Option Select
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = option.getAttribute('data-value');
                    
                    // Update UI
                    trigger.textContent = option.textContent;
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    menu.classList.remove('active');

                    // Update Hidden Select & Trigger Change
                    select.value = value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                });
            });
        });

        // Close on Click Outside
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
                if (!menu.parentElement.contains(e.target)) {
                    menu.classList.remove('active');
                }
            });
        });
    }

    initializeCustomDropdowns(); // Run the logic

    // --- Reset Button ---
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset Dropdowns UI (Must manually reset custom triggers)
            allInputs.loanType.value = 'conventional';
            allInputs.creditScore.value = 'good';
            
            document.getElementById('loanTypeTrigger').textContent = 'Conventional Loan';
            document.getElementById('creditScoreTrigger').textContent = 'Good (700-759)';
            
            // ... (Rest of reset logic)
            Object.keys(allInputs).forEach(key => {
                const input = allInputs[key];
                if (input && input.tagName !== 'SELECT') {
                    input.value = input.defaultValue; 
                    formatInput(input);
                    const slider = document.getElementById(`slider_${key}`);
                    if (slider) {
                        slider.value = valToSlider(cleanNumber(input.value), key);
                        updateSliderVisual(slider);
                    }
                }
            });
            window.history.replaceState({}, document.title, window.location.pathname);
            updateScenarioDefaults();
        });
    }

    // --- PDF / PRINT MODAL LOGIC (Refactored for Multiple Menus) ---
    // Buttons
    const pdfBtn = document.getElementById('pdfBtn');
    const mobilePdfBtn = document.getElementById('mobilePdfBtn'); 
    const mobilePrintBtn = document.getElementById('mobilePrintBtn'); // New Button
    const desktopPrintBtn = document.getElementById('desktopPrintBtn');

    // Menus
    const pdfMenu = document.getElementById('pdfMenu');
    const printMenu = document.getElementById('printMenu');
    const mobileActionMenu = document.getElementById('mobileActionMenu');

    // Close Buttons
    const closePdfMenuBtn = document.getElementById('closePdfMenuBtn');
    const closePrintMenuBtn = document.getElementById('closePrintMenuBtn');
    const closeMobileActionMenuBtn = document.getElementById('closeMobileActionMenuBtn');

    // Proceed Buttons
    const proceedPdfBtn = document.getElementById('proceedPdfBtn');
    const proceedPrintBtn = document.getElementById('proceedPrintBtn');
    const proceedMobileActionBtn = document.getElementById('proceedMobileActionBtn');

    let pdfCountdown;
    let menuTutorialSeen = false; 

    function openInstructionMenu(menuElement, proceedButton) {
        // Reset and close any potentially open menus first (safety)
        closeAllMenus();
        
        menuElement.classList.add('active');
        document.getElementById('optionsOverlay').classList.add('active');
        
        if (menuTutorialSeen) {
            if(proceedButton) {
                proceedButton.textContent = 'Proceed';
                proceedButton.disabled = false;
                proceedButton.style.opacity = '1';
                proceedButton.style.cursor = 'pointer';
            }
        } else {
            startCountdown(proceedButton);
        }
    }

    function closeAllMenus() {
        if(pdfMenu) pdfMenu.classList.remove('active');
        if(printMenu) printMenu.classList.remove('active');
        if(mobileActionMenu) mobileActionMenu.classList.remove('active');
        document.getElementById('optionsOverlay').classList.remove('active');
        clearInterval(pdfCountdown);
    }

    function startCountdown(btn) {
        if (!btn) return;
        let count = 3;
        btn.disabled = true;
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
        btn.textContent = `Please Read Instructions (${count})`;
        
        clearInterval(pdfCountdown);
        pdfCountdown = setInterval(() => {
            count--;
            if (count > 0) {
                btn.textContent = `Please Read Instructions (${count})`;
            } else {
                clearInterval(pdfCountdown);
                btn.textContent = 'Proceed';
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
                menuTutorialSeen = true; 
            }
        }, 1000);
    }

// Event Listeners for Opening Menus
    if(pdfBtn) pdfBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openInstructionMenu(pdfMenu, proceedPdfBtn); 
    });
    
    // UPDATED: Mobile PDF now opens the specific PDF menu (3-step)
    if(mobilePdfBtn) mobilePdfBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openInstructionMenu(pdfMenu, proceedPdfBtn); 
    });

    // NEW: Mobile Print now opens the specific Print menu (5-step)
    if(mobilePrintBtn) mobilePrintBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openInstructionMenu(printMenu, proceedPrintBtn); 
    });
    
    if(desktopPrintBtn) desktopPrintBtn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        openInstructionMenu(printMenu, proceedPrintBtn); 
    }); 
    
    // Event Listeners for Closing
    if(closePdfMenuBtn) closePdfMenuBtn.addEventListener('click', closeAllMenus);
    if(closePrintMenuBtn) closePrintMenuBtn.addEventListener('click', closeAllMenus);
    if(closeMobileActionMenuBtn) closeMobileActionMenuBtn.addEventListener('click', closeAllMenus);

    // Event Listeners for Proceeding (Print)
    const triggerPrint = () => { window.print(); closeAllMenus(); };
    if(proceedPdfBtn) proceedPdfBtn.addEventListener('click', triggerPrint);
    if(proceedPrintBtn) proceedPrintBtn.addEventListener('click', triggerPrint);
    if(proceedMobileActionBtn) proceedMobileActionBtn.addEventListener('click', triggerPrint);


    // Share Menu Logic
    const shareBtn = document.getElementById('shareBtn');
    const shareMenu = document.getElementById('shareMenu');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const emailShareBtn = document.getElementById('emailShareBtn');

    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (navigator.share) {
                try { await navigator.share({ title: 'My Home Affordability', url: window.location.href }); } catch (err) {}
            } else {
                if (shareMenu) shareMenu.classList.toggle('active');
            }
        });
    }
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                copyLinkBtn.textContent = 'Copied!';
                setTimeout(() => copyLinkBtn.textContent = 'Copy Link', 2000);
            });
        });
    }
    if (emailShareBtn) {
        emailShareBtn.addEventListener('click', () => {
            window.location.href = `mailto:?subject=Affordability&body=${window.location.href}`;
        });
    }
    
    // Close Logic (General)
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const optionsMenu = document.getElementById('optionsMenu');
    const optionsOverlay = document.getElementById('optionsOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    function toggleMenu() { optionsMenu.classList.toggle('active'); optionsOverlay.classList.toggle('active'); }
    function closeMenu() { optionsMenu.classList.remove('active'); optionsOverlay.classList.remove('active'); }

    if(moreOptionsBtn) moreOptionsBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if(optionsOverlay) optionsOverlay.addEventListener('click', () => { closeMenu(); closeAllMenus(); });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeMenu(); closeAllMenus(); }
    });
    
    document.addEventListener('click', (e) => {
        if (shareMenu && shareMenu.classList.contains('active') && !shareMenu.contains(e.target) && e.target !== shareBtn) {
            shareMenu.classList.remove('active');
        }
    });
// --- LOOPING TAGLINE LOGIC (RESTORED) ---
    const taglineElement = document.getElementById('looping-text');
    if (taglineElement) {
        // You can add your own phrases here!
        const taglines = [
            "Find your place in the world.",
            "Know your true buying power.",
            "Plan your future with confidence.",
            "Smart tools for smart decisions."
        ];
        
        let tagIndex = 0;
        
        const animateTagline = () => {
            // 1. Reset: Remove class to stop current animation
            taglineElement.classList.remove('fade-in-out');
            
            // 2. Update Text
            taglineElement.textContent = taglines[tagIndex];
            
            // 3. Trigger Reflow (Crucial: forces browser to acknowledge the reset)
            void taglineElement.offsetWidth; 
            
            // 4. Start Animation (CSS handles the fade in/out)
            taglineElement.classList.add('fade-in-out');
            
            // 5. Increment Index for next loop
            tagIndex = (tagIndex + 1) % taglines.length;
        };

        // Start immediately
        animateTagline();
        
        // Loop every 6 seconds (Matches your 5.5s CSS animation + buffer)
        setInterval(animateTagline, 6000);
    }
});
