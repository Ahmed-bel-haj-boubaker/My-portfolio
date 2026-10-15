import { Suspense, ViewTransition } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { getCaseStudyForProject, getNextProject, getProject } from "@/lib/site"
import { jsonLd, pageMetadata, projectJsonLd } from "@/lib/seo"
import { cn, filled, isPlaceholder } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ProjectLinks } from "@/components/project-links"
import { Badge } from "@/components/ui/badge"

type Params = PageProps<"/projects/[slug]">["params"]

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return pageMetadata({
    title: `${filled(project.title) ?? project.kind}: ${project.kind}`,
    description: filled(project.summary) ?? `${project.kind} case study by ${profile.name}.`,
    path: `/projects/${project.slug}`,
    image: project.cover,
    type: "article",
  })
}

export default function ProjectPage({ params }: { params: Params }) {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "none" }}
      exit={{ page: "page-out", default: "none" }}
      default="none"
    >
      <main id="main" className="flex-1 pt-28 pb-24 md:pt-36">
        <div className="container-page">
          <Link
            href="/#work"
            transitionTypes={["page"]}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-x-0.5"
            />
            All work
          </Link>
        </div>

        {/* The slug is URL data: stream it so the route shell stays instant */}
        <Suspense fallback={<ProjectSkeleton />}>
          <ProjectContent params={params} />
        </Suspense>
      </main>
    </ViewTransition>
  )
}

/** Same shape as the loaded page, so nothing jumps when content arrives. */
function ProjectSkeleton() {
  const bar = "rounded-md bg-muted motion-safe:animate-pulse"
  return (
    <div aria-busy="true" aria-label="Loading project" className="container-page">
      <div className="mt-10 md:mt-14">
        <div className={cn(bar, "h-3 w-32")} />
        <div className={cn(bar, "mt-6 h-14 w-3/4 md:h-24")} />
        <div className={cn(bar, "mt-6 h-5 w-1/2")} />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-6 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={cn(bar, "h-9")} />
        ))}
      </div>
      <div className={cn(bar, "mt-12 aspect-video rounded-2xl md:mt-16")} />
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <BlurFade as="section" className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-border py-12 md:py-16">
      <h2 className="col-span-12 font-mono text-xs tracking-wide text-muted-foreground md:col-span-3">
        {title}
      </h2>
      <div className="col-span-12 flex flex-col gap-5 md:col-span-8 md:col-start-5">{children}</div>
    </BlurFade>
  )
}

function Prose({ children }: { children: string }) {
  return (
    <p
      className={cn(
        "text-xl leading-[1.5] tracking-[-0.01em] md:text-2xl",
        isPlaceholder(children) && "text-muted-foreground italic"
      )}
    >
      {children}
    </p>
  )
}

async function ProjectContent({ params }: { params: Params }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(project.slug)
  const caseStudy = getCaseStudyForProject(project.slug)
  // Placeholder values are left out rather than shown as "[FILL IN ...]"
  const meta = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.kind },
    { label: "Year", value: project.year },
  ].filter((item) => filled(item.value))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(projectJsonLd(project))} />
      <article>
        <div className="container-page">
          <header className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-14">
            <div className="col-span-12 lg:col-span-9">
              <p className="hero-fade font-mono text-xs text-muted-foreground">
                {project.kind}
                {filled(project.year) && (
                  <>
                    <span className="mx-2">·</span>
                    {project.year}
                  </>
                )}
              </p>
              <h1
                className="hero-fade mt-5 text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.05em]"
                style={{ "--delay": "80ms" } as React.CSSProperties}
              >
                {project.title}
              </h1>
              <p
                className="hero-fade mt-6 max-w-[52ch] text-lg text-muted-foreground md:text-xl"
                style={{ "--delay": "160ms" } as React.CSSProperties}
              >
                {project.summary}
              </p>
            </div>
          </header>

          <dl
            className="hero-fade mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 md:grid-cols-4"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="text-sm">{item.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <dt className="text-xs text-muted-foreground">Links</dt>
              <dd>
                <ProjectLinks project={project} />
                {!filled(project.links.live) &&
                  !filled(project.links.github) &&
                  !filled(project.links.fiverr) && (
                  <span className="text-sm text-muted-foreground">Private</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="container-page mt-12 md:mt-16">
          <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(min-width: 1264px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </ViewTransition>
        </div>

        <div className="container-page mt-16 md:mt-24">
          <Block title="Problem">
            <Prose>{project.problem}</Prose>
          </Block>
          <Block title="Approach">
            {project.approach.map((paragraph, i) => (
              <Prose key={i}>{paragraph}</Prose>
            ))}
          </Block>
          <Block title="Result">
            <Prose>{project.result}</Prose>
          </Block>
          <Block title="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="h-8 rounded-full px-3 font-mono text-sm font-normal">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {project.gallery.length > 0 && project.galleryLayout === "phone" && (
          <section aria-label="App screens" className="container-page mt-8">
            <div className="line-grid relative overflow-hidden rounded-2xl border border-border bg-muted/40 px-4 py-10 md:px-10 md:py-16">
              <ul className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-8">
                {project.gallery.map((image, i) => (
                  <BlurFade
                    as="li"
                    key={image.src}
                    delay={i * 0.08}
                    className={cn("flex flex-col gap-4", i % 2 === 1 && "md:mt-16")}
                  >
                    <div className="relative aspect-[1320/2868] overflow-hidden rounded-[1.75rem] border border-border-strong bg-background shadow-[0_24px_60px_-24px_rgb(0_0_0/0.45)]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 280px, 45vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption && (
                      <p className="text-center font-mono text-xs text-muted-foreground">
                        {image.caption}
                      </p>
                    )}
                  </BlurFade>
                ))}
              </ul>
            </div>
          </section>
        )}

        {project.gallery.length > 0 && project.galleryLayout !== "phone" && (
          <section aria-label="Gallery" className="container-page mt-8 grid grid-cols-12 gap-4 md:gap-6">
            {project.gallery.map((image, i) => (
              <BlurFade
                key={image.src}
                delay={i * 0.08}
                className={cn(
                  "relative col-span-12 overflow-hidden rounded-2xl border border-border bg-muted",
                  i % 2 === 0 ? "aspect-[4/3] md:col-span-7" : "aspect-[4/5] md:col-span-5"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </BlurFade>
            ))}
          </section>
        )}
        {caseStudy && (
          <div className="container-page mt-16 md:mt-24">
            <BlurFade>
              <Link
                href={`/case-studies/${caseStudy.slug}`}
                prefetch
                transitionTypes={["page"]}
                className="group flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong md:flex-row md:items-center md:justify-between md:p-10"
              >
                <span className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    Case study · {caseStudy.industry}
                  </span>
                  <span className="text-2xl font-semibold tracking-[-0.03em] md:text-[2rem]">
                    {caseStudy.whyTitle}
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </BlurFade>
          </div>
        )}
      </article>

      <nav aria-label="Next project" className="container-page mt-24 md:mt-32">
        <Link
          href={`/projects/${next.slug}`}
          prefetch
          transitionTypes={["page"]}
          className="group flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-end md:justify-between"
        >
          <span className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">Next project</span>
            <span className="text-[clamp(2rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.045em]">
              {next.title}
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
