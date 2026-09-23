import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fuel Cost Calculator Nigeria | Numvera Naija",
  description: "Estimate petrol cost for Lagos–Abuja and other Nigerian routes. Free fuel trip calculator.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
