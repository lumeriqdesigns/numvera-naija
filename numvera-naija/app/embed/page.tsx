import type { Metadata } from "next";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Embed Numvera Naija calculators on your site",
  description: "Free iframe embed codes for JAMB, CGPA, salary and other Numvera Naija tools.",
};

const base = "https://naijatools.vercel.app";

export default function EmbedPage() {
  const pick = tools.filter((t) =>
    ["jamb-calculator", "cgpa-calculator", "salary-calculator", "waec-calculator", "fuel-calculator"].includes(t.slug)
  );
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold">Embed a calculator</h1>
        <p className="mt-3 text-lg muted">
          Add any tool to your blog or school portal with a free iframe. No account required.
        </p>
        <div className="mt-8 space-y-6">
          {pick.map((t) => {
            const code = `<iframe src="${base}${t.href}?embed=1" title="${t.name}" width="100%" height="640" style="border:0;border-radius:16px;max-width:480px" loading="lazy"></iframe>`;
            return (
              <div key={t.slug} className="card p-5">
                <h2 className="font-extrabold">{t.name}</h2>
                <p className="mt-1 text-sm muted">{t.description}</p>
                <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0f1a14] p-4 text-xs text-green-100">{code}</pre>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm muted">
          Please keep the iframe pointing at Numvera Naija and do not strip branding. For partnership, use the contact page.
        </p>
      </div>
    </main>
  );
}
