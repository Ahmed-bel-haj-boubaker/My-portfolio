"use client"

import { useRef } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, useReducedMotion } from "motion/react"
import * as m from "motion/react-m"
import { ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { EASE } from "@/lib/motion"
import { visibleSocials } from "@/lib/site"
import { SocialIcon } from "@/components/icons"
import { SectionLink, useScrollToSection } from "@/components/section-link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"

/**
 * Full-height mobile navigation. Loaded on demand by the navbar's menu button,
 * so the dialog code isn't part of the first page load. Focus returns to that
 * button when the sheet closes.
 */
export function MobileMenuSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const pending = useRef<string | null>(null)
  const pathname = usePathname()
  const scrollTo = useScrollToSection()
  const reduceMotion = useReducedMotion()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-l-border bg-background p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          // Scroll after the sheet has released its scroll lock
          if (!pending.current) return
          event.preventDefault()
          scrollTo(pending.current)
          pending.current = null
        }}
      >
        <div className="flex h-(--header-h) items-center px-4">
          <SheetTitle className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Menu
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-4 pb-8">
          <ul className="flex flex-col">
            <AnimatePresence>
              {open &&
                profile.nav.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-border"
                  >
                    <SectionLink
                      section={item.id}
                      onClick={(event) => {
                        if (pathname === "/") {
                          event.preventDefault()
                          pending.current = item.id
                        }
                        onOpenChange(false)
                      }}
                      className="flex items-center justify-between py-4 text-3xl font-medium tracking-tight"
                    >
                      {item.label}
                      <ArrowUpRight className="size-5 text-muted-foreground" aria-hidden />
                    </SectionLink>
                  </m.li>
                ))}
            </AnimatePresence>
          </ul>

          <div className="mt-auto flex flex-col gap-6 pt-10">
            <Button asChild className="h-11 rounded-full text-base">
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <ul className="flex items-center gap-2">
              {visibleSocials.map((social) => {
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target={social.icon === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      <SocialIcon icon={social.icon} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
