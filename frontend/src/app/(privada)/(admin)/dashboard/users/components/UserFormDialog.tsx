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
import { Upload, X } from "lucide-react"
import { UserFormDialogProps } from "@/types/user"
import { persistData } from "@/app/actions/persistData"


export default function UserFormDialog({ user, mode, children, open, onOpenChange }: UserFormDialogProps) {
  const [state, formAction] = useActionState(persistData, null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (mode === "edit" && user?.avatar) {
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}/files/users/${user.avatar}`)
    } else {
      setImagePreview(null)
    }
  }, [user, mode])

  useEffect(() => {
    if (state?.success) {
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        dialogCloseRef.current?.click();
      }
      
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-white">
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="id" value={user?.id || ""} />
          <input type="hidden" name="url" value="/users" />
          <input type="hidden" name="method" value={user?.id ? "PUT" : "POST"} />
          <input type="hidden" name="revalidate" value="/dashboard/users" />
          {mode === "edit" && user?.avatar && (
            <input type="hidden" name="avatar" value={user.avatar} />
          )}
          
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Adicionar Novo Usuário" : "Editar Usuário"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {mode === "add"
                ? "Preencha os dados para criar um novo usuário."
                : "Edite as informações do usuário."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="avatar" className="text-white">
              Avatar do Usuário
            </Label>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-gray-600 overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user?.name ? getInitials(user.name) : "??"}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <Input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white file:border-0 file:rounded file:mr-2 cursor-pointer file:cursor-pointer"
                />
                {mode === "edit" && user?.avatar && (
                  <input type="hidden" name="avatarExistente" value={user.avatar} />
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Formatos aceitos: JPG, PNG, GIF (opcional)
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-white">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name || ""}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password" className="text-white">
                {mode === "add" ? "Senha" : "Nova Senha (deixe vazio para manter)"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="bg-gray-800 border-gray-700 text-white"
                required={mode === "add"}
                minLength={mode === "add" ? 6 : undefined}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="role" className="text-white">
                Função
              </Label>
              <select
                id="role"
                name="role"
                defaultValue={user?.role || "user"}
                className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="user">Usuário</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </select>
              <div className="text-xs text-gray-400 mt-1">
                <div className="space-y-1">
                  <div><span className="text-orange-400">•</span> <strong>Usuário:</strong> Acesso apenas ao blog público</div>
                  <div><span className="text-blue-400">•</span> <strong>Editor:</strong> Pode criar e editar posts + acesso ao dashboard</div>
                  <div><span className="text-purple-400">•</span> <strong>Administrador:</strong> Acesso total ao sistema</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="status"
                name="status"
                type="checkbox"
                value="true"
                defaultChecked={user?.status !== false}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <Label htmlFor="status" className="text-white">
                Usuário ativo
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
              {mode === "add" ? "Criar Usuário" : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}