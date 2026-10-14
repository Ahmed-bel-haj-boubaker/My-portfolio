import { profile, type Tech } from "@/data/profile"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Marquee } from "@/components/magicui/marquee"
import { TechIcon } from "@/components/tech-icon"

const allTech = profile.stack
  .flatMap<Tech>((category) => category.items)
  .filter((tech, i, list) => list.findIndex((t) => t.icon === tech.icon) === i)
const half = Math.ceil(allTech.length / 2)
const rows = [allTech.slice(0, half), allTech.slice(half)]

function Logo({ tech }: { tech: Tech }) {
  return (
    <span className="flex items-center gap-3 rounded-full border border-border px-5 py-3 text-muted-foreground transition-colors duration-300 hover:border-border-strong hover:text-foreground">
      <TechIcon icon={tech.icon} className="size-5" />
      <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
    </span>
  )
}

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="cv-auto py-24 [--cv-size:1000px] md:py-32">
      <div className="container-page">
        <BlurFade>
          <h2
            id="stack-title"
            className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[4.5rem]"
          >
            Tools I reach for
          </h2>
        </BlurFade>
      </div>

      <BlurFade delay={0.1} className="relative mt-14 flex flex-col gap-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background md:w-40" />
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i === 1} pauseOnHover repeat={2} className="[--duration:40s]">
            {row.map((tech) => (
              <Logo key={tech.icon} tech={tech} />
            ))}
          </Marquee>
        ))}
      </BlurFade>

      <div className="container-page mt-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
          {profile.stack.map((category, i) => (
            <BlurFade as="li" key={category.title} delay={i * 0.06} className="flex flex-col gap-5">
              <h3 className="border-b border-border pb-3 font-mono text-xs tracking-wide text-muted-foreground">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.items.map((tech) => (
                  <li key={tech.name} className="group flex items-center gap-3 text-sm">
                    <TechIcon
                      icon={tech.icon}
                      className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                    />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  )
}
