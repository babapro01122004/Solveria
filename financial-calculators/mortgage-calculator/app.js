document.addEventListener('DOMContentLoaded', () => {

    // --- High-Performance: LAZY-LOAD CHART.JS ---
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

    const doughnutContainer = document.getElementById('doughnut-container');
    if (doughnutContainer) {
        chartObserver.observe(doughnutContainer);
    }
    // --- End of Lazy-Load ---

    // --- Chart Variables ---
    let paymentBreakdownChart, loanAmortizationChart, loanEquityChart;
    let fullMonthlySchedule = []; 
    let currentScheduleView = 'yearly'; 
    let currentCalculatorMode = 'basic'; // Default mode is 'basic'

    // --- ### MODIFIED: Input & Output Element Mapping ### ---
    const allInputs = {
        homePrice: document.getElementById('homePrice'),
        downPaymentDollars: document.getElementById('downPaymentDollars'),
        downPaymentPercent: document.getElementById('downPaymentPercent'),
        loanTerm: document.getElementById('loanTerm'),
        creditScore: document.getElementById('creditScore'), // This is now the hidden input
        interestRate: document.getElementById('interestRate'),
        propertyTax: document.getElementById('propertyTax'),
        homeInsurance: document.getElementById('homeInsurance'),
        pmiPercent: document.getElementById('pmiPercent'), 
        hoaDues: document.getElementById('hoaDues'),
        extraPayment: document.getElementById('extraPayment') 
    };

    const resultElements = {
        monthlyPI: document.getElementById('resultMonthlyPI'),
        monthlyTaxes: document.getElementById('resultMonthlyTaxes'),
        totalMonthly: document.getElementById('resultTotalMonthly'),
        summaryText: document.getElementById('resultSummaryText'),
        year1Principal: document.getElementById('resultYear1Principal'),
        year1Interest: document.getElementById('resultYear1Interest'),
        year1Taxes: document.getElementById('resultYear1Taxes'), // This is now Year 1 Total Extras
        year1Total: document.getElementById('resultYear1Total'),
        loanAmount: document.getElementById('resultLoanAmount'),
        totalInterest: document.getElementById('resultTotalInterest'),
        totalPaid: document.getElementById('resultTotalPaid'),
        interestSaved: document.getElementById('resultInterestSaved'), 
        payoffDate: document.getElementById('resultPayoffDate'), 
        scheduleHead: document.getElementById('mortgage-schedule-head'),
        scheduleBody: document.getElementById('mortgage-schedule-body'),
        modalDetailsBody: document.getElementById('modal-details-body'),
        modalTotalAmount: document.getElementById('modal-total-amount')
    };
    // --- End of Modification ---

    // Modal elements
    const modalOverlay = document.getElementById('modal-overlay');
    const detailsModal = document.getElementById('details-modal');
    const showDetailsButton = document.getElementById('showDetailsButton');
    const modalCloseButton = document.getElementById('modal-close-button');

    // Toggle switch elements
    const scheduleToggle = document.getElementById('scheduleToggle');
    const toggleOptions = scheduleToggle.querySelectorAll('.toggle-option');

    // --- Utility Functions ---
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

    // --- Tooltip Handler ---
    // ... (This function is unchanged) ...
    const customTooltipHandler = (event, chart) => {
        const tooltipEl = document.getElementById('chartTooltip');
        if (!tooltipEl) return false;
        const { pageX, pageY } = event;
        const isDoughnut = chart.config.type === 'doughnut';
        const mode = isDoughnut ? 'nearest' : 'index';
        const intersect = isDoughnut ? true : false; 
        const elements = chart.getElementsAtEventForMode(event, mode, { intersect: intersect }, true);
        if (elements.length === 0) {
            tooltipEl.style.opacity = 0;
            return false; 
        }
        const data = chart.data;
        let innerHtml = '';
        if (chart.canvas.id === 'paymentBreakdownChart') {
            const element = elements[0];
            const { datasetIndex, index } = element;
            const dataset = data.datasets[datasetIndex];
            const title = data.labels[index];
            const value = dataset.data[index];
            const color = dataset.backgroundColor[index];
            innerHtml += `<div class="tooltip-title">${title}</div>`;
            innerHtml += `
                <div class="tooltip-body-item">
                    <div style="display: flex; align-items: center;">
                        <span class="tooltip-color-box" style="background-color: ${color}"></span>
                        <span>Monthly Cost:</span>
                    </div>
                    <span>${formatCurrency(value)}</span>
                </div>
            `;
        } else {
            const title = data.labels[elements[0].index] || '';
            if (title) {
                innerHtml += `<div class="tooltip-title">Year: ${title}</div>`;
            }
            elements.forEach(point => {
                const { datasetIndex, index } = point;
                const dataset = data.datasets[datasetIndex];
                const label = dataset.label;
                const value = dataset.data[index];
                const color = dataset.backgroundColor || dataset.borderColor;
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
        }
        tooltipEl.innerHTML = innerHtml;
        tooltipEl.style.opacity = 1;
        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;
        const margin = 15;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        let finalX, finalY;
        finalY = pageY + margin;
        if (finalY + tooltipHeight + margin > winHeight) {
            finalY = pageY - tooltipHeight - margin;
            if (finalY < margin) finalY = margin;
        }
        const spaceRight = winWidth - pageX;
        const spaceLeft = pageX;
        const neededRight = tooltipWidth + margin;
        const neededLeft = tooltipWidth + margin;
        if (spaceRight > neededRight) {
            finalX = pageX + margin;
        } else if (spaceLeft > neededLeft) {
            finalX = pageX - tooltipWidth - margin;
        } else {
            finalX = (winWidth - tooltipWidth) / 2;
        }
        if (finalX < margin) finalX = margin;
        if (finalX + tooltipWidth + margin > winWidth) {
            finalX = winWidth - tooltipWidth - margin;
        }
        tooltipEl.style.left = `${finalX}px`;
        tooltipEl.style.top = `${finalY}px`;
        return true;
    };


    // --- Chart Initialization ---
    // ... (This is modified to include PMI color/label) ...
    const initializeCharts = () => {
        if (typeof Chart === 'undefined') return;
        chartsInitialized = true; 

        const doughnutCtx = document.getElementById('paymentBreakdownChart')?.getContext('2d'); 
        const amortizationCtx = document.getElementById('loanAmortizationChart')?.getContext('2d');
        const equityCtx = document.getElementById('loanEquityChart')?.getContext('2d');
        
        if (!doughnutCtx || !amortizationCtx || !equityCtx) return;

        if (paymentBreakdownChart) paymentBreakdownChart.destroy();
        if (loanAmortizationChart) loanAmortizationChart.destroy();
        if (loanEquityChart) loanEquityChart.destroy();

        const chartColors = {
            principal: '#b5835A', 
            interest: '#d3b892',  
            tax: '#E4D1B9',        
            insurance: '#F5F0E9',  
            pmi: '#e0d6c7', // NEW Color for PMI
            hoa: '#fbf9f7',         
            equity: '#b5835A',    
            balance: '#d3b892'   
        };

        paymentBreakdownChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Principal & Interest', 'Property Tax', 'Home Insurance', 'PMI', 'HOA Dues'],
                datasets: [{
                    label: 'Monthly Payment Breakdown',
                    data: [0, 0, 0, 0, 0], 
                    backgroundColor: [chartColors.principal, chartColors.tax, chartColors.insurance, chartColors.pmi, chartColors.hoa], 
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                cutout: '60%'
            }
        });

        loanAmortizationChart = new Chart(amortizationCtx, {
            type: 'bar',
            data: {
                labels: [], // Years
                datasets: [
                    { label: 'Principal', data: [], backgroundColor: chartColors.principal },
                    { label: 'Interest', data: [], backgroundColor: chartColors.interest }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { 
                    x: { stacked: true }, 
                    y: { stacked: true, ticks: { callback: value => '$' + (value / 1000) + 'k' } } 
                },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                interaction: { mode: 'index', intersect: false } 
            }
        });

        loanEquityChart = new Chart(equityCtx, {
            type: 'line',
            data: {
                labels: [], // Years
                datasets: [
                    { label: 'Home Equity', data: [], fill: true, backgroundColor: 'rgba(181, 131, 90, 0.2)', borderColor: chartColors.equity, tension: 0.4, pointRadius: 0 },
                    { label: 'Remaining Balance', data: [], fill: true, backgroundColor: 'rgba(211, 184, 146, 0.2)', borderColor: chartColors.balance, tension: 0.4, pointRadius: 0 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { stacked: true, ticks: { callback: value => '$' + (value / 1000) + 'k' } } },
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                interaction: { mode: 'index', intersect: false } 
            }
        });


        // Attach tooltip handlers
        const charts = [paymentBreakdownChart, loanAmortizationChart, loanEquityChart];
        charts.forEach(chart => {
            chart.canvas.addEventListener('mousemove', (e) => customTooltipHandler(e, chart));
            chart.canvas.addEventListener('click', (e) => customTooltipHandler(e, chart)); 
            chart.canvas.addEventListener('mouseout', () => {
                const tooltipEl = document.getElementById('chartTooltip');
                if (tooltipEl) tooltipEl.style.opacity = 0;
            });
        });
    };

    // --- Calculation Functions ---
    const calculatePAndI = (principal, annualRate, termYears) => {
        if (principal <= 0 || annualRate <= 0 || termYears <= 0) return 0;
        const monthlyRate = annualRate / 100 / 12;
        const numPayments = termYears * 12;
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    // --- ### HEAVILY MODIFIED: generateAmortizationSchedule (PMI Repair) ### ---
    const generateAmortizationSchedule = (principal, monthlyPayment, monthlyRate, termYears, downPayment, extraPayment = 0, extras = {}) => {
        let balance = principal;
        const numPayments = termYears * 12;
        const monthlyData = [];
        const yearlyAggregates = [];

        let yearlyPrincipal = 0;
        let yearlyInterest = 0;
        let yearlyExtras = 0; // NEW
        
        let totalInterest = 0;
        let totalExtras = 0; // NEW
        let totalMonths = 0; 
        
        const paymentDate = new Date();

        // Default extras
        const {
            monthlyTaxes = 0,
            monthlyInsurance = 0,
            hoaDues = 0,
            monthlyPMI = 0,
            pmiRemovalTarget = 0 // LTV target to remove PMI
        } = extras;

        if (principal <= 0 || monthlyPayment <= 0) {
            return {
                monthlyData: [],
                yearlyData: Array(termYears).fill({ year: 0, principal: 0, interest: 0, extras: 0, balance: 0, equity: downPayment }),
                totalInterest: 0,
                totalMonths: 0,
                totalExtras: 0
            };
        }
        
        // --- NEW: PMI state flag ---
        let pmiActive = monthlyPMI > 0;

        for (let i = 1; i <= numPayments; i++) {
            totalMonths = i; 
            const interestPayment = balance * monthlyRate;
            let principalPayment = monthlyPayment - interestPayment;
            let principalWithExtra = principalPayment + extraPayment;

            // Check for overpayment
            if (balance - principalWithExtra < 0) {
                principalWithExtra = balance; 
                balance = 0;
            } else {
                balance -= principalWithExtra;
            }

            // --- REPAIRED PMI LOGIC ---
            // Check if PMI should be removed
            if (pmiActive && balance < pmiRemovalTarget) {
                pmiActive = false; // Turn off PMI for all future payments
            }
            const currentPMI = pmiActive ? monthlyPMI : 0;
            const currentMonthlyExtras = monthlyTaxes + monthlyInsurance + hoaDues + currentPMI;
            // --- End REPAIRED PMI LOGIC ---

            totalInterest += interestPayment;
            totalExtras += currentMonthlyExtras; // Add accurate extras
            
            yearlyInterest += interestPayment;
            yearlyPrincipal += principalWithExtra;
            yearlyExtras += currentMonthlyExtras;
            
            paymentDate.setMonth(paymentDate.getMonth() + 1);

            monthlyData.push({
                month: i,
                year: Math.ceil(i/12),
                date: paymentDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
                principal: principalWithExtra,
                interest: interestPayment,
                extras: currentMonthlyExtras, // Store calculated extras
                balance: balance,
            });

            if (i % 12 === 0 || balance === 0) {
                yearlyAggregates.push({
                    year: Math.ceil(i / 12),
                    principal: yearlyPrincipal,
                    interest: yearlyInterest,
                    extras: yearlyExtras, // Store calculated extras
                    balance: balance,
                    equity: downPayment + (principal - balance) // This is principal-based equity
                });
                yearlyPrincipal = 0;
                yearlyInterest = 0;
                yearlyExtras = 0; // Reset for next year
            }
            
            if (balance === 0) {
                break;
            }
        }
        return { monthlyData, yearlyData: yearlyAggregates, totalInterest, totalMonths, totalExtras };
    };
    // --- End of Modification ---
    
    // --- ### HEAVILY MODIFIED: Main Calculation Engine ### ---
    const calculateAndDisplay = () => {
        // --- 1. Get All Inputs ---
        const homePrice = parseFloat(allInputs.homePrice.value) || 0;
        const downPaymentDollars = parseFloat(allInputs.downPaymentDollars.value) || 0;
        const downPaymentPercent = (homePrice > 0) ? (downPaymentDollars / homePrice) * 100 : 0;
        const loanTerm = parseFloat(allInputs.loanTerm.value) || 0;
        const interestRate = parseFloat(allInputs.interestRate.value) || 0;
        const propertyTax = parseFloat(allInputs.propertyTax.value) || 0;
        const homeInsurance = parseFloat(allInputs.homeInsurance.value) || 0;
        
        let pmiPercent = 0;
        let hoaDues = 0;
        let extraPayment = 0;

        // NEW: Get advanced inputs only if in advanced mode
        if (currentCalculatorMode === 'advanced') {
            // Auto-set PMI if down payment is < 20%
            if (downPaymentPercent < 20 && allInputs.pmiPercent.value === "0") {
                // Trigger credit score logic to set a default PMI
                allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (downPaymentPercent >= 20) {
                allInputs.pmiPercent.value = "0"; // Auto-remove PMI if >= 20% down
            }
            
            pmiPercent = parseFloat(allInputs.pmiPercent.value) || 0;
            hoaDues = parseFloat(allInputs.hoaDues.value) || 0;
            extraPayment = parseFloat(allInputs.extraPayment.value) || 0;
        }

        // --- 2. Core Calculations ---
        const loanAmount = homePrice - downPaymentDollars;
        const monthlyRate = interestRate / 100 / 12;
        
        const monthlyPI = calculatePAndI(loanAmount, interestRate, loanTerm);
        const monthlyTaxes = propertyTax / 12;
        const monthlyInsurance = homeInsurance / 12;
        
        // NEW: Calculate monthly PMI
        // PMI is only added if down payment is < 20%
        const monthlyPMI = (downPaymentPercent < 20) ? (loanAmount * (pmiPercent / 100)) / 12 : 0;
        
        // This is the *starting* monthly extras payment
        const startingMonthlyExtras = monthlyTaxes + monthlyInsurance + monthlyPMI + hoaDues;
        const totalMonthly = monthlyPI + startingMonthlyExtras;
        
        // --- 3. Generate Schedule (Standard) ---
        // We first generate a schedule *without* extra payments to get the original interest
        const { totalInterest: originalTotalInterest } = generateAmortizationSchedule(loanAmount, monthlyPI, monthlyRate, loanTerm, downPaymentDollars, 0, {
            monthlyTaxes, monthlyInsurance, hoaDues, monthlyPMI, pmiRemovalTarget: homePrice * 0.80
        });
        
        // --- 4. Generate ACCURATE Schedule (with Extra Payments and PMI Fix) ---
        const pmiRemovalTarget = homePrice * 0.80; // PMI removed at 80% LTV of *home price*
        const extrasObject = { monthlyTaxes, monthlyInsurance, hoaDues, monthlyPMI, pmiRemovalTarget };
        
        const { monthlyData, yearlyData, totalInterest, totalMonths, totalExtras } = generateAmortizationSchedule(loanAmount, monthlyPI, monthlyRate, loanTerm, downPaymentDollars, extraPayment, extrasObject);
        fullMonthlySchedule = monthlyData; 
        
        const totalPaid = loanAmount + totalInterest + totalExtras;
        
        // Savings calculations
        const totalInterestSaved = (originalTotalInterest > totalInterest) ? (originalTotalInterest - totalInterest) : 0;
        const payoffYears = Math.floor(totalMonths / 12);
        const payoffRemainderMonths = totalMonths % 12;
        const payoffDateString = `${payoffYears} yrs, ${payoffRemainderMonths} mos`;

        // --- 5. Update Basic Summary Boxes ---
        resultElements.monthlyPI.textContent = formatCurrency(monthlyPI);
        resultElements.monthlyTaxes.textContent = formatCurrency(startingMonthlyExtras); // Show starting payment
        resultElements.totalMonthly.textContent = formatCurrency(totalMonthly);
        resultElements.totalMonthly.style.color = '#333';
        resultElements.totalMonthly.style.fontWeight = '500';

        // Update Summary Text
        resultElements.summaryText.innerHTML = `Based on your entries, your estimated total monthly payment is <span class="summary-highlight">${formatCurrency(totalMonthly)}</span>. This complete payment includes <span class="summary-highlight">${formatCurrency(monthlyPI)}</span> for your loan's principal and interest, plus an estimated <span class="summary-highlight">${formatCurrency(startingMonthlyExtras)}</span> for taxes, insurance, PMI, and any HOA dues.`;

        // --- 6. Update Advanced Breakdown Boxes ---
        const year1Data = yearlyData.length > 0 ? yearlyData[0] : { principal: 0, interest: 0, extras: 0 };
        resultElements.year1Principal.textContent = formatCurrency(year1Data.principal);
        resultElements.year1Interest.textContent = formatCurrency(year1Data.interest);
        resultElements.year1Taxes.textContent = formatCurrency(year1Data.extras); // Use accurate extras from schedule
        resultElements.year1Total.textContent = formatCurrency(year1Data.principal + year1Data.interest + year1Data.extras);

        resultElements.loanAmount.textContent = formatCurrency(loanAmount);
        resultElements.totalInterest.textContent = formatCurrency(totalInterest);
        resultElements.totalPaid.textContent = formatCurrency(totalPaid);
        
        resultElements.interestSaved.textContent = formatCurrency(totalInterestSaved);
        resultElements.payoffDate.textContent = (extraPayment > 0 || totalMonths < (loanTerm * 12)) ? payoffDateString : `${loanTerm} yrs, 0 mos`;

        // --- 7. Populate Amortization Table (Advanced) ---
        populateScheduleTable(yearlyData, fullMonthlySchedule, currentScheduleView); // No longer pass extras
        
        // --- 8. Populate Modal Details (Advanced) ---
        resultElements.modalDetailsBody.innerHTML = `
            <tr>
                <td>Principal & Interest</td>
                <td>${formatCurrency(monthlyPI)}</td>
            </tr>
            <tr>
                <td>Property Tax</td>
                <td>${formatCurrency(monthlyTaxes)}</td>
            </tr>
            <tr>
                <td>Home Insurance</td>
                <td>${formatCurrency(monthlyInsurance)}</td>
            </tr>
            <tr> 
                <td>PMI (Starting)</td>
                <td>${formatCurrency(monthlyPMI)}</td>
            </tr>
            <tr>
                <td>HOA Dues</td>
                <td>${formatCurrency(hoaDues)}</td>
            </tr>
            <tr class="total-row">
                <td>Total Monthly (Starting)</td>
                <td>${formatCurrency(totalMonthly)}</td>
            </tr>
        `;
        
        // --- 9. Update Charts (Advanced) ---
        if (chartsInitialized) {
            updateCharts(yearlyData, [monthlyPI, monthlyTaxes, monthlyInsurance, monthlyPMI, hoaDues]);
        }
    };
    // --- End of Calculation Engine ---
    
    // --- ### MODIFIED: Amortization Table Population Function ### ---
    const populateScheduleTable = (yearlyData, monthlyData, view) => {
        const head = resultElements.scheduleHead;
        const body = resultElements.scheduleBody;
        body.innerHTML = ''; 
        head.innerHTML = ''; 
        
        if (view === 'yearly') {
            head.innerHTML = `
                <tr>
                    <th>Year</th>
                    <th>Principal Paid</th>
                    <th>Interest Paid</th>
                    <th>Taxes, Ins. & Dues</th>
                    <th>Total Paid</th>
                    <th>Remaining Balance</th>
                </tr>
            `;
            yearlyData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.year}</td>
                    <td>${formatCurrency(row.principal)}</td>
                    <td>${formatCurrency(row.interest)}</td>
                    <td>${formatCurrency(row.extras)}</td> <td>${formatCurrency(row.principal + row.interest + row.extras)}</td> <td>${formatCurrency(row.balance)}</td>
                `;
                body.appendChild(tr);
            });
        } else { // 'monthly' view
            head.innerHTML = `
                <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Principal Paid</th>
                    <th>Interest Paid</th>
                    <th>Taxes, Ins. & Dues</th>
                    <th>Total Paid</th>
                    <th>Remaining Balance</th>
                </tr>
            `;
            monthlyData.forEach(row => {
                const tr = document.createElement('tr');
                const totalMonthlyPaid = row.principal + row.interest + row.extras;
                tr.innerHTML = `
                    <td>${row.year}</td>
                    <td>${row.date}</td>
                    <td>${formatCurrency(row.principal)}</td>
                    <td>${formatCurrency(row.interest)}</td>
                    <td>${formatCurrency(row.extras)}</td> <td>${formatCurrency(totalMonthlyPaid)}</td>
                    <td>${formatCurrency(row.balance)}</td>
                `;
                body.appendChild(tr);
            });
        }
    };
    // --- End of Modification ---
    
    // --- Chart Update Function ---
    // ... (This function is unchanged) ...
    const updateCharts = (yearlyData, breakdownData) => {
        if (!chartsInitialized) return; 

        const labels = yearlyData.map(d => d.year);
        const principalData = yearlyData.map(d => d.principal);
        const interestData = yearlyData.map(d => d.interest);
        const equityData = yearlyData.map(d => d.equity);
        const balanceData = yearlyData.map(d => d.balance);

        paymentBreakdownChart.data.datasets[0].data = breakdownData;
        paymentBreakdownChart.update();
        updateCustomLegend('paymentBreakdownLegend', paymentBreakdownChart);

        loanAmortizationChart.data.labels = labels;
        loanAmortizationChart.data.datasets[0].data = principalData;
        loanAmortizationChart.data.datasets[1].data = interestData;
        loanAmortizationChart.update();
        updateCustomLegend('loanAmortizationLegend', loanAmortizationChart);

        loanEquityChart.data.labels = labels;
        loanEquityChart.data.datasets[0].data = equityData;
        loanEquityChart.data.datasets[1].data = balanceData;
        loanEquityChart.update();
        updateCustomLegend('loanEquityLegend', loanEquityChart);
    };

    // --- Custom Legend Function ---
    // ... (This function is modified to hide $0 items) ...
    const updateCustomLegend = (containerId, chart) => {
        const legendContainer = document.getElementById(containerId);
        if(!legendContainer) return;
        legendContainer.innerHTML = '';
        
        if (chart.data.labels.length && chart.data.datasets.length) {
            if (chart.config.type === 'doughnut') {
                chart.data.labels.forEach((label, index) => {
                    const value = chart.data.datasets[0].data[index];
                    // NEW: Don't show legend for $0 items
                    if (value <= 0) return; 
                    
                    const color = chart.data.datasets[0].backgroundColor[index];
                    const legendItem = document.createElement('div');
                    legendItem.className = 'legend-item';
                    legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${color}"></div><span>${label}</span>`;
                    legendContainer.appendChild(legendItem);
                });
            } else { // For line and bar
                chart.data.datasets.forEach(dataset => {
                    const color = dataset.backgroundColor || dataset.borderColor;
                    const legendItem = document.createElement('div');
                    legendItem.className = 'legend-item';
                    legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${color}"></div><span>${dataset.label}</span>`;
                    legendContainer.appendChild(legendItem);
                });
            }
        }
    };


    // --- Event Listeners ---
    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    // Standard input listeners
    Object.values(allInputs).forEach(input => {
        // MODIFIED: Exclude creditScore (now a hidden input)
        if (input.id !== 'downPaymentDollars' && input.id !== 'downPaymentPercent' && input.id !== 'creditScore') {
            input.addEventListener('input', (e) => {
                const target = e.target;
                const max = parseFloat(target.getAttribute('max'));
                const min = parseFloat(target.getAttribute('min'));
                let value = parseFloat(target.value);

                if (!isNaN(value)) {
                    if (!isNaN(max) && value > max) target.value = max;
                    if (!isNaN(min) && value < min) target.value = min;
                }
                debouncedCalculate();
            });
        }
    });
    
    // --- ### NEW: Custom Select Logic ### ---
    const creditScoreWrapper = document.getElementById('creditScoreWrapper');
    if (creditScoreWrapper) {
        const creditScoreValue = creditScoreWrapper.querySelector('.custom-select-value');
        const creditScoreHiddenInput = document.getElementById('creditScore'); // This is our hidden input
        const creditScoreOptions = creditScoreWrapper.querySelectorAll('.custom-option');

        // Toggle dropdown
        creditScoreValue.addEventListener('click', () => {
            creditScoreWrapper.classList.toggle('open');
        });

        // Handle option selection
        creditScoreOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedValue = option.dataset.value;
                const selectedText = option.textContent;

                // Update UI
                creditScoreValue.textContent = selectedText;
                creditScoreValue.dataset.value = selectedValue;
                
                // Update hidden input
                creditScoreHiddenInput.value = selectedValue;
                
                // Manually trigger the 'input' event on the hidden input
                // so our existing logic fires
                creditScoreHiddenInput.dispatchEvent(new Event('input', { bubbles: true }));

                // Close dropdown
                creditScoreWrapper.classList.remove('open');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!creditScoreWrapper.contains(e.target)) {
                creditScoreWrapper.classList.remove('open');
            }
        });
    }
    // --- End of Custom Select Logic ---

    // --- ### NEW: Credit Score Listener ### ---
    const rateMap = {
        'excellent': { rate: 6.64, pmi: 0.3 },
        'good': { rate: 7.20, pmi: 0.7 },
        'fair': { rate: 7.90, pmi: 1.0 },
        'poor': { rate: 8.50, pmi: 1.5 }
    };

    // This listener is on the *hidden input*
    allInputs.creditScore.addEventListener('input', (e) => {
        const scoreTier = e.target.value; // Reads from the hidden input
        const rates = rateMap[scoreTier];
        
        if (rates) {
            allInputs.interestRate.value = rates.rate.toFixed(2);
            
            // Only set PMI if down payment is less than 20%
            const homePrice = parseFloat(allInputs.homePrice.value) || 0;
            const downPaymentDollars = parseFloat(allInputs.downPaymentDollars.value) || 0;
            const downPaymentPercent = (homePrice > 0) ? (downPaymentDollars / homePrice) * 100 : 0;
            
            if (downPaymentPercent < 20) {
                allInputs.pmiPercent.value = rates.pmi.toFixed(2);
            } else {
                allInputs.pmiPercent.value = "0.00"; // Ensure it's zeroed out
            }
        }
        debouncedCalculate();
    });
    // --- End of New Listener ---


    // --- ### MODIFIED: Linked Down Payment Listeners ### ---
    // ... (This section is modified to also trigger PMI check) ...
    let isUpdatingDownPayment = false; 

    allInputs.downPaymentDollars.addEventListener('input', () => {
        if (isUpdatingDownPayment) return;
        isUpdatingDownPayment = true;
        const homePrice = parseFloat(allInputs.homePrice.value) || 0;
        const dollars = parseFloat(allInputs.downPaymentDollars.value) || 0;
        
        if (homePrice > 0) {
            const percent = (dollars / homePrice) * 100;
            allInputs.downPaymentPercent.value = percent.toFixed(2);
        } else {
            allInputs.downPaymentPercent.value = 0;
        }
        // NEW: Trigger credit score check to update PMI
        allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
        // debouncedCalculate(); // This is now called by the event above
        isUpdatingDownPayment = false;
    });

    allInputs.downPaymentPercent.addEventListener('input', () => {
        if (isUpdatingDownPayment) return;
        isUpdatingDownPayment = true;
        const homePrice = parseFloat(allInputs.homePrice.value) || 0;
        const percent = parseFloat(allInputs.downPaymentPercent.value) || 0;
        
        const dollars = (percent / 100) * homePrice;
        allInputs.downPaymentDollars.value = dollars.toFixed(0);
        
        // NEW: Trigger credit score check to update PMI
        allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
        // debouncedCalculate(); // This is now called by the event above
        isUpdatingDownPayment = false;
    });

    allInputs.homePrice.addEventListener('input', () => {
        isUpdatingDownPayment = true;
        const homePrice = parseFloat(allInputs.homePrice.value) || 0;
        const percent = parseFloat(allInputs.downPaymentPercent.value) || 0;
        
        const dollars = (percent / 100) * homePrice;
        allInputs.downPaymentDollars.value = dollars.toFixed(0);
        
        // NEW: Trigger credit score check to update PMI
        allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
        // debouncedCalculate(); // This is now called by the event above
        isUpdatingDownPayment = false;
    });


    // Modal Event Listeners
    // ... (This section is unchanged) ...
    const openModal = () => {
        modalOverlay.style.display = 'block';
        detailsModal.style.display = 'block';
    };
    const closeModal = () => {
        modalOverlay.style.display = 'none';
        detailsModal.style.display = 'none';
    };
    showDetailsButton.addEventListener('click', openModal);
    modalCloseButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Toggle Switch Listener (Amortization Table)
    // ... (This section is unchanged) ...
    scheduleToggle.addEventListener('click', (e) => {
        const selectedOption = e.target.closest('.toggle-option');
        if (!selectedOption || selectedOption.classList.contains('active')) {
            return;
        }
        
        currentScheduleView = selectedOption.dataset.view;
        
        toggleOptions.forEach(opt => opt.classList.remove('active'));
        selectedOption.classList.add('active');

        if (currentScheduleView === 'monthly') {
            scheduleToggle.classList.add('monthly');
        } else {
            scheduleToggle.classList.remove('monthly');
        }
        
        calculateAndDisplay(); 
    });

    // --- Mode Toggle Sync Logic ---
    // ... (This function is unchanged) ...
    const modeToggles = [document.getElementById('modeToggleDesktop'), document.getElementById('modeToggleMobile')];

    const syncToggles = (newMode) => {
        if (currentCalculatorMode === newMode) return; // No change
        currentCalculatorMode = newMode;
        
        modeToggles.forEach(toggle => {
            if (!toggle) return;

            if (newMode === 'advanced') {
                toggle.classList.add('advanced');
            } else {
                toggle.classList.remove('advanced');
            }
            if (toggle.getAttribute('role') === 'switch') {
                toggle.setAttribute('aria-checked', newMode === 'advanced');
            }
            toggle.querySelectorAll('.toggle-option').forEach(opt => {
                if (opt.dataset.mode === newMode) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        });
        
        document.body.classList.toggle('is-advanced', newMode === 'advanced');
        
        // NEW: Trigger credit score logic when switching modes
        allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
        // calculateAndDisplay(); // This is called by the event above
    };

    modeToggles.forEach(toggle => {
        if (toggle) {
            // Clicks on the desktop slider
            if (toggle.classList.contains('mode-toggle-switch')) {
                toggle.addEventListener('click', (e) => {
                    const selectedOption = e.target.closest('.toggle-option');
                    if (!selectedOption || selectedOption.classList.contains('active')) {
                        return;
                    }
                    syncToggles(selectedOption.dataset.mode);
                });
            }
            // Clicks on the mobile button
            else if (toggle.classList.contains('mobile-mode-toggle')) {
                toggle.addEventListener('click', () => {
                    const newMode = currentCalculatorMode === 'basic' ? 'advanced' : 'basic';
                    syncToggles(newMode);
                });
            }
        }
    });
    // --- End of Mode Toggle Logic ---

    // Resize listener
    const handleResize = debounce(() => {
        if (chartsInitialized) {
            initializeCharts();
            calculateAndDisplay();
        }
    }, 250);
    window.addEventListener('resize', handleResize);
    
    // Initial calculation
    // NEW: Trigger credit score population on load
    allInputs.creditScore.dispatchEvent(new Event('input', { bubbles: true }));
    // setTimeout(calculateAndDisplay, 50); // This is called by the event above

    // --- Tagline Animation ---
    // ... (This function is unchanged) ...
    const taglines = [
        "See your full monthly payment, not just P&I.",
        "Understand your equity and amortization.",
        "Clarity for your biggest financial decision.",
        "How much home can you 'really' afford?",
        "Plan your path to homeownership, one payment at a time."
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
    
});
