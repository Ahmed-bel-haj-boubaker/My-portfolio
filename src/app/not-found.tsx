import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { DotPattern } from "@/components/magicui/dot-pattern"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex flex-1 items-center overflow-hidden">
      <DotPattern
        width={24}
        height={24}
        className="text-border-strong/70 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent_75%)]"
      />
      <div className="container-page relative grid min-h-[80dvh] grid-cols-12 items-end gap-x-6 pt-32 pb-24">
        <div className="col-span-12 md:col-span-8">
          <p className="hero-fade font-mono text-sm text-muted-foreground">Error 404</p>
          <h1
            className="hero-fade mt-6 text-[clamp(3rem,10vw,8rem)] leading-[0.9] font-semibold tracking-[-0.055em]"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Nothing lives here.
          </h1>
          <p
            className="hero-fade mt-6 max-w-[40ch] text-lg text-muted-foreground"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            The page moved, or the link was mistyped. The work is still on the home page.
          </p>
          <div className="hero-fade mt-10" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <Button asChild className="h-12 rounded-full px-6">
              <Link href="/">
                <ArrowLeft
                  aria-hidden
                  className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:-translate-x-0.5"
                />
                Back home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
