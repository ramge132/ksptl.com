// 연혁 초기 데이터 설정 스크립트
const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// 연혁 초기 데이터
const timelineData = [
  {
    year: '1994',
    title: '㈜큐로 설립',
    description: '시험기 제작 전문 기업으로 출발',
    icon: 'Building',
    order: 1
  },
  {
    year: '2000',
    title: 'KS 인증 획득',
    description: 'KS B 5521, 5533, 5541 인증 취득',
    icon: 'Award',
    order: 2
  },
  {
    year: '2005',
    title: 'ISO 9001 인증',
    description: '국제 품질경영시스템 인증 획득',
    icon: 'Star',
    order: 3
  },
  {
    year: '2010',
    title: '연구개발전담부서 인정',
    description: '기술 혁신을 위한 R&D 부서 설립',
    icon: 'Rocket',
    order: 4
  },
  {
    year: '2015',
    title: '시험소 확장',
    description: '양주시 화합로에 독립 시험소 개소',
    icon: 'Building',
    order: 5
  },
  {
    year: '2020',
    title: 'KOLAS 공인기관 인정',
    description: 'KC23-420 교정기관 인정 획득',
    icon: 'Award',
    order: 6
  },
  {
    year: '2023',
    title: '통합 서비스 출범',
    description: '시험기 제작·시험·교정 원스톱 서비스',
    icon: 'Target',
    order: 7
  },
  {
    year: '2024',
    title: '한국안전용품시험연구원',
    description: '공인 시험·교정 전문기관으로 도약',
    icon: 'Star',
    order: 8
  }
]

async function initTimelineData() {
  try {
    console.log('연혁 초기 데이터 설정 시작...')

    // 기존 연혁 데이터 확인
    const existingTimeline = await client.fetch('*[_type == "timeline"]')
    
    if (existingTimeline.length > 0) {
      console.log('이미 연혁 데이터가 존재합니다. 기존 데이터를 삭제하고 새로 추가하시려면 다음 명령어를 실행하세요:')
      console.log('node scripts/init-timeline-data.js --force')
      
      if (process.argv.includes('--force')) {
        console.log('기존 데이터 삭제 중...')
        for (const item of existingTimeline) {
          await client.delete(item._id)
        }
        console.log('기존 데이터 삭제 완료')
      } else {
        return
      }
    }

    // 연혁 데이터 추가
    console.log('\n연혁 데이터 추가 중...')
    for (const item of timelineData) {
      try {
        const result = await client.create({
          _type: 'timeline',
          ...item
        })
        console.log(`✓ ${item.year} - ${item.title} 추가 완료`)
      } catch (error) {
        console.error(`✗ ${item.year} - ${item.title} 추가 실패:`, error.message)
      }
    }

    console.log('\n✅ 연혁 초기 데이터 설정 완료!')
    console.log('총 ' + timelineData.length + '개의 연혁 항목이 추가되었습니다.')
  } catch (error) {
    console.error('오류 발생:', error)
  }
}

initTimelineData()
