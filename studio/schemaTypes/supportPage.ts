import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'supportPage',
  title: '고객지원',
  type: 'document',
  fields: [
    // 페이지 헤더
    defineField({
      name: 'pageTitle',
      title: '페이지 제목',
      type: 'string',
    }),
    defineField({
      name: 'pageSubtitle',
      title: '페이지 부제목',
      type: 'string',
    }),
    
    // FAQ 섹션
    defineField({
      name: 'faqTitle',
      title: 'FAQ 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ 목록',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: '질문'},
          {name: 'answer', type: 'text', title: '답변'},
          {name: 'category', type: 'string', title: '카테고리'}
        ]
      }]
    }),
    
    // 문의하기 섹션
    defineField({
      name: 'contactTitle',
      title: '문의하기 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: '문의하기 설명',
      type: 'text',
    }),
    defineField({
      name: 'contactMethods',
      title: '문의 방법',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'method', type: 'string', title: '방법 (전화, 이메일 등)'},
          {name: 'value', type: 'string', title: '연락처'},
          {name: 'description', type: 'string', title: '설명'},
          {name: 'availableTime', type: 'string', title: '이용 가능 시간'}
        ]
      }]
    }),
    
    // 공지사항
    defineField({
      name: 'noticeTitle',
      title: '공지사항 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'notices',
      title: '공지사항 목록',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: '제목'},
          {name: 'content', type: 'text', title: '내용'},
          {name: 'date', type: 'date', title: '작성일'},
          {name: 'isImportant', type: 'boolean', title: '중요 공지'}
        ]
      }]
    }),
    
    // 다운로드 섹션
    defineField({
      name: 'downloadTitle',
      title: '다운로드 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'downloadDescription',
      title: '다운로드 섹션 설명',
      type: 'text',
    }),
  ],
})
