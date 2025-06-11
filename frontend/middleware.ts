// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get('jwt')?.value

  const isProtected =
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/post')

  if (isProtected && !jwt) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// 👇 Matcher config tells Next.js which paths to run middleware on
export const config = {
  matcher: ['/', '/profile/:path*', '/post/:path*']
}
