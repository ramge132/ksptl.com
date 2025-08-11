'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { 
  Upload, 
  Plus, 
  Trash2,
  FileText,
  CheckCircle,
  Package,
  Truck,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
            {currentStep > i ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              i + 1
            )}
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

// 시험 항목 매핑
const testItemsMap: Record<string, { name: string, category: string }> = {
  'mask-dust': { name: '방진마스크', category: '마스크' },
  'mask-gas': { name: '방독마스크', category: '마스크' },
  'mask-air': { name: '송기마스크', category: '마스크' },
  'shoe-leather': { name: '가죽제', category: '안전화' },
  'shoe-rubber': { name: '고무제', category: '안전화' },
  'shoe-static-leather': { name: '정전기안전화 (가죽제)', category: '안전화' },
  'shoe-static-rubber': { name: '정전기안전화 (고무제)', category: '안전화' },
  'shoe-instep': { name: '발등안전화', category: '안전화' },
  'shoe-insulation-leather': { name: '절연화 (가죽제)', category: '안전화' },
  'shoe-insulation-rubber': { name: '절연화 (고무제)', category: '안전화' },
  'shoe-insulation-boots': { name: '절연장화', category: '안전화' },
  'suit-heat': { name: '방열복', category: '보호복' },
  'suit-chemical': { name: '화학물질용 보호복', category: '보호복' },
  'fall-protection': { name: '추락방지대', category: '추락방지대' },
  'helmet-ab': { name: 'AB형', category: '안전모' },
  'helmet-ae': { name: 'AE형', category: '안전모' },
  'helmet-abe': { name: 'ABE형', category: '안전모' },
  'glove-voltage': { name: '내전압용', category: '안전장갑' },
  'harness-belt-u': { name: '벨트식 U자 걸이용', category: '안전대' },
  'harness-belt-single': { name: '벨트식 1개 걸이용', category: '안전대' },
  'harness-swing-u': { name: '그네식 U자 걸이용', category: '안전대' },
  'harness-swing-single': { name: '그네식 1개 걸이용', category: '안전대' },
  'harness-block': { name: '안전블럭', category: '안전대' }
}

interface TestSample {
  id: string
  name: string
  manufacturer: string
  model: string
  serialNumber: string
  quantity: number
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
  
  // 고객 요구사항
  requirements: string
  
  // 시험 시료 목록
  samples: TestSample[]
  
  // 접수방법
  receiptMethod: string
  otherMethod: string
  
  // 파일 첨부
  businessRegistration: File | null
  sampleImages: File[]
}

const totalSteps = 4
const stepTitles = [
  '업체 정보',
  '시료 정보',
  '접수 방법',
  '확인 및 제출'
]

const stepIcons = [
  FileText,
  Package,
  Truck,
  Send
]

