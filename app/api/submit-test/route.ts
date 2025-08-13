import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { generateEmailTemplate, formatTableRow, formatSection, formatSampleCard, formatAlert, formatButton } from '@/lib/email-template'
import { generateTestPDF } from '@/lib/pdf-generator'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessRegistration = formData.get('businessRegistration') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)

    // 파일 첨부를 위한 처리
    const attachments = []
    
    // 사업자등록증
    if (businessRegistration) {
      const buffer = await businessRegistration.arrayBuffer()
      attachments.push({
        filename: businessRegistration.name,
        content: Buffer.from(buffer)
      })
    }

    // 시료 사진들
    const sampleImageKeys = Array.from(formData.keys()).filter(key => key.startsWith('sampleImage_'))
    for (const key of sampleImageKeys) {
      const file = formData.get(key) as File
      if (file) {
        const buffer = await file.arrayBuffer()
        attachments.push({
          filename: file.name,
          content: Buffer.from(buffer)
        })
      }
    }

    // PDF 생성 및 첨부 (관리자용) - Vercel 환경에서는 PDF 생성 건너뛰기
    if (!process.env.VERCEL_ENV) {
      try {
        const pdfBuffer = await generateTestPDF(data)
        attachments.push({
          filename: `시험신청서_${data.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
          content: pdfBuffer
        })
        console.log('PDF generated and attached successfully')
      } catch (pdfError) {
        console.error('PDF generation error:', pdfError)
        // PDF 생성 실패해도 계속 진행
      }
    } else {
      console.log('PDF generation skipped in Vercel environment')
      // Vercel 환경에서는 HTML 테이블 형태로 정보 추가
    }

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
      from: `"한국안전용품시험연구원" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
      subject: `[시험 신청] ${data.testItem.category} - ${data.companyName}`,
      html: generateEmailTemplate('새로운 시험 신청', adminContent, true),
      attachments: attachments
    }

    // 이메일 전송
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured - Email would be sent:')
      console.log('Admin email:', adminMailOptions)
      if (data.email) {
        console.log('Customer email would be sent to:', data.email)
      }
    } else {
      try {
        // 관리자 이메일 전송
        await transporter.sendMail(adminMailOptions)
        console.log('Admin email sent successfully to:', adminMailOptions.to)
        
        // 고객 확인 이메일 전송
        if (data.email && data.email.trim() !== '') {
          const customerMailOptions = {
            from: `"한국안전용품시험연구원" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: '[한국안전용품시험연구원] 시험 신청서가 접수되었습니다.',
            html: generateEmailTemplate('시험 신청 접수 완료', customerContent, false)
          }
          await transporter.sendMail(customerMailOptions)
          console.log('Customer confirmation email sent successfully to:', customerMailOptions.to)
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // 이메일 전송 실패해도 성공 응답 (사용자에게는 접수되었다고 표시)
        console.log('Failed to send email, but test request was received')
      }
    }

    return NextResponse.json({ message: '시험 신청서가 성공적으로 제출되었습니다.' })

  } catch (error) {
    console.error('Error submitting test form:', error)
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
