import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'timeline',
  title: '연혁',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: '연도',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: '아이콘',
      type: 'string',
      options: {
        list: [
          {title: '건물', value: 'Building'},
          {title: '수상', value: 'Award'},
          {title: '별', value: 'Star'},
          {title: '로켓', value: 'Rocket'},
          {title: '타겟', value: 'Target'},
          {title: '달력', value: 'Calendar'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: '순서',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title',
    },
  },
})
