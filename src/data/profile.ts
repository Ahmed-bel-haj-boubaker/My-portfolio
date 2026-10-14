/**
 * Single source of truth for every piece of content on the site.
 * Components only read from this file.
 *
 * Anything that starts with "[FILL IN" is a placeholder. Links whose URL is a
 * placeholder are hidden automatically until you replace them, so the site
 * never ships a dead link. Search this file for "[FILL IN" to find them all.
 */

export type TechIcon =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "nodejs"
  | "express"
  | "nestjs"
  | "python"
  | "fastapi"
  | "graphql"
  | "expo"
  | "flutter"
  | "docker"
  | "githubactions"
  | "n8n"
  | "puppeteer"
  | "linux"
  | "vercel"
  | "postgresql"
  | "mongodb"
  | "redis"
  | "supabase"
  | "firebase"
  | "prisma";

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
  icon: "linkedin" | "github" | "email";
};

/** Placeholder imagery: grayscale picsum photos. Replace with real screenshots. */
const placeholderImage = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

export const profile = {
  name: "Ahmed Bel Haj Boubaker",
  /** How the name breaks across two lines in the hero */
  nameLines: ["Ahmed Bel Haj", "Boubaker"],
  initials: "ABB",
  role: "Software Engineer",
  discipline: "Full-stack",
  focus: ["Web", "Mobile", "Automation"],
  yearsOfExperience: 3,
  location: "Tunisia",
  availability: "Available for work",
  workPreference: "Open to remote",
  email: "belhajboubakera@gmail.com",
  /** Put your CV at /public/resume.pdf, or point this at a hosted file. */
  resumeUrl: "/resume.pdf",
  /** Production URL, used for SEO, sitemap and Open Graph. */
  siteUrl: "[FILL IN: https://your-domain.com]",

  /** Hero tagline: the lead sentence is set brighter than the rest. */
  taglineLead: "I build products end to end.",
  taglineRest: "Web, mobile, and the automation in between.",
  description:
    "Ahmed Bel Haj Boubaker is a full-stack software engineer in Tunisia building web apps, mobile apps and automation for teams that want software that ships.",

  about: {
    lead: "I'm a full-stack engineer with three years of shipping software across the web, mobile, and the glue code nobody wants to own.",
    body: [
      "I like the parts of a product where things get messy: a web app that needs a mobile companion, a manual process that should run on its own, two systems that have to agree on the same data. I take those from rough idea to something people use every day.",
      "[FILL IN: One or two sentences on what you're focused on right now, or the kind of team and problems you want next.]",
    ],
    stats: [
      { value: 3, suffix: "+", label: "Years shipping" },
      // [FILL IN] Set `value` to your real number. `null` renders a placeholder.
      { value: null as number | null, suffix: "", label: "Projects shipped" },
    ],
    facts: [
      { label: "Based in", value: "Tunisia, open to remote" },
      { label: "Experience", value: "3 years" },
      { label: "Focus", value: "Web, mobile, automation" },
      { label: "Languages", value: "[FILL IN: e.g. Arabic, French, English]" },
    ],
  },

  pillars: [
    {
      id: "web",
      title: "Web",
      description:
        "Full-stack web apps, from the database schema to the last loading state.",
      tools: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
      logos: ["nextjs", "react", "typescript", "nodejs", "postgresql", "tailwind"],
    },
    {
      id: "mobile",
      title: "Mobile",
      description:
        "Cross-platform apps for iOS and Android that share logic with the web.",
      tools: ["React Native", "Expo", "Flutter"],
      logos: ["react", "expo", "flutter"],
    },
    {
      id: "automation",
      title: "Automation",
      description:
        "Workflows, scripts, integrations and bots that take repetitive work off people's plates.",
      tools: ["n8n", "Python", "Puppeteer", "Webhooks", "REST APIs"],
      logos: ["n8n", "python", "puppeteer"],
    },
  ] satisfies Pillar[],

  /** [FILL IN] A reasonable full-stack set. Edit to match what you actually use. */
  stack: [
    {
      title: "Frontend",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwind" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "NestJS", icon: "nestjs" },
        { name: "Python", icon: "python" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "GraphQL", icon: "graphql" },
      ],
    },
    {
      title: "Mobile",
      items: [
        { name: "React Native", icon: "react" },
        { name: "Expo", icon: "expo" },
        { name: "Flutter", icon: "flutter" },
      ],
    },
    {
      title: "DevOps & Automation",
      items: [
        { name: "Docker", icon: "docker" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "n8n", icon: "n8n" },
        { name: "Puppeteer", icon: "puppeteer" },
        { name: "Linux", icon: "linux" },
        { name: "Vercel", icon: "vercel" },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
        { name: "Supabase", icon: "supabase" },
        { name: "Firebase", icon: "firebase" },
        { name: "Prisma", icon: "prisma" },
      ],
    },
  ] satisfies TechCategory[],

  /** Most recent first. */
  experience: [
    {
      title: "[FILL IN: Job title]",
      company: "[FILL IN: Company name]",
      companyUrl: "[FILL IN: https://company.com]",
      period: "[FILL IN: 2024 - Present]",
      location: "[FILL IN: Remote / City]",
      bullets: [
        "[FILL IN: What you built, for whom, and what changed because of it.]",
        "[FILL IN: A second result, ideally with a real number.]",
        "[FILL IN: Optional third bullet.]",
      ],
      stack: ["[FILL IN: Tech]"],
    },
    {
      title: "[FILL IN: Job title]",
      company: "[FILL IN: Company name]",
      period: "[FILL IN: 2022 - 2024]",
      location: "[FILL IN: Remote / City]",
      bullets: [
        "[FILL IN: What you built, for whom, and what changed because of it.]",
        "[FILL IN: A second result, ideally with a real number.]",
      ],
      stack: ["[FILL IN: Tech]"],
    },
  ] satisfies Role[],

  education: [
    {
      degree: "[FILL IN: Degree]",
      school: "[FILL IN: School]",
      period: "[FILL IN: Years]",
    },
  ] satisfies Education[],

  /** [FILL IN] Add certifications as { degree, school, period } entries, or leave empty. */
  certifications: [] as Education[],

  /**
   * The first project with `featured: true` gets the large card.
   * Covers and gallery images are grayscale placeholders: swap `src` for real
   * screenshots (e.g. "/projects/my-app/cover.jpg" in /public).
   */
  projects: [
    {
      slug: "web-platform",
      title: "[FILL IN: Project name]",
      kind: "Web platform",
      year: "[FILL IN: Year]",
      summary: "[FILL IN: One line on the outcome, not the features.]",
      role: "[FILL IN: e.g. Lead full-stack engineer]",
      featured: true,
      stack: ["[FILL IN: Stack]"],
      links: { live: "[FILL IN: https://...]", github: "[FILL IN: https://github.com/...]" },
      cover: { src: placeholderImage("abb-web-platform"), alt: "[FILL IN: Describe the screenshot]" },
      problem: "[FILL IN: What was broken, slow, or missing, and who felt it.]",
      approach: [
        "[FILL IN: The key decision you made and why.]",
        "[FILL IN: How you built it. Architecture, trade-offs, constraints.]",
      ],
      result: "[FILL IN: What changed after launch. Use real numbers if you have them.]",
      gallery: [
        { src: placeholderImage("abb-web-platform-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-web-platform-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
    },
    {
      slug: "mobile-app",
      title: "[FILL IN: Project name]",
      kind: "Mobile app",
      year: "[FILL IN: Year]",
      summary: "[FILL IN: One line on the outcome, not the features.]",
      role: "[FILL IN: Your role]",
      stack: ["[FILL IN: Stack]"],
      links: { live: "[FILL IN: https://...]", github: "[FILL IN: https://github.com/...]" },
      cover: { src: placeholderImage("abb-mobile-app", 1200, 900), alt: "[FILL IN: Describe the screenshot]" },
      problem: "[FILL IN: What was broken, slow, or missing, and who felt it.]",
      approach: [
        "[FILL IN: The key decision you made and why.]",
        "[FILL IN: How you built it.]",
      ],
      result: "[FILL IN: What changed after launch.]",
      gallery: [
        { src: placeholderImage("abb-mobile-app-2", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-mobile-app-3"), alt: "[FILL IN: Screenshot description]" },
      ],
    },
    {
      slug: "automation",
      title: "[FILL IN: Project name]",
      kind: "Automation",
      year: "[FILL IN: Year]",
      summary: "[FILL IN: One line on the outcome, not the features.]",
      role: "[FILL IN: Your role]",
      stack: ["[FILL IN: Stack]"],
      links: { github: "[FILL IN: https://github.com/...]" },
      cover: { src: placeholderImage("abb-automation", 1000, 1250), alt: "[FILL IN: Describe the screenshot]" },
      problem: "[FILL IN: What was broken, slow, or missing, and who felt it.]",
      approach: [
        "[FILL IN: The key decision you made and why.]",
        "[FILL IN: How you built it.]",
      ],
      result: "[FILL IN: What changed after launch.]",
      gallery: [
        { src: placeholderImage("abb-automation-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-automation-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
      ],
    },
    {
      slug: "internal-tool",
      title: "[FILL IN: Project name]",
      kind: "Internal tool",
      year: "[FILL IN: Year]",
      summary: "[FILL IN: One line on the outcome, not the features.]",
      role: "[FILL IN: Your role]",
      stack: ["[FILL IN: Stack]"],
      links: { live: "[FILL IN: https://...]" },
      cover: { src: placeholderImage("abb-internal-tool", 1200, 900), alt: "[FILL IN: Describe the screenshot]" },
      problem: "[FILL IN: What was broken, slow, or missing, and who felt it.]",
      approach: [
        "[FILL IN: The key decision you made and why.]",
        "[FILL IN: How you built it.]",
      ],
      result: "[FILL IN: What changed after launch.]",
      gallery: [
        { src: placeholderImage("abb-internal-tool-2"), alt: "[FILL IN: Screenshot description]" },
        { src: placeholderImage("abb-internal-tool-3", 1000, 1250), alt: "[FILL IN: Screenshot description]" },
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
