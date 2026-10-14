"use client"

import { useEffect } from "react"

const SELECTOR = "[data-reveal]:not([data-revealed])"

/**
 * One IntersectionObserver for every <BlurFade> on the page. Marks elements
 * as revealed once 20% of them is visible, and picks up elements added later
 * (route changes, streamed content).
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-revealed", "")
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    const observeAll = (root: ParentNode) =>
      root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))
    observeAll(document)

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(SELECTOR)) io.observe(node)
          observeAll(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
