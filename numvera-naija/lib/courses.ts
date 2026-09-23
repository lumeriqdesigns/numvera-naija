export type CourseSlug =
  | "medicine"
  | "law"
  | "computer-science"
  | "accounting"
  | "nursing"
  | "engineering"
  | "pharmacy"
  | "mass-communication"
  | "economics"
  | "political-science";

export type CourseDef = {
  slug: CourseSlug;
  name: string;
  /** Match substrings against university.courseCutoffs[].course */
  match: string[];
  seo: string;
};

export const courses: CourseDef[] = [
  {
    slug: "medicine",
    name: "Medicine & Surgery",
    match: ["Medicine", "Surgery"],
    seo: "Medicine and Surgery JAMB aggregate and cut-off guide",
  },
  {
    slug: "law",
    name: "Law",
    match: ["Law"],
    seo: "Law JAMB aggregate and cut-off guide",
  },
  {
    slug: "computer-science",
    name: "Computer Science",
    match: ["Computer Science", "Cyber"],
    seo: "Computer Science JAMB aggregate and cut-off guide",
  },
  {
    slug: "accounting",
    name: "Accounting",
    match: ["Accounting"],
    seo: "Accounting JAMB aggregate and cut-off guide",
  },
  {
    slug: "nursing",
    name: "Nursing",
    match: ["Nursing"],
    seo: "Nursing JAMB aggregate and cut-off guide",
  },
  {
    slug: "engineering",
    name: "Engineering",
    match: ["Engineering", "Electrical", "Mechanical", "Petroleum", "Civil"],
    seo: "Engineering JAMB aggregate and cut-off guide",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    match: ["Pharmacy"],
    seo: "Pharmacy JAMB aggregate and cut-off guide",
  },
  {
    slug: "mass-communication",
    name: "Mass Communication",
    match: ["Mass Communication", "Media"],
    seo: "Mass Communication JAMB aggregate and cut-off guide",
  },
  {
    slug: "economics",
    name: "Economics",
    match: ["Economics"],
    seo: "Economics JAMB aggregate and cut-off guide",
  },
  {
    slug: "political-science",
    name: "Political Science",
    match: ["Political Science"],
    seo: "Political Science JAMB aggregate and cut-off guide",
  },
];

export const courseMap = Object.fromEntries(courses.map((c) => [c.slug, c])) as Record<
  CourseSlug,
  CourseDef
>;

export function getCourse(slug: string) {
  return courseMap[slug as CourseSlug] ?? null;
}

import type { University } from "./universities";

export function findCourseCutoff(uni: University, course: CourseDef) {
  return uni.courseCutoffs.find((cc) =>
    course.match.some((m) => cc.course.toLowerCase().includes(m.toLowerCase()))
  );
}
