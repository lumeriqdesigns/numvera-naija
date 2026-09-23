import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "BMI Calculator | Numvera Naija",
  description: "Free BMI calculator with WHO categories. Quick body mass index check.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
