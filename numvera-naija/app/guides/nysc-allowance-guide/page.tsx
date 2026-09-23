import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NYSC Allowance & Budgeting Guide",
  description: "How to plan corps member income, extras and monthly budget during NYSC.",
};

export default function Guide() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → NYSC
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">NYSC allowance & budgeting</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Corps members receive a monthly federal allowance. Some states or PPA organisations add top-ups.
          Rates change — always confirm the current official figure.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold">Build a simple monthly picture</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 muted leading-7">
          <li>Federal allowance (update when announced)</li>
          <li>State or PPA top-up if any</li>
          <li>Side income (teaching, freelancing, etc.)</li>
          <li>Fixed costs: rent share, transport, feeding, data</li>
        </ul>

        <h2 className="mt-8 text-2xl font-extrabold">Full service projection</h2>
        <p className="mt-3 leading-7 muted">
          Multiplying monthly allowance by 12 gives a rough full-service total before extras. Use it for
          savings goals, not as a guarantee of disbursement timing.
        </p>

        <p className="mt-8 leading-7 muted">
          Use the{" "}
          <Link href="/tools/nysc-calculator" className="font-bold text-brand-600">
            NYSC Allowance Calculator
          </Link>{" "}
          to plug in your numbers quickly.
        </p>
      </div>
    </main>
  );
}
