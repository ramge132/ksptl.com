const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const initialCategories = [
  {
    _type: 'testCategory',
    key: 'mask',
    name: '마스크',
    icon: 'shield',
    description: '방진, 방독, 송기마스크 전문 시험',
    subcategories: [
      {
        type: '방진마스크',
        tests: [
          '강도 신장율 및 영구변형율 시험',
          '투시부의 내충격성 시험',
          '여과재 질량 시험'
        ]
      },
      {
        type: '방독마스크',
        tests: [
          '강도 신장율 및 영구변형율 시험',
          '투시부의 내충격성 시험',
          '정화통 질량 시험'
        ]
      },
      {
        type: '송기마스크',
        tests: [
          '호스 및 중압호스 변형 및 구부림 시험',
          '호스 및 중압호스 연결부 인장 시험'
        ]
      }
    ],
    order: 0,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'shoes',
    name: '안전화',
    icon: 'footprints',
    description: '가죽제, 고무제, 정전기안전화, 절연화 시험',
    subcategories: [
      {
        type: '가죽제',
        tests: [
          '내압박성 시험',
          '내충격성 시험',
          '내답발성 시험',
          '박리저항시험',
          '결창인장강도 시험',
          '결창신장율시험',
          '내유부피변화율 시험',
          '내유경도변화율 시험',
          '온면결렬 시험',
          '선심의 내부식성 시험',
          '내답판 내부식성 시험',
          '가죽인열강도 시험'
        ]
      },
      {
        type: '고무제',
        tests: [
          '고무 인장강도 시험',
          '고무 내유부피변화율 시험',
          '안감 및 포파일 시험',
          '내압박성 시험',
          '내충격성 시험',
          '내답판 내부식성 시험',
          '선심의 내부식성 시험',
          '내답발성 시험'
        ]
      },
      {
        type: '정전기안전화 (가죽제)',
        tests: [
          '내압박성 시험',
          '내충격성 시험',
          '내답발성 시험',
          '박리저항시험',
          '결창인장강도 시험',
          '결창신장율시험',
          '내유부피변화율 시험',
          '내유경도변화율 시험',
          '온면결렬 시험',
          '선심의 내부식성 시험',
          '내답판 내부식성 시험',
          '가죽인열강도 시험',
          '대전방지 성능 시험'
        ]
      },
      {
        type: '정전기안전화 (고무제)',
        tests: [
          '고무 인장강도 시험',
          '고무 내유부피변화율 시험',
          '안감 및 포파일 시험',
          '내압박성 시험',
          '내충격성 시험',
          '내답판 내부식성 시험',
          '선심의 내부식성 시험',
          '내답발성 시험',
          '대전방지 성능 시험'
        ]
      },
      {
        type: '발등안전화',
        tests: [
          '내압박성 시험',
          '내충격성 시험',
          '내답발성 시험',
          '박리저항시험',
          '결창인장강도 시험',
          '결창신장율시험',
          '내유부피변화율 시험',
          '내유경도변화율 시험',
          '온면결렬 시험',
          '선심의 내부식성 시험',
          '내답판 내부식성 시험',
          '가죽인열강도 시험',
          '방호대 내충격성 시험'
        ]
      },
      {
        type: '절연화 (가죽제)',
        tests: [
          '내압박성 시험',
          '내충격성 시험',
          '내답발성 시험',
          '박리저항시험',
          '결창인장강도 시험',
          '결창신장율시험',
          '내유부피변화율 시험',
          '내유경도변화율 시험',
          '온면결렬 시험',
          '선심의 내부식성 시험',
          '내답판 내부식성 시험',
          '가죽인열강도 시험',
          '내전압 시험 (14 000 V)'
        ]
      },
      {
        type: '절연화 (고무제)',
        tests: [
          '고무 인장강도 시험',
          '고무 내유부피변화율 시험',
          '안감 및 포파일 시험',
          '내압박성 시험',
          '내충격성 시험',
          '내답판 내부식성 시험',
          '선심의 내부식성 시험',
          '내답발성 시험',
          '내전압 시험 (14 000 V)'
        ]
      },
      {
        type: '절연장화',
        tests: [
          '내전압 시험 (20 000 V)',
          '고무 인장강도 시험',
          '고무 신장율 시험'
        ]
      }
    ],
    order: 1,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'clothing',
    name: '보호복',
    icon: 'shirt',
    description: '방열복, 화학물질용 보호복 시험',
    subcategories: [
      {
        type: '방열복',
        tests: [
          '난연성 시험',
          '절연저항 시험',
          '열전도율 시험',
          '인장강도 시험',
          '내열성 시험',
          '내한성 시험',
          '열충격 시험',
          '안면렌즈의 내충격 시험'
        ]
      },
      {
        type: '화학물질용 보호복',
        tests: [
          '인장강도 시험',
          '인열강도 시험',
          '뚫림강도 시험',
          '마모저항 시험',
          '굴곡저항 시험',
          '연소저항 시험',
          '화염저항 시험',
          '슬기강도 시험',
          '접합부 연결강도 시험',
          '안면창 강도 시험',
          '호흡 및 환기호스 연결부 강도 시험'
        ]
      }
    ],
    order: 2,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'harness',
    name: '추락방지대',
    icon: 'alerttriangle',
    description: '추락방지대 전문 시험',
    subcategories: [
      {
        type: '추락방지대',
        tests: [
          '구조검사',
          '죔줄 인장강도 시험',
          '죔줄 연결부 인장강도 시험',
          '수직구명줄 인장강도 시험',
          '추락방지대 인장강도 시험',
          '완성품 다리낙하 동하중성능 시험',
          '완성품 머리낙하 동하중성능 시험',
          '정하중성능 시험(목링)',
          '정하중성능 시험(가랭이링)',
          'D링 인장강도 시험',
          '박클 인정강도 시험',
          '훅 인정강도 시험',
          '카라비나 인장강도 시험',
          '훅 수직압축 시험',
          '혹 측면압축 시험'
        ]
      }
    ],
    order: 3,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'helmet',
    name: '안전모',
    icon: 'hardhat',
    description: 'AB형, AE형, ABE형 안전모 시험',
    subcategories: [
      {
        type: 'AB형, AE형, ABE형',
        tests: [
          '내관통성 시험',
          '충격흡수성 시험',
          '턱끈풀림시험',
          '난연성 시험',
          '내전압성 시험',
          '내수성 시험',
          '측면변형방호 시험'
        ]
      }
    ],
    order: 4,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'gloves',
    name: '안전장갑',
    icon: 'hand',
    description: '내전압용 안전장갑 시험',
    subcategories: [
      {
        type: '내전압용',
        tests: [
          '절연내력 시험',
          '인장강도 시험',
          '경년변화 시험',
          '내열성 시험',
          '영구신장율 시험',
          '뚫림강도 시험'
        ]
      }
    ],
    order: 5,
    isActive: true
  },
  {
    _type: 'testCategory',
    key: 'belt',
    name: '안전대',
    icon: 'wrench',
    description: '벨트식, 그네식, 안전블럭 시험',
    subcategories: [
      {
        type: '벨트식 U자걸이용',
        tests: [
          '구조검사',
          '죔줄 인장강도 시험',
          '죔줄 연결부 인장강도 시험',
          'D링 인장강도시험',
          '8자링 인장강도 시험',
          '박클 인장강도 시험',
          '훅 인장강도 시험',
          '카라비나 인장강도 시험',
          '훅수직압축 시험',
          '훅 측면압축 시험',
          '충격흡수장치 인장강도 시험',
          '충격흡수장치 신장측정 시험',
          '완성품 동하중성능 시험',
          '충격흡수장치 동하중성능 시험',
          '정하중성능 시험',
          '벨트 인장강도 시험',
          '보조죔줄 동하중성능 시험',
          '지탱벨트 인장강도 시험',
          '보조죔줄 인장강도 시험',
          '각링 인장강도시험',
          '신축조절기 인장강도 시험'
        ]
      },
      {
        type: '벨트식 1개걸이용',
        tests: [
          '구조검사',
          '죔줄 인장강도 시험',
          '죔줄 연결부 인장강도 시험',
          'D링 인장강도시험',
          '8자링 인장강도 시험',
          '박클 인장강도 시험',
          '훅 인장강도 시험',
          '카라비나 인장강도 시험',
          '훅수직압축 시험',
          '훅 측면압축 시험',
          '충격흡수장치 인장강도 시험',
          '충격흡수장치 신장측정 시험',
          '완성품 동하중성능 시험',
          '충격흡수장치 동하중성능 시험',
          '정하중성능 시험'
        ]
      },
      {
        type: '그네식 U자 걸이용',
        tests: [
          '구조검사',
          '죔줄 인장강도 시험',
          '죔줄 연결부 인장강도 시험',
          'D링 인장강도시험',
          '8자링 인장강도 시험',
          '박클 인장강도 시험',
          '훅 인장강도 시험',
          '카라비나 인장강도 시험',
          '훅수직압축 시험',
          '훅 측면압축 시험',
          '충격흡수장치 인장강도 시험',
          '충격흡수장치 신장측정 시험',
          '죔줄 다리낙하 동하중성능 시험',
          '죔줄 머리낙하 동하중성능 시험',
          '충격흡수장치 동하중성능 시험',
          '정하중성능 시험 (목링)',
          '정하중성능 시험 (가랭이링)',
          '지탱벨트 인장강도 시험',
          '보조죔줄 다리낙하 동하중성능 시험',
          '보조죔줄 머리낙하 동하중성능 시험',
          '벨트 인장강도 시험',
          '보조죔줄 인장강도 시험',
          '각링 인장강도 시험',
          '신축조절기 인장강도 시험'
        ]
      },
      {
        type: '그네식 1개걸이용',
        tests: [
          '구조검사',
          '죔줄 인장강도 시험',
          '죔줄 연결부 인장강도 시험',
          'D링 인장강도시험',
          '8자링 인장강도 시험',
          '박클 인장강도 시험',
          '훅 인장강도 시험',
          '카라비나 인장강도 시험',
          '훅수직압축 시험',
          '훅 측면압축 시험',
          '충격흡수장치 인장강도 시험',
          '충격흡수장치 신장측정 시험',
          '죔줄 다리낙하 동하중성능 시험',
          '죔줄 머리낙하 동하중성능 시험',
          '충격흡수장치 동하중성능 시험',
          '정하중성능 시험 (목링)',
          '정하중성능 시험 (가랭이링)'
        ]
      },
      {
        type: '안전블럭',
        tests: [
          '구조검사',
          '완성품 다리낙하 동하중성능 시험',
          '완성품 머리낙하 동하중성능 시험',
          '정하중성능 시험 (목링)',
          '정하중성능 시험 (가랭이링)',
          'D링 인장강도 시험',
          '박클 인장강도 시험',
          '훅 인장강도 시험',
          '카라비나 인장강도 시험',
          '훅 수직압축 시험',
          '훅 측면압축 시험',
          '안전블럭 동하중성능 시험',
          '안전블럭 와이어 인장강도 시험',
          '안전블럭 몸체 인장강도 시험',
          '안전블럭 수축하중 시험'
        ]
      }
    ],
    order: 6,
    isActive: true
  }
]

