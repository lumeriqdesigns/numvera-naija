import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Nigerian PAYE Tax Works",
  description: "Plain-language guide to CRA, progressive PAYE bands, pension and NHF in Nigeria.",
};

export default function Guide() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → PAYE
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">How Nigerian PAYE tax works</h1>
        <p className="mt-5 text-lg leading-8 muted">
          PAYE (Pay As You Earn) is how most employed people pay Personal Income Tax. The exact amount depends
          on reliefs, pension and progressive rates.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold">Consolidated Relief Allowance (CRA)</h2>
        <p className="mt-3 leading-7 muted">
          A major relief is CRA: generally the higher of ₦200,000 or 1% of gross income, plus 20% of gross
          income. This reduces the income that is taxed.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">Pension and NHF</h2>
        <p className="mt-3 leading-7 muted">
          Employee pension contributions (often 8% of basic) and National Housing Fund (NHF, commonly 2.5%
          where applicable) are usually deducted before tax is calculated on the remaining taxable base.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">Progressive bands</h2>
        <p className="mt-3 leading-7 muted">
          Taxable income is charged in layers (for example starting at 7% on the first portion, rising to 24%
          on the highest). Higher earners pay a higher effective rate, but not every naira is taxed at the top
          rate.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">Take-home pay</h2>
        <p className="mt-3 leading-7 muted">
          Roughly: gross − pension − NHF − PAYE − other deductions = take-home. Employers may also deduct
          union dues, loans or cooperative savings.
        </p>

        <p className="mt-8 leading-7 muted">
          Try the{" "}
          <Link href="/tools/salary-calculator" className="font-bold text-brand-600">
            Salary & PAYE calculator
          </Link>{" "}
          for a structured estimate. It is educational.  not a substitute for payroll or professional advice.
        </p>
      </div>
    </main>
  );
}
