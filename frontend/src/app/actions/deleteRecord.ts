'use server'

import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/auth'

export async function deleteRecord(formData: FormData) {
    const { token } = await requireAuth();
    const id = formData.get("id") as string;
    const url = formData.get("url") as string;
    const revalidate = formData.get("revalidate") as string;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    })

    if (!res.ok) {
        console.log("Erro ao excluir usuário")
    }

    revalidatePath(`${revalidate}`)
}