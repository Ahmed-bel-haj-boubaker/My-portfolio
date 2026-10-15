import { Suspense, ViewTransition } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Award,
  Bell,
  CalendarCheck,
  Check,
  Contact as ContactIcon,
  Filter,
  Globe,
  Images,
  MessageCircle,
  Phone,
  Receipt,
  Search,
  ShieldCheck,
  Sheet,
  Smartphone,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react"

import { profile, type CaseStudyIcon } from "@/data/profile"
import { caseStudyJsonLd, jsonLd, pageMetadata } from "@/lib/seo"
import { getCaseStudy, getNextCaseStudy, getProject } from "@/lib/site"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { FaqList } from "@/components/faq-list"
import { Contact } from "@/components/sections/contact"
import { Badge } from "@/components/ui/badge"

type Params = PageProps<"/case-studies/[slug]">["params"]

const icons: Record<CaseStudyIcon, LucideIcon> = {
  phone: Phone,
  shield: ShieldCheck,
  calendar: CalendarCheck,
  users: Users,
  sheet: Sheet,
  alert: TriangleAlert,
  message: MessageCircle,
  filter: Filter,
  image: Images,
  crm: ContactIcon,
  search: Search,
  smartphone: Smartphone,
  bell: Bell,
  award: Award,
  receipt: Receipt,
  globe: Globe,
}

