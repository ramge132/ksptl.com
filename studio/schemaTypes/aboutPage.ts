import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: '기관소개',
  type: 'document',
  fields: [
    // Hero 섹션
    defineField({
      name: 'heroSince',
      title: 'Since 연도',
      type: 'string',
      description: '예: Since 1994',
    }),
    defineField({
      name: 'heroTitle',
      title: '메인 제목',
      type: 'string',
      description: '예: 한국안전용품시험연구원',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '부제목',
      type: 'string',
      description: '예: 국내 유일 시험기 제작·시험·교정 통합 수행기관',
    }),
    
    // 소개 섹션
    defineField({
      name: 'introTitle1',
      title: '소개 제목 첫 번째 줄',
      type: 'string',
      description: '예: 시험기 제작부터 시험·교정까지',
    }),
    defineField({
      name: 'introTitle2',
      title: '소개 제목 두 번째 줄 (강조)',
      type: 'string',
      description: '예: 원스톱 토탈 솔루션',
    }),
    defineField({
      name: 'introParagraph1',
      title: '소개 문단 1',
      type: 'text',
      description: '회사 소개 첫 번째 문단',
    }),
    defineField({
      name: 'introParagraph2',
      title: '소개 문단 2',
      type: 'text',
      description: '회사 소개 두 번째 문단',
    }),
    defineField({
      name: 'introParagraph3',
      title: '소개 문단 3',
      type: 'text',
      description: '회사 소개 세 번째 문단',
    }),
    defineField({
      name: 'companyImage',
      title: '대표 사진',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'badgeYears',
      title: '연혁 연수',
      type: 'string',
      description: '예: 20년 전통',
    }),
    defineField({
      name: 'badgeText',
      title: '연혁 텍스트',
      type: 'string',
      description: '예: 신뢰의 파트너',
    }),
    
    // 핵심 가치 섹션
    defineField({
      name: 'valuesTitle',
      title: '핵심 가치 제목',
      type: 'string',
      description: '예: 핵심 가치',
    }),
    defineField({
      name: 'valuesSubtitle',
      title: '핵심 가치 부제목',
      type: 'string',
      description: '예: 고객과 함께 성장하는 기업',
    }),
    defineField({
      name: 'value1Title',
      title: '가치 1 제목',
      type: 'string',
      description: '예: 신뢰성',
    }),
    defineField({
      name: 'value1Description',
      title: '가치 1 설명',
      type: 'text',
      description: '예: KOLAS 공인 기관으로서 정확하고 신뢰할 수 있는 서비스 제공',
    }),
    defineField({
      name: 'value2Title',
      title: '가치 2 제목',
      type: 'string',
      description: '예: 전문성',
    }),
    defineField({
      name: 'value2Description',
      title: '가치 2 설명',
      type: 'text',
      description: '예: 20년간 축적된 기술력과 노하우로 최고의 품질 보장',
    }),
    defineField({
      name: 'value3Title',
      title: '가치 3 제목',
      type: 'string',
      description: '예: 고객중심',
    }),
    defineField({
      name: 'value3Description',
      title: '가치 3 설명',
      type: 'text',
      description: '예: 고객의 성공을 위한 맞춤형 솔루션 제공',
    }),
    
    // 사업 분야 섹션
    defineField({
      name: 'businessTitle',
      title: '사업 분야 제목',
      type: 'string',
      description: '예: 사업 분야',
    }),
    defineField({
      name: 'businessSubtitle',
      title: '사업 분야 부제목',
      type: 'string',
      description: '예: 시험기 제작부터 시험·교정까지 토탈 서비스',
    }),
    
    // 사업 분야 1
    defineField({
      name: 'business1Title',
      title: '사업 분야 1 제목',
      type: 'string',
      description: '예: 시험기 제작',
    }),
    defineField({
      name: 'business1Description',
      title: '사업 분야 1 설명',
      type: 'string',
      description: '예: 전 분야 시험기 주문 제작',
    }),
    defineField({
      name: 'business1Item1',
      title: '사업 분야 1 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'business1Item2',
      title: '사업 분야 1 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'business1Item3',
      title: '사업 분야 1 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'business1Item4',
      title: '사업 분야 1 항목 4',
      type: 'string',
    }),
    
    // 사업 분야 2
    defineField({
      name: 'business2Title',
      title: '사업 분야 2 제목',
      type: 'string',
      description: '예: 활선접근경보기',
    }),
    defineField({
      name: 'business2Description',
      title: '사업 분야 2 설명',
      type: 'string',
      description: '예: 전압 노출시 사용자를 감전으로부터 보호',
    }),
    defineField({
      name: 'business2Item1',
      title: '사업 분야 2 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'business2Item2',
      title: '사업 분야 2 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'business2Item3',
      title: '사업 분야 2 항목 3',
      type: 'string',
    }),
    
    // 사업 분야 3
    defineField({
      name: 'business3Title',
      title: '사업 분야 3 제목',
      type: 'string',
      description: '예: 교정검사',
    }),
    defineField({
      name: 'business3Description',
      title: '사업 분야 3 설명',
      type: 'string',
      description: '예: KOLAS 공인교정기관 / 교정성적서 발급',
    }),
    defineField({
      name: 'business3Item1',
      title: '사업 분야 3 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'business3Item2',
      title: '사업 분야 3 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'business3Item3',
      title: '사업 분야 3 항목 3',
      type: 'string',
    }),
    
    // 사업 분야 4
    defineField({
      name: 'business4Title',
      title: '사업 분야 4 제목',
      type: 'string',
      description: '예: 시험',
    }),
    defineField({
      name: 'business4Description',
      title: '사업 분야 4 설명',
      type: 'string',
      description: '예: KOLAS 공인시험기관 / 시험성적서 발급',
    }),
    defineField({
      name: 'business4Item1',
      title: '사업 분야 4 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'business4Item2',
      title: '사업 분야 4 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'business4Item3',
      title: '사업 분야 4 항목 3',
      type: 'string',
    }),
    
    // 시험 절차 섹션
    defineField({
      name: 'processTitle',
      title: '시험 절차 제목',
      type: 'string',
      description: '예: 시험 절차',
    }),
    defineField({
      name: 'processSubtitle',
      title: '시험 절차 부제목',
      type: 'string',
      description: '예: 간단하고 빠른 프로세스',
    }),
    defineField({
      name: 'processStep1',
      title: '절차 1',
      type: 'string',
      description: '예: 접수',
    }),
    defineField({
      name: 'processStep2',
      title: '절차 2',
      type: 'string',
      description: '예: 시험·교정',
    }),
    defineField({
      name: 'processStep3',
      title: '절차 3',
      type: 'string',
      description: '예: 성적서 발급',
    }),
    defineField({
      name: 'processStep4',
      title: '절차 4',
      type: 'string',
      description: '예: 납품',
    }),
  ],
})
