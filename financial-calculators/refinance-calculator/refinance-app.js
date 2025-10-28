document.addEventListener('DOMContentLoaded', () => {

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

        // --- START: MODIFIED TOOLTIP LOGIC ---
        // This block replaces the original placement logic with the new "smart" logic.

        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;
        const margin = 15;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        let finalX;
        let finalY;

        // Y-Position (Vertical)
        // Try placing below cursor first
        finalY = pageY + margin;
        // If it goes off-screen bottom, flip it above
        if (finalY + tooltipHeight + margin > winHeight) {
            finalY = pageY - tooltipHeight - margin;
            // Handle edge case where it also goes off-screen top (e.g., tall tooltip on short screen)
            if (finalY < margin) {
                finalY = margin;
            }
        }

        // X-Position (Horizontal)
        const spaceRight = winWidth - pageX;
        const spaceLeft = pageX;
        const neededRight = tooltipWidth + margin;
        const neededLeft = tooltipWidth + margin;

        // 1. Try Right (Default)
        if (spaceRight > neededRight) {
            finalX = pageX + margin;
        } 
        // 2. Try Left
        else if (spaceLeft > neededLeft) {
            finalX = pageX - tooltipWidth - margin;
        } 
        // 3. Middle (Fallback, if both left and right fail)
        else {
            finalX = (winWidth - tooltipWidth) / 2;
        }

        // Final safety net to prevent going off-left
        if (finalX < margin) {
            finalX = margin;
        }
        // Final safety net to prevent going off-right (if centered)
        if (finalX + tooltipWidth + margin > winWidth) {
            finalX = winWidth - tooltipWidth - margin;
        }
        
        tooltipEl.style.left = `${finalX}px`;
        tooltipEl.style.top = `${finalY}px`;

        // --- END: MODIFIED TOOLTIP LOGIC ---
        
        return true;
    };

    const initializeCharts = () => {
        // Correct context ('2d')
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
            maintainAspectRatio: false, // <-- This was the change from 2 turns ago
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
                maintainAspectRatio: false, // <-- This was the change from 2 turns ago
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
        
        resultElements.summaryText.innerHTML = `Refinancing could <span class="summary-highlight">${monthlySavings >= 0 ? 'save you' : 'cost you'} ${formatCurrency(Math.abs(monthlySavings))} per month</span>. Your new estimated payment will be <span class="summary-highlight">${formatCurrency(newMonthlyPayment)}</span>.`;
        
        if (breakevenMonths !== '--' && breakevenMonths !== 'N/A') {
            resultElements.breakevenText.innerHTML = `It will take approximately <span class="summary-highlight">${breakevenMonths}</span> to recoup your <span class="summary-highlight">${formatCurrency(closingCosts)} in closing costs</span>. After this point, your monthly savings are realized.`;
        } else if (monthlySavings <= 0 && closingCosts > 0) {
             resultElements.breakevenText.innerHTML = `With a higher monthly payment, there is no break-even point on closing costs through monthly savings. The decision to refinance would depend on other goals like paying off the loan faster or cashing out equity.`;
        } else {
             resultElements.breakevenText.innerHTML = `With no closing costs, your savings begin immediately with your first new payment.`;
        }

        resultElements.currentMonthlyPayment.textContent = formatCurrency(currentMonthlyPayment);
        
        /* FIX 2: Corrected typo 'formatBmrrency' to 'formatCurrency'.
          This was breaking the JS and preventing the charts from loading.
        */
        resultElements.newMonthlyPayment.textContent = formatCurrency(newMonthlyPayment); 
        
        resultElements.monthlySavingsValue.textContent = formatCurrency(monthlySavings);
        resultElements.monthlySavingsValue.style.color = monthlySavings >= 0 ? '#2e7d32' : '#c62828';
        
        resultElements.currentTotalInterest.textContent = formatCurrency(currentTotalInterest);
        resultElements.newTotalInterest.textContent = formatCurrency(newTotalInterest);
        resultElements.lifetimeSavingsValue.textContent = formatCurrency(lifetimeSavings);
        resultElements.lifetimeSavingsValue.style.color = lifetimeSavings >= 0 ? '#2e7d32' : '#c62828';

        updateCharts(currentBalance, currentMonthlyPayment, currentInterestRate, currentTerm, newLoanPrincipal, newMonthlyPayment, newInterestRate, newTerm, currentTotalInterest, newTotalInterest);
    };
    
    const updateCharts = (currBal, currPmt, currRate, currTerm, newBal, newPmt, newRate, newTerm, currInt, newInt) => {
        if (!loanBalanceChart || !interestComparisonChart) {
            console.warn("Attempted to update charts before initialization.");
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

    // --- START: MODIFIED EVENT LISTENERS ---
    // This new loop adds capping logic to number inputs
    Object.values(allInputs).forEach(input => {
        if (input.type === 'checkbox') {
            // Checkbox just needs the calculate listener
            input.addEventListener('input', debouncedCalculate);
        } else {
            // All other inputs (number, text) get clamping logic
            input.addEventListener('input', (e) => {
                const target = e.target;
                // Read the min/max attributes from the HTML
                const max = parseFloat(target.getAttribute('max'));
                const min = parseFloat(target.getAttribute('min'));
                
                // Parse the current value
                let value = parseFloat(target.value);

                // Check if the parsed value is a valid number
                if (!isNaN(value)) {
                    // Enforce the max cap
                    if (!isNaN(max) && value > max) {
                        target.value = max;
                    }
                    // Enforce the min floor
                    if (!isNaN(min) && value < min) {
                        target.value = min;
                    }
                }

                // Call the debounced calculation regardless
                debouncedCalculate();
            });
        }
    });
    // --- END: MODIFIED EVENT LISTENERS ---

    // --- **** THIS IS THE CORRECTED LINE **** ---
    const handleResize = debounce(() => {
        initializeCharts();
        calculateAndDisplay();
    }, 250);

    window.addEventListener('resize', handleResize);
    
    initializeCharts();

    setTimeout(calculateAndDisplay, 50);


    // --- START: FIX 8 - CSS-BASED TAGLINE ANIMATION ---
    // Replaced the old setTimeout loop with a more performant
    // CSS animation coordinator.
    const taglines = [
        "Unlock your potential savings.",
        "Clarity for your biggest asset.",
        "Your path to a lower payment."
    ];
    let taglineIndex = 0;
    const taglineElement = document.getElementById('looping-text');

    function cycleTaglines() {
        if (!taglineElement) return;
        
        // Set text content
        taglineElement.textContent = taglines[taglineIndex];
        
        // Add class to trigger CSS animation
        taglineElement.classList.add('fade-in-out');
        
        // Increment index for the next cycle
        taglineIndex = (taglineIndex + 1) % taglines.length;
    }
    
    if (taglineElement) {
        // Listen for when the CSS animation finishes
        taglineElement.addEventListener('animationend', () => {
            // Remove class to reset for the next animation
            taglineElement.classList.remove('fade-in-out');
            
            // Call the next cycle after a tiny delay
            setTimeout(cycleGgclines, 50); 
        });
        
        // Start the very first cycle
        cycleTaglines();
    }
    // --- END: FIX 8 ---
    
    /* Removed old scroll indicator code */
});