export function generateStaticParams() {
  return profile.caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return pageMetadata({
    title: `${study.solution} for ${study.industry.toLowerCase()}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    image: getProject(study.projects[0])?.cover,
    type: "article",
  })
}

export default function CaseStudyPage({ params }: { params: Params }) {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "none" }}
      exit={{ page: "page-out", default: "none" }}
      default="none"
    >
      <main id="main" className="flex-1 pt-28 md:pt-36">
        <div className="container-page">
          <Link
            href="/#case-studies"
            transitionTypes={["page"]}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-x-0.5"
            />
            All case studies
          </Link>
        </div>

        {/* The slug is URL data: stream it so the route shell stays instant */}
        <Suspense fallback={<CaseStudySkeleton />}>
          <CaseStudyContent params={params} />
        </Suspense>
      </main>
    </ViewTransition>
  )
}

function CaseStudySkeleton() {
  const bar = "rounded-md bg-muted motion-safe:animate-pulse"
  return (
    <div aria-busy="true" aria-label="Loading case study" className="container-page">
      <div className="mt-10 md:mt-14">
        <div className={cn(bar, "h-3 w-40")} />
        <div className={cn(bar, "mt-6 h-14 w-4/5 md:h-24")} />
        <div className={cn(bar, "mt-6 h-5 w-1/2")} />
      </div>
      <div className={cn(bar, "mt-12 aspect-video rounded-2xl md:mt-16")} />
    </div>
  )
}

/** Section title row shared by every block: mono label left, heading right. */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <BlurFade className="grid grid-cols-12 gap-x-6 gap-y-4">
      <p className="col-span-12 font-mono text-xs tracking-wide text-muted-foreground md:col-span-3 md:pt-3">
        {label}
      </p>
      <h2 className="col-span-12 max-w-[20ch] text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] md:col-span-9 md:text-[3.5rem]">
        {title}
      </h2>
    </BlurFade>
  )
}

async function CaseStudyContent({ params }: { params: Params }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const projects = study.projects.map(getProject).filter((p) => p !== undefined)
  const lead = projects[0]
  const next = getNextCaseStudy(study.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(caseStudyJsonLd(study, lead?.cover.src))} />
      <article>
        {/* Hero */}
        <div className="container-page">
          <header className="mt-10 md:mt-14">
            <p className="hero-fade font-mono text-xs text-muted-foreground">
              Case study<span className="mx-2">·</span>
              {study.industry}
              <span className="mx-2">·</span>
              {study.solution}
            </p>
            <h1
              className="hero-fade mt-5 max-w-[18ch] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.05em]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              {study.title}
            </h1>
            <p
              className="hero-fade mt-6 max-w-[56ch] text-lg text-muted-foreground md:text-xl"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              {study.summary}
            </p>
            <div
              className="hero-fade mt-10 flex flex-wrap items-center gap-3"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <a
                href="#contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Talk about your {study.industry === "Real estate" ? "agency" : "business"}
                <ArrowDown
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-y-0.5"
                />
              </a>
              {lead && (
                <Link
                  href={`/projects/${lead.slug}`}
                  prefetch
                  transitionTypes={["page"]}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:border-foreground"
                >
                  See the build
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              )}
            </div>
          </header>

          <ul
            aria-label="Works for"
            className="hero-fade mt-12 flex flex-wrap gap-2 border-t border-border pt-6"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            {study.fits.map((fit) => (
              <li key={fit}>
                <Badge variant="outline" className="h-8 rounded-full px-3 text-sm font-normal text-muted-foreground">
                  {fit}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {lead && (
          <div className="container-page mt-12 md:mt-16">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={lead.cover.src}
                alt={lead.cover.alt}
                fill
                priority
                sizes="(min-width: 1264px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* The problem */}
        <section aria-labelledby="problem-title" className="container-page mt-24 md:mt-36">
          <BlurFade className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-border pt-12 md:pt-16">
            <h2 id="problem-title" className="col-span-12 font-mono text-xs tracking-wide text-muted-foreground md:col-span-3">
              The problem
            </h2>
            <div className="col-span-12 flex flex-col gap-6 md:col-span-8 md:col-start-5">
              {study.problem.map((paragraph, i) => (
                <p
                  key={i}
                  className={cn(
                    "leading-[1.45] tracking-[-0.015em]",
                    i === 0 ? "text-2xl md:text-[2rem]" : "text-lg text-muted-foreground md:text-xl"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </BlurFade>
        </section>

        {/* Benefits */}
        <section aria-label="What it does for you" className="container-page mt-24 md:mt-36">
          <SectionHeader label="What it does for you" title="Useful from the first day." />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {study.benefits.map((benefit, i) => {
              const Icon = icons[benefit.icon]
              return (
                <BlurFade
                  as="li"
                  key={benefit.title}
                  delay={(i % 3) * 0.06}
                  className="group flex flex-col gap-8 rounded-2xl border border-border bg-card p-6 transition-[translate,border-color] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-border-strong md:p-8"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </BlurFade>
              )
            })}
          </ul>
        </section>

        {/* How it works */}
        <section aria-label="How it works" className="container-page mt-24 md:mt-36">
          <SectionHeader label="How it works" title="From first message to done, on its own." />
          <BlurFade delay={0.05} className="mt-12 md:mt-16">
            <ol className="line-grid relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-muted/40 md:grid-cols-5">
              {study.flow.map((step, i) => (
                <li
                  key={step}
                  className="relative flex items-start gap-4 border-b border-border p-6 last:border-b-0 md:flex-col md:gap-10 md:border-r md:border-b-0 md:p-8 md:last:border-r-0"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border font-mono text-xs",
                      i === study.flow.length - 1
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-strong bg-background"
                    )}
                  >
                    {i === study.flow.length - 1 ? <Check aria-hidden className="size-4" /> : i + 1}
                  </span>
                  <span className="pt-1.5 text-base leading-snug font-medium md:pt-0 md:text-lg">{step}</span>
                </li>
              ))}
            </ol>
          </BlurFade>
        </section>

        {/* What's included */}
        {study.included && (
          <section aria-label="What's included" className="container-page mt-24 md:mt-36">
            <SectionHeader label="What's included" title="Two products, one backend." />
            <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
              {study.included.map((column, i) => (
                <BlurFade
                  key={column.title}
                  delay={i * 0.08}
                  className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:p-8"
                >
                  <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em]">
                    {i === 0 ? (
                      <Globe aria-hidden className="size-5" strokeWidth={1.5} />
                    ) : (
                      <Smartphone aria-hidden className="size-5" strokeWidth={1.5} />
                    )}
                    {column.title}
                  </h3>
                  <ul className="flex flex-col">
                    {column.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 border-t border-border py-3.5">
                        <Check aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </BlurFade>
              ))}
            </div>
          </section>
        )}

        {/* Why every business needs it */}
        <section aria-label={study.whyTitle} className="container-page mt-24 md:mt-36">
          <SectionHeader label="The case for it" title={study.whyTitle} />
          <ol className="mt-12 grid grid-cols-1 gap-x-6 md:mt-16 md:grid-cols-2">
            {study.reasons.map((reason, i) => (
              <BlurFade
                as="li"
                key={reason.title}
                delay={(i % 2) * 0.08}
                className="flex gap-6 border-t border-border py-8 md:py-10"
              >
                <span className="font-mono text-xs text-muted-foreground tabular-nums md:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-[1.75rem]">{reason.title}</h3>
                  <p className="max-w-[46ch] text-muted-foreground md:text-lg">{reason.description}</p>
                </div>
              </BlurFade>
            ))}
          </ol>
        </section>

        {/* Proof: the real build */}
        {projects.length > 0 && (
          <section aria-label="Built and running" className="container-page mt-24 md:mt-36">
            <SectionHeader label="Built and running" title="Not a concept. I've built it." />
            {projects.map((project) => (
              <BlurFade key={project.slug} delay={0.05} className="mt-12 md:mt-16">
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  {project.galleryLayout === "phone" && project.gallery.length > 0 && (
                    <ul className="line-grid grid grid-cols-2 gap-x-4 gap-y-8 border-b border-border bg-muted/40 px-4 py-10 md:grid-cols-4 md:gap-x-8 md:px-10 md:py-14">
                      {project.gallery.map((image, i) => (
                        <li key={image.src} className={cn("flex flex-col gap-3", i % 2 === 1 && "md:mt-12")}>
                          <div className="relative aspect-[1320/2868] overflow-hidden rounded-[1.5rem] border border-border-strong bg-background shadow-[0_24px_60px_-24px_rgb(0_0_0/0.45)]">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(min-width: 768px) 260px, 45vw"
                              className="object-cover"
                            />
                          </div>
                          {image.caption && (
                            <p className="text-center font-mono text-xs text-muted-foreground">{image.caption}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch
                    transitionTypes={["page"]}
                    className="group grid grid-cols-12 gap-x-6 gap-y-6 p-6 md:p-10"
                  >
                    <div className="col-span-12 flex flex-col gap-3 md:col-span-8">
                      <p className="font-mono text-xs text-muted-foreground">{project.kind}</p>
                      <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] md:text-[2.5rem]">
                        {project.title}
                      </h3>
                      <p className="max-w-[56ch] text-muted-foreground md:text-lg">{project.result}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <li key={tech}>
                            <Badge variant="outline" className="h-7 rounded-full px-3 font-mono text-xs font-normal">
                              {tech}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="col-span-12 flex items-end gap-3 text-sm font-medium md:col-span-4 md:justify-end">
                      Read the full build
                      <span className="grid size-12 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </span>
                  </Link>
                </div>
              </BlurFade>
            ))}
          </section>
        )}

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="container-page mt-24 md:mt-36">
          <BlurFade className="grid grid-cols-12 gap-x-6 gap-y-8">
            <h2
              id="faq-title"
              className="col-span-12 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] md:col-span-4 md:text-[3rem]"
            >
              Questions owners ask
            </h2>
            <FaqList items={study.faq} className="col-span-12 md:col-span-8" />
          </BlurFade>
        </section>
      </article>

      <Contact heading={study.contact.heading} intro={study.contact.intro} topic={`${study.industry} case study`} />

      <nav aria-label="Next case study" className="container-page pb-24">
        <Link
          href={`/case-studies/${next.slug}`}
          prefetch
          transitionTypes={["page"]}
          className="group flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <span className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">Next case study · {next.industry}</span>
            <span className="text-[clamp(2rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.045em]">
              {next.solution} for {next.industry.toLowerCase()}
            </span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight
              aria-hidden
              className="size-5 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </Link>
      </nav>
    </>
  )
}