async function initTestCategories() {
  console.log('🚀 시험 카테고리 초기화 시작...')
  
  try {
    // 기존 카테고리 삭제
    const existingCategories = await client.fetch('*[_type == "testCategory"]')
    for (const category of existingCategories) {
      await client.delete(category._id)
      console.log(`❌ 기존 카테고리 삭제: ${category.name}`)
    }
    
    // 새 카테고리 생성
    for (const category of initialCategories) {
      const result = await client.create(category)
      console.log(`✅ 카테고리 생성: ${category.name}`)
      
      // 중분류별 시험항목 개수 표시
      for (const subcategory of category.subcategories) {
        console.log(`   - ${subcategory.type}: ${subcategory.tests.length}개 시험항목`)
      }
    }
    
    // 전체 통계
    const totalSubcategories = initialCategories.reduce((sum, cat) => sum + cat.subcategories.length, 0)
    const totalTests = initialCategories.reduce((sum, cat) => 
      sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.tests.length, 0), 0
    )
    
    console.log('\n📊 전체 통계:')
    console.log(`   - 대분류: ${initialCategories.length}개`)
    console.log(`   - 중분류: ${totalSubcategories}개`)
    console.log(`   - 시험항목: ${totalTests}개`)
    
    console.log('\n✨ 시험 카테고리 초기화 완료!')
  } catch (error) {
    console.error('❌ 에러 발생:', error)
  }
}

initTestCategories()
