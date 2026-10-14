import { Globe, Smartphone, Workflow, type LucideIcon } from "lucide-react"

import { profile, type Pillar } from "@/data/profile"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { TechIcon } from "@/components/tech-icon"

const icons: Record<Pillar["id"], LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  automation: Workflow,
}

/** Bento placement and surface per pillar: each cell gets its own texture. */
const layout: Record<Pillar["id"], { cell: string; surface: React.ReactNode }> = {
  web: {
    cell: "md:col-span-7 md:row-span-2 md:min-h-[28rem]",
    surface: (
      <DotPattern
        width={20}
        height={20}
        className="text-border-strong [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />
    ),
  },
  mobile: {
    cell: "md:col-span-5 bg-muted/60",
    surface: null,
  },
  automation: {
    cell: "md:col-span-5",
    surface: (
      <div
        aria-hidden
        className="line-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_80%)]"
      />
    ),
  },
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="cv-auto py-24 [--cv-size:1150px] md:py-32">
      <div className="container-page">
        <BlurFade>
          <h2
            id="services-title"
            className="max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[4.5rem]"
          >
            What I do
          </h2>
        </BlurFade>
        <BlurFade delay={0.05}>
          <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">
            Three kinds of work, often in the same project.
          </p>
        </BlurFade>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-6">
          {profile.pillars.map((pillar, i) => {
            const Icon = icons[pillar.id]
            const { cell, surface } = layout[pillar.id]
            const large = pillar.id === "web"
            return (
              <BlurFade
                as="li"
                key={pillar.id}
                delay={i * 0.08}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[translate,border-color] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-border-strong md:p-8",
                  cell
                )}
              >
                {surface}
                <div className="relative flex h-full flex-col gap-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground">
                      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    {large ? (
                      <ul aria-hidden className="grid grid-cols-3 gap-2 md:gap-3">
                        {pillar.logos.map((logo, n) => (
                          <li
                            key={logo}
                            style={{ transitionDelay: `${n * 40}ms` }}
                            className="grid size-14 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-[color,border-color,translate] duration-500 ease-(--ease-out-expo) group-hover:-translate-y-0.5 group-hover:border-border-strong group-hover:text-foreground md:size-20"
                          >
                            <TechIcon icon={logo} className="size-6 md:size-7" />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul aria-hidden className="flex -space-x-2">
                        {pillar.logos.map((logo) => (
                          <li
                            key={logo}
                            className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                          >
                            <TechIcon icon={logo} className="size-4" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <h3
                      className={cn(
                        "font-semibold tracking-[-0.03em]",
                        large ? "text-[2rem] md:text-[3rem]" : "text-2xl md:text-[2rem]"
                      )}
                    >
                      {pillar.title}
                    </h3>
                    <p className={cn("max-w-[42ch] text-muted-foreground", large && "md:text-lg")}>
                      {pillar.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                      {pillar.tools.map((tool) => (
                        <li key={tool} className="transition-colors group-hover:text-foreground">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
