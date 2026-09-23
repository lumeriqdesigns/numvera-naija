"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ToolLayout from "@/components/ToolLayout";
import ShareResult from "@/components/ShareResult";
import RelatedTools from "@/components/RelatedTools";
import FaqBlock from "@/components/FaqBlock";
import { subjectCombinations } from "@/lib/subject-combinations";

export default function SubjectCombinationPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const cats = ["All", "Science", "Arts", "Commercial", "Technology", "Education"];

  const list = useMemo(() => {
    return subjectCombinations.filter((c) => {
      const matchCat = cat === "All" || c.category === cat;
      const s = q.toLowerCase();
      const matchQ =
        !s ||
        c.course.toLowerCase().includes(s) ||
        c.keywords.some((k) => k.toLowerCase().includes(s)) ||
        c.compulsory.some((x) => x.toLowerCase().includes(s));
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <ToolLayout
      name="JAMB UTME Subject Combination Checker"
      description="Find the correct JAMB subject combination for Medicine, Law, Nursing, Engineering, Accounting, Computer Science and more. Free UTME subject guide for Nigerian universities 2026."
    >
      <p className="mb-4 text-sm muted">
        Search by course. Always confirm on{" "}
        <a href="https://ibass.jamb.gov.ng" className="font-bold text-brand-600" target="_blank" rel="noopener noreferrer">
          JAMB IBASS
        </a>{" "}
        and your school brochure.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
              cat === c ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f4f8f5]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <input
        className="field mb-6 max-w-md"
        placeholder="Search course e.g. Medicine, Law, Computer Science..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search subject combinations"
      />

      <div className="space-y-4">
        {list.map((c) => (
          <article key={c.slug} id={c.slug} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-extrabold">{c.course}</h2>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">{c.category}</span>
            </div>
            <p className="mt-3 text-sm font-bold muted">UTME subjects (typical)</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {c.compulsory.map((s) => (
                <li key={s} className="rounded-lg bg-[#0a6b3c] px-2.5 py-1 text-xs font-bold text-white">
                  {s}
                </li>
              ))}
              {c.others.map((s) => (
                <li key={s} className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800">
                  {s} (option)
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm muted">
              <strong>O&apos;Level:</strong> {c.olevel}
            </p>
            <p className="mt-2 text-sm muted">{c.note}</p>
            <ShareResult
              text={`JAMB subjects for ${c.course}: ${[...c.compulsory, ...c.others.slice(0, 2)].join(", ")} · Numvera Naija`}
            />
          </article>
        ))}
        {list.length === 0 && <p className="muted">No course matched that search.</p>}
      </div>

      <FaqBlock
        items={[
          {
            q: "What is JAMB subject combination?",
            a: "It is the set of four UTME subjects (including Use of English) required for a course. Wrong combination can block admission even with a high score.",
          },
          {
            q: "Where do I confirm the official combination?",
            a: "Use JAMB IBASS and your institution’s brochure. Schools can list waivers or exact options that differ slightly from general guides.",
          },
          {
            q: "Is Literature compulsory for Law?",
            a: "Literature in English is widely required for Law in Nigeria. Always verify the current IBASS entry for your chosen schools.",
          },
        ]}
      />
      <RelatedTools exclude="subject-combination-checker" />
    </ToolLayout>
  );
}
