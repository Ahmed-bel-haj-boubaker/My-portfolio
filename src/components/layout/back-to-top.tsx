"use client"

import { ArrowUp } from "lucide-react"

import { useScrollToSection } from "@/components/section-link"

export function BackToTop() {
  const scrollTo = useScrollToSection()

  return (
    <button
      type="button"
      onClick={() => scrollTo("top")}
      className="group flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-foreground"
    >
      Back to top
      <ArrowUp
        aria-hidden
        className="size-4 transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-0.5"
      />
    </button>
  )
}
