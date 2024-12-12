import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, defaultLanguage } from '@/config/languages'

// Get the preferred language from cookie, header, or default
function getPreferredLanguage(request: NextRequest): string {
  // Check cookie first
  const languageCookie = request.cookies.get('NEXT_LOCALE')
  if (languageCookie?.value && languages[languageCookie.value as keyof typeof languages]) {
    return languageCookie.value
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLanguage = acceptLanguage
      .split(',')[0]
      .split('-')[0]
      .toLowerCase()
    
    if (languages[preferredLanguage as keyof typeof languages]) {
      return preferredLanguage
    }
  }

  return defaultLanguage
}

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog)
  const pathname = request.nextUrl.pathname

  // Skip if the request is for static files, API routes, or other special paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // This will catch files like favicon.ico, manifest.json, etc.
  ) {
    return
  }

  // Check if the pathname already includes a locale
  const pathnameIsMissingLocale = Object.keys(languages).every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getPreferredLanguage(request)

    // e.g. incoming request is /products
    // The new URL is now /en/products
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    newUrl.search = request.nextUrl.search
    
    // Create response
    const response = NextResponse.redirect(newUrl)

    // Set cookie for future requests
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|static|.*\\..*).*)',
  ],
} 