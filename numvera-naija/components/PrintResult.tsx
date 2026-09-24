"use client";
import { Printer } from "lucide-react";

export default function PrintResult() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-secondary text-sm">
      <Printer size={16} /> Print / Save PDF
    </button>
  );
}
