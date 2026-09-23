const items = [
  { quote: "Used the JAMB aggregate tool before Post-UTME — finally understood 50:50 vs 40:60.", name: "Tunde, Lagos" },
  { quote: "PAYE calculator matched what HR explained. Clearer than most salary sites.", name: "Chioma, Abuja" },
  { quote: "CGPA + class of degree in one place. Shared result on WhatsApp with my parents.", name: "Aisha, Kano" },
];

export default function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Trusted by students & workers</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm muted">
          Soft social proof from typical use cases — replace with real quotes when you collect them.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((t) => (
            <blockquote key={t.name} className="card p-5">
              <p className="text-sm leading-7">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-xs font-bold text-brand-600">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
