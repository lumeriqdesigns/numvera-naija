export type LoanResult = {
  payment: number;
  total: number;
  interest: number;
  principal: number;
  months: number;
  annualRate: number;
  schedulePreview: { month: number; payment: number; principal: number; interest: number; balance: number }[];
};

export function calculateLoan(
  principal: number,
  annualRate: number,
  months: number
): LoanResult | null {
  if (months <= 0 || principal < 0 || annualRate < 0) return null;
  const r = annualRate / 100 / 12;
  const payment =
    r === 0
      ? principal / months
      : (principal * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);

  const schedulePreview: LoanResult["schedulePreview"] = [];
  let balance = principal;
  const previewMonths = Math.min(months, 6);
  for (let m = 1; m <= previewMonths; m++) {
    const interestPart = balance * r;
    const principalPart = payment - interestPart;
    balance = Math.max(0, balance - principalPart);
    schedulePreview.push({
      month: m,
      payment,
      principal: principalPart,
      interest: interestPart,
      balance,
    });
  }

  return {
    payment,
    total: payment * months,
    interest: payment * months - principal,
    principal,
    months,
    annualRate,
    schedulePreview,
  };
}

export const sampleRates = [
  { name: "Personal loan (typical)", rate: 24 },
  { name: "Salary advance / short-term", rate: 18 },
  { name: "Mortgage-style (illustrative)", rate: 16 },
  { name: "Low-rate promo (rare)", rate: 12 },
];
