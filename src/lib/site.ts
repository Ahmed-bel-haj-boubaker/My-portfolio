import { profile, type Project } from "@/data/profile"
import { filled } from "@/lib/utils"

/**
 * Absolute site URL used for metadata, sitemap and Open Graph.
 * Order: profile.siteUrl -> Vercel production URL -> localhost.
 */
export const siteUrl = (
  filled(profile.siteUrl) ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "")

export const visibleSocials = profile.socials.filter((s) => filled(s.href))

const projects: Project[] = profile.projects

export const featuredProject: Project = projects.find((p) => p.featured) ?? projects[0]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
