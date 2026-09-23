import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post-UTME Form Deadline 2026.  UNILAG, UI, OAU, LASU Screening Dates",
  description:
    "Post-UTME form and screening deadline board for Nigerian universities 2026. UNILAG, UI, OAU, UNN, LASU, UNILORIN and more.  portals and status in one place.",
  keywords: [
    "Post-UTME form 2026",
    "Post-UTME deadline",
    "UNILAG Post-UTME form",
    "UI Post-UTME",
    "OAU screening",
    "LASU Post-UTME form",
  ],
  openGraph: {
    title: "Post-UTME Deadlines 2026",
    description: "Track university screening forms and dates.",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
};

export default function L({ children }: { children: React.ReactNode }) {
  return children;
}
