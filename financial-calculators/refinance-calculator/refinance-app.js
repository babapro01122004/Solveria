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

        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;
        const margin = 15;
        let finalX = pageX + margin;
        let finalY = pageY + margin;

        if (finalX + tooltipWidth + margin > window.innerWidth) {
            finalX = pageX - tooltipWidth - margin;
        }
        if (finalY + tooltipHeight + margin > window.innerHeight) {
            finalY = pageY - tooltipHeight - margin;
        }
        
        tooltipEl.style.left = `${finalX}px`;
        tooltipEl.style.top = `${finalY}px`;
        
        return true;
    };

    const initializeCharts = () => {
        const balanceCtx = document.getElementById('loanBalanceChart')?.getContext('2d');
        const interestCtx = document.getElementById('interestComparisonChart')?.getContext('2d');
        if (!balanceCtx || !interestCtx) return;

        if (loanBalanceChart) loanBalanceChart.destroy();
        if (interestComparisonChart) interestComparisonChart.destroy();

        const lineChartOptions = {
            responsive: true, maintainAspectRatio: true,
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
                responsive: true, maintainAspectRatio: true,
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
        if (!loanBalanceChart || !interestComparisonChart) return;
        
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
        input.addEventListener('input', debouncedCalculate);
    });

    const handleResize = debounce(() => {
        initializeCharts();
        calculateAndDisplay();
    }, 250);

    window.addEventListener('resize', handleResize);
    
    initializeCharts();
    calculateAndDisplay();


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
        taglineElement.style.opacity = '1';
        
        setTimeout(() => {
            taglineElement.style.opacity = '0';
            setTimeout(() => {
                taglineIndex = (taglineIndex + 1) % taglines.length;
                cycleTaglines();
            }, 1500); 
        }, 4000);
    }
    cycleTaglines();
    

    const scrollTaglines = [
        "Scroll to calculate",
        "Your savings analysis is below",
        "Find your break-even point"
    ];
    let scrollTaglineIndex = 0;
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollTaglineElement = document.getElementById('scroll-looping-text');
    const scrollArrow = scrollIndicator ? scrollIndicator.querySelector('img') : null;

    const scrollTaglineWidths = [];
    if (scrollTaglineElement) {
        const tempP = document.createElement('p');
        tempP.style.cssText = `font-size: 1rem; font-weight: 300; white-space: nowrap; position: absolute; top: -9999px; left: -9999px;`;
        document.body.appendChild(tempP);
        scrollTaglines.forEach(text => {
            tempP.textContent = text;
            scrollTaglineWidths.push(tempP.offsetWidth);
        });
        document.body.removeChild(tempP);
    }

    function runNextScrollCycle() {
        if (!scrollTaglineElement || !scrollIndicator || !scrollArrow) return;
        
        scrollTaglineIndex = (scrollTaglineIndex + 1) % scrollTaglines.length;
        scrollTaglineElement.textContent = scrollTaglines[scrollTaglineIndex];

        setTimeout(() => {
            const arrowWidth = scrollArrow.offsetWidth;
            const gap = 15;
            const currentTextWidth = scrollTaglineWidths[scrollTaglineIndex];
            const totalWidth = arrowWidth + gap + currentTextWidth;
            const newLeft = (window.innerWidth - totalWidth) / 2;
            
            scrollIndicator.style.left = newLeft + 'px';

            setTimeout(() => {
                scrollTaglineElement.style.opacity = '1';
                
                setTimeout(() => {
                    scrollTaglineElement.style.opacity = '0';
                    
                    setTimeout(runNextScrollCycle, 1500);
                }, 4000);
            }, 500); 
        }, 10); 
    }

    function initialScrollAnimation() {
        if (!scrollIndicator || !scrollTaglineElement || !scrollArrow) return;
        
        scrollTaglineElement.style.opacity = '0';
        scrollTaglineElement.textContent = scrollTaglines[0];
        
        const arrowWidth = scrollArrow.offsetWidth;
        if (arrowWidth === 0) { 
            setTimeout(initialScrollAnimation, 50);
            return;
        }
        
        const initialLeft = (window.innerWidth - arrowWidth) / 2;
        scrollIndicator.style.transition = 'none'; 
        scrollIndicator.style.left = initialLeft + 'px';

        setTimeout(() => {
            const gap = 15;
            const firstTextWidth = scrollTaglineWidths[0];
            const totalWidth = arrowWidth + gap + firstTextWidth;
            const newLeft = (window.innerWidth - totalWidth) / 2;
            
            scrollIndicator.style.transition = 'left 0.5s ease-in-out'; 
            scrollIndicator.style.left = newLeft + 'px';

            setTimeout(() => {
                scrollTaglineElement.style.opacity = '1';
                
                setTimeout(() => {
                    scrollTaglineElement.style.opacity = '0';
                    
                    setTimeout(runNextScrollCycle, 1500);
                }, 4000);
            }, 500);
        }, 100);
    }
    
    // Only run scroll animation if it's likely a desktop (basic check)
    if (window.innerWidth > 992) {
       initialScrollAnimation();
    }
     // Re-check on resize, debounced
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 992) {
            initialScrollAnimation(); // Re-initialize if resizing to desktop
        } else {
             // If resizing to mobile, ensure text is hidden and arrow is centered
             if(scrollTaglineElement) scrollTaglineElement.style.opacity = '0';
             if(scrollIndicator && scrollArrow) {
                scrollIndicator.style.transition = 'none'; 
                scrollIndicator.style.left = '50%';
                scrollIndicator.style.transform = 'translateX(-50%)';
             }
        }
    }, 250));
});
