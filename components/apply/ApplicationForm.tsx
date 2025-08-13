"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Send, Upload, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

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
  isNonOfficial: boolean
  note: string
}

export default function ApplicationForm() {
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
    
    // 고객 요구사항
    requirements: "",
    
    // 기기 정보 (배열)
    equipments: [
      {
        name: "",
        manufacturer: "",
        model: "",
        serialNumber: "",
        isNonOfficial: false,
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
    "업체 정보",
    "교정 정보",
    "기기 정보",
    "접수 방법"
  ]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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
          isNonOfficial: false,
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
    
    // TODO: 실제 이메일 전송 로직 구현
    console.log("Submitting form:", formData)
    
    // 임시 알림
    alert("신청서가 제출되었습니다. 24시간 내에 답변드리겠습니다.")
  }

  return (
    <Card className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-2">{stepTitles[currentStep]}</h2>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <form onSubmit={handleSubmit}>
        {/* Step 1: 업체 정보 */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">업체명 *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                  placeholder="업체명을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessNumber">사업자 등록번호 *</Label>
                <Input
                  id="businessNumber"
                  value={formData.businessNumber}
                  onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                  required
                  placeholder="000-00-00000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="representative">대표자 *</Label>
                <Input
                  id="representative"
                  value={formData.representative}
                  onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                  required
                  placeholder="대표자명"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화 *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="02-0000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">업태</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  placeholder="제조업"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCategory">업종</Label>
                <Input
                  id="businessCategory"
                  value={formData.businessCategory}
                  onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                  placeholder="안전용품"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                placeholder="전체 주소를 입력하세요"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fax">팩스</Label>
                <Input
                  id="fax"
                  value={formData.fax}
                  onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                  placeholder="02-0000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">휴대폰 *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">부서명</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="품질관리팀"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="example@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicantName">신청인 *</Label>
              <Input
                id="applicantName"
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                required
                placeholder="신청인 성명"
              />
            </div>

            <div className="space-y-2">
              <Label>교정 주기 선택 *</Label>
              <RadioGroup
                value={formData.calibrationPeriod}
                onValueChange={(value) => setFormData({ ...formData, calibrationPeriod: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="national" id="national" />
                  <Label htmlFor="national">국가에서 정한 교정주기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">자체설정주기</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">고객 요구사항</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="특별한 요구사항이 있으시면 입력해주세요"
                className="min-h-[120px]"
              />
            </div>
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
                      required
                      placeholder="기기명"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>제작회사</Label>
                    <Input
                      value={equipment.manufacturer}
                      onChange={(e) => handleEquipmentChange(index, "manufacturer", e.target.value)}
                      placeholder="제작회사"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>모델/규격</Label>
                    <Input
                      value={equipment.model}
                      onChange={(e) => handleEquipmentChange(index, "model", e.target.value)}
                      placeholder="모델명 또는 규격"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>기기번호</Label>
                    <Input
                      value={equipment.serialNumber}
                      onChange={(e) => handleEquipmentChange(index, "serialNumber", e.target.value)}
                      placeholder="시리얼 번호"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`nonOfficial-${index}`}
                      checked={equipment.isNonOfficial}
                      onCheckedChange={(checked) => 
                        handleEquipmentChange(index, "isNonOfficial", checked as boolean)
                      }
                    />
                    <Label htmlFor={`nonOfficial-${index}`}>비공인</Label>
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

        {/* Step 4: 접수 방법 */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>접수방법 *</Label>
              <RadioGroup
                value={formData.receptionMethod}
                onValueChange={(value) => setFormData({ ...formData, receptionMethod: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visit" id="visit" />
                  <Label htmlFor="visit">방문</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">택배</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">픽업</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onsite" id="onsite" />
                  <Label htmlFor="onsite">출장</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">기타</Label>
                </div>
              </RadioGroup>
              
              {formData.receptionMethod === "other" && (
                <Input
                  value={formData.receptionMethodOther}
                  onChange={(e) => setFormData({ ...formData, receptionMethodOther: e.target.value })}
                  placeholder="기타 접수방법을 입력하세요"
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessLicense">사업자등록증 사본 *</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  파일을 선택하거나 드래그하여 업로드하세요
                </p>
                <Input
                  id="businessLicense"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setFormData({ ...formData, businessLicense: file })
                  }}
                  className="max-w-xs mx-auto"
                />
                {formData.businessLicense && (
                  <p className="text-sm text-primary mt-2">
                    선택된 파일: {formData.businessLicense.name}
                  </p>
                )}
              </div>
            </div>

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
            <Button type="submit" className="bg-gradient-primary text-white hover:opacity-90">
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
  )
}
