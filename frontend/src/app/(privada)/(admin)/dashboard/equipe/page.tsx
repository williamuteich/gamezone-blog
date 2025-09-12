import { requireAuth } from "@/lib/auth";
import Container from "../../compoente/Containet";
import TeamStats from "./components/TeamStats";
import TeamTable from "./components/TeamTable";
import TeamFormDialog from "./components/TeamFormDialog";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ search: string, page: string, status: string, role: string }> }) {
    const { search, page, status, role } = await searchParams;

    const { token } = await requireAuth();

    const currentPage = page ? parseInt(page) : 1;

    const teamResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team?${search ? `search=${search}&` : ''}${page ? `page=${page}&` : ''}${status ? `status=${status}&` : ''}${role ? `role=${role}&` : ''}limit=10`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
        next: { revalidate: 0 }
    });

    let team: any[] = [];
    let pagination = {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNext: false,
        hasPrev: false
    };
    let stats = {
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0
    };

    if (!teamResponse.ok) {
        console.error('Error fetching team:', teamResponse.status, teamResponse.statusText);
    } else {
        const response = await teamResponse.json();

        if (response && typeof response === 'object') {
            if (response.team && Array.isArray(response.team)) {
                team = response.team;
                pagination = response.pagination || pagination;
                stats = {
                    totalMembers: response.team.length,
                    activeMembers: response.team.filter((m: any) => m.status).length,
                    inactiveMembers: response.team.filter((m: any) => !m.status).length
                };
            } else if (Array.isArray(response)) {
                team = response;
                stats = {
                    totalMembers: response.length,
                    activeMembers: response.filter((m: any) => m.status).length,
                    inactiveMembers: response.filter((m: any) => !m.status).length
                };
            }
        }
    }

    return (
        <Container>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Equipe</h1>
                        <p className="text-gray-400 mt-1">Gerencie os membros da equipe</p>
                    </div>
                    <TeamFormDialog mode="add">
                        <button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                            + Novo Membro
                        </button>
                    </TeamFormDialog>
                </div>

                {/* Estatísticas */}
                <TeamStats team={team} stats={stats} />

                {/* Filtros e busca */}

                <SearchItems />

                {/* Tabela da equipe */}
                <TeamTable key={`team-table-${currentPage}-${team.length}`} team={team} />

                {/* Paginação */}
                <Paginacao data={team} totalRecords={pagination.totalCount} />
            </div>
        </Container>
    );
}
