"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ApplicationForm from "@/components/apply/ApplicationForm"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <FileText className="w-3 h-3 mr-1" />
            온라인 신청
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">교정·시험</span> 신청서
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            온라인으로 간편하게 신청하고, 빠른 견적을 받아보세요
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-4 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">24시간 내 견적</h3>
              <p className="text-sm text-muted-foreground">신속한 견적 제공</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">KOLAS 공인</h3>
              <p className="text-sm text-muted-foreground">신뢰할 수 있는 성적서</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">전문 상담</h3>
              <p className="text-sm text-muted-foreground">기술 지원 제공</p>
            </Card>
          </motion.div>
        </div>

        {/* Application Form */}
        <ApplicationForm />
      </div>
    </div>
  )
}
