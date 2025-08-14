# Railway + 가비아 도메인 연결 실전 가이드

## 📌 Railway가 제공한 정보
- **Type**: CNAME
- **Name**: @
- **Value**: `mo9yr4j6.up.railway.app`

## ⚠️ 중요한 문제점
가비아는 루트 도메인(@)에 CNAME 설정을 **지원하지 않습니다**. 
이는 DNS 표준 제약사항으로, 대부분의 DNS 제공업체가 동일합니다.

## ✅ 해결 방법 (2가지 옵션)

### 옵션 1: www 서브도메인 사용 (권장) ⭐

#### 1단계: Railway에서 도메인 변경
1. Railway에서 현재 `ksptl.com` 도메인 삭제
2. 대신 `www.ksptl.com` 추가
3. 새로운 CNAME 값 확인 (동일할 것임: `mo9yr4j6.up.railway.app`)

#### 2단계: 가비아 DNS 설정
```
[WWW 서브도메인 설정]
타입: CNAME
호스트: www
값/데이터: mo9yr4j6.up.railway.app
TTL: 3600

[루트 도메인 리다이렉트]
타입: A
호스트: @ (또는 비움)
값/데이터: 가비아 포워딩 서비스 IP
(또는 가비아의 URL 포워딩 기능 사용)
```

#### 3단계: 가비아 URL 포워딩 설정
1. 가비아 도메인 관리 → 부가서비스
2. URL 포워딩 설정
3. `ksptl.com` → `www.ksptl.com`으로 301 리다이렉트

### 옵션 2: Cloudflare 사용 (무료)

#### 1단계: Cloudflare 계정 생성
1. [Cloudflare](https://cloudflare.com) 가입
2. 도메인 추가: `ksptl.com`

#### 2단계: 가비아에서 네임서버 변경
1. 가비아 → 도메인 관리 → 네임서버 설정
2. Cloudflare가 제공한 네임서버로 변경:
   - 예: `xxx.ns.cloudflare.com`
   - 예: `yyy.ns.cloudflare.com`

#### 3단계: Cloudflare에서 DNS 설정
```
[루트 도메인]
타입: CNAME
이름: @
대상: mo9yr4j6.up.railway.app
프록시: 켜기 (오렌지 구름)

[WWW 서브도메인]
타입: CNAME
이름: www
대상: mo9yr4j6.up.railway.app
프록시: 켜기 (오렌지 구름)
```

## 🎯 가장 빠른 해결책

### Railway + 가비아 직접 연결:
1. Railway에서 도메인을 `www.ksptl.com`으로 변경
2. 가비아 DNS에서:
   ```
   타입: CNAME
   호스트: www
   값: mo9yr4j6.up.railway.app
   TTL: 3600
   ```
3. 가비아 URL 포워딩으로 `ksptl.com` → `www.ksptl.com` 리다이렉트

## 📝 가비아 DNS 설정 방법

1. [가비아](https://www.gabia.com) 로그인
2. My가비아 → 서비스 관리 → 도메인
3. `ksptl.com` 옆 [관리] 버튼 클릭
4. DNS 정보 → [수정] 클릭
5. 레코드 추가:
   - 타입: CNAME
   - 호스트: www
   - 값/데이터: mo9yr4j6.up.railway.app
   - TTL: 3600
6. 저장

## 🔍 확인 방법

설정 후 1-2시간 대기 후:
- https://www.ksptl.com 접속 확인
- DNS 전파 확인: https://www.whatsmydns.net
  - 검색창에 `www.ksptl.com` 입력
  - CNAME 선택
  - `mo9yr4j6.up.railway.app`가 표시되는지 확인

## 💡 FAQ

**Q: 왜 루트 도메인에 CNAME을 설정할 수 없나요?**
A: DNS 표준(RFC 1034)에 따라 루트 도메인은 다른 레코드(SOA, NS 등)와 함께 있어야 하므로 CNAME과 공존할 수 없습니다.

**Q: 꼭 www를 사용해야 하나요?**
A: Railway가 고정 IP를 제공하지 않고 CNAME만 제공하므로, 가비아에서는 www 서브도메인을 사용하는 것이 가장 간단합니다.

**Q: Cloudflare를 사용하면 뭐가 좋나요?**
A: CNAME Flattening을 지원하여 루트 도메인에도 CNAME처럼 동작하게 할 수 있고, 무료 CDN과 SSL도 제공합니다.

## 📞 지원

- 가비아: 02-3473-3900
- Railway Discord: https://discord.gg/railway

---
작성일: 2025-01-15
Railway CNAME: mo9yr4j6.up.railway.app
