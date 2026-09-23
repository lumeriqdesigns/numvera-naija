import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — JAMB, admission & money tips",
  description: "Short updates on JAMB cut-offs, fuel costs and how to use Numvera Naija calculators.",
};

const posts = [
  {
    href: "/blog/jamb-cutoff-updates-2026",
    title: "JAMB cut-off guides for 2026 — how to read them",
    blurb: "Why school cut-offs change, merit vs catchment, and how to use our university pages.",
    date: "2026-09-20",
  },
  {
    href: "/blog/petrol-price-planning",
    title: "Plan inter-state trips when petrol prices move",
    blurb: "Use the fuel calculator with current pump prices across Lagos, Abuja, PH and the North.",
    date: "2026-09-18",
  },
  {
    href: "/blog/how-to-use-aggregate-calculator",
    title: "50:50 vs 40:60 vs 50-30-20 — which aggregate model?",
    blurb: "A plain guide to the three formulas Nigerian universities use most often.",
    date: "2026-09-15",
  },
];

export default function BlogIndex() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold">Blog</h1>
        <p className="mt-3 text-lg muted">Admission, money and tool tips for Nigerian students and workers.</p>
        <div className="mt-8 space-y-4">
          {posts.map((p) => (
            <Link key={p.href} href={p.href} className="card block p-6 hover:shadow-soft transition">
              <p className="text-xs font-bold text-brand-600">{p.date}</p>
              <h2 className="mt-1 text-xl font-extrabold">{p.title}</h2>
              <p className="mt-2 text-sm muted">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
