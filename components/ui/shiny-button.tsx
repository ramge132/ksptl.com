"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function ShinyButton({ children, className, ...props }: ShinyButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-gradient-primary text-white",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-200%] hover:before:translate-x-[200%]",
        "before:transition-transform before:duration-1000",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
