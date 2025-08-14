const PDFDocument = require('pdfkit')

// PDF 생성을 위한 간단한 라이브러리 사용
export async function generateTestPDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      console.log('[PDF Generation] Starting test PDF generation...')
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
          Title: 'Test Application Form',
          Author: 'KSPTL'
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
      
      // 헤더
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .text('Korea Safety Product Testing Lab', { align: 'center' })
      doc.fontSize(14)
         .font('Helvetica')
         .text('Test Application Form', { align: 'center' })
      doc.moveDown()
      
      // 접수 정보
      const receiptNo = `T-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      const currentDate = new Date().toISOString().split('T')[0]
      
      doc.fontSize(10)
         .text(`Receipt No: ${receiptNo}`, 50)
         .text(`Date: ${currentDate}`)
      doc.moveDown()
      
      // 신청인 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Applicant Information', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`Name: ${data.applicantName || ''}`)
      doc.text(`Email: ${data.email || ''}`)
      doc.text(`Mobile: ${data.mobile || ''}`)
      doc.moveDown()
      
      // 신청업체 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Company Information', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`Company: ${data.companyName || ''}`)
      doc.text(`Address: ${data.address || ''}`)
      doc.text(`Phone: ${data.phone || ''}`)
      doc.text(`Fax: ${data.fax || ''}`)
      doc.moveDown()
      
      // 시험 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Test Information', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`Certificate Type: ${data.certificateType === 'official' ? 'Official' : 'Unofficial'}`)
      doc.text(`Test Item: ${data.testItem?.category || ''} - ${data.testItem?.name || ''}`)
      doc.moveDown()
      
      // 시료 정보
      if (data.samples && data.samples.length > 0) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .text('Sample Information', { underline: true })
           .font('Helvetica')
           .fontSize(10)
        
        data.samples.forEach((sample: any, index: number) => {
          doc.text(`${index + 1}. ${sample.name || ''} (${sample.manufacturer || ''})`)
        })
        doc.moveDown()
      }
      
      // 시험 항목
      if (data.testItems && data.testItems.length > 0) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .text('Test Items', { underline: true })
           .font('Helvetica')
           .fontSize(10)
        
        data.testItems.forEach((item: string, index: number) => {
          doc.text(`${index + 1}. ${item}`)
        })
        doc.moveDown()
      }
      
      // 고객 요구사항
      if (data.requirements) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .text('Requirements', { underline: true })
           .font('Helvetica')
           .fontSize(10)
        doc.text(data.requirements)
        doc.moveDown()
      }
      
      // 푸터
      doc.fontSize(8)
         .text('Head Office: 83, Hwahap-ro 941beon-gil, Eunhyeon-myeon, Yangju-si, Gyeonggi-do | 031-862-8556~7', 50, doc.page.height - 100)
         .text('Test Lab: 701-11, Hwahap-ro, Eunhyeon-myeon, Yangju-si, Gyeonggi-do | 031-858-3012', 50, doc.page.height - 85)
      
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
        margin: 50,
        info: {
          Title: 'Calibration Application Form',
          Author: 'KSPTL'
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
      
      // 헤더
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .text('Korea Safety Product Testing Lab', { align: 'center' })
      doc.fontSize(14)
         .font('Helvetica')
         .text('Calibration Application Form', { align: 'center' })
      doc.moveDown()
      
      // 접수 정보
      const receiptNo = `C-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
      const currentDate = new Date().toISOString().split('T')[0]
      
      doc.fontSize(10)
         .text(`Receipt No: ${receiptNo}`, 50)
         .text(`Date: ${currentDate}`)
      doc.moveDown()
      
      // 신청인 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Applicant Information', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`Name: ${data.applicantName || ''}`)
      doc.text(`Email: ${data.email || ''}`)
      doc.text(`Mobile: ${data.mobile || ''}`)
      doc.moveDown()
      
      // 신청업체 정보
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Company Information', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`Company: ${data.companyName || ''}`)
      doc.text(`Address: ${data.address || ''}`)
      doc.text(`Phone: ${data.phone || ''}`)
      doc.text(`Fax: ${data.fax || ''}`)
      doc.moveDown()
      
      // 교정 주기
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Calibration Period', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      doc.text(`${data.calibrationPeriod === 'national' ? 'National Standard Period' : 'Custom Period'}`)
      doc.moveDown()
      
      // 기기 정보
      if (data.equipments && data.equipments.length > 0) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .text('Equipment Information', { underline: true })
           .font('Helvetica')
           .fontSize(10)
        
        data.equipments.forEach((eq: any, index: number) => {
          doc.text(`${index + 1}. ${eq.name || ''} (${eq.manufacturer || ''}) - ${eq.model || ''}`)
          if (eq.serialNumber) doc.text(`   S/N: ${eq.serialNumber}`)
        })
        doc.moveDown()
      }
      
      // 고객 요구사항
      if (data.requirements) {
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .text('Requirements', { underline: true })
           .font('Helvetica')
           .fontSize(10)
        doc.text(data.requirements)
        doc.moveDown()
      }
      
      // 접수 방법
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text('Reception Method', { underline: true })
         .font('Helvetica')
         .fontSize(10)
      
      const receptionMethod = data.receptionMethod === 'visit' ? 'Visit' :
                             data.receptionMethod === 'delivery' ? 'Delivery' :
                             data.receptionMethod === 'onsite' ? 'On-site' :
                             data.receptionMethod === 'other' ? `Other (${data.receptionMethodOther || ''})` : ''
      doc.text(receptionMethod)
      doc.moveDown()
      
      // 푸터
      doc.fontSize(8)
         .text('Head Office: 83, Hwahap-ro 941beon-gil, Eunhyeon-myeon, Yangju-si, Gyeonggi-do | 031-862-8556~7', 50, doc.page.height - 100)
         .text('Test Lab: 701-11, Hwahap-ro, Eunhyeon-myeon, Yangju-si, Gyeonggi-do | 031-858-3012', 50, doc.page.height - 85)
      
      doc.end()
    } catch (error) {
      console.error('[PDF Generation] Error in generateCalibrationPDF:', error)
      reject(error)
    }
  })
}
