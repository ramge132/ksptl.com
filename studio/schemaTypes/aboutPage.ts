import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: '기관소개',
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
    
    // 회사 소개
    defineField({
      name: 'companyName',
      title: '회사명',
      type: 'string',
    }),
    defineField({
      name: 'companyDescription',
      title: '회사 소개',
      type: 'text',
    }),
    defineField({
      name: 'companyImage',
      title: '회사 대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // 비전과 미션
    defineField({
      name: 'visionTitle',
      title: '비전 제목',
      type: 'string',
    }),
    defineField({
      name: 'visionContent',
      title: '비전 내용',
      type: 'text',
    }),
    defineField({
      name: 'missionTitle',
      title: '미션 제목',
      type: 'string',
    }),
    defineField({
      name: 'missionContent',
      title: '미션 내용',
      type: 'text',
    }),
    
    // 사업 분야
    defineField({
      name: 'businessTitle',
      title: '사업 분야 제목',
      type: 'string',
    }),
    defineField({
      name: 'businessAreas',
      title: '사업 분야 목록',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: '분야명'},
          {name: 'description', type: 'text', title: '설명'},
          {name: 'image', type: 'image', title: '이미지', options: {hotspot: true}}
        ]
      }]
    }),
    
    // 인증 및 자격
    defineField({
      name: 'certificationsTitle',
      title: '인증 섹션 제목',
      type: 'string',
    }),
    defineField({
      name: 'certifications',
      title: '인증 목록',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: '인증명'},
          {name: 'number', type: 'string', title: '인증번호'},
          {name: 'issuer', type: 'string', title: '발급기관'},
          {name: 'date', type: 'date', title: '취득일자'},
          {name: 'image', type: 'image', title: '인증서 이미지'}
        ]
      }]
    }),
    
    // 주소 및 연락처
    defineField({
      name: 'headquarters',
      title: '본사 정보',
      type: 'object',
      fields: [
        {name: 'address', type: 'string', title: '주소'},
        {name: 'phone', type: 'string', title: '전화번호'},
        {name: 'fax', type: 'string', title: '팩스번호'}
      ]
    }),
    defineField({
      name: 'testLab',
      title: '시험소 정보',
      type: 'object',
      fields: [
        {name: 'address', type: 'string', title: '주소'},
        {name: 'phone', type: 'string', title: '전화번호'},
        {name: 'fax', type: 'string', title: '팩스번호'}
      ]
    }),
  ],
})
