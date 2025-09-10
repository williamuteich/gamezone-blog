import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'


const publicRoutes = [
    { path: '/login', whenAuthenticated: 'redirect' },
    { path: '/', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'

async function verifyJWT(token: string) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })

        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return null;
        }

        return payload
    } catch (err) {
        return null
    }
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('token')?.value
    const payload = authToken ? await verifyJWT(authToken) : null


    if (!authToken && publicRoute) return NextResponse.next()

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = payload?.isAdmin ? '/dashboard' : '/profile'
        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && !publicRoute) {
        if (!payload) { 
            const response = NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url))
            response.cookies.delete('token')
            return response
        }

        if (path.startsWith('/dashboard') && !payload.isAdmin) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = '/profile'
            return NextResponse.redirect(redirectUrl)
        }

        return NextResponse.next()

    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}