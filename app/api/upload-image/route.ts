import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다' }, { status: 400 })
    }

    // 서버 사이드 전용 클라이언트 생성 (토큰 포함)
    const serverClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      useCdn: false,
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN, // 서버 사이드에서만 사용
    })

    // File을 Buffer로 변환
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanity에 이미지 업로드
    const asset = await serverClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({ 
      url: asset.url,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id
        }
      }
    })
  } catch (error) {
    console.error('이미지 업로드 오류:', error)
    return NextResponse.json({ error: '이미지 업로드 실패' }, { status: 500 })
  }
}
