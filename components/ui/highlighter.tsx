"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"
import { cn } from "@/lib/utils"

export type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

export interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number | [number, number] | [number, number, number, number]
  multiline?: boolean
  isView?: boolean
  className?: string
}

const DEFAULT_ACTION_COLORS: Record<AnnotationAction, string> = {
  highlight: "#ffd93d55",
  underline: "#4d96ff",
  box: "#6bcb77",
  circle: "#ff6b6b",
  "strike-through": "#9b51e0",
  "crossed-off": "#ff6b6b",
  bracket: "#4d96ff",
}

export function Highlighter({
  children,
  action = "highlight",
  color,
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = true,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-5%",
  })

  const effectiveColor = color || DEFAULT_ACTION_COLORS[action] || "#ffd93d55"
  const shouldShow = isMounted && (!isView || isInView)

  useEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color: effectiveColor,
        strokeWidth: action === "highlight" ? strokeWidth * 1.2 : strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      currentAnnotation.show()

      resizeObserver = new ResizeObserver(() => {
        currentAnnotation.hide()
        currentAnnotation.show()
      })

      resizeObserver.observe(element)
      if (document.body) {
        resizeObserver.observe(document.body)
      }
    }

    return () => {
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    effectiveColor,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span
      ref={elementRef}
      className={cn("relative inline-block bg-transparent leading-relaxed", className)}
    >
      {children}
    </span>
  )
}
