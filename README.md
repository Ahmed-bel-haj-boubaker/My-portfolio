# Ahmed Bel Haj Boubaker, portfolio

Personal site for a full-stack engineer working across web, mobile and automation.
Strictly monochrome, editorial layout, one page plus a case study per project.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, shadcn/ui,
Magic UI, Motion, Lenis and Simple Icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Node 20.9 or newer.

## Edit the content

Everything visible on the site lives in one typed file: **`src/data/profile.ts`**.
Components only read from it, so you shouldn't need to touch any component to update text.

- Anything starting with `[FILL IN` is a placeholder. Search the file for it.
- Links whose URL is still a placeholder are hidden automatically (GitHub, project
  Live/GitHub links, company links), so the site never ships a dead link.
- The hero name breaks across two lines using `nameLines`.
- `stack` is a reasonable full-stack set. Trim it to what you actually use. Each item
  needs an `icon` key from the `TechIcon` type; the logos come from
  [Simple Icons](https://simpleicons.org) and are mapped in `src/components/tech-icon.tsx`.
- `about.stats`: set `value: null` to show a placeholder, or a number to animate it.

### Resume

Drop your CV at `public/resume.pdf` (or point `resumeUrl` at a hosted file).
The navbar and mobile menu link to it.

### Add a project

Add an object to `profile.projects`:

```ts
{
  slug: "invoice-bot",              // becomes /projects/invoice-bot
  title: "Invoice Bot",
  kind: "Automation",
  year: "2025",
  summary: "Cut month-end invoicing from two days to twenty minutes.",
  role: "Sole engineer",
  featured: false,                  // the first featured project gets the large card
  stack: ["n8n", "Python", "PostgreSQL"],
  links: { live: "https://…", github: "https://github.com/…" },  // either is optional
  cover: { src: "/projects/invoice-bot/cover.jpg", alt: "Dashboard showing …" },
  problem: "…",
  approach: ["…", "…"],             // one paragraph per entry
  result: "…",
  gallery: [{ src: "/projects/invoice-bot/1.jpg", alt: "…" }],
}
```

Put images in `public/projects/<slug>/`. They're shown in grayscale to keep the palette
monochrome. The current covers are grayscale placeholders from picsum.photos; once all
are replaced you can remove the `images.remotePatterns` entry in `next.config.ts`.

The case study page, sitemap entry and static params are generated from this list.

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo. The defaults (Next.js preset,
   `npm run build`) are correct, so no extra settings are needed.
3. Set `siteUrl` in `profile.ts` to your production domain so canonical URLs,
   the sitemap and Open Graph images use it. Until then, the site falls back to
   Vercel's production URL automatically.
4. Optional: add your custom domain under **Settings → Domains**.

## Where things are

```
src/
  app/                     routes, metadata, OG image, icons, sitemap, robots, 404
    projects/[slug]/       case study pages
  components/
    sections/              one file per home-page section
    layout/                navbar, mobile menu, dock, footer
    magicui/               Magic UI components adapted to the design system
    ui/                    shadcn/ui primitives
  data/profile.ts          all content
  lib/                     helpers (site URL, motion constants, hooks)
```

## Design notes

- **Tokens:** every color is a CSS variable in `src/app/globals.css` (dark by default,
  `.light` for the light theme). Components never use hard-coded colors.
- **Type:** Geist Sans and Geist Mono via `next/font`, on a 12 / 14 / 16 / 20 / 24 / 32 /
  48 / 72 / 96 scale. 1200px content column on a 12-column grid.
- **Motion:** one easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`), 0.4 to 0.8s.
  Reveals are CSS driven by a single IntersectionObserver. Smooth scrolling (Lenis)
  runs for mouse users only. `prefers-reduced-motion` turns everything into plain fades.
- **Performance:** the hero animates in pure CSS so it paints before hydration;
  Lenis, the toast library, the dock (with its tooltips) and the mobile menu sheet load
  on demand; tech logos are one SVG sprite; lower sections use `content-visibility`.

## Placeholders still to fill in

All in `src/data/profile.ts`:

**Profile**
- [ ] `siteUrl`: your production domain
- [ ] GitHub URL in `socials` (hidden until set)
- [ ] `about.body[1]`: what you're focused on now, or the team you want next
- [ ] `about.stats[1].value`: number of projects shipped
- [ ] `about.facts`: languages you speak
- [ ] `stack`: confirm or trim the tool list
- [ ] `public/resume.pdf`: add your CV

**Experience** (two roles, add or remove entries as needed)
- [ ] Job title, company, company URL, dates, location
- [ ] 2 to 3 impact bullets per role (with real numbers where you have them)
- [ ] Tech used per role

**Education and certifications**
- [ ] Degree, school, years
- [ ] Certifications (optional; the block hides when the list is empty)

**Projects** (four entries: `web-platform`, `mobile-app`, `automation`, `internal-tool`)
- [ ] Title, year, one-line outcome, your role
- [ ] Stack
- [ ] Live and GitHub links (optional)
- [ ] Problem, approach (2 paragraphs), result
- [ ] Cover image and gallery screenshots, with alt text
- [ ] Rename the slugs to match the real projects
