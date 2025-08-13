import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { 
  generateEmailTemplate, 
  formatSection, 
  formatTableRow, 
  formatEquipmentCard,
  formatAlert 
} from '@/lib/email-template'
import { generateCalibrationPDF } from '@/lib/pdf-generator'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessLicense = formData.get('businessLicense') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)

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

    // 파일 첨부를 위한 처리
    const attachments = []
    
    // 사업자등록증 첨부
    if (businessLicense) {
      const buffer = await businessLicense.arrayBuffer()
      attachments.push({
        filename: businessLicense.name,
        content: Buffer.from(buffer)
      })
    }
    
    // PDF 생성 및 첨부 (관리자용) - Vercel 환경에서는 PDF 생성 건너뛰기
    if (!process.env.VERCEL_ENV) {
      try {
        const pdfBuffer = await generateCalibrationPDF(data)
        attachments.push({
          filename: `교정신청서_${data.companyName}_${new Date().toISOString().split('T')[0]}.pdf`,
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

    // 관리자에게 이메일 발송
    const adminMailOptions = {
      from: `"한국안전용품시험연구원 (발신전용)" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
      subject: `[교정 신청서] ${data.companyName} - ${data.applicantName}`,
      html: generateEmailTemplate('[교정 신청서] 새로운 신청이 접수되었습니다', adminEmailContent, true),
      attachments: attachments,
      replyTo: 'yukwho@hanmail.net' // 답장 받을 실제 이메일
    }

    // 신청자에게 확인 이메일 발송
    const customerMailOptions = {
      from: `"한국안전용품시험연구원 (발신전용)" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: '[한국안전용품시험연구원] 교정 신청서 접수 확인',
      html: generateEmailTemplate('교정 신청서 접수 확인', customerEmailContent, false),
      replyTo: 'yukwho@hanmail.net' // 답장 받을 실제 이메일
    }

    // 이메일 전송
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured - Email would be sent:')
      console.log('Admin email:', adminMailOptions)
      console.log('Customer email:', customerMailOptions)
    } else {
      try {
        // 관리자 이메일 전송
        await transporter.sendMail(adminMailOptions)
        console.log('Admin email sent successfully to:', adminMailOptions.to)
        
        // 고객 확인 이메일 전송
        await transporter.sendMail(customerMailOptions)
        console.log('Customer confirmation email sent successfully to:', customerMailOptions.to)
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // 이메일 전송 실패해도 성공 응답 (사용자에게는 접수되었다고 표시)
        console.log('Failed to send email, but calibration request was received')
      }
    }

    return NextResponse.json({ message: '신청서가 성공적으로 제출되었습니다.' })

  } catch (error) {
    console.error('Error submitting calibration form:', error)
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
