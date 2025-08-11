'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Clock,
  FileText,
  ArrowRight,
  Microscope,
  Wrench,
  HardHat,
  ShieldCheck,
  Footprints,
  ChevronRight
} from 'lucide-react'

// 카테고리별 아이콘 매핑
const categoryIcons: Record<string, any> = {
  '마스크': Shield,
  '안전화': Footprints,
  '보호복': ShieldCheck,
  '추락방지대': HardHat,
  '안전모': HardHat,
  '안전장갑': Shield,
  '안전대': ShieldCheck,
}

// 시험 항목 데이터
const testCategories = [
  {
    id: 'mask',
    name: '마스크',
    icon: Shield,
    items: [
      { id: 'mask-dust', name: '방진마스크' },
      { id: 'mask-gas', name: '방독마스크' },
      { id: 'mask-air', name: '송기마스크' }
    ]
  },
  {
    id: 'shoe',
    name: '안전화',
    icon: Footprints,
    items: [
      { id: 'shoe-leather', name: '가죽제' },
      { id: 'shoe-rubber', name: '고무제' },
      { id: 'shoe-static-leather', name: '정전기안전화 (가죽제)' },
      { id: 'shoe-static-rubber', name: '정전기안전화 (고무제)' },
      { id: 'shoe-instep', name: '발등안전화' },
      { id: 'shoe-insulation-leather', name: '절연화 (가죽제)' },
      { id: 'shoe-insulation-rubber', name: '절연화 (고무제)' },
      { id: 'shoe-insulation-boots', name: '절연장화' }
    ]
  },
  {
    id: 'suit',
    name: '보호복',
    icon: ShieldCheck,
    items: [
      { id: 'suit-heat', name: '방열복' },
      { id: 'suit-chemical', name: '화학물질용 보호복' }
    ]
  },
  {
    id: 'fall',
    name: '추락방지대',
    icon: HardHat,
    items: [
      { id: 'fall-protection', name: '추락방지대' }
    ]
  },
  {
    id: 'helmet',
    name: '안전모',
    icon: HardHat,
    items: [
      { id: 'helmet-ab', name: 'AB형' },
      { id: 'helmet-ae', name: 'AE형' },
      { id: 'helmet-abe', name: 'ABE형' }
    ]
  },
  {
    id: 'glove',
    name: '안전장갑',
    icon: Shield,
    items: [
      { id: 'glove-voltage', name: '내전압용' }
    ]
  },
  {
    id: 'harness',
    name: '안전대',
    icon: ShieldCheck,
    items: [
      { id: 'harness-belt-u', name: '벨트식 U자 걸이용' },
      { id: 'harness-belt-single', name: '벨트식 1개 걸이용' },
      { id: 'harness-swing-u', name: '그네식 U자 걸이용' },
      { id: 'harness-swing-single', name: '그네식 1개 걸이용' },
      { id: 'harness-block', name: '안전블럭' }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function TestCalibrationPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-white/20 border-white/30 text-white">
              <Award className="w-3 h-3 mr-1" />
              KOLAS 공인 시험기관
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              시험 신청
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              KOLAS 공인 시험기관에서 제공하는 전문 시험 서비스를 신청하세요
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section - Redesigned */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              간편한 신청 절차
            </h2>
            <p className="text-gray-600">
              온라인으로 쉽고 빠르게 신청하세요
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              {/* Dotted Line - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5">
                <div className="w-full h-full border-t-2 border-dashed border-blue-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: 1, title: '항목 선택', icon: '📋', desc: '시험 또는 교정 항목 선택' },
                  { step: 2, title: '정보 입력', icon: '✍️', desc: '필요한 정보 입력' },
                  { step: 3, title: '견적 확인', icon: '💰', desc: '24시간 내 견적 제공' },
                  { step: 4, title: '진행', icon: '✅', desc: '시험·교정 수행 및 성적서 발급' }
                ].map((item, index, array) => (
                  <motion.div
                    key={item.step}
                    variants={itemVariants}
                    className="flex flex-col items-center"
                  >
                    {/* Number and Icon */}
                    <div className="relative z-20">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white">
                        {item.step}
                      </div>
                      <div className="absolute -bottom-1 -right-1 text-2xl">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <p className="mt-3 font-semibold text-gray-800">
                      {item.title}
                    </p>
                    
                    {/* Description */}
                    <p className="mt-4 text-xs text-gray-600 bg-gray-50 rounded-lg py-2 px-3 text-center">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - 시험 항목 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              항목 선택
            </h2>
            <p className="text-lg text-gray-600">
              아래에서 필요한 시험 항목을 선택해주세요
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 max-w-6xl mx-auto"
          >
            {testCategories.map((category) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <Badge variant="secondary" className="ml-auto">
                        {category.items.length}개 항목
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.items.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => setHoveredCard(item.id)}
                          onHoverEnd={() => setHoveredCard(null)}
                        >
                          <Link href={`/test-calibration/${item.id}`}>
                            <Card 
                              className={`h-full cursor-pointer transition-all duration-300 ${
                                hoveredCard === item.id 
                                  ? 'shadow-lg border-blue-300 bg-blue-50/30' 
                                  : 'hover:shadow-md'
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{item.name}</span>
                                  <ChevronRight 
                                    className={`w-5 h-5 text-gray-400 transition-transform ${
                                      hoveredCard === item.id ? 'translate-x-1 text-blue-600' : ''
                                    }`}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">신속한 처리</h3>
                  <p className="text-gray-600">
                    24시간 내 견적 제공<br />
                    빠른 시험·교정 진행
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">공인 성적서</h3>
                  <p className="text-gray-600">
                    KOLAS 인정 시험기관<br />
                    국제적으로 인정받는 성적서
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Microscope className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">전문 기술력</h3>
                  <p className="text-gray-600">
                    시험기 제작 노하우<br />
                    정확한 시험·교정 수행
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
