import type Lenis from "lenis"

/**
 * Holds the running Lenis instance so callers can scroll through it without
 * importing Lenis itself (it's lazy-loaded, and only for mouse users).
 */
let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis() {
  return instance
}
