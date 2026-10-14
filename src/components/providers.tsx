"use client"

import dynamic from "next/dynamic"
import { ThemeProvider } from "next-themes"
import { LazyMotion, useReducedMotion } from "motion/react"

import { useFinePointer } from "@/lib/use-media-query"

// Neither is needed for first paint, so both load after hydration.
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), { ssr: false })
const Toaster = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster), {
  ssr: false,
})

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default)

export function Providers({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  const finePointer = useFinePointer()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Smooth scrolling is a mouse/trackpad nicety: touch keeps native
          momentum, and reduced-motion visitors get plain scrolling */}
      {finePointer && !reduceMotion && <SmoothScroll />}
      <LazyMotion features={loadMotionFeatures} strict>
        {children}
      </LazyMotion>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}
