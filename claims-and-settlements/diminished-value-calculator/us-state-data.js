// us-state-data.js

/**
 * THE HYBRID STATE DATA REPOSITORY
 *
 * STRUCTURE EXPLANATION:
 * bucket: Triggers the Calculator Logic (17c vs Standard vs Restricted)
 * status: The legal reality (displayed in the Header/Results)
 * tip:    The tactical advice (displayed in "What to do next" context)
 *
 * BUCKET KEYS:
 * 'formula'    -> Triggers 17c Math (Georgia & NC)
 * 'restricted' -> Triggers "Hard to Recover" Warnings (Michigan)
 * 'standard'   -> Triggers Standard Common Law Logic (Everyone else)
 */

export const US_STATE_DATA = {
  AL: {
    name: "Alabama",
    bucket: "standard",
    status: "Common Law State. You are entitled to the difference in market value.",
    tip: "Policy language often excludes first-party claims; focus on third-party liability."
  },
  AK: {
    name: "Alaska",
    bucket: "standard",
    status: "Common Law State. Entitled to be made whole.",
    tip: "Courts generally uphold third-party DV claims with valid evidence."
  },
  AZ: {
    name: "Arizona",
    bucket: "standard",
    status: "Common Law State (Ref: Oliver v. Henry).",
    tip: "Arizona case law supports recovery of value loss in third-party claims."
  },
  AR: {
    name: "Arkansas",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Insurers often demand a trade-in quote as proof. Get one from a major dealer."
  },
  CA: {
    name: "California",
    bucket: "standard",
    status: "Consumer Protection State (Jury Instruction 3903J).",
    tip: "California Jury Instructions explicitly recognize the difference in market value as valid damages."
  },
  CO: {
    name: "Colorado",
    bucket: "standard",
    status: "Statutory Protection State.",
    tip: "Recent legislation requires insurers to disclose that DV coverage is available in third-party claims."
  },
  CT: {
    name: "Connecticut",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Dealer quotes are persuasive here. Case law supports recovery from at-fault drivers."
  },
  DE: {
    name: "Delaware",
    bucket: "standard",
    status: "Common Law State.",
    tip: "First-party claims often barred by 'repair or replace' clauses; pursue the at-fault driver."
  },
  DC: {
    name: "District of Columbia",
    bucket: "standard",
    status: "Common Law Jurisdiction.",
    tip: "Documentation is key. D.C. courts generally recognize DV in tort claims."
  },
  FL: {
    name: "Florida",
    bucket: "standard",
    status: "Common Law State (Ref: Siegle v. Progressive).",
    tip: "Third-party claims are valid. First-party claims are generally excluded unless stated in policy."
  },
  GA: {
    name: "Georgia",
    bucket: "formula",
    status: "The '17c' Formula State (Ref: State Farm v. Mabry).",
    tip: "Insurers use a specific cap here. However, the formula is a floor, not a ceiling. You can still negotiate."
  },
  HI: {
    name: "Hawaii",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Shipping costs complicate value; get local island dealer quotes to prove loss."
  },
  ID: {
    name: "Idaho",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Insurers will aggressively request proof of loss. Provide concrete market examples."
  },
  IL: {
    name: "Illinois",
    bucket: "standard",
    status: "Common Law State (Pattern Jury Instructions).",
    tip: "Jury instructions allow for the difference in value before and after the accident."
  },
  IN: {
    name: "Indiana",
    bucket: "standard",
    status: "Common Law State (Ref: Wiese v. QA3 Financial).",
    tip: "Burden of proof is on you. Compare pre-crash value vs. post-repair trade-in offer."
  },
  IA: {
    name: "Iowa",
    bucket: "standard",
    status: "Common Law / Halvan Standard.",
    tip: "Recovery allowed, provided total damages don't exceed pre-accident vehicle value."
  },
  KS: {
    name: "Kansas",
    bucket: "standard",
    status: "Common Law State.",
    tip: "First-party claims usually excluded by contract; third-party claims are the standard path."
  },
  KY: {
    name: "Kentucky",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Courts generally uphold the right to recover market value loss from at-fault drivers."
  },
  LA: {
    name: "Louisiana",
    bucket: "standard",
    status: "Common Law State (Orleans Parish Precedent).",
    tip: "Use NADA/KBB data + a trade-in quote to substantiate your claim."
  },
  ME: {
    name: "Maine",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Third-party claims are valid. Document your loss with written dealer offers."
  },
  MD: {
    name: "Maryland",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Insurers here often demand an independent appraisal report to validate the number."
  },
  MA: {
    name: "Massachusetts",
    bucket: "standard",
    status: "Complex Common Law (Ref: McGilloway).",
    tip: "Case law opened the door for DV, but standard policies try to exclude it. Pursue the at-fault driver."
  },
  MI: {
    name: "Michigan",
    bucket: "restricted",
    status: "Restricted No-Fault State.",
    tip: "Recovery is difficult. You are generally limited to the 'Mini-Tort' provision (capped amount) for vehicle damage."
  },
  MN: {
    name: "Minnesota",
    bucket: "standard",
    status: "Common Law State.",
    tip: "First-party recovery often blocked by 'repair or replace' language. Focus on third-party."
  },
  MS: {
    name: "Mississippi",
    bucket: "standard",
    status: "Common Law State.",
    tip: "You must prove the loss of value with specific market data (ads/quotes)."
  },
  MO: {
    name: "Missouri",
    bucket: "standard",
    status: "Common Law State (Ref: Williams v. Farm Bureau).",
    tip: "Measure of damages is explicitly the difference in fair market value before and after."
  },
  MT: {
    name: "Montana",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Burden of proof lies with the owner. Get a written statement from a dealer."
  },
  NE: {
    name: "Nebraska",
    bucket: "standard",
    status: "Common Law State (Ref: Chlopek v. Schmall).",
    tip: "You are entitled to the difference in value immediately before and after the accident."
  },
  NV: {
    name: "Nevada",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Law requires you to be made whole. Do not accept 'we don't pay DV' as an answer."
  },
  NH: {
    name: "New Hampshire",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Third-party DV claims are allowed. Liable parties owe the damages regardless of insurance status."
  },
  NJ: {
    name: "New Jersey",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Insurers may ask for a 'sold vehicle report,' but a solid trade-in offer is often sufficient evidence."
  },
  NM: {
    name: "New Mexico",
    bucket: "standard",
    status: "Common Law State (Ref: Hale v. Basin Motor).",
    tip: "Damages are calculated as the difference in value before and after the accident."
  },
  NY: {
    name: "New York",
    bucket: "standard",
    status: "Common Law State (Ref: Franklin Corp v. Prahler).",
    tip: "Precedents are older here; a professional appraisal is highly recommended to prove the loss."
  },
  NC: {
    name: "North Carolina",
    bucket: "formula",
    status: "Statutory Formula State.",
    tip: "NC allows First-Party claims but often uses a state-specific calculation. Check if the offer matches the statute."
  },
  ND: {
    name: "North Dakota",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Entitled to be made whole. Third-party claims are valid."
  },
  OH: {
    name: "Ohio",
    bucket: "standard",
    status: "Common Law State (Ref: Rakich v. Anthem).",
    tip: "Generally recognizes DV in third-party tort cases. Proof of loss via appraisal is key."
  },
  OK: {
    name: "Oklahoma",
    bucket: "standard",
    status: "Common Law State (Ref: Brennan v. Aston Martin).",
    tip: "You are entitled to the reduction in market value. Document it clearly."
  },
  OR: {
    name: "Oregon",
    bucket: "standard",
    status: "Common Law State (Ref: Gonzales v. Farmers).",
    tip: "Strong case law supports DV. Entitled to market value difference, even in some first-party cases."
  },
  PA: {
    name: "Pennsylvania",
    bucket: "standard",
    status: "Common Law State.",
    tip: "First-party claims generally excluded (Lobozzo precedent). You must sue the at-fault driver's carrier."
  },
  RI: {
    name: "Rhode Island",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Insurers are tough here, but the law supports third-party recovery with good evidence."
  },
  SC: {
    name: "South Carolina",
    bucket: "standard",
    status: "Common Law State.",
    tip: "SC is NOT a 17c state, though insurers often try to use the Georgia formula. Reject it."
  },
  SD: {
    name: "South Dakota",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Third-party recovery is standard. You must prove the market value drop."
  },
  TN: {
    name: "Tennessee",
    bucket: "standard",
    status: "Common Law State (Ref: Black v. State Farm).",
    tip: "Third-party claims allowed. First-party claims are usually barred by policy definitions."
  },
  TX: {
    name: "Texas",
    bucket: "standard",
    status: "Common Law State (Ref: Senters v. State Farm).",
    tip: "First-party claims generally not allowed. Strong support for third-party liability claims."
  },
  UT: {
    name: "Utah",
    bucket: "standard",
    status: "Common Law State (Ref: Mets v. Amco).",
    tip: "Damages = difference in market value before and after. Get dealer verification."
  },
  VT: {
    name: "Vermont",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Entitled to be made whole. Third-party claims are the primary path."
  },
  VA: {
    name: "Virginia",
    bucket: "standard",
    status: "Common Law State (Ref: Average v. VA Farm Bureau).",
    tip: "You must clearly demonstrate the loss in value with data."
  },
  WA: {
    name: "Washington",
    bucket: "standard",
    status: "Pro-Consumer State (Ref: Moeller v. Farmers).",
    tip: "Case law famously allowed First-Party DV claims. You have strong leverage here."
  },
  WV: {
    name: "West Virginia",
    bucket: "standard",
    status: "Common Law State (Ref: Ellis v. King).",
    tip: "Entitled to difference in market value. Gather trade-in offers."
  },
  WI: {
    name: "Wisconsin",
    bucket: "standard",
    status: "Common Law State (Ref: Hellenbrand v. Hilliard).",
    tip: "Entitled to value difference, even if repairs were done perfectly."
  },
  WY: {
    name: "Wyoming",
    bucket: "standard",
    status: "Common Law State.",
    tip: "Third-party recovery is standard. Prove loss with market data."
  }
};