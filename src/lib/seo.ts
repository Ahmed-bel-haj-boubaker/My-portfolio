import type { Metadata } from "next"

import { profile, type CaseStudy, type Project } from "@/data/profile"
import { siteUrl, visibleSocials } from "@/lib/site"

/** Stable JSON-LD ids, so every page points at the same Person and WebSite. */
export const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
}

export const absolute = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: { src: string; alt: string }
  type?: "website" | "article"
}

/**
 * Child pages replace (not merge) the root openGraph/twitter objects, so every
 * page rebuilds the full set here: siteName, locale, type, url and image.
 */
export function pageMetadata({ title, description, path, image, type = "website" }: PageMetaInput): Metadata {
  const images = image ? [{ url: image.src, width: 1920, height: 1080, alt: image.alt }] : undefined
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: profile.name,
      locale: "en_US",
      title,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  }
}

export const personSchema = {
  "@type": "Person",
  "@id": ids.person,
  name: profile.name,
  alternateName: profile.alternateNames,
  givenName: "Ahmed",
  familyName: "Bel Haj Boubaker",
  url: siteUrl,
  mainEntityOfPage: { "@id": `${siteUrl}/#profilepage` },
  email: `mailto:${profile.email}`,
  image: absolute("/opengraph-image"),
  jobTitle: `${profile.discipline} ${profile.role}`,
  hasOccupation: {
    "@type": "Occupation",
    name: `${profile.discipline} ${profile.role}`,
    occupationLocation: { "@type": "City", name: "Tunis" },
    skills: profile.stack.flatMap((c) => c.items.map((t) => t.name)).join(", "),
  },
  hasCredential: profile.education.map((e) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: e.degree,
    recognizedBy: { "@type": "CollegeOrUniversity", name: e.school },
  })),
  description: profile.description,
  worksFor: profile.experience
    .filter((role) => /present/i.test(role.period))
    .map((role) => ({ "@type": "Organization", name: role.company })),
  address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
  alumniOf: profile.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  knowsLanguage: ["ar", "fr", "en"],
  knowsAbout: [
    ...profile.stack.flatMap((c) => c.items.map((t) => t.name)),
    "AI automation",
    "WhatsApp AI agents",
    "Voice AI agents",
  ],
  sameAs: visibleSocials.filter((s) => s.icon !== "email").map((s) => s.href),
}

export const websiteSchema = {
  "@type": "WebSite",
  "@id": ids.website,
  url: siteUrl,
  name: profile.name,
  description: profile.description,
  inLanguage: "en",
  publisher: { "@id": ids.person },
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

/** Home: the site, the person, and the profile page that ties them together. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema,
      personSchema,
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${profile.name}, ${profile.discipline} ${profile.role}`,
        isPartOf: { "@id": ids.website },
        mainEntity: { "@id": ids.person },
        dateModified: profile.updatedAt,
        inLanguage: "en",
      },
      faqSchema(profile.faq, `${siteUrl}/#faq`),
    ],
  }
}

/** Mirrors a visible FAQ on the page; answer engines read Q&A pairs directly. */
function faqSchema(items: { question: string; answer: string }[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function projectJsonLd(project: Project) {
  const path = `/projects/${project.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Work", path: "/#work" },
        { name: project.title, path },
      ]),
      {
        "@type": "CreativeWork",
        "@id": `${absolute(path)}#work`,
        url: absolute(path),
        name: project.title,
        headline: project.title,
        description: project.summary,
        genre: project.kind,
        image: absolute(project.cover.src),
        keywords: project.stack.join(", "),
        creator: { "@id": ids.person },
        dateModified: profile.updatedAt,
        isPartOf: { "@id": ids.website },
        inLanguage: "en",
      },
    ],
  }
}

export function caseStudyJsonLd(study: CaseStudy, image?: string) {
  const path = `/case-studies/${study.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/#case-studies" },
        { name: study.industry, path },
      ]),
      {
        "@type": "Service",
        "@id": `${absolute(path)}#service`,
        url: absolute(path),
        name: `${study.solution} for ${study.industry.toLowerCase()}`,
        serviceType: study.solution,
        description: study.summary,
        audience: { "@type": "BusinessAudience", audienceType: study.industry },
        provider: { "@id": ids.person },
        dateModified: profile.updatedAt,
        ...(image && { image: absolute(image) }),
      },
      faqSchema(study.faq, `${absolute(path)}#faq`),
    ],
  }
}

/** Serialises JSON-LD safely for an inline <script>. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") })
