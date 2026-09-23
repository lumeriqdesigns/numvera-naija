import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
 return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://naijatools.vercel.app/sitemap.xml" };
}
