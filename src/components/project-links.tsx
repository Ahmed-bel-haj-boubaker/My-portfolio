import { ArrowUpRight } from "lucide-react"
import { SiGithub } from "react-icons/si"

import type { Project } from "@/data/profile"
import { cn, filled } from "@/lib/utils"

/** Live / GitHub / Fiverr links. Placeholder URLs are skipped, so nothing dead ships. */
export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const live = filled(project.links.live)
  const github = filled(project.links.github)
  const fiverr = filled(project.links.fiverr)
  if (!live && !github && !fiverr) return null

  const linkClass =
    "group/link inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
  const arrow = (
    <ArrowUpRight
      aria-hidden
      className="size-3.5 transition-transform duration-300 ease-(--ease-out-expo) group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    />
  )

  return (
    <div className={cn("flex items-center gap-5", className)}>
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <span className="link-draw">Live</span>
          {arrow}
          <span className="sr-only">(opens {project.title} in a new tab)</span>
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <SiGithub aria-hidden className="size-3.5" />
          <span className="link-draw">GitHub</span>
          <span className="sr-only">(source code for {project.title})</span>
        </a>
      )}
      {fiverr && (
        <a href={fiverr} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <span className="link-draw">Fiverr</span>
          {arrow}
          <span className="sr-only">({project.title} on Fiverr)</span>
        </a>
      )}
    </div>
  )
}
