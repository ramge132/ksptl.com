import "./globals.css"
import { Metadata, Viewport } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ksptl.com'),
  title: {
    default: "한국안전용품시험연구원 | KOLAS 공인 시험·교정 기관",
    template: "%s | 한국안전용품시험연구원"
  },
  description: "국내 유일 시험기 제작·시험·교정 통합 수행기관. KOLAS 공인 신뢰성과 자체 제작 노하우로 정확한 결과와 빠른 대응을 약속합니다.",
  keywords: ["시험기", "교정", "시험소", "교정성적서", "교정견적", "KOLAS", "안전용품시험", "재료시험기", "큐로"],
  authors: [{ name: "한국안전용품시험연구원" }],
  creator: "QURO Co., Ltd.",
  publisher: "한국안전용품시험연구원",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "한국안전용품시험연구원 | KOLAS 공인 시험·교정 기관",
    description: "국내 유일 시험기 제작·시험·교정 통합 수행기관",
    url: "https://www.ksptl.com",
    siteName: "한국안전용품시험연구원",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "한국안전용품시험연구원"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "한국안전용품시험연구원",
    description: "국내 유일 시험기 제작·시험·교정 통합 수행기관",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
