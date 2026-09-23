/**
 * Nigerian salary + PAYE estimate.
 * Default model: Nigeria Tax Act style bands often cited for 2026
 * (first ₦800,000 annual at 0%, then progressive rates).
 * Optional legacy CRA model kept for comparison education.
 * Always verify with official sources / payroll.
 */

export type TaxModel = "nta2026" | "legacy-cra";

export type SalaryInput = {
  grossMonthly: number;
  pensionEnabled: boolean;
  pensionPct: number;
  nhfEnabled: boolean;
  otherMonthly: number;
  taxModel?: TaxModel;
};

export type SalaryResult = {
  grossMonthly: number;
  annualGross: number;
  pensionMonthly: number;
  nhfMonthly: number;
  otherMonthly: number;
  reliefAnnual: number;
  taxableAnnual: number;
  payeAnnual: number;
  payeMonthly: number;
  totalDeductionsMonthly: number;
  takeHomeMonthly: number;
  takeHomeAnnual: number;
  effectiveTaxRate: number;
  bands: { label: string; amount: number; tax: number }[];
  taxModel: TaxModel;
};

/** Illustrative NTA-style bands (verify against current law) */
const NTA_BANDS: { upTo: number; rate: number; label: string }[] = [
  { upTo: 800_000, rate: 0, label: "First ₦800,000 @ 0%" },
  { upTo: 2_200_000, rate: 0.15, label: "Next ₦2,200,000 @ 15%" },
  { upTo: 9_000_000, rate: 0.18, label: "Next @ 18%" },
  { upTo: 13_000_000, rate: 0.21, label: "Next @ 21%" },
  { upTo: 25_000_000, rate: 0.23, label: "Next @ 23%" },
  { upTo: Infinity, rate: 0.25, label: "Above @ 25%" },
];

const LEGACY_BANDS: { upTo: number; rate: number; label: string }[] = [
  { upTo: 300_000, rate: 0.07, label: "First ₦300,000 @ 7%" },
  { upTo: 300_000, rate: 0.11, label: "Next ₦300,000 @ 11%" },
  { upTo: 500_000, rate: 0.15, label: "Next ₦500,000 @ 15%" },
  { upTo: 500_000, rate: 0.19, label: "Next ₦500,000 @ 19%" },
  { upTo: 1_600_000, rate: 0.21, label: "Next ₦1,600,000 @ 21%" },
  { upTo: Infinity, rate: 0.24, label: "Above @ 24%" },
];

function computeBands(taxableAnnual: number, bands: typeof NTA_BANDS) {
  let remaining = Math.max(0, taxableAnnual);
  let tax = 0;
  const out: { label: string; amount: number; tax: number }[] = [];
  for (const b of bands) {
    if (remaining <= 0) break;
    const slice = Math.min(remaining, b.upTo);
    const sliceTax = slice * b.rate;
    tax += sliceTax;
    if (slice > 0) out.push({ label: b.label, amount: slice, tax: sliceTax });
    remaining -= slice;
  }
  return { tax, bands: out };
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const model = input.taxModel || "nta2026";
  const grossMonthly = Math.max(0, input.grossMonthly || 0);
  const annualGross = grossMonthly * 12;
  const pensionMonthly = input.pensionEnabled
    ? grossMonthly * (Math.max(0, input.pensionPct) / 100)
    : 0;
  const nhfMonthly = input.nhfEnabled ? grossMonthly * 0.025 : 0;
  const otherMonthly = Math.max(0, input.otherMonthly || 0);

  const annualPension = pensionMonthly * 12;
  const annualNhf = nhfMonthly * 12;

  let reliefAnnual = 0;
  let taxableAnnual = 0;
  let payeAnnual = 0;
  let bands: { label: string; amount: number; tax: number }[] = [];

  if (model === "nta2026") {
    // Simplified: pension + NHF reduce chargeable income; first band is 0%
    reliefAnnual = annualPension + annualNhf;
    taxableAnnual = Math.max(0, annualGross - reliefAnnual);
    const r = computeBands(taxableAnnual, NTA_BANDS);
    payeAnnual = r.tax;
    bands = r.bands;
  } else {
    reliefAnnual = Math.max(200_000, annualGross * 0.01) + annualGross * 0.2;
    taxableAnnual = Math.max(0, annualGross - annualPension - annualNhf - reliefAnnual);
    const r = computeBands(taxableAnnual, LEGACY_BANDS);
    payeAnnual = r.tax;
    bands = r.bands;
  }

  const payeMonthly = payeAnnual / 12;
  const totalDeductionsMonthly =
    pensionMonthly + nhfMonthly + otherMonthly + payeMonthly;
  const takeHomeMonthly = Math.max(0, grossMonthly - totalDeductionsMonthly);

  return {
    grossMonthly,
    annualGross,
    pensionMonthly,
    nhfMonthly,
    otherMonthly,
    reliefAnnual,
    taxableAnnual,
    payeAnnual,
    payeMonthly,
    totalDeductionsMonthly,
    takeHomeMonthly,
    takeHomeAnnual: takeHomeMonthly * 12,
    effectiveTaxRate: annualGross > 0 ? (payeAnnual / annualGross) * 100 : 0,
    bands,
    taxModel: model,
  };
}

export function formatNaira(n: number, digits = 0) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: digits,
  }).format(n || 0);
}
