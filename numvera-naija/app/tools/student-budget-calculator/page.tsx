"use client";
import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import CalculatorShell from "@/components/CalculatorShell";
import ShareResult from "@/components/ShareResult";
import RelatedTools from "@/components/RelatedTools";
import FaqBlock from "@/components/FaqBlock";
import { formatNaira } from "@/lib/calculations/salary";

export default function StudentBudgetPage() {
  const [allowance, setAllowance] = useState("50000");
  const [nelfund, setNelfund] = useState("0");
  const [side, setSide] = useState("0");
  const [rent, setRent] = useState("25000");
  const [food, setFood] = useState("20000");
  const [transport, setTransport] = useState("8000");
  const [data, setData] = useState("5000");
  const [books, setBooks] = useState("3000");
  const [other, setOther] = useState("5000");

  const r = useMemo(() => {
    const income = (Number(allowance) || 0) + (Number(nelfund) || 0) + (Number(side) || 0);
    const expenses =
      (Number(rent) || 0) +
      (Number(food) || 0) +
      (Number(transport) || 0) +
      (Number(data) || 0) +
      (Number(books) || 0) +
      (Number(other) || 0);
    return {
      income,
      expenses,
      balance: income - expenses,
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    };
  }, [allowance, nelfund, side, rent, food, transport, data, books, other]);

  return (
    <ToolLayout
      name="Student Budget & NELFUND Planner"
      description="Free student budget calculator for Nigerian undergraduates and NYSC. Plan hostel, food, transport and estimate space for NELFUND student loan upkeep — monthly naira planner 2026."
    >
      <CalculatorShell>
        <div className="space-y-4">
          <p className="text-sm font-bold text-brand-700">Monthly income (₦)</p>
          <div>
            <label className="label">Family / personal allowance</label>
            <input className="field" type="number" min={0} value={allowance} onChange={(e) => setAllowance(e.target.value)} />
          </div>
          <div>
            <label className="label">NELFUND / student loan upkeep (if any)</label>
            <input className="field" type="number" min={0} value={nelfund} onChange={(e) => setNelfund(e.target.value)} />
            <p className="mt-1 text-xs muted">Enter only amounts you actually receive. Confirm eligibility on the official NELFUND portal.</p>
          </div>
          <div>
            <label className="label">Side income (tutoring, biz, etc.)</label>
            <input className="field" type="number" min={0} value={side} onChange={(e) => setSide(e.target.value)} />
          </div>
          <p className="text-sm font-bold text-brand-700 pt-2">Monthly expenses (₦)</p>
          {[
            ["Hostel / rent share", rent, setRent],
            ["Food", food, setFood],
            ["Transport", transport, setTransport],
            ["Data & airtime", data, setData],
            ["Books / materials", books, setBooks],
            ["Other", other, setOther],
          ].map(([label, val, set]) => (
            <div key={label as string}>
              <label className="label">{label as string}</label>
              <input
                className="field"
                type="number"
                min={0}
                value={val as string}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-[#f7f9f8] p-6 dark:bg-[#0d1812]">
          <p className="text-sm font-bold muted">MONTHLY BALANCE</p>
          <div className={`result-number mt-2 ${r.balance < 0 ? "!text-red-700" : ""}`}>
            {formatNaira(r.balance)}
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl bg-white p-4 dark:bg-[#121c16]">
              <p className="text-xs muted">Total income</p>
              <p className="mt-1 font-bold">{formatNaira(r.income)}</p>
            </div>
            <div className="rounded-xl bg-white p-4 dark:bg-[#121c16]">
              <p className="text-xs muted">Total expenses</p>
              <p className="mt-1 font-bold">{formatNaira(r.expenses)}</p>
            </div>
            <div className="rounded-xl bg-white p-4 dark:bg-[#121c16]">
              <p className="text-xs muted">Savings rate</p>
              <p className="mt-1 font-bold">{r.savingsRate.toFixed(1)}%</p>
            </div>
          </div>
          <ShareResult
            text={`Student budget: income ${formatNaira(r.income)}, expenses ${formatNaira(r.expenses)}, balance ${formatNaira(r.balance)} · Numvera Naija`}
          />
        </div>
      </CalculatorShell>

      <FaqBlock
        items={[
          {
            q: "What is NELFUND?",
            a: "The Nigerian Education Loan Fund provides student loans for eligible tertiary students. Amounts and rules change — use only official NELFUND channels for applications.",
          },
          {
            q: "Is this an official loan calculator?",
            a: "No. It is a personal budget planner. Enter loan upkeep only if you already know what you receive or expect from official sources.",
          },
          {
            q: "How much should a student budget in Lagos or Abuja?",
            a: "It varies widely by hostel vs off-campus. Use this tool with realistic local rent and food prices, then adjust monthly.",
          },
        ]}
      />
      <RelatedTools exclude="student-budget-calculator" />
    </ToolLayout>
  );
}
