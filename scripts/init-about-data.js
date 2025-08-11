const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

const aboutPageData = {
  _id: 'aboutPage-singleton',
  _type: 'aboutPage',
  
  // Hero 섹션
  heroSince: '2004',
  heroTitle: '한국안전용품시험연구원',
  heroSubtitle: '20년 전통의 시험기 제작 전문 기업, 국내 유일 원스톱 솔루션',
  
  // 소개 섹션
  introTitle1: '시험기 제작부터 교정·시험까지',
  introTitle2: '국내 유일 원스톱 솔루션',
  
  introParagraph1: '(주)큐로는 시험기 제작 전문 기업으로 대한민국 표준 KS B 5541, KS B 5521, KS B 5533 인증과 국제 표준 ISO 9001:2015, CE를 인증 받아 금속(재료) 시험기, 가구 시험기, 안전용품 시험기, 스포츠용품 시험기, 화학 관련 시험기, 자동차 관련 시험기, 챔버 등을 앞선 기술력으로 제작하고 있습니다.',
  
  introParagraph2: '시험기 제작으로 축적한 기술력과 경험을 바탕으로 교정검사 및 시험 서비스 분야로 사업 영역을 확장하여, 국내외 규격에 부합하는 정밀 교정과 종합 시험을 전문적으로 수행합니다.',
  
  introParagraph3: '독립된 교정·시험으로 축적된 데이터와 노하우를 활용해 시험 장비의 정확도와 효율성을 극대화하여 고객 성공을 위한 최고의 서비스를 제공합니다.',
  
  // 연혁 배지
  historyBadge1Number: '20',
  historyBadge1Text: '년 역사',
  historyBadge2Number: '1000',
  historyBadge2Text: '+ 고객사',
  historyBadge3Number: '227',
  historyBadge3Text: '종 시험',
  
  // 핵심 가치 섹션
  valuesTitle: '핵심 가치',
  valuesSubtitle: '신뢰와 전문성으로 고객과 함께 성장합니다',
  
  value1Title: '신뢰성',
  value1Description: 'KOLAS 공인 인증과 20년 경험으로 검증된 신뢰할 수 있는 서비스',
  
  value2Title: '전문성',
  value2Description: '시험기 제작부터 시험·교정까지 모든 과정의 전문 기술력 보유',
  
  value3Title: '고객중심',
  value3Description: '신속한 견적과 정확한 처리로 고객 만족도 극대화',
  
  // 사업 분야 섹션
  businessTitle: '사업 분야',
  businessSubtitle: '시험기 제작부터 교정·시험까지 원스톱 서비스를 제공합니다',
  
  business1Title: '시험기 제작',
  business1Description: '전 분야 시험기 주문 제작',
  business1Item1: '금속(재료) 시험기',
  business1Item2: '안전용품 시험기',
  business1Item3: '가구/스포츠용품 시험기',
  business1Item4: '화학/자동차 관련 시험기',
  
  business2Title: '활선접근경보기',
  business2Description: '전압 노출시 사용자를 감전으로부터 보호',
  business2Item1: '특허 등록 제품',
  business2Item2: '높은 감지 정확도',
  business2Item3: '휴대성 및 편의성',
  business2Item4: '산업 현장 필수품',
  
  business3Title: '교정검사',
  business3Description: 'KOLAS 공인교정기관 / 교정성적서 발급',
  business3Item1: 'KC23-420 인정',
  business3Item2: '국가 공인 교정',
  business3Item3: '정밀 측정 보증',
  business3Item4: '신속한 처리',
  
  business4Title: '시험',
  business4Description: 'KOLAS 공인시험기관 / 시험성적서 발급',
  business4Item1: '227종 안전용품 시험',
  business4Item2: '국제 규격 준수',
  business4Item3: '공인 성적서 발급',
  business4Item4: '원스톱 서비스',
  
  // 시험 절차 섹션
  processTitle: '시험 절차',
  processSubtitle: '체계적인 프로세스로 정확하고 신속한 서비스를 제공합니다',
  
  process1Title: '접수',
  process1Description: '온라인/오프라인 신청',
  
  process2Title: '시험·교정',
  process2Description: '전문가 정밀 검사',
  
  process3Title: '성적서 발급',
  process3Description: 'KOLAS 공인 성적서',
  
  process4Title: '납품',
  process4Description: '신속한 결과 전달',
}

async function initAboutData() {
  try {
    console.log('기관개요 페이지 데이터 초기화 중...')
    
    // 기존 데이터가 있는지 확인
    const existing = await client.fetch('*[_type == "aboutPage"][0]')
    
    if (existing) {
      // 기존 데이터가 있으면 업데이트
      console.log('기존 데이터 업데이트 중...')
      const result = await client
        .patch(existing._id)
        .set(aboutPageData)
        .commit()
      console.log('기관개요 페이지 데이터 업데이트 완료:', result._id)
    } else {
      // 없으면 새로 생성
      console.log('새 데이터 생성 중...')
      const result = await client.create(aboutPageData)
      console.log('기관개요 페이지 데이터 생성 완료:', result._id)
    }
    
    console.log('✅ 기관개요 페이지 데이터 초기화 완료!')
  } catch (error) {
    console.error('❌ 오류 발생:', error)
    process.exit(1)
  }
}

initAboutData()
