"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Magic UI Number Ticker. Counts up once when scrolled into view; reduced
 * motion shows the final value straight away. Server-renders the final value
 * so the number is correct without JavaScript.
 */
interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  delay?: number
}

const format = (n: number) => Intl.NumberFormat("en-US").format(Math.round(n))

export function NumberTicker({ value, delay = 0, className, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })

  // Always mirror the spring's *current* value, never a hard-coded 0. Effects
  // re-run when the page is shown again (Next keeps visited routes mounted),
  // and by then the spring has already settled on the final value.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion) {
      el.textContent = format(value)
      return
    }
    el.textContent = format(springValue.get())
    return springValue.on("change", (latest) => {
      el.textContent = format(latest)
    })
  }, [springValue, reduceMotion, value])

  useEffect(() => {
    if (!isInView || reduceMotion) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, delay, value, reduceMotion])

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      {format(value)}
    </span>
  )
}
