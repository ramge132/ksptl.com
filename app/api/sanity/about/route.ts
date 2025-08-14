import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SanityClient } from '@sanity/client'

let serverClient: SanityClient | null = null

// 서버 사이드 전용 클라이언트
function getServerClient(): SanityClient {
  if (serverClient) {
    return serverClient
  }
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN
  
  if (!projectId || !dataset) {
    throw new Error('Missing Sanity configuration')
  }
  
  serverClient = createClient({
    projectId,
    dataset,
    useCdn: false,
    apiVersion: '2024-01-01',
    token,
  })
  
  return serverClient
}

export async function GET() {
  try {
    const aboutPage = await getServerClient().fetch(`
      *[_type == "aboutPage"][0] {
        _id,
        _type,
        pageTitle,
        pageSubtitle,
        companyName,
        companyDescription,
        companyImage,
        visionTitle,
        visionContent,
        missionTitle,
        missionContent,
        businessTitle,
        businessAreas,
        certificationsTitle,
        certifications,
        headquarters,
        testLab
      }
    `)
    return NextResponse.json(aboutPage || {
      _id: 'aboutPage-singleton',
      _type: 'aboutPage',
      pageTitle: '기관소개',
      pageSubtitle: '한국안전용품시험연구원을 소개합니다',
      companyName: '(주)큐로',
      companyDescription: '시험기 제작 전문 기업',
      companyImage: null,
      visionTitle: '비전',
      visionContent: '최고의 시험기관이 되겠습니다',
      missionTitle: '미션',
      missionContent: '정확하고 신뢰할 수 있는 시험 서비스',
      businessTitle: '사업 분야',
      businessAreas: [],
      certificationsTitle: '인증 및 자격',
      certifications: [],
      headquarters: { address: '경기 양주시 은현면 화합로 941번길 83', phone: '031-862-8556', fax: '' },
      testLab: { address: '경기 양주시 은현면 화합로 701-11', phone: '031-858-3012', fax: '' }
    })
  } catch (error) {
    console.error('Failed to fetch about page:', error)
    return NextResponse.json({ error: 'Failed to fetch about page' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const client = getServerClient()
    
    // 먼저 기존 문서가 있는지 확인
    const existing = await client.fetch(`*[_type == "aboutPage"][0]`)
    
    if (existing) {
      // 기존 문서가 있으면 업데이트
      const result = await client
        .patch(existing._id)
        .set(data)
        .commit()
      
      return NextResponse.json(result)
    } else {
      // 기존 문서가 없으면 새로 생성
      const result = await client.create({
        _id: 'aboutPage-singleton',
        _type: 'aboutPage',
        ...data
      })
      
      return NextResponse.json(result)
    }
  } catch (error) {
    console.error('Failed to save about page:', error)
    return NextResponse.json({ error: 'Failed to save about page' }, { status: 500 })
  }
}
