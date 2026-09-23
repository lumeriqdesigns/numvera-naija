"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import AlertCapture from "@/components/AlertCapture";
import RelatedTools from "@/components/RelatedTools";
import FaqBlock from "@/components/FaqBlock";
import { postUtmeDeadlines, deadlineMeta } from "@/lib/post-utme-deadlines";

export default function PostUtmeDeadlinesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const list = useMemo(() => {
    return postUtmeDeadlines.filter((d) => {
      const st = status === "All" || d.status === status;
      const s = q.toLowerCase();
      const mq =
        !s ||
        d.school.toLowerCase().includes(s) ||
        d.shortName.toLowerCase().includes(s) ||
        d.state.toLowerCase().includes(s);
      return st && mq;
    });
  }, [q, status]);

  return (
    <ToolLayout
      name="Post-UTME Form & Screening Deadlines 2026"
      description="Track Post-UTME form dates, screening windows and portals for UNILAG, UI, OAU, UNN, LASU and more. Free Nigerian university Post-UTME deadline board for 2026 admission."
    >
      <p className="text-sm muted mb-4">
        Updated {deadlineMeta.updated}. {deadlineMeta.disclaimer}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Open", "Announced", "Not yet announced", "Closed"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
              status === s ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f4f8f5]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <input
        className="field mb-6 max-w-md"
        placeholder="Search school e.g. UNILAG, LASU..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="space-y-3">
        {list.map((d) => (
          <article key={d.slug} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-extrabold text-lg">
                {d.shortName}{" "}
                <span className="text-sm font-bold muted">· {d.state}</span>
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  d.status === "Open"
                    ? "bg-emerald-100 text-emerald-800"
                    : d.status === "Closed"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-900"
                }`}
              >
                {d.status}
              </span>
            </div>
            <p className="mt-1 text-sm muted">{d.school}</p>
            <p className="mt-3 text-sm">
              <strong>Window:</strong> {d.window}
            </p>
            <p className="mt-1 text-sm muted">
              <strong>Fee:</strong> {d.formFeeHint}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={d.portalHint}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm"
              >
                Official portal
              </a>
              <Link href={`/tools/jamb-calculator/${d.slug}`} className="btn btn-secondary text-sm">
                {d.shortName} aggregate
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <AlertCapture context="Post-UTME deadline" />
      </div>

      <FaqBlock
        items={[
          {
            q: "When does Post-UTME start in 2026?",
            a: "Each university publishes its own advert after UTME results and policy meeting. There is no single national Post-UTME date.",
          },
          {
            q: "Can I buy a Post-UTME form below the school cut-off?",
            a: "Usually no. You must meet that institution’s minimum UTME score (for example 200 at UNILAG/UI/OAU in 2026).",
          },
          {
            q: "Where do I register?",
            a: "Only on the university’s official website or the channel stated in their advert. Avoid third-party “form sellers”.",
          },
        ]}
      />
      <RelatedTools exclude="post-utme-deadlines" />
    </ToolLayout>
  );
}
