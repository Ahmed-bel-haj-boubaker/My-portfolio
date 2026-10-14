import type { MetadataRoute } from "next"

import { profile } from "@/data/profile"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...profile.projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
