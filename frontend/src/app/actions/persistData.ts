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
    
    // Se não há status no FormData, definir como false
    let hasStatus = false
    
    formData.forEach((value, key) => {
      if (key === 'status') hasStatus = true
      if (!['url', 'method', 'revalidate'].includes(key)) {
        if (value instanceof File && value.size > 0) {
          hasFile = true
          cleanFormData.append(key, value)
        } else if (key === 'status') {
          const statusValue = value === 'true'
          bodyData[key] = statusValue
          cleanFormData.append(key, statusValue.toString())
        } else if (key !== 'imageUrl' || !hasFile) { // Não enviar imageUrl se há arquivo
          bodyData[key] = value
          cleanFormData.append(key, value as string)
        }
      }
    })

    if (id) {
      bodyData.id = id
      cleanFormData.append('id', id)
    }
    
    // Se não há status, definir como false
    if (!hasStatus) {
      bodyData.status = false
      cleanFormData.append('status', 'false')
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

    console.log("recebendo resposta do fetch", res)

    console.log("recebendo dados enviados", bodyData)

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