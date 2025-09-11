import Container from "../../compoente/Containet";
import AfiliadoStats from "./components/AfiliadoStats";
import AfiliadoTable from "./components/AfiliadoTable";
import AfiliadoFormDialog from "./components/AfiliadoFormDialog";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data simples para visualização
const mockAfiliados = [
    {
        id: "1",
        title: "Mouse Gamer Pro",
        description: "Mouse gamer com alta precisão e RGB customizável",
        link: "https://example.com/mouse",
        buttonName: "Comprar",
        status: true,
        createdAt: "2024-01-15T10:00:00Z"
    },
    {
        id: "2",
        title: "Headset Gaming",
        description: "Headset com áudio surround e microfone",
        link: "https://example.com/headset",
        buttonName: "Ver Oferta",
        status: true,
        createdAt: "2024-01-14T15:30:00Z"
    },
    {
        id: "3",
        title: "Teclado Mecânico",
        description: "Teclado mecânico com switches premium",
        link: "https://example.com/teclado",
        buttonName: "Conferir",
        status: false,
        createdAt: "2024-01-13T09:15:00Z"
    }
];

export default function AfiliadosPage() {
    const mockStats = {
        totalAfiliados: mockAfiliados.length,
        activeAfiliados: mockAfiliados.filter(a => a.status).length,
        inactiveAfiliados: mockAfiliados.filter(a => !a.status).length
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
                <AfiliadoStats afiliados={mockAfiliados} stats={mockStats} />

                {/* Busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchItems />
                </div>

                {/* Tabela de Afiliados */}
                <AfiliadoTable afiliados={mockAfiliados} />

                {/* Paginação */}
                <Paginacao data={mockAfiliados} totalRecords={mockAfiliados.length} />
            </div>
        </Container>
    );
}