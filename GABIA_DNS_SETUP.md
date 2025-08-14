# 가비아 DNS 설정 - Resend 도메인 인증

## 📋 Resend에서 제공한 DNS 레코드를 가비아에 입력하는 방법

스크린샷의 Resend DNS 레코드를 가비아에 정확히 입력하는 방법입니다.

### 1️⃣ 첫 번째 레코드 - MX (메일 서버)

**Resend 정보:**
- Type: MX
- Host/Name: send
- Value: feedback-smtp.ap-northeast-1.amazonses.com
- Priority: 10

**가비아 입력:**
```
타입: MX 선택
호스트: send
값/위치: feedback-smtp.ap-northeast-1.amazonses.com
우선순위: 10
TTL: 600
```

### 2️⃣ 두 번째 레코드 - TXT (SPF)

**Resend 정보:**
- Type: TXT
- Host/Name: send  
- Value: v=spf1 include:amazonses.com ~all

**가비아 입력:**
```
타입: TXT 선택
호스트: send
값/위치: v=spf1 include:amazonses.com ~all
TTL: 600
```

### 3️⃣ 세 번째 레코드 - TXT (DKIM)

**Resend 정보:**
- Type: TXT
- Host/Name: resend._domainkey
- Value: p=MIGfMA0GCSqGSIb3DQEB... (긴 문자열)

**가비아 입력:**
```
타입: TXT 선택
호스트: resend._domainkey
값/위치: p=MIGfMA0GCSqGSIb3DQEB... (Resend에서 복사한 전체 값)
TTL: 600
```

### 4️⃣ 네 번째 레코드 - TXT (DMARC) - 선택사항

**Resend 정보:**
- Type: TXT
- Host/Name: _dmarc
- Value: v=DMARC1; p=none;

**가비아 입력:**
```
타입: TXT 선택
호스트: _dmarc
값/위치: v=DMARC1; p=none;
TTL: 600
```

## 🔧 가비아 DNS 관리 화면에서 입력하는 단계

### 단계 1: 첫 번째 레코드 추가 (MX)
1. 가비아 DNS 관리 화면에서 "DNS 레코드 수정" 팝업 열기
2. 타입 드롭다운에서 **MX** 선택
3. 호스트 입력란에 `send` 입력
4. 값/위치 입력란에 `feedback-smtp.ap-northeast-1.amazonses.com` 입력
5. 우선순위에 `10` 입력
6. TTL은 `600` 유지
7. **저장** 버튼 클릭

### 단계 2: 두 번째 레코드 추가 (SPF - TXT)
1. 다시 "DNS 레코드 수정" 팝업 열기
2. 타입 드롭다운에서 **TXT** 선택
3. 호스트 입력란에 `send` 입력
4. 값/위치 입력란에 `v=spf1 include:amazonses.com ~all` 입력
5. TTL은 `600` 유지
6. **저장** 버튼 클릭

### 단계 3: 세 번째 레코드 추가 (DKIM - TXT)
1. 다시 "DNS 레코드 수정" 팝업 열기
2. 타입 드롭다운에서 **TXT** 선택
3. 호스트 입력란에 `resend._domainkey` 입력
4. 값/위치 입력란에 Resend에서 제공한 p=로 시작하는 긴 문자열 전체 복사/붙여넣기
   ```
   p=MIGfMA0GCSqGSIb3DQEB... (전체 값 복사)
   ```
5. TTL은 `600` 유지
6. **저장** 버튼 클릭

### 단계 4: 네 번째 레코드 추가 (DMARC - TXT) - 선택사항
1. 다시 "DNS 레코드 수정" 팝업 열기
2. 타입 드롭다운에서 **TXT** 선택
3. 호스트 입력란에 `_dmarc` 입력
4. 값/위치 입력란에 `v=DMARC1; p=none;` 입력
5. TTL은 `600` 유지
6. **저장** 버튼 클릭

## ⚠️ 주의사항

### 복사/붙여넣기 시 주의
- **DKIM 값(p=로 시작하는 긴 문자열)** 복사 시:
  - 앞뒤 공백이 없도록 주의
  - 전체 문자열을 한 번에 복사
  - 줄바꿈이 들어가지 않도록 주의

### 호스트명 입력 시 주의
- `send` - 그대로 입력
- `resend._domainkey` - 정확히 이렇게 입력 (언더스코어 포함)
- `_dmarc` - 언더스코어로 시작

### 값 입력 시 주의
- 따옴표(" ")는 넣지 않음
- 세미콜론(;)과 콜론(:) 구분 주의
- 대소문자 구분하여 정확히 입력

## ✅ 입력 완료 후 확인

### 가비아에서 확인
1. 모든 레코드 저장 후 목록에서 확인
2. 각 레코드가 정확히 입력되었는지 검토

### Resend에서 확인
1. DNS 레코드 입력 후 5-30분 대기
2. Resend Dashboard → Domains → ksptl.com
3. **Verify DNS Records** 버튼 클릭
4. 각 레코드 옆에 ✅ 표시 확인

## 🔍 DNS 전파 확인

### Windows CMD에서 확인
```cmd
# MX 레코드 확인
nslookup -type=MX send.ksptl.com

# TXT 레코드 확인 (SPF)
nslookup -type=TXT send.ksptl.com

# TXT 레코드 확인 (DKIM)
nslookup -type=TXT resend._domainkey.ksptl.com

# TXT 레코드 확인 (DMARC)
nslookup -type=TXT _dmarc.ksptl.com
```

## 📞 문제 발생 시

### 가비아 고객센터
- 전화: 02-3788-0900
- 평일 09:00-18:00

### Resend 지원
- 이메일: support@resend.com
- Discord: https://discord.gg/resend

## 🎯 예상 완료 시간
- DNS 전파: 5분 ~ 30분 (최대 72시간)
- 보통 30분 이내 인증 완료

모든 레코드를 정확히 입력하시면 Resend에서 도메인 인증이 완료됩니다!
