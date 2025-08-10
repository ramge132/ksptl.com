import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
      <h2>시험 신청서</h2>
      
      <h3>시험 항목</h3>
      <p><strong>${data.testItem.category}</strong> - ${data.testItem.name}</p>
      
      <h3>신청업체 정보</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>업체명</strong></td><td>${data.companyName}</td></tr>
        <tr><td><strong>사업자등록번호</strong></td><td>${data.businessNumber}</td></tr>
        <tr><td><strong>대표자</strong></td><td>${data.representative}</td></tr>
        <tr><td><strong>업태</strong></td><td>${data.businessType || '-'}</td></tr>
        <tr><td><strong>업종</strong></td><td>${data.industry || '-'}</td></tr>
        <tr><td><strong>주소</strong></td><td>${data.address}</td></tr>
        <tr><td><strong>전화</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>팩스</strong></td><td>${data.fax || '-'}</td></tr>
        <tr><td><strong>휴대폰</strong></td><td>${data.mobile || '-'}</td></tr>
      </table>

      <h3>성적서 발급처</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr><td><strong>부서명</strong></td><td>${data.department || '-'}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>신청인</strong></td><td>${data.applicantName}</td></tr>
      </table>

      <h3>고객 요구 사항</h3>
      <p>${data.requirements || '-'}</p>

      <h3>시험 시료 정보</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>제품명</th>
          <th>제조사</th>
          <th>모델명</th>
          <th>수량</th>
          <th>시료번호</th>
          <th>비고</th>
        </tr>
        ${data.samples.map((sample: any) => `
          <tr>
            <td>${sample.name}</td>
            <td>${sample.manufacturer}</td>
            <td>${sample.model || '-'}</td>
            <td>${sample.quantity}개</td>
            <td>${sample.serialNumber || '-'}</td>
            <td>${sample.notes || '-'}</td>
          </tr>
        `).join('')}
      </table>

      <h3>접수 방법</h3>
      <p>${data.receiptMethod === 'other' ? data.otherMethod : data.receiptMethod}</p>

      <p><strong>신청일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
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

    // 관리자에게 이메일 발송
    await resend.emails.send({
      from: '한국안전용품시험연구원 <noreply@ksptl.com>',
      to: [process.env.RECIPIENT_EMAIL || 'ymy@quro.co.kr'],
      subject: `[시험 신청서] ${data.testItem.category} - ${data.companyName} - ${data.applicantName}`,
      html: emailContent,
      attachments: attachments
    })

    // 신청자에게 확인 이메일 발송
    await resend.emails.send({
      from: '한국안전용품시험연구원 <noreply@ksptl.com>',
      to: [data.email],
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
    })

    return NextResponse.json({ message: '시험 신청서가 성공적으로 제출되었습니다.' })

  } catch (error) {
    console.error('Error submitting test form:', error)
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
