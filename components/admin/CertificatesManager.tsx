'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { 
  Upload, 
  X, 
  GripVertical, 
  Edit2, 
  Trash2, 
  Plus,
  Image as ImageIcon,
  Save,
  XCircle
} from 'lucide-react'

interface Award {
  _id: string
  title: string
  description: string
  imageUrl?: string
  image?: any
  order: number
}

interface CertificatesManagerProps {
  awards: Award[]
  loadData: () => void
}

// 드래그 가능한 아이템 컴포넌트
function SortableAwardItem({ 
  award, 
  onEdit, 
  onDelete,
  isEditing,
  editingAward,
  setEditingAward,
  onSave,
  onCancelEdit,
  onImageUpload,
  onImageRemove
}: {
  award: Award
  onEdit: (award: Award) => void
  onDelete: (id: string) => void
  isEditing: boolean
  editingAward: Award | null
  setEditingAward: (award: Award | null) => void
  onSave: () => void
  onCancelEdit: () => void
  onImageUpload: (file: File) => void
  onImageRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: award._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      <Card className={`${isEditing ? 'ring-2 ring-blue-500' : ''} hover:shadow-lg transition-all`}>
        <CardContent className="p-4">
          {isEditing ? (
            // 수정 모드
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div {...attributes} {...listeners} className="cursor-grab">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-500">순서: {award.order}</span>
              </div>
              
              <div>
                <Label>제목</Label>
                <Input 
                  value={editingAward?.title}
                  onChange={(e) => setEditingAward({...editingAward!, title: e.target.value})}
                  placeholder="예: KOLAS 공인교정기관 인정서"
                />
              </div>
              
              <div>
                <Label>설명</Label>
                <Input 
                  value={editingAward?.description}
                  onChange={(e) => setEditingAward({...editingAward!, description: e.target.value})}
                  placeholder="예: KC23-420"
                />
              </div>
              
              <div>
                <Label>이미지</Label>
                {editingAward?.imageUrl ? (
                  <div className="mt-2 relative group">
                    <img 
                      src={editingAward.imageUrl} 
                      alt={editingAward.title} 
                      className="w-full h-32 object-contain border rounded-lg bg-gray-50"
                    />
                    <Button
                      onClick={onImageRemove}
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                      제거
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onImageUpload(file)
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button onClick={onSave} size="sm" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </Button>
                <Button onClick={onCancelEdit} variant="outline" size="sm" className="flex-1">
                  <XCircle className="h-4 w-4 mr-2" />
                  취소
                </Button>
              </div>
            </div>
          ) : (
            // 보기 모드
            <div>
              <div className="flex items-start gap-3">
                <div {...attributes} {...listeners} className="cursor-grab mt-1">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{award.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                      <p className="text-xs text-gray-400 mt-2">순서: {award.order}</p>
                    </div>
                    
                    {award.imageUrl && (
                      <img 
                        src={award.imageUrl} 
                        alt={award.title} 
                        className="w-20 h-20 object-contain ml-3 border rounded-lg bg-gray-50"
                      />
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button onClick={() => onEdit(award)} variant="outline" size="sm" className="flex-1">
                      <Edit2 className="h-4 w-4 mr-2" />
                      수정
                    </Button>
                    <Button onClick={() => onDelete(award._id)} variant="outline" size="sm" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CertificatesManager({ awards, loadData }: CertificatesManagerProps) {
  const [newAward, setNewAward] = useState<any>(null)
  const [editingAward, setEditingAward] = useState<any>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [sortedAwards, setSortedAwards] = useState(awards)

  // 드래그앤드롭 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // awards prop이 변경되면 sortedAwards 업데이트
  useState(() => {
    setSortedAwards(awards)
  })

  // 이미지 업로드 함수
  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const data = await response.json()
        return data
      }
    } catch (error) {
      toast.error('이미지 업로드 실패')
    }
    return null
  }

  // 드래그 종료 처리
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = sortedAwards.findIndex((item) => item._id === active.id)
      const newIndex = sortedAwards.findIndex((item) => item._id === over?.id)
      
      const newOrder = arrayMove(sortedAwards, oldIndex, newIndex)
      setSortedAwards(newOrder)
      
      // 순서 업데이트 API 호출
      try {
        const updates = newOrder.map((item, index) => ({
          _id: item._id,
          order: index
        }))
        
        for (const update of updates) {
          await fetch('/api/sanity/awards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _id: update._id,
              title: newOrder.find(a => a._id === update._id)?.title,
              description: newOrder.find(a => a._id === update._id)?.description,
              image: newOrder.find(a => a._id === update._id)?.image,
              order: update.order
            })
          })
        }
        
        toast.success('순서가 변경되었습니다')
        loadData()
      } catch (error) {
        toast.error('순서 변경 실패')
      }
    }
  }

  // 파일 드롭 처리
  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile && newAward) {
      const data = await uploadImage(imageFile)
      if (data) {
        setNewAward({ ...newAward, imageUrl: data.url, image: data.image })
        toast.success('이미지 업로드 완료')
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>인증서 및 특허 관리</CardTitle>
        <CardDescription>
          드래그로 순서를 변경하고, 클릭하여 수정할 수 있습니다
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 새 인증서 추가 버튼 */}
        <div className="flex justify-end">
          <Button 
            onClick={() => {
              setNewAward({
                title: '',
                description: '',
                imageUrl: '',
                order: sortedAwards.length
              })
              setEditingAward(null)
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            새 인증서 추가
          </Button>
        </div>

        {/* 새 인증서 추가 폼 */}
        {newAward && (
          <Card className="border-2 border-blue-500 bg-blue-50/50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">새 인증서 추가</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>제목 *</Label>
                    <Input 
                      value={newAward.title}
                      onChange={(e) => setNewAward({...newAward, title: e.target.value})}
                      placeholder="예: KOLAS 공인교정기관 인정서"
                    />
                  </div>
                  <div>
                    <Label>설명</Label>
                    <Input 
                      value={newAward.description}
                      onChange={(e) => setNewAward({...newAward, description: e.target.value})}
                      placeholder="예: KC23-420"
                    />
                  </div>
                </div>
                
                {/* 이미지 업로드 영역 */}
                <div>
                  <Label>이미지</Label>
                  <div 
                    className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragOver(true)
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleFileDrop}
                  >
                    {newAward.imageUrl ? (
                      <div className="relative">
                        <img 
                          src={newAward.imageUrl} 
                          alt="미리보기" 
                          className="max-h-32 mx-auto object-contain"
                        />
                        <Button
                          onClick={() => setNewAward({...newAward, imageUrl: '', image: null})}
                          variant="destructive"
                          size="sm"
                          className="absolute top-0 right-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600 mb-2">
                          이미지를 드래그하여 놓거나 클릭하여 선택하세요
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const data = await uploadImage(file)
                              if (data) {
                                setNewAward({ ...newAward, imageUrl: data.url, image: data.image })
                                toast.success('이미지 업로드 완료')
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          파일 선택
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={async () => {
                      if (!newAward.title) {
                        toast.error('제목을 입력해주세요')
                        return
                      }
                      
                      try {
                        const response = await fetch('/api/sanity/awards', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(newAward)
                        })
                        if (response.ok) {
                          toast.success('인증서가 추가되었습니다')
                          setNewAward(null)
                          loadData()
                        }
                      } catch (error) {
                        toast.error('인증서 추가 실패')
                      }
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    추가
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setNewAward(null)}
                    className="flex-1"
                  >
                    취소
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 인증서 목록 */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={sortedAwards.map(a => a._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sortedAwards.map((award) => (
                <SortableAwardItem
                  key={award._id}
                  award={award}
                  isEditing={editingAward?._id === award._id}
                  editingAward={editingAward}
                  setEditingAward={setEditingAward}
                  onEdit={(award) => {
                    setEditingAward(award)
                    setNewAward(null)
                  }}
                  onDelete={async (id) => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                      try {
                        const response = await fetch(`/api/sanity/awards?id=${id}`, {
                          method: 'DELETE'
                        })
                        if (response.ok) {
                          toast.success('인증서가 삭제되었습니다')
                          loadData()
                        }
                      } catch (error) {
                        toast.error('인증서 삭제 실패')
                      }
                    }
                  }}
                  onSave={async () => {
                    if (!editingAward.title) {
                      toast.error('제목을 입력해주세요')
                      return
                    }
                    
                    try {
                      const updateData = {
                        _id: editingAward._id,
                        title: editingAward.title,
                        description: editingAward.description,
                        order: editingAward.order,
                        image: editingAward.image || null
                      }
                      
                      const response = await fetch('/api/sanity/awards', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateData)
                      })
                      if (response.ok) {
                        toast.success('인증서가 수정되었습니다')
                        setEditingAward(null)
                        loadData()
                      }
                    } catch (error) {
                      toast.error('인증서 수정 실패')
                    }
                  }}
                  onCancelEdit={() => setEditingAward(null)}
                  onImageUpload={async (file) => {
                    const data = await uploadImage(file)
                    if (data) {
                      setEditingAward({ ...editingAward, imageUrl: data.url, image: data.image })
                      toast.success('이미지 업로드 완료')
                    }
                  }}
                  onImageRemove={() => {
                    setEditingAward({ ...editingAward, imageUrl: '', image: null })
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  )
}
