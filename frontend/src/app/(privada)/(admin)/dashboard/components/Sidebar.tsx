'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Home, Users, FileText, Settings, BarChart3, LogOut, Package } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname();
    const menuItems = [
        { icon: Home, label: "Dashboard", href: "/dashboard" },
        { icon: FileText, label: "Posts", href: "/dashboard/posts" },
        { icon: Users, label: "Usuários", href: "/dashboard/users" },
        { icon: Package, label: "Afiliados", href: "/dashboard/afiliados" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
        { icon: Settings, label: "Configurações", href: "/dashboard/settings" },
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="p-2 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-gray-900 border-gray-700 p-4">
                <SheetHeader className="mb-0">
                    <SheetTitle className="text-white text-left text-xl font-bold">GameZone Admin</SheetTitle>
                    <SheetDescription className="text-gray-500 text-left text-sm">
                        Painel de administração
                    </SheetDescription>
                </SheetHeader>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${pathname == item.href ? `bg-gray-800` : `bg-gray-900`}`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}

                    <div className="border-t border-gray-700 mt-6 pt-4">
                        <button className="flex cursor-pointer items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full">
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
