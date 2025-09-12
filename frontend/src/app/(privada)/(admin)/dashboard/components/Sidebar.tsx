'use client'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Home, Users, FileText, Settings, BarChart3, Package, FolderTree, Tag, ChevronDown, ChevronRight, User, Image, Palette, Mail, Shield, Database, Globe, Bell, UserCircle, UsersRound } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import ButtonLogout from "../../compoente/ButtonLogout"
import { useSession } from "@/app/components/sessionProvider"

export default function Sidebar() {
    const { user } = useSession();

    const pathname = usePathname();
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    const menuItems = [
        { icon: Home, label: "Dashboard", href: "/dashboard" },
        { icon: FileText, label: "Posts", href: "/dashboard/posts" },
        { icon: Users, label: "Usuários", href: "/dashboard/users" },
        { icon: UsersRound, label: "Equipe", href: "/dashboard/equipe" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    ]

    const productItems = [
        { icon: Package, label: "Afiliados", href: "/dashboard/afiliados" },
        { icon: FolderTree, label: "Categorias", href: "/dashboard/categories" },
        { icon: Tag, label: "Marcas", href: "/dashboard/brands" },
    ]

    const settingsItems = [
        { icon: User, label: "Meu Perfil", href: "/dashboard/settings/profile" },
        { icon: Image, label: "Banner & Logo", href: "/dashboard/settings/banner" },
        { icon: Palette, label: "Tema & Layout", href: "/dashboard/settings/theme" },
        { icon: Mail, label: "E-mail & Notificações", href: "/dashboard/settings/notifications" },
        { icon: Shield, label: "Segurança", href: "/dashboard/settings/security" },
        { icon: Database, label: "Backup & Dados", href: "/dashboard/settings/backup" },
        { icon: Globe, label: "SEO & Meta Tags", href: "/dashboard/settings/seo" },
        { icon: Bell, label: "Integrações", href: "/dashboard/settings/integrations" },
    ]

    const isInProductsSection = productItems.some(item => pathname.startsWith(item.href));
    
    const isInSettingsSection = settingsItems.some(item => pathname.startsWith(item.href));

    useEffect(() => {
        if (isInProductsSection) {
            setIsProductsOpen(true);
        }
        if (isInSettingsSection) {
            setIsSettingsOpen(true);
        }
    }, [isInProductsSection, isInSettingsSection]);

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

                    {/* Dropdown de Produtos */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsProductsOpen(!isProductsOpen)}
                            className={`w-full flex items-center justify-between cursor-pointer gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${isInProductsSection ? 'bg-gray-800 text-white' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <Package className="h-5 w-5" />
                                Produtos
                            </div>
                            {isProductsOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>

                        {/* Submenu de Produtos */}
                        {isProductsOpen && (
                            <div className="ml-4 space-y-1 border-l border-gray-700 pl-4">
                                {productItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm ${pathname === item.href ? 'bg-gray-800 text-white' : ''}`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dropdown de Configurações */}
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`w-full flex items-center justify-between cursor-pointer gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${isInSettingsSection ? 'bg-gray-800 text-white' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <Settings className="h-5 w-5" />
                                Configurações
                            </div>
                            {isSettingsOpen ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>

                        {/* Submenu de Configurações */}
                        {isSettingsOpen && (
                            <div className="ml-4 space-y-1 border-l border-gray-700 pl-4">
                                {settingsItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm ${pathname === item.href ? 'bg-gray-800 text-white' : ''}`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-700 mt-6 pt-4">
                        {/* Seção do usuário logado */}
                        {user && (
                            <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                                        {user.avatar ? (
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/users/${user.avatar}`} 
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <UserCircle className="w-6 h-6 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white text-sm font-medium truncate">
                                            {user.name}
                                        </h4>
                                        <p className="text-gray-400 text-xs truncate">
                                            {user.email}
                                        </p>
                                        <div className="flex gap-1 mt-1">
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                user.role === 'admin' ? 'bg-red-600 text-white' :
                                                user.role === 'editor' ? 'bg-blue-600 text-white' :
                                                user.role === 'moderator' ? 'bg-yellow-600 text-white' :
                                                user.isAdmin ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                                            }`}>
                                                {user.role ? 
                                                    user.role.charAt(0).toUpperCase() + user.role.slice(1) : 
                                                    (user.isAdmin ? 'Admin' : 'User')
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <ButtonLogout/>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
