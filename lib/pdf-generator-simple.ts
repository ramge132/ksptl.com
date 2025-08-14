const PDFDocument = require('pdfkit')

// v1.47 디자인 기반 PDF 생성
export async function generateTestPDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      console.log('[PDF Generation] Starting test PDF generation...')
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: '시험 신청서',
          Author: '한국안전용품시험연구원'
        }
      })
      
      const chunks: Buffer[] = []
      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => {
        console.log('[PDF Generation] Test PDF generated successfully')
        resolve(Buffer.concat(chunks))
      })
      doc.on('error', (error: any) => {
        console.error('[PDF Generation] Error:', error)
        reject(error)
      })
      
      // 색상 정의
      const primaryColor = '#1e40af'  // 파란색
      const borderColor = '#d1d5db'   // 회색 테두리
      const bgColor = '#f3f4f6'       // 배경 회색
      
      // 헤더 - 회사명과 제목
      doc.rect(40, 40, doc.page.width - 80, 80)
         .fill(bgColor)
      
      doc.fillColor('#000000')
         .fontSize(22)
         .font('Helvetica-Bold')
         .text('한국안전용품시험연구원', 0, 55, { align: 'center' })
      doc.fontSize(16)
         .font('Helvetica')
         .text('시 험 신 청 서', 0, 85, { align: 'center' })
      
      // 접수 정보 박스
      const receiptNo = `2024-TEST-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      const currentDate = new Date().toLocaleDateString('ko-KR')
      
      doc.fontSize(10)
         .fillColor('#000000')
      
      // 접수번호와 접수일
      const startY = 140
      doc.rect(40, startY, doc.page.width - 80, 30)
         .stroke(borderColor)
      doc.text(`접수번호: ${receiptNo}`, 50, startY + 10)
      doc.text(`접수일: ${currentDate}`, 400, startY + 10)
      
      // 신청업체 정보 섹션
      let currentY = startY + 50
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 신청업체 정보', 40, currentY)
      
      currentY += 25
      
      // 신청업체 테이블
      const tableData = [
        ['업체명', data.companyName || '', '사업자등록번호', data.businessNumber || ''],
        ['대표자', data.representative || '', '업태', data.businessType || ''],
        ['업종', data.businessCategory || '', '전화', data.phone || ''],
        ['팩스', data.fax || '', '휴대폰', data.mobile || ''],
        ['주소', data.address || '', '', ''],
      ]
      
      const rowHeight = 30
      const col1Width = 100
      const col2Width = 180
      const col3Width = 100
      const col4Width = (doc.page.width - 80 - col1Width - col2Width - col3Width - 20)
      
      doc.font('Helvetica')
         .fontSize(10)
         .fillColor('#000000')
      
      tableData.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        // 배경색 (홀수 행)
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        // 테두리
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        // 첫 번째 열 (라벨)
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        // 두 번째 열 (값)
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
        
        if (row[0] === '주소') {
          // 주소는 전체 너비 사용
          doc.text(row[1], 50 + col1Width, y + 10, { width: doc.page.width - 80 - col1Width - 20 })
        } else {
          doc.text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
          
          // 세 번째 열 (라벨)
          if (row[2]) {
            doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
               .stroke(borderColor)
            doc.font('Helvetica-Bold')
               .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
            
            // 네 번째 열 (값)
            doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
               .stroke(borderColor)
            doc.font('Helvetica')
               .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
          }
        }
      })
      
      currentY += tableData.length * rowHeight + 30
      
      // 성적서 발급처 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 성적서 발급처', 40, currentY)
      
      currentY += 25
      
      const certData = [
        ['신청인', data.applicantName || '', 'E-mail', data.email || ''],
      ]
      
      certData.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
        
        doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
        
        doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
      })
      
      currentY += certData.length * rowHeight + 30
      
      // 시험 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 시험 정보', 40, currentY)
      
      currentY += 25
      
      const testInfo = [
        ['시험 종류', `${data.testItem?.category || ''} - ${data.testItem?.name || ''}`, '성적서 타입', data.certificateType === 'official' ? '공인 성적서' : '비공인 성적서'],
        ['시료 개수', `${data.samples?.length || 0}개`, '접수 방법', data.receiptMethod === 'delivery' ? '택배' : data.receiptMethod === 'visit' ? '방문' : '기타'],
      ]
      
      testInfo.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
        
        doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
        
        doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
      })
      
      currentY += testInfo.length * rowHeight + 30
      
      // 시료 정보 (페이지 체크)
      if (currentY > doc.page.height - 150) {
        doc.addPage()
        currentY = 50
      }
      
      if (data.samples && data.samples.length > 0) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(primaryColor)
           .text('■ 시료 정보', 40, currentY)
        
        currentY += 25
        
        data.samples.forEach((sample: any, index: number) => {
          if (currentY > doc.page.height - 100) {
            doc.addPage()
            currentY = 50
          }
          
          const y = currentY
          
          doc.rect(40, y, doc.page.width - 80, 40)
             .fill(bgColor)
             .fillColor('#000000')
          
          doc.rect(40, y, doc.page.width - 80, 40)
             .stroke(borderColor)
          
          doc.font('Helvetica-Bold')
             .text(`시료 ${index + 1}`, 50, y + 5)
          doc.font('Helvetica')
             .fontSize(9)
             .text(`품명: ${sample.name || ''}`, 50, y + 20)
             .text(`제조사: ${sample.manufacturer || ''}`, 200, y + 20)
             .text(`모델: ${sample.model || ''}`, 350, y + 20)
          
          currentY += 45
        })
      }
      
      // 푸터 정보
      const footerY = doc.page.height - 80
      doc.rect(40, footerY, doc.page.width - 80, 40)
         .fill(bgColor)
         .fillColor('#000000')
      
      doc.fontSize(8)
         .text('본사: 경기 양주시 은현면 화합로 941번길 83 | Tel: 031-862-8556~7', 50, footerY + 10)
         .text('시험소: 경기 양주시 은현면 화합로 701-11 | Tel: 031-858-3012', 50, footerY + 25)
      
      doc.end()
    } catch (error) {
      console.error('[PDF Generation] Error in generateTestPDF:', error)
      reject(error)
    }
  })
}

export async function generateCalibrationPDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      console.log('[PDF Generation] Starting calibration PDF generation...')
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
        info: {
          Title: '교정 신청서',
          Author: '한국안전용품시험연구원'
        }
      })
      
      const chunks: Buffer[] = []
      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => {
        console.log('[PDF Generation] Calibration PDF generated successfully')
        resolve(Buffer.concat(chunks))
      })
      doc.on('error', (error: any) => {
        console.error('[PDF Generation] Error:', error)
        reject(error)
      })
      
      // 색상 정의
      const primaryColor = '#1e40af'  // 파란색
      const borderColor = '#d1d5db'   // 회색 테두리
      const bgColor = '#f3f4f6'       // 배경 회색
      
      // 헤더 - 회사명과 제목
      doc.rect(40, 40, doc.page.width - 80, 80)
         .fill(bgColor)
      
      doc.fillColor('#000000')
         .fontSize(22)
         .font('Helvetica-Bold')
         .text('한국안전용품시험연구원', 0, 55, { align: 'center' })
      doc.fontSize(16)
         .font('Helvetica')
         .text('교 정 신 청 서', 0, 85, { align: 'center' })
      
      // 접수 정보 박스
      const receiptNo = `2024-CAL-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      const currentDate = new Date().toLocaleDateString('ko-KR')
      
      doc.fontSize(10)
         .fillColor('#000000')
      
      // 접수번호와 접수일
      const startY = 140
      doc.rect(40, startY, doc.page.width - 80, 30)
         .stroke(borderColor)
      doc.text(`접수번호: ${receiptNo}`, 50, startY + 10)
      doc.text(`접수일: ${currentDate}`, 400, startY + 10)
      
      // 신청업체 정보 섹션
      let currentY = startY + 50
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 신청업체 정보', 40, currentY)
      
      currentY += 25
      
      // 신청업체 테이블
      const tableData = [
        ['업체명', data.companyName || '', '사업자등록번호', data.businessNumber || ''],
        ['대표자', data.representative || '', '업태', data.businessType || ''],
        ['업종', data.businessCategory || '', '전화', data.phone || ''],
        ['팩스', data.fax || '', '휴대폰', data.mobile || ''],
        ['주소', data.address || '', '', ''],
      ]
      
      const rowHeight = 30
      const col1Width = 100
      const col2Width = 180
      const col3Width = 100
      const col4Width = (doc.page.width - 80 - col1Width - col2Width - col3Width - 20)
      
      doc.font('Helvetica')
         .fontSize(10)
         .fillColor('#000000')
      
      tableData.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        // 배경색 (홀수 행)
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        // 테두리
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        // 첫 번째 열 (라벨)
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        // 두 번째 열 (값)
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
        
        if (row[0] === '주소') {
          // 주소는 전체 너비 사용
          doc.text(row[1], 50 + col1Width, y + 10, { width: doc.page.width - 80 - col1Width - 20 })
        } else {
          doc.text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
          
          // 세 번째 열 (라벨)
          if (row[2]) {
            doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
               .stroke(borderColor)
            doc.font('Helvetica-Bold')
               .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
            
            // 네 번째 열 (값)
            doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
               .stroke(borderColor)
            doc.font('Helvetica')
               .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
          }
        }
      })
      
      currentY += tableData.length * rowHeight + 30
      
      // 성적서 발급처 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 성적서 발급처', 40, currentY)
      
      currentY += 25
      
      const certData = [
        ['신청인', data.applicantName || '', 'E-mail', data.email || ''],
      ]
      
      certData.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
        
        doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
        
        doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
      })
      
      currentY += certData.length * rowHeight + 30
      
      // 교정 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .fillColor(primaryColor)
         .text('■ 교정 정보', 40, currentY)
      
      currentY += 25
      
      const calibInfo = [
        ['교정 주기', data.calibrationPeriod === 'national' ? '국가에서 정한 교정주기' : '자체설정주기', '접수 방법', 
         data.receptionMethod === 'visit' ? '방문' : 
         data.receptionMethod === 'delivery' ? '택배' :
         data.receptionMethod === 'pickup' ? '픽업' :
         data.receptionMethod === 'onsite' ? '출장' : '기타'],
      ]
      
      calibInfo.forEach((row, i) => {
        const y = currentY + (i * rowHeight)
        
        if (i % 2 === 0) {
          doc.rect(40, y, doc.page.width - 80, rowHeight)
             .fill(bgColor)
             .fillColor('#000000')
        }
        
        doc.rect(40, y, doc.page.width - 80, rowHeight)
           .stroke(borderColor)
        
        doc.rect(40, y, col1Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[0], 50, y + 10, { width: col1Width - 20 })
        
        doc.rect(40 + col1Width, y, col2Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[1], 50 + col1Width, y + 10, { width: col2Width - 20 })
        
        doc.rect(40 + col1Width + col2Width, y, col3Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica-Bold')
           .text(row[2], 50 + col1Width + col2Width, y + 10, { width: col3Width - 20 })
        
        doc.rect(40 + col1Width + col2Width + col3Width, y, col4Width, rowHeight)
           .stroke(borderColor)
        doc.font('Helvetica')
           .text(row[3], 50 + col1Width + col2Width + col3Width, y + 10, { width: col4Width - 20 })
      })
      
      currentY += calibInfo.length * rowHeight + 30
      
      // 기기 정보 (페이지 체크)
      if (currentY > doc.page.height - 150) {
        doc.addPage()
        currentY = 50
      }
      
      if (data.equipments && data.equipments.length > 0) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(primaryColor)
           .text('■ 기기 정보', 40, currentY)
        
        currentY += 25
        
        // 기기 헤더
        doc.rect(40, currentY, doc.page.width - 80, 25)
           .fill(primaryColor)
           .fillColor('#ffffff')
        
        doc.fontSize(9)
           .font('Helvetica-Bold')
           .text('No.', 50, currentY + 8, { width: 30 })
           .text('기기명', 90, currentY + 8, { width: 150 })
           .text('제조사', 250, currentY + 8, { width: 100 })
           .text('모델/규격', 360, currentY + 8, { width: 100 })
           .text('기기번호', 470, currentY + 8, { width: 80 })
        
        currentY += 25
        
        data.equipments.forEach((eq: any, index: number) => {
          if (currentY > doc.page.height - 100) {
            doc.addPage()
            currentY = 50
          }
          
          const y = currentY
          
          if (index % 2 === 0) {
            doc.rect(40, y, doc.page.width - 80, 30)
               .fill(bgColor)
          }
          
          doc.rect(40, y, doc.page.width - 80, 30)
             .stroke(borderColor)
          
          doc.fillColor('#000000')
             .font('Helvetica')
             .fontSize(9)
             .text(`${index + 1}`, 50, y + 10, { width: 30 })
             .text(eq.name || '', 90, y + 10, { width: 150 })
             .text(eq.manufacturer || '', 250, y + 10, { width: 100 })
             .text(eq.model || '', 360, y + 10, { width: 100 })
             .text(eq.serialNumber || '', 470, y + 10, { width: 80 })
          
          if (eq.isUncertified) {
            doc.fillColor('#dc2626')
               .fontSize(8)
               .text('[비공인]', 40 + doc.page.width - 130, y + 10)
          }
          
          currentY += 30
        })
      }
      
      // 고객 요구사항
      if (data.requirements) {
        if (currentY > doc.page.height - 150) {
          doc.addPage()
          currentY = 50
        }
        
        currentY += 20
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor(primaryColor)
           .text('■ 고객 요구사항', 40, currentY)
        
        currentY += 25
        
        doc.rect(40, currentY, doc.page.width - 80, 60)
           .stroke(borderColor)
        
        doc.fillColor('#000000')
           .font('Helvetica')
           .fontSize(9)
           .text(data.requirements, 50, currentY + 10, { 
             width: doc.page.width - 100,
             height: 50
           })
      }
      
      // 푸터 정보
      const footerY = doc.page.height - 80
      doc.rect(40, footerY, doc.page.width - 80, 40)
         .fill(bgColor)
         .fillColor('#000000')
      
      doc.fontSize(8)
         .text('본사: 경기 양주시 은현면 화합로 941번길 83 | Tel: 031-862-8556~7', 50, footerY + 10)
         .text('시험소: 경기 양주시 은현면 화합로 701-11 | Tel: 031-858-3012', 50, footerY + 25)
      
      doc.end()
    } catch (error) {
      console.error('[PDF Generation] Error in generateCalibrationPDF:', error)
      reject(error)
    }
  })
}
