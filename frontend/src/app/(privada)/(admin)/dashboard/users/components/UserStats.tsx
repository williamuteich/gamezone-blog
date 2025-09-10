import { User, Shield } from "lucide-react";
import { User as UserType, UserStatsProps } from "@/types/user";

export default function UserStats({ users }: UserStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total de Usuários</p>
                        <p className="text-xl font-bold text-white">{users.length}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Usuários Ativos</p>
                        <p className="text-xl font-bold text-white">
                            {users.length}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Administradores</p>
                        <p className="text-xl font-bold text-white">
                            {users.filter(u => u.isAdmin).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
