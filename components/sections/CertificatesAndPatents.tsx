"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Award, Shield, FileCheck } from "lucide-react"

// 하드코딩된 기본 데이터 (Sanity 데이터가 없을 때 사용)
const defaultCertificates = [
  {
    image: "/placeholder.jpg",
    title: "방송통신기자재등의 적합등록 필증",
    description: "KC인증 (5031-FC65-40CE-227C)"
  },
  {
    image: "/placeholder.jpg",
    title: "KOLAS 공인교정기관 인정서",
    description: "KC23-420"
  },
  {
    image: "/placeholder.jpg",
    title: "KS 제품인증서",
    description: "인장시험기 (KS B 5521)"
  },
  {
    image: "/placeholder.jpg",
    title: "KS 제품인증서",
    description: "압축시험기 (KS B 5533)"
  },
  {
    image: "/placeholder.jpg",
    title: "KS 제품인증서",
    description: "만능재료시험기 (KS B 5541)"
  },
  {
    image: "/placeholder.jpg",
    title: "품질경영시스템인증서",
    description: "ISO 9001:2015"
  },
  {
    image: "/placeholder.jpg",
    title: "안전모 충격 시험기 특허",
    description: "특허 제 10-0986289호"
  },
  {
    image: "/placeholder.jpg",
    title: "아스콘 연소 시험기 특허",
    description: "특허 제10-1238775호"
  },
  {
    image: "/placeholder.jpg",
    title: "신발 미끄럼 측정장치 특허",
    description: "특허 제10-1251452호"
  },
  {
    image: "/placeholder.jpg",
    title: "커피콩 혼합장치 특허",
    description: "특허 제10-1256549호"
  },
  {
    image: "/placeholder.jpg",
    title: "안전화 충격 시험장치 특허",
    description: "특허 제 10-1510675호"
  },
  {
    image: "/placeholder.jpg",
    title: "안전모 충격 시험기 (중국)",
    description: "중국 특허제 141001호"
  },
  {
    image: "/placeholder.jpg",
    title: "검전기 특허",
    description: "활선 접근 경보기 제 10-2002491호"
  },
  {
    image: "/placeholder.jpg",
    title: "만능재료시험기 디자인등록",
    description: "등록번호 제 30-0775782호"
  },
  {
    image: "/placeholder.jpg",
    title: "검전기 디자인등록",
    description: "등록번호 제 30-0969154호"
  },
  {
    image: "/placeholder.jpg",
    title: "연구개발전담부서 인정서",
    description: "기업부설연구소 인정"
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
  certificates: propsCertificates
}: CertificatesAndPatentsProps) {
  const [certificates, setCertificates] = useState<any[]>(propsCertificates || defaultCertificates)
  const [loading, setLoading] = useState(!propsCertificates)

  useEffect(() => {
    if (!propsCertificates) {
      const fetchAwards = async () => {
        try {
          // 캐시를 무시하고 최신 데이터를 가져오기
          const response = await fetch('/api/sanity/awards', {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            console.log('Fetched awards data:', data)
            
            // Sanity 데이터가 있으면 사용, 없으면 기본 데이터 사용
            if (data && data.length > 0) {
              const transformedData = data.map((item: any) => ({
                image: item.imageUrl || "/placeholder.jpg",
                title: item.title,
                description: item.description,
                _id: item._id,
                order: item.order || 0
              }))
              setCertificates(transformedData)
            }
          }
        } catch (error) {
          console.error('Failed to fetch awards:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchAwards()
    }
  }, [propsCertificates])
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
