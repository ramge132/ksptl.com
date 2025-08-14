import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { generateEmailTemplate, formatTableRow, formatSection, formatSampleCard, formatAlert, formatButton } from '@/lib/email-template'
import { generateTestPDF } from '@/lib/pdf-generator'

// Vercel Pro의 제한사항을 고려한 파일 크기 제한
const MAX_SINGLE_FILE_SIZE = 2 * 1024 * 1024 // 개별 파일 2MB 제한
const MAX_TOTAL_SIZE = 4 * 1024 * 1024 // 전체 4MB 제한 (Vercel Pro는 4.5MB까지 지원)

export async function POST(request: NextRequest) {
  console.log('[Test Submit] Starting request processing')
  
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessRegistration = formData.get('businessRegistration') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)
    console.log('[Test Submit] Form data parsed successfully')

    // 파일 첨부를 위한 처리
    const attachments = []
    const skippedFiles = []
    let totalSize = 0
    
    // 사업자등록증 처리
    if (businessRegistration && businessRegistration.size > 0) {
      try {
        console.log(`[Test Submit] Processing business registration: ${businessRegistration.name} (${businessRegistration.size} bytes)`)
        
        if (businessRegistration.size <= MAX_SINGLE_FILE_SIZE && totalSize + businessRegistration.size <= MAX_TOTAL_SIZE) {
          const buffer = await businessRegistration.arrayBuffer()
          const fileBuffer = Buffer.from(buffer)
          
          attachments.push({
            filename: businessRegistration.name,
            content: fileBuffer
          })
          totalSize += fileBuffer.length
          console.log(`[Test Submit] ✅ Business registration attached: ${businessRegistration.name}`)
        } else {
          const reason = businessRegistration.size > MAX_SINGLE_FILE_SIZE ? 
            `파일 크기 초과 (${(businessRegistration.size / 1024 / 1024).toFixed(2)}MB)` : 
            '전체 크기 제한'
          skippedFiles.push(`사업자등록증: ${reason}`)
          console.log(`[Test Submit] ⚠️ Business registration skipped: ${reason}`)
        }
      } catch (error) {
        console.error('[Test Submit] Error processing business registration:', error)
      }
    }

    // 시료 사진들 처리
    const sampleImageKeys = Array.from(formData.keys()).filter(key => key.startsWith('sampleImage_'))
    console.log(`[Test Submit] Found ${sampleImageKeys.length} sample images`)
    
    for (const key of sampleImageKeys) {
      try {
        const file = formData.get(key) as File
        if (file && file.size > 0) {
          console.log(`[Test Submit] Processing ${key}: ${file.name} (${file.size} bytes)`)
          
          // 개별 파일 크기와 전체 크기 체크
          if (file.size <= MAX_SINGLE_FILE_SIZE && totalSize + file.size <= MAX_TOTAL_SIZE) {
            const buffer = await file.arrayBuffer()
            const fileBuffer = Buffer.from(buffer)
            
            attachments.push({
              filename: file.name,
              content: fileBuffer
            })
            totalSize += fileBuffer.length
            console.log(`[Test Submit] ✅ Sample image attached: ${file.name}`)
          } else {
            const reason = file.size > MAX_SINGLE_FILE_SIZE ? 
              `파일 크기 초과 (${(file.size / 1024 / 1024).toFixed(2)}MB)` : 
              '전체 크기 제한'
            skippedFiles.push(`${file.name}: ${reason}`)
            console.log(`[Test Submit] ⚠️ Sample image skipped: ${reason}`)
          }
        }
      } catch (error) {
        console.error(`[Test Submit] Error processing sample image ${key}:`, error)
      }
    }

    // PDF 생성 시도 (크기가 허용되는 경우만)
    if (totalSize < MAX_TOTAL_SIZE * 0.7) { // 전체 제한의 70% 미만일 때만 PDF 생성 시도
      try {
        console.log('[Test Submit] Attempting PDF generation')
        const pdfBuffer = await generateTestPDF(data)
        
        if (pdfBuffer.length <= MAX_SINGLE_FILE_SIZE && totalSize + pdfBuffer.length <= MAX_TOTAL_SIZE) {
          attachments.push({
            filename: `시험신청서_${data.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
            content: pdfBuffer
          })
          totalSize += pdfBuffer.length
          console.log(`[Test Submit] ✅ PDF generated and attached (${pdfBuffer.length} bytes)`)
        } else {
          console.log(`[Test Submit] ⚠️ PDF skipped due to size constraints (${pdfBuffer.length} bytes)`)
          skippedFiles.push('시험신청서 PDF: 크기 제한')
        }
      } catch (pdfError) {
        console.error('[Test Submit] PDF generation error:', pdfError)
      }
    } else {
      console.log('[Test Submit] Skipping PDF generation due to total size constraints')
    }

    console.log(`[Test Submit] Final status - Attachments: ${attachments.length}, Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB, Skipped: ${skippedFiles.length}`)

    // 이메일 전송 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 관리자용 이메일 내용 생성
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

      ${formatSection('🔬', '세부 시험 항목', `
        <ul style="margin: 0; padding-left: 20px; list-style-type: '✓ '; color: #374151;">
          ${data.testItems.map((item: string) => `<li style="padding-left: 8px;">${item}</li>`).join('')}
        </ul>
      `)}

      ${formatSection('📦', `시험 시료 정보 (${data.samples.length}개)`, `
        ${data.samples.map((sample: any, index: number) => formatSampleCard(sample, index + 1)).join('')}
      `)}

      ${formatSection('🚚', '접수 및 반품 정보', `
        <table style="width: 100%; border-collapse: collapse;">
          ${formatTableRow('시료 접수 방법', data.receiptMethod === 'delivery' ? '택배' : data.receiptMethod === 'visit' ? '방문' : data.receiptMethod === 'other' ? data.otherMethod : data.receiptMethod)}
          ${formatTableRow('시료 반품 방법', data.returnMethod === 'return' ? '반품 (착불)' : '폐기 (비용 발생)')}
        </table>
      `)}

      ${data.requirements ? formatSection('💬', '고객 요구사항', `
        <p style="margin: 0; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
          ${data.requirements}
        </p>
      `) : ''}
      
      ${skippedFiles.length > 0 ? formatSection('⚠️', '첨부되지 않은 파일', `
        <div style="padding: 12px; background-color: #fef3c7; border-radius: 8px; color: #92400e;">
          <p style="margin: 0 0 8px 0;"><strong>크기 제한으로 일부 파일이 첨부되지 않았습니다:</strong></p>
          <ul style="margin: 0; padding-left: 20px;">
            ${skippedFiles.map(file => `<li>${file}</li>`).join('')}
          </ul>
        </div>
      `) : ''}
      
      ${formatSection('📎', '첨부 파일 정보', `
        <div style="padding: 12px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0;">첨부된 파일: <strong>${attachments.length}개</strong></p>
          <p style="margin: 4px 0 0 0;">전체 크기: <strong>${(totalSize / 1024 / 1024).toFixed(2)}MB</strong> / 4MB</p>
        </div>
      `)}
    `

    const customerContent = `
      <p style="font-size: 16px; color: #374151; margin-bottom: 24px;">
        안녕하세요, <strong>${data.applicantName}</strong>님.<br>
        한국안전용품시험연구원에 시험 신청서가 정상적으로 접수되었습니다.
      </p>
      
      ${formatAlert('success', '접수 완료', '빠른 시일 내에 담당자가 견적을 보내드릴 예정입니다.')}

      ${formatSection('📄', '신청 내역 요약', `
        <table style="width: 100%; border-collapse: collapse;">
          ${formatTableRow('시험 종류', `${data.testItem.category} - ${data.testItem.name}`, true)}
          ${formatTableRow('성적서 타입', data.certificateType === 'official' ? '공인 성적서' : '비공인 성적서')}
          ${formatTableRow('시료 개수', `${data.samples.length}개`)}
          ${formatTableRow('접수일시', new Date().toLocaleString('ko-KR'))}
        </table>
      `)}

      <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
        문의사항이 있으시면 언제든지 시험소(031-858-3012)로 연락주시기 바랍니다.
      </p>
      
      ${formatButton('홈페이지 바로가기', 'https://ksptl.com')}
    `

    // 관리자에게 이메일 발송
    const adminMailOptions = {
      from: `"한국안전용품시험연구원 (발신전용)" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
      subject: `[시험 신청] ${data.testItem.category} - ${data.companyName}`,
      html: generateEmailTemplate('새로운 시험 신청', adminContent, true),
      attachments: attachments.length > 0 ? attachments : undefined,
      replyTo: 'yukwho@hanmail.net'
    }

    // 이메일 전송
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('[Test Submit] Email credentials not configured')
      return NextResponse.json({ 
        message: '이메일 설정이 완료되지 않았습니다.',
        details: { attachments: attachments.length, skipped: skippedFiles.length }
      })
    }

    try {
      // 관리자 이메일 전송
      console.log('[Test Submit] Sending admin email with', attachments.length, 'attachments...')
      await transporter.sendMail(adminMailOptions)
      console.log('[Test Submit] ✅ Admin email sent successfully')
      
      // 고객 확인 이메일 전송
      if (data.email && data.email.trim() !== '') {
        const customerMailOptions = {
          from: `"한국안전용품시험연구원 (발신전용)" <${process.env.EMAIL_USER}>`,
          to: data.email,
          subject: '[한국안전용품시험연구원] 시험 신청서가 접수되었습니다.',
          html: generateEmailTemplate('시험 신청 접수 완료', customerContent, false),
          replyTo: 'yukwho@hanmail.net'
        }
        console.log('[Test Submit] Sending customer email...')
        await transporter.sendMail(customerMailOptions)
        console.log('[Test Submit] ✅ Customer email sent successfully')
      }
      
      return NextResponse.json({ 
        message: '시험 신청서가 성공적으로 제출되었습니다.',
        details: {
          attachments: attachments.length,
          skipped: skippedFiles.length,
          totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`
        }
      })
      
    } catch (emailError) {
      console.error('[Test Submit] Email sending error:', emailError)
      return NextResponse.json({ 
        message: '신청서는 접수되었으나 이메일 전송 중 오류가 발생했습니다.',
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
        details: { attachments: attachments.length, skipped: skippedFiles.length }
      })
    }

  } catch (error) {
    console.error('[Test Submit] Error:', error)
    return NextResponse.json(
      { 
        error: '신청서 제출 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
