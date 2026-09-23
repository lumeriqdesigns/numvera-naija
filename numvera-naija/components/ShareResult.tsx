"use client";
import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import PrintResult from "./PrintResult";
import { formatShareMessage, siteConfig } from "@/lib/site";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ShareResult({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const full = formatShareMessage(text);

  async function copy() {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Numvera Naija result", text: full });
      } catch {
        /* cancelled */
      }
    } else {
      copy();
    }
  }

  function whatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(full)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Printable full details block */}
      <div className="print-only" aria-hidden="true">
        <p className="font-extrabold text-base">Numvera Naija result</p>
        <pre className="mt-2 whitespace-pre-wrap font-sans leading-6">{full}</pre>
      </div>
      <div className="no-print flex flex-wrap gap-2">
        <button type="button" onClick={whatsapp} className="btn text-sm bg-[#25D366] text-white hover:bg-[#1da851] border-0">
          <WhatsAppIcon size={16} />
          WhatsApp
        </button>
        <button type="button" onClick={copy} className="btn btn-secondary text-sm">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied" : "Copy full details"}
        </button>
        <button type="button" onClick={share} className="btn btn-secondary text-sm">
          <Share2 size={16} />
          Share
        </button>
        <PrintResult />
      </div>
      <p className="no-print text-xs muted">
        WhatsApp and copy include the full result plus website, email ({siteConfig.email}) and WhatsApp ({siteConfig.whatsappDisplay}).
      </p>
    </div>
  );
}
