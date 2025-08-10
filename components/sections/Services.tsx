"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Shield, 
  HardHat, 
  Footprints, 
  Shirt, 
  AlertTriangle,
  Wrench,
  ArrowRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Shield,
    title: "마스크",
    description: "방진, 방독, 송기마스크 시험",
    items: ["강도 신장율 시험", "투시부 내충격성", "여과재 질량"],
    href: "/tests?category=mask"
  },
  {
    icon: Footprints,
    title: "안전화",
    description: "가죽제, 고무제, 정전기안전화",
    items: ["내압박성 시험", "내충격성 시험", "박리저항시험"],
    href: "/tests?category=shoes"
  },
  {
    icon: Shirt,
    title: "보호복",
    description: "방열복, 화학물질용 보호복",
    items: ["난연성 시험", "인장강도 시험", "내열성 시험"],
    href: "/tests?category=clothing"
  },
  {
    icon: AlertTriangle,
    title: "추락방지대",
    description: "추락방지대 전문 시험",
    items: ["구조검사", "인장강도 시험", "동하중성능"],
    href: "/tests?category=harness"
  },
  {
    icon: HardHat,
    title: "안전모",
    description: "AB형, AE형, ABE형",
    items: ["내관통성 시험", "충격흡수성", "난연성 시험"],
    href: "/tests?category=helmet"
  },
  {
    icon: Wrench,
    title: "안전대",
    description: "벨트식, 그네식, 안전블럭",
    items: ["구조검사", "인장강도 시험", "충격흡수"],
    href: "/tests?category=belt"
  }
]

export default function Services() {
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
            <span className="text-gradient">시험·교정</span> 서비스
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KOLAS 인증 시험 기관으로 정확하고 신뢰할 수 있는 시험 서비스를 제공합니다
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
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button variant="outline" className="w-full group/btn">
                      자세히 보기
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
          <Link href="/apply">
            <button className="relative group px-8 py-3 pl-10 pr-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0080FF] 
                             text-white font-semibold text-lg overflow-hidden transition-all duration-300 
                             hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]
                             shadow-[0_0_20px_rgba(0,102,255,0.3)]">
              {/* Shiny effect on hover */}
              <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              {/* Text */}
              <span className="relative z-10">시험·교정 신청하기</span>
              
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
