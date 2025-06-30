import { NextRequest, NextResponse } from 'next/server'

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'http://localhost:8055'
const ONE_HOUR = 60 * 60

export async function POST(req: NextRequest) {
    const refresh = req.cookies.get('refresh_token')?.value
    if (!refresh)
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 })

    const res = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refresh })
    })

    if (!res.ok)
        return NextResponse.json({ error: 'Refresh failed' }, { status: 401 })

    const { data } = await res.json()         // new access_token
    const prod = process.env.NODE_ENV === 'production'

    const resp = NextResponse.json({ success: true })
    resp.cookies.set('access_token', data.access_token, {
        httpOnly: true, sameSite: 'lax', secure: prod, path: '/', maxAge: ONE_HOUR
    })
    return resp
}
