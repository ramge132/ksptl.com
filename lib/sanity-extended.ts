import { client } from './sanity'
import { createClient } from '@sanity/client'

// 서버 사이드 전용 클라이언트 (토큰 포함)
const serverClient = typeof window === 'undefined' ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
}) : client

// Landing Page 관련 함수
export interface LandingPage {
  _id: string
  _type: 'landingPage'
  
  // Hero 섹션 - 메인 화면
  heroTitleLine1: string  // "한국 안전용품"
  heroTitleLine2: string  // "시험연구원"
  heroSubtitle: string    // "국내 유일의 시험기 제작과 시험 & 교정을 하는 전문기관"
  heroDescription: string // "KOLAS 공인 신뢰성과 자체 제작 노하우로..."
  heroFeature1: string    // "KOLAS 공인 시험·교정 기관"
  heroFeature2: string    // "국내 유일 통합 수행 기관"
  heroFeature3: string    // "신속한 견적 및 처리"
  heroButtonText: string  // "무료 견적 진행"
  heroStat1Value: string  // "20+"
  heroStat1Label: string  // "년 경력"
  heroStat2Value: string  // "1,000+"
  heroStat2Label: string  // "고객사"
  heroStat3Value: string  // "5,000+"
  heroStat3Label: string  // "작업 건수"
  heroStat4Value: string  // "24H"
  heroStat4Label: string  // "빠른 대응"
  
  // WhyChooseUs 섹션
  whyTitle1?: string       // "왜"
  whyTitle2?: string       // "한국안전용품시험연구원"
  whyTitle3?: string       // "을"
  whyTitle4?: string       // "선택해야 할까요?"
  whyBottomText1?: string  // 하단 텍스트 첫줄
  whyBottomText2?: string  // 하단 텍스트 둘줄
  
  // WhyChooseUs 카드들
  whyCard1Highlight?: string
  whyCard1Title?: string
  whyCard1Description?: string
  whyCard2Highlight?: string
  whyCard2Title?: string
  whyCard2Description?: string
  whyCard3Highlight?: string
  whyCard3Title?: string
  whyCard3Description?: string
  whyCard4Highlight?: string
  whyCard4Title?: string
  whyCard4Description?: string
  whyCard5Highlight?: string
  whyCard5Title?: string
  whyCard5Description?: string
  whyCard6Highlight?: string
  whyCard6Title?: string
  whyCard6Description?: string
  
  // Services 섹션
  servicesTitle1?: string
  servicesTitle2?: string
  servicesDescription1?: string
  servicesDescription2?: string
  servicesButtonText?: string
  
  // Service 카드들
  service1Title?: string
  service1Description?: string
  service1Item1?: string
  service1Item2?: string
  service1Item3?: string
  service1Count?: number
  
  service2Title?: string
  service2Description?: string
  service2Item1?: string
  service2Item2?: string
  service2Item3?: string
  service2Count?: number
  
  service3Title?: string
  service3Description?: string
  service3Item1?: string
  service3Item2?: string
  service3Item3?: string
  service3Count?: number
  
  service4Title?: string
  service4Description?: string
  service4Item1?: string
  service4Item2?: string
  service4Item3?: string
  service4Count?: number
  
  service5Title?: string
  service5Description?: string
  service5Item1?: string
  service5Item2?: string
  service5Item3?: string
  service5Count?: number
  
  service6Title?: string
  service6Description?: string
  service6Item1?: string
  service6Item2?: string
  service6Item3?: string
  service6Count?: number
  
  // 인증서 및 특허 섹션
  certificatesTitle1?: string
  certificatesTitle2?: string
  certificatesDescription?: string
  
  // 연혁 섹션
  timelineTitle1?: string
  timelineTitle2?: string
  timelineDescription?: string
  
  // 오시는길 섹션
  locationTitle1?: string
  locationTitle2?: string
  locationDescription?: string
  mainOfficeAddress?: string
  mainOfficeTel?: string
  testLabAddress?: string
  testLabTel?: string
  operatingHours1?: string
  operatingHours2?: string
  operatingHours3?: string
  
