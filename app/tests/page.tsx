"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  HardHat,
  Footprints,
  Shirt,
  AlertTriangle,
  Wrench,
  ClipboardCheck,
  FileText,
  ArrowRight,
  CheckCircle,
  Hand,
  Search,
  X,
} from "lucide-react"

const testCategories = {
  mask: {
    name: "마스크",
    icon: Shield,
    description: "방진, 방독, 송기마스크 전문 시험",
    items: [
      {
        type: "방진마스크",
        tests: [
          "강도 신장율 및 영구변형율 시험",
          "투시부의 내충격성 시험",
          "여과재 질량 시험",
        ],
      },
      {
        type: "방독마스크",
        tests: [
          "강도 신장율 및 영구변형율 시험",
          "투시부의 내충격성 시험",
          "정화통 질량 시험",
        ],
      },
      {
        type: "송기마스크",
        tests: [
          "호스 및 중압호스 변형 및 구부림 시험",
          "호스 및 중압호스 연결부 인장 시험",
        ],
      },
    ],
  },
  shoes: {
    name: "안전화",
    icon: Footprints,
    description: "가죽제, 고무제, 정전기안전화, 절연화 시험",
    items: [
      {
        type: "가죽제",
        tests: [
          "내압박성 시험",
          "내충격성 시험",
          "내답발성 시험",
          "박리저항시험",
          "결창인장강도 시험",
          "결창신장율시험",
          "내유부피변화율 시험",
          "내유경도변화율 시험",
          "온면결렬 시험",
          "선심의 내부식성 시험",
          "내답판 내부식성 시험",
          "가죽인열강도 시험",
        ],
      },
      {
        type: "고무제",
        tests: [
          "고무 인장강도 시험",
          "고무 내유부피변화율 시험",
          "안감 및 포파일 시험",
          "내압박성 시험",
          "내충격성 시험",
          "내답판 내부식성 시험",
          "선심의 내부식성 시험",
          "내답발성 시험",
        ],
      },
      {
        type: "정전기안전화 (가죽제)",
        tests: [
          "내압박성 시험",
          "내충격성 시험",
          "내답발성 시험",
          "박리저항시험",
          "결창인장강도 시험",
          "결창신장율시험",
          "내유부피변화율 시험",
          "내유경도변화율 시험",
          "온면결렬 시험",
          "선심의 내부식성 시험",
          "내답판 내부식성 시험",
          "가죽인열강도 시험",
          "대전방지 성능 시험",
        ],
      },
      {
        type: "정전기안전화 (고무제)",
        tests: [
          "고무 인장강도 시험",
          "고무 내유부피변화율 시험",
          "안감 및 포파일 시험",
          "내압박성 시험",
          "내충격성 시험",
          "내답판 내부식성 시험",
          "선심의 내부식성 시험",
          "내답발성 시험",
          "대전방지 성능 시험",
        ],
      },
      {
        type: "발등안전화",
        tests: [
          "내압박성 시험",
          "내충격성 시험",
          "내답발성 시험",
          "박리저항시험",
          "결창인장강도 시험",
          "결창신장율시험",
          "내유부피변화율 시험",
          "내유경도변화율 시험",
          "온면결렬 시험",
          "선심의 내부식성 시험",
          "내답판 내부식성 시험",
          "가죽인열강도 시험",
          "방호대 내충격성 시험",
        ],
      },
      {
        type: "절연화 (가죽제)",
        tests: [
          "내압박성 시험",
          "내충격성 시험",
          "내답발성 시험",
          "박리저항시험",
          "결창인장강도 시험",
          "결창신장율시험",
          "내유부피변화율 시험",
          "내유경도변화율 시험",
          "온면결렬 시험",
          "선심의 내부식성 시험",
          "내답판 내부식성 시험",
          "가죽인열강도 시험",
          "내전압 시험 (14 000 V)",
        ],
      },
      {
        type: "절연화 (고무제)",
        tests: [
          "고무 인장강도 시험",
          "고무 내유부피변화율 시험",
          "안감 및 포파일 시험",
          "내압박성 시험",
          "내충격성 시험",
          "내답판 내부식성 시험",
          "선심의 내부식성 시험",
          "내답발성 시험",
          "내전압 시험 (14 000 V)",
        ],
      },
      {
        type: "절연장화",
        tests: [
          "내전압 시험 (20 000 V)",
          "고무 인장강도 시험",
          "고무 신장율 시험",
        ],
      },
    ],
  },
  clothing: {
    name: "보호복",
    icon: Shirt,
    description: "방열복, 화학물질용 보호복 시험",
    items: [
      {
        type: "방열복",
        tests: [
          "난연성 시험",
          "절연저항 시험",
          "열전도율 시험",
          "인장강도 시험",
          "내열성 시험",
          "내한성 시험",
          "열충격 시험",
          "안면렌즈의 내충격 시험",
        ],
      },
      {
        type: "화학물질용 보호복",
        tests: [
          "인장강도 시험",
          "인열강도 시험",
          "뚫림강도 시험",
          "마모저항 시험",
          "굴곡저항 시험",
          "연소저항 시험",
          "화염저항 시험",
          "슬기강도 시험",
          "접합부 연결강도 시험",
          "안면창 강도 시험",
          "호흡 및 환기호스 연결부 강도 시험",
        ],
      },
    ],
  },
  harness: {
    name: "추락방지대",
    icon: AlertTriangle,
    description: "추락방지대 전문 시험",
    items: [
      {
        type: "추락방지대",
        tests: [
          "구조검사",
          "죔줄 인장강도 시험",
          "죔줄 연결부 인장강도 시험",
          "수직구명줄 인장강도 시험",
          "추락방지대 인장강도 시험",
          "완성품 다리낙하 동하중성능 시험",
          "완성품 머리낙하 동하중성능 시험",
          "정하중성능 시험(목링)",
          "정하중성능 시험(가랭이링)",
          "D링 인장강도 시험",
          "박클 인정강도 시험",
          "훅 인정강도 시험",
          "카라비나 인장강도 시험",
          "훅 수직압축 시험",
          "훅 측면압축 시험",
        ],
      },
    ],
  },
  helmet: {
    name: "안전모",
    icon: HardHat,
    description: "AB형, AE형, ABE형 안전모 시험",
    items: [
      {
        type: "AB형, AE형, ABE형",
        tests: [
          "내관통성 시험",
          "충격흡수성 시험",
          "턱끈풀림시험",
          "난연성 시험",
          "내전압성 시험",
          "내수성 시험",
          "측면변형방호 시험",
        ],
      },
    ],
  },
  gloves: {
    name: "안전장갑",
    icon: Hand,
    description: "내전압용 안전장갑 시험",
    items: [
      {
        type: "내전압용",
        tests: [
          "절연내력 시험",
          "인장강도 시험",
          "경년변화 시험",
          "내열성 시험",
          "영구신장율 시험",
          "뚫림강도 시험",
        ],
      },
    ],
  },
  belt: {
    name: "안전대",
    icon: Wrench,
    description: "벨트식, 그네식, 안전블럭 시험",
    items: [
      {
        type: "벨트식 U자걸이용",
        tests: [
          "구조검사",
          "죔줄 인장강도 시험",
          "죔줄 연결부 인장강도 시험",
          "D링 인장강도시험",
          "8자링 인장강도 시험",
          "박클 인장강도 시험",
          "훅 인장강도 시험",
          "카라비나 인장강도 시험",
          "훅수직압축 시험",
          "훅 측면압축 시험",
          "충격흡수장치 인장강도 시험",
          "충격흡수장치 신장측정 시험",
          "완성품 동하중성능 시험",
          "충격흡수장치 동하중성능 시험",
          "정하중성능 시험",
          "벨트 인장강도 시험",
          "보조죔줄 동하중성능 시험",
          "지탱벨트 인장강도 시험",
          "보조죔줄 인장강도 시험",
          "각링 인장강도시험",
          "신축조절기 인장강도 시험",
        ],
      },
      {
        type: "벨트식 1개걸이용",
        tests: [
          "구조검사",
          "죔줄 인장강도 시험",
          "죔줄 연결부 인장강도 시험",
          "D링 인장강도시험",
          "8자링 인장강도 시험",
          "박클 인장강도 시험",
          "훅 인장강도 시험",
          "카라비나 인장강도 시험",
          "훅수직압축 시험",
          "훅 측면압축 시험",
          "충격흡수장치 인장강도 시험",
          "충격흡수장치 신장측정 시험",
          "완성품 동하중성능 시험",
          "충격흡수장치 동하중성능 시험",
          "정하중성능 시험",
        ],
      },
      {
        type: "그네식 U자 걸이용",
        tests: [
          "구조검사",
          "죔줄 인장강도 시험",
          "죔줄 연결부 인장강도 시험",
          "D링 인장강도시험",
          "8자링 인장강도 시험",
          "박클 인장강도 시험",
          "훅 인장강도 시험",
          "카라비나 인장강도 시험",
          "훅수직압축 시험",
          "훅 측면압축 시험",
          "충격흡수장치 인장강도 시험",
          "충격흡수장치 신장측정 시험",
          "죔줄 다리낙하 동하중성능 시험",
          "죔줄 머리낙하 동하중성능 시험",
          "충격흡수장치 동하중성능 시험",
          "정하중성능 시험 (목링)",
          "정하중성능 시험 (가랭이링)",
          "지탱벨트 인장강도 시험",
          "보조죔줄 다리낙하 동하중성능 시험",
          "보조죔줄 머리낙하 동하중성능 시험",
          "벨트 인장강도 시험",
          "보조죔줄 인장강도 시험",
          "각링 인장강도 시험",
          "신축조절기 인장강도 시험",
        ],
      },
      {
        type: "그네식 1개걸이용",
        tests: [
          "구조검사",
          "죔줄 인장강도 시험",
          "죔줄 연결부 인장강도 시험",
          "D링 인장강도시험",
          "8자링 인장강도 시험",
          "박클 인장강도 시험",
          "훅 인장강도 시험",
          "카라비나 인장강도 시험",
          "훅수직압축 시험",
          "훅 측면압축 시험",
          "충격흡수장치 인장강도 시험",
          "충격흡수장치 신장측정 시험",
          "죔줄 다리낙하 동하중성능 시험",
          "죔줄 머리낙하 동하중성능 시험",
          "충격흡수장치 동하중성능 시험",
          "정하중성능 시험 (목링)",
          "정하중성능 시험 (가랭이링)",
        ],
      },
      {
        type: "안전블럭",
        tests: [
          "구조검사",
          "완성품 다리낙하 동하중성능 시험",
          "완성품 머리낙하 동하중성능 시험",
          "정하중성능 시험 (목링)",
          "정하중성능 시험 (가랭이링)",
          "D링 인장강도 시험",
          "박클 인장강도 시험",
          "훅 인장강도 시험",
          "카라비나 인장강도 시험",
          "훅 수직압축 시험",
          "훅 측면압축 시험",
          "안전블럭 동하중성능 시험",
          "안전블럭 와이어 인장강도 시험",
          "안전블럭 몸체 인장강도 시험",
          "안전블럭 수축하중 시험",
        ],
      },
    ],
  },
}

