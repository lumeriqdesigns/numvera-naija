import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Percentage & Profit Calculator | Numvera Naija",
  description: "Calculate percentages, profit margins and discount prices. Free percentage calculator for Nigeria.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
