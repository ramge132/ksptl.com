# Railway 환경 변수 설정 가이드

## 🚨 현재 오류 원인
`Missing NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity 프로젝트 ID가 설정되지 않음

## 📋 Railway에서 환경 변수 설정하기

### 1단계: Railway Dashboard 접속
1. https://railway.app 로그인
2. 배포한 프로젝트 선택

### 2단계: Variables 탭 이동
1. 프로젝트 페이지에서 **Variables** 탭 클릭
2. **Add Variable** 버튼 클릭

### 3단계: 필수 환경 변수 추가

아래 환경 변수를 하나씩 추가하세요:

```bash
# Sanity 설정 (필수)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# 이메일 설정 (필수)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RECIPIENT_EMAIL=yukwho@hanmail.net

# 관리자 패스워드 (필수)
ADMIN_PASSWORD=your_admin_password

# 네이버 지도 (선택)
NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID=your_naver_client_id
NAVER_MAP_CLIENT_SECRET=your_naver_secret
```

### 4단계: Vercel에서 값 가져오기

Vercel에서 기존 환경 변수 값을 복사하려면:

1. Vercel Dashboard → Settings → Environment Variables
2. 각 변수의 값을 복사
3. Railway에 붙여넣기

### 5단계: 재배포

환경 변수 추가 후:
1. Railway가 자동으로 재배포 시작
2. 또는 **Deploy** 버튼 클릭하여 수동 재배포

## 🔍 Sanity 프로젝트 ID 찾기

### 방법 1: Sanity Studio에서
1. https://www.sanity.io/manage 로그인
2. 프로젝트 선택
3. Project ID 복사

### 방법 2: 로컬 파일에서
`.env.local` 파일 확인:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=여기에_있는_값
```

## ✅ 환경 변수 체크리스트

- [ ] NEXT_PUBLIC_SANITY_PROJECT_ID
- [ ] NEXT_PUBLIC_SANITY_DATASET
- [ ] SANITY_API_TOKEN
- [ ] RESEND_API_KEY
- [ ] RECIPIENT_EMAIL
- [ ] ADMIN_PASSWORD
- [ ] NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID (선택)
- [ ] NAVER_MAP_CLIENT_SECRET (선택)

## 🚀 빠른 설정 (복사용)

Railway Variables 페이지에서 **RAW Editor** 모드로 전환 후 붙여넣기:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
RESEND_API_KEY=re_xxxxxxxxxxxxx
RECIPIENT_EMAIL=yukwho@hanmail.net
ADMIN_PASSWORD=your_password
```

## 🔧 추가 설정 (Railway)

### Node 버전 지정 (package.json)
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 빌드 명령 커스터마이징
Railway Settings → Build Command:
```bash
npm install && npm run build
```

### 시작 명령
Railway Settings → Start Command:
```bash
npm start
```

## 🎯 배포 성공 확인

1. **Build Logs** 확인
   - "Build successful" 메시지
   - 에러 없음

2. **Deploy Logs** 확인
   - "Ready on port 3000" 메시지
   - 서버 정상 작동

3. **도메인 접속**
   - Railway 제공 도메인으로 테스트
   - 커스텀 도메인 설정

## 💡 팁

- 환경 변수 변경 시 자동 재배포됨
- 민감한 정보는 Railway Secrets 사용
- 개발/프로덕션 환경 분리 가능

## 🆘 문제 해결

### 여전히 오류가 발생한다면:

1. **모든 환경 변수가 설정되었는지 확인**
   ```bash
   # Railway CLI로 확인
   railway variables
   ```

2. **빌드 캐시 삭제**
   - Settings → Clear build cache

3. **강제 재배포**
   - Deployments → Trigger deploy

4. **로그 확인**
   - Build logs와 Deploy logs 모두 확인

---

환경 변수 설정 후 재배포하면 정상 작동합니다! 🚀
