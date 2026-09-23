"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappAlertUrl, siteConfig } from "@/lib/site";

export default function AlertCapture({ context = "JAMB cut-offs" }: { context?: string }) {
  const [done, setDone] = useState(false);
  const isPlaceholder = siteConfig.whatsappNumber === "2348000000000"; // real number is set in lib/site.ts

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 dark:border-brand-800 dark:bg-[#0d2418]">
      <p className="font-extrabold">Get {context} alerts</p>
      <p className="mt-1 text-sm muted">
        Message us on WhatsApp when major cut-off or admission news drops.
        {isPlaceholder && (
          <span className="block mt-1 text-amber-800 dark:text-amber-200">
            Set your number in <code className="text-xs">lib/site.ts</code> → <code className="text-xs">whatsappNumber</code>.
          </span>
        )}
      </p>
      {!done ? (
        <a
          href={whatsappAlertUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setDone(true)}
          className="btn mt-4 bg-[#25D366] text-white border-0 text-sm hover:bg-[#1da851]"
        >
          <MessageCircle size={16} /> Join WhatsApp alerts
        </a>
      ) : (
        <p className="mt-4 text-sm font-bold text-brand-700">Thanks.  chat opened. Send the message to subscribe.</p>
      )}
    </div>
  );
}
