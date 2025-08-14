# Railway와 가비아 도메인 연결 가이드

## 📌 도메인: ksptl.com

## 1단계: Railway에서 커스텀 도메인 추가

### 1-1. Railway 대시보드 접속
1. [Railway 대시보드](https://railway.app/dashboard)에 로그인
2. 배포된 프로젝트 선택
3. **Settings** 탭 클릭

### 1-2. 도메인 추가
1. **Networking** 섹션으로 스크롤
2. **Custom Domain** 섹션 찾기
3. **+ Add Domain** 클릭
4. 도메인 입력:
   - `ksptl.com` (루트 도메인)
   - `www.ksptl.com` (www 서브도메인)
   
### 1-3. Railway DNS 정보 확인
Railway가 제공하는 DNS 정보를 메모하세요:
- CNAME 타겟 (예: `your-app.up.railway.app`)
- 또는 A 레코드 IP 주소

## 2단계: 가비아 DNS 설정

### 2-1. 가비아 로그인
1. [가비아](https://www.gabia.com) 로그인
2. **My가비아** → **서비스 관리** → **도메인**
3. `ksptl.com` 도메인 찾기

### 2-2. DNS 레코드 관리
1. 해당 도메인의 **DNS 관리** 또는 **네임서버 설정** 클릭
2. **DNS 레코드 설정** 선택

### 2-3. DNS 레코드 추가

#### A. 루트 도메인 설정 (ksptl.com)

**옵션 1: CNAME Flattening 지원 시**
```
타입: CNAME
호스트: @ (또는 비워두기)
값: your-app.up.railway.app
TTL: 3600
```

**옵션 2: A 레코드 사용 (권장)**
Railway에서 제공하는 IP 주소를 사용:
```
타입: A
호스트: @ (또는 비워두기)
값: Railway가 제공한 IP 주소
TTL: 3600
```

#### B. WWW 서브도메인 설정 (www.ksptl.com)
```
타입: CNAME
호스트: www
값: your-app.up.railway.app
TTL: 3600
```

### 2-4. 기존 레코드 확인
- 기존에 설정된 A 레코드나 CNAME 레코드가 있다면 삭제 또는 수정
- MX 레코드(이메일)는 그대로 유지

## 3단계: SSL 인증서 설정

### Railway에서 자동 SSL
1. Railway는 Let's Encrypt를 통해 자동으로 SSL 인증서 발급
2. 도메인 연결 후 몇 분 내 자동 활성화
3. **Settings** → **Networking**에서 SSL 상태 확인

## 4단계: DNS 전파 대기

### 확인 사항
- DNS 변경사항이 전파되는데 최대 48시간 소요 (보통 1-2시간)
- 전파 상태 확인: https://www.whatsmydns.net/

### 테스트 명령어
```bash
# DNS 조회
nslookup ksptl.com
nslookup www.ksptl.com

# 연결 테스트
curl -I https://ksptl.com
curl -I https://www.ksptl.com
```

## 5단계: 최종 확인

### Railway 대시보드에서
1. **Settings** → **Networking** → **Custom Domain**
2. 각 도메인 옆에 초록색 체크 표시 확인
3. SSL 인증서 상태 확인

### 브라우저에서
1. https://ksptl.com 접속
2. https://www.ksptl.com 접속
3. SSL 자물쇠 아이콘 확인

## 트러블슈팅

### 문제 1: "Domain not verified" 오류
- DNS 레코드가 올바르게 설정되었는지 확인
- DNS 전파 대기 (최대 48시간)

### 문제 2: SSL 인증서 오류
- Railway에서 자동 SSL 발급 대기 (보통 5-10분)
- 강제 재발급: Railway 대시보드에서 도메인 제거 후 다시 추가

### 문제 3: 루트 도메인 연결 안됨
- 가비아가 루트 도메인에 CNAME을 지원하지 않을 수 있음
- A 레코드로 변경하거나 가비아 고객센터 문의

## 가비아 고객센터
- 전화: 02-3473-3900
- 업무시간: 평일 09:00 ~ 18:00
- 이메일: domain@gabia.com

## Railway 지원
- Discord: https://discord.gg/railway
- 문서: https://docs.railway.app/guides/public-networking

## 추가 설정 (선택사항)

### 리다이렉션 설정
www를 루트로 또는 루트를 www로 리다이렉션하려면:

`next.config.mjs`에 추가:
```javascript
async redirects() {
  return [
    {
      source: '/',
      has: [
        {
          type: 'host',
          value: 'www.ksptl.com',
        },
      ],
      destination: 'https://ksptl.com/',
      permanent: true,
    },
  ]
}
```

## 체크리스트

- [ ] Railway에서 커스텀 도메인 추가 완료
- [ ] 가비아에서 DNS 레코드 설정 완료
- [ ] DNS 전파 확인 (whatsmydns.net)
- [ ] HTTPS 접속 확인
- [ ] SSL 인증서 확인
- [ ] www와 루트 도메인 모두 작동 확인

---

작성일: 2025-01-15
도메인: ksptl.com
호스팅: Railway
도메인 등록업체: 가비아
