'use server'

import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/auth'

export async function persistData(
  prevState: { success: boolean; message: any } | null,
  payload: FormData | any
) {
  try {
    
    let formData: FormData

    if (payload instanceof FormData) {
      formData = payload
    } else if (prevState instanceof FormData) {
      formData = prevState as FormData
    } else {
      return { success: false, message: 'FormData não encontrado' }
    }
    
    const { token } = await requireAuth()
    
    const id = formData.get('id') as string | null
    const url = formData.get('url') as string
    const method = (formData.get('method') as string) || 'POST'
    const revalidate = formData.get('revalidate') as string

    // Detectar se há arquivos na requisição
    let hasFile = false
    const bodyData: any = {}
    
    // Criar FormData limpo para upload de arquivo
    const cleanFormData = new FormData()
    
    // Verificar se checkbox status está marcado (checkboxes desmarcados não enviam valor)
    const statusValue = formData.get('status') === 'true'
    
    formData.forEach((value, key) => {
      if (!['url', 'method', 'revalidate'].includes(key)) {
        if (value instanceof File) {
          if (value.size > 0) {
            hasFile = true
            cleanFormData.append(key, value)
          }
          // Se é arquivo mas tem size 0, não adicionar ao cleanFormData
        } else if (key === 'status') {
          bodyData[key] = statusValue
          cleanFormData.append(key, statusValue.toString())
        } else {
          bodyData[key] = value
          cleanFormData.append(key, value as string)
        }
      }
    })

    // Sempre definir status (true se checkbox marcado, false caso contrário)
    if (!bodyData.hasOwnProperty('status')) {
      bodyData.status = statusValue
      cleanFormData.append('status', statusValue.toString())
    }

    if (id) {
      bodyData.id = id
      cleanFormData.append('id', id)
    }

    // Se há arquivo, enviar FormData; senão, enviar JSON
    const requestInit: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (hasFile) {
      // Para upload de arquivos, usar FormData limpo
      requestInit.body = cleanFormData
      // Não definir Content-Type, deixar o browser definir com boundary
    } else {
      // Para dados sem arquivo, usar JSON
      requestInit.headers = {
        ...requestInit.headers,
        'Content-Type': 'application/json'
      }
      requestInit.body = JSON.stringify(bodyData)
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, requestInit)

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