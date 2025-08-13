# 한국안전용품시험연구원 (KSPTL)

<p align="center">
  <img src="public/quro_logo.png" alt="KSPTL Logo" width="200"/>
</p>

<p align="center">
  <strong>Korea Safety Products Testing Laboratory</strong><br>
  국내 유일 시험기 제작과 시험·교정을 수행하는 공인기관
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS"/>
</p>

## 📌 프로젝트 소개

한국안전용품시험연구원(KSPTL)은 (주)큐로에서 운영하는 KOLAS 공인 시험·교정 기관의 공식 웹사이트입니다. 시험기 제작부터 교정검사, 시험성적서 발급까지 원스톱 서비스를 제공합니다.

### 🏆 주요 인증
- **KOLAS** 공인교정기관 (KC23-420)
- **KS** 제품인증 (KS B 5521, KS B 5533, KS B 5541)
- **ISO** 9001:2015 품질경영시스템
- **CE** 유럽안전인증

## 🚀 주요 기능

### 1. 온라인 시험·교정 신청
- 단계별 신청서 작성 (Stepper UI)
- 실시간 이메일 발송
- 파일 첨부 기능 (사업자등록증)

### 2. 시험·교정 항목
- **안전용품**: 마스크, 안전화, 보호복, 안전모, 안전장갑 등
- **교정서비스**: KOLAS 공인 교정성적서 발급
- **시험서비스**: KOLAS 공인 시험성적서 발급

### 3. 반응형 디자인
- 모바일 최적화
- 다크모드 지원
- 애니메이션 효과

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **UI Components**: Shadcn/ui
- **Form**: React Hook Form, Zod Validation

### Email Service
- **Provider**: Resend API
- **Template**: React Email

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.0 이상
- pnpm 8.0 이상

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/ramge132/ksptl.com.git
cd ksptl.com

# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 필요한 환경변수 입력

# 개발 서버 실행
pnpm run dev
```

### 환경변수 설정

`.env.local` 파일 생성:

```env
# Resend API Key (이메일 발송)
RESEND_API_KEY=your_resend_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://ksptl.com
```

## 📁 프로젝트 구조

```
ksptl.com/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── about/             # 기관소개
│   ├── tests/             # 시험·교정
│   ├── apply/             # 신청 페이지
│   └── support/           # 고객지원
├── components/            
│   ├── ui/                # UI 컴포넌트
│   ├── sections/          # 페이지 섹션
│   ├── layout/            # 레이아웃 컴포넌트
│   └── apply/             # 신청서 컴포넌트
├── public/
│   ├── fonts/             # 커스텀 폰트
│   └── images/            # 이미지 리소스
└── lib/                   # 유틸리티 함수
```

## 🔧 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint

# 타입 체크
pnpm type-check
```

## 🌐 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 환경변수 설정
4. 자동 배포 활성화

```bash
# Vercel CLI를 통한 배포
pnpm i -g vercel
vercel
```

## 📝 주요 페이지

- `/` - 메인 랜딩 페이지
- `/about` - 기관 소개
- `/tests` - 시험·교정 서비스
- `/apply` - 온라인 신청
- `/support/inquiry` - 문의하기
- `/support/resources` - 자료실

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

### 본사
- **주소**: 경기 양주시 은현면 화합로 941번길 83
- **전화**: 031-862-8556~7
- **이메일**: ymy@quro.co.kr

### 시험소
- **주소**: 경기 양주시 은현면 화합로 701-11
- **전화**: 031-858-3012

## 📄 라이선스

Copyright © 2025 (주)큐로. All rights reserved.

이 프로젝트는 (주)큐로의 소유이며, 무단 복제 및 배포를 금지합니다.

---

<p align="center">
  Made with ❤️ by <a href="https://quro.co.kr">QURO Co., Ltd.</a>
</p>
