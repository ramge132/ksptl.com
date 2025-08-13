import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'

// Vercel 환경에서 chromium 바이너리를 외부에서 다운로드
if (process.env.VERCEL_ENV) {
  chromium.setGraphicsMode = false;
}

const commonStyles = `
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    padding: 30px;
    background: white;
    color: #1a1a1a;
    font-size: 11px;
    line-height: 1.5;
  }
  
  .header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #2563eb;
  }
  
  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 5px;
  }
  
  .subtitle {
    font-size: 14px;
    color: #64748b;
  }
  
  .receipt-info {
    display: flex;
    justify-content: space-between;
    background: #f0f9ff;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 1px solid #bfdbfe;
  }
  
  .receipt-info div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .receipt-info label {
    font-weight: 600;
    color: #1e40af;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 13px;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 10px;
    padding: 6px 10px;
    background: linear-gradient(90deg, #eff6ff, transparent);
    border-left: 3px solid #2563eb;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;
  }
  
  th {
    background: #2563eb;
    color: white;
    padding: 8px;
    text-align: left;
    font-weight: 600;
    font-size: 11px;
  }
  
  td {
    padding: 8px;
    border: 1px solid #e5e7eb;
    font-size: 10px;
  }
  
  .label-cell {
    background: #f8fafc;
    font-weight: 600;
    color: #475569;
    width: 25%;
  }
  
  .checkbox-group {
    display: flex;
    gap: 20px;
    padding: 10px;
    background: #f8fafc;
    border-radius: 6px;
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .footer {
    margin-top: 30px;
    padding-top: 15px;
    border-top: 2px solid #e5e7eb;
    font-size: 9px;
    color: #64748b;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  .footer-section h3 {
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 8px;
  }
  
  .footer-section p {
    margin-bottom: 4px;
  }
`;

const generateHeader = (title: string) => `
  <div class="header">
    <h1>한국안전용품시험연구원</h1>
    <div class="subtitle">${title}</div>
  </div>
`;

const generateFooter = () => `
  <div class="footer">
    <div class="footer-grid">
      <div class="footer-section">
        <h3>본사</h3>
        <p><strong>주소:</strong> 경기 양주시 은현면 화합로 941번길 83</p>
        <p><strong>연락처:</strong> 031-862-8556~7</p>
      </div>
      <div class="footer-section">
        <h3>시험소</h3>
        <p><strong>주소:</strong> 경기 양주시 은현면 화합로 701-11</p>
        <p><strong>연락처:</strong> 031-858-3012</p>
      </div>
    </div>
  </div>
`;

// 교정 신청서 HTML 생성
function generateCalibrationHTML(data: any): string {
  const currentDate = new Date().toLocaleDateString('ko-KR')
  const receiptNo = `C-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  
  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <style>${commonStyles}</style>
    </head>
    <body>
      ${generateHeader('교정 신청서')}
      
      <div class="receipt-info">
        <div>
          <label>접수번호:</label>
          <span>${receiptNo}</span>
        </div>
        <div>
          <label>접수일자:</label>
          <span>${currentDate}</span>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">신청인 정보</div>
        <table>
          <tr>
            <td class="label-cell">신청인</td>
            <td>${data.applicantName || ''}</td>
            <td class="label-cell">이메일</td>
            <td>${data.email || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">휴대폰</td>
            <td colspan="3">${data.mobile || ''}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">신청업체 정보</div>
        <table>
          <tr>
            <td class="label-cell">업체명</td>
            <td colspan="3">${data.companyName || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">주소</td>
            <td colspan="3">${data.address || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">전화</td>
            <td>${data.phone || ''}</td>
            <td class="label-cell">팩스</td>
            <td>${data.fax || ''}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">교정 주기</div>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <span>${data.calibrationPeriod === 'national' ? '☑' : '☐'}</span>
            <span>국가에서 정한 교정주기</span>
          </div>
          <div class="checkbox-item">
            <span>${data.calibrationPeriod === 'custom' ? '☑' : '☐'}</span>
            <span>자체설정주기</span>
          </div>
        </div>
      </div>
      
      ${data.requirements ? `
      <div class="section">
        <div class="section-title">고객 요구사항</div>
        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 10px;">
          ${data.requirements}
        </div>
      </div>
      ` : ''}
      
      <div class="section">
        <div class="section-title">교정 대상 기기</div>
        <table>
          <thead>
            <tr>
              <th style="width: 50px;">번호</th>
              <th>기기명</th>
              <th>제작회사</th>
              <th>모델명</th>
              <th>기기번호</th>
              <th>규격</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            ${data.equipments?.map((eq: any, index: number) => `
              <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td>${eq.name || ''}</td>
                <td>${eq.manufacturer || ''}</td>
                <td>${eq.model || ''}</td>
                <td>${eq.serialNumber || ''}</td>
                <td>${eq.standard || ''}</td>
                <td>${eq.note || ''}</td>
              </tr>
            `).join('') || '<tr><td colspan="7" style="text-align: center;">등록된 기기가 없습니다.</td></tr>'}
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">접수 방법</div>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <span>${data.receptionMethod === 'visit' ? '☑' : '☐'}</span>
            <span>방문</span>
          </div>
          <div class="checkbox-item">
            <span>${data.receptionMethod === 'delivery' ? '☑' : '☐'}</span>
            <span>택배</span>
          </div>
          <div class="checkbox-item">
            <span>${data.receptionMethod === 'onsite' ? '☑' : '☐'}</span>
            <span>출장</span>
          </div>
          <div class="checkbox-item">
            <span>${data.receptionMethod === 'other' ? '☑' : '☐'}</span>
            <span>기타 ${data.receptionMethod === 'other' && data.receptionMethodOther ? `(${data.receptionMethodOther})` : ''}</span>
          </div>
        </div>
      </div>
      
      ${generateFooter()}
    </body>
    </html>
  `
  
  return html
}

