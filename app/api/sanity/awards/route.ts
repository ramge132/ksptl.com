import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// 서버 사이드 전용 클라이언트
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

export async function GET() {
  try {
    const awards = await serverClient.fetch(`
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
    
    // 이미지 URL을 서버에서 완전히 생성
    const awardsWithImageUrls = awards.map((award: any) => {
      if (award.image && award.image.asset && award.image.asset._ref) {
        const ref = award.image.asset._ref
        const imageId = ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')
        return {
          ...award,
          imageUrl: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${imageId}`
        }
      }
      return award
    })
    
    console.log('Sending awards with image URLs:', awardsWithImageUrls)
    
    // 캐싱 방지를 위한 헤더 설정
    return NextResponse.json(awardsWithImageUrls, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    console.error('Failed to fetch awards:', error)
    return NextResponse.json({ error: 'Failed to fetch awards' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received award data:', data)
    
    if (data._id) {
      // Update existing award
      const updateData: any = {
        title: data.title,
        description: data.description,
        order: data.order || 0
      }
      
      // image 필드 처리 - null이거나 유효한 객체일 때만 포함
      if (data.image === null) {
        updateData.image = null
      } else if (data.image && data.image.asset && data.image.asset._ref) {
        updateData.image = data.image
      }
      
      console.log('Updating award with:', updateData)
      
      const result = await serverClient
        .patch(data._id)
        .set(updateData)
        .commit()
      
      console.log('Update result:', result)
      return NextResponse.json(result)
    } else {
      // Create new award
      const createData: any = {
        _type: 'award',
        title: data.title,
        description: data.description,
        order: data.order || 0
      }
      
      // image 필드 처리
      if (data.image && data.image.asset && data.image.asset._ref) {
        createData.image = data.image
      }
      
      console.log('Creating award with:', createData)
      
      const result = await serverClient.create(createData)
      
      console.log('Create result:', result)
      return NextResponse.json(result)
    }
  } catch (error) {
    console.error('Failed to save award - Full error:', error)
    return NextResponse.json({ 
      error: 'Failed to save award', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const data = await request.json()
    console.log('Updating award with ID:', id, 'Data:', data)
    
    const updateData: any = {
      title: data.title,
      description: data.description,
      order: data.order || 0
    }
    
    // imageUrl이 있으면 image 객체로 변환
    if (data.imageUrl) {
      // Sanity CDN URL에서 asset reference 추출
      const match = data.imageUrl.match(/\/([^\/]+)\.(jpg|png|webp)/)
      if (match) {
        const assetId = match[1].replace(/-/g, '')
        updateData.image = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: `image-${assetId}-${match[2]}`
          }
        }
      }
    } else if (data.image) {
      updateData.image = data.image
    }
    
    console.log('Final update data:', updateData)
    
    const result = await serverClient
      .patch(id)
      .set(updateData)
      .commit()
    
    console.log('Update result:', result)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to update award - Full error:', error)
    return NextResponse.json({ 
      error: 'Failed to update award', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await serverClient.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete award:', error)
    return NextResponse.json({ error: 'Failed to delete award' }, { status: 500 })
  }
}
