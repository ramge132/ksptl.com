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

  return (
    <>
      <Hero {...heroData} />
      <WhyChooseUs />
      <Services />
      <CertificatesAndPatents />
      <Timeline />
      <Location />
      <Contact />
    </>
  )
}
