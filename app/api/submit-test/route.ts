import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const formDataString = formData.get('formData') as string
    const businessRegistration = formData.get('businessRegistration') as File
    
    if (!formDataString) {
      return NextResponse.json({ error: '폼 데이터가 없습니다.' }, { status: 400 })
    }

    const data = JSON.parse(formDataString)

    // 이메일 내용 생성
    const emailContent = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">시험 신청서</h2>
        
        <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">시험 항목</h3>
          <p style="margin: 0; font-size: 16px;"><strong>${data.testItem.category}</strong> - ${data.testItem.name}</p>
        </div>
        
        <h3 style="color: #374151; margin-top: 30px;">신청업체 정보</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold; width: 35%;">업체명</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">사업자등록번호</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.businessNumber}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">대표자</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.representative}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">업태</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.businessType || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">업종</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.industry || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">주소</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.address}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">전화</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">팩스</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.fax || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">휴대폰</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.mobile || '-'}</td>
          </tr>
        </table>

        <h3 style="color: #374151; margin-top: 30px;">성적서 발급처</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold; width: 35%;">부서명</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.department || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">E-mail</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">신청인</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${data.applicantName}</td>
          </tr>
        </table>

        <h3 style="color: #374151; margin-top: 30px;">고객 요구 사항</h3>
        <div style="padding: 15px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px;">
          <p style="margin: 0;">${data.requirements || '없음'}</p>
        </div>

        <h3 style="color: #374151; margin-top: 30px;">시험 시료 정보</h3>
        <table style="border-collapse: collapse; width: 100%; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #1e40af;">
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: left;">제품명</th>
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: left;">제조사</th>
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: center;">모델명</th>
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: center;">수량</th>
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: center;">시료번호</th>
              <th style="padding: 12px; border: 1px solid #e5e7eb; color: white; font-weight: bold; text-align: left;">비고</th>
            </tr>
          </thead>
          <tbody>
            ${data.samples.map((sample: any, index: number) => `
              <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${sample.name}</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${sample.manufacturer}</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: center;">${sample.model || '-'}</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: center;">${sample.quantity}개</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: center;">${sample.serialNumber || '-'}</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${sample.notes || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3 style="color: #374151; margin-top: 30px;">접수 정보</h3>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold; width: 35%;">접수 방법</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">
              ${data.receiptMethod === 'visit' ? '방문' :
                data.receiptMethod === 'delivery' ? '택배' :
                data.receiptMethod === 'pickup' ? '픽업' :
                data.receiptMethod === 'other' ? data.otherMethod : data.receiptMethod}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">신청일시</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${new Date().toLocaleString('ko-KR')}</td>
          </tr>
        </table>

        <div style="margin-top: 40px; padding: 20px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            한국안전용품시험연구원<br>
            본사: 031-862-8556~7 | 시험소: 031-858-3012<br>
            경기 양주시 은현면 화합로 701-11
          </p>
        </div>
      </div>
    `

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

    // 관리자에게 이메일 발송
    const adminMailOptions = {
      from: `"한국안전용품시험연구원" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'ymy@quro.co.kr',
      subject: `[시험 신청서] ${data.testItem.category} - ${data.companyName} - ${data.applicantName}`,
      html: emailContent,
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
        
        // 고객 확인 이메일 전송 (이메일이 있는 경우에만)
        if (data.email && data.email.trim() !== '') {
          const customerMailOptions = {
            from: `"한국안전용품시험연구원" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: '[한국안전용품시험연구원] 시험 신청서 접수 확인',
            html: `
              <h2>시험 신청서 접수 확인</h2>
              <p>안녕하세요, ${data.applicantName}님.</p>
              <p>${data.testItem.category} - ${data.testItem.name} 시험 신청서가 정상적으로 접수되었습니다.</p>
              
              <h3>접수 정보</h3>
              <ul>
                <li><strong>업체명:</strong> ${data.companyName}</li>
                <li><strong>시험 항목:</strong> ${data.testItem.category} - ${data.testItem.name}</li>
                <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
                <li><strong>시료 수량:</strong> ${data.samples.reduce((total: number, sample: any) => total + sample.quantity, 0)}개</li>
              </ul>

              <p>빠른 시일 내에 담당자가 연락드릴 예정입니다.</p>
              <p>문의사항이 있으시면 031-858-3012(시험소)로 연락주시기 바랍니다.</p>
              
              <p>감사합니다.</p>
              <p><strong>한국안전용품시험연구원</strong></p>
            `
          }
          
          await transporter.sendMail(customerMailOptions)
          console.log('Customer confirmation email sent successfully to:', customerMailOptions.to)
        } else {
          console.log('Customer email not provided or invalid, skipping customer notification')
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