export default function TestApplicationPage() {
  const params = useParams()
  const testId = params.testId as string
  const testItem = testItemsMap[testId]
  
  const [currentStep, setCurrentStep] = useState(0)
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
    requirements: '',
    samples: [{
      id: '1',
      name: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      quantity: 1,
      notes: ''
    }],
    receiptMethod: '',
    otherMethod: '',
    businessRegistration: null,
    sampleImages: []
  })

  if (!testItem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">잘못된 접근입니다</h2>
            <p className="text-gray-600 mb-4">요청하신 시험 항목을 찾을 수 없습니다.</p>
            <Link href="/test-calibration">
              <Button>시험·교정 메인으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addSample = () => {
    const newSample: TestSample = {
      id: Date.now().toString(),
      name: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      quantity: 1,
      notes: ''
    }
    updateFormData('samples', [...formData.samples, newSample])
  }

  const updateSample = (id: string, field: keyof TestSample, value: any) => {
    const updatedSamples = formData.samples.map(sample => 
      sample.id === id ? { ...sample, [field]: value } : sample
    )
    updateFormData('samples', updatedSamples)
  }

  const removeSample = (id: string) => {
    if (formData.samples.length > 1) {
      updateFormData('samples', formData.samples.filter(sample => sample.id !== id))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      updateFormData('businessRegistration', file)
    }
  }

  const handleSampleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    updateFormData('sampleImages', [...formData.sampleImages, ...files])
  }

  const validateStep = (step: number): { isValid: boolean; message?: string } => {
    switch (step) {
      case 0:
        const missingFields = []
        if (!formData.companyName) missingFields.push('업체명')
        if (!formData.businessNumber) missingFields.push('사업자 등록번호')
        if (!formData.representative) missingFields.push('대표자')
        if (!formData.address) missingFields.push('주소')
        if (!formData.phone) missingFields.push('전화')
        if (!formData.email) missingFields.push('이메일')
        if (!formData.applicantName) missingFields.push('신청인')
        
        if (missingFields.length > 0) {
          return { isValid: false, message: `다음 필수 항목을 입력해주세요: ${missingFields.join(', ')}` }
        }
        return { isValid: true }
        
      case 1:
        for (let i = 0; i < formData.samples.length; i++) {
          const sample = formData.samples[i]
          if (!sample.name || !sample.manufacturer || sample.quantity < 1) {
            return { isValid: false, message: `시료 #${i + 1}의 필수 정보를 모두 입력해주세요 (제품명, 제조사, 수량)` }
          }
        }
        return { isValid: true }
        
      case 2:
        if (!formData.receiptMethod) {
          return { isValid: false, message: '접수 방법을 선택해주세요' }
        }
        if (formData.receiptMethod === 'other' && !formData.otherMethod) {
          return { isValid: false, message: '기타 접수 방법을 입력해주세요' }
        }
        if (!formData.businessRegistration) {
          return { isValid: false, message: '사업자등록증 사본을 첨부해주세요' }
        }
        return { isValid: true }
        
      default:
        return { isValid: true }
    }
  }

  const handleNext = () => {
    const validation = validateStep(currentStep)
    if (validation.isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '필수 항목 누락',
        text: validation.message,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
        position: 'center',
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true
      })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitForm = async () => {
    // 최종 검증
    if (!formData.businessRegistration) {
      Swal.fire({
        icon: 'error',
        title: '파일 첨부 필요',
        text: '사업자등록증을 첨부해주세요.',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: true
      })
      return
    }

    try {
      const submitData = new FormData()
      submitData.append('formData', JSON.stringify({
        ...formData,
        testItem: testItem,
        applicantEmail: formData.email // 신청자 이메일 추가
      }))
      
      if (formData.businessRegistration) {
        submitData.append('businessRegistration', formData.businessRegistration)
      }
      
      formData.sampleImages.forEach((file, index) => {
        submitData.append(`sampleImage_${index}`, file)
      })

      const response = await fetch('/api/submit-test', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: '신청 완료',
          text: '시험 신청이 성공적으로 제출되었습니다!',
          confirmButtonText: '확인',
          confirmButtonColor: '#3B82F6'
        })
        // 메인 페이지로 이동
        window.location.href = '/test-calibration'
      } else {
        throw new Error('제출 실패')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '제출 실패',
        text: '신청서 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        confirmButtonText: '확인',
        confirmButtonColor: '#3B82F6'
      })
      console.error('Error:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
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
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  placeholder="업체명을 입력하세요"
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
                  placeholder="대표자명을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">업태</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => updateFormData('businessType', e.target.value)}
                  placeholder="예: 제조업"
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
                  placeholder="예: 안전용품 제조"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화 *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="02-0000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">주소 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="회사 주소를 입력하세요"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fax">팩스</Label>
                <Input
                  id="fax"
                  value={formData.fax}
                  onChange={(e) => updateFormData('fax', e.target.value)}
                  placeholder="02-0000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">휴대폰</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => updateFormData('mobile', e.target.value)}
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">성적서 발급처</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">부서명</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => updateFormData('department', e.target.value)}
                      placeholder="품질관리부"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="email@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicantName">신청인 *</Label>
                  <Input
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={(e) => updateFormData('applicantName', e.target.value)}
                    placeholder="신청인 성명"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="requirements">고객 요구 사항</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData('requirements', e.target.value)}
                rows={4}
                placeholder="특별한 요구사항이 있으시면 입력해주세요"
              />
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">시험 시료 정보</h3>
              <Button onClick={addSample} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                시료 추가
              </Button>
            </div>
            
            {formData.samples.map((sample, index) => (
              <Card key={sample.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">시료 #{index + 1}</Badge>
                    {formData.samples.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeSample(sample.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>제품명 *</Label>
                      <Input
                        value={sample.name}
                        onChange={(e) => updateSample(sample.id, 'name', e.target.value)}
                        placeholder="제품명을 입력하세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>제조사 *</Label>
                      <Input
                        value={sample.manufacturer}
                        onChange={(e) => updateSample(sample.id, 'manufacturer', e.target.value)}
                        placeholder="제조사명을 입력하세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>모델명</Label>
                      <Input
                        value={sample.model}
                        onChange={(e) => updateSample(sample.id, 'model', e.target.value)}
                        placeholder="모델명 (선택사항)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>시료 수량 *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={sample.quantity}
                        onChange={(e) => updateSample(sample.id, 'quantity', parseInt(e.target.value) || 1)}
                        placeholder="1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>시료번호/로트번호</Label>
                    <Input
                      value={sample.serialNumber}
                      onChange={(e) => updateSample(sample.id, 'serialNumber', e.target.value)}
                      placeholder="시료번호 또는 로트번호 (선택사항)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>비고</Label>
                    <Textarea
                      value={sample.notes}
                      onChange={(e) => updateSample(sample.id, 'notes', e.target.value)}
                      rows={2}
                      placeholder="추가 정보가 있으면 입력해주세요"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed bg-gray-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="text-sm font-semibold mb-2">시료 사진 첨부 (선택사항)</h4>
                  <Label htmlFor="sample-images" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      파일을 선택하거나 드래그하세요
                    </span>
                  </Label>
                  <input
                    id="sample-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSampleImagesUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG 파일만 업로드 가능 (복수 선택 가능)
                  </p>
                  {formData.sampleImages.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-green-600">
                        ✓ {formData.sampleImages.length}개 파일 선택됨
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {formData.sampleImages.map((file, index) => (
                          <div key={index}>{file.name}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">접수 방법 선택 *</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.receiptMethod} 
                  onValueChange={(value) => updateFormData('receiptMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="visit" id="visit" />
                    <Label htmlFor="visit" className="cursor-pointer flex-1">
                      <span className="font-medium">방문</span>
                      <p className="text-sm text-gray-500">직접 방문하여 접수</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="cursor-pointer flex-1">
                      <span className="font-medium">택배</span>
                      <p className="text-sm text-gray-500">택배로 시료 발송</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="cursor-pointer flex-1">
                      <span className="font-medium">픽업</span>
                      <p className="text-sm text-gray-500">담당자가 직접 수거</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer flex-1">
                      <span className="font-medium">기타</span>
                      <p className="text-sm text-gray-500">기타 방법으로 접수</p>
                    </Label>
                  </div>
                </RadioGroup>
                
                {formData.receiptMethod === 'other' && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="otherMethod">기타 방법 설명</Label>
                    <Input
                      id="otherMethod"
                      value={formData.otherMethod}
                      onChange={(e) => updateFormData('otherMethod', e.target.value)}
                      placeholder="접수 방법을 설명해주세요"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-dashed bg-gray-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <h4 className="text-sm font-semibold mb-2">사업자등록증 사본 첨부 *</h4>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      파일을 선택하거나 드래그하세요
                    </span>
                  </Label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG, PDF 파일만 업로드 가능
                  </p>
                  {formData.businessRegistration && (
                    <p className="mt-3 text-sm text-green-600">
                      ✓ {formData.businessRegistration.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">신청 내용을 확인해주세요</h3>
              <p className="text-gray-600">아래 내용이 정확한지 확인 후 제출해주세요</p>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">시험 항목</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge>{testItem.category}</Badge>
                  <span className="font-medium">{testItem.name}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>신청업체 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-gray-600">업체명:</span> {formData.companyName}</div>
                  <div><span className="text-gray-600">사업자등록번호:</span> {formData.businessNumber}</div>
                  <div><span className="text-gray-600">대표자:</span> {formData.representative}</div>
                  <div><span className="text-gray-600">전화:</span> {formData.phone}</div>
                </div>
                <div><span className="text-gray-600">주소:</span> {formData.address}</div>
                <div className="pt-2 border-t">
                  <div><span className="text-gray-600">신청인:</span> {formData.applicantName}</div>
                  <div><span className="text-gray-600">이메일:</span> {formData.email}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>시료 정보</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.samples.map((sample, index) => (
                  <div key={sample.id} className="border-b last:border-b-0 pb-2 mb-2 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">시료 #{index + 1}</Badge>
                      <span className="font-medium">{sample.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>제조사: {sample.manufacturer}</div>
                      {sample.model && <div>모델: {sample.model}</div>}
                      <div>수량: {sample.quantity}개</div>
                      {sample.serialNumber && <div>시료번호: {sample.serialNumber}</div>}
                    </div>
                  </div>
                ))}
                {formData.sampleImages.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-600">시료 사진: {formData.sampleImages.length}개 첨부</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>접수 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">접수 방법:</span> {
                      formData.receiptMethod === 'visit' ? '방문' :
                      formData.receiptMethod === 'delivery' ? '택배' :
                      formData.receiptMethod === 'pickup' ? '픽업' :
                      formData.receiptMethod === 'other' ? formData.otherMethod : ''
                    }
                  </div>
                  <div>
                    <span className="text-gray-600">사업자등록증:</span> {formData.businessRegistration?.name || '미첨부'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-yellow-900">안내사항</h4>
              <ul className="text-sm space-y-1 text-yellow-800">
                <li>• 본 시험신청서는 다른 용도로 사용할 수 없습니다.</li>
                <li>• 시험 시료는 신청서에 기재된 수량으로만 접수됩니다.</li>
                <li>• 시험 완료 시 성적서를 이메일로 발송해드립니다.</li>
                <li>• 시료 반송이 필요한 경우 별도로 연락 바랍니다.</li>
              </ul>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              <FileText className="w-3 h-3 mr-1" />
              온라인 신청
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">{testItem.category} - {testItem.name}</span> 시험 신청
            </h1>
            <p className="text-lg text-muted-foreground">
              아래 양식을 작성하여 시험을 신청해주세요
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="p-4">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">24시간 내 견적</h3>
                  <p className="text-sm text-muted-foreground">신속한 견적 제공</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="text-center">
                <CardContent className="p-4">
                  <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">KOLAS 공인</h3>
                  <p className="text-sm text-muted-foreground">신뢰할 수 있는 성적서</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="text-center">
                <CardContent className="p-4">
                  <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">편리한 접수</h3>
                  <p className="text-sm text-muted-foreground">다양한 접수 방법</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Form Card */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center pb-4">
              <h2 className="text-2xl font-bold">{stepTitles[currentStep]}</h2>
            </CardHeader>
            <CardContent className="p-6">
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
              
              <form onSubmit={(e) => { e.preventDefault(); }}>
                {renderStepContent()}
              </form>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  이전
                </Button>
                
                {currentStep < totalSteps - 1 ? (
                  <Button onClick={handleNext}>
                    다음
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={submitForm} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    신청서 제출
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
