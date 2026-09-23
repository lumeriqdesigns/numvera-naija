import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-[#f7f9f8] px-2.5 py-1 text-xs font-bold muted">
          {tool.category}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-extrabold">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 muted">{tool.description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-600 group-hover:gap-2 transition-all">
        Open tool <ArrowRight size={16} />
      </span>
    </Link>
  );
}
