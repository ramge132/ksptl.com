import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const certifications = [
  { name: "KOLAS", number: "KC23-420" },
  { name: "KS", number: "KS B 5521/5533/5541" },
  { name: "ISO", number: "ISO 9001:2015" },
  { name: "CE", number: "CE Certified" },
]

const footerLinks = {
  company: [
    { title: "기관 소개", href: "/about" },
    { title: "오시는 길", href: "/location" },
  ],
  services: [
    { title: "시험·교정 신청", href: "/apply" },
    { title: "시험 항목", href: "/tests" },
  ],
  support: [
    { title: "자료실", href: "/support/resources" },
    { title: "문의하기", href: "/contact" },
  ],
  policies: [
    { title: "개인정보처리방침", href: "/privacy" },
    { title: "이용약관", href: "/terms" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Certifications Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-primary-light flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{cert.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/quro_logo.png"
                alt="QURO"
                width={100}
                height={33}
                className="h-8 w-auto"
              />
              <span className="font-title text-lg font-bold">한국안전용품시험연구원</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              (주)큐로가 운영하는 KOLAS 공인 시험·교정 기관<br />
              국내 유일 시험기 제작과 시험·교정을 통합 수행
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">회사 소개</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">고객지원</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-12 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {footerLinks.policies.map((link) => (
              <Link key={link.title} href={link.href} className="hover:text-primary transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-center">
            <p>© 2024 한국안전용품시험연구원. All rights reserved.</p>
            <p className="text-xs mt-1">Operated by QURO Co., Ltd.</p>
          </div>
        </div>

      </div>
    </footer>
  )
}
