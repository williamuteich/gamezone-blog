import { Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Afiliado } from "@/types/afiliado";
import AfiliadoActionsDropdown from "./AfiliadoActionsDropdown";

interface AfiliadoTableProps {
    afiliados: Afiliado[];
}

export default function AfiliadoTable({ afiliados }: AfiliadoTableProps) {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="text-left p-4 text-sm font-medium text-gray-400">Produto</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-400">Descrição</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-400">Link</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-400">Criado em</th>
                            <th className="text-right p-4 text-sm font-medium text-gray-400">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {afiliados.map((afiliado, index) => (
                            <tr 
                                key={afiliado.id} 
                                className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                                    index === afiliados.length - 1 ? 'border-b-0' : ''
                                }`}
                            >
                                {/* Produto */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <Package className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{afiliado.title}</p>
                                            <p className="text-xs text-gray-400">{afiliado.buttonName}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Descrição */}
                                <td className="p-4">
                                    <p className="text-sm text-gray-300 max-w-xs truncate">{afiliado.description}</p>
                                </td>

                                {/* Link */}
                                <td className="p-4">
                                    <a 
                                        href={afiliado.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        <span className="max-w-[100px] truncate">Ver Link</span>
                                    </a>
                                </td>

                                {/* Status */}
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        afiliado.status 
                                            ? 'bg-green-900/50 text-green-300' 
                                            : 'bg-red-900/50 text-red-300'
                                    }`}>
                                        {afiliado.status ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>

                                {/* Data */}
                                <td className="p-4">
                                    <span className="text-sm text-gray-400">
                                        {new Date(afiliado.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </td>

                                {/* Ações */}
                                <td className="p-4 text-right">
                                    <AfiliadoActionsDropdown afiliado={afiliado} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
