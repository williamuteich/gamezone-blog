import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725h-.088z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">GameZone</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">Início</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Notícias</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Reviews</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Guias</Link>
            <Link href="/" className="hover:text-blue-400 transition-colors">Vídeos</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
              Login
            </button>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 极速赛车开奖直播 极速赛车开奖直播 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 极速赛车开奖直播 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 极速赛车开奖直播 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
          <div className="w-full h-full bg-gray-800"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Descubra o Mundo dos Games</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            As últimas notícias, reviews e guias do universo gamer em um só lugar
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-medium transition-colors">
            Explorar Artigos
          </button>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-transform hover:scale-105">
              <div className="h-48 bg-gray-700 relative">
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-sm rounded-full">Notícias</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Os Melhores Jogos de 2023</h3>
                <p className="text-gray-400 mb-4">
                  Confira nossa seleção dos jogos mais esperados do ano e por que você deve jogá-los.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">12 de Novembro, 2023</span>
                  <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Ler mais
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Notícias', color: 'bg-blue-600', icon: '📰' },
            { name: 'Reviews', color: 'bg-green-600', icon: '⭐' },
            { name: 'Guias', color: 'bg-purple-600', icon: '🎮' },
            { name: 'Hardware', color: 'bg-red-600', icon: '💻' }
          ].map((category, index) => (
            <div key={index} className={`${category.color} rounded-xl p-6 text-center cursor-pointer transition-transform hover:scale-105`}>
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Últimos Artigos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex">
              <div className="w-24 h-24 bg-gray-700 rounded-lg mr-4 flex-shrink-0"></div>
              <div>
                <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">Análise</span>
                <h3 className="text-lg font-bold mt-2 mb-1">Review: Novo Lançamento da Sony</h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  Analisamos o mais recente exclusivo da Sony e compartilhamos nossas impressões.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">8 de Novembro, 2023</span>
                  <Link href="/" className="text-blue-400 hover:text-blue-300 text-xs font-medium">
                    Ler mais
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
      <section className="bg-gray-800/50 border-y border-gray-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Fique por Dentro</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Inscreva-se na nossa newsletter e receba as últimas notícias e atualizações do mundo dos games diretamente no seu e-mail.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-r-lg font-medium transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 极速赛车开奖直播 0 116 0h3a.75.75 0 00.75-.75V15z" />
                    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725h-.088z" />
                    <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">GameZone</h3>
              </div>
              <p className="text-gray-400">
                Seu portal definitivo para o universo dos games. Notícias, reviews e guias para todos os jogadores.
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
              <div className="flex space-x-4 mb-4">
                <Link href="/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 极速赛车开奖直播 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600">
                  <span className="sr-only">Twitch</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                </Link>
              </div>
              <p className="text-gray-400 text-sm">
                © 2023 GameZone. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}