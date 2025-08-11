'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import type { LandingPage } from '@/lib/sanity-extended'

interface Props {
  landingPage: LandingPage
  onSave: (data: Partial<LandingPage>) => Promise<void>
}

export default function HeroSectionManager({ landingPage, onSave }: Props) {
  const [data, setData] = useState<Partial<LandingPage>>({
    heroTitleLine1: landingPage.heroTitleLine1 || '한국 안전용품',
    heroTitleLine2: landingPage.heroTitleLine2 || '시험연구원',
    heroSubtitle: landingPage.heroSubtitle || '국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관',
    heroDescription: landingPage.heroDescription || 'KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다',
    heroFeature1: landingPage.heroFeature1 || 'KOLAS 공인 시험·교정 기관',
    heroFeature2: landingPage.heroFeature2 || '국내 유일 통합 수행 기관',
    heroFeature3: landingPage.heroFeature3 || '신속한 견적 및 처리',
    heroButtonText: landingPage.heroButtonText || '무료 견적 진행',
    heroStat1Value: landingPage.heroStat1Value || '20+',
    heroStat1Label: landingPage.heroStat1Label || '년 경력',
    heroStat2Value: landingPage.heroStat2Value || '1,000+',
    heroStat2Label: landingPage.heroStat2Label || '고객사',
    heroStat3Value: landingPage.heroStat3Value || '5,000+',
    heroStat3Label: landingPage.heroStat3Label || '작업 건수',
    heroStat4Value: landingPage.heroStat4Value || '24H',
    heroStat4Label: landingPage.heroStat4Label || '빠른 대응',
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      toast.success('저장되었습니다')
    } catch (error) {
      toast.error('저장 실패')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>메인 화면 (Hero 섹션)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 메인 타이틀 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">메인 타이틀</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>첫 번째 줄</Label>
                <Input
                  value={data.heroTitleLine1}
                  onChange={(e) => setData({...data, heroTitleLine1: e.target.value})}
                  placeholder="한국 안전용품"
                />
              </div>
              <div>
                <Label>두 번째 줄</Label>
                <Input
                  value={data.heroTitleLine2}
                  onChange={(e) => setData({...data, heroTitleLine2: e.target.value})}
                  placeholder="시험연구원"
                />
              </div>
            </div>
          </div>

          {/* 서브 타이틀 */}
          <div>
            <Label>서브 타이틀</Label>
            <Input
              value={data.heroSubtitle}
              onChange={(e) => setData({...data, heroSubtitle: e.target.value})}
              placeholder="국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관"
            />
          </div>

          {/* 설명 */}
          <div>
            <Label>설명 문구</Label>
            <Input
              value={data.heroDescription}
              onChange={(e) => setData({...data, heroDescription: e.target.value})}
              placeholder="KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다"
            />
          </div>

          {/* 특징들 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">주요 특징</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>특징 1</Label>
                <Input
                  value={data.heroFeature1}
                  onChange={(e) => setData({...data, heroFeature1: e.target.value})}
                  placeholder="KOLAS 공인 시험·교정 기관"
                />
              </div>
              <div>
                <Label>특징 2</Label>
                <Input
                  value={data.heroFeature2}
                  onChange={(e) => setData({...data, heroFeature2: e.target.value})}
                  placeholder="국내 유일 통합 수행 기관"
                />
              </div>
              <div>
                <Label>특징 3</Label>
                <Input
                  value={data.heroFeature3}
                  onChange={(e) => setData({...data, heroFeature3: e.target.value})}
                  placeholder="신속한 견적 및 처리"
                />
              </div>
            </div>
          </div>

          {/* 버튼 텍스트 */}
          <div>
            <Label>버튼 텍스트</Label>
            <Input
              value={data.heroButtonText}
              onChange={(e) => setData({...data, heroButtonText: e.target.value})}
              placeholder="무료 견적 진행"
            />
          </div>

          {/* 통계 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">통계 숫자</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>통계 1</Label>
                <Input
                  value={data.heroStat1Value}
                  onChange={(e) => setData({...data, heroStat1Value: e.target.value})}
                  placeholder="20+"
                />
                <Input
                  value={data.heroStat1Label}
                  onChange={(e) => setData({...data, heroStat1Label: e.target.value})}
                  placeholder="년 경력"
                />
              </div>
              <div className="space-y-2">
                <Label>통계 2</Label>
                <Input
                  value={data.heroStat2Value}
                  onChange={(e) => setData({...data, heroStat2Value: e.target.value})}
                  placeholder="1,000+"
                />
                <Input
                  value={data.heroStat2Label}
                  onChange={(e) => setData({...data, heroStat2Label: e.target.value})}
                  placeholder="고객사"
                />
              </div>
              <div className="space-y-2">
                <Label>통계 3</Label>
                <Input
                  value={data.heroStat3Value}
                  onChange={(e) => setData({...data, heroStat3Value: e.target.value})}
                  placeholder="5,000+"
                />
                <Input
                  value={data.heroStat3Label}
                  onChange={(e) => setData({...data, heroStat3Label: e.target.value})}
                  placeholder="작업 건수"
                />
              </div>
              <div className="space-y-2">
                <Label>통계 4</Label>
                <Input
                  value={data.heroStat4Value}
                  onChange={(e) => setData({...data, heroStat4Value: e.target.value})}
                  placeholder="24H"
                />
                <Input
                  value={data.heroStat4Label}
                  onChange={(e) => setData({...data, heroStat4Label: e.target.value})}
                  placeholder="빠른 대응"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? '저장 중...' : '변경사항 저장'}
        </Button>
      </div>
    </div>
  )
}
