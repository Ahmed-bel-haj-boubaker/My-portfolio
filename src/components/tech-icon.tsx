import { Cloud, type LucideIcon } from "lucide-react"
import {
  siAngular,
  siDjango,
  siDocker,
  siExpo,
  siExpress,
  siGit,
  siGooglecalendar,
  siGooglesheets,
  siHubspot,
  siJavascript,
  siLaravel,
  siLivekit,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedux,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVercel,
  siWhatsapp,
} from "simple-icons"

import type { TechIcon as TechIconName } from "@/data/profile"

/** Simple Icons path data, keyed by the icon names used in profile.ts. */
const paths: Partial<Record<TechIconName, string>> = {
  angular: siAngular.path,
  react: siReact.path,
  nextjs: siNextdotjs.path,
  typescript: siTypescript.path,
  javascript: siJavascript.path,
  tailwind: siTailwindcss.path,
  redux: siRedux.path,
  java: siOpenjdk.path,
  spring: siSpringboot.path,
  nodejs: siNodedotjs.path,
  express: siExpress.path,
  django: siDjango.path,
  laravel: siLaravel.path,
  php: siPhp.path,
  python: siPython.path,
  expo: siExpo.path,
  postgresql: siPostgresql.path,
  mysql: siMysql.path,
  mongodb: siMongodb.path,
  prisma: siPrisma.path,
  supabase: siSupabase.path,
  docker: siDocker.path,
  git: siGit.path,
  vercel: siVercel.path,
  n8n: siN8n.path,
  ollama: siOllama.path,
  whatsapp: siWhatsapp.path,
  livekit: siLivekit.path,
  mcp: siModelcontextprotocol.path,
  hubspot: siHubspot.path,
  googlesheets: siGooglesheets.path,
  googlecalendar: siGooglecalendar.path,
  telegram: siTelegram.path,
}

/** Brands Simple Icons no longer carries (AWS) get a neutral glyph instead. */
const fallbacks: Partial<Record<TechIconName, LucideIcon>> = {
  aws: Cloud,
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
  const Fallback = fallbacks[icon]
  if (Fallback) return <Fallback aria-hidden className={className} strokeWidth={1.75} />

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <use href={`#tech-${icon}`} />
    </svg>
  )
}
