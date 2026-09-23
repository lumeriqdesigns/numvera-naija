import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JAMB Subject Combination Checker 2026.  UTME Subjects for All Courses",
  description:
    "Free JAMB UTME subject combination checker for Medicine, Law, Nursing, Engineering, Accounting, Computer Science, Mass Communication and more. Correct JAMB subjects for Nigerian universities 2026.",
  keywords: [
    "JAMB subject combination",
    "UTME subject combination",
    "JAMB subjects for Medicine",
    "JAMB subjects for Law",
    "JAMB subjects for Nursing",
    "JAMB subject combination 2026",
  ],
  openGraph: {
    title: "JAMB Subject Combination Checker 2026",
    description: "Find the correct UTME subjects for your course.",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
};

export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
