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
3. Add the contact-form env vars under **Settings → Environment Variables**
   (see below), then redeploy.
4. Under **Settings → Domains**, add `ahmed-belhaj-boubaker.com` and
   `www.ahmed-belhaj-boubaker.com`. www is redirected to the bare domain by
   `next.config.ts`, so there is only one canonical host. `siteUrl` in
   `profile.ts` is already set to it.

## SEO

Everything is generated from `profile.ts`, so it stays in sync with the content.

- **Metadata**: one title, description and canonical per page. Project and case-study
  pages share their cover as the Open Graph and Twitter image (`src/lib/seo.ts`).
- **Structured data (JSON-LD)**:
  - Home: WebSite, Person and ProfilePage.
  - Projects: CreativeWork and BreadcrumbList.
  - Case studies: Service and BreadcrumbList.
- **Crawling**: `/sitemap.xml` (with image entries) and `/robots.txt`. AI search
  crawlers are allowed so the site can be cited in AI answers.
- **`/llms.txt`**: a Markdown summary for AI assistants.
- **Real 404s**: `src/proxy.ts` returns a 404 status for unknown project or
  case-study URLs. Without it, those pages would send a 200 first (a "soft 404").
- **Headers**: nosniff, referrer policy, frame options, permissions policy and HSTS
  (`next.config.ts`).

After the domain is live:

1. Verify it in [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - For the HTML-tag method, put the token in the `GOOGLE_SITE_VERIFICATION` /
     `BING_SITE_VERIFICATION` env vars and redeploy.
   - With DNS verification, the env vars aren't needed.
2. Submit `https://ahmed-belhaj-boubaker.com/sitemap.xml` in both.
3. Link the site from LinkedIn, Fiverr and GitHub, so search engines connect the
   profiles to the same person.

### AI search (AEO)

The goal is for ChatGPT, Claude, Perplexity, Gemini and Copilot to know who you are, and to cite the site when they answer.

- **"Quick answers" FAQ on the home page** (`profile.faq`): one self-contained, third-person answer per question, so it can be quoted as is. The same pairs go out as FAQPage structured data. Case-study FAQs do the same.
- **One identity**: the Person schema carries `alternateNames` (Belhaj / Bel Haj spellings), occupation, degree, skills and your social profiles (`sameAs`).
- **`/llms.txt`** gives a summary; **`/llms-full.txt`** has the whole site as one Markdown file.
- **`robots.txt`** explicitly allows the AI search crawlers.
- **Freshness**: bump `profile.updatedAt` whenever you change the content. It feeds the sitemap and the structured data.
- **IndexNow**: after each deploy, run `npm run indexnow` to ping Bing with every URL. Bing powers ChatGPT search and Copilot. The key file is in `public/` and must stay there.

What moves AI answers most happens off-site, on the profiles they cross-check:

- Use the same name, title and one-line description on LinkedIn, Fiverr and GitHub, and link back to the site.
- A GitHub profile README that points to the site, and pinned public repos.
- Mentions on other sites: client reviews, articles, talks, directories.

## Contact form (Gmail)

The form posts to a server action (`src/app/actions/contact.ts`) that sends
through Gmail SMTP with nodemailer (`src/lib/mail.ts`):

- You get the message, with **Reply-To** set to the visitor, so hitting Reply answers them.
- The visitor gets a short confirmation with a copy of what they sent.
- The visitor sees a custom success notification (`src/components/contact-toast.tsx`).

Spam protection is a hidden honeypot field plus a limit of 3 messages per IP every 10 minutes.

Copy `.env.example` to `.env` and fill in:

| Variable             | Value                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `GMAIL_USER`         | The Gmail address that sends the emails                                                     |
| `GMAIL_APP_PASSWORD` | A Google **App Password** (Google Account → Security → 2-Step Verification → App passwords) |
| `CONTACT_TO`         | Optional; where messages land (defaults to `GMAIL_USER`)                                    |

`.env` is git-ignored, so on Vercel the same three variables must be added in the dashboard.

## Case studies

Industry pages live at `/case-studies/<slug>` and are listed in the home-page "Case studies" section. There are three:

- `restaurants`: AI phone agent
- `real-estate`: WhatsApp sales agent
- `travel-agencies`: mobile app and website

Each one is an entry in `profile.caseStudies` with these sections: problem, benefits, how it works, why every business needs it, the real build, FAQ, and its own contact heading.

`projects` lists the portfolio slugs that back the page up. The first project's cover becomes the hero image, and a phone gallery is shown when the project has one. Those project pages link back to the case study automatically.

Messages sent from a case-study page arrive with the topic in the subject, e.g. "New message from Sara · Restaurants case study".

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
