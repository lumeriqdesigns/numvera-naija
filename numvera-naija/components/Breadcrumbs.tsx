import Link from "next/link";
export default function Breadcrumbs({ name }: { name: string }) {
  return <div className="mb-7 flex items-center gap-2 text-sm muted"><Link href="/">Home</Link><span>→</span><Link href="/tools">Tools</Link><span>→</span><span className="text-[#172019]">{name}</span></div>
}
