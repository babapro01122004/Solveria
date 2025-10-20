document.addEventListener('DOMContentLoaded', function () {

    // Debounce function
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const subtitleSpans = document.querySelectorAll('.hero-subtitle span');
    let currentSubtitleIndex = 0;
    if (subtitleSpans.length > 0) {
        setInterval(() => {
            const currentSpan = subtitleSpans[currentSubtitleIndex];
            if (currentSpan) currentSpan.classList.remove('visible');
            
            currentSubtitleIndex = (currentSubtitleIndex + 1) % subtitleSpans.length;
            const nextSpan = subtitleSpans[currentSubtitleIndex];
            
            setTimeout(() => {
                if (nextSpan) nextSpan.classList.add('visible');
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
        if (!scrollTextEl || !scrollPromptEl) return;
        scrollTextEl.classList.remove('visible');
        setTimeout(() => {
            scrollIndex = (scrollIndex + 1) % scrollPhrases.length;
            scrollTextEl.textContent = scrollPhrases[scrollIndex];
            const newWidth = scrollPromptEl.offsetWidth;
            // Ensure transform only happens if width is valid
            if (newWidth > 0) {
                 scrollPromptEl.style.transform = `translateX(-${newWidth / 2}px)`;
            }
            setTimeout(() => {
                scrollTextEl.classList.add('visible');
            }, moveTime);
        }, subtitleFadeTime);
        setTimeout(cycleScrollText, subtitleDisplayTime + subtitleFadeTime + moveTime + subtitleFadeTime);
    }

    function initScrollPrompt() {
         if (!scrollTextEl || !scrollPromptEl) return;
         // Delay slightly to ensure layout is stable for offsetWidth
         setTimeout(() => {
            scrollTextEl.textContent = scrollPhrases[0];
            const initialWidth = scrollPromptEl.offsetWidth;
            if (initialWidth > 0) {
                scrollPromptEl.style.transform = `translateX(-${initialWidth / 2}px)`;
            }
            scrollTextEl.classList.add('visible');
            setTimeout(cycleScrollText, subtitleDisplayTime);
         }, 100); // Small delay
    }
    
    if (scrollPromptEl && scrollTextEl) {
        initScrollPrompt();
        scrollPromptEl.addEventListener('click', () => {
             const mainContent = document.getElementById('main-content');
             if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
             }
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
        if (spans.length < 2) return; // Need at least 2 to cycle

        let currentIndex = 0;
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].classList.contains('visible')) {
                currentIndex = i;
                break;
            }
        }
        
        const animationInterval = 4000;
        const fadeDuration = 1000;
        const delay = (animationInterval / 2) * index;

        setTimeout(() => {
            setInterval(() => {
                spans[currentIndex].classList.remove('visible');
                currentIndex = (currentIndex + 1) % spans.length;
                setTimeout(() => {
                    spans[currentIndex].classList.add('visible');
                }, fadeDuration); // Wait for fade out before fading in
            }, animationInterval);
        }, delay);
    });

    let paymentsLineChart;
    
    const getOrCreateTooltip = (chart) => {
        let tooltipEl = document.getElementById('chartTooltip');
        // Create element if it doesn't exist (should be in HTML though)
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartTooltip';
            tooltipEl.className = 'chart-tooltip';
            document.body.appendChild(tooltipEl);
        }
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
        // Sort Buy before Rent
        const sortedDataPoints = [...tooltip.dataPoints].sort((a, b) => {
            if (a.dataset.label === 'Buy') return -1;
            if (b.dataset.label === 'Buy') return 1;
            return 0; // Should not happen with only Buy/Rent
        });

        sortedDataPoints.forEach(dataPoint => {
            const label = dataPoint.dataset.label;
            const value = dataPoint.formattedValue;
            // Use datasetIndex safely
            const colors = tooltip.labelColors && tooltip.labelColors[dataPoint.datasetIndex] ? tooltip.labelColors[dataPoint.datasetIndex] : { borderColor: '#ccc' };
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
            tdValue.innerText = `${value}/month`; // Add /month suffix
            tr.appendChild(tdValue);

            tableBody.appendChild(tr);
        });

        tooltipEl.innerHTML = ''; // Clear previous content
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tooltipEl.appendChild(table);

        // Positioning logic (simplified for brevity, use previous robust version if needed)
        const { offsetLeft: chartLeft, offsetTop: chartTop } = chart.canvas;
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = chartLeft + tooltip.caretX + 'px';
        tooltipEl.style.top = chartTop + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

        // Robust Positioning Logic (from previous example, adjust as needed)
        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipEl;
        const chartRect = chart.canvas.getBoundingClientRect();
        const yOffset = 15; // Vertical space from the cursor

        const caretAbsX = chartRect.left + window.scrollX + tooltip.caretX;
        const caretAbsY = chartRect.top + window.scrollY + tooltip.caretY;

        let finalTop = caretAbsY + yOffset;
        if (finalTop + tooltipHeight > window.innerHeight + window.scrollY) {
            finalTop = caretAbsY - tooltipHeight - yOffset;
        }
        if (finalTop < window.scrollY) { // Prevent going above viewport top
            finalTop = window.scrollY;
        }

        let finalLeft;
        const leftEdge = window.scrollX;
        const rightEdge = window.scrollX + window.innerWidth;
        const posRight = caretAbsX; 
        const posLeft = caretAbsX - tooltipWidth; 
        const posCenter = caretAbsX - (tooltipWidth / 2); 

        if (posRight + tooltipWidth <= rightEdge) { finalLeft = posRight; } 
        else if (posLeft >= leftEdge) { finalLeft = posLeft; } 
        else { 
            finalLeft = posCenter;
            if (finalLeft < leftEdge) finalLeft = leftEdge;
            if (finalLeft + tooltipWidth > rightEdge) finalLeft = rightEdge - tooltipWidth;
        }
                
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = finalLeft + 'px';
        tooltipEl.style.top = finalTop + 'px';
    };
    
    // Setup Custom Select for Filing Status
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
            runCalculations(); // Recalculate when status changes
        };

        trigger.addEventListener('click', () => container.classList.toggle('open'));
        options.forEach(option => option.addEventListener('click', () => handleOptionClick(option)));
        
        // Set initial selected state
        const defaultOption = container.querySelector(`.custom-option[data-value="${hiddenSelect.value || 'single'}"]`);
        if (defaultOption) {
             defaultOption.classList.add('selected');
             selectedDisplay.textContent = defaultOption.textContent;
        }

        // Close dropdown when clicking outside
        window.addEventListener('click', (e) => {
            if (!container.contains(e.target)) container.classList.remove('open');
        });
    }

    // --- Calculation Logic ---
    const allInputs = document.querySelectorAll('.form-container input[type="number"]');
    const resultsContainer = document.getElementById('results-container');
    const verdictEl = document.getElementById('result-verdict');
    const summaryEl = document.getElementById('result-summary-text');
    const barEl = document.getElementById('result-bar');
    const breakdownTables = document.getElementById('breakdown-tables');
    const chartCanvas = document.getElementById('paymentsChart');
    const greenColor = '#2ca86a';
    const redColor = '#d9534f'; 

    function alignLabelWrapping() {
        // ... (Keep the alignLabelWrapping function as it was) ...
         const labels = document.querySelectorAll('.breakdown-row span:first-child');
                
        labels.forEach(label => {
            if (!label.dataset.originalText) {
                label.dataset.originalText = label.innerText;
            }
            // Reset to original text before measuring
            label.innerHTML = label.dataset.originalText; 
        });

        let needsWrapping = false;
        let singleLineHeight = 0;

        if (labels.length > 0) {
            // Find a label likely to be single line or use the first one
            const baselineLabel = Array.from(labels).find(l => l.dataset.originalText && l.dataset.originalText.split(' ').length <= 3) || labels[0];
            singleLineHeight = baselineLabel.offsetHeight;
            
            // If height is 0, layout might not be ready, try again later or skip
            if(singleLineHeight === 0 && labels.length > 0) {
                // console.warn("Single line height is 0, skipping wrap alignment.");
                return; 
            }

            for (const label of labels) {
                 // Check if the current label's height is significantly larger (e.g., 1.5 times)
                 // than the baseline single line height. Added check for singleLineHeight > 0.
                if (singleLineHeight > 0 && label.offsetHeight > singleLineHeight * 1.5) { 
                    needsWrapping = true;
                    break;
                }
            }
        }

        if (needsWrapping) {
            labels.forEach(label => {
                const originalText = label.dataset.originalText;
                if (originalText) { // Ensure originalText exists
                    const words = originalText.split(' ');
                    if (words.length > 1) {
                        const lastWord = words.pop();
                        // Insert <br> for wrapping
                        label.innerHTML = `${words.join(' ')}<br>${lastWord}`; 
                    }
                }
            });
        }
    }


    function runCalculations() {
        // --- Get all input values (same as before) ---
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
            filingStatus: document.getElementById('filing-status').value || 'single', // Default if null
        };

        // --- Basic validation and error display (same as before) ---
        if (v.homePrice === 0 || v.rentalFee === 0 || v.loanTerm === 0) {
            verdictEl.textContent = 'Please fill in required details.';
            verdictEl.style.color = redColor;
            barEl.style.backgroundColor = redColor;
            summaryEl.innerHTML = 'Enter key values like Home Price, Monthly Rent, and Loan Term to see your results.';
            if(breakdownTables) breakdownTables.style.display = 'none';
            if(chartCanvas) chartCanvas.style.display = 'none'; // Hide chart on error
            resultsContainer.style.display = 'block';
            return;
        }
        if(breakdownTables) breakdownTables.style.display = 'grid'; // Use grid for display
        if(chartCanvas) chartCanvas.style.display = 'block'; // Show chart on success

        // --- Core Calculation Logic (same as before) ---
        const yearsToCompare = v.loanTerm > 15 ? 15 : v.loanTerm; // Compare up to 15 years or loan term
        const monthsToCompare = yearsToCompare * 12;
        const loanAmount = Math.max(0, v.homePrice - v.downPayment);
        const monthlyInterestRate = v.interestRate / 12;
        const totalPayments = v.loanTerm * 12;
        const monthlyMortgage = loanAmount > 0 && monthlyInterestRate > 0 ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1) 
                              : loanAmount > 0 ? loanAmount / totalPayments // Handle 0% interest
                              : 0; 
        
        // Tax Savings Calculation (same as before)
        const standardDeductions = { single: 14600, married: 29200, married_separately: 14600, hoh: 21900, widow: 29200 };
        const standardDeduction = standardDeductions[v.filingStatus];
        let totalTaxSavings = 0; let yearlyPropertyTax = v.propertyTax; let amortizingBalance = loanAmount;
        for (let year = 1; year <= yearsToCompare; year++) {
            let interestThisYear = 0; let principalThisYear = 0;
            for (let month = 1; month <= 12; month++) {
                let interestForMonth = amortizingBalance * monthlyInterestRate;
                let principalForMonth = monthlyMortgage > 0 ? monthlyMortgage - interestForMonth : 0;
                // Ensure principal doesn't exceed balance
                principalForMonth = Math.min(principalForMonth, amortizingBalance);
                interestForMonth = monthlyMortgage - principalForMonth; // Recalculate interest based on actual principal

                interestThisYear += interestForMonth;
                principalThisYear += principalForMonth;
                amortizingBalance -= principalForMonth;
            }
            const itemizedDeductions = interestThisYear + yearlyPropertyTax;
            const taxableDeduction = Math.max(0, itemizedDeductions - standardDeduction);
            totalTaxSavings += taxableDeduction * (v.fedTax + v.stateTax);
            yearlyPropertyTax *= (1 + v.taxIncrease);
        }
        const avgMonthlyTaxSaving = totalTaxSavings / monthsToCompare;

        // Buy Scenario Totals (same logic, added checks)
        let totalInterestPaid = 0, totalMaintenance = 0, totalPropertyTax = 0, totalPrincipalPaid = 0, totalPmiPaid = 0;
        let remainingBalance = loanAmount, currentHomeValue = v.homePrice;
        let currentAnnualPropertyTax = v.propertyTax, currentAnnualMaintenance = v.maintenance, currentAnnualInsurance = v.homeInsurance, currentAnnualHoa = v.hoaFee;
        const downPaymentPercentage = v.homePrice > 0 ? v.downPayment / v.homePrice : 1; // Avoid division by zero
        let isPmiActive = downPaymentPercentage < 0.2 && v.pmiRate > 0 && loanAmount > 0;
        let pmiStopMonth = -1; 
        
        for (let month = 1; month <= monthsToCompare; month++) {
            let interestForMonth = remainingBalance * monthlyInterestRate;
            let principalForMonth = monthlyMortgage > 0 ? monthlyMortgage - interestForMonth : 0;
            principalForMonth = Math.min(principalForMonth, remainingBalance); // Ensure principal doesn't exceed balance
            interestForMonth = monthlyMortgage - principalForMonth; // Recalculate interest

            totalInterestPaid += interestForMonth;
            totalPrincipalPaid += principalForMonth;
            remainingBalance -= principalForMonth;

            // PMI Calculation
            if (isPmiActive) {
                const currentEquityPercentage = v.homePrice > 0 ? (v.homePrice - remainingBalance) / v.homePrice : 1;
                if (currentEquityPercentage >= 0.2) {
                    isPmiActive = false;
                     pmiStopMonth = month;
                } else {
                    totalPmiPaid += (loanAmount * v.pmiRate) / 12;
                }
            }

            // Update yearly costs at end of each year (month % 12 === 0)
            if (month % 12 === 0) {
                 const yearIndex = month / 12;
                 // Appreciation applied annually
                 currentHomeValue = v.homePrice * Math.pow(1 + v.appreciation, yearIndex); 

                 totalPropertyTax += currentAnnualPropertyTax;
                 totalMaintenance += currentAnnualMaintenance;

                 currentAnnualPropertyTax *= (1 + v.taxIncrease);
                 currentAnnualInsurance *= (1 + v.costIncrease);
                 currentAnnualHoa *= (1 + v.costIncrease); // Assuming HOA increases too
                 currentAnnualMaintenance *= (1 + v.costIncrease);
            }
        }
        
        // Adjust home value for the comparison period
        currentHomeValue = v.homePrice * Math.pow(1 + v.appreciation, yearsToCompare);
        const finalSellingCost = currentHomeValue * v.sellingCosts;
        const buyNetWorth = currentHomeValue - remainingBalance - finalSellingCost;
        // Total cost calculation needs refinement to use *actual* annual costs paid over the period
        // Simple approximation:
        const totalInsurancePaid = v.homeInsurance * yearsToCompare; // Simplified - needs compounding
        const totalHoaPaid = v.hoaFee * yearsToCompare; // Simplified - needs compounding
        // Recalculate totalPropertyTax and totalMaintenance accurately over the period
        totalPropertyTax = 0; totalMaintenance = 0;
        let tempTax = v.propertyTax, tempMaint = v.maintenance;
        for (let y = 0; y < yearsToCompare; y++) {
            totalPropertyTax += tempTax;
            totalMaintenance += tempMaint;
            tempTax *= (1 + v.taxIncrease);
            tempMaint *= (1 + v.costIncrease);
        }
        
        const totalPropertyCost = v.downPayment + v.buyingCosts + totalPrincipalPaid + totalInterestPaid + totalMaintenance + totalPropertyTax + totalInsurancePaid + totalHoaPaid + totalPmiPaid - totalTaxSavings;


        // Rent Scenario Totals (same logic)
        const initialInvestment = Math.max(0, (v.downPayment + v.buyingCosts) - (v.securityDeposit + v.upfrontRentCost));
        let investmentValue = initialInvestment;
        let currentMonthlyRent = v.rentalFee;
        let totalRentPaid = 0;
        let totalAmountInvested = initialInvestment; // Start with the difference
        let currentAnnualRentInsurance = v.renterInsurance;
        let totalRentInsurancePaid = 0;

        // Reset buy-side costs for monthly comparison within rent loop
        remainingBalance = loanAmount; // Reset for accurate monthly comparison
        currentAnnualPropertyTax = v.propertyTax;
        currentAnnualInsurance = v.homeInsurance;
        currentAnnualHoa = v.hoaFee;
        currentAnnualMaintenance = v.maintenance;
        isPmiActive = downPaymentPercentage < 0.2 && v.pmiRate > 0 && loanAmount > 0; // Reset PMI status


        for (let month = 1; month <= monthsToCompare; month++) {
            // Grow investment from previous month
            investmentValue *= (1 + v.investmentReturn / 12); 

            // Calculate monthly buy costs accurately for THIS month
            const monthlyTax = currentAnnualPropertyTax / 12;
            const monthlyInsurance = currentAnnualInsurance / 12;
            const monthlyHoa = currentAnnualHoa / 12;
            const monthlyMaint = currentAnnualMaintenance / 12;
            
            // Recalculate PMI status based on remaining balance
            let monthlyPmiCost = 0;
            if (isPmiActive) {
                // Calculate equity based on *current* estimated home value if needed, or original price
                // Using original price for simplicity as appreciation isn't guaranteed monthly
                 const currentEquityPercentage = v.homePrice > 0 ? (v.homePrice - remainingBalance) / v.homePrice : 1;
                if (currentEquityPercentage >= 0.2) {
                    isPmiActive = false;
                } else {
                    monthlyPmiCost = (loanAmount * v.pmiRate) / 12;
                }
            }
             // Update remaining balance for PMI check next month (moved from buy loop)
             let interestForMonth = remainingBalance * monthlyInterestRate;
             let principalForMonth = monthlyMortgage > 0 ? monthlyMortgage - interestForMonth : 0;
             principalForMonth = Math.min(principalForMonth, remainingBalance);
             remainingBalance -= principalForMonth;


            const monthlyBuyOutlay = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyHoa + monthlyMaint + monthlyPmiCost;
            
            // Calculate monthly rent costs for THIS month
            const monthlyRentInsurance = currentAnnualRentInsurance / 12;
            const monthlyRentOutlay = currentMonthlyRent + monthlyRentInsurance;
            totalRentPaid += currentMonthlyRent;
            totalRentInsurancePaid += monthlyRentInsurance;

            // Difference saved/spent by renting vs buying THIS month
            const savedAmount = monthlyBuyOutlay - monthlyRentOutlay - avgMonthlyTaxSaving; // Include avg tax saving difference
            
            // Add saved amount to investment
            investmentValue += savedAmount;
            totalAmountInvested += savedAmount; // Track total contributions

            // Update yearly costs/rent at the end of each year
            if (month % 12 === 0) {
                currentMonthlyRent *= (1 + v.rentalIncrease);
                currentAnnualRentInsurance *= (1 + v.costIncrease); // Assume rent insurance increases
                // Update buy-side annual costs for next year's monthly calculation
                currentAnnualPropertyTax *= (1 + v.taxIncrease);
                currentAnnualInsurance *= (1 + v.costIncrease);
                currentAnnualHoa *= (1 + v.costIncrease); 
                currentAnnualMaintenance *= (1 + v.costIncrease);
            }
        }
        
        const rentNetWorth = investmentValue + v.securityDeposit; // Add back security deposit
        const totalRentalCost = v.securityDeposit + v.upfrontRentCost + totalRentPaid + totalRentInsurancePaid;
        const investmentGrowth = rentNetWorth - totalAmountInvested - v.securityDeposit; // Growth is final value minus contributions minus deposit

        // --- Update UI (same as before) ---
        const difference = buyNetWorth - rentNetWorth;
        const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        const betterOffAmount = currencyFormatter.format(Math.abs(difference));
        
        verdictEl.style.color = greenColor; 
        barEl.style.backgroundColor = greenColor;
        if (difference > 0) {
            verdictEl.textContent = 'Buying is better than renting.';
            summaryEl.innerHTML = `After ${yearsToCompare} years, buying is estimated to leave you <strong>${betterOffAmount}</strong> better off than renting.`;
        } else if (difference < 0) {
            verdictEl.textContent = 'Renting is better than buying.';
             summaryEl.innerHTML = `After ${yearsToCompare} years, renting is estimated to leave you <strong>${betterOffAmount}</strong> better off than buying.`;
        } else {
             verdictEl.textContent = 'Buying and renting are roughly equivalent.';
             summaryEl.innerHTML = `After ${yearsToCompare} years, the financial outcome is estimated to be very similar for buying and renting.`;
        }
        
        // Update breakdown tables (using the corrected totals)
        document.getElementById('buy-total-value').textContent = currencyFormatter.format(currentHomeValue);
        document.getElementById('buy-total-cost').textContent = currencyFormatter.format(totalPropertyCost);
        document.getElementById('buy-total-benefit').textContent = currencyFormatter.format(buyNetWorth);
        document.getElementById('buy-down-payment').textContent = currencyFormatter.format(v.downPayment);
        document.getElementById('buy-initial-expenses').textContent = currencyFormatter.format(v.buyingCosts);
        document.getElementById('buy-principal-paid').textContent = currencyFormatter.format(totalPrincipalPaid);
        document.getElementById('buy-interest-paid').textContent = currencyFormatter.format(totalInterestPaid);
        document.getElementById('buy-maintenance-paid').textContent = currencyFormatter.format(totalMaintenance); // Use accurate total
        document.getElementById('buy-tax-paid').textContent = currencyFormatter.format(totalPropertyTax); // Use accurate total
        document.getElementById('buy-tax-savings').textContent = currencyFormatter.format(totalTaxSavings);

        document.getElementById('rent-total-value').textContent = currencyFormatter.format(rentNetWorth);
        document.getElementById('rent-total-cost').textContent = currencyFormatter.format(totalRentalCost); // Use accurate total
        document.getElementById('rent-total-benefit').textContent = currencyFormatter.format(rentNetWorth); // Benefit is net worth
        document.getElementById('rent-security-deposit').textContent = currencyFormatter.format(v.securityDeposit);
        document.getElementById('rent-initial-expenses').textContent = currencyFormatter.format(v.upfrontRentCost);
        document.getElementById('rent-paid').textContent = currencyFormatter.format(totalRentPaid); // Use accurate total
        document.getElementById('rent-amount-invested').textContent = currencyFormatter.format(totalAmountInvested); // Use accurate total
        document.getElementById('rent-investment-growth').textContent = currencyFormatter.format(investmentGrowth); // Use accurate total

        resultsContainer.style.display = 'block';
        
        // --- Update Chart (same logic, using accurate monthly costs) ---
         const chartLabels = Array.from({ length: yearsToCompare }, (_, i) => `${i + 1}`);
         const buyData = [];
         const rentData = [];

         // Recalculate monthly costs year by year for the chart
         remainingBalance = loanAmount; // Reset balance for chart calculation
         currentAnnualPropertyTax = v.propertyTax;
         currentAnnualInsurance = v.homeInsurance;
         currentAnnualHoa = v.hoaFee;
         currentAnnualMaintenance = v.maintenance;
         currentMonthlyRent = v.rentalFee;
         currentAnnualRentInsurance = v.renterInsurance;
         isPmiActive = downPaymentPercentage < 0.2 && v.pmiRate > 0 && loanAmount > 0; // Reset PMI status

        for (let year = 1; year <= yearsToCompare; year++) {
             let avgMonthlyBuyCostYear = 0;
             let avgMonthlyRentCostYear = 0;
             
             for (let m = 1; m <= 12; m++) {
                 const monthIndex = (year - 1) * 12 + m;
                 // Buy costs for this month
                 const monthlyTax = currentAnnualPropertyTax / 12;
                 const monthlyInsurance = currentAnnualInsurance / 12;
                 const monthlyHoa = currentAnnualHoa / 12;
                 const monthlyMaint = currentAnnualMaintenance / 12;
                 let monthlyPmiCost = 0;
                 if (isPmiActive) {
                    const currentEquityPercentage = v.homePrice > 0 ? (v.homePrice - remainingBalance) / v.homePrice : 1;
                    if (currentEquityPercentage >= 0.2) { isPmiActive = false; } 
                    else { monthlyPmiCost = (loanAmount * v.pmiRate) / 12; }
                 }
                 avgMonthlyBuyCostYear += (monthlyMortgage + monthlyTax + monthlyInsurance + monthlyHoa + monthlyMaint + monthlyPmiCost - avgMonthlyTaxSaving); // Subtract avg tax saving

                 // Update balance for next month's PMI check
                 let interestForMonth = remainingBalance * monthlyInterestRate;
                 let principalForMonth = monthlyMortgage > 0 ? monthlyMortgage - interestForMonth : 0;
                 principalForMonth = Math.min(principalForMonth, remainingBalance);
                 remainingBalance -= principalForMonth;

                 // Rent costs for this month
                 const monthlyRentInsurance = currentAnnualRentInsurance / 12;
                 avgMonthlyRentCostYear += (currentMonthlyRent + monthlyRentInsurance);
             }

            // Average for the year
            buyData.push(avgMonthlyBuyCostYear / 12);
            rentData.push(avgMonthlyRentCostYear / 12);
             
            // Update annual costs for next year
            currentAnnualPropertyTax *= (1 + v.taxIncrease);
            currentAnnualInsurance *= (1 + v.costIncrease);
            currentAnnualHoa *= (1 + v.costIncrease); 
            currentAnnualMaintenance *= (1 + v.costIncrease);
            currentMonthlyRent *= (1 + v.rentalIncrease); // Apply rent increase annually
            currentAnnualRentInsurance *= (1 + v.costIncrease);
         }
                
        const ctx = chartCanvas.getContext('2d');
        if (paymentsLineChart) { paymentsLineChart.destroy(); } // Destroy existing chart

        // Create gradients (same as before)
        const buyGradient = ctx.createLinearGradient(0, 0, 0, 300);
        buyGradient.addColorStop(0, 'rgba(139, 69, 19, 0.6)'); buyGradient.addColorStop(1, 'rgba(139, 69, 19, 0)');
        const rentGradient = ctx.createLinearGradient(0, 0, 0, 300);
        rentGradient.addColorStop(0, 'rgba(210, 105, 30, 0.6)'); rentGradient.addColorStop(1, 'rgba(210, 105, 30, 0)');

        paymentsLineChart = new Chart(ctx, {
            type: 'line', 
            data: { 
                labels: chartLabels, 
                datasets: [
                    { label: 'Buy', data: buyData, borderColor: 'rgb(139, 69, 19)', backgroundColor: buyGradient, fill: true, tension: 0.4, pointRadius: 0 }, 
                    { label: 'Rent', data: rentData, borderColor: 'rgb(210, 105, 30)', backgroundColor: rentGradient, fill: true, tension: 0.4, pointRadius: 0 }
                ] 
            },
            options: {
                responsive: true, maintainAspectRatio: false, 
                interaction: { intersect: false, mode: 'index' },
                scales: {
                    y: { 
                        beginAtZero: false, // Don't force zero if costs are high
                        ticks: { callback: function(value) { return '$' + Math.round(value/1000) + 'k'; } } 
                    },
                    x: { 
                        title: { display: true, text: 'Years' },
                        grid: { display: false, drawBorder: false }
                    }
                },
                plugins: {
                    legend: { 
                        position: 'bottom', 
                        labels: { 
                            boxWidth: 15, boxHeight: 15, padding: 25, color: '#555', 
                            font: { size: 14 }, 
                            // Use Chart.js built-in label generation with color fill
                            usePointStyle: true, 
                            pointStyle: 'rectRounded'
                        } 
                    },
                    tooltip: { 
                        enabled: false, // Disable default tooltip
                        external: externalTooltipHandler, // Use custom handler
                        mode: 'index', // Show tooltips for all datasets at that index
                        intersect: false, // Show even if not directly hovering point
                        callbacks: {
                             // Format value in custom tooltip data
                            label: function(context) { 
                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(context.parsed.y);
                            }
                        }
                    }
                }
            }
        });
        
        // Add listener to hide tooltip on mouseout of canvas
         if (paymentsLineChart && paymentsLineChart.canvas) {
            paymentsLineChart.canvas.addEventListener('mouseout', () => {
                const tooltipEl = getOrCreateTooltip(paymentsLineChart);
                 if (tooltipEl) { tooltipEl.style.opacity = 0; }
            });
         }
        
        alignLabelWrapping(); // Align labels after results are rendered
    }

    // Create debounced version
    const debouncedRunCalculations = debounce(runCalculations, 300);

    // Attach debounced listener to all inputs
    allInputs.forEach(input => {
        input.addEventListener('input', debouncedRunCalculations);
    });
     // Attach direct listener to select change (doesn't need debounce)
     const filingStatusSelect = document.getElementById('filing-status');
     if (filingStatusSelect) {
         filingStatusSelect.addEventListener('change', runCalculations);
     }


    // Initial run
    runCalculations();
    alignLabelWrapping();
    window.addEventListener('resize', debounce(alignLabelWrapping, 200)); // Debounce resize handler
});