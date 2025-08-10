import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

// GET: 모든 시험 카테고리 가져오기
export async function GET() {
  try {
    const categories = await client.fetch(`
      *[_type == "testCategory"] | order(order asc) {
        _id,
        key,
        name,
        icon,
        description,
        subcategories,
        order,
        isActive
      }
    `)
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch test categories:', error)
    return NextResponse.json({ error: 'Failed to fetch test categories' }, { status: 500 })
  }
}

// POST: 새 카테고리 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const result = await client.create({
      _type: 'testCategory',
      ...body
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to create test category:', error)
    return NextResponse.json({ error: 'Failed to create test category' }, { status: 500 })
  }
}

// PUT: 카테고리 업데이트
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { _id, ...updates } = body
    
    const result = await client
      .patch(_id)
      .set(updates)
      .commit()
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to update test category:', error)
    return NextResponse.json({ error: 'Failed to update test category' }, { status: 500 })
  }
}

// DELETE: 카테고리 삭제
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    await client.delete(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete test category:', error)
    return NextResponse.json({ error: 'Failed to delete test category' }, { status: 500 })
  }
}
