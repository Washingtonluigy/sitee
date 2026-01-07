import { Clock, Shield, Users, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Atendimento Rápido',
    description: 'Conecte-se em minutos, não em dias.'
  },
  {
    icon: Shield,
    title: 'Seguro e Confiável',
    description: 'Profissionais verificados e credenciados.'
  },
  {
    icon: Users,
    title: 'Múltiplas Especialidades',
    description: 'Todas as áreas da saúde em um só lugar.'
  },
  {
    icon: Stethoscope,
    title: 'Profissionais Qualificados',
    description: 'Especialistas experientes e certificados.'
  }
];

export default function Features() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Por que escolher a Amah?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
