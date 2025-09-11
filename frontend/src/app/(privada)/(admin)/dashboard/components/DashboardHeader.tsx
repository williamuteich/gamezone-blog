import Sidebar from "./Sidebar";

export default function DashboardHeader() {

  return (
    <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sidebar />
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5H3zm11.5 3.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5h-3.75a.75.75 0 01-.75-.75zm-8.25 6a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H7a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">GameZone Admin</h1>
        </div>
      </div>
    </header>
  );
}