'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/app/components/sessionProvider'

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { refreshSession } = useSession()
    const router = useRouter()

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

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', 
            })

            if (!res.ok) {
                const { error, message } = await res.json().catch(() => ({}))
                setError(error || message || 'Falha no login')
                return
            }

            // Cookie foi salvo automaticamente, agora atualiza a sessão
            await refreshSession();
            
            router.push('/dashboard')
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('Erro inesperado. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 p-4">
            <div className="w-full max-w-md p-8 bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                            <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5H3zm11.5 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5h-3.75a.75.75 0 01-.75-.75zm-8.25 6a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">GameZone Portal</h1>
                    <p className="text-gray-400">Acesse sua conta administrativa</p>
                </div>
                
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="seu@email.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Sua senha"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-800 rounded-lg">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white cursor-pointer py-3 px-4 rounded-lg font-medium transition-all ${isLoading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Acessando...
                            </span>
                        ) : (
                            'Entrar no Portal'
                        )}
                    </button>
                </form>
                
                <div className="mt-8 text-center text-gray-400 text-sm">
                    <p>© 2023 GameZone Blog - Todos os direitos reservados</p>
                </div>
            </div>
        </main>
    )
}
