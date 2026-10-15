import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export const CONTACT_TOAST_DURATION = 6000

type Props = {
  variant: "success" | "error"
  title: string
  description: string
  onDismiss: () => void
}

/** Custom sonner toast for the contact form: drawn check, staggered copy, countdown bar. */
export function ContactToast({ variant, title, description, onDismiss }: Props) {
  const success = variant === "success"

  return (
    <div
      role={success ? "status" : "alert"}
      className="relative flex w-[min(380px,calc(100vw-2rem))] items-start gap-4 overflow-hidden rounded-2xl border border-border bg-popover p-5 pr-11 text-popover-foreground shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
      style={{ "--toast-duration": `${CONTACT_TOAST_DURATION}ms` } as React.CSSProperties}
    >
      <span className="relative mt-0.5 grid size-10 shrink-0 place-items-center">
        {success && <span aria-hidden className="toast-ring absolute inset-0 rounded-full border border-foreground" />}
        <span
          className={cn(
            "toast-badge grid size-10 place-items-center rounded-full",
            success ? "bg-foreground text-background" : "border border-foreground text-foreground"
          )}
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            {success ? <path className="toast-check" d="M5 12.5l4.5 4.5L19 7.5" /> : <path className="toast-check" d="M12 7v6M12 17h.01" />}
          </svg>
        </span>
      </span>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="toast-line text-[0.95rem] font-semibold tracking-[-0.01em]" style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
          {title}
        </p>
        <p className="toast-line text-sm leading-relaxed text-muted-foreground" style={{ "--line-delay": "0.18s" } as React.CSSProperties}>
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="absolute top-3 right-3 grid size-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <X aria-hidden className="size-3.5" />
      </button>

      <span aria-hidden className="toast-progress absolute inset-x-0 bottom-0 h-0.5 bg-foreground/80" />
    </div>
  )
}
