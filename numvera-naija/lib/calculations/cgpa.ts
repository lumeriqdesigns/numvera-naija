export type GradeScale = "5-point" | "4-point" | "7-point";

export const gradePointsMap: Record<GradeScale, Record<string, number>> = {
  "5-point": { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 },
  "4-point": { A: 4, B: 3, C: 2, D: 1, F: 0 },
  "7-point": { A: 7, B: 6, C: 5, D: 4, E: 3, F: 0 },
};

export const gradeOptions: Record<GradeScale, string[]> = {
  "5-point": ["A", "B", "C", "D", "E", "F"],
  "4-point": ["A", "B", "C", "D", "F"],
  "7-point": ["A", "B", "C", "D", "E", "F"],
};

export type Course = { name: string; credit: string; grade: string };

export function calculateCGPA(courses: Course[], scale: GradeScale = "5-point") {
  const pointsTable = gradePointsMap[scale];
  let units = 0;
  let points = 0;
  for (const c of courses) {
    const credit = Number(c.credit);
    if (Number.isFinite(credit) && credit > 0 && pointsTable[c.grade] !== undefined) {
      units += credit;
      points += credit * pointsTable[c.grade];
    }
  }
  return { units, points, cgpa: units ? points / units : 0 };
}

export function cgpaClass(value: number, scale: GradeScale = "5-point") {
  if (scale === "5-point") {
    if (value >= 4.5) return { label: "First Class", color: "text-emerald-700" };
    if (value >= 3.5) return { label: "Second Class Upper (2:1)", color: "text-blue-700" };
    if (value >= 2.4) return { label: "Second Class Lower (2:2)", color: "text-amber-700" };
    if (value >= 1.5) return { label: "Third Class", color: "text-orange-700" };
    if (value >= 1.0) return { label: "Pass", color: "text-slate-600" };
    return { label: "Below pass range", color: "text-red-700" };
  }
  if (scale === "4-point") {
    if (value >= 3.5) return { label: "First Class", color: "text-emerald-700" };
    if (value >= 3.0) return { label: "Second Class Upper", color: "text-blue-700" };
    if (value >= 2.0) return { label: "Second Class Lower", color: "text-amber-700" };
    if (value >= 1.0) return { label: "Third Class / Pass", color: "text-orange-700" };
    return { label: "Below pass range", color: "text-red-700" };
  }
  if (value >= 6.0) return { label: "Distinction / First Class range", color: "text-emerald-700" };
  if (value >= 4.5) return { label: "Upper Credit / 2:1 range", color: "text-blue-700" };
  if (value >= 2.5) return { label: "Lower Credit / 2:2 range", color: "text-amber-700" };
  if (value >= 1.5) return { label: "Pass", color: "text-orange-700" };
  return { label: "Below pass range", color: "text-red-700" };
}

export function requiredNextCgpa(
  currentCgpa: number,
  currentUnits: number,
  targetCgpa: number,
  nextUnits: number
) {
  if (nextUnits <= 0) return null;
  const totalUnits = currentUnits + nextUnits;
  const neededPoints = targetCgpa * totalUnits - currentCgpa * currentUnits;
  return neededPoints / nextUnits;
}
