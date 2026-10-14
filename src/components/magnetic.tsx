"use client"

import { useMotionValue, useReducedMotion, useSpring } from "motion/react"
import * as m from "motion/react-m"

import { cn } from "@/lib/utils"

/**
 * Pulls its child a few pixels toward the cursor. Mouse only: touch, pen and
 * reduced-motion users get a static element.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 })

  return (
    <m.div
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * strength)
        y.set((event.clientY - rect.top - rect.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.div>
  )
}
