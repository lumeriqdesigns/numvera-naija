import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGPA Calculator Nigeria (5 / 4 / 7 point) | Numvera Naija",
  description:
    "Free CGPA calculator for Nigerian universities and polytechnics. Supports 5-point, 4-point and 7-point scales with class of degree.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
