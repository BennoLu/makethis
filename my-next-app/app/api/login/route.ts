import { NextRequest, NextResponse } from 'next/server'

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'http://localhost:8055'
const ONE_HOUR = 60 * 60   // access-token lifetime
const THIRTY_D = 60 * 60 * 24 * 30 // refresh-token lifetime

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok)
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const { data } = await res.json() // { access_token, refresh_token, expires }
    const { access_token, refresh_token } = data

    const prod = process.env.NODE_ENV === 'production'

    const resp = NextResponse.json({ success: true })
    resp.cookies.set('access_token', access_token, {
        httpOnly: true, sameSite: 'lax', secure: prod, path: '/', maxAge: ONE_HOUR
    })
    resp.cookies.set('refresh_token', refresh_token, {
        httpOnly: true, sameSite: 'lax', secure: prod, path: '/', maxAge: THIRTY_D
    })
    return resp
}
