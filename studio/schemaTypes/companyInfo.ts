import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: '회사 정보',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: '메인 타이틀',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: '서브 타이틀',
      type: 'string',
    }),
    defineField({
      name: 'whyChooseUsContent',
      title: '왜 우리를 선택해야 하는가',
      type: 'text',
    }),
    defineField({
      name: 'timelineContent',
      title: '회사 연혁',
      type: 'text',
    }),
    defineField({
      name: 'aboutUs',
      title: '회사 소개',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroSubtitle',
    },
  },
})
