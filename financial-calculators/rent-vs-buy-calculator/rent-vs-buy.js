/*
PERFORMANCE FIX:
This is all your original JavaScript, moved to an external file
so it can be cached by the browser. It will be loaded with 'defer'
to ensure it doesn't block HTML parsing.
*/
document.addEventListener('DOMContentLoaded', function () {

    const subtitleSpans = document.querySelectorAll('.hero-subtitle span');
    let currentSubtitleIndex = 0;
    if (subtitleSpans.length > 0) {
        setInterval(() => {
            const currentSpan = subtitleSpans[currentSubtitleIndex];
            currentSpan.classList.remove('visible');

            currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitleSpans.length;
            const nextSpan = subtitleSpans[currentSubtitleIndex];

            setTimeout(() => {
                nextSpan.classList.add('visible');
            }, 1000);
        }, 4000);
    }

    const scrollPhrases = [
        "Your calculator awaits below",
        "Scroll down to calculate",
        "Begin your journey below",
        "Scroll down to calculate"
    ];
    const scrollPromptEl = document.getElementById('scroll-prompt');
    const scrollTextEl = document.getElementById('scroll-prompt-text');
    let scrollIndex = 0;
    const moveTime = 500;
    const subtitleDisplayTime = 3000;
    const subtitleFadeTime = 1000;

    function cycleScrollText() {
        if (!scrollTextEl) return;
        scrollTextEl.classList.remove('visible');
        setTimeout(() => {
            scrollIndex = (scrollIndex + 1) % scrollPhrases.length;
            scrollTextEl.textContent = scrollPhrases[scrollIndex];
            const newWidth = scrollPromptEl.offsetWidth;
            scrollPromptEl.style.transform = `translateX(-${newWidth / 2}px)`;
            setTimeout(() => {
                scrollTextEl.classList.add('visible');
            }, moveTime);
        }, subtitleFadeTime);
        setTimeout(cycleScrollText, subtitleDisplayTime + subtitleFadeTime + moveTime + subtitleFadeTime);
    }

    function initScrollPrompt() {
        if (!scrollTextEl || !scrollPromptEl) return;
        scrollTextEl.textContent = scrollPhrases[0];
        // This line was causing the "forced reflow".
        // By running this whole function in a setTimeout, it's no longer a problem.
        const initialWidth = scrollPromptEl.offsetWidth;
        scrollPromptEl.style.transform = `translateX(-${initialWidth / 2}px)`;
        scrollTextEl.classList.add('visible');
        setTimeout(cycleScrollText, subtitleDisplayTime);
    }
    
    if (scrollPromptEl) {
        /*
        PERFORMANCE FIX (REFLOW):
        We wrap this call in a setTimeout. This moves it out of the
        initial execution path and prevents it from forcing a layout
        recalculation (reflow) before the first paint.
        */
        setTimeout(initScrollPrompt, 0);

        scrollPromptEl.addEventListener('click', () => {
            document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                scrollPromptEl.classList.add('hidden');
            } else {
                scrollPromptEl.classList.remove('hidden');
            }
        });
    }

    const toolSubtitles = document.querySelectorAll('.tool-subtitle');
    toolSubtitles.forEach((subtitleContainer, index) => {
        const spans = subtitleContainer.querySelectorAll('span');
        if (spans.length === 0) return;

        let currentIndex = 0;
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].classList.contains('visible')) {
                currentIndex = i;
                break;
            }
        }

        const animationInterval = 4000;
        const delay = (animationInterval / 2) * index;

        setTimeout(() => {
            setInterval(() => {
                spans[currentIndex].classList.remove('visible');
                currentIndex = (currentIndex + 1) % spans.length;
                setTimeout(() => {
                    spans[currentIndex].classList.add('visible');
                }, 1000);
            }, animationInterval);
        }, delay);
    });

    let paymentsLineChart;

    const getOrCreateTooltip = (chart) => {
        let tooltipEl = document.getElementById('chartTooltip');
        return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        const titleLines = tooltip.title || [];
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.colSpan = 3;
            th.classList.add('tooltip-title');
            th.innerText = `Year: ${title}`;
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        const sortedDataPoints = [...tooltip.dataPoints].sort((a, b) => {
            if (a.dataset.label === 'Buy') return -1;
            if (b.dataset.label === 'Buy') return 1;
            return 0;
        });

        sortedDataPoints.forEach(dataPoint => {
            const label = dataPoint.dataset.label;
            const value = dataPoint.formattedValue;
            const colors = tooltip.labelColors[dataPoint.datasetIndex];
            const tr = document.createElement('tr');
            tr.classList.add('tooltip-body-item');
            const tdColor = document.createElement('td');
            const colorBox = document.createElement('span');
            colorBox.classList.add('tooltip-color-box');
            colorBox.style.background = colors.borderColor;
            tdColor.appendChild(colorBox);
            tr.appendChild(tdColor);
            const tdLabel = document.createElement('td');
            tdLabel.classList.add('tooltip-label');
            tdLabel.innerText = `${label}:`;
            tr.appendChild(tdLabel);
            const tdValue = document.createElement('td');
            tdValue.classList.add('tooltip-value');
            tdValue.innerText = `${value}/month`;
            tr.appendChild(tdValue);
            tableBody.appendChild(tr);
        });

        tooltipEl.innerHTML = '';
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tooltipEl.appendChild(table);

        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipEl;
        const chartRect = chart.canvas.getBoundingClientRect();
        const yOffset = 15; // Vertical space from the cursor

        const caretAbsX = chartRect.left + window.scrollX + tooltip.caretX;
        const caretAbsY = chartRect.top + window.scrollY + tooltip.caretY;

        let finalTop = caretAbsY + yOffset;
        if (finalTop + tooltipHeight > window.innerHeight + window.scrollY) {
            finalTop = caretAbsY - tooltipHeight - yOffset;
        }

        let finalLeft;
        const leftEdge = window.scrollX;
        const rightEdge = window.scrollX + window.innerWidth;
        const posRight = caretAbsX;
        const posLeft = caretAbsX - tooltipWidth;
        const posCenter = caretAbsX - (tooltipWidth / 2);

        if (posRight + tooltipWidth <= rightEdge) {
            finalLeft = posRight;
        } else if (posLeft >= rightEdge) {
            finalLeft = posLeft;
        } else {
            finalLeft = posCenter;
            if (finalLeft < leftEdge) {
                finalLeft = leftEdge;
            }
            if (finalLeft + tooltipWidth > rightEdge) {
                finalLeft = rightEdge - tooltipWidth;
            }
        }

        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = finalLeft + 'px';
        tooltipEl.style.top = finalTop + 'px';
    };

    const container = document.querySelector('.custom-select-container');
    if (container) {
        const trigger = container.querySelector('.select-trigger');
        const options = container.querySelectorAll('.custom-option');
        const hiddenSelect = container.querySelector('#filing-status');
        const selectedDisplay = trigger.querySelector('span');
        const handleOptionClick = (option) => {
            selectedDisplay.textContent = option.textContent;
            hiddenSelect.value = option.getAttribute('data-value');
            container.classList.remove('open');
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            runCalculations();
        };
        trigger.addEventListener('click', () => container.classList.toggle('open'));
        options.forEach(option => option.addEventListener('click', () => handleOptionClick(option)));
        const defaultOption = container.querySelector('.custom-option[data-value="single"]');
        if (defaultOption) defaultOption.classList.add('selected');
        window.addEventListener('click', (e) => {
            if (!container.contains(e.target)) container.classList.remove('open');
        });
    }

    const allInputs = document.querySelectorAll('input[type="number"]');
    allInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = parseFloat(e.target.value);
            const max = parseFloat(e.target.max);
            if (value < 0) e.target.value = 0;
            if (max && value > max) e.target.value = max;
            runCalculations();
        });
    });

    function alignLabelWrapping() {
        const labels = document.querySelectorAll('.breakdown-row span:first-child');
        labels.forEach(label => {
            if (!label.dataset.originalText) {
                label.dataset.originalText = label.innerText;
            }
            label.innerHTML = label.dataset.originalText;
        });

        let needsWrapping = false;
        let singleLineHeight = 0;

        if (labels.length > 0) {
            const baselineLabel = Array.from(labels).find(l => l.dataset.originalText.split(' ').length <= 2) || labels[0];
            singleLineHeight = baselineLabel.offsetHeight;
            if(singleLineHeight === 0) return;

            for (const label of labels) {
                if (label.offsetHeight > singleLineHeight * 1.5) {
                    needsWrapping = true;
                    break;
                }
            }
        }

        if (needsWrapping) {
            labels.forEach(label => {
                const originalText = label.dataset.originalText;
                const words = originalText.split(' ');
                if (words.length > 1) {
                    const lastWord = words.pop();
                    label.innerHTML = `${words.join(' ')}<br>${lastWord}`;
                }
            });
        }
    }

    function runCalculations() {
        // Ensure Chart.js is loaded before trying to use it
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded yet. Skipping calculation.');
            return;
        }

        const v = {
            homePrice: parseFloat(document.getElementById('home-price').value) || 0,
            downPayment: parseFloat(document.getElementById('down-payment').value) || 0,
            interestRate: (parseFloat(document.getElementById('interest-rate').value) || 0) / 100,
            loanTerm: parseInt(document.getElementById('loan-term').value) || 0,
            pmiRate: (parseFloat(document.getElementById('pmi-rate').value) || 0) / 100,
            buyingCosts: parseFloat(document.getElementById('buying-costs').value) || 0,
            propertyTax: parseFloat(document.getElementById('property-tax').value) || 0,
            taxIncrease: (parseFloat(document.getElementById('tax-increase').value) || 0) / 100,
            homeInsurance: parseFloat(document.getElementById('home-insurance').value) || 0,
            hoaFee: parseFloat(document.getElementById('hoa-fee').value) || 0,
            maintenance: parseFloat(document.getElementById('maintenance').value) || 0,
            appreciation: (parseFloat(document.getElementById('appreciation').value) || 0) / 100,
            costIncrease: (parseFloat(document.getElementById('cost-increase').value) || 0) / 100,
            sellingCosts: (parseFloat(document.getElementById('selling-costs').value) || 0) / 100,
            rentalFee: parseFloat(document.getElementById('rental-fee').value) || 0,
            rentalIncrease: (parseFloat(document.getElementById('rental-increase').value) || 0) / 100,
            renterInsurance: parseFloat(document.getElementById('renter-insurance').value) || 0,
            securityDeposit: parseFloat(document.getElementById('security-deposit').value) || 0,
            upfrontRentCost: parseFloat(document.getElementById('upfront-cost').value) || 0,
            investmentReturn: (parseFloat(document.getElementById('investment-return').value) || 0) / 100,
            fedTax: (parseFloat(document.getElementById('fed-tax').value) || 0) / 100,
            stateTax: (parseFloat(document.getElementById('state-tax').value) || 0) / 100,
            filingStatus: document.getElementById('filing-status').value,
        };

        const resultsContainer = document.getElementById('results-container');
        const verdictEl = document.getElementById('result-verdict');
        const summaryEl = document.getElementById('result-summary-text');
        const barEl = document.getElementById('result-bar');
        const breakdownTables = document.getElementById('breakdown-tables');
        const greenColor = '#2ca86a';
        const redColor = '#d9534f';

        if (!resultsContainer || !verdictEl || !summaryEl || !barEl) return;

        if (v.homePrice === 0 || v.rentalFee === 0) {
            verdictEl.textContent = 'Please fill in all required details.';
            verdictEl.style.color = redColor;
            barEl.style.backgroundColor = redColor;
            summaryEl.innerHTML = 'Enter key values like Home Price and Monthly Rent to see your results.';
            if(breakdownTables) breakdownTables.style.display = 'none';
            resultsContainer.style.display = 'block';
            return;
        }
        if(breakdownTables) breakdownTables.style.display = '';

        const yearsToCompare = 15;
        const monthsToCompare = yearsToCompare * 12;
        const loanAmount = v.homePrice - v.downPayment;
        const monthlyInterestRate = v.interestRate / 12;
        const totalPayments = v.loanTerm * 12;
        const monthlyMortgage = loanAmount > 0 ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1) : 0;

        const standardDeductions = {
            single: 14600, married: 29200, married_separately: 14600, hoh: 21900, widow: 29200
        };
        const standardDeduction = standardDeductions[v.filingStatus];
        let totalTaxSavings = 0;
        let yearlyPropertyTax = v.propertyTax;
        let amortizingBalance = loanAmount;
        for (let year = 1; year <= yearsToCompare; year++) {
            let interestThisYear = 0;
            for (let month = 1; month <= 12; month++) {
                let interestForMonth = amortizingBalance * monthlyInterestRate;
                interestThisYear += interestForMonth;
                let principalForMonth = monthlyMortgage - interestForMonth;
                amortizingBalance -= principalForMonth;
            }
            const itemizedDeductions = interestThisYear + yearlyPropertyTax;
            const taxableDeduction = Math.max(0, itemizedDeductions - standardDeduction);
            totalTaxSavings += taxableDeduction * (v.fedTax + v.stateTax);
            yearlyPropertyTax *= (1 + v.taxIncrease);
        }
        const avgMonthlyTaxSaving = totalTaxSavings / monthsToCompare;

        let totalInterestPaid = 0, totalMaintenance = 0, totalPropertyTax = 0, totalPrincipalPaid = 0;
        let remainingBalance = loanAmount, currentHomeValue = v.homePrice, currentPropertyTax = v.propertyTax, currentMaintenance = v.maintenance;
        for (let month = 1; month <= monthsToCompare; month++) {
            const interestForMonth = remainingBalance * monthlyInterestRate;
            totalInterestPaid += interestForMonth;
            const principalForMonth = monthlyMortgage - interestForMonth;
            remainingBalance -= principalForMonth;
            if (month % 12 === 0) {
                currentHomeValue *= (1 + v.appreciation);
                totalMaintenance += currentMaintenance;
                totalPropertyTax += currentPropertyTax;
                currentPropertyTax *= (1 + v.taxIncrease);
                currentMaintenance *= (1 + v.costIncrease);
            }
        }
        totalPrincipalPaid = loanAmount - remainingBalance;
        const finalSellingCost = currentHomeValue * v.sellingCosts;
        const buyNetWorth = currentHomeValue - remainingBalance - final.sellingCosts;
        const totalPropertyCost = v.downPayment + v.buyingCosts + totalPrincipalPaid + totalInterestPaid + totalMaintenance + totalPropertyTax;

        const initialInvestment = (v.downPayment + v.buyingCosts) - (v.securityDeposit + v.upfrontRentCost);
        let investmentValue = initialInvestment > 0 ? initialInvestment : 0;
        let currentRentalFee = v.rentalFee, totalRentPaid = 0, totalAmountInvested = initialInvestment, totalSavedMonthly = 0;
        const downPaymentPercentage = v.homePrice > 0 ? v.downPayment / v.homePrice : 0;
        let monthlyPmi = (downPaymentPercentage < 0.2 && v.pmiRate > 0) ? (loanAmount * v.pmiRate) / 12 : 0;
        for (let month = 1; month <= monthsToCompare; month++) {
            investmentValue *= (1 + v.investmentReturn / 12);
            const monthlyBuyCosts = monthlyMortgage + (v.propertyTax / 12) + (v.homeInsurance / 12) + (v.hoaFee / 12) + (v.maintenance / 12) + monthlyPmi - avgMonthlyTaxSaving;
            const monthlyRentCosts = currentRentalFee + (v.renterInsurance / 12);
            const savedAmount = monthlyBuyCosts - monthlyRentCosts;
            investmentValue += savedAmount;
            totalSavedMonthly += savedAmount;
            totalRentPaid += currentRentalFee;
            if (month % 12 === 0) currentRentalFee *= (1 + v.rentalIncrease);
        }
        totalAmountInvested += totalSavedMonthly > 0 ? totalSavedMonthly : 0;
        const rentNetWorth = investmentValue + v.securityDeposit;
        const totalRentalCost = v.securityDeposit + v.upfrontRentCost + totalRentPaid;
        const investmentGrowth = rentNetWorth - totalAmountInvested - v.securityDeposit;

        const difference = buyNetWorth - rentNetWorth;
        const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        const betterOffAmount = currencyFormatter.format(Math.abs(difference));
        verdictEl.style.color = greenColor;
        barEl.style.backgroundColor = greenColor;
        if (difference > 0) {
            verdictEl.textContent = 'Buying is better than renting.';
            summaryEl.innerHTML = `After ${yearsToCompare} years, buying will leave you <strong>${betterOffAmount}</strong> better off than renting.`;
        } else {
            verdictEl.textContent = 'Renting is better than buying.';
            summaryEl.innerHTML = `After ${yearsToCompare} years, renting will leave you <strong>${betterOffAmount}</strong> better off than buying.`;
        }

        document.getElementById('buy-total-value').textContent = currencyFormatter.format(currentHomeValue);
        document.getElementById('buy-total-cost').textContent = currencyFormatter.format(totalPropertyCost);
        document.getElementById('buy-total-benefit').textContent = currencyFormatter.format(buyNetWorth);
        document.getElementById('buy-down-payment').textContent = currencyFormatter.format(v.downPayment);
        document.getElementById('buy-initial-expenses').textContent = currencyFormatter.format(v.buyingCosts);
        document.getElementById('buy-principal-paid').textContent = currencyFormatter.format(totalPrincipalPaid);
        document.getElementById('buy-interest-paid').textContent = currencyFormatter.format(totalInterestPaid);
        document.getElementById('buy-maintenance-paid').textContent = currencyFormatter.format(totalMaintenance);
        document.getElementById('buy-tax-paid').textContent = currencyFormatter.format(totalPropertyTax);
        document.getElementById('buy-tax-savings').textContent = currencyFormatter.format(totalTaxSavings);

        document.getElementById('rent-total-value').textContent = currencyFormatter.format(rentNetWorth);
        document.getElementById('rent-total-cost').textContent = currencyFormatter.format(totalRentalCost);
        document.getElementById('rent-total-benefit').textContent = currencyFormatter.format(rentNetWorth);
        document.getElementById('rent-security-deposit').textContent = currencyFormatter.format(v.securityDeposit);
        document.getElementById('rent-initial-expenses').textContent = currencyFormatter.format(v.upfrontRentCost);
        document.getElementById('rent-paid').textContent = currencyFormatter.format(totalRentPaid);
        document.getElementById('rent-amount-invested').textContent = currencyFormatter.format(totalAmountInvested);
        document.getElementById('rent-investment-growth').textContent = currencyFormatter.format(investmentGrowth);

        resultsContainer.style.display = 'block';

        const chartLabels = Array.from({ length: yearsToCompare }, (_, i) => `${i + 1}`);
        const buyData = [];
        const rentData = [];
        let yearlyPtax = v.propertyTax, yearlyIns = v.homeInsurance, yearlyMaint = v.maintenance, yearlyRent = v.rentalFee * 12;
        for (let i = 0; i < yearsToCompare; i++) {
            const monthlyBuyCost = monthlyMortgage + (yearlyPtax / 12) + (yearlyIns / 12) + (v.hoaFee / 12) + (yearlyMaint / 12) + monthlyPmi;
            const monthlyRentCost = (yearlyRent / 12) + (v.renterInsurance / 12);
            buyData.push(monthlyBuyCost); rentData.push(monthlyRentCost);
            yearlyPtax *= (1 + v.taxIncrease); yearlyIns *= (1 + v.costIncrease); yearlyMaint *= (1 + v.costIncrease); yearlyRent *= (1 + v.rentalIncrease);
        }

        const ctx = document.getElementById('paymentsChart').getContext('2d');
        if (paymentsLineChart) { paymentsLineChart.destroy(); }

        const buyGradient = ctx.createLinearGradient(0, 0, 0, 300);
        buyGradient.addColorStop(0, 'rgba(139, 69, 19, 0.6)'); buyGradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
        const rentGradient = ctx.createLinearGradient(0, 0, 0, 300);
        rentGradient.addColorStop(0, 'rgba(210, 105, 30, 0.6)'); rentGradient.addColorStop(1, 'rgba(210, 105, 30, 0)');

        paymentsLineChart = new Chart(.ctx, {
            type: 'line', data: { labels: chartLabels, datasets: [{ label: 'Buy', data: buyData, borderColor: 'rgb(139, 69, 19)', backgroundColor: buyGradient, fill: true, tension: 0.4, pointRadius: 0 }, { label: 'Rent', data: rentData, borderColor: 'rgb(210, 105, 30)', backgroundColor: rentGradient, fill: true, tension: 0.4, pointRadius: 0 }] },
            options: {
                responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: function(value) { return '$' + Math.round(value/1000) + 'k'; } } },
                    x: {
                        title: { display: true, text: 'Years' },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 15, boxHeight: 15, padding: 25, color: '#555', font: { size: 14 }, generateLabels: function(chart) { const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart); labels.forEach(l => { l.fillStyle = l.strokeStyle; }); return labels; } } },
                    tooltip: {
                        enabled: false,
                        external: externalTooltipHandler,
                        callbacks: {
                            label: function(context) {
                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.parsed.y);
                            }
                        }
                    }
                }
            }
        });

        paymentsLineChart.canvas.addEventListener('mouseout', () => {
            const tooltipEl = getOrCreateTooltip(paymentsLineChart);
            tooltipEl.style.opacity = 0;
        });

        alignLabelWrapping();
    }
    
    runCalculations(); 

    alignLabelWrapping();
    window.addEventListener('resize', alignLabelWrapping);
});
