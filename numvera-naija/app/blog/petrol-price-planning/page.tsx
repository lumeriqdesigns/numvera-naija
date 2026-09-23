import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan inter-state trips when petrol prices move",
  description: "Pump prices change often. Distance stays roughly the same.  update price per litre only.",
};

export default function Post() {
  return (
    <main className="section">
      <article className="container max-w-2xl">
        <p className="text-sm muted">
          <Link href="/blog">Blog</Link>
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Plan inter-state trips when petrol prices move</h1>
        <div className="mt-6">
          
<p className="leading-7 muted">Our <Link className="font-bold text-brand-600" href="/tools/fuel-calculator">fuel calculator</Link> includes 90+ interstate routes across SW, SS, SE, NC, NW and NE. Enter your car’s km per litre and today’s pump price.</p>
<p className="mt-4 leading-7 muted">Round-trip mode doubles distance. Split by passengers if you are sharing cost.</p>

        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/tools/jamb-calculator" className="btn btn-primary">JAMB tools</Link>
          <Link href="/blog" className="btn btn-secondary">All posts</Link>
        </div>
      </article>
    </main>
  );
}
