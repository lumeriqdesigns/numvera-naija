/**
 * Common UTME subject combinations for Nigerian university courses.
 * Always confirm on JAMB IBASS / school brochure for the current year.
 */

export type SubjectCombo = {
  slug: string;
  course: string;
  /** SEO keywords */
  keywords: string[];
  compulsory: string[];
  /** Third/fourth subjects — typical options */
  others: string[];
  olevel: string;
  note: string;
  category: "Science" | "Arts" | "Commercial" | "Education" | "Technology";
};

export const subjectCombinations: SubjectCombo[] = [
  {
    slug: "medicine",
    course: "Medicine and Surgery",
    keywords: ["UTME subjects for Medicine", "JAMB subject combination Medicine", "MBBS JAMB subjects"],
    compulsory: ["Use of English", "Biology", "Chemistry", "Physics"],
    others: [],
    olevel: "Five credits including English, Mathematics, Biology, Chemistry and Physics (often one sitting for competitive schools).",
    note: "Strict science combination. Confirm any school-specific waiver on IBASS.",
    category: "Science",
  },
  {
    slug: "nursing",
    course: "Nursing Science",
    keywords: ["JAMB subjects for Nursing", "UTME combination Nursing"],
    compulsory: ["Use of English", "Biology", "Chemistry", "Physics"],
    others: [],
    olevel: "Credits in English, Mathematics, Biology, Chemistry and Physics commonly required.",
    note: "Usually same science set as Medicine-related programmes.",
    category: "Science",
  },
  {
    slug: "pharmacy",
    course: "Pharmacy",
    keywords: ["JAMB subject combination Pharmacy", "UTME subjects Pharmacy"],
    compulsory: ["Use of English", "Biology", "Chemistry", "Physics"],
    others: [],
    olevel: "English, Mathematics, Biology, Chemistry, Physics credits typical.",
    note: "Science combination; competitive aggregates.",
    category: "Science",
  },
  {
    slug: "law",
    course: "Law",
    keywords: ["JAMB subjects for Law", "UTME combination Law Nigeria"],
    compulsory: ["Use of English", "Literature in English"],
    others: ["Government", "CRS/IRS", "History", "Economics"],
    olevel: "English and Literature often compulsory; plus Government or related arts subjects.",
    note: "Literature is widely required. Pick two relevant arts/social subjects.",
    category: "Arts",
  },
  {
    slug: "computer-science",
    course: "Computer Science",
    keywords: ["JAMB subjects Computer Science", "UTME combination Computer Science"],
    compulsory: ["Use of English", "Mathematics"],
    others: ["Physics", "Chemistry", "Biology", "Economics", "Geography"],
    olevel: "English, Mathematics and relevant science/commercial credits.",
    note: "Maths is essential; Physics is common as a third science subject.",
    category: "Technology",
  },
  {
    slug: "accounting",
    course: "Accounting",
    keywords: ["JAMB subjects for Accounting", "UTME combination Accounting"],
    compulsory: ["Use of English", "Mathematics"],
    others: ["Economics", "Principles of Accounts", "Commerce", "Government"],
    olevel: "English, Mathematics, Economics/Accounting-related credits.",
    note: "Commercial combination with strong Maths.",
    category: "Commercial",
  },
  {
    slug: "economics",
    course: "Economics",
    keywords: ["JAMB subjects Economics", "UTME combination Economics"],
    compulsory: ["Use of English", "Mathematics", "Economics"],
    others: ["Government", "Geography", "Commerce", "Accounting"],
    olevel: "English, Mathematics, Economics and related social science credits.",
    note: "Maths + Economics core for most universities.",
    category: "Commercial",
  },
  {
    slug: "mass-communication",
    course: "Mass Communication",
    keywords: ["JAMB subjects Mass Communication", "UTME combination Mass Comm"],
    compulsory: ["Use of English", "Literature in English"],
    others: ["Government", "CRS/IRS", "History", "Economics", "CRS"],
    olevel: "English, Literature and relevant arts/social credits.",
    note: "Literature often required; confirm school brochure.",
    category: "Arts",
  },
  {
    slug: "engineering",
    course: "Engineering (general)",
    keywords: ["JAMB subjects for Engineering", "UTME combination Engineering"],
    compulsory: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    others: [],
    olevel: "English, Mathematics, Physics, Chemistry credits.",
    note: "Standard for Civil, Mechanical, Electrical and related engineering.",
    category: "Technology",
  },
  {
    slug: "political-science",
    course: "Political Science",
    keywords: ["JAMB subjects Political Science", "UTME combination Government"],
    compulsory: ["Use of English", "Government"],
    others: ["Economics", "History", "CRS/IRS", "Literature"],
    olevel: "English, Government and social science credits.",
    note: "Government is central; add two relevant arts/social subjects.",
    category: "Arts",
  },
  {
    slug: "business-admin",
    course: "Business Administration",
    keywords: ["JAMB subjects Business Administration", "UTME combination Business Admin"],
    compulsory: ["Use of English", "Mathematics"],
    others: ["Economics", "Commerce", "Principles of Accounts", "Government"],
    olevel: "English, Mathematics and commercial subject credits.",
    note: "Commercial set similar to Accounting.",
    category: "Commercial",
  },
  {
    slug: "agriculture",
    course: "Agriculture",
    keywords: ["JAMB subjects Agriculture", "UTME combination Agricultural Science"],
    compulsory: ["Use of English", "Chemistry", "Biology/Agricultural Science"],
    others: ["Physics", "Mathematics", "Geography"],
    olevel: "English, Chemistry, Biology/Agric and related credits.",
    note: "Check IBASS — some agric ND paths have special rules.",
    category: "Science",
  },
];

export function getCombo(slug: string) {
  return subjectCombinations.find((c) => c.slug === slug) ?? null;
}
