"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappAlertUrl } from "@/lib/site";

export default function AlertCapture({ context = "JAMB cut offs" }: { context?: string }) {
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 dark:border-[#2a3d32] dark:bg-[#0d2418]">
      <p className="font-extrabold dark:text-[#e8f0eb]">Get {context} alerts</p>
      <p className="mt-1 text-sm muted">
        Message us on WhatsApp when major cut off or admission news drops.
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
        <p className="mt-4 text-sm font-bold text-brand-700 dark:text-brand-500">
          Thanks. Chat opened. Send the message to subscribe.
        </p>
      )}
    </div>
  );
}
