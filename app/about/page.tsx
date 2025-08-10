"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Award, Target, Users, CheckCircle, Shield } from "lucide-react"
import Image from "next/image"
import { getAboutPage, type AboutPage } from "@/lib/sanity-extended"

const values = [
  {
    icon: Shield,
    title: "신뢰성",
    description: "KOLAS 공인 기관으로서 정확하고 신뢰할 수 있는 서비스 제공"
  },
  {
    icon: Target,
    title: "전문성",
    description: "20년간 축적된 기술력과 노하우로 최고의 품질 보장"
  },
  {
    icon: Users,
    title: "고객중심",
    description: "고객의 성공을 위한 맞춤형 솔루션 제공"
  },
]

const businessAreas = [
  {
    title: "시험기 제작",
    description: "전 분야 시험기 주문 제작",
    items: ["재료시험기", "안전용품시험기", "가구시험기", "자동차시험기"]
  },
  {
    title: "활선접근경보기",
    description: "전압 노출시 사용자를 감전으로부터 보호",
    items: ["고압 감지", "경보 시스템", "안전 장비"]
  },
  {
    title: "교정검사",
    description: "KOLAS 공인교정기관 / 교정성적서 발급",
    items: ["정밀 교정", "성적서 발급", "국가 공인"]
  },
  {
    title: "시험",
    description: "KOLAS 공인시험기관 / 시험성적서 발급",
    items: ["안전용품 시험", "재료 시험", "인증 시험"]
  },
]

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutPage | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutPage()
      setAboutData(data)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-4" variant="outline">
              <Building2 className="w-3 h-3 mr-1" />
              Since 1994
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">한국안전용품시험연구원</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              국내 유일 시험기 제작·시험·교정 통합 수행기관
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                시험기 제작부터 시험·교정까지<br />
                <span className="text-gradient">원스톱 토탈 솔루션</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ㈜큐로는 시험기 제작 전문 기업으로 대한민국 표준 KS B 5541, KS B 5521, KS B 5533 인증과
                  국제 표준 ISO 9001:2015, CE를 인증 받아 금속(재료) 시험기, 가구 시험기, 안전용품 시험기,
                  스포츠용품 시험기, 화학 관련 시험기, 자동차 관련 시험기, 챔버 등을 앞선 기술력으로 제작하고 있습니다.
                </p>
                <p>
                  시험기 제작으로 축적한 기술력과 경험을 바탕으로 교정검사 및 시험 서비스 분야로 사업 영역을 확장하여,
                  국내외 규격에 부합하는 정밀 교정과 종합 시험을 전문적으로 수행합니다.
                </p>
                <p>
                  독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 정확도와 효율성을 극대화하여
                  고객 성공을 위한 최고의 서비스를 제공합니다.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-primary-light">
                {aboutData?.companyImage ? (
                  <img 
                    src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${aboutData.companyImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                    alt="회사 대표 이미지"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-32 h-32 text-primary/20" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">20년 전통</p>
                    <p className="text-sm text-muted-foreground">신뢰의 파트너</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">핵심 가치</h2>
            <p className="text-muted-foreground">고객과 함께 성장하는 기업</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary-light flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">사업 분야</h2>
            <p className="text-muted-foreground">시험기 제작부터 시험·교정까지 토탈 서비스</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-lift">
                  <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{area.description}</p>
                  <ul className="space-y-1">
                    {area.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">시험 절차</h2>
            <p className="text-muted-foreground">간단하고 빠른 프로세스</p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center max-w-3xl mx-auto">
            {["접수", "시험·교정", "성적서 발급", "납품"].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-xl mb-3">
                    {index + 1}
                  </div>
                  <p className="font-semibold">{step}</p>
                </div>
                {index < 3 && (
                  <motion.div 
                    className="hidden md:flex items-center mx-8 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Modern dotted line */}
                    <div className="flex items-center space-x-1">
                      {[...Array(8)].map((_, dotIndex) => (
                        <motion.div
                          key={dotIndex}
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary/40 to-primary/60"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1, 1, 0],
                            opacity: [0, 0.4, 0.8, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: dotIndex * 0.1 + index * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
