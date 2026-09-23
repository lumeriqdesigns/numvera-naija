"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { exactAge } from "@/lib/calculations/age";

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function AgePage() {
  const [dob, setDob] = useState("2000-01-15");
  const [asOf, setAsOf] = useState(todayISO());

  const r = useMemo(() => {
    const a = new Date(dob + "T00:00:00");
    const b = new Date(asOf + "T00:00:00");
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    return exactAge(a, b);
  }, [dob, asOf]);

  return (
    <ToolLayout
      name="Age Calculator"
      description="Calculate exact age in years, months and days. Includes quick checks for NYSC service age window, driver's licence and voting eligibility in Nigeria."
    >
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Date of birth</label>
            <input className="field" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <label className="label">Age as of</label>
            <input className="field" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          {r ? (
            <>
              <p className="text-sm font-bold muted">YOUR AGE</p>
              <div className="result-number mt-2">
                {r.years}
                <span className="text-2xl font-bold muted"> yrs</span>
              </div>
              <p className="mt-2 text-lg font-bold">
                {r.months} months, {r.days} days
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Total days</p>
                  <p className="mt-1 font-bold">{r.totalDays.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <p className="text-xs muted">Next birthday</p>
                  <p className="mt-1 font-bold">{r.nextBirthdayDays} days</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-bold">NYSC age window (18–30):</span>{" "}
                  {r.nyscEligible ? "Within common range" : "Outside typical range"}
                </p>
                <p>
                  <span className="font-bold">Driver&apos;s licence (18+):</span>{" "}
                  {r.driversLicenceEligible ? "Eligible by age" : "Not yet by age"}
                </p>
                <p>
                  <span className="font-bold">Voting (18+):</span>{" "}
                  {r.votingEligible ? "Eligible by age" : "Not yet by age"}
                </p>
              </div>
              <ShareResult
                text={`Age: ${r.years} years, ${r.months} months, ${r.days} days · Numvera Naija`}
              />
            </>
          ) : (
            <p className="text-sm text-red-700">Choose a valid date of birth on or before the as-of date.</p>
          )}
        </div>
      </CalculatorShell>
      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Eligibility notes are age-only guidance. Official NYSC, FRSC and INEC rules have additional
        requirements beyond age.
      </div>
      <RelatedTools exclude="age-calculator" />
    </ToolLayout>
  );
}
