import { NextResponse, type NextRequest } from "next/server"

import { profile } from "@/data/profile"

const known = {
  projects: new Set(profile.projects.map((p) => p.slug)),
  "case-studies": new Set(profile.caseStudies.map((c) => c.slug)),
}

/**
 * Detail pages stream their content, so a notFound() inside them arrives after
 * a 200 status has been sent (a "soft 404" to search engines). Unknown slugs
 * are caught here instead and rewritten to a route that doesn't exist, which
 * renders not-found.tsx with a real 404 status.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/") as [string, keyof typeof known, string]
  if (slug && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/projects/:slug", "/case-studies/:slug"],
}
