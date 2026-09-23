import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JAMB & WAEC Syllabus Hub 2026 | Official Links & Requirements",
  description:
    "Find official JAMB UTME syllabus PDFs via IBASS and WAEC WASSCE subject requirements. Free guide for Nigerian students — link to official sources only.",
  openGraph: {
    title: "JAMB & WAEC Syllabus Hub",
    description: "Official JAMB IBASS syllabus links and WAEC subject requirements for Nigerian candidates.",
  },
};

const jambSubjects = [
  { name: "Use of English", note: "Compulsory for all UTME candidates" },
  { name: "Mathematics", note: "Core for sciences & many commercial courses" },
  { name: "Biology", note: "Science / medical pathway" },
  { name: "Chemistry", note: "Science / medical / engineering pathway" },
  { name: "Physics", note: "Science / engineering pathway" },
  { name: "Economics", note: "Commercial / social science" },
  { name: "Government", note: "Arts / social science" },
  { name: "Literature in English", note: "Arts pathway" },
  { name: "Christian Religious Studies", note: "Arts / education" },
  { name: "Islamic Studies", note: "Arts / education" },
  { name: "Principles of Accounts", note: "Commercial pathway" },
  { name: "Commerce", note: "Commercial pathway" },
  { name: "Geography", note: "Science / social science" },
  { name: "Agricultural Science", note: "Agriculture / science" },
  { name: "Computer Studies", note: "ICT / science" },
  { name: "History", note: "Arts pathway" },
  { name: "French", note: "Languages" },
  { name: "Hausa", note: "Languages" },
  { name: "Igbo", note: "Languages" },
  { name: "Yoruba", note: "Languages" },
  { name: "Arabic", note: "Languages" },
  { name: "Art", note: "Creative arts" },
  { name: "Music", note: "Creative arts" },
  { name: "Home Economics", note: "Vocational / home science" },
];

const waecCore = [
  { name: "English Language", req: "Compulsory for almost all tertiary admissions" },
  { name: "Mathematics (General / Core)", req: "Compulsory for most university courses" },
  { name: "Civic Education", req: "Often required in school candidate packages" },
];

const waecScience = [
  "Biology",
  "Chemistry",
  "Physics",
  "Further Mathematics",
  "Agricultural Science",
  "Geography",
  "Computer Studies / ICT",
];

const waecArts = [
  "Literature-in-English",
  "Government",
  "History",
  "CRS / IRS",
  "Economics",
  "Geography",
  "Visual Art",
];

const waecCommercial = [
  "Economics",
  "Commerce",
  "Financial Accounting",
  "Office Practice",
  "Marketing",
  "Business Management",
];

const waecRequirements = [
  {
    title: "University (typical)",
    body: "At least five (5) credit passes in relevant subjects, including English Language and Mathematics where required by the course, obtained at not more than two sittings (policies vary by school and year).",
  },
  {
    title: "Polytechnic / Monotechnic",
    body: "Often five credits including English and Mathematics for many ND programmes; check each institution’s brochure.",
  },
  {
    title: "College of Education",
    body: "Credits in relevant teaching subjects plus English (and Mathematics for some programmes). Confirm current NCCE / college rules.",
  },
  {
    title: "JAMB + O’Level together",
    body: "UTME subject combination must align with your course. O’Level credits must also match the course requirements in JAMB IBASS / school brochure.",
  },
];

