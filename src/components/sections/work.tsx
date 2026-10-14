import { profile } from "@/data/profile"
import { featuredProject } from "@/lib/site"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"

/** Asymmetric rhythm for the remaining projects: wide, narrow-offset, wide-shifted. */
const rhythm = [
  { cell: "md:col-span-7", aspect: "aspect-[4/3]" },
  { cell: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]" },
  { cell: "md:col-span-7 md:col-start-6", aspect: "aspect-[16/10]" },
]

export function Work() {
  const rest = profile.projects.filter((p) => p.slug !== featuredProject.slug)

  return (
    <section id="work" aria-labelledby="work-title" className="cv-auto py-24 [--cv-size:2800px] md:py-32">
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
            aspect="aspect-[4/3] md:aspect-[2/1]"
            sizes="(min-width: 1264px) 1200px, 100vw"
          />
        </BlurFade>

        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-y-24">
          {rest.map((project, i) => {
            const { cell, aspect } = rhythm[i % rhythm.length]
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
