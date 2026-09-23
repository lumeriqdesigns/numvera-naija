import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "WAEC / NECO Grade Points Calculator | Numvera Naija",
  description: "Free WAEC and NECO grade points calculator — sum your best 5 or 8 subjects for Nigeria admission planning.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
