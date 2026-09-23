import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e5eae7] bg-white">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-extrabold">
            Numvera <span className="text-brand-600">Naija</span>
          </div>
          <p className="mt-2 max-w-xs text-sm muted">
            Practical free calculators built for Nigerian students, workers and everyday life.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/">Home</Link>
            <Link href="/tools">All tools</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/guides/jamb-waec-syllabus">JAMB & WAEC syllabus</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Popular</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/tools/jamb-calculator">JAMB Aggregate</Link>
            <Link href="/tools/jamb-calculator/unilag">UNILAG Aggregate</Link>
            <Link href="/tools/salary-calculator">Salary & PAYE</Link>
            <Link href="/tools/cgpa-calculator">CGPA Calculator</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Information</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="container border-t border-[#e5eae7] py-5 text-sm muted">
        © {new Date().getFullYear()} Numvera Naija. Estimates only — verify important decisions with official sources.
      </div>
    </footer>
  );
}
