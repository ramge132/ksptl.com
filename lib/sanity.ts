import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

let client: SanityClient | null = null

function getClient(): SanityClient {
  if (client) {
    return client
  }
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = '2024-01-01'
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !dataset) {
    throw new Error('Missing Sanity project ID or dataset')
  }

  client = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion,
    token,
  })
  
  return client
}

export function urlFor(source: any) {
  // urlFor는 빌드 시점에도 사용될 수 있으므로, 클라이언트를 동적으로 가져옵니다.
  return imageUrlBuilder(getClient()).image(source)
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
    const awards = await getClient().fetch(`
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
    const companyInfo = await getClient().fetch(`
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
      const result = await getClient()
        .patch(existing._id)
        .set(data)
        .commit()
      
      return result as unknown as CompanyInfo
    } else {
      // 기존 문서가 없으면 새로 생성
      const result = await getClient().create({
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
    const result = await getClient().create({
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
    const result = await getClient()
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
    await getClient().delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete award:', error)
    return false
  }
}

// Timeline 함수들
export async function getTimeline(): Promise<Timeline[]> {
  try {
    const timeline = await getClient().fetch(`
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
    const result = await getClient().create({
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
    const result = await getClient()
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
    await getClient().delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete timeline item:', error)
    return false
  }
}
