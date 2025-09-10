'use client'

import { useState } from "react"
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
import { User, UserFormDialogProps } from "@/types/user"


export default function UserFormDialog({ user, mode, children }: UserFormDialogProps) {
    const [selectedImage, setSelectedImage] = useState<string>(user?.avatar || '');

    const handleImageSelect = () => {
        
        console.log('Selecionar imagem...');
    };

    const handleRemoveImage = () => {
        setSelectedImage('');
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

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
                    
                    {/* Seção de Avatar no topo */}
                    <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        {/* Preview da imagem */}
                        <div className="relative">
                            {selectedImage ? (
                                <div className="relative">
                                    <img
                                        src={selectedImage}
                                        alt="Preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-gray-600">
                                    {user?.name ? getInitials(user.name) : '??'}
                                </div>
                            )}
                        </div>

                        {/* Botão de upload */}
                        <div className="flex-1">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleImageSelect}
                                className="w-full cursor-pointer bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {selectedImage ? 'Alterar Imagem' : 'Adicionar Imagem'}
                            </Button>
                            <p className="text-xs text-gray-400 mt-1">
                                Clique para selecionar uma nova imagem
                            </p>
                        </div>
                    </div>

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
                        <div className="grid gap-3">
                            <Label htmlFor="role" className="text-white">Função</Label>
                            <select
                                id="role"
                                name="role"
                                defaultValue={user?.role || 'user'}
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
                                defaultChecked={user?.status !== false}
                                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
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