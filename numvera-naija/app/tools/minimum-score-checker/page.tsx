"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import ShareResult from "@/components/ShareResult";
import RelatedTools from "@/components/RelatedTools";
import { universities } from "@/lib/universities";
import { institutionalCutoff } from "@/lib/cutoff-resolve";
import { courses, findCourseCutoff, type CourseSlug } from "@/lib/courses";
import { siteConfig } from "@/lib/site";

export default function MinScoreChecker() {
  const [utme, setUtme] = useState("250");
  const [course, setCourse] = useState<CourseSlug | "any">("any");
  const [state, setState] = useState("All");

  const states = useMemo(() => {
    const s = Array.from(new Set(universities.map((u) => u.state))).sort();
    return ["All", ...s];
  }, []);

  const matches = useMemo(() => {
    const score = Number(utme) || 0;
    const courseDef = course === "any" ? null : courses.find((c) => c.slug === course);

    return universities
      .filter((u) => state === "All" || u.state === state)
      .map((u) => {
        if (courseDef) {
          const cc = findCourseCutoff(u, courseDef);
          if (cc) {
            return {
              uni: u,
              threshold: cc.utmeMin,
              label: cc.course,
              met: score >= cc.utmeMin,
              agg: cc.aggregateHint,
            };
          }
          // fall back to general if course not listed for this school
          return {
            uni: u,
            threshold: institutionalCutoff(u),
            label: "General / school guide",
            met: score >= institutionalCutoff(u),
            agg: undefined as number | undefined,
          };
        }
        return {
          uni: u,
          threshold: institutionalCutoff(u),
          label: "General UTME guide",
          met: score >= institutionalCutoff(u),
          agg: undefined as number | undefined,
        };
      })
      .filter((x) => x.met)
      .sort((a, b) => b.threshold - a.threshold);
  }, [utme, course, state]);

  const below = useMemo(() => {
    const score = Number(utme) || 0;
    const courseDef = course === "any" ? null : courses.find((c) => c.slug === course);
    return universities
      .filter((u) => state === "All" || u.state === state)
      .filter((u) => {
        if (courseDef) {
          const cc = findCourseCutoff(u, courseDef);
          const t = cc?.utmeMin ?? institutionalCutoff(u);
          return score < t;
        }
        return score < institutionalCutoff(u);
      }).length;
  }, [utme, course, state]);

  return (
    <ToolLayout
      name="Minimum Score Checker"
      description="Enter your JAMB UTME score (and optional course). See which schools’ illustrative cut-off guides you meet. Planning only — not official admission."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Your UTME score</label>
          <input
            className="field"
            type="number"
            min={0}
            max={400}
            value={utme}
            onChange={(e) => setUtme(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Course focus</label>
          <select
            className="field"
            value={course}
            onChange={(e) => setCourse(e.target.value as CourseSlug | "any")}
          >
            <option value="any">Any / general cut-off</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">State</label>
          <select className="field" value={state} onChange={(e) => setState(e.target.value)}>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <p className="text-sm muted">{siteConfig.cutoffsAsOf}</p>
        <p className="mt-2 text-2xl font-extrabold text-brand-800">
          {matches.length} school{matches.length === 1 ? "" : "s"} match
        </p>
        <p className="text-sm muted">{below} others in this filter sit above your score on the guide</p>
        <ShareResult
          text={`UTME ${utme}: meets illustrative cut-off at ${matches.length} schools on Numvera Naija`}
        />
      </div>

      <div className="mt-8 space-y-2">
        {matches.slice(0, 40).map(({ uni, threshold, label, agg }) => (
          <Link
            key={uni.slug + label}
            href={
              course !== "any"
                ? `/tools/jamb-calculator/${uni.slug}/${course}`
                : `/tools/jamb-calculator/${uni.slug}`
            }
            className="card flex flex-wrap items-center justify-between gap-2 p-4 transition hover:shadow-soft"
          >
            <div>
              <p className="font-extrabold">
                {uni.shortName}{" "}
                <span className="text-xs font-bold muted">· {uni.state}</span>
              </p>
              <p className="text-sm muted">{label}</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-bold text-brand-600">{threshold}+ UTME</p>
              {agg != null && <p className="muted">Agg guide {agg}+</p>}
            </div>
          </Link>
        ))}
        {matches.length === 0 && (
          <p className="muted">No schools in this filter meet that score on our guides. Try a broader course or check general cut-offs.</p>
        )}
        {matches.length > 40 && (
          <p className="text-sm muted">Showing top 40 by cut-off guide. Narrow by state for more.</p>
        )}
      </div>

      <RelatedTools exclude="minimum-score-checker" />
    </ToolLayout>
  );
}
