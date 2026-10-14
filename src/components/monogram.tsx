import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

/** The ABB monogram: a hairline frame holding tightly set initials. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid h-8 place-items-center rounded-md border border-border-strong px-1.5 font-mono text-[11px] leading-none font-semibold tracking-[-0.04em] text-foreground",
        className
      )}
    >
      {profile.initials}
    </span>
  )
}
