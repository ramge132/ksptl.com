"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function InteractiveStunningBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement[]>([])
  const meshGradientRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationTimelines = useRef<gsap.core.Timeline[]>([])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!containerRef.current || !mounted) return
    
    // Initialize floating elements with continuous movement
    floatingElementsRef.current.forEach((element, index) => {
      if (!element) return
      
      const size = 60 + index * 15 // Reduced size
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight
      
      gsap.set(element, {
        x: startX,
        y: startY,
        width: size,
        height: size,
        xPercent: -50,
        yPercent: -50,
      })
      
      // Create infinite movement animation
      const createMovementAnimation = () => {
        const tl = gsap.timeline({ 
          repeat: -1,
          repeatRefresh: true,
          onRepeat: function() {
            // Refresh random values on each repeat
            this.invalidate()
          }
        })
        
        // Random circular/elliptical movement
        tl.to(element, {
          x: () => startX + (Math.random() * 300 - 150),
          y: () => startY + (Math.random() * 300 - 150),
          duration: 5 + Math.random() * 3,
          ease: "sine.inOut"
        })
        .to(element, {
          x: () => startX + (Math.random() * 300 - 150),
          y: () => startY + (Math.random() * 300 - 150),
          duration: 5 + Math.random() * 3,
          ease: "sine.inOut"
        })
        .to(element, {
          x: () => startX + (Math.random() * 300 - 150),
          y: () => startY + (Math.random() * 300 - 150),
          duration: 5 + Math.random() * 3,
          ease: "sine.inOut"
        })
        .to(element, {
          x: startX,
          y: startY,
          duration: 5 + Math.random() * 3,
          ease: "sine.inOut"
        })
        
        return tl
      }
      
      // Store timeline for later control
      animationTimelines.current[index] = createMovementAnimation()
      
      // Rotation animation - continuous
      gsap.to(element, {
        rotation: 360,
        duration: 15 + index * 3,
        repeat: -1,
        ease: "none"
      })
      
      // Scale breathing animation
      gsap.to(element, {
        scale: 1.3,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })
    
    // Mouse move handler - add subtle repel without stopping animation
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Subtle magnetic repel effect on elements
      floatingElementsRef.current.forEach((element, index) => {
        if (!element) return
        
        const rect = element.getBoundingClientRect()
        const elementCenterX = rect.left + rect.width / 2
        const elementCenterY = rect.top + rect.height / 2
        
        const dx = e.clientX - elementCenterX
        const dy = e.clientY - elementCenterY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) { // Smaller interaction range
          const force = (100 - distance) / 100
          const moveX = (dx / distance) * force * 30 // Reduced force
          const moveY = (dy / distance) * force * 30
          
          // Temporarily offset position without stopping main animation
          gsap.to(element, {
            xPercent: -50 - moveX / 2,
            yPercent: -50 - moveY / 2,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // Return to normal after mouse effect
              gsap.to(element, {
                xPercent: -50,
                yPercent: -50,
                duration: 1,
                ease: "power2.inOut"
              })
            }
          })
        }
      })
      
      // Update mesh gradient position - much smaller
      if (meshGradientRef.current) {
        const xPercent = (e.clientX / window.innerWidth) * 100
        const yPercent = (e.clientY / window.innerHeight) * 100
        
        gsap.to(meshGradientRef.current, {
          background: `
            radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(0, 102, 255, 0.02) 0%, transparent 15%),
            radial-gradient(circle at ${100 - xPercent}% ${100 - yPercent}%, rgba(51, 161, 255, 0.015) 0%, transparent 15%)
          `,
          duration: 0.8,
          ease: "power2.out",
        })
      }
    }
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      // Kill all animations on cleanup
      animationTimelines.current.forEach(tl => tl?.kill())
    }
  }, [mounted])
  
  if (!mounted) {
    return (
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-white" />
      </div>
    )
  }
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Base gradient with more impact */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20" />
      
      {/* Animated mesh gradient */}
      <div 
        ref={meshGradientRef}
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: `
            radial-gradient(at 30% 40%, rgba(0, 102, 255, 0.05) 0%, transparent 35%),
            radial-gradient(at 70% 20%, rgba(51, 161, 255, 0.04) 0%, transparent 35%),
            radial-gradient(at 20% 80%, rgba(0, 153, 255, 0.03) 0%, transparent 35%),
            radial-gradient(at 80% 60%, rgba(33, 133, 255, 0.025) 0%, transparent 40%)
          `,
          filter: 'blur(40px)',
        }}
      />
      
      {/* Glass morphism floating elements - borderless */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`float-${i}`}
            ref={el => {
              if (el) floatingElementsRef.current[i] = el
            }}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(${
                i % 3 === 0 ? '0, 102, 255' : i % 3 === 1 ? '51, 161, 255' : '0, 153, 255'
              }, ${0.06 + (i % 4) * 0.015}) 0%, rgba(255, 255, 255, 0.02) 100%)`,
              backdropFilter: 'blur(8px)',
              // No border or boxShadow for seamless blending
            }}
          />
        ))}
      </div>
      
      {/* Modern geometric patterns */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#0066FF" opacity="0.2">
                <animate attributeName="r" values="1;1.5;1" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#33A1FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0099FF" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Large animated circles for depth */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          </filter>
        </defs>
        
        <circle cx="20%" cy="30%" r="150" fill="#0066FF" opacity="0.02" filter="url(#blur)">
          <animate attributeName="r" values="150;180;150" dur="10s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 50,30; 0,0"
            dur="20s"
            repeatCount="indefinite" />
        </circle>
        
        <circle cx="80%" cy="70%" r="120" fill="#33A1FF" opacity="0.02" filter="url(#blur)">
          <animate attributeName="r" values="120;150;120" dur="12s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -40,20; 0,0"
            dur="18s"
            repeatCount="indefinite" />
        </circle>
        
        <circle cx="50%" cy="50%" r="180" fill="#0099FF" opacity="0.015" filter="url(#blur)">
          <animate attributeName="r" values="180;220;180" dur="15s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 30,-30; -30,30; 0,0"
            dur="25s"
            repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* Light beam effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div 
          className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              transparent, 
              rgba(0, 102, 255, 0.08), 
              transparent, 
              rgba(51, 161, 255, 0.08), 
              transparent
            )`,
            animation: 'spin 40s linear infinite',
          }}
        />
      </div>
      
      {/* Noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
