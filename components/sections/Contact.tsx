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

const contactInfo = [
  {
    icon: Phone,
    title: "전화 문의",
    content: "031-862-8556~7",
    description: "평일 09:00 - 18:00",
  },
  {
    icon: Mail,
    title: "이메일",
    content: "ymy@quro.co.kr",
    description: "24시간 접수 가능",
  },
  {
    icon: Clock,
    title: "처리 시간",
    content: "24시간 내",
    description: "견적 및 답변 제공",
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 제출 로직 구현
    console.log("Form submitted:", formData)
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
            <span className="text-gradient">문의</span>하기
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            시험·교정에 대한 견적 및 기술 상담을 도와드립니다
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
                  <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="문의 유형을 선택하세요" />
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
  )
}
