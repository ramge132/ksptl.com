'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import HeroSectionManager from './hero-section-manager'
import TestCategoryManager from '@/components/admin/TestCategoryManager'
import CertificatesManager from '@/components/admin/CertificatesManager'
import AboutPageManager from '@/components/admin/AboutPageManager'
import { getAwards, type Award, getTimeline, type Timeline } from '@/lib/sanity'
import {
  getLandingPage,
  updateLandingPage,
  type LandingPage
} from '@/lib/sanity-extended'

// 기본 데이터
const DEFAULT_LANDING_PAGE: LandingPage = {
  _id: 'landingPage-singleton',
  _type: 'landingPage',
  
  // Hero 섹션 기본값
  heroTitleLine1: '한국 안전용품',
  heroTitleLine2: '시험연구원',
  heroSubtitle: '국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관',
  heroDescription: 'KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다',
  heroFeature1: 'KOLAS 공인 시험·교정 기관',
  heroFeature2: '국내 유일 통합 수행 기관',
  heroFeature3: '신속한 견적 및 처리',
  heroButtonText: '무료 견적 진행',
  heroStat1Value: '20+',
  heroStat1Label: '년 경력',
  heroStat2Value: '1,000+',
  heroStat2Label: '고객사',
  heroStat3Value: '5,000+',
  heroStat3Label: '작업 건수',
  heroStat4Value: '24H',
  heroStat4Label: '빠른 대응',
  
  // WhyChooseUs 기본값
  whyTitle1: '왜',
  whyTitle2: '한국안전용품시험연구원',
  whyTitle3: '을',
  whyTitle4: '선택해야 할까요?',
  whyBottomText1: '국내 유일의 시험기 제작 전문기업이자 KOLAS 공인 시험·교정 기관으로서',
  whyBottomText2: '고객 성공을 위한 최고의 서비스를 제공합니다',
  
  whyCard1Highlight: 'One-Stop Solution',
  whyCard1Title: '국내 유일 원스톱 서비스',
  whyCard1Description: '시험기 제작부터 교정·시험까지 모든 과정을 한 곳에서 해결할 수 있는 국내 유일의 업체입니다.',
  
  whyCard2Highlight: 'Government Certified',
  whyCard2Title: 'KOLAS 공인기관',
  whyCard2Description: 'KOLAS 공인교정기관(KC23-420) 및 공인시험기관으로서 국가가 인정한 신뢰할 수 있는 기관입니다.',
  
  whyCard3Highlight: 'Proven Expertise',
  whyCard3Title: '축적된 기술력',
  whyCard3Description: '시험기 제작 전문 기업으로서 수십 년간 축적한 기술력과 경험을 바탕으로 정확한 시험·교정을 제공합니다.',
  
  whyCard4Highlight: 'Precision Guaranteed',
  whyCard4Title: '정밀한 교정·시험',
  whyCard4Description: '국내외 규격에 부합하는 정밀 교정과 종합 시험으로 최고의 정확도를 보장합니다.',
  
  whyCard5Highlight: 'International Standards',
  whyCard5Title: '다양한 국제 인증',
  whyCard5Description: 'KS, ISO 9001:2015, CE 등 다양한 국제 인증을 보유하여 글로벌 표준에 부합하는 서비스를 제공합니다.',
  
  whyCard6Highlight: 'Maximized Efficiency',
  whyCard6Title: '효율성 극대화',
  whyCard6Description: '독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 효율성을 극대화합니다.',
  
  // Services 기본값
  servicesTitle1: '시험·교정',
  servicesTitle2: '서비스',
  servicesDescription1: 'KOLAS 인증 시험 기관으로 총 227종의 안전용품 시험이 가능합니다.',
  servicesDescription2: '정확하고 신뢰할 수 있는 시험 서비스를 제공합니다',
  servicesButtonText: '자세히 보기',
  
  service1Title: '마스크',
  service1Description: '방진, 방독, 송기마스크 시험',
  service1Item1: '강도 신장율 및 영구변형율 시험',
  service1Item2: '투시부의 내충격성 시험',
  service1Item3: '여과재 질량 시험',
  service1Count: 5,
  
  service2Title: '안전화',
  service2Description: '가죽제, 고무제, 정전기안전화, 절연화',
  service2Item1: '내압박성 시험',
  service2Item2: '내충격성 시험',
  service2Item3: '박리저항시험',
  service2Count: 77,
  
  service3Title: '보호복',
  service3Description: '방열복, 화학물질용 보호복',
  service3Item1: '난연성 시험',
  service3Item2: '인장강도 시험',
  service3Item3: '내열성 시험',
  service3Count: 16,
  
  service4Title: '추락방지대',
  service4Description: '추락방지대 전문 시험',
  service4Item1: '구조검사',
  service4Item2: '죔줄 인장강도 시험',
  service4Item3: '동하중성능 시험',
  service4Count: 12,
  
  service5Title: '안전모',
  service5Description: 'AB형, AE형, ABE형',
  service5Item1: '내관통성 시험',
  service5Item2: '충격흡수성 시험',
  service5Item3: '난연성 시험',
  service5Count: 4,
  
  service6Title: '안전대 / 안전장갑',
  service6Description: '벨트식, 그네식, 안전블럭, 내전압용',
  service6Item1: '구조검사',
  service6Item2: '인장강도 시험',
  service6Item3: '충격흡수',
  service6Count: 95,
  
  // 인증서 섹션 기본값
  certificatesTitle1: '인증서 및',
  certificatesTitle2: '특허',
  certificatesDescription: '국내외 공인 인증과 특허로 검증된 기술력',
  
  // 연혁 섹션 기본값
  timelineTitle1: '20년',
  timelineTitle2: '의 역사',
  timelineDescription: '끊임없는 혁신과 도전으로 성장해온 발자취',
  
  // 오시는길 섹션 기본값
  locationTitle1: '오시는',
  locationTitle2: '길',
  locationDescription: '본사 및 시험소 위치 안내',
  mainOfficeAddress: '경기 양주시 은현면 화합로 941번길 83',
  mainOfficeTel: '031-862-8556~7',
  testLabAddress: '경기 양주시 은현면 화합로 701-11',
  testLabTel: '031-858-3012',
  operatingHours1: '평일 09:00 - 18:00',
  operatingHours2: '토요일 09:00 - 13:00',
  operatingHours3: '일요일 및 공휴일 휴무',
  
  // 문의하기 섹션 기본값
  contactTitle1: '문의',
  contactTitle2: '하기',
  contactDescription: '시험·교정에 대한 견적 및 기술 상담을 도와드립니다',
  contactPhoneTitle: '전화 문의',
  contactPhoneNumber: '031-862-8556',
  contactPhoneHours: '평일 09:00 - 18:00',
  contactEmailTitle: '이메일',
  contactEmailAddress: 'ymy@quro.co.kr',
  contactEmailDescription: '24시간 접수 가능',
  contactTimeTitle: '처리 시간',
  contactTimeValue: '24시간 내',
  contactTimeDescription: '견적 및 답변 제공',
  contactFormCompanyLabel: '업체명 *',
  contactFormCompanyPlaceholder: '업체명을 입력하세요',
  contactFormNameLabel: '담당자명 *',
  contactFormNamePlaceholder: '담당자명을 입력하세요',
  contactFormPhoneLabel: '연락처 *',
  contactFormPhonePlaceholder: '010-0000-0000',
  contactFormEmailLabel: '이메일 *',
  contactFormEmailPlaceholder: 'example@company.com',
  contactFormTypeLabel: '문의 유형 *',
  contactFormTypePlaceholder: '문의 유형을 선택하세요',
  contactFormMessageLabel: '문의 내용 *',
  contactFormMessagePlaceholder: '문의하실 내용을 자세히 작성해주세요',
  contactFormNotice1: '• 작성하신 내용은 담당자 검토 후 24시간 내 답변드립니다.',
  contactFormNotice2: '• 급한 문의는 대표번호 031-862-8556로 연락주시기 바랍니다.',
  contactButtonText: '문의 보내기',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null)
  const [awards, setAwards] = useState<Award[]>([])
  const [timeline, setTimeline] = useState<Timeline[]>([])
  const [newTimelineItem, setNewTimelineItem] = useState<any>(null)
  const [editingTimelineItem, setEditingTimelineItem] = useState<any>(null)

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        toast.success('로그인 성공')
        loadData()
      } else {
        toast.error('비밀번호가 잘못되었습니다')
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다')
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      // 랜딩페이지 데이터 로드
      const landingResponse = await fetch('/api/sanity/landing')
      const landingData = await landingResponse.json()
      // 데이터가 없거나 불완전한 경우 DEFAULT_LANDING_PAGE로 채우기
      const mergedData = landingData ? { ...DEFAULT_LANDING_PAGE, ...landingData } : DEFAULT_LANDING_PAGE
      setLandingPage(mergedData)

      // 수상/인증 데이터 로드
      const awardsResponse = await fetch('/api/sanity/awards')
      const awardsData = await awardsResponse.json()
      setAwards(awardsData || [])

      // 연혁 데이터 로드
      const timelineResponse = await fetch('/api/sanity/timeline')
      const timelineData = await timelineResponse.json()
      setTimeline(timelineData || [])
    } catch (error) {
      console.error('데이터 로드 실패:', error)
      toast.error('데이터 로드에 실패했습니다')
      setLandingPage(DEFAULT_LANDING_PAGE)
    } finally {
      setLoading(false)
    }
  }

  const saveLandingPage = async (data: Partial<LandingPage>) => {
    const response = await fetch('/api/sanity/landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to save')
    }
    // 저장 후 데이터 새로고침
    loadData()
  }

  useEffect(() => {
    // 개발 모드에서는 자동 로그인 (선택사항)
    if (process.env.NODE_ENV === 'development') {
      // setIsAuthenticated(true)
      // loadData()
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">관리자 로그인</CardTitle>
            <CardDescription className="text-center">한국안전용품시험연구원 웹사이트 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              로그인
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">한국안전용품시험연구원 관리자</h1>
              <p className="text-sm text-gray-600 mt-1">웹사이트 콘텐츠를 관리할 수 있습니다</p>
            </div>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="main" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="main">메인페이지</TabsTrigger>
            <TabsTrigger value="about">기관개요</TabsTrigger>
            <TabsTrigger value="test">시험교정</TabsTrigger>
            <TabsTrigger value="support">고객지원</TabsTrigger>
            <TabsTrigger value="resources">자료실</TabsTrigger>
            <TabsTrigger value="footer">하단정보</TabsTrigger>
          </TabsList>

          {/* 메인페이지 관리 */}
          <TabsContent value="main" className="relative">
            {/* 우측 목차 네비게이션 */}
            <div className="fixed right-8 top-48 w-56 hidden xl:block">
              <Card className="p-4">
                <h3 className="font-semibold text-sm mb-3">페이지 섹션</h3>
                <nav className="space-y-2">
                  <a 
                    href="#hero-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('hero-section')
                      if (element) {
                        const offset = 100 // 네비게이션 바 높이 + 여유 공간
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    📌 Hero 섹션
                  </a>
                  <a 
                    href="#why-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('why-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    🎯 왜 우리를 선택해야 하는가
                  </a>
                  <a 
                    href="#services-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('services-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    🔧 시험·교정 서비스
                  </a>
                  <a 
                    href="#certificates-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('certificates-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    🏆 인증서 및 특허
                  </a>
                  <a 
                    href="#timeline-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('timeline-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    📅 연혁
                  </a>
                  <a 
                    href="#location-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('location-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    📍 오시는 길
                  </a>
                  <a 
                    href="#contact-section" 
                    className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById('contact-section')
                      if (element) {
                        const offset = 100
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY
                        window.scrollTo({
                          top: elementPosition - offset,
                          behavior: 'smooth'
                        })
                      }
                    }}
                  >
                    💬 문의하기
                  </a>
                </nav>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">💡 섹션을 클릭하면 해당 위치로 이동합니다</p>
                </div>
              </Card>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="space-y-6 mr-0 xl:mr-64">
              {landingPage && (
                <div id="hero-section">
                  <HeroSectionManager
                    landingPage={landingPage}
                    onSave={saveLandingPage}
                  />
                </div>
              )}
              
              {/* 왜 선택해야 하는가 섹션 */}
              <Card id="why-section">
              <CardHeader>
                <CardTitle>왜 우리를 선택해야 하는가</CardTitle>
                <CardDescription>섹션 제목과 모든 카드 내용을 수정할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 제목 섹션 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">섹션 제목</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>첫 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.whyTitle1 || '왜'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyTitle1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>두 번째 줄 (강조)</Label>
                      <Input 
                        defaultValue={landingPage?.whyTitle2 || '한국안전용품시험연구원'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyTitle2: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>세 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.whyTitle3 || '을'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyTitle3: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>네 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.whyTitle4 || '선택해야 할까요?'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyTitle4: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                </div>

                {/* 카드 섹션 */}
                <div className="space-y-4">
                  <h4 className="font-semibold">카드 내용</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div key={num} className="border rounded-lg p-4">
                        <h5 className="font-semibold mb-3">카드 {num}</h5>
                        <div className="space-y-3">
                          <div>
                            <Label>하이라이트 (영문)</Label>
                            <Input 
                              defaultValue={landingPage?.[`whyCard${num}Highlight` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`whyCard${num}Highlight`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>제목</Label>
                            <Input 
                              defaultValue={landingPage?.[`whyCard${num}Title` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`whyCard${num}Title`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>설명</Label>
                            <textarea 
                              className="w-full p-2 border rounded"
                              rows={3}
                              defaultValue={landingPage?.[`whyCard${num}Description` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`whyCard${num}Description`]: e.target.value} : prev)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단 텍스트 */}
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-semibold">하단 텍스트</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>첫 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.whyBottomText1 || ''}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyBottomText1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>두 번째 줄 (강조)</Label>
                      <Input 
                        defaultValue={landingPage?.whyBottomText2 || ''}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, whyBottomText2: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => saveLandingPage(landingPage!)}
                >
                  저장
                </Button>
              </CardContent>
            </Card>

              {/* 시험·교정 서비스 섹션 */}
              <Card id="services-section">
              <CardHeader>
                <CardTitle>시험·교정 서비스</CardTitle>
                <CardDescription>섹션 제목, 설명, 6개 서비스 카드 내용을 수정할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 제목 및 설명 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">섹션 제목 및 설명</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>제목 첫 번째 부분</Label>
                      <Input 
                        defaultValue={landingPage?.servicesTitle1 || '시험·교정'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, servicesTitle1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>제목 두 번째 부분</Label>
                      <Input 
                        defaultValue={landingPage?.servicesTitle2 || '서비스'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, servicesTitle2: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label>설명 첫 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.servicesDescription1 || ''}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, servicesDescription1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>설명 두 번째 줄</Label>
                      <Input 
                        defaultValue={landingPage?.servicesDescription2 || ''}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, servicesDescription2: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>버튼 텍스트</Label>
                      <Input 
                        defaultValue={landingPage?.servicesButtonText || '자세히 보기'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, servicesButtonText: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                </div>

                {/* 서비스 카드들 */}
                <div className="space-y-4">
                  <h4 className="font-semibold">서비스 카드 내용</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <div key={num} className="border rounded-lg p-4">
                        <h5 className="font-semibold mb-3">서비스 {num}</h5>
                        <div className="space-y-3">
                          <div>
                            <Label>제목</Label>
                            <Input 
                              value={landingPage?.[`service${num}Title` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Title`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>설명</Label>
                            <Input 
                              value={landingPage?.[`service${num}Description` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Description`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>항목 1</Label>
                            <Input 
                              value={landingPage?.[`service${num}Item1` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Item1`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>항목 2</Label>
                            <Input 
                              value={landingPage?.[`service${num}Item2` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Item2`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>항목 3</Label>
                            <Input 
                              value={landingPage?.[`service${num}Item3` as keyof LandingPage] as string || ''}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Item3`]: e.target.value} : prev)}
                            />
                          </div>
                          <div>
                            <Label>추가 개수 (외 X종)</Label>
                            <Input 
                              type="number"
                              value={landingPage?.[`service${num}Count` as keyof LandingPage] as number || 0}
                              onChange={(e) => setLandingPage(prev => prev ? {...prev, [`service${num}Count`]: parseInt(e.target.value) || 0} : prev)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => saveLandingPage(landingPage!)}
                >
                  저장
                </Button>
              </CardContent>
            </Card>


              {/* 인증서 및 특허 섹션 */}
              <div id="certificates-section" className="space-y-6">
                {/* 섹션 제목 및 설명 카드 */}
                <Card>
                  <CardHeader>
                    <CardTitle>인증서 및 특허 섹션 제목</CardTitle>
                    <CardDescription>메인페이지에 표시되는 섹션 제목과 설명을 수정할 수 있습니다</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>제목 첫 번째 부분</Label>
                        <Input 
                          value={landingPage?.certificatesTitle1 || '인증서 및'}
                          onChange={(e) => setLandingPage(prev => prev ? {...prev, certificatesTitle1: e.target.value} : prev)}
                        />
                      </div>
                      <div>
                        <Label>제목 두 번째 부분 (강조)</Label>
                        <Input 
                          value={landingPage?.certificatesTitle2 || '특허'}
                          onChange={(e) => setLandingPage(prev => prev ? {...prev, certificatesTitle2: e.target.value} : prev)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>설명</Label>
                      <Input 
                        value={landingPage?.certificatesDescription || '국내외 공인 인증과 특허로 검증된 기술력'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, certificatesDescription: e.target.value} : prev)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => saveLandingPage(landingPage!)}
                    >
                      섹션 정보 저장
                    </Button>
                  </CardContent>
                </Card>

                {/* 인증서 관리 컴포넌트 */}
                <CertificatesManager awards={awards} loadData={loadData} />
              </div>

              {/* 연혁 섹션 */}
              <Card id="timeline-section">
              <CardHeader>
                <CardTitle>연혁 관리</CardTitle>
                <CardDescription>회사 연혁을 추가, 수정, 삭제할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 연혁 섹션 제목 및 설명 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">섹션 제목 및 설명</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>제목 첫 번째 부분</Label>
                      <Input 
                        value={landingPage?.timelineTitle1 || '20년'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, timelineTitle1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>제목 두 번째 부분</Label>
                      <Input 
                        value={landingPage?.timelineTitle2 || '의 역사'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, timelineTitle2: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>설명</Label>
                    <Input 
                      value={landingPage?.timelineDescription || '끊임없는 혁신과 도전으로 성장해온 발자취'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, timelineDescription: e.target.value} : prev)}
                    />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => saveLandingPage(landingPage!)}
                  >
                    섹션 정보 저장
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">연혁 항목 ({timeline.length}개)</h4>
                  <Button 
                    onClick={() => {
                      setNewTimelineItem({
                        year: '',
                        title: '',
                        description: '',
                        icon: 'Building',
                        order: timeline.length
                      })
                      setEditingTimelineItem(null)
                    }}
                    size="sm"
                  >
                    새 연혁 추가
                  </Button>
                </div>

                {/* 새 연혁 추가 폼 */}
                {newTimelineItem && (
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h5 className="font-semibold mb-3">새 연혁 추가</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>연도</Label>
                          <Input 
                            value={newTimelineItem.year}
                            onChange={(e) => setNewTimelineItem({...newTimelineItem, year: e.target.value})}
                            placeholder="예: 2024"
                          />
                        </div>
                        <div>
                          <Label>아이콘</Label>
                          <select 
                            className="w-full p-2 border rounded"
                            value={newTimelineItem.icon}
                            onChange={(e) => setNewTimelineItem({...newTimelineItem, icon: e.target.value})}
                          >
                            <option value="Building">건물</option>
                            <option value="Award">수상</option>
                            <option value="Star">별</option>
                            <option value="Rocket">로켓</option>
                            <option value="Target">타겟</option>
                            <option value="Calendar">달력</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>제목</Label>
                        <Input 
                          value={newTimelineItem.title}
                          onChange={(e) => setNewTimelineItem({...newTimelineItem, title: e.target.value})}
                          placeholder="예: 한국안전용품시험연구원 출범"
                        />
                      </div>
                      <div>
                        <Label>설명</Label>
                        <Input 
                          value={newTimelineItem.description}
                          onChange={(e) => setNewTimelineItem({...newTimelineItem, description: e.target.value})}
                          placeholder="예: 공인 시험·교정 전문기관으로 도약"
                        />
                      </div>
                      <div>
                        <Label>순서</Label>
                        <Input 
                          type="number"
                          value={newTimelineItem.order}
                          onChange={(e) => setNewTimelineItem({...newTimelineItem, order: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={async () => {
                            try {
                              const response = await fetch('/api/sanity/timeline', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newTimelineItem)
                              })
                              if (response.ok) {
                                toast.success('연혁 추가 완료')
                                setNewTimelineItem(null)
                                loadData()
                              }
                            } catch (error) {
                              toast.error('연혁 추가 실패')
                            }
                          }}
                          className="flex-1"
                        >
                          추가
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setNewTimelineItem(null)}
                          className="flex-1"
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 연혁 목록 */}
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4">
                      {editingTimelineItem?._id === item._id ? (
                        // 수정 모드
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>연도</Label>
                              <Input 
                                value={editingTimelineItem.year}
                                onChange={(e) => setEditingTimelineItem({...editingTimelineItem, year: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label>아이콘</Label>
                              <select 
                                className="w-full p-2 border rounded"
                                value={editingTimelineItem.icon}
                                onChange={(e) => setEditingTimelineItem({...editingTimelineItem, icon: e.target.value})}
                              >
                                <option value="Building">건물</option>
                                <option value="Award">수상</option>
                                <option value="Star">별</option>
                                <option value="Rocket">로켓</option>
                                <option value="Target">타겟</option>
                                <option value="Calendar">달력</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <Label>제목</Label>
                            <Input 
                              value={editingTimelineItem.title}
                              onChange={(e) => setEditingTimelineItem({...editingTimelineItem, title: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>설명</Label>
                            <Input 
                              value={editingTimelineItem.description}
                              onChange={(e) => setEditingTimelineItem({...editingTimelineItem, description: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>순서</Label>
                            <Input 
                              type="number"
                              value={editingTimelineItem.order}
                              onChange={(e) => setEditingTimelineItem({...editingTimelineItem, order: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={async () => {
                                try {
                                  const response = await fetch(`/api/sanity/timeline?id=${item._id}`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(editingTimelineItem)
                                  })
                                  if (response.ok) {
                                    toast.success('연혁 수정 완료')
                                    setEditingTimelineItem(null)
                                    loadData()
                                  }
                                } catch (error) {
                                  toast.error('연혁 수정 실패')
                                }
                              }}
                              size="sm"
                              className="flex-1"
                            >
                              저장
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setEditingTimelineItem(null)}
                              size="sm"
                              className="flex-1"
                            >
                              취소
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // 보기 모드
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-blue-600">{item.year}</span>
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">{item.icon}</span>
                              <span className="text-xs text-gray-500">순서: {item.order}</span>
                            </div>
                            <h5 className="font-semibold mb-1">{item.title}</h5>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline"
                              onClick={() => setEditingTimelineItem(item)}
                              size="sm"
                            >
                              수정
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={async () => {
                                if (confirm('정말 삭제하시겠습니까?')) {
                                  try {
                                    const response = await fetch(`/api/sanity/timeline?id=${item._id}`, {
                                      method: 'DELETE'
                                    })
                                    if (response.ok) {
                                      toast.success('연혁 삭제 완료')
                                      loadData()
                                    }
                                  } catch (error) {
                                    toast.error('연혁 삭제 실패')
                                  }
                                }
                              }}
                              size="sm"
                            >
                              삭제
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 오시는길 섹션 */}
            <Card id="location-section">
              <CardHeader>
                <CardTitle>오시는 길 섹션</CardTitle>
                <CardDescription>메인페이지의 오시는 길 섹션 정보를 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 섹션 제목 및 설명 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">섹션 제목 및 설명</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>제목 첫 번째 부분</Label>
                      <Input 
                        value={landingPage?.locationTitle1 || '오시는'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, locationTitle1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>제목 두 번째 부분</Label>
                      <Input 
                        value={landingPage?.locationTitle2 || '길'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, locationTitle2: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>설명</Label>
                    <Input 
                      value={landingPage?.locationDescription || '본사 및 시험소 위치 안내'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, locationDescription: e.target.value} : prev)}
                    />
                  </div>
                </div>

                {/* 주소 및 전화번호 */}
                <div className="space-y-4">
                  <div>
                    <Label>본사 주소</Label>
                    <Input 
                      value={landingPage?.mainOfficeAddress || '경기 양주시 은현면 화합로 941번길 83'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, mainOfficeAddress: e.target.value} : prev)}
                    />
                    <Input 
                      className="mt-2" 
                      value={landingPage?.mainOfficeTel || '031-862-8556~7'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, mainOfficeTel: e.target.value} : prev)}
                      placeholder="전화번호" 
                    />
                  </div>
                  <div>
                    <Label>시험소 주소</Label>
                    <Input 
                      value={landingPage?.testLabAddress || '경기 양주시 은현면 화합로 701-11'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, testLabAddress: e.target.value} : prev)}
                    />
                    <Input 
                      className="mt-2" 
                      value={landingPage?.testLabTel || '031-858-3012'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, testLabTel: e.target.value} : prev)}
                      placeholder="전화번호" 
                    />
                  </div>
                  <div>
                    <Label>운영시간</Label>
                    <Input 
                      value={landingPage?.operatingHours1 || '평일 09:00 - 18:00'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, operatingHours1: e.target.value} : prev)}
                    />
                    <Input 
                      className="mt-2" 
                      value={landingPage?.operatingHours2 || '토요일 09:00 - 13:00'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, operatingHours2: e.target.value} : prev)}
                    />
                    <Input 
                      className="mt-2" 
                      value={landingPage?.operatingHours3 || '일요일 및 공휴일 휴무'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, operatingHours3: e.target.value} : prev)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => saveLandingPage(landingPage!)}
                >
                  오시는 길 정보 저장
                </Button>
              </CardContent>
            </Card>

            {/* 문의하기 섹션 */}
            <Card id="contact-section">
              <CardHeader>
                <CardTitle>문의하기 섹션</CardTitle>
                <CardDescription>메인페이지의 문의하기 섹션 모든 텍스트를 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 섹션 제목 및 설명 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">섹션 제목 및 설명</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>제목 첫 번째 부분 (강조)</Label>
                      <Input 
                        value={landingPage?.contactTitle1 || '문의'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, contactTitle1: e.target.value} : prev)}
                      />
                    </div>
                    <div>
                      <Label>제목 두 번째 부분</Label>
                      <Input 
                        value={landingPage?.contactTitle2 || '하기'}
                        onChange={(e) => setLandingPage(prev => prev ? {...prev, contactTitle2: e.target.value} : prev)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>설명</Label>
                    <Input 
                      value={landingPage?.contactDescription || '시험·교정에 대한 견적 및 기술 상담을 도와드립니다'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, contactDescription: e.target.value} : prev)}
                    />
                  </div>
                </div>

                {/* 연락처 정보 카드 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">연락처 정보 카드</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* 전화 문의 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">전화 문의</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>제목</Label>
                          <Input 
                            value={landingPage?.contactPhoneTitle || '전화 문의'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactPhoneTitle: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>전화번호</Label>
                          <Input 
                            value={landingPage?.contactPhoneNumber || '031-862-8556'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactPhoneNumber: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>운영시간</Label>
                          <Input 
                            value={landingPage?.contactPhoneHours || '평일 09:00 - 18:00'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactPhoneHours: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 이메일 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">이메일</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>제목</Label>
                          <Input 
                            value={landingPage?.contactEmailTitle || '이메일'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactEmailTitle: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>이메일 주소</Label>
                          <Input 
                            value={landingPage?.contactEmailAddress || 'ymy@quro.co.kr'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactEmailAddress: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>설명</Label>
                          <Input 
                            value={landingPage?.contactEmailDescription || '24시간 접수 가능'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactEmailDescription: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 처리 시간 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">처리 시간</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>제목</Label>
                          <Input 
                            value={landingPage?.contactTimeTitle || '처리 시간'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactTimeTitle: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>시간 값</Label>
                          <Input 
                            value={landingPage?.contactTimeValue || '24시간 내'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactTimeValue: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>설명</Label>
                          <Input 
                            value={landingPage?.contactTimeDescription || '견적 및 답변 제공'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactTimeDescription: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 문의 폼 필드 */}
                <div className="space-y-4 border-b pb-4">
                  <h4 className="font-semibold">문의 폼 필드</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 업체명 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">업체명</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormCompanyLabel || '업체명 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormCompanyLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormCompanyPlaceholder || '업체명을 입력하세요'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormCompanyPlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 담당자명 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">담당자명</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormNameLabel || '담당자명 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormNameLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormNamePlaceholder || '담당자명을 입력하세요'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormNamePlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 연락처 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">연락처</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormPhoneLabel || '연락처 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormPhoneLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormPhonePlaceholder || '010-0000-0000'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormPhonePlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 이메일 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">이메일</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormEmailLabel || '이메일 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormEmailLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormEmailPlaceholder || 'example@company.com'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormEmailPlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 문의 유형 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">문의 유형</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormTypeLabel || '문의 유형 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormTypeLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormTypePlaceholder || '문의 유형을 선택하세요'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormTypePlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 문의 내용 */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-3">문의 내용</h5>
                      <div className="space-y-3">
                        <div>
                          <Label>라벨</Label>
                          <Input 
                            value={landingPage?.contactFormMessageLabel || '문의 내용 *'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormMessageLabel: e.target.value} : prev)}
                          />
                        </div>
                        <div>
                          <Label>플레이스홀더</Label>
                          <Input 
                            value={landingPage?.contactFormMessagePlaceholder || '문의하실 내용을 자세히 작성해주세요'}
                            onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormMessagePlaceholder: e.target.value} : prev)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 안내 문구 및 버튼 */}
                <div className="space-y-4">
                  <h4 className="font-semibold">안내 문구 및 버튼</h4>
                  <div>
                    <Label>안내 문구 1</Label>
                    <Input 
                      value={landingPage?.contactFormNotice1 || '• 작성하신 내용은 담당자 검토 후 24시간 내 답변드립니다.'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormNotice1: e.target.value} : prev)}
                    />
                  </div>
                  <div>
                    <Label>안내 문구 2</Label>
                    <Input 
                      value={landingPage?.contactFormNotice2 || '• 급한 문의는 대표번호 031-862-8556로 연락주시기 바랍니다.'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, contactFormNotice2: e.target.value} : prev)}
                    />
                  </div>
                  <div>
                    <Label>버튼 텍스트</Label>
                    <Input 
                      value={landingPage?.contactButtonText || '문의 보내기'}
                      onChange={(e) => setLandingPage(prev => prev ? {...prev, contactButtonText: e.target.value} : prev)}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => saveLandingPage(landingPage!)}
                >
                  문의하기 정보 저장
                </Button>
              </CardContent>
            </Card>
            </div>
          </TabsContent>

          {/* 기관개요 관리 */}
          <TabsContent value="about">
            <AboutPageManager />
          </TabsContent>

          {/* 시험교정 관리 */}
          <TabsContent value="test">
            <TestCategoryManager />
          </TabsContent>

          {/* 고객지원 관리 */}
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>고객지원 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>대표 이메일</Label>
                  <Input defaultValue="ymy@quro.co.kr" />
                </div>
                <div>
                  <Label>대표 전화</Label>
                  <Input defaultValue="031-862-8556" />
                </div>
                <div>
                  <Label>팩스</Label>
                  <Input defaultValue="031-862-8558" />
                </div>
                <div>
                  <Label>카카오톡 채널</Label>
                  <Input defaultValue="@한국안전용품시험연구원" />
                </div>
                <div>
                  <Label>자주 묻는 질문</Label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="FAQ 내용을 입력하세요"
                  />
                </div>
                <Button className="w-full">저장</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 자료실 관리 */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>자료실 관리</CardTitle>
                <CardDescription>
                  신청서 양식 및 관련 자료를 관리합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">교정신청서</h4>
                    <p className="text-sm text-gray-600">현재 등록된 양식</p>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">시험신청서</h4>
                    <p className="text-sm text-gray-600">현재 등록된 양식</p>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">기타 자료</h4>
                    <p className="text-sm text-gray-600">총 0개의 자료</p>
                  </div>
                  <Button className="w-full">새 자료 추가</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 하단정보 관리 */}
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>하단 정보 (Footer)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>회사명</Label>
                  <Input defaultValue="(주)큐로 부설 한국안전용품시험연구원" />
                </div>
                <div>
                  <Label>대표자</Label>
                  <Input defaultValue="홍길동" />
                </div>
                <div>
                  <Label>사업자등록번호</Label>
                  <Input defaultValue="123-45-67890" />
                </div>
                <div>
                  <Label>본사 주소</Label>
                  <Input defaultValue="경기 양주시 은현면 화합로 941번길 83" />
                </div>
                <div>
                  <Label>시험소 주소</Label>
                  <Input defaultValue="경기 양주시 은현면 화합로 701-11" />
                </div>
                <div>
                  <Label>은행 정보</Label>
                  <Input defaultValue="국민은행 526501-01-284980 (예금주: 한국안전용품시험연구원)" />
                </div>
                <div>
                  <Label>Copyright</Label>
                  <Input defaultValue="© 2024 한국안전용품시험연구원. All rights reserved." />
                </div>
                <Button className="w-full">저장</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
