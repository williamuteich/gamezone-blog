import { Calendar, Mail, Shield, Crown, Edit, User as UserIcon } from "lucide-react";
import UserActionsDropdown from "./UserActionsDropdown";
import { User } from "@/types/user";

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {

  if (!Array.isArray(users)) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">Erro ao carregar usuários</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">Nenhum usuário encontrado</p>
      </div>
    );
  }

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
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-sm font-medium text-gray-400">Usuário</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
             
              <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Posts</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Criado em</th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
      
              return (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                    index === users.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  {/* Usuário */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/users/${user.avatar}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                            {getInitials(user.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="h-3 w-3" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>

                  {/* Função */}
     

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-red-900/50 text-red-300'
                    }`}>
                      {user.status ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  {/* Posts */}
                  <td className="p-4">
                    <span className="text-sm font-medium text-white">{user.posts || 0}</span>
                  </td>

                  {/* Criado em */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{formatDate(user.createdAt)}</span>
                    </div>
                  </td>

                  {/* Ações */}
                  <td className="p-4 text-right">
                    <UserActionsDropdown user={user} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
