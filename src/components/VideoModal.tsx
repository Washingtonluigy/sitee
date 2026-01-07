import { X } from 'lucide-react';
import { Video } from '../services/adminService';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  if (!isOpen || !video) return null;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtu.be')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else {
        videoId = new URLSearchParams(new URL(url).search).get('v') || url.split('v=')[1]?.split('&')[0];
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    return url;
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={getEmbedUrl(video.video_url)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="bg-gray-900 p-6">
          <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
          <p className="text-gray-300">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
