"use client"

import { useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { getLenis } from "@/lib/lenis-store"

/** Scrolls to a section id (or "top"), through Lenis when it's running. */
export function useScrollToSection() {
  const pathname = usePathname()

  return useCallback(
    (id: string) => {
      const target = id === "top" ? 0 : document.getElementById(id)
      if (target === null) return

      const lenis = getLenis()
      if (lenis) {
        // Lenis honours the CSS scroll-margin-top set on [id] elements
        lenis.scrollTo(target, { duration: 1.1 })
      } else if (target === 0) {
        window.scrollTo({ top: 0 })
      } else {
        target.scrollIntoView()
      }
      if (pathname === "/") {
        window.history.replaceState(null, "", id === "top" ? "/" : `/#${id}`)
      }
    },
    [pathname]
  )
}

type SectionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  /** Section id on the home page, or "top" */
  section: string
}

/**
 * Link to a home-page section. On the home page it scrolls smoothly in place;
 * elsewhere it navigates to "/#section".
 */
export function SectionLink({ section, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname()
  const scrollTo = useScrollToSection()

  return (
    <Link
      transitionTypes={["page"]}
      {...props}
      href={section === "top" ? "/" : `/#${section}`}
      onClick={(event) => {
        onClick?.(event)
        const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
        if (pathname !== "/" || event.defaultPrevented || modified) return
        event.preventDefault()
        scrollTo(section)
      }}
    />
  )
}
