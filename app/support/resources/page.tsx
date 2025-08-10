"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Search,
  FileSpreadsheet,
  FileImage,
  File,
  Calendar,
  Eye,
  Filter
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 임시 데이터 - 추후 Sanity CMS에서 관리
const resources = {
  forms: [
    {
      id: 1,
      title: "교정신청서",
      description: "교정 서비스 신청을 위한 공식 양식",
      fileType: "PDF",
      fileSize: "256KB",
      downloads: 1234,
      date: "2024-01-15",
      category: "신청서",
      icon: FileText,
    },
    {
      id: 2,
      title: "시험신청서",
      description: "시험 서비스 신청을 위한 공식 양식",
      fileType: "PDF",
      fileSize: "312KB",
      downloads: 987,
      date: "2024-01-15",
      category: "신청서",
      icon: FileText,
    },
    {
      id: 3,
      title: "견적요청서",
      description: "시험·교정 견적 요청 양식",
      fileType: "DOCX",
      fileSize: "184KB",
      downloads: 756,
      date: "2024-01-10",
      category: "신청서",
      icon: FileSpreadsheet,
    },
  ],
  guides: [
    {
      id: 4,
      title: "교정 절차 안내",
      description: "교정 신청부터 성적서 발급까지의 전체 프로세스",
      fileType: "PDF",
      fileSize: "1.2MB",
      downloads: 543,
      date: "2024-01-08",
      category: "가이드",
      icon: FileText,
    },
    {
      id: 5,
      title: "시험 항목별 가이드",
      description: "안전용품별 시험 항목 및 기준 안내",
      fileType: "PDF",
      fileSize: "2.4MB",
      downloads: 892,
      date: "2024-01-05",
      category: "가이드",
      icon: FileText,
    },
    {
      id: 6,
      title: "KOLAS 인증 안내",
      description: "KOLAS 공인 성적서의 이해와 활용",
      fileType: "PDF",
      fileSize: "856KB",
      downloads: 432,
      date: "2024-01-03",
      category: "가이드",
      icon: FileText,
    },
  ],
  standards: [
    {
      id: 7,
      title: "KS B 5521 인장시험기",
      description: "인장시험기 관련 한국산업표준",
      fileType: "PDF",
      fileSize: "3.2MB",
      downloads: 234,
      date: "2023-12-20",
      category: "표준",
      icon: File,
    },
    {
      id: 8,
      title: "KS B 5533 압축시험기",
      description: "압축시험기 관련 한국산업표준",
      fileType: "PDF",
      fileSize: "2.8MB",
      downloads: 198,
      date: "2023-12-20",
      category: "표준",
      icon: File,
    },
    {
      id: 9,
      title: "ISO 9001:2015",
      description: "품질경영시스템 국제표준",
      fileType: "PDF",
      fileSize: "4.1MB",
      downloads: 567,
      date: "2023-12-15",
      category: "표준",
      icon: File,
    },
  ],
  certificates: [
    {
      id: 10,
      title: "KOLAS 인정서 샘플",
      description: "KOLAS 공인교정기관 인정서 예시",
      fileType: "JPG",
      fileSize: "456KB",
      downloads: 345,
      date: "2024-01-01",
      category: "인증서",
      icon: FileImage,
    },
    {
      id: 11,
      title: "교정성적서 샘플",
      description: "교정성적서 발급 예시",
      fileType: "PDF",
      fileSize: "234KB",
      downloads: 678,
      date: "2024-01-01",
      category: "인증서",
      icon: FileText,
    },
    {
      id: 12,
      title: "시험성적서 샘플",
      description: "시험성적서 발급 예시",
      fileType: "PDF",
      fileSize: "198KB",
      downloads: 543,
      date: "2024-01-01",
      category: "인증서",
      icon: FileText,
    },
  ],
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [activeTab, setActiveTab] = useState("all")

  const allResources = [
    ...resources.forms,
    ...resources.guides,
    ...resources.standards,
    ...resources.certificates,
  ]

  const getFilteredResources = () => {
    let filtered = activeTab === "all" 
      ? allResources 
      : resources[activeTab as keyof typeof resources] || []

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "downloads") {
        return b.downloads - a.downloads
      } else if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return filtered
  }

  const handleDownload = (resource: any) => {
    // TODO: 실제 다운로드 로직 구현
    alert(`${resource.title} 다운로드를 시작합니다.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-4" variant="outline">
              <Download className="w-3 h-3 mr-1" />
              자료실
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">자료</span> 다운로드
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              시험·교정 관련 신청서, 가이드, 표준 문서를 다운로드하실 수 있습니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="자료 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">최신순</SelectItem>
                  <SelectItem value="downloads">다운로드순</SelectItem>
                  <SelectItem value="name">이름순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-5 mb-8">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="forms">신청서</TabsTrigger>
                <TabsTrigger value="guides">가이드</TabsTrigger>
                <TabsTrigger value="standards">표준</TabsTrigger>
                <TabsTrigger value="certificates">인증서</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="p-6 h-full hover-lift group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-lg bg-gradient-primary-light">
                            <resource.icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="outline">{resource.fileType}</Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(resource.date).toLocaleDateString('ko-KR')}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {resource.downloads.toLocaleString()}
                          </span>
                          <span>{resource.fileSize}</span>
                        </div>
                        
                        <Button 
                          className="w-full group-hover:bg-gradient-primary group-hover:text-white transition-all"
                          variant="outline"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          다운로드
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {getFilteredResources().length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-3">자료 이용 안내</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 모든 자료는 무료로 다운로드 가능합니다.</li>
              <li>• 신청서는 최신 양식을 사용해주시기 바랍니다.</li>
              <li>• 표준 문서는 참고용이며, 정식 문서는 한국표준협회에서 구입하시기 바랍니다.</li>
              <li>• 자료 관련 문의는 031-862-8556~7 또는 ymy@quro.co.kr로 연락주시기 바랍니다.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
