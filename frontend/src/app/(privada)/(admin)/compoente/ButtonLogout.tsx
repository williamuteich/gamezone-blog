"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useState } from "react";

export default function ButtonLogout() {
    const { logoutTeam } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logoutTeam();
        } catch (error) {
            console.error('Erro no logout:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <button 
            onClick={handleLogout} 
            disabled={isLoading}
            className="flex cursor-pointer items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <LogOut className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Saindo...' : 'Logout'}
        </button>
    )
}