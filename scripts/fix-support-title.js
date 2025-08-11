const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'zgx15c3u',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skuDgh4SY348FEH8Ykf0TAbcLFLyRlZ1kGpXfDtGJoPy8Y5erhAUQnxqmXfi0cPzVNeR2snGcrkDQ3LyIYVcQ2Su0g1duq313Up6MtPkdBfRWmSkwKo9fyotCwWEzoYBrgSmGoHMGOXBaFhZGLuCwuIWSHWVsJoEkLHnTIhLhZN8R7M1OasD',
})

async function fixSupportTitle() {
  try {
    // 현재 데이터 가져오기
    const currentData = await client.fetch(`*[_type == "supportInfo"][0]`)
    
    if (!currentData) {
      console.log('❌ 고객지원 데이터를 찾을 수 없습니다.')
      return
    }
    
    console.log('📝 현재 제목:', currentData.pageTitle)
    
    // 제목 수정
    const result = await client
      .patch('supportInfo-singleton')
      .set({ pageTitle: '고객지원' })
      .commit()
    
    console.log('✅ 제목이 수정되었습니다: 고객지원w → 고객지원')
    
    // 수정된 데이터 확인
    const updatedData = await client.fetch(`*[_type == "supportInfo"][0]`)
    console.log('📋 수정된 제목:', updatedData.pageTitle)
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  }
}

fixSupportTitle()
