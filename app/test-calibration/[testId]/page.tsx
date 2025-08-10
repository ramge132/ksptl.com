'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Stepper } from '@/components/ui/stepper'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import Link from 'next/link'

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

const steps = ['기본정보', '시료정보', '접수방법', '확인']

export default function TestApplicationPage() {
  const params = useParams()
  const testId = params.testId as string
  const testItem = testItemsMap[testId]
  
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.companyName && formData.businessNumber && formData.representative && 
                 formData.address && formData.phone && formData.email && formData.applicantName)
      case 2:
        return formData.samples.every(sample => sample.name && sample.manufacturer && sample.quantity > 0)
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
      const submitData = new FormData()
      submitData.append('formData', JSON.stringify({
        ...formData,
        testItem: testItem
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
        toast.success('시험 신청이 성공적으로 제출되었습니다!')
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
              <h3 className="text-lg font-semibold">시험 시료 정보</h3>
              <Button onClick={addSample} variant="outline">
                시료 추가
              </Button>
            </div>
            
            {formData.samples.map((sample, index) => (
              <Card key={sample.id} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">시료 #{index + 1}</h4>
                  {formData.samples.length > 1 && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeSample(sample.id)}
                    >
                      삭제
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>제품명 *</Label>
                    <Input
                      value={sample.name}
                      onChange={(e) => updateSample(sample.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>제조사 *</Label>
                    <Input
                      value={sample.manufacturer}
                      onChange={(e) => updateSample(sample.id, 'manufacturer', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>모델명</Label>
                    <Input
                      value={sample.model}
                      onChange={(e) => updateSample(sample.id, 'model', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>시료 수량 *</Label>
                    <Input
                      type="number"
                      min="1"
                      value={sample.quantity}
                      onChange={(e) => updateSample(sample.id, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>시료번호/로트번호</Label>
                    <Input
                      value={sample.serialNumber}
                      onChange={(e) => updateSample(sample.id, 'serialNumber', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>비고</Label>
                    <Textarea
                      value={sample.notes}
                      onChange={(e) => updateSample(sample.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">시료 사진 첨부 (선택사항)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="space-y-2">
                  <Label htmlFor="sample-images" className="cursor-pointer text-blue-600 hover:text-blue-500">
                    시료 사진을 선택하세요 (복수 선택 가능)
                  </Label>
                  <input
                    id="sample-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSampleImagesUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500">
                    JPG, PNG 파일만 업로드 가능
                  </p>
                </div>
                {formData.sampleImages.length > 0 && (
                  <div className="mt-2">
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
            </div>
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
            
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">시험 항목</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>{testItem.category}</strong> - {testItem.name}</p>
              </CardContent>
            </Card>

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
                <CardTitle>시료 정보</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.samples.map((sample, index) => (
                  <div key={sample.id} className="border-b last:border-b-0 pb-2 mb-2 last:mb-0">
                    <p><strong>시료 #{index + 1}:</strong> {sample.name} ({sample.manufacturer})</p>
                    {sample.model && <p><strong>모델:</strong> {sample.model}</p>}
                    <p><strong>수량:</strong> {sample.quantity}개</p>
                    {sample.serialNumber && <p><strong>시료번호:</strong> {sample.serialNumber}</p>}
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
                {formData.sampleImages.length > 0 && (
                  <p className="mt-1">
                    <strong>시료사진:</strong> {formData.sampleImages.length}개
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">안내사항</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• 본 시험신청서는 다른 용도로 사용할 수 없습니다.</li>
                <li>• 시험 시료는 신청서에 기재된 수량으로만 접수됩니다.</li>
                <li>• 시험 완료 시 성적서를 이메일로 발송해드립니다.</li>
                <li>• 시료 반송이 필요한 경우 별도로 연락 바랍니다.</li>
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
          <h1 className="text-3xl font-bold text-gray-900">
            {testItem.category} - {testItem.name} 시험 신청서
          </h1>
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
