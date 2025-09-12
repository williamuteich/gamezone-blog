'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/app/components/sessionProvider'
import ReCAPTCHA from 'react-google-recaptcha'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const { refreshSession } = useSession()
    const router = useRouter()
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        try {
            const email = formData.get('email')?.toString()
            const password = formData.get('password')?.toString()

            if (!email || !password) {
                setError('Email e senha são obrigatórios')
                return
            }

            // Verificar se reCAPTCHA foi completado
            if (!recaptchaToken) {
                setError('Por favor, complete a verificação reCAPTCHA')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, recaptchaToken }),
                credentials: 'include', 
            })

            if (!res.ok) {
                const { error, message } = await res.json().catch(() => ({}))
                setError(error || message || 'Falha no login')
                // Reset reCAPTCHA em caso de erro
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset()
                    setRecaptchaToken(null)
                }
                return
            }

            await refreshSession();
            
            router.push('/dashboard')
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('Erro inesperado. Tente novamente.')
            // Reset reCAPTCHA em caso de erro
            if (recaptchaRef.current) {
                recaptchaRef.current.reset()
                setRecaptchaToken(null)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token)
        if (token && error === 'Por favor, complete a verificação reCAPTCHA') {
            setError(null)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500/12 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-2/3 left-1/6 w-56 h-56 bg-purple-500/8 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* Floating Particles Effect */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-300 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
                <div className="absolute bottom-20 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
            </div>
            
            <div className="w-full max-w-md space-y-8 relative z-10">
                {/* Header com ícone FORA do card */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                            <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5H3zm11.5 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5h-3.75a.75.75 0 01-.75-.75zm-8.25 6a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                        GameZone Portal
                    </h1>
                    <p className="text-gray-200 font-medium">
                        Portal dos Usuários
                    </p>
                    <p className="text-gray-300 text-sm mt-1">
                        Acesse sua conta no GameZone
                    </p>
                </div>

                <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/60 shadow-2xl">
                
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="seu@email.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-3">
                            Senha
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={handleRecaptchaChange}
                            onExpired={() => setRecaptchaToken(null)}
                            theme="dark"
                            size="normal"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-800/40 border border-red-600/60 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed cursor-pointer text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Acessando...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Entrar no Portal
                            </div>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-600/50"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-900/70 px-4 text-gray-400 font-medium">ou</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <button
                    type="button"
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg border border-gray-200 flex items-center justify-center gap-3"
                    onClick={() => {
                        // TODO: Implementar login com Google
                        console.log('Login com Google clicado');
                    }}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar com Google
                </button>
                    
                    {/* Footer Section */}
                    <div className="mt-8 pt-6 border-t border-slate-600/50">
                        <div className="text-center space-y-3">
                            <div className="pt-2">
                                <a 
                                    href="/login/team" 
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                                >
                                    Acesso da Equipe
                                    <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                            
                            <div className="text-center text-gray-300 text-sm">
                                <p>© 2023 GameZone Blog - Todos os direitos reservados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
