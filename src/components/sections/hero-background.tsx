"use client"

import { useEffect } from "react"
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import * as m from "motion/react-m"

import { useFinePointer } from "@/lib/use-media-query"
import { DotPattern } from "@/components/magicui/dot-pattern"

/**
 * Two dot layers: a faint field under a radial mask, and a brighter copy
 * revealed only around the cursor. The spotlight is mouse-only and is skipped
 * entirely for reduced motion.
 */
export function HeroBackground() {
  const reduceMotion = useReducedMotion()
  const spotlight = useFinePointer() && !reduceMotion
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 })
  const mask = useMotionTemplate`radial-gradient(220px circle at ${sx}px ${sy}px, black, transparent 70%)`

  useEffect(() => {
    if (!spotlight) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return
      x.set(event.clientX)
      y.set(event.clientY + window.scrollY)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [spotlight, x, y])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <DotPattern
        width={24}
        height={24}
        cr={1}
        className="text-border-strong [mask-image:radial-gradient(ellipse_75%_65%_at_30%_45%,black,transparent_80%)]"
      />
      {spotlight && (
        <m.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          <DotPattern width={24} height={24} cr={1.1} className="text-muted-foreground" />
        </m.div>
      )}
      {/* Soft fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
    </div>
  )
}
