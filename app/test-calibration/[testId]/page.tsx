'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
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
  ChevronRight,
  ClipboardCheck
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

// 시험 항목별 세부 시험 목록
const testDetailItems: Record<string, string[]> = {
  'mask-dust': [
    '강도 신장율 및 영구변형율 시험',
    '투시부의 내충격성 시험',
    '여과재 질량 시험'
  ],
  'mask-gas': [
    '강도 신장율 및 영구변형율 시험',
    '투시부의 내충격성 시험',
    '정화통 질량 시험'
  ],
  'mask-air': [
    '호스 및 중압호스 변형 및 구부림 시험',
    '호스 및 중압호스 연결부 인장 시험'
  ],
  'shoe-leather': [
    '내압박성 시험',
    '내충격성 시험',
    '내답발성 시험',
    '박리저항시험',
    '결창인장강도 시험',
    '결창신장율시험',
    '내유부피변화율 시험',
    '내유경도변화율 시험',
    '온면결렬 시험',
    '선심의 내부식성 시험',
    '내답판 내부식성 시험',
    '가죽인열강도 시험'
  ],
  'shoe-rubber': [
    '고무 인장강도 시험',
    '고무 내유부피변화율 시험',
    '안감 및 포파일 시험',
    '내압박성 시험',
    '내충격성 시험',
    '내답판 내부식성 시험',
    '선심의 내부식성 시험',
    '내답발성 시험'
  ],
  'shoe-static-leather': [
    '내압박성 시험',
    '내충격성 시험',
    '내답발성 시험',
    '박리저항시험',
    '결창인장강도 시험',
    '결창신장율시험',
    '내유부피변화율 시험',
    '내유경도변화율 시험',
    '온면결렬 시험',
    '선심의 내부식성 시험',
    '내답판 내부식성 시험',
    '가죽인열강도 시험',
    '대전방지 성능 시험'
  ],
  'shoe-static-rubber': [
    '고무 인장강도 시험',
    '고무 내유부피변화율 시험',
    '안감 및 포파일 시험',
    '내압박성 시험',
    '내충격성 시험',
    '내답판 내부식성 시험',
    '선심의 내부식성 시험',
    '내답발성 시험',
    '대전방지 성능 시험'
  ],
  'shoe-instep': [
    '내압박성 시험',
    '내충격성 시험',
    '내답발성 시험',
    '박리저항시험',
    '결창인장강도 시험',
    '결창신장율시험',
    '내유부피변화율 시험',
    '내유경도변화율 시험',
    '온면결렬 시험',
    '선심의 내부식성 시험',
    '내답판 내부식성 시험',
    '가죽인열강도 시험',
    '방호대 내충격성 시험'
  ],
  'shoe-insulation-leather': [
    '내압박성 시험',
    '내충격성 시험',
    '내답발성 시험',
    '박리저항시험',
    '결창인장강도 시험',
    '결창신장율시험',
    '내유부피변화율 시험',
    '내유경도변화율 시험',
    '온면결렬 시험',
    '선심의 내부식성 시험',
    '내답판 내부식성 시험',
    '가죽인열강도 시험',
    '내전압 시험 (14 000 V)'
  ],
  'shoe-insulation-rubber': [
    '고무 인장강도 시험',
    '고무 내유부피변화율 시험',
    '안감 및 포파일 시험',
    '내압박성 시험',
    '내충격성 시험',
    '내답판 내부식성 시험',
    '선심의 내부식성 시험',
    '내답발성 시험',
    '내전압 시험 (14 000 V)'
  ],
  'shoe-insulation-boots': [
    '내전압 시험 (20 000 V)',
    '고무 인장강도 시험',
    '고무 신장율 시험'
  ],
  'suit-heat': [
    '난연성 시험',
    '절연저항 시험',
    '열전도율 시험',
    '인장강도 시험',
    '내열성 시험',
    '내한성 시험',
    '열충격 시험',
    '안면렌즈의 내충격 시험'
  ],
  'suit-chemical': [
    '인장강도 시험',
    '인열강도 시험',
    '뚫림강도 시험',
    '마모저항 시험',
    '굴곡저항 시험',
    '연소저항 시험',
    '화염저항 시험',
    '슬기강도 시험',
    '접합부 연결강도 시험',
    '안면창 강도 시험',
    '호흡 및 환기호스 연결부 강도 시험'
  ],
  'fall-protection': [
    '구조검사',
    '죔줄 인장강도 시험',
    '죔줄 연결부 인장강도 시험',
    '수직구명줄 인장강도 시험',
    '추락방지대 인장강도 시험',
    '완성품 다리낙하 동하중성능 시험',
    '완성품 머리낙하 동하중성능 시험',
    '정하중성능 시험(목링)',
    '정하중성능 시험(가랭이링)',
    'D링 인장강도 시험',
    '박클 인정강도 시험',
    '훅 인정강도 시험',
    '카라비나 인장강도 시험',
    '훅 수직압축 시험',
    '혹 측면압축 시험'
  ],
  'helmet-ab': [
    '내관통성 시험',
    '충격흡수성 시험',
    '턱끈풀림시험',
    '난연성 시험',
    '내전압성 시험',
    '내수성 시험',
    '측면변형방호 시험'
  ],
  'helmet-ae': [
    '내관통성 시험',
    '충격흡수성 시험',
    '턱끈풀림시험',
    '난연성 시험',
    '내전압성 시험',
    '내수성 시험',
    '측면변형방호 시험'
  ],
  'helmet-abe': [
    '내관통성 시험',
    '충격흡수성 시험',
    '턱끈풀림시험',
    '난연성 시험',
    '내전압성 시험',
    '내수성 시험',
    '측면변형방호 시험'
  ],
  'glove-voltage': [
    '절연내력 시험',
    '인장강도 시험',
    '경년변화 시험',
    '내열성 시험',
    '영구신장율 시험',
    '뚫림강도 시험'
  ],
  'harness-belt-u': [
    '구조검사',
    '죔줄 인장강도 시험',
    '죔줄 연결부 인장강도 시험',
    'D링 인장강도시험',
    '8자링 인장강도 시험',
    '박클 인장강도 시험',
    '훅 인장강도 시험',
    '카라비나 인장강도 시험',
    '훅수직압축 시험',
    '훅 측면압축 시험',
    '충격흡수장치 인장강도 시험',
    '충격흡수장치 신장측정 시험',
    '완성품 동하중성능 시험',
    '충격흡수장치 동하중성능 시험',
    '정하중성능 시험',
    '벨트 인장강도 시험',
    '보조죔줄 동하중성능 시험',
    '지탱벨트 인장강도 시험',
    '보조죔줄 인장강도 시험',
    '각링 인장강도시험',
    '신축조절기 인장강도 시험'
  ],
  'harness-belt-single': [
    '구조검사',
    '죔줄 인장강도 시험',
    '죔줄 연결부 인장강도 시험',
    'D링 인장강도시험',
    '8자링 인장강도 시험',
    '박클 인장강도 시험',
    '훅 인장강도 시험',
    '카라비나 인장강도 시험',
    '훅수직압축 시험',
    '훅 측면압축 시험',
    '충격흡수장치 인장강도 시험',
    '충격흡수장치 신장측정 시험',
    '완성품 동하중성능 시험',
    '충격흡수장치 동하중성능 시험',
    '정하중성능 시험'
  ],
  'harness-swing-u': [
    '구조검사',
    '죔줄 인장강도 시험',
    '죔줄 연결부 인장강도 시험',
    'D링 인장강도시험',
    '8자링 인장강도 시험',
    '박클 인장강도 시험',
    '훅 인장강도 시험',
    '카라비나 인장강도 시험',
    '훅수직압축 시험',
    '훅 측면압축 시험',
    '충격흡수장치 인장강도 시험',
    '충격흡수장치 신장측정 시험',
    '죔줄 다리낙하 동하중성능 시험',
    '죔줄 머리낙하 동하중성능 시험',
    '충격흡수장치 동하중성능 시험',
    '정하중성능 시험 (목링)',
    '정하중성능 시험 (가랭이링)',
    '지탱벨트 인장강도 시험',
    '보조죔줄 다리낙하 동하중성능 시험',
    '보조죔줄 머리낙하 동하중성능 시험',
    '벨트 인장강도 시험',
    '보조죔줄 인장강도 시험',
    '각링 인장강도 시험',
    '신축조절기 인장강도 시험'
  ],
  'harness-swing-single': [
    '구조검사',
    '죔줄 인장강도 시험',
    '죔줄 연결부 인장강도 시험',
    'D링 인장강도시험',
    '8자링 인장강도 시험',
    '박클 인장강도 시험',
    '훅 인장강도 시험',
    '카라비나 인장강도 시험',
    '훅수직압축 시험',
    '훅 측면압축 시험',
    '충격흡수장치 인장강도 시험',
    '충격흡수장치 신장측정 시험',
    '죔줄 다리낙하 동하중성능 시험',
    '죔줄 머리낙하 동하중성능 시험',
    '충격흡수장치 동하중성능 시험',
    '정하중성능 시험 (목링)',
    '정하중성능 시험 (가랭이링)'
  ],
  'harness-block': [
    '구조검사',
    '완성품 다리낙하 동하중성능 시험',
    '완성품 머리낙하 동하중성능 시험',
    '정하중성능 시험 (목링)',
    '정하중성능 시험 (가랭이링)',
    'D링 인장강도 시험',
    '박클 인장강도 시험',
    '훅 인장강도 시험',
    '카라비나 인장강도 시험',
    '훅 수직압축 시험',
    '훅 측면압축 시험',
    '안전블럭 동하중성능 시험',
    '안전블럭 와이어 인장강도 시험',
    '안전블럭 몸체 인장강도 시험',
    '안전블럭 수축하중 시험'
  ]
}

