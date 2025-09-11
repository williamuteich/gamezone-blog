import { requireAuth } from "@/lib/auth";
import Container from "../../compoente/Containet";
import UserStats from "./components/UserStats";
import UserTable from "./components/UserTable";
import UserFormDialog from "./components/UserFormDialog";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";
import { FiltroBuscarItem } from "@/app/components/FiltroBuscarItem";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ search: string, page: string, status: string, role: string }> }) {
    const { search, page, status, role } = await searchParams;

    const { token } = await requireAuth();

    const currentPage = page ? parseInt(page) : 1;
    
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?${search ? `search=${search}&` : ''}${page ? `page=${page}&` : ''}${status ? `status=${status}&` : ''}${role ? `role=${role}&` : ''}limit=10`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
        next: { revalidate: 0 }
    })

    let users = [];
    let pagination = {
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        limit: 10,
        hasNext: false,
        hasPrevious: false
    };
    let stats = {
        totalUsers: 0,
        activeUsers: 0,
        adminUsers: 0
    };
    
    if (!user.ok) {
        console.error('Error fetching users:', user.status, user.statusText);
    } else {
        const response = await user.json();
        
        if (response && typeof response === 'object') {
            // Nova estrutura com paginação
            if (response.users && Array.isArray(response.users)) {
                users = response.users;
                pagination = response.pagination || pagination;
                stats = response.stats || stats;
                
            } 
            // Compatibilidade com estrutura antiga (array direto)
            else if (Array.isArray(response)) {
                users = response;
                // Para compatibilidade, calcular stats dos dados disponíveis
                stats = {
                    totalUsers: response.length,
                    activeUsers: response.filter((u: any) => u.status).length,
                    adminUsers: response.filter((u: any) => u.isAdmin).length
                };
            }
        }
        
    }

    return (
        <Container>
            <div className="space-y-6">
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
                <UserStats users={users} stats={stats} />

                {/* Filtros e busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchItems />
                    <FiltroBuscarItem />
                </div>

                {/* Tabela de usuários */}
                <UserTable key={`users-table-${currentPage}-${users.length}`} users={users} />

                {/* Paginação */}
                <Paginacao data={users} totalRecords={pagination.totalUsers} />
            </div>
        </Container>
    )
}