// 시험 신청서 HTML 생성
function generateTestHTML(data: any): string {
  const currentDate = new Date().toLocaleDateString('ko-KR')
  const receiptNo = `T-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  
  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <style>
        ${commonStyles}
        .test-items-box {
          background: #f0f9ff;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          padding: 10px;
        }
        .test-item {
          padding: 5px 0;
          border-bottom: 1px dashed #e0e7ff;
        }
        .test-item:last-child {
          border-bottom: none;
        }
      </style>
    </head>
    <body>
      ${generateHeader('시험 신청서')}
      
      <div class="receipt-info">
        <div>
          <label>접수번호:</label>
          <span>${receiptNo}</span>
        </div>
        <div>
          <label>접수일자:</label>
          <span>${currentDate}</span>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">신청인 정보</div>
        <table>
          <tr>
            <td class="label-cell">신청인</td>
            <td>${data.applicantName || ''}</td>
            <td class="label-cell">이메일</td>
            <td>${data.email || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">휴대폰</td>
            <td colspan="3">${data.mobile || ''}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">신청업체 정보</div>
        <table>
          <tr>
            <td class="label-cell">업체명</td>
            <td colspan="3">${data.companyName || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">주소</td>
            <td colspan="3">${data.address || ''}</td>
          </tr>
          <tr>
            <td class="label-cell">전화</td>
            <td>${data.phone || ''}</td>
            <td class="label-cell">팩스</td>
            <td>${data.fax || ''}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">성적서 정보</div>
        <table>
          <tr>
            <td class="label-cell">성적서 타입</td>
            <td>${data.certificateType === 'official' ? '공인 성적서' : '비공인 성적서'}</td>
          </tr>
          <tr>
            <td class="label-cell">시험항목</td>
            <td>${data.testItem?.category || ''} - ${data.testItem?.name || ''}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">시료 정보</div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px;">번호</th>
              <th>시료명</th>
              <th>제조사</th>
              <th>모델/규격</th>
              <th style="width: 50px;">수량</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            ${data.samples?.map((sample: any, index: number) => `
              <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td>${sample.name || ''}</td>
                <td>${sample.manufacturer || ''}</td>
                <td>${sample.model || ''}</td>
                <td style="text-align: center;">1</td>
                <td>${sample.notes || ''}</td>
              </tr>
            `).join('') || '<tr><td colspan="6" style="text-align: center;">등록된 시료가 없습니다.</td></tr>'}
          </tbody>
        </table>
      </div>
      
      ${data.testItems && data.testItems.length > 0 ? `
      <div class="section">
        <div class="section-title">시험 항목</div>
        <div class="test-items-box">
          ${data.testItems.map((item: string, index: number) => `
            <div class="test-item">${index + 1}. ${item}</div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      ${data.requirements ? `
      <div class="section">
        <div class="section-title">고객 요구사항</div>
        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 10px;">
          ${data.requirements}
        </div>
      </div>
      ` : ''}
      
      ${generateFooter()}
    </body>
    </html>
  `
  
  return html
}

// Puppeteer를 사용한 PDF 생성
async function generatePDFFromHTML(html: string): Promise<Buffer> {
  let browser;
  
  try {
    console.log('Starting PDF generation...');
    console.log('Environment:', process.env.VERCEL_ENV ? 'Vercel' : 'Local');
    
    if (process.env.VERCEL_ENV || process.env.NODE_ENV === 'production') {
      // Production environment on Vercel
      console.log('Using Chromium for production');
      
      try {
        // Vercel 환경에서 chromium 바이너리 경로 설정
        // 외부 URL에서 chromium 다운로드
        const executablePath = await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v138.0.2/chromium-v138.0.2-pack.tar'
        );
        console.log('Chromium executable path:', executablePath);
        
        // Chromium 설정 최적화
        browser = await puppeteer.launch({
          args: chromium.args,
          executablePath: executablePath,
          headless: true,
        });
      } catch (chromiumError: any) {
        console.error('Chromium launch error:', chromiumError);
        
        // Fallback: chromium 없이 PDF 생성 시도
        console.log('Attempting fallback PDF generation without chromium...');
        throw new Error('PDF generation unavailable in production. Please contact support.');
      }
    } else {
      // Local development environment
      console.log('Using local Puppeteer for development');
      const puppeteer_dev = require('puppeteer');
      browser = await puppeteer_dev.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    console.log('Browser launched successfully');
    const page = await browser.newPage();
    
    // 타임아웃 설정
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    });
    
    console.log('HTML content set');
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    console.log('PDF generated, size:', pdfBuffer.length);
    
    await browser.close();
    console.log('Browser closed');
    
    return Buffer.from(pdfBuffer);
  } catch (error: any) {
    console.error('PDF generation error - Details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    throw error;
  }
}

// 교정 신청서 PDF 생성
export async function generateCalibrationPDF(data: any): Promise<Buffer> {
  const html = generateCalibrationHTML(data);
  return generatePDFFromHTML(html);
}

// 시험 신청서 PDF 생성
export async function generateTestPDF(data: any): Promise<Buffer> {
  const html = generateTestHTML(data);
  return generatePDFFromHTML(html);
}
