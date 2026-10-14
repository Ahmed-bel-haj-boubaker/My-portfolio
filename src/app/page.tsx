import { Suspense, ViewTransition } from "react"

import { profile } from "@/data/profile"
import { siteUrl, visibleSocials } from "@/lib/site"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Experience } from "@/components/sections/experience"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Stack } from "@/components/sections/stack"
import { Work } from "@/components/sections/work"
import { TechIconSprite } from "@/components/tech-icon"
import { Separator } from "@/components/ui/separator"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: `${profile.discipline} ${profile.role}`,
  description: profile.description,
  address: { "@type": "PostalAddress", addressCountry: "TN" },
  knowsAbout: profile.stack.flatMap((c) => c.items.map((t) => t.name)),
  sameAs: visibleSocials.filter((s) => s.icon !== "email").map((s) => s.href),
}

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
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
          <Contact />
        </Suspense>
      </main>
    </ViewTransition>
  )
}
