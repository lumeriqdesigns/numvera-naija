import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JAMB Minimum Score Checker.  Which Schools Match Your UTME?",
  description:
    "Enter your JAMB score and course. See Nigerian universities whose illustrative cut-off guides you meet.",
  openGraph: {
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
};
export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
