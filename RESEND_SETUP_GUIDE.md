# Resend 이메일 서비스 설정 가이드

## 🚀 빠른 설정 (5분)

### 1. Resend 가입 및 API 키 발급
1. [Resend 웹사이트](https://resend.com) 접속
2. 회원가입 (GitHub 계정으로 가능)
3. Dashboard → API Keys → Create API Key
4. API 키 복사 (re_로 시작하는 문자열)

### 2. 도메인 인증 (ksptl.com)
1. Resend Dashboard → Domains → Add Domain
2. 도메인 입력: `ksptl.com`
3. DNS 레코드 추가 (도메인 업체 관리 페이지에서):

```
Type: MX
Name: send
Value: feedback-smtp.us-west-2.amazonses.com
Priority: 10

Type: TXT
Name: resend._domainkey
Value: [Resend에서 제공하는 값]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none;
```

4. Verify Domain 클릭 (최대 72시간 소요, 보통 몇 분 내 완료)

### 3. 환경 변수 설정

#### 로컬 개발 (.env.local)
```bash
# Resend API
RESEND_API_KEY=re_xxxxxxxxxxxxx

# 수신 이메일
RECIPIENT_EMAIL=yukwho@hanmail.net
```

#### Vercel 환경 변수
1. Vercel Dashboard → Settings → Environment Variables
2. 다음 변수 추가:
   - `RESEND_API_KEY`: Resend API 키
   - `RECIPIENT_EMAIL`: 관리자 이메일

### 4. 테스트
```bash
# 로컬 테스트
npm run dev

# 테스트 이메일 발송
curl -X POST http://localhost:3000/api/submit-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "company": "테스트 회사",
    "name": "테스트",
    "phone": "010-1234-5678",
    "email": "test@example.com",
    "inquiryType": "other",
    "message": "테스트 메시지"
  }'
```

## 📧 이메일 발송 상태

### 정상 작동 시
- ✅ 관리자 이메일: yukwho@hanmail.net으로 발송
- ✅ 고객 확인 이메일: 신청자 이메일로 발송
- ✅ 파일 첨부: PDF, 이미지 (최대 4MB)
- ✅ 답장 기능: replyTo 설정

### 문제 해결

#### 1. "Invalid API Key" 에러
```bash
# API 키 확인
echo $RESEND_API_KEY

# Vercel에서 환경 변수 확인
vercel env pull
```

#### 2. "Domain not verified" 에러
- DNS 레코드 확인
- Resend Dashboard에서 도메인 상태 확인
- 임시로 resend.dev 도메인 사용 가능

#### 3. 이메일이 스팸함으로 가는 경우
- SPF, DKIM, DMARC 레코드 설정
- 발신자 이름에 "no-reply" 사용
- HTML 템플릿 최적화

## 🎯 체크리스트

- [ ] Resend 가입 완료
- [ ] API 키 발급 및 저장
- [ ] 도메인 인증 요청
- [ ] DNS 레코드 추가
- [ ] 환경 변수 설정 (로컬)
- [ ] 환경 변수 설정 (Vercel)
- [ ] 테스트 이메일 발송
- [ ] 관리자 이메일 수신 확인
- [ ] 고객 확인 이메일 수신 확인

## 💰 요금제

### Free (무료)
- 월 100건 이메일
- 1일 100건 제한
- 단일 도메인
- 테스트용 적합

### Pro ($20/월)
- 월 5,000건 이메일
- 무제한 도메인
- 우선 지원
- **권장**

### Business ($80/월)
- 월 50,000건 이메일
- 전담 지원
- SLA 보장

## 📊 모니터링

### Resend Dashboard
- 발송 성공/실패 확인
- 이메일 열람률
- 클릭률
- 반송률

### Vercel Functions Log
```bash
# 실시간 로그 확인
vercel logs --follow

# 특정 함수 로그
vercel logs submit-test
```

## 🔄 마이그레이션 완료 상태

| API 경로 | 상태 | 파일 |
|---------|------|------|
| 시험 신청 | ✅ 완료 | `/api/submit-test/route.ts` |
| 교정 신청 | ✅ 완료 | `/api/submit-calibration/route.ts` |
| 문의하기 | ✅ 완료 | `/api/submit-inquiry/route.ts` |

## 📝 추가 설정 (선택)

### 이메일 템플릿 관리
```javascript
// Resend React Email 사용
npm install @react-email/components

// 템플릿 생성
import { Html, Button, Text } from '@react-email/components'

export default function EmailTemplate({ name }) {
  return (
    <Html>
      <Text>안녕하세요, {name}님</Text>
      <Button href="https://ksptl.com">
        홈페이지 방문
      </Button>
    </Html>
  )
}
```

### Webhook 설정
1. Resend Dashboard → Webhooks
2. Endpoint URL 입력
3. 이벤트 선택 (delivered, opened, clicked 등)

## 🆘 지원

### Resend 지원
- 문서: https://resend.com/docs
- Discord: https://discord.gg/resend
- 이메일: support@resend.com

### 프로젝트 문의
- 개발자: ramge132
- GitHub: https://github.com/ramge132/ksptl.com

## ✅ 완료!

모든 설정이 완료되었습니다. 이제 안정적인 이메일 발송이 가능합니다.

```bash
# 배포
git add .
git commit -m "feat: Migrate to Resend email service"
git push
