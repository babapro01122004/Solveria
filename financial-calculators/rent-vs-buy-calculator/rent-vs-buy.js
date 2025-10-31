document.addEventListener('DOMContentLoaded', () => {

    // --- FIX 2: LAZY-LOAD CHART.JS ---
    // (This is the full IntersectionObserver code)
    let chartJsLoaded = false;
    let chartsInitialized = false;

    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!chartJsLoaded) {
                    chartJsLoaded = true; 
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = () => {
                        initializeCharts();
                        calculateAndDisplay(); 
                    };
                    document.body.appendChild(script);
                }
                else if (!chartsInitialized) {
                     initializeCharts();
                     calculateAndDisplay(); 
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '50px' }); 

    const chartContainer = document.getElementById('charts-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
    // --- END OF FIX 2 ---


    let costOverTimeChart, netWorthChart;

    // 1. GATHER ALL INPUTS
    const allInputs = {
        homePrice: document.getElementById('homePrice'),
        downPayment: document.getElementById('downPayment'),
        interestRate: document.getElementById('interestRate'),
        loanTerm: document.getElementById('loanTerm'),
        monthlyRent: document.getElementById('monthlyRent'),
        rentersInsurance: document.getElementById('rentersInsurance'),
        yearsToStay: document.getElementById('yearsToStay'),
        homeAppreciation: document.getElementById('homeAppreciation'),
        rentIncrease: document.getElementById('rentIncrease'),
        closingCosts: document.getElementById('closingCosts'),
        propertyTax: document.getElementById('propertyTax'),
        homeInsurance: document.getElementById('homeInsurance'),
        maintenance: document.getElementById('maintenance'),
        hoa: document.getElementById('hoa')
    };

    // 2. GATHER ALL RESULT ELEMENTS
    const resultElements = {
        breakeven: document.getElementById('resultBreakeven'),
        buyMonthly: document.getElementById('resultBuyMonthly'),
        rentMonthly: document.getElementById('resultRentMonthly'),
        verdict: document.getElementById('resultVerdict'),
        summaryYears: document.getElementById('summaryYears'),
        summaryText: document.getElementById('resultSummaryText'),
        breakdownYears: document.getElementById('breakdownYears'),
        rentTotalCost: document.getElementById('rentTotalCost'),
        buyTotalCost: document.getElementById('buyTotalCost'),
        netAdvantage: document.getElementById('netAdvantage'),
        netWorthYears: document.getElementById('netWorthYears'),
        buyNetWorth: document.getElementById('buyNetWorth'),
        rentNetWorth: document.getElementById('rentNetWorth'),
        netWorthDifference: document.getElementById('netWorthDifference')
    };

    // --- HELPER FUNCTIONS (Copied from Refinance app) ---

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

        if (chart.canvas.id === 'costOverTimeChart') { // Updated for this chart
            const title = data.labels[elements[0].index] || '';
            if (title) {
                innerHtml += `<div class="tooltip-title">Year: ${title}</div>`;
            }
            elements.forEach(point => {
                const { datasetIndex, index } = point;
                const dataset = data.datasets[datasetIndex];
                const label = dataset.label;
                const value = dataset.data[index]; // It's a direct value, not {x, y}
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
        } else if (chart.canvas.id === 'netWorthChart') { // Updated for this chart
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
                        <span>Est. Net Worth:</span>
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
    
    // --- END OF HELPER FUNCTIONS ---


    // 3. INITIALIZE CHARTS (New Chart Definitions)
    const initializeCharts = () => {
        if (typeof Chart === 'undefined') return;
        chartsInitialized = true;

        const costCtx = document.getElementById('costOverTimeChart')?.getContext('2d');
        const netWorthCtx = document.getElementById('netWorthChart')?.getContext('2d');
        
        if (!costCtx || !netWorthCtx) return;

        if (costOverTimeChart) costOverTimeChart.destroy();
        if (netWorthChart) netWorthChart.destroy();

        // Chart 1: Cumulative Cost
        costOverTimeChart = new Chart(costCtx, {
            type: 'line',
            data: {
                labels: [], // Years 1, 2, 3...
                datasets: [
                    { label: 'Cumulative Cost (Buying)', data: [], borderColor: '#8c5a3c', fill: false, tension: 0.1, pointRadius: 0 },
                    { label: 'Cumulative Cost (Renting)', data: [], borderColor: '#d3b892', fill: false, tension: 0.1, pointRadius: 0 },
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { ticks: { callback: value => '$' + (value / 1000) + 'k' } } },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                interaction: { mode: 'index', intersect: false }
            }
        });

        // Chart 2: Net Worth Comparison
        netWorthChart = new Chart(netWorthCtx, {
            type: 'bar',
            data: {
                labels: ['Buying', 'Renting'],
                datasets: [{
                    label: 'Estimated Net Worth',
                    data: [0, 0],
                    backgroundColor: ['#8c5a3c', '#d3b892'],
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: { y: { ticks: { callback: value => '$' + (value / 1000) + 'k' } } }
            }
        });

        // Add event listeners for custom tooltips
        const charts = [costOverTimeChart, netWorthChart];
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

    // 4. MAIN CALCULATION FUNCTION (All New Logic)
    const calculateAndDisplay = () => {
        // Get all values
        const price = parseFloat(allInputs.homePrice.value) || 0;
        const down = parseFloat(allInputs.downPayment.value) || 0;
        const rate = parseFloat(allInputs.interestRate.value) || 0;
        const term = parseFloat(allInputs.loanTerm.value) || 0;
        const rent = parseFloat(allInputs.monthlyRent.value) || 0;
        const rentIns = parseFloat(allInputs.rentersInsurance.value) || 0;
        const years = parseFloat(allInputs.yearsToStay.value) || 7;
        const appreciation = parseFloat(allInputs.homeAppreciation.value) / 100 || 0;
        const rentHike = parseFloat(allInputs.rentIncrease.value) / 100 || 0;
        const closing = parseFloat(allInputs.closingCosts.value) / 100 * price || 0;
        const taxRate = parseFloat(allInputs.propertyTax.value) / 100 || 0;
        const insRate = parseFloat(allInputs.homeInsurance.value) / 100 || 0;
        const maintRate = parseFloat(allInputs.maintenance.value) / 100 || 0;
        const hoa = parseFloat(allInputs.hoa.value) || 0;

        // --- Initial Monthly Costs ---
        const loanAmount = price - down;
        const pAndI = calculatePAndI(loanAmount, rate, term);
        const monthlyTax = (price * taxRate) / 12;
        const monthlyIns = (price * insRate) / 12;
        const monthlyMaint = (price * maintRate) / 12;
        
        const totalBuyMonthly = pAndI + monthlyTax + monthlyIns + monthlyMaint + hoa;
        const totalRentMonthly = rent + (rentIns / 12);

        // --- Arrays for Charts and Break-even ---
        let chartLabels = [];
        let buyCumulativeCostData = [];
        let rentCumulativeCostData = [];
        
        let breakEvenYear = -1;
        let cumulativeBuyCost = closing; // Start with closing costs
        let cumulativeRentCost = 0;
        let currentLoanBalance = loanAmount;
        let currentHomeValue = price;
        let currentMonthlyRent = rent;

        let buyNetWorthAtYear = 0;
        let rentNetWorthAtYear = 0;
        let buyTotalCostAtYear = 0;
        let rentTotalCostAtYear = 0;

        const maxYears = Math.max(term, 30, years); // Compare for at least the user's term or 30 years

        for (let y = 1; y <= maxYears; y++) {
            chartLabels.push(y);

            let principalPaidThisYear = 0;
            let interestPaidThisYear = 0;
            
            // Calculate annual mortgage payments (if loan is active)
            if (y <= term && currentLoanBalance > 0) {
                 for (let m = 1; m <= 12; m++) {
                    let interestMonth = currentLoanBalance * (rate / 100 / 12);
                    let principalMonth = pAndI - interestMonth;
                    
                    if (currentLoanBalance - principalMonth < 0) {
                        principalMonth = currentLoanBalance;
                        currentLoanBalance = 0;
                    } else {
                        currentLoanBalance -= principalMonth;
                    }
                    principalPaidThisYear += principalMonth;
                    interestPaidThisYear += interestMonth;
                }
            }
           
            // Calculate annual costs
            const taxThisYear = (currentHomeValue * taxRate);
            const insThisYear = (currentHomeValue * insRate);
            const maintThisYear = (currentHomeValue * maintRate);
            const hoaThisYear = hoa * 12;
            const appreciationThisYear = currentHomeValue * appreciation;
            const rentInsThisYear = (y === 1) ? rentIns : rentIns * Math.pow(1 + rentHike, y - 1); // Inflate renter's insurance too
            const totalRentCostThisYear = currentMonthlyRent * 12 + rentInsThisYear;

            // This is the *true cost* of buying for the year (costs minus appreciation)
            const totalBuyCostThisYear = interestPaidThisYear + taxThisYear + insThisYear + maintThisYear + hoaThisYear - appreciationThisYear;

            cumulativeBuyCost += totalBuyCostThisYear;
            cumulativeRentCost += totalRentCostThisYear;

            // Store data for chart
            buyCumulativeCostData.push(cumulativeBuyCost);
            rentCumulativeCostData.push(cumulativeRentCost);

            // Check for break-even
            if (cumulativeBuyCost < cumulativeRentCost && breakEvenYear === -1) {
                breakEvenYear = y;
            }

            // At the user's specified year, capture the stats
            if (y === years) {
                const homeEquity = currentHomeValue - currentLoanBalance;
                buyNetWorthAtYear = homeEquity;
                
                // Renter invests the down payment + closing costs
                // And also the difference in monthly payments, if any
                // This is a simple (non-compounding) calculation for this calculator's scope
                let renterSavings = down + closing;
                const monthlySavings = totalBuyMonthly - (totalRentMonthly); // Compare year 1 costs
                if (monthlySavings > 0) {
                   renterSavings += (monthlySavings * 12 * years);
                }
                rentNetWorthAtYear = renterSavings;
                
                buyTotalCostAtYear = cumulativeBuyCost;
                rentTotalCostAtYear = cumulativeRentCost;
            }

            // Increment for next year
            currentHomeValue += appreciationThisYear;
            currentMonthlyRent *= (1 + rentHike);
        }

        // --- 5. UPDATE UI ---
        resultElements.breakeven.textContent = breakEvenYear > 0 ? `${breakEvenYear} Years` : "N/A";
        resultElements.buyMonthly.textContent = formatCurrency(totalBuyMonthly);
        resultElements.rentMonthly.textContent = formatCurrency(totalRentMonthly);

        const verdict = buyTotalCostAtYear < rentTotalCostAtYear ? "Buying is Cheaper" : "Renting is Cheaper";
        resultElements.verdict.textContent = verdict;
        resultElements.verdict.style.color = (verdict === "Buying is Cheaper") ? '#2e7d32' : '#c62828';

        resultElements.summaryYears.textContent = years;
        resultElements.breakdownYears.textContent = years;
        resultElements.netWorthYears.textContent = years;

        resultElements.summaryText.innerHTML = `After <span class="summary-highlight">${years} years</span>, it is estimated to be <span class="summary-highlight">${formatCurrency(Math.abs(buyTotalCostAtYear - rentTotalCostAtYear))} ${verdict.toLowerCase()}</span>. Your break-even point is around <span class="summary-highlight">${breakEvenYear > 0 ? `${breakEvenYear} years` : 'N/A'}</span>.`;

        // Update breakdowns
        resultElements.rentTotalCost.textContent = formatCurrency(rentTotalCostAtYear);
        resultElements.buyTotalCost.textContent = formatCurrency(buyTotalCostAtYear);
        const advantage = rentTotalCostAtYear - buyTotalCostAtYear;
        resultElements.netAdvantage.textContent = formatCurrency(advantage);
        resultElements.netAdvantage.style.color = advantage >= 0 ? '#2e7d32' : '#c62828';

        resultElements.buyNetWorth.textContent = formatCurrency(buyNetWorthAtYear);
        resultElements.rentNetWorth.textContent = formatCurrency(rentNetWorthAtYear);
        const netDiff = buyNetWorthAtYear - rentNetWorthAtYear;
        resultElements.netWorthDifference.textContent = formatCurrency(netDiff);
        resultElements.netWorthDifference.style.color = netDiff >= 0 ? '#2e7d32' : '#c62828';

        // --- 6. UPDATE CHARTS ---
        if (chartsInitialized) {
            costOverTimeChart.data.labels = chartLabels.slice(0, years + 5); // Show a few years past selection
            costOverTimeChart.data.datasets[0].data = buyCumulativeCostData.slice(0, years + 5);
            costOverTimeChart.data.datasets[1].data = rentCumulativeCostData.slice(0, years + 5);
            costOverTimeChart.update();
            updateCustomLegend('costLegend', costOverTimeChart);

            netWorthChart.data.datasets[0].data = [buyNetWorthAtYear, rentNetWorthAtYear];
            netWorthChart.update();
        }
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
    
    // --- 7. ATTACH EVENT LISTENERS ---
    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    Object.values(allInputs).forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('input', debouncedCalculate);
        } else {
            input.addEventListener('input', (e) => {
                const target = e.target;
                const max = parseFloat(target.getAttribute('max'));
                const min = parseFloat(target.getAttribute('min'));
                let value = parseFloat(target.value);

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

    // Full resize handler
    const handleResize = debounce(() => {
        if (chartsInitialized) {
            initializeCharts();
            calculateAndDisplay();
        }
    }, 250);

    window.addEventListener('resize', handleResize);
    
    // Initial calculation on load
    setTimeout(calculateAndDisplay, 50);

    // --- TAGLINE ANIMATION ---
    const taglines = [
        "Find your financial turning point.",
        "Clarity for your biggest decision.",
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
            setTimeout(cycleTaglines, 50); // Corrected from original
        });
        cycleTaglines();
    }
    
});
