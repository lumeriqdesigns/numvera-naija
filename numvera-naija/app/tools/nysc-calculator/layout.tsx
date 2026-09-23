import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "NYSC Allowance Calculator | Numvera Naija",
  description: "Project NYSC corps member allowance over service months with optional extra income. Free for Nigerian corpers.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
