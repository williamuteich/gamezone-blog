import Container from "../../compoente/Containet";
import AfiliadoStats from "./components/AfiliadoStats";
import AfiliadoTable from "./components/AfiliadoTable";
import AfiliadoFormDialog from "./components/AfiliadoFormDialog";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { Afiliado } from "@/types/afiliado";


export default async function AfiliadosPage() {
    const { token } = await requireAuth();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/affiliates`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if(!res.ok) {
        console.error('Error fetching affiliates:', res.status, res.statusText);
    }

    const afiliados = await res.json();

    const produtos = {
        totalAfiliados: afiliados.length,
        activeAfiliados: afiliados.filter((a: Afiliado) => a.status).length,
        inactiveAfiliados: afiliados.filter((a: Afiliado) => !a.status).length
    };

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
                <AfiliadoStats afiliados={afiliados} stats={produtos} />

                {/* Busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchItems />
                </div>

                {/* Tabela de Afiliados */}
                <AfiliadoTable afiliados={afiliados} />

                {/* Paginação */}
                <Paginacao data={afiliados} totalRecords={afiliados.length} />
            </div>
        </Container>
    );
}