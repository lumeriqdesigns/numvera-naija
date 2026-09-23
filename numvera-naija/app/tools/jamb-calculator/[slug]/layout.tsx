import type { Metadata } from "next";
import { getUniversity, universities } from "@/lib/universities";

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversity(slug);
  if (!uni) {
    return { title: "University Aggregate Calculator | Numvera Naija" };
  }
  return {
    title: `${uni.shortName} Aggregate & Cut-off Calculator 2026 | Numvera Naija`,
    description: `${uni.seoNote} Illustrative UTME cut-off ${uni.generalUtmeCutoff}+ and course targets for ${uni.shortName} (${uni.name}).`,
    openGraph: {
      title: `${uni.shortName} Aggregate & Cut-off Calculator`,
      description: uni.seoNote,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
