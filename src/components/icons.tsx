import type { IconType } from "react-icons"
import { FaLinkedinIn } from "react-icons/fa6"
import { SiFiverr, SiGithub } from "react-icons/si"
import { Mail, type LucideIcon } from "lucide-react"

import type { Social } from "@/data/profile"
import { cn } from "@/lib/utils"

/** LinkedIn isn't in Simple Icons any more, so it comes from Font Awesome. */
const socialIcons: Record<Social["icon"], IconType | LucideIcon> = {
  linkedin: FaLinkedinIn,
  github: SiGithub,
  fiverr: SiFiverr,
  email: Mail,
}

/**
 * Fiverr's logo is a wide wordmark, so in a square icon box it renders as a
 * thin sliver. It's scaled up to match the visual weight of the other glyphs.
 */
const opticalSize: Partial<Record<Social["icon"], string>> = {
  fiverr: "scale-[1.9]",
}

export function SocialIcon({ icon, className }: { icon: Social["icon"]; className?: string }) {
  const Icon = socialIcons[icon]
  return <Icon aria-hidden className={cn("size-4 shrink-0", opticalSize[icon], className)} />
}
