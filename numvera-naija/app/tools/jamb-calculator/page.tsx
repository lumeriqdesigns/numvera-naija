"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import FaqBlock from "@/components/FaqBlock";
import AlertCapture from "@/components/AlertCapture";
import {
  calculateAggregate,
  universityPresets,
  type AggregateModel,
  olevelPoints,
} from "@/lib/calculations/jamb";
import { universities } from "@/lib/universities";
import { institutionalCutoff } from "@/lib/cutoff-resolve";

const olevelGrades = Object.keys(olevelPoints);

export default function JambPage() {
  const [model, setModel] = useState<AggregateModel>("50-50");
  const [utme, setUtme] = useState("280");
  const [post, setPost] = useState("70");
  const [olevels, setOlevels] = useState(["B3", "B3", "C4", "C5", "C6"]);
  const [q, setQ] = useState("");

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

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    if (!s) return universities;
    return universities.filter(
      (u) =>
        u.name.toLowerCase().includes(s) ||
        u.shortName.toLowerCase().includes(s) ||
        u.state.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <ToolLayout
      name="JAMB Aggregate Calculator"
      description="Combine UTME and Post-UTME (and O'Level) using common Nigerian university weightings. Browse 100+ federal, state and private university pages with cut-off guides."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {universityPresets.map((p) => (
          <button
            key={p.model}
            type="button"
            onClick={() => setModel(p.model)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
              model === p.model ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f7f9f8]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">JAMB UTME score (out of 400)</label>
            <input className="field" type="number" min="0" max="400" value={utme} onChange={(e) => setUtme(e.target.value)} />
          </div>
          <div>
            <label className="label">Post-UTME / screening score (out of 100)</label>
            <input className="field" type="number" min="0" max="100" value={post} onChange={(e) => setPost(e.target.value)} />
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
          <p className="text-xs muted">{universityPresets.find((p) => p.model === model)?.note}</p>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">AGGREGATE (out of 100)</p>
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
            text={`JAMB aggregate (${model}): ${r.total.toFixed(2)}/100 · UTME ${utme}, Post-UTME ${post} · Numvera Naija`}
          />
        </div>
      </CalculatorShell>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold">University-specific calculators</h2>
        <p className="mt-2 text-sm muted">
          Same maths, school-focused pages — better for search and sharing with friends targeting one school.
        </p>
        <input
          className="field mt-4 max-w-md"
          placeholder="Search university or state..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search universities"
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <Link
              key={u.slug}
              href={`/tools/jamb-calculator/${u.slug}`}
              className="card p-4 transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-extrabold">{u.shortName}</h3>
                <span className="rounded-full bg-[#f7f9f8] px-2 py-0.5 text-xs font-bold muted">{u.state}</span>
              </div>
              <p className="mt-1 text-sm muted line-clamp-1">{u.name}</p>
              <p className="mt-2 text-xs font-bold text-brand-600">{u.note}</p>
              <p className="mt-2 text-xs muted">Institutional min: <strong>{institutionalCutoff(u)}+</strong></p>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-6 muted">No universities match that search.</p>}
      </section>

      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Universities change screening methods and cut-offs every year. These tools use common published
        weightings for planning — always confirm on your target school&apos;s admissions portal.{" "}
        <Link href="/guides/jamb-waec-syllabus" className="font-bold text-brand-600">
          JAMB &amp; WAEC syllabus hub
        </Link>
        .
      </div>
      <div className="mt-10">
        <div className="mb-4">
          <Link href="/tools/minimum-score-checker" className="btn btn-primary text-sm">
            Minimum score checker — which schools match my UTME?
          </Link>
          <Link href="/tools/subject-combination-checker" className="btn btn-secondary text-sm">
            Subject combination checker
          </Link>
          <Link href="/tools/post-utme-deadlines" className="btn btn-secondary text-sm">
            Post-UTME deadlines
          </Link>
        </div>
        <AlertCapture context="JAMB cut-off" />
      </div>
      <FaqBlock
        items={[
          {
            q: "How is JAMB aggregate calculated?",
            a: "Most schools use weighted UTME and Post-UTME (e.g. 50:50 or 40:60). Some also include O'Level (50-30-20). There is no single national formula — check your target school.",
          },
          {
            q: "What is a good aggregate score?",
            a: "It depends on the course. Competitive programmes like Medicine often need high 60s–80s. Use departmental cut-offs from the school, not only the national JAMB minimum.",
          },
          {
            q: "Are the cut-offs on this site official?",
            a: "Institutional minima for many schools come from the 2026 JAMB Policy Meeting. Course-level aggregates are still planning guides. Always verify on the university portal and JAMB CAPS.",
          },
        ]}
      />
      <RelatedTools exclude="jamb-calculator" />
    </ToolLayout>
  );
}
