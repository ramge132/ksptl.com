"use client"

import { useEffect, useRef, useState } from "react"

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      alpha: number
      baseRadius: number
    }> = []

    const starCount = 250
    
    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() * 2 + 0.5
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        baseRadius: radius,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15,
        alpha: Math.random() * 0.8 + 0.2,
      })
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create blue gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(27, 100, 218, 0.15)")  // #1B64DA with opacity
      gradient.addColorStop(0.5, "rgba(0, 100, 255, 0.12)") // #0064FF with opacity
      gradient.addColorStop(1, "rgba(51, 161, 255, 0.1)")   // #33A1FF with opacity
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw stars with mouse interaction
      stars.forEach((star) => {
        star.x += star.vx
        star.y += star.vy
        
        if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx
        if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy
        
        // Mouse interaction - stars get bigger and brighter near cursor
        const dx = mousePos.x - star.x
        const dy = mousePos.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150
        
        if (distance < maxDistance) {
          const scale = 1 - (distance / maxDistance)
          star.radius = star.baseRadius + (star.baseRadius * scale * 2)
          star.alpha = Math.min(1, 0.3 + scale * 0.7)
          
          // Push stars away from cursor slightly
          const force = scale * 0.05
          star.x -= (dx / distance) * force
          star.y -= (dy / distance) * force
        } else {
          // Smoothly return to base size
          star.radius += (star.baseRadius - star.radius) * 0.1
          star.alpha += (0.3 - star.alpha) * 0.1
        }
        
        // Twinkle effect
        star.alpha += Math.random() * 0.02 - 0.01
        star.alpha = Math.max(0.1, Math.min(1, star.alpha))
        
        // Draw glow effect for bright stars
        if (star.alpha > 0.6) {
          ctx.beginPath()
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          )
          glowGradient.addColorStop(0, `rgba(100, 180, 255, ${star.alpha * 0.3})`)
          glowGradient.addColorStop(1, "rgba(100, 180, 255, 0)")
          ctx.fillStyle = glowGradient
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        const starGradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius
        )
        starGradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`)
        starGradient.addColorStop(1, `rgba(200, 220, 255, ${star.alpha * 0.5})`)
        ctx.fillStyle = starGradient
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
