"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Search,
  Filter,
  Book,
  FileUp
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
interface Resource {
  id: number
  title: string
  description: string
  fileType: string
  fileSize: string
  category: "신청서" | "가이드"
  icon: React.ElementType
  filePath: string
}

const ResourceCard = ({ resource, index }: { resource: Resource; index: number }) => {

  return (
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
        <p className="text-sm text-muted-foreground mb-4 h-10">{resource.description}</p>
        
        <div className="flex items-center justify-end text-xs text-muted-foreground mb-4">
          <span>{resource.fileSize}</span>
        </div>
        
        <a href={resource.filePath} download>
          <Button 
            className="w-full group-hover:bg-gradient-primary group-hover:text-white transition-all"
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            다운로드
          </Button>
        </a>
      </Card>
    </motion.div>
  )
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("type")
  const [activeTab, setActiveTab] = useState("all")

  const resourcesData: Resource[] = [
    {
      id: 1,
      title: "교정신청서",
      description: "교정 서비스 신청을 위한 공식 양식",
      fileType: "HWP",
      fileSize: "24 KB",
      category: "신청서",
      icon: FileUp,
      filePath: "/files/교정신청서.hwp",
    },
    {
      id: 2,
      title: "시험신청서",
      description: "시험 서비스 신청을 위한 공식 양식",
      fileType: "HWP",
      fileSize: "23 KB",
      category: "신청서",
      icon: FileUp,
      filePath: "/files/시험신청서.hwp",
    },
    {
      id: 3,
      title: "스마트 활선경보기 (한국어)",
      description: "스마트 활선경보기 사용자 가이드 (국문)",
      fileType: "PDF",
      fileSize: "1.1 MB",
      category: "가이드",
      icon: Book,
      filePath: "/files/스마트활선경보기_한국어.pdf",
    },
    {
      id: 4,
      title: "스마트 활선경보기 (영어)",
      description: "Smart Live-Line Detector User Guide (English)",
      fileType: "PDF",
      fileSize: "1.1 MB",
      category: "가이드",
      icon: Book,
      filePath: "/files/스마트활선경보기_영어.pdf",
    },
    {
      id: 5,
      title: "활선접근경보기 (한국어)",
      description: "활선접근경보기 사용자 가이드 (국문)",
      fileType: "PDF",
      fileSize: "1.2 MB",
      category: "가이드",
      icon: Book,
      filePath: "/files/활선접근경보기_한국어.pdf",
    },
    {
      id: 6,
      title: "활선접근경보기 (영어)",
      description: "Live-Line Detector User Guide (English)",
      fileType: "PDF",
      fileSize: "1.2 MB",
      category: "가이드",
      icon: Book,
      filePath: "/files/활선접근경보기_영어.pdf",
    },
    {
      id: 7,
      title: "한국안전용품시험연구원 배너",
      description: "기관 홍보용 배너",
      fileType: "PDF",
      fileSize: "1.3 MB",
      category: "가이드",
      icon: FileText,
      filePath: "/files/한국안전용품시험연구원_배너.pdf",
    },
    {
      id: 8,
      title: "큐로시험기 배너",
      description: "큐로 시험기 홍보용 배너",
      fileType: "PDF",
      fileSize: "1.4 MB",
      category: "가이드",
      icon: FileText,
      filePath: "/files/큐로시험기_배너.pdf",
    },
  ]

  const getFilteredResources = () => {
    let filtered = activeTab === "all" 
      ? resourcesData
      : resourcesData.filter(r => r.category === activeTab)

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    filtered.sort((a, b) => {
      if (sortBy === "type") {
        if (a.category === "신청서" && b.category !== "신청서") return -1
        if (a.category !== "신청서" && b.category === "신청서") return 1
        return a.title.localeCompare(b.title)
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    return filtered
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
              시험·교정 관련 신청서, 가이드 문서를 다운로드하실 수 있습니다
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
                  <SelectItem value="type">유형별</SelectItem>
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
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="신청서">신청서</TabsTrigger>
                <TabsTrigger value="가이드">가이드</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource, index) => (
                    <ResourceCard resource={resource} index={index} key={resource.id} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="신청서">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource, index) => (
                    <ResourceCard resource={resource} index={index} key={resource.id} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="가이드">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredResources().map((resource, index) => (
                    <ResourceCard resource={resource} index={index} key={resource.id} />
                  ))}
                </div>
              </TabsContent>

              {getFilteredResources().length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                </div>
              )}
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
              <li>• 자료 관련 문의는 031-862-8556~7 또는 ymy@quro.co.kr로 연락주시기 바랍니다.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
