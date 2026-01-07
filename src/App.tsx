function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-[calc(50%+2rem)] w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <nav className="relative z-10 bg-white/80 backdrop-blur-sm shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:py-6">
              <div className="flex items-center">
                <img
                  src="/assets/design_sem_nome_(1)-BwDF2-LM.png"
                  alt="Amah Healthcare"
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#services" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                  Serviços
                </a>
                <a href="#about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                  Sobre
                </a>
                <a href="#contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                  Contato
                </a>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 md:py-3 rounded-lg font-medium transition-colors">
                Agendar Consulta
              </button>
            </div>
          </div>
        </nav>

        <section className="relative z-10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8">
                Cuidado de Saúde{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">
                  Humanizado
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed">
                Oferecemos serviços de saúde com qualidade, empatia e dedicação para você e sua família
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-xl hover:shadow-purple-600/30 hover:-translate-y-1">
                  Começar Agora
                </button>
                <button className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-purple-600 transition-all hover:shadow-lg">
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative z-10 py-16 md:py-24 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 md:mb-16">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-purple-100">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  Consultas Gerais
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Atendimento médico completo para toda a família
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-purple-100">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  Cardiologia
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Cuidados especializados para a saúde do coração
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-purple-100">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  Exames
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Laboratório completo com resultados rápidos
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-purple-100">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  Emergência 24h
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Atendimento de urgência a qualquer hora
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-purple-600 to-teal-600 rounded-3xl p-8 md:p-16 shadow-2xl text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">
                Pronto para cuidar da sua saúde?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
                Agende sua consulta hoje e tenha acesso a cuidados de saúde de qualidade
              </p>
              <button className="bg-white hover:bg-gray-100 text-purple-600 px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all hover:shadow-2xl hover:scale-105">
                Agendar Consulta Agora
              </button>
            </div>
          </div>
        </section>

        <footer className="relative z-10 bg-gray-900 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
              <div>
                <img
                  src="/assets/design_sem_nome_(1)-BwDF2-LM.png"
                  alt="Amah Healthcare"
                  className="h-12 w-auto mb-4"
                />
                <p className="text-gray-400 leading-relaxed">
                  Cuidando de você e sua família com dedicação e profissionalismo.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contato</h3>
                <p className="text-gray-400 mb-2">Email: contato@amah.com.br</p>
                <p className="text-gray-400 mb-2">Telefone: (11) 1234-5678</p>
                <p className="text-gray-400">Endereço: São Paulo, SP</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Horário</h3>
                <p className="text-gray-400 mb-2">Seg - Sex: 8h às 18h</p>
                <p className="text-gray-400 mb-2">Sábado: 8h às 14h</p>
                <p className="text-gray-400">Emergência: 24h</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Amah Healthcare. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
