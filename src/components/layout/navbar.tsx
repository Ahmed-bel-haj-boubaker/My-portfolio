"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import * as m from "motion/react-m"
import { ArrowUpRight, Mail, Menu } from "lucide-react"

import { profile } from "@/data/profile"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { SectionLink } from "@/components/section-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const sectionIds = profile.nav.map((item) => item.id)

/** Tracks which home-page section is crossing the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const id of [...sectionIds, "top"]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [enabled])

  return enabled ? active : null
}

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const active = useActiveSection(isHome)
  const reduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 8)
    setHidden(y > previous && y > 200)
  })

  return (
    <m.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
      className="fixed inset-x-0 top-0 z-40"
      onFocusCapture={() => setHidden(false)}
    >
      <div
        className={cn(
          "border-b transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-border bg-background/75 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-(--header-h) items-center justify-between gap-6"
        >
          <SectionLink
            section="top"
            className="group -m-1 grid place-items-center rounded-md p-1"
            aria-label={`${profile.name}, back to top`}
          >
            <Logo className="size-8 transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-6" />
          </SectionLink>

          <ul className="hidden items-center gap-1 md:flex">
            {profile.nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  <SectionLink
                    section={item.id}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full border border-border bg-muted"
                        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                      />
                    )}
                    {item.label}
                  </SectionLink>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              title={profile.email}
              className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground sm:grid"
            >
              <Mail className="size-4" aria-hidden />
            </a>
            <Button
              asChild
              variant="outline"
              className="ml-2 hidden h-9 rounded-full px-4 sm:inline-flex"
            >
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume
                <ArrowUpRight
                  aria-hidden
                  className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                />
              </a>
            </Button>
            <MobileMenu />
          </div>
        </nav>
      </div>
    </m.header>
  )
}

const MobileMenuSheet = dynamic(
  () => import("@/components/layout/mobile-menu").then((mod) => mod.MobileMenuSheet),
  { ssr: false }
)
const preloadMobileMenu = () => void import("@/components/layout/mobile-menu")

/** A plain button until first use; the sheet (and its dialog code) loads on demand. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [requested, setRequested] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preloadMobileMenu}
        onFocus={preloadMobileMenu}
        onClick={() => {
          setRequested(true)
          setOpen(true)
        }}
        className="ml-1 grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      {requested && <MobileMenuSheet open={open} onOpenChange={setOpen} />}
    </>
  )
}
