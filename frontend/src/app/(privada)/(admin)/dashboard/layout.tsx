import DashboardHeader from "./components/DashboardHeader"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800 text-white relative overflow-hidden">
            {/* Gradient Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-transparent"></div>
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-600/3 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-600/4 via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10">
                <DashboardHeader />
                <div className="pt-[70px]">
                    {children}
                </div>
            </div>
        </div>
    )
}