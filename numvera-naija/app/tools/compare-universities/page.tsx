"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import ShareResult from "@/components/ShareResult";
import { calculateAggregate, type AggregateModel } from "@/lib/calculations/jamb";
import { universities } from "@/lib/universities";
import { institutionalCutoff } from "@/lib/cutoff-resolve";

export default function ComparePage() {
  const [a, setA] = useState("unilag");
  const [b, setB] = useState("ui");
  const [utme, setUtme] = useState("280");
  const [post, setPost] = useState("70");

  const ua = universities.find((u) => u.slug === a);
  const ub = universities.find((u) => u.slug === b);

  const ra = useMemo(
    () => (ua ? calculateAggregate(ua.model as AggregateModel, Number(utme) || 0, Number(post) || 0, []) : null),
    [ua, utme, post]
  );
  const rb = useMemo(
    () => (ub ? calculateAggregate(ub.model as AggregateModel, Number(utme) || 0, Number(post) || 0, []) : null),
    [ub, utme, post]
  );

  return (
    <ToolLayout
      name="Compare university aggregates"
      description="Same JAMB & Post-UTME scores, two schools.  see how 50:50 vs 40:60 models change your aggregate and cut-off guides."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">University A</label>
          <select className="field" value={a} onChange={(e) => setA(e.target.value)}>
            {universities.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.shortName}.  {u.state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">University B</label>
          <select className="field" value={b} onChange={(e) => setB(e.target.value)}>
            {universities.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.shortName}.  {u.state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">JAMB UTME</label>
          <input className="field" type="number" value={utme} onChange={(e) => setUtme(e.target.value)} />
        </div>
        <div>
          <label className="label">Post-UTME / screening ( /100 )</label>
          <input className="field" type="number" value={post} onChange={(e) => setPost(e.target.value)} />
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { u: ua, r: ra },
          { u: ub, r: rb },
        ].map(({ u, r }) =>
          u && r ? (
            <div key={u.slug} className="card p-6">
              <Link href={`/tools/jamb-calculator/${u.slug}`} className="text-lg font-extrabold text-brand-600">
                {u.shortName}
              </Link>
              <p className="text-sm muted">{u.name}</p>
              <p className="mt-2 text-xs font-bold">{u.note}</p>
              <p className="mt-4 text-3xl font-extrabold text-brand-800">{r.total.toFixed(2)}</p>
              <p className="text-sm muted">aggregate / 100</p>
              <p className="mt-3 text-sm">
                UTME cut-off guide: <strong>{institutionalCutoff(u)}+</strong>
              </p>
              <p className="text-sm">
                Your UTME vs guide:{" "}
                <strong className={Number(utme) >= institutionalCutoff(u) ? "text-emerald-700" : "text-amber-700"}>
                  {Number(utme) >= institutionalCutoff(u) ? "Meets" : "Below"}
                </strong>
              </p>
            </div>
          ) : null
        )}
      </div>
      {ra && rb && ua && ub && (
        <ShareResult
          text={`Compare: ${ua.shortName} ${ra.total.toFixed(2)} vs ${ub.shortName} ${rb.total.toFixed(2)} (UTME ${utme}, Post ${post}) · Numvera Naija`}
        />
      )}
    </ToolLayout>
  );
}
