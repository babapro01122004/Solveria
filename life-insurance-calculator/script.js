document.addEventListener('DOMContentLoaded', () => {

    // --- CHART LOGIC ENTIRELY REMOVED ---

    // ### NEW INPUTS ###
    const allInputs = {
        totalDebt: document.getElementById('totalDebt'),
        finalExpenses: document.getElementById('finalExpenses'),
        annualIncome: document.getElementById('annualIncome'),
        yearsToReplace: document.getElementById('yearsToReplace'),
        educationCosts: document.getElementById('educationCosts'),
        currentSavings: document.getElementById('currentSavings'),
        existingInsurance: document.getElementById('existingInsurance')
    };

    // ### NEW RESULT ELEMENTS ###
    const resultElements = {
        resultCoverage: document.getElementById('resultCoverage'),
        summaryText: document.getElementById('resultSummaryText'),
        
        // Breakdown 1: Total Needs
        breakdownDebt: document.getElementById('breakdownDebt'),
        breakdownExpenses: document.getElementById('breakdownExpenses'),
        breakdownIncome: document.getElementById('breakdownIncome'),
        breakdownEducation: document.getElementById('breakdownEducation'),
        breakdownTotalNeed: document.getElementById('breakdownTotalNeed'),

        // Breakdown 2: Final Calculation
        finalTotalNeed: document.getElementById('finalTotalNeed'),
        finalLessSavings: document.getElementById('finalLessSavings'),
        finalLessInsurance: document.getElementById('finalLessInsurance'),
        finalCoverageNeeded: document.getElementById('finalCoverageNeeded')
    };

    // Helper function to format currency
    const formatCurrency = (value) => {
        if (isNaN(value)) return '$0.00';
        const absValue = Math.abs(value);
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(absValue);
        return value < 0 ? `-${formatted}` : formatted;
    };
    
    // Debounce function (unchanged)
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // ### NEW CALCULATION LOGIC ###
    const calculateAndDisplay = () => {
        // 1. Get all values
        const totalDebt = parseFloat(allInputs.totalDebt.value) || 0;
        const finalExpenses = parseFloat(allInputs.finalExpenses.value) || 0;
        const annualIncome = parseFloat(allInputs.annualIncome.value) || 0;
        const yearsToReplace = parseFloat(allInputs.yearsToReplace.value) || 0;
        const educationCosts = parseFloat(allInputs.educationCosts.value) || 0;
        const currentSavings = parseFloat(allInputs.currentSavings.value) || 0;
        const existingInsurance = parseFloat(allInputs.existingInsurance.value) || 0;

        // 2. Perform calculations
        const incomeReplacement = annualIncome * yearsToReplace;
        
        const totalNeed = totalDebt + finalExpenses + incomeReplacement + educationCosts;
        const totalAssets = currentSavings + existingInsurance;
        
        // Ensure coverage is not negative
        const coverageNeeded = Math.max(0, totalNeed - totalAssets); 

        // 3. Update all result elements
        
        // Main Summary
        resultElements.resultCoverage.textContent = formatCurrency(coverageNeeded);
        resultElements.summaryText.innerHTML = `Based on your inputs, we recommend a total life insurance coverage of <span class="summary-highlight">${formatCurrency(coverageNeeded)}</span> to protect your family's financial future.`;

        // Breakdown 1: Total Needs
        resultElements.breakdownDebt.textContent = formatCurrency(totalDebt);
        resultElements.breakdownExpenses.textContent = formatCurrency(finalExpenses);
        resultElements.breakdownIncome.textContent = formatCurrency(incomeReplacement);
        resultElements.breakdownEducation.textContent = formatCurrency(educationCosts);
        resultElements.breakdownTotalNeed.textContent = formatCurrency(totalNeed);

        // Breakdown 2: Final Calculation
        resultElements.finalTotalNeed.textContent = formatCurrency(totalNeed);
        resultElements.finalLessSavings.textContent = formatCurrency(-currentSavings);
        resultElements.finalLessInsurance.textContent = formatCurrency(-existingInsurance);
        resultElements.finalCoverageNeeded.textContent = formatCurrency(coverageNeeded);
    };
    
    const debouncedCalculate = debounce(calculateAndDisplay, 300);

    // ### NEW: Define realistic caps ###
    const inputValidation = {
        totalDebt:       { min: 0, max: 50000000 },  // $50 Million
        finalExpenses:   { min: 0, max: 500000 },    // $500,000
        annualIncome:    { min: 0, max: 10000000 },  // $10 Million
        yearsToReplace:  { min: 0, max: 100 },       // 100 Years
        educationCosts:  { min: 0, max: 5000000 },   // $5 Million
        currentSavings:  { min: 0, max: 50000000 },  // $50 Million
        existingInsurance: { min: 0, max: 50000000 }  // $50 Million
    };

    // Input sanitization logic (NOW WITH CAPPING)
    // Use Object.entries to get the key for validation rules
    Object.entries(allInputs).forEach(([key, input]) => {
        if (!input) return; // Safety check if an element is missing

        // Get validation rules for this input
        const rules = inputValidation[key];

        if (input.type === 'checkbox') { // Keep for future-proofing
            input.addEventListener('input', debouncedCalculate);
        } else {
            input.type = 'text';
            input.inputMode = 'decimal';

            // ### NEW: Set attributes dynamically ###
            if (rules) {
                input.setAttribute('min', rules.min);
                input.setAttribute('max', rules.max);
            }
            
            input.addEventListener('input', (e) => {
                const target = e.target;
                
                // --- START: Input Sanitization (Unchanged) ---
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
                // --- END: Input Sanitization ---
                
                // ### NEW: Re-add validation logic from original file ###
                const max = parseFloat(target.getAttribute('max'));
                const min = parseFloat(target.getAttribute('min'));
                
                // Use the newly sanitized value for parsing
                let value = parseFloat(sanitizedValue); 

                if (!isNaN(value)) {
                    if (!isNaN(max) && value > max) {
                        target.value = max; // Cap the value
                    }
                    if (!isNaN(min) && value < min) {
                        target.value = min; // Floor the value
                    }
                }
                // --- END OF NEW LOGIC ---

                debouncedCalculate();
            });
        }
    });

    // Run the first calculation immediately to populate the summary.
    setTimeout(calculateAndDisplay, 50);

    // ### UPDATED TAGLINES ###
    const taglines = [
        "Get the right coverage for your family.",
        "Clarity for your financial future.",
        "Peace of mind, calculated."
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