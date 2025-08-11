# 이메일 설정 가이드

## 📧 Gmail SMTP를 이용한 이메일 자동 발송 설정

### 1. Gmail 앱 비밀번호 생성

1. **Google 계정 로그인**
   - https://myaccount.google.com 접속

2. **2단계 인증 활성화**
   - 보안 탭 클릭
   - 2단계 인증 설정 (아직 안 했다면)

3. **앱 비밀번호 생성**
   - 보안 → 2단계 인증 → 앱 비밀번호
   - 앱 선택: "메일"
   - 기기 선택: "기타(맞춤 이름)"
   - 이름 입력: "KSPTL Website"
   - 생성 버튼 클릭
   - **16자리 비밀번호 복사** (공백 제외)

### 2. 환경 변수 설정

`.env.local` 파일에 다음 내용 추가:

```env
# 이메일 설정
EMAIL_USER=ymy@quro.co.kr와 연동된 Gmail 계정
EMAIL_PASS=위에서 생성한 16자리 앱 비밀번호
```

예시:
```env
EMAIL_USER=company.email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # 공백 제거하여 입력
```

### 3. 테스트 방법

1. 개발 서버 재시작:
   ```bash
   npm run dev
   ```

2. http://localhost:3000/contact 접속

3. 문의 폼 작성 후 제출

4. 다음 이메일이 자동 발송됩니다:
   - **관리자 이메일**: ymy@quro.co.kr로 문의 내용 전송
   - **고객 확인 이메일**: 입력한 이메일로 접수 확인 메일 전송

### 4. 이메일 템플릿

#### 관리자가 받는 이메일
- 제목: [문의 유형] 업체명 - 담당자명님의 문의
- 내용: 문의자 정보와 문의 내용

#### 고객이 받는 확인 이메일
- 제목: [한국안전용품시험연구원] 문의가 정상적으로 접수되었습니다
- 내용: 접수 확인 및 안내

### 5. 문제 해결

#### 이메일이 발송되지 않는 경우:

1. **환경 변수 확인**
   - `.env.local` 파일에 EMAIL_USER와 EMAIL_PASS가 올바르게 설정되었는지 확인

2. **앱 비밀번호 확인**
   - 16자리 앱 비밀번호가 정확한지 확인 (공백 제거)
   - 새로운 앱 비밀번호 재생성 시도

3. **Gmail 보안 설정**
   - Gmail 계정의 "보안 수준이 낮은 앱 액세스" 허용 (권장하지 않음)
   - 대신 앱 비밀번호 사용 권장

4. **개발 모드 테스트**
   - 개발 환경에서는 콘솔에 이메일 내용이 출력됩니다
   - 브라우저 개발자 도구의 Network 탭에서 API 응답 확인

### 6. 프로덕션 배포

Vercel 배포 시:
1. Vercel 대시보드 → Settings → Environment Variables
2. EMAIL_USER와 EMAIL_PASS 추가
3. 재배포

### 7. 대체 이메일 서비스 (선택사항)

Gmail 대신 다른 서비스 사용 가능:

#### SendGrid
```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

#### Resend
```env
RESEND_API_KEY=your_resend_api_key
```

※ 대체 서비스 사용 시 `/app/api/submit-inquiry/route.ts` 수정 필요

### 8. 수신 이메일 변경

관리자 페이지에서 수신 이메일 변경:
1. http://localhost:3000/admin 접속
2. "고객지원 관리" 클릭
3. "이메일 주소" 필드 수정
4. 저장

또는 직접 API에서 기본값 변경:
`/app/api/submit-inquiry/route.ts` 파일의 'ymy@quro.co.kr' 수정

---

## 📌 중요 사항

- **보안**: `.env.local` 파일은 절대 Git에 커밋하지 마세요
- **테스트**: 실제 이메일 발송 전 개발 환경에서 충분히 테스트
- **제한**: Gmail SMTP는 일일 발송 제한이 있습니다 (약 500건)
- **스팸**: 대량 발송 시 스팸으로 분류될 수 있으니 주의

## 🆘 도움이 필요하신가요?

이메일 설정에 문제가 있으시면:
1. 콘솔 로그 확인
2. `.env.local` 파일 재확인
3. Gmail 앱 비밀번호 재생성
4. 개발자 도구 Network 탭에서 API 응답 확인
