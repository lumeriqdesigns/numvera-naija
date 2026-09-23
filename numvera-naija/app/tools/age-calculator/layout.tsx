import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Age Calculator Nigeria | Numvera Naija",
  description: "Exact age calculator with NYSC, driver's licence and voting eligibility checks for Nigeria.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
