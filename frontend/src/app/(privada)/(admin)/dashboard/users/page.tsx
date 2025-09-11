import { requireAuth } from "@/lib/auth";
import Container from "../../compoente/Containet";
import { Search, Filter } from "lucide-react";
import UserStats from "./components/UserStats";
import UserTable from "./components/UserTable";
import UserFormDialog from "./components/UserFormDialog";
import { User } from "@/types/user";

export default async function UsersPage() {
    const { token } = await requireAuth();

    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const users = await user.json();

    return (
        <Container>
            <div className="space-y-6">
                {/* Header da página */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Usuários</h1>
                        <p className="text-gray-400 mt-1">Gerencie os usuários da plataforma</p>
                    </div>
                    <UserFormDialog mode="add">
                        <button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                            + Novo Usuário
                        </button>
                    </UserFormDialog>
                </div>

                {/* Estatísticas */}
                <UserStats users={users} />

                {/* Filtros e busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Buscar usuários..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="px-4 py-2 cursor-pointer bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filtros
                    </button>
                </div>

                {/* Tabela de usuários */}
                <UserTable users={users} />
            </div>
        </Container>
    )
}