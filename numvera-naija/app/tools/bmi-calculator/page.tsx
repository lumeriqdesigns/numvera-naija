"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import { calculateBmi } from "@/lib/calculations/bmi";

export default function BmiPage() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const r = useMemo(
    () => calculateBmi(Number(weight) || 0, Number(height) || 0),
    [weight, height]
  );

  return (
    <ToolLayout
      name="BMI Calculator"
      description="Calculate Body Mass Index from weight and height using the standard WHO categories. For general awareness only.  not medical advice."
    >
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">Weight (kg)</label>
            <input className="field" type="number" min="1" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input className="field" type="number" min="50" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          {r ? (
            <>
              <p className="text-sm font-bold muted">YOUR BMI</p>
              <div className="result-number mt-2">{r.bmi.toFixed(1)}</div>
              <p className={`mt-2 font-bold ${r.color}`}>{r.category}</p>
              <ul className="mt-6 space-y-1 text-sm muted">
                <li>Underweight: below 18.5</li>
                <li>Normal: 18.5 ,  24.9</li>
                <li>Overweight: 25 ,  29.9</li>
                <li>Obese: 30 and above</li>
              </ul>
              <ShareResult text={`My BMI: ${r.bmi.toFixed(1)} (${r.category}) · Numvera Naija`} />
            </>
          ) : (
            <p className="text-sm text-red-700">Enter valid weight and height.</p>
          )}
        </div>
      </CalculatorShell>
      <RelatedTools exclude="bmi-calculator" />
    </ToolLayout>
  );
}
