import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: '자료실',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '자료 제목',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          {title: '신청서 양식', value: 'forms'},
          {title: '시험 규격', value: 'standards'},
          {title: '가이드라인', value: 'guidelines'},
          {title: '브로슈어', value: 'brochures'},
          {title: '기술 자료', value: 'technical'},
          {title: '법령/규정', value: 'regulations'},
        ]
      }
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: '파일',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.hwp'
      }
    }),
    defineField({
      name: 'fileSize',
      title: '파일 크기',
      type: 'string',
    }),
    defineField({
      name: 'downloadCount',
      title: '다운로드 수',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'publishedDate',
      title: '게시일',
      type: 'date',
    }),
    defineField({
      name: 'isPublic',
      title: '공개 여부',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      initialValue: 0
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
