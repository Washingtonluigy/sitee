import { useState, useEffect } from 'react';
import logoAmah from '../assets/design_sem_nome_(1).png';
import heroImage from '/WhatsApp_Image_2026-02-24_at_14.58.42.jpeg';
import { getSiteConfig, SiteConfig } from '../services/adminService';

export default function Hero() {
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
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#783DAC]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FAA900]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col items-center gap-4">
              <img
                src={config?.logo_url || logoAmah}
                alt="Amah"
                className="w-48 md:w-56 lg:w-72 xl:w-96 h-auto"
              />
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm md:text-base font-medium text-[#783DAC]" translate="no">
                  🏥 PLATAFORMA DE PROFISSIONAIS DA SAÚDE
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight text-center">
              O cuidado que você precisa, <span className="text-[#783DAC]">onde você estiver.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center">
              Conectamos você aos melhores profissionais de saúde para atendimento domiciliar, clínico ou presencial. Simples, rápido e eficiente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePrimaryClick}
                className="px-8 py-4 bg-[#783DAC] text-white rounded-lg font-semibold text-lg hover:bg-[#6a34a0] transition-all shadow-lg hover:shadow-xl"
                translate="no"
              >
                {config?.button_primary_text || 'Encontrar profissional'} →
              </button>
              <button
                onClick={handleSecondaryClick}
                className="px-8 py-4 bg-white text-[#783DAC] rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-[#783DAC]"
                translate="no"
              >
                {config?.button_secondary_text || 'Quero me cadastrar'}
              </button>
            </div>
          </div>

          <div className="relative lg:order-last">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#783DAC]/20 to-[#FAA900]/20 rounded-2xl blur-2xl"></div>
            <img
              src={heroImage}
              alt="Profissional atendendo paciente em casa"
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
