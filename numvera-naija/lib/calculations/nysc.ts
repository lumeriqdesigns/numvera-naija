/**
 * NYSC-related estimates (allowance & service age guidance).
 * Corps member monthly allowance figures change; treat as editable defaults.
 */

export type NyscInput = {
  monthlyAllowance: number;
  monthsServed: number;
  extraMonthly: number; // e.g. state top-up, side income
};

export type NyscResult = {
  monthlyAllowance: number;
  totalAllowanceSoFar: number;
  projectedFullService: number; // 12 months typical
  monthlyTotal: number;
  annualEquivalent: number;
};

export function calculateNysc(input: NyscInput): NyscResult {
  const monthly = Math.max(0, input.monthlyAllowance || 0);
  const months = Math.max(0, Math.min(12, input.monthsServed || 0));
  const extra = Math.max(0, input.extraMonthly || 0);
  return {
    monthlyAllowance: monthly,
    totalAllowanceSoFar: monthly * months,
    projectedFullService: monthly * 12,
    monthlyTotal: monthly + extra,
    annualEquivalent: (monthly + extra) * 12,
  };
}

/** Default illustrative allowance — user can change */
export const DEFAULT_NYSC_ALLOWANCE = 77000;
