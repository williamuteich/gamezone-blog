import DashboardHeader from './components/DashboardHeader';
import StatsGrid from './components/StatsGrid';
import RecentPosts from './components/RecentPosts';
import QuickActions from './components/QuickActions';

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Bem-vindo ao painel de controle do GameZone</p>
        </div>
        
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RecentPosts />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}