"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import {
  calculateCGPA,
  cgpaClass,
  gradeOptions,
  requiredNextCgpa,
  type Course,
  type GradeScale,
} from "@/lib/calculations/cgpa";

const blank = (): Course => ({ name: "", credit: "", grade: "A" });

export default function CGPAPage() {
  const [scale, setScale] = useState<GradeScale>("5-point");
  const [courses, setCourses] = useState<Course[]>([blank(), blank(), blank()]);
  const [error, setError] = useState("");
  const [target, setTarget] = useState("4.5");
  const [nextUnits, setNextUnits] = useState("20");

  const result = useMemo(() => calculateCGPA(courses, scale), [courses, scale]);
  const klass = cgpaClass(result.cgpa, scale);
  const needed = requiredNextCgpa(
    result.cgpa,
    result.units,
    Number(target) || 0,
    Number(nextUnits) || 0
  );

  function validate() {
    if (courses.some((c) => !c.credit || Number(c.credit) <= 0 || !c.grade)) {
      setError("Enter a valid positive credit unit and grade for every course.");
      return;
    }
    setError("");
  }

  const shareText = `My CGPA (${scale}): ${result.cgpa.toFixed(2)} — ${klass.label} · ${result.units} units · via Numvera Naija`;

  return (
    <ToolLayout
      name="CGPA Calculator"
      description="Calculate your CGPA on 5-point, 4-point or 7-point scales used in Nigerian universities and polytechnics. See class of degree and what you need next semester."
    >
      <CalculatorShell>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold">Courses</h2>
            <div className="flex flex-wrap gap-2">
              <select
                className="field w-auto py-2"
                value={scale}
                onChange={(e) => {
                  setScale(e.target.value as GradeScale);
                  setCourses((cs) =>
                    cs.map((c) => ({
                      ...c,
                      grade: gradeOptions[e.target.value as GradeScale][0],
                    }))
                  );
                }}
              >
                <option value="5-point">5-point scale</option>
                <option value="4-point">4-point scale</option>
                <option value="7-point">7-point scale</option>
              </select>
              <button
                type="button"
                className="btn btn-secondary text-sm"
                onClick={() => setCourses([...courses, blank()])}
              >
                + Add course
              </button>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {courses.map((c, i) => (
              <div className="grid gap-2 sm:grid-cols-[1fr_100px_100px_36px]" key={i}>
                <div>
                  <label className="label">Course</label>
                  <input
                    className="field"
                    value={c.name}
                    onChange={(e) => {
                      const a = [...courses];
                      a[i].name = e.target.value;
                      setCourses(a);
                    }}
                    placeholder="e.g. GST 101"
                  />
                </div>
                <div>
                  <label className="label">Units</label>
                  <input
                    className="field"
                    type="number"
                    min="1"
                    value={c.credit}
                    onChange={(e) => {
                      const a = [...courses];
                      a[i].credit = e.target.value;
                      setCourses(a);
                    }}
                  />
                </div>
                <div>
                  <label className="label">Grade</label>
                  <select
                    className="field"
                    value={c.grade}
                    onChange={(e) => {
                      const a = [...courses];
                      a[i].grade = e.target.value;
                      setCourses(a);
                    }}
                  >
                    {gradeOptions[scale].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  aria-label={`Remove course ${i + 1}`}
                  disabled={courses.length === 1}
                  onClick={() => setCourses(courses.filter((_, j) => j !== i))}
                  className="mt-6 rounded-lg text-xl text-gray-400 disabled:opacity-30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {error && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={validate}>
              Calculate CGPA
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCourses([blank(), blank()]);
                setError("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">YOUR CGPA</p>
          <div className="result-number mt-2">{result.cgpa.toFixed(2)}</div>
          <p className={`mt-2 font-bold ${klass.color}`}>{klass.label}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Total units</p>
              <p className="mt-1 font-bold">{result.units}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-xs muted">Quality points</p>
              <p className="mt-1 font-bold">{result.points.toFixed(1)}</p>
            </div>
          </div>
          <ShareResult text={shareText} />
        </div>
      </CalculatorShell>

      <div className="mt-6 card p-5">
        <h2 className="font-bold">What CGPA do I need next semester?</h2>
        <p className="mt-1 text-sm muted">
          Enter a target CGPA and planned units next term to see the average grade points required.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label">Target CGPA</label>
            <input className="field" type="number" step="0.01" value={target} onChange={(e) => setTarget(e.target.value)} />
          </div>
          <div>
            <label className="label">Next semester units</label>
            <input className="field" type="number" min="1" value={nextUnits} onChange={(e) => setNextUnits(e.target.value)} />
          </div>
        </div>
        {needed !== null && (
          <p className="mt-4 rounded-xl bg-brand-50 p-4 text-sm">
            You need an average of <strong>{needed.toFixed(2)}</strong> grade points per unit next semester
            to reach a CGPA of <strong>{Number(target).toFixed(2)}</strong>.
            {needed > (scale === "5-point" ? 5 : scale === "4-point" ? 4 : 7) && (
              <span className="block mt-1 text-amber-800">That target may be above the maximum for this scale.</span>
            )}
          </p>
        )}
      </div>

      <div className="mt-9 rounded-xl border-l-4 border-brand-600 bg-[#f7f9f8] p-5 text-sm leading-6 muted">
        Class of degree labels follow common Nigerian university practice and can differ by institution.
        Always confirm with your faculty handbook.
      </div>
      <RelatedTools exclude="cgpa-calculator" />
    </ToolLayout>
  );
}
