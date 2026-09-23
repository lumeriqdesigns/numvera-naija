import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Numvera Naija",
  description: "Email and WhatsApp contact for Numvera Naija. Questions, corrections and feature ideas welcome.",
};

export default function Contact() {
  const wa = `https://wa.me/${siteConfig.whatsappNumber}`;
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold">Contact</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Questions, corrections or feature ideas for Numvera Naija are welcome. Reach us by email or WhatsApp.
        </p>
        <div className="card mt-8 space-y-5 p-6">
          <div>
            <p className="text-xs font-bold muted">EMAIL</p>
            <a className="mt-1 block text-lg font-bold text-brand-600" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold muted">WHATSAPP</p>
            <a className="mt-1 block text-lg font-bold text-brand-600" href={wa} target="_blank" rel="noopener noreferrer">
              {siteConfig.whatsappDisplay}
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3 text-sm inline-flex">
              Open WhatsApp chat
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
