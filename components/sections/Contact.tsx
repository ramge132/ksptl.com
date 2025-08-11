"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Send, Building2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ContactProps {
  contactTitle1?: string
  contactTitle2?: string
  contactDescription?: string
  contactPhoneTitle?: string
  contactPhoneNumber?: string
  contactPhoneHours?: string
  contactEmailTitle?: string
  contactEmailAddress?: string
  contactEmailDescription?: string
  contactTimeTitle?: string
  contactTimeValue?: string
  contactTimeDescription?: string
  contactFormCompanyLabel?: string
  contactFormCompanyPlaceholder?: string
  contactFormNameLabel?: string
  contactFormNamePlaceholder?: string
  contactFormPhoneLabel?: string
  contactFormPhonePlaceholder?: string
  contactFormEmailLabel?: string
  contactFormEmailPlaceholder?: string
  contactFormTypeLabel?: string
  contactFormTypePlaceholder?: string
  contactFormMessageLabel?: string
  contactFormMessagePlaceholder?: string
  contactFormNotice1?: string
  contactFormNotice2?: string
  contactButtonText?: string
}

export default function Contact({
  contactTitle1 = '문의',
  contactTitle2 = '하기',
  contactDescription = '시험·교정에 대한 견적 및 기술 상담을 도와드립니다',
  contactPhoneTitle = '전화 문의',
  contactPhoneNumber = '031-862-8556',
  contactPhoneHours = '평일 09:00 - 18:00',
  contactEmailTitle = '이메일',
  contactEmailAddress = 'ymy@quro.co.kr',
  contactEmailDescription = '24시간 접수 가능',
  contactTimeTitle = '처리 시간',
  contactTimeValue = '24시간 내',
  contactTimeDescription = '견적 및 답변 제공',
  contactFormCompanyLabel = '업체명 *',
  contactFormCompanyPlaceholder = '업체명을 입력하세요',
  contactFormNameLabel = '담당자명 *',
  contactFormNamePlaceholder = '담당자명을 입력하세요',
  contactFormPhoneLabel = '연락처 *',
  contactFormPhonePlaceholder = '010-0000-0000',
  contactFormEmailLabel = '이메일 *',
  contactFormEmailPlaceholder = 'example@company.com',
  contactFormTypeLabel = '문의 유형 *',
  contactFormTypePlaceholder = '문의 유형을 선택하세요',
  contactFormMessageLabel = '문의 내용 *',
  contactFormMessagePlaceholder = '문의하실 내용을 자세히 작성해주세요',
  contactFormNotice1 = '• 작성하신 내용은 담당자 검토 후 24시간 내 답변드립니다.',
  contactFormNotice2 = '• 급한 문의는 대표번호 031-862-8556로 연락주시기 바랍니다.',
  contactButtonText = '문의 보내기'
}: ContactProps) {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
  })

  const contactInfo = [
    {
      icon: Phone,
      title: contactPhoneTitle,
      content: contactPhoneNumber,
      description: contactPhoneHours,
    },
    {
      icon: Mail,
      title: contactEmailTitle,
      content: contactEmailAddress,
      description: contactEmailDescription,
    },
    {
      icon: Clock,
      title: contactTimeTitle,
      content: contactTimeValue,
      description: contactTimeDescription,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      })

      if (response.ok) {
        alert('문의가 성공적으로 접수되었습니다. 24시간 내에 답변 드리겠습니다.')
        setFormData({
          company: "",
          name: "",
          phone: "",
          email: "",
          inquiryType: "",
          message: "",
        })
      } else {
        alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
            <span className="text-gradient">{contactTitle1}</span>{contactTitle2}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {contactDescription}
          </p>
        </motion.div>

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
                    <Label htmlFor="company">{contactFormCompanyLabel}</Label>
                    <Input
                      id="company"
                      placeholder={contactFormCompanyPlaceholder}
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">{contactFormNameLabel}</Label>
                    <Input
                      id="name"
                      placeholder={contactFormNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{contactFormPhoneLabel}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={contactFormPhonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{contactFormEmailLabel}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={contactFormEmailPlaceholder}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">{contactFormTypeLabel}</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={contactFormTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calibration">교정 견적</SelectItem>
                      <SelectItem value="testing">시험 견적</SelectItem>
                      <SelectItem value="equipment">시험기 제작</SelectItem>
                      <SelectItem value="technical">기술 상담</SelectItem>
                      <SelectItem value="other">기타 문의</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{contactFormMessageLabel}</Label>
                  <Textarea
                    id="message"
                    placeholder={contactFormMessagePlaceholder}
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {contactFormNotice1}<br />
                    {contactFormNotice2}
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-primary text-white hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  {contactButtonText}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
