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

    // --- 0. LAZY LOAD ADS ---
    let adsLoaded = false;
    const loadAds = () => {
        if (adsLoaded) return;
        adsLoaded = true;
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8198600734476793';
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.body.appendChild(script);
    };

    const userInteractionEvents = ['scroll', 'mousemove', 'touchstart', 'keydown'];
    userInteractionEvents.forEach(event => {
        window.addEventListener(event, loadAds, { once: true, passive: true });
    });

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
    let cachedTooltipWidth = 0;
    let cachedTooltipHeight = 0;

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
             // removed synchronous offsetWidth read here to stop reflow
        }

        tooltipEl.style.opacity = 1;

        if (tooltipRequest) cancelAnimationFrame(tooltipRequest);

        tooltipRequest = requestAnimationFrame(() => {
            // Read dimensions inside the animation frame (Render Phase)
            const currentWidth = tooltipEl.offsetWidth;
            const currentHeight = tooltipEl.offsetHeight;
            
            const { clientX, clientY } = event; 
            const margin = 15;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            
            let finalX = clientX + margin;
            let finalY = clientY + margin;

            if (finalY + currentHeight > winHeight) {
                finalY = clientY - currentHeight - margin;
            }
            if (finalX + currentWidth > winWidth) {
                 finalX = clientX - currentWidth - margin;
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

    const formatInput = (input) => {
        let value = input.value.replace(/[^0-9.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
        
        const isPercentage = ['maxFrontEndDTI', 'maxBackEndDTI', 'interestRate', 'closingCosts', 'propertyTax', 'insurance', 'maintenance'].includes(input.id);
        const isYear = input.id === 'loanTerm';

        if ((isPercentage || isYear) && parseFloat(value) > 100) value = '100';
        else if (!isPercentage && !isYear && parts[0].length > 9) {
            parts[0] = parts[0].substring(0, 9);
            value = parts.length > 1 ? parts[0] + '.' + parts[1] : parts[0];
        }

        if (parts.length > 1) value = parts[0] + '.' + parts[1].substring(0, 2);
        
        if (value === '') {
            input.value = '';
            return;
        }

        let integerPart = value.split('.')[0];
        let decimalPart = value.includes('.') ? '.' + value.split('.')[1] : '';
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        input.value = integerPart + decimalPart;
    };
    
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

    Object.values(allInputs).forEach(input => {
        if (!input) return;
        formatInput(input);
        input.addEventListener('blur', (e) => {
            formatInput(e.target);
        });
        input.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9.]/g, '');
            if (val !== e.target.value) e.target.value = val;
            debouncedCalculate();
        });
    });

    window.addEventListener('resize', debounce(() => {
        // Chart.js handles resize
    }, 250));
    
    setTimeout(calculateAndDisplay, 0);

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
