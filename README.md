# 한국안전용품시험연구원 (KSPTL) 🏛️

<p align="center">
  <img src="public/quro_logo.png" alt="KSPTL Logo" width="200"/>
</p>

<p align="center">
  <strong>Korea Safety Products Testing Laboratory</strong><br>
  국내 유일 시험기 제작과 시험·교정을 수행하는 KOLAS 공인기관
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Railway-Deployed-purple?style=flat-square&logo=railway" alt="Railway"/>
</p>

## 🌟 프로젝트 개요

한국안전용품시험연구원(KSPTL)은 **(주)큐로**에서 운영하는 **KOLAS 공인 시험·교정 기관**의 공식 웹사이트입니다. 
시험기 제작부터 교정검사, 시험성적서 발급까지 **원스톱 서비스**를 제공하는 국내 유일의 종합 안전용품 검증 기관입니다.


## 🚀 핵심 기능

### 📋 온라인 시험·교정 신청 시스템
- **단계별 신청서 작성** (React Hook Form + Stepper UI)
- **실시간 이메일 발송** (Resend API)
- **PDF 신청서 자동 생성** (Puppeteer 기반)
- **파일 첨부** (사업자등록증, 시료 사진 등)
- **무제한 파일 크기** 지원 (Railway 환경)

### 🔬 시험·교정 서비스
#### 안전용품 시험
- **마스크**: 방진마스크, 방독마스크, 송기마스크
- **안전화**: 가죽제, 고무제, 정전기안전화, 절연화
- **보호복**: 방열복, 화학물질용 보호복
- **안전모**: AB형, AE형, ABE형
- **안전장갑**: 내전압용
- **안전대**: 벨트식, 그네식, 안전블럭

#### 교정 서비스
- **KOLAS 공인 교정성적서** 발급
- **다양한 측정기기** 교정
- **국가 교정주기** 및 **자체 설정주기** 지원

### 🎨 사용자 경험 (UX)
- **반응형 디자인** (모바일 최적화)
- **다크모드** 지원
- **고급 애니메이션** (Framer Motion, GSAP)
- **인터랙티브 3D 효과** (Three.js)
- **네이버 지도** 통합

### ⚡ 관리자 시스템
- **Sanity CMS** 통합 콘텐츠 관리
- **실시간 데이터 수정**
- **인증서 및 특허 관리**
- **회사 연혁 관리**
- **지원 정보 관리**

## 🛠️ 기술 스택

### Frontend & Framework
```bash
Next.js 14.2        # App Router, Server Components
React 18.2          # 사용자 인터페이스
TypeScript 5        # 타입 안전성
TailwindCSS 3.4     # 유틸리티 우선 CSS
```

### UI & Animation
```bash
Radix UI           # 접근성 우선 컴포넌트
Shadcn/ui          # 현대적 UI 컴포넌트
Framer Motion      # 애니메이션 라이브러리
GSAP              # 고성능 애니메이션
Three.js          # 3D 그래픽
```

### Content Management
```bash
Sanity CMS        # 헤드리스 CMS
Dynamic Content   # 실시간 콘텐츠 업데이트
Image Optimization # 자동 이미지 최적화
```

### Email & PDF
```bash
Resend API        # 이메일 발송 서비스
Puppeteer         # PDF 생성 (HTML → PDF)
React Email       # 이메일 템플릿
```

### Deployment & Infrastructure
```bash
Railway           # 배포 플랫폼
가비아             # 도메인 서비스
환경 변수 관리      # 보안 설정
```

### Development Tools
```bash
pnpm             # 패키지 매니저
ESLint           # 코드 품질
TypeScript       # 타입 체크
```

## 📦 설치 및 실행

### 시스템 요구사항
- **Node.js**: 20.0.0 이상
- **pnpm**: 8.0 이상
- **Git**: 최신 버전

### 프로젝트 설정

