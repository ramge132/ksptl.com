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
      <h2>교정 신청서</h2>
      
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

      <h3>교정 주기</h3>
      <p>${data.calibrationCycle === 'government' ? '국가에서 정한 교정주기' : `자체설정주기 (${data.customCycle})`}</p>

      <h3>고객 요구 사항</h3>
      <p>${data.requirements || '-'}</p>

      <h3>기기 정보</h3>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>기기명</th>
          <th>제작회사</th>
          <th>모델/규격</th>
          <th>기기번호</th>
          <th>비공인</th>
          <th>비고</th>
        </tr>
        ${data.equipments.map((eq: any) => `
          <tr>
            <td>${eq.name}</td>
            <td>${eq.manufacturer}</td>
            <td>${eq.model || '-'}</td>
            <td>${eq.serialNumber || '-'}</td>
            <td>${eq.isUncertified ? 'Y' : 'N'}</td>
            <td>${eq.notes || '-'}</td>
          </tr>
        `).join('')}
      </table>

      <h3>접수 방법</h3>
      <p>${data.receiptMethod === 'other' ? data.otherMethod : data.receiptMethod}</p>

      <p><strong>신청일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
    `

    // 파일 첨부를 위한 처리
    const attachments = []
    if (businessRegistration) {
      const buffer = await businessRegistration.arrayBuffer()
      attachments.push({
        filename: businessRegistration.name,
        content: Buffer.from(buffer)
      })
    }

    // 관리자에게 이메일 발송
    await resend.emails.send({
      from: '한국안전용품시험연구원 <noreply@ksptl.com>',
      to: [process.env.RECIPIENT_EMAIL || 'ymy@quro.co.kr'],
      subject: `[교정 신청서] ${data.companyName} - ${data.applicantName}`,
      html: emailContent,
      attachments: attachments
    })

    // 신청자에게 확인 이메일 발송
    await resend.emails.send({
      from: '한국안전용품시험연구원 <noreply@ksptl.com>',
      to: [data.email],
      subject: '[한국안전용품시험연구원] 교정 신청서 접수 확인',
      html: `
        <h2>교정 신청서 접수 확인</h2>
        <p>안녕하세요, ${data.applicantName}님.</p>
        <p>교정 신청서가 정상적으로 접수되었습니다.</p>
        
        <h3>접수 정보</h3>
        <ul>
          <li><strong>업체명:</strong> ${data.companyName}</li>
          <li><strong>접수일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
          <li><strong>기기 수량:</strong> ${data.equipments.length}개</li>
        </ul>

        <p>빠른 시일 내에 담당자가 연락드릴 예정입니다.</p>
        <p>문의사항이 있으시면 031-862-8556~7로 연락주시기 바랍니다.</p>
        
        <p>감사합니다.</p>
        <p><strong>한국안전용품시험연구원</strong></p>
      `
    })

    return NextResponse.json({ message: '신청서가 성공적으로 제출되었습니다.' })

  } catch (error) {
    console.error('Error submitting calibration form:', error)
    return NextResponse.json(
      { error: '신청서 제출 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
