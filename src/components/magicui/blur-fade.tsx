import { cn } from "@/lib/utils"

/**
 * Magic UI Blur Fade, rebuilt on CSS: fade, slight rise and blur to sharp,
 * once, when the element scrolls into view. One shared observer
 * (<RevealObserver>) flips `data-revealed`, so these render on the server and
 * cost nothing to hydrate. Reduced motion keeps only the fade (globals.css).
 */
type BlurFadeProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "li" | "article" | "section"
  /** Seconds */
  delay?: number
}

export function BlurFade({ children, className, as: Tag = "div", delay = 0 }: BlurFadeProps) {
  return (
    <Tag
      data-reveal=""
      // <RevealObserver> may add data-revealed before this hydrates (e.g. landing on /#work)
      suppressHydrationWarning
      className={cn(className)}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
