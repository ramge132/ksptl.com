import { NextRequest, NextResponse } from 'next/server'
import { getLandingPage, updateLandingPage } from '@/lib/sanity-extended'

export async function GET() {
  try {
    const data = await getLandingPage()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch landing page' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 토큰 확인 (디버깅용)
    const hasToken = !!process.env.SANITY_API_TOKEN
    console.log('API Route - Token exists:', hasToken)
    console.log('API Route - Token first 10 chars:', process.env.SANITY_API_TOKEN?.substring(0, 10))
    
    const data = await request.json()
    const result = await updateLandingPage(data)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Update error:', error)
    console.error('Error details:', error.message)
    return NextResponse.json({ 
      error: 'Failed to update landing page',
      details: error.message 
    }, { status: 500 })
  }
}
