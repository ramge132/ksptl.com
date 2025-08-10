"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      if (now >= endTime) {
        setCount(value)
        return
      }

      const progress = (now - startTime) / duration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * value)
      
      setCount(currentCount)
      requestAnimationFrame(updateCount)
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
