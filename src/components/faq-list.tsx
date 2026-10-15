import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type FaqListProps = {
  items: { question: string; answer: string }[]
  /** Open the first answer by default, so the key answer is visible without a click */
  openFirst?: boolean
  className?: string
}

/**
 * Native <details> accordion: no JS, and the answers stay in the HTML, so
 * crawlers and AI assistants read them even while they're collapsed.
 */
export function FaqList({ items, openFirst, className }: FaqListProps) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <details key={item.question} open={openFirst && i === 0} className="group border-t border-border last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
            <h3 className="font-medium">{item.question}</h3>
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border border-border",
                "transition-[rotate,background-color,color] duration-300 ease-(--ease-out-expo)",
                "group-open:rotate-45 group-open:bg-foreground group-open:text-background"
              )}
            >
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="max-w-[60ch] pb-6 text-muted-foreground md:text-lg">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
