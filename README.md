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
- Content is taken from the CV. `stack` mirrors its Technical Skills section. Each item
  needs an `icon` key from the `TechIcon` type; the logos come from
  [Simple Icons](https://simpleicons.org) and are mapped in `src/components/tech-icon.tsx`.
- `about.stats`: set `value: null` to show a placeholder, or a number to animate it.

### Resume

The CV lives at `public/Ahmed-Bel-Haj-Boubaker-CV.pdf`. To update it, replace that
file (keep the name) or point `resumeUrl` at a new one. The navbar and mobile menu link to it.

### Logo

The mark is an SVG in `src/components/logo.tsx` that inherits the text color, so the one
file covers both themes. The favicon (`src/app/icon.svg`) switches with the browser's
light/dark setting; the Apple icon and Open Graph image are generated from the same path.

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
  links: { live: "https://…", github: "https://github.com/…", fiverr: "https://…" }, // all optional
  cover: { src: "/projects/invoice-bot/cover.jpg", alt: "Dashboard showing …" },
  problem: "…",
  approach: ["…", "…"],             // one paragraph per entry
  result: "…",
  gallery: [],                      // optional screenshots; leave empty for none
  // galleryLayout: "phone",        // show the gallery as mobile screens (see Ulysse)
}
```

Put images in `public/projects/<slug>/`. Covers are 16:9 marketing images and show in
full color; the cards keep that shape so headlines aren't cropped.

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

Profile, experience and education are filled in from the CV. What's left:

**Profile**
- [ ] `siteUrl`: your production domain
- [ ] GitHub URL in `socials` (hidden until set)
- [ ] Optional: company URLs in `experience` (`companyUrl`) and certifications

**Projects**
- [ ] Live / GitHub links where they exist (all hidden for now)
- [ ] Years for the four automation projects (restaurant agent, real estate agent,
      accounting documents, LinkedIn content); hidden on the site until set
- [ ] Accounting documents and LinkedIn content: exact tools (workflow engine, OCR, model)
- [ ] Law firm platform: result after launch
- [ ] Building automation scheduler: problem, how it fits together, result
- [ ] Hospitality platform and building scheduler: confirm the stack (copied from the
      MVPNest role on the CV)
