import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"

/**
 * AI search and assistant crawlers, named explicitly so the intent is clear:
 * these fetch pages to cite them in answers (ChatGPT, Claude, Perplexity,
 * Gemini, Copilot, Apple). Blocking any of them removes the site from that
 * engine's answers.
 */
const answerEngines = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: answerEngines, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
