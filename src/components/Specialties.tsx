import { Home, Activity, Heart, Stethoscope, Baby, Syringe, Eye, Pill } from 'lucide-react';

export default function Specialties() {
  const specialties = [
    { icon: Home, name: 'Home Care' },
    { icon: Activity, name: 'Enfermagem' },
    { icon: Heart, name: 'Pediatria' },
    { icon: Stethoscope, name: 'Intensivista' },
    { icon: Baby, name: 'Prenatal' },
    { icon: Syringe, name: 'Cuidadores' },
    { icon: Eye, name: 'Médicos' },
    { icon: Pill, name: 'Pós-Operatório' },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Especialidades que cuidam de você
            </h2>
            <p className="text-gray-400">
              Temos uma ampla variedade de profissionais de diversas áreas prontos para oferecer o melhor atendimento
            </p>
          </div>
          <a href="#" className="text-[#FAA900] font-semibold hover:underline hidden md:block">
            Ver todas as especialidades →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-750 p-6 rounded-xl text-center transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-[#783DAC] rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold">{specialty.name}</h3>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 md:hidden">
          <a href="#" className="text-[#FAA900] font-semibold hover:underline">
            Ver todas as especialidades →
          </a>
        </div>
      </div>
    </section>
  );
}
