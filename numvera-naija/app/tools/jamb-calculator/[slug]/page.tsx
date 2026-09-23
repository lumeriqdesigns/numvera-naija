"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { calculateAggregate, olevelPoints } from "@/lib/calculations/jamb";
import { getUniversity, universities } from "@/lib/universities";

const olevelGrades = Object.keys(olevelPoints);

export default function UniversityJambPage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const uni = getUniversity(slug);

  const [utme, setUtme] = useState("280");
  const [post, setPost] = useState("70");
  const [olevels, setOlevels] = useState(["B3", "B3", "C4", "C5", "C6"]);

  const model = uni?.model ?? "50-50";
  const r = useMemo(
    () =>
      calculateAggregate(
        model,
        Number(utme) || 0,
        Number(post) || 0,
        model === "50-30-20" ? olevels : []
      ),
    [model, utme, post, olevels]
  );

  const utmeNum = Number(utme) || 0;
  const meetsGeneral = uni ? utmeNum >= uni.generalUtmeCutoff : false;

  if (!uni) {
    return (
      <main className="section">
        <div className="container max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold">University not found</h1>
          <p className="mt-3 muted">That school is not in our list yet.</p>
          <Link href="/tools/jamb-calculator" className="btn btn-primary mt-6 inline-flex">
            All JAMB calculators
          </Link>
        </div>
      </main>
    );
  }

  const others = universities.filter((u) => u.slug !== uni.slug).slice(0, 8);

  return (
    <ToolLayout
      name={`${uni.shortName} Aggregate & Cut-off Calculator`}
      description={`${uni.seoNote} See illustrative UTME cut-offs and course targets for ${uni.shortName}. Confirm official figures each year.`}
    >
      <p className="mb-4 text-sm muted">
        <Link href="/tools/jamb-calculator" className="font-bold text-brand-600">
          ← All universities
        </Link>
        {" · "}
        {uni.name} ({uni.state})
      </p>

      {/* Cut-off summary */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-xs font-bold muted">GENERAL UTME CUT-OFF (illustrative)</p>
          <p className="mt-2 text-3xl font-extrabold text-brand-700">{uni.generalUtmeCutoff}+</p>
          <p className="mt-1 text-sm muted">Typical minimum to be considered for screening</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-bold muted">YOUR UTME VS CUT-OFF</p>
          <p className={`mt-2 text-3xl font-extrabold ${meetsGeneral ? "text-emerald-700" : "text-amber-700"}`}>
            {meetsGeneral ? "Meets / above" : "Below typical"}
          </p>
          <p className="mt-1 text-sm muted">
            You entered {utmeNum || "—"} · school guide {uni.generalUtmeCutoff}+
          </p>
        </div>
      </div>

      <CalculatorShell>
        <div className="space-y-4">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm">
            <p className="font-bold text-brand-700">{uni.shortName} formula</p>
            <p className="mt-1 muted">{uni.note}</p>
          </div>
          <div>
            <label className="label">JAMB UTME score (out of 400)</label>
            <input
              className="field"
              type="number"
              min="0"
              max="400"
              value={utme}
              onChange={(e) => setUtme(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Post-UTME / screening score (out of 100)</label>
            <input
              className="field"
              type="number"
              min="0"
              max="100"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          {model === "50-30-20" && (
            <div>
              <label className="label">Best 5 O&apos;Level grades</label>
              <div className="grid grid-cols-5 gap-2">
                {olevels.map((g, i) => (
                  <select
                    key={i}
                    className="field"
                    value={g}
                    onChange={(e) => {
                      const next = [...olevels];
                      next[i] = e.target.value;
                      setOlevels(next);
                    }}
                  >
                    {olevelGrades.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">{uni.shortName} AGGREGATE (out of 100)</p>
          <div className="result-number mt-2">{r.total.toFixed(2)}</div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">JAMB component</p>
              <p className="mt-1 font-bold">{r.parts.jamb.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Post-UTME component</p>
              <p className="mt-1 font-bold">{r.parts.postUtme.toFixed(2)}</p>
            </div>
            {model === "50-30-20" && (
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs muted">O&apos;Level component</p>
                <p className="mt-1 font-bold">{r.parts.olevel.toFixed(2)}</p>
              </div>
            )}
          </div>
          <ShareResult
            text={`${uni.shortName} aggregate: ${r.total.toFixed(2)}/100 · UTME ${utme} (cut-off guide ${uni.generalUtmeCutoff}+) · Numvera Naija`}
          />
        </div>
      </CalculatorShell>

      {/* Course cut-offs table */}
      <div className="mt-8 card p-5 overflow-x-auto">
        <h2 className="font-extrabold text-lg">{uni.shortName} sample course cut-offs</h2>
        <p className="mt-1 text-sm muted">
          Illustrative targets based on competitive patterns — not official {uni.shortName} figures for this year.
        </p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left muted border-b border-[#e5eae7]">
              <th className="py-2 pr-3">Course</th>
              <th className="py-2 pr-3">UTME guide</th>
              <th className="py-2 pr-3">Aggregate guide</th>
              <th className="py-2">Your position</th>
            </tr>
          </thead>
          <tbody>
            {uni.courseCutoffs.map((c) => {
              const utmeOk = utmeNum >= c.utmeMin;
              const aggOk = c.aggregateHint ? r.total >= c.aggregateHint : null;
              return (
                <tr key={c.course} className="border-b border-[#e5eae7]">
                  <td className="py-3 pr-3 font-bold">{c.course}</td>
                  <td className="py-3 pr-3">{c.utmeMin}+</td>
                  <td className="py-3 pr-3">{c.aggregateHint ? `${c.aggregateHint}+` : "—"}</td>
                  <td className="py-3">
                    <span className={`font-bold ${utmeOk ? "text-emerald-700" : "text-amber-700"}`}>
                      UTME {utmeOk ? "OK" : "low"}
                    </span>
                    {aggOk !== null && (
                      <span className={`ml-2 font-bold ${aggOk ? "text-emerald-700" : "text-amber-700"}`}>
                        · Agg {aggOk ? "OK" : "low"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Cut-offs and aggregates change every admission cycle and by course, catchment and merit lists. Use this
        page for planning only — check {uni.shortName}&apos;s official portal and JAMB CAPS for the current year.
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-extrabold">Other universities</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((u) => (
            <Link
              key={u.slug}
              href={`/tools/jamb-calculator/${u.slug}`}
              className="rounded-full border px-3 py-1.5 text-sm font-bold hover:bg-[#f7f9f8]"
            >
              {u.shortName}
            </Link>
          ))}
          <Link
            href="/tools/jamb-calculator"
            className="rounded-full border border-brand-600 px-3 py-1.5 text-sm font-bold text-brand-600"
          >
            View all 30 →
          </Link>
        </div>
      </div>
      <RelatedTools exclude="jamb-calculator" />
    </ToolLayout>
  );
}