  // 문의하기 섹션
  contactTitle1?: string
  contactTitle2?: string
  contactDescription?: string
  contactPhoneTitle?: string
  contactPhoneNumber?: string
  contactPhoneHours?: string
  contactEmailTitle?: string
  contactEmailAddress?: string
  contactEmailDescription?: string
  contactTimeTitle?: string
  contactTimeValue?: string
  contactTimeDescription?: string
  contactFormCompanyLabel?: string
  contactFormCompanyPlaceholder?: string
  contactFormNameLabel?: string
  contactFormNamePlaceholder?: string
  contactFormPhoneLabel?: string
  contactFormPhonePlaceholder?: string
  contactFormEmailLabel?: string
  contactFormEmailPlaceholder?: string
  contactFormTypeLabel?: string
  contactFormTypePlaceholder?: string
  contactFormMessageLabel?: string
  contactFormMessagePlaceholder?: string
  contactFormNotice1?: string
  contactFormNotice2?: string
  contactButtonText?: string
  
  // 기타 섹션들 (나중에 추가)
  introTitle?: string
  introDescription?: string
  whyChooseTitle?: string
  whyChooseItems?: Array<{
    title: string
    description: string
    icon: string
  }>
  timelineTitle?: string
  timelineItems?: Array<{
    year: string
    title: string
    description: string
  }>
}

export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    const result = await client.fetch(`*[_type == "landingPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch landing page:', error)
    return null
  }
}

export async function updateLandingPage(data: Partial<LandingPage>): Promise<LandingPage | null> {
  try {
    const existing = await getLandingPage()
    if (existing) {
      return await serverClient.patch(existing._id).set(data).commit() as unknown as LandingPage
    } else {
      return await serverClient.create({
        _id: 'landingPage-singleton',
        _type: 'landingPage',
        ...data
      }) as unknown as LandingPage
    }
  } catch (error) {
    console.error('Failed to update landing page:', error)
    return null
  }
}

// About Page 관련 함수
export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  // Hero 섹션
  heroSince?: string
  heroTitle?: string
  heroSubtitle?: string
  
  // 소개 섹션
  introTitle1?: string
  introTitle2?: string
  introParagraph1?: string
  introParagraph2?: string
  introParagraph3?: string
  companyImage?: any
  badgeYears?: string
  badgeText?: string
  
  // 핵심 가치 섹션
  valuesTitle?: string
  valuesSubtitle?: string
  value1Title?: string
  value1Description?: string
  value2Title?: string
  value2Description?: string
  value3Title?: string
  value3Description?: string
  
  // 사업 분야 섹션
  businessTitle?: string
  businessSubtitle?: string
  business1Title?: string
  business1Description?: string
  business1Item1?: string
  business1Item2?: string
  business1Item3?: string
  business1Item4?: string
  business2Title?: string
  business2Description?: string
  business2Item1?: string
  business2Item2?: string
  business2Item3?: string
  business2Item4?: string
  business3Title?: string
  business3Description?: string
  business3Item1?: string
  business3Item2?: string
  business3Item3?: string
  business3Item4?: string
  business4Title?: string
  business4Description?: string
  business4Item1?: string
  business4Item2?: string
  business4Item3?: string
  business4Item4?: string
  
  // 시험 절차 섹션
  processTitle?: string
  processSubtitle?: string
  process1Title?: string
  process1Description?: string
  process2Title?: string
  process2Description?: string
  process3Title?: string
  process3Description?: string
  process4Title?: string
  process4Description?: string
  processStep1?: string
  processStep2?: string
  processStep3?: string
  processStep4?: string
  
  // 연혁 배지
  historyBadge1Number?: string
  historyBadge1Text?: string
  historyBadge2Number?: string
  historyBadge2Text?: string
  historyBadge3Number?: string
  historyBadge3Text?: string
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const result = await client.fetch(`*[_type == "aboutPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch about page:', error)
    return null
  }
}

