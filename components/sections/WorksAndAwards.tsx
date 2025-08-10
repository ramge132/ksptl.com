"use client"

import { motion } from "framer-motion"
import { Award, Trophy, ScrollText, FileCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { InfiniteScroll } from "@/components/ui/infinite-scroll"

const certifications = [
  {
    title: "KOLAS 공인교정기관 인정서",
    number: "KC23-420",
    issuer: "한국인정기구",
    icon: ScrollText,
    description: "국가공인 교정기관 인증"
  },
  {
    title: "KS 제품인증서 - 인장시험기",
    number: "KS B 5521",
    issuer: "한국표준협회",
    icon: Award,
    description: "인장 시험기 KS 인증"
  },
  {
    title: "KS 제품인증서 - 압축시험기",
    number: "KS B 5533",
    issuer: "한국표준협회",
    icon: Award,
    description: "압축 시험기 KS 인증"
  },
  {
    title: "KS 제품인증서 - 만능재료시험기",
    number: "KS B 5541",
    issuer: "한국표준협회",
    icon: Award,
    description: "만능재료시험기 KS 인증"
  },
  {
    title: "품질경영시스템인증서",
    number: "ISO 9001:2015",
    issuer: "국제표준화기구",
    icon: ScrollText,
    description: "국제 품질경영시스템 인증"
  },
  {
    title: "방송통신기자재 적합등록",
    number: "5031-FC65-40CE-227C",
    issuer: "국립전파연구원",
    icon: FileCheck,
    description: "KC 인증"
  },
]

const patents = [
  {
    title: "안전모 충격 시험기",
    number: "10-0986289",
    type: "특허",
    description: "충돌 장치 및 안전모 충격 시험기"
  },
  {
    title: "아스콘 연소 시험기",
    number: "10-1238775",
    type: "특허",
    description: "아스콘 연소 시험 장비"
  },
  {
    title: "신발 미끄럼 측정장치",
    number: "10-1251452",
    type: "특허",
    description: "정밀 미끄럼 측정 기술"
  },
  {
    title: "안전화 충격 시험장치",
    number: "10-1510675",
    type: "특허",
    description: "안전화 충격 시험 전문 장비"
  },
  {
    title: "검전기 (활선 접근 경보기)",
    number: "10-2002491",
    type: "특허",
    description: "전압 감지 및 경보 시스템"
  },
  {
    title: "만능재료시험기",
    number: "30-0775782",
    type: "디자인",
    description: "만능재료시험기 디자인 등록"
  },
  {
    title: "검전기 디자인",
    number: "30-0969154",
    type: "디자인",
    description: "검전기 디자인 등록"
  },
]

export default function WorksAndAwards() {
  const certificationItems = certifications.map((cert, index) => (
    <Card key={index} className="p-6 text-center hover-lift bg-white w-64">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary-light flex items-center justify-center">
        <cert.icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-semibold text-sm mb-2">{cert.title}</h3>
      <p className="text-xs text-primary font-medium mb-1">{cert.number}</p>
      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
    </Card>
  ))

  const patentItems = patents.map((patent, index) => (
    <Card key={index} className="p-4 hover-lift bg-white w-80">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gradient-primary-light shrink-0">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{patent.title}</h3>
          <p className="text-xs text-primary mb-1">
            {patent.type} 제{patent.number}호
          </p>
          <p className="text-xs text-muted-foreground">{patent.description}</p>
        </div>
      </div>
    </Card>
  ))

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            인증서 & <span className="text-gradient">특허</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            20년간 축적된 기술력과 신뢰의 증명
          </p>
        </motion.div>

        {/* Certifications Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-gradient">인증서</span>
          </h3>
          <InfiniteScroll items={certificationItems} speed={40} />
        </div>

        {/* Patents Section */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-gradient">특허 및 디자인 등록</span>
          </h3>
          <InfiniteScroll items={patentItems} speed={40} />
        </div>
      </div>
    </section>
  )
}
