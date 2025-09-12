"use client"

import { useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import UserFormDialog from "./UserFormDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { User } from "@/types/user";

interface UserActionsDropdownProps {
  user: User;
}

export default function UserActionsDropdown({ user }: UserActionsDropdownProps) {
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
          className="p-1 cursor-pointer hover:bg-gray-700 rounded transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        
        {isDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsDropdownOpen(false)}
            />
            
            <div className="absolute right-4 -top-[28px] z-20 bg-gray-800 border border-gray-700 rounded-lg shadow-lg min-w-[120px] py-1">
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

      <UserFormDialog 
        user={user} 
        mode="edit" 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <div />
      </UserFormDialog>

      <DeleteUserDialog 
        user={user}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <div />
      </DeleteUserDialog>
    </>
  );
}
