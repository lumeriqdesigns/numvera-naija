import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JAMB cut-off guides for 2026 — how to read them",
  description: "School-published cut-offs are not the same as JAMB national minimum. Use them as planning guides.",
};

export default function Post() {
  return (
    <main className="section">
      <article className="container max-w-2xl">
        <p className="text-sm muted">
          <Link href="/blog">Blog</Link>
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">JAMB cut-off guides for 2026 — how to read them</h1>
        <div className="mt-6">
          
<p className="leading-7 muted">Every admission year, universities publish <strong>departmental cut-off marks</strong> after screening. These are different from the national JAMB minimum.</p>
<p className="mt-4 leading-7 muted">On Numvera Naija, each university page shows an <strong>illustrative UTME guide</strong> and sample course targets. Always confirm on the school portal and JAMB CAPS.</p>
<p className="mt-4 leading-7 muted">Tip: compare two schools with the same scores using the <a className="font-bold text-brand-600" href="/tools/compare-universities">compare tool</a>.</p>

        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/tools/jamb-calculator" className="btn btn-primary">JAMB tools</Link>
          <Link href="/blog" className="btn btn-secondary">All posts</Link>
        </div>
      </article>
    </main>
  );
}
