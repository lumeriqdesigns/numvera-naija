"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { gradeOptions, sumBestSubjects } from "@/lib/calculations/waec";

export default function WaecPage() {
  const [grades, setGrades] = useState(["B3", "C4", "C5", "C6", "B3", "C4", "C5", "C6", "D7"]);

  const r = useMemo(() => sumBestSubjects(grades, 5), [grades]);
  const r8 = useMemo(() => sumBestSubjects(grades, 8), [grades]);

  return (
    <ToolLayout
      name="WAEC / NECO Points Calculator"
      description="Add your subject grades and see the sum of your best 5 (and best 8) grade points. Useful for quick comparison and admission planning discussions."
    >
      <CalculatorShell>
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Subject grades</h2>
            <button
              type="button"
              className="btn btn-secondary text-sm"
              onClick={() => setGrades([...grades, "C6"])}
            >
              + Add subject
            </button>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {grades.map((g, i) => (
              <div key={i} className="flex gap-2">
                <select
                  className="field"
                  value={g}
                  onChange={(e) => {
                    const next = [...grades];
                    next[i] = e.target.value;
                    setGrades(next);
                  }}
                >
                  {gradeOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <button
                  type="button"
                  className="text-gray-400 px-2"
                  disabled={grades.length <= 5}
                  onClick={() => setGrades(grades.filter((_, j) => j !== i))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs muted">A1 = 1 point … F9 = 9 points. Lower total is stronger.</p>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">BEST 5 SUBJECTS TOTAL</p>
          <div className="result-number mt-2">{r.total}</div>
          <p className="mt-1 text-sm muted">Points: {r.points.join(" + ")}</p>
          <div className="mt-6 rounded-xl bg-white p-4">
            <p className="text-xs muted">Best 8 subjects total</p>
            <p className="mt-1 font-bold text-xl">{r8.total}</p>
          </div>
          <ShareResult text={`WAEC/NECO best-5 points: ${r.total} · Numvera Naija`} />
        </div>
      </CalculatorShell>
      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Schools and screening bodies use O&apos;Level differently (some only as a pass requirement). This
        tool does not replace official admission criteria.
      </div>
      <RelatedTools exclude="waec-calculator" />
    </ToolLayout>
  );
}
