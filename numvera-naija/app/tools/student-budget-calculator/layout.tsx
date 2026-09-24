import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Budget Calculator Nigeria.  NELFUND & Campus Expenses 2026",
  description:
    "Free student budget calculator for Nigerian undergraduates and NYSC. Plan hostel, food, transport and NELFUND upkeep in naira. Monthly campus expense planner.",
  keywords: [
    "student budget calculator Nigeria",
    "NELFUND calculator",
    "student loan Nigeria budget",
    "campus expense planner",
    "NYSC budget calculator",
  ],
  openGraph: {
    title: "Student Budget & NELFUND Planner",
    description: "Monthly naira budget for students and corps members.",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
};

export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
