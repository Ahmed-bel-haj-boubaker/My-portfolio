"use client"

import { useRef } from "react"
import { useReducedMotion, useScroll, useSpring } from "motion/react"
import * as m from "motion/react-m"

import type { Role } from "@/data/profile"
import { cn, filled, isPlaceholder } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Badge } from "@/components/ui/badge"

/** Vertical timeline whose line fills as the list scrolls through view. */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <ol ref={ref} className="relative flex flex-col gap-16 pl-8 md:pl-12">
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-border" />
      <m.span
        aria-hidden
        style={{ scaleY: reduceMotion ? 1 : progress }}
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-foreground"
      />

      {roles.map((role, i) => {
        const companyUrl = filled(role.companyUrl)
        return (
          <BlurFade as="li" key={i} delay={0.05} className="relative">
            <span
              aria-hidden
              className="absolute top-1.5 -left-8 grid size-[11px] place-items-center rounded-full border border-border-strong bg-background md:-left-12"
            >
              <span className="size-[5px] rounded-full bg-foreground" />
            </span>

            <p className="font-mono text-xs text-muted-foreground">
              {role.period}
              <span className="mx-2">·</span>
              {role.location}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] md:text-2xl">
              {role.title}
            </h3>
            <p className="mt-1 text-muted-foreground">
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-foreground"
                >
                  {role.company}
                </a>
              ) : (
                role.company
              )}
            </p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {role.bullets.map((bullet, b) => (
                <li
                  key={b}
                  className={cn(
                    "relative pl-5 leading-relaxed text-muted-foreground before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-border-strong",
                    isPlaceholder(bullet) && "italic"
                  )}
                >
                  {bullet}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {role.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="rounded-full font-mono font-normal text-muted-foreground">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </BlurFade>
        )
      })}
    </ol>
  )
}
