/**
 * Post-UTME / screening windows — update each admission cycle.
 * Dates are indicative planning windows; always confirm on school portals.
 */

export type DeadlineEntry = {
  slug: string;
  school: string;
  shortName: string;
  state: string;
  /** Free-text status for SEO pages */
  status: "Open" | "Announced" | "Closed" | "Not yet announced";
  window: string;
  formFeeHint: string;
  portalHint: string;
  keywords: string[];
};

export const postUtmeDeadlines: DeadlineEntry[] = [
  {
    slug: "unilag",
    school: "University of Lagos",
    shortName: "UNILAG",
    state: "Lagos",
    status: "Announced",
    window: "Usually after UTME results — check unilag.edu.ng for the exact 2026 window",
    formFeeHint: "Varies by year (confirm on portal)",
    portalHint: "https://unilag.edu.ng",
    keywords: ["UNILAG Post-UTME form", "UNILAG screening deadline 2026"],
  },
  {
    slug: "ui",
    school: "University of Ibadan",
    shortName: "UI",
    state: "Oyo",
    status: "Announced",
    window: "Post-UTME / aptitude test schedule published on ui.edu.ng each cycle",
    formFeeHint: "Confirm on UI admissions portal",
    portalHint: "https://www.ui.edu.ng",
    keywords: ["UI Post-UTME form", "University of Ibadan screening 2026"],
  },
  {
    slug: "oau",
    school: "Obafemi Awolowo University",
    shortName: "OAU",
    state: "Osun",
    status: "Announced",
    window: "Watch oauife.edu.ng admissions notices after JAMB policy meeting",
    formFeeHint: "Confirm on OAU portal",
    portalHint: "https://oauife.edu.ng",
    keywords: ["OAU Post-UTME form", "OAU screening deadline"],
  },
  {
    slug: "uniben",
    school: "University of Benin",
    shortName: "UNIBEN",
    state: "Edo",
    status: "Not yet announced",
    window: "Typically opens after institutional cut-off confirmation",
    formFeeHint: "Confirm on uniben.edu",
    portalHint: "https://www.uniben.edu",
    keywords: ["UNIBEN Post-UTME form 2026"],
  },
  {
    slug: "unn",
    school: "University of Nigeria, Nsukka",
    shortName: "UNN",
    state: "Enugu",
    status: "Not yet announced",
    window: "Follow unn.edu.ng for Post-UTME advert",
    formFeeHint: "Confirm on UNN portal",
    portalHint: "https://www.unn.edu.ng",
    keywords: ["UNN Post-UTME form"],
  },
  {
    slug: "abu",
    school: "Ahmadu Bello University",
    shortName: "ABU",
    state: "Kaduna",
    status: "Not yet announced",
    window: "Check abu.edu.ng admissions",
    formFeeHint: "Confirm on ABU portal",
    portalHint: "https://www.abu.edu.ng",
    keywords: ["ABU Post-UTME form", "ABU Zaria screening"],
  },
  {
    slug: "unilorin",
    school: "University of Ilorin",
    shortName: "UNILORIN",
    state: "Kwara",
    status: "Not yet announced",
    window: "unilorin.edu.ng publishes screening dates each year",
    formFeeHint: "Confirm on portal",
    portalHint: "https://www.unilorin.edu.ng",
    keywords: ["UNILORIN Post-UTME form 2026"],
  },
  {
    slug: "lasu",
    school: "Lagos State University",
    shortName: "LASU",
    state: "Lagos",
    status: "Not yet announced",
    window: "Follow lasu.edu.ng for online screening updates",
    formFeeHint: "Confirm on LASU portal",
    portalHint: "https://www.lasu.edu.ng",
    keywords: ["LASU Post-UTME form", "LASU screening deadline"],
  },
  {
    slug: "futa",
    school: "Federal University of Technology, Akure",
    shortName: "FUTA",
    state: "Ondo",
    status: "Not yet announced",
    window: "futa.edu.ng admissions section",
    formFeeHint: "Confirm on FUTA portal",
    portalHint: "https://www.futa.edu.ng",
    keywords: ["FUTA Post-UTME form"],
  },
  {
    slug: "unizik",
    school: "Nnamdi Azikiwe University",
    shortName: "UNIZIK",
    state: "Anambra",
    status: "Not yet announced",
    window: "unizik.edu.ng for Post-UTME advert",
    formFeeHint: "Confirm on portal",
    portalHint: "https://www.unizik.edu.ng",
    keywords: ["UNIZIK Post-UTME form 2026"],
  },
];

export const deadlineMeta = {
  updated: "2026-09-23",
  disclaimer:
    "Dates and fees change every cycle. This board is a planning hub — only school portals and JAMB CAPS are authoritative.",
};
