// PDF를 생성하고 클라우드에 저장 후 링크만 이메일로 전송하는 방식

import { generateTestPDF, generateCalibrationPDF } from './pdf-generator-simple'

// 옵션 1: Supabase Storage 사용 (무료 1GB)
export async function uploadPDFToSupabase(pdfBuffer: Buffer, filename: string): Promise<string> {
  // Supabase 설정
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  // 파일 업로드
  const formData = new FormData()
  const blob = new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' })
  formData.append('file', blob, filename)
  
  const response = await fetch(`${supabaseUrl}/storage/v1/object/pdfs/${filename}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: formData
  })
  
  if (response.ok) {
    // 공개 URL 반환
    return `${supabaseUrl}/storage/v1/object/public/pdfs/${filename}`
  }
  
  throw new Error('PDF upload failed')
}

// 옵션 2: 임시 파일 시스템 사용 (Vercel에서 /tmp 사용 가능)
export async function savePDFTemporarily(pdfBuffer: Buffer, filename: string): Promise<string> {
  const fs = require('fs').promises
  const path = require('path')
  
  // /tmp 디렉토리에 저장 (Vercel에서 512MB까지 가능)
  const tmpPath = path.join('/tmp', filename)
  await fs.writeFile(tmpPath, pdfBuffer)
  
  // 다운로드 URL 생성 (별도 API 엔드포인트 필요)
  return `/api/download-pdf?file=${filename}`
}

// 옵션 3: Base64 URL로 변환 (작은 PDF만 가능)
export function createDataURL(pdfBuffer: Buffer): string {
  const base64 = pdfBuffer.toString('base64')
  return `data:application/pdf;base64,${base64}`
}

// 이메일에 PDF 링크 포함하는 HTML
export function generateEmailWithPDFLink(pdfUrl: string): string {
  return `
    <div style="margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
      <h3 style="margin: 0 0 10px 0;">📄 신청서 PDF</h3>
      <p style="margin: 0 0 10px 0;">신청서가 PDF로 생성되었습니다.</p>
      <a href="${pdfUrl}" 
         style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;"
         download>
        PDF 다운로드
      </a>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">
        * 링크는 7일간 유효합니다.
      </p>
    </div>
  `
}
