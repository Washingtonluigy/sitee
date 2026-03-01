import { useState, useEffect } from 'react';
import { getSiteConfig, SiteConfig } from '../services/adminService';

export default function FinalCTA() {
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
    <section className="py-20 bg-gradient-to-br from-[#783DAC] via-purple-700 to-[#783DAC] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FAA900] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Cuidar começa com a escolha certa.
        </h2>
        <p className="text-xl text-purple-100 mb-10">
          Seja para buscar atendimento no seu lar, clínico, ou para oferecer seus serviços, a Amah é saúde e segurança a um clique de distância e tecnologia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrimaryClick}
            className="px-8 py-4 bg-white text-[#783DAC] rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl"
            translate="no"
          >
            Buscar profissional agora
          </button>
          <button
            onClick={handleSecondaryClick}
            className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all border-2 border-white"
            translate="no"
          >
            Cadastrar-se como profissional
          </button>
        </div>
      </div>
    </section>
  );
}
