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

/** Icons available to case-study benefit cards (mapped to lucide icons in the page). */
export type CaseStudyIcon =
  | "phone"
  | "shield"
  | "calendar"
  | "users"
  | "sheet"
  | "alert"
  | "message"
  | "filter"
  | "image"
  | "crm"
  | "search"
  | "smartphone"
  | "bell"
  | "award"
  | "receipt"
  | "globe";

/**
 * Industry case studies at /case-studies/<slug>: why a business needs the
 * solution, backed by the real project(s) listed in `projects`.
 */
export type CaseStudy = {
  slug: string;
  /** Short label, e.g. "Restaurants" */
  industry: string;
  /** What gets built, e.g. "AI phone agent" */
  solution: string;
  title: string;
  summary: string;
  /** Slugs of the portfolio projects that prove it */
  projects: string[];
  problem: string[];
  benefits: { icon: CaseStudyIcon; title: string; description: string }[];
  /** "Why every <business> needs it" */
  whyTitle: string;
  reasons: { title: string; description: string }[];
  /** How a request moves through the system, start to finish */
  flow: string[];
  /** Optional "what's included" columns */
  included?: { title: string; items: string[] }[];
  /** Business types it fits */
  fits: string[];
  faq: { question: string; answer: string }[];
  contact: { heading: string; intro: string };
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
  /**
   * Other spellings people (and AI assistants) search for. They go into the
   * Person schema so every variant resolves to the same profile.
   */
  alternateNames: ["Ahmed Belhaj Boubaker", "Ahmed Bel Haj", "Ahmed Belhaj"],
  /** Bump when you change the content: AI search favours recently updated pages. */
  updatedAt: "2026-10-15",
  /** Production URL, used for SEO, sitemap and Open Graph. */
  siteUrl: "https://ahmed-belhaj-boubaker.com",

  /** Hero tagline: the lead sentence is set brighter than the rest. */
  taglineLead: "I build products end to end.",
  taglineRest: "Web, mobile, and the automation in between.",
  /** Meta description: keep it around 150-160 characters. */
  description:
    "Full-stack software engineer in Tunis building web platforms, mobile apps and AI automation with Spring Boot, Angular, Next.js and React Native.",

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
        src: "/projects/ulysse/cover.jpg",
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

  caseStudies: [
    {
      slug: "restaurants",
      industry: "Restaurants",
      solution: "AI phone agent",
      title: "Never miss an order because nobody picked up.",
      summary:
        "An AI phone agent that answers every call, takes orders and books tables 24/7, checked against your real menu and your real availability.",
      projects: ["restaurant-phone-agent"],
      problem: [
        "During the dinner rush the phone keeps ringing while your team is serving. Calls go unanswered, and a hungry customer who can't get through simply calls the next restaurant.",
        "After closing, nobody picks up at all. Hiring someone only to answer the phone is expensive, and the busiest hours are exactly when nobody has a free hand.",
      ],
      benefits: [
        {
          icon: "phone",
          title: "Every call answered",
          description: "Day and night, mid-rush or after closing. No busy tone, no voicemail.",
        },
        {
          icon: "shield",
          title: "No invented items or prices",
          description:
            "Each item is checked against your live menu. Totals and order numbers come from your system, never from the AI.",
        },
        {
          icon: "calendar",
          title: "Real bookings only",
          description:
            "Tables are booked against real availability, and the customer confirms before anything is saved.",
        },
        {
          icon: "users",
          title: "Staff stay with guests",
          description: "Your team serves the people in the room instead of running to the phone.",
        },
        {
          icon: "sheet",
          title: "Nothing new to learn",
          description:
            "Orders and reservations land in Google Sheets, the tool your team already uses.",
        },
        {
          icon: "alert",
          title: "Honest when something fails",
          description:
            "If an order or booking can't be saved, the agent says so instead of faking a confirmation.",
        },
      ],
      whyTitle: "Why every restaurant needs one",
      reasons: [
        {
          title: "A missed call is a missed order",
          description:
            "Customers rarely leave a voicemail. If you don't answer, they order somewhere else, and you never know it happened.",
        },
        {
          title: "Peak hours are phone hours",
          description:
            "The phone rings most when the kitchen is busiest. An agent handles the calls so the rush doesn't cost you sales.",
        },
        {
          title: "Orders come in written down, correctly",
          description:
            "No misheard items, lost paper notes or wrong totals. Every order is structured, validated and stored.",
        },
        {
          title: "It costs less than extra staff",
          description:
            "You don't need to hire someone just to answer the phone, and the agent never takes a break or a day off.",
        },
      ],
      flow: [
        "Customer calls",
        "Agent takes the order or booking",
        "Menu, prices and slots are checked",
        "Customer confirms",
        "Saved to your sheet",
      ],
      fits: ["Takeaway & delivery", "Sit-down restaurants", "Cafés & bakeries", "Pizzerias", "Multi-location groups"],
      faq: [
        {
          question: "Will it get orders wrong?",
          answer:
            "Every item is validated against your live menu before the order is saved, and the agent reads the order back for the customer to confirm. Prices and totals are calculated by the system, not guessed by the AI.",
        },
        {
          question: "What if I change my menu?",
          answer:
            "The agent reads from your live menu, so when you update an item or a price, it follows straight away.",
        },
        {
          question: "Do I need new software?",
          answer:
            "No. Orders and bookings go to Google Sheets, and the setup can be adapted to the tools you already use.",
        },
        {
          question: "What if a customer asks something unusual?",
          answer:
            "The agent only commits to what your menu and availability allow. It can be set up to take a message or pass the request to your staff.",
        },
      ],
      contact: {
        heading: "Let's stop the missed calls.",
        intro:
          "Tell me about your restaurant: how orders and bookings come in today, and when calls get missed. I'll tell you what an agent could take over.",
      },
    },
    {
      slug: "real-estate",
      industry: "Real estate",
      solution: "WhatsApp sales agent",
      title: "Turn late-night WhatsApp messages into booked viewings.",
      summary:
        "An AI agent that replies to buyers instantly on WhatsApp, qualifies them, sends property photos, books viewings in your calendar and puts warm leads in your CRM.",
      projects: ["real-estate-agent"],
      problem: [
        "Buyers message in the evening and at weekends, when your agents are off. By the time someone replies the next morning, the buyer has already contacted other agencies.",
        "Agents also spend hours answering the same questions about price, location and availability, often for people who were never going to buy.",
      ],
      benefits: [
        {
          icon: "message",
          title: "Instant replies, 24/7",
          description: "Every buyer gets an answer in seconds, at any hour, on the app they already use.",
        },
        {
          icon: "filter",
          title: "Qualified leads",
          description:
            "The agent asks about budget, area and timing in natural conversation, so your agents focus on serious buyers.",
        },
        {
          icon: "image",
          title: "The right photos, on request",
          description: "Property photos and details are sent straight into the chat.",
        },
        {
          icon: "calendar",
          title: "Viewings in your calendar",
          description:
            "Free slots come from your live Google Calendar, so viewings are booked without double-booking.",
        },
        {
          icon: "shield",
          title: "Your margin stays private",
          description:
            "The AI never sees the seller's minimum price and can't invent a discount. Pricing rules live in code.",
        },
        {
          icon: "crm",
          title: "Leads land in your CRM",
          description:
            "Contacts and deals are created in HubSpot, and serious offers are passed to a human.",
        },
      ],
      whyTitle: "Why every agency needs one",
      reasons: [
        {
          title: "Speed wins the lead",
          description:
            "Buyers contact several agencies at once. The one that answers first, with useful details, is the one they visit.",
        },
        {
          title: "Buyers live on WhatsApp",
          description:
            "People would rather send a quick message than fill in a form or call. Meet them where they already are.",
        },
        {
          title: "Your agents' time is the expensive part",
          description:
            "Let them spend it on viewings and closing deals, not on repeating the same answers.",
        },
        {
          title: "No lead falls through the cracks",
          description:
            "Every conversation is answered and every qualified buyer is recorded in your CRM, even at 2 a.m.",
        },
      ],
      flow: [
        "Buyer messages on WhatsApp",
        "Agent qualifies and sends photos",
        "Free slot found in your calendar",
        "Viewing booked",
        "Lead and deal in HubSpot",
      ],
      fits: ["Sales agencies", "Rental agencies", "Property developers", "Independent agents"],
      faq: [
        {
          question: "Will it negotiate the price?",
          answer:
            "No. The model never sees the seller's minimum price, and pricing authority is computed in code before it replies. Serious offers are handed to a human.",
        },
        {
          question: "Can it double-book a viewing?",
          answer:
            "No. It doesn't work out dates itself: a code layer reads your live Google Calendar and only offers slots that are actually free.",
        },
        {
          question: "Does it work with my CRM?",
          answer:
            "It's built with HubSpot, creating contacts and deals automatically. Other CRMs with an API can be connected too.",
        },
        {
          question: "Will buyers feel they're talking to a bot?",
          answer:
            "The conversation is natural and to the point, and the agent hands over to a person whenever a buyer is ready to make an offer.",
        },
      ],
      contact: {
        heading: "Let's answer every buyer first.",
        intro:
          "Tell me how leads reach your agency today and where they slip away. I'll tell you how a WhatsApp agent would fit into your process.",
      },
    },
    {
      slug: "travel-agencies",
      industry: "Travel agencies",
      solution: "Mobile app & website",
      title: "Your own travel app and website, so customers book with you.",
      summary:
        "Search, bookings, trip reminders and loyalty in your agency's own mobile app and website, with a WhatsApp assistant that understands plain-language requests.",
      projects: ["ulysse"],
      problem: [
        "Travellers compare and book on their phones. When an agency only has a social media page and a phone number, customers end up on the big booking platforms, and the agency loses the relationship.",
        "Requests arrive by phone, Messenger and email and are hard to track. Confirmations, reminders and invoices are all sent by hand.",
      ],
      benefits: [
        {
          icon: "search",
          title: "Search the way people talk",
          description:
            "“Tunis to Milan on November 22 for two” returns real fares, in the app or on WhatsApp.",
        },
        {
          icon: "smartphone",
          title: "Your brand on their phone",
          description: "Your own app on iOS and Android, with your logo on the home screen.",
        },
        {
          icon: "globe",
          title: "A website that sells",
          description:
            "Travellers find you on Google, browse offers and send booking requests at any hour.",
        },
        {
          icon: "bell",
          title: "Automatic reminders",
          description:
            "Booking confirmations and WhatsApp reminders 24 hours before departure, without anyone lifting a finger.",
        },
        {
          icon: "award",
          title: "Loyalty that brings them back",
          description: "Points, tiers and member benefits that reward customers for booking with you again.",
        },
        {
          icon: "receipt",
          title: "Everything in one place",
          description: "Trip countdowns, timelines and PDF invoices in a personal travel dashboard.",
        },
      ],
      whyTitle: "Why every travel agency needs one",
      reasons: [
        {
          title: "Your customers are already on their phones",
          description:
            "That's where they search, compare and book. If your agency isn't there, a booking platform is.",
        },
        {
          title: "Own the relationship",
          description:
            "When customers book in your app, the next trip, the review and the referral come back to you.",
        },
        {
          title: "Less manual work",
          description:
            "Confirmations, reminders and invoices go out automatically, so your team can focus on selling trips.",
        },
        {
          title: "Look as professional as the big players",
          description:
            "A polished app and website build trust before the customer has even called you.",
        },
      ],
      flow: [
        "Traveller searches in plain language",
        "Best offer selected",
        "Booking confirmed",
        "Reminder 24 hours before departure",
        "Loyalty points added",
      ],
      included: [
        {
          title: "Website",
          items: [
            "Flight and package search",
            "Online booking requests",
            "Pages Google can find (SEO)",
            "Multilingual content",
            "Admin dashboard for your team",
          ],
        },
        {
          title: "Mobile app",
          items: [
            "Plain-language search",
            "Trip countdown and timeline",
            "Favorites and price alerts",
            "Loyalty card and tiers",
            "WhatsApp and push reminders",
          ],
        },
      ],
      fits: ["Flight & ticketing agencies", "Tour operators", "Umrah & Hajj agencies", "Corporate travel", "Local agencies"],
      faq: [
        {
          question: "Does it work on both iPhone and Android?",
          answer:
            "Yes. The app is built with React Native and Expo, so one codebase runs on both iOS and Android.",
        },
        {
          question: "Where do the prices come from?",
          answer:
            "From your flights or booking API, never from the AI. The assistant understands the request, and the real fares come from the supplier.",
        },
        {
          question: "Do I need both the app and the website?",
          answer:
            "No. You can start with either one. They share the same backend, so adding the other later doesn't mean starting over.",
        },
        {
          question: "Can customers book over WhatsApp instead?",
          answer:
            "Yes. The WhatsApp assistant handles plain-language requests and follow-up questions, with the same validation and real prices as the app.",
        },
      ],
      contact: {
        heading: "Let's put your agency on their phone.",
        intro:
          "Tell me about your agency: what you sell, how customers book today and what takes your team the most time. I'll suggest where to start, app or website.",
      },
    },
  ] satisfies CaseStudy[],

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

  /**
   * Home-page FAQ. Written in the third person, one self-contained answer per
   * question, so AI assistants can quote an answer word for word. Also sent
   * as FAQPage structured data, so keep it factual.
   */
  faq: [
    {
      question: "Who is Ahmed Bel Haj Boubaker?",
      answer:
        "Ahmed Bel Haj Boubaker is a full-stack software engineer based in Tunis, Tunisia. He builds web platforms, mobile apps and AI-powered automation end to end, and has two years of professional experience. He holds a master's degree in software engineering from ESPRIT.",
    },
    {
      question: "What does Ahmed Bel Haj Boubaker build?",
      answer:
        "Three kinds of software: business web platforms and SaaS products (Java/Spring Boot with Angular, or Next.js), cross-platform mobile apps (React Native and Expo), and AI automation such as WhatsApp sales agents, voice phone agents for restaurants, document-processing pipelines and n8n workflows.",
    },
    {
      question: "Where has Ahmed Bel Haj Boubaker worked?",
      answer:
        "He has been a Full Stack Software Engineer at MVPNest in Tunis since January 2025, building a building-automation scheduler and a hospitality workforce platform. From November 2024 to May 2025 he was a full-stack intern at Bin Mes’har & Co. in Dubai, where he built a bilingual English-Arabic law firm platform with AI case analysis.",
    },
    {
      question: "What AI automation projects has he built?",
      answer:
        "An AI phone agent that takes restaurant orders and bookings 24/7, a WhatsApp agent that qualifies real-estate buyers and books viewings into Google Calendar and HubSpot, an accounting document-processing pipeline with OCR and AI classification, a LinkedIn content automation, and Ulysse, a WhatsApp and mobile flight-search assistant running on a self-hosted LLM.",
    },
    {
      question: "Which technologies does he use?",
      answer:
        "Java, Spring Boot, Angular, TypeScript, React, Next.js, Node.js, Django and Laravel on the web; React Native and Expo on mobile; PostgreSQL, MySQL, MongoDB, Prisma and Supabase for data; and n8n, LiveKit, MCP, the WhatsApp Cloud API and Ollama for AI automation.",
    },
    {
      question: "Is Ahmed Bel Haj Boubaker available for hire?",
      answer:
        "Yes. He is open to full-time roles, remote or with relocation, and takes on freelance projects, including AI automation through Fiverr. He speaks Arabic, French and English.",
    },
    {
      question: "How can I contact Ahmed Bel Haj Boubaker?",
      answer:
        "By email at belhajboubakera@gmail.com, through the contact form on ahmed-belhaj-boubaker.com, on LinkedIn (linkedin.com/in/ahmed-belhaj-boubaker) or on Fiverr (fiverr.com/users/ahmedbelhajboub).",
    },
  ],

  nav: [
    { id: "about", label: "About" },
    { id: "stack", label: "Stack" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Work" },
    { id: "case-studies", label: "Case studies" },
    { id: "contact", label: "Contact" },
  ],
};

export type Profile = typeof profile;
