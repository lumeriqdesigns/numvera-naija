"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import RelatedTools from "@/components/RelatedTools";
import ShareResult from "@/components/ShareResult";
import {
  percentOf,
  whatIsPercent,
  changePercent,
  profitMargin,
  priceAfterDiscount,
  discountAmount,
} from "@/lib/calculations/percentage";
import { formatNaira } from "@/lib/calculations/salary";

type Mode = "of" | "what" | "change" | "profit" | "discount";

export default function PercentagePage() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");

  let resultLabel = "";
  let resultValue: string | null = null;
  let extra = "";

  if (mode === "of") {
    const v = percentOf(Number(a), Number(b));
    resultLabel = `${a} is what % of ${b}?`;
    resultValue = v === null ? null : `${v.toFixed(2)}%`;
  } else if (mode === "what") {
    const v = whatIsPercent(Number(a), Number(b));
    resultLabel = `What is ${a}% of ${b}?`;
    resultValue = v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  } else if (mode === "change") {
    const v = changePercent(Number(a), Number(b));
    resultLabel = `% change from ${a} to ${b}`;
    resultValue = v === null ? null : `${v.toFixed(2)}%`;
  } else if (mode === "profit") {
    const v = profitMargin(Number(a), Number(b));
    resultLabel = `Profit margin (cost ${a} → sell ${b})`;
    resultValue = v === null ? null : `${v.toFixed(2)}%`;
    extra = v !== null ? `Profit: ${(Number(b) - Number(a)).toLocaleString()}` : "";
  } else {
    const disc = discountAmount(Number(a), Number(b));
    const final = priceAfterDiscount(Number(a), Number(b));
    resultLabel = `${b}% off ${a}`;
    resultValue = final.toLocaleString(undefined, { maximumFractionDigits: 2 });
    extra = `You save ${disc.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  const modes: { id: Mode; label: string }[] = [
    { id: "of", label: "X is what % of Y" },
    { id: "what", label: "What is X% of Y" },
    { id: "change", label: "% increase / decrease" },
    { id: "profit", label: "Profit margin" },
    { id: "discount", label: "Discount price" },
  ];

  return (
    <ToolLayout
      name="Percentage & Profit Calculator"
      description="Calculate percentages, percentage change, trader profit margins and discount prices.  useful for school, business and everyday deals."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
              mode === m.id ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f7f9f8]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <CalculatorShell>
        <div className="space-y-4">
          <div>
            <label className="label">
              {mode === "of" || mode === "change" || mode === "profit"
                ? mode === "profit"
                  ? "Cost price"
                  : "First number"
                : mode === "discount"
                  ? "Original price"
                  : "Percentage"}
            </label>
            <input className="field" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div>
            <label className="label">
              {mode === "of"
                ? "Of (total)"
                : mode === "what"
                  ? "Of (number)"
                  : mode === "change"
                    ? "To (new value)"
                    : mode === "profit"
                      ? "Selling price"
                      : "Discount %"}
            </label>
            <input className="field" type="number" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6">
          <p className="text-sm font-bold muted">{resultLabel}</p>
          <div className="result-number mt-2">{resultValue ?? ". "}</div>
          {extra && <p className="mt-2 text-sm muted">{extra}</p>}
          <ShareResult text={`${resultLabel}: ${resultValue ?? "n/a"} · Numvera Naija`} />
        </div>
      </CalculatorShell>
      <RelatedTools exclude="percentage-calculator" />
    </ToolLayout>
  );
}
