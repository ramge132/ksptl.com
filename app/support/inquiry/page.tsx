"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  FileText,
  Download,
  HelpCircle,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { type SupportInfo } from "@/lib/sanity-extended"

export default function InquiryPage() {
  const [supportData, setSupportData] = useState<SupportInfo | null>(null)

  useEffect(() => {
    fetchSupportData()
  }, [])

  const fetchSupportData = async () => {
    try {
      const response = await fetch('/api/sanity/support-info')
      if (response.ok) {
        const data = await response.json()
        setSupportData(data)
      }
    } catch (error) {
      console.error('Failed to fetch support data:', error)
    }
  }

  // 기본값 설정 (Sanity에서 데이터를 가져오지 못한 경우 사용)
  const pageTitle = supportData?.pageTitle || '고객지원'
  const pageSubtitle = supportData?.pageSubtitle || '고객지원 센터'
  const pageDescription = supportData?.pageDescription || '궁금하신 사항을 빠르고 정확하게 안내해드립니다'

  const contactMethods = [
    {
      icon: Phone,
      title: supportData?.phoneTitle || "전화 상담",
      content: supportData?.phoneNumber || "031-862-8556~7",
      description: supportData?.phoneHours || "평일 09:00 - 18:00",
      action: "전화하기",
      href: `tel:${supportData?.phoneNumber?.replace(/[~-]/g, '') || '0318628556'}`
    },
    {
      icon: Mail,
      title: supportData?.emailTitle || "이메일 문의",
      content: supportData?.emailAddress || "yukwho@hanmail.net",
      description: supportData?.emailHours || "24시간 접수 가능",
      action: "메일 보내기",
      href: `mailto:${supportData?.emailAddress || 'yukwho@hanmail.net'}`
    },
    {
      icon: MessageSquare,
      title: supportData?.onlineTitle || "온라인 문의",
      content: supportData?.onlineDescription || "견적 및 기술 상담",
      description: "문의 양식 작성",
      action: "문의하기",
      href: "/contact"
    },
  ]

  // FAQ 데이터 - Sanity에서 가져온 데이터 우선 사용
  const faqs = supportData?.faqs && supportData.faqs.length > 0 
    ? supportData.faqs.sort((a, b) => (a.order || 0) - (b.order || 0))
    : [
        {
          question: "교정 주기는 어떻게 되나요?",
          answer: "교정 주기는 국가에서 정한 교정주기와 자체설정주기 중 선택하실 수 있습니다. 일반적으로 시험장비는 1년 주기로 교정을 권장하고 있으며, 사용 빈도와 중요도에 따라 조정 가능합니다."
        },
        {
          question: "시험 성적서 발급까지 얼마나 걸리나요?",
          answer: "일반적으로 접수 후 5~7일 이내에 시험을 완료하고 성적서를 발급합니다. 긴급한 경우 별도 협의를 통해 단축 가능합니다."
        },
        {
          question: "출장 교정이 가능한가요?",
          answer: "네, 출장 교정 서비스를 제공하고 있습니다. 장비의 특성상 이동이 어렵거나 생산 라인 중단이 어려운 경우 출장 교정을 신청하실 수 있습니다."
        },
        {
          question: "공인 성적서와 비공인 성적서의 차이는 무엇인가요?",
          answer: "KOLAS 공인 성적서는 국제적으로 인정받는 공신력 있는 성적서로, 수출입이나 공공기관 제출 시 필수적입니다. 비공인 성적서(일반 성적서)는 내부 품질관리 목적으로 사용됩니다."
        },
        {
          question: "견적은 어떻게 받을 수 있나요?",
          answer: "온라인 신청서를 작성하시거나 전화(031-862-8556~7) 또는 이메일(yukwho@hanmail.net)로 문의하시면 24시간 내에 견적을 제공해드립니다."
        },
        {
          question: "시험 장비를 직접 방문해서 맡길 수 있나요?",
          answer: "네, 본사 또는 시험소에 직접 방문하여 접수 가능합니다. 방문 전 전화로 예약하시면 더욱 신속한 처리가 가능합니다."
        },
        {
          question: "교정 비용 결제는 어떻게 하나요?",
          answer: "교정 완료 후 거래명세서를 이메일로 발송드리며, 입금 확인 후 성적서와 함께 장비를 출고합니다. 계좌는 국민은행 526501-01-284980 (예금주: 한국안전용품시험연구원)입니다."
        },
        {
          question: "시험 불합격 시 재시험이 가능한가요?",
          answer: "네, 불합격 항목에 대해 보완 후 재시험 신청이 가능합니다. 재시험 비용은 별도 협의를 통해 결정됩니다."
        }
      ]

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
              <HelpCircle className="w-3 h-3 mr-1" />
              Support Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{pageTitle}</span>
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              {pageSubtitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover-lift h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary-light flex items-center justify-center">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-primary font-medium mb-1">{method.content}</p>
                    <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                    <Link href={method.href}>
                      <Button variant="outline" className="w-full">
                        {method.action}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              {supportData?.faqTitle || '자주 묻는 질문'}
            </h2>
            <p className="text-muted-foreground">
              {supportData?.faqSubtitle || '고객님들이 자주 문의하시는 내용을 정리했습니다'}
            </p>
          </motion.div>

          <Card className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left px-6">
                    <span className="flex items-start gap-3">
                      <span className="text-primary font-semibold mt-0.5">Q.</span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-semibold">A.</span>
                      <p className="text-muted-foreground whitespace-pre-wrap">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">빠른 메뉴</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/test-calibration">
                <Card className="p-4 hover-lift cursor-pointer">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">온라인 신청</p>
                </Card>
              </Link>
              <Link href="/tests">
                <Card className="p-4 hover-lift cursor-pointer">
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">시험 항목</p>
                </Card>
              </Link>
              <Link href="/support/resources">
                <Card className="p-4 hover-lift cursor-pointer">
                  <Download className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">자료실</p>
                </Card>
              </Link>
              <Link href="/location">
                <Card className="p-4 hover-lift cursor-pointer">
                  <Clock className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">오시는 길</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
