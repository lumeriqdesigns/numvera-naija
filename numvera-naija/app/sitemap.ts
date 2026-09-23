import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { universities } from "@/lib/universities";

const base = "https://naijatools.vercel.app";

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

  const guides = [
    "/guides",
    "/guides/jamb-waec-syllabus",
    "/guides/how-to-calculate-cgpa",
    "/guides/nigerian-paye-explained",
    "/guides/nysc-allowance-guide",
    "/guides/loan-interest-basics",
    "/guides/jamb-aggregate-explained",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...toolUrls,
    ...uniUrls,
    ...guides,
  ];
}
