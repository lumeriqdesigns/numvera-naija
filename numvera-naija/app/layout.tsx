import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Numvera Naija — Free Calculators for Nigeria",
    template: "%s | Numvera Naija",
  },
  description:
    "Free Nigerian calculators: Salary & PAYE, CGPA, NYSC allowance, fuel cost, loans, percentages and age. Practical tools for students and workers.",
  keywords: [
    "CGPA calculator Nigeria",
    "salary calculator Nigeria",
    "PAYE calculator",
    "NYSC allowance",
    "loan calculator Nigeria",
    "fuel cost calculator",
  ],
  openGraph: {
    title: "Numvera Naija — Free Calculators for Nigeria",
    description: "Salary & PAYE, CGPA, NYSC, fuel and more — built for Nigerian life.",
    type: "website",
  },
  metadataBase: new URL("https://naijatools.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
