# Railway 배포 가이드 - PDF 문제 완전 해결

## 🚀 Railway 장점
- **제한 없음**: 파일 크기, PDF 생성 모두 자유
- **월 $5**: 시작 가격
- **빠른 배포**: GitHub 연동으로 자동 배포
- **Node.js 완전 지원**: pdfkit, puppeteer 모두 작동

## 📋 배포 단계

### 1. Railway 가입
1. https://railway.app 접속
2. GitHub로 로그인

### 2. 프로젝트 생성
```bash
# Railway CLI 설치 (선택사항)
npm install -g @railway/cli

# 로그인
railway login

# 프로젝트 생성
railway init
```

### 3. GitHub 연동
1. Railway Dashboard → New Project
2. Deploy from GitHub repo 선택
3. `ramge132/ksptl.com` 저장소 선택

### 4. 환경 변수 설정
Railway Dashboard → Variables에서:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
RESEND_API_KEY=re_xxxxxxxxxxxxx
RECIPIENT_EMAIL=yukwho@hanmail.net
ADMIN_PASSWORD=your_password
```

### 5. 빌드 명령 설정
```json
{
  "build": "npm run build",
  "start": "npm start"
}
```

### 6. 도메인 연결
1. Settings → Domains
2. Custom Domain 추가: `ksptl.com`
3. DNS 설정:
   - Type: CNAME
   - Name: @
   - Value: [Railway에서 제공하는 URL]

## 🎯 완료 후 장점
- ✅ PDF 생성 완벽 작동
- ✅ 파일 크기 제한 없음
- ✅ 한글 폰트 설치 가능
- ✅ Puppeteer 사용 가능
- ✅ 더 빠른 응답 속도

## 💰 비용
- Starter: $5/월 (충분함)
- Pro: $20/월 (트래픽 많을 때)

---

# Render 배포 가이드

## 🚀 Render 장점
- **무료 플랜** 제공 (제한적)
- **유료 $7/월**부터
- **Docker 지원**
- **자동 SSL**

## 📋 배포 단계

### 1. Render 가입
https://render.com

### 2. Web Service 생성
1. New → Web Service
2. GitHub 저장소 연결
3. 환경 설정:
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### 3. 환경 변수 설정
Environment → Add Environment Variable

### 4. 도메인 설정
Settings → Custom Domain

## 💰 비용
- Free: 제한적 (750시간/월)
- Starter: $7/월
- Pro: $25/월
