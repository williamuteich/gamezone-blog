import { Mail, Calendar, Shield } from "lucide-react";
import UserActionsDropdown from "./UserActionsDropdown";
import { User, UserCardProps } from "@/types/user";


export default function UserCard({ user }: UserCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-600 overflow-hidden">
                        {user.avatar ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/users/${user.avatar}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(user.name)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <UserActionsDropdown user={user} />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Posts</span>
                    <span className="text-sm font-medium text-white">{user.posts || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status 
                            ? 'bg-green-900/50 text-green-300' 
                            : 'bg-red-900/50 text-red-300'
                    }`}>
                        {user.status ? 'Ativo' : 'Inativo'}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Criado em</span>
                    <span className="text-sm text-gray-300 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}