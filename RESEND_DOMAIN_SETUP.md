# Resend 도메인 인증 설정 가이드

## 📋 단계별 설정 방법

### 1단계: Resend에서 도메인 추가

Resend Dashboard의 "Add Domain" 화면에서:

1. **Name**: `ksptl.com` 입력
2. **Region**: `Tokyo (ap-northeast-1)` 선택 (한국과 가장 가까운 리전)
3. **Custom Return-Path**: `send` (기본값 유지)
4. **Add Domain** 버튼 클릭

### 2단계: DNS 레코드 확인

도메인 추가 후 표시되는 DNS 레코드:

```
1. SPF 레코드 (TXT)
   Type: TXT
   Name: @ 또는 비워두기
   Value: v=spf1 include:amazonses.com ~all
   TTL: 3600

2. DKIM 레코드 (CNAME) 
   Type: CNAME
   Name: resend._domainkey
   Value: [Resend에서 제공하는 값].dkim.amazonses.com
   TTL: 3600

3. Return-Path (MX) - 선택사항
   Type: MX
   Name: send
   Value: feedback-smtp.us-west-2.amazonses.com
   Priority: 10
   TTL: 3600
```

### 3단계: 도메인 업체별 DNS 설정

#### 🔵 가비아 (Gabia)
1. My가비아 로그인
2. 도메인 관리 → DNS 정보
3. DNS 레코드 추가
   - SPF: 타입 TXT, 호스트 @, 값 입력
   - DKIM: 타입 CNAME, 호스트 resend._domainkey, 값 입력
   - MX: 타입 MX, 호스트 send, 값 입력, 우선순위 10

#### 🟢 후이즈 (Whois)
1. 도메인 관리 → 네임서버/DNS 관리
2. DNS 레코드 관리 → 레코드 추가
3. 각 레코드 타입별로 추가

#### 🟠 카페24
1. 나의 서비스 관리 → 도메인 → DNS 관리
2. DNS 레코드 추가
3. 각 레코드 입력

#### 🔴 가비아 DNS Plus
1. DNS Plus 관리 → 레코드 관리
2. 레코드 추가 버튼 클릭
3. 각 레코드 타입 선택 후 값 입력

### 4단계: DNS 전파 대기

- DNS 레코드가 전파되는데 5분~72시간 소요
- 보통 30분 이내 완료

### 5단계: Resend에서 인증 확인

1. Resend Dashboard → Domains
2. `ksptl.com` 찾기
3. **Verify DNS Records** 클릭
4. 상태가 "Verified" ✅로 변경 확인

### 6단계: 코드 테스트

#### A. 인증 완료 후 사용
```javascript
from: '한국안전용품시험연구원 <no-reply@ksptl.com>'
```

#### B. 인증 대기 중 임시 사용
```javascript
from: 'onboarding@resend.dev'  // Resend 테스트 도메인
```

## 🧪 DNS 레코드 확인 방법

### Windows CMD
```cmd
nslookup -type=TXT ksptl.com
nslookup -type=CNAME resend._domainkey.ksptl.com
nslookup -type=MX send.ksptl.com
```

### 온라인 도구
- https://mxtoolbox.com/SuperTool.aspx
- https://dnschecker.org/

## 🔧 테스트 이메일 발송

### 로컬 테스트
```bash
# 개발 서버 실행
npm run dev

# 테스트 API 호출
curl -X POST http://localhost:3000/api/submit-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "company": "테스트 회사",
    "name": "테스트",
    "phone": "010-1234-5678", 
    "email": "your-email@gmail.com",
    "inquiryType": "other",
    "message": "도메인 인증 테스트"
  }'
```

## ⚠️ 주의사항

### 1. 기존 SPF 레코드가 있는 경우
```
# 잘못된 예 (덮어쓰기)
v=spf1 include:amazonses.com ~all

# 올바른 예 (병합)
v=spf1 include:amazonses.com include:_spf.google.com ~all
```

### 2. CNAME 레코드 입력 시
- 끝에 점(.)을 붙이지 않기
- 전체 도메인 입력 (resend._domainkey.ksptl.com X)
- 호스트명만 입력 (resend._domainkey O)

### 3. 인증 실패 시
- DNS 레코드 값 복사 시 공백 확인
- TTL을 낮춰서 (300) 빠른 전파
- 24시간 후 재시도

## 📊 인증 상태 확인

### Resend Dashboard 상태
- 🟡 **Pending**: DNS 레코드 대기 중
- 🔵 **Verifying**: 인증 진행 중  
- ✅ **Verified**: 인증 완료
- ❌ **Failed**: 인증 실패

### 인증 완료 시 표시
```
Domain: ksptl.com
Status: Verified ✅
Region: Tokyo (ap-northeast-1)
SPF: ✅ Verified
DKIM: ✅ Verified
```

## 🚀 다음 단계

### 1. Vercel 환경 변수 설정
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
RECIPIENT_EMAIL=yukwho@hanmail.net
```

### 2. 배포
```bash
git add .
git commit -m "feat: Add Resend domain authentication"
git push
```

### 3. 프로덕션 테스트
- https://ksptl.com/contact 에서 문의 테스트
- 이메일 수신 확인

## 🆘 문제 해결

### Q: DNS 레코드를 추가했는데 인증이 안 돼요
A: DNS 전파에 최대 72시간이 걸릴 수 있습니다. 보통 30분 이내 완료됩니다.

### Q: "Domain not verified" 에러가 나와요
A: 인증 대기 중에는 `onboarding@resend.dev` 사용하세요.

### Q: SPF 레코드 충돌이 발생해요
A: 기존 SPF 레코드와 병합해야 합니다. 모든 include를 하나의 레코드에 포함시키세요.

### Q: DKIM 레코드가 인증되지 않아요
A: CNAME 레코드의 호스트명이 정확한지 확인하세요. `resend._domainkey`만 입력해야 합니다.

## ✅ 체크리스트

- [ ] Resend에서 도메인 추가 완료
- [ ] SPF (TXT) 레코드 추가
- [ ] DKIM (CNAME) 레코드 추가  
- [ ] MX 레코드 추가 (선택)
- [ ] DNS 전파 대기 (5분~72시간)
- [ ] Resend에서 인증 확인
- [ ] 테스트 이메일 발송
- [ ] 프로덕션 배포

## 📞 도메인 업체 고객센터

- **가비아**: 02-3788-0900
- **후이즈**: 1588-4259
- **카페24**: 1588-4757
- **호스팅KR**: 1544-3037

도메인 업체를 알려주시면 더 구체적인 설정 방법을 안내해드리겠습니다!
