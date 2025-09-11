"use client"

import { useEffect, useRef } from "react"
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
import { persistUser } from "@/app/actions/persistUset"


export default function UserFormDialog({ user, mode, children }: UserFormDialogProps) {
  const [state, formAction] = useActionState(persistUser, null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      // Fecha o modal após sucesso
      dialogCloseRef.current?.click()
      
      // Reseta o formulário
      formRef.current?.reset()
    }
  }, [state])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-white">
        <form ref={formRef} action={formAction}>
          <input type="hidden" name="id" value={user?.id || ""} />
          <input type="hidden" name="url" value="/users" />
          <input type="hidden" name="method" value={user?.id ? "PUT" : "POST"} />
          <input type="hidden" name="revalidate" value="/dashboard/users" />
          
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

          <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="relative">
              {user?.imageUrl ? (
                <div className="relative">
                  <img
                    src={user.imageUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <X className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-gray-600">
                  {user?.name ? getInitials(user.name) : "??"}
                </div>
              )}
            </div>

            <div className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                {user?.imageUrl ? "Alterar Imagem" : "Adicionar Imagem"}
              </Button>
              <p className="text-xs text-gray-400 mt-1">
                Clique para selecionar uma nova imagem
              </p>
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
              <input
                type="hidden"
                name="status"
                value="false"
              />
              <Label htmlFor="status" className="text-white">
                Usuário ativo
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                value="true"
                defaultChecked={user?.isAdmin || false}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
              />
              <input
                type="hidden"
                name="isAdmin"
                value="false"
              />
              <Label htmlFor="isAdmin" className="text-white">
                Administrador
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
              {mode === "add" ? "Criar Usuário" : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}