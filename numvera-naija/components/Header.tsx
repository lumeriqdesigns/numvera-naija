"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BrandMark from "./BrandMark";

const links = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#dde6e0] bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(4,56,34,0.04)]">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <BrandMark size={36} />
          <span>
            Numvera <span className="text-brand-600">Naija</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-bold md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[#3d4a42] hover:text-brand-600 transition-colors dark:text-[#c5d4cb]">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/tools" className="btn btn-primary text-sm py-2 px-4">
            All tools
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" className="rounded-lg p-2" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[#dde6e0] bg-white px-4 py-4 md:hidden dark:bg-[#0a120e] dark:border-[#2a3d32]">
          <div className="flex flex-col gap-3 text-sm font-bold">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/tools" className="btn btn-primary text-sm" onClick={() => setOpen(false)}>
              All tools
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
