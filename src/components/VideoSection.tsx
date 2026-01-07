import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Veja como transformamos vidas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça histórias reais de pessoas que encontraram o cuidado que precisavam
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-gradient-to-br from-teal-100 to-blue-100">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-teal-600 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Conheça a Amah</h3>
              <p className="text-white/90">Clique para assistir nosso vídeo institucional</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
