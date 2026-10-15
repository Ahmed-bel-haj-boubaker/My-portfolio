import { cn } from "@/lib/utils"

/**
 * The mark: three points (web, mobile, automation) joined by one continuous
 * line. Drawn on a 100-unit grid; inherits the current text color, so the
 * same SVG works in both themes.
 */
export const LOGO_PATH = "M17 24H48C55 24 59 30 59 36C59 42 56 47 52 50L83 77"
export const LOGO_DOTS = [
  { cx: 17, cy: 24, r: 7 },
  { cx: 52, cy: 50, r: 7 },
  { cx: 83, cy: 77, r: 7.5 },
]

/** Standalone SVG data URI, for places without CSS (OG image, app icon). */
export function logoDataUri(color: string, strokeWidth = 4.5) {
  const dots = LOGO_DOTS.map(
    ({ cx, cy, r }) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`
  ).join("")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${LOGO_PATH}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>${dots}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("size-8", className)}>
      <path
        d={LOGO_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {LOGO_DOTS.map((dot) => (
        <circle key={dot.cx} {...dot} fill="currentColor" />
      ))}
    </svg>
  )
}
