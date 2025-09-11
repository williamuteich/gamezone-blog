import { Package, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Afiliado, AfiliadoStatsProps } from "@/types/afiliado";

export default function AfiliadoStats({ afiliados, stats }: AfiliadoStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Total</p>
                        <p className="text-2xl font-bold text-white">{stats.totalAfiliados}</p>
                    </div>
                    <Package className="h-6 w-6 text-blue-400" />
                </div>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Ativos</p>
                        <p className="text-2xl font-bold text-green-400">{stats.activeAfiliados}</p>
                    </div>
                    <Eye className="h-6 w-6 text-green-400" />
                </div>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Inativos</p>
                        <p className="text-2xl font-bold text-red-400">{stats.inactiveAfiliados}</p>
                    </div>
                    <EyeOff className="h-6 w-6 text-red-400" />
                </div>
            </Card>
        </div>
    );
}
