"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { calculateNysc, DEFAULT_NYSC_ALLOWANCE } from "@/lib/calculations/nysc";
import { formatNaira } from "@/lib/calculations/salary";

export default function NyscPage() {
  const [allowance, setAllowance] = useState(String(DEFAULT_NYSC_ALLOWANCE));
  const [months, setMonths] = useState("3");
  const [extra, setExtra] = useState("0");

  const r = useMemo(
    () =>
      calculateNysc({
        monthlyAllowance: Number(allowance) || 0,
        monthsServed: Number(months) || 0,
        extraMonthly: Number(extra) || 0,
      }),
    [allowance, months, extra]
  );

  return (
    <ToolLayout
      name="NYSC Allowance Calculator"
      description="Project corps member monthly allowance over service, optional state top-ups or side income, and full-service totals. Edit the allowance to match the current official figure."
    >
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Monthly NYSC allowance (₦)</label>
            <input
              className="field"
              type="number"
              min="0"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value)}
            />
            <p className="mt-1 text-xs muted">
              Default is illustrative ({formatNaira(DEFAULT_NYSC_ALLOWANCE)}). Update when official rates change.
            </p>
          </div>
          <div>
            <label className="label">Months already served (0, 12)</label>
            <input
              className="field"
              type="number"
              min="0"
              max="12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Extra monthly income (₦).  optional</label>
            <input
              className="field"
              type="number"
              min="0"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
            />
            <p className="mt-1 text-xs muted">State top-up, teaching stipend, remote work, etc.</p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">MONTHLY TOTAL</p>
          <div className="result-number mt-2">{formatNaira(r.monthlyTotal)}</div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Allowance so far ({months} mo)</p>
              <p className="mt-1 font-bold">{formatNaira(r.totalAllowanceSoFar)}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Projected 12-month allowance</p>
              <p className="mt-1 font-bold">{formatNaira(r.projectedFullService)}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Annual equivalent (with extras)</p>
              <p className="mt-1 font-bold">{formatNaira(r.annualEquivalent)}</p>
            </div>
          </div>
          <ShareResult
            text={`NYSC estimate: ${formatNaira(r.monthlyTotal)}/mo · 12-mo allowance ${formatNaira(r.projectedFullService)} · Numvera Naija`}
          />
        </div>
      </CalculatorShell>
      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        NYSC allowance figures are set by government and change over time. This tool does not replace official
        NYSC communications. Extra income is for personal budgeting only.
      </div>
      <RelatedTools exclude="nysc-calculator" />
    </ToolLayout>
  );
}
