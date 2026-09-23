import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How JAMB Aggregate Is Calculated in Nigeria",
  description: "Explain UTME + Post-UTME formulas (50:50, 40:60, O'Level) used by Nigerian universities for admission.",
};

export default function Guide() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → JAMB aggregate
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">How JAMB aggregate is calculated</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Your raw UTME score is only part of admission. Most schools combine JAMB with Post-UTME (and sometimes
          O&apos;Level) into an aggregate out of 100.
        </p>
        <h2 className="mt-10 text-2xl font-extrabold">Common 50:50 formula</h2>
        <p className="mt-3 leading-7 muted">
          Aggregate = (JAMB ÷ 8) + (Post-UTME ÷ 2). Example: JAMB 280 → 35; Post-UTME 70 → 35; total 70.
        </p>
        <h2 className="mt-8 text-2xl font-extrabold">40:60 style</h2>
        <p className="mt-3 leading-7 muted">
          Some schools weight screening higher: JAMB contributes 40 points, Post-UTME 60. Always check the
          current prospectus for your course.
        </p>
        <h2 className="mt-8 text-2xl font-extrabold">With O&apos;Level</h2>
        <p className="mt-3 leading-7 muted">
          A minority of processes add graded O&apos;Level points. Others only require minimum credits in
          required subjects.
        </p>
        <p className="mt-8 leading-7 muted">
          Use the{" "}
          <Link href="/tools/jamb-calculator" className="font-bold text-brand-600">
            JAMB Aggregate Calculator
          </Link>{" "}
          to compare models quickly.
        </p>
      </div>
    </main>
  );
}
