import { NextResponse } from 'next/server'
import { getSupportInfo, updateSupportInfo } from '@/lib/sanity-extended'

export async function GET() {
  try {
    const data = await getSupportInfo()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch support info' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await updateSupportInfo(data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update support info' }, { status: 500 })
  }
}
