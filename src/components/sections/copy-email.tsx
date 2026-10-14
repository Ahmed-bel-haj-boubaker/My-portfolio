"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { profile } from "@/data/profile"
import { notify } from "@/lib/toast"
import { cn } from "@/lib/utils"

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      notify((toast) => toast.success("Email copied to clipboard"))
    } catch {
      notify((toast) =>
        toast.error("Couldn't copy. Use the email link instead.", {
          action: {
            label: "Open email",
            onClick: () => (window.location.href = `mailto:${profile.email}`),
          },
        })
      )
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy email address ${profile.email}`}
      className={cn(
        "group flex w-full items-center justify-between gap-4 border-b border-border-strong pb-4 text-left transition-colors duration-300 hover:border-foreground",
        className
      )}
    >
      <span className="min-w-0 truncate text-xl font-medium tracking-[-0.02em] sm:text-2xl md:text-[2rem]">
        {profile.email}
      </span>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
        {copied ? (
          <Check className="size-4" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
      </span>
    </button>
  )
}
