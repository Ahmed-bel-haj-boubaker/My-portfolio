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
  | "whatsapp";

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

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  role: string;
  featured?: boolean;
  stack: string[];
  links: { live?: string; github?: string };
  cover: ProjectImage;
  problem: string;
  approach: string[];
  result: string;
  gallery: ProjectImage[];
};

export type Social = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "fiverr" | "email";
};

/** Placeholder imagery: grayscale picsum photos. Replace with real screenshots. */
const placeholderImage = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

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
      { value: 5 as number | null, suffix: "", label: "Products built" },
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
        "WhatsApp assistants on self-hosted LLMs, and n8n workflows that take repetitive work off people's plates.",
      tools: ["n8n", "Ollama", "WhatsApp Cloud API", "LLM agents"],
      logos: ["n8n", "ollama", "whatsapp"],
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
      title: "DevOps & Automation",
      items: [
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
        { name: "Git", icon: "git" },
        { name: "Vercel", icon: "vercel" },
        { name: "n8n", icon: "n8n" },
        { name: "Ollama", icon: "ollama" },
        { name: "WhatsApp API", icon: "whatsapp" },
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
   * Covers and gallery images are grayscale placeholders: swap `src` for real
   * screenshots (e.g. "/projects/ulysse/cover.jpg" in /public).
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
      cover: { src: placeholderImage("abb-ulysse"), alt: "[FILL IN: Ulysse app screenshot]" },
      problem:
        "Searching for flights usually means filling in a form field by field. Ulysse lets travellers ask the way they'd ask a person, “Tunis to Milan on November 22 for two passengers”, on WhatsApp or in the app, and still get exact prices.",
      approach: [
        "A WhatsApp assistant runs on a self-hosted LLM (Qwen via Ollama). It understands natural-language requests and follow-up questions, and validation rules check every detail before a search runs. Prices come only from the flights API, never from the model.",
        "The React Native app adds natural-language search, best-offer selection and a “good price” indicator calculated from current fares.",
        "n8n workflows send booking confirmations and WhatsApp reminders 24 hours before departure.",
      ],
      result:
        "One product across two channels, chat and app, with a travel dashboard that adds trip countdowns, PDF invoices and a loyalty program.",
      gallery: [
        { src: placeholderImage("abb-ulysse-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-ulysse-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
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
      cover: { src: placeholderImage("abb-law-firm", 1200, 900), alt: "[FILL IN: Platform screenshot]" },
      problem:
        "A Dubai law firm needed case management, documents, scheduling and client communication in one place, usable in both English and Arabic.",
      approach: [
        "Built on Next.js, Prisma and Supabase, covering case management, document handling, scheduling, dashboards, authentication and internal messaging.",
        "An AI-powered case analysis module structures legal consultations and estimates potential case outcomes.",
        "The interface is fully bilingual, with complete right-to-left support for Arabic.",
      ],
      result: "[FILL IN: What changed for the firm once the platform was in use.]",
      gallery: [
        { src: placeholderImage("abb-law-firm-2", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-law-firm-3"), alt: "[FILL IN: Screenshot description]" },
      ],
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
      cover: { src: placeholderImage("abb-hospitality", 1000, 1250), alt: "[FILL IN: Platform screenshot]" },
      problem:
        "Staffing requests in hospitality were coordinated over phone and email, with no single place to see where a request stood.",
      approach: [
        "A structured request-tracking system follows each request from submission through to confirmed booking, with real-time status updates.",
        "Underneath: reusable Angular components, REST APIs secured with JWT, and admin dashboards.",
      ],
      result: "Phone and email back-and-forth replaced by one tracked, visible workflow.",
      gallery: [
        { src: placeholderImage("abb-hospitality-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-hospitality-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
    },
    {
      slug: "real-estate-agent",
      title: "Real estate sales agent",
      kind: "AI automation",
      year: "[FILL IN: Year]",
      summary:
        "A WhatsApp assistant that answers property inquiries around the clock and hands qualified buyers to the sales team.",
      role: "[FILL IN: Your role]",
      // [FILL IN] Add the exact tools (model, hosting, automation) you used
      stack: ["LLM integration", "WhatsApp automation"],
      links: {},
      cover: { src: placeholderImage("abb-real-estate", 1200, 900), alt: "[FILL IN: Assistant screenshot]" },
      problem:
        "Property inquiries arrive at all hours, and not every one is ready for a conversation with a sales agent.",
      approach: [
        "An LLM-based WhatsApp assistant answers questions about listings at any hour.",
        "It qualifies each lead on budget, preferred location and property type, then recommends matching properties.",
      ],
      result:
        "Viewings are scheduled automatically, and qualified prospects are escalated to a human sales agent.",
      gallery: [
        { src: placeholderImage("abb-real-estate-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-real-estate-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
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
      cover: { src: placeholderImage("abb-building", 1200, 900), alt: "[FILL IN: Scheduler screenshot]" },
      problem: "[FILL IN: What the client needed to control, and why it was hard before.]",
      approach: [
        "Designed and built a scheduling system supporting annual calendars, weekly templates, daily profiles and regulation zones.",
        "[FILL IN: How the pieces fit together, e.g. how weekly templates roll up into the annual calendar.]",
      ],
      result: "[FILL IN: What changed after launch.]",
      gallery: [
        { src: placeholderImage("abb-building-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-building-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
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
