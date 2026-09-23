"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { siteConfig } from "@/lib/site";
import FaqBlock from "@/components/FaqBlock";
import { calculateSalary, formatNaira, type TaxModel } from "@/lib/calculations/salary";

export default function SalaryPage() {
  const [gross, setGross] = useState("350000");
  const [pension, setPension] = useState(true);
  const [pct, setPct] = useState("8");
  const [nhf, setNhf] = useState(true);
  const [other, setOther] = useState("0");
  const [taxModel, setTaxModel] = useState<TaxModel>("nta2026");

  const r = useMemo(
    () =>
      calculateSalary({
        grossMonthly: Number(gross) || 0,
        pensionEnabled: pension,
        pensionPct: Number(pct) || 0,
        nhfEnabled: nhf,
        otherMonthly: Number(other) || 0,
        taxModel,
      }),
    [gross, pension, pct, nhf, other, taxModel]
  );

  const shareText = `Numvera Naija Salary estimate\nGross: ${formatNaira(r.grossMonthly)}/mo\nTake-home: ${formatNaira(r.takeHomeMonthly)}/mo\nPAYE: ${formatNaira(r.payeMonthly)}/mo`;

  return (
    <ToolLayout
      name="Salary & PAYE Calculator"
      description="Estimate Nigerian take-home pay with pension, NHF and progressive PAYE. Default uses 2026-style bands (first ₦800k annual at 0%). Switch to legacy CRA model for comparison. Educational only."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTaxModel("nta2026")}
          className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
            taxModel === "nta2026" ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f7f9f8]"
          }`}
        >
          2026-style bands (0% first ₦800k)
        </button>
        <button
          type="button"
          onClick={() => setTaxModel("legacy-cra")}
          className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
            taxModel === "legacy-cra" ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f7f9f8]"
          }`}
        >
          Legacy CRA model
        </button>
      </div>
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Gross monthly salary (₦)</label>
            <input className="field" type="number" min="0" value={gross} onChange={(e) => setGross(e.target.value)} />
          </div>
          <label className="flex items-center gap-3 rounded-xl border p-4 text-sm font-bold">
            <input type="checkbox" checked={pension} onChange={(e) => setPension(e.target.checked)} />
            Include pension (employee contribution)
          </label>
          {pension && (
            <div>
              <label className="label">Pension rate (%)</label>
              <input className="field" type="number" min="0" max="20" step="0.5" value={pct} onChange={(e) => setPct(e.target.value)} />
            </div>
          )}
          <label className="flex items-center gap-3 rounded-xl border p-4 text-sm font-bold">
            <input type="checkbox" checked={nhf} onChange={(e) => setNhf(e.target.checked)} />
            Include NHF (2.5%)
          </label>
          <div>
            <label className="label">Other monthly deductions (₦)</label>
            <input className="field" type="number" min="0" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">ESTIMATED TAKE-HOME</p>
          <div className="result-number mt-2">{formatNaira(r.takeHomeMonthly)}</div>
          <p className="mt-1 text-sm muted">per month · {formatNaira(r.takeHomeAnnual)} / year</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              ["Gross", formatNaira(r.grossMonthly)],
              ["Pension", formatNaira(r.pensionMonthly)],
              ["NHF", formatNaira(r.nhfMonthly)],
              ["PAYE tax", formatNaira(r.payeMonthly)],
              ["Other", formatNaira(r.otherMonthly)],
              ["Total deductions", formatNaira(r.totalDeductionsMonthly)],
            ].map(([a, b]) => (
              <div className="rounded-xl bg-white p-3" key={a}>
                <p className="text-xs muted">{a}</p>
                <p className="mt-1 font-bold text-sm">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs muted">
            Effective tax rate ≈ {r.effectiveTaxRate.toFixed(1)}% · Taxable annual {formatNaira(r.taxableAnnual)}
          </p>
          <ShareResult text={shareText} />
        </div>
      </CalculatorShell>
      {r.bands.length > 0 && (
        <div className="mt-6 card p-5">
          <h2 className="font-bold">PAYE band breakdown (annual)</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left muted">
                  <th className="py-2 pr-4">Band</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2">Tax</th>
                </tr>
              </thead>
              <tbody>
                {r.bands.map((b) => (
                  <tr key={b.label} className="border-t border-[#e5eae7]">
                    <td className="py-2 pr-4">{b.label}</td>
                    <td className="py-2 pr-4">{formatNaira(b.amount)}</td>
                    <td className="py-2 font-bold">{formatNaira(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Tax law and payroll practice change. Figures are educational estimates.  confirm with your employer,
        PFA or a tax professional before making decisions.
      </div>
      <FaqBlock
        items={[
          { q: "Is this official PAYE?", a: "It is an estimate using common Nigerian relief and band structures. Employers and tax offices may apply slightly different inputs." },
          { q: "Does it include pension?", a: "Yes.  you can include employee pension (and NHF) so take-home is closer to reality." },
          { q: "Can I share or print the result?", a: "Use WhatsApp, Copy, Share or Print / Save PDF under the result box." },
        ]}
      />
      <p className="mt-6 text-xs muted">Tax model: {siteConfig.payeAsOf}</p>
      <RelatedTools exclude="salary-calculator" />
    </ToolLayout>
  );
}
