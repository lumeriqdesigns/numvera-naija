import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Numvera Naija.  Free Calculators for Nigeria",
    template: "%s | Numvera Naija",
  },
  description:
    "Free Nigerian calculators: JAMB aggregate & cut-offs, Salary & PAYE, CGPA, NYSC, fuel, WAEC/NECO, loans. Practical tools for students and workers.",
  keywords: [
    "JAMB aggregate calculator",
    "CGPA calculator Nigeria",
    "salary calculator Nigeria",
    "PAYE calculator",
    "NYSC allowance",
    "fuel cost calculator Nigeria",
    "WAEC points calculator",
    "JAMB subject combination",
    "Post-UTME form 2026",
    "student budget calculator Nigeria",
    "NELFUND",
  ],
  openGraph: {
    title: "Numvera Naija.  Free Calculators for Nigeria",
    description: "JAMB, CGPA, PAYE, fuel and more.  built for Nigerian life.",
    type: "website",
    siteName: "Numvera Naija",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Numvera Naija" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numvera Naija.  Free Calculators for Nigeria",
    description: "JAMB, CGPA, PAYE, fuel and more.  built for Nigerian life.",
    images: ["/og.svg"],
  },
  metadataBase: new URL("https://naijatools.vercel.app"),
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Numvera Naija",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a6b3c" },
    { media: "(prefers-color-scheme: dark)", color: "#043822" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
