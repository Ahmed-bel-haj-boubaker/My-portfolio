import { profile } from "@/data/profile"
import { absolute } from "@/lib/seo"
import { siteUrl, visibleSocials } from "@/lib/site"

/**
 * /llms.txt: a plain-Markdown summary of the site for AI assistants and AI
 * search (https://llmstxt.org). Generated from profile.ts, so it never drifts.
 */
export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.description}`,
    "",
    profile.about.lead,
    "",
    `- Based in: ${profile.location} (${profile.workPreference.toLowerCase()}, remote friendly)`,
    `- Focus: ${profile.focus.join(", ")}`,
    `- Contact: ${profile.email}`,
    `- Website: ${siteUrl}`,
    `- CV: ${absolute(profile.resumeUrl)}`,
    ...visibleSocials.filter((s) => s.icon !== "email").map((s) => `- ${s.label}: ${s.href}`),
    "",
    `Full content, including every case study and project in detail: ${absolute("/llms-full.txt")}`,
    "",
    "## Quick answers",
    "",
    ...profile.faq.map((f) => `- ${f.question} ${f.answer}`),
    "",
    "## Services",
    "",
    ...profile.pillars.map((p) => `- ${p.title}: ${p.description} (${p.tools.join(", ")})`),
    "",
    "## Case studies",
    "",
    ...profile.caseStudies.map(
      (c) => `- [${c.solution} for ${c.industry.toLowerCase()}](${absolute(`/case-studies/${c.slug}`)}): ${c.summary}`
    ),
    "",
    "## Projects",
    "",
    ...profile.projects.map(
      (p) => `- [${p.title}](${absolute(`/projects/${p.slug}`)}): ${p.kind}. ${p.summary} Stack: ${p.stack.join(", ")}.`
    ),
    "",
    "## Experience",
    "",
    ...profile.experience.map((r) => `- ${r.title}, ${r.company} (${r.period}, ${r.location})`),
    ...profile.education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
  ]

  return new Response(lines.filter((line) => !line.includes("[FILL IN")).join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