export default function SyllabusHubPage() {
  return (
    <main className="section">
      <div className="container max-w-4xl">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → Syllabus hub
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          JAMB &amp; WAEC syllabus hub
        </h1>
        <p className="mt-4 text-lg leading-8 muted">
          Official places to get UTME and WASSCE syllabuses, plus a plain-language view of O’Level
          requirements. We link to official portals — we do not re-host exam board PDFs.
        </p>

        {/* Quick actions */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            href="https://ibass.jamb.gov.ng/e-syllabus"
            target="_blank"
            rel="noopener noreferrer"
            className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-xs font-bold text-brand-600">OFFICIAL · JAMB</p>
            <h2 className="mt-1 text-xl font-extrabold">IBASS E-Syllabus (PDF)</h2>
            <p className="mt-2 text-sm muted">
              Download subject syllabuses from JAMB’s Integrated Brochure &amp; Syllabus System.
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-brand-600">Open IBASS →</span>
          </a>
          <a
            href="https://www.waecnigeria.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-xs font-bold text-brand-600">OFFICIAL · WAEC</p>
            <h2 className="mt-1 text-xl font-extrabold">WAEC Nigeria</h2>
            <p className="mt-2 text-sm muted">
              Check announcements, registration and resources from the West African Examinations Council
              (Nigeria).
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-brand-600">Open WAEC Nigeria →</span>
          </a>
        </div>

        {/* JAMB section */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">JAMB UTME syllabus</h2>
          <p className="mt-3 leading-7 muted">
            The syllabus lists topics, objectives and recommended texts for each UTME subject. Use of English
            is compulsory for every candidate. Download PDFs only from{" "}
            <a
              href="https://ibass.jamb.gov.ng/e-syllabus"
              className="font-bold text-brand-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              ibass.jamb.gov.ng/e-syllabus
            </a>
            .
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm muted leading-7">
            <li>Open the IBASS E-Syllabus page.</li>
            <li>Search or select your subject.</li>
            <li>Open details and download the official PDF syllabus.</li>
          </ol>

          <h3 className="mt-8 font-bold">Common UTME subjects</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {jambSubjects.map((s) => (
              <div key={s.name} className="rounded-xl border border-[#e5eae7] bg-white px-4 py-3">
                <p className="font-bold text-sm">{s.name}</p>
                <p className="text-xs muted mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm muted">
            After you know your combination, estimate admission strength with the{" "}
            <Link href="/tools/jamb-calculator" className="font-bold text-brand-600">
              JAMB aggregate &amp; cut-off calculator
            </Link>
            .
          </p>
        </section>

        {/* WAEC section */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">WAEC (WASSCE) syllabus &amp; requirements</h2>
          <p className="mt-3 leading-7 muted">
            WAEC syllabuses define topics and exam structure (Papers 1, 2, 3 where applicable) for each
            subject. Always prefer materials published or linked by{" "}
            <a
              href="https://www.waecnigeria.org/"
              className="font-bold text-brand-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              WAEC Nigeria
            </a>
            . Third-party PDF sites may be outdated.
          </p>

          <h3 className="mt-8 font-bold">Core / almost always needed</h3>
          <div className="mt-3 space-y-2">
            {waecCore.map((s) => (
              <div key={s.name} className="rounded-xl border border-[#e5eae7] px-4 py-3">
                <p className="font-bold text-sm">{s.name}</p>
                <p className="text-xs muted mt-0.5">{s.req}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-bold">Science track (examples)</h3>
              <ul className="mt-2 space-y-1 text-sm muted">
                {waecScience.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Arts track (examples)</h3>
              <ul className="mt-2 space-y-1 text-sm muted">
                {waecArts.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Commercial track (examples)</h3>
              <ul className="mt-2 space-y-1 text-sm muted">
                {waecCommercial.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="mt-10 font-bold">O’Level requirements (summary)</h3>
          <div className="mt-4 space-y-3">
            {waecRequirements.map((r) => (
              <div key={r.title} className="card p-4">
                <p className="font-bold">{r.title}</p>
                <p className="mt-2 text-sm leading-6 muted">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm muted">
            Sum your best grades with the{" "}
            <Link href="/tools/waec-calculator" className="font-bold text-brand-600">
              WAEC / NECO points calculator
            </Link>
            .
          </p>
        </section>

        {/* Study path */}
        <section className="mt-14 rounded-2xl bg-[#f7f9f8] p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Suggested study path</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 muted">
            <li>
              Download your <strong>JAMB</strong> subject PDFs from IBASS and mark every topic.
            </li>
            <li>
              Align <strong>WAEC</strong> subjects with the course you want (English + Maths + 3 relevant
              credits is a common baseline).
            </li>
            <li>
              Check your target school’s cut-off and aggregate on our{" "}
              <Link href="/tools/jamb-calculator" className="font-bold text-brand-600">
                university JAMB pages
              </Link>
              .
            </li>
            <li>Revise with past questions only after the syllabus topics are covered.</li>
          </ol>
        </section>

        <div className="mt-10 rounded-xl border-l-4 border-brand-600 bg-white p-5 text-sm leading-6 muted border border-[#e5eae7]">
          Syllabuses and admission rules change. This hub is a navigation guide — always confirm topics and
          credit requirements on JAMB IBASS, WAEC Nigeria and your chosen institution’s brochure.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools/jamb-calculator" className="btn btn-primary">
            JAMB aggregate tools
          </Link>
          <Link href="/tools/waec-calculator" className="btn btn-secondary">
            WAEC points calculator
          </Link>
          <Link href="/guides" className="btn btn-secondary">
            All guides
          </Link>
        </div>
      </div>
    </main>
  );
}
