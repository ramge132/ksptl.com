import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testItem',
  title: '시험항목',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          {title: '마스크', value: 'mask'},
          {title: '안전화', value: 'shoes'},
          {title: '보호복', value: 'clothing'},
          {title: '추락방지대', value: 'fallProtection'},
          {title: '안전모', value: 'helmet'},
          {title: '안전장갑', value: 'gloves'},
          {title: '안전대', value: 'safetyBelt'},
        ]
      }
    }),
    defineField({
      name: 'name',
      title: '시험항목명',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }),
    defineField({
      name: 'standards',
      title: '적용 규격',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'testPeriod',
      title: '시험 기간',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: '시험 비용',
      type: 'string',
    }),
    defineField({
      name: 'requiredDocuments',
      title: '필요 서류',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'isActive',
      title: '활성화',
      type: 'boolean',
      initialValue: true
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
})
