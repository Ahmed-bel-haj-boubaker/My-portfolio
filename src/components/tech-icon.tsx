import {
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFirebase,
  siFlutter,
  siGithubactions,
  siGraphql,
  siJavascript,
  siLinux,
  siMongodb,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPuppeteer,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons"

import type { TechIcon as TechIconName } from "@/data/profile"

/** Simple Icons path data, keyed by the icon names used in profile.ts. */
const paths: Record<TechIconName, string> = {
  react: siReact.path,
  nextjs: siNextdotjs.path,
  typescript: siTypescript.path,
  javascript: siJavascript.path,
  tailwind: siTailwindcss.path,
  nodejs: siNodedotjs.path,
  express: siExpress.path,
  nestjs: siNestjs.path,
  python: siPython.path,
  fastapi: siFastapi.path,
  graphql: siGraphql.path,
  expo: siExpo.path,
  flutter: siFlutter.path,
  docker: siDocker.path,
  githubactions: siGithubactions.path,
  n8n: siN8n.path,
  puppeteer: siPuppeteer.path,
  linux: siLinux.path,
  vercel: siVercel.path,
  postgresql: siPostgresql.path,
  mongodb: siMongodb.path,
  redis: siRedis.path,
  supabase: siSupabase.path,
  firebase: siFirebase.path,
  prisma: siPrisma.path,
}

/**
 * Every logo's path is defined once here; each placement is a tiny <use>.
 * Render this once on any page that shows tech icons.
 */
export function TechIconSprite() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        {Object.entries(paths).map(([name, d]) => (
          <symbol key={name} id={`tech-${name}`} viewBox="0 0 24 24">
            <path d={d} fill="currentColor" />
          </symbol>
        ))}
      </defs>
    </svg>
  )
}

/** Monochrome brand logo; inherits the current text color. */
export function TechIcon({ icon, className }: { icon: TechIconName; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <use href={`#tech-${icon}`} />
    </svg>
  )
}
