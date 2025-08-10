'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { 
  Loader2, Plus, Trash2, Save, ChevronDown, ChevronRight, 
  Shield, HardHat, Footprints, Shirt, AlertTriangle, Wrench, Hand,
  Edit2, X, Check
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge'

interface TestCategory {
  _id?: string
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

const iconMap: Record<string, any> = {
  shield: Shield,
  hardhat: HardHat,
  footprints: Footprints,
  shirt: Shirt,
  alerttriangle: AlertTriangle,
  wrench: Wrench,
  hand: Hand,
}

export default function TestCategoryManager() {
  const [categories, setCategories] = useState<TestCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<{ categoryId: string, index: number } | null>(null)
  const [editingTest, setEditingTest] = useState<{ categoryId: string, subcategoryIndex: number, testIndex: number } | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/sanity/test-categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
      toast.error('카테고리 로드 실패')
    } finally {
      setLoading(false)
    }
  }

  const saveCategory = async (category: TestCategory) => {
    try {
      const method = category._id ? 'PUT' : 'POST'
      const response = await fetch('/api/sanity/test-categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      })
      
      if (response.ok) {
        toast.success('저장되었습니다')
        loadCategories()
      }
    } catch (error) {
      toast.error('저장 실패')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('정말 이 카테고리를 삭제하시겠습니까?')) return
    
    try {
      const response = await fetch(`/api/sanity/test-categories?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        toast.success('삭제되었습니다')
        loadCategories()
      }
    } catch (error) {
      toast.error('삭제 실패')
    }
  }

  const addCategory = () => {
    const newCategory: TestCategory = {
      key: 'new_category',
      name: '새 카테고리',
      icon: 'shield',
      description: '',
      subcategories: [],
      order: categories.length,
      isActive: true
    }
    setCategories([...categories, newCategory])
  }

  const addSubcategory = (categoryIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].subcategories.push({
      type: '새 중분류',
      tests: []
    })
    setCategories(updated)
  }

  const addTest = (categoryIndex: number, subcategoryIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].subcategories[subcategoryIndex].tests.push('새 시험항목')
    setCategories(updated)
  }

  const removeSubcategory = (categoryIndex: number, subcategoryIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].subcategories.splice(subcategoryIndex, 1)
    setCategories(updated)
  }

  const removeTest = (categoryIndex: number, subcategoryIndex: number, testIndex: number) => {
    const updated = [...categories]
    updated[categoryIndex].subcategories[subcategoryIndex].tests.splice(testIndex, 1)
    setCategories(updated)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>시험 카테고리 관리</CardTitle>
            <CardDescription>시험 카테고리와 세부 항목을 계층적으로 관리합니다</CardDescription>
          </div>
          <Button onClick={addCategory}>
            <Plus className="mr-2 h-4 w-4" />
            카테고리 추가
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {categories.map((category, categoryIndex) => {
              const Icon = iconMap[category.icon] || Shield
              
              return (
                <Card key={category._id || categoryIndex} className="overflow-hidden">
                  <AccordionItem value={`category-${categoryIndex}`} className="border-0">
                    <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-primary-light">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold flex items-center gap-2">
                              {category.name}
                              {!category.isActive && <Badge variant="secondary">비활성</Badge>}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {category.subcategories.length}개 중분류
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {/* 카테고리 기본 정보 */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="space-y-2">
                            <Label>카테고리 키</Label>
                            <Input
                              value={category.key}
                              onChange={(e) => {
                                const updated = [...categories]
                                updated[categoryIndex].key = e.target.value
                                setCategories(updated)
                              }}
                              placeholder="예: mask"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>카테고리명</Label>
                            <Input
                              value={category.name}
                              onChange={(e) => {
                                const updated = [...categories]
                                updated[categoryIndex].name = e.target.value
                                setCategories(updated)
                              }}
                              placeholder="예: 마스크"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>아이콘</Label>
                            <Select
                              value={category.icon}
                              onValueChange={(value) => {
                                const updated = [...categories]
                                updated[categoryIndex].icon = value
                                setCategories(updated)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="shield">Shield</SelectItem>
                                <SelectItem value="hardhat">HardHat</SelectItem>
                                <SelectItem value="footprints">Footprints</SelectItem>
                                <SelectItem value="shirt">Shirt</SelectItem>
                                <SelectItem value="alerttriangle">AlertTriangle</SelectItem>
                                <SelectItem value="wrench">Wrench</SelectItem>
                                <SelectItem value="hand">Hand</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-3 space-y-2">
                            <Label>설명</Label>
                            <Input
                              value={category.description}
                              onChange={(e) => {
                                const updated = [...categories]
                                updated[categoryIndex].description = e.target.value
                                setCategories(updated)
                              }}
                              placeholder="예: 방진, 방독, 송기마스크 전문 시험"
                            />
                          </div>
                          <div className="col-span-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={category.isActive}
                                onCheckedChange={(checked) => {
                                  const updated = [...categories]
                                  updated[categoryIndex].isActive = checked
                                  setCategories(updated)
                                }}
                              />
                              <Label>활성화</Label>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => saveCategory(category)}
                              >
                                <Save className="mr-2 h-4 w-4" />
                                저장
                              </Button>
                              {category._id && (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteCategory(category._id!)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 중분류 관리 */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">중분류 및 시험항목</h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addSubcategory(categoryIndex)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              중분류 추가
                            </Button>
                          </div>

                          {category.subcategories.map((subcategory, subIndex) => (
                            <Card key={subIndex} className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  {editingSubcategory?.categoryId === (category._id || `temp-${categoryIndex}`) && 
                                   editingSubcategory?.index === subIndex ? (
                                    <Input
                                      value={subcategory.type}
                                      onChange={(e) => {
                                        const updated = [...categories]
                                        updated[categoryIndex].subcategories[subIndex].type = e.target.value
                                        setCategories(updated)
                                      }}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          setEditingSubcategory(null)
                                        }
                                      }}
                                      autoFocus
                                      className="max-w-xs"
                                    />
                                  ) : (
                                    <h5 
                                      className="font-medium flex items-center gap-2 cursor-pointer hover:text-primary"
                                      onClick={() => setEditingSubcategory({ 
                                        categoryId: category._id || `temp-${categoryIndex}`, 
                                        index: subIndex 
                                      })}
                                    >
                                      {subcategory.type}
                                      <Edit2 className="h-3 w-3" />
                                    </h5>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeSubcategory(categoryIndex, subIndex)}
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label className="text-xs">시험항목</Label>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => addTest(categoryIndex, subIndex)}
                                    >
                                      <Plus className="mr-1 h-3 w-3" />
                                      항목 추가
                                    </Button>
                                  </div>
                                  <div className="space-y-1">
                                    {subcategory.tests.map((test, testIndex) => (
                                      <div key={testIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        {editingTest?.categoryId === (category._id || `temp-${categoryIndex}`) &&
                                         editingTest?.subcategoryIndex === subIndex &&
                                         editingTest?.testIndex === testIndex ? (
                                          <Input
                                            value={test}
                                            onChange={(e) => {
                                              const updated = [...categories]
                                              updated[categoryIndex].subcategories[subIndex].tests[testIndex] = e.target.value
                                              setCategories(updated)
                                            }}
                                            onKeyPress={(e) => {
                                              if (e.key === 'Enter') {
                                                setEditingTest(null)
                                              }
                                            }}
                                            autoFocus
                                            className="flex-1"
                                          />
                                        ) : (
                                          <span 
                                            className="flex-1 text-sm cursor-pointer hover:text-primary"
                                            onClick={() => setEditingTest({
                                              categoryId: category._id || `temp-${categoryIndex}`,
                                              subcategoryIndex: subIndex,
                                              testIndex
                                            })}
                                          >
                                            {test}
                                          </span>
                                        )}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => removeTest(categoryIndex, subIndex, testIndex)}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
