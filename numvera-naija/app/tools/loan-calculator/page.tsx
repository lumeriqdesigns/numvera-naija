"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { calculateLoan, sampleRates } from "@/lib/calculations/loan";
import { formatNaira } from "@/lib/calculations/salary";

export default function LoanPage() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("24");
  const [term, setTerm] = useState("12");
  const [unit, setUnit] = useState<"months" | "years">("months");

  const months = unit === "years" ? (Number(term) || 0) * 12 : Number(term) || 0;
  const r = useMemo(
    () => calculateLoan(Number(principal) || 0, Number(rate) || 0, months),
    [principal, rate, months]
  );

  const shareText = r
    ? `Loan estimate (Numvera Naija)\nPrincipal: ${formatNaira(Number(principal))}\nMonthly: ${formatNaira(r.payment)}\nTotal interest: ${formatNaira(r.interest)}`
    : "";

  return (
    <ToolLayout
      name="Loan Calculator"
      description="Estimate monthly repayments, total interest and a short amortisation preview. Useful for personal loans and salary advances in Nigeria."
    >
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Loan amount (₦)</label>
            <input className="field" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </div>
          <div>
            <label className="label">Annual interest rate (%)</label>
            <input className="field" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
            <div className="mt-2 flex flex-wrap gap-2">
              {sampleRates.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  className="rounded-full border px-3 py-1 text-xs font-bold hover:bg-[#f7f9f8]"
                  onClick={() => setRate(String(s.rate))}
                >
                  {s.name}: {s.rate}%
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Term</label>
              <input className="field" type="number" min="1" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>
            <div>
              <label className="label">Unit</label>
              <select className="field" value={unit} onChange={(e) => setUnit(e.target.value as "months" | "years")}>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          {r ? (
            <>
              <p className="text-sm font-bold muted">MONTHLY PAYMENT</p>
              <div className="result-number mt-2">{formatNaira(r.payment, 0)}</div>
              <div className="mt-6 grid gap-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Total repayment</p>
                  <p className="mt-1 font-bold">{formatNaira(r.total)}</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Total interest</p>
                  <p className="mt-1 font-bold">{formatNaira(r.interest)}</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Term</p>
                  <p className="mt-1 font-bold">{r.months} months</p>
                </div>
              </div>
              <ShareResult text={shareText} />
            </>
          ) : (
            <p className="text-sm text-red-700">Enter a valid loan term.</p>
          )}
        </div>
      </CalculatorShell>

      {r && r.schedulePreview.length > 0 && (
        <div className="mt-6 card p-5 overflow-x-auto">
          <h2 className="font-bold">First months preview</h2>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left muted">
                <th className="py-2 pr-3">Month</th>
                <th className="py-2 pr-3">Payment</th>
                <th className="py-2 pr-3">Principal</th>
                <th className="py-2 pr-3">Interest</th>
                <th className="py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {r.schedulePreview.map((row) => (
                <tr key={row.month} className="border-t border-[#e5eae7]">
                  <td className="py-2 pr-3">{row.month}</td>
                  <td className="py-2 pr-3">{formatNaira(row.payment)}</td>
                  <td className="py-2 pr-3">{formatNaira(row.principal)}</td>
                  <td className="py-2 pr-3">{formatNaira(row.interest)}</td>
                  <td className="py-2 font-bold">{formatNaira(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Sample rates are illustrative only. Actual bank rates, fees, insurance and repayment amounts vary by
        lender and product. This tool does not include processing fees.
      </div>
      <RelatedTools exclude="loan-calculator" />
    </ToolLayout>
  );
}
