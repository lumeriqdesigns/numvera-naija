type Faq = { q: string; a: string };

export default function FaqBlock({ items, title = "Frequently asked questions" }: { items: Faq[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className="mt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-xl font-extrabold">{title}</h2>
      <div className="mt-4 space-y-2">
        {items.map((i) => (
          <details key={i.q} className="card group p-4 open:shadow-soft">
            <summary className="cursor-pointer list-none font-bold pr-6 relative">
              {i.q}
              <span className="absolute right-0 top-0 text-brand-600 group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-sm leading-7 muted">{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
