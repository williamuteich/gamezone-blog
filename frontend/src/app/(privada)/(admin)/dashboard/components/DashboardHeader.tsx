import Sidebar from "./Sidebar";

export default function DashboardHeader() {

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 fixed w-full z-50 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Sidebar />
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5H3zm11.5 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5h-3.75a.75.75 0 01-.75-.75zm-8.25 6a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            GameZone Admin
          </h1>
        </div>
      </div>
    </header>
  );
}