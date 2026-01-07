import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { getVideos } from '../services/adminService';
import VideoModal from './VideoModal';

export default function VideoSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data.filter(v => v.is_active));
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  };

  if (videos.length === 0) {
    return null;
  }

  const mainVideo = videos[0];

  return (
    <>
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

          <div
            onClick={() => setSelectedVideo(mainVideo.video_url)}
            className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
          >
            {mainVideo.thumbnail_url ? (
              <div className="relative aspect-video">
                <img
                  src={mainVideo.thumbnail_url}
                  alt={mainVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-teal-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{mainVideo.title}</h3>
                    {mainVideo.description && (
                      <p className="text-white/90">{mainVideo.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-teal-600 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {videos.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {videos.slice(1, 4).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video.video_url)}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  {video.thumbnail_url ? (
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-teal-600 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="text-white font-semibold text-sm">{video.title}</h4>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                      <Play className="w-8 h-8 text-teal-600" fill="currentColor" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo || ''}
      />
    </>
  );
}
