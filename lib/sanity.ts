import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // false for write operations
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // 쓰기 권한용
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// 타입 정의
export interface Award {
  _id: string
  _type: 'award'
  title: string
  description: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  } | null
  imageUrl?: string // 이미지 URL 추가
  order: number
  createdAt: string
}

export interface CompanyInfo {
  _id: string
  _type: 'companyInfo'
  heroTitle: string
  heroSubtitle: string
  whyChooseUsContent: string
  timelineContent: string
  updatedAt: string
}

export interface Timeline {
  _id: string
  _type: 'timeline'
  year: string
  title: string
  description: string
  icon: string
  order: number
}

// Sanity 쿼리 함수들
export async function getAwards(): Promise<Award[]> {
  try {
    const awards = await client.fetch(`
      *[_type == "award"] | order(order asc) {
        _id,
        _type,
        title,
        description,
        image,
        order,
        "createdAt": _createdAt
      }
    `)
    return awards
  } catch (error) {
    console.error('Failed to fetch awards:', error)
    return []
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const companyInfo = await client.fetch(`
      *[_type == "companyInfo"][0] {
        _id,
        _type,
        heroTitle,
        heroSubtitle,
        whyChooseUsContent,
        timelineContent,
        "updatedAt": _updatedAt
      }
    `)
    return companyInfo
  } catch (error) {
    console.error('Failed to fetch company info:', error)
    return null
  }
}

export async function updateCompanyInfo(data: Partial<CompanyInfo>): Promise<CompanyInfo | null> {
  try {
    // 먼저 기존 문서가 있는지 확인
    const existing = await getCompanyInfo()
    
    if (existing) {
      // 기존 문서가 있으면 업데이트
      const result = await client
        .patch(existing._id)
        .set(data)
        .commit()
      
      return result as unknown as CompanyInfo
    } else {
      // 기존 문서가 없으면 새로 생성
      const result = await client.create({
        _id: 'companyInfo-singleton',
        _type: 'companyInfo',
        ...data
      })
      
      return result as unknown as CompanyInfo
    }
  } catch (error) {
    console.error('Failed to update company info:', error)
    return null
  }
}

export async function createAward(award: Omit<Award, '_id' | '_type' | 'createdAt'>): Promise<Award | null> {
  try {
    const result = await client.create({
      _type: 'award',
      ...award,
    })
    
    return result as unknown as Award
  } catch (error) {
    console.error('Failed to create award:', error)
    return null
  }
}

export async function updateAward(id: string, data: Partial<Award>): Promise<Award | null> {
  try {
    const result = await client
      .patch(id)
      .set(data)
      .commit()
    
    return result as unknown as Award
  } catch (error) {
    console.error('Failed to update award:', error)
    return null
  }
}

export async function deleteAward(id: string): Promise<boolean> {
  try {
    await client.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete award:', error)
    return false
  }
}

// Timeline 함수들
export async function getTimeline(): Promise<Timeline[]> {
  try {
    const timeline = await client.fetch(`
      *[_type == "timeline"] | order(order asc) {
        _id,
        _type,
        year,
        title,
        description,
        icon,
        order
      }
    `)
    return timeline
  } catch (error) {
    console.error('Failed to fetch timeline:', error)
    return []
  }
}

export async function createTimelineItem(item: Omit<Timeline, '_id' | '_type'>): Promise<Timeline | null> {
  try {
    const result = await client.create({
      _type: 'timeline',
      ...item,
    })
    
    return result as unknown as Timeline
  } catch (error) {
    console.error('Failed to create timeline item:', error)
    return null
  }
}

export async function updateTimelineItem(id: string, data: Partial<Timeline>): Promise<Timeline | null> {
  try {
    const result = await client
      .patch(id)
      .set(data)
      .commit()
    
    return result as unknown as Timeline
  } catch (error) {
    console.error('Failed to update timeline item:', error)
    return null
  }
}

export async function deleteTimelineItem(id: string): Promise<boolean> {
  try {
    await client.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete timeline item:', error)
    return false
  }
}
