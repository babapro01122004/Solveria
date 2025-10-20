document.addEventListener('DOMContentLoaded', () => {

    const inputCaps = {
        homePrice: 10000000000,
        downPayment: 10000000000,
        loanTerm: 100,
        interestRate: 100,
        startDateYear: 9999,
        homeInsurance: 1000000000,
        hoaFee: 1000000,
        propertyTaxes: 1000000000,
        otherCosts: 1000000,
        pmiInsurance: 1000000000,
        monthlyDebts: 1000000000,
        closingCosts: 1000000000,
        appreciationRate: 100,
        monthlyIncome: 1000000000,
    };

    for (const id in inputCaps) {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                const parsedValue = parseFloat(input.value);
                if (!isNaN(parsedValue) && parsedValue > inputCaps[id]) {
                    input.value = inputCaps[id].toString();
                }
            });
        }
    }

    let costBreakdownChart, loanAmortizationChart, homeEquityChart;
    let fullAmortizationData = [];
    let pieChartRawData = {};

    const showDetailsBtn = document.getElementById('show-details-btn');
    const detailsModal = document.getElementById('details-modal');
    const modalCloseBtn = detailsModal.querySelector('.modal-close-btn');

    const allInputs = {
        homePrice: document.getElementById('homePrice'),
        downPayment: document.getElementById('downPayment'),
        loanTerm: document.getElementById('loanTerm'),
        interestRate: document.getElementById('interestRate'),
        propertyTaxes: document.getElementById('propertyTaxes'),
        homeInsurance: document.getElementById('homeInsurance'),
        pmiInsurance: document.getElementById('pmiInsurance'),
        hoaFee: document.getElementById('hoaFee'),
        closingCosts: document.getElementById('closingCosts'),
        otherCosts: document.getElementById('otherCosts'),
        monthlyIncome: document.getElementById('monthlyIncome'),
        monthlyDebts: document.getElementById('monthlyDebts'),
        creditScore: document.getElementById('creditScore'),
        appreciationRate: document.getElementById('appreciationRate'),
        day: document.getElementById('startDateDay'),
        month: document.getElementById('startDateMonth'),
        year: document.getElementById('startDateYear')
    };

    const resultElements = {
        loanAmount: document.getElementById('resultLoanAmount'),
        totalInterest: document.getElementById('resultTotalInterest'),
        cashToClose: document.getElementById('resultCashToClose'),
        dtiRatio: document.getElementById('resultDtiRatio'),
        summaryText: document.getElementById('resultSummaryText'),
        contextualAdvice: document.getElementById('contextual-advice'),
        fiveYearText: document.getElementById('fiveYearText'),
        monthlyMortgage: document.getElementById('monthlyMortgage'),
        monthlyInsurance: document.getElementById('monthlyInsurance'),
        monthlyHOA: document.getElementById('monthlyHOA'),
        monthlyTotal: document.getElementById('monthlyTotal'),
        monthlyTax: document.getElementById('monthlyTax'),
        monthlyPMI: document.getElementById('monthlyPMI'),
        monthlyOther: document.getElementById('monthlyOther'),
        totalMortgage: document.getElementById('totalMortgage'),
        totalInsurance: document.getElementById('totalInsurance'),
        totalHOA: document.getElementById('totalHOA'),
        totalTotal: document.getElementById('totalTotal'),
        totalTax: document.getElementById('totalTax'),
        totalPMI: document.getElementById('totalPMI'),
        totalOther: document.getElementById('totalOther'),
    };
    const scheduleElements = {
        yearlyBtn: document.getElementById('yearly-btn'),
        monthlyBtn: document.getElementById('monthly-btn'),
        tbody: document.getElementById('amortization-tbody')
    };

    const sanitizeDecimal = (event) => {
        let value = event.target.value;
        let sanitized = value.replace(/[^0-9.]/g, '');
        const parts = sanitized.split('.');
        if (parts.length > 2) {
            sanitized = parts[0] + '.' + parts.slice(1).join('');
        }
        event.target.value = sanitized;
    };

    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (['e', '+', '-', '.'].includes(event.key)) {
                event.preventDefault();
            }
        });
    });

    const validateDate = () => {
        let day = parseInt(allInputs.day.value);
        let month = parseInt(allInputs.month.value);
        let year = parseInt(allInputs.year.value);
        if (!isNaN(month)) {
            if (month > 12) allInputs.month.value = '12';
            else if (month < 1 && allInputs.month.value.length > 0) allInputs.month.value = '1';
        }
        if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year.toString().length >= 4) {
            const daysInMonth = new Date(year, month, 0).getDate();
            if (day > daysInMonth) allInputs.day.value = daysInMonth;
        }
        if (!isNaN(day) && day < 1 && allInputs.day.value.length > 0) {
            allInputs.day.value = '1';
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };
    
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const populateDetailsModal = () => {
        const contentEl = document.getElementById('modal-breakdown-content');
        contentEl.innerHTML = '';

        const total = Object.values(pieChartRawData).reduce((acc, val) => acc + (val || 0), 0);

        let html = `
            <div class="modal-breakdown-header">
                <span>Component</span>
                <span>Percent</span>
                <span>Amount</span>
            </div>
        `;

        if (total === 0) {
            contentEl.innerHTML = '<p style="text-align: center; color: #666;">No data to display. Please enter your details in the calculator.</p>';
            return;
        }

        for (const label in pieChartRawData) {
            const value = pieChartRawData[label] || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            
            html += `
                <div class="result-item">
                    <span class="label">${label}</span>
                    <span class="percentage">${percentage}%</span>
                    <span class="value">${formatCurrency(value)}</span>
                </div>
            `;
        }

        contentEl.innerHTML = html;
    };
    
    const customTooltipHandler = (event, chart) => {
        const tooltipEl = document.getElementById('chartTooltip');
        const { pageX, pageY } = event;
        const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: false }, true);

        if (elements.length === 0) {
            if (event.type === 'mouseout') {
                tooltipEl.style.opacity = 0;
            }
            return false;
        }

        const element = elements[0];
        const { datasetIndex, index } = element;
        const data = chart.data;

        let innerHtml = '';
        
        if (chart.canvas.id === 'costBreakdownChart') {
            const label = data.labels[index] || '';
            const value = data.datasets[datasetIndex].data[index];
            const total = data.datasets[datasetIndex].data.reduce((acc, current) => acc + current, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
            innerHtml = `
                <div class="tooltip-title">${label}</div>
                <div style="text-align: center;">${formatCurrency(value)} (${percentage}%)</div>
            `;
        } else {
            const title = data.labels[index] || '';
            if (title) {
                innerHtml += `<div class="tooltip-title">Year: ${title}</div>`;
            }
            chart.getElementsAtEventForMode(event, 'index', { intersect: false }).forEach(point => {
                const { datasetIndex, index } = point;
                const dataset = data.datasets[datasetIndex];
                const label = dataset.label;
                const value = dataset.data[index];
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
        }

        tooltipEl.innerHTML = innerHtml;
        tooltipEl.style.opacity = 1;

        const tooltipWidth = tooltipEl.offsetWidth;
        const tooltipHeight = tooltipEl.offsetHeight;
        const margin = 15;
        let finalX, finalY;

        finalY = pageY + margin;
        if (finalY + tooltipHeight + margin > window.innerHeight) {
            finalY = pageY - tooltipHeight - margin;
        }
        if (finalY < 0) {
            finalY = margin;
        }

        finalX = pageX + margin;
        if (finalX + tooltipWidth + margin > window.innerWidth) {
            finalX = pageX - tooltipWidth - margin;
            if (finalX < 0) {
                finalX = pageX - (tooltipWidth / 2);
            }
        }
        
        if (finalX < 0) {
            finalX = margin;
        }
        if (finalX + tooltipWidth + margin > window.innerWidth) {
            finalX = window.innerWidth - tooltipWidth - margin;
        }

        tooltipEl.style.left = finalX + 'px';
        tooltipEl.style.top = finalY + 'px';
        
        return true;
    };


    const initializeCharts = () => {
        const pieCtx = document.getElementById('costBreakdownChart').getContext('2d');
        const amortizationCtx = document.getElementById('loanAmortizationChart').getContext('2d');
        const equityCtx = document.getElementById('homeEquityChart').getContext('2d');

        [costBreakdownChart, loanAmortizationChart, homeEquityChart].forEach(chart => {
            if (chart) chart.destroy();
        });

        costBreakdownChart = new Chart(pieCtx, {
            type: 'pie', data: { labels: [], datasets: [{ data: [], backgroundColor: ['#d3b892', '#e4d3b8', '#fff3e0', '#c8a87e', '#b28e68', '#a07c5a'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { enabled: false } }, interaction: { mode: 'nearest', intersect: false } }
        });

        const lineChartOptions = {
            responsive: true, maintainAspectRatio: true,
            scales: { y: { ticks: { callback: value => '$' + (value / 1000) + 'k' } } },
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            interaction: { mode: 'index', intersect: false }
        };

        loanAmortizationChart = new Chart(amortizationCtx, {
            type: 'line',
            data: { labels: [], datasets: [
                { label: 'Balance', data: [], borderColor: '#8c5a3c', backgroundColor: 'rgba(140, 90, 60, 0.2)', fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Principal Paid', data: [], borderColor: '#d3b892', backgroundColor: 'rgba(211, 184, 146, 0.3)', fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Interest', data: [], borderColor: '#d09a7a', backgroundColor: 'rgba(208, 154, 122, 0.3)', fill: true, tension: 0.4, pointRadius: 0 },
            ]},
            options: lineChartOptions
        });

        homeEquityChart = new Chart(equityCtx, {
            type: 'line',
            data: { labels: [], datasets: [
                { label: 'Home Value', data: [], borderColor: '#8c5a3c', backgroundColor: 'rgba(140, 90, 60, 0.1)', fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Equity', data: [], borderColor: '#d09a7a', backgroundColor: 'rgba(208, 154, 122, 0.3)', fill: true, tension: 0.4, pointRadius: 0 },
                { label: 'Loan Balance', data: [], borderColor: '#d3b892', backgroundColor: 'rgba(211, 184, 146, 0.2)', fill: true, tension: 0.4, pointRadius: 0 },
            ]},
            options: lineChartOptions
        });

        const charts = [costBreakdownChart, loanAmortizationChart, homeEquityChart];
        charts.forEach(chart => {
            chart.canvas.addEventListener('mousemove', (e) => customTooltipHandler(e, chart));
            chart.canvas.addEventListener('mouseout', () => {
                document.getElementById('chartTooltip').style.opacity = 0;
            });
            chart.canvas.addEventListener('click', (e) => {
                e.stopPropagation();
                customTooltipHandler(e, chart);
            });
        });
    };

    const calculateAndDisplay = () => {
        const homePrice = parseFloat(allInputs.homePrice.value) || 0;
        let downPayment = parseFloat(allInputs.downPayment.value) || 0;

        if (downPayment > homePrice) {
            downPayment = homePrice;
            allInputs.downPayment.value = homePrice.toString();
        }
        
        const loanTerm = parseFloat(allInputs.loanTerm.value) || 0;
        const interestRate = parseFloat(allInputs.interestRate.value) || 0;
        const propertyTaxes = parseFloat(allInputs.propertyTaxes.value) || 0;
        const homeInsurance = parseFloat(allInputs.homeInsurance.value) || 0;
        const pmiInsurance = parseFloat(allInputs.pmiInsurance.value) || 0;
        const hoaFee = parseFloat(allInputs.hoaFee.value) || 0;
        const closingCosts = parseFloat(allInputs.closingCosts.value) || 0;
        const otherCosts = parseFloat(allInputs.otherCosts.value) || 0;
        const monthlyIncome = parseFloat(allInputs.monthlyIncome.value) || 0;
        const monthlyDebts = parseFloat(allInputs.monthlyDebts.value) || 0;
        const creditScore = allInputs.creditScore.value;
        const appreciationRate = parseFloat(allInputs.appreciationRate.value) / 100 || 0;
        const startDay = parseInt(allInputs.day.value) || 1;
        const startMonth = parseInt(allInputs.month.value) || 1;
        const startYear = parseInt(allInputs.year.value) || new Date().getFullYear();
        const startDate = new Date(startYear, startMonth - 1, startDay);
        
        const principal = homePrice - downPayment;
        if (principal <= 0) { return; }
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        let monthlyPI = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) || 0;
        const totalInterest = (monthlyPI * numberOfPayments) - principal;

        const monthlyTax = propertyTaxes / 12;
        const monthlyInsurance = homeInsurance / 12;
        const monthlyPMI = pmiInsurance / 12;
        const monthlyTotal = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + hoaFee + otherCosts;

        const totalMonthlyDebtPayment = monthlyTotal + monthlyDebts;
        const dtiRatio = monthlyIncome > 0 ? (totalMonthlyDebtPayment / monthlyIncome) : 0;

        const totalMortgage = monthlyPI * numberOfPayments;
        const totalTax = monthlyTax * numberOfPayments;
        const totalInsurance = monthlyInsurance * numberOfPayments;
        const totalPMI = monthlyPMI * numberOfPayments;
        const totalHOA = hoaFee * numberOfPayments;
        const totalOther = otherCosts * numberOfPayments;
        const totalOutOfPocket = downPayment + totalMortgage + totalTax + totalInsurance + totalPMI + totalHOA + totalOther + closingCosts;
        
        const cashToClose = downPayment + closingCosts;

        resultElements.loanAmount.textContent = formatCurrency(principal);
        resultElements.totalInterest.textContent = formatCurrency(totalInterest > 0 ? totalInterest : 0);
        resultElements.cashToClose.textContent = formatCurrency(cashToClose);
        resultElements.dtiRatio.textContent = (dtiRatio * 100).toFixed(1) + '%';
        resultElements.summaryText.innerHTML = `Over the course of your <span class="summary-highlight">${loanTerm}</span> year loan, your total out-of-pocket cost is estimated to be <span class="summary-highlight">${formatCurrency(totalOutOfPocket)}</span>, with <span class="summary-highlight">${formatCurrency(totalInterest > 0 ? totalInterest : 0)}</span> going towards interest.`;
        resultElements.monthlyTotal.textContent = formatCurrency(monthlyTotal);
        resultElements.totalTotal.textContent = formatCurrency(totalOutOfPocket);
        resultElements.monthlyMortgage.textContent = formatCurrency(monthlyPI);
        resultElements.monthlyTax.textContent = formatCurrency(monthlyTax);
        resultElements.monthlyInsurance.textContent = formatCurrency(monthlyInsurance);
        resultElements.monthlyPMI.textContent = formatCurrency(monthlyPMI);
        resultElements.monthlyHOA.textContent = formatCurrency(hoaFee);
        resultElements.monthlyOther.textContent = formatCurrency(otherCosts);
        resultElements.totalMortgage.textContent = formatCurrency(totalMortgage);
        resultElements.totalTax.textContent = formatCurrency(totalTax);
        resultElements.totalInsurance.textContent = formatCurrency(totalInsurance);
        resultElements.totalPMI.textContent = formatCurrency(totalPMI);
        resultElements.totalHOA.textContent = formatCurrency(totalHOA);
        resultElements.totalOther.textContent = formatCurrency(totalOther);

        fullAmortizationData = generateFullAmortizationSchedule(principal, monthlyInterestRate, numberOfPayments, monthlyPI, startDate);

        if (fullAmortizationData.length >= 60) {
            const fiveYearChunk = fullAmortizationData.slice(0, 60);
            const fiveYearInterest = fiveYearChunk.reduce((acc, month) => acc + month.interest, 0);
            const fiveYearPrincipal = fiveYearChunk.reduce((acc, month) => acc + month.principal, 0);
            resultElements.fiveYearText.innerHTML = `You will pay <span class="summary-highlight">${formatCurrency(fiveYearInterest)}</span> in interest and <span class="summary-highlight">${formatCurrency(fiveYearPrincipal)}</span> towards your principal. Your remaining balance will be <span class="summary-highlight">${formatCurrency(fiveYearChunk[59].balance)}</span>.`;
        } else {
            resultElements.fiveYearText.textContent = "Loan term is less than five years.";
        }

        let advice = '';
        if (dtiRatio > 0.43) {
            advice += `<p>High DTI Ratio: Your debt-to-income ratio of ${(dtiRatio * 100).toFixed(1)}% is considered high. Lenders typically prefer a DTI below 43%. This could make it more difficult to qualify for a loan.</p>`;
        } else if (dtiRatio > 0.36) {
            advice += `<p>Good DTI Ratio: Your DTI of ${(dtiRatio * 100).toFixed(1)}% is in a healthy range, but keeping it lower can improve your loan options.</p>`;
        }
        if (creditScore === 'fair' || creditScore === 'poor') {
            advice += `<p>Credit Score Tip: You've selected a lower credit score tier. Improving your credit score before applying for a mortgage can often result in a lower interest rate, saving you thousands over the life of the loan.</p>`;
        }
        resultElements.contextualAdvice.innerHTML = advice;
        resultElements.contextualAdvice.style.display = advice ? 'block' : 'none';
        
        const pieChartData = {
            'Total Interest': totalInterest, 'Principal': principal, 'Property Taxes & Other': totalTax + totalOther + totalPMI + totalHOA, 
            'Home Insurance': totalInsurance, 'Closing Costs': closingCosts, 'Down Payment': downPayment
        };

        pieChartRawData = pieChartData;

        const amortizationData = calculateAmortizationForChart(fullAmortizationData, loanTerm);
        const equityData = calculateEquityForChart(homePrice, appreciationRate, fullAmortizationData, loanTerm);
        updateCharts(pieChartData, amortizationData, equityData, loanTerm);

        renderAmortizationTable();
    };

    const calculateAmortizationForChart = (schedule, loanTerm) => {
        const labels = []; const balanceData = [schedule[0]?.balance + schedule[0]?.principal || 0];
        const interestData = [0]; const principalData = [0];
        let totalInterestPaid = 0; let totalPrincipalPaid = 0;

        schedule.forEach((item, index) => {
            totalInterestPaid += item.interest;
            totalPrincipalPaid += item.principal;
            if ((index + 1) % 12 === 0 || (index + 1) === schedule.length) {
                labels.push(Math.ceil((index + 1) / 12));
                balanceData.push(item.balance);
                interestData.push(totalInterestPaid);
                principalData.push(totalPrincipalPaid);
            }
        });
        return { labels, balanceData, interestData, principalData };
    };
    
    const calculateEquityForChart = (homePrice, appreciationRate, schedule, loanTerm) => {
        const labels = []; const valueData = [homePrice]; const balanceData = [schedule[0]?.balance + schedule[0]?.principal || 0]; const equityData = [homePrice - balanceData[0]];
        let currentValue = homePrice;

        for (let year = 1; year <= loanTerm; year++) {
            labels.push(year);
            currentValue *= (1 + appreciationRate);
            const monthIndex = Math.min(year * 12 - 1, schedule.length - 1);
            const currentBalance = schedule[monthIndex]?.balance || 0;
            
            valueData.push(currentValue);
            balanceData.push(currentBalance);
            equityData.push(currentValue - currentBalance);
        }
        return { labels, valueData, balanceData, equityData };
    };

    const generateFullAmortizationSchedule = (principal, monthlyRate, numPayments, monthlyPI, startDate) => { 
        let balance = principal;
        const schedule = [];
        for (let i = 1; i <= numPayments; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPI - interestPayment;
            balance -= principalPayment;
            const paymentDate = new Date(startDate);
            paymentDate.setMonth(paymentDate.getMonth() + i);
            schedule.push({
                paymentNumber: i,
                date: paymentDate,
                interest: interestPayment,
                principal: principalPayment,
                balance: balance > 0 ? balance : 0,
            });
        }
        return schedule;
    };

    const renderAmortizationTable = () => { 
         const tbody = scheduleElements.tbody;
        tbody.innerHTML = '';
        const isMonthly = scheduleElements.monthlyBtn.classList.contains('active');

        if (isMonthly) {
            fullAmortizationData.forEach(item => {
                const row = tbody.insertRow();
                const dateFormatted = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(item.date);
                row.innerHTML = `<td>${Math.ceil(item.paymentNumber / 12)}</td><td>${dateFormatted}</td><td>${formatCurrency(item.interest)}</td><td>${formatCurrency(item.principal)}</td><td>${formatCurrency(item.balance)}</td>`;
            });
        } else { 
            const yearlyData = [];
            for (let i = 0; i < fullAmortizationData.length; i += 12) {
                const yearChunk = fullAmortizationData.slice(i, i + 12);
                if (yearChunk.length === 0) continue;
                const yearSummary = yearChunk.reduce((acc, month) => {
                    acc.interest += month.interest;
                    acc.principal += month.principal;
                    return acc;
                }, { interest: 0, principal: 0 });
                
                yearlyData.push({
                    year: Math.ceil(yearChunk[0].paymentNumber / 12),
                    date: yearChunk[yearChunk.length-1].date.getFullYear(),
                    interest: yearSummary.interest,
                    principal: yearSummary.principal,
                    balance: yearChunk[yearChunk.length-1].balance,
                });
            }
            yearlyData.forEach(item => {
                const row = tbody.insertRow();
                row.innerHTML = `<td>${item.year}</td><td>${item.date}</td><td>${formatCurrency(item.interest)}</td><td>${formatCurrency(item.principal)}</td><td>${formatCurrency(item.balance)}</td>`;
            });
        }
    };

    const updateCharts = (pieData, amortizationData, equityData, loanTerm) => {
        const pieLabels = Object.keys(pieData);
        const pieValues = Object.values(pieData);
        costBreakdownChart.data.labels = pieLabels;
        costBreakdownChart.data.datasets[0].data = pieValues;
        costBreakdownChart.update();
        updateCustomLegend('cost-breakdown-legend', costBreakdownChart);
        
        loanAmortizationChart.data.labels = amortizationData.labels || [];
        loanAmortizationChart.data.datasets[0].data = amortizationData.balanceData || [];
        loanAmortizationChart.data.datasets[1].data = amortizationData.principalData || [];
        loanAmortizationChart.data.datasets[2].data = amortizationData.interestData || [];
        loanAmortizationChart.update();
        updateCustomLegend('amortization-legend', loanAmortizationChart);

        homeEquityChart.data.labels = equityData.labels || [];
        homeEquityChart.data.datasets[0].data = equityData.valueData || [];
        homeEquityChart.data.datasets[1].data = equityData.equityData || [];
        homeEquityChart.data.datasets[2].data = equityData.balanceData || [];
        homeEquityChart.update();
        updateCustomLegend('equity-legend', homeEquityChart);
    };

    const updateCustomLegend = (containerId, chart) => {
        const legendContainer = document.getElementById(containerId);
        legendContainer.innerHTML = '';
        const isPie = chart.config.type === 'pie';
        const datasets = chart.data.datasets;

        if (isPie) {
            const labels = chart.data.labels;
            const colors = datasets[0].backgroundColor;
            labels.forEach((label, index) => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${colors[index]}"></div><span>${label}</span>`;
                legendContainer.appendChild(legendItem);
            });
        } else {
            datasets.forEach(dataset => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${dataset.borderColor}"></div><span>${dataset.label}</span>`;
                legendContainer.appendChild(legendItem);
            });
        }
    };
    
    const handleResize = () => { 
        if (costBreakdownChart) costBreakdownChart.destroy();
        if (loanAmortizationChart) loanAmortizationChart.destroy();
        if (homeEquityChart) homeEquityChart.destroy();
        initializeCharts();
        calculateAndDisplay();
    };

    function initializeCustomSelect() {
        const wrapper = document.querySelector(".custom-select-wrapper");
        if (!wrapper) return;
        
        const selectEl = wrapper.querySelector("select");
        const selectedDiv = document.createElement("div");
        selectedDiv.setAttribute("class", "select-selected");
        selectedDiv.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
        wrapper.appendChild(selectedDiv);
        
        const optionsListDiv = document.createElement("div");
        optionsListDiv.setAttribute("class", "select-items select-hide");
        
        for (let i = 0; i < selectEl.length; i++) {
            const optionDiv = document.createElement("div");
            optionDiv.innerHTML = selectEl.options[i].innerHTML;
            
            if (i === selectEl.selectedIndex) {
                optionDiv.setAttribute("class", "same-as-selected");
            }

            optionDiv.addEventListener("click", function() {
                const s = this.parentNode.parentNode.querySelector("select");
                const sl = this.parentNode.previousSibling;
                for (let j = 0; j < s.length; j++) {
                    if (s.options[j].innerHTML == this.innerHTML) {
                        s.selectedIndex = j;
                        sl.innerHTML = this.innerHTML;
                        const y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (let k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                sl.click();
                s.dispatchEvent(new Event('change'));
            });
            optionsListDiv.appendChild(optionDiv);
        }
        wrapper.appendChild(optionsListDiv);
        
        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        const items = document.getElementsByClassName("select-items");
        const selected = document.getElementsByClassName("select-selected");
        for (let i = 0; i < selected.length; i++) {
            if (elmnt == selected[i]) {
            } else {
                selected[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < items.length; i++) {
            if (elmnt.nextSibling != items[i]) {
                items[i].classList.add("select-hide");
            }
        }
    }

    document.addEventListener("click", (e) => {
        closeAllSelect(e.target);
        const isChartClick = e.target.closest('.chart-wrapper');
        const tooltipEl = document.getElementById('chartTooltip');
        
        if (!isChartClick && !e.target.closest('.chart-tooltip') && tooltipEl.style.opacity === '1') {
             tooltipEl.style.opacity = 0;
        }
    });

    // --- MODIFICATION: DEBOUNCE THE INPUTS ---
    // This is the most important fix for the "Script Evaluation" and TBT problem
    // during user interaction. It prevents the expensive calculateAndDisplay()
    // from running on every single keystroke.

    // 1. Create a debounced version of your main function (300ms delay)
    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    // 2. Apply the debounced function to all text/number inputs
    Object.values(allInputs).forEach(input => {
        if(input.id !== 'creditScore') {
            input.addEventListener('input', debouncedCalculate);
        }
    });
    
    // 3. Apply the *original* function to the 'change' event for the dropdown
    //    A 'change' event only fires once, so it doesn't need debouncing.
    allInputs.creditScore.addEventListener('change', calculateAndDisplay);
    
    // --- End of Modification ---


     [ allInputs.homePrice, allInputs.downPayment, allInputs.propertyTaxes, allInputs.homeInsurance, allInputs.pmiInsurance, 
       allInputs.hoaFee, allInputs.otherCosts, allInputs.closingCosts, allInputs.monthlyIncome, allInputs.monthlyDebts, allInputs.appreciationRate
     ].forEach(input => input.addEventListener('input', sanitizeDecimal));
    
    [allInputs.day, allInputs.month, allInputs.year].forEach(input => input.addEventListener('input', validateDate));
    
    scheduleElements.yearlyBtn.addEventListener('click', () => {
        scheduleElements.yearlyBtn.classList.add('active');
        scheduleElements.monthlyBtn.classList.remove('active');
        renderAmortizationTable();
    });
    scheduleElements.monthlyBtn.addEventListener('click', () => {
        scheduleElements.monthlyBtn.classList.add('active');
        scheduleElements.yearlyBtn.classList.remove('active');
        renderAmortizationTable();
    });

    showDetailsBtn.addEventListener('click', () => {
        populateDetailsModal();
        detailsModal.style.display = 'flex';
    });

    modalCloseBtn.addEventListener('click', () => {
        detailsModal.style.display = 'none';
    });

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
    });

    window.addEventListener('resize', debounce(handleResize, 250));
    
    initializeCharts();
    validateDate();
    initializeCustomSelect(); 
    calculateAndDisplay();

    const taglines = [
        "Precision today, ownership tomorrow.",
        "Your future, calculated with care.",
        "Estimate with elegance, decide with confidence.",
        "Calculations today, keys in hand tomorrow.",
        "Scroll down to unlock your monthly payment."
    ];
    let taglineIndex = 0;
    const taglineElement = document.getElementById('looping-text');

    function cycleTaglines() {
        if (!taglineElement) return; // Add check in case element doesn't exist
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
        "The calculator is right below",
        "Scroll down to calculate",
        "Your answers are waiting below",
        "Begin your journey just beneath"
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
    initialScrollAnimation();

    const affordabilityNotes = [
        "Find out what you can truly afford.",
        "Calculate your realistic home budget.",
        "The first step to your new home."
    ];
    const rentBuyNotes = [
        "Is renting or buying right for you?",
        "Compare the long-term financial impact.",
        "Make the right choice for your future."
    ];

    const affordabilityNoteEl = document.getElementById('affordability-note');
    const rentBuyNoteEl = document.getElementById('rent-buy-note');
    let affordabilityIndex = 0;
    let rentBuyIndex = 0;

    function cycleNotes(element, notesArray, index) {
        if (!element) return;
        element.textContent = notesArray[index];
        element.style.opacity = '1';
        
        setTimeout(() => {
            element.style.opacity = '0';
            setTimeout(() => {
                let nextIndex = (index + 1) % notesArray.length;
                if (element.id === 'affordability-note') {
                    affordabilityIndex = nextIndex;
                    cycleNotes(element, notesArray, affordabilityIndex);
                } else {
                    rentBuyIndex = nextIndex;
                    cycleNotes(element, notesArray, rentBuyIndex);
                }
            }, 1500);
        }, 4000);
    }

    cycleNotes(affordabilityNoteEl, affordabilityNotes, affordabilityIndex);
    setTimeout(() => {
        cycleNotes(rentBuyNoteEl, rentBuyNotes, rentBuyIndex);
    }, 2000);
});