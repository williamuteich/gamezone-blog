"use client";

import { LogOut } from "lucide-react";
import { deleteSession } from "@/app/actions/logout";

export default function ButtonLogout() {
    return (
        <button onClick={() => deleteSession()} className="flex cursor-pointer items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Logout
        </button>
    )
}