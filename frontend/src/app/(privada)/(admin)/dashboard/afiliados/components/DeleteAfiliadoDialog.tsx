"use client"

import { useEffect, useRef } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DeleteAfiliadoDialogProps } from "@/types/afiliado"

export default function DeleteAfiliadoDialog({ afiliado, children, open, onOpenChange }: DeleteAfiliadoDialogProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const cancelRef = useRef<HTMLButtonElement>(null)

    const handleDelete = async () => {
        if (formRef.current) {
            const formData = new FormData(formRef.current)
            
            try {
                // Aqui você pode chamar a action ou fazer o delete
                // Para agora, apenas simular o fechamento
                if (onOpenChange) {
                    onOpenChange(false);
                } else {
                    cancelRef.current?.click();
                }
            } catch (error) {
                console.error('Erro ao deletar:', error)
            }
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                        Excluir Afiliado
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Tem certeza que deseja excluir o produto "{afiliado.title}"? 
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel 
                        ref={cancelRef}
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
                    >
                        Cancelar
                    </AlertDialogCancel>
                    
                    <form ref={formRef} className="inline">
                        <input type="hidden" name="id" value={afiliado.id} />
                        <input type="hidden" name="url" value="afiliados" />
                        <input type="hidden" name="revalidate" value="/dashboard/afiliados" />
                        
                        <AlertDialogAction
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 text-white cursor-pointer"
                        >
                            Excluir
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
