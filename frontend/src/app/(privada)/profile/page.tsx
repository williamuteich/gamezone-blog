import { requireAuth } from "@/lib/auth";

export default async function ProfilePage() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-gray-400">Gerencie suas informações de perfil</p>
          <ul>
     
          </ul>
        </div>
      </main>
    </div>
  );
}