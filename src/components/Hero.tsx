import { Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoAmah from '../assets/design_sem_nome_(1).png';
import { getSiteConfig, getVideos, SiteConfig, Video } from '../services/adminService';
import VideoModal from './VideoModal';

export default function Hero() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [configData, videosData] = await Promise.all([
          getSiteConfig(),
          getVideos(),
        ]);
        setConfig(configData);
        setVideos(videosData.filter(v => v.is_active));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNavClick = () => {
    if (config?.button_primary_link) {
      window.location.href = config.button_primary_link;
    }
  };

  const handleSecondaryClick = () => {
    if (config?.button_secondary_link) {
      window.location.href = config.button_secondary_link;
    }
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <>
      <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <nav className="absolute top-0 left-0 right-0 z-20 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={handleNavClick} className="px-3 md:px-4 py-1.5 md:py-2 bg-red-600 text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30" translate="no">
            Cadastro de Profissional
          </button>
          <button onClick={handleNavClick} className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-600 text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30" translate="no">
            {config?.button_primary_text || 'Começar Agora'}
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center pt-8 md:pt-0 flex flex-col items-center justify-center min-h-screen">
        <img src={config?.logo_url || logoAmah} alt="Amah" className="w-32 md:w-48 h-auto mb-8 md:mb-12" />

        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 md:mb-8 shadow-lg">
          <Activity className="w-4 h-4 text-purple-600 animate-pulse" />
          <span className="text-sm font-medium text-gray-700" translate="no">Conectando você aos melhores profissionais de saúde</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight" translate="no">
          {config?.hero_title || 'Sua saúde merece'}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">
            {config?.hero_subtitle || 'atenção especializada'}
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4" translate="no">
          {config?.hero_description || 'A Amah conecta você com profissionais qualificados de diversas áreas da saúde de forma rápida e segura.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <button onClick={handleNavClick} className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white rounded-xl font-semibold text-base md:text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40 hover:scale-105" translate="no">
            {config?.button_primary_text || 'Começar Agora'}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button onClick={handleSecondaryClick} className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 rounded-xl font-semibold text-base md:text-lg hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl border-2 border-purple-600" translate="no">
            {config?.button_secondary_text || 'Sou Profissional'}
          </button>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto px-4 mb-10 md:mb-16">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 md:mb-2">10+</div>
            <div className="text-xs sm:text-sm text-gray-600">Cidades</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 md:mb-2">10+</div>
            <div className="text-xs sm:text-sm text-gray-600">Categorias</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">
              <span className="text-purple-600">4.9</span><span className="text-yellow-500">★</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Avaliação</div>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="w-full max-w-2xl mx-auto mb-10 md:mb-0">
            <button
              onClick={() => handleVideoClick(videos[0])}
              className="block w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-purple-50 group cursor-pointer">
                {videos[0].thumbnail_url ? (
                  <img src={videos[0].thumbnail_url} alt={videos[0].title} className="w-full aspect-video object-cover" />
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-400/20 backdrop-blur-sm">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{videos[0].title}</h3>
                    <p className="text-white/90">{videos[0].description}</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
