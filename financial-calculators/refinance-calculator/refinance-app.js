document.addEventListener('DOMContentLoaded', () => {

    // --- FIX 2: LAZY-LOAD CHART.JS ---
    // We will load Chart.js only when the charts are about to be seen.
    let chartJsLoaded = false;
    let chartsInitialized = false;

    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the chart container is intersecting (i.e., near the viewport)
            if (entry.isIntersecting) {
                // Load the script if it hasn't been loaded yet
                if (!chartJsLoaded) {
                    chartJsLoaded = true; // Mark as loading
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = () => {
                        // Once loaded, initialize the charts
                        initializeCharts();
                        // And run the calculation to populate them
                        calculateAndDisplay(); 
                    };
                    document.body.appendChild(script);
                }
                // If script is already loaded, just ensure charts are initialized
                else if (!chartsInitialized) {
                     initializeCharts();
                     calculateAndDisplay(); 
                }
                
                // Stop observing once we've started loading
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' }); // Load 50px *before* it enters the viewport

    // Find the chart container to observe
    const chartContainer = document.getElementById('charts-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
    // --- END OF FIX 2 ---


    let loanBalanceChart, interestComparisonChart;

    const allInputs = {
        currentBalance: document.getElementById('currentBalance'),
        currentInterestRate: document.getElementById('currentInterestRate'),
        currentTerm: document.getElementById('currentTerm'),
        newInterestRate: document.getElementById('newInterestRate'),
        newTerm: document.getElementById('newTerm'),
        closingCosts: document.getElementById('closingCosts'),
        cashOut: document.getElementById('cashOut'),
        rollCosts: document.getElementById('rollCosts')
    };

    const resultElements = {
        newPayment: document.getElementById('resultNewPayment'),
        monthlySavings: document.getElementById('resultMonthlySavings'),
        breakeven: document.getElementById('resultBreakeven'),
        lifetimeSavings: document.getElementById('resultLifetimeSavings'),
        summaryText: document.getElementById('resultSummaryText'),
        breakevenText: document.getElementById('breakevenText'),
        currentMonthlyPayment: document.getElementById('currentMonthlyPayment'),
        newMonthlyPayment: document.getElementById('newMonthlyPayment'),
        monthlySavingsValue: document.getElementById('monthlySavingsValue'),
        currentTotalInterest: document.getElementById('currentTotalInterest'),
        newTotalInterest: document.getElementById('newTotalInterest'),
        lifetimeSavingsValue: document.getElementById('lifetimeSavingsValue')
    };

    const formatCurrency = (value) => {
        if (isNaN(value)) return '$0.00';
        const absValue = Math.abs(value);
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(absValue);
        return value < 0 ? `-${formatted}` : formatted;
    };
    
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const customTooltipHandler = (event, chart) => {
        const tooltipEl = document.getElementById('chartTooltip');
        if (!tooltipEl) return false;

        const { pageX, pageY } = event;
        const elements = chart.getElementsAtEventForMode(event, 'index', { intersect: false }, true);

        if (elements.length === 0) {
            if (event.type === 'mouseout') {
                tooltipEl.style.opacity = 0;
            }
            return false;
        }

        const data = chart.data;
        let innerHtml = '';

        if (chart.canvas.id === 'loanBalanceChart') {
            const title = data.labels[elements[0].index] || '';
            if (title) {
                innerHtml += `<div class="tooltip-title">Year: ${title}</div>`;
            }
            elements.forEach(point => {
                const { datasetIndex, index } = point;
                const dataset = data.datasets[datasetIndex];
                const label = dataset.label;
                const value = dataset.data[index].y; 
                const color = dataset.borderColor;
                innerHtml += `
                    <div class="tooltip-body-item">
                        <div style="display: flex; align-items: center;">
                            <span class="tooltip-color-box" style="background-color: ${color}"></span>
                            <span>${label}:</span>
                        </div>
                        <span>${formatCurrency(value)}</span>
                    </div>
                `;
            });
        } else if (chart.canvas.id === 'interestComparisonChart') {
            const element = elements[0];
            const { datasetIndex, index } = element;
            const dataset = data.datasets[datasetIndex];
            const title = data.labels[index];
            const value = dataset.data[index];
            const color = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[index] : dataset.backgroundColor;
            
            innerHtml += `<div class="tooltip-title">${title}</div>`;
            innerHtml += `
                <div class="tooltip-body-item">
                    <div style="display: flex; align-items: center;">
                        <span class="tooltip-color-box" style="background-color: ${color}"></span>
                        <span>Total Interest:</span>
                    </div>
                    <span>${formatCurrency(value)}</span>
                </div>
            `;
        }
        
        tooltipEl.innerHTML = innerHtml;
        tooltipEl.style.opacity = 1;

        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;
        const margin = 15;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        let finalX;
        let finalY;

        finalY = pageY + margin;
        if (finalY + tooltipHeight + margin > winHeight) {
            finalY = pageY - tooltipHeight - margin;
            if (finalY < margin) {
                finalY = margin;
            }
        }

        const spaceRight = winWidth - pageX;
        const spaceLeft = pageX;
        const neededRight = tooltipWidth + margin;
        const neededLeft = tooltipWidth + margin;

        if (spaceRight > neededRight) {
            finalX = pageX + margin;
        } 
        else if (spaceLeft > neededLeft) {
            finalX = pageX - tooltipWidth - margin;
        } 
        else {
            finalX = (winWidth - tooltipWidth) / 2;
        }

        if (finalX < margin) {
            finalX = margin;
        }
        if (finalX + tooltipWidth + margin > winWidth) {
            finalX = winWidth - tooltipWidth - margin;
        }
        
        tooltipEl.style.left = `${finalX}px`;
        tooltipEl.style.top = `${finalY}px`;
        
        return true;
    };

    const initializeCharts = () => {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js is not loaded yet.');
            return;
        }

        // Mark that we've run this function
        chartsInitialized = true; 

        const balanceCtx = document.getElementById('loanBalanceChart')?.getContext('2d'); 
        const interestCtx = document.getElementById('interestComparisonChart')?.getContext('2d');
        
        if (!balanceCtx || !interestCtx) {
            console.error("Chart canvas context not found!"); 
            return;
        }

        if (loanBalanceChart) loanBalanceChart.destroy();
        if (interestComparisonChart) interestComparisonChart.destroy();

        const lineChartOptions = {
            responsive: true, 
            maintainAspectRatio: false,
            scales: { y: { ticks: { callback: value => '$' + (value / 1000) + 'k' } } },
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            interaction: { mode: 'index', intersect: false }
        };

        loanBalanceChart = new Chart(balanceCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Current Loan Balance', data: [], borderColor: '#d3b892', fill: false, tension: 0.4, pointRadius: 0 },
                    { label: 'New Loan Balance', data: [], borderColor: '#8c5a3c', fill: false, tension: 0.4, pointRadius: 0 },
                ]
            },
            options: lineChartOptions
        });

        interestComparisonChart = new Chart(interestCtx, {
            type: 'bar',
            data: {
                labels: ['Current Loan', 'New Loan'],
                datasets: [{
                    label: 'Total Interest',
                    data: [0, 0],
                    backgroundColor: ['#d3b892', '#8c5a3c'],
                    borderColor: ['#c8a87e', '#805234'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } }, 
                scales: { y: { ticks: { callback: value => '$' + (value / 1000) + 'k' } } }
            }
        });

        const charts = [loanBalanceChart, interestComparisonChart];
        charts.forEach(chart => {
            chart.canvas.addEventListener('mousemove', (e) => customTooltipHandler(e, chart));
            chart.canvas.addEventListener('mouseout', () => {
                const tooltipEl = document.getElementById('chartTooltip');
                if (tooltipEl) tooltipEl.style.opacity = 0;
            });
        });
    };

    const calculatePAndI = (principal, annualRate, termYears) => {
        if (principal <= 0 || annualRate <= 0 || termYears <= 0) return 0;
        const monthlyRate = annualRate / 100 / 12;
        const numPayments = termYears * 12;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    const calculateTotalInterest = (principal, monthlyPayment, termYears) => {
        if (principal <= 0 || monthlyPayment <= 0 || termYears <= 0) return 0;
        const totalPaid = monthlyPayment * termYears * 12;
        return totalPaid > principal ? totalPaid - principal : 0;
    };

    const generateAmortizationSchedule = (principal, monthlyPayment, monthlyRate, numPayments) => {
        let balance = principal;
        const schedule = [{ x: 0, y: balance }];
        if (principal <= 0 || monthlyPayment <= 0) return schedule;

        for (let i = 1; i <= numPayments; i++) {
            const interestPayment = balance * monthlyRate;
            balance -= (monthlyPayment - interestPayment);
            if (i % 12 === 0 || i === numPayments) {
                schedule.push({ x: i / 12, y: balance > 0 ? balance : 0 });
            }
        }
        return schedule;
    };
    
    const calculateAndDisplay = () => {
        const currentBalance = parseFloat(allInputs.currentBalance.value) || 0;
        const currentInterestRate = parseFloat(allInputs.currentInterestRate.value) || 0;
        const currentTerm = parseFloat(allInputs.currentTerm.value) || 0;
        const newInterestRate = parseFloat(allInputs.newInterestRate.value) || 0;
        const newTerm = parseFloat(allInputs.newTerm.value) || 0;
        const closingCosts = parseFloat(allInputs.closingCosts.value) || 0;
        const cashOut = parseFloat(allInputs.cashOut.value) || 0;
        const rollCosts = allInputs.rollCosts.checked;

        const currentMonthlyPayment = calculatePAndI(currentBalance, currentInterestRate, currentTerm);
        const currentTotalInterest = calculateTotalInterest(currentBalance, currentMonthlyPayment, currentTerm);

        const newLoanPrincipal = rollCosts ? (currentBalance + cashOut + closingCosts) : (currentBalance + cashOut);
        const newMonthlyPayment = calculatePAndI(newLoanPrincipal, newInterestRate, newTerm);
        const newTotalInterest = calculateTotalInterest(newLoanPrincipal, newMonthlyPayment, newTerm);

        const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
        const lifetimeSavings = currentTotalInterest - newTotalInterest - (rollCosts ? 0 : closingCosts);
        
        let breakevenMonths = '--';
        if (monthlySavings > 0 && closingCosts > 0) {
            const months = Math.ceil(closingCosts / monthlySavings);
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            breakevenMonths = years > 0 ? `${years} yr, ${remainingMonths} mo` : `${months} mo`;
        } else if (closingCosts <= 0) {
            breakevenMonths = 'N/A';
        }

        resultElements.newPayment.textContent = formatCurrency(newMonthlyPayment);
        resultElements.monthlySavings.textContent = formatCurrency(monthlySavings);
        resultElements.breakeven.textContent = breakevenMonths;
        resultElements.lifetimeSavings.textContent = formatCurrency(lifetimeSavings);
        resultElements.lifetimeSavings.style.color = lifetimeSavings >= 0 ? '#2e7d32' : '#c62828';
        resultElements.monthlySavings.style.color = monthlySavings >= 0 ? '#2e7d32' : '#c62828';
        
        resultElements.summaryText.innerHTML = `Refinancing could <strong class="summary-highlight">${monthlySavings >= 0 ? 'save you' : 'cost you'} ${formatCurrency(Math.abs(monthlySavings))} per month</strong>. Your new estimated payment will be <strong class="summary-highlight">${formatCurrency(newMonthlyPayment)}</strong>.`;
        
        if (breakevenMonths !== '--' && breakevenMonths !== 'N/A') {
            resultElements.breakevenText.innerHTML = `It will take approximately <strong class="summary-highlight">${breakevenMonths}</strong> to recoup your <strong class="summary-highlight">${formatCurrency(closingCosts)} in closing costs</strong>. After this point, your monthly savings are realized.`;
        } else if (monthlySavings <= 0 && closingCosts > 0) {
             resultElements.breakevenText.innerHTML = `With a higher monthly payment, there is no break-even point on closing costs through monthly savings. The decision to refinance would depend on other goals like paying off the loan faster or cashing out equity.`;
        } else {
             resultElements.breakevenText.innerHTML = `With no closing costs, your savings begin immediately with your first new payment.`;
        }

        resultElements.currentMonthlyPayment.textContent = formatCurrency(currentMonthlyPayment);
        resultElements.newMonthlyPayment.textContent = formatCurrency(newMonthlyPayment); 
        resultElements.monthlySavingsValue.textContent = formatCurrency(monthlySavings);
        resultElements.monthlySavingsValue.style.color = monthlySavings >= 0 ? '#2e7d32' : '#c62828';
        
        resultElements.currentTotalInterest.textContent = formatCurrency(currentTotalInterest);
        resultElements.newTotalInterest.textContent = formatCurrency(newTotalInterest);
        resultElements.lifetimeSavingsValue.textContent = formatCurrency(lifetimeSavings);
        resultElements.lifetimeSavingsValue.style.color = lifetimeSavings >= 0 ? '#2e7d32' : '#c62828';

        // Only update charts if they are already initialized
        if (chartsInitialized) {
            updateCharts(currentBalance, currentMonthlyPayment, currentInterestRate, currentTerm, newLoanPrincipal, newMonthlyPayment, newInterestRate, newTerm, currentTotalInterest, newTotalInterest);
        }
    };
    
    const updateCharts = (currBal, currPmt, currRate, currTerm, newBal, newPmt, newRate, newTerm, currInt, newInt) => {
        // This check is now critical
        if (!loanBalanceChart || !interestComparisonChart || !chartsInitialized) {
            return; 
        }
        
        const maxTerm = Math.max(currTerm, newTerm);
        const labels = Array.from({ length: Math.ceil(maxTerm) + 1 }, (_, i) => i);
        
        const currentSchedule = generateAmortizationSchedule(currBal, currPmt, currRate / 100 / 12, currTerm * 12);
        const newSchedule = generateAmortizationSchedule(newBal, newPmt, newRate / 100 / 12, newTerm * 12);

        loanBalanceChart.data.labels = labels;
        loanBalanceChart.data.datasets[0].data = currentSchedule;
        loanBalanceChart.data.datasets[1].data = newSchedule;
        loanBalanceChart.update();
        updateCustomLegend('loanBalanceLegend', loanBalanceChart);

        interestComparisonChart.data.datasets[0].data = [currInt, newInt];
        interestComparisonChart.update();
    };

    const updateCustomLegend = (containerId, chart) => {
        const legendContainer = document.getElementById(containerId);
        if(!legendContainer) return;
        legendContainer.innerHTML = '';
        chart.data.datasets.forEach(dataset => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${dataset.borderColor}"></div><span>${dataset.label}</span>`;
            legendContainer.appendChild(legendItem);
        });
    };

    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    Object.values(allInputs).forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('input', debouncedCalculate);
        } else {
            // --- START: Root Cause Fix ---
            // Change type to 'text' to prevent browser's 'number' validation
            // from interfering with our custom sanitization.
            // .value will now report exactly what's typed (e.g., "250+").
            input.type = 'text';
            // Show numeric/decimal keyboard on mobile devices.
            input.inputMode = 'decimal';
            // --- END: Root Cause Fix ---
            
            input.addEventListener('input', (e) => {
                const target = e.target;
                
                // --- START: Input Sanitization ---
                let originalValue = target.value;
                let cursorPosition = target.selectionStart;
                
                // 1. Store the part of the string before the cursor
                const originalBeforeCursor = originalValue.substring(0, cursorPosition);
                
                // 2. Remove any characters that are not digits or a decimal point
                let sanitizedValue = originalValue.replace(/[^0-9.]/g, '');
                
                // 3. Ensure only one decimal point exists
                const parts = sanitizedValue.split('.');
                if (parts.length > 2) {
                    sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
                }

                // 4. If the value was changed, restore the cursor position
                if (originalValue !== sanitizedValue) {
                    // Sanitize the part of the string that was *before* the cursor
                    let sanitizedBeforeCursor = originalBeforeCursor.replace(/[^0-9.]/g, '');
                    const partsBefore = sanitizedBeforeCursor.split('.');
                    if (partsBefore.length > 2) {
                        sanitizedBeforeCursor = partsBefore[0] + '.' + partsBefore.slice(1).join('');
                    }

                    // The new cursor position is simply the length of the sanitized "before" string
                    const newCursorPos = sanitizedBeforeCursor.length;

                    target.value = sanitizedValue;
                    target.setSelectionRange(newCursorPos, newCursorPos);
                }
                // --- END: Input Sanitization ---
                
                const max = parseFloat(target.getAttribute('max'));
                const min = parseFloat(target.getAttribute('min'));
                
                // 5. Use the newly sanitized value for parsing and validation
                let value = parseFloat(sanitizedValue); // Use sanitizedValue here

                if (!isNaN(value)) {
                    if (!isNaN(max) && value > max) {
                        target.value = max;
                    }
                    if (!isNaN(min) && value < min) {
                        target.value = min;
                    }
                }
                debouncedCalculate();
            });
        }
    });

    const handleResize = debounce(() => {
        // Only re-initialize charts if they are already loaded
        if (chartsInitialized) {
            initializeCharts();
            calculateAndDisplay();
        }
    }, 250);

    window.addEventListener('resize', handleResize);
    
    // Do NOT initialize charts here anymore.
    // initializeCharts(); 

    // Run the first calculation immediately.
    // This populates the summary boxes.
    setTimeout(calculateAndDisplay, 50);


    // Tagline animation logic (no changes)
    const taglines = [
        "Unlock your potential savings.",
        "Clarity for your biggest asset.",
        "Your path to a lower payment."
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
            // This typo was in your last file, fixing it.
            setTimeout(cycleTaglines, 50); 
        });
        cycleTaglines();
    }
    
});
