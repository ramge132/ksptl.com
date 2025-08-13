"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { type SupportInfo } from "@/lib/sanity-extended"
import { toast } from "sonner"

export default function SupportInfoManager() {
  const [supportData, setSupportData] = useState<SupportInfo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // 기본 데이터 정의
    const defaultData: SupportInfo = {
      _id: 'supportInfo-singleton',
      _type: 'supportInfo',
      pageTitle: '고객지원',
      pageSubtitle: '고객지원 센터',
      pageDescription: '궁금하신 사항을 빠르고 정확하게 안내해드립니다',
      phoneTitle: '전화 상담',
      phoneNumber: '031-862-8556~7',
      phoneHours: '평일 09:00 - 18:00',
      emailTitle: '이메일 문의',
      emailAddress: 'yukwho@hanmail.net',
      emailHours: '24시간 접수 가능',
      onlineTitle: '온라인 문의',
      onlineDescription: '견적 및 기술 상담',
      faqTitle: '자주 묻는 질문',
      faqSubtitle: '고객님들이 자주 문의하시는 내용을 정리했습니다',
      faqs: [
        {
          question: '교정 주기는 어떻게 되나요?',
          answer: '국가에서 정한 교정주기와 자체설정주기 중 선택하실 수 있습니다. 일반적으로 1년 주기를 권장드립니다.',
          order: 1
        },
        {
          question: '시험 성적서 발급까지 얼마나 걸리나요?',
          answer: '시험 항목에 따라 다르지만, 일반적으로 접수 후 7-10일 이내에 발급됩니다. 긴급한 경우 별도 문의 부탁드립니다.',
          order: 2
        },
        {
          question: '출장 교정이 가능한가요?',
          answer: '네, 출장 교정이 가능합니다. 장비의 특성상 이동이 어려운 경우 현장 교정 서비스를 제공하고 있습니다.',
          order: 3
        },
        {
          question: 'KOLAS 공인 성적서와 일반 성적서의 차이는 무엇인가요?',
          answer: 'KOLAS 공인 성적서는 국가 공인 기관에서 발급하는 성적서로 국내외에서 공신력을 인정받습니다. 일반 성적서는 자체 시험 결과를 나타내는 문서입니다.',
          order: 4
        },
        {
          question: '견적은 어떻게 받을 수 있나요?',
          answer: '전화, 이메일, 온라인 문의를 통해 견적을 요청하실 수 있습니다. 시험 항목과 수량을 알려주시면 신속하게 견적서를 발송해드립니다.',
          order: 5
        },
        {
          question: '시험 장비를 직접 방문해서 맡길 수 있나요?',
          answer: '네, 가능합니다. 방문 1시간 전에 연락 주시면 담당자가 직접 응대해드립니다.',
          order: 6
        },
        {
          question: '교정 비용 결제는 어떻게 하나요?',
          answer: '교정 완료 후 거래명세서를 이메일로 보내드립니다. 확인 후 지정 계좌로 입금해주시면 됩니다.',
          order: 7
        },
        {
          question: '시험 불합격 시 재시험이 가능한가요?',
          answer: '네, 재시험이 가능합니다. 불합격 사유를 확인하시고 보완 후 재시험을 신청하실 수 있습니다.',
          order: 8
        }
      ]
    }

    try {
      const response = await fetch('/api/sanity/support-info')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setSupportData(data)
          return
        }
      }
      // response가 ok가 아니거나 data가 없는 경우 기본값 설정
      console.log('No data from server, using default data')
      setSupportData(defaultData)
    } catch (error) {
      console.error('Failed to fetch support data:', error)
      // 에러 발생 시에도 기본값 설정
      setSupportData(defaultData)
    }
  }

  const handleSave = async () => {
    if (!supportData) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/sanity/support-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supportData),
      })
      
      if (response.ok) {
        const result = await response.json()
        toast.success("고객지원 페이지가 성공적으로 업데이트되었습니다.")
        setSupportData(result)
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

  const handleFieldChange = (field: keyof SupportInfo, value: any) => {
    if (supportData) {
      setSupportData({
        ...supportData,
        [field]: value
      })
    }
  }

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    if (supportData && supportData.faqs) {
      const updatedFaqs = [...supportData.faqs]
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value
      }
      setSupportData({
        ...supportData,
        faqs: updatedFaqs
      })
    }
  }

  const addFaq = () => {
    if (supportData) {
      const newFaq = {
        question: '',
        answer: '',
        order: (supportData.faqs?.length || 0) + 1
      }
      setSupportData({
        ...supportData,
        faqs: [...(supportData.faqs || []), newFaq]
      })
    }
  }

  const removeFaq = (index: number) => {
    if (supportData && supportData.faqs) {
      const updatedFaqs = supportData.faqs.filter((_, i) => i !== index)
      // 순서 재정렬
      updatedFaqs.forEach((faq, i) => {
        faq.order = i + 1
      })
      setSupportData({
        ...supportData,
        faqs: updatedFaqs
      })
    }
  }

  const moveFaq = (index: number, direction: 'up' | 'down') => {
    if (supportData && supportData.faqs) {
      const updatedFaqs = [...supportData.faqs]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      
      if (newIndex >= 0 && newIndex < updatedFaqs.length) {
        // 순서 교체
        [updatedFaqs[index], updatedFaqs[newIndex]] = [updatedFaqs[newIndex], updatedFaqs[index]]
        // order 값 재설정
        updatedFaqs.forEach((faq, i) => {
          faq.order = i + 1
        })
        setSupportData({
          ...supportData,
          faqs: updatedFaqs
        })
      }
    }
  }

  if (!supportData) {
    return <div>로딩중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">고객지원 페이지 관리</h2>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? "저장 중..." : "변경사항 저장"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="contact">연락처 정보</TabsTrigger>
          <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>페이지 기본 정보</CardTitle>
              <CardDescription>
                고객지원 페이지의 기본 정보를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pageTitle">페이지 제목</Label>
                <Input
                  id="pageTitle"
                  value={supportData.pageTitle || ''}
                  onChange={(e) => handleFieldChange('pageTitle', e.target.value)}
                  placeholder="예: 고객지원"
                />
              </div>
              <div>
                <Label htmlFor="pageSubtitle">페이지 부제목</Label>
                <Input
                  id="pageSubtitle"
                  value={supportData.pageSubtitle || ''}
                  onChange={(e) => handleFieldChange('pageSubtitle', e.target.value)}
                  placeholder="예: 고객지원 센터"
                />
              </div>
              <div>
                <Label htmlFor="pageDescription">페이지 설명</Label>
                <Textarea
                  id="pageDescription"
                  value={supportData.pageDescription || ''}
                  onChange={(e) => handleFieldChange('pageDescription', e.target.value)}
                  placeholder="예: 궁금하신 사항을 빠르고 정확하게 안내해드립니다"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>연락처 정보</CardTitle>
              <CardDescription>
                전화, 이메일, 온라인 문의 정보를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 전화 상담 */}
              <div className="space-y-3">
                <h4 className="font-semibold">전화 상담</h4>
                <div>
                  <Label htmlFor="phoneTitle">제목</Label>
                  <Input
                    id="phoneTitle"
                    value={supportData.phoneTitle || ''}
                    onChange={(e) => handleFieldChange('phoneTitle', e.target.value)}
                    placeholder="예: 전화 상담"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">전화번호</Label>
                  <Input
                    id="phoneNumber"
                    value={supportData.phoneNumber || ''}
                    onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                    placeholder="예: 031-862-8556~7"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneHours">운영 시간</Label>
                  <Input
                    id="phoneHours"
                    value={supportData.phoneHours || ''}
                    onChange={(e) => handleFieldChange('phoneHours', e.target.value)}
                    placeholder="예: 평일 09:00 - 18:00"
                  />
                </div>
              </div>

              {/* 이메일 문의 */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="font-semibold">이메일 문의</h4>
                <div>
                  <Label htmlFor="emailTitle">제목</Label>
                  <Input
                    id="emailTitle"
                    value={supportData.emailTitle || ''}
                    onChange={(e) => handleFieldChange('emailTitle', e.target.value)}
                    placeholder="예: 이메일 문의"
                  />
                </div>
                <div>
                  <Label htmlFor="emailAddress">이메일 주소</Label>
                  <Input
                    id="emailAddress"
                    value={supportData.emailAddress || ''}
                    onChange={(e) => handleFieldChange('emailAddress', e.target.value)}
                    placeholder="예: yukwho@hanmail.net"
                  />
                </div>
                <div>
                  <Label htmlFor="emailHours">접수 시간</Label>
                  <Input
                    id="emailHours"
                    value={supportData.emailHours || ''}
                    onChange={(e) => handleFieldChange('emailHours', e.target.value)}
                    placeholder="예: 24시간 접수 가능"
                  />
                </div>
              </div>

              {/* 온라인 문의 */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="font-semibold">온라인 문의</h4>
                <div>
                  <Label htmlFor="onlineTitle">제목</Label>
                  <Input
                    id="onlineTitle"
                    value={supportData.onlineTitle || ''}
                    onChange={(e) => handleFieldChange('onlineTitle', e.target.value)}
                    placeholder="예: 온라인 문의"
                  />
                </div>
                <div>
                  <Label htmlFor="onlineDescription">설명</Label>
                  <Input
                    id="onlineDescription"
                    value={supportData.onlineDescription || ''}
                    onChange={(e) => handleFieldChange('onlineDescription', e.target.value)}
                    placeholder="예: 견적 및 기술 상담"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>자주 묻는 질문 (FAQ)</CardTitle>
              <CardDescription>
                고객들이 자주 묻는 질문과 답변을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="faqTitle">FAQ 섹션 제목</Label>
                  <Input
                    id="faqTitle"
                    value={supportData.faqTitle || ''}
                    onChange={(e) => handleFieldChange('faqTitle', e.target.value)}
                    placeholder="예: 자주 묻는 질문"
                  />
                </div>
                <div>
                  <Label htmlFor="faqSubtitle">FAQ 섹션 부제목</Label>
                  <Input
                    id="faqSubtitle"
                    value={supportData.faqSubtitle || ''}
                    onChange={(e) => handleFieldChange('faqSubtitle', e.target.value)}
                    placeholder="예: 고객님들이 자주 문의하시는 내용을 정리했습니다"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">질문 목록</h4>
                  <Button onClick={addFaq} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    질문 추가
                  </Button>
                </div>

                <div className="space-y-4">
                  {supportData.faqs?.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">질문 {index + 1}</h5>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => moveFaq(index, 'up')}
                            size="sm"
                            variant="outline"
                            disabled={index === 0}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => moveFaq(index, 'down')}
                            size="sm"
                            variant="outline"
                            disabled={index === (supportData.faqs?.length || 0) - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => removeFaq(index)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>질문</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          placeholder="질문을 입력하세요"
                        />
                      </div>
                      <div>
                        <Label>답변</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                          placeholder="답변을 입력하세요"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
