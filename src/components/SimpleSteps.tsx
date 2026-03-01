import { Search, Shield, Calendar, FileCheck, UserCheck, Zap } from 'lucide-react';

export default function SimpleSteps() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simples como deve ser
          </h2>
        </div>

        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-12">
            <button className="px-6 py-2 bg-white text-[#783DAC] font-semibold rounded-lg border-2 border-[#783DAC] shadow-md">
              Para Pacientes
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-all">
              Para Profissionais
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#783DAC] text-white rounded-full mx-auto mb-4 shadow-lg">
                <Search className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#783DAC] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Escolha a especialidade
              </h3>
              <p className="text-gray-600">
                Navegue por diversas categorias e escolha o profissional ideal para a sua necessidade
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#783DAC] text-white rounded-full mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#783DAC] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Conecte-se com segurança
              </h3>
              <p className="text-gray-600">
                Visualize o perfil verificado do profissional com todas as suas informações de contato
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#783DAC] text-white rounded-full mx-auto mb-4 shadow-lg">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#783DAC] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Receba o atendimento
              </h3>
              <p className="text-gray-600">
                Agende seu serviço e receba o cuidado que merece no conforto da sua casa
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-12">
          <div className="flex justify-center gap-4 mb-12">
            <button className="px-6 py-2 bg-gray-100 text-gray-600 font-semibold rounded-lg hover:bg-gray-200 transition-all">
              Para Pacientes
            </button>
            <button className="px-6 py-2 bg-white text-[#FAA900] font-semibold rounded-lg border-2 border-[#FAA900] shadow-md">
              Para Profissionais
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FAA900] text-white rounded-full mx-auto mb-4 shadow-lg">
                <FileCheck className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#FAA900] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cadastre seu perfil
              </h3>
              <p className="text-gray-600">
                Crie seus dados, suas credenciais e documentos são enviados para validação
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FAA900] text-white rounded-full mx-auto mb-4 shadow-lg">
                <UserCheck className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#FAA900] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Passe pela verificação
              </h3>
              <p className="text-gray-600">
                Nossa equipe valida seu perfil profissional para garantir segurança aos pacientes
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-[#FAA900] text-white rounded-full mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8" />
              </div>
              <div className="w-12 h-12 bg-[#FAA900] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Receba oportunidades
              </h3>
              <p className="text-gray-600">
                Conecte-se com pacientes e receba solicitações de serviço na palma da sua mão
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
