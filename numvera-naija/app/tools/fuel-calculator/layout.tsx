import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fuel Cost Calculator Nigeria.  Interstate Routes | Numvera Naija",
  description:
    "Estimate petrol cost for Lagos, Abuja, Kano, Port Harcourt, Enugu and 80+ interstate routes across all Nigerian regions. Free fuel trip calculator.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
