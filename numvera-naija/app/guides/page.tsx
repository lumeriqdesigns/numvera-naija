import Link from "next/link";

const guides = [
  {
    href: "/guides/jamb-waec-syllabus",
    title: "JAMB & WAEC syllabus hub",
    blurb: "Official IBASS syllabus links, WAEC subject tracks and O'Level requirements.",
  },
  {
    href: "/tools/subject-combination-checker",
    title: "JAMB subject combination checker",
    blurb: "UTME subjects for Medicine, Law, Nursing, Engineering and commercial courses.",
  },
  {
    href: "/tools/post-utme-deadlines",
    title: "Post-UTME deadlines 2026",
    blurb: "Form and screening windows for major Nigerian universities.",
  },
  {
    href: "/guides/jamb-aggregate-explained",
    title: "How JAMB aggregate is calculated",
    blurb: "UTME + Post-UTME formulas (50:50, 40:60, O'Level) used by Nigerian universities.",
  },
  {
    href: "/guides/how-to-calculate-cgpa",
    title: "How to calculate CGPA in Nigeria",
    blurb: "5-point, 4-point and 7-point scales, class of degree, and a worked example.",
  },
  {
    href: "/guides/nigerian-paye-explained",
    title: "How Nigerian PAYE tax works",
    blurb: "Reliefs, progressive bands, pension, NHF and what affects take-home pay.",
  },
  {
    href: "/guides/nysc-allowance-guide",
    title: "NYSC allowance & budgeting",
    blurb: "Plan corps year income, extras and realistic monthly totals.",
  },
  {
    href: "/guides/loan-interest-basics",
    title: "Loan interest basics",
    blurb: "How monthly payments are built and what total cost really means.",
  },
];

export default function GuidesPage() {
  return (
    <main className="section">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-extrabold">Helpful guides</h1>
        <p className="mt-3 text-lg muted">
          Practical explanations so the calculators make sense — not just the final number.
        </p>
        <div className="mt-8 space-y-3">
          {guides.map((g) => (
            <Link href={g.href} className="card block p-6 transition hover:bg-[#f7f9f8]" key={g.href}>
              <h2 className="font-bold text-lg">{g.title}</h2>
              <p className="mt-2 text-sm muted">{g.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
