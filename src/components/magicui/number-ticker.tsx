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

  useEffect(() => {
    if (reduceMotion || !ref.current) return
    ref.current.textContent = format(0)
  }, [reduceMotion])

  useEffect(() => {
    if (!isInView || reduceMotion) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, delay, value, reduceMotion])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    [springValue]
  )

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)} {...props}>
      {format(value)}
    </span>
  )
}
