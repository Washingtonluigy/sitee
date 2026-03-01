import { Shield, CheckCircle } from 'lucide-react';
import logoAmah from '../assets/design_sem_nome_(1).png';

export default function ValidationSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#783DAC]/10 rounded-full blur-3xl"></div>
              <div className="relative bg-white p-12 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#783DAC] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-lg relative">
                    <CheckCircle className="w-16 h-16 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Segurança de contar com profissionais validados e capacitados.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Na Amah, todos os profissionais de enfermagem e prestadores de serviços são validados e reconhecidos junto aos conselhos regionais de suas respectivas áreas, trazendo maior segurança e eficiência para as suas necessidades de cuidados em seu lar.
            </p>
            <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg border-2 border-purple-100">
              <img src={logoAmah} alt="Amah" className="w-24 h-auto" />
              <div className="border-l-2 border-purple-200 pl-4">
                <p className="text-sm text-gray-500 mb-1">Validado por</p>
                <p className="text-lg font-bold text-[#783DAC]">Plataforma Amah</p>
                <p className="text-xs text-gray-500">Profissionais verificados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
