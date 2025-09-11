"use client"

import { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import AfiliadoFormDialog from "./AfiliadoFormDialog";
import DeleteAfiliadoDialog from "./DeleteAfiliadoDialog";
import { Afiliado } from "@/types/afiliado";

interface AfiliadoActionsDropdownProps {
  afiliado: Afiliado;
}

export default function AfiliadoActionsDropdown({ afiliado }: AfiliadoActionsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsDropdownOpen(false);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="relative">
        <button 
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        
        {isDropdownOpen && (
          <>
            {/* Overlay para fechar o dropdown */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Menu dropdown */}
            <div className="absolute right-0 top-8 z-20 bg-gray-800 border border-gray-700 rounded-lg shadow-lg min-w-[120px] py-1">
              <button 
                className="w-full cursor-pointer px-3 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                onClick={handleEditClick}
              >
                <Edit className="h-3 w-3" />
                Editar
              </button>
              
              <button 
                className="w-full cursor-pointer px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                onClick={handleDeleteClick}
              >
                <Trash2 className="h-3 w-3" />
                Excluir
              </button>
            </div>
          </>
        )}
      </div>

      {/* Dialogs controlados por estado */}
      <AfiliadoFormDialog 
        afiliado={afiliado} 
        mode="edit" 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <div />
      </AfiliadoFormDialog>

      <DeleteAfiliadoDialog 
        afiliado={afiliado}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <div />
      </DeleteAfiliadoDialog>
    </>
  );
}
