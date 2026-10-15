/**
 * Single source of truth for every piece of content on the site.
 * Components only read from this file.
 *
 * Content comes from the CV in /public/Ahmed-Bel-Haj-Boubaker-CV.pdf.
 * Anything that starts with "[FILL IN" is still a placeholder. Links whose URL
 * is a placeholder are hidden automatically until you replace them, so the
 * site never ships a dead link. Search this file for "[FILL IN" to find them.
 */

export type TechIcon =
  | "angular"
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "redux"
  | "java"
  | "spring"
  | "nodejs"
  | "express"
  | "django"
  | "laravel"
  | "php"
  | "python"
  | "expo"
  | "postgresql"
  | "mysql"
  | "mongodb"
  | "prisma"
  | "supabase"
  | "docker"
  | "aws"
  | "git"
  | "vercel"
  | "n8n"
  | "ollama"
  | "whatsapp"
  | "livekit"
  | "mcp"
  | "hubspot"
  | "googlesheets"
  | "googlecalendar"
  | "telegram";

export type Tech = { name: string; icon: TechIcon };

export type TechCategory = { title: string; items: Tech[] };

export type Pillar = {
  id: "web" | "mobile" | "automation";
  title: string;
  description: string;
  tools: string[];
  /** Logos shown as the visual in the bento cell */
  logos: TechIcon[];
};

export type Role = {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export type ProjectImage = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  role: string;
  featured?: boolean;
  stack: string[];
  links: { live?: string; github?: string; fiverr?: string };
  cover: ProjectImage;
  problem: string;
  approach: string[];
  result: string;
  gallery: ProjectImage[];
  /** "phone" shows the gallery as a row of mobile screenshots */
  galleryLayout?: "phone";
};

export type Social = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "fiverr" | "email";
};

const fiverrPortfolio = "https://www.fiverr.com/users/ahmedbelhajboub/portfolio";

