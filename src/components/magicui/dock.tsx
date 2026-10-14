"use client"

import React, { useRef } from "react"
import {
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from "motion/react"
import * as m from "motion/react-m"

import { cn } from "@/lib/utils"

/**
 * Magic UI Dock, restyled to the monochrome tokens. Magnification follows the
 * pointer on the x axis; pass `disableMagnification` for reduced motion.
 */
export interface DockProps {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 56
const DEFAULT_DISTANCE = 120

export function Dock({
  className,
  children,
  iconSize = DEFAULT_SIZE,
  iconMagnification = DEFAULT_MAGNIFICATION,
  disableMagnification = false,
  iconDistance = DEFAULT_DISTANCE,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-14 w-max items-end gap-1 rounded-full border border-border bg-background/75 p-2 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement<DockIconProps>(child) && child.type === DockIcon
          ? React.cloneElement(child, {
              mouseX,
              size: iconSize,
              magnification: disableMagnification ? iconSize : iconMagnification,
              distance: iconDistance,
            })
          : child
      )}
    </div>
  )
}

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
}

export function DockIcon({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fallbackX = useMotionValue(Infinity)

  const distanceFromCursor = useTransform(mouseX ?? fallbackX, (x: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return x - bounds.x - bounds.width / 2
  })
  const target = useTransform(
    distanceFromCursor,
    [-distance, 0, distance],
    [size, magnification, size]
  )
  const scaled = useSpring(target, { mass: 0.1, stiffness: 160, damping: 14 })

  return (
    <m.div
      ref={ref}
      style={{ width: scaled, height: scaled }}
      className={cn("flex aspect-square items-center justify-center", className)}
      {...props}
    >
      {children}
    </m.div>
  )
}
