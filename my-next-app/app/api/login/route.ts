// app/api/login/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json()

    const res = await fetch('http://localhost:8055/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: body.email,
            password: body.password,
        }),
    })

    if (!res.ok) {
        return NextResponse.json({ error: 'Login failed' }, { status: 401 })
    }

    const data = await res.json()
    const token = data.data.access_token

    // ✅ Set token in HTTP-only cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('access_token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return response
}
