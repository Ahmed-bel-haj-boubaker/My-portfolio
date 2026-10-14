import { ArrowDownRight, ArrowRight } from "lucide-react"

import { profile } from "@/data/profile"
import { Magnetic } from "@/components/magnetic"
import { SectionLink } from "@/components/section-link"
import { HeroBackground } from "@/components/sections/hero-background"
import { Button } from "@/components/ui/button"

/** Each word of the name with its position, so the CSS reveal can stagger. */
const nameLines = profile.nameLines.reduce<{ word: string; index: number }[][]>(
  (lines, line) => {
    const start = lines.flat().length
    lines.push(line.split(" ").map((word, i) => ({ word, index: start + i })))
    return lines
  },
  []
)

export function Hero() {
  const meta = [`${profile.yearsOfExperience} years`, ...profile.focus].join(" · ")

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <HeroBackground />

      <div className="container-page flex flex-1 flex-col justify-end pt-28 pb-24 md:pb-28">
        <div className="hero-fade mb-10 md:mb-14" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 py-1.5 pr-3.5 pl-3 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-foreground motion-safe:animate-[pulse-ring_2s_var(--ease-out-expo)_infinite]" />
              <span className="relative size-2 rounded-full bg-foreground" />
            </span>
            {profile.availability}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-x-6">
          <h1
            id="hero-title"
            className="col-span-12 col-start-1 row-start-1 text-[clamp(3rem,12vw,10rem)] leading-[0.88] font-semibold tracking-[-0.055em]"
          >
            <span className="sr-only">{profile.name}</span>
            {nameLines.map((line, l) => (
              <span key={l} aria-hidden className="block">
                {line.map(({ word, index }) => (
                  <span
                    key={index}
                    className="hero-word mr-[0.22em] last:mr-0"
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sits beside the short second line on large screens */}
          <p
            className="hero-fade col-span-12 mt-8 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:self-end lg:pb-[0.4em]"
            style={{ "--delay": "450ms" } as React.CSSProperties}
          >
            <span className="text-foreground">{profile.taglineLead}</span>{" "}
            {profile.taglineRest}
          </p>
        </div>

        <div
          className="hero-fade mt-12 flex flex-col gap-8 border-t border-border pt-8 md:mt-16 md:flex-row md:items-center md:justify-between"
          style={{ "--delay": "600ms" } as React.CSSProperties}
        >
          <p className="flex flex-col gap-1">
            <span className="text-base font-medium">
              {profile.role}, {profile.discipline.toLowerCase()}
            </span>
            <span className="font-mono text-sm text-muted-foreground">{meta}</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild className="h-12 rounded-full px-6 text-sm">
                <SectionLink section="work">
                  View work
                  <ArrowDownRight
                    aria-hidden
                    className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5"
                  />
                </SectionLink>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" className="h-12 rounded-full bg-transparent px-6 text-sm dark:bg-transparent">
              <SectionLink section="contact">
                Get in touch
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5"
                />
              </SectionLink>
            </Button>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ "--delay": "900ms" } as React.CSSProperties}
      >
        <span className="h-10 w-px overflow-hidden bg-border">
          <span className="block h-full w-full bg-foreground motion-safe:animate-[scroll-cue_2.4s_var(--ease-out-expo)_infinite]" />
        </span>
      </div>
    </section>
  )
}
