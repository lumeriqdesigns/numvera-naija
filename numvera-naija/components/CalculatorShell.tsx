import type { ReactNode } from "react";

export default function CalculatorShell({ children }: { children: ReactNode }) {
  return (
    <div className="card grid gap-6 p-5 sm:p-7 lg:grid-cols-2">{children}</div>
  );
}
