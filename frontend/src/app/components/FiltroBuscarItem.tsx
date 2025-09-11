"use client"

import { Button } from "@/components/ui/button"
import { Filter, Crown, Edit, User as UserIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function FiltroBuscarItem() {

  const [roleFilter, setRoleFilter] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChangeRole(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value){
      params.set("role", value);
    }else {
      params.delete("role");
    }

    setRoleFilter(value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700">
          <Filter size={16} /> Filtrar por Função
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700">
        <DropdownMenuLabel className="text-gray-300">Filtrar Por Função:</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuRadioGroup value={roleFilter} onValueChange={handleChangeRole}>
          <DropdownMenuRadioItem value="" className="text-gray-300 focus:bg-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Todas as Funções
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="admin" className="text-purple-400 focus:bg-purple-900/20">
            <Crown className="h-4 w-4 mr-2" />
            Administrador
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="editor" className="text-blue-400 focus:bg-blue-900/20">
            <Edit className="h-4 w-4 mr-2" />
            Editor
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="user" className="text-orange-400 focus:bg-orange-900/20">
            <UserIcon className="h-4 w-4 mr-2" />
            Usuário
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
