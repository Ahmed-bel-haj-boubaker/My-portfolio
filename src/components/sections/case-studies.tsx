import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { getProject } from "@/lib/site"
import { BlurFade } from "@/components/magicui/blur-fade"

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-title"
      className="cv-auto py-24 [--cv-size:1300px] md:py-32"
    >
      <div className="container-page">
        <BlurFade>
          <h2
            id="case-studies-title"
            className="max-w-3xl text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[4.5rem]"
          >
            Case studies
          </h2>
        </BlurFade>
        <BlurFade delay={0.05}>
          <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">
            What these systems do for a business, and why yours probably needs one.
          </p>
        </BlurFade>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {profile.caseStudies.map((study, i) => {
            const cover = getProject(study.projects[0])?.cover
            return (
              <BlurFade as="li" key={study.slug} delay={i * 0.08}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  prefetch
                  transitionTypes={["page"]}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[translate,border-color] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-border-strong"
                >
                  {cover && (
                    <div className="relative aspect-video overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                    <p className="font-mono text-xs text-muted-foreground">
                      {study.industry}
                      <span className="mx-2">·</span>
                      {study.solution}
                    </p>
                    <h3 className="text-xl leading-snug font-semibold tracking-[-0.02em] md:text-2xl">
                      {study.title}
                    </h3>
                    <span className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      Read the case study
                      <span className="grid size-10 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </span>
                  </div>
                </Link>
              </BlurFade>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
