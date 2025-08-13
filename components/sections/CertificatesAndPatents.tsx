"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Award, Shield, FileCheck } from "lucide-react"

// 하드코딩된 기본 데이터 (Sanity 데이터가 없을 때 사용)
const defaultCertificates = [
  {
    _id: "1",
    image: "/images/certs/방송통신기자재등의_적합등록필증(KC인증).png",
    title: "방송통신기자재등의 적합등록 필증",
    description: "KC인증 (5031-FC65-40CE-227C)"
  },
  {
    _id: "2",
    image: "/images/certs/공인교정기관_인정서(국문).bmp",
    title: "KOLAS 공인교정기관 인정서",
    description: "KC23-420"
  },
  {
    _id: "3",
    image: "/images/certs/KS인증서-인장시험기.bmp",
    title: "KS 제품인증서 - 인장시험기",
    description: "KS B 5521"
  },
  {
    _id: "4",
    image: "/images/certs/KS인증서-압축시험기.bmp",
    title: "KS 제품인증서 - 압축시험기",
    description: "KS B 5533"
  },
  {
    _id: "5",
    image: "/images/certs/KS인증서-만능재료시험기.bmp",
    title: "KS 제품인증서 - 만능재료시험기",
    description: "KS B 5541"
  },
  {
    _id: "6",
    image: "/images/certs/ISO인증서_국문.bmp",
    title: "품질경영시스템인증서",
    description: "ISO 9001:2015"
  },
  {
    _id: "7",
    image: "/images/certs/특허-안전모충격시험기.jpg",
    title: "특허증 - 안전모 충격 시험기",
    description: "특허 제 10-0986289호"
  },
  {
    _id: "8",
    image: "/images/certs/특허-아스콘시험기.jpg",
    title: "특허증 - 아스콘 연소 시험기",
    description: "특허 제10-1238775호"
  },
  {
    _id: "9",
    image: "/images/certs/특허-신발미끄럼측정장치.jpg",
    title: "특허증 - 신발 미끄럼 측정장치",
    description: "특허 제10-1251452호"
  },
  {
    _id: "10",
    image: "/images/certs/특허-커피콩_혼합장치.jpg",
    title: "특허증 - 커피콩 혼합장치",
    description: "특허 제10-1256549호"
  },
  {
    _id: "11",
    image: "/images/certs/특허-안전화충격시험기.jpg",
    title: "특허증 - 안전화 충격 시험장치",
    description: "특허 제 10-1510675호"
  },
  {
    _id: "12",
    image: "/images/certs/특허-중국_안전모충격시험기.jpg",
    title: "특허증 - 안전모 충격 시험기(중국)",
    description: "중국 특허제 141001호"
  },
  {
    _id: "13",
    image: "/images/certs/특허-검전기.jpg",
    title: "특허증 - 검전기(활선 접근 경보기)",
    description: "등록번호: 제 10-2002491호"
  },
  {
    _id: "14",
    image: "/images/certs/디자인-만능재료시험기.jpg",
    title: "디자인등록증 - 만능재료시험기",
    description: "등록번호: 제 30-0775782호"
  },
  {
    _id: "15",
    image: "/images/certs/디자인-검전기.jpg",
    title: "디자인등록증 - 검전기",
    description: "등록번호: 제 30-0969154호"
  },
  {
    _id: "16",
    image: "/images/certs/연구개발전담부서인정서.jpg",
    title: "연구개발전담부서 인정서",
    description: "연구개발전담부서 인정"
  }
]

interface CertificatesAndPatentsProps {
  certificatesTitle1?: string
  certificatesTitle2?: string
  certificatesDescription?: string
  certificates?: any[]
}

export default function CertificatesAndPatents({
  certificatesTitle1 = "인증서 및",
  certificatesTitle2 = "특허",
  certificatesDescription = "국내외 공인 인증과 특허로 검증된 기술력",
}: CertificatesAndPatentsProps) {
  const certificates = defaultCertificates;
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {certificatesTitle1} <span className="text-gradient">{certificatesTitle2}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {certificatesDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors overflow-hidden">
                  {cert.image && cert.image !== "/placeholder.jpg" ? (
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        console.error('Image load error for:', cert.title)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    // 아이콘 표시 로직: 제목에 따라 다른 아이콘 표시
                    cert.title.includes('특허') || cert.title.includes('디자인등록') ? 
                      <Award className="w-12 h-12 text-green-600" /> :
                    cert.title.includes('인정서') || cert.title.includes('인증') ? 
                      <Shield className="w-12 h-12 text-blue-600" /> :
                      <FileCheck className="w-12 h-12 text-purple-600" />
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{cert.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{cert.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 인증 마크 표시 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-600">KOLAS</span>
              </div>
              <span className="text-sm text-muted-foreground">공인기관</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600">KS</span>
              </div>
              <span className="text-sm text-muted-foreground">제품인증</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600">ISO</span>
              </div>
              <span className="text-sm text-muted-foreground">품질경영</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-orange-600">CE</span>
              </div>
              <span className="text-sm text-muted-foreground">유럽인증</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-red-600">KC</span>
              </div>
              <span className="text-sm text-muted-foreground">국가인증</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
