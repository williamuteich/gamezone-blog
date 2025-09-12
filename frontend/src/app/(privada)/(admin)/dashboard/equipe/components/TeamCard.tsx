import { Mail, Calendar, Shield } from "lucide-react";
import TeamActionsDropdown from "./TeamActionsDropdown";
import { Team, TeamCardProps } from "@/types/team";

export default function TeamCard({ team }: TeamCardProps) {
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

    const formatRole = (role: string) => {
        const roleMap: { [key: string]: string } = {
            'ADMIN': 'Administrador',
            'EDITOR': 'Editor',
            'MODERATOR': 'Moderador'
        };
        return roleMap[role.toUpperCase()] || role;
    };

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-600 overflow-hidden">
                        {team.avatar ? (
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/team/${team.avatar}`}
                                alt={team.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(team.name)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{team.name}</h3>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {team.email}
                        </p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <TeamActionsDropdown team={team} />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Função</span>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            team.role.toUpperCase() === "ADMIN"
                                ? "bg-purple-900/50 text-purple-300"
                                : team.role.toUpperCase() === "EDITOR"
                                ? "bg-blue-900/50 text-blue-300"
                                : "bg-yellow-900/50 text-yellow-300"
                        }`}
                    >
                        <Shield className="inline h-3 w-3 mr-1" />
                        {formatRole(team.role)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Status</span>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            team.status
                                ? "bg-green-900/50 text-green-300"
                                : "bg-red-900/50 text-red-300"
                        }`}
                    >
                        {team.status ? "Ativo" : "Inativo"}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Criado em</span>
                    <span className="text-sm text-gray-300 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(team.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}
