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
  
  // 기본값 설정
  const heroData = {
    title: landingPageData?.heroTitle || '한국 안전용품 시험연구원',
    subtitle: landingPageData?.heroSubtitle || '국내 유일 시험기 제작·시험·교정 통합 수행기관',
    buttonText: landingPageData?.heroButtonText || '무료 견적 진행'
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
