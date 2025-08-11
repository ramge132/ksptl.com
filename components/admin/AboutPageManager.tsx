"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, X } from "lucide-react"
import { type AboutPage } from "@/lib/sanity-extended"
import { toast } from "sonner"
import Image from "next/image"

export default function AboutPageManager() {
  const [aboutData, setAboutData] = useState<AboutPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/sanity/about')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setAboutData(data)
          if (data.companyImage?.asset?._ref) {
            const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${data.companyImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
            setImagePreview(imageUrl)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch about data:', error)
      // 초기 데이터 설정 - 기존 웹페이지 텍스트 그대로 사용
      setAboutData({
        _id: 'aboutPage-singleton',
        _type: 'aboutPage',
        heroSince: '2004',
        heroTitle: '한국안전용품시험연구원',
        heroSubtitle: '20년 전통의 시험기 제작 전문 기업, 국내 유일 원스톱 솔루션',
        introTitle1: '시험기 제작부터 교정·시험까지',
        introTitle2: '국내 유일 원스톱 솔루션',
        introParagraph1: '(주)큐로는 시험기 제작 전문 기업으로 대한민국 표준 KS B 5541, KS B 5521, KS B 5533 인증과 국제 표준 ISO 9001:2015, CE를 인증 받아 금속(재료) 시험기, 가구 시험기, 안전용품 시험기, 스포츠용품 시험기, 화학 관련 시험기, 자동차 관련 시험기, 챔버 등을 앞선 기술력으로 제작하고 있습니다.',
        introParagraph2: '시험기 제작으로 축적한 기술력과 경험을 바탕으로 교정검사 및 시험 서비스 분야로 사업 영역을 확장하여, 국내외 규격에 부합하는 정밀 교정과 종합 시험을 전문적으로 수행합니다.',
        introParagraph3: '독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 정확도와 효율성을 극대화하여 고객 성공을 위한 최고의 서비스를 제공합니다.',
        badgeYears: '20',
        badgeText: '년 역사',
        valuesTitle: '핵심 가치',
        valuesSubtitle: '신뢰와 전문성으로 고객과 함께 성장합니다',
        value1Title: '신뢰성',
        value1Description: 'KOLAS 공인 인증과 20년 경험으로 검증된 신뢰할 수 있는 서비스',
        value2Title: '전문성',
        value2Description: '시험기 제작부터 시험·교정까지 모든 과정의 전문 기술력 보유',
        value3Title: '고객중심',
        value3Description: '신속한 견적과 정확한 처리로 고객 만족도 극대화',
        businessTitle: '사업 분야',
        businessSubtitle: '시험기 제작부터 교정·시험까지 원스톱 서비스를 제공합니다',
        business1Title: '시험기 제작',
        business1Description: '전 분야 시험기 주문 제작',
        business1Item1: '금속(재료) 시험기',
        business1Item2: '안전용품 시험기',
        business1Item3: '가구/스포츠용품 시험기',
        business1Item4: '화학/자동차 관련 시험기',
        business2Title: '활선접근경보기',
        business2Description: '전압 노출시 사용자를 감전으로부터 보호',
        business2Item1: '특허 등록 제품',
        business2Item2: '높은 감지 정확도',
        business2Item3: '휴대성 및 편의성',
        business2Item4: '산업 현장 필수품',
        business3Title: '교정검사',
        business3Description: 'KOLAS 공인교정기관 / 교정성적서 발급',
        business3Item1: 'KC23-420 인정',
        business3Item2: '국가 공인 교정',
        business3Item3: '정밀 측정 보증',
        business3Item4: '신속한 처리',
        business4Title: '시험',
        business4Description: 'KOLAS 공인시험기관 / 시험성적서 발급',
        business4Item1: '227종 안전용품 시험',
        business4Item2: '국제 규격 준수',
        business4Item3: '공인 성적서 발급',
        business4Item4: '원스톱 서비스',
        processTitle: '시험 절차',
        processSubtitle: '체계적인 프로세스로 정확하고 신속한 서비스를 제공합니다',
        processStep1: '접수',
        processStep2: '시험·교정',
        processStep3: '성적서 발급',
        processStep4: '납품',
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!aboutData) return
    
    setLoading(true)
    try {
      let updatedData = { ...aboutData }
      
      // 이미지 업로드 처리
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('dataset', 'production')
        
        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json()
          updatedData.companyImage = uploadResult.image
        }
      }
      
      // API 엔드포인트를 통해 업데이트
      const response = await fetch('/api/sanity/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      
      if (response.ok) {
        const result = await response.json()
        toast.success("기관개요 페이지가 성공적으로 업데이트되었습니다.")
        setAboutData(result)
      } else {
        toast.error("업데이트 중 오류가 발생했습니다.")
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error("저장 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const handleFieldChange = (field: keyof AboutPage, value: string) => {
    if (aboutData) {
      setAboutData({
        ...aboutData,
        [field]: value
      })
    }
  }

  if (!aboutData) {
    return <div>로딩중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">기관개요 페이지 관리</h2>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "저장 중..." : "변경사항 저장"}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero 섹션</TabsTrigger>
          <TabsTrigger value="intro">소개 섹션</TabsTrigger>
          <TabsTrigger value="values">핵심 가치</TabsTrigger>
          <TabsTrigger value="business">사업 분야</TabsTrigger>
          <TabsTrigger value="process">시험 절차</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero 섹션</CardTitle>
              <CardDescription>
                기관개요 페이지 상단의 메인 텍스트를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heroSince">Since 연도</Label>
                <Input
                  id="heroSince"
                  value={aboutData.heroSince || ''}
                  onChange={(e) => handleFieldChange('heroSince', e.target.value)}
                  placeholder="예: Since 1994"
                />
              </div>
              <div>
                <Label htmlFor="heroTitle">메인 제목</Label>
                <Input
                  id="heroTitle"
                  value={aboutData.heroTitle || ''}
                  onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                  placeholder="예: 한국안전용품시험연구원"
                />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">부제목</Label>
                <Input
                  id="heroSubtitle"
                  value={aboutData.heroSubtitle || ''}
                  onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
                  placeholder="예: 국내 유일 시험기 제작·시험·교정 통합 수행기관"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>소개 섹션</CardTitle>
              <CardDescription>
                회사 소개 내용을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="introTitle1">소개 제목 첫 번째 줄</Label>
                <Input
                  id="introTitle1"
                  value={aboutData.introTitle1 || ''}
                  onChange={(e) => handleFieldChange('introTitle1', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="introTitle2">소개 제목 두 번째 줄 (강조)</Label>
                <Input
                  id="introTitle2"
                  value={aboutData.introTitle2 || ''}
                  onChange={(e) => handleFieldChange('introTitle2', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="introParagraph1">소개 문단 1</Label>
                <Textarea
                  id="introParagraph1"
                  value={aboutData.introParagraph1 || ''}
                  onChange={(e) => handleFieldChange('introParagraph1', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="introParagraph2">소개 문단 2</Label>
                <Textarea
                  id="introParagraph2"
                  value={aboutData.introParagraph2 || ''}
                  onChange={(e) => handleFieldChange('introParagraph2', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="introParagraph3">소개 문단 3</Label>
                <Textarea
                  id="introParagraph3"
                  value={aboutData.introParagraph3 || ''}
                  onChange={(e) => handleFieldChange('introParagraph3', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label>대표 사진</Label>
                <div className="mt-2 space-y-2">
                  {imagePreview && (
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setImagePreview(null)
                          setImageFile(null)
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="company-image"
                    />
                    <Label
                      htmlFor="company-image"
                      className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      이미지 업로드
                    </Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badgeYears">연혁 연수</Label>
                  <Input
                    id="badgeYears"
                    value={aboutData.badgeYears || ''}
                    onChange={(e) => handleFieldChange('badgeYears', e.target.value)}
                    placeholder="예: 20년 전통"
                  />
                </div>
                <div>
                  <Label htmlFor="badgeText">연혁 텍스트</Label>
                  <Input
                    id="badgeText"
                    value={aboutData.badgeText || ''}
                    onChange={(e) => handleFieldChange('badgeText', e.target.value)}
                    placeholder="예: 신뢰의 파트너"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>핵심 가치</CardTitle>
              <CardDescription>
                회사의 핵심 가치를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="valuesTitle">핵심 가치 제목</Label>
                <Input
                  id="valuesTitle"
                  value={aboutData.valuesTitle || ''}
                  onChange={(e) => handleFieldChange('valuesTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="valuesSubtitle">핵심 가치 부제목</Label>
                <Input
                  id="valuesSubtitle"
                  value={aboutData.valuesSubtitle || ''}
                  onChange={(e) => handleFieldChange('valuesSubtitle', e.target.value)}
                />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">가치 1</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.value1Title || ''}
                    onChange={(e) => handleFieldChange('value1Title', e.target.value)}
                    placeholder="제목 (예: 신뢰성)"
                  />
                  <Textarea
                    value={aboutData.value1Description || ''}
                    onChange={(e) => handleFieldChange('value1Description', e.target.value)}
                    placeholder="설명"
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">가치 2</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.value2Title || ''}
                    onChange={(e) => handleFieldChange('value2Title', e.target.value)}
                    placeholder="제목 (예: 전문성)"
                  />
                  <Textarea
                    value={aboutData.value2Description || ''}
                    onChange={(e) => handleFieldChange('value2Description', e.target.value)}
                    placeholder="설명"
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">가치 3</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.value3Title || ''}
                    onChange={(e) => handleFieldChange('value3Title', e.target.value)}
                    placeholder="제목 (예: 고객중심)"
                  />
                  <Textarea
                    value={aboutData.value3Description || ''}
                    onChange={(e) => handleFieldChange('value3Description', e.target.value)}
                    placeholder="설명"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>사업 분야</CardTitle>
              <CardDescription>
                사업 분야 정보를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessTitle">사업 분야 제목</Label>
                <Input
                  id="businessTitle"
                  value={aboutData.businessTitle || ''}
                  onChange={(e) => handleFieldChange('businessTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="businessSubtitle">사업 분야 부제목</Label>
                <Input
                  id="businessSubtitle"
                  value={aboutData.businessSubtitle || ''}
                  onChange={(e) => handleFieldChange('businessSubtitle', e.target.value)}
                />
              </div>
              
              {/* 사업 분야 1 */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">사업 분야 1</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.business1Title || ''}
                    onChange={(e) => handleFieldChange('business1Title', e.target.value)}
                    placeholder="제목 (예: 시험기 제작)"
                  />
                  <Input
                    value={aboutData.business1Description || ''}
                    onChange={(e) => handleFieldChange('business1Description', e.target.value)}
                    placeholder="설명"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={aboutData.business1Item1 || ''}
                      onChange={(e) => handleFieldChange('business1Item1', e.target.value)}
                      placeholder="항목 1"
                    />
                    <Input
                      value={aboutData.business1Item2 || ''}
                      onChange={(e) => handleFieldChange('business1Item2', e.target.value)}
                      placeholder="항목 2"
                    />
                    <Input
                      value={aboutData.business1Item3 || ''}
                      onChange={(e) => handleFieldChange('business1Item3', e.target.value)}
                      placeholder="항목 3"
                    />
                    <Input
                      value={aboutData.business1Item4 || ''}
                      onChange={(e) => handleFieldChange('business1Item4', e.target.value)}
                      placeholder="항목 4"
                    />
                  </div>
                </div>
              </div>
              
              {/* 사업 분야 2 */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">사업 분야 2</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.business2Title || ''}
                    onChange={(e) => handleFieldChange('business2Title', e.target.value)}
                    placeholder="제목 (예: 활선접근경보기)"
                  />
                  <Input
                    value={aboutData.business2Description || ''}
                    onChange={(e) => handleFieldChange('business2Description', e.target.value)}
                    placeholder="설명"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      value={aboutData.business2Item1 || ''}
                      onChange={(e) => handleFieldChange('business2Item1', e.target.value)}
                      placeholder="항목 1"
                    />
                    <Input
                      value={aboutData.business2Item2 || ''}
                      onChange={(e) => handleFieldChange('business2Item2', e.target.value)}
                      placeholder="항목 2"
                    />
                    <Input
                      value={aboutData.business2Item3 || ''}
                      onChange={(e) => handleFieldChange('business2Item3', e.target.value)}
                      placeholder="항목 3"
                    />
                  </div>
                </div>
              </div>
              
              {/* 사업 분야 3 */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">사업 분야 3</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.business3Title || ''}
                    onChange={(e) => handleFieldChange('business3Title', e.target.value)}
                    placeholder="제목 (예: 교정검사)"
                  />
                  <Input
                    value={aboutData.business3Description || ''}
                    onChange={(e) => handleFieldChange('business3Description', e.target.value)}
                    placeholder="설명"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      value={aboutData.business3Item1 || ''}
                      onChange={(e) => handleFieldChange('business3Item1', e.target.value)}
                      placeholder="항목 1"
                    />
                    <Input
                      value={aboutData.business3Item2 || ''}
                      onChange={(e) => handleFieldChange('business3Item2', e.target.value)}
                      placeholder="항목 2"
                    />
                    <Input
                      value={aboutData.business3Item3 || ''}
                      onChange={(e) => handleFieldChange('business3Item3', e.target.value)}
                      placeholder="항목 3"
                    />
                  </div>
                </div>
              </div>
              
              {/* 사업 분야 4 */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">사업 분야 4</h4>
                <div className="space-y-3">
                  <Input
                    value={aboutData.business4Title || ''}
                    onChange={(e) => handleFieldChange('business4Title', e.target.value)}
                    placeholder="제목 (예: 시험)"
                  />
                  <Input
                    value={aboutData.business4Description || ''}
                    onChange={(e) => handleFieldChange('business4Description', e.target.value)}
                    placeholder="설명"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      value={aboutData.business4Item1 || ''}
                      onChange={(e) => handleFieldChange('business4Item1', e.target.value)}
                      placeholder="항목 1"
                    />
                    <Input
                      value={aboutData.business4Item2 || ''}
                      onChange={(e) => handleFieldChange('business4Item2', e.target.value)}
                      placeholder="항목 2"
                    />
                    <Input
                      value={aboutData.business4Item3 || ''}
                      onChange={(e) => handleFieldChange('business4Item3', e.target.value)}
                      placeholder="항목 3"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>시험 절차</CardTitle>
              <CardDescription>
                시험 절차 프로세스를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="processTitle">시험 절차 제목</Label>
                <Input
                  id="processTitle"
                  value={aboutData.processTitle || ''}
                  onChange={(e) => handleFieldChange('processTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="processSubtitle">시험 절차 부제목</Label>
                <Input
                  id="processSubtitle"
                  value={aboutData.processSubtitle || ''}
                  onChange={(e) => handleFieldChange('processSubtitle', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="processStep1">절차 1</Label>
                  <Input
                    id="processStep1"
                    value={aboutData.processStep1 || ''}
                    onChange={(e) => handleFieldChange('processStep1', e.target.value)}
                    placeholder="예: 접수"
                  />
                </div>
                <div>
                  <Label htmlFor="processStep2">절차 2</Label>
                  <Input
                    id="processStep2"
                    value={aboutData.processStep2 || ''}
                    onChange={(e) => handleFieldChange('processStep2', e.target.value)}
                    placeholder="예: 시험·교정"
                  />
                </div>
                <div>
                  <Label htmlFor="processStep3">절차 3</Label>
                  <Input
                    id="processStep3"
                    value={aboutData.processStep3 || ''}
                    onChange={(e) => handleFieldChange('processStep3', e.target.value)}
                    placeholder="예: 성적서 발급"
                  />
                </div>
                <div>
                  <Label htmlFor="processStep4">절차 4</Label>
                  <Input
                    id="processStep4"
                    value={aboutData.processStep4 || ''}
                    onChange={(e) => handleFieldChange('processStep4', e.target.value)}
                    placeholder="예: 납품"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
