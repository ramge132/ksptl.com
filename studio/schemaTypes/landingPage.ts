import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: '랜딩페이지',
  type: 'document',
  fields: [
    // Hero 섹션
    defineField({
      name: 'heroTitleLine1',
      title: 'Hero 타이틀 첫째줄',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleLine2',
      title: 'Hero 타이틀 둘째줄',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero 서브타이틀',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero 설명',
      type: 'string',
    }),
    defineField({
      name: 'heroFeature1',
      title: 'Hero 특징 1',
      type: 'string',
    }),
    defineField({
      name: 'heroFeature2',
      title: 'Hero 특징 2',
      type: 'string',
    }),
    defineField({
      name: 'heroFeature3',
      title: 'Hero 특징 3',
      type: 'string',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero 버튼 텍스트',
      type: 'string',
    }),
    defineField({
      name: 'heroStat1Value',
      title: 'Hero 통계 1 값',
      type: 'string',
    }),
    defineField({
      name: 'heroStat1Label',
      title: 'Hero 통계 1 라벨',
      type: 'string',
    }),
    defineField({
      name: 'heroStat2Value',
      title: 'Hero 통계 2 값',
      type: 'string',
    }),
    defineField({
      name: 'heroStat2Label',
      title: 'Hero 통계 2 라벨',
      type: 'string',
    }),
    defineField({
      name: 'heroStat3Value',
      title: 'Hero 통계 3 값',
      type: 'string',
    }),
    defineField({
      name: 'heroStat3Label',
      title: 'Hero 통계 3 라벨',
      type: 'string',
    }),
    defineField({
      name: 'heroStat4Value',
      title: 'Hero 통계 4 값',
      type: 'string',
    }),
    defineField({
      name: 'heroStat4Label',
      title: 'Hero 통계 4 라벨',
      type: 'string',
    }),
    
    // WhyChooseUs 섹션
    defineField({
      name: 'whyTitle1',
      title: '왜 선택 타이틀 1 (왜)',
      type: 'string',
    }),
    defineField({
      name: 'whyTitle2',
      title: '왜 선택 타이틀 2 (한국안전용품시험연구원)',
      type: 'string',
    }),
    defineField({
      name: 'whyTitle3',
      title: '왜 선택 타이틀 3 (을)',
      type: 'string',
    }),
    defineField({
      name: 'whyTitle4',
      title: '왜 선택 타이틀 4 (선택해야 할까요?)',
      type: 'string',
    }),
    defineField({
      name: 'whyBottomText1',
      title: '왜 선택 하단 텍스트 1',
      type: 'string',
    }),
    defineField({
      name: 'whyBottomText2',
      title: '왜 선택 하단 텍스트 2',
      type: 'string',
    }),
    
    // WhyChooseUs 카드 1
    defineField({
      name: 'whyCard1Highlight',
      title: '카드 1 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard1Title',
      title: '카드 1 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard1Description',
      title: '카드 1 설명',
      type: 'text',
    }),
    
    // WhyChooseUs 카드 2
    defineField({
      name: 'whyCard2Highlight',
      title: '카드 2 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard2Title',
      title: '카드 2 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard2Description',
      title: '카드 2 설명',
      type: 'text',
    }),
    
    // WhyChooseUs 카드 3
    defineField({
      name: 'whyCard3Highlight',
      title: '카드 3 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard3Title',
      title: '카드 3 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard3Description',
      title: '카드 3 설명',
      type: 'text',
    }),
    
    // WhyChooseUs 카드 4
    defineField({
      name: 'whyCard4Highlight',
      title: '카드 4 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard4Title',
      title: '카드 4 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard4Description',
      title: '카드 4 설명',
      type: 'text',
    }),
    
    // WhyChooseUs 카드 5
    defineField({
      name: 'whyCard5Highlight',
      title: '카드 5 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard5Title',
      title: '카드 5 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard5Description',
      title: '카드 5 설명',
      type: 'text',
    }),
    
    // WhyChooseUs 카드 6
    defineField({
      name: 'whyCard6Highlight',
      title: '카드 6 하이라이트',
      type: 'string',
    }),
    defineField({
      name: 'whyCard6Title',
      title: '카드 6 제목',
      type: 'string',
    }),
    defineField({
      name: 'whyCard6Description',
      title: '카드 6 설명',
      type: 'text',
    }),
    
    // Services 섹션
    defineField({
      name: 'servicesTitle1',
      title: '서비스 섹션 타이틀 1 (시험·교정)',
      type: 'string',
    }),
    defineField({
      name: 'servicesTitle2',
      title: '서비스 섹션 타이틀 2 (서비스)',
      type: 'string',
    }),
    defineField({
      name: 'servicesDescription1',
      title: '서비스 섹션 설명 1',
      type: 'string',
    }),
    defineField({
      name: 'servicesDescription2',
      title: '서비스 섹션 설명 2',
      type: 'string',
    }),
    defineField({
      name: 'servicesButtonText',
      title: '서비스 버튼 텍스트',
      type: 'string',
    }),
    
    // 서비스 카드 1 - 마스크
    defineField({
      name: 'service1Title',
      title: '서비스 1 제목',
      type: 'string',
    }),
    defineField({
      name: 'service1Description',
      title: '서비스 1 설명',
      type: 'string',
    }),
    defineField({
      name: 'service1Item1',
      title: '서비스 1 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service1Item2',
      title: '서비스 1 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service1Item3',
      title: '서비스 1 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service1Count',
      title: '서비스 1 추가 개수',
      type: 'number',
    }),
    
    // 서비스 카드 2 - 안전화
    defineField({
      name: 'service2Title',
      title: '서비스 2 제목',
      type: 'string',
    }),
    defineField({
      name: 'service2Description',
      title: '서비스 2 설명',
      type: 'string',
    }),
    defineField({
      name: 'service2Item1',
      title: '서비스 2 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service2Item2',
      title: '서비스 2 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service2Item3',
      title: '서비스 2 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service2Count',
      title: '서비스 2 추가 개수',
      type: 'number',
    }),
    
    // 서비스 카드 3 - 보호복
    defineField({
      name: 'service3Title',
      title: '서비스 3 제목',
      type: 'string',
    }),
    defineField({
      name: 'service3Description',
      title: '서비스 3 설명',
      type: 'string',
    }),
    defineField({
      name: 'service3Item1',
      title: '서비스 3 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service3Item2',
      title: '서비스 3 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service3Item3',
      title: '서비스 3 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service3Count',
      title: '서비스 3 추가 개수',
      type: 'number',
    }),
    
    // 서비스 카드 4 - 추락방지대
    defineField({
      name: 'service4Title',
      title: '서비스 4 제목',
      type: 'string',
    }),
    defineField({
      name: 'service4Description',
      title: '서비스 4 설명',
      type: 'string',
    }),
    defineField({
      name: 'service4Item1',
      title: '서비스 4 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service4Item2',
      title: '서비스 4 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service4Item3',
      title: '서비스 4 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service4Count',
      title: '서비스 4 추가 개수',
      type: 'number',
    }),
    
    // 서비스 카드 5 - 안전모
    defineField({
      name: 'service5Title',
      title: '서비스 5 제목',
      type: 'string',
    }),
    defineField({
      name: 'service5Description',
      title: '서비스 5 설명',
      type: 'string',
    }),
    defineField({
      name: 'service5Item1',
      title: '서비스 5 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service5Item2',
      title: '서비스 5 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service5Item3',
      title: '서비스 5 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service5Count',
      title: '서비스 5 추가 개수',
      type: 'number',
    }),
    
    // 서비스 카드 6 - 안전대/안전장갑
    defineField({
      name: 'service6Title',
      title: '서비스 6 제목',
      type: 'string',
    }),
    defineField({
      name: 'service6Description',
      title: '서비스 6 설명',
      type: 'string',
    }),
    defineField({
      name: 'service6Item1',
      title: '서비스 6 항목 1',
      type: 'string',
    }),
    defineField({
      name: 'service6Item2',
      title: '서비스 6 항목 2',
      type: 'string',
    }),
    defineField({
      name: 'service6Item3',
      title: '서비스 6 항목 3',
      type: 'string',
    }),
    defineField({
      name: 'service6Count',
      title: '서비스 6 추가 개수',
      type: 'number',
    }),
    
    // 인증서 및 특허 섹션
    defineField({
      name: 'certificatesTitle1',
      title: '인증서 섹션 제목 1',
      type: 'string',
    }),
    defineField({
      name: 'certificatesTitle2',
      title: '인증서 섹션 제목 2 (강조)',
      type: 'string',
    }),
    defineField({
      name: 'certificatesDescription',
      title: '인증서 섹션 설명',
      type: 'string',
    }),
    
    // 연혁 섹션
    defineField({
      name: 'timelineTitle1',
      title: '연혁 섹션 제목 1',
      type: 'string',
    }),
    defineField({
      name: 'timelineTitle2',
      title: '연혁 섹션 제목 2',
      type: 'string',
    }),
    defineField({
      name: 'timelineDescription',
      title: '연혁 섹션 설명',
      type: 'string',
    }),
    
    // 오시는길 섹션
    defineField({
      name: 'locationTitle1',
      title: '오시는길 섹션 제목 1',
      type: 'string',
    }),
    defineField({
      name: 'locationTitle2',
      title: '오시는길 섹션 제목 2',
      type: 'string',
    }),
    defineField({
      name: 'locationDescription',
      title: '오시는길 섹션 설명',
      type: 'string',
    }),
    defineField({
      name: 'mainOfficeAddress',
      title: '본사 주소',
      type: 'string',
    }),
    defineField({
      name: 'mainOfficeTel',
      title: '본사 전화번호',
      type: 'string',
    }),
    defineField({
      name: 'testLabAddress',
      title: '시험소 주소',
      type: 'string',
    }),
    defineField({
      name: 'testLabTel',
      title: '시험소 전화번호',
      type: 'string',
    }),
    defineField({
      name: 'operatingHours1',
      title: '운영시간 1 (평일)',
      type: 'string',
    }),
    defineField({
      name: 'operatingHours2',
      title: '운영시간 2 (토요일)',
      type: 'string',
    }),
    defineField({
      name: 'operatingHours3',
      title: '운영시간 3 (일요일/공휴일)',
      type: 'string',
    }),
    
    // 문의하기 섹션
    defineField({
      name: 'contactTitle1',
      title: '문의하기 섹션 제목 1',
      type: 'string',
    }),
    defineField({
      name: 'contactTitle2',
      title: '문의하기 섹션 제목 2',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: '문의하기 섹션 설명',
      type: 'string',
    }),
    defineField({
      name: 'contactPhoneTitle',
      title: '전화 문의 제목',
      type: 'string',
    }),
    defineField({
      name: 'contactPhoneNumber',
      title: '전화번호',
      type: 'string',
    }),
    defineField({
      name: 'contactPhoneHours',
      title: '전화 운영시간',
      type: 'string',
    }),
    defineField({
      name: 'contactEmailTitle',
      title: '이메일 제목',
      type: 'string',
    }),
    defineField({
      name: 'contactEmailAddress',
      title: '이메일 주소',
      type: 'string',
    }),
    defineField({
      name: 'contactEmailDescription',
      title: '이메일 설명',
      type: 'string',
    }),
    defineField({
      name: 'contactTimeTitle',
      title: '처리시간 제목',
      type: 'string',
    }),
    defineField({
      name: 'contactTimeValue',
      title: '처리시간 값',
      type: 'string',
    }),
    defineField({
      name: 'contactTimeDescription',
      title: '처리시간 설명',
      type: 'string',
    }),
    defineField({
      name: 'contactFormCompanyLabel',
      title: '업체명 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormCompanyPlaceholder',
      title: '업체명 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormNameLabel',
      title: '담당자명 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormNamePlaceholder',
      title: '담당자명 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormPhoneLabel',
      title: '연락처 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormPhonePlaceholder',
      title: '연락처 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormEmailLabel',
      title: '이메일 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormEmailPlaceholder',
      title: '이메일 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormTypeLabel',
      title: '문의유형 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormTypePlaceholder',
      title: '문의유형 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormMessageLabel',
      title: '문의내용 라벨',
      type: 'string',
    }),
    defineField({
      name: 'contactFormMessagePlaceholder',
      title: '문의내용 플레이스홀더',
      type: 'string',
    }),
    defineField({
      name: 'contactFormNotice1',
      title: '안내문구 1',
      type: 'string',
    }),
    defineField({
      name: 'contactFormNotice2',
      title: '안내문구 2',
      type: 'string',
    }),
    defineField({
      name: 'contactButtonText',
      title: '문의 버튼 텍스트',
      type: 'string',
    }),
  ],
})
