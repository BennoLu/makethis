// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const publicPaths = ['/login']                  // add more public pages here

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    /* ✨  skip api routes   ↓↓↓ */
    if (pathname.startsWith('/api') || publicPaths.includes(pathname)) {
        return NextResponse.next()
    }

    const token = req.cookies.get('access_token')?.value
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}