```bash
# 1. 저장소 클론
git clone https://github.com/ramge132/ksptl.com.git
cd ksptl.com

# 2. 의존성 설치
pnpm install

# 3. 환경변수 설정
cp .env.example .env.local
# .env.local 파일 편집 (아래 환경변수 섹션 참조)

# 4. 개발 서버 실행
pnpm dev
```

### 환경변수 설정

`.env.local` 파일 생성 및 설정:

```env
# 🔐 필수 환경변수
RESEND_API_KEY=re_your_resend_api_key_here
RECIPIENT_EMAIL=ymy@quro.co.kr

# 🌐 사이트 설정
NEXT_PUBLIC_SITE_URL=https://ksptl.com
NODE_ENV=development

# 🗺️ 네이버 지도 (선택사항)
NEXT_PUBLIC_NAVER_CLIENT_ID=your_naver_map_client_id

# 📊 Sanity CMS (선택사항)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📁 프로젝트 구조

```
ksptl.com/
├── 📂 app/                    # Next.js App Router
│   ├── 📄 layout.tsx         # 전체 레이아웃
│   ├── 📄 page.tsx           # 홈페이지
│   ├── 📂 about/             # 기관소개
│   ├── 📂 admin/             # 관리자 페이지
│   ├── 📂 api/               # API 엔드포인트
│   │   ├── 📂 submit-test/   # 시험 신청 API
│   │   ├── 📂 submit-calibration/ # 교정 신청 API
│   │   ├── 📂 sanity/        # Sanity CMS API
│   │   └── 📂 geocode/       # 지도 API
│   ├── 📂 calibration/       # 교정 서비스
│   ├── 📂 test-calibration/  # 시험·교정 신청
│   ├── 📂 support/           # 고객지원
│   ├── 📂 privacy/           # 개인정보처리방침
│   └── 📂 terms/             # 이용약관
├── 📂 components/            # 재사용 컴포넌트
│   ├── 📂 ui/                # 기본 UI 컴포넌트
│   ├── 📂 sections/          # 페이지 섹션
│   ├── 📂 layout/            # 레이아웃 컴포넌트
│   ├── 📂 admin/             # 관리자 컴포넌트
│   └── 📂 apply/             # 신청서 컴포넌트
├── 📂 lib/                   # 유틸리티 & 설정
│   ├── 📄 pdf-generator-simple.ts # PDF 생성
│   ├── 📄 email-template.ts  # 이메일 템플릿
│   ├── 📄 sanity.ts          # Sanity 클라이언트
│   └── 📄 test-data.ts       # 시험 데이터
├── 📂 public/                # 정적 리소스
│   ├── 📂 fonts/             # 커스텀 폰트
│   ├── 📂 images/            # 이미지 파일
│   └── 📄 quro_logo.png      # 회사 로고
├── 📂 scripts/               # 유틸리티 스크립트
└── 📂 studio/                # Sanity Studio
```

## 🎯 주요 페이지 및 기능

### 🏠 메인 페이지 (`/`)
- **히어로 섹션**: 3D 애니메이션 배경
- **서비스 소개**: 시험·교정 서비스 안내
- **인증서 및 특허**: 자격증 갤러리
- **회사 연혁**: 타임라인 형태
- **연락처**: 네이버 지도 통합

### 🏢 기관소개 (`/about`)
- **회사 정보**: Sanity CMS에서 관리
- **주요 인증**: 동적 인증서 표시
- **비전 및 미션**: 편집 가능한 콘텐츠

### 🧪 시험·교정 (`/test-calibration`)
- **서비스 목록**: 카테고리별 분류
- **상세 정보**: 개별 시험 항목 설명
- **온라인 신청**: 단계별 폼 작성

### 📝 신청 페이지 (`/test-calibration/[testId]`)
- **Stepper UI**: 단계별 진행 표시
- **실시간 검증**: Zod 스키마 활용
- **파일 업로드**: 다중 파일 지원
- **PDF 생성**: 자동 신청서 생성
- **이메일 발송**: 관리자 + 고객 알림

### ⚙️ 관리자 페이지 (`/admin`)
- **콘텐츠 관리**: Sanity CMS 통합
- **실시간 편집**: 즉시 반영
- **파일 관리**: 이미지 업로드
- **데이터 관리**: 시험 카테고리 설정

### 🗺️ 위치 (`/location`)
- **네이버 지도**: 본사 및 시험소 위치
- **연락처 정보**: 실시간 업데이트
- **교통편**: 찾아오는 길 안내

## 🔧 개발 스크립트

```bash
# 개발 관련
pnpm dev          # 개발 서버 실행 (http://localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm lint         # ESLint 검사

