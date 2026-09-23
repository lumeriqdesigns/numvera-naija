import { institutionalMinima2026, NATIONAL_MIN, cutoffDataMeta } from "./cutoffs-2026";
import type { University } from "./universities";

/** Prefer official 2026 institutional minimum when we have it */
export function institutionalCutoff(uni: University): number {
  return institutionalMinima2026[uni.slug] ?? uni.generalUtmeCutoff;
}

export function cutoffSourceLabel(uni: University): string {
  if (institutionalMinima2026[uni.slug] != null) {
    return `Official institutional minimum (2026 policy): ${institutionalMinima2026[uni.slug]}+`;
  }
  return `School guide (not on 2026 published shortlist): ${uni.generalUtmeCutoff}+`;
}

export { NATIONAL_MIN, cutoffDataMeta };
