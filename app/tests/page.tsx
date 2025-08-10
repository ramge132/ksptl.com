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
import { Loader2 } from "lucide-react"
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

// 아이콘 매핑
const iconMap: Record<string, any> = {
  shield: Shield,
  hardhat: HardHat,
  footprints: Footprints,
  shirt: Shirt,
  alerttriangle: AlertTriangle,
  wrench: Wrench,
  hand: Hand,
}

interface TestCategory {
  _id: string
  key: string
  name: string
  icon: string
  description: string
  subcategories: Array<{
    type: string
    tests: string[]
  }>
  order: number
  isActive: boolean
}

export default function TestsPage() {
  const searchParams = useSearchParams()
  const [testCategories, setTestCategories] = useState<TestCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("")
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

  // Sanity에서 데이터 로드
  useEffect(() => {
    loadTestCategories()
  }, [])

  const loadTestCategories = async () => {
    try {
      const response = await fetch('/api/sanity/test-categories')
      if (response.ok) {
        const data = await response.json()
        // 활성화된 카테고리만 필터링
        const activeCategories = data.filter((cat: TestCategory) => cat.isActive)
        setTestCategories(activeCategories)
        // 첫 번째 카테고리를 기본값으로 설정
        if (activeCategories.length > 0 && !activeCategory) {
          setActiveCategory(activeCategories[0].key)
        }
      }
    } catch (error) {
      console.error('Failed to load test categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const category = searchParams.get("category")
    if (category && testCategories.find(cat => cat.key === category)) {
      setActiveCategory(category)
    }
  }, [searchParams, testCategories])

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

    testCategories.forEach((category) => {
      category.subcategories.forEach(subcategory => {
        subcategory.tests.forEach(test => {
          if (test.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push({
              category: category.key,
              categoryName: category.name,
              type: subcategory.type,
              test: test
            })
          }
        })
      })
    })

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }, [searchQuery, testCategories])

  const handleSearchResultClick = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    setSearchQuery("")
    setSearchResults([])
    setShowSearchResults(false)
    setResultsLimit(10)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">시험 항목을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (testCategories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">등록된 시험 항목이 없습니다.</p>
        </div>
      </div>
    )
  }

  const currentCategory = testCategories.find(cat => cat.key === activeCategory)

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
              {testCategories.map((category) => {
                const Icon = iconMap[category.icon] || Shield
                return (
                  <TabsTrigger
                    key={category.key}
                    value={category.key}
                    className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{category.name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {testCategories.map((category) => {
              const Icon = iconMap[category.icon] || Shield
              return (
                <TabsContent key={category.key} value={category.key} className="mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Category Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary-light mb-4">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{category.name} 시험</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>

                    {/* Test Items */}
                    {category.subcategories.length > 0 ? (
                      <div className={`grid ${
                        category.subcategories.length > 2 ? 'grid-cols-1 lg:grid-cols-2' : 
                        category.subcategories.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 
                        'grid-cols-1 lg:grid-cols-2'
                      } gap-6`}>
                        {category.subcategories.map((subcategory, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="p-6 h-full hover-lift">
                              <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-primary" />
                                {subcategory.type}
                              </h3>
                              {subcategory.tests.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {subcategory.tests.map((test, idx) => (
                                    <div key={idx} className="flex items-start">
                                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                                      <span className="text-sm">{test}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">시험 항목이 없습니다.</p>
                              )}
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">등록된 중분류가 없습니다.</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              )
            })}
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
                <Link href="/test-calibration">
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
