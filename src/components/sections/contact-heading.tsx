"use client"

import { useReducedMotion, type Variants } from "motion/react"

import { EASE } from "@/lib/motion"
import { TextAnimate } from "@/components/magicui/text-animate"

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
}

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

export function ContactHeading({ id, children }: { id: string; children: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <TextAnimate
      as="h2"
      id={id}
      by="word"
      once
      duration={0.5}
      variants={reduceMotion ? fadeOnly : wordReveal}
      className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]"
    >
      {children}
    </TextAnimate>
  )
}
