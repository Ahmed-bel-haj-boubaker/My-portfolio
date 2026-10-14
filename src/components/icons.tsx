import type { IconType } from "react-icons"
import { FaLinkedinIn } from "react-icons/fa6"
import { SiGithub } from "react-icons/si"
import { Mail, type LucideIcon } from "lucide-react"

import type { Social } from "@/data/profile"

/** LinkedIn isn't in Simple Icons any more, so it comes from Font Awesome. */
export const socialIcons: Record<Social["icon"], IconType | LucideIcon> = {
  linkedin: FaLinkedinIn,
  github: SiGithub,
  email: Mail,
}
