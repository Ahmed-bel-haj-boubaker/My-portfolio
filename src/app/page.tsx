import { Suspense, ViewTransition } from "react"

import { homeJsonLd, jsonLd } from "@/lib/seo"
import { About } from "@/components/sections/about"
import { CaseStudies } from "@/components/sections/case-studies"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Stack } from "@/components/sections/stack"
import { Work } from "@/components/sections/work"
import { TechIconSprite } from "@/components/tech-icon"
import { Separator } from "@/components/ui/separator"

function Divider() {
  return (
    <div className="container-page" aria-hidden>
      <Separator />
    </div>
  )
}

export default function HomePage() {
  return (
    <ViewTransition
      enter={{ page: "page-in", default: "none" }}
      exit={{ page: "page-out", default: "none" }}
      default="none"
    >
      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(homeJsonLd())}
        />
        <TechIconSprite />
        <Hero />
        {/* Each boundary hydrates on its own, so React can yield between
            sections instead of hydrating the whole page in one long task */}
        <Suspense>
          <About />
        </Suspense>
        <Divider />
        <Suspense>
          <Services />
        </Suspense>
        <Divider />
        <Suspense>
          <Stack />
        </Suspense>
        <Divider />
        <Suspense>
          <Experience />
        </Suspense>
        <Divider />
        <Suspense>
          <Work />
        </Suspense>
        <Divider />
        <Suspense>
          <CaseStudies />
        </Suspense>
        <Divider />
        <Suspense>
          <Faq />
        </Suspense>
        <Divider />
        <Suspense>
          <Contact />
        </Suspense>
      </main>
    </ViewTransition>
  )
}
