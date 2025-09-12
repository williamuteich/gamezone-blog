"use client";

import { LogOut } from "lucide-react";
import { deleteSession } from "@/app/actions/logout";
import { useSession } from "@/app/components/sessionProvider";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
    const { setUser } = useSession();
    const router = useRouter();
    
    const handleLogout = async () => {
        // Limpa a sessão local
        setUser(null);
        
        // Deleta o cookie do servidor
        await deleteSession();
        
        // Redireciona para o login
        router.push('/login');
    };
    
    return (
        <button onClick={handleLogout} className="flex cursor-pointer items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Logout
        </button>
    )
}