"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function GSAPHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<HTMLDivElement[]>([])
  const particlesRef = useRef<HTMLDivElement[]>([])
  
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const blobs = blobsRef.current
    const particles = particlesRef.current

    // Create floating gradient blobs animation
    const tl = gsap.timeline({ repeat: -1 })
    
    blobs.forEach((blob, index) => {
      // Random initial positions
      gsap.set(blob, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5,
      })

      // Floating animation
      gsap.to(blob, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        scale: 0.8 + Math.random() * 0.4,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
      })

      // Rotation animation
      gsap.to(blob, {
        rotation: 360,
        duration: 30 + Math.random() * 20,
        repeat: -1,
        ease: "none",
      })
    })

    // Create particles with mouse interaction
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.2,
      })

      // Floating particles
      gsap.to(particle, {
        y: `-=${window.innerHeight + 100}`,
        x: `+=${Math.random() * 200 - 100}`,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        ease: "none",
        delay: index * 0.1,
      })
    })

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // Move blobs away from mouse
      blobs.forEach((blob, index) => {
        const rect = blob.getBoundingClientRect()
        const blobX = rect.left + rect.width / 2
        const blobY = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(mouseX - blobX, 2) + Math.pow(mouseY - blobY, 2)
        )
        
        if (distance < 200) {
          const angle = Math.atan2(blobY - mouseY, blobX - mouseX)
          const force = (200 - distance) / 200
          
          gsap.to(blob, {
            x: `+=${Math.cos(angle) * force * 50}`,
            y: `+=${Math.sin(angle) * force * 50}`,
            duration: 0.5,
            overwrite: "auto",
          })
        }
      })

      // Parallax effect for particles
      particles.forEach((particle, index) => {
        const speed = 0.01 * (index + 1)
        gsap.to(particle, {
          x: `+=${(mouseX - window.innerWidth / 2) * speed}`,
          y: `+=${(mouseY - window.innerHeight / 2) * speed}`,
          duration: 1,
          overwrite: "auto",
        })
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      gsap.killTweensOf([...blobs, ...particles])
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50" />
      
      {/* Animated Gradient Blobs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`blob-${i}`}
          ref={el => {
            if (el) blobsRef.current[i] = el
          }}
          className="absolute w-[600px] h-[600px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 
                ? 'rgba(0, 102, 255, 0.3)' 
                : 'rgba(51, 161, 255, 0.3)'
            } 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}
      
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={el => {
            if (el) particlesRef.current[i] = el
          }}
          className="absolute"
        >
          <div 
            className="w-1 h-1 bg-blue-400 rounded-full"
            style={{
              boxShadow: '0 0 10px rgba(0, 102, 255, 0.5)',
            }}
          />
        </div>
      ))}
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 102, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  )
}
