"use client";
import { useEffect, useState } from "react";
import { clearHistory, loadHistory, type HistoryItem } from "@/lib/history";
import { History, Trash2 } from "lucide-react";

export default function CalcHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(loadHistory());
    const onStorage = () => setItems(loadHistory());
    window.addEventListener("storage", onStorage);
    window.addEventListener("nn-history", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("nn-history", onStorage);
    };
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-6 rounded-xl border border-[#dde6e0] bg-white p-4 dark:border-[#2a3d32] dark:bg-[#121c16]">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold">
          <History size={16} /> Recent calculations
        </p>
        <button
          type="button"
          className="text-xs muted hover:text-red-600 flex items-center gap-1"
          onClick={() => {
            clearHistory();
            setItems([]);
          }}
        >
          <Trash2 size={12} /> Clear
        </button>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((h) => (
          <li key={h.id} className="flex justify-between gap-2 border-b border-[#eef2ef] pb-2 last:border-0 dark:border-[#1e2e24]">
            <span>
              <span className="font-bold">{h.tool}</span>
              <span className="muted"> · {h.label}</span>
            </span>
            <span className="font-bold text-brand-600 shrink-0">{h.result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function notifyHistory() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("nn-history"));
}
