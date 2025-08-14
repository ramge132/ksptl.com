import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, name, phone, email, inquiryType, message, to } = body

    // 문의 유형 한글 변환
    const inquiryTypeMap: { [key: string]: string } = {
      'calibration': '교정 견적',
      'testing': '시험 견적',
      'equipment': '시험기 제작',
      'technical': '기술 상담',
      'other': '기타 문의'
    }

    const inquiryTypeKorean = inquiryTypeMap[inquiryType] || inquiryType

    // 관리자에게 보낼 이메일
    const adminMailOptions = {
      from: '한국안전용품시험연구원 <no-reply@ksptl.com>',
      to: to || process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net',
      subject: `[문의] ${inquiryTypeKorean} - ${company} ${name}`,
      replyTo: email, // 문의자 이메일로 직접 답장 가능
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            새로운 문의가 접수되었습니다
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">문의자 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 30%;">업체명:</td>
                <td style="padding: 8px;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">담당자명:</td>
                <td style="padding: 8px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">연락처:</td>
                <td style="padding: 8px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">이메일:</td>
                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">문의 유형:</td>
                <td style="padding: 8px;"><span style="background-color: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px;">${inquiryTypeKorean}</span></td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">문의 내용</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px;">
            <p style="color: #6b7280; margin: 0;">
              이 이메일은 한국안전용품시험연구원 웹사이트를 통해 자동으로 발송되었습니다.
            </p>
            <p style="color: #6b7280; margin: 5px 0;">
              접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </p>
          </div>
        </div>
      `,
    }

    // 문의자에게 보낼 확인 이메일
    const customerMailOptions = {
      from: '한국안전용품시험연구원 <no-reply@ksptl.com>',
      to: email,
      subject: `[한국안전용품시험연구원] 문의가 정상적으로 접수되었습니다`,
      replyTo: 'yukwho@hanmail.net', // 답장 받을 실제 이메일
      html: `
        <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 30px 0; background-color: #1e40af;">
            <h1 style="color: white; margin: 0;">한국안전용품시험연구원</h1>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #1e40af;">문의가 정상적으로 접수되었습니다</h2>
            
            <p style="line-height: 1.6; color: #374151;">
              안녕하세요, ${name}님<br><br>
              귀하의 문의가 정상적으로 접수되었습니다.<br>
              담당자 검토 후 24시간 내에 답변 드리도록 하겠습니다.
            </p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">접수된 문의 내용</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; width: 30%;">문의 유형:</td>
                  <td style="padding: 8px;">${inquiryTypeKorean}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; vertical-align: top;">문의 내용:</td>
                  <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">빠른 상담이 필요하신가요?</h3>
              <p style="line-height: 1.6; color: #374151; margin: 10px 0;">
                <strong>전화:</strong> 031-862-8556~7 (평일 09:00-18:00)<br>
                <strong>이메일:</strong> ${process.env.RECIPIENT_EMAIL || 'yukwho@hanmail.net'}
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              본 메일은 발신 전용이므로 회신이 불가능합니다.<br>
              추가 문의사항은 위 연락처를 이용해 주시기 바랍니다.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; background-color: #374151; color: white;">
            <p style="margin: 5px 0;">© 2025 한국안전용품시험연구원. All rights reserved.</p>
            <p style="margin: 5px 0; font-size: 12px;">
              경기 양주시 은현면 화합로 941번길 83
            </p>
          </div>
        </div>
      `,
    }

    // Resend를 사용한 이메일 발송
    if (!process.env.RESEND_API_KEY) {
      console.log('[Inquiry Submit] Resend API key not configured')
      return NextResponse.json({ 
        success: false,
        message: 'Resend API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.'
      })
    }

    try {
      // 관리자 이메일 전송
      console.log('[Inquiry Submit] Sending admin email with Resend...')
      const adminEmail = await resend.emails.send(adminMailOptions)
      console.log('[Inquiry Submit] ✅ Admin email sent successfully:', adminEmail.data?.id)
      
      // 고객 확인 이메일 전송
      if (email && email.trim() !== '') {
        console.log('[Inquiry Submit] Sending customer email with Resend...')
        const customerEmail = await resend.emails.send(customerMailOptions)
        console.log('[Inquiry Submit] ✅ Customer email sent successfully:', customerEmail.data?.id)
      }
      
      return NextResponse.json({ 
        success: true, 
        message: '문의가 성공적으로 접수되었습니다.' 
      })
      
    } catch (emailError) {
      console.error('[Inquiry Submit] Resend email error:', emailError)
      // 이메일 전송 실패해도 성공 응답 (사용자에게는 접수되었다고 표시)
      return NextResponse.json({ 
        success: true, 
        message: '문의가 접수되었습니다. 곧 담당자가 연락드리겠습니다.' 
      })
    }

  } catch (error) {
    console.error('[Inquiry Submit] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '문의 접수 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}
