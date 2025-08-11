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
        <div className="flex h-16 items-center">
          {/* Logo - Fixed width */}
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2 w-fit">
              <Image
                src="/quro_logo.png"
                alt="QURO"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="font-title text-lg font-bold">한국안전용품시험연구원</span>
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

          {/* CTA Buttons - Fixed width */}
          <div className="flex-1 flex justify-end">
            <div className="hidden items-center space-x-4 lg:flex">
              <Link href="/apply">
                <button className="relative group px-6 py-2.5 pl-8 pr-14 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0080FF] 
                                 text-white font-semibold overflow-hidden transition-all duration-300 
                                 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]
                                 shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                  {/* Shiny effect on hover */}
                  <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  
                  {/* Text */}
                  <span className="relative z-10">무료 견적 진행</span>
                  
                  {/* Circle with arrow */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center
                                group-hover:bg-white/90 transition-all duration-300">
                    <svg className="w-4 h-4 text-[#0066FF] transition-transform duration-300 group-hover:translate-x-0.5" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          </div>

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
                  <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full relative group px-6 py-2.5 pl-8 pr-14 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0080FF] 
                                     text-white font-semibold overflow-hidden transition-all duration-300 
                                     hover:scale-105 hover:shadow-[0_0_30px_rgba(0,102,255,0.5)]
                                     shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                      {/* Shiny effect on hover */}
                      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                    -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      
                      {/* Text */}
                      <span className="relative z-10">무료 견적 진행</span>
                      
                      {/* Circle with arrow */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center
                                    group-hover:bg-white/90 transition-all duration-300">
                        <svg className="w-4 h-4 text-[#0066FF] transition-transform duration-300 group-hover:translate-x-0.5" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
