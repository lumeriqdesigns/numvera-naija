/**
 * Institutional minimum UTME scores submitted for the 2026 admission cycle
 * (JAMB Policy Meeting on Admissions, Abuja — reported May 2026).
 *
 * These are SCHOOL FLOORS for Post-UTME / screening eligibility — NOT departmental merit aggregates.
 * Departmental cut-offs (after screening) are higher and course-specific.
 *
 * National floor (universities): 150 · Polytechnics: 100 · Colleges of Nursing: 150
 * Sources: Punch, Vanguard, The Nation, Leadership, Daily Post (May 2026 policy coverage).
 */

export const NATIONAL_MIN = {
  university: 150,
  polytechnic: 100,
  collegeOfNursing: 150,
  policyYear: 2026,
  policyNote:
    "2026 JAMB Policy Meeting: universities & colleges of nursing minimum admissible score 150; polytechnics 100.",
} as const;

/** Map of our university slugs → official institutional UTME minimum where published */
export const institutionalMinima2026: Record<string, number> = {
  // 220
  "pan-atlantic": 220,
  // 200
  oau: 200,
  uniben: 200,
  ui: 200,
  unilag: 200,
  unn: 200,
  covenant: 200,
  // 195
  lasustech: 195,
  lasu: 195,
  // 180
  abuad: 180,
  abu: 180,
  fuhso: 180, // Federal University of Health Sciences path
  "police-academy": 180,
  uniabuja: 180,
  unilorin: 180,
  // 170
  unijos: 170,
  babcock: 170,
  fulafia: 170,
  // 160 (examples from extended lists)
  atbu: 160,
  buk: 160,
  funaab: 160,
  // Remaining schools on our list without a named policy figure:
  // keep existing data or fall back toward national 150+ typical floors
};

/**
 * Competitive course UTME *planning* targets (not official departmental lists).
 * Informed by published competitive patterns + 2026 institutional floors.
 */
export const competitiveCourseHints2026: Record<
  string,
  { course: string; utmeMin: number; aggregateHint?: number }[]
> = {
  unilag: [
    { course: "Medicine & Surgery", utmeMin: 280, aggregateHint: 83 },
    { course: "Law", utmeMin: 260, aggregateHint: 79 },
    { course: "Computer Science", utmeMin: 250, aggregateHint: 82 },
    { course: "Accounting", utmeMin: 240, aggregateHint: 68 },
    { course: "Mass Communication", utmeMin: 240, aggregateHint: 74 },
    { course: "Nursing", utmeMin: 260, aggregateHint: 77 },
    { course: "Pharmacy", utmeMin: 250, aggregateHint: 78 },
    { course: "Engineering (general)", utmeMin: 250, aggregateHint: 75 },
  ],
  ui: [
    { course: "Medicine & Surgery", utmeMin: 280, aggregateHint: 78 },
    { course: "Law", utmeMin: 250, aggregateHint: 72 },
    { course: "Pharmacy", utmeMin: 260, aggregateHint: 74 },
    { course: "Computer Science", utmeMin: 240, aggregateHint: 68 },
    { course: "Economics", utmeMin: 230, aggregateHint: 65 },
  ],
  oau: [
    { course: "Medicine & Surgery", utmeMin: 270, aggregateHint: 76 },
    { course: "Law", utmeMin: 250, aggregateHint: 72 },
    { course: "Pharmacy", utmeMin: 260, aggregateHint: 74 },
    { course: "Computer Science", utmeMin: 240, aggregateHint: 66 },
    { course: "Electrical Engineering", utmeMin: 240, aggregateHint: 65 },
  ],
};

export const cutoffDataMeta = {
  institutionalSource: "JAMB 2026 Policy Meeting (institutional minima published May 2026)",
  departmentalNote:
    "Course-level figures are planning guides from competitive patterns and published merit trends — always confirm on the school portal and JAMB CAPS.",
  lastReviewed: "2026-09-23",
};
