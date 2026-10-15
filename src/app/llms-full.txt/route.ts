import { profile } from "@/data/profile"
import { absolute } from "@/lib/seo"
import { siteUrl, visibleSocials } from "@/lib/site"

const clean = (lines: string[]) => lines.filter((line) => !line.includes("[FILL IN"))

/**
 * /llms-full.txt: the whole site as one Markdown document, so an AI assistant
 * can answer questions about the profile from a single fetch.
 */
export function GET() {
  const lines = [
    `# ${profile.name}: ${profile.discipline} ${profile.role}`,
    "",
    `> ${profile.description}`,
    "",
    `Website: ${siteUrl} · Email: ${profile.email} · Last updated: ${profile.updatedAt}`,
    `Also known as: ${profile.alternateNames.join(", ")}`,
    ...visibleSocials.filter((s) => s.icon !== "email").map((s) => `${s.label}: ${s.href}`),
    "",
    "## About",
    "",
    profile.about.lead,
    "",
    ...profile.about.body.flatMap((p) => [p, ""]),
    ...profile.about.facts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    "## Frequently asked questions",
    "",
    ...profile.faq.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Experience",
    "",
    ...profile.experience.flatMap((r) => [
      `### ${r.title}, ${r.company}`,
      "",
      `${r.period} · ${r.location}`,
      "",
      ...r.bullets.map((b) => `- ${b}`),
      `- Stack: ${r.stack.join(", ")}`,
      "",
    ]),
    "## Education",
    "",
    ...profile.education.map((e) => `- ${e.degree}, ${e.school} (${e.period})`),
    "",
    "## Skills",
    "",
    ...profile.stack.map((c) => `- ${c.title}: ${c.items.map((t) => t.name).join(", ")}`),
    "",
    "## Case studies",
    "",
    ...profile.caseStudies.flatMap((c) => [
      `### ${c.solution} for ${c.industry.toLowerCase()}`,
      "",
      `URL: ${absolute(`/case-studies/${c.slug}`)}`,
      "",
      c.summary,
      "",
      ...c.problem.flatMap((p) => [p, ""]),
      "What it does:",
      ...c.benefits.map((b) => `- ${b.title}: ${b.description}`),
      "",
      `${c.whyTitle}:`,
      ...c.reasons.map((r) => `- ${r.title}: ${r.description}`),
      "",
      `How it works: ${c.flow.join(" → ")}`,
      "",
      ...c.faq.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]),
    ]),
    "## Projects",
    "",
    ...profile.projects.flatMap((p) => [
      `### ${p.title}`,
      "",
      `URL: ${absolute(`/projects/${p.slug}`)} · ${p.kind} · ${p.role}`,
      "",
      p.summary,
      "",
      `Problem: ${p.problem}`,
      "",
      ...p.approach.map((a) => `- ${a}`),
      "",
      `Result: ${p.result}`,
      "",
      `Stack: ${p.stack.join(", ")}`,
      "",
    ]),
  ]

  return new Response(clean(lines).join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
