import { UserPlus, FileText, Users2, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastre-se gratuitamente em nossa plataforma de forma rápida e segura.'
  },
  {
    icon: FileText,
    title: 'Abra um chamado',
    description: 'Descreva sua necessidade e escolha a área de saúde que precisa.'
  },
  {
    icon: Users2,
    title: 'Conecte-se ao profissional',
    description: 'Receba propostas de profissionais qualificados e escolha o melhor para você.'
  },
  {
    icon: CheckCircle,
    title: 'Receba atendimento',
    description: 'Inicie seu tratamento com acompanhamento personalizado e contínuo.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Como funciona?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Em apenas 4 passos simples, você está conectado ao cuidado profissional
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[calc(50%+2rem)] w-full h-0.5 bg-gradient-to-r from-teal-300 to-transparent z-0"></div>
                )}

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-14 md:w-16 h-14 md:h-16 bg-white rounded-2xl shadow-xl mb-4 md:mb-6 relative">
                    <Icon className="w-7 md:w-8 h-7 md:h-8 text-teal-600" />
                    <div className="absolute -top-2 -right-2 w-7 md:w-8 h-7 md:h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
