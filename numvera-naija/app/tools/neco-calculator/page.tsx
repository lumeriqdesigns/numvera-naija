"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import CalcHistory, { notifyHistory } from "@/components/CalcHistory";
import { gradeOptions, sumBestSubjects } from "@/lib/calculations/waec";
import { pushHistory } from "@/lib/history";

export default function NecoPage() {
  const [board, setBoard] = useState<"NECO" | "NABTEB">("NECO");
  const [grades, setGrades] = useState(["B3", "C4", "C5", "C6", "B3", "C4", "C5", "C6", "D7"]);

  const r = useMemo(() => sumBestSubjects(grades, 5), [grades]);
  const r8 = useMemo(() => sumBestSubjects(grades, 8), [grades]);

  const best5 = r.total;
  useEffect(() => {
    pushHistory({
      tool: board,
      label: "Best 5 points",
      result: String(best5),
    });
    notifyHistory();
  }, [best5, board]);

  return (
    <ToolLayout
      name={`${board} Points Calculator`}
      description="Sum your NECO or NABTEB subject grades (best 5 and best 8). Same grade-point idea as WAEC — useful for admission planning."
    >
      <div className="mb-4 flex gap-2">
        {(["NECO", "NABTEB"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBoard(b)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
              board === b ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f4f8f5]"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <CalculatorShell>
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold">{board} subject grades</h2>
            <button type="button" className="btn btn-secondary text-sm" onClick={() => setGrades([...grades, "C6"])}>
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
                  className="px-2 text-gray-400"
                  disabled={grades.length <= 5}
                  onClick={() => setGrades(grades.filter((_, j) => j !== i))}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs muted">A1 = 1 … F9 = 9. Lower total on best 5 is stronger.</p>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6 dark:bg-[#0d1812]">
          <p className="text-sm font-bold muted">BEST 5 TOTAL</p>
          <div className="result-number mt-2">{r.total}</div>
          <p className="mt-4 text-sm muted">Best 8 total: <strong>{r8.total}</strong></p>
          <ShareResult text={`${board} best-5 points: ${r.total} · Numvera Naija`} />
        </div>
      </CalculatorShell>
      <CalcHistory />
      <p className="mt-6 text-sm muted">
        Also see{" "}
        <Link href="/tools/waec-calculator" className="font-bold text-brand-600">
          WAEC points
        </Link>{" "}
        and the{" "}
        <Link href="/guides/jamb-waec-syllabus" className="font-bold text-brand-600">
          syllabus hub
        </Link>
        .
      </p>
      <RelatedTools exclude="neco-calculator" />
    </ToolLayout>
  );
}
