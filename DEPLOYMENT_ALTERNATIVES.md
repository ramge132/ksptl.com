# Vercel 대체 배포 옵션 가이드

## 문제 상황
- Vercel에서 PDF 생성 실패
- 이메일 첨부 파일 전송 실패  
- "No recipients defined" 에러 발생

## 🎯 해결책 1: Resend 이메일 서비스 사용 (권장)

### 1. Resend 설정
```bash
# 1. Resend 가입: https://resend.com
# 2. API Key 발급
# 3. 도메인 인증 (ksptl.com)

# 패키지 설치
npm install resend

# 환경 변수 설정 (.env.local)
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 2. 도메인 설정 (DNS 레코드 추가)
```
Type: MX
Name: send
Value: feedback-smtp.us-west-2.amazonses.com
Priority: 10

Type: TXT  
Name: resend._domainkey
Value: (Resend에서 제공하는 값)
```

### 3. API 경로 변경
```javascript
// ApplicationForm.tsx에서
const response = await fetch('/api/submit-test-resend', {
  method: 'POST',
  body: formData
})
```

## 🎯 해결책 2: Netlify로 이전

### 장점
- 더 나은 서버리스 함수 지원
- 파일 처리 제한이 덜 엄격
- 무료 플랜도 충분

### 배포 방법
```bash
# 1. Netlify CLI 설치
npm install -g netlify-cli

# 2. Next.js 어댑터 설치
npm install @netlify/plugin-nextjs

# 3. netlify.toml 생성
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  publish = ".next"

[functions]
  node_bundler = "esbuild"
  included_files = ["lib/**", "public/**"]
EOF

# 4. 배포
netlify deploy --prod
```

## 🎯 해결책 3: Railway 또는 Render 사용

### Railway 배포
```bash
# 1. Railway 가입: https://railway.app
# 2. GitHub 연동
# 3. 환경 변수 설정
# 4. 자동 배포
```

### Render 배포
```bash
# 1. Render 가입: https://render.com
# 2. Web Service 생성
# 3. GitHub 연동
# 4. 환경 변수 설정
# Build Command: npm run build
# Start Command: npm start
```

## 🎯 해결책 4: 자체 VPS 서버 구축

### AWS EC2 / Lightsail
```bash
# Ubuntu 22.04 인스턴스 생성
sudo apt update
sudo apt install nodejs npm nginx

# PM2로 Next.js 실행
npm install -g pm2
npm run build
pm2 start npm --name "ksptl" -- start
```

### 카페24 / 가비아 호스팅
- Node.js 지원 호스팅 선택
- Git 배포 또는 FTP 업로드

## 🎯 해결책 5: 이메일/PDF 전용 백엔드 서버

### Express.js 백엔드 서버 생성
```javascript
// backend/server.js
const express = require('express')
const nodemailer = require('nodemailer')
const PDFDocument = require('pdfkit')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// 이메일 & PDF 처리
app.post('/api/submit', async (req, res) => {
  // PDF 생성
  const doc = new PDFDocument()
  
  // 이메일 발송
  const transporter = nodemailer.createTransport({
    service: 'Naver', // 네이버 메일 사용
    auth: {
      user: 'yukwho@naver.com',
      pass: process.env.NAVER_PASS
    }
  })
  
  // 처리 로직...
})

app.listen(3001)
```

### Heroku에 백엔드 배포
```bash
# Heroku CLI 설치 후
heroku create ksptl-backend
git push heroku main
```

## 🎯 해결책 6: 네이버 웍스 API 사용

### 네이버 웍스 설정
```javascript
// 네이버 웍스는 기업용 메일로 API 지원
const naverWorks = {
  clientId: process.env.NAVER_WORKS_CLIENT_ID,
  clientSecret: process.env.NAVER_WORKS_SECRET,
  // API를 통한 메일 발송
}
```

## 🔧 즉시 적용 가능한 임시 해결책

### 1. 폼 데이터만 저장하고 수동 처리
```javascript
// Supabase나 Firebase에 데이터 저장
const { data, error } = await supabase
  .from('applications')
  .insert([formData])

// 관리자 페이지에서 확인 후 수동 처리
```

### 2. Google Forms + Apps Script 활용
- Google Forms로 신청 받기
- Apps Script로 자동 이메일 발송
- PDF는 Google Docs로 생성

### 3. Webhook 서비스 활용
```javascript
// Zapier, Make(Integromat) 사용
await fetch('https://hooks.zapier.com/hooks/catch/xxxxx', {
  method: 'POST',
  body: JSON.stringify(formData)
})
// Zapier에서 Gmail, Google Drive 연동
```

## 📊 비교표

| 서비스 | 비용 | PDF 지원 | 파일 첨부 | 난이도 |
|-------|------|---------|----------|--------|
| Vercel + Resend | $20/월 | ✅ | ✅ | 쉬움 |
| Netlify | $19/월 | ✅ | ✅ | 쉬움 |
| Railway | $5/월~ | ✅ | ✅ | 보통 |
| VPS (AWS/카페24) | $10/월~ | ✅ | ✅ | 어려움 |
| Google Forms | 무료 | ⚠️ | ❌ | 매우 쉬움 |

## ⚡ 권장 조합

### 단기 해결책 (1-2일)
1. **Resend API** 사용 (이메일 문제 해결)
2. **PDF는 HTML로 대체** (브라우저에서 인쇄)

### 중기 해결책 (1주일)
1. **Netlify로 마이그레이션**
2. 또는 **Railway 배포**

### 장기 해결책 (2주일)
1. **전용 백엔드 서버 구축**
2. **AWS Lambda + S3** 조합

## 🚀 즉시 실행 가능한 명령어

```bash
# 1. Resend 설치 및 설정
npm install resend

# 2. 환경 변수 업데이트
echo "RESEND_API_KEY=re_your_api_key" >> .env.local

# 3. 테스트
npm run dev

# 4. Vercel 재배포
git add .
git commit -m "Add Resend email service"
git push
```

## 📞 지원 연락처

문제 해결이 어려우시면 아래 서비스들의 한국 지원팀에 문의하세요:

- **AWS 한국 지원**: 02-1544-8667
- **네이버 클라우드**: 1544-5876
- **카페24**: 1588-4757

## 💡 최종 추천

**즉시 적용**: Resend API (5분 설정)
**1주일 내**: Netlify 마이그레이션
**최적 솔루션**: Railway + Resend 조합
