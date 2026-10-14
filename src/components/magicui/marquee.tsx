import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Magic UI Marquee. Pure CSS: pauses on hover and stops entirely for
 * reduced motion.
 */
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  children: React.ReactNode
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex flex-row gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 animate-marquee flex-row justify-around gap-(--gap) motion-reduce:animate-none",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