export const profile = {
  name: "Ahmed Bel Haj Boubaker",
  /** How the name breaks across two lines in the hero */
  nameLines: ["Ahmed Bel Haj", "Boubaker"],
  role: "Software Engineer",
  discipline: "Full-stack",
  focus: ["Web", "Mobile", "Automation"],
  yearsOfExperience: 2,
  location: "Tunis, Tunisia",
  availability: "Available for work",
  workPreference: "Open to relocation",
  email: "belhajboubakera@gmail.com",
  resumeUrl: "/Ahmed-Bel-Haj-Boubaker-CV.pdf",
  /** Production URL, used for SEO, sitemap and Open Graph. */
  siteUrl: "[FILL IN: https://your-domain.com]",

  /** Hero tagline: the lead sentence is set brighter than the rest. */
  taglineLead: "I build products end to end.",
  taglineRest: "Web, mobile, and the automation in between.",
  description:
    "Ahmed Bel Haj Boubaker is a full-stack software engineer in Tunis building web platforms, mobile apps and AI-powered automation with Java/Spring Boot, Angular, React/Next.js and React Native.",

  about: {
    lead: "I'm a full-stack engineer with two years of building web and mobile products end to end: business platforms, SaaS products and AI-powered automation.",
    body: [
      "Most of my work is in Java/Spring Boot and Angular, or React/Next.js and React Native. Lately that includes WhatsApp assistants running on self-hosted LLMs, and n8n workflows that handle bookings and reminders on their own.",
      "I care about software that's reliable, maintainable and solves a real problem for the people using it. Right now I'm looking for a product-focused engineering team to build with.",
    ],
    stats: [
      { value: 2, suffix: "+", label: "Years shipping" },
      // `null` renders a placeholder instead of a number
      { value: 8 as number | null, suffix: "", label: "Products built" },
    ],
    facts: [
      { label: "Based in", value: "Tunis, Tunisia" },
      { label: "Open to", value: "Relocation and remote" },
      { label: "Focus", value: "Web, mobile, automation" },
      { label: "Languages", value: "Arabic, French, English" },
    ],
  },

  pillars: [
    {
      id: "web",
      title: "Web",
      description:
        "Business platforms and SaaS products, from the database schema to the last loading state.",
      tools: ["Angular", "React", "Next.js", "Spring Boot", "Node.js"],
      logos: ["angular", "react", "nextjs", "spring", "nodejs", "postgresql"],
    },
    {
      id: "mobile",
      title: "Mobile",
      description: "Cross-platform iOS and Android apps built with React Native and Expo.",
      tools: ["React Native", "Expo", "Redux"],
      logos: ["react", "expo", "redux"],
    },
    {
      id: "automation",
      title: "Automation",
      description:
        "Voice and WhatsApp agents, document pipelines and n8n workflows that take repetitive work off people's plates.",
      tools: ["n8n", "LiveKit", "MCP", "WhatsApp Cloud API", "Ollama"],
      logos: ["n8n", "livekit", "whatsapp"],
    },
  ] satisfies Pillar[],

  stack: [
    {
      title: "Frontend",
      items: [
        { name: "Angular", icon: "angular" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Redux", icon: "redux" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Java", icon: "java" },
        { name: "Spring Boot", icon: "spring" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "Django REST", icon: "django" },
        { name: "Laravel", icon: "laravel" },
        { name: "PHP", icon: "php" },
        { name: "Python", icon: "python" },
      ],
    },
    {
      title: "Mobile",
      items: [
        { name: "React Native", icon: "react" },
        { name: "Expo", icon: "expo" },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Prisma", icon: "prisma" },
        { name: "Supabase", icon: "supabase" },
      ],
    },
    {
      title: "DevOps",
      items: [
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
        { name: "Git", icon: "git" },
        { name: "Vercel", icon: "vercel" },
      ],
    },
    {
      title: "AI & Automation",
      items: [
        { name: "n8n", icon: "n8n" },
        { name: "Ollama", icon: "ollama" },
        { name: "LiveKit", icon: "livekit" },
        { name: "MCP", icon: "mcp" },
        { name: "WhatsApp API", icon: "whatsapp" },
        { name: "HubSpot", icon: "hubspot" },
        { name: "Google Sheets", icon: "googlesheets" },
        { name: "Telegram", icon: "telegram" },
      ],
    },
  ] satisfies TechCategory[],

  /** Most recent first. */
  experience: [
    {
      title: "Full Stack Software Engineer",
      company: "MVPNest",
      period: "Jan 2025 - Present",
      location: "Tunis, Tunisia",
      bullets: [
        "Designed and built a scheduling system for building automation, supporting annual calendars, weekly templates, daily profiles and regulation zones.",
        "Built a workforce management platform for the hospitality industry that replaced phone and email coordination with structured request tracking, from request to confirmed booking, with real-time status updates.",
        "Built reusable Angular components, REST APIs with JWT authentication, and admin dashboards.",
      ],
      stack: ["Java", "Spring Boot", "Angular", "TypeScript", "Django REST", "MySQL", "JWT"],
    },
    {
      title: "Full Stack Software Engineer Intern",
      company: "Bin Mes’har & Co. Advocates & Legal Consultants",
      period: "Nov 2024 - May 2025",
      location: "Dubai, United Arab Emirates",
      bullets: [
        "Built an internal law firm platform covering case management, document handling, scheduling and client communication.",
        "Integrated an AI-powered case analysis module that structures legal consultations and estimates potential outcomes.",
        "Shipped a bilingual English-Arabic interface with full right-to-left (RTL) support.",
        "Implemented dashboards, authentication and internal messaging with Supabase.",
      ],
      stack: ["Next.js", "React", "TypeScript", "Prisma", "Supabase", "Tailwind CSS", "AI APIs"],
    },
  ] satisfies Role[],

  education: [
    {
      degree: "Master’s Degree in Computer Applications, Software Engineering",
      school: "ESPRIT, Private Higher School of Engineering and Technology",
      period: "2020 - 2025",
    },
  ] satisfies Education[],

  /** Add certifications as { degree, school, period } entries, or leave empty. */
  certifications: [] as Education[],

  /**
   * The first project with `featured: true` gets the large card.
   * Images live in /public/projects/<slug>/. Covers are 16:9 (Ulysse 16:10);
   * `gallery` is optional: leave it empty to show no screenshots.
   */
  projects: [
    {
      slug: "ulysse",
      title: "Ulysse",
      kind: "Mobile app & AI assistant",
      year: "2026",
      summary:
        "Flight search you can just text: a WhatsApp assistant and a mobile app that turn plain-language requests into real fares.",
      role: "Freelance, full-stack",
      featured: true,
      stack: ["React Native", "Expo", "JavaScript", "Qwen", "Ollama", "n8n", "WhatsApp Cloud API"],
      links: {},
      cover: {
        src: "/projects/ulysse/cover.png",
        alt: "Ulysse app shown on four iPhones: home search, trip countdown, loyalty card and favorites, next to the headline Flight search you can just text.",
      },
      problem:
        "Searching for flights usually means filling in a form field by field. Ulysse lets travellers ask the way they'd ask a person, “Tunis to Milan on November 22 for two passengers”, on WhatsApp or in the app, and still get exact prices.",
      approach: [
        "A WhatsApp assistant runs on a self-hosted LLM (Qwen via Ollama). It understands natural-language requests and follow-up questions, and validation rules check every detail before a search runs. Prices come only from the flights API, never from the model.",
        "The React Native app adds natural-language search, best-offer selection and a “good price” indicator calculated from current fares.",
        "n8n workflows send booking confirmations and WhatsApp reminders 24 hours before departure.",
      ],
      result:
        "One product across two channels, chat and app, with a travel dashboard that adds trip countdowns, PDF invoices and a loyalty program.",
      galleryLayout: "phone",
      gallery: [
        {
          src: "/projects/ulysse/explore.png",
          alt: "Ulysse home screen: plain-language flight search box, quick filters and the next trip card",
          caption: "Explore",
        },
        {
          src: "/projects/ulysse/trip.png",
          alt: "Trip screen: Paris to Tunis boarding pass with a countdown and a step-by-step timeline to departure",
          caption: "Trip",
        },
        {
          src: "/projects/ulysse/favorites.png",
          alt: "Favorites screen: saved destinations Lisbon, Rome and New York with price alerts",
          caption: "Favorites",
        },
        {
          src: "/projects/ulysse/loyalty.png",
          alt: "Loyalty screen: Gold member card with points, tier progress and Gold benefits",
          caption: "Loyalty",
        },
      ],
    },
    {
      slug: "restaurant-phone-agent",
      title: "AI restaurant phone agent",
      kind: "Voice AI automation",
      year: "[FILL IN: Year]",
      summary:
        "Answers the phone 24/7, takes food orders and books tables, without inventing a single item, price or slot.",
      role: "Freelance",
      stack: ["LiveKit", "n8n", "MCP", "Google Sheets"],
      links: { fiverr: fiverrPortfolio },
      cover: {
        src: "/projects/restaurant-phone-agent/cover.jpg",
        alt: "Phone showing an AI agent on a call, linked to a verified order card with items and a $20.00 total, headline AI takes the order, 24/7, never wrong",
      },
      problem:
        "Every missed call is a lost order, and staff can't always pick up during a rush or after closing.",
      approach: [
        "A voice agent built on LiveKit answers every call, takes food orders and books tables.",
        "The difference is validation. Every item is checked against the live menu before an order is saved, and prices, totals and order numbers come from the system, never from the model.",
        "Tables are booked only against real availability, and the customer confirms first. If a write fails, the agent says so instead of faking a confirmation.",
      ],
      result:
        "Orders and bookings land in Google Sheets through n8n and MCP, so there's nothing new for staff to learn.",
      gallery: [],
    },
    {
      slug: "law-firm-platform",
      title: "Law firm platform",
      kind: "Web platform",
      year: "2024 - 2025",
      summary:
        "One internal platform for cases, documents, scheduling and client messages, in English and Arabic.",
      role: "Full-stack engineer (internship)",
      stack: ["Next.js", "React", "TypeScript", "Prisma", "Supabase", "Tailwind CSS", "AI APIs"],
      links: {},
      cover: {
        src: "/projects/law-firm-platform/cover.jpg",
        alt: "Laptop showing the law firm platform: a cases table with hearings and statuses, today's agenda and an AI case analysis gauge, headline One platform for the whole firm",
      },
      problem:
        "A Dubai law firm needed case management, documents, scheduling and client communication in one place, usable in both English and Arabic.",
      approach: [
        "Built on Next.js, Prisma and Supabase, covering case management, document handling, scheduling, dashboards, authentication and internal messaging.",
        "An AI-powered case analysis module structures legal consultations and estimates potential case outcomes.",
        "The interface is fully bilingual, with complete right-to-left support for Arabic.",
      ],
      result: "[FILL IN: What changed for the firm once the platform was in use.]",
      gallery: [],
    },
    {
      slug: "hospitality-workforce",
      title: "Hospitality workforce platform",
      kind: "Web platform",
      year: "2025",
      summary:
        "Replaced phone and email coordination with one tracked flow from staffing request to confirmed booking.",
      role: "Full-stack engineer, MVPNest",
      // [FILL IN] Stack taken from the MVPNest role on the CV: confirm for this project
      stack: ["Java", "Spring Boot", "Angular", "TypeScript", "MySQL", "JWT"],
      links: {},
      cover: {
        src: "/projects/hospitality-workforce/cover.jpg",
        alt: "Laptop in a hotel lobby showing a request-tracking board with New, In progress and Confirmed columns, headline From phone calls to confirmed bookings",
      },
      problem:
        "Staffing requests in hospitality were coordinated over phone and email, with no single place to see where a request stood.",
      approach: [
        "A structured request-tracking system follows each request from submission through to confirmed booking, with real-time status updates.",
        "Underneath: reusable Angular components, REST APIs secured with JWT, and admin dashboards.",
      ],
      result: "Phone and email back-and-forth replaced by one tracked, visible workflow.",
      gallery: [],
    },
    {
      slug: "real-estate-agent",
      title: "WhatsApp real estate sales agent",
      kind: "AI automation",
      year: "[FILL IN: Year]",
      summary:
        "Qualifies buyers, sends property photos, books viewings from the live calendar and pushes warm leads into HubSpot.",
      role: "Freelance",
      stack: ["LLM", "WhatsApp Cloud API", "Google Calendar", "HubSpot"],
      links: { fiverr: fiverrPortfolio },
      cover: {
        src: "/projects/real-estate-agent/cover.jpg",
        alt: "WhatsApp chat where the agent books a Saturday viewing, beside Google Calendar and HubSpot cards, headline Books the viewing while you sleep",
      },
      problem: "The agency was losing leads because nobody answered WhatsApp after hours.",
      approach: [
        "The agent handles the whole conversation: it qualifies buyers naturally, sends property photos, checks the live Google Calendar and books viewings.",
        "The hard part was trust. The model never sees the seller's minimum price and never works out dates itself. A code layer computes the free slots and the pricing authority before it replies, so it can't invent a discount or double-book.",
      ],
      result:
        "Warm leads land in HubSpot as contacts and deals, and serious offers go to a human.",
      gallery: [],
    },
    {
      slug: "accounting-documents",
      title: "Accounting document processing",
      kind: "AI automation",
      year: "[FILL IN: Year]",
      summary:
        "From client email to verified records: documents are identified, read, classified and matched without manual sorting.",
      role: "Freelance",
      // [FILL IN] Add the exact tools (workflow engine, OCR service, model) you used
      stack: ["OCR", "LLM", "Email automation"],
      links: { fiverr: fiverrPortfolio },
      cover: {
        src: "/projects/accounting-documents/cover.jpg",
        alt: "Workflow from an email inbox of invoices through OCR, AI classification and matching into accounting records marked Matched",
      },
      problem:
        "Client documents arrive as email attachments, and someone has to sort them, check them and chase whatever is missing.",
      approach: [
        "The workflow receives attachments, identifies the client, validates each file and detects duplicates.",
        "OCR extracts the text, and an AI model classifies each document and pulls out its key data.",
        "Documents are matched against pending requests, records update automatically, and every event is logged.",
      ],
      result:
        "A follow-up system spots missing documents and reminds clients automatically until the required files arrive: less manual work, no missed documents, faster accounting operations.",
      gallery: [],
    },
    {
      slug: "building-automation-scheduler",
      title: "Building automation scheduler",
      kind: "Web platform",
      year: "2025",
      summary:
        "Scheduling for building automation: annual calendars, weekly templates, daily profiles and regulation zones.",
      role: "Full-stack engineer, MVPNest",
      // [FILL IN] Stack taken from the MVPNest role on the CV: confirm for this project
      stack: ["Java", "Spring Boot", "Angular", "TypeScript", "MySQL"],
      links: {},
      cover: {
        src: "/projects/building-automation-scheduler/cover.jpg",
        alt: "Laptop showing the scheduler: annual calendar, weekly template grid and a floor plan with regulation zones, headline Every zone. Every hour. Scheduled.",
      },
      problem: "[FILL IN: What the client needed to control, and why it was hard before.]",
      approach: [
        "Designed and built a scheduling system supporting annual calendars, weekly templates, daily profiles and regulation zones.",
        "[FILL IN: How the pieces fit together, e.g. how weekly templates roll up into the annual calendar.]",
      ],
      result: "[FILL IN: What changed after launch.]",
      gallery: [],
    },
    {
      slug: "linkedin-content-automation",
      title: "LinkedIn content automation",
      kind: "AI automation",
      year: "[FILL IN: Year]",
      summary:
        "Finds relevant AI and engineering articles, writes natural LinkedIn posts with an LLM and publishes them on a schedule.",
      role: "Freelance",
      // [FILL IN] Add the exact tools (workflow engine, model) you used
      stack: ["LLM", "LinkedIn API", "Telegram"],
      links: { fiverr: fiverrPortfolio },
      cover: {
        src: "/projects/linkedin-content-automation/cover.jpg",
        alt: "Three-step workflow: article discovery, AI processing (summarize, rewrite, format) and a published LinkedIn post, with duplicate check and Telegram notification",
      },
      problem: "Posting consistently on LinkedIn takes time that most engineers would rather spend building.",
      approach: [
        "On a schedule, the workflow finds relevant AI and software engineering articles and skips anything it has already posted.",
        "An LLM turns each article into a natural LinkedIn post, which is published with the article's original image.",
      ],
      result:
        "Every article is recorded to prevent reposts, and a Telegram message confirms each run. No manual publishing.",
      gallery: [],
    },
  ] satisfies Project[],

  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ahmed-belhaj-boubaker/",
      icon: "linkedin",
    },
    { label: "GitHub", href: "[FILL IN: https://github.com/your-handle]", icon: "github" },
    { label: "Fiverr", href: "https://www.fiverr.com/users/ahmedbelhajboub/", icon: "fiverr" },
    { label: "Email", href: "mailto:belhajboubakera@gmail.com", icon: "email" },
  ] satisfies Social[],

  nav: [
    { id: "about", label: "About" },
    { id: "stack", label: "Stack" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
};

export type Profile = typeof profile;
