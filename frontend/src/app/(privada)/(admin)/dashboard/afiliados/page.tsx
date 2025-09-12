import Container from "../../compoente/Containet";
import AfiliadoStats from "./components/AfiliadoStats";
import AfiliadoTable from "./components/AfiliadoTable";
import AfiliadoFormDialog from "./components/AfiliadoFormDialog";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";
import { FiltroAfiliados } from "./components/FiltroAfiliados";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { Afiliado } from "@/types/afiliado";

export default async function AfiliadosPage({ searchParams }: { searchParams: Promise<{ search: string, page: string, status: string }> }) {
    const { search, page, status } = await searchParams;

    const { token } = await requireAuth();

    const currentPage = page ? parseInt(page) : 1;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/affiliates?${search ? `search=${search}&` : ''}${page ? `page=${page}&` : ''}${status ? `status=${status}&` : ''}limit=10`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        cache: 'no-store',
        next: { revalidate: 0 }
    });

    let afiliados = [];
    let pagination = {
        currentPage: 1,
        totalPages: 1,
        totalAffiliates: 0,
        limit: 10,
        hasNext: false,
        hasPrevious: false
    };
    let stats = {
        totalAfiliados: 0,
        activeAfiliados: 0,
        inactiveAfiliados: 0
    };

    if (!res.ok) {
        console.error('Error fetching affiliates:', res.status, res.statusText);
    } else {
        const response = await res.json();

        if (response && typeof response === 'object') {
            if (response.affiliates && Array.isArray(response.affiliates)) {
                afiliados = response.affiliates;
                pagination = response.pagination || pagination;
                stats = response.stats || stats;
            }
            else if (Array.isArray(response)) {
                afiliados = response;
                stats = {
                    totalAfiliados: response.length,
                    activeAfiliados: response.filter((a: Afiliado) => a.status).length,
                    inactiveAfiliados: response.filter((a: Afiliado) => !a.status).length
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
                        <h1 className="text-3xl font-bold text-white">Afiliados</h1>
                        <p className="text-gray-400 mt-1">Gerencie seus produtos afiliados</p>
                    </div>
                    <AfiliadoFormDialog mode="add">
                        <Button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                            <Plus size={16} className="mr-2" />
                            Novo Afiliado
                        </Button>
                    </AfiliadoFormDialog>
                </div>

                {/* Estatísticas */}
                <AfiliadoStats afiliados={afiliados} stats={stats} />

                {/* Filtros e busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchItems />
                    <FiltroAfiliados />
                </div>

                {/* Tabela de Afiliados */}
                <AfiliadoTable key={`affiliates-table-${currentPage}-${afiliados.length}`} afiliados={afiliados} />

                {/* Paginação */}
                <Paginacao data={afiliados} totalRecords={pagination.totalAffiliates || stats.totalAfiliados} />
            </div>
        </Container>
    );
}