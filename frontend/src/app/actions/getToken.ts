'use server'

import { cookies } from 'next/headers'

import { decodeJwt } from 'jose';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role?: string;
  isAdmin: boolean;
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null
    
    if (!token) return { user: null };
    
    const payload = decodeJwt(token);
    const user: User = {
      id: payload.sub as string,
      name: payload.name as string,
      email: payload.email as string,
      avatar: payload.avatar as string | null,
      role: payload.role as string | undefined,
      isAdmin: payload.isAdmin as boolean,
    };
    
    return { user };
  } catch (error) {
    console.error('Erro ao buscar sessão:', error)
    return { user: null };
  }
}
