import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: '랜딩페이지',
  type: 'document',
  fields: [
    // Hero 섹션
    defineField({
      name: 'heroTitle',
      title: '메인 타이틀',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: '서브 타이틀',
      type: 'string',
    }),
    defineField({
      name: 'heroButtonText',
      title: '시험 신청 버튼 텍스트',
      type: 'string',
    }),
    
    // 소개 섹션
    defineField({
      name: 'introTitle',
      title: '소개 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'introDescription',
      title: '소개 설명',
      type: 'text',
    }),
    
    // 왜 우리를 선택해야 하는가
    defineField({
      name: 'whyChooseTitle',
      title: '왜 우리를 선택해야 하는가 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyChooseItems',
      title: '선택 이유 항목들',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: '제목'},
          {name: 'description', type: 'text', title: '설명'},
          {name: 'icon', type: 'string', title: '아이콘'}
        ]
      }]
    }),
    
    // 회사 연혁
    defineField({
      name: 'timelineTitle',
      title: '연혁 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'timelineItems',
      title: '연혁 항목들',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'year', type: 'string', title: '연도'},
          {name: 'title', type: 'string', title: '제목'},
          {name: 'description', type: 'text', title: '설명'}
        ]
      }]
    }),
    
    // 문의 섹션
    defineField({
      name: 'contactTitle',
      title: '문의 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: '문의 설명',
      type: 'text',
    }),
    defineField({
      name: 'contactPhone',
      title: '대표 전화번호',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: '대표 이메일',
      type: 'string',
    }),
  ],
})
