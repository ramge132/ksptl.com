import { NextResponse } from 'next/server'
import { 
  getTimeline,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem
} from '@/lib/sanity'

export async function GET() {
  try {
    const timeline = await getTimeline()
    return NextResponse.json(timeline)
  } catch (error) {
    console.error('Failed to fetch timeline:', error)
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await createTimelineItem(data)
    
    if (result) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: 'Failed to create timeline item' }, { status: 500 })
    }
  } catch (error) {
    console.error('Failed to create timeline item:', error)
    return NextResponse.json({ error: 'Failed to create timeline item' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const data = await request.json()
    const result = await updateTimelineItem(id, data)
    
    if (result) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: 'Failed to update timeline item' }, { status: 500 })
    }
  } catch (error) {
    console.error('Failed to update timeline item:', error)
    return NextResponse.json({ error: 'Failed to update timeline item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const success = await deleteTimelineItem(id)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to delete timeline item' }, { status: 500 })
    }
  } catch (error) {
    console.error('Failed to delete timeline item:', error)
    return NextResponse.json({ error: 'Failed to delete timeline item' }, { status: 500 })
  }
}
