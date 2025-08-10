import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testCategory',
  title: '시험 카테고리',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: '카테고리 키',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '예: mask, shoes, clothing 등'
    }),
    defineField({
      name: 'name',
      title: '카테고리명',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '예: 마스크, 안전화, 보호복 등'
    }),
    defineField({
      name: 'icon',
      title: '아이콘',
      type: 'string',
      options: {
        list: [
          {title: 'Shield', value: 'shield'},
          {title: 'HardHat', value: 'hardhat'},
          {title: 'Footprints', value: 'footprints'},
          {title: 'Shirt', value: 'shirt'},
          {title: 'AlertTriangle', value: 'alerttriangle'},
          {title: 'Wrench', value: 'wrench'},
          {title: 'Hand', value: 'hand'},
        ]
      }
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
    }),
    defineField({
      name: 'subcategories',
      title: '중분류',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'type',
            title: '중분류명',
            type: 'string',
            validation: Rule => Rule.required(),
            description: '예: 방진마스크, 방독마스크 등'
          },
          {
            name: 'tests',
            title: '시험항목',
            type: 'array',
            of: [{type: 'string'}],
            description: '각 시험항목을 입력하세요'
          }
        ]
      }]
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
      subtitle: 'key',
    },
  },
})
