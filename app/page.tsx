import Hero from "@/components/sections/Hero"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import Services from "@/components/sections/Services"
import CertificatesAndPatents from "@/components/sections/CertificatesAndPatents"
import Timeline from "@/components/sections/Timeline"
import Location from "@/components/sections/Location"
import Contact from "@/components/sections/Contact"
import { getLandingPage } from "@/lib/sanity-extended"

export default async function HomePage() {
  // Sanity에서 랜딩페이지 데이터 가져오기
  const landingPageData = await getLandingPage()
  
  // Hero 섹션 데이터 매핑
  const heroData = {
    titleLine1: landingPageData?.heroTitleLine1 || '한국 안전용품',
    titleLine2: landingPageData?.heroTitleLine2 || '시험연구원',
    subtitle: landingPageData?.heroSubtitle || '국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관',
    description: landingPageData?.heroDescription || 'KOLAS 공인 신뢰성과 자체 제작 노하우로, 정확한 결과와 빠른 대응을 약속합니다',
    feature1: landingPageData?.heroFeature1 || 'KOLAS 공인 시험·교정 기관',
    feature2: landingPageData?.heroFeature2 || '국내 유일 통합 수행 기관',
    feature3: landingPageData?.heroFeature3 || '신속한 견적 및 처리',
    buttonText: landingPageData?.heroButtonText || '무료 견적 진행',
    stat1Value: landingPageData?.heroStat1Value || '20+',
    stat1Label: landingPageData?.heroStat1Label || '년 경력',
    stat2Value: landingPageData?.heroStat2Value || '1,000+',
    stat2Label: landingPageData?.heroStat2Label || '고객사',
    stat3Value: landingPageData?.heroStat3Value || '5,000+',
    stat3Label: landingPageData?.heroStat3Label || '작업 건수',
    stat4Value: landingPageData?.heroStat4Value || '24H',
    stat4Label: landingPageData?.heroStat4Label || '빠른 대응'
  }

  // Location 섹션 데이터 매핑
  const locationData = {
    locationTitle1: landingPageData?.locationTitle1 || '오시는',
    locationTitle2: landingPageData?.locationTitle2 || '길',
    locationDescription: landingPageData?.locationDescription || '본사 및 시험소 위치 안내',
    mainOfficeAddress: landingPageData?.mainOfficeAddress || '경기 양주시 은현면 화합로 941번길 83',
    mainOfficeTel: landingPageData?.mainOfficeTel || '031-862-8556~7',
    testLabAddress: landingPageData?.testLabAddress || '경기 양주시 은현면 화합로 701-11',
    testLabTel: landingPageData?.testLabTel || '031-858-3012',
    operatingHours1: landingPageData?.operatingHours1 || '평일 09:00 - 18:00',
    operatingHours2: landingPageData?.operatingHours2 || '토요일 09:00 - 13:00',
    operatingHours3: landingPageData?.operatingHours3 || '일요일 및 공휴일 휴무'
  }

  // Contact 섹션 데이터 매핑
  const contactData = {
    contactTitle1: landingPageData?.contactTitle1 || '문의',
    contactTitle2: landingPageData?.contactTitle2 || '하기',
    contactDescription: landingPageData?.contactDescription || '시험·교정에 대한 견적 및 기술 상담을 도와드립니다',
    contactPhoneTitle: landingPageData?.contactPhoneTitle || '전화 문의',
    contactPhoneNumber: landingPageData?.contactPhoneNumber || '031-862-8556',
    contactPhoneHours: landingPageData?.contactPhoneHours || '평일 09:00 - 18:00',
    contactEmailTitle: landingPageData?.contactEmailTitle || '이메일',
    contactEmailAddress: landingPageData?.contactEmailAddress || 'ymy@quro.co.kr',
    contactEmailDescription: landingPageData?.contactEmailDescription || '24시간 접수 가능',
    contactTimeTitle: landingPageData?.contactTimeTitle || '처리 시간',
    contactTimeValue: landingPageData?.contactTimeValue || '24시간 내',
    contactTimeDescription: landingPageData?.contactTimeDescription || '견적 및 답변 제공',
    contactFormCompanyLabel: landingPageData?.contactFormCompanyLabel || '업체명 *',
    contactFormCompanyPlaceholder: landingPageData?.contactFormCompanyPlaceholder || '업체명을 입력하세요',
    contactFormNameLabel: landingPageData?.contactFormNameLabel || '담당자명 *',
    contactFormNamePlaceholder: landingPageData?.contactFormNamePlaceholder || '담당자명을 입력하세요',
    contactFormPhoneLabel: landingPageData?.contactFormPhoneLabel || '연락처 *',
    contactFormPhonePlaceholder: landingPageData?.contactFormPhonePlaceholder || '010-0000-0000',
    contactFormEmailLabel: landingPageData?.contactFormEmailLabel || '이메일 *',
    contactFormEmailPlaceholder: landingPageData?.contactFormEmailPlaceholder || 'example@company.com',
    contactFormTypeLabel: landingPageData?.contactFormTypeLabel || '문의 유형 *',
    contactFormTypePlaceholder: landingPageData?.contactFormTypePlaceholder || '문의 유형을 선택하세요',
    contactFormMessageLabel: landingPageData?.contactFormMessageLabel || '문의 내용 *',
    contactFormMessagePlaceholder: landingPageData?.contactFormMessagePlaceholder || '문의하실 내용을 자세히 작성해주세요',
    contactFormNotice1: landingPageData?.contactFormNotice1 || '• 작성하신 내용은 담당자 검토 후 24시간 내 답변드립니다.',
    contactFormNotice2: landingPageData?.contactFormNotice2 || '• 급한 문의는 대표번호 031-862-8556로 연락주시기 바랍니다.',
    contactButtonText: landingPageData?.contactButtonText || '문의 보내기'
  }

  return (
    <>
      <Hero {...heroData} />
        <WhyChooseUs 
          whyTitle1={landingPageData?.whyTitle1}
          whyTitle2={landingPageData?.whyTitle2}
          whyTitle3={landingPageData?.whyTitle3}
          whyTitle4={landingPageData?.whyTitle4}
          whyBottomText1={landingPageData?.whyBottomText1}
          whyBottomText2={landingPageData?.whyBottomText2}
          whyCard1Highlight={landingPageData?.whyCard1Highlight}
          whyCard1Title={landingPageData?.whyCard1Title}
          whyCard1Description={landingPageData?.whyCard1Description}
          whyCard2Highlight={landingPageData?.whyCard2Highlight}
          whyCard2Title={landingPageData?.whyCard2Title}
          whyCard2Description={landingPageData?.whyCard2Description}
          whyCard3Highlight={landingPageData?.whyCard3Highlight}
          whyCard3Title={landingPageData?.whyCard3Title}
          whyCard3Description={landingPageData?.whyCard3Description}
          whyCard4Highlight={landingPageData?.whyCard4Highlight}
          whyCard4Title={landingPageData?.whyCard4Title}
          whyCard4Description={landingPageData?.whyCard4Description}
          whyCard5Highlight={landingPageData?.whyCard5Highlight}
          whyCard5Title={landingPageData?.whyCard5Title}
          whyCard5Description={landingPageData?.whyCard5Description}
          whyCard6Highlight={landingPageData?.whyCard6Highlight}
          whyCard6Title={landingPageData?.whyCard6Title}
          whyCard6Description={landingPageData?.whyCard6Description}
        />
      <Services 
        servicesTitle1={landingPageData?.servicesTitle1}
        servicesTitle2={landingPageData?.servicesTitle2}
        servicesDescription1={landingPageData?.servicesDescription1}
        servicesDescription2={landingPageData?.servicesDescription2}
        servicesButtonText={landingPageData?.servicesButtonText}
        
        service1Title={landingPageData?.service1Title}
        service1Description={landingPageData?.service1Description}
        service1Item1={landingPageData?.service1Item1}
        service1Item2={landingPageData?.service1Item2}
        service1Item3={landingPageData?.service1Item3}
        service1Count={landingPageData?.service1Count}
        
        service2Title={landingPageData?.service2Title}
        service2Description={landingPageData?.service2Description}
        service2Item1={landingPageData?.service2Item1}
        service2Item2={landingPageData?.service2Item2}
        service2Item3={landingPageData?.service2Item3}
        service2Count={landingPageData?.service2Count}
        
        service3Title={landingPageData?.service3Title}
        service3Description={landingPageData?.service3Description}
        service3Item1={landingPageData?.service3Item1}
        service3Item2={landingPageData?.service3Item2}
        service3Item3={landingPageData?.service3Item3}
        service3Count={landingPageData?.service3Count}
        
        service4Title={landingPageData?.service4Title}
        service4Description={landingPageData?.service4Description}
        service4Item1={landingPageData?.service4Item1}
        service4Item2={landingPageData?.service4Item2}
        service4Item3={landingPageData?.service4Item3}
        service4Count={landingPageData?.service4Count}
        
        service5Title={landingPageData?.service5Title}
        service5Description={landingPageData?.service5Description}
        service5Item1={landingPageData?.service5Item1}
        service5Item2={landingPageData?.service5Item2}
        service5Item3={landingPageData?.service5Item3}
        service5Count={landingPageData?.service5Count}
        
        service6Title={landingPageData?.service6Title}
        service6Description={landingPageData?.service6Description}
        service6Item1={landingPageData?.service6Item1}
        service6Item2={landingPageData?.service6Item2}
        service6Item3={landingPageData?.service6Item3}
        service6Count={landingPageData?.service6Count}
      />
      <CertificatesAndPatents 
        certificatesTitle1={landingPageData?.certificatesTitle1}
        certificatesTitle2={landingPageData?.certificatesTitle2}
        certificatesDescription={landingPageData?.certificatesDescription}
      />
      <Timeline />
      <Location {...locationData} />
      <Contact {...contactData} />
    </>
  )
}
