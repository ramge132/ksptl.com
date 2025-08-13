"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary-light mb-4">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">이용약관</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              한국안전용품시험연구원 서비스 이용약관
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8">
            <div className="prose prose-gray max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground mb-6">
                  시행일: 2025년 1월 1일
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">제1장 총칙</h2>
                
                <h3 className="text-xl font-bold mt-6 mb-3">제1조 (목적)</h3>
                <p className="mb-4">
                  이 약관은 한국안전용품시험연구원(이하 "연구원")이 제공하는 시험·교정 서비스 및 관련 서비스(이하 "서비스")의 이용조건 및 절차, 
                  연구원과 이용자의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">제2조 (약관의 효력과 변경)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">이 약관은 연구원 웹사이트에 게시하거나 기타의 방법으로 공지함으로써 효력을 발생합니다.</li>
                  <li className="mb-2">연구원은 필요에 따라 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지함으로써 효력을 발생합니다.</li>
                  <li className="mb-2">이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제3조 (용어의 정의)</h3>
                <p className="mb-4">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">"이용자"란 연구원의 서비스를 이용하는 개인 또는 법인을 말합니다.</li>
                  <li className="mb-2">"시험"이란 KS, KOLAS 등 국가표준에 따른 제품 시험을 말합니다.</li>
                  <li className="mb-2">"교정"이란 측정기기의 정확도를 국가표준에 따라 교정하는 것을 말합니다.</li>
                  <li className="mb-2">"성적서"란 시험 또는 교정 결과를 기록한 공식 문서를 말합니다.</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">제2장 서비스 이용계약</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">제4조 (이용계약의 성립)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">이용계약은 이용자의 서비스 이용신청과 연구원의 승낙으로 성립됩니다.</li>
                  <li className="mb-2">이용자는 신청서 작성 시 실명과 실제 정보를 기재하여야 합니다.</li>
                  <li className="mb-2">연구원은 다음 각 호에 해당하는 경우 이용신청을 승낙하지 않을 수 있습니다:
                    <ul className="list-disc pl-6 mt-2">
                      <li>허위 정보를 기재한 경우</li>
                      <li>법령 위반 또는 사회질서를 해칠 목적으로 신청한 경우</li>
                      <li>기타 연구원이 정한 이용신청 요건을 충족하지 못한 경우</li>
                    </ul>
                  </li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제5조 (서비스의 종류)</h3>
                <p className="mb-4">연구원이 제공하는 서비스는 다음과 같습니다:</p>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">안전용품 시험 서비스</li>
                  <li className="mb-2">측정기기 교정 서비스</li>
                  <li className="mb-2">시험·교정 성적서 발급</li>
                  <li className="mb-2">기술 상담 및 컨설팅</li>
                  <li className="mb-2">기타 연구원이 정하는 서비스</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">제3장 서비스 이용</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">제6조 (서비스 이용시간)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">서비스 이용시간은 연구원의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다.</li>
                  <li className="mb-2">다만, 정기 점검 등의 필요로 연구원이 정한 날이나 시간은 예외로 합니다.</li>
                  <li className="mb-2">시험·교정 접수 및 처리는 연구원 영업시간(평일 09:00~18:00) 내에 이루어집니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제7조 (서비스 이용료)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">서비스 이용료는 연구원이 정한 요금표에 따릅니다.</li>
                  <li className="mb-2">이용료는 서비스 완료 후 세금계산서 발행과 함께 청구됩니다.</li>
                  <li className="mb-2">이용자는 청구일로부터 30일 이내에 이용료를 납부해야 합니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제8조 (시험·교정 절차)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">이용자는 온라인 또는 오프라인으로 시험·교정을 신청할 수 있습니다.</li>
                  <li className="mb-2">시험·교정 대상 제품/기기는 이용자가 직접 방문, 택배, 또는 연구원 픽업 서비스를 통해 접수합니다.</li>
                  <li className="mb-2">시험·교정 완료 후 성적서가 발급되며, 이용료 납부 확인 후 제품/기기가 출고됩니다.</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">제4장 계약당사자의 의무</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">제9조 (연구원의 의무)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">연구원은 국가표준 및 국제표준에 따라 정확하고 공정한 시험·교정을 실시합니다.</li>
                  <li className="mb-2">연구원은 이용자의 정보를 보호하며, 개인정보처리방침에 따라 관리합니다.</li>
                  <li className="mb-2">연구원은 시험·교정 결과를 객관적으로 기록하고 성적서를 발급합니다.</li>
                  <li className="mb-2">연구원은 접수된 시험·교정 대상품을 선량한 관리자의 주의로 보관합니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제10조 (이용자의 의무)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">이용자는 신청 시 정확한 정보를 제공해야 합니다.</li>
                  <li className="mb-2">이용자는 연구원의 시험·교정 절차와 규정을 준수해야 합니다.</li>
                  <li className="mb-2">이용자는 이용료를 정해진 기한 내에 납부해야 합니다.</li>
                  <li className="mb-2">이용자는 시험·교정 완료 후 3개월 이내에 제품/기기를 인수해야 합니다.</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">제5장 손해배상 및 면책</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">제11조 (손해배상)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">연구원의 고의 또는 중과실로 인해 시험·교정 대상품이 훼손된 경우, 연구원은 이를 배상합니다.</li>
                  <li className="mb-2">단, 배상액은 해당 제품/기기의 잔존가치를 초과하지 않습니다.</li>
                  <li className="mb-2">이용자의 귀책사유로 발생한 손해에 대해서는 연구원이 책임지지 않습니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제12조 (면책조항)</h3>
                <p className="mb-4">연구원은 다음 각 호의 경우에는 책임을 지지 않습니다:</p>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">천재지변 또는 이에 준하는 불가항력으로 인한 서비스 제공 불가</li>
                  <li className="mb-2">이용자의 귀책사유로 인한 서비스 이용 장애</li>
                  <li className="mb-2">이용자가 제공한 정보의 오류로 인한 손해</li>
                  <li className="mb-2">운송 중 발생한 제품/기기의 파손 또는 분실</li>
                  <li className="mb-2">인수기간 경과에 따른 제품/기기의 성능 변화</li>
                </ol>

                <h2 className="text-2xl font-bold mt-8 mb-4">제6장 기타</h2>

                <h3 className="text-xl font-bold mt-6 mb-3">제13조 (재판권 및 준거법)</h3>
                <ol className="list-decimal pl-6 mb-4">
                  <li className="mb-2">이 약관에 명시되지 않은 사항은 관계법령 및 상관례에 따릅니다.</li>
                  <li className="mb-2">서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 연구원 소재지를 관할하는 법원을 관할법원으로 합니다.</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">제14조 (약관의 해석)</h3>
                <p className="mb-4">
                  이 약관에 명시되지 않은 사항과 이 약관의 해석에 관하여는 관계법령 또는 상관례에 따릅니다.
                </p>

                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <p className="font-semibold mb-2">부칙</p>
                  <p className="text-sm">이 약관은 2025년 1월 1일부터 시행합니다.</p>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
