import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Loan Calculator Nigeria | Numvera Naija",
  description: "Estimate monthly loan payments, total interest and repayment schedule. Free loan calculator for Nigeria.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
