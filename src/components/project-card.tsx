import { ViewTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { Project } from "@/data/profile"
import { cn, filled } from "@/lib/utils"
import { ShineBorder } from "@/components/magicui/shine-border"
import { ProjectLinks } from "@/components/project-links"
import { Badge } from "@/components/ui/badge"

type ProjectCardProps = {
  project: Project
  featured?: boolean
  aspect?: string
  sizes: string
  className?: string
}

export function ProjectCard({ project, featured, aspect, sizes, className }: ProjectCardProps) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/projects/${project.slug}`}
        prefetch
        transitionTypes={["page"]}
        className="flex flex-col rounded-2xl"
        aria-label={`${project.title}, ${project.kind}. Read the case study`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted transition-[translate,border-color] duration-500 ease-(--ease-out-expo) group-hover:-translate-y-1 group-hover:border-border-strong">
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className={cn("relative w-full", aspect ?? "aspect-[4/3]")}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes={sizes}
                className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]"
              />
            </div>
          </ViewTransition>
          {/* Shine sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-1000 ease-(--ease-out-expo) group-hover:translate-x-full motion-reduce:hidden"
          />
          {featured && (
            <ShineBorder
              shineColor="var(--foreground)"
              className="opacity-0 transition-opacity duration-500 [animation-play-state:paused] group-hover:opacity-60 group-hover:[animation-play-state:running]"
            />
          )}
        </div>

        <div
          className={cn(
            "mt-5 flex gap-6",
            featured ? "flex-col lg:flex-row lg:items-start lg:justify-between" : "items-start justify-between"
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs text-muted-foreground">
              {project.kind}
              {filled(project.year) && (
                <>
                  <span className="mx-2">·</span>
                  {project.year}
                </>
              )}
            </p>
            <h3
              className={cn(
                "font-semibold tracking-[-0.03em]",
                featured ? "text-2xl md:text-[2rem]" : "text-xl md:text-2xl"
              )}
            >
              {project.title}
            </h3>
          </div>
          <div className={cn("flex items-start gap-6", featured && "justify-between lg:max-w-md")}>
            {featured && <p className="text-muted-foreground md:text-lg">{project.summary}</p>}
            <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
        {!featured && <p className="mt-2 max-w-[48ch] text-muted-foreground">{project.summary}</p>}
      </Link>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="outline" className="rounded-full font-mono font-normal text-muted-foreground">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
