"use client";
import { useMemo, useState } from "react";
import { tools, categories } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import { Search } from "lucide-react";

export default function ToolsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = cat === "All" || t.category === cat;
      const matchQ =
        !q ||
        `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="text-4xl font-extrabold tracking-tight">All tools</h1>
        <p className="mt-3 max-w-2xl text-lg muted">
          Free calculators built for Nigerian students, workers and everyday decisions.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex max-w-md flex-1 items-center gap-3 rounded-2xl border border-[#dfe6e1] bg-white p-3 shadow-soft">
            <Search className="shrink-0 text-[#6b776f]" size={18} />
            <input
              aria-label="Search tools"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1.5 text-sm font-bold border ${
                  cat === c ? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-[#f7f9f8]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-8 text-center muted">No tools match your search.</p>
        )}
      </div>
    </main>
  );
}
