import Link from "next/link";
import { tools } from "@/lib/tools";

export default function NotFound() {
  const popular = tools.filter((t) => t.featured).slice(0, 6);
  return (
    <main className="section">
      <div className="container max-w-2xl text-center">
        <p className="text-sm font-bold text-brand-600">404</p>
        <h1 className="mt-2 text-4xl font-extrabold">Page not found</h1>
        <p className="mt-3 muted">That link may be old or typed wrong. Try a popular tool:</p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {popular.map((t) => (
            <Link key={t.slug} href={t.href} className="card block p-4 font-bold hover:shadow-soft">
              {t.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/tools" className="btn btn-secondary">All tools</Link>
          <Link href="/guides" className="btn btn-secondary">Guides</Link>
        </div>
      </div>
    </main>
  );
}
