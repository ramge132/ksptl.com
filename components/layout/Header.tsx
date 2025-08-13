"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "기관소개",
    href: "/about",
    directLink: "/about",
    items: [
      { title: "기관 개요", href: "/about", description: "한국안전용품시험연구원 소개" },
      { title: "오시는 길", href: "/location", description: "본사 및 시험소 위치" },
    ]
  },
  {
    title: "시험·교정",
    href: "/tests?category=mask",
    directLink: "/tests?category=mask",
    items: [
      { title: "시험 항목", href: "/tests?category=mask", description: "시험 가능한 모든 항목 확인" },
      { title: "시험 신청", href: "/test-calibration", description: "온라인으로 시험 신청하기" },
      { title: "교정 신청", href: "/calibration", description: "교정 서비스 신청하기" },
    ]
  },
  {
    title: "고객지원",
    href: "/support/inquiry",
    directLink: "/support/inquiry",
    items: [
      { title: "고객지원", href: "/support/inquiry", description: "고객지원 센터" },
      { title: "자료실", href: "/support/resources", description: "관련 자료 다운로드" },
    ]
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        "backdrop-blur-xl border-b border-gray-200/50",
        isScrolled && "backdrop-blur-2xl shadow-lg bg-white/95"
      )}
      style={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 한국안전용품시험연구원 - 좌측 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/한국안전용품시험연구원_logo2.png"
                alt="한국안전용품시험연구원"
                width={240}
                height={40}
                className="h-5 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <NavigationMenu className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger 
                    className="h-auto px-4 py-2 text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent"
                    onClick={() => {
                      if (item.directLink) {
                        window.location.href = item.directLink
                      }
                    }}
                  >
                    <span className="text-gray-700 hover:text-primary transition-colors">
                      {item.title}
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{subItem.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* 큐로 로고 - 우측 */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.quro.co.kr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/quro_logo.png"
                alt="QURO"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </a>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <ul className="space-y-2 pl-4">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <a 
                    href="https://www.quro.co.kr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-80 transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src="/quro_logo.png"
                      alt="QURO"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </a>
                </div>
              </nav>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
