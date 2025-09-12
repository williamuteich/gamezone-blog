import { User, Mail, Shield, Edit, UserCheck } from "lucide-react";

interface TeamTableProps {
    team: any[];
}

export default function TeamTable({ team }: TeamTableProps) {
    if (team.length === 0) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 text-center">
                <p className="text-gray-400">Nenhum membro da equipe encontrado</p>
            </div>
        );
    }

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
                        {/* Tabela vazia por enquanto */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
