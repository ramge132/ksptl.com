"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Send, Building2, Clock, HelpCircle, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { type SupportInfo } from "@/lib/sanity-extended"

export default function ContactPage() {
  const [supportData, setSupportData] = useState<SupportInfo | null>(null)
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
  })

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

  // 기본값 설정
  const pageTitle = supportData?.pageTitle || '고객지원'
  const pageSubtitle = supportData?.pageSubtitle || '고객지원 센터'
  const pageDescription = supportData?.pageDescription || '궁금하신 사항을 빠르고 정확하게 안내해드립니다'
  
  const contactInfo = [
    {
      icon: Phone,
      title: supportData?.phoneTitle || "전화 상담",
      content: supportData?.phoneNumber || "031-862-8556~7",
      description: supportData?.phoneHours || "평일 09:00 - 18:00",
    },
    {
      icon: Mail,
      title: supportData?.emailTitle || "이메일 문의",
      content: supportData?.emailAddress || "ymy@quro.co.kr",
      description: supportData?.emailHours || "24시간 접수 가능",
    },
    {
      icon: MessageSquare,
      title: supportData?.onlineTitle || "온라인 문의",
      content: supportData?.onlineDescription || "견적 및 기술 상담",
      description: "문의 양식 작성",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // API를 통한 이메일 전송
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      })

      const result = await response.json()

      if (result.success) {
        // 폼 초기화
        setFormData({
          company: "",
          name: "",
          phone: "",
          email: "",
          inquiryType: "",
          message: "",
        })
        
        alert("문의가 성공적으로 접수되었습니다. 24시간 내에 답변드리겠습니다.")
      } else {
        throw new Error(result.message || '문의 접수 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      
      // 에러 발생 시 mailto 방식으로 폴백
      const subject = `[${formData.inquiryType}] ${formData.company} - ${formData.name}님의 문의`
      const body = `
업체명: ${formData.company}
담당자명: ${formData.name}
연락처: ${formData.phone}
이메일: ${formData.email}
문의 유형: ${formData.inquiryType}

문의 내용:
${formData.message}
      `
      
      const mailtoLink = `mailto:${supportData?.emailAddress || 'ymy@quro.co.kr'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
              <MessageSquare className="w-3 h-3 mr-1" />
              Support Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{pageTitle}</span>
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              {pageSubtitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-primary-light">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-primary font-medium">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Location Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary-light">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">오시는 길</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-primary">본사</p>
                          <p className="text-sm text-muted-foreground">경기 양주시 은현면 화합로 941번길 83</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">시험소</p>
                          <p className="text-sm text-muted-foreground">경기 양주시 은현면 화합로 701-11</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">업체명 *</Label>
                      <Input
                        id="company"
                        placeholder="업체명을 입력하세요"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">담당자명 *</Label>
                      <Input
                        id="name"
                        placeholder="담당자명을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">문의 유형 *</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="문의 유형을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="교정 견적">교정 견적</SelectItem>
                        <SelectItem value="시험 견적">시험 견적</SelectItem>
                        <SelectItem value="시험기 제작">시험기 제작</SelectItem>
                        <SelectItem value="기술 상담">기술 상담</SelectItem>
                        <SelectItem value="기타 문의">기타 문의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">문의 내용 *</Label>
                    <Textarea
                      id="message"
                      placeholder="문의하실 내용을 자세히 작성해주세요"
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      • 작성하신 내용은 담당자 검토 후 24시간 내 답변드립니다.<br />
                      • 급한 문의는 대표번호 031-862-8556~7로 연락주시기 바랍니다.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-primary text-white hover:opacity-90">
                    <Send className="mr-2 h-4 w-4" />
                    문의 보내기
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {supportData?.faqs && supportData.faqs.length > 0 && (
        <section className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* FAQ Header */}
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="outline">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  FAQ
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-gradient">{supportData.faqTitle || '자주 묻는 질문'}</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  {supportData.faqSubtitle || '고객님들이 자주 문의하시는 내용을 정리했습니다'}
                </p>
              </div>

              {/* FAQ Items */}
              <Card className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {supportData.faqs
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-gradient-primary-light rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                              Q
                            </span>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex gap-3 pl-11">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                              A
                            </div>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                              {faq.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </Card>

              {/* Quick Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12"
              >
                <Card className="p-8 bg-gradient-to-r from-blue-50 to-white">
                  <h3 className="text-xl font-semibold mb-6 text-center">빠른 메뉴</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-auto flex-col py-4"
                      onClick={() => window.location.href = '/test-calibration'}
                    >
                      <MessageSquare className="h-5 w-5 mb-2" />
                      온라인 신청
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto flex-col py-4"
                      onClick={() => window.location.href = '/tests'}
                    >
                      <HelpCircle className="h-5 w-5 mb-2" />
                      시험 항목
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto flex-col py-4"
                      onClick={() => window.location.href = '/resources'}
                    >
                      <Building2 className="h-5 w-5 mb-2" />
                      자료실
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto flex-col py-4"
                      onClick={() => window.location.href = '/location'}
                    >
                      <Clock className="h-5 w-5 mb-2" />
                      오시는 길
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
