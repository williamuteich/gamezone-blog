'use server'

import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/auth'

export async function persistUser(
  prevState: { success: boolean; message: any } | null,
  payload: FormData | any
) {
  try {
    
    let formData: FormData
    
    if (payload instanceof FormData) {
      formData = payload
    } else if (prevState instanceof FormData) {
      formData = prevState as FormData
      console.log("Parâmetros estavam trocados!")
    } else {
      return { success: false, message: 'FormData não encontrado' }
    }
    
    const { token } = await requireAuth()
    
    const id = formData.get('id') as string | null
    const url = formData.get('url') as string
    const method = (formData.get('method') as string) || 'POST'
    const revalidate = formData.get('revalidate') as string

    const bodyData: any = {}
    formData.forEach((value, key) => {
      if (!['id', 'url', 'method', 'revalidate'].includes(key)) {
        if (key === 'status' || key === 'isAdmin') {
          bodyData[key] = value === 'on'
        } else {
          bodyData[key] = value
        }
      }
    })

    if (id) bodyData.id = id

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      return { success: false, message: error.message || 'Erro ao salvar/editar registro' }
    }

    revalidatePath(revalidate)
    return { success: true, message: 'Operação realizada com sucesso' }
    
  } catch (error: any) {
    console.error('Erro na persistUser:', error)
    return { success: false, message: error.message || 'Erro interno do servidor' }
  }
}