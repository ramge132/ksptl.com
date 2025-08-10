"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function ImpactfulWhiteBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<HTMLDivElement>(null)
  const orbitRefs = useRef<HTMLDivElement[]>([])
  const glassCardsRef = useRef<HTMLDivElement[]>([])
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (!containerRef.current || !mounted) return

    // Animate mesh gradient
    if (meshRef.current) {
      gsap.to(meshRef.current, {
        backgroundPosition: "200% 200%",
        duration: 25,
        repeat: -1,
        ease: "none"
      })
    }

    // Animate orbiting elements
    orbitRefs.current.forEach((orb, index) => {
      if (!orb) return
      
      // Set initial position
      const angle = (index * 360) / 4
      const radius = 300 + index * 50
      
      gsap.set(orb, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0
      })
      
      // Entrance animation
      gsap.to(orb, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: index * 0.2,
        ease: "elastic.out(1, 0.5)"
      })
      
      // Orbiting animation
      gsap.to(orb, {
        rotation: 360,
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none",
        transformOrigin: `${-radius}px center`
      })
      
      // Pulsing animation
      gsap.to(orb, {
        scale: 1.2,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })

    // Animate glass cards
    glassCardsRef.current.forEach((card, index) => {
      if (!card) return
      
      gsap.set(card, {
        opacity: 0,
        y: 100,
        rotateX: -45
      })
      
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        delay: 0.5 + index * 0.1,
        ease: "power3.out"
      })
      
      // Floating animation
      gsap.to(card, {
        y: -20,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3
      })
    })

    // Mouse parallax for entire scene
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      
      if (meshRef.current) {
        gsap.to(meshRef.current, {
          x: mouseX * 30,
          y: mouseY * 30,
          duration: 1,
          ease: "power2.out"
        })
      }
      
      orbitRefs.current.forEach((orb, index) => {
        if (!orb) return
        gsap.to(orb, {
          x: mouseX * (20 + index * 5),
          y: mouseY * (20 + index * 5),
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto"
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
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
      {/* Base gradient - subtle white to blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/10 to-white" />
      
      {/* Powerful mesh gradient background */}
      <div 
        ref={meshRef}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(0, 102, 255, 0.15) 0%, transparent 50%),
            radial-gradient(at 80% 70%, rgba(51, 161, 255, 0.12) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(0, 153, 255, 0.08) 0%, transparent 70%),
            radial-gradient(at 30% 80%, rgba(0, 119, 255, 0.10) 0%, transparent 40%),
            radial-gradient(at 70% 20%, rgba(102, 178, 255, 0.12) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Dynamic wave pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#33A1FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z"
          fill="url(#wave-gradient)"
        >
          <animate
            attributeName="d"
            values="
              M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z;
              M0,350 C360,450 720,250 1440,350 L1440,800 L0,800 Z;
              M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z
            "
            dur="15s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,500 C480,400 960,600 1440,500 L1440,800 L0,800 Z"
          fill="url(#wave-gradient)"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            values="
              M0,500 C480,400 960,600 1440,500 L1440,800 L0,800 Z;
              M0,450 C480,550 960,350 1440,450 L1440,800 L0,800 Z;
              M0,500 C480,400 960,600 1440,500 L1440,800 L0,800 Z
            "
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      
      {/* 3D Orbiting elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-[800px]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`orbit-${i}`}
              ref={el => {
                if (el) orbitRefs.current[i] = el
              }}
              className="absolute top-1/2 left-1/2"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
              }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: `
                    radial-gradient(circle at 30% 30%, 
                      rgba(${i % 2 === 0 ? '0, 102, 255' : '51, 161, 255'}, ${0.3 - i * 0.05}) 0%, 
                      rgba(${i % 2 === 0 ? '0, 102, 255' : '51, 161, 255'}, ${0.1 - i * 0.02}) 50%,
                      transparent 70%
                    )
                  `,
                  boxShadow: `
                    0 0 ${40 + i * 10}px rgba(0, 102, 255, ${0.2 - i * 0.03}),
                    inset 0 0 ${20 + i * 5}px rgba(255, 255, 255, ${0.5 - i * 0.1})
                  `,
                  backdropFilter: 'blur(10px)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Glassmorphism cards floating */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '10%', left: '15%', width: 180, height: 120, rotate: -15 },
          { top: '20%', right: '20%', width: 150, height: 100, rotate: 10 },
          { bottom: '25%', left: '10%', width: 140, height: 110, rotate: -8 },
          { bottom: '15%', right: '15%', width: 160, height: 90, rotate: 12 },
          { top: '40%', left: '5%', width: 120, height: 80, rotate: -5 },
          { top: '30%', right: '10%', width: 130, height: 85, rotate: 15 },
        ].map((style, i) => (
          <div
            key={`glass-${i}`}
            ref={el => {
              if (el) glassCardsRef.current[i] = el
            }}
            className="absolute"
            style={{
              top: (style as any).top,
              bottom: (style as any).bottom,
              left: (style as any).left,
              right: (style as any).right,
              width: `${style.width}px`,
              height: `${style.height}px`,
              transform: `rotate(${style.rotate}deg)`,
            }}
          >
            <div 
              className="w-full h-full rounded-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.5) 0%, 
                    rgba(255, 255, 255, 0.2) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: `
                  0 8px 32px rgba(0, 102, 255, 0.08),
                  inset 0 0 20px rgba(255, 255, 255, 0.5)
                `,
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, #0066FF 0.5px, transparent 0.5px),
            linear-gradient(90deg, #0066FF 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center center',
        }}
      />
      
      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute top-0 right-1/3 w-3 h-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-blue-300/10 to-transparent animate-pulse"
          style={{ animationDuration: '3s', animationDelay: '2s' }}
        />
      </div>
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
