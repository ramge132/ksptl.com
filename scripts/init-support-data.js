const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'zgx15c3u',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skuDgh4SY348FEH8Ykf0TAbcLFLyRlZ1kGpXfDtGJoPy8Y5erhAUQnxqmXfi0cPzVNeR2snGcrkDQ3LyIYVcQ2Su0g1duq313Up6MtPkdBfRWmSkwKo9fyotCwWEzoYBrgSmGoHMGOXBaFhZGLuCwuIWSHWVsJoEkLHnTIhLhZN8R7M1OasD',
})

async function initSupportInfo() {
  try {
    // 기존 데이터 확인
    const existing = await client.fetch(`*[_type == "supportInfo"][0]`)
    
    const supportData = {
      _id: 'supportInfo-singleton',
      _type: 'supportInfo',
      pageTitle: '고객지원',
      pageSubtitle: '고객지원 센터',
      pageDescription: '궁금하신 사항을 빠르고 정확하게 안내해드립니다',
      phoneTitle: '전화 상담',
      phoneNumber: '031-862-8556~7',
      phoneHours: '평일 09:00 - 18:00',
      emailTitle: '이메일 문의',
      emailAddress: 'yukwho@hanmail.net',
      emailHours: '24시간 접수 가능',
      onlineTitle: '온라인 문의',
      onlineDescription: '견적 및 기술 상담',
      faqTitle: '자주 묻는 질문',
      faqSubtitle: '고객님들이 자주 문의하시는 내용을 정리했습니다',
      faqs: [
        {
          question: '교정 주기는 어떻게 되나요?',
          answer: '국가에서 정한 교정주기와 자체설정주기 중 선택하실 수 있습니다. 일반적으로 1년 주기를 권장드립니다.',
          order: 1
        },
        {
          question: '시험 성적서 발급까지 얼마나 걸리나요?',
          answer: '시험 항목에 따라 다르지만, 일반적으로 접수 후 7-10일 이내에 발급됩니다. 긴급한 경우 별도 문의 부탁드립니다.',
          order: 2
        },
        {
          question: '출장 교정이 가능한가요?',
          answer: '네, 출장 교정이 가능합니다. 장비의 특성상 이동이 어려운 경우 현장 교정 서비스를 제공하고 있습니다.',
          order: 3
        },
        {
          question: 'KOLAS 공인 성적서와 일반 성적서의 차이는 무엇인가요?',
          answer: 'KOLAS 공인 성적서는 국가 공인 기관에서 발급하는 성적서로 국내외에서 공신력을 인정받습니다. 일반 성적서는 자체 시험 결과를 나타내는 문서입니다.',
          order: 4
        },
        {
          question: '견적은 어떻게 받을 수 있나요?',
          answer: '전화, 이메일, 온라인 문의를 통해 견적을 요청하실 수 있습니다. 시험 항목과 수량을 알려주시면 신속하게 견적서를 발송해드립니다.',
          order: 5
        },
        {
          question: '시험 장비를 직접 방문해서 맡길 수 있나요?',
          answer: '네, 가능합니다. 방문 1시간 전에 연락 주시면 담당자가 직접 응대해드립니다.',
          order: 6
        },
        {
          question: '교정 비용 결제는 어떻게 하나요?',
          answer: '교정 완료 후 거래명세서를 이메일로 보내드립니다. 확인 후 지정 계좌로 입금해주시면 됩니다.',
          order: 7
        },
        {
          question: '시험 불합격 시 재시험이 가능한가요?',
          answer: '네, 재시험이 가능합니다. 불합격 사유를 확인하시고 보완 후 재시험을 신청하실 수 있습니다.',
          order: 8
        }
      ]
    }

    if (existing) {
      // 기존 데이터가 있으면 업데이트
      const result = await client.patch(existing._id).set(supportData).commit()
      console.log('✅ 고객지원 정보가 업데이트되었습니다:', result._id)
    } else {
      // 없으면 새로 생성
      const result = await client.create(supportData)
      console.log('✅ 고객지원 정보가 생성되었습니다:', result._id)
    }
    
    // 생성된 데이터 확인
    const finalData = await client.fetch(`*[_type == "supportInfo"][0]`)
    console.log('\n📋 현재 고객지원 정보:')
    console.log('- 페이지 제목:', finalData.pageTitle)
    console.log('- 전화번호:', finalData.phoneNumber)
    console.log('- 이메일:', finalData.emailAddress)
    console.log('- FAQ 개수:', finalData.faqs?.length || 0)

  } catch (error) {
    console.error('❌ 오류 발생:', error)
  }
}

initSupportInfo()
