"use client";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import ShareResult from "@/components/ShareResult";
import RelatedTools from "@/components/RelatedTools";
import { calculateAggregate, olevelPoints } from "@/lib/calculations/jamb";
import { getUniversity } from "@/lib/universities";
import { getCourse, findCourseCutoff, courses } from "@/lib/courses";
import { siteConfig } from "@/lib/site";

const olevelGrades = Object.keys(olevelPoints);

export default function UniCoursePage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const courseSlug = String(params.course || "");
  const uni = getUniversity(slug);
  const course = getCourse(courseSlug);

  const [utme, setUtme] = useState("280");
  const [post, setPost] = useState("70");
  const [olevels, setOlevels] = useState(["B3", "B3", "C4", "C5", "C6"]);

  const model = uni?.model ?? "50-50";
  const cutoff = uni && course ? findCourseCutoff(uni, course) : undefined;

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

  if (!uni || !course) {
    return (
      <main className="section">
        <div className="container max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold">Not found</h1>
          <Link href="/tools/jamb-calculator" className="btn btn-primary mt-6 inline-flex">
            JAMB tools
          </Link>
        </div>
      </main>
    );
  }

  const utmeNum = Number(utme) || 0;
  const utmeOk = cutoff ? utmeNum >= cutoff.utmeMin : utmeNum >= uni.generalUtmeCutoff;
  const aggOk = cutoff?.aggregateHint ? r.total >= cutoff.aggregateHint : null;

  return (
    <ToolLayout
      name={`${uni.shortName} ${course.name} Aggregate`}
      description={`${course.seo} for ${uni.name}. ${siteConfig.cutoffsAsOf}`}
    >
      <p className="mb-4 text-sm muted">
        <Link href="/tools/jamb-calculator" className="font-bold text-brand-600">
          All schools
        </Link>
        {" · "}
        <Link href={`/tools/jamb-calculator/${uni.slug}`} className="font-bold text-brand-600">
          {uni.shortName}
        </Link>
        {" · "}
        {course.name}
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs font-bold muted">COURSE UTME GUIDE</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-700">
            {cutoff ? `${cutoff.utmeMin}+` : `${uni.generalUtmeCutoff}+`}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-bold muted">AGGREGATE GUIDE</p>
          <p className="mt-1 text-2xl font-extrabold text-brand-700">
            {cutoff?.aggregateHint ? `${cutoff.aggregateHint}+` : ". "}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-bold muted">YOUR POSITION</p>
          <p className={`mt-1 text-lg font-extrabold ${utmeOk ? "text-emerald-700" : "text-amber-700"}`}>
            UTME {utmeOk ? "OK" : "low"}
            {aggOk !== null && (
              <span className={aggOk ? "text-emerald-700" : "text-amber-700"}> · Agg {aggOk ? "OK" : "low"}</span>
            )}
          </p>
        </div>
      </div>

      <CalculatorShell>
        <div className="space-y-4">
          <p className="text-sm font-bold text-brand-700">{uni.shortName} model: {uni.note}</p>
          <div>
            <label className="label">JAMB UTME ( /400 )</label>
            <input className="field" type="number" min={0} max={400} value={utme} onChange={(e) => setUtme(e.target.value)} />
          </div>
          <div>
            <label className="label">Post-UTME / screening ( /100 )</label>
            <input className="field" type="number" min={0} max={100} value={post} onChange={(e) => setPost(e.target.value)} />
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
        <div className="rounded-2xl bg-[#f7f9f8] p-6 dark:bg-[#0d1812]">
          <p className="text-sm font-bold muted">{uni.shortName} {course.name.toUpperCase()} AGGREGATE</p>
          <div className="result-number mt-2">{r.total.toFixed(2)}</div>
          <ShareResult
            text={`${uni.shortName} ${course.name}: aggregate ${r.total.toFixed(2)} · UTME ${utme} · Numvera Naija`}
          />
        </div>
      </CalculatorShell>

      <div className="mt-8">
        <h2 className="font-extrabold">Other courses at {uni.shortName}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {courses
            .filter((c) => c.slug !== course.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/tools/jamb-calculator/${uni.slug}/${c.slug}`}
                className="rounded-full border px-3 py-1.5 text-sm font-bold hover:bg-[#f4f8f5]"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </div>

      <p className="mt-8 text-sm muted">{siteConfig.cutoffsAsOf}</p>
      <RelatedTools exclude="jamb-calculator" />
    </ToolLayout>
  );
}
