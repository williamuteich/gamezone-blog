import { NextResponse, type MiddlewareConfig, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'


const publicRoutes = [
    { path: '/login', whenAuthenticated: 'redirect' },
    { path: '/login/team', whenAuthenticated: 'redirect' },
    { path: '/', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'
const TEAM_REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login/team'

async function verifyJWT(token: string) {
    try {
        // Verificar se token não está vazio ou muito longo
        if (!token || token.length > 2048) {
            return null;
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] })

        // Verificar expiração
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return null;
        }

        // Verificar se payload tem estrutura mínima esperada
        if (!payload.sub || !payload.name || !payload.email) {
            return null;
        }

        return payload
    } catch (err) {
        // Log de tentativas de JWT inválidos para auditoria
        console.warn('Invalid JWT attempt:', { 
            timestamp: new Date().toISOString(),
            error: err instanceof Error ? err.message : 'Unknown error'
        });
        return null
    }
}

function isTeamToken(payload: any): boolean {
    // Token de team tem 'role' (ADMIN, EDITOR, MODERATOR)
    // Token de user normal só tem name, email, avatar
    return payload && payload.role && ['ADMIN', 'EDITOR', 'MODERATOR'].includes(payload.role)
}

function isUserToken(payload: any): boolean {
    // Token de user normal não tem role, mas tem name e email
    return payload && !payload.role && payload.name && payload.email
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('token')?.value
    const payload = authToken ? await verifyJWT(authToken) : null

    // Rotas públicas sem token
    if (!authToken && publicRoute) return NextResponse.next()

    // Sem token e rota protegida
    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone()
        // Se tentar acessar dashboard, redireciona para login do team
        if (path.startsWith('/dashboard')) {
            redirectUrl.pathname = TEAM_REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        } else {
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        }
        return NextResponse.redirect(redirectUrl)
    }

    // Com token válido em rota pública que deve redirecionar
    if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
        const redirectUrl = request.nextUrl.clone()
        
        if (isTeamToken(payload)) {
            // Membros da equipe vão para o dashboard
            redirectUrl.pathname = '/dashboard'
        } else if (isUserToken(payload)) {
            // Usuários normais vão para perfil ou página inicial
            redirectUrl.pathname = '/profile'
        } else {
            // Token inválido, limpar e redirecionar
            const response = NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url))
            response.cookies.delete('token')
            return response
        }
        
        return NextResponse.redirect(redirectUrl)
    }

    // Com token em rota protegida
    if (authToken && !publicRoute) {
        if (!payload) { 
            const response = NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url))
            response.cookies.delete('token')
            return response
        }

        // Proteger dashboard apenas para membros da equipe
        if (path.startsWith('/dashboard')) {
            if (!isTeamToken(payload)) {
                const redirectUrl = request.nextUrl.clone()
                redirectUrl.pathname = '/profile'
                return NextResponse.redirect(redirectUrl)
            }
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