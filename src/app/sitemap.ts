import type { MetadataRoute } from "next"

import { profile } from "@/data/profile"
import { absolute } from "@/lib/seo"
import { getProject, siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = profile.updatedAt
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absolute("/opengraph-image")],
    },
    ...profile.caseStudies.map((study) => {
      const cover = getProject(study.projects[0])?.cover
      return {
        url: absolute(`/case-studies/${study.slug}`),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        images: cover ? [absolute(cover.src)] : undefined,
      }
    }),
    ...profile.projects.map((project) => ({
      url: absolute(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: [project.cover, ...project.gallery].map((image) => absolute(image.src)),
    })),
  ]
}
