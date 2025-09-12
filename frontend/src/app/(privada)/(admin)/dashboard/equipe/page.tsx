import Container from "../../compoente/Containet";
import TeamStats from "./components/TeamStats";
import TeamTable from "./components/TeamTable";
import SearchItems from "@/app/components/searchItem";
import Paginacao from "@/app/components/paginacao";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TeamFormDialog from "./components/TeamFormDialog";

export default function TeamPage() {
    // Dados vazios por enquanto
    const team: any[] = [];
    const stats = {
        totalMembers: 0,
        activeMembers: 0,
        inactiveMembers: 0
    };

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
                        <Button className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                            <Plus size={16} className="mr-2" />
                            Novo Membro
                        </Button>
                    </TeamFormDialog>
                </div>

                {/* Estatísticas */}
                <TeamStats team={team} stats={stats} />

                {/* Busca */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <SearchItems />
                </div>

                {/* Tabela de Equipe */}
                <TeamTable team={team} />

                {/* Paginação */}
                <Paginacao data={team} totalRecords={0} />
            </div>
        </Container>
    );
}
