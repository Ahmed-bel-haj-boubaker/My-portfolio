import { profile } from "@/data/profile"
import { featuredProject } from "@/lib/site"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"

/**
 * Asymmetric rhythm for the remaining projects, in mirrored pairs:
 * wide + narrow (dropped), then narrow + wide (dropped). Covers are 16:9
 * marketing images with text, so every card keeps that shape to avoid
 * cropping the headline.
 */
const rhythm = [
  { cell: "md:col-span-7", aspect: "aspect-video" },
  { cell: "md:col-span-5 md:mt-24", aspect: "aspect-video" },
  { cell: "md:col-span-5", aspect: "aspect-video" },
  { cell: "md:col-span-7 md:mt-24", aspect: "aspect-video" },
]

export function Work() {
  const rest = profile.projects.filter((p) => p.slug !== featuredProject.slug)

  return (
    <section id="work" aria-labelledby="work-title" className="cv-auto py-24 [--cv-size:4200px] md:py-32">
      <div className="container-page">
        <BlurFade>
          <h2
            id="work-title"
            className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[4.5rem]"
          >
            Selected work
          </h2>
        </BlurFade>

        <BlurFade delay={0.05} className="mt-14">
          <ProjectCard
            project={featuredProject}
            featured
            aspect="aspect-[16/10]"
            sizes="(min-width: 1264px) 1200px, 100vw"
          />
        </BlurFade>

        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-y-24">
          {rest.map((project, i) => {
            // An odd one out at the end gets a full-width row instead of half of one
            const lastAlone = i === rest.length - 1 && i % 2 === 0
            const { cell, aspect } = lastAlone
              ? { cell: "md:col-span-12", aspect: "aspect-video" }
              : rhythm[i % rhythm.length]
            return (
              <BlurFade key={project.slug} delay={0.05} className={cn(cell)}>
                <ProjectCard
                  project={project}
                  aspect={aspect}
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
