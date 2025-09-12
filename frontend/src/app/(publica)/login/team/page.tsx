'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/app/components/sessionProvider'

export default function TeamLoginPage() {
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

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/login`, {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Área da Equipe
                    </h2>
                    <p className="text-gray-400">
                        Faça login para acessar o dashboard administrativo
                    </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                    <form action={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite seu email"
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
                                required
                                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            {isLoading ? 'Entrando...' : 'Entrar no Dashboard'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <p className="text-center text-sm text-gray-400">
                            Acesso restrito aos membros da equipe
                        </p>
                        <div className="mt-2 text-center">
                            <a 
                                href="/login" 
                                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                            >
                                ← Voltar para login de usuários
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
