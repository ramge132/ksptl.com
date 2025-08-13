import Hero from "@/components/sections/Hero"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import Services from "@/components/sections/Services"
import CertificatesAndPatents from "@/components/sections/CertificatesAndPatents"
import Timeline from "@/components/sections/Timeline"
import Location from "@/components/sections/Location"
import Contact from "@/components/sections/Contact"

export default function HomePage() {
  // 기본 데이터 사용 (Sanity 비활성화)
  
  // Hero 섹션 데이터
  const heroData = {
    titleLine1: '한국 안전용품',
    titleLine2: '시험연구원',
    subtitle: '국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관',
    description: 'KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다',
    feature1: 'KOLAS 공인 시험·교정 기관',
    feature2: '국내 유일 통합 수행 기관',
    feature3: '신속한 견적 및 처리',
    buttonText: '무료 견적 진행',
    stat1Value: '20+',
    stat1Label: '년 경력',
    stat2Value: '1,000+',
    stat2Label: '고객사',
    stat3Value: '5,000+',
    stat3Label: '작업 건수',
    stat4Value: '24H',
    stat4Label: '빠른 대응'
  }

  // Location 섹션 데이터
  const locationData = {
    locationTitle1: '오시는',
    locationTitle2: '길',
    locationDescription: '본사 및 시험소 위치 안내',
    mainOfficeAddress: '경기 양주시 은현면 화합로 941번길 83',
    mainOfficeTel: '031-862-8556~7',
    testLabAddress: '경기 양주시 은현면 화합로 701-11',
    testLabTel: '031-858-3012',
    operatingHours1: '평일 09:00 - 18:00',
    operatingHours2: '토요일 09:00 - 13:00',
    operatingHours3: '일요일 및 공휴일 휴무'
  }

  // Contact 섹션 데이터
  const contactData = {
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
    contactButtonText: '문의 보내기'
  }

  return (
    <>
      <Hero {...heroData} />
      <WhyChooseUs />
      <Services />
      <CertificatesAndPatents />
      <Timeline />
      <Location {...locationData} />
      <Contact {...contactData} />
    </>
  )
}
