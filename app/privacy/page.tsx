"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
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
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">개인정보처리방침</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              한국안전용품시험연구원 개인정보 보호 정책
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
                  시행일: 2024년 1월 1일
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">제1조 (개인정보의 처리 목적)</h2>
                <p className="mb-4">
                  한국안전용품시험연구원(이하 '연구원')은 다음의 목적을 위하여 개인정보를 처리합니다. 
                  처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                  이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>시험·교정 서비스 제공</li>
                  <li>서비스 이용에 관한 통지 및 CS대응</li>
                  <li>시험 성적서 및 교정 성적서 발급</li>
                  <li>세금계산서 발행, 대금 정산</li>
                  <li>민원처리</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
                <p className="mb-4">
                  연구원은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>시험·교정 서비스 이용기록: 5년</li>
                  <li>세금계산서 관련 정보: 5년 (국세기본법)</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제3조 (개인정보의 제3자 제공)</h2>
                <p className="mb-4">
                  연구원은 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 
                  정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">제4조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h2>
                <p className="mb-4">정보주체는 연구원에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제요구</li>
                  <li>처리정지 요구</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제5조 (처리하는 개인정보 항목)</h2>
                <p className="mb-4">연구원은 다음의 개인정보 항목을 처리하고 있습니다.</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>필수항목: 업체명, 사업자등록번호, 대표자명, 주소, 전화번호, 이메일</li>
                  <li>선택항목: 팩스번호, 휴대폰번호, 담당자명</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제6조 (개인정보의 파기)</h2>
                <p className="mb-4">
                  연구원은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>파기절차: 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                  <li>파기방법: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제7조 (개인정보의 안전성 확보조치)</h2>
                <p className="mb-4">연구원은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
                  <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화</li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제8조 (개인정보 보호책임자)</h2>
                <p className="mb-4">
                  연구원은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold mb-2">개인정보 보호책임자</p>
                  <ul className="text-sm">
                    <li>담당부서: 경영지원팀</li>
                    <li>연락처: 031-862-8556</li>
                    <li>이메일: ymy@quro.co.kr</li>
                    <li>주소: 경기도 양주시 은현면 화합로 941번길 83</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">제9조 (권익침해 구제방법)</h2>
                <p className="mb-4">
                  정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                  <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
                  <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
                  <li>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">제10조 (개인정보 처리방침 변경)</h2>
                <p className="mb-4">
                  이 개인정보처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                </p>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
