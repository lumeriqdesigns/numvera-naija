import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dde6e0] bg-[#fafcfb]">
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
            <Link href="/blog">Blog</Link>
            <Link href="/embed">Embed calculators</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Popular</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/tools/jamb-calculator">JAMB Aggregate</Link>
            <Link href="/tools/subject-combination-checker">Subject combination</Link>
            <Link href="/tools/post-utme-deadlines">Post-UTME deadlines</Link>
            <Link href="/tools/student-budget-calculator">Student budget</Link>
            <Link href="/tools/compare-universities">Compare universities</Link>
            <Link href="/tools/minimum-score-checker">Score checker</Link>
            <Link href="/tools/jamb-calculator/unilag/medicine">UNILAG Medicine</Link>
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
            <a href="mailto:lumeriqdesigns@gmail.com">lumeriqdesigns@gmail.com</a>
            <a href="https://wa.me/2349031512760" target="_blank" rel="noopener noreferrer">WhatsApp 0903 151 2760</a>
          </div>
        </div>
      </div>
      <div className="container border-t border-[#dde6e0] py-5 text-sm muted">
        © {new Date().getFullYear()} Numvera Naija. Estimates only.  verify important decisions with official sources.
      </div>
    </footer>
  );
}
