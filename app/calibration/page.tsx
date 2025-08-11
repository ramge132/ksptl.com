'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Award, 
  Clock,
  FileText,
  Microscope,
  Wrench,
  ChevronRight,
  Building2,
  Phone,
  Mail,
  FileCheck,
  Calculator
} from 'lucide-react'

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

export default function CalibrationPage() {
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
              KOLAS 공인 교정기관
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              교정 서비스
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              KOLAS 인정 교정기관 KC23-420<br/>
              정확하고 신뢰할 수 있는 교정 서비스를 제공합니다
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/test-calibration/calibration">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                  <Wrench className="w-5 h-5 mr-2" />
                  교정 신청하기
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                    빠른 교정 진행
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
                    KOLAS 인정 교정기관<br />
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
                    정확한 교정 수행
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              교정 서비스 특징
            </h2>
            <p className="text-lg text-gray-600">
              한국안전용품시험연구원의 차별화된 교정 서비스
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">KOLAS 공인 교정기관</h3>
                      <p className="text-gray-600">
                        한국인정기구(KOLAS)로부터 인정받은 공인 교정기관으로,
                        국제적으로 신뢰받는 교정성적서를 발급합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">ISO 9001:2015 인증</h3>
                      <p className="text-gray-600">
                        국제 품질경영시스템 인증을 획득하여
                        체계적이고 표준화된 교정 서비스를 제공합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">시험기 제작 전문성</h3>
                      <p className="text-gray-600">
                        시험기 제작 전문 기업으로서 축적된 기술력과
                        노하우를 바탕으로 정밀한 교정을 수행합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">신속한 처리</h3>
                      <p className="text-gray-600">
                        체계적인 프로세스와 전문 인력을 통해
                        신속하고 정확한 교정 서비스를 제공합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              교정 신청 절차
            </h2>
            <p className="text-lg text-gray-600">
              간편한 온라인 신청 시스템
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { step: 1, title: '온라인 신청', desc: '온라인 양식 작성' },
              { step: 2, title: '견적 확인', desc: '24시간 내 견적 제공' },
              { step: 3, title: '교정 진행', desc: '전문가의 정밀 교정' },
              { step: 4, title: '성적서 발급', desc: 'KOLAS 교정성적서 발급' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full -ml-3">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calibration Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              교정 가능 항목
            </h2>
            <p className="text-lg text-gray-600">
              다양한 시험 장비의 교정이 가능합니다
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      재료 시험기
                    </h3>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• 만능재료시험기</li>
                      <li>• 인장시험기</li>
                      <li>• 압축시험기</li>
                      <li>• 굴곡시험기</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      안전용품 시험기
                    </h3>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• 안전모 충격시험기</li>
                      <li>• 안전화 충격시험기</li>
                      <li>• 안전대 인장시험기</li>
                      <li>• 보호복 시험장비</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      환경 시험기
                    </h3>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• 항온항습기</li>
                      <li>• 열충격시험기</li>
                      <li>• 염수분무시험기</li>
                      <li>• 진동시험기</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      기타 측정기기
                    </h3>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• 하중계</li>
                      <li>• 토크렌치</li>
                      <li>• 압력계</li>
                      <li>• 온습도계</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>※ 주의사항:</strong> 상기 항목 외에도 다양한 장비의 교정이 가능합니다.
                    자세한 사항은 문의 바랍니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
