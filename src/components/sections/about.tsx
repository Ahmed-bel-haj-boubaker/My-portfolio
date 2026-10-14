import { profile } from "@/data/profile"
import { cn, isPlaceholder } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { NumberTicker } from "@/components/magicui/number-ticker"

export function About() {
  const { about } = profile

  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-page grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-7">
          <BlurFade>
            <h2
              id="about-title"
              className="mb-8 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
            >
              About
            </h2>
          </BlurFade>
          <BlurFade delay={0.05}>
            <p className="text-2xl leading-[1.3] font-medium tracking-[-0.02em] md:text-[2rem]">
              {about.lead}
            </p>
          </BlurFade>
          <div className="mt-10 flex max-w-[60ch] flex-col gap-5">
            {about.body.map((paragraph, i) => (
              <BlurFade key={i} delay={0.1 + i * 0.06}>
                <p
                  className={cn(
                    "text-base leading-relaxed text-muted-foreground md:text-lg",
                    isPlaceholder(paragraph) && "italic"
                  )}
                >
                  {paragraph}
                </p>
              </BlurFade>
            ))}
          </div>
        </div>

        <div className="col-span-12 flex flex-col gap-12 lg:col-span-4 lg:col-start-9 lg:pt-16">
          <dl className="grid grid-cols-2 gap-6">
            {about.stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={0.1 + i * 0.06}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex flex-col gap-2">
                  <span className="text-[3rem] leading-none font-semibold tracking-[-0.04em] md:text-[4.5rem]">
                    {stat.value === null ? (
                      <span className="text-muted-foreground" title="[FILL IN] in src/data/profile.ts">
                        00
                      </span>
                    ) : (
                      <NumberTicker value={stat.value} delay={0.2} />
                    )}
                    {stat.suffix && <span className="text-muted-foreground">{stat.suffix}</span>}
                  </span>
                  <span aria-hidden className="text-sm text-muted-foreground">
                    {stat.label}
                    {stat.value === null && (
                      <span className="block font-mono text-xs">[FILL IN]</span>
                    )}
                  </span>
                </dd>
              </BlurFade>
            ))}
          </dl>

          <BlurFade delay={0.15}>
            <dl className="divide-y divide-border border-y border-border">
              {about.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm">
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className={cn(isPlaceholder(fact.value) && "text-muted-foreground italic")}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
