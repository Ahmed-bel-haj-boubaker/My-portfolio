import { profile } from "@/data/profile"
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

export const featuredProject =
  profile.projects.find((p) => p.featured) ?? profile.projects[0]

export function getProject(slug: string) {
  return profile.projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = profile.projects.findIndex((p) => p.slug === slug)
  return profile.projects[(i + 1) % profile.projects.length]
}
