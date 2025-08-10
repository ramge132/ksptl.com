"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  HardHat,
  Footprints,
  Shirt,
  AlertTriangle,
  Wrench,
  ClipboardCheck,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

const testCategories = {
  mask: {
    name: "마스크",
    icon: Shield,
    description: "방진, 방독, 송기마스크 전문 시험",
    items: [
      {
        type: "방진마스크",
        tests: [
          "강도 신장율 시험",
          "투시부 내충격성",
          "여과재 질량",
          "분진 포집효율",
          "흡기저항",
          "배기저항",
        ],
      },
      {
        type: "방독마스크",
        tests: [
          "제독능력",
          "통기저항",
          "누설률",
          "시야",
          "음성전달",
          "내충격성",
        ],
      },
      {
        type: "송기마스크",
        tests: [
          "공기공급량",
          "소음레벨",
          "이산화탄소농도",
          "온도상승",
          "경보장치작동",
        ],
      },
    ],
  },
  shoes: {
    name: "안전화",
    icon: Footprints,
    description: "가죽제, 고무제, 정전기안전화 시험",
    items: [
      {
        type: "가죽제 안전화",
        tests: [
          "내압박성 시험",
          "내충격성 시험",
          "박리저항시험",
          "뒤꿈치 충격에너지 흡수",
          "미끄럼 저항",
          "굽 피로시험",
        ],
      },
      {
        type: "고무제 안전화",
        tests: [
          "인장강도",
          "신장율",
          "경도",
          "노화시험",
          "굴곡시험",
          "접착력",
        ],
      },
      {
        type: "정전기안전화",
        tests: [
          "전기저항",
          "정전용량",
          "누설전류",
          "대전압",
          "방전시간",
        ],
      },
      {
        type: "절연화",
        tests: [
          "내전압시험",
          "누설전류",
          "절연저항",
          "내아크성",
        ],
      },
    ],
  },
  clothing: {
    name: "보호복",
    icon: Shirt,
    description: "방열복, 화학물질용 보호복 시험",
    items: [
      {
        type: "방열복",
        tests: [
          "난연성 시험",
          "인장강도 시험",
          "내열성 시험",
          "복사열 차단",
          "화염 접촉시험",
          "열전달 지수",
        ],
      },
      {
        type: "화학물질용 보호복",
        tests: [
          "투과저항",
          "침투저항",
          "인장강도",
          "인열강도",
          "마모저항",
          "굴곡균열",
        ],
      },
    ],
  },
  harness: {
    name: "추락방지대",
    icon: AlertTriangle,
    description: "추락방지대 전문 시험",
    items: [
      {
        type: "추락방지대",
        tests: [
          "구조검사",
          "인장강도 시험",
          "동하중성능",
          "정하중시험",
          "부속품 강도",
          "충격흡수장치",
        ],
      },
    ],
  },
  helmet: {
    name: "안전모",
    icon: HardHat,
    description: "AB형, AE형, ABE형 안전모 시험",
    items: [
      {
        type: "AB형 안전모",
        tests: [
          "내관통성 시험",
          "충격흡수성",
          "난연성 시험",
          "내수성",
          "내한성",
        ],
      },
      {
        type: "AE형 안전모",
        tests: [
          "절연성능",
          "내전압",
          "누설전류",
          "충격흡수성",
        ],
      },
      {
        type: "ABE형 안전모",
        tests: [
          "종합성능시험",
          "내관통성",
          "충격흡수성",
          "절연성능",
          "난연성",
        ],
      },
    ],
  },
  belt: {
    name: "안전대",
    icon: Wrench,
    description: "벨트식, 그네식, 안전블럭 시험",
    items: [
      {
        type: "벨트식 안전대",
        tests: [
          "구조검사",
          "인장강도 시험",
          "충격흡수",
          "버클강도",
          "D링 강도",
        ],
      },
      {
        type: "그네식 안전대",
        tests: [
          "구조검사",
          "인장강도",
          "정하중시험",
          "동하중시험",
          "부속품검사",
        ],
      },
      {
        type: "안전블럭",
        tests: [
          "제동성능",
          "내구성",
          "충격흡수",
          "와이어로프 강도",
          "리트랙터 성능",
        ],
      },
    ],
  },
}

export default function TestsPage() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("mask")

  useEffect(() => {
    const category = searchParams.get("category")
    if (category && category in testCategories) {
      setActiveCategory(category)
    }
  }, [searchParams])

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
              <ClipboardCheck className="w-3 h-3 mr-1" />
              KOLAS 공인시험
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">시험·교정</span> 서비스
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              국가 공인 시험기관으로서 정확하고 신뢰할 수 있는 시험 서비스를 제공합니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2">
              {Object.entries(testCategories).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <category.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(testCategories).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary-light mb-4">
                      <category.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{category.name} 시험</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  {/* Test Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="p-6 h-full hover-lift">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-primary" />
                            {item.type}
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {item.tests.map((test, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm">{test}</span>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-primary-light border-primary/20">
              <h3 className="text-2xl font-bold mb-4">시험·교정 신청하기</h3>
              <p className="text-muted-foreground mb-6">
                온라인으로 간편하게 신청하고, 24시간 내 견적을 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90">
                    온라인 신청
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button size="lg" variant="outline">
                    문의하기
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">KOLAS 공인</h4>
              <p className="text-sm text-muted-foreground">
                국가공인 시험기관으로 신뢰할 수 있는 성적서 발급
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">정확한 시험</h4>
              <p className="text-sm text-muted-foreground">
                최신 장비와 전문 인력으로 정확한 시험 수행
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">빠른 처리</h4>
              <p className="text-sm text-muted-foreground">
                신속한 시험 진행과 성적서 발급으로 시간 단축
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
