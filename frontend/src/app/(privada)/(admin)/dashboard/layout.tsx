import DashboardHeader from "./components/DashboardHeader"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
            <DashboardHeader />
            {children}
        </div>
    )
}