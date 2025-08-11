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
import { getAwards, type Award } from '@/lib/sanity'
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
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null)
  const [awards, setAwards] = useState<Award[]>([])

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
      setLandingPage(landingData || DEFAULT_LANDING_PAGE)

      // 수상/인증 데이터 로드
      const awardsResponse = await fetch('/api/sanity/awards')
      const awardsData = await awardsResponse.json()
      setAwards(awardsData || [])
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
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="main">메인페이지</TabsTrigger>
            <TabsTrigger value="awards">수상/인증</TabsTrigger>
            <TabsTrigger value="tests">시험항목</TabsTrigger>
          </TabsList>

          {/* 메인페이지 관리 */}
          <TabsContent value="main">
            {landingPage && (
              <HeroSectionManager
                landingPage={landingPage}
                onSave={saveLandingPage}
              />
            )}
          </TabsContent>

          {/* 수상/인증 관리 */}
          <TabsContent value="awards">
            <Card>
              <CardHeader>
                <CardTitle>수상 및 인증 관리</CardTitle>
                <CardDescription>
                  실제 웹페이지에 표시되는 수상/인증 섹션입니다.
                  이미지는 추후 업로드 기능을 통해 추가하실 수 있습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 py-8">
                    수상/인증 이미지 업로드 기능은 추후 추가 예정입니다.
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">등록 예정 인증서</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 방송통신기자재등의 적합등록 필증(KC인증)</li>
                        <li>• KOLAS 공인교정기관 인정서(KC23-420)</li>
                        <li>• KS 제품인증서-인장시험기 (KS B 5521)</li>
                        <li>• KS 제품인증서-압축시험기 (KS B 5533)</li>
                        <li>• KS 제품인증서-만능재료시험기 (KS B 5541)</li>
                        <li>• 품질경영시스템인증서 ISO 9001:2015</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">등록 예정 특허</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 안전모 충격 시험기 (특허 제 10-0986289호)</li>
                        <li>• 아스콘 연소 시험기 (특허 제10-1238775호)</li>
                        <li>• 신발 미끄럼 측정장치 (특허 제10-1251452호)</li>
                        <li>• 커피콩 혼합장치 (특허 제10-1256549호)</li>
                        <li>• 안전화 충격 시험장치 (특허 제 10-1510675호)</li>
                        <li>• 검전기 (등록번호: 제 10-2002491호)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 시험항목 관리 */}
          <TabsContent value="tests">
            <TestCategoryManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
