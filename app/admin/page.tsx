'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, Save, FileText, Building2, TestTube, HeadphonesIcon, FolderOpen, Award as AwardIcon, Upload, X } from 'lucide-react'
import TestCategoryManager from '@/components/admin/TestCategoryManager'
import { 
  getAwards, 
  createAward, 
  updateAward as sanityUpdateAward, 
  deleteAward as sanityDeleteAward,
  type Award
} from '@/lib/sanity'
import {
  getLandingPage,
  updateLandingPage,
  getAboutPage,
  updateAboutPage,
  getTestItems,
  createTestItem,
  updateTestItem,
  deleteTestItem,
  getSupportPage,
  updateSupportPage,
  getResources,
  createResource,
  updateResource,
  deleteResource,
  type LandingPage,
  type AboutPage,
  type TestItem,
  type SupportPage,
  type Resource
} from '@/lib/sanity-extended'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  // 모든 페이지 데이터
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null)
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [testItems, setTestItems] = useState<TestItem[]>([])
  const [supportPage, setSupportPage] = useState<SupportPage | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
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
        loadAllData()
      } else {
        toast.error('비밀번호가 잘못되었습니다')
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다')
    }
  }

  const loadAllData = async () => {
    setLoading(true)
    try {
      // API 라우트를 통해 데이터 로드
      const landingResponse = await fetch('/api/sanity/landing')
      const landingData = await landingResponse.json()
      
      // About 페이지 데이터도 API 라우트를 통해 로드
      const aboutResponse = await fetch('/api/sanity/about')
      const aboutData = await aboutResponse.json()
      
      // Awards도 API 라우트를 통해 로드
      const awardsResponse = await fetch('/api/sanity/awards')
      const awardData = await awardsResponse.json()
      
      // 나머지 데이터 로드
      const testData = await getTestItems()
      const supportData = await getSupportPage()
      const resourceData = await getResources()

      // 데이터가 없으면 기본값 설정
      setLandingPage(landingData || {
        _id: 'landingPage-singleton',
        _type: 'landingPage',
        heroTitle: '한국안전용품시험연구원',
        heroSubtitle: '국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관',
        heroButtonText: '시험 신청하기',
        introTitle: '믿을 수 있는 시험기관',
        introDescription: '(주)큐로는 시험기 제작 전문 기업으로...',
        whyChooseTitle: '왜 우리를 선택해야 하는가',
        whyChooseItems: [],
        timelineTitle: '우리의 역사',
        timelineItems: [],
        contactTitle: '문의하기',
        contactDescription: '궁금한 사항이 있으시면 언제든지 연락주세요',
        contactPhone: '031-862-8556',
        contactEmail: 'ymy@quro.co.kr'
      })

      setAboutPage(aboutData || {
        _id: 'aboutPage-singleton',
        _type: 'aboutPage',
        pageTitle: '기관소개',
        pageSubtitle: '한국안전용품시험연구원을 소개합니다',
        companyName: '(주)큐로',
        companyDescription: '시험기 제작 전문 기업',
        visionTitle: '비전',
        visionContent: '최고의 시험기관이 되겠습니다',
        missionTitle: '미션',
        missionContent: '정확하고 신뢰할 수 있는 시험 서비스',
        businessTitle: '사업 분야',
        businessAreas: [],
        certificationsTitle: '인증 및 자격',
        certifications: [],
        headquarters: { address: '경기 양주시 은현면 화합로 941번길 83', phone: '031-862-8556', fax: '' },
        testLab: { address: '경기 양주시 은현면 화합로 701-11', phone: '031-858-3012', fax: '' }
      })

      setSupportPage(supportData || {
        _id: 'supportPage-singleton',
        _type: 'supportPage',
        pageTitle: '고객지원',
        pageSubtitle: '고객님을 위한 서비스',
        faqTitle: '자주 묻는 질문',
        faqItems: [],
        contactTitle: '문의하기',
        contactDescription: '궁금한 사항을 문의해주세요',
        contactMethods: [],
        noticeTitle: '공지사항',
        notices: [],
        downloadTitle: '자료 다운로드',
        downloadDescription: '필요한 자료를 다운로드하세요'
      })

      setTestItems(testData || [])
      setResources(resourceData || [])
      setAwards(awardData || [])
    } catch (error) {
      console.error('데이터 로드 실패:', error)
      toast.error('데이터 로드에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  // 랜딩페이지 저장
  const saveLandingPage = async () => {
    if (!landingPage) return
    setSaving(true)
    try {
      const response = await fetch('/api/sanity/landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(landingPage)
      })
      if (response.ok) {
        toast.success('랜딩페이지가 저장되었습니다')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('저장에 실패했습니다')
    } finally {
      setSaving(false)
    }
  }

  // 기관소개 페이지 저장
  const saveAboutPage = async () => {
    if (!aboutPage) return
    setSaving(true)
    try {
      const response = await fetch('/api/sanity/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutPage)
      })
      if (response.ok) {
        toast.success('기관소개가 저장되었습니다')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast.error('저장에 실패했습니다')
    } finally {
      setSaving(false)
    }
  }

  // 고객지원 페이지 저장
  const saveSupportPage = async () => {
    if (!supportPage) return
    setSaving(true)
    try {
      await updateSupportPage(supportPage)
      toast.success('고객지원 페이지가 저장되었습니다')
    } catch (error) {
      toast.error('저장에 실패했습니다')
    } finally {
      setSaving(false)
    }
  }

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
        <Tabs defaultValue="landing" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="landing" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              랜딩페이지
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              기관소개
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              시험항목
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <HeadphonesIcon className="h-4 w-4" />
              고객지원
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              자료실
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex items-center gap-2">
              <AwardIcon className="h-4 w-4" />
              수상/인증
            </TabsTrigger>
          </TabsList>

          {/* 랜딩페이지 관리 */}
          <TabsContent value="landing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>메인 화면 (Hero) 섹션</CardTitle>
                <CardDescription>방문자가 가장 먼저 보는 메인 화면입니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {landingPage && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>메인 타이틀</Label>
                        <Input
                          value={landingPage.heroTitle}
                          onChange={(e) => setLandingPage({...landingPage, heroTitle: e.target.value})}
                          placeholder="예: 한국안전용품시험연구원"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>서브 타이틀</Label>
                        <Input
                          value={landingPage.heroSubtitle}
                          onChange={(e) => setLandingPage({...landingPage, heroSubtitle: e.target.value})}
                          placeholder="예: 국내 유일의 시험기 제작과..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>버튼 텍스트</Label>
                      <Input
                        value={landingPage.heroButtonText}
                        onChange={(e) => setLandingPage({...landingPage, heroButtonText: e.target.value})}
                        placeholder="예: 시험 신청하기"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button onClick={saveLandingPage} className="w-full" disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              랜딩페이지 저장
            </Button>
          </TabsContent>

          {/* 기관소개 관리 */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>기관 정보</CardTitle>
                <CardDescription>기관의 기본 정보를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aboutPage && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>페이지 제목</Label>
                        <Input
                          value={aboutPage.pageTitle}
                          onChange={(e) => setAboutPage({...aboutPage, pageTitle: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>회사명</Label>
                        <Input
                          value={aboutPage.companyName}
                          onChange={(e) => setAboutPage({...aboutPage, companyName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>회사 소개</Label>
                      <Textarea
                        rows={5}
                        value={aboutPage.companyDescription}
                        onChange={(e) => setAboutPage({...aboutPage, companyDescription: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>회사 대표 이미지</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        {aboutPage.companyImage ? (
                          <div className="space-y-4">
                            <img 
                              src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${aboutPage.companyImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                              alt="회사 대표 이미지"
                              className="max-w-xs mx-auto rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setAboutPage({...aboutPage, companyImage: null})}
                            >
                              <X className="mr-2 h-4 w-4" />
                              이미지 제거
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">클릭하여 이미지를 업로드하세요</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="about-image-upload"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                
                                const formData = new FormData()
                                formData.append('file', file)
                                
                                try {
                                  const response = await fetch('/api/upload-image', {
                                    method: 'POST',
                                    body: formData
                                  })
                                  
                                  if (response.ok) {
                                    const data = await response.json()
                                    setAboutPage({...aboutPage, companyImage: data.asset})
                                    toast.success('이미지가 업로드되었습니다')
                                  }
                                } catch (error) {
                                  toast.error('이미지 업로드 실패')
                                }
                              }}
                            />
                            <label
                              htmlFor="about-image-upload"
                              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
                            >
                              이미지 선택
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button onClick={saveAboutPage} className="w-full" disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              기관소개 저장
            </Button>
          </TabsContent>

          {/* 시험항목 관리 - 계층적 구조 */}
          <TabsContent value="tests" className="space-y-6">
            <TestCategoryManager />
          </TabsContent>

          {/* 고객지원 관리 */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>고객지원 페이지 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportPage && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>페이지 제목</Label>
                        <Input
                          value={supportPage.pageTitle}
                          onChange={(e) => setSupportPage({...supportPage, pageTitle: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>페이지 부제목</Label>
                        <Input
                          value={supportPage.pageSubtitle}
                          onChange={(e) => setSupportPage({...supportPage, pageSubtitle: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Button onClick={saveSupportPage} className="w-full" disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              고객지원 페이지 저장
            </Button>
          </TabsContent>

          {/* 자료실 관리 */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>자료실</CardTitle>
                  <CardDescription>다운로드 가능한 자료들을 관리합니다</CardDescription>
                </div>
                <Button
                  onClick={async () => {
                    const newResource = await createResource({
                      title: '새 자료',
                      category: 'forms',
                      description: '',
                      fileSize: '',
                      downloadCount: 0,
                      publishedDate: new Date().toISOString(),
                      isPublic: true,
                      order: resources.length
                    })
                    if (newResource) {
                      setResources([...resources, newResource])
                      toast.success('자료가 추가되었습니다')
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  자료 추가
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.map((resource) => (
                  <Card key={resource._id} className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>제목</Label>
                          <Input
                            value={resource.title}
                            onChange={(e) => {
                              const updated = resources.map(r => 
                                r._id === resource._id ? {...r, title: e.target.value} : r
                              )
                              setResources(updated)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>카테고리</Label>
                          <Select
                            value={resource.category}
                            onValueChange={(value) => {
                              const updated = resources.map(r => 
                                r._id === resource._id ? {...r, category: value} : r
                              )
                              setResources(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="forms">신청서 양식</SelectItem>
                              <SelectItem value="standards">시험 규격</SelectItem>
                              <SelectItem value="guidelines">가이드라인</SelectItem>
                              <SelectItem value="brochures">브로슈어</SelectItem>
                              <SelectItem value="technical">기술 자료</SelectItem>
                              <SelectItem value="regulations">법령/규정</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={resource.isPublic}
                            onCheckedChange={(checked) => {
                              const updated = resources.map(r => 
                                r._id === resource._id ? {...r, isPublic: checked} : r
                              )
                              setResources(updated)
                            }}
                          />
                          <Label>공개</Label>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              await updateResource(resource._id, resource)
                              toast.success('저장되었습니다')
                            }}
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              if (confirm('정말 삭제하시겠습니까?')) {
                                await deleteResource(resource._id)
                                setResources(resources.filter(r => r._id !== resource._id))
                                toast.success('삭제되었습니다')
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 수상/인증 관리 */}
          <TabsContent value="awards" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>수상/인증 목록</CardTitle>
                  <CardDescription>회사의 수상 및 인증 내역을 관리합니다</CardDescription>
                </div>
                <Button
                  onClick={async () => {
                    const newAward = await createAward({
                      title: '새 인증',
                      description: '',
                      image: null as any,
                      order: awards.length
                    })
                    if (newAward) {
                      setAwards([...awards, newAward])
                      toast.success('항목이 추가되었습니다')
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  항목 추가
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {awards.map((award) => (
                  <Card key={award._id} className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>제목</Label>
                        <Input
                          value={award.title}
                          onChange={(e) => {
                            const updated = awards.map(a => 
                              a._id === award._id ? {...a, title: e.target.value} : a
                            )
                            setAwards(updated)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>설명</Label>
                        <Textarea
                          value={award.description}
                          onChange={(e) => {
                            const updated = awards.map(a => 
                              a._id === award._id ? {...a, description: e.target.value} : a
                            )
                            setAwards(updated)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>인증서/특허 이미지</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          {award.image ? (
                            <div className="space-y-4">
                              <img 
                                src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${award.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
                                alt={award.title}
                                className="max-w-[200px] mx-auto rounded-lg"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  const updated = awards.map(a => 
                                    a._id === award._id ? {...a, image: null} : a
                                  )
                                  setAwards(updated)
                                }}
                              >
                                <X className="mr-2 h-4 w-4" />
                                이미지 제거
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Upload className="mx-auto h-10 w-10 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">클릭하여 이미지를 업로드하세요</p>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id={`award-image-upload-${award._id}`}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0]
                                  if (!file) return
                                  
                                  const formData = new FormData()
                                  formData.append('file', file)
                                  
                                  try {
                                    const response = await fetch('/api/upload-image', {
                                      method: 'POST',
                                      body: formData
                                    })
                                    
                                    if (response.ok) {
                                      const data = await response.json()
                                      const updated = awards.map(a => 
                                        a._id === award._id ? {...a, image: data.asset} : a
                                      )
                                      setAwards(updated)
                                      toast.success('이미지가 업로드되었습니다')
                                    }
                                  } catch (error) {
                                    toast.error('이미지 업로드 실패')
                                  }
                                }}
                              />
                              <label
                                htmlFor={`award-image-upload-${award._id}`}
                                className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md cursor-pointer hover:bg-blue-700"
                              >
                                이미지 선택
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={async () => {
                            try {
                              const response = await fetch('/api/sanity/awards', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(award)
                              })
                              
                              const result = await response.json()
                              
                              if (response.ok) {
                                toast.success('저장되었습니다')
                                // 저장 성공 시 awards 상태 업데이트
                                const updatedAwards = awards.map(a => 
                                  a._id === award._id ? result : a
                                )
                                setAwards(updatedAwards)
                              } else {
                                console.error('Save failed:', result)
                                toast.error(result.details || '저장에 실패했습니다')
                              }
                            } catch (error) {
                              console.error('Save error:', error)
                              toast.error('저장 중 오류가 발생했습니다')
                            }
                          }}
                        >
                          저장
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            if (confirm('정말 삭제하시겠습니까?')) {
                              try {
                                const response = await fetch(`/api/sanity/awards?id=${award._id}`, {
                                  method: 'DELETE'
                                })
                                if (response.ok) {
                                  setAwards(awards.filter(a => a._id !== award._id))
                                  toast.success('삭제되었습니다')
                                } else {
                                  throw new Error('Failed to delete')
                                }
                              } catch (error) {
                                toast.error('삭제에 실패했습니다')
                              }
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
