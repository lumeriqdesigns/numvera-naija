export type HistoryItem = {
  id: string;
  tool: string;
  label: string;
  result: string;
  at: number;
};

const KEY = "nn-calc-history";
const MAX = 5;

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as HistoryItem[];
  } catch {
    return [];
  }
}

export function pushHistory(item: Omit<HistoryItem, "id" | "at">) {
  if (typeof window === "undefined") return;
  const list = loadHistory().filter((h) => h.label !== item.label || h.tool !== item.tool);
  const next: HistoryItem[] = [
    { ...item, id: `${Date.now()}`, at: Date.now() },
    ...list,
  ].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
