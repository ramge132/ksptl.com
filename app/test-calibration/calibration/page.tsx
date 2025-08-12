"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Send, Upload, Plus, Trash2, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Swal from 'sweetalert2'

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
              currentStep > i
                ? "bg-primary text-white"
                : currentStep === i
                ? "bg-primary text-white ring-4 ring-primary/20"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={cn(
                "h-1 w-16 md:w-24 transition-all",
                currentStep > i ? "bg-primary" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface Equipment {
  name: string
  manufacturer: string
  model: string
  serialNumber: string
  standard: string
  note: string
}

export default function CalibrationFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // 신청업체 정보
    companyName: "",
    businessNumber: "",
    representative: "",
    businessType: "",
    businessCategory: "",
    address: "",
    phone: "",
    fax: "",
    mobile: "",
    
    // 성적서 발급처
    department: "",
    email: "",
    applicantName: "",
    
    // 교정 주기
    calibrationPeriod: "national",
    calibrationPeriodCustom: "",
    
    // 고객 요구사항
    requirements: "",
    
    // 기기 정보 (배열)
    equipments: [
      {
        name: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
        standard: "",
        note: "",
      }
    ] as Equipment[],
    
    // 접수방법
    receptionMethod: "visit",
    receptionMethodOther: "",
    
    // 사업자등록증
    businessLicense: null as File | null,
  })

  const totalSteps = 4
  const stepTitles = [
    "기본 정보",
    "교정 정보",
    "기기 정보",
    "기기 접수"
  ]

  // 각 스텝별 필수 항목 체크
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // 업체 정보
        const missingFields: string[] = []
        if (!formData.applicantName) missingFields.push('신청인')
        if (!formData.email) missingFields.push('E-mail')
        if (!formData.companyName) missingFields.push('업체명')
        if (!formData.address) missingFields.push('주소')
        if (!formData.phone) missingFields.push('전화')
        if (!formData.businessLicense) missingFields.push('사업자등록증 사본')
        
        if (missingFields.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 입력',
            text: `다음 항목을 입력해주세요: ${missingFields.join(', ')}`,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
            position: 'center',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          })
          return false
        }
        break
      case 1: // 교정 정보
        if (formData.calibrationPeriod === 'custom' && !formData.calibrationPeriodCustom) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 입력',
            text: '자체설정주기를 입력해주세요.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
            position: 'center',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          })
          return false
        }
        break
      case 2: // 기기 정보
        const missingEquipmentFields: string[] = []
        formData.equipments.forEach((eq, index) => {
          const equipmentMissing: string[] = []
          if (!eq.name) equipmentMissing.push('기기명')
          if (!eq.manufacturer) equipmentMissing.push('제조사')
          if (!eq.model) equipmentMissing.push('모델명')
          if (!eq.serialNumber) equipmentMissing.push('기기번호')
          if (!eq.standard) equipmentMissing.push('규격')
          
          if (equipmentMissing.length > 0) {
            missingEquipmentFields.push(`기기 #${index + 1}: ${equipmentMissing.join(', ')}`)
          }
        })
        
        if (missingEquipmentFields.length > 0) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 입력',
            html: `다음 항목을 입력해주세요:<br/>${missingEquipmentFields.join('<br/>')}`,
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
            position: 'center',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          })
          return false
        }
        break
      case 3: // 접수 방법
        if (!formData.receptionMethod) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 입력',
            text: '접수 방법을 선택해주세요.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
            position: 'center',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          })
          return false
        }
        if (formData.receptionMethod === 'other' && !formData.receptionMethodOther) {
          Swal.fire({
            icon: 'warning',
            title: '필수 항목 입력',
            text: '기타 접수 방법을 입력해주세요.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: true,
            position: 'center',
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          })
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddEquipment = () => {
    setFormData({
      ...formData,
      equipments: [
        ...formData.equipments,
        {
          name: "",
          manufacturer: "",
          model: "",
          serialNumber: "",
          standard: "",
          note: "",
        }
      ]
    })
  }

  const handleRemoveEquipment = (index: number) => {
    const newEquipments = formData.equipments.filter((_, i) => i !== index)
    setFormData({ ...formData, equipments: newEquipments })
  }

  const handleEquipmentChange = (index: number, field: keyof Equipment, value: any) => {
    const newEquipments = [...formData.equipments]
    newEquipments[index] = { ...newEquipments[index], [field]: value }
    setFormData({ ...formData, equipments: newEquipments })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 마지막 스텝에서만 제출 로직 실행
    if (currentStep !== totalSteps - 1) {
      return
    }

    // 마지막 스텝 validation
    if (!validateStep(currentStep)) {
      return
    }

    // 로딩 표시
    Swal.fire({
      title: '신청서 제출 중...',
      text: '잠시만 기다려주세요.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const submitData = new FormData()
      
      // formData를 JSON으로 변환하여 추가 (파일 제외)
      const dataToSend = {
        type: 'calibration',
        companyName: formData.companyName,
        businessNumber: formData.businessNumber,
        representative: formData.representative,
        businessType: formData.businessType,
        businessCategory: formData.businessCategory,
        address: formData.address,
        phone: formData.phone,
        fax: formData.fax,
        mobile: formData.mobile,
        department: formData.department,
        email: formData.email,
        applicantName: formData.applicantName,
        applicantEmail: formData.email, // 신청자 이메일 추가
        calibrationPeriod: formData.calibrationPeriod,
        requirements: formData.requirements,
        equipments: formData.equipments,
        receptionMethod: formData.receptionMethod,
        receptionMethodOther: formData.receptionMethodOther
      }
      
      submitData.append('formData', JSON.stringify(dataToSend))
      
      // 파일 추가
      if (formData.businessLicense) {
        submitData.append('businessLicense', formData.businessLicense)
      }

      const response = await fetch('/api/submit-calibration', {
        method: 'POST',
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: '신청 완료',
          text: '교정 신청이 성공적으로 접수되었습니다. 24시간 내에 견적을 보내드리겠습니다.',
          confirmButtonColor: '#0066ff',
          confirmButtonText: '확인'
        })
        // 홈페이지로 이동
        window.location.href = '/'
      } else {
        throw new Error(result.error || '신청 처리 중 오류가 발생했습니다.')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '신청 실패',
        text: error instanceof Error ? error.message : '신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
        confirmButtonColor: '#0066ff',
        confirmButtonText: '확인'
      })
    }
  }

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
            <span className="text-gradient">교정</span> 신청서
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KOLAS 공인 교정기관에서 정확한 교정 서비스를 받아보세요
          </p>
        </motion.div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-center mb-2">{stepTitles[currentStep]}</h2>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <form>
            {/* Step 1: 기본 정보 */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* 신청인 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">신청인 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="applicantName">신청인 *</Label>
                      <Input
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        placeholder="신청인 이름"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="이메일 주소"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">휴대폰</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="010-0000-0000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 신청업체 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">신청업체 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">업체명 *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="업체명을 입력하세요"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">주소 *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="주소를 입력하세요"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">전화 *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="031-000-0000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fax">팩스</Label>
                        <Input
                          id="fax"
                          value={formData.fax}
                          onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                          placeholder="031-000-0000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 사업자등록증 사본 첨부 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">사업자등록증 사본 첨부 *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.currentTarget.classList.add('border-primary', 'bg-primary/5')
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        e.currentTarget.classList.remove('border-primary', 'bg-primary/5')
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.currentTarget.classList.remove('border-primary', 'bg-primary/5')
                        const file = e.dataTransfer.files[0]
                        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
                          setFormData({ ...formData, businessLicense: file })
                        }
                      }}
                      onClick={() => document.getElementById('businessLicense')?.click()}
                    >
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        파일을 선택하거나 드래그하여 업로드하세요
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        이미지(JPG, PNG) 또는 PDF 파일만 가능합니다
                      </p>
                      <Input
                        id="businessLicense"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setFormData({ ...formData, businessLicense: file })
                        }}
                        className="hidden"
                      />
                      {formData.businessLicense && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-primary font-medium">
                            ✓ {formData.businessLicense.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {(formData.businessLicense.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: 교정 정보 */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">교정 주기 선택 *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.calibrationPeriod}
                      onValueChange={(value) => setFormData({ ...formData, calibrationPeriod: value })}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="national" id="national" className="mt-0.5" />
                          <div className="space-y-1">
                            <Label htmlFor="national" className="font-medium">국가에서 정한 교정주기</Label>
                            <p className="text-sm text-gray-600">
                              국가교정기관 지정 주기에 따라 교정을 진행합니다
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="custom" id="custom" className="mt-0.5" />
                          <div className="space-y-1 w-full">
                            <Label htmlFor="custom" className="font-medium">자체설정주기</Label>
                            <p className="text-sm text-gray-600">
                              귀사의 품질관리 규정에 따른 주기로 교정을 진행합니다
                            </p>
                            {formData.calibrationPeriod === 'custom' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              >
                                <Input
                                  value={formData.calibrationPeriodCustom}
                                  onChange={(e) => setFormData({ ...formData, calibrationPeriodCustom: e.target.value })}
                                  placeholder="예: 6개월, 1년 *" 
                                />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">고객 요구사항</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="특별한 요구사항이 있으시면 입력해주세요"
                      className="min-h-[120px]"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: 기기 정보 */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">기기 정보</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddEquipment}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    기기 추가
                  </Button>
                </div>

                {formData.equipments.map((equipment, index) => (
                  <Card key={index} className="p-4 relative">
                    {formData.equipments.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveEquipment(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <h4 className="font-medium mb-4">기기 #{index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>기기명 *</Label>
                        <Input
                          value={equipment.name}
                          onChange={(e) => handleEquipmentChange(index, "name", e.target.value)}
                          placeholder="기기명을 입력하세요"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>제조사 *</Label>
                        <Input
                          value={equipment.manufacturer}
                          onChange={(e) => handleEquipmentChange(index, "manufacturer", e.target.value)}
                          placeholder="제조사를 입력하세요"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>모델명 *</Label>
                        <Input
                          value={equipment.model}
                          onChange={(e) => handleEquipmentChange(index, "model", e.target.value)}
                          placeholder="모델명을 입력하세요"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>기기번호 *</Label>
                        <Input
                          value={equipment.serialNumber}
                          onChange={(e) => handleEquipmentChange(index, "serialNumber", e.target.value)}
                          placeholder="시리얼 번호를 입력하세요"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>규격 *</Label>
                        <Input
                          value={equipment.standard}
                          onChange={(e) => handleEquipmentChange(index, "standard", e.target.value)}
                          placeholder="규격을 입력하세요"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>비고</Label>
                        <Input
                          value={equipment.note}
                          onChange={(e) => handleEquipmentChange(index, "note", e.target.value)}
                          placeholder="추가 사항"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Step 4: 기기 접수 */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">기기 접수 *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.receptionMethod}
                      onValueChange={(value) => setFormData({ ...formData, receptionMethod: value })}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="visit" id="visit" className="mt-0.5" />
                          <div className="space-y-1">
                            <Label htmlFor="visit" className="font-medium">방문</Label>
                            <p className="text-sm text-gray-600">
                              직접 방문하여 기기를 접수합니다
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" className="mt-0.5" />
                          <div className="space-y-1">
                            <Label htmlFor="delivery" className="font-medium">택배</Label>
                            <p className="text-sm text-gray-600">
                              택배를 통해 기기를 발송합니다
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="onsite" id="onsite" className="mt-0.5" />
                          <div className="space-y-1">
                            <Label htmlFor="onsite" className="font-medium">출장</Label>
                            <p className="text-sm text-gray-600">
                              기술자가 직접 방문하여 교정을 진행합니다
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="other" id="other" className="mt-0.5" />
                          <div className="space-y-1">
                            <Label htmlFor="other" className="font-medium">기타</Label>
                            <p className="text-sm text-gray-600">
                              기타 방법으로 접수합니다 *
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {formData.receptionMethod === "other" && (
                      <Input
                        value={formData.receptionMethodOther}
                        onChange={(e) => setFormData({ ...formData, receptionMethodOther: e.target.value })}
                        placeholder="기타 접수방법을 입력하세요"
                        className="mt-3"
                      />
                    )}
                  </CardContent>
                </Card>

                <Card className="p-4 bg-blue-50">
                  <h4 className="font-semibold mb-2">안내사항</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 교정용 부속장비(전원선, TEST LEAD, ACCESSORY) 및 추가기능은 접수 시 상세히 기록하여 주시기 바랍니다.</li>
                    <li>• 교정 완료 시 거래명세서를 이메일로 보내드립니다.</li>
                    <li>• 거래명세서/계산서 확인 후 입금 부탁드리겠습니다. (입금확인 후 출고가능)</li>
                    <li>• 당사 방문 출고를 원하는 경우, 방문 1시간 전에 연락 후 방문 바랍니다.</li>
                    <li>• 의뢰한 교정품목이 완료되어 찾으실 때에는 교정수수료를 아래 은행에 입금하여 주시기 바랍니다.</li>
                    <li className="font-medium">[ 기업은행 : 439-043204-01-014 / 예금주 : (주) 큐로 ]</li>
                  </ul>
                </Card>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                이전
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  신청서 제출
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-primary text-white hover:opacity-90"
                >
                  다음
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
