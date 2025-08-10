"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Shield, Award, Users, Clock, CheckCircle, Zap, Wrench } from "lucide-react"
import { Card } from "@/components/ui/card"
import ScrollFloat from "@/components/ui/scroll-float"
import RotatingText from "@/components/ui/rotating-text"

const reasons = [
  {
    icon: Shield,
    title: "KOLAS 공인 인증",
    description: "국가공인 시험·교정 기관으로 신뢰할 수 있는 성적서 발급",
    highlight: "KC23-420",
  },
  {
    icon: Wrench,
    title: "국내 유일 통합 수행",
    description: "시험기 제작부터 시험·교정까지 원스톱 서비스 제공",
    highlight: "One-Stop",
  },
  {
    icon: Clock,
    title: "신속한 처리",
    description: "빠른 견적 제공과 신속한 시험·교정 처리로 업무 효율성 극대화",
    highlight: "Fast",
  },
  {
    icon: Award,
    title: "20년 전문성",
    description: "축적된 기술력과 경험으로 정확한 결과 보장",
    highlight: "Since 2006",
  },
  {
    icon: Users,
    title: "맞춤형 대응",
    description: "고객사별 특성에 맞는 맞춤형 솔루션 제공",
    highlight: "Custom",
  },
  {
    icon: CheckCircle,
    title: "국제 표준 준수",
    description: "KS, ISO, CE 인증으로 국제 표준 품질 보증",
    highlight: "Global",
  },
]

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return
      const rect = divRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      divRef.current.style.setProperty("--mouse-x", `${x}px`)
      divRef.current.style.setProperty("--mouse-y", `${y}px`)
    }

    const div = divRef.current
    if (div) {
      div.addEventListener("mousemove", handleMouseMove)
      return () => div.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={divRef} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mb-8 px-4">
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <ScrollFloat
                containerClassName="block"
                textClassName="!text-5xl !md:text-6xl !lg:text-7xl !xl:text-8xl !font-bold !leading-tight"
                animationDuration={1.5}
                ease="power2.out"
                scrollStart="top bottom"
                scrollEnd="center center"
                stagger={0.018}
              >
                <>
                  왜{" "}
                  <span className="bg-gradient-to-r from-[#0066FF] via-[#0080FF] to-[#33A1FF] bg-clip-text text-transparent">
                    한국안전용품시험연구원
                  </span>
                  을 선택해야 할까요?
                </>
              </ScrollFloat>
            </div>
          </div>
          
          {/* Rotating Text Feature - 바로 아래 배치 */}
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-medium mb-8">
            <span>우리는</span>
            <RotatingText
              texts={["정확합니다", "신속합니다", "전문적입니다", "신뢰할 수 있습니다"]}
              mainClassName="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-primary font-bold rounded-lg overflow-hidden inline-flex"
              splitLevelClassName="overflow-hidden pb-0.5"
              elementLevelClassName=""
              splitBy="words"
              rotationInterval={2000}
              staggerDuration={0.025}
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              animatePresenceMode="wait"
              animatePresenceInitial={false}
            />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            국내 유일의 통합 서비스로 시간과 비용을 절감하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary-light">
                      <reason.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{reason.title}</h3>
                      <span className="text-xs font-medium text-primary bg-gradient-primary-light px-2 py-1 rounded">
                        {reason.highlight}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm flex-1">{reason.description}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
