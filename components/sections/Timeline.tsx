"use client"

import { motion } from "framer-motion"
import { Calendar, Award, Rocket, Building, Target, Star } from "lucide-react"

// 아이콘 매핑
const iconMap = {
  Building: Building,
  Award: Award,
  Star: Star,
  Rocket: Rocket,
  Target: Target,
  Calendar: Calendar,
}

// 기본 데이터 (Sanity 비활성화)
const timelineData = [
  {
    year: "2004",
    title: "㈜큐로 설립",
    description: "시험기 제작 전문 기업으로 출발",
    icon: "Building",
  },
  {
    year: "2009",
    title: "ISO 9001 인증",
    description: "국제 품질경영시스템 인증 획득",
    icon: "Star",
  },
  {
    year: "2013",
    title: "KS 인증 획득",
    description: "KS B 5521, 5533, 5541 인증 취득",
    icon: "Award",
  },
  {
    year: "2015",
    title: "연구개발전담부서 인정",
    description: "기술 혁신을 위한 R&D 부서 설립",
    icon: "Rocket",
  },
  {
    year: "2019",
    title: "시험소 확장",
    description: "양주시 화합로에 독립 시험소 개소",
    icon: "Building",
  },
  {
    year: "2020",
    title: "KOLAS 공인기관 인정",
    description: "KC23-420 교정기관 인정 획득",
    icon: "Award",
  },
  {
    year: "2023",
    title: "통합 서비스 출범",
    description: "시험기 제작·시험·교정 원스톱 서비스",
    icon: "Target",
  },
  {
    year: "2025",
    title: "한국안전용품시험연구원",
    description: "공인 시험·교정 전문기관으로 도약",
    icon: "Star",
  },
]

export default function Timeline() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">20년</span>의 역사
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            끊임없는 혁신과 도전으로 성장해온 발자취
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden lg:block" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div
                    className={`p-6 rounded-xl border bg-card hover-lift ${
                      index % 2 === 0 ? "lg:mr-8 lg:text-right" : "lg:ml-8"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-4 mb-3 ${
                        index % 2 === 0 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-gradient-primary-light">
                        {(() => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Building
                          return <IconComponent className="h-5 w-5 text-primary" />
                        })()}
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gradient">{item.year}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>

                {/* Empty Space for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
