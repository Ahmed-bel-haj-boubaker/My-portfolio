"use client"

import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"

import { setLenis } from "@/lib/lenis-store"

function LenisBridge() {
  const lenis = useLenis()
  useEffect(() => {
    setLenis(lenis ?? null)
    return () => setLenis(null)
  }, [lenis])
  return null
}

/** Root smooth scrolling. Loaded lazily by <Providers> for mouse users only. */
export default function SmoothScroll() {
  return (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: true }}>
      <LenisBridge />
    </ReactLenis>
  )
}