# 유틸리티
pnpm type-check   # TypeScript 타입 체크
```

## 🚀 배포 가이드

### Railway 배포 (현재 사용 중)

1. **Railway 계정 설정**
   ```bash
   # Railway CLI 설치
   npm install -g @railway/cli
   
   # 로그인
   railway login
   
   # 프로젝트 연결
   railway link
   ```

2. **환경변수 설정**
   - Railway 대시보드에서 환경변수 추가
   - `.env.example` 참조하여 필수 변수 설정

3. **도메인 연결**
   - `RAILWAY_GABIA_SETUP_SIMPLE.md` 가이드 참조
   - 가비아 DNS 설정 필요

### 대안 배포 옵션

참조 문서:
- `DEPLOYMENT_RAILWAY_GUIDE.md` - Railway 상세 가이드
- `DEPLOYMENT_ALTERNATIVES.md` - 다른 플랫폼 옵션
- `RESEND_SETUP_GUIDE.md` - 이메일 서비스 설정

## 📧 이메일 시스템 설정

### Resend API 설정

1. **Resend 계정 생성**
   - [Resend](https://resend.com) 가입
   - API 키 발급

2. **도메인 인증**
   - 도메인 추가 및 DNS 설정
   - SPF, DKIM 레코드 설정

3. **환경변수 설정**
   ```env
   RESEND_API_KEY=your_api_key
   RECIPIENT_EMAIL=ymy@quro.co.kr
   ```

자세한 설정: `RESEND_SETUP_GUIDE.md` 참조

## 🗂️ CMS 설정 (Sanity)

### 초기 설정

```bash
# Sanity 데이터 초기화
node scripts/init-sanity-data.js
node scripts/init-timeline-data.js
node scripts/init-support-data.js
```

### 콘텐츠 관리

- **관리자 페이지**: `/admin`
- **실시간 편집**: 즉시 반영
- **이미지 최적화**: 자동 처리
- **버전 관리**: 변경 이력 추적

## 🧪 PDF 생성 시스템

### Puppeteer 기반 PDF

```typescript
// 시험 신청서 PDF 생성
const pdfBuffer = await generateTestPDF(formData)

// 교정 신청서 PDF 생성  
const pdfBuffer = await generateCalibrationPDF(formData)
```

### PDF 특징
- **한글 폰트**: Pretendard 사용
- **반응형 레이아웃**: A4 최적화
- **브랜딩**: 회사 로고 및 색상
- **자동 생성**: 폼 데이터 자동 매핑

## 🗺️ 지도 통합

### 네이버 지도 API

```typescript
// 지도 컴포넌트 사용
<NaverMap 
  address="경기 양주시 은현면 화합로 941번길 83"
  title="한국안전용품시험연구원 본사"
