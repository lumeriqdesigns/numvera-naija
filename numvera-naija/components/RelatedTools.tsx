import Link from "next/link";
import { tools } from "@/lib/tools";

export default function RelatedTools({ exclude }: { exclude: string }) {
  const related = tools.filter((t) => t.slug !== exclude).slice(0, 4);
  return (
    <div className="mt-12">
      <h2 className="text-xl font-extrabold">Related tools</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="card flex items-center gap-3 p-4 transition hover:bg-[#f7f9f8]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <t.icon size={18} />
            </div>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-xs muted line-clamp-1">{t.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
