"use client";
import Link from "next/link";
import { ArrowRight, Search, CheckCircle2, Shield, Zap, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import Testimonials from "@/components/Testimonials";

const guideLinks = [
  { href: "/guides/jamb-waec-syllabus", title: "JAMB & WAEC syllabus hub", blurb: "Official IBASS PDFs and WAEC O'Level requirements." },
  { href: "/tools/subject-combination-checker", title: "JAMB subject combination", blurb: "Correct UTME subjects for Medicine, Law, Nursing and more." },
  { href: "/tools/post-utme-deadlines", title: "Post-UTME deadlines 2026", blurb: "Form dates and portals for UNILAG, UI, OAU, LASU." },
  { href: "/guides/jamb-aggregate-explained", title: "How JAMB aggregate is calculated", blurb: "UTME + Post-UTME formulas used by Nigerian universities." },
  { href: "/guides/how-to-calculate-cgpa", title: "How to calculate CGPA in Nigeria", blurb: "5-point scale, class of degree and worked examples." },
  { href: "/guides/nigerian-paye-explained", title: "How Nigerian PAYE tax works", blurb: "Bands, pension and what affects take-home pay." },
];

export default function Home() {
  const [q, setQ] = useState("");
  const results = useMemo(
    () =>
      tools.filter((t) =>
        `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );
  const featured = tools.filter((t) => t.featured);

  return (
    <main>
      <section className="hero-band py-16 sm:py-24 relative">
        <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="badge-gold mb-5">
              Built for Nigeria. Free forever
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-.045em] text-white sm:text-5xl lg:text-6xl">
              Practical calculators for Nigerian life
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Salary and PAYE, CGPA, NYSC allowance, fuel costs, loans and more. Clear numbers without the clutter.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools" className="btn btn-gold">
                Explore all tools <ArrowRight size={17} />
              </Link>
              <a href="#popular" className="btn border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                Popular tools
              </a>
            </div>
            <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/20 bg-white p-3 shadow-soft">
              <Search className="shrink-0 text-[#6b776f]" />
              <input
                aria-label="Search for a tool"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search CGPA, salary, NYSC, fuel..."
                className="w-full bg-transparent outline-none"
              />
            </div>
            {q && (
              <div className="mt-3 max-w-xl rounded-xl border bg-white p-3 text-sm">
                {results.length ? (
                  results.map((t) => (
                    <Link className="block rounded-lg p-2 hover:bg-[#f7f9f8]" href={t.href} key={t.slug}>
                      {t.name}
                    </Link>
                  ))
                ) : (
                  <span className="muted">No matching tools yet.</span>
                )}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="card p-7 text-[#0f1a14] shadow-lg">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
                  {tools.length} tools
                </span>
                <CheckCircle2 className="text-brand-600" size={22} />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-[#0f1a14]">Nigeria first, not generic.</h2>
              <p className="mt-3 leading-7 text-[#5c6b62]">
                PAYE bands, CGPA class of degree, NYSC budgeting and inter city fuel estimates designed around
                how people here actually calculate.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#0f1a14]">
                {[
                  "No account required",
                  "Runs in your browser",
                  "Share or copy results",
                  "Guides that explain the numbers",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-600 shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="popular" className="section">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-brand-600">POPULAR TOOLS</p>
              <h2 className="mt-2 text-3xl font-extrabold">Start with these</h2>
            </div>
            <Link href="/tools" className="hidden text-sm font-bold text-brand-600 sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f7f9f8]">
        <div className="container">
          <h2 className="text-3xl font-extrabold">Why Numvera Naija</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Zap, title: "Fast & local", body: "Tools tuned for Nigerian salary, school and travel contexts.  not copy paste global calculators." },
              { icon: Shield, title: "Private by design", body: "Calculations stay in your browser. No account, no stored results on our servers." },
              { icon: Smartphone, title: "Works on your phone", body: "Clean mobile layout so you can check numbers on the go." },
            ].map((x) => (
              <div className="card p-6" key={x.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <x.icon size={20} />
                </div>
                <h3 className="mt-5 font-bold">{x.title}</h3>
                <p className="mt-2 text-sm muted leading-6">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-extrabold">Helpful guides</h2>
          <p className="mt-2 muted">Short explanations behind the numbers.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guideLinks.map((g) => (
              <Link href={g.href} className="card p-5 transition hover:-translate-y-1" key={g.href}>
                <h3 className="font-bold">{g.title}</h3>
                <p className="mt-2 text-sm muted">{g.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#f7f9f8]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
          <div className="mt-7 space-y-3">
            {[
              ["Are these calculators free?", "Yes. All tools on Numvera Naija are free to use."],
              ["Do I need an account?", "No. Everything runs in your browser without registration."],
              ["Is the salary calculator official tax advice?", "No. It is an educational estimate using common PAYE structure. Confirm with payroll or a professional."],
              ["Can I use it on my phone?", "Yes. The site is responsive and mobile-friendly."],
              ["Are my numbers saved?", "Not on our servers. You can copy or share a result text from each tool."],
            ].map(([q, a]) => (
              <details className="card p-5" key={q}>
                <summary className="cursor-pointer font-bold">{q}</summary>
                <p className="mt-3 text-sm leading-6 muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
          <Testimonials />
    </main>
  );
}
