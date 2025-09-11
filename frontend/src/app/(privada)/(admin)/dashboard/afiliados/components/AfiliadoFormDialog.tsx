"use client"

import { useEffect, useRef, useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"
import { AfiliadoFormDialogProps } from "@/types/afiliado"
import { persistData } from "@/app/actions/persistData"

export default function AfiliadoFormDialog({ afiliado, mode, children, open, onOpenChange }: AfiliadoFormDialogProps) {
  const [state, formAction] = useActionState(persistData, null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state?.success) {
      // Fecha o modal após sucesso
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        dialogCloseRef.current?.click();
      }
      
      // Reseta o formulário
      formRef.current?.reset()
    }
  }, [state, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="id" value={afiliado?.id || ""} />
          <input type="hidden" name="url" value="/afiliados" />
          <input type="hidden" name="method" value={afiliado?.id ? "PUT" : "POST"} />
          <input type="hidden" name="revalidate" value="/dashboard/afiliados" />
          <input type="hidden" name="imageurl" value={afiliado?.imageUrl || ""} />
          
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Adicionar Novo Afiliado" : "Editar Afiliado"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {mode === "add"
                ? "Preencha os dados para criar um novo produto afiliado."
                : "Edite as informações do produto afiliado."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            {/* Imagem */}
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="relative">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-gray-600">
                  IMG
                </div>
              </div>
              <div className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {afiliado?.imageUrl ? "Alterar Imagem" : "Adicionar Imagem"}
                </Button>
                <p className="text-xs text-gray-400 mt-1">
                  URL da imagem do produto
                </p>
              </div>
            </div>

            {/* Título */}
            <div className="grid gap-3">
              <Label htmlFor="title" className="text-white">
                Título do Produto
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={afiliado?.title || ""}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: Mouse Gamer Pro X1"
                required
              />
            </div>

            {/* Descrição */}
            <div className="grid gap-3">
              <Label htmlFor="description" className="text-white">
                Descrição
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={afiliado?.description || ""}
                className="bg-gray-800 border-gray-700 text-white min-h-[80px]"
                placeholder="Descreva o produto de forma atrativa..."
                required
              />
            </div>

            {/* Link */}
            <div className="grid gap-3">
              <Label htmlFor="url" className="text-white">
                Link do Produto
              </Label>
              <Input
                id="url"
                name="url"
                type="url"
                defaultValue={afiliado?.link || ""}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://exemplo.com/produto"
                required
              />
            </div>

            {/* Nome do Botão */}
            <div className="grid gap-3">
              <Label htmlFor="buttonName" className="text-white">
                Texto do Botão
              </Label>
              <Input
                id="buttonName"
                name="buttonName"
                defaultValue={afiliado?.buttonName || ""}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Ex: Comprar Agora, Ver Oferta, Aproveitar"
                required
              />
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <input
                id="status"
                name="status"
                type="checkbox"
                value="true"
                defaultChecked={afiliado?.status !== false}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <input
                type="hidden"
                name="status"
                value="false"
              />
              <Label htmlFor="status" className="text-white">
                Produto ativo
              </Label>
            </div>
          </div>

          {state?.message && (
            <div className={`mt-4 p-3 rounded-md ${state.success ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
              {state.message}
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                ref={dialogCloseRef}
                type="button"
                variant="outline"
                className="bg-gray-700 cursor-pointer hover:text-white border-gray-600 text-white hover:bg-gray-600"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white"
            >
              {mode === "add" ? "Criar Afiliado" : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
