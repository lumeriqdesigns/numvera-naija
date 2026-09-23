import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary & PAYE Calculator Nigeria | Numvera Naija",
  description:
    "Estimate Nigerian take-home pay with pension, NHF and progressive PAYE tax bands. Free online salary calculator for Nigeria.",
  openGraph: {
    title: "Salary & PAYE Calculator Nigeria",
    description: "Estimate take-home pay with Nigerian tax bands, pension and NHF.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