export async function updateAboutPage(data: Partial<AboutPage>): Promise<AboutPage | null> {
  try {
    const existing = await getAboutPage()
    if (existing) {
      return await serverClient.patch(existing._id).set(data).commit() as unknown as AboutPage
    } else {
      return await serverClient.create({
        _id: 'aboutPage-singleton',
        _type: 'aboutPage',
        ...data
      }) as unknown as AboutPage
    }
  } catch (error) {
    console.error('Failed to update about page:', error)
    return null
  }
}

// Test Items 관련 함수
export interface TestItem {
  _id: string
  _type: 'testItem'
  category: string
  name: string
  description: string
  standards: string[]
  testPeriod: string
  price: string
  requiredDocuments: string[]
  order: number
  isActive: boolean
}

export async function getTestItems(): Promise<TestItem[]> {
  try {
    const result = await client.fetch(`*[_type == "testItem"] | order(order asc)`)
    return result || []
  } catch (error) {
    console.error('Failed to fetch test items:', error)
    return []
  }
}

export async function createTestItem(data: Omit<TestItem, '_id' | '_type'>): Promise<TestItem | null> {
  try {
    return await serverClient.create({
      _type: 'testItem',
      ...data
    })
  } catch (error) {
    console.error('Failed to create test item:', error)
    return null
  }
}

export async function updateTestItem(id: string, data: Partial<TestItem>): Promise<TestItem | null> {
  try {
    return await serverClient.patch(id).set(data).commit()
  } catch (error) {
    console.error('Failed to update test item:', error)
    return null
  }
}

export async function deleteTestItem(id: string): Promise<boolean> {
  try {
    await serverClient.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete test item:', error)
    return false
  }
}

// Support Page 관련 함수
export interface SupportPage {
  _id: string
  _type: 'supportPage'
  pageTitle: string
  pageSubtitle: string
  faqTitle: string
  faqItems: Array<{
    question: string
    answer: string
    category: string
  }>
  contactTitle: string
  contactDescription: string
  contactMethods: Array<{
    method: string
    value: string
    description: string
    availableTime: string
  }>
  noticeTitle: string
  notices: Array<{
    title: string
    content: string
    date: string
    isImportant: boolean
  }>
  downloadTitle: string
  downloadDescription: string
}

export async function getSupportPage(): Promise<SupportPage | null> {
  try {
    const result = await client.fetch(`*[_type == "supportPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch support page:', error)
    return null
  }
}

export async function updateSupportPage(data: Partial<SupportPage>): Promise<SupportPage | null> {
  try {
    const existing = await getSupportPage()
    if (existing) {
      return await serverClient.patch(existing._id).set(data).commit() as unknown as SupportPage
    } else {
      return await serverClient.create({
        _id: 'supportPage-singleton',
        _type: 'supportPage',
        ...data
      }) as unknown as SupportPage
    }
  } catch (error) {
    console.error('Failed to update support page:', error)
    return null
  }
}

// Resources 관련 함수
export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  category: string
  description: string
  file?: any
  fileSize: string
  downloadCount: number
  publishedDate: string
  isPublic: boolean
  order: number
}

export async function getResources(): Promise<Resource[]> {
  try {
    const result = await client.fetch(`*[_type == "resource"] | order(order asc)`)
    return result || []
  } catch (error) {
    console.error('Failed to fetch resources:', error)
    return []
  }
}

export async function createResource(data: Omit<Resource, '_id' | '_type'>): Promise<Resource | null> {
  try {
    return await serverClient.create({
      _type: 'resource',
      ...data
    })
  } catch (error) {
    console.error('Failed to create resource:', error)
    return null
  }
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<Resource | null> {
  try {
    return await serverClient.patch(id).set(data).commit()
  } catch (error) {
    console.error('Failed to update resource:', error)
    return null
  }
}

export async function deleteResource(id: string): Promise<boolean> {
  try {
    await serverClient.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete resource:', error)
    return false
  }
}
