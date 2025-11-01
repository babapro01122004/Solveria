document.addEventListener('DOMContentLoaded', () => {

    // --- CHART LOGIC REMOVED ---

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
        // Main Summary Grid
        homePrice: document.getElementById('resultHomePrice'),
        monthlyPayment: document.getElementById('resultMonthlyPayment'),
        loanAmount: document.getElementById('resultLoanAmount'),
        totalClosing: document.getElementById('resultTotalClosing'),
        summaryText: document.getElementById('resultSummaryText'),

        // One-Time Costs
        outDownPayment: document.getElementById('outDownPayment'),
        outClosingCosts: document.getElementById('outClosingCosts'),
        outClosingCostsLabel: document.querySelector('#one-time-costs .result-item:nth-child(2) .label'),
        outTotalAtClosing: document.getElementById('outTotalAtClosing'),

        // Loan & Ratios
        outLoanAmount: document.getElementById('outLoanAmount'),
        outFrontDTI: document.getElementById('outFrontDTI'),
        outBackDTI: document.getElementById('outBackDTI'),

        // Annual Costs
        outPropertyTaxAnnually: document.getElementById('outPropertyTaxAnnually'),
        outInsuranceAnnually: document.getElementById('outInsuranceAnnually'),
        outHOAAnnually: document.getElementById('outHOAAnnually'),
        outMaintenanceAnnually: document.getElementById('outMaintenanceAnnually'),
        outMaintenanceAnnuallyLabel: document.querySelector('#annual-costs .result-item:nth-child(4) .label'),

        // Monthly Costs
        outMortgagePI: document.getElementById('outMortgagePI'),
        outPropertyTaxMonthly: document.getElementById('outPropertyTaxMonthly'),
        outInsuranceMonthly: document.getElementById('outInsuranceMonthly'),
        outHOAMonthly: document.getElementById('outHOAMonthly'),
        outMaintenanceMonthly: document.getElementById('outMaintenanceMonthly'),
        outMaintenanceMonthlyLabel: document.querySelector('#monthly-costs .result-item:nth-child(5) .label'),
        outTotalMonthly: document.getElementById('outTotalMonthly')
    };

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

    const calculatePAndI = (principal, annualRate, termYears) => {
        if (principal <= 0) return 0;
        if (annualRate <= 0) return principal / (termYears * 12);
        
        const monthlyRate = annualRate / 100 / 12;
        const numPayments = termYears * 12;
        
        if (numPayments <= 0) return 0;

        return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    // --- CHARTING FUNCTIONS REMOVED ---
    
    // --- Core Calculation ---
    const calculateAndDisplay = () => {
        // 1. Get all input values
        const annualIncome = parseFloat(allInputs.annualIncome.value) || 0;
        const monthlyDebt = parseFloat(allInputs.monthlyDebt.value) || 0;
        const maxFrontEndDTI = parseFloat(allInputs.maxFrontEndDTI.value) || 0;
        const maxBackEndDTI = parseFloat(allInputs.maxBackEndDTI.value) || 0;
        
        const downPayment = parseFloat(allInputs.downPayment.value) || 0;
        const loanTerm = parseFloat(allInputs.loanTerm.value) || 0;
        const interestRate = parseFloat(allInputs.interestRate.value) || 0;
        const closingCostsPercent = parseFloat(allInputs.closingCosts.value) || 0;
        
        const propTaxPercent = parseFloat(allInputs.propertyTax.value) || 0;
        const insurancePercent = parseFloat(allInputs.insurance.value) || 0;
        const hoaMonthly = parseFloat(allInputs.hoaFee.value) || 0;
        const maintenancePercent = parseFloat(allInputs.maintenance.value) || 0;

        // 2. Calculate DTI limits
        const monthlyIncome = annualIncome / 12;
        if (monthlyIncome === 0) {
            // Cannot calculate, reset and exit
            updateDOM(null);
            return;
        }
        
        const maxFrontEndPayment = monthlyIncome * (maxFrontEndDTI / 100);
        const maxBackEndPayment = monthlyIncome * (maxBackEndDTI / 100);
        
        const availableForHousing = maxBackEndPayment - monthlyDebt;
        
        // The *true* max payment is the lesser of the two constraints
        const totalAffordableMonthlyPayment = Math.max(0, Math.min(maxFrontEndPayment, availableForHousing));

        // 3. Solve for Home Price (H)
        // P&I + OtherCosts = totalAffordableMonthlyPayment
        // ((H - DP) * M) + (H * O) + HOA = totalAffordableMonthlyPayment
        // H*M - DP*M + H*O + HOA = totalAffordableMonthlyPayment
        // H*(M + O) = totalAffordableMonthlyPayment - HOA + DP*M
        // H = (totalAffordableMonthlyPayment - HOA + DP*M) / (M + O)

        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;
        
        let mortgageFactor; // The 'M' in the formula
        
        if (interestRate <= 0 || numPayments <= 0) {
            mortgageFactor = (numPayments > 0) ? (1 / numPayments) : 0;
        } else {
            mortgageFactor = (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        }

        const otherFactor = (propTaxPercent / 100 / 12) + (insurancePercent / 100 / 12) + (maintenancePercent / 100 / 12);
        
        let homePrice = 0;
        const numerator = totalAffordableMonthlyPayment - hoaMonthly + (downPayment * mortgageFactor);
        const denominator = mortgageFactor + otherFactor;

        if (denominator > 0) {
            homePrice = numerator / denominator;
        }

        // 4. Handle edge case: Down payment is more than the home price
        if (homePrice < downPayment) {
            homePrice = downPayment;
        }

        // 5. Calculate all other results based on homePrice
        const loanAmount = homePrice - downPayment;
        
        const closingCostsValue = homePrice * (closingCostsPercent / 100);
        const totalAtClosing = downPayment + closingCostsValue;
        
        const mortgagePI = calculatePAndI(loanAmount, interestRate, loanTerm);
        const propTaxMonthly = homePrice * (propTaxPercent / 100 / 12);
        const insuranceMonthly = homePrice * (insurancePercent / 100 / 12);
        const maintenanceMonthly = homePrice * (maintenancePercent / 100 / 12);
        
        const totalMonthlyCost = mortgagePI + propTaxMonthly + insuranceMonthly + hoaMonthly + maintenanceMonthly;

        const propTaxAnnual = propTaxMonthly * 12;
        const insuranceAnnual = insuranceMonthly * 12;
        const maintenanceAnnual = maintenanceMonthly * 12;
        const hoaAnnual = hoaMonthly * 12;
        
        const frontDTI = (totalMonthlyCost / monthlyIncome) * 100;
        const backDTI = ((totalMonthlyCost + monthlyDebt) / monthlyIncome) * 100;
        
        // 6. Store results
        const results = {
            homePrice, totalMonthlyCost, loanAmount, totalAtClosing,
            downPayment, closingCostsValue, closingCostsPercent,
            frontDTI, backDTI, mortgagePI, 
            propTaxAnnual, insuranceAnnual, hoaAnnual, maintenanceAnnual, maintenancePercent,
            propTaxMonthly, insuranceMonthly, hoaMonthly, maintenanceMonthly
        };

        // 7. Update the UI
        updateDOM(results);
    };

    // --- DOM Update Function ---
    const updateDOM = (results) => {
        if (!results) {
            // Reset all fields if calculation is not possible
            Object.values(resultElements).forEach(el => {
                if (el) {
                    if (el.id.includes('DTI')) el.textContent = '--';
                    else if (el.tagName === 'P') el.textContent = 'Enter your details to see a summary.';
                    else if (el.tagName === 'SPAN') el.textContent = '$0.00';
                }
            });
            // updateCharts(null) REMOVED
            return;
        }

        // Main Summary
        resultElements.homePrice.textContent = formatCurrency(results.homePrice);
        resultElements.monthlyPayment.textContent = formatCurrency(results.totalMonthlyCost);
        resultElements.loanAmount.textContent = formatCurrency(results.loanAmount);
        resultElements.totalClosing.textContent = formatCurrency(results.totalAtClosing);
        resultElements.summaryText.innerHTML = `Based on your numbers, you can afford a home priced around <span class="summary-highlight">${formatCurrency(results.homePrice)}</span> with a total monthly payment of <span class="summary-highlight">${formatCurrency(results.totalMonthlyCost)}</span>.`;

        // One-Time Costs
        resultElements.outDownPayment.textContent = formatCurrency(results.downPayment);
        resultElements.outClosingCosts.textContent = formatCurrency(results.closingCostsValue);
        resultElements.outClosingCostsLabel.textContent = `Closing Costs (Est. ${results.closingCostsPercent}%)`;
        resultElements.outTotalAtClosing.textContent = formatCurrency(results.totalAtClosing);
        
        // Loan & Ratios
        resultElements.outLoanAmount.textContent = formatCurrency(results.loanAmount);
        resultElements.outFrontDTI.textContent = `${results.frontDTI.toFixed(1)}%`;
        resultElements.outBackDTI.textContent = `${results.backDTI.toFixed(1)}%`;

        // Annual Costs
        resultElements.outPropertyTaxAnnually.textContent = formatCurrency(results.propTaxAnnual);
        resultElements.outInsuranceAnnually.textContent = formatCurrency(results.insuranceAnnual);
        resultElements.outHOAAnnually.textContent = formatCurrency(results.hoaAnnual);
        resultElements.outMaintenanceAnnually.textContent = formatCurrency(results.maintenanceAnnual);
        resultElements.outMaintenanceAnnuallyLabel.textContent = `Maintenance (Est. ${results.maintenancePercent}%)`;
        
        // Monthly Costs
        resultElements.outMortgagePI.textContent = formatCurrency(results.mortgagePI);
        resultElements.outPropertyTaxMonthly.textContent = formatCurrency(results.propTaxMonthly);
        resultElements.outInsuranceMonthly.textContent = formatCurrency(results.insuranceMonthly);
        resultElements.outHOAMonthly.textContent = formatCurrency(results.hoaMonthly);
        resultElements.outMaintenanceMonthly.textContent = formatCurrency(results.maintenanceMonthly);
        resultElements.outMaintenanceMonthlyLabel.textContent = `Maintenance (Est. ${results.maintenancePercent}%)`;
        resultElements.outTotalMonthly.textContent = formatCurrency(results.totalMonthlyCost);

        // Update Chart call REMOVED
    };

    // --- CHART UPDATE FUNCTION REMOVED ---


    // --- Event Listeners ---
    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    Object.values(allInputs).forEach(input => {
        if (!input) return;
        
        // Use the same robust input sanitization from the Refinance calculator
        input.type = 'text';
        input.inputMode = 'decimal';
        
        input.addEventListener('input', (e) => {
            const target = e.target;
            let originalValue = target.value;
            let cursorPosition = target.selectionStart;
            
            const originalBeforeCursor = originalValue.substring(0, cursorPosition);
            
            let sanitizedValue = originalValue.replace(/[^0-9.]/g, '');
            
            const parts = sanitizedValue.split('.');
            if (parts.length > 2) {
                sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
            }

            if (originalValue !== sanitizedValue) {
                let sanitizedBeforeCursor = originalBeforeCursor.replace(/[^0-9.]/g, '');
                const partsBefore = sanitizedBeforeCursor.split('.');
                if (partsBefore.length > 2) {
                    sanitizedBeforeCursor = partsBefore[0] + '.' + partsBefore.slice(1).join('');
                }
                const newCursorPos = sanitizedBeforeCursor.length;
                target.value = sanitizedValue;
                target.setSelectionRange(newCursorPos, newCursorPos);
            }
            
            const max = parseFloat(target.getAttribute('max'));
            const min = parseFloat(target.getAttribute('min'));
            let value = parseFloat(sanitizedValue);

            if (!isNaN(value)) {
                if (!isNaN(max) && value > max) target.value = max;
                if (!isNaN(min) && value < min) target.value = min;
            }
            
            debouncedCalculate();
        });
    });

    // Resize listener no longer needs to re-init charts
    window.addEventListener('resize', debounce(() => {
        // Chart logic removed
    }, 250));
    
    // Initial calculation on load
    setTimeout(calculateAndDisplay, 50);

    // --- Tagline Animation (Copied) ---
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
    
});
