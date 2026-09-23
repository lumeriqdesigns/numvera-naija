/** Common Nigerian university aggregate models (estimates; institutions may differ by year). */

export type AggregateModel = "50-50" | "40-60" | "50-30-20";

export function jambComponent(utme: number, weight: number) {
  // UTME out of 400 → weight points
  return (Math.min(400, Math.max(0, utme)) / 400) * weight;
}

export function postUtmeComponent(score: number, weight: number, maxScore = 100) {
  return (Math.min(maxScore, Math.max(0, score)) / maxScore) * weight;
}

/** O'level: best 5 subjects, A1=6 … F9=0 style points, scaled to weight (often 20) */
export const olevelPoints: Record<string, number> = {
  A1: 6, B2: 5, B3: 4, C4: 3, C5: 2, C6: 1, D7: 0, E8: 0, F9: 0,
};

export function olevelComponent(grades: string[], weight = 20) {
  const pts = grades
    .map((g) => olevelPoints[g] ?? 0)
    .sort((a, b) => b - a)
    .slice(0, 5);
  const sum = pts.reduce((s, p) => s + p, 0);
  // max 5*6 = 30
  return (sum / 30) * weight;
}

export function calculateAggregate(
  model: AggregateModel,
  utme: number,
  postUtme: number,
  olevelGrades: string[] = []
) {
  if (model === "50-50") {
    const j = jambComponent(utme, 50);
    const p = postUtmeComponent(postUtme, 50);
    return { total: j + p, parts: { jamb: j, postUtme: p, olevel: 0 }, model };
  }
  if (model === "40-60") {
    const j = jambComponent(utme, 40);
    const p = postUtmeComponent(postUtme, 60);
    return { total: j + p, parts: { jamb: j, postUtme: p, olevel: 0 }, model };
  }
  // 50-30-20
  const j = jambComponent(utme, 50);
  const p = postUtmeComponent(postUtme, 30);
  const o = olevelComponent(olevelGrades, 20);
  return { total: j + p + o, parts: { jamb: j, postUtme: p, olevel: o }, model };
}

export const universityPresets: { name: string; model: AggregateModel; note: string }[] = [
  { name: "UNILAG / UI / UNILORIN style", model: "50-50", note: "JAMB 50% + Post-UTME 50%" },
  { name: "OAU / ABU / UNIBEN / LASU style", model: "40-60", note: "JAMB 40% + Post-UTME 60%" },
  { name: "With O'Level (50-30-20)", model: "50-30-20", note: "JAMB 50% + Post-UTME 30% + O'Level 20%" },
];
