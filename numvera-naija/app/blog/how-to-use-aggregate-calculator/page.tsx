import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "50:50 vs 40:60 vs 50-30-20 — which aggregate model?",
  description: "Three common weightings, one goal: a score out of 100 for ranking.",
};

export default function Post() {
  return (
    <main className="section">
      <article className="container max-w-2xl">
        <p className="text-sm muted">
          <Link href="/blog">Blog</Link>
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">50:50 vs 40:60 vs 50-30-20 — which aggregate model?</h1>
        <div className="mt-6">
          
<p className="leading-7 muted"><strong>50:50</strong> — JAMB ÷ 8 + Post-UTME ÷ 2. <strong>40:60</strong> — Post-UTME weighs more. <strong>50-30-20</strong> — includes O’Level in the number.</p>
<p className="mt-4 leading-7 muted">Open the <Link className="font-bold text-brand-600" href="/tools/jamb-calculator">JAMB aggregate calculator</Link> and switch models, or open a school-specific page for 100+ universities.</p>
<p className="mt-4 leading-7 muted">Read the longer guide: <Link className="font-bold text-brand-600" href="/guides/jamb-aggregate-explained">How JAMB aggregate is calculated</Link>.</p>

        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/tools/jamb-calculator" className="btn btn-primary">JAMB tools</Link>
          <Link href="/blog" className="btn btn-secondary">All posts</Link>
        </div>
      </article>
    </main>
  );
}
