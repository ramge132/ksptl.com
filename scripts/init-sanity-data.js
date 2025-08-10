// Sanity 초기 데이터 설정 스크립트
const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// 시험 항목 초기 데이터
const testItems = [
  // 마스크
  { category: 'mask', name: '방진마스크', description: 'KS M 6673 규격 시험', standards: ['KS M 6673'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 1, isActive: true },
  { category: 'mask', name: '방독마스크', description: 'KS M 6674 규격 시험', standards: ['KS M 6674'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 2, isActive: true },
  { category: 'mask', name: '송기마스크', description: 'KS M 6675 규격 시험', standards: ['KS M 6675'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 3, isActive: true },
  
  // 안전화
  { category: 'shoes', name: '가죽제 안전화', description: 'KS M 6681 규격 시험', standards: ['KS M 6681'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 4, isActive: true },
  { category: 'shoes', name: '고무제 안전화', description: 'KS M 6682 규격 시험', standards: ['KS M 6682'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 5, isActive: true },
  { category: 'shoes', name: '정전기안전화 (가죽제)', description: '정전기 방지 안전화 시험', standards: ['KS M 6681'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 6, isActive: true },
  { category: 'shoes', name: '정전기안전화 (고무제)', description: '정전기 방지 안전화 시험', standards: ['KS M 6682'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 7, isActive: true },
  { category: 'shoes', name: '발등안전화', description: '발등 보호 안전화 시험', standards: ['KS M 6681'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 8, isActive: true },
  { category: 'shoes', name: '절연화 (가죽제)', description: '전기 절연 안전화 시험', standards: ['KS M 6681'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 9, isActive: true },
  { category: 'shoes', name: '절연화 (고무제)', description: '전기 절연 안전화 시험', standards: ['KS M 6682'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 10, isActive: true },
  { category: 'shoes', name: '절연장화', description: '전기 절연 장화 시험', standards: ['KS M 6682'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 11, isActive: true },
  
  // 보호복
  { category: 'clothing', name: '방열복', description: '열 방호 보호복 시험', standards: ['KS K ISO 11612'], testPeriod: '7-10일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 12, isActive: true },
  { category: 'clothing', name: '화학물질용 보호복', description: '화학물질 방호 보호복 시험', standards: ['KS K ISO 16602'], testPeriod: '7-10일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 13, isActive: true },
  
  // 추락방지대
  { category: 'fall-protection', name: '추락방지대', description: '추락 방지 장비 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 14, isActive: true },
  
  // 안전모
  { category: 'helmet', name: 'AB형 안전모', description: '충격 흡수 안전모 시험', standards: ['KS M 6751'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 15, isActive: true },
  { category: 'helmet', name: 'AE형 안전모', description: '전기용 안전모 시험', standards: ['KS M 6751'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 16, isActive: true },
  { category: 'helmet', name: 'ABE형 안전모', description: '충격흡수 및 전기용 안전모 시험', standards: ['KS M 6751'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 17, isActive: true },
  
  // 안전장갑
  { category: 'gloves', name: '내전압용 안전장갑', description: '전기 절연 장갑 시험', standards: ['KS M 6641'], testPeriod: '3-5일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 18, isActive: true },
  
  // 안전대
  { category: 'safety-belt', name: '벨트식 U자 걸이용', description: '안전대 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 19, isActive: true },
  { category: 'safety-belt', name: '벨트식 1개 걸이용', description: '안전대 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 20, isActive: true },
  { category: 'safety-belt', name: '그네식 U자 걸이용', description: '안전대 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 21, isActive: true },
  { category: 'safety-belt', name: '그네식 1개 걸이용', description: '안전대 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 22, isActive: true },
  { category: 'safety-belt', name: '안전블럭', description: '추락방지 안전블럭 시험', standards: ['KS M 6762'], testPeriod: '5-7일', price: '견적 문의', requiredDocuments: ['시험신청서', '제품 샘플'], order: 23, isActive: true },
]

// 수상 및 인증 초기 데이터
const awards = [
  { title: '방송통신기자재등의 적합등록 필증(KC인증)', description: '5031-FC65-40CE-227C', order: 1 },
  { title: 'KOLAS 공인교정기관 인정서', description: 'KC23-420', order: 2 },
  { title: 'KS 제품인증서 - 인장시험기', description: 'KS B 5521', order: 3 },
  { title: 'KS 제품인증서 - 압축시험기', description: 'KS B 5533', order: 4 },
  { title: 'KS 제품인증서 - 만능재료시험기', description: 'KS B 5541', order: 5 },
  { title: '품질경영시스템인증서', description: 'ISO 9001:2015', order: 6 },
  { title: '특허증 - 안전모 충격 시험기', description: '특허 제 10-0986289호', order: 7 },
  { title: '특허증 - 아스콘 연소 시험기', description: '특허 제10-1238775호', order: 8 },
  { title: '특허증 - 신발 미끄럼 측정장치', description: '특허 제10-1251452호', order: 9 },
  { title: '특허증 - 커피콩 혼합장치', description: '특허 제10-1256549호', order: 10 },
  { title: '특허증 - 안전화 충격 시험장치', description: '특허 제 10-1510675호', order: 11 },
  { title: '특허증 - 안전모 충격 시험기(중국)', description: '중국 특허제 141001호', order: 12 },
  { title: '특허증 - 검전기(활선 접근 경보기)', description: '등록번호: 제 10-2002491호', order: 13 },
  { title: '디자인등록증 - 만능재료시험기', description: '등록번호: 제 30-0775782호', order: 14 },
  { title: '디자인등록증 - 검전기', description: '등록번호: 제 30-0969154호', order: 15 },
  { title: '연구개발전담부서 인정서', description: '연구개발전담부서 인정', order: 16 },
]

// 자료실 초기 데이터
const resources = [
  { title: '교정신청서', category: 'forms', description: '교정 서비스 신청서 양식', fileSize: '100KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 1 },
  { title: '시험신청서', category: 'forms', description: '시험 서비스 신청서 양식', fileSize: '120KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 2 },
  { title: '안전화 시험 규격 안내', category: 'standards', description: 'KS M 6681/6682 규격 설명', fileSize: '500KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 3 },
  { title: '안전모 시험 규격 안내', category: 'standards', description: 'KS M 6751 규격 설명', fileSize: '450KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 4 },
  { title: '시험 절차 가이드', category: 'guidelines', description: '시험 진행 절차 안내', fileSize: '300KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 5 },
  { title: '교정 절차 가이드', category: 'guidelines', description: '교정 진행 절차 안내', fileSize: '280KB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 6 },
  { title: '회사 소개 브로슈어', category: 'brochures', description: '(주)큐로 회사 소개 자료', fileSize: '2MB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 7 },
  { title: '시험기 제품 카탈로그', category: 'brochures', description: '시험기 제품 소개 자료', fileSize: '5MB', downloadCount: 0, publishedDate: new Date().toISOString(), isPublic: true, order: 8 },
]

async function initData() {
  try {
    console.log('Sanity 초기 데이터 설정 시작...')

    // 시험 항목 추가
    console.log('\n시험 항목 추가 중...')
    for (const item of testItems) {
      try {
        await client.create({
          _type: 'testItem',
          ...item
        })
        console.log(`✓ ${item.name} 추가 완료`)
      } catch (error) {
        console.log(`- ${item.name} 이미 존재하거나 오류 발생`)
      }
    }

    // 수상 및 인증 추가
    console.log('\n수상 및 인증 추가 중...')
    for (const award of awards) {
      try {
        await client.create({
          _type: 'award',
          ...award
        })
        console.log(`✓ ${award.title} 추가 완료`)
      } catch (error) {
        console.log(`- ${award.title} 이미 존재하거나 오류 발생`)
      }
    }

    // 자료실 추가
    console.log('\n자료실 추가 중...')
    for (const resource of resources) {
      try {
        await client.create({
          _type: 'resource',
          ...resource
        })
        console.log(`✓ ${resource.title} 추가 완료`)
      } catch (error) {
        console.log(`- ${resource.title} 이미 존재하거나 오류 발생`)
      }
    }

    console.log('\n✅ 초기 데이터 설정 완료!')
  } catch (error) {
    console.error('오류 발생:', error)
  }
}

initData()
