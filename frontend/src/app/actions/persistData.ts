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

    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File { name: ${value.name}, size: ${value.size}, type: ${value.type} }`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    let hasFile = false
    const bodyData: any = {}
    
    const cleanFormData = new FormData()
    
    // Verificar se checkbox status está marcado (checkboxes desmarcados não enviam valor)
    const statusValue = formData.get('status') === 'true'
    
    formData.forEach((value, key) => {
      
      if (!['url', 'method', 'revalidate'].includes(key)) {
        if (value instanceof File) {
          if (value.size > 0) {
            console.log(`Arquivo válido encontrado: ${key}`);
            hasFile = true
            cleanFormData.append(key, value)
          } else {
            console.log(`Arquivo vazio ignorado: ${key}`);
          }
       
        } else if (key === 'status') {
          bodyData[key] = statusValue
          cleanFormData.append(key, statusValue.toString())
        } else {
          bodyData[key] = value
          cleanFormData.append(key, value as string)
        }
      }
    })

    if (!bodyData.hasOwnProperty('status')) {
      bodyData.status = statusValue
      cleanFormData.append('status', statusValue.toString())
    }

    for (let [key, value] of cleanFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File { name: ${value.name}, size: ${value.size} }`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const requestInit: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (hasFile) {
      requestInit.body = cleanFormData
    } else {
      requestInit.headers = {
        ...requestInit.headers,
        'Content-Type': 'application/json'
      }
      requestInit.body = JSON.stringify(bodyData)
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, requestInit)

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      console.log('Erro da API:', error);
      return { success: false, message: error.message || 'Erro ao salvar/editar registro' }
    }

    const responseData = await res.json().catch(() => ({}));

    revalidatePath(revalidate)
    return { success: true, message: 'Operação realizada com sucesso' }
    
  } catch (error: any) {
    console.error('Erro na persistUser:', error)
    return { success: false, message: error.message || 'Erro interno do servidor' }
  }
}