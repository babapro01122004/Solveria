document.addEventListener('DOMContentLoaded', () => {

    // MODIFICATION: Added the debounce function
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };
    
    const subtitles = [
        "Calculations today, keys in hand tomorrow.",
        "Plan with numbers, live with confidence.",
        "Where clarity today builds comfort tomorrow."
    ];
    const subtitleEl = document.getElementById('fading-subtitle');
    let subtitleIndex = 0;
    const subtitleDisplayTime = 3000; 
    const subtitleFadeTime = 1000; 

    function cycleSubtitles() {
        if (!subtitleEl) return; // Safety check
        subtitleEl.textContent = subtitles[subtitleIndex];
        subtitleEl.classList.add('visible');
        setTimeout(() => {
            subtitleEl.classList.remove('visible');
            setTimeout(() => {
                subtitleIndex = (subtitleIndex + 1) % subtitles.length;
                cycleSubtitles();
            }, subtitleFadeTime);
        }, subtitleDisplayTime);
    }

    if (subtitleEl) {
        subtitleEl.textContent = subtitles[0];
        subtitleEl.classList.add('visible');
        setTimeout(() => {
            subtitleEl.classList.remove('visible');
            setTimeout(() => {
                subtitleIndex = (subtitleIndex + 1) % subtitles.length;
                cycleSubtitles();
            }, subtitleFadeTime);
        }, subtitleDisplayTime);
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

    const scrollTextDisplayTime = 3000;
    const scrollTextFadeTime = 500;
    const scrollPromptMoveTime = 500;

    function cycleScrollText() {
        if (!scrollTextEl || !scrollPromptEl) return; // Safety check
        scrollTextEl.classList.remove('visible');
        setTimeout(() => {
            scrollIndex = (scrollIndex + 1) % scrollPhrases.length;
            scrollTextEl.textContent = scrollPhrases[scrollIndex];
            const newWidth = scrollPromptEl.offsetWidth;
            scrollPromptEl.style.transform = `translateX(-${newWidth / 2}px)`;
            setTimeout(() => {
                scrollTextEl.classList.add('visible');
            }, scrollPromptMoveTime);
        }, scrollTextFadeTime);
        
        const totalAnimationTime = scrollTextFadeTime + scrollPromptMoveTime + scrollTextFadeTime;
        setTimeout(cycleScrollText, scrollTextDisplayTime + totalAnimationTime);
    }
    
    function initScrollPrompt() {
        if (!scrollTextEl || !scrollPromptEl) return; // Safety check
        scrollTextEl.textContent = scrollPhrases[0];
        const initialWidth = scrollPromptEl.offsetWidth;
        scrollPromptEl.style.transform = `translateX(-${initialWidth / 2}px)`;
        scrollTextEl.classList.add('visible');
        setTimeout(cycleScrollText, scrollTextDisplayTime);
    }
    
    initScrollPrompt();

    if (scrollPromptEl) {
        scrollPromptEl.addEventListener('click', () => {
            document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const toolSubtitles = document.querySelectorAll('.tool-subtitle');
    toolSubtitles.forEach((subtitleContainer, index) => {
        const spans = subtitleContainer.querySelectorAll('span');
        if (spans.length === 0) return; // Safety check
        
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

    const dtiSelectTrigger = document.getElementById('dti-select-trigger');
    const dtiSelectValue = document.getElementById('dti-select-value');
    const dtiOptions = document.getElementById('dti-options');
    const dtiCustomInput = document.getElementById('dti-ratio-custom');
    const dtiHiddenInput = document.getElementById('dti-ratio');
    const form = document.getElementById('affordability-form');

    // Safety checks for calculator elements
    if (!form || !dtiSelectTrigger || !dtiOptions || !dtiCustomInput || !dtiHiddenInput) {
        console.error("Affordability calculator elements not found. Script will not run.");
        return;
    }

    const defaultOption = dtiOptions.querySelector('li[data-value="' + dtiHiddenInput.value + '"]');
    if (defaultOption) { defaultOption.classList.add('selected'); }

    dtiSelectTrigger.addEventListener('click', () => { dtiOptions.classList.toggle('open'); });
    dtiOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const currentSelected = dtiOptions.querySelector('li.selected');
            if (currentSelected) { currentSelected.classList.remove('selected'); }
            e.target.classList.add('selected');
            
            const value = e.target.getAttribute('data-value');
            const label = e.target.getAttribute('data-label');
            dtiSelectValue.textContent = label;
            dtiOptions.classList.remove('open');
            if (value === 'custom') {
                dtiCustomInput.style.display = 'block';
                dtiHiddenInput.value = dtiCustomInput.value;
            } else {
                dtiCustomInput.style.display = 'none';
                dtiHiddenInput.value = value;
            }
            // Trigger the main form input event
            form.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    dtiCustomInput.addEventListener('input', () => {
        dtiHiddenInput.value = dtiCustomInput.value; // Update hidden input from custom field
        // Trigger the main form input event
        form.dispatchEvent(new Event('input', { bubbles: true }));
    });
    window.addEventListener('click', (e) => { if (!dtiSelectTrigger.contains(e.target)) { dtiOptions.classList.remove('open'); } });

    const cappedInputs = document.querySelectorAll('#affordability-form input[type="number"][max]');
    cappedInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const max = parseFloat(event.target.getAttribute('max'));
            if (event.target.value !== '' && parseFloat(event.target.value) > max) {
                event.target.value = max;
            }
        });
    });

    const allNumberInputs = document.querySelectorAll('input[type="number"]');
    allNumberInputs.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (['e', '+', '-'].includes(event.key)) {
                event.preventDefault();
            }
        });
        input.addEventListener('input', (event) => {
            const min = parseFloat(event.target.getAttribute('min')) || 0;
            if (event.target.value !== '' && parseFloat(event.target.value) < min) {
                 event.target.value = min;
            }
        });
    });
    
    const resultsSection = document.getElementById('results-section');
    const resultsBreakdown = document.getElementById('results-breakdown');
    const mainResultEl = document.getElementById('result-total-price');
    const outputs = {
        totalPrice: document.getElementById('result-total-price'),
        downPayment: document.getElementById('result-down-payment'),
        closingCosts: document.getElementById('result-closing-costs'),
        totalClosing: document.getElementById('result-total-closing'),
        loanAmount: document.getElementById('result-loan-amount'),
        frontendDTI: document.getElementById('result-frontend-dti'),
        backendDTI: document.getElementById('result-backend-dti'),
        monthlyMortgage: document.getElementById('result-monthly-mortgage'),
        monthlyTax: document.getElementById('result-monthly-tax'),
        monthlyInsurance: document.getElementById('result-monthly-insurance'),
        monthlyHoa: document.getElementById('result-monthly-hoa'),
        monthlyMaintenance: document.getElementById('result-monthly-maintenance'),
        totalMonthly: document.getElementById('result-total-monthly'),
        annualTax: document.getElementById('result-annual-tax'),
        annualInsurance: document.getElementById('result-annual-insurance'),
        annualHoa: document.getElementById('result-annual-hoa'),
        annualMaintenance: document.getElementById('result-annual-maintenance'),
        summaryTotalPrice: document.getElementById('summary-total-price'),
        summaryRuleText: document.getElementById('summary-rule-text'),
        summaryLoanAmount: document.getElementById('summary-loan-amount'),
        summaryDownPayment: document.getElementById('summary-down-payment'),
        summaryRuleInfo: document.getElementById('summary-rule-info')
    };
    
    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    function calculateAffordability() {
        const annualIncome = parseFloat(document.getElementById('annual-income').value) || 0;
        const loanTermYears = parseFloat(document.getElementById('loan-term').value) || 0;
        const interestRatePercent = parseFloat(document.getElementById('interest-rate').value) || 0;
        const monthlyDebts = parseFloat(document.getElementById('monthly-debts').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const propertyTaxPercent = parseFloat(document.getElementById('property-tax').value) || 0;
        const hoaFee = parseFloat(document.getElementById('hoa-fee').value) || 0;
        const insurancePercent = parseFloat(document.getElementById('insurance').value) || 0;
        const dtiRatioPercent = parseFloat(dtiHiddenInput.value) || 0;
        const otherCosts = parseFloat(document.getElementById('other-costs').value) || 0;
        
        const grossMonthlyIncome = annualIncome / 12;
        if (grossMonthlyIncome === 0) { showError("Please fill out the form"); return; }
        
        const maxTotalMonthlyDebt = grossMonthlyIncome * (dtiRatioPercent / 100);
        const maxMonthlyHousingPayment = maxTotalMonthlyDebt - monthlyDebts - otherCosts;
        
        if (maxMonthlyHousingPayment <= hoaFee) { showError("With your current debts and income, you cannot afford a mortgage payment."); return; }
        
        const maxPITI = maxMonthlyHousingPayment - hoaFee;
        const monthlyInterestRate = (interestRatePercent / 100) / 12;
        const numberOfMonths = loanTermYears * 12;
        
        let M_factor = 0;
        if (monthlyInterestRate > 0 && numberOfMonths > 0) { 
            M_factor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1); 
        }
        
        const T_factor = (propertyTaxPercent / 100) / 12;
        const I_factor = (insurancePercent / 100) / 12;
        
        let totalHousePrice = 0;
        if (M_factor + T_factor + I_factor > 0) { 
            totalHousePrice = (maxPITI + downPayment * M_factor) / (M_factor + T_factor + I_factor); 
        }
        
        if (totalHousePrice <= downPayment) { 
            showError("Your income doesn't support a loan. You can afford a home up to the value of your down payment."); 
            totalHousePrice = downPayment; 
        } else { 
            showResults(); 
        }
        
        const loanAmount = totalHousePrice > downPayment ? totalHousePrice - downPayment : 0;
        const closingCosts = totalHousePrice * 0.03;
        const totalClosing = downPayment + closingCosts;
        const monthlyMortgage = loanAmount * M_factor;
        const monthlyTax = totalHousePrice * T_factor;
        const monthlyInsurance = totalHousePrice * I_factor;
        const annualMaintenance = totalHousePrice * 0.015;
        const monthlyMaintenance = annualMaintenance / 12;
        const totalHouseMonthlyPayment = monthlyMortgage + monthlyTax + monthlyInsurance + hoaFee;
        const totalMonthlyCost = totalHouseMonthlyPayment + monthlyMaintenance + otherCosts;
        
        const frontendDTI = grossMonthlyIncome > 0 ? (totalHouseMonthlyPayment / grossMonthlyIncome) * 100 : 0;
        const backendDTI = grossMonthlyIncome > 0 ? ((totalHouseMonthlyPayment + monthlyDebts + otherCosts) / grossMonthlyIncome) * 100 : 0;
        
        const annualTax = totalHousePrice * (propertyTaxPercent / 100);
        const annualInsurance = totalHousePrice * (insurancePercent / 100);
        const annualHoa = hoaFee * 12;
        
        outputs.totalPrice.textContent = currencyFormatter.format(totalHousePrice);
        outputs.downPayment.textContent = currencyFormatter.format(downPayment);
        outputs.closingCosts.textContent = currencyFormatter.format(closingCosts);
        outputs.totalClosing.textContent = currencyFormatter.format(totalClosing);
        outputs.loanAmount.textContent = currencyFormatter.format(loanAmount);
        outputs.frontendDTI.textContent = `${frontendDTI.toFixed(1)}%`;
        outputs.backendDTI.textContent = `${backendDTI.toFixed(1)}%`;
        outputs.monthlyMortgage.textContent = currencyFormatter.format(monthlyMortgage);
        outputs.monthlyTax.textContent = currencyFormatter.format(monthlyTax);
        outputs.monthlyInsurance.textContent = currencyFormatter.format(monthlyInsurance);
        outputs.monthlyHoa.textContent = currencyFormatter.format(hoaFee);
        outputs.monthlyMaintenance.textContent = currencyFormatter.format(monthlyMaintenance);
        outputs.totalMonthly.textContent = currencyFormatter.format(totalMonthlyCost);
        outputs.annualTax.textContent = currencyFormatter.format(annualTax);
        outputs.annualInsurance.textContent = currencyFormatter.format(annualInsurance);
        outputs.annualHoa.textContent = currencyFormatter.format(annualHoa);
        outputs.annualMaintenance.textContent = currencyFormatter.format(annualMaintenance);
        
        outputs.summaryTotalPrice.textContent = currencyFormatter.format(totalHousePrice);
        outputs.summaryLoanAmount.textContent = currencyFormatter.format(loanAmount);
        outputs.summaryDownPayment.textContent = currencyFormatter.format(downPayment);
        
        const selectedDtiLabel = dtiSelectValue.textContent;
        outputs.summaryRuleText.textContent = selectedDtiLabel;

        let ruleInfoText = "";
        if (dtiHiddenInput.value === "36") { ruleInfoText = "Most conventional loan lenders use the 28/36 rule."; }
        else if (dtiHiddenInput.value === "43") { ruleInfoText = "FHA loans have specific DTI limits set by the Federal Housing Administration."; }
        else if (dtiHiddenInput.value === "41") { ruleInfoText = "VA loan guidelines are set by the Department of Veterans Affairs."; }
        else { ruleInfoText = "Custom DTI ratios are subject to lender approval."; }
        outputs.summaryRuleInfo.textContent = ruleInfoText;
    }

    function showError(message) {
        resultsSection.style.display = 'block';
        resultsBreakdown.style.display = 'none';
        mainResultEl.textContent = message;
        mainResultEl.classList.add('error-message');
        mainResultEl.parentElement.style.borderLeftColor = 'red';
        document.getElementById('results-summary').style.display = 'none';
    }

    function showResults() {
        resultsSection.style.display = 'block';
        resultsBreakdown.style.display = 'grid';
        mainResultEl.classList.remove('error-message');
        mainResultEl.parentElement.style.borderLeftColor = '#2ca86a';
        document.getElementById('results-summary').style.display = 'block';
    }

    // MODIFICATION: Create a debounced version of the calculation
    const debouncedCalculate = debounce(calculateAffordability, 300);

    // MODIFICATION: Add the debounced listener to the form
    form.addEventListener('input', debouncedCalculate);
    
    // Run the calculation once on initial load
    calculateAffordability();
});