/>
```

### 지도 기능
- **본사 위치**: 양주시 본사
- **시험소 위치**: 시험소 별관  
- **교통편**: 대중교통 안내
- **연락처**: 클릭 가능한 전화번호

## 🔒 보안 및 개인정보

### 개인정보 보호
- **개인정보처리방침**: `/privacy`
- **이용약관**: `/terms`
- **데이터 암호화**: 전송 중 보안
- **최소 수집**: 필요한 정보만 수집

### 보안 기능
- **입력 검증**: Zod 스키마
- **XSS 방지**: React 기본 보안
- **CSRF 방지**: Next.js 보안 헤더
- **환경변수**: 민감 정보 보호

## 🤝 기여 가이드

### 개발 참여 방법

1. **Fork** 프로젝트
2. **Feature Branch** 생성
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **변경사항 커밋**
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
4. **Branch 푸시**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Pull Request** 생성

### 커밋 컨벤션

```bash
feat: 새로운 기능 추가
fix: 버그 수정  
docs: 문서 수정
style: 코드 스타일 변경
refactor: 리팩토링
test: 테스트 코드
chore: 빌드 업무 수정
```

## 📞 연락처 정보

### 🏢 본사
- **주소**: 경기 양주시 은현면 화합로 941번길 83
- **전화**: 031-862-8556~7
- **이메일**: ymy@quro.co.kr

### 🔬 시험소
- **주소**: 경기 양주시 은현면 화합로 701-11  
- **전화**: 031-858-3012

### 💻 기술 지원
- **개발팀**: GitHub Issues
- **이메일**: 기술 문의 시 이슈 등록 권장

## 📊 성능 최적화

### 웹 성능
- **이미지 최적화**: Next.js Image 컴포넌트
- **코드 분할**: 동적 임포트
- **캐싱 전략**: Static Generation
- **CDN 활용**: Railway CDN

### SEO 최적화
- **메타 태그**: 동적 생성
- **구조화된 데이터**: JSON-LD
- **사이트맵**: 자동 생성
- **검색 키워드**: 시험기, 교정, KOLAS

## 🎨 디자인 시스템

### 색상 팔레트
```css
/* 주 색상 */
--primary: #2563eb;      /* 파란색 */
--secondary: #64748b;    /* 회색 */
--accent: #f59e0b;       /* 노란색 */

/* 상태 색상 */
--success: #10b981;      /* 성공 */
--warning: #f59e0b;      /* 경고 */
--error: #ef4444;        /* 오류 */
```

### 타이포그래피
- **메인 폰트**: Pretendard (한글)
- **영문 폰트**: Inter
- **제목 폰트**: 한국기계연구원_bold.ttf

## 📈 로드맵

### 단기 계획 (Q1 2025)
- [ ] 모바일 앱 개발 검토
- [ ] 다국어 지원 (영어)
- [ ] API 문서화
- [ ] 성능 모니터링

### 장기 계획 (Q2-Q4 2025)
- [ ] AI 기반 시료 분석 도구
- [ ] 실시간 채팅 지원
- [ ] 블록체인 인증서
- [ ] IoT 장비 연동

## 📄 라이선스

```
Copyright © 2025 (주)큐로. All rights reserved.

이 프로젝트는 (주)큐로의 지적재산권으로 보호받습니다.
무단 복제, 배포, 수정을 금지하며, 상업적 이용 시 
반드시 사전 허가를 받아야 합니다.

Korean Safety Products Testing Laboratory (KSPTL)
```

## 🙏 감사의 글

이 프로젝트는 다음 오픈소스 프로젝트들의 도움으로 만들어졌습니다:

- **Next.js** - React 프레임워크
- **Tailwind CSS** - 유틸리티 CSS
- **Framer Motion** - 애니메이션
- **Radix UI** - 접근성 컴포넌트
- **Sanity** - 헤드리스 CMS
- **Puppeteer** - PDF 생성
- **Resend** - 이메일 서비스

---

<p align="center">
  <strong>Made with ❤️ by <a href="https://quro.co.kr">QURO Co., Ltd.</a></strong><br>
  <em>🏛️ 국내 유일의 종합 안전용품 검증 기관 🏛️</em>
</p>

<p align="center">
  <a href="https://ksptl.com">🌐 Website</a> •
  <a href="mailto:ymy@quro.co.kr">📧 Email</a> •
  <a href="tel:031-862-8556">📞 Phone</a>
</p>
