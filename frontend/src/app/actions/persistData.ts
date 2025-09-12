'use server'

import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/auth'

export async function persistData(
  prevState: { success: boolean; message: any } | null,
  payload: FormData | any
) {
  try {
    console.log('=== PERSIST DATA DEBUG ===');
    console.log('prevState:', prevState);
    console.log('payload type:', typeof payload);
    console.log('payload instanceof FormData:', payload instanceof FormData);
    
    let formData: FormData

    if (payload instanceof FormData) {
      formData = payload
      console.log('Usando payload como FormData');
    } else if (prevState instanceof FormData) {
      formData = prevState as FormData
      console.log('Usando prevState como FormData');
    } else {
      console.log('ERRO: FormData não encontrado');
      return { success: false, message: 'FormData não encontrado' }
    }
    
    const { token } = await requireAuth()
    
    const id = formData.get('id') as string | null
    const url = formData.get('url') as string
    const method = (formData.get('method') as string) || 'POST'
    const revalidate = formData.get('revalidate') as string

    console.log('Dados extraídos do FormData:');
    console.log('id:', id);
    console.log('url:', url);
    console.log('method:', method);
    
    // Log de todo o conteúdo do FormData
    console.log('Conteúdo completo do FormData:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File { name: ${value.name}, size: ${value.size}, type: ${value.type} }`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Detectar se há arquivos na requisição
    let hasFile = false
    const bodyData: any = {}
    
    // Criar FormData limpo para upload de arquivo
    const cleanFormData = new FormData()
    
    // Verificar se checkbox status está marcado (checkboxes desmarcados não enviam valor)
    const statusValue = formData.get('status') === 'true'
    console.log('statusValue:', statusValue);
    
    formData.forEach((value, key) => {
      console.log(`Processando campo: ${key} = ${value instanceof File ? `File(${value.size})` : value}`);
      
      if (!['url', 'method', 'revalidate'].includes(key)) {
        if (value instanceof File) {
          if (value.size > 0) {
            console.log(`Arquivo válido encontrado: ${key}`);
            hasFile = true
            cleanFormData.append(key, value)
          } else {
            console.log(`Arquivo vazio ignorado: ${key}`);
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

    // Não adicionar ID novamente, pois já foi processado no forEach acima

    console.log('hasFile:', hasFile);
    console.log('bodyData:', bodyData);
    
    // Log do cleanFormData
    console.log('cleanFormData entries:');
    for (let [key, value] of cleanFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File { name: ${value.name}, size: ${value.size} }`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Se há arquivo, enviar FormData; senão, enviar JSON
    const requestInit: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (hasFile) {
      console.log('Enviando como FormData (com arquivo)');
      // Para upload de arquivos, usar FormData limpo
      requestInit.body = cleanFormData
      // Não definir Content-Type, deixar o browser definir com boundary
    } else {
      console.log('Enviando como JSON (sem arquivo)');
      // Para dados sem arquivo, usar JSON
      requestInit.headers = {
        ...requestInit.headers,
        'Content-Type': 'application/json'
      }
      requestInit.body = JSON.stringify(bodyData)
    }

    console.log(`Fazendo requisição para: ${process.env.NEXT_PUBLIC_API_URL}${url}`);
    console.log('requestInit:', {
      method: requestInit.method,
      headers: requestInit.headers,
      bodyType: requestInit.body instanceof FormData ? 'FormData' : 'JSON'
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, requestInit)

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      console.log('Erro da API:', error);
      return { success: false, message: error.message || 'Erro ao salvar/editar registro' }
    }

    const responseData = await res.json().catch(() => ({}));
    console.log('Dados da resposta:', responseData);

    revalidatePath(revalidate)
    return { success: true, message: 'Operação realizada com sucesso' }
    
  } catch (error: any) {
    console.error('Erro na persistUser:', error)
    return { success: false, message: error.message || 'Erro interno do servidor' }
  }
}