// us-state-data.js
// Dog-bite state baseline data for frontend use
// Fields per state:
//  - code: USPS state code
//  - name: state name
//  - liability: "strict" | "one-bite" | "negligence" | "mixed"
//  - statuteLimitYears: numeric (years for personal injury / dog-bite claims)
//  - statuteNotes: short human-friendly note about nuance
//  - collectionRisk: "low" | "medium" | "high" (heuristic: strict states = lower risk of dismissal)
//  - lastChecked: ISO date
//  - sources: array of short domain strings

const US_STATE_DATA = {
  "AL": {
    code: "AL",
    name: "Alabama",
    liability: "mixed", // "Emily's Law" creates strict liability if dangerous, but often negligence/one-bite otherwise
    statuteLimitYears: 2,
    statuteNotes: "Strict liability often requires the dog to be known as dangerous/vicious; otherwise, negligence applies.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["animallaw.info", "findlaw.com"]
  },
  "AK": {
    code: "AK",
    name: "Alaska",
    liability: "one-bite",
    statuteLimitYears: 2,
    statuteNotes: "Generally follows the 'one-bite rule' requiring proof of owner negligence or prior knowledge.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["nolo.com", "animallaw.info"]
  },
  "AZ": {
    code: "AZ",
    name: "Arizona",
    liability: "strict",
    statuteLimitYears: 1, // Statutory strict liability is 1 year; negligence is 2. Safe to warn 1.
    statuteNotes: "Strict liability claims must be filed within 1 year; general negligence claims have 2 years.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["azleg.gov", "findlaw.com"]
  },
  "AR": {
    code: "AR",
    name: "Arkansas",
    liability: "one-bite",
    statuteLimitYears: 3,
    statuteNotes: "Follows the one-bite rule; liability typically requires proof the owner knew of aggression.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["justia.com", "animallaw.info"]
  },
  "CA": {
    code: "CA",
    name: "California",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies in public or lawfully in private; no prior bite knowledge needed.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["leginfo.legislature.ca.gov", "findlaw.com"]
  },
  "CO": {
    code: "CO",
    name: "Colorado",
    liability: "mixed", // Strict for serious bodily injury, one-bite for others
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies primarily to 'serious bodily injury.' Minor injuries may require proving negligence.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["courts.state.co.us", "animallaw.info"]
  },
  "CT": {
    code: "CT",
    name: "Connecticut",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability unless the victim was teasing, tormenting, or trespassing.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["cga.ct.gov", "justia.com"]
  },
  "DE": {
    code: "DE",
    name: "Delaware",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Owner is strictly liable unless the victim was trespassing, teasing, or tormenting the dog.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["delcode.delaware.gov", "findlaw.com"]
  },
  "FL": {
    code: "FL",
    name: "Florida",
    liability: "strict",
    statuteLimitYears: 4,
    statuteNotes: "Strict liability generally applies, but damages can be reduced by victim's percentage of fault.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["leg.state.fl.us", "findlaw.com"]
  },
  "GA": {
    code: "GA",
    name: "Georgia",
    liability: "mixed",
    statuteLimitYears: 2,
    statuteNotes: "Modified one-bite: Liability if owner knew of danger OR dog was off-leash in violation of local law.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["justia.com", "animallaw.info"]
  },
  "HI": {
    code: "HI",
    name: "Hawaii",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies. The owner is presumed liable for injuries caused by the dog.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["capitol.hawaii.gov", "nolo.com"]
  },
  "ID": {
    code: "ID",
    name: "Idaho",
    liability: "one-bite",
    statuteLimitYears: 2,
    statuteNotes: "Generally requires proof of negligence or prior knowledge (one-bite), unless statutes specify otherwise.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["legislature.idaho.gov", "findlaw.com"]
  },
  "IL": {
    code: "IL",
    name: "Illinois",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies if the dog attacks without provocation and the victim is lawfully present.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["ilga.gov", "animallaw.info"]
  },
  "IN": {
    code: "IN",
    name: "Indiana",
    liability: "mixed",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability for victims carrying out legal duties (e.g., mail carriers); one-bite rule often applies otherwise.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["iga.in.gov", "justia.com"]
  },
  "IA": {
    code: "IA",
    name: "Iowa",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies. Owner is liable for all damages unless the victim was committing an unlawful act.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["legis.iowa.gov", "findlaw.com"]
  },
  "KS": {
    code: "KS",
    name: "Kansas",
    liability: "one-bite",
    statuteLimitYears: 2,
    statuteNotes: "Follows the one-bite rule; usually requires proving the owner knew the dog was dangerous.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["kslegislature.org", "animallaw.info"]
  },
  "KY": {
    code: "KY",
    name: "Kentucky",
    liability: "strict",
    statuteLimitYears: 1, // Crucially short
    statuteNotes: "Strict liability applies, but the filing window is short (1 year). Immediate action recommended.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["lrc.ky.gov", "findlaw.com"]
  },
  "LA": {
    code: "LA",
    name: "Louisiana",
    liability: "strict",
    statuteLimitYears: 1, // Crucially short
    statuteNotes: "Owner is strictly liable if they could have prevented the injury. 1-year deadline is strict.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["legis.la.gov", "justia.com"]
  },
  "ME": {
    code: "ME",
    name: "Maine",
    liability: "strict",
    statuteLimitYears: 6,
    statuteNotes: "Strict liability for damages. Fault by the victim (provocation) can reduce compensation.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["mainelegislature.org", "animallaw.info"]
  },
  "MD": {
    code: "MD",
    name: "Maryland",
    liability: "mixed",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability if the dog was 'at large' (off-leash). Contributory negligence is a strong defense.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["mgaleg.maryland.gov", "findlaw.com"]
  },
  "MA": {
    code: "MA",
    name: "Massachusetts",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies unless the victim was trespassing, teasing, or tormenting the dog.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["malegislature.gov", "justia.com"]
  },
  "MI": {
    code: "MI",
    name: "Michigan",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies if the bite occurred publicly or while lawfully on private property.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["legislature.mi.gov", "animallaw.info"]
  },
  "MN": {
    code: "MN",
    name: "Minnesota",
    liability: "strict",
    statuteLimitYears: 6,
    statuteNotes: "Strict liability applies if the victim was acting peaceably and lawfully. Long filing window.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["revisor.mn.gov", "findlaw.com"]
  },
  "MS": {
    code: "MS",
    name: "Mississippi",
    liability: "one-bite",
    statuteLimitYears: 3,
    statuteNotes: "Generally follows the one-bite rule unless the dog was already deemed dangerous.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["justia.com", "animallaw.info"]
  },
  "MO": {
    code: "MO",
    name: "Missouri",
    liability: "strict",
    statuteLimitYears: 5,
    statuteNotes: "Strict liability for bites on public property or lawfully on private property.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["revisor.mo.gov", "findlaw.com"]
  },
  "MT": {
    code: "MT",
    name: "Montana",
    liability: "mixed",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability often applies in incorporated cities/towns; negligence rules may apply elsewhere.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["leg.mt.gov", "animallaw.info"]
  },
  "NE": {
    code: "NE",
    name: "Nebraska",
    liability: "strict",
    statuteLimitYears: 4,
    statuteNotes: "Strict liability applies unless the victim was trespassing or committing a mischievous act.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["nebraskalegislature.gov", "findlaw.com"]
  },
  "NV": {
    code: "NV",
    name: "Nevada",
    liability: "one-bite",
    statuteLimitYears: 2,
    statuteNotes: "One-bite rule typically applies; must prove owner negligence or prior knowledge of danger.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["leg.state.nv.us", "animallaw.info"]
  },
  "NH": {
    code: "NH",
    name: "New Hampshire",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability for all damage done by a dog to a person or property.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["gencourt.state.nh.us", "findlaw.com"]
  },
  "NJ": {
    code: "NJ",
    name: "New Jersey",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies regardless of the dog's history. Trespassing is a key defense.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["njleg.state.nj.us", "justia.com"]
  },
  "NM": {
    code: "NM",
    name: "New Mexico",
    liability: "one-bite",
    statuteLimitYears: 3,
    statuteNotes: "One-bite rule or negligence generally applies; lack of prior aggression is a strong defense.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["nmcourts.gov", "animallaw.info"]
  },
  "NY": {
    code: "NY",
    name: "New York",
    liability: "mixed",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability for medical bills; negligence must be proven for other damages (pain & suffering).",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["nysenate.gov", "animallaw.info"]
  },
  "NC": {
    code: "NC",
    name: "North Carolina",
    liability: "mixed",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability if dog is 'dangerous' or at large at night; otherwise negligence applies.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["ncleg.gov", "findlaw.com"]
  },
  "ND": {
    code: "ND",
    name: "North Dakota",
    liability: "one-bite",
    statuteLimitYears: 6,
    statuteNotes: "One-bite rule applies; liability usually depends on owner's knowledge of aggression.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["legis.nd.gov", "animallaw.info"]
  },
  "OH": {
    code: "OH",
    name: "Ohio",
    liability: "strict",
    statuteLimitYears: 2, // 2 years for PI, 6 for some statutory contexts, safer to assume 2.
    statuteNotes: "Strict liability applies unless victim was trespassing, teasing, or committing a crime.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["codes.ohio.gov", "findlaw.com"]
  },
  "OK": {
    code: "OK",
    name: "Oklahoma",
    liability: "strict",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability applies to bites occurring when the victim is lawfully present/not trespassing.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["oksenate.gov", "justia.com"]
  },
  "OR": {
    code: "OR",
    name: "Oregon",
    liability: "mixed",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability for economic damages (bills); negligence proof needed for non-economic damages.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["oregonlegislature.gov", "animallaw.info"]
  },
  "PA": {
    code: "PA",
    name: "Pennsylvania",
    liability: "mixed", // Strict for medical, negligence for full tort
    statuteLimitYears: 2,
    statuteNotes: "Strict liability covers medical costs; proving negligence is required for full compensation.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["legis.state.pa.us", "findlaw.com"]
  },
  "RI": {
    code: "RI",
    name: "Rhode Island",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies. Double damages may be available if the dog has bitten before.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["webserver.rilin.state.ri.us", "animallaw.info"]
  },
  "SC": {
    code: "SC",
    name: "South Carolina",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies unless the victim provoked or harassed the dog.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["scstatehouse.gov", "findlaw.com"]
  },
  "SD": {
    code: "SD",
    name: "South Dakota",
    liability: "one-bite",
    statuteLimitYears: 3,
    statuteNotes: "Generally follows the one-bite rule/negligence; lack of prior history is a defense.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["sdlegislature.gov", "animallaw.info"]
  },
  "TN": {
    code: "TN",
    name: "Tennessee",
    liability: "mixed",
    statuteLimitYears: 1, // Crucially short
    statuteNotes: "Strict liability if 'at large' or in public; one-bite rule often applies on owner's property. 1 year SOL.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["tn.gov", "findlaw.com"]
  },
  "TX": {
    code: "TX",
    name: "Texas",
    liability: "negligence", // "One Bite" with negligence focus
    statuteLimitYears: 2,
    statuteNotes: "Follows the 'One Bite Rule' / Negligence. Must prove owner knew of danger or failed to be careful.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["statutes.capitol.texas.gov", "justia.com"]
  },
  "UT": {
    code: "UT",
    name: "Utah",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies. Owner is liable for damages regardless of the dog's history.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["le.utah.gov", "findlaw.com"]
  },
  "VT": {
    code: "VT",
    name: "Vermont",
    liability: "one-bite",
    statuteLimitYears: 3,
    statuteNotes: "Generally follows one-bite rule; usually requires proving owner negligence or knowledge.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["legislature.vermont.gov", "animallaw.info"]
  },
  "VA": {
    code: "VA",
    name: "Virginia",
    liability: "mixed", // One Bite / Negligence Per Se
    statuteLimitYears: 2,
    statuteNotes: "One-bite rule generally, but 'Negligence Per Se' applies if leash laws were violated.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["law.lis.virginia.gov", "findlaw.com"]
  },
  "WA": {
    code: "WA",
    name: "Washington",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies to bites occurring in public or lawfully on private property.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["leg.wa.gov", "animallaw.info"]
  },
  "WV": {
    code: "WV",
    name: "West Virginia",
    liability: "mixed",
    statuteLimitYears: 2,
    statuteNotes: "Strict liability if dog is 'at large'; negligence/one-bite applies if confined/on property.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["wvlegislature.gov", "findlaw.com"]
  },
  "WI": {
    code: "WI",
    name: "Wisconsin",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability applies. Double damages possible if owner knew of prior bites.",
    collectionRisk: "low",
    lastChecked: "2025-02-08",
    sources: ["docs.legis.wisconsin.gov", "findlaw.com"]
  },
  "WY": {
    code: "WY",
    name: "Wyoming",
    liability: "one-bite",
    statuteLimitYears: 4,
    statuteNotes: "Follows the one-bite rule. Must prove owner knew the dog was dangerous.",
    collectionRisk: "high",
    lastChecked: "2025-02-08",
    sources: ["wyoleg.gov", "animallaw.info"]
  },
  "DC": {
    code: "DC",
    name: "District of Columbia",
    liability: "strict",
    statuteLimitYears: 3,
    statuteNotes: "Strict liability if the dog is at large; negligence applies if the dog is leashed/on property.",
    collectionRisk: "medium",
    lastChecked: "2025-02-08",
    sources: ["code.dccouncil.gov", "findlaw.com"]
  }
};

export default US_STATE_DATA;