"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function StunningBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wavesRef = useRef<SVGSVGElement>(null)
  const orbsRef = useRef<HTMLDivElement[]>([])
  
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system for canvas
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = Math.random() > 0.5 ? '#0066FF' : '#33A1FF'
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 10)
        gradient.addColorStop(0, this.color + '40')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 10, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle())
    }

    // Connection lines between particles
    const drawConnections = () => {
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + 
            Math.pow(particle.y - other.y, 2)
          )
          
          if (distance < 100) {
            if (!ctx) return
            ctx.globalAlpha = (1 - distance / 100) * 0.2
            ctx.strokeStyle = '#0066FF'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      drawConnections()
      requestAnimationFrame(animate)
    }
    animate()

    // GSAP Animations for orbs
    const orbs = orbsRef.current
    
    orbs.forEach((orb, index) => {
      // Set initial random position
      gsap.set(orb, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0,
        opacity: 0,
      })

      // Entrance animation
      gsap.to(orb, {
        scale: 1,
        opacity: 0.6,
        duration: 2,
        delay: index * 0.2,
        ease: "power2.out"
      })

      // Floating animation
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      })

      tl.to(orb, {
        x: `+=${Math.random() * 300 - 150}`,
        y: `+=${Math.random() * 300 - 150}`,
        duration: 10 + Math.random() * 10,
        ease: "sine.inOut",
      })
      .to(orb, {
        scale: 0.8 + Math.random() * 0.4,
        duration: 5 + Math.random() * 5,
        ease: "sine.inOut",
      }, 0)
      .to(orb, {
        rotation: Math.random() * 360,
        duration: 15 + Math.random() * 10,
        ease: "none",
      }, 0)
    })

    // SVG Waves animation
    if (wavesRef.current) {
      const paths = wavesRef.current.querySelectorAll('path')
      paths.forEach((path, index) => {
        const morphTo = path.getAttribute('data-morph')
        if (morphTo) {
          gsap.to(path, {
            attr: {
              d: morphTo
            },
            duration: 10 + index * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      })
    }

    // Mouse interaction - ripple effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // Create ripple
      const ripple = document.createElement('div')
      ripple.className = 'ripple'
      ripple.style.left = mouseX + 'px'
      ripple.style.top = mouseY + 'px'
      containerRef.current?.appendChild(ripple)
      
      gsap.fromTo(ripple, {
        width: 0,
        height: 0,
        opacity: 0.5,
        x: -50,
        y: -50,
      }, {
        width: 100,
        height: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.killTweensOf(orbs)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-purple-600/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 via-transparent to-indigo-600/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Canvas for particle network */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
      />

      {/* Glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={el => {
            if (el) orbsRef.current[i] = el
          }}
          className="absolute w-[400px] h-[400px]"
          style={{
            background: `radial-gradient(circle, ${
              i % 3 === 0 
                ? 'rgba(0, 102, 255, 0.4)' 
                : i % 3 === 1
                ? 'rgba(100, 200, 255, 0.4)'
                : 'rgba(150, 100, 255, 0.4)'
            } 0%, transparent 70%)`,
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* SVG Waves */}
      <svg 
        ref={wavesRef}
        className="absolute bottom-0 left-0 right-0 h-[50vh] opacity-20"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,400 L0,400 Z"
          data-morph="M0,150 C240,100 480,200 720,150 C960,100 1200,200 1440,150 L1440,400 L0,400 Z"
          fill="url(#wave-gradient-1)"
        />
        <path
          d="M0,200 C240,250 480,150 720,200 C960,250 1200,150 1440,200 L1440,400 L0,400 Z"
          data-morph="M0,250 C240,200 480,300 720,250 C960,200 1200,300 1440,250 L1440,400 L0,400 Z"
          fill="url(#wave-gradient-2)"
          style={{ animationDelay: '0.5s' }}
        />
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#33A1FF" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#33A1FF" />
            <stop offset="100%" stopColor="#6B8CFF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Light rays effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-400 via-transparent to-transparent animate-pulse" />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-indigo-400 via-transparent to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(0, 102, 255, 0.5);
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
