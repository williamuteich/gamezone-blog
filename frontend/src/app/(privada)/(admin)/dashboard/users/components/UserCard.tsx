'use client'

import { Mail, Calendar, Shield, MoreVertical } from "lucide-react";
import UserFormDialog from "./UserFormDialog";
import DeleteUserDialog from "./DeleteUserDialog";


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

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            {/* Header do card */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                        </p>
                    </div>
                </div>
                <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
            </div>

            {/* Informações do usuário */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Função</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isAdmin
                            ? 'bg-purple-900/50 text-purple-300'
                            : user.role === 'Editor'
                                ? 'bg-blue-900/50 text-blue-300'
                                : 'bg-gray-700/50 text-gray-300'
                        }`}>
                        <Shield className="inline h-3 w-3 mr-1" />
                        {user.role}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Posts</span>
                    <span className="text-sm font-medium text-white">{user.posts}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Criado em</span>
                    <span className="text-sm text-gray-300 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.createdAt}
                    </span>
                </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                <div className="flex-1">
                    <UserFormDialog user={user} mode="edit">
                        <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium">
                            Editar
                        </button>
                    </UserFormDialog>
                </div>

                <div className="flex-1">
                    <DeleteUserDialog user={user}>
                        <button className="w-full px-3 py-2 bg-red-600/80 hover:bg-red-500 text-white rounded-lg transition-colors text-sm">
                            Excluir
                        </button>
                    </DeleteUserDialog>
                </div>
            </div>
        </div>
    );
}