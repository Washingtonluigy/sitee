import { Shield, Users, Lock } from 'lucide-react';

export default function Transparency() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🔒 SEGURANÇA EM PRIMEIRO LUGAR
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transparência e confiança em cada conexão.
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#783DAC] rounded-full flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Verificação Rigorosa
                  </h3>
                  <p className="text-gray-600">
                    Validamos documentos e registros profissionais (CRM, COREN, CREFITO e outros) para garantir que você tenha acesso apenas a profissionais regularizados
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#783DAC] rounded-full flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Plataforma Intermediária
                  </h3>
                  <p className="text-gray-600">
                    A Amah facilita busca e conexão. Os profissionais são autônomos e responsáveis pelos seus atendimentos
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-[#783DAC] rounded-full flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Proteção de Dados
                  </h3>
                  <p className="text-gray-600">
                    Seguimos rigorosamente a LGPD para garantir que suas informações pessoais estejam sempre seguras e protegidas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              O que dizem nossos usuários
            </h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl">
                <p className="text-gray-700 mb-4 italic">
                  "Encontrei uma enfermeira qualificada em menos de 24h. O processo foi super simples e seguro!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#783DAC] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Silva</p>
                    <p className="text-sm text-gray-600">Paciente</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl">
                <p className="text-gray-700 mb-4 italic">
                  "Como profissional, a Amah me deu mais autonomia e oportunidades de atendimento."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAA900] rounded-full flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">João Santos</p>
                    <p className="text-sm text-gray-600">Enfermeiro</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#783DAC]">5k+</p>
                  <p className="text-sm text-gray-600">Usuários</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#783DAC]">1k+</p>
                  <p className="text-sm text-gray-600">Profissionais</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#783DAC]">4.9</p>
                  <p className="text-sm text-gray-600">Avaliação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
