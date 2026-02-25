/* ============================ */
/* Breathing Text Logic         */
/* ============================ */
const phrases = [
    "Assess the risk. Know your rights.",
    "Document everything immediately.",
    "Laws vary by state. Don't guess.",
    "Bite history changes everything."
];

let currentIndex = 0;
const textElement = document.getElementById('breathing-text');

function cycleText() {
    textElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        textElement.textContent = phrases[currentIndex];
        textElement.classList.remove('fade-out');
    }, 1000);
}

setInterval(cycleText, 4000);

/* ============================ */
/* 50 STATE ENGINE DATA         */
/* ============================ */
const US_STATE_DATA = {
  "AL": { code: "AL", name: "Alabama", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability often requires the dog to be known as dangerous/vicious; otherwise, negligence applies.", collectionRisk: "medium" },
  "AK": { code: "AK", name: "Alaska", liability: "one-bite", statuteLimitYears: 2, statuteNotes: "Generally follows the 'one-bite rule' requiring proof of owner negligence or prior knowledge.", collectionRisk: "high" },
  "AZ": { code: "AZ", name: "Arizona", liability: "strict", statuteLimitYears: 1, statuteNotes: "Strict liability claims must be filed within 1 year; general negligence claims have 2 years.", collectionRisk: "low" },
  "AR": { code: "AR", name: "Arkansas", liability: "one-bite", statuteLimitYears: 3, statuteNotes: "Follows the one-bite rule; liability typically requires proof the owner knew of aggression.", collectionRisk: "high" },
  "CA": { code: "CA", name: "California", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies in public or lawfully in private; no prior bite knowledge needed.", collectionRisk: "low" },
  "CO": { code: "CO", name: "Colorado", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability applies primarily to 'serious bodily injury.' Minor injuries may require proving negligence.", collectionRisk: "medium" },
  "CT": { code: "CT", name: "Connecticut", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability unless the victim was teasing, tormenting, or trespassing.", collectionRisk: "low" },
  "DE": { code: "DE", name: "Delaware", liability: "strict", statuteLimitYears: 2, statuteNotes: "Owner is strictly liable unless the victim was trespassing, teasing, or tormenting the dog.", collectionRisk: "low" },
  "FL": { code: "FL", name: "Florida", liability: "strict", statuteLimitYears: 4, statuteNotes: "Strict liability generally applies, but damages can be reduced by victim's percentage of fault.", collectionRisk: "low" },
  "GA": { code: "GA", name: "Georgia", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Modified one-bite: Liability if owner knew of danger OR dog was off-leash in violation of local law.", collectionRisk: "medium" },
  "HI": { code: "HI", name: "Hawaii", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies. The owner is presumed liable for injuries caused by the dog.", collectionRisk: "low" },
  "ID": { code: "ID", name: "Idaho", liability: "one-bite", statuteLimitYears: 2, statuteNotes: "Generally requires proof of negligence or prior knowledge (one-bite), unless statutes specify otherwise.", collectionRisk: "high" },
  "IL": { code: "IL", name: "Illinois", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies if the dog attacks without provocation and the victim is lawfully present.", collectionRisk: "low" },
  "IN": { code: "IN", name: "Indiana", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability for victims carrying out legal duties (e.g., mail carriers); one-bite rule often applies otherwise.", collectionRisk: "medium" },
  "IA": { code: "IA", name: "Iowa", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies. Owner is liable for all damages unless the victim was committing an unlawful act.", collectionRisk: "low" },
  "KS": { code: "KS", name: "Kansas", liability: "one-bite", statuteLimitYears: 2, statuteNotes: "Follows the one-bite rule; usually requires proving the owner knew the dog was dangerous.", collectionRisk: "high" },
  "KY": { code: "KY", name: "Kentucky", liability: "strict", statuteLimitYears: 1, statuteNotes: "Strict liability applies, but the filing window is short (1 year). Immediate action recommended.", collectionRisk: "low" },
  "LA": { code: "LA", name: "Louisiana", liability: "strict", statuteLimitYears: 1, statuteNotes: "Owner is strictly liable if they could have prevented the injury. 1-year deadline is strict.", collectionRisk: "medium" },
  "ME": { code: "ME", name: "Maine", liability: "strict", statuteLimitYears: 6, statuteNotes: "Strict liability for damages. Fault by the victim (provocation) can reduce compensation.", collectionRisk: "low" },
  "MD": { code: "MD", name: "Maryland", liability: "mixed", statuteLimitYears: 3, statuteNotes: "Strict liability if the dog was 'at large' (off-leash). Contributory negligence is a strong defense.", collectionRisk: "medium" },
  "MA": { code: "MA", name: "Massachusetts", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies unless the victim was trespassing, teasing, or tormenting the dog.", collectionRisk: "low" },
  "MI": { code: "MI", name: "Michigan", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies if the bite occurred publicly or while lawfully on private property.", collectionRisk: "low" },
  "MN": { code: "MN", name: "Minnesota", liability: "strict", statuteLimitYears: 6, statuteNotes: "Strict liability applies if the victim was acting peaceably and lawfully. Long filing window.", collectionRisk: "low" },
  "MS": { code: "MS", name: "Mississippi", liability: "one-bite", statuteLimitYears: 3, statuteNotes: "Generally follows the one-bite rule unless the dog was already deemed dangerous.", collectionRisk: "high" },
  "MO": { code: "MO", name: "Missouri", liability: "strict", statuteLimitYears: 5, statuteNotes: "Strict liability for bites on public property or lawfully on private property.", collectionRisk: "low" },
  "MT": { code: "MT", name: "Montana", liability: "mixed", statuteLimitYears: 3, statuteNotes: "Strict liability often applies in incorporated cities/towns; negligence rules may apply elsewhere.", collectionRisk: "medium" },
  "NE": { code: "NE", name: "Nebraska", liability: "strict", statuteLimitYears: 4, statuteNotes: "Strict liability applies unless the victim was trespassing or committing a mischievous act.", collectionRisk: "low" },
  "NV": { code: "NV", name: "Nevada", liability: "one-bite", statuteLimitYears: 2, statuteNotes: "One-bite rule typically applies; must prove owner negligence or prior knowledge of danger.", collectionRisk: "high" },
  "NH": { code: "NH", name: "New Hampshire", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability for all damage done by a dog to a person or property.", collectionRisk: "low" },
  "NJ": { code: "NJ", name: "New Jersey", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies regardless of the dog's history. Trespassing is a key defense.", collectionRisk: "low" },
  "NM": { code: "NM", name: "New Mexico", liability: "one-bite", statuteLimitYears: 3, statuteNotes: "One-bite rule or negligence generally applies; lack of prior aggression is a strong defense.", collectionRisk: "high" },
  "NY": { code: "NY", name: "New York", liability: "mixed", statuteLimitYears: 3, statuteNotes: "Strict liability for medical bills; negligence must be proven for other damages (pain & suffering).", collectionRisk: "medium" },
  "NC": { code: "NC", name: "North Carolina", liability: "mixed", statuteLimitYears: 3, statuteNotes: "Strict liability if dog is 'dangerous' or at large at night; otherwise negligence applies.", collectionRisk: "medium" },
  "ND": { code: "ND", name: "North Dakota", liability: "one-bite", statuteLimitYears: 6, statuteNotes: "One-bite rule applies; liability usually depends on owner's knowledge of aggression.", collectionRisk: "high" },
  "OH": { code: "OH", name: "Ohio", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies unless victim was trespassing, teasing, or committing a crime.", collectionRisk: "low" },
  "OK": { code: "OK", name: "Oklahoma", liability: "strict", statuteLimitYears: 2, statuteNotes: "Strict liability applies to bites occurring when the victim is lawfully present/not trespassing.", collectionRisk: "low" },
  "OR": { code: "OR", name: "Oregon", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability for economic damages (bills); negligence proof needed for non-economic damages.", collectionRisk: "medium" },
  "PA": { code: "PA", name: "Pennsylvania", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability covers medical costs; proving negligence is required for full compensation.", collectionRisk: "medium" },
  "RI": { code: "RI", name: "Rhode Island", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies. Double damages may be available if the dog has bitten before.", collectionRisk: "low" },
  "SC": { code: "SC", name: "South Carolina", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies unless the victim provoked or harassed the dog.", collectionRisk: "low" },
  "SD": { code: "SD", name: "South Dakota", liability: "one-bite", statuteLimitYears: 3, statuteNotes: "Generally follows the one-bite rule/negligence; lack of prior history is a defense.", collectionRisk: "high" },
  "TN": { code: "TN", name: "Tennessee", liability: "mixed", statuteLimitYears: 1, statuteNotes: "Strict liability if 'at large' or in public; one-bite rule often applies on owner's property. 1 year SOL.", collectionRisk: "medium" },
  "TX": { code: "TX", name: "Texas", liability: "negligence", statuteLimitYears: 2, statuteNotes: "Follows the 'One Bite Rule' / Negligence. Must prove owner knew of danger or failed to be careful.", collectionRisk: "high" },
  "UT": { code: "UT", name: "Utah", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies. Owner is liable for damages regardless of the dog's history.", collectionRisk: "low" },
  "VT": { code: "VT", name: "Vermont", liability: "one-bite", statuteLimitYears: 3, statuteNotes: "Generally follows one-bite rule; usually requires proving owner negligence or knowledge.", collectionRisk: "high" },
  "VA": { code: "VA", name: "Virginia", liability: "mixed", statuteLimitYears: 2, statuteNotes: "One-bite rule generally, but 'Negligence Per Se' applies if leash laws were violated.", collectionRisk: "high" },
  "WA": { code: "WA", name: "Washington", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies to bites occurring in public or lawfully on private property.", collectionRisk: "low" },
  "WV": { code: "WV", name: "West Virginia", liability: "mixed", statuteLimitYears: 2, statuteNotes: "Strict liability if dog is 'at large'; negligence/one-bite applies if confined/on property.", collectionRisk: "medium" },
  "WI": { code: "WI", name: "Wisconsin", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability applies. Double damages possible if owner knew of prior bites.", collectionRisk: "low" },
  "WY": { code: "WY", name: "Wyoming", liability: "one-bite", statuteLimitYears: 4, statuteNotes: "Follows the one-bite rule. Must prove owner knew the dog was dangerous.", collectionRisk: "high" },
  "DC": { code: "DC", name: "District of Columbia", liability: "strict", statuteLimitYears: 3, statuteNotes: "Strict liability if the dog is at large; negligence applies if the dog is leashed/on property.", collectionRisk: "medium" }
};

/* ============================ */
/* Input Logic & Initialization */
/* ============================ */

function initializeStates() {
    const selector = document.getElementById('stateSelector');
    const wrapper = document.getElementById('stateOptionsWrapper');
    const trigger = document.getElementById('stateTrigger');

    // Clear existing
    selector.innerHTML = '';
    wrapper.innerHTML = '';

    // Sort states alphabetically
    const sortedStates = Object.values(US_STATE_DATA).sort((a, b) => a.name.localeCompare(b.name));

    sortedStates.forEach(state => {
        // 1. Add to hidden select
        const option = document.createElement('option');
        option.value = state.code;
        option.textContent = state.name;
        if(state.code === "CA") option.selected = true; // Default
        selector.appendChild(option);

        // 2. Add to custom dropdown div
        const divOpt = document.createElement('div');
        divOpt.className = 'dropdown-option';
        if(state.code === "CA") divOpt.classList.add('selected');
        divOpt.setAttribute('data-value', state.code);
        divOpt.textContent = state.name;
        wrapper.appendChild(divOpt);
    });
}

// Severity Slider Visuals
const severityMap = {
    1: "Level 1: Snap/Air Bite",
    2: "Level 2: Contact (No Puncture)",
    3: "Level 3: Shallow Puncture",
    4: "Level 4: Deep Puncture",
    5: "Level 5: Severe/Mauling"
};

const sliderSeverity = document.getElementById('slider_severity');
const inputSeverity = document.getElementById('input_severity');

function updateSeverityVisual() {
    const val = parseInt(sliderSeverity.value);
    inputSeverity.value = severityMap[val];
    
    // Gradient Update
    const min = 1;
    const max = 5;
    const pct = ((val - min) / (max - min)) * 100;
    sliderSeverity.style.backgroundImage = `linear-gradient(to right, #B5855E 0%, #B5855E ${pct}%, #e0e0e0 ${pct}%, #e0e0e0 100%)`;
    
    updateAnalysis();
}

/* ============================ */
/* Custom Dropdown Logic        */
/* ============================ */
function initializeCustomDropdowns() {
    // Re-select wrappers now that DOM might have changed
    const wrappers = document.querySelectorAll('.custom-dropdown-container');
    
    wrappers.forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const trigger = wrapper.querySelector('.custom-dropdown-trigger');
        const menu = wrapper.querySelector('.custom-dropdown-menu');
        
        // Initial Sync (Fixes "Garbage Inputs" on Load)
        if(select && trigger) {
             const selectedOption = select.options[select.selectedIndex];
             if(selectedOption) trigger.textContent = selectedOption.text;
        }
        
        // Event delegation for options (since states are added dynamic)
        menu.addEventListener('click', (e) => {
            const option = e.target.closest('.dropdown-option');
            if(!option) return;
            
            e.stopPropagation();
            const value = option.getAttribute('data-value');
            const text = option.textContent;
            
            trigger.textContent = text;
            
            // Visual selection
            const allOpts = menu.querySelectorAll('.dropdown-option');
            allOpts.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            menu.classList.remove('active');
            
            if(select) {
                select.value = value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // Toggle
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-dropdown-menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    });
}

/* ============================ */
/* Core Calculation Engine      */
/* ============================ */

function updateAnalysis() {
    // 1. Gather Inputs
    const stateCode = document.getElementById('stateSelector').value || "CA";
    const stateInfo = US_STATE_DATA[stateCode];

    const severity = parseInt(document.getElementById('slider_severity').value);
    const bodyPart = document.getElementById('bodySelector').value;
    const isChild = document.getElementById('victimSelector').value === 'child';
    const isTrespassing = document.getElementById('chk_trespass').checked;
    const isProvoked = document.getElementById('chk_provoked').checked;
    const timeFrame = document.getElementById('timerSelector').value;

    // 2. Risk Calculation (Traffic Light)
    let riskLevel = "green";
    let riskTitle = "Low Risk";
    let riskDesc = "Monitor at home. Wash well.";

    // High Risk Triggers
    if (severity >= 4 || bodyPart === 'face' || severity === 5) {
        riskLevel = "red";
        riskTitle = "High Risk";
        riskDesc = "Urgent medical care recommended. Infection/Scarring risk high.";
    } 
    // Medium Risk Triggers
    else if (severity === 3 || bodyPart === 'hand' || timeFrame === '1w' || timeFrame === '24h') {
        riskLevel = "yellow";
        riskTitle = "Moderate Risk";
        riskDesc = "Infection risk present. Consult a doctor if redness spreads.";
    }

    // Update UI Traffic Light - BORDERLESS GLOW STYLE
    const lightBox = document.getElementById('traffic-light-box');
    lightBox.className = `traffic-light-box ${riskLevel}`;
    document.getElementById('res_riskTitle').textContent = riskTitle;
    document.getElementById('res_riskDesc').textContent = riskDesc;

    // 3. Legal Reality (Law Card) - Using STATE_DATA
    const lawCard = document.getElementById('res_lawCard');
    
    // Calculate Statute
    let statuteText = `Statute of Limitations: ${stateInfo.statuteLimitYears} Years.`;
    if (isChild) {
        statuteText = `Statute of Limitations: <strong>Tolled (Paused)</strong> until victim turns 18.`;
    } else if (timeFrame === '1y' && stateInfo.statuteLimitYears === 1) {
        statuteText = `⚠️ <strong>WARNING:</strong> Statute may be expiring soon (1 Year limit).`;
    }

    lawCard.innerHTML = `
        <strong style="font-size:1.1rem; color:#000;">${stateInfo.name}: ${stateInfo.liability.toUpperCase()}</strong>
        <p style="margin-top:5px; font-size:0.95rem;">${stateInfo.statuteNotes}</p>
        <p style="margin-top:8px; font-size:0.9rem; color:#555;">${statuteText}</p>
    `;

    // 4. Protocol Checklist Logic
    const protocolList = document.getElementById('res_protocol');
    protocolList.innerHTML = ""; // Clear
    
    const addStep = (text, isAlert = false) => {
        const li = document.createElement('li');
        li.innerHTML = text; // Allow bold tags
        if(isAlert) li.style.color = "#d35400";
        protocolList.appendChild(li);
    };

    addStep("Wash wound thoroughly with soap/water.");
    
    if (document.getElementById('historySelector').value === 'unknown') {
        addStep("⚠️ Priority: Verify Dog's Rabies Vaccination status.", true);
    }
    
    if (severity >= 3) {
        addStep("Do NOT stitch wound closed without doctor advice (traps bacteria).");
    }

    // Defense Alert
    const defenseAlert = document.getElementById('defense-alert');
    if (isTrespassing || isProvoked) {
        defenseAlert.textContent = "⚠️ DEFENSE DETECTED: Owner likely not liable due to provocation/trespass.";
        defenseAlert.style.color = "#e74c3c";
        defenseAlert.style.fontWeight = "bold";
    } else {
        defenseAlert.textContent = "Answering 'Yes' may void the claim.";
        defenseAlert.style.color = "#999";
        defenseAlert.style.fontWeight = "normal";
    }

    // Child Alert Visuals
    const childAlert = document.getElementById('child-alert');
    if (isChild) {
        childAlert.textContent = `Deadline extended (Age 18 + ${stateInfo.statuteLimitYears} yrs).`;
        childAlert.style.color = "#B5855E";
    } else {
        childAlert.textContent = "Standard statute of limitations applies.";
        childAlert.style.color = "#999";
    }

    // 5. Advanced Calculations (Case Builder)
    updateAdvancedStats(stateInfo, severity, isTrespassing, isProvoked, isChild, bodyPart);
}

function updateAdvancedStats(stateInfo, severity, isTrespass, isProvoked, isChild, bodyPart) {
    // Case Strength
    let strength = 50;
    
    // Legal Boosts (Engine Logic)
    if (stateInfo.liability.includes("strict")) strength += 25;
    if (stateInfo.liability.includes("negligence")) strength -= 10;
    if (stateInfo.collectionRisk === "high") strength -= 10;
    
    // Evidence/Insurance Boosts
    const ins = document.getElementById('insuranceSelector').value;
    if (ins === 'yes') strength += 20;
    else if (ins === 'no') strength -= 10;

    const dogHist = document.getElementById('historySelector').value;
    if (dogHist === 'yes') strength += 15;
    else if (dogHist === 'no' && stateInfo.liability === 'one-bite') strength -= 30; // Critical hit for one-bite states

    // Detractors
    if (isTrespass || isProvoked) strength -= 50;
    
    // Cap
    if (strength > 100) strength = 100;
    if (strength < 0) strength = 0;

    // Visuals with COLORFUL SHADOWS
    const strengthFill = document.getElementById('strength-fill');
    strengthFill.style.width = `${strength}%`;
    
    // Color & Shadow Logic
    let strengthLabel = "Medium Strength";
    if (strength < 40) { 
        strengthFill.style.backgroundColor = "#e74c3c"; 
        strengthFill.style.boxShadow = "0 10px 20px -2px rgba(231, 76, 60, 0.7)";
        strengthLabel = "Low Strength (High Defenses)"; 
    } else if (strength < 70) { 
        strengthFill.style.backgroundColor = "#f1c40f"; 
        strengthFill.style.boxShadow = "0 10px 20px -2px rgba(241, 196, 15, 0.7)";
        strengthLabel = "Medium Strength"; 
    } else { 
        strengthFill.style.backgroundColor = "#2ecc71"; 
        strengthFill.style.boxShadow = "0 10px 20px -2px rgba(46, 204, 113, 0.7)";
        strengthLabel = "Strong Case"; 
    }
    document.getElementById('strength-text').textContent = strengthLabel;
    
    // Dynamic Strength Reason
    let reason = "Based on liability laws.";
    if(stateInfo.liability === 'strict') reason = `${stateInfo.name} is a Strict Liability state (easier to prove).`;
    if(stateInfo.liability === 'one-bite' && dogHist !== 'yes') reason = `Hard to prove in ${stateInfo.name} without prior bite history.`;
    if(isTrespass) reason = "Trespassing significantly weakens the claim.";
    document.getElementById('strength-reason').textContent = reason;

    // Readiness Score
    const evidenceChecks = document.querySelectorAll('.evidence-trigger:checked');
    const totalEvidence = document.querySelectorAll('.evidence-trigger').length;
    const readinessPct = Math.round((evidenceChecks.length / totalEvidence) * 100);
    
    const readinessFill = document.getElementById('readiness-fill');
    readinessFill.style.width = `${readinessPct}%`;
    readinessFill.style.backgroundColor = "#3498db";
    readinessFill.style.boxShadow = "0 10px 20px -2px rgba(52, 152, 219, 0.7)";

    document.getElementById('readiness-text').textContent = `${readinessPct}% Prepared`;

    // Timeline
    const scarFace = document.getElementById('dmg_scar_face').checked;
    const timeline = document.getElementById('res_timeline');
    
    if (scarFace || bodyPart === 'face') {
        timeline.textContent = "12 - 18 Months (Must wait for scars to mature)";
        timeline.style.color = "#e67e22";
    } else if (severity <= 2) {
        timeline.textContent = "2 - 4 Months";
        timeline.style.color = "#333";
    } else {
        timeline.textContent = "6 - 9 Months";
        timeline.style.color = "#333";
    }

    // Buckets
    const buckets = ["Medical Bills"];
    const work = document.getElementById('workSelector').value;
    if (work !== 'none') buckets.push("Lost Wages");
    if (severity >= 3 || scarFace) buckets.push("Pain & Suffering");
    
    document.getElementById('res_buckets').textContent = buckets.join(", ");
}

/* ============================ */
/* Copy to Clipboard Logic      */
/* ============================ */
document.getElementById('btn-copy').addEventListener('click', () => {
    const date = new Date().toLocaleDateString();
    const stateCode = document.getElementById('stateSelector').value;
    const stateName = US_STATE_DATA[stateCode].name;
    const lawType = US_STATE_DATA[stateCode].liability;
    const risk = document.getElementById('res_riskTitle').textContent;
    const severity = inputSeverity.value;
    const body = document.getElementById('bodySelector').options[document.getElementById('bodySelector').selectedIndex].text;
    const strength = document.getElementById('strength-text').textContent;
    
    const text = `DOG BITE INCIDENT REPORT
Date: ${date}

--- SNAPSHOT ---
Jurisdiction: ${stateName} (${lawType})
Risk Assessment: ${risk}
Injury: ${severity}
Location: ${body}

--- LEGAL CONTEXT ---
Statute Note: ${US_STATE_DATA[stateCode].statuteNotes}
Case Strength: ${strength}
Readiness: ${document.getElementById('readiness-text').textContent}

--- NOTES ---
Generated by Dog Bite Tool.
Disclaimer: Not legal advice.`;

    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy');
        const originalText = btn.textContent;
        btn.textContent = "Copied to Clipboard!";
        setTimeout(() => btn.textContent = originalText, 2000);
    });
});

/* ============================ */
/* Advanced Toggle Logic        */
/* ============================ */
function initializeAdvancedToggle() {
    const btn = document.getElementById('advanced-toggle');
    let isAdvanced = false;

    btn.addEventListener('click', () => {
        isAdvanced = !isAdvanced;
        // Store state in attribute for easy retrieval
        btn.setAttribute('data-mode', isAdvanced ? "advanced" : "basic");
        btn.textContent = isAdvanced ? "Switch to Basic" : "Switch to Case Builder";

        const advancedElements = document.querySelectorAll('.advanced-content');
        const loader = document.getElementById('loading-bar-container');

        if (isAdvanced) {
            // Show Loader momentarily
            loader.classList.remove('hidden');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800); // Faster loader

            advancedElements.forEach(el => el.classList.remove('hidden'));
        } else {
            advancedElements.forEach(el => el.classList.add('hidden'));
        }
    });
}

/* ============================ */
/* UNIVERSAL PRINT, PDF & SHARE */
/* ============================ */
const ToolFeatures = {
    isTutorialUnlocked: false,

    /* 1. CONFIGURATION */
    PERSIST_MAP: {
        'state': { id: 'stateSelector', type: 'select' },
        'time': { id: 'timerSelector', type: 'select' },
        'sev': { id: 'slider_severity', type: 'range' },
        'body': { id: 'bodySelector', type: 'select' },
        'vic': { id: 'victimSelector', type: 'select' },
        'tres': { id: 'chk_trespass', type: 'checkbox' },
        'prov': { id: 'chk_provoked', type: 'checkbox' },
        'med': { id: 'medCostSelector', type: 'select' },
        'work': { id: 'workSelector', type: 'select' },
        'hist': { id: 'historySelector', type: 'select' },
        'ins': { id: 'insuranceSelector', type: 'select' },
        // Advanced checkboxes
        'scarb': { id: 'dmg_scar_body', type: 'checkbox' },
        'scarf': { id: 'dmg_scar_face', type: 'checkbox' },
        'nerve': { id: 'dmg_nerve', type: 'checkbox' },
        'ptsd': { id: 'dmg_ptsd', type: 'checkbox' },
        // Evidence checkboxes
        'evph': { id: 'ev_photos', type: 'checkbox' },
        'evdg': { id: 'ev_dog', type: 'checkbox' },
        'evwt': { id: 'ev_witness', type: 'checkbox' },
        'evrp': { id: 'ev_report', type: 'checkbox' },
        'evbl': { id: 'ev_bills', type: 'checkbox' }
    },

    /* 2. SHARE LOGIC */
    getShareUrl() {
        const params = new URLSearchParams();
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            const el = document.getElementById(config.id);
            if (el) {
                if(config.type === 'checkbox') {
                    params.set(key, el.checked ? '1' : '0');
                } else {
                    params.set(key, el.value);
                }
            }
        }
        
        // ADD MODE PERSISTENCE
        const toggleBtn = document.getElementById('advanced-toggle');
        if(toggleBtn.getAttribute('data-mode') === 'advanced') {
            params.set('mode', 'adv');
        }

        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    },

    async handleShare() {
        const shareUrl = this.getShareUrl();
        const shareData = { title: document.title, text: 'Dog Bite Incident Analysis', url: shareUrl };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) {}
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                const btn = document.getElementById('btn-share');
                const orig = btn.textContent;
                btn.textContent = "Copied!";
                setTimeout(() => btn.textContent = orig, 2000);
            } catch (err) { alert("Could not copy link."); }
        }
    },

    restoreState() {
        const params = new URLSearchParams(window.location.search);
        
        // 1. Restore Values
        for (const [key, config] of Object.entries(this.PERSIST_MAP)) {
            if (params.has(key)) {
                const el = document.getElementById(config.id);
                if (el) {
                    if(config.type === 'checkbox') {
                        el.checked = params.get(key) === '1';
                    } else {
                        el.value = params.get(key);
                    }
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        }

        // 2. Restore Visuals
        if(params.has('sev')) {
             updateSeverityVisual();
        }
        document.querySelectorAll('.custom-dropdown-container').forEach(container => {
            const select = container.querySelector('select');
            const trigger = container.querySelector('.custom-dropdown-trigger');
            if(select && trigger) {
                const selectedOption = select.options[select.selectedIndex];
                if(selectedOption) trigger.textContent = selectedOption.text;
            }
        });

        // 3. Restore Mode
        if(params.get('mode') === 'adv') {
            document.getElementById('advanced-toggle').click();
        }
    },

    /* 3. PRINT GENERATION */
    preparePrintData() {
        const printContainer = document.getElementById('print-content-injection');
        const printTitle = document.getElementById('print-doc-title');
        
        // --- 1. SET HEADER & METADATA ---
        printTitle.textContent = "DOG BITE INCIDENT ANALYSIS REPORT";
        const todayDate = new Date().toLocaleDateString();
        
        // --- 2. DATA EXTRACTION ---
        const stateCode = document.getElementById('stateSelector').value;
        const stateInfo = US_STATE_DATA[stateCode];
        
        // Inputs
        const timeLapseText = document.querySelector('#timerSelector option:checked').text;
        const severityText = document.getElementById('input_severity').value;
        const victimText = document.querySelector('#victimSelector option:checked').text;
        const bodyText = document.querySelector('#bodySelector option:checked').text;
        const isTrespass = document.getElementById('chk_trespass').checked ? "Yes" : "No";
        const isProvoked = document.getElementById('chk_provoked').checked ? "Yes" : "No";
        
        // Metrics
        const dogHist = document.querySelector('#historySelector option:checked').text;
        const insStatus = document.querySelector('#insuranceSelector option:checked').text;
        const medCost = document.querySelector('#medCostSelector option:checked').text;
        const workImpact = document.querySelector('#workSelector option:checked').text;
        
        // Calculations
        const timeline = document.getElementById('res_timeline').textContent;
        const buckets = document.getElementById('res_buckets').textContent;
        const readiness = document.getElementById('readiness-text').textContent;

        // Evidence Logic
        const evMap = {
            'ev_photos': 'Photos of Injury',
            'ev_dog': 'Photos of Offending Dog',
            'ev_witness': 'Witness Information',
            'ev_report': 'Animal Control Report',
            'ev_bills': 'Medical Bills / Records'
        };
        
        let haveListHTML = "";
        let needListHTML = "";
        
        for(const [id, label] of Object.entries(evMap)) {
            if(document.getElementById(id).checked) {
                haveListHTML += `<div class="print-check-item">[X] ${label}</div>`;
            } else {
                needListHTML += `<div class="print-check-item">[ ] ${label}</div>`;
            }
        }

        // Triage Note Logic
        let triageNote = "Face and hand injuries generally carry higher legal weight.";
        const timeVal = document.getElementById('timerSelector').value;
        if(timeVal === '24h' || timeVal === '1h' || timeVal === '1w') {
            triageNote += " Because the injury occurred recently, there is an infection risk. Do NOT stitch the wound closed without direct doctor advice, as this can trap bacteria.";
        }

        // --- 3. BUILD HTML (DOUBLE LINE / MINIMALIST / ROBOTO) ---
        // Header Wrapper is moved to CSS.
        
        let html = `
            <div class="print-meta-grid">
                <div class="print-meta-col">
                    <div class="print-row"><span class="print-label">PREPARED FOR:</span> <span class="print-val">Self-Assessment</span></div>
                    <div class="print-row"><span class="print-label">DATE:</span> <span class="print-val">${todayDate}</span></div>
                </div>
                <div class="print-meta-col">
                    <div class="print-row"><span class="print-label">JURISDICTION:</span> <span class="print-val">${stateInfo.name}</span></div>
                    <div class="print-row"><span class="print-label">TIME LAPSE:</span> <span class="print-val">${timeLapseText}</span></div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-header">I. JURISDICTIONAL CONTEXT (${stateInfo.name.toUpperCase()})</div>
                <div class="print-row"><span class="print-label">LEGAL BASELINE:</span> <span class="print-val">${stateInfo.liability.toUpperCase()} State</span></div>
                <div class="print-row"><span class="print-label">STATUTE OF LIMITATIONS:</span> <span class="print-val">${stateInfo.statuteLimitYears} Years from Incident Date</span></div>
                
                <div class="print-note-box">
                    <strong>SYSTEM NOTE:</strong> ${stateInfo.statuteNotes} No prior bite knowledge is needed to establish fault in strict liability jurisdictions.
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-header">II. TRIAGE & INJURY PROFILE</div>
                <div class="print-cols-2">
                    <div class="print-col">
                        <div class="print-row"><span class="print-label">Injury Severity:</span> <span class="print-val">${severityText}</span></div>
                        <div class="print-row"><span class="print-label">Victim Age Group:</span> <span class="print-val">${victimText}</span></div>
                        <div class="print-row"><span class="print-label">Injury Location:</span> <span class="print-val">${bodyText}</span></div>
                    </div>
                    <div class="print-col">
                         <div class="print-row"><span class="print-label">Context (Trespass):</span> <span class="print-val">${isTrespass}</span></div>
                         <div class="print-row"><span class="print-label">Context (Provoked):</span> <span class="print-val">${isProvoked}</span></div>
                    </div>
                </div>

                <div class="print-note-box">
                    <strong>TRIAGE NOTE:</strong> ${triageNote}
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-header">III. INCIDENT METRICS & ESTIMATES</div>
                <div class="print-cols-2">
                    <div class="print-col">
                        <div class="print-row"><span class="print-label">Offending Dog History:</span> <span class="print-val">${dogHist}</span></div>
                        <div class="print-row"><span class="print-label">Owner Insurance Status:</span> <span class="print-val">${insStatus}</span></div>
                    </div>
                    <div class="print-col">
                         <div class="print-row"><span class="print-label">Estimated Medicals:</span> <span class="print-val">${medCost}</span></div>
                         <div class="print-row"><span class="print-label">Workplace Impact:</span> <span class="print-val">${workImpact}</span></div>
                    </div>
                </div>
                
                <div style="margin-top: 10px; border-top: 1px dotted #ccc; padding-top:5px;">
                    <div class="print-row"><span class="print-label">ELIGIBLE COMPENSATION:</span> <span class="print-val">${buckets}</span></div>
                    <div class="print-row"><span class="print-label">ESTIMATED TIMELINE:</span> <span class="print-val">${timeline}</span></div>
                </div>
            </div>

            <div class="print-section">
                <div class="print-section-header">IV. EVIDENCE CHECKLIST (${readiness})</div>
                <div class="print-cols-2" style="align-items: flex-start; gap: 20px;">
                    <div class="print-col">
                        <div class="print-sub-header">HAVE:</div>
                        ${haveListHTML}
                    </div>
                    <div class="print-col">
                        <div class="print-sub-header">NEED:</div>
                        ${needListHTML}
                    </div>
                </div>
            </div>
            
             <div class="print-signature-row">
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <div class="sig-label">CLAIMANT SIGNATURE</div>
                </div>
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <div class="sig-label">DATE</div>
                </div>
            </div>
            
            <div class="print-footer-disclaimer">
                <strong>LEGAL & MEDICAL DISCLAIMER:</strong> This analysis is generated automatically by a browser-based tool and does not transmit or store personal data. It is for educational and preparatory purposes only. This is NOT a legal document, nor does it constitute legal or medical advice. For medical emergencies, visit urgent care immediately. To pursue a claim, consult a licensed personal injury attorney in your state.
                <br><br>
                <strong>DISCLAIMER:</strong> This document provides a mathematical approximation based on user-supplied data. It does not constitute a binding financial offer, legal advice, or a guarantee of terms. Generated by Solveria Sovereign Finance Engine.
            </div>
        `;

        printContainer.innerHTML = html;
    },

    /* 4. TUTORIAL & MODAL LOGIC */
    closeTutorialModal() {
        document.getElementById('pdf-tutorial-overlay').classList.remove('active');
    },

    handleTutorialProceed() {
        this.closeTutorialModal();
        window.print();
    },

    startPrintSequence() {
        const modal = document.getElementById('pdf-tutorial-overlay');
        const proceedBtn = document.getElementById('btn-proceed');
        
        if (this.isTutorialUnlocked) {
            this.preparePrintData();
            modal.classList.add('active');
            proceedBtn.disabled = false;
            proceedBtn.textContent = "Proceed";
            return;
        }

        let timeLeft = 3;
        this.preparePrintData();
        modal.classList.add('active');
        proceedBtn.disabled = true;
        proceedBtn.textContent = `Proceed (${timeLeft})`;
        
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) proceedBtn.textContent = `Proceed (${timeLeft})`;
            else {
                clearInterval(timer);
                proceedBtn.textContent = "Proceed";
                proceedBtn.disabled = false;
                this.isTutorialUnlocked = true;
            }
        }, 1000);
    },

    init() {
        // Init features
        const btnShare = document.getElementById('btn-share');
        if (btnShare) btnShare.addEventListener('click', () => this.handleShare());

        const btnPrint = document.getElementById('btn-print');
        if (btnPrint) btnPrint.addEventListener('click', () => {
            this.preparePrintData();
            window.print();
        });

        const btnPDF = document.getElementById('btn-save-pdf');
        if (btnPDF) btnPDF.addEventListener('click', () => this.startPrintSequence());

        const btnProceed = document.getElementById('btn-proceed');
        if (btnProceed) btnProceed.addEventListener('click', () => this.handleTutorialProceed());

        const modal = document.getElementById('pdf-tutorial-overlay');
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) this.closeTutorialModal(); });
        
        // Restore
        this.restoreState();
    }
};

/* ============================ */
/* Main Initialization          */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate States
    initializeStates();
    
    // 2. Init Dropdown Logic
    initializeCustomDropdowns();
    
    // 3. Init Toggles
    initializeAdvancedToggle();
    
    // 4. Init Slider Visuals
    if(sliderSeverity) {
        sliderSeverity.addEventListener('input', updateSeverityVisual);
        updateSeverityVisual();
    }
    
    // 5. Attach listeners to all inputs to trigger updates
    const triggers = document.querySelectorAll('select, input, .calc-trigger, .evidence-trigger');
    triggers.forEach(el => el.addEventListener('change', updateAnalysis));
    
    // 6. Initial Calculation
    updateAnalysis();

    // 7. Init Print/PDF/Share Features
    ToolFeatures.init();
});