interface TestSample {
  id: string
  name: string
  manufacturer: string
  model: string
  notes: string
}

interface FormData {
  // 신청인 정보
  applicantName: string
  email: string
  mobile: string
  
  // 신청업체 정보
  companyName: string
  address: string
  phone: string
  fax: string
  
  // 시험 항목
  testItems: string[] // 선택된 세부 시험 항목들
  
  // 성적서 타입
  certificateType: string // 'official' or 'unofficial'
  
  // 시험 시료 목록
  samples: TestSample[]
  
  // 시료 접수 방법
  receiptMethod: string
  otherMethod: string
  
  // 시료 반품 방법
  returnMethod: string // 'return' or 'dispose'
  
  // 고객 요구사항
  requirements: string
  
  // 파일 첨부
  businessRegistration: File | null
  sampleImages: File[]
}

const totalSteps = 4
const stepTitles = [
  '기본 정보',
  '시료 정보',
  '시료 접수 및 특별 요청',
  '확인 및 제출'
]

const stepIcons = [
  FileText,
  Package,
  ClipboardCheck,
  Send
]

export default function TestApplicationPage() {
  const params = useParams()
  const testId = params.testId as string
  const testItem = testItemsMap[testId]
  
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    applicantName: '',
    email: '',
    mobile: '',
    companyName: '',
    address: '',
    phone: '',
    fax: '',
    testItems: [],
    certificateType: '',
    samples: [{
      id: '1',
      name: '',
      manufacturer: '',
      model: '',
      notes: ''
    }],
    receiptMethod: '',
    otherMethod: '',
    returnMethod: '',
    requirements: '',
    businessRegistration: null,
    sampleImages: []
  })

  const [dragActive, setDragActive] = useState(false)

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

  const handleTestItemToggle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      testItems: prev.testItems.includes(item)
        ? prev.testItems.filter(i => i !== item)
        : [...prev.testItems, item]
    }))
  }

  const addSample = () => {
    const newSample: TestSample = {
      id: Date.now().toString(),
      name: '',
      manufacturer: '',
      model: '',
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      updateFormData('businessRegistration', file)
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
        if (!formData.applicantName) missingFields.push('신청인')
        if (!formData.email) missingFields.push('이메일')
        if (!formData.companyName) missingFields.push('업체명')
        if (!formData.address) missingFields.push('주소')
        if (!formData.phone) missingFields.push('전화')
        if (formData.testItems.length === 0) missingFields.push('시험 항목')
        if (!formData.certificateType) missingFields.push('성적서 타입')
        if (!formData.businessRegistration) missingFields.push('사업자등록증')
        
        if (missingFields.length > 0) {
          return { isValid: false, message: `다음 필수 항목을 입력해주세요: ${missingFields.join(', ')}` }
        }
        return { isValid: true }
        
      case 1:
        for (let i = 0; i < formData.samples.length; i++) {
          const sample = formData.samples[i]
          if (!sample.name || !sample.manufacturer || !sample.model) {
            return { isValid: false, message: `시료 #${i + 1}의 필수 정보를 모두 입력해주세요 (제품명, 제조사, 모델명)` }
          }
        }
        return { isValid: true }
        
      case 2:
        if (!formData.receiptMethod) {
          return { isValid: false, message: '시료 접수 방법을 선택해주세요' }
        }
        if (formData.receiptMethod === 'other' && !formData.otherMethod) {
          return { isValid: false, message: '기타 접수 방법을 입력해주세요' }
        }
        if (!formData.returnMethod) {
          return { isValid: false, message: '시료 반품 방법을 선택해주세요' }
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
    // 로딩 알람 표시
    Swal.fire({
      title: '신청서 제출 중',
      text: '잠시만 기다려주세요...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const submitData = new FormData()
      submitData.append('formData', JSON.stringify({
        ...formData,
        testItem: testItem,
        applicantEmail: formData.email
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
            {/* 성적서 타입 선택 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">성적서 타입 선택 *</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.certificateType}
                  onValueChange={(value) => updateFormData('certificateType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="official" id="official" />
                    <Label htmlFor="official">공인 성적서</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="unofficial" id="unofficial" />
                    <Label htmlFor="unofficial">비공인 성적서</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 시험 항목 선택 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시험 항목 선택 *</CardTitle>
                <p className="text-sm text-gray-600">
                  {testItem.category} - {testItem.name}의 세부 시험 항목을 선택해주세요
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {testDetailItems[testId] && testDetailItems[testId].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`test-${index}`}
                        checked={formData.testItems.includes(item)}
                        onCheckedChange={() => handleTestItemToggle(item)}
                      />
                      <Label htmlFor={`test-${index}`} className="text-sm cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                    onChange={(e) => updateFormData('applicantName', e.target.value)}
                    placeholder="신청인 이름"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="이메일 주소"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">휴대폰</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => updateFormData('mobile', e.target.value)}
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
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    placeholder="업체명"
                  />
                </div>
                <div>
                  <Label htmlFor="address">주소 *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="주소"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">전화 *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="031-000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fax">팩스</Label>
                    <Input
                      id="fax"
                      value={formData.fax}
                      onChange={(e) => updateFormData('fax', e.target.value)}
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
                      updateFormData('businessRegistration', file)
                    }
                  }}
                  onClick={() => document.getElementById('businessFile')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    파일을 선택하거나 드래그하여 업로드하세요
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    이미지(JPG, PNG) 또는 PDF 파일만 가능합니다
                  </p>
                  <Input
                    id="businessFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {formData.businessRegistration && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-primary font-medium">
                        ✓ {formData.businessRegistration.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(formData.businessRegistration.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
            {/* 시료 정보 */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">시험 시료 정보</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addSample}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    시료 추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.samples.map((sample, index) => (
                  <Card key={sample.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">시료 #{index + 1}</h4>
                      {formData.samples.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSample(sample.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>제품명 *</Label>
                        <Input
                          value={sample.name}
                          onChange={(e) => updateSample(sample.id, 'name', e.target.value)}
                          placeholder="제품명"
                        />
                      </div>
                      <div>
                        <Label>제조사 *</Label>
                        <Input
                          value={sample.manufacturer}
                          onChange={(e) => updateSample(sample.id, 'manufacturer', e.target.value)}
                          placeholder="제조사"
                        />
                      </div>
                      <div>
                        <Label>모델명 *</Label>
                        <Input
                          value={sample.model}
                          onChange={(e) => updateSample(sample.id, 'model', e.target.value)}
                          placeholder="모델명"
                        />
                      </div>
                      <div>
                        <Label>비고</Label>
                        <Input
                          value={sample.notes}
                          onChange={(e) => updateSample(sample.id, 'notes', e.target.value)}
                          placeholder="비고"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* 시료 사진 첨부 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시료 사진 첨부 (선택)</CardTitle>
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
                    const files = Array.from(e.dataTransfer.files)
                    const imageFiles = files.filter(file => file.type.startsWith('image/'))
                    updateFormData('sampleImages', [...formData.sampleImages, ...imageFiles])
                  }}
                  onClick={() => document.getElementById('sampleImages')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    사진 파일을 선택하거나 드래그하여 업로드하세요
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    여러 장의 사진을 한 번에 추가할 수 있습니다
                  </p>
                  <Input
                    id="sampleImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSampleImagesUpload}
                    className="hidden"
                  />
                </div>
                {formData.sampleImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.sampleImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`시료 이미지 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const newImages = formData.sampleImages.filter((_, i) => i !== index)
                              updateFormData('sampleImages', newImages)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
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
            {/* 시료 접수 방법 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시료 접수 방법 *</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  시료를 전달하실 방법을 선택해주세요
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.receiptMethod}
                  onValueChange={(value) => updateFormData('receiptMethod', value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="delivery" className="font-medium">택배</Label>
                        <p className="text-sm text-gray-600">
                          경기 양주시 은현면 화합로 701-11 한국안전용품시험연구원 시험소
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="visit" id="visit" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="visit" className="font-medium">방문</Label>
                        <p className="text-sm text-gray-600">
                          직접 방문하여 시료를 접수합니다 (방문 전 연락 필수)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="other" id="other" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="other" className="font-medium">기타</Label>
                        <p className="text-sm text-gray-600">
                          다른 방법으로 시료를 접수합니다
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
                
                {formData.receiptMethod === 'other' && (
                  <Input
                    className="mt-3"
                    placeholder="기타 접수 방법을 입력해주세요 *"
                    value={formData.otherMethod}
                    onChange={(e) => updateFormData('otherMethod', e.target.value)}
                  />
                )}
              </CardContent>
            </Card>

            {/* 시료 반품 방법 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시료 반품 방법 *</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  시험 완료 후 시료 처리 방법을 선택해주세요
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.returnMethod}
                  onValueChange={(value) => updateFormData('returnMethod', value)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="return" id="return" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="return" className="font-medium">반품</Label>
                        <p className="text-sm text-gray-600">
                          시험 완료 후 시료를 반송해드립니다 (착불)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="dispose" id="dispose" className="mt-0.5" />
                      <div className="space-y-1">
                        <Label htmlFor="dispose" className="font-medium">폐기</Label>
                        <p className="text-sm text-gray-600">
                          시험 완료 후 시료를 폐기합니다 (폐기 비용 발생)
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* 고객 요구사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">고객 요구사항</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => updateFormData('requirements', e.target.value)}
                  placeholder="특별한 요구사항이 있으시면 입력해주세요"
                  rows={4}
                />
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
            {/* 신청 내용 확인 */}
            <Card>
              <CardHeader>
                <CardTitle>신청 내용 확인</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 시험 항목 */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">시험 항목</h3>
                  <p className="text-sm text-gray-600">
                    {testItem.category} - {testItem.name}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">선택한 세부 시험:</p>
                    <div className="space-y-1">
                      {formData.testItems.map((item, index) => (
                        <Badge key={index} variant="secondary" className="mr-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 성적서 타입 */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">성적서 타입</h3>
                  <p className="text-sm">
                    {formData.certificateType === 'official' ? '공인 성적서' : '비공인 성적서'}
                  </p>
                </div>

                {/* 신청인 정보 */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">신청인 정보</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">신청인:</span> {formData.applicantName}</p>
                    <p><span className="font-medium">이메일:</span> {formData.email}</p>
                    {formData.mobile && <p><span className="font-medium">휴대폰:</span> {formData.mobile}</p>}
                  </div>
                </div>

                {/* 신청업체 정보 */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">신청업체 정보</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">업체명:</span> {formData.companyName}</p>
                    <p><span className="font-medium">주소:</span> {formData.address}</p>
                    <p><span className="font-medium">전화:</span> {formData.phone}</p>
                    {formData.fax && <p><span className="font-medium">팩스:</span> {formData.fax}</p>}
                  </div>
                </div>

                {/* 시료 정보 */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">시료 정보</h3>
                  {formData.samples.map((sample, index) => (
                    <div key={sample.id} className="mb-2 p-2 bg-gray-50 rounded">
                      <p className="text-sm font-medium">시료 #{index + 1}</p>
                      <div className="text-sm text-gray-600">
                        <p>제품명: {sample.name}</p>
                        <p>제조사: {sample.manufacturer}</p>
                        <p>모델명: {sample.model}</p>
                        {sample.notes && <p>비고: {sample.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 접수 정보 */}
                <div>
                  <h3 className="font-semibold mb-2">접수 정보</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">시료 접수 방법:</span> {
                      formData.receiptMethod === 'delivery' ? '택배' :
                      formData.receiptMethod === 'visit' ? '방문' :
                      formData.receiptMethod === 'other' ? formData.otherMethod : ''
                    }</p>
                    <p><span className="font-medium">시료 반품 방법:</span> {
                      formData.returnMethod === 'return' ? '반품 (착불)' : '폐기 (폐기 비용 발생)'
                    }</p>
                  </div>
                </div>

                {/* 첨부 파일 */}
                <div>
                  <h3 className="font-semibold mb-2">첨부 파일</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">사업자등록증:</span> {formData.businessRegistration?.name || '미첨부'}</p>
                    <p><span className="font-medium">시료 사진:</span> {formData.sampleImages.length}개 첨부</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <FileText className="w-3 h-3 mr-1" />
            온라인 신청
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">시험</span> 신청서
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            KOLAS 공인 시험기관에서 전문적인 시험 서비스를 받아보세요
          </p>
        </motion.div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-center mb-2">{stepTitles[currentStep]}</h2>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>
            
            {currentStep === totalSteps - 1 ? (
              <Button onClick={submitForm} className="bg-gradient-primary text-white hover:opacity-90">
                <Send className="w-4 h-4 mr-1" />
                제출하기
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-gradient-primary text-white hover:opacity-90">
                다음
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
