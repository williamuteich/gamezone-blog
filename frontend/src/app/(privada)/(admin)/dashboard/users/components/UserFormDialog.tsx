'use client'

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

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    createdAt: string;
    posts: number;
    isAdmin: boolean;
}

interface UserFormDialogProps {
    user?: User;
    mode: 'add' | 'edit';
    children: React.ReactNode;
}

export default function UserFormDialog({ user, mode, children }: UserFormDialogProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'add' ? 'Adicionar Novo Usuário' : 'Editar Usuário'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            {mode === 'add' 
                                ? 'Preencha os dados para criar um novo usuário.'
                                : 'Edite as informações do usuário.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name" className="text-white">Nome</Label>
                            <Input 
                                id="name" 
                                name="name" 
                                defaultValue={user?.name || ''} 
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email"
                                defaultValue={user?.email || ''} 
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password" className="text-white">
                                {mode === 'add' ? 'Senha' : 'Nova Senha (deixe vazio para manter)'}
                            </Label>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                id="isAdmin"
                                name="isAdmin"
                                type="checkbox"
                                defaultChecked={user?.isAdmin || false}
                                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                            />
                            <Label htmlFor="isAdmin" className="text-white">
                                Administrador
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button 
                                variant="outline" 
                                className="bg-gray-700 cursor-pointer hover:text-white border-gray-600 text-white hover:bg-gray-600"
                            >
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white">
                            {mode === 'add' ? 'Criar Usuário' : 'Salvar Alterações'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}