import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const handleClick = () => {
    window.location.href = 'https://amah-sistema-de-saude.netlify.app';
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-purple-600 via-purple-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6 text-xs md:text-sm">
          <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-white flex-shrink-0" />
          <span className="font-medium text-white">Comece sua jornada de saúde</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-5 leading-tight">
          Pronto para começar?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-purple-100 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
          Conecte-se com profissionais qualificados e cuide da sua saúde de forma segura e eficiente.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <button onClick={handleClick} className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-purple-700 rounded-xl font-semibold text-base hover:bg-purple-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-2">
            Fazer Cadastro Gratuito
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={handleClick} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-base hover:bg-white/10 transition-all">
            Para Profissionais
          </button>
        </div>

        <p className="mt-5 md:mt-6 text-purple-100 text-xs px-4">
          Sem taxas ocultas • Comece em minutos
        </p>
      </div>
    </section>
  );
}
