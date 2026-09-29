import type { MetadataRoute } from "next";

import { site } from "@/data/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/skills/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
