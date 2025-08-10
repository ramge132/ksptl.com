import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const testItems = {
  '마스크': [
    { id: 'mask-dust', name: '방진마스크', category: 'mask' },
    { id: 'mask-gas', name: '방독마스크', category: 'mask' },
    { id: 'mask-air', name: '송기마스크', category: 'mask' }
  ],
  '안전화': [
    { id: 'shoe-leather', name: '가죽제', category: 'shoe' },
    { id: 'shoe-rubber', name: '고무제', category: 'shoe' },
    { id: 'shoe-static-leather', name: '정전기안전화 (가죽제)', category: 'shoe' },
    { id: 'shoe-static-rubber', name: '정전기안전화 (고무제)', category: 'shoe' },
    { id: 'shoe-instep', name: '발등안전화', category: 'shoe' },
    { id: 'shoe-insulation-leather', name: '절연화 (가죽제)', category: 'shoe' },
    { id: 'shoe-insulation-rubber', name: '절연화 (고무제)', category: 'shoe' },
    { id: 'shoe-insulation-boots', name: '절연장화', category: 'shoe' }
  ],
  '보호복': [
    { id: 'suit-heat', name: '방열복', category: 'suit' },
    { id: 'suit-chemical', name: '화학물질용 보호복', category: 'suit' }
  ],
  '추락방지대': [
    { id: 'fall-protection', name: '추락방지대', category: 'fall' }
  ],
  '안전모': [
    { id: 'helmet-ab', name: 'AB형', category: 'helmet' },
    { id: 'helmet-ae', name: 'AE형', category: 'helmet' },
    { id: 'helmet-abe', name: 'ABE형', category: 'helmet' }
  ],
  '안전장갑': [
    { id: 'glove-voltage', name: '내전압용', category: 'glove' }
  ],
  '안전대': [
    { id: 'harness-belt-u', name: '벨트식 U자 걸이용', category: 'harness' },
    { id: 'harness-belt-single', name: '벨트식 1개 걸이용', category: 'harness' },
    { id: 'harness-swing-u', name: '그네식 U자 걸이용', category: 'harness' },
    { id: 'harness-swing-single', name: '그네식 1개 걸이용', category: 'harness' },
    { id: 'harness-block', name: '안전블럭', category: 'harness' }
  ]
}

export default function TestCalibrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            시험·교정 신청
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            KOLAS 공인교정기관 및 공인시험기관으로서 정확하고 신뢰할 수 있는 
            시험 및 교정 서비스를 제공합니다.
          </p>
        </div>

        {/* 시험 절차 안내 */}
        <Card className="mb-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">시험 절차</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  1
                </div>
                <p className="text-sm font-medium">신청서 접수</p>
              </div>
              <div className="text-2xl text-blue-600">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  2
                </div>
                <p className="text-sm font-medium">큐로 시험</p>
              </div>
              <div className="text-2xl text-blue-600">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  3
                </div>
                <p className="text-sm font-medium">성적서 발급</p>
              </div>
              <div className="text-2xl text-blue-600">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  4
                </div>
                <p className="text-sm font-medium">국내 제조업체</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 인증 배지 */}
        <div className="flex justify-center space-x-4 mb-12">
          <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2">
            KOLAS 공인교정기관
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2">
            KOLAS 공인시험기관
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2">
            KS 인증
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600 px-4 py-2">
            ISO 9001:2015
          </Badge>
        </div>

        {/* 시험 항목들 */}
        <div className="space-y-8">
          {Object.entries(testItems).map(([category, items]) => (
            <Card key={category} className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-2xl">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/test-calibration/${item.id}`}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-16 text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">시험 신청하기</div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 교정 신청 */}
        <Card className="mt-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="text-2xl">교정 신청</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                각종 시험기기의 정밀 교정 서비스를 제공합니다.
              </p>
              <Link href="/test-calibration/calibration">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  교정 신청하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 정보 */}
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">본사</h3>
                <p className="text-gray-600">경기 양주시 은현면 화합로 941번길 83</p>
                <p className="text-gray-600">031-862-8556~7</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">시험소</h3>
                <p className="text-gray-600">경기 양주시 은현면 화합로 701-11</p>
                <p className="text-gray-600">031-858-3012</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
