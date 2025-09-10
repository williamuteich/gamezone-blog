export default function RecentPosts() {
  const posts = [
    {
      id: 1,
      title: 'Os Melhores Jogos de 2023',
      category: 'Reviews',
      date: '12 Nov 2023',
      views: '12.4K',
      comments: 142
    },
    {
      id: 2,
      title: 'Análise: Novo Lançamento da Nintendo',
      category: 'Análises',
      date: '10 Nov 2023',
      views: '8.7K',
      comments: 87
    },
    {
      id: 3,
      title: 'Guia: Como Derrotar o Chefão Final',
      category: 'Guias',
      date: '8 Nov 2023',
      views: '15.2K',
      comments: 203
    },
    {
      id: 4,
      title: 'E3 2023: Todos os Anúncios',
      category: 'Notícias',
      date: '5 Nov 2023',
      views: '22.1K',
      comments: 156
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Posts Recentes</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
          Novo Post
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-3 text-left text-gray-400">Título</th>
              <th className="pb-3 text-left text-gray-400">Categoria</th>
              <th className="pb-3 text-left text-gray-400">Data</th>
              <th className="pb-3 text-left text-gray-400">Visualizações</th>
              <th className="pb-3 text-left text-gray-400">Comentários</th>
              <th className="pb-3 text-left text-gray-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                <td className="py-4">
                  <div className="font-medium">{post.title}</div>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs">
                    {post.category}
                  </span>
                </td>
                <td className="py-4 text-gray-400">{post.date}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 mr-1">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {post.views}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 mr-1">
                      <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v-3.445a1 1 0 01.553-.894l2.5-1.25a1 1 0 01.894 0l2.5 1.25a1 1 0 01.553.894v3.445c.865-.083 1.722-.194 2.57-.331C18.007 13.244 19 11.986 19 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A41.649 41.649 0 0010 2z" clipRule="evenodd" />
                    </svg>
                    {post.comments}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.919 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-red-900/50 hover:bg-red-800/50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}