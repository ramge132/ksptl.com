"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Shield, 
  HardHat, 
  Footprints, 
  Shirt, 
  AlertTriangle,
  Wrench
} from "lucide-react"
import { Card } from "@/components/ui/card"

interface ServicesProps {
  servicesTitle1?: string
  servicesTitle2?: string
  servicesDescription1?: string
  servicesDescription2?: string
  servicesButtonText?: string
  
  service1Title?: string
  service1Description?: string
  service1Item1?: string
  service1Item2?: string
  service1Item3?: string
  service1Count?: number
  
  service2Title?: string
  service2Description?: string
  service2Item1?: string
  service2Item2?: string
  service2Item3?: string
  service2Count?: number
  
  service3Title?: string
  service3Description?: string
  service3Item1?: string
  service3Item2?: string
  service3Item3?: string
  service3Count?: number
  
  service4Title?: string
  service4Description?: string
  service4Item1?: string
  service4Item2?: string
  service4Item3?: string
  service4Count?: number
  
  service5Title?: string
  service5Description?: string
  service5Item1?: string
  service5Item2?: string
  service5Item3?: string
  service5Count?: number
  
  service6Title?: string
  service6Description?: string
  service6Item1?: string
  service6Item2?: string
  service6Item3?: string
  service6Count?: number
}

export default function Services({
  servicesTitle1 = "시험·교정",
  servicesTitle2 = "서비스",
  servicesDescription1 = "KOLAS 인증 시험 기관으로 총 227종의 안전용품 시험이 가능합니다.",
  servicesDescription2 = "정확하고 신뢰할 수 있는 시험 서비스를 제공합니다",
  servicesButtonText = "자세히 보기",
  
  service1Title = "마스크",
  service1Description = "방진, 방독, 송기마스크 시험",
  service1Item1 = "강도 신장율 및 영구변형율 시험",
  service1Item2 = "투시부의 내충격성 시험",
  service1Item3 = "여과재 질량 시험",
  service1Count = 5,
  
  service2Title = "안전화",
  service2Description = "가죽제, 고무제, 정전기안전화, 절연화",
  service2Item1 = "내압박성 시험",
  service2Item2 = "내충격성 시험",
  service2Item3 = "박리저항시험",
  service2Count = 77,
  
  service3Title = "보호복",
  service3Description = "방열복, 화학물질용 보호복",
  service3Item1 = "난연성 시험",
  service3Item2 = "인장강도 시험",
  service3Item3 = "내열성 시험",
  service3Count = 16,
  
  service4Title = "추락방지대",
  service4Description = "추락방지대 전문 시험",
  service4Item1 = "구조검사",
  service4Item2 = "죔줄 인장강도 시험",
  service4Item3 = "동하중성능 시험",
  service4Count = 12,
  
  service5Title = "안전모",
  service5Description = "AB형, AE형, ABE형",
  service5Item1 = "내관통성 시험",
  service5Item2 = "충격흡수성 시험",
  service5Item3 = "난연성 시험",
  service5Count = 4,
  
  service6Title = "안전대 / 안전장갑",
  service6Description = "벨트식, 그네식, 안전블럭, 내전압용",
  service6Item1 = "구조검사",
  service6Item2 = "인장강도 시험",
  service6Item3 = "충격흡수",
  service6Count = 95,
}: ServicesProps) {
  // 아이콘 매핑
  const icons = [Shield, Footprints, Shirt, AlertTriangle, HardHat, Wrench];
  
  const services = [
    {
      icon: icons[0],
      title: service1Title,
      description: service1Description,
      items: [service1Item1, service1Item2, service1Item3],
      additionalCount: service1Count
    },
    {
      icon: icons[1],
      title: service2Title,
      description: service2Description,
      items: [service2Item1, service2Item2, service2Item3],
      additionalCount: service2Count
    },
    {
      icon: icons[2],
      title: service3Title,
      description: service3Description,
      items: [service3Item1, service3Item2, service3Item3],
      additionalCount: service3Count
    },
    {
      icon: icons[3],
      title: service4Title,
      description: service4Description,
      items: [service4Item1, service4Item2, service4Item3],
      additionalCount: service4Count
    },
    {
      icon: icons[4],
      title: service5Title,
      description: service5Description,
      items: [service5Item1, service5Item2, service5Item3],
      additionalCount: service5Count
    },
    {
      icon: icons[5],
      title: service6Title,
      description: service6Description,
      items: [service6Item1, service6Item2, service6Item3],
      additionalCount: service6Count
    }
  ];

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
            <span className="text-gradient">{servicesTitle1}</span> {servicesTitle2}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {servicesDescription1}
            <br />
            {servicesDescription2}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary-light group-hover:scale-110 transition-transform">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-primary">
                      외 {service.additionalCount}종
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
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
              <span className="relative z-10">{servicesButtonText}</span>
              
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
      </div>
    </section>
  )
}
