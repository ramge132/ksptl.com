"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function ModernWhiteBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const floatingShapesRef = useRef<HTMLDivElement[]>([])
  const gridRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // Fixed dimensions to avoid hydration mismatch
  const shapeDimensions = [
    { width: 120, height: 90 },
    { width: 80, height: 110 },
    { width: 100, height: 100 },
    { width: 130, height: 85 },
    { width: 60, height: 75 },
    { width: 90, height: 95 },
    { width: 140, height: 100 },
    { width: 70, height: 90 },
    { width: 110, height: 80 },
    { width: 95, height: 105 },
    { width: 85, height: 120 },
    { width: 125, height: 95 },
  ]
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!containerRef.current || !mounted) return

    // Animate floating geometric shapes
    const shapes = floatingShapesRef.current
    
    shapes.forEach((shape, index) => {
      // Set initial position based on index for consistency
      const startX = (index * 200) % window.innerWidth
      const startY = (index * 150) % window.innerHeight
      
      gsap.set(shape, {
        x: startX,
        y: startY,
        scale: 0,
        opacity: 0,
      })

      // Entrance animation
      gsap.to(shape, {
        scale: 1,
        opacity: 1,
        duration: 2,
        delay: index * 0.1,
        ease: "power2.out"
      })

      // Continuous floating animation with deterministic values
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      })

      const moveX = (index % 2 === 0 ? 100 : -100) + (index * 10)
      const moveY = (index % 2 === 0 ? -80 : 80) + (index * 8)
      const rotation = index * 30
      const duration = 15 + (index * 2)

      tl.to(shape, {
        x: `+=${moveX}`,
        y: `+=${moveY}`,
        rotation: rotation,
        duration: duration,
        ease: "sine.inOut",
      })
    })

    // Animate grid pattern
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        backgroundPosition: "100px 100px",
        duration: 20,
        repeat: -1,
        ease: "none"
      })
    }

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          x: `+=${mouseX * (10 + index * 2)}`,
          y: `+=${mouseY * (10 + index * 2)}`,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.killTweensOf(shapes)
    }
  }, [mounted])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Base gradient - very subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white" />
      
      {/* Subtle mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 via-transparent to-cyan-100/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-50/20 to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, #0066FF 1px, transparent 1px),
            linear-gradient(90deg, #0066FF 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating geometric shapes */}
      {mounted && shapeDimensions.map((dims, i) => (
        <div
          key={`shape-${i}`}
          ref={el => {
            if (el) floatingShapesRef.current[i] = el
          }}
          className="absolute"
          style={{
            width: `${dims.width}px`,
            height: `${dims.height}px`,
          }}
        >
          {i % 4 === 0 ? (
            // Circle with gradient
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  i % 2 === 0 
                    ? 'rgba(0, 102, 255, 0.05)' 
                    : 'rgba(51, 161, 255, 0.05)'
                } 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
          ) : i % 4 === 1 ? (
            // Square with gradient
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, rgba(0, 102, 255, 0.03) 0%, transparent 100%)`,
                transform: 'rotate(45deg)',
                filter: 'blur(15px)',
              }}
            />
          ) : i % 4 === 2 ? (
            // Triangle
            <div 
              className="w-0 h-0"
              style={{
                borderLeft: '25px solid transparent',
                borderRight: '25px solid transparent',
                borderBottom: '50px solid rgba(51, 161, 255, 0.04)',
                filter: 'blur(10px)',
              }}
            />
          ) : (
            // Hexagon
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <polygon 
                points="50,10 85,30 85,70 50,90 15,70 15,30"
                fill="rgba(0, 102, 255, 0.03)"
                style={{ filter: 'blur(12px)' }}
              />
            </svg>
          )}
        </div>
      ))}

      {/* Radial gradient overlay - very subtle */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
          style={{
            background: 'radial-gradient(circle, transparent 0%, rgba(255, 255, 255, 0.8) 70%)',
          }}
        />
      </div>

      {/* Animated light rays - very subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.015]">
        <div className="absolute -top-1/2 left-1/4 w-96 h-[200%] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform rotate-12 animate-pulse" />
        <div className="absolute -top-1/2 right-1/4 w-96 h-[200%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #0066FF 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.01] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
