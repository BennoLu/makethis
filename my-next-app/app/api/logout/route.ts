import { NextRequest, NextResponse } from 'next/server'

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'http://localhost:8055'

export async function POST(req: NextRequest) {
    const refresh = req.cookies.get('refresh_token')?.value
    if (refresh) {
        // tell Directus to invalidate it (ignore failure)
        await fetch(`${DIRECTUS_URL}/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refresh })
        })
    }

    const resp = NextResponse.json({ success: true })
    resp.cookies.set('access_token', '', { maxAge: 0, path: '/' })
    resp.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })
    return resp
}
