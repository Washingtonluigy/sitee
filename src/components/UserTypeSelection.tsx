import { Heart, Stethoscope, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteConfig, SiteConfig } from '../services/adminService';

export default function UserTypeSelection() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const configData = await getSiteConfig();
        setConfig(configData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, []);

  const handlePrimaryClick = () => {
    if (config?.button_primary_link) {
      window.location.href = config.button_primary_link;
    }
  };

  const handleSecondaryClick = () => {
    if (config?.button_secondary_link) {
      window.location.href = config.button_secondary_link;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como podemos ajudar você hoje?
          </h2>
          <p className="text-lg text-gray-600">
            Escolha o seu perfil e descubra as vantagens da nossa plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-[#783DAC] transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-[#783DAC] rounded-full mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sou Paciente ou Familiar
            </h3>

            <p className="text-gray-600 mb-6">
              Busco atendimento de qualidade, funciona o seguro para todo tipo de para quem eu amo, no conforto de casa ou onde.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#783DAC] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Acesso a diverse especialidades</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#783DAC] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Profissionais rigorosamente verificados</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#783DAC] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Agendamento rápido e fácil</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#783DAC] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Segurança vigor para problemas</span>
              </li>
            </ul>

            <button
              onClick={handlePrimaryClick}
              className="w-full px-6 py-3 bg-[#783DAC] text-white rounded-lg font-semibold hover:bg-[#6a34a0] transition-all"
            >
              Encontrar meu profissional →
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-[#FAA900] transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-[#FAA900] rounded-full mb-6">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Sou Profissional de Saúde
            </h3>

            <p className="text-gray-600 mb-6">
              Quero ampliar minha base de pacientes, ter autonomia de agenda e utilizar uma plataforma exclusiva para guiar meus atendimentos.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FAA900] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Liberdade para definir horários</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FAA900] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Validação com órgãos públicos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FAA900] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Grande variedade de convênios</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FAA900] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Atendimento gerenciado e seguro</span>
              </li>
            </ul>

            <button
              onClick={handleSecondaryClick}
              className="w-full px-6 py-3 bg-[#FAA900] text-white rounded-lg font-semibold hover:bg-[#e09900] transition-all"
            >
              Quero me cadastrar →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
