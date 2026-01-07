import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const phoneNumber = '5565990720070';
  const message = 'Olá! Gostaria de saber mais informações.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bottom-24 right-4 md:right-8 bg-white rounded-lg shadow-2xl p-6 w-80 z-50 animate-fade-in">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="bg-green-500 p-3 rounded-full flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Precisa de ajuda?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Fale conosco pelo WhatsApp e tire suas dúvidas!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Iniciar Conversa
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                +55 65 9907-2070
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowPopup(!showPopup)}
        className="fixed bottom-6 right-4 md:right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-all hover:scale-110 animate-bounce-slow"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </>
  );
}
