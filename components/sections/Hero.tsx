"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { motion, LayoutGroup } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GradientTextNew from "@/components/ui/gradient-text-new"
import CountUpNew from "@/components/ui/count-up-new"
import InteractiveStunningBackground from "@/components/ui/interactive-stunning-background"
import RotatingText from "@/components/ui/rotating-text"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  titleLine1?: string
  titleLine2?: string
  subtitle?: string
  description?: string
  feature1?: string
  feature2?: string
  feature3?: string
  buttonText?: string
  stat1Value?: string
  stat1Label?: string
  stat2Value?: string
  stat2Label?: string
  stat3Value?: string
  stat3Label?: string
  stat4Value?: string
  stat4Label?: string
}

export default function Hero({ 
  titleLine1 = "한국 안전용품",
  titleLine2 = "시험연구원",
  subtitle = "국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관",
  description = "KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다",
  feature1 = "KOLAS 공인 시험·교정 기관",
  feature2 = "국내 유일 통합 수행 기관",
  feature3 = "신속한 견적 및 처리",
  buttonText = "무료 견적 진행",
  stat1Value = "20+",
  stat1Label = "년 경력",
  stat2Value = "1,000+",
  stat2Label = "고객사",
  stat3Value = "5,000+",
  stat3Label = "작업 건수",
  stat4Value = "24H",
  stat4Label = "빠른 대응"
}: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const titleRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const features = [feature1, feature2, feature3]

  // 통계 숫자 추출 (애니메이션용)
  const extractNumber = (value: string) => {
    const match = value.match(/(\d+(?:,\d+)*)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 0;
  }

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
              {titleLine1}<br />
              {titleLine2}
            </GradientTextNew>
          </motion.div>

          {/* Subtitle with Rotating Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-bold mb-4 text-gray-800"
          >
            <LayoutGroup>
              <motion.div 
                className="inline-flex items-center justify-center gap-2"
                layout
                transition={{ 
                  layout: { 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 300,
                    mass: 0.5
                  }
                }}
              >
                <motion.span 
                  layout 
                  transition={{ 
                    layout: {
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      mass: 0.5
                    }
                  }}
                >
                  국내 유일
                </motion.span>
                <motion.div
                  layout
                  transition={{ 
                    layout: {
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      mass: 0.5
                    }
                  }}
                >
                  <RotatingText
                    texts={['시험기 제작', '공인 시험', '공인 교정']}
                    mainClassName="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#0066FF] to-[#0080FF] text-white rounded-md shadow-md shadow-blue-500/20"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    splitBy="words"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2500}
                    elementLevelClassName="inline-block"
                  />
                </motion.div>
                <motion.span 
                  layout 
                  transition={{ 
                    layout: {
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      mass: 0.5
                    }
                  }}
                >
                  전문기관
                </motion.span>
              </motion.div>
            </LayoutGroup>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            {description}
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
            <Link href="/tests?category=mask">
              <button className="relative group px-8 py-3 pl-10 pr-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0080FF] 
                               text-white font-semibold text-lg overflow-hidden transition-all duration-300 
                               hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]
                               shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                {/* Shiny effect on hover */}
                <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                
                {/* Text */}
                <span className="relative z-10">{buttonText}</span>
                
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
                <div className="text-3xl font-bold mb-1">
                  <GradientTextNew
                    colors={["#3B74EA", "#1A7FFF", "#5BA3FF", "#1A7FFF", "#3B74EA"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="inline-block"
                  >
                    {stat1Value.includes('+') || stat1Value.includes('H') ? (
                      <>
                        <CountUpNew to={extractNumber(stat1Value)} from={0} duration={2} separator={stat1Value.includes(',') ? ',' : ''} />
                        {stat1Value.replace(/[\d,]+/, '')}
                      </>
                    ) : (
                      stat1Value
                    )}
                  </GradientTextNew>
                </div>
                <div className="text-sm text-gray-600 font-bold">{stat1Label}</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold mb-1">
                  <GradientTextNew
                    colors={["#3B74EA", "#1A7FFF", "#5BA3FF", "#1A7FFF", "#3B74EA"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="inline-block"
                  >
                    {stat2Value.includes('+') || stat2Value.includes('H') ? (
                      <>
                        <CountUpNew to={extractNumber(stat2Value)} from={0} duration={2} separator={stat2Value.includes(',') ? ',' : ''} />
                        {stat2Value.replace(/[\d,]+/, '')}
                      </>
                    ) : (
                      stat2Value
                    )}
                  </GradientTextNew>
                </div>
                <div className="text-sm text-gray-600 font-bold">{stat2Label}</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold mb-1">
                  <GradientTextNew
                    colors={["#3B74EA", "#1A7FFF", "#5BA3FF", "#1A7FFF", "#3B74EA"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="inline-block"
                  >
                    {stat3Value.includes('+') || stat3Value.includes('H') ? (
                      <>
                        <CountUpNew to={extractNumber(stat3Value)} from={0} duration={2} separator={stat3Value.includes(',') ? ',' : ''} />
                        {stat3Value.replace(/[\d,]+/, '')}
                      </>
                    ) : (
                      stat3Value
                    )}
                  </GradientTextNew>
                </div>
                <div className="text-sm text-gray-600 font-bold">{stat3Label}</div>
              </div>
              <div className="stat-item text-center">
                <div className="text-3xl font-bold mb-1">
                  <GradientTextNew
                    colors={["#3B74EA", "#1A7FFF", "#5BA3FF", "#1A7FFF", "#3B74EA"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="inline-block"
                  >
                    {stat4Value.includes('+') || stat4Value.includes('H') ? (
                      <>
                        <CountUpNew to={extractNumber(stat4Value)} from={0} duration={2} separator={stat4Value.includes(',') ? ',' : ''} />
                        {stat4Value.replace(/[\d,]+/, '')}
                      </>
                    ) : (
                      stat4Value
                    )}
                  </GradientTextNew>
                </div>
                <div className="text-sm text-gray-600 font-bold">{stat4Label}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
