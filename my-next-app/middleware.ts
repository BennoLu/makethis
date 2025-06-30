import { NextRequest, NextResponse } from 'next/server'

const publicPages = ['/login']      // add /register, /about … if needed

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    /* 💡  bypass API + public pages */
    if (pathname.startsWith('/api') || publicPages.includes(pathname))
        return NextResponse.next()

    const token = req.cookies.get('access_token')?.value
    if (!token)
        return NextResponse.redirect(new URL('/login', req.url))

    return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|favicon.ico).*)'] }
