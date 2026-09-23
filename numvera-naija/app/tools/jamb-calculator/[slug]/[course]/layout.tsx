import type { Metadata } from "next";
import { getUniversity, universities } from "@/lib/universities";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  // Top competitive schools × all courses for SEO crawl budget balance
  const priority = [
    "unilag", "ui", "oau", "abu", "unn", "uniben", "unilorin", "uniport",
    "lasu", "unizik", "futa", "covenant", "babcock", "abuad",
  ];
  const list = universities.filter((u) => priority.includes(u.slug));
  const params: { slug: string; course: string }[] = [];
  for (const u of list) {
    for (const c of courses) {
      params.push({ slug: u.slug, course: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; course: string }>;
}): Promise<Metadata> {
  const { slug, course } = await params;
  const uni = getUniversity(slug);
  const c = getCourse(course);
  if (!uni || !c) return { title: "Course aggregate guide" };
  return {
    title: `${uni.shortName} ${c.name} Aggregate & Cut-off 2026`,
    description: `${c.seo} for ${uni.shortName} (${uni.name}). Illustrative UTME and aggregate guides — verify officially.`,
    openGraph: {
      title: `${uni.shortName} ${c.name} Aggregate Calculator`,
      description: c.seo,
      images: [{ url: "/og.svg", width: 1200, height: 630 }],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
