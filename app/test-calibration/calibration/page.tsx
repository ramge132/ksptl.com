'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Stepper } from '@/components/ui/stepper'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  manufacturer: string
  model: string
  serialNumber: string
  isUncertified: boolean
  notes: string
}

interface FormData {
  // 신청업체 정보
  companyName: string
  businessNumber: string
  representative: string
  businessType: string
  industry: string
  address: string
  phone: string
  fax: string
  mobile: string
  
  // 성적서 발급처
  department: string
  email: string
  applicantName: string
  
  // 교정 주기
  calibrationCycle: 'government' | 'custom'
  customCycle: string
  
  // 고객 요구사항
  requirements: string
  
  // 기기 목록
  equipments: Equipment[]
  
  // 접수방법
  receiptMethod: string
  otherMethod: string
  
  // 파일 첨부
  businessRegistration: File | null
}

const steps = ['기본정보', '기기정보', '접수방법', '확인']

export default function CalibrationApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    businessNumber: '',
    representative: '',
    businessType: '',
    industry: '',
    address: '',
    phone: '',
    fax: '',
    mobile: '',
    department: '',
    email: '',
    applicantName: '',
    calibrationCycle: 'government',
    customCycle: '',
    requirements: '',
    equipments: [{
      id: '1',
      name: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      isUncertified: false,
      notes: ''
    }],
    receiptMethod: '',
    otherMethod: '',
    businessRegistration: null
  })

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addEquipment = () => {
    const newEquipment: Equipment = {
      id: Date.now().toString(),
      name: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      isUncertified: false,
      notes: ''
    }
    updateFormData('equipments', [...formData.equipments, newEquipment])
  }

  const updateEquipment = (id: string, field: keyof Equipment, value: any) => {
    const updatedEquipments = formData.equipments.map(eq => 
      eq.id === id ? { ...eq, [field]: value } : eq
    )
    updateFormData('equipments', updatedEquipments)
  }

  const removeEquipment = (id: string) => {
    if (formData.equipments.length > 1) {
      updateFormData('equipments', formData.equipments.filter(eq => eq.id !== id))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateFormData('businessRegistration', file)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.businessNumber && formData.representative && 
                 formData.address && formData.phone && formData.email && formData.applicantName)
      case 2:
        return formData.equipments.every(eq => eq.name && eq.manufacturer)
      case 3:
        return !!formData.receiptMethod
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    } else {
      toast.error('필수 항목을 모두 입력해주세요.')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const submitForm = async () => {
    if (!formData.businessRegistration) {
      toast.error('사업자등록증을 첨부해주세요.')
      return
    }

    try {
      // FormData 생성 (파일 업로드 포함)
      const submitData = new FormData()
      submitData.append('formData', JSON.stringify(formData))
      if (formData.businessRegistration) {
        submitData.append('businessRegistration', formData.businessRegistration)
      }

      const response = await fetch('/api/submit-calibration', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        toast.success('교정 신청이 성공적으로 제출되었습니다!')
        // 폼 초기화 또는 성공 페이지로 이동
      } else {
        throw new Error('제출 실패')
      }
    } catch (error) {
      toast.error('신청서 제출 중 오류가 발생했습니다.')
      console.error('Error:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">업체명 *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessNumber">사업자 등록번호 *</Label>
                <Input
                  id="businessNumber"
                  value={formData.businessNumber}
                  onChange={(e) => updateFormData('businessNumber', e.target.value)}
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
                  onChange={(e) => updateFormData('representative', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">업태</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => updateFormData('businessType', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">업종</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화 *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fax">팩스</Label>
                <Input
                  id="fax"
                  value={formData.fax}
                  onChange={(e) => updateFormData('fax', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">휴대폰</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">성적서 발급처</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">부서명</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => updateFormData('department', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="applicantName">신청인 *</Label>
                <Input
                  id="applicantName"
                  value={formData.applicantName}
                  onChange={(e) => updateFormData('applicantName', e.target.value)}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">교정 주기 선택</h3>
              <RadioGroup 
                value={formData.calibrationCycle} 
                onValueChange={(value) => updateFormData('calibrationCycle', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="government" id="government" />
                  <Label htmlFor="government">국가에서 정한 교정주기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">자체설정주기</Label>
                </div>
              </RadioGroup>
              {formData.calibrationCycle === 'custom' && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="customCycle">자체 설정 주기</Label>
                  <Input
                    id="customCycle"
                    value={formData.customCycle}
                    onChange={(e) => updateFormData('customCycle', e.target.value)}
                    placeholder="예: 1년, 6개월 등"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">고객 요구 사항</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData('requirements', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">기기 정보</h3>
              <Button onClick={addEquipment} variant="outline">
                기기 추가
              </Button>
            </div>
            
            {formData.equipments.map((equipment, index) => (
              <Card key={equipment.id} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">기기 #{index + 1}</h4>
                  {formData.equipments.length > 1 && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeEquipment(equipment.id)}
                    >
                      삭제
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>기기명 *</Label>
                    <Input
                      value={equipment.name}
                      onChange={(e) => updateEquipment(equipment.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>제작회사 *</Label>
                    <Input
                      value={equipment.manufacturer}
                      onChange={(e) => updateEquipment(equipment.id, 'manufacturer', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>모델/규격</Label>
                    <Input
                      value={equipment.model}
                      onChange={(e) => updateEquipment(equipment.id, 'model', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>기기번호</Label>
                    <Input
                      value={equipment.serialNumber}
                      onChange={(e) => updateEquipment(equipment.id, 'serialNumber', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`uncertified-${equipment.id}`}
                      checked={equipment.isUncertified}
                      onCheckedChange={(checked) => updateEquipment(equipment.id, 'isUncertified', checked)}
                    />
                    <Label htmlFor={`uncertified-${equipment.id}`}>비공인</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>비고</Label>
                    <Textarea
                      value={equipment.notes}
                      onChange={(e) => updateEquipment(equipment.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">접수 방법 *</h3>
              <RadioGroup 
                value={formData.receiptMethod} 
                onValueChange={(value) => updateFormData('receiptMethod', value)}
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
              
              {formData.receiptMethod === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="otherMethod">기타 방법</Label>
                  <Input
                    id="otherMethod"
                    value={formData.otherMethod}
                    onChange={(e) => updateFormData('otherMethod', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">사업자등록증 사본 첨부 *</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                    파일을 선택하거나 여기에 드래그하세요
                  </Label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500">
                    JPG, PNG, PDF 파일만 업로드 가능
                  </p>
                </div>
                {formData.businessRegistration && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {formData.businessRegistration.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">신청 내용 확인</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>신청업체 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>업체명:</strong> {formData.companyName}</p>
                <p><strong>사업자등록번호:</strong> {formData.businessNumber}</p>
                <p><strong>대표자:</strong> {formData.representative}</p>
                <p><strong>주소:</strong> {formData.address}</p>
                <p><strong>전화:</strong> {formData.phone}</p>
                <p><strong>신청인:</strong> {formData.applicantName}</p>
                <p><strong>이메일:</strong> {formData.email}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>기기 정보</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.equipments.map((eq, index) => (
                  <div key={eq.id} className="border-b last:border-b-0 pb-2 mb-2 last:mb-0">
                    <p><strong>기기 #{index + 1}:</strong> {eq.name} ({eq.manufacturer})</p>
                    {eq.model && <p><strong>모델:</strong> {eq.model}</p>}
                    {eq.serialNumber && <p><strong>기기번호:</strong> {eq.serialNumber}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>접수 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{formData.receiptMethod === 'other' ? formData.otherMethod : formData.receiptMethod}</p>
                <p className="mt-2">
                  <strong>첨부파일:</strong> {formData.businessRegistration?.name || '없음'}
                </p>
              </CardContent>
            </Card>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">안내사항</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 본 교정신청서/접수증은 다른 용도로 사용할 수 없습니다.</li>
                <li>• 교정용 부속장비(전원선, TEST LEAD, ACCESSORY) 및 추가기능은 접수 시 상세히 기록하여 주시기 바랍니다.</li>
                <li>• 교정 완료 시 거래명세서를 이메일로 보내드립니다.</li>
                <li>• 당사 방문 출고를 원하는 경우, 방문 1시간 전에 연락 후 방문 바랍니다.</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/test-calibration" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">교정 신청서</h1>
          <p className="text-gray-600 mt-2">정확한 정보를 입력해 주세요.</p>
        </div>

        {/* Stepper */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <Stepper steps={steps} currentStep={currentStep} />
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>
              다음
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={submitForm} className="bg-green-600 hover:bg-green-700">
              신청서 제출
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
