import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Interest Basics",
  description: "How amortising loan payments work and how to read total cost of credit.",
};

export default function Guide() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → Loans
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">Loan interest basics</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Most personal loans use amortising payments: each instalment covers interest for the period plus
          some principal. Early months are interest-heavy; later months clear more principal.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold">What drives the monthly payment</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 muted leading-7">
          <li>Principal (how much you borrow)</li>
          <li>Annual interest rate</li>
          <li>Term in months</li>
        </ul>

        <h2 className="mt-8 text-2xl font-extrabold">Total cost matters</h2>
        <p className="mt-3 leading-7 muted">
          Compare total repayment (all instalments added up) and total interest, not only the monthly figure.
          Fees, insurance and default charges can raise the real cost beyond the headline rate.
        </p>

        <p className="mt-8 leading-7 muted">
          Estimate with the{" "}
          <Link href="/tools/loan-calculator" className="font-bold text-brand-600">
            Loan Calculator
          </Link>
         . Confirm final terms with your bank or lender.
        </p>
      </div>
    </main>
  );
}
