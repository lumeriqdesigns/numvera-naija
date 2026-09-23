import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate CGPA in Nigeria",
  description: "Step-by-step CGPA calculation for Nigerian universities using the 5-point scale, with class of degree.",
};

export default function Guide() {
  return (
    <main className="section">
      <div className="container max-w-3xl prose-like">
        <p className="text-sm muted">
          <Link href="/guides">Guides</Link> → CGPA
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">How to calculate CGPA in Nigeria</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Most Nigerian universities use a 5-point grading system. Your CGPA is the average of quality points
          weighted by course units.
        </p>

        <h2 className="mt-10 text-2xl font-extrabold">1. Know the grade points</h2>
        <p className="mt-3 leading-7 muted">
          Common mapping: A = 5, B = 4, C = 3, D = 2, E = 1, F = 0. Some schools use a 4-point or 7-point
          scale.  always check your handbook.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">2. Multiply units × grade point</h2>
        <p className="mt-3 leading-7 muted">
          For each course: quality points = credit units × grade point. Example: a 3-unit course with grade B
          (4 points) gives 12 quality points.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">3. Divide total points by total units</h2>
        <p className="mt-3 leading-7 muted">
          CGPA = sum of all quality points ÷ sum of all credit units attempted. Include failed courses unless
          your school has a specific repeat rule.
        </p>

        <h2 className="mt-8 text-2xl font-extrabold">4. Class of degree (typical 5-point)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 muted leading-7">
          <li>First Class: 4.50 ,  5.00</li>
          <li>Second Class Upper: 3.50 ,  4.49</li>
          <li>Second Class Lower: 2.40 ,  3.49</li>
          <li>Third Class: 1.50 ,  2.39</li>
          <li>Pass: 1.00 ,  1.49</li>
        </ul>

        <p className="mt-8 leading-7 muted">
          Use the{" "}
          <Link href="/tools/cgpa-calculator" className="font-bold text-brand-600">
            CGPA calculator
          </Link>{" "}
          to add courses quickly and see what average you need next semester to hit a target.
        </p>
      </div>
    </main>
  );
}
