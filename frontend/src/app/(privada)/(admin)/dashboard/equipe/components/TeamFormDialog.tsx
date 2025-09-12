"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, User } from "lucide-react"

interface TeamFormDialogProps {
  mode: "add" | "edit";
  children: React.ReactNode;
}

export default function TeamFormDialog({ mode, children }: TeamFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Adicionar Novo Membro" : "Editar Membro"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === "add"
              ? "Preencha os dados para criar um novo membro da equipe."
              : "Edite as informações do membro da equipe."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          {/* Avatar */}
          <div className="grid gap-3">
            <Label htmlFor="avatar" className="text-white">
              Avatar
            </Label>
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-gray-600 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar Avatar
                </Button>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-white">
              Nome Completo *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Digite o nome completo"
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-white">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite o email"
              className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* Senha (apenas para novo membro) */}
          {mode === "add" && (
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-white">
                Senha *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a senha"
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Cargo */}
          <div className="grid gap-3">
            <Label htmlFor="role" className="text-white">
              Cargo *
            </Label>
            <Select>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                <SelectValue placeholder="Selecione o cargo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="ADMIN" className="text-white hover:bg-gray-700">
                  Administrador
                </SelectItem>
                <SelectItem value="EDITOR" className="text-white hover:bg-gray-700">
                  Editor
                </SelectItem>
                <SelectItem value="MODERATOR" className="text-white hover:bg-gray-700">
                  Moderador
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            {mode === "add" ? "Criar Membro" : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
