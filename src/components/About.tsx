import { Target, Heart, Users, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre a Amah
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Nascemos com a missão de democratizar o acesso à saúde de qualidade,
              conectando pessoas a profissionais qualificados de forma rápida,
              segura e eficiente.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Somos mais que uma plataforma. Somos uma ponte entre você e o cuidado
              que merece. Com tecnologia de ponta e um time dedicado, trabalhamos
              todos os dias para transformar a experiência de atendimento em saúde.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Nossa Missão</h3>
                  <p className="text-gray-600 text-sm">Conectar pessoas ao cuidado de qualidade</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Nossa Visão</h3>
                  <p className="text-gray-600 text-sm">Ser referência em saúde digital</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Nossos Valores</h3>
                  <p className="text-gray-600 text-sm">Empatia, excelência e transparência</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Nosso Time</h3>
                  <p className="text-gray-600 text-sm">Profissionais dedicados ao seu bem-estar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
            <img
              src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Equipe de saúde"
              className="relative rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl max-w-xs">
              <div className="text-4xl font-bold text-teal-600 mb-2">5 anos</div>
              <p className="text-gray-700">Transformando o acesso à saúde no Brasil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
