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
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Carregar imagem existente quando for edição
  useEffect(() => {
    if (mode === "edit" && afiliado?.imageUrl) {
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}/files/affiliates/${afiliado.imageUrl}`)
    } else {
      setImagePreview(null)
    }
  }, [afiliado, mode])
  
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
      setImagePreview(null)
    }
  }, [state, onOpenChange])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="id" value={afiliado?.id || ""} />
          <input type="hidden" name="url" value="/affiliates" />
          <input type="hidden" name="method" value={afiliado?.id ? "PUT" : "POST"} />
          <input type="hidden" name="revalidate" value="/dashboard/afiliados" />
          <input type="hidden" name="imageUrl" value={afiliado?.imageUrl || ""} />
          
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
            <div className="grid gap-3">
              <Label htmlFor="image" className="text-white">
                Imagem do Produto *
              </Label>
              <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="relative">
                  <div className="w-16 h-16 rounded-lg border-2 border-gray-600 overflow-hidden">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        IMG
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:mr-2 cursor-pointer file:cursor-pointer"
                    required={mode === "add"}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Formatos aceitos: JPG, PNG, GIF (obrigatório)
                  </p>
                </div>
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
              <Label htmlFor="productUrl" className="text-white">
                Link do Produto
              </Label>
              <Input
                id="productUrl"
                name="productUrl"
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
              <Label htmlFor="status" className="text-white">
                Produto ativo
              </Label>
            </div>
          </div>

          {state?.message && !state.success && (
            <div className="mt-4 p-3 rounded-md bg-red-900/30 text-red-300">
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
