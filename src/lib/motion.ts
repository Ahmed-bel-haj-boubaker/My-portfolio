/** Shared motion language: one easing curve, short calm durations. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const

export const VIEWPORT = { once: true, amount: 0.2 } as const
