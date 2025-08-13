export const generateEmailTemplate = (title: string, content: string, isAdmin: boolean = false) => {
  const headerColor = isAdmin ? '#3b82f6' : '#10b981'
  const logo = 'https://ksptl.com/quro_logo.png'
  
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${headerColor} 0%, ${headerColor}dd 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                한국안전용품시험연구원
              </h1>
              <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                Korea Safety Products Testing Laboratory
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                      <strong>(주)큐로</strong>
                    </p>
                    <p style="margin: 0 0 4px 0; color: #9ca3af; font-size: 13px;">
                      본사: 경기 양주시 은현면 화합로 941번길 83
                    </p>
                    <p style="margin: 0 0 4px 0; color: #9ca3af; font-size: 13px;">
                      시험소: 경기 양주시 은현면 화합로 701-11
                    </p>
                    <p style="margin: 0 0 12px 0; color: #9ca3af; font-size: 13px;">
                      TEL: 031-862-8556~7 | FAX: 031-862-8558
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      © 2025 한국안전용품시험연구원. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export const formatTableRow = (label: string, value: string | undefined, highlight: boolean = false) => {
  const bgColor = highlight ? '#eff6ff' : '#ffffff'
  const labelColor = highlight ? '#1e40af' : '#374151'
  
  return `
    <tr>
      <td style="padding: 12px 16px; background-color: ${bgColor}; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: ${labelColor}; font-weight: 600; width: 35%;">
        ${label}
      </td>
      <td style="padding: 12px 16px; background-color: ${bgColor}; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">
        ${value || '-'}
      </td>
    </tr>
  `
}

export const formatSection = (title: string, icon: string, content: string) => {
  return `
    <div style="margin-bottom: 24px;">
      <h3 style="margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3b82f6; color: #1f2937; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
        <span style="display: inline-block; margin-right: 8px;">${icon}</span>
        ${title}
      </h3>
      ${content}
    </div>
  `
}

export const formatEquipmentCard = (equipment: any, index: number) => {
  return `
    <div style="background: linear-gradient(to right, #f0f9ff, #ffffff); border: 1px solid #dbeafe; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="display: inline-block; width: 24px; height: 24px; background-color: #3b82f6; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 8px;">
          ${index}
        </span>
        <strong style="color: #1f2937; font-size: 15px;">${equipment.name}</strong>
      </div>
      <table style="width: 100%; font-size: 13px;">
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">제작회사:</td>
          <td style="color: #374151; padding: 2px 0;">${equipment.manufacturer}</td>
        </tr>
        ${equipment.model ? `
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">모델/규격:</td>
          <td style="color: #374151; padding: 2px 0;">${equipment.model}</td>
        </tr>
        ` : ''}
        ${equipment.serialNumber ? `
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">기기번호:</td>
          <td style="color: #374151; padding: 2px 0;">${equipment.serialNumber}</td>
        </tr>
        ` : ''}
        ${equipment.isUncertified ? `
        <tr>
          <td colspan="2" style="padding: 4px 0;">
            <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
              비공인 교정
            </span>
          </td>
        </tr>
        ` : ''}
      </table>
    </div>
  `
}

export const formatSampleCard = (sample: any, index: number) => {
  return `
    <div style="background: linear-gradient(to right, #f0fdf4, #ffffff); border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="display: inline-block; width: 24px; height: 24px; background-color: #10b981; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold; margin-right: 8px;">
          ${index}
        </span>
        <strong style="color: #1f2937; font-size: 15px;">${sample.name}</strong>
      </div>
      <table style="width: 100%; font-size: 13px;">
        <tr>
          <td style="color: #6b7280; padding: 2px 0; width: 30%;">제조사:</td>
          <td style="color: #374151; padding: 2px 0;">${sample.manufacturer}</td>
        </tr>
        ${sample.model ? `
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">모델명:</td>
          <td style="color: #374151; padding: 2px 0;">${sample.model}</td>
        </tr>
        ` : ''}
        ${sample.notes ? `
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">비고:</td>
          <td style="color: #374151; padding: 2px 0;">${sample.notes}</td>
        </tr>
        ` : ''}
        ${sample.serialNumber ? `
        <tr>
          <td style="color: #6b7280; padding: 2px 0;">시료번호:</td>
          <td style="color: #374151; padding: 2px 0;">${sample.serialNumber}</td>
        </tr>
        ` : ''}
      </table>
    </div>
  `
}

export const formatAlert = (type: 'info' | 'success' | 'warning', title: string, message: string) => {
  const colors = {
    info: { bg: '#eff6ff', border: '#dbeafe', text: '#1e40af', icon: 'ℹ️' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', icon: '✅' },
    warning: { bg: '#fef3c7', border: '#fde68a', text: '#92400e', icon: '⚠️' }
  }
  
  const color = colors[type]
  
  return `
    <div style="background-color: ${color.bg}; border: 1px solid ${color.border}; border-radius: 8px; padding: 16px; margin: 24px 0;">
      <div style="display: flex; align-items: flex-start;">
        <span style="font-size: 20px; margin-right: 12px;">${color.icon}</span>
        <div>
          <h4 style="margin: 0 0 4px 0; color: ${color.text}; font-size: 15px; font-weight: 600;">
            ${title}
          </h4>
          <p style="margin: 0; color: ${color.text}; font-size: 14px; opacity: 0.9;">
            ${message}
          </p>
        </div>
      </div>
    </div>
  `
}

export const formatButton = (text: string, url: string, primary: boolean = true) => {
  const bgColor = primary ? '#3b82f6' : '#ffffff'
  const textColor = primary ? '#ffffff' : '#3b82f6'
  const border = primary ? 'none' : '2px solid #3b82f6'
  
  return `
    <div style="text-align: center; margin: 24px 0;">
      <a href="${url}" style="display: inline-block; background-color: ${bgColor}; color: ${textColor}; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; border: ${border};">
        ${text}
      </a>
    </div>
  `
}
