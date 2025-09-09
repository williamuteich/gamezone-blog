'use server'

import { cookies } from "next/headers";

export async function handleLogin(formData: FormData): Promise<{ error?: string } | { user: any; token: string }> {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) return { error: 'Email and password are required' }

    try {
        const res = await fetch(`http://localhost:3333/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        })

        if (!res.ok) {
            const { message } = await res.json().catch(() => ({}))
            return { error: message || 'Login failed' }
        }

        const result = await res.json()
        const cookieStore = cookies()
            ; (await cookieStore).set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 1, 
                path: '/',
            })
        console.log("Login result:", result)
        return result

    } catch (err) {
        console.error('Unexpected error:', err)
        return { error: 'Login failed' }
    }
}
