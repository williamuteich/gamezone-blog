import { Calendar, Mail, Edit, User as UserIcon } from "lucide-react";
import { Team } from "@/types/team";
import TeamActionsDropdown from "./TeamActionsDropdown";


interface TeamTableProps {
  team: Team[];
}

export default function TeamTable({ team }: TeamTableProps) {
  if (!Array.isArray(team)) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">Erro ao carregar membros da equipe</p>
      </div>
    );
  }

  if (team.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
        <p className="text-gray-400">Nenhum membro da equipe encontrado</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatRole = (role: string) => {
    const roleMap: { [key: string]: string } = {
      ADMIN: "Administrador",
      EDITOR: "Editor",
      MODERATOR: "Moderador",
    };
    return roleMap[role] || role;
  };

  const getRoleIcon = (role: string) => {
    if (role === "ADMIN") {
      return { icon: UserIcon, color: "text-red-400 bg-red-900/30 border border-red-500/20" };
    } else if (role === "EDITOR") {
      return { icon: Edit, color: "text-blue-400 bg-blue-900/30 border border-blue-500/20" };
    } else if (role === "MODERATOR") {
      return { icon: UserIcon, color: "text-purple-400 bg-purple-900/30 border border-purple-500/20" };
    } else {
      return { icon: UserIcon, color: "text-gray-400 bg-gray-900/30 border border-gray-500/20" };
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-sm font-medium text-gray-400">Membro</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Cargo</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Criado em</th>
              <th className="text-right p-4 text-sm font-medium text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member, index) => {
              const roleStyle = getRoleIcon(member.role);
              const RoleIcon = roleStyle.icon;

              return (
                <tr
                  key={member.id}
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                    index === team.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {/* Membro */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
                        {member.avatar ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/files/team/${member.avatar}`}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                            {getInitials(member.name)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="h-3 w-3" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                  </td>

                  {/* Cargo */}
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${roleStyle.color}`}
                    >
                      <RoleIcon className="h-3 w-3" />
                      {formatRole(member.role)}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status
                          ? "bg-green-900/50 text-green-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {member.status ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  {/* Criado em */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span className="text-sm">{formatDate(member.createdAt)}</span>
                    </div>
                  </td>

                  {/* Ações */}
                  <td className="p-4 text-right">
                    <TeamActionsDropdown team={member} />
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
