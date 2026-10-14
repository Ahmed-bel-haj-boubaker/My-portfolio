"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import * as m from "motion/react-m"
import { ArrowUp, LayoutGrid, Send, type LucideIcon } from "lucide-react"

import { EASE } from "@/lib/motion"
import { visibleSocials } from "@/lib/site"
import { socialIcons } from "@/components/icons"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { SectionLink } from "@/components/section-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const quickLinks: { section: string; label: string; icon: LucideIcon }[] = [
  { section: "top", label: "Back to top", icon: ArrowUp },
  { section: "work", label: "Work", icon: LayoutGrid },
  { section: "contact", label: "Contact", icon: Send },
]

const itemClass =
  "grid size-full place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"

/**
 * Floating desktop dock. It appears once the hero is out of view, so it takes
 * over quick navigation while the navbar is tucked away on scroll down.
 * Loaded lazily by <SiteDockLoader> on desktop only.
 */
export function SiteDock() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.7)
  })

  if (pathname !== "/") return null

  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence>
        {visible && (
          <m.nav
            aria-label="Quick links"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-6 z-40 hidden justify-center lg:flex"
          >
            <Dock disableMagnification={reduceMotion ?? false}>
              {quickLinks.map(({ section, label, icon: Icon }) => (
                <DockIcon key={section}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SectionLink section={section} aria-label={label} className={itemClass}>
                        <Icon className="size-4" aria-hidden />
                      </SectionLink>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={10}>{label}</TooltipContent>
                  </Tooltip>
                </DockIcon>
              ))}

              <Separator orientation="vertical" className="mx-1 h-6! self-center" />

              {visibleSocials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <DockIcon key={social.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          target={social.icon === "email" ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className={itemClass}
                        >
                          <Icon className="size-4" aria-hidden />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={10}>{social.label}</TooltipContent>
                    </Tooltip>
                  </DockIcon>
                )
              })}

              <Separator orientation="vertical" className="mx-1 h-6! self-center" />

              <DockIcon>
                <ThemeToggle className="size-full" />
              </DockIcon>
            </Dock>
          </m.nav>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}