export default function TestsPage() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("mask")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{
    category: string
    categoryName: string
    type: string
    test: string
  }>>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [resultsLimit, setResultsLimit] = useState(10)
  const searchBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const category = searchParams.get("category")
    if (category && category in testCategories) {
      setActiveCategory(category)
    }
  }, [searchParams])

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSearchResults])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      setResultsLimit(10)
      return
    }

    // Reset limit when search query changes
    setResultsLimit(10)

    const results: Array<{
      category: string
      categoryName: string
      type: string
      test: string
    }> = []

    Object.entries(testCategories).forEach(([categoryKey, category]) => {
      category.items.forEach(item => {
        item.tests.forEach(test => {
          if (test.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push({
              category: categoryKey,
              categoryName: category.name,
              type: item.type,
              test: test
            })
          }
        })
      })
    })

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }, [searchQuery])

  const handleSearchResultClick = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    setSearchQuery("")
    setSearchResults([])
    setShowSearchResults(false)
    setResultsLimit(10)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-3" variant="outline">
              <ClipboardCheck className="w-3 h-3 mr-1" />
              KOLAS 공인시험
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">시험·교정</span> 서비스
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              국가 공인 시험기관으로서 정확하고 신뢰할 수 있는 시험 서비스를 제공합니다
            </p>

            {/* Search Box */}
            <div ref={searchBoxRef} className="max-w-md mx-auto relative" style={{ zIndex: 10 }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="시험 항목 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                  className="pl-10 pr-10 h-12 text-base border-gray-200 focus:border-transparent focus:ring-0 focus:outline-none focus:shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-shadow duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSearchResults([])
                      setShowSearchResults(false)
                      setResultsLimit(10)
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
                  style={{ zIndex: 20, position: 'absolute' }}
                >
                  <div className="px-4 py-2 bg-gray-50 border-b text-xs text-gray-600 font-medium">
                    총 {searchResults.length}개의 시험 항목이 검색되었습니다
                  </div>
                  {searchResults.slice(0, resultsLimit).map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result.category)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{result.test}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {result.categoryName} → {result.type}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                  {searchResults.length > resultsLimit && (
                    <button
                      onClick={() => setResultsLimit(prev => prev + 10)}
                      className="w-full px-4 py-2 text-xs text-center border-t bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-primary font-medium">
                        더 보기
                      </span>
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2">
              {Object.entries(testCategories).map(([key, category]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <category.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(testCategories).map(([key, category]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary-light mb-4">
                      <category.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{category.name} 시험</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  {/* Test Items */}
                  <div className={`grid ${
                    category.items.length > 2 ? 'grid-cols-1 lg:grid-cols-2' : 
                    category.items.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 
                    'grid-cols-1 lg:grid-cols-2'
                  } gap-6`}>
                    {category.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="p-6 h-full hover-lift">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-primary" />
                            {item.type}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.tests.map((test, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm">{test}</span>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-primary-light border-primary/20">
              <h3 className="text-2xl font-bold mb-4">시험·교정 신청하기</h3>
              <p className="text-muted-foreground mb-6">
                온라인으로 간편하게 신청하고, 24시간 내 견적을 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90">
                    온라인 신청
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button size="lg" variant="outline">
                    문의하기
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">KOLAS 공인</h4>
              <p className="text-sm text-muted-foreground">
                국가공인 시험기관으로 신뢰할 수 있는 성적서 발급
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">정확한 시험</h4>
              <p className="text-sm text-muted-foreground">
                최신 장비와 전문 인력으로 정확한 시험 수행
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary-light flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">빠른 처리</h4>
              <p className="text-sm text-muted-foreground">
                신속한 시험 진행과 성적서 발급으로 시간 단축
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
