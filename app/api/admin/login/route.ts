import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      return NextResponse.json({ error: '서버 설정 오류입니다.' }, { status: 500 })
    }

    if (password === adminPassword) {
      return NextResponse.json({ message: '로그인 성공' })
    } else {
      return NextResponse.json({ error: '비밀번호가 잘못되었습니다.' }, { status: 401 })
    }

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
