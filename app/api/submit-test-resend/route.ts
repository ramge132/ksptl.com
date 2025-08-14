import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateEmailTemplate, formatTableRow, formatSection, formatSampleCard, formatAlert, formatButton } from '@/lib/email-template'
import { generateTestPDF } from '@/lib/pdf-generator'

const resend = new Resend(process.env.RESEND_API_KEY)

// Vercel Pro의 제한사항을 고려한 파일 크기 제한
const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024 // 개별 파일 2MB 제한
const MAX_TOTAL_SIZE = 4 * 1024 * 1024 // 전체 4MB 제한

export async function POST(request: NextRequest) {
  console.log('[Test Submit Resend] Starting request processing')
  
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessRegistration = formData.get('businessRegistration') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)
    console.log('[Test Submit Resend] Form data parsed successfully')

    // 파일 첨부를 위한 처리
    const attachments = []
    const skippedFiles = []
    let totalSize = 0
    
    // 사업자등록증 처리
    if (businessRegistration && businessRegistration.size > 0) {
      try {
        if (businessRegistration.size <= MAX_SINGLE_FILE_SIZE) {
          const buffer = await businessRegistration.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          
          attachments.push({
            filename: businessRegistration.name,
            content: base64
          })
          totalSize += businessRegistration.size
          console.log(`[Test Submit Resend] ✅ Business registration attached: ${businessRegistration.name}`)
        }
      } catch (error) {
        console.error('[Test Submit Resend] Error processing business registration:', error)
      }
    }

    // 시료 사진들 처리
    const sampleImageKeys = Array.from(formData.keys()).filter(key => key.startsWith('sampleImage_'))
    
    for (const key of sampleImageKeys) {
      try {
        const file = formData.get(key) as File
        if (file && file.size > 0) {
          if (file.size <= MAX_SINGLE_FILE_SIZE && totalSize + file.size <= MAX_TOTAL_SIZE) {
            const buffer = await file.arrayBuffer()
            const base64 = Buffer.from(buffer).toString('base64')
            
            attachments.push({
              filename: file.name,
              content: base64
            })
            totalSize += file.size
            console.log(`[Test Submit Resend] ✅ Sample image attached: ${file.name}`)
          }
        }
      } catch (error) {
        console.error(`[Test Submit Resend] Error processing sample image ${key}:`, error)
      }
    }

    // PDF 생성 시도
    try {
      const pdfBuffer = await generateTestPDF(data)
      if (pdfBuffer.length <= MAX_SINGLE_FILE_SIZE && totalSize + pdfBuffer.length <= MAX_TOTAL_SIZE) {
        attachments.push({
          filename: `시험신청서_${data.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
          content: Buffer.from(pdfBuffer).toString('base64')
        })
        console.log('[Test Submit Resend] ✅ PDF generated and attached')
      }
    } catch (pdfError) {
      console.error('[Test Submit Resend] PDF generation error:', pdfError)
    }

    // 관리자용 이메일 내용
    const adminContent = `
      ${formatSection('📝', '신청 정보', `
        <table style="width: 100%; border-collapse: collapse;">
          ${formatTableRow('시험 종류', `${data.testItem.category} - ${data.testItem.name}`, true)}
          ${formatTableRow('성적서 타입', data.certificateType === 'official' ? '공인 성적서' : '비공인 성적서')}
          ${formatTableRow('신청일시', new Date().toLocaleString('ko-KR'))}
        </table>
      `)}

      ${formatSection('🏢', '신청업체 정보', `
        <table style="width: 100%; border-collapse: collapse;">
          ${formatTableRow('업체명', data.companyName)}
          ${formatTableRow('신청인', data.applicantName)}
          ${formatTableRow('이메일', data.email)}
          ${formatTableRow('연락처', data.phone)}
          ${formatTableRow('휴대폰', data.mobile)}
          ${formatTableRow('팩스', data.fax)}
          ${formatTableRow('주소', data.address)}
        </table>
      `)}

      ${formatSection('📦', `시험 시료 정보 (${data.samples.length}개)`, `
        ${data.samples.map((sample: any, index: number) => formatSampleCard(sample, index + 1)).join('')}
      `)}
    `

    // Resend를 사용한 이메일 발송
    try {
      // 관리자 이메일
      await resend.emails.send({
        from: 'no-reply@ksptl.com', // Resend에서 인증된 도메인 사용
        to: process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
        subject: `[시험 신청] ${data.testItem.category} - ${data.companyName}`,
        html: generateEmailTemplate('새로운 시험 신청', adminContent, true),
        attachments: attachments
      })
      console.log('[Test Submit Resend] ✅ Admin email sent')

      // 고객 확인 이메일
      if (data.email) {
        const customerContent = `
          <p>안녕하세요, <strong>${data.applicantName}</strong>님.<br>
          한국안전용품시험연구원에 시험 신청서가 정상적으로 접수되었습니다.</p>
          
          ${formatAlert('success', '접수 완료', '빠른 시일 내에 담당자가 견적을 보내드릴 예정입니다.')}
        `
        
        await resend.emails.send({
          from: 'no-reply@ksptl.com',
          to: data.email,
          subject: '[한국안전용품시험연구원] 시험 신청서가 접수되었습니다.',
          html: generateEmailTemplate('시험 신청 접수 완료', customerContent, false)
        })
        console.log('[Test Submit Resend] ✅ Customer email sent')
      }

      return NextResponse.json({ 
        message: '시험 신청서가 성공적으로 제출되었습니다.',
        details: { attachments: attachments.length }
      })
      
    } catch (emailError) {
      console.error('[Test Submit Resend] Email error:', emailError)
      return NextResponse.json({ 
        message: '신청서는 접수되었으나 이메일 전송 중 오류가 발생했습니다.',
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      })
    }

  } catch (error) {
    console.error('[Test Submit Resend] Error:', error)
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
