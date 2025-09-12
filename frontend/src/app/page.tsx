import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-600/3 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-600/4 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725h-.088z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">GameZone</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">Início</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Notícias</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Reviews</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Guias</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Vídeos</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
              Login
            </Link>
            <button className="p-2.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl backdrop-blur-sm border border-slate-600/50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-indigo-600/8"></div>
          <div className="w-full h-full bg-gradient-to-br from-slate-800/50 via-gray-800/30 to-slate-900/50"></div>
        </div>
        
        {/* Floating Stars - Enhanced */}
        <div className="absolute inset-0 z-5">
          {/* Estrelas originais melhoradas */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-white/80 rounded-full animate-pulse" style={{animationDuration: '1.5s', animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/70 rounded-full animate-pulse" style={{animationDuration: '2.5s', animationDelay: '0.3s'}}></div>
          
          {/* Novas estrelas adicionais */}
          <div className="absolute top-32 left-1/3 w-1 h-1 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '1.8s', animationDelay: '0.7s'}}></div>
          <div className="absolute top-16 right-1/4 w-0.5 h-0.5 bg-white/90 rounded-full animate-pulse" style={{animationDuration: '1.2s', animationDelay: '1.2s'}}></div>
          <div className="absolute top-60 left-16 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse" style={{animationDuration: '2.8s', animationDelay: '0.2s'}}></div>
          <div className="absolute bottom-40 right-16 w-1 h-1 bg-white/65 rounded-full animate-pulse" style={{animationDuration: '2.2s', animationDelay: '1.5s'}}></div>
          <div className="absolute top-28 right-1/3 w-0.5 h-0.5 bg-white/85 rounded-full animate-pulse" style={{animationDuration: '1.6s', animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-60 left-1/3 w-1 h-1 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '3.2s', animationDelay: '0.1s'}}></div>
          
          {/* Estrelas menores e mais sutis */}
          <div className="absolute top-44 left-1/2 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
          <div className="absolute bottom-16 left-1/5 w-0.5 h-0.5 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '1.4s', animationDelay: '0.9s'}}></div>
          <div className="absolute top-36 right-1/5 w-1 h-1 bg-white/55 rounded-full animate-pulse" style={{animationDuration: '2.6s', animationDelay: '1.8s'}}></div>
          <div className="absolute bottom-28 right-1/3 w-0.5 h-0.5 bg-white/95 rounded-full animate-pulse" style={{animationDuration: '1.1s', animationDelay: '0.4s'}}></div>
          <div className="absolute top-52 left-1/6 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{animationDuration: '3.5s', animationDelay: '1.3s'}}></div>
          
          {/* Estrelas grandes e brilhantes */}
          <div className="absolute top-24 right-1/2 w-2 h-2 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '2.4s', animationDelay: '0.6s'}}></div>
          <div className="absolute bottom-44 left-2/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDuration: '3.8s', animationDelay: '2.2s'}}></div>
          
          {/* Estrelas nos cantos */}
          <div className="absolute top-12 left-12 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDuration: '2.1s', animationDelay: '1.7s'}}></div>
          <div className="absolute top-14 right-12 w-1 h-1 bg-white/45 rounded-full animate-pulse" style={{animationDuration: '1.9s', animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-12 left-10 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDuration: '1.7s', animationDelay: '1.1s'}}></div>
          <div className="absolute bottom-14 right-14 w-1 h-1 bg-white/100 rounded-full animate-pulse" style={{animationDuration: '2.9s', animationDelay: '1.9s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            Descubra o Mundo dos Games
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            As últimas notícias, reviews exclusivos e guias completos do universo gamer em um só lugar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-2xl">
              Explorar Artigos
            </button>
            <button className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-lg font-medium transition-all duration-200 backdrop-blur-sm border border-slate-600/50">
              Ver Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Artigos em Destaque</h2>
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center">
            Ver todos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Os Melhores Jogos de 2025", category: "Análise", gradient: "from-blue-600 to-cyan-600" },
            { title: "Review: PlayStation 6", category: "Hardware", gradient: "from-purple-600 to-pink-600" },
            { title: "Guia Completo: Baldur's Gate 4", category: "Guias", gradient: "from-green-600 to-emerald-600" }
          ].map((item, index) => (
            <div key={index} className="group bg-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-600/50 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 shadow-2xl">
              <div className="h-56 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity" style={{background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`}}></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${item.gradient} text-white text-sm rounded-full font-medium shadow-lg`}>
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-300 mb-5 leading-relaxed">
                  Confira nossa análise detalhada com tudo que você precisa saber sobre este lançamento imperdível.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">12 de Setembro, 2025</span>
                  <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors group">
                    Ler mais
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Categorias</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Notícias', gradient: 'from-blue-600 to-cyan-600', icon: '📰', description: 'Últimas do gaming' },
            { name: 'Reviews', gradient: 'from-green-600 to-emerald-600', icon: '⭐', description: 'Análises completas' },
            { name: 'Guias', gradient: 'from-purple-600 to-pink-600', icon: '🎮', description: 'Dicas e tutoriais' },
            { name: 'Hardware', gradient: 'from-red-600 to-orange-600', icon: '💻', description: 'Tecnologia gamer' }
          ].map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Últimos Artigos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Review: PlayStation Portal", category: "Hardware", gradient: "from-blue-500 to-purple-500" },
            { title: "Guia: Melhores Builds Cyberpunk", category: "Guias", gradient: "from-green-500 to-teal-500" },
            { title: "Análise: Spider-Man 3", category: "Reviews", gradient: "from-red-500 to-pink-500" },
            { title: "Top 10 Indies de 2025", category: "Listas", gradient: "from-orange-500 to-yellow-500" },
            { title: "Preview: GTA VI", category: "Notícias", gradient: "from-cyan-500 to-blue-500" },
            { title: "Hardware: RTX 5090 Ti", category: "Tecnologia", gradient: "from-indigo-500 to-purple-500" }
          ].map((item, index) => (
            <div key={index} className="group bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 flex transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl">
              <div className="w-28 h-28 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mr-6 flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <span className={`text-xs font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent px-3 py-1 bg-slate-700/50 rounded-full`}>
                  {item.category}
                </span>
                <h3 className="text-lg font-bold mt-3 mb-2 text-gray-100 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                  Analisamos em detalhes e compartilhamos nossas impressões completas sobre este lançamento.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">8 de Setembro, 2025</span>
                  <Link href="/" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors group">
                    Ler mais
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
            Carregar Mais
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-800/50 border-y border-slate-600/50 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Fique por Dentro
            </h2>
            <p className="text-gray-200 mb-8 text-lg leading-relaxed">
              Inscreva-se na nossa newsletter e receba as últimas notícias, reviews exclusivos e guias completos do mundo dos games diretamente no seu e-mail.
            </p>
            
            <div className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="flex-grow px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm transition-all"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap">
                  Inscrever Agora
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                🔒 Seus dados estão seguros conosco. Sem spam, apenas conteúdo de qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725h-.088z" />
                    <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">GameZone</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Seu portal definitivo para o universo dos games. Notícias exclusivas, reviews detalhados e guias completos para todos os jogadores.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Notícias</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Reviews</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Guias</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Hardware</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">E-sports</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Sobre Nós</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Contato</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Política de Privacidade</Link></li>
                <li><Link href="/" className="text-gray-400 hover:text-blue-400">Termos de Uso</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Conecte-se</h4>
              <div className="flex space-x-4 mb-6">
                <Link href="/" className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm border border-slate-600/50">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/" className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm border border-slate-600/50">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="/" className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm border border-slate-600/50">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/" className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-all duration-200 transform hover:scale-110 backdrop-blur-sm border border-slate-600/50">
                  <span className="sr-only">Twitch</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 GameZone. Todos os direitos reservados. Feito com ❤️ para gamers.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}