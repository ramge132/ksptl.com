const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'zgx15c3u',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skuDgh4SY348FEH8Ykf0TAbcLFLyRlZ1kGpXfDtGJoPy8Y5erhAUQnxqmXfi0cPzVNeR2snGcrkDQ3LyIYVcQ2Su0g1duq313Up6MtPkdBfRWmSkwKo9fyotCwWEzoYBrgSmGoHMGOXBaFhZGLuCwuIWSHWVsJoEkLHnTIhLhZN8R7M1OasD',
})

async function checkSupportInfo() {
  try {
    // Sanity에서 직접 데이터 가져오기
    const data = await client.fetch(`*[_type == "supportInfo"][0]`)
    
    if (data) {
      console.log('✅ Sanity에 저장된 고객지원 데이터:')
      console.log('================================')
      console.log('페이지 제목:', data.pageTitle)
      console.log('페이지 부제목:', data.pageSubtitle)
      console.log('페이지 설명:', data.pageDescription)
      console.log('전화 제목:', data.phoneTitle)
      console.log('전화번호:', data.phoneNumber)
      console.log('이메일:', data.emailAddress)
      console.log('FAQ 개수:', data.faqs?.length || 0)
      
      if (data.faqs && data.faqs.length > 0) {
        console.log('\nFAQ 첫 번째 항목:')
        console.log('Q:', data.faqs[0].question)
        console.log('A:', data.faqs[0].answer)
      }
    } else {
      console.log('❌ Sanity에 고객지원 데이터가 없습니다.')
    }
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  }
}

checkSupportInfo()
