/** WAEC / NECO grade points for aggregate-style planning (not official admission policy). */

export const gradePoint: Record<string, number> = {
  A1: 1, B2: 2, B3: 3, C4: 4, C5: 5, C6: 6, D7: 7, E8: 8, F9: 9,
};

/** Lower total = better (some schools sum grade points of best subjects) */
export function sumBestSubjects(grades: string[], count = 5) {
  const pts = grades
    .map((g) => gradePoint[g] ?? 9)
    .sort((a, b) => a - b)
    .slice(0, count);
  return {
    total: pts.reduce((s, p) => s + p, 0),
    points: pts,
    count: pts.length,
  };
}

export const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];
