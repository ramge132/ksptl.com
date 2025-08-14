import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { 
  generateEmailTemplate, 
  formatSection, 
  formatTableRow, 
  formatEquipmentCard,
  formatAlert 
} from '@/lib/email-template'
import { generateCalibrationPDF } from '@/lib/pdf-generator-simple'

export async function POST(request: NextRequest) {
  console.log('[Calibration Submit] Starting request processing')
  
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessLicense = formData.get('businessLicense') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)
    console.log('[Calibration Submit] Form data parsed successfully')

    // 파일 첨부를 위한 처리 - 크기 제한 없음
    const attachments = []
    let totalSize = 0
    
    // 사업자등록증 첨부
    if (businessLicense && businessLicense.size > 0) {
      try {
        console.log(`[Calibration Submit] Processing business license: ${businessLicense.name} (${businessLicense.size} bytes)`)
        
        const buffer = await businessLicense.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')
        
        attachments.push({
          filename: businessLicense.name,
          content: base64
        })
        totalSize += businessLicense.size
        console.log(`[Calibration Submit] ✅ Business license attached: ${businessLicense.name}`)
      } catch (error) {
        console.error('[Calibration Submit] Error processing business license:', error)
      }
    }

    // 기기 이미지들 처리
    const equipmentImageKeys = Array.from(formData.keys()).filter(key => key.startsWith('equipmentImage_'))
    console.log(`[Calibration Submit] Found ${equipmentImageKeys.length} equipment images`)
    
    for (const key of equipmentImageKeys) {
      try {
        const file = formData.get(key) as File
        if (file && file.size > 0) {
          console.log(`[Calibration Submit] Processing ${key}: ${file.name} (${file.size} bytes)`)
          
          const buffer = await file.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          
          attachments.push({
            filename: file.name,
            content: base64
          })
          totalSize += file.size
          console.log(`[Calibration Submit] ✅ Equipment image attached: ${file.name}`)
        }
      } catch (error) {
        console.error(`[Calibration Submit] Error processing equipment image ${key}:`, error)
      }
    }
    
    // PDF 생성 - 크기 제한 없음
    try {
      console.log('[Calibration Submit] Generating PDF')
      const pdfBuffer = await generateCalibrationPDF(data)
      
      attachments.push({
        filename: `교정신청서_${data.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
        content: Buffer.from(pdfBuffer).toString('base64')
      })
      totalSize += pdfBuffer.length
      console.log(`[Calibration Submit] ✅ PDF generated and attached (${pdfBuffer.length} bytes)`)
    } catch (pdfError) {
      console.error('[Calibration Submit] PDF generation error:', pdfError)
    }

    console.log(`[Calibration Submit] Final status - Attachments: ${attachments.length}, Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`)

    // 관리자용 이메일 내용 생성
    const adminEmailContent = `
      <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 24px 0;">📋 교정 신청서</h2>
      
      ${formatSection('신청업체 정보', '🏢', `
        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
          ${formatTableRow('업체명', data.companyName, true)}
          ${formatTableRow('주소', data.address)}
          ${formatTableRow('전화', data.phone)}
          ${formatTableRow('팩스', data.fax)}
          ${formatTableRow('휴대폰', data.mobile)}
        </table>
      `)}
      
      ${formatSection('성적서 발급처', '📧', `
        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
          ${formatTableRow('신청인', data.applicantName, true)}
          ${formatTableRow('E-mail', data.email)}
        </table>
      `)}

      ${formatSection('교정 주기', '📅', `
        <div style="background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px;">
          <p style="margin: 0; color: #374151; font-size: 14px;">
            ${data.calibrationPeriod === 'national' ? 
              '<strong>국가에서 정한 교정주기</strong>' : 
              '<strong>자체설정주기</strong>'}
          </p>
        </div>
      `)}
      
      ${data.requirements ? formatSection('고객 요구 사항', '💬', `
        <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #78350f; font-size: 14px; white-space: pre-wrap;">
            ${data.requirements}
          </p>
        </div>
      `) : ''}
      
      ${formatSection('기기 정보', '🔧', 
        data.equipments.map((eq: any, index: number) => 
          formatEquipmentCard(eq, index + 1)
        ).join('')
      )}
      
      ${formatSection('접수 정보', '📦', `
        <table style="width: 100%; border-collapse: collapse;">
          ${formatTableRow('접수 방법', data.receptionMethod === 'other' ? data.receptionMethodOther : 
            data.receptionMethod === 'visit' ? '방문' :
            data.receptionMethod === 'delivery' ? '택배' :
            data.receptionMethod === 'pickup' ? '픽업' :
            data.receptionMethod === 'onsite' ? '출장' : data.receptionMethod
          )}
          ${formatTableRow('신청일시', new Date().toLocaleString('ko-KR'))}
        </table>
      `)}
      
      ${formatSection('📎', '첨부 파일 정보', `
        <div style="padding: 12px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0;">첨부된 파일: <strong>${attachments.length}개</strong></p>
          <p style="margin: 4px 0 0 0;">전체 크기: <strong>${(totalSize / 1024 / 1024).toFixed(2)}MB</strong></p>
        </div>
      `)}
    `

    // 고객용 확인 이메일 내용
    const customerEmailContent = `
      <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 8px 0;">교정 신청서 접수 확인</h2>
      <p style="color: #6b7280; font-size: 16px; margin: 0 0 24px 0;">
        안녕하세요, <strong>${data.applicantName}</strong>님
      </p>
      
      ${formatAlert('success', '접수 완료', '교정 신청서가 정상적으로 접수되었습니다.')}
      
      ${formatSection('접수 정보', '📋', `
        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
          ${formatTableRow('업체명', data.companyName, true)}
          ${formatTableRow('접수일시', new Date().toLocaleString('ko-KR'))}
          ${formatTableRow('기기 수량', `${data.equipments.length}개`)}
          ${formatTableRow('교정 주기', data.calibrationPeriod === 'national' ? 
            '국가에서 정한 교정주기' : '자체설정주기'
          )}
        </table>
      `)}
      
      ${formatSection('신청 기기 목록', '🔧', 
        data.equipments.map((eq: any, index: number) => `
          <div style="padding: 8px 12px; background-color: ${index % 2 === 0 ? '#f9fafb' : '#ffffff'}; border-left: 3px solid #3b82f6; margin-bottom: 8px;">
            <strong style="color: #1f2937;">${index + 1}. ${eq.name}</strong>
            <span style="color: #6b7280; font-size: 13px; margin-left: 8px;">
              ${eq.manufacturer} ${eq.model ? `(${eq.model})` : ''}
            </span>
            ${eq.isUncertified ? '<span style="display: inline-block; margin-left: 8px; background-color: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-size: 11px;">비공인</span>' : ''}
          </div>
        `).join('')
      )}
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin-top: 32px;">
        <p style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">
          문의사항이 있으시면 언제든지 연락주세요
        </p>
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          본사: 031-862-8556~7 | 시험소: 031-858-3012 | E-mail: yukwho@hanmail.net
        </p>
      </div>
    `

    // Resend를 사용한 이메일 발송
    if (!process.env.RESEND_API_KEY) {
      console.log('[Calibration Submit] Resend API key not configured')
      return NextResponse.json({ 
        message: 'Resend API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.',
        details: { attachments: attachments.length }
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
      // 관리자 이메일 발송
      console.log('[Calibration Submit] Sending admin email with Resend...')
      const adminEmail = await resend.emails.send({
        from: '한국안전용품시험연구원 <no-reply@ksptl.com>',
        to: process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
        subject: `[교정 신청서] ${data.companyName} - ${data.applicantName}`,
        html: generateEmailTemplate('[교정 신청서] 새로운 신청이 접수되었습니다', adminEmailContent, true),
        attachments: attachments.length > 0 ? attachments : undefined,
        replyTo: data.email
      })
      console.log('[Calibration Submit] ✅ Admin email sent successfully:', adminEmail.data?.id)
      
      // 고객 확인 이메일 발송
      if (data.email && data.email.trim() !== '') {
        console.log('[Calibration Submit] Sending customer email with Resend...')
        const customerEmail = await resend.emails.send({
          from: '한국안전용품시험연구원 <no-reply@ksptl.com>',
          to: data.email,
          subject: '[한국안전용품시험연구원] 교정 신청서 접수 확인',
          html: generateEmailTemplate('교정 신청서 접수 확인', customerEmailContent, false),
          replyTo: 'yukwho@hanmail.net'
        })
        console.log('[Calibration Submit] ✅ Customer email sent successfully:', customerEmail.data?.id)
      }
      
      return NextResponse.json({ 
        message: '신청서가 성공적으로 제출되었습니다.',
        details: {
          attachments: attachments.length,
          totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`
        }
      })
      
    } catch (emailError) {
      console.error('[Calibration Submit] Resend email error:', emailError)
      return NextResponse.json({ 
        message: '신청서는 접수되었으나 이메일 전송 중 오류가 발생했습니다.',
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
        details: { attachments: attachments.length }
      })
    }

  } catch (error) {
    console.error('[Calibration Submit] Error:', error)
    return NextResponse.json(
      { 
        error: '신청서 제출 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
