"use client"

import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Team } from "@/types/team"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import TeamFormDialog from "./TeamFormDialog"
import DeleteTeamDialog from "./DeleteTeamDialog"

interface TeamActionsDropdownProps {
  team: Team
}

export default function TeamActionsDropdown({ team }: TeamActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
        <TeamFormDialog mode="edit" team={team}>
          <DropdownMenuItem 
            className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
        </TeamFormDialog>
        
        <DeleteTeamDialog team={team}>
          <DropdownMenuItem
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DeleteTeamDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}