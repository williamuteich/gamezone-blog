'use client'

import { useRouter } from 'next/navigation'
import { useSession } from '@/app/components/sessionProvider'

export function useAuth() {
  const router = useRouter()
  const { refreshSession } = useSession()

  const logoutUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Atualizar sessão e redirecionar
        await refreshSession();
        router.push("/login");
      } else {
        throw new Error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      await refreshSession();
      router.push("/login");
    }
  }

  const logoutTeam = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Atualizar sessão e redirecionar
        await refreshSession();
        router.push("/login/team");
      } else {
        throw new Error('Erro ao fazer logout da equipe');
      }
    } catch (error) {
      console.error('Erro no logout da equipe:', error);
      // Mesmo com erro, atualizar sessão e redirecionar
      await refreshSession();
      router.push("/login/team");
    }
  }

  return {
    logoutUser,
    logoutTeam
  }
}