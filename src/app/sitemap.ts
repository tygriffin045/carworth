import type { MetadataRoute } from "next";
import { DOMAIN, categories, compares } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/products",
    "/compare",
    ...categories.map((c) => `/categories/${c.slug}`),
    ...compares.map((c) => `/compare/${c.slug}`),
  ];
  return paths.map((path) => ({
    url: `${DOMAIN}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
