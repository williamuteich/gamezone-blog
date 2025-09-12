"use client"

import { Button } from "@/components/ui/button"
import { Filter, CheckCircle, XCircle } from "lucide-react"
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

export function FiltroAfiliados() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleChangeStatus(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    setStatusFilter(value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 cursor-pointer hover:text-white">
          <Filter size={16} /> Filtrar por Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700">
        <DropdownMenuLabel className="text-gray-300">Filtrar Por Status:</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuRadioGroup value={statusFilter} onValueChange={handleChangeStatus}>
          <DropdownMenuRadioItem 
            value="" 
            className="text-gray-300 cursor-pointer hover:!text-white hover:!bg-gray-700 focus:!bg-gray-700 focus:!text-white transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Todos os Status
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="true" 
            className="text-green-400 cursor-pointer hover:!text-white hover:!bg-green-900/30 focus:!bg-green-900/30 focus:!text-white transition-colors"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Ativo
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem 
            value="false" 
            className="text-red-400 cursor-pointer hover:!text-white hover:!bg-red-900/30 focus:!bg-red-900/30 focus:!text-white transition-colors"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Inativo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
