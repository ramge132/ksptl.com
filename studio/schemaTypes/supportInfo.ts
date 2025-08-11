export default {
  name: 'supportInfo',
  title: '고객지원 정보',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: '페이지 제목',
      type: 'string',
    },
    {
      name: 'pageSubtitle',
      title: '페이지 부제목',
      type: 'string',
    },
    {
      name: 'pageDescription',
      title: '페이지 설명',
      type: 'text',
    },
    // 전화 상담
    {
      name: 'phoneTitle',
      title: '전화 상담 제목',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: '전화번호',
      type: 'string',
    },
    {
      name: 'phoneHours',
      title: '운영 시간',
      type: 'string',
    },
    // 이메일 문의
    {
      name: 'emailTitle',
      title: '이메일 문의 제목',
      type: 'string',
    },
    {
      name: 'emailAddress',
      title: '이메일 주소',
      type: 'string',
    },
    {
      name: 'emailHours',
      title: '접수 시간',
      type: 'string',
    },
    // 온라인 문의
    {
      name: 'onlineTitle',
      title: '온라인 문의 제목',
      type: 'string',
    },
    {
      name: 'onlineDescription',
      title: '온라인 문의 설명',
      type: 'string',
    },
    // FAQ 섹션
    {
      name: 'faqTitle',
      title: 'FAQ 섹션 제목',
      type: 'string',
    },
    {
      name: 'faqSubtitle',
      title: 'FAQ 섹션 부제목',
      type: 'string',
    },
    {
      name: 'faqs',
      title: '자주 묻는 질문',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: '질문',
              type: 'string',
            },
            {
              name: 'answer',
              title: '답변',
              type: 'text',
            },
            {
              name: 'order',
              title: '순서',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
