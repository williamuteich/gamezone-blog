'use client'

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

interface DeleteUserDialogProps {
    user: User;
    children: React.ReactNode;
}

export default function DeleteUserDialog({ user, children }: DeleteUserDialogProps) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário{' '}
                        <span className="font-semibold text-white">{user.name}</span> e removerá todos os seus dados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-500 text-white"
                    >
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
