"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CheckCircle2, Award, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GradientTextNew from "@/components/ui/gradient-text-new"
import CountUpNew from "@/components/ui/count-up-new"
import InteractiveStunningBackground from "@/components/ui/interactive-stunning-background"

gsap.registerPlugin(ScrollTrigger)

const features = [
  "KOLAS 공인 시험·교정 기관",
  "국내 유일 통합 수행 기관",
  "신속한 견적 및 처리",
]

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const titleRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // GSAP Title Animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char')
      gsap.fromTo(chars, 
        { 
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.02,
          delay: 0.5,
        }
      )
    }

    // Features animation with ScrollTrigger
    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.feature-item')
      gsap.fromTo(features,
        { 
          x: -50,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          }
        }
      )
    }

    // Stats counter animation with ScrollTrigger
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-item')
      gsap.fromTo(stats,
        { 
          y: 50,
          opacity: 0,
          scale: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      )
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Stunning Background */}
      <InteractiveStunningBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Title with Gradient Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-title text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <GradientTextNew
              colors={["#1B64DA", "#0064FF", "#33A1FF", "#0064FF", "#1B64DA"]}
              animationSpeed={5}
              showBorder={false}
            >
              한국 안전용품<br />
              시험연구원
            </GradientTextNew>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-medium mb-4 text-gray-800"
          >
            국내 유일 시험기 제작·시험·교정 통합 수행기관
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다
          </motion.p>

          {/* Features */}
          <div
            ref={featuresRef}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {features.map((feature, index) => (
              <div key={index} className="feature-item flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
          >
            <Link href="/apply">
              <button className="relative group px-8 py-3 pl-10 pr-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0080FF] 
                               text-white font-semibold text-lg overflow-hidden transition-all duration-300 
                               hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]
                               shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                {/* Shiny effect on hover */}
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                
                {/* Text */}
                <span className="relative z-10">무료 견적 진행</span>
                
                {/* Circle with arrow */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center
                              group-hover:bg-white/90 transition-all duration-300">
                  <svg className="w-5 h-5 text-[#0066FF] transition-transform duration-300 group-hover:translate-x-0.5" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <div
            ref={statsRef}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-item text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <CountUpNew to={20} from={0} duration={2} separator="" />+
                </div>
                <div className="text-sm text-gray-600">년 경력</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <CountUpNew to={1000} from={0} duration={2} separator="," />+
                </div>
                <div className="text-sm text-gray-600">고객사</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <CountUpNew to={50000} from={0} duration={2} separator="," />+
                </div>
                <div className="text-sm text-gray-600">시험 건수</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <CountUpNew to={24} from={0} duration={2} separator="" />H
                </div>
                <div className="text-sm text-gray-600">빠른 대응</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
