"use client"

import dynamic from "next/dynamic"

import { useMediaQuery } from "@/lib/use-media-query"

const SiteDock = dynamic(() => import("./site-dock").then((mod) => mod.SiteDock), {
  ssr: false,
})

/** Fetches the dock (and its tooltip code) only on large, mouse-driven screens. */
export function SiteDockLoader() {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)")
  return desktop ? <SiteDock /> : null
}
