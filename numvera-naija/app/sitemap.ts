import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { universities } from "@/lib/universities";
import { courses } from "@/lib/courses";

const base = "https://naijatools.vercel.app";

const priorityUnis = [
  "unilag", "ui", "oau", "abu", "unn", "uniben", "unilorin", "uniport",
  "lasu", "unizik", "futa", "covenant", "babcock", "abuad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = tools.map((t) => ({
    url: `${base}${t.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const uniUrls = universities.map((u) => ({
    url: `${base}/tools/jamb-calculator/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const courseUrls: MetadataRoute.Sitemap = [];
  for (const slug of priorityUnis) {
    for (const c of courses) {
      courseUrls.push({
        url: `${base}/tools/jamb-calculator/${slug}/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  const staticPaths = [
    "/", "/tools", "/guides", "/blog", "/embed", "/about", "/contact",
    "/privacy-policy", "/terms",
    "/blog/jamb-cutoff-updates-2026",
    "/blog/petrol-price-planning",
    "/blog/how-to-use-aggregate-calculator",
    "/guides/jamb-waec-syllabus",
    "/guides/how-to-calculate-cgpa",
    "/guides/nigerian-paye-explained",
    "/guides/nysc-allowance-guide",
    "/guides/loan-interest-basics",
    "/guides/jamb-aggregate-explained",
  ].map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  return [...staticPaths, ...toolUrls, ...uniUrls, ...courseUrls];
}
