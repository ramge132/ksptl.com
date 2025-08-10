"use client"

import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-[#1B64DA] via-[#0064FF] to-[#33A1FF] bg-clip-text text-transparent",
        "bg-[length:200%_auto] animate-gradient",
        className
      )}
    >
      {children}
    </span>
  )
}
