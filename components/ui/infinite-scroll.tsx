"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface InfiniteScrollProps {
  items: React.ReactNode[]
  className?: string
  speed?: number
}

export function InfiniteScroll({ items, className, speed = 30 }: InfiniteScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = scrollContainer.querySelector(".scroll-content") as HTMLElement
    if (!scrollContent) return

    // Clone items for seamless loop
    const clone = scrollContent.cloneNode(true) as HTMLElement
    clone.classList.add("scroll-content-clone")
    scrollContainer.appendChild(clone)

    // Set animation
    const totalWidth = scrollContent.offsetWidth
    const duration = totalWidth / speed

    scrollContent.style.animation = `scroll ${duration}s linear infinite`
    clone.style.animation = `scroll ${duration}s linear infinite`

    return () => {
      if (clone.parentNode) {
        clone.parentNode.removeChild(clone)
      }
    }
  }, [items, speed])

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={scrollRef} className="flex gap-8 relative">
        <div className="scroll-content flex gap-8 shrink-0">
          {items.map((item, index) => (
            <div key={index} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
