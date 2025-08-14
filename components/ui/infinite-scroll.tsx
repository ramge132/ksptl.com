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

    // Create style element for animations
    const styleId = `infinite-scroll-${Math.random().toString(36).substr(2, 9)}`
    const styleElement = document.createElement('style')
    styleElement.id = styleId
    styleElement.textContent = `
      @keyframes scroll-${styleId} {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      .scroll-content-${styleId} {
        animation: scroll-${styleId} ${duration}s linear infinite;
      }
    `
    document.head.appendChild(styleElement)

    scrollContent.classList.add(`scroll-content-${styleId}`)
    clone.classList.add(`scroll-content-${styleId}`)

    return () => {
      const style = document.getElementById(styleId)
      if (style) {
        style.remove()
      }
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
    </div>
  )